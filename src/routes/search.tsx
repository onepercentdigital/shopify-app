import { createFileRoute, Outlet } from '@tanstack/react-router';
import Collections from '@/components/layout/search/collections';
import FilterList from '@/components/layout/search/filter';
import { sorting } from '@/lib/constants';
import { getCollections } from '@/lib/shopify';

export const Route = createFileRoute('/search')({
  component: SearchLayout,
  loader: async ({ context }) => {
    // Prefetch collections for the sidebar
    await context.queryClient.ensureQueryData({
      queryKey: ['collections'],
      queryFn: getCollections,
      staleTime: 5 * 60 * 1000,
    });
  },
});

function SearchLayout() {
  return (
    <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <Collections />
      </div>
      <div className="order-last min-h-screen w-full md:order-none">
        <Outlet />
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
  );
}
