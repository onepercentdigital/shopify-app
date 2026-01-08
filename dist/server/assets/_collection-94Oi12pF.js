import { o as jsxRuntimeExports } from "./worker-entry-Cv73MfJc.js";
import { e as Route, b as useQuery } from "./router-C6qVLgSF.js";
import { G as Grid, P as ProductGridItems } from "./product-grid-items-SbkREhi-.js";
import { e as sorting, f as defaultSort, d as getCollectionProducts } from "./index-DrgtSF_4.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./tile-BrLrGYX_.js";
function CollectionPage() {
  const {
    collection: collectionHandle
  } = Route.useParams();
  const {
    sort
  } = Route.useSearch();
  const {
    sortKey,
    reverse
  } = sorting.find((item) => item.slug === sort) || defaultSort;
  const {
    data: products = []
  } = useQuery({
    queryKey: ["collection-products", collectionHandle, {
      sortKey,
      reverse
    }],
    queryFn: () => getCollectionProducts({
      collection: collectionHandle,
      sortKey,
      reverse
    }),
    staleTime: 5 * 60 * 1e3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-3 text-lg", children: "No products found in this collection" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { className: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridItems, { products }) }) });
}
export {
  CollectionPage as component
};
