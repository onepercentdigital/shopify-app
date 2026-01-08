import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { GridTileImage } from '@/components/grid/tile';
import { Gallery } from '@/components/product/gallery';
import { ProductProvider } from '@/components/product/product-context';
import { ProductDescription } from '@/components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { getProduct, getProductRecommendations } from '@/lib/shopify';
import type { Image, Product } from '@/lib/shopify/types';

export const Route = createFileRoute('/product/$handle')({
  component: ProductPage,
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData({
      queryKey: ['product', params.handle],
      queryFn: () => getProduct(params.handle),
      staleTime: 5 * 60 * 1000,
    });

    if (!product) {
      throw notFound();
    }

    // Prefetch recommendations
    context.queryClient.prefetchQuery({
      queryKey: ['product-recommendations', product.id],
      queryFn: () => getProductRecommendations(product.id),
      staleTime: 5 * 60 * 1000,
    });

    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return { meta: [{ title: 'Product Not Found' }] };
    }

    const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

    return {
      meta: [
        { title: product.seo?.title || product.title },
        {
          name: 'description',
          content: product.seo?.description || product.description,
        },
        {
          name: 'robots',
          content: indexable ? 'index, follow' : 'noindex, nofollow',
        },
        { property: 'og:title', content: product.seo?.title || product.title },
        {
          property: 'og:description',
          content: product.seo?.description || product.description,
        },
        ...(product.featuredImage?.url
          ? [{ property: 'og:image', content: product.featuredImage.url }]
          : []),
      ],
    };
  },
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProduct(handle),
    staleTime: 5 * 60 * 1000,
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url || '',
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.images.slice(0, 5).map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
    </ProductProvider>
  );
}

function RelatedProducts({ id }: { id: string }) {
  const { data: relatedProducts } = useQuery({
    queryKey: ['product-recommendations', id],
    queryFn: () => getProductRecommendations(id),
    staleTime: 5 * 60 * 1000,
  });

  if (!relatedProducts?.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 font-bold text-2xl">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product: Product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none sm:w-1/3 md:w-1/4 lg:w-1/5 min-[475px]:w-1/2"
          >
            <Link
              className="relative h-full w-full"
              to="/product/$handle"
              params={{ handle: product.handle }}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
