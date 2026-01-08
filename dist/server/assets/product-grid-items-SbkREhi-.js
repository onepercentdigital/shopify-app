import { o as jsxRuntimeExports } from "./worker-entry-Cv73MfJc.js";
import { c as clsx, L as Link } from "./router-C6qVLgSF.js";
import { G as GridTileImage } from "./tile-BrLrGYX_.js";
function Grid(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ...props,
      className: clsx("grid grid-flow-row gap-4", props.className),
      children: props.children
    }
  );
}
function GridItem(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      ...props,
      className: clsx("aspect-square transition-opacity", props.className),
      children: props.children
    }
  );
}
Grid.Item = GridItem;
function ProductGridItems({
  products
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Item, { className: "animate-fadeIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      className: "relative inline-block h-full w-full",
      to: "/product/$handle",
      params: { handle: product.handle },
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
  ) }, product.handle)) });
}
export {
  Grid as G,
  ProductGridItems as P
};
