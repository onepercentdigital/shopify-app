import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';

const searchParamsSchema = z.object({
  q: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute('/search/')({
  component: SearchPage,
  validateSearch: searchParamsSchema,
  head: () => ({
    meta: [
      { title: 'Search' },
      { name: 'description', content: 'Search for products in the store.' },
    ],
  }),
  loaderDeps: ({ search }) => ({ q: search.q, sort: search.sort }),
  loader: async ({ context, deps }) => {
    const { sortKey, reverse } =
      sorting.find((item) => item.slug === deps.sort) || defaultSort;

    await context.queryClient.ensureQueryData({
      queryKey: ['products', { query: deps.q, sortKey, reverse }],
      queryFn: () => getProducts({ query: deps.q, sortKey, reverse }),
      staleTime: 5 * 60 * 1000,
    });
  },
});

function SearchPage() {
  const { q: searchValue, sort } = Route.useSearch();
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const { data: products = [] } = useQuery({
    queryKey: ['products', { query: searchValue, sortKey, reverse }],
    queryFn: () => getProducts({ query: searchValue, sortKey, reverse }),
    staleTime: 5 * 60 * 1000,
  });

  const resultsText = products.length === 1 ? 'result' : 'results';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
