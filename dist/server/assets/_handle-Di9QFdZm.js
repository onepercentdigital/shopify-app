import { a as reactExports, o as jsxRuntimeExports } from "./worker-entry-Cv73MfJc.js";
import { a as useSearch, I as Image, c as clsx, f as useCart, F as ForwardRef$2, P as Price, g as Route, b as useQuery, L as Link } from "./router-C6qVLgSF.js";
import { G as GridTileImage } from "./tile-BrLrGYX_.js";
import { P as Prose } from "./prose-BIIxNP5b.js";
import { j as getProduct, k as getProductRecommendations } from "./index-DrgtSF_4.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function ArrowLeftIcon({
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
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const ForwardRef$1 = /* @__PURE__ */ reactExports.forwardRef(ArrowLeftIcon);
function ArrowRightIcon({
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
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(ArrowRightIcon);
const ProductContext = reactExports.createContext(void 0);
function ProductProvider({ children }) {
  const searchParams = useSearch({ strict: false });
  const getInitialState = () => {
    if (!searchParams) return {};
    const params = {};
    for (const [key, value2] of Object.entries(searchParams)) {
      if (typeof value2 === "string") {
        params[key] = value2;
      }
    }
    return params;
  };
  const [state, setOptimisticState] = reactExports.useOptimistic(
    getInitialState(),
    (prevState, update) => ({
      ...prevState,
      ...update
    })
  );
  const updateOption = reactExports.useCallback(
    (name, value2) => {
      const newState = { [name]: value2 };
      setOptimisticState(newState);
      return { ...state, ...newState };
    },
    [setOptimisticState, state]
  );
  const updateImage = reactExports.useCallback(
    (index) => {
      const newState = { image: index };
      setOptimisticState(newState);
      return { ...state, ...newState };
    },
    [setOptimisticState, state]
  );
  const value = reactExports.useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state, updateOption, updateImage]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductContext.Provider, { value, children });
}
function useProduct() {
  const context = reactExports.useContext(ProductContext);
  if (context === void 0) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
function useUpdateURL() {
  return (state) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };
}
function Gallery({
  images
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image, 10) : 0;
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  const buttonClassName = "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square h-full max-h-[550px] w-full overflow-hidden", children: [
      images[imageIndex] && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          className: "h-full w-full object-contain",
          layout: "constrained",
          width: 550,
          height: 550,
          alt: images[imageIndex]?.altText,
          src: images[imageIndex]?.src,
          priority: true
        }
      ),
      images.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[15%] flex w-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              const newState = updateImage(previousImageIndex.toString());
              updateURL(newState);
            },
            "aria-label": "Previous product image",
            className: buttonClassName,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-6 w-px bg-neutral-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              const newState = updateImage(nextImageIndex.toString());
              updateURL(newState);
            },
            "aria-label": "Next product image",
            className: buttonClassName,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-5" })
          }
        )
      ] }) }) : null
    ] }),
    images.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-12 flex flex-wrap items-center justify-center gap-2 overflow-auto py-1 lg:mb-0", children: images.map((image, index) => {
      const isActive = index === imageIndex;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "h-20 w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            const newState = updateImage(index.toString());
            updateURL(newState);
          },
          "aria-label": "Select product image",
          className: "h-full w-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: clsx(
                "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black",
                {
                  "border-2 border-blue-600": isActive,
                  "border-neutral-200 dark:border-neutral-800": !isActive
                }
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Image,
                {
                  src: image.src,
                  alt: image.altText,
                  layout: "constrained",
                  width: 80,
                  height: 80,
                  className: "h-full w-full object-contain"
                }
              )
            }
          )
        }
      ) }, image.src);
    }) }) : null
  ] });
}
function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPending
}) {
  const buttonClasses = "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";
  if (!availableForSale) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: true, className: clsx(buttonClasses, disabledClasses), children: "Out Of Stock" });
  }
  if (!selectedVariantId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        "aria-label": "Please select an option",
        disabled: true,
        className: clsx(buttonClasses, disabledClasses),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-5" }) }),
          "Add To Cart"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "submit",
      "aria-label": "Add to cart",
      disabled: isPending,
      className: clsx(buttonClasses, {
        "hover:opacity-90": !isPending,
        [disabledClasses]: isPending
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-5" }) }),
        isPending ? "Adding..." : "Add To Cart"
      ]
    }
  );
}
function AddToCart({ product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const variant = variants.find(
    (variant2) => variant2.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : void 0;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant2) => variant2.id === selectedVariantId
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (finalVariant) {
      addCartItem(finalVariant, product);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SubmitButton,
    {
      availableForSale,
      selectedVariantId,
      isPending: false
    }
  ) });
}
function VariantSelector({
  options,
  variants
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption = !options.length || options.length === 1 && options[0]?.values.length === 1;
  if (hasNoOptionsOrJustOneOption) {
    return null;
  }
  const combinations = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value
      }),
      {}
    )
  }));
  return options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "mb-4 text-sm uppercase tracking-wide", children: option.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "flex flex-wrap gap-3", children: option.values.map((value) => {
      const optionNameLowerCase = option.name.toLowerCase();
      const optionParams = { ...state, [optionNameLowerCase]: value };
      const filtered = Object.entries(optionParams).filter(
        ([key, val]) => options.find(
          (opt) => opt.name.toLowerCase() === key && opt.values.includes(val)
        )
      );
      const isAvailableForSale = combinations.find(
        (combination) => filtered.every(
          ([key, val]) => combination[key] === val && combination.availableForSale
        )
      );
      const isActive = state[optionNameLowerCase] === value;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            const newState = updateOption(optionNameLowerCase, value);
            updateURL(newState);
          },
          "aria-disabled": !isAvailableForSale,
          disabled: !isAvailableForSale,
          title: `${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`,
          className: clsx(
            "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
            {
              "cursor-default ring-2 ring-blue-600": isActive,
              "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600": !isActive && isAvailableForSale,
              "before:-z-10 before:-rotate-45 relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:h-px before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700": !isAvailableForSale
            }
          ),
          children: value
        },
        value
      );
    }) })
  ] }) }, option.id));
}
function AddToCartSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 text-white tracking-wide opacity-60", children: "Add To Cart" });
}
function ProductDescription({ product }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col border-b pb-6 dark:border-neutral-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 font-medium text-5xl", children: product.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Price,
        {
          amount: product.priceRange.maxVariantPrice.amount,
          currencyCode: product.priceRange.maxVariantPrice.currencyCode
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VariantSelector, { options: product.options, variants: product.variants }),
    product.descriptionHtml ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Prose,
      {
        className: "mb-6 text-sm leading-tight dark:text-white/[60%]",
        html: product.descriptionHtml
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(AddToCartSkeleton, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddToCart, { product }) })
  ] });
}
function ProductPage() {
  const {
    handle
  } = Route.useParams();
  const {
    data: product
  } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => getProduct(handle),
    staleTime: 5 * 60 * 1e3
  });
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Product not found" });
  }
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url || "",
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ProductProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(productJsonLd)
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-(--breakpoint-2xl) px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full basis-full lg:basis-4/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gallery, { images: product.images.slice(0, 5).map((image) => ({
          src: image.url,
          altText: image.altText
        })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "basis-full lg:basis-2/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDescription, { product }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { id: product.id })
    ] })
  ] });
}
function RelatedProducts({
  id
}) {
  const {
    data: relatedProducts
  } = useQuery({
    queryKey: ["product-recommendations", id],
    queryFn: () => getProductRecommendations(id),
    staleTime: 5 * 60 * 1e3
  });
  if (!relatedProducts?.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-bold text-2xl", children: "Related Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex w-full gap-4 overflow-x-auto pt-1", children: relatedProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "aspect-square w-full flex-none sm:w-1/3 md:w-1/4 lg:w-1/5 min-[475px]:w-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "relative h-full w-full", to: "/product/$handle", params: {
      handle: product.handle
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GridTileImage, { alt: product.title, label: {
      title: product.title,
      amount: product.priceRange.maxVariantPrice.amount,
      currencyCode: product.priceRange.maxVariantPrice.currencyCode
    }, src: product.featuredImage?.url, fill: true }) }) }, product.handle)) })
  ] });
}
export {
  ProductPage as component
};
