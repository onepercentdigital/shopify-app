import { o as jsxRuntimeExports } from "./worker-entry-C8G20BGl.js";
import { c as clsx, P as Price, I as Image } from "./router-EOe-sXrB.js";
const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom"
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: clsx(
        "@container/label absolute bottom-0 left-0 flex w-full px-4 pb-4",
        {
          "lg:px-20 lg:pb-[35%]": position === "center"
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-full border bg-white/70 p-1 font-semibold text-black text-xs backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Price,
          {
            className: "flex-none rounded-full bg-blue-600 p-2 text-white",
            amount,
            currencyCode,
            currencyCodeClassName: "hidden @[275px]/label:inline"
          }
        )
      ] })
    }
  );
};
function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  alt,
  fill,
  priority
}) {
  const imageClassName = clsx("relative h-full w-full object-contain", {
    "transition duration-300 ease-in-out group-hover:scale-105": isInteractive
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active
        }
      ),
      children: [
        src ? fill ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            src,
            alt,
            layout: "fullWidth",
            priority,
            className: imageClassName
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            src,
            alt,
            layout: "constrained",
            width: 800,
            height: 800,
            priority,
            className: imageClassName
          }
        ) : null,
        label ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            title: label.title,
            amount: label.amount,
            currencyCode: label.currencyCode,
            position: label.position
          }
        ) : null
      ]
    }
  );
}
export {
  GridTileImage as G
};
