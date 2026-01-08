import { o as jsxRuntimeExports } from "./worker-entry-C8G20BGl.js";
import { R as Route, b as useQuery } from "./router-EOe-sXrB.js";
import { P as Prose } from "./prose-Bp4a9W_Q.js";
import { b as getPage } from "./index-DFLDpE0d.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function FormattedDate({
  date,
  className
}) {
  const formatted = new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: formatted });
}
function DynamicPage() {
  const {
    page: pageHandle
  } = Route.useParams();
  const {
    data: page
  } = useQuery({
    queryKey: ["page", pageHandle],
    queryFn: () => getPage(pageHandle),
    staleTime: 5 * 60 * 1e3
  });
  if (!page) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Page not found" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-(--breakpoint-2xl) px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-8 font-bold text-5xl", children: page.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Prose, { className: "mb-8", html: page.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm italic", children: [
      "This document was last updated on",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormattedDate, { date: page.updatedAt }),
      "."
    ] })
  ] });
}
export {
  DynamicPage as component
};
