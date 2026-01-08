import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import type { Product } from 'lib/shopify/types';
import { Suspense } from 'react';
import { VariantSelector } from './variant-selector';

function AddToCartSkeleton() {
  return (
    <div className="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 text-white tracking-wide opacity-60">
      Add To Cart
    </div>
  );
}

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 font-medium text-5xl">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <Suspense fallback={<AddToCartSkeleton />}>
        <AddToCart product={product} />
      </Suspense>
    </>
  );
}
