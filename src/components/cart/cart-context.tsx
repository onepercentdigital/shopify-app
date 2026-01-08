import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import {
  addItem,
  createCartAndSetCookie,
  getCart,
  removeItem,
  updateItemQuantity,
} from '@/lib/cart/server';
import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from '@/lib/shopify/types';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartContextType = {
  cart: Cart | undefined;
  isLoading: boolean;
  isAddingItem: boolean;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' },
    },
  };
}

function updateCartTotals(
  lines: CartItem[],
): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0,
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode },
    },
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
    staleTime: 0, // Always refetch cart
  });

  // Create cart mutation
  const createCartMutation = useMutation({
    mutationFn: () => createCartAndSetCookie(),
    onSuccess: (newCart) => {
      queryClient.setQueryData(['cart'], newCart);
    },
  });

  // Add item mutation with optimistic update
  const addItemMutation = useMutation({
    mutationFn: (variantId: string) => addItem({ data: { variantId } }),
    onMutate: async (variantId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<Cart>(['cart']);

      // Optimistic update
      if (previousCart) {
        const existingItem = previousCart.lines.find(
          (item) => item.merchandise.id === variantId,
        );

        let updatedLines: CartItem[];
        if (existingItem) {
          updatedLines = previousCart.lines.map((item) =>
            item.merchandise.id === variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          // For optimistic add, we create a placeholder
          updatedLines = previousCart.lines;
        }

        const totals = updateCartTotals(updatedLines);
        queryClient.setQueryData<Cart>(['cart'], {
          ...previousCart,
          ...totals,
          lines: updatedLines,
        });
      }

      return { previousCart };
    },
    onError: (_err, _variantId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Update item mutation with optimistic update
  const updateItemMutation = useMutation({
    mutationFn: async ({
      lineId,
      merchandiseId,
      quantity,
    }: {
      lineId: string;
      merchandiseId: string;
      quantity: number;
    }) => {
      if (quantity === 0) {
        return removeItem({ data: { lineId } });
      }
      return updateItemQuantity({ data: { lineId, merchandiseId, quantity } });
    },
    onMutate: async ({ merchandiseId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<Cart>(['cart']);

      if (previousCart) {
        let updatedLines: CartItem[];
        if (quantity === 0) {
          updatedLines = previousCart.lines.filter(
            (item) => item.merchandise.id !== merchandiseId,
          );
        } else {
          updatedLines = previousCart.lines.map((item) => {
            if (item.merchandise.id === merchandiseId) {
              const singleItemAmount =
                Number(item.cost.totalAmount.amount) / item.quantity;
              return {
                ...item,
                quantity,
                cost: {
                  ...item.cost,
                  totalAmount: {
                    ...item.cost.totalAmount,
                    amount: calculateItemCost(
                      quantity,
                      singleItemAmount.toString(),
                    ),
                  },
                },
              };
            }
            return item;
          });
        }

        const totals =
          updatedLines.length > 0
            ? updateCartTotals(updatedLines)
            : createEmptyCart();
        queryClient.setQueryData<Cart>(['cart'], {
          ...previousCart,
          ...totals,
          lines: updatedLines,
        });
      }

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: (lineId: string) => removeItem({ data: { lineId } }),
    onMutate: async (lineId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<Cart>(['cart']);

      if (previousCart) {
        const updatedLines = previousCart.lines.filter(
          (item) => item.id !== lineId,
        );
        const totals =
          updatedLines.length > 0
            ? updateCartTotals(updatedLines)
            : createEmptyCart();
        queryClient.setQueryData<Cart>(['cart'], {
          ...previousCart,
          ...totals,
          lines: updatedLines,
        });
      }

      return { previousCart };
    },
    onError: (_err, _lineId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    if (!cart) return;

    const item = cart.lines.find((i) => i.merchandise.id === merchandiseId);
    if (!item?.id) return;

    if (updateType === 'delete') {
      removeItemMutation.mutate(item.id);
    } else {
      const newQuantity =
        updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
      updateItemMutation.mutate({
        lineId: item.id,
        merchandiseId,
        quantity: newQuantity,
      });
    }
  };

  const addCartItem = (variant: ProductVariant, _product: Product) => {
    if (!cart) {
      // Create cart first, then add item
      createCartMutation.mutate(undefined, {
        onSuccess: () => {
          addItemMutation.mutate(variant.id);
        },
      });
    } else {
      addItemMutation.mutate(variant.id);
    }
  };

  const isAddingItem =
    addItemMutation.isPending || createCartMutation.isPending;

  const value = useMemo(
    () => ({
      cart,
      isLoading,
      isAddingItem,
      updateCartItem,
      addCartItem,
    }),
    [cart, isLoading, isAddingItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
