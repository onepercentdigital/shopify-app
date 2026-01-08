import { o as jsxRuntimeExports } from "./worker-entry-C8G20BGl.js";
import { d as Route, b as useQuery } from "./router-EOe-sXrB.js";
import { G as Grid, P as ProductGridItems } from "./product-grid-items-BxZRDNC5.js";
import { e as sorting, f as defaultSort, h as getProducts } from "./index-DFLDpE0d.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./tile-QsgnqOIg.js";
function SearchPage() {
  const {
    q: searchValue,
    sort
  } = Route.useSearch();
  const {
    sortKey,
    reverse
  } = sorting.find((item) => item.slug === sort) || defaultSort;
  const {
    data: products = []
  } = useQuery({
    queryKey: ["products", {
      query: searchValue,
      sortKey,
      reverse
    }],
    queryFn: () => getProducts({
      query: searchValue,
      sortKey,
      reverse
    }),
    staleTime: 5 * 60 * 1e3
  });
  const resultsText = products.length === 1 ? "result" : "results";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    searchValue ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4", children: [
      products.length === 0 ? "There are no products that match " : `Showing ${products.length} ${resultsText} for `,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
        '"',
        searchValue,
        '"'
      ] })
    ] }) : null,
    products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { className: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridItems, { products }) }) : null
  ] });
}
export {
  SearchPage as component
};
