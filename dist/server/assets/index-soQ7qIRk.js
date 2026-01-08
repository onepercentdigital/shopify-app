import { o as jsxRuntimeExports } from "./worker-entry-DIDafrh-.js";
import { L as Link, b as useQuery } from "./router-D2qbkn3H.js";
import { G as GridTileImage } from "./tile-DZGMKz5G.js";
import { d as getCollectionProducts } from "./index-DAmcNP6_.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function Carousel({ products }) {
  if (!products?.length) return null;
  const carouselProducts = [...products, ...products, ...products];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-x-auto pt-1 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex animate-carousel gap-4", children: carouselProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: "relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/product/$handle",
          params: { handle: product.handle },
          className: "relative h-full w-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GridTileImage,
            {
              alt: product.title,
              label: {
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              },
              src: product.featuredImage?.url,
              fill: true
            }
          )
        }
      )
    },
    `${product.handle}${i}`
  )) }) });
}
function ThreeItemGridItem({
  item,
  size,
  priority
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: size === "full" ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          className: "relative block aspect-square h-full w-full",
          to: "/product/$handle",
          params: { handle: item.handle },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GridTileImage,
            {
              src: item.featuredImage.url,
              fill: true,
              priority,
              alt: item.title,
              label: {
                position: size === "full" ? "center" : "bottom",
                title: item.title,
                amount: item.priceRange.maxVariantPrice.amount,
                currencyCode: item.priceRange.maxVariantPrice.currencyCode
              }
            }
          )
        }
      )
    }
  );
}
function ThreeItemGrid({ products }) {
  const [firstProduct, secondProduct, thirdProduct] = products;
  if (!firstProduct || !secondProduct || !thirdProduct) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeItemGridItem, { size: "full", item: firstProduct, priority: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeItemGridItem, { size: "half", item: secondProduct, priority: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeItemGridItem, { size: "half", item: thirdProduct })
  ] });
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeItemGridWrapper, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselWrapper, {})
  ] });
}
function ThreeItemGridWrapper() {
  const {
    data: homepageItems
  } = useQuery({
    queryKey: ["collection-products", "hidden-homepage-featured-items"],
    queryFn: () => getCollectionProducts({
      collection: "hidden-homepage-featured-items"
    }),
    staleTime: 5 * 60 * 1e3
  });
  if (!homepageItems?.[0] || !homepageItems?.[1] || !homepageItems?.[2]) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeItemGrid, { products: homepageItems.slice(0, 3) });
}
function CarouselWrapper() {
  const {
    data: products
  } = useQuery({
    queryKey: ["collection-products", "hidden-homepage-carousel"],
    queryFn: () => getCollectionProducts({
      collection: "hidden-homepage-carousel"
    }),
    staleTime: 5 * 60 * 1e3
  });
  if (!products?.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Carousel, { products });
}
export {
  HomePage as component
};
