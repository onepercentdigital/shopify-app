import { a as reactExports, o as jsxRuntimeExports, O as Outlet } from "./worker-entry-DIDafrh-.js";
import { u as useLocation, c as clsx, L as Link, a as useSearch, b as useQuery } from "./router-D2qbkn3H.js";
import { c as createUrl, a as getCollections, e as sorting } from "./index-DAmcNP6_.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function ChevronDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(ChevronDownIcon);
function PathFilterItemComponent({ item }) {
  const location = useLocation();
  const pathname = location.pathname;
  const active = pathname === item.path;
  const href = reactExports.useMemo(() => {
    const newParams = new URLSearchParams();
    return createUrl(item.path, newParams);
  }, [item.path]);
  const commonProps = {
    className: clsx(
      "w-full text-sm underline-offset-4 hover:underline",
      "dark:hover:text-neutral-100",
      { "underline underline-offset-4": active }
    )
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mt-2 flex text-black dark:text-white", children: active ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ...commonProps, children: item.title }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, ...commonProps, children: item.title }) }, item.title);
}
function SortFilterItemComponent({ item }) {
  const location = useLocation();
  const pathname = location.pathname;
  const search = useSearch({ strict: false });
  const q = search?.q;
  const active = search?.sort === item.slug;
  const href = reactExports.useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (item.slug) params.set("sort", item.slug);
    return createUrl(pathname, params);
  }, [pathname, q, item.slug]);
  const commonProps = {
    className: clsx("w-full hover:underline hover:underline-offset-4", {
      "underline underline-offset-4": active
    })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: "mt-2 flex text-black text-sm dark:text-white",
      children: active ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { ...commonProps, children: item.title }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, ...commonProps, children: item.title })
    },
    item.title
  );
}
function FilterItem({ item }) {
  return "path" in item ? /* @__PURE__ */ jsxRuntimeExports.jsx(PathFilterItemComponent, { item }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SortFilterItemComponent, { item });
}
function FilterItemDropdown({ list }) {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = useSearch({ strict: false });
  const sortParam = searchParams?.sort ?? null;
  const [openSelect, setOpenSelect] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const prevPathRef = reactExports.useRef(pathname);
  const prevSortRef = reactExports.useRef(sortParam);
  const activeTitle = reactExports.useMemo(() => {
    const activeItem = list.find((listItem) => {
      if ("path" in listItem) {
        return pathname === listItem.path;
      }
      if ("slug" in listItem) {
        return sortParam === listItem.slug;
      }
      return false;
    });
    return activeItem?.title ?? list[0]?.title ?? "";
  }, [pathname, list, sortParam]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenSelect(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  reactExports.useEffect(() => {
    if (prevPathRef.current !== pathname || prevSortRef.current !== sortParam) {
      setOpenSelect(false);
      prevPathRef.current = pathname;
      prevSortRef.current = sortParam;
    }
  }, [pathname, sortParam]);
  const handleKeyDown = (event) => {
    if (event.key === "Escape") setOpenSelect(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpenSelect((s) => !s),
        className: clsx(
          "flex w-full items-center justify-between rounded-sm",
          "border border-black/30 px-4 py-2 text-sm dark:border-white/30"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: activeTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-4" })
        ]
      }
    ),
    openSelect && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "menu",
        onClick: () => setOpenSelect(false),
        onKeyDown: handleKeyDown,
        className: "absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black",
        children: list.map((item) => {
          let key;
          if ("path" in item) key = item.path;
          else {
            const sortItem = item;
            key = sortItem.slug ?? sortItem.title;
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterItem, { item }, key);
        })
      }
    )
  ] });
}
function FilterItemList({ list }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:block", children: list.map((item) => {
    let key;
    if ("path" in item) {
      key = item.path;
    } else {
      const sortItem = item;
      key = sortItem.slug ?? sortItem.title;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterItem, { item }, key);
  }) });
}
function FilterList({
  list,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { children: [
    title ? /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "hidden text-neutral-500 text-xs md:block dark:text-neutral-400", children: title }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterItemList, { list }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterItemDropdown, { list }) })
  ] });
}
function CollectionList() {
  const { data: collections = [], isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    staleTime: 5 * 60 * 1e3
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionsSkeleton, {});
  }
  const collectionsWithoutRoot = collections.filter(
    (collection) => collection.path !== "/search"
  );
  const finalList = [
    { title: "All", path: "/search" },
    ...collectionsWithoutRoot
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FilterList, { list: finalList, title: "Collections" });
}
const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded-sm";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";
function CollectionsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, activeAndTitles) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, activeAndTitles) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(skeleton, items) })
  ] });
}
function Collections() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionList, {});
}
function SearchLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-first w-full flex-none md:max-w-[125px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collections, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-last min-h-screen w-full md:order-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-0 flex-none md:order-last md:w-[125px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterList, { list: sorting, title: "Sort by" }) })
  ] });
}
export {
  SearchLayout as component
};
