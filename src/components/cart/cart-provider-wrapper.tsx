import type { ReactNode } from 'react';
import { CartProvider } from '@/components/cart/cart-context';

export function CartProviderWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
