import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import CopyrightYear from '@/components/layout/copyright-year';
import FooterMenu from '@/components/layout/footer-menu';
import LogoSquare from '@/components/logo-square';
import { getMenu } from '@/lib/shopify';

const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || '';
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Shopify Store';

export default function Footer() {
  const { data: menu = [] } = useQuery({
    queryKey: ['menu', 'next-js-frontend-footer-menu'],
    queryFn: () => getMenu('next-js-frontend-footer-menu'),
    staleTime: 5 * 60 * 1000,
  });

  const copyrightName = COMPANY_NAME || SITE_NAME;

  return (
    <footer className="text-neutral-500 text-sm dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-neutral-200 border-t px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link
            className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
            to="/"
          >
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <FooterMenu menu={menu} />
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-black text-xs dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-neutral-200 border-r dark:border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-neutral-200 border-t py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; <CopyrightYear /> {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}{' '}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-neutral-400 border-l md:inline-block" />
          <p>
            <a href="https://github.com/vercel/commerce">View the source</a>
          </p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Created by ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
