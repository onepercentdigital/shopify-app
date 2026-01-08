import { createServerFn } from '@tanstack/react-start';
import {
  getRequestHeader,
  setResponseHeader,
} from '@tanstack/react-start/server';
import { z } from 'zod';
import {
  addToCartWithId,
  createCart,
  getCartById,
  removeFromCartWithId,
  updateCartWithId,
} from '@/lib/shopify';
import type { Cart } from '@/lib/shopify/types';

// Helper to parse cookies from Cookie header
function parseCookies(
  cookieHeader: string | null | undefined,
): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...rest] = c.trim().split('=');
      return [key, rest.join('=')];
    }),
  );
}

// Get cart ID from cookies
export const getCartId = createServerFn().handler(async () => {
  const cookieHeader = getRequestHeader('Cookie');
  const cookies = parseCookies(cookieHeader);
  return cookies.cartId ?? null;
});

// Get cart data
export const getCart = createServerFn().handler(
  async (): Promise<Cart | undefined> => {
    const cookieHeader = getRequestHeader('Cookie');
    const cookies = parseCookies(cookieHeader);
    const cartId = cookies.cartId ?? null;

    if (!cartId) {
      return undefined;
    }

    return getCartById(cartId);
  },
);

// Create cart and set cookie
export const createCartAndSetCookie = createServerFn({
  method: 'POST',
}).handler(async () => {
  const cart = await createCart();
  if (cart.id) {
    setResponseHeader(
      'Set-Cookie',
      `cartId=${cart.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    );
  }
  return cart;
});

// Add item to cart
export const addItem = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ variantId: z.string() }))
  .handler(async ({ data }) => {
    const cookieHeader = getRequestHeader('Cookie');
    const cookies = parseCookies(cookieHeader);
    let cartId: string | null = cookies.cartId ?? null;

    // Create cart if it doesn't exist
    if (!cartId) {
      const cart = await createCart();
      if (!cart.id) {
        throw new Error('Failed to create cart');
      }
      cartId = cart.id;
      setResponseHeader(
        'Set-Cookie',
        `cartId=${cartId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
      );
    }

    return addToCartWithId(cartId, [
      { merchandiseId: data.variantId, quantity: 1 },
    ]);
  });

// Remove item from cart
export const removeItem = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ lineId: z.string() }))
  .handler(async ({ data }) => {
    const cookieHeader = getRequestHeader('Cookie');
    const cookies = parseCookies(cookieHeader);
    const cartId = cookies.cartId ?? null;

    if (!cartId) {
      throw new Error('No cart found');
    }

    return removeFromCartWithId(cartId, [data.lineId]);
  });

// Update item quantity
export const updateItemQuantity = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      lineId: z.string(),
      merchandiseId: z.string(),
      quantity: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    const cookieHeader = getRequestHeader('Cookie');
    const cookies = parseCookies(cookieHeader);
    const cartId = cookies.cartId ?? null;

    if (!cartId) {
      throw new Error('No cart found');
    }

    if (data.quantity === 0) {
      return removeFromCartWithId(cartId, [data.lineId]);
    }

    return updateCartWithId(cartId, [
      {
        id: data.lineId,
        merchandiseId: data.merchandiseId,
        quantity: data.quantity,
      },
    ]);
  });

// Get checkout URL
export const getCheckoutUrl = createServerFn().handler(async () => {
  const cookieHeader = getRequestHeader('Cookie');
  const cookies = parseCookies(cookieHeader);
  const cartId = cookies.cartId ?? null;

  if (!cartId) {
    return null;
  }

  const cart = await getCartById(cartId);
  return cart?.checkoutUrl ?? null;
});
