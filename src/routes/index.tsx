import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Carousel } from '@/components/carousel';
import { ThreeItemGrid } from '@/components/grid/three-items';
import { getCollectionProducts } from '@/lib/shopify';

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Shopify Store';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: SITE_NAME },
      {
        name: 'description',
        content:
          'High-performance ecommerce store built with TanStack Start and Shopify.',
      },
      { property: 'og:type', content: 'website' },
    ],
  }),
  loader: async ({ context }) => {
    // Prefetch featured products
    await context.queryClient.ensureQueryData({
      queryKey: ['collection-products', 'hidden-homepage-featured-items'],
      queryFn: () =>
        getCollectionProducts({ collection: 'hidden-homepage-featured-items' }),
      staleTime: 5 * 60 * 1000,
    });
  },
});

function HomePage() {
  return (
    <>
      <ThreeItemGridWrapper />
      <CarouselWrapper />
    </>
  );
}

function ThreeItemGridWrapper() {
  const { data: homepageItems } = useQuery({
    queryKey: ['collection-products', 'hidden-homepage-featured-items'],
    queryFn: () =>
      getCollectionProducts({ collection: 'hidden-homepage-featured-items' }),
    staleTime: 5 * 60 * 1000,
  });

  if (!homepageItems?.[0] || !homepageItems?.[1] || !homepageItems?.[2]) {
    return null;
  }

  return <ThreeItemGrid products={homepageItems.slice(0, 3)} />;
}

function CarouselWrapper() {
  const { data: products } = useQuery({
    queryKey: ['collection-products', 'hidden-homepage-carousel'],
    queryFn: () =>
      getCollectionProducts({ collection: 'hidden-homepage-carousel' }),
    staleTime: 5 * 60 * 1000,
  });

  if (!products?.length) {
    return null;
  }

  return <Carousel products={products} />;
}
