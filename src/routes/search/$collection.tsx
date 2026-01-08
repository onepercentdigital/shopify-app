import { useQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { z } from 'zod';
import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getCollection, getCollectionProducts } from '@/lib/shopify';

const searchParamsSchema = z.object({
  sort: z.string().optional(),
});

export const Route = createFileRoute('/search/$collection')({
  component: CollectionPage,
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => ({ sort: search.sort }),
  loader: async ({ params, context, deps }) => {
    const collection = await context.queryClient.ensureQueryData({
      queryKey: ['collection', params.collection],
      queryFn: () => getCollection(params.collection),
      staleTime: 5 * 60 * 1000,
    });

    if (!collection) {
      throw notFound();
    }

    const { sortKey, reverse } =
      sorting.find((item) => item.slug === deps.sort) || defaultSort;

    await context.queryClient.ensureQueryData({
      queryKey: [
        'collection-products',
        params.collection,
        { sortKey, reverse },
      ],
      queryFn: () =>
        getCollectionProducts({
          collection: params.collection,
          sortKey,
          reverse,
        }),
      staleTime: 5 * 60 * 1000,
    });

    return { collection };
  },
  head: ({ loaderData }) => {
    const collection = loaderData?.collection;
    if (!collection) {
      return { meta: [{ title: 'Collection Not Found' }] };
    }

    return {
      meta: [
        { title: collection.seo?.title || collection.title },
        {
          name: 'description',
          content:
            collection.seo?.description ||
            collection.description ||
            `${collection.title} products`,
        },
      ],
    };
  },
});

function CollectionPage() {
  const { collection: collectionHandle } = Route.useParams();
  const { sort } = Route.useSearch();
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const { data: products = [] } = useQuery({
    queryKey: ['collection-products', collectionHandle, { sortKey, reverse }],
    queryFn: () =>
      getCollectionProducts({
        collection: collectionHandle,
        sortKey,
        reverse,
      }),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">No products found in this collection</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
