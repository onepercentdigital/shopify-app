import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { CartProvider } from '@/components/cart/cart-context';
import Footer from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import appCss from '../styles.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
}

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Shopify Store';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: SITE_NAME,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootComponent() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster closeButton />
    </CartProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-4xl">404</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Page not found
      </p>
    </div>
  );
}
