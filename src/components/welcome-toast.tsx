'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

function setWelcomeCookie() {
  if ('cookieStore' in window) {
    (window.cookieStore as CookieStore).set({
      name: 'welcome-toast',
      value: '2',
      maxAge: 31536000,
      path: '/',
    });
  } else {
    document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
  }
}

interface CookieStore {
  set(options: {
    name: string;
    value: string;
    maxAge?: number;
    path?: string;
  }): Promise<void>;
}

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Next.js Commerce!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: setWelcomeCookie,
        description: (
          <>
            This is a high-performance, SSR storefront powered by Shopify,
            Next.js, and Vercel.{' '}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener"
            >
              Deploy your own
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
