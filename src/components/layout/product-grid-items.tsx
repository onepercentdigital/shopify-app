import { Link } from '@tanstack/react-router';
import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import type { Product } from '@/lib/shopify/types';

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
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
        </Grid.Item>
      ))}
    </>
  );
}
