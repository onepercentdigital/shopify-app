import { r as rootRouteId, i as invariant, t as trimPathLeft, j as joinPaths, a as reactExports, d as dummyMatchContext, m as matchContext, u as useRouterState, b as useRouter, g as getDefaultExportFromCjs, c as requireReactDom, e as useForwardedRef, f as useIntersectionObserver, h as functionalUpdate$1, k as exactPathTest, l as removeTrailingSlash, n as deepEqual, G as G$2, o as jsxRuntimeExports, w as warning, p as isModuleNotFoundError, R as RouterCore, q as isRedirect, T as TSS_SERVER_FUNCTION, s as getServerFnById, v as createServerFn, x as requireReact, y as React, O as Outlet, z as notFound } from "./worker-entry-Cv73MfJc.js";
import { o as objectType, s as stringType, n as numberType, g as getMenu, D as DEFAULT_OPTION, c as createUrl, a as getCollections, b as getPage, d as getCollectionProducts, e as sorting, f as defaultSort, h as getProducts, i as getCollection, H as HIDDEN_PRODUCT_TAG, j as getProduct, k as getProductRecommendations } from "./index-DrgtSF_4.js";
const preloadWarning = "Error preloading route! ☝️";
class BaseRoute {
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) {
        this._path = rootRouteId;
      } else if (!this.parentRoute) {
        invariant(
          false
        );
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") {
        path = trimPathLeft(path);
      }
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === rootRouteId) {
        path = "/";
      }
      if (id !== rootRouteId) {
        id = joinPaths(["/", id]);
      }
      const fullPath = id === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) {
        this.children = children;
      }
      if (typeof children === "object" && children !== null) {
        this.children = Object.values(children);
      }
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) {
      throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
    }
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class BaseRootRoute extends BaseRoute {
  constructor(options) {
    super(options);
  }
}
function useMatch(opts) {
  const nearestMatchId = reactExports.useContext(
    opts.from ? dummyMatchContext : matchContext
  );
  const matchSelection = useRouterState({
    select: (state) => {
      const match = state.matches.find(
        (d2) => opts.from ? opts.from === d2.routeId : d2.id === nearestMatchId
      );
      invariant(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s2) => {
      return opts.select ? opts.select(s2.loaderData) : s2.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s2) => {
      return select ? select(s2.loaderDeps) : s2.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback(
    (options) => {
      return router2.navigate({
        ...options,
        from: options.from ?? _defaultOpts?.from
      });
    },
    [_defaultOpts?.from, router2]
  );
}
var reactDomExports = requireReactDom();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const hasRenderFetched = reactExports.useRef(false);
  const innerRef = useForwardedRef(forwardedRef);
  const {
    // custom props
    activeProps,
    inactiveProps,
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    hashScrollIntoView,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    // prevent these from being returned
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    unsafeRelative: _unsafeRelative,
    from: _from,
    _fromLocation,
    ...propsSafeToSpread
  } = options;
  const currentSearch = useRouterState({
    select: (s2) => s2.location.search,
    structuralSharing: true
  });
  const from = options.from;
  const _options = reactExports.useMemo(
    () => {
      return { ...options, from };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      router2,
      currentSearch,
      from,
      options._fromLocation,
      options.hash,
      options.to,
      options.search,
      options.params,
      options.state,
      options.mask,
      options.unsafeRelative
    ]
  );
  const next = reactExports.useMemo(
    () => router2.buildLocation({ ..._options }),
    [router2, _options]
  );
  const hrefOption = reactExports.useMemo(() => {
    if (disabled) {
      return void 0;
    }
    let href = next.maskedLocation ? next.maskedLocation.url.href : next.url.href;
    let external = false;
    if (router2.origin) {
      if (href.startsWith(router2.origin)) {
        href = router2.history.createHref(href.replace(router2.origin, "")) || "/";
      } else {
        external = true;
      }
    }
    return { href, external };
  }, [disabled, next.maskedLocation, next.url, router2.origin, router2.history]);
  const externalLink = reactExports.useMemo(() => {
    if (hrefOption?.external) {
      return hrefOption.href;
    }
    try {
      new URL(to);
      return to;
    } catch {
    }
    return void 0;
  }, [to, hrefOption]);
  const preload = options.reloadDocument || externalLink ? false : userPreload ?? router2.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router2.options.defaultPreloadDelay ?? 0;
  const isActive = useRouterState({
    select: (s2) => {
      if (externalLink) return false;
      if (activeOptions?.exact) {
        const testExact = exactPathTest(
          s2.location.pathname,
          next.pathname,
          router2.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(
          s2.location.pathname,
          router2.basepath
        );
        const nextPathSplit = removeTrailingSlash(
          next.pathname,
          router2.basepath
        );
        const pathIsFuzzyEqual = currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/");
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      if (activeOptions?.includeSearch ?? true) {
        const searchTest = deepEqual(s2.location.search, next.search, {
          partial: !activeOptions?.exact,
          ignoreUndefined: !activeOptions?.explicitUndefined
        });
        if (!searchTest) {
          return false;
        }
      }
      if (activeOptions?.includeHash) {
        return s2.location.hash === next.hash;
      }
      return true;
    }
  });
  const doPreload = reactExports.useCallback(() => {
    router2.preloadRoute({ ..._options }).catch((err) => {
      console.warn(err);
      console.warn(preloadWarning);
    });
  }, [router2, _options]);
  const preloadViewportIoCallback = reactExports.useCallback(
    (entry) => {
      if (entry?.isIntersecting) {
        doPreload();
      }
    },
    [doPreload]
  );
  useIntersectionObserver(
    innerRef,
    preloadViewportIoCallback,
    intersectionObserverOptions,
    { disabled: !!disabled || !(preload === "viewport") }
  );
  reactExports.useEffect(() => {
    if (hasRenderFetched.current) {
      return;
    }
    if (!disabled && preload === "render") {
      doPreload();
      hasRenderFetched.current = true;
    }
  }, [disabled, doPreload, preload]);
  const handleClick = (e2) => {
    const elementTarget = e2.currentTarget.getAttribute("target");
    const effectiveTarget = target !== void 0 ? target : elementTarget;
    if (!disabled && !isCtrlEvent(e2) && !e2.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e2.button === 0) {
      e2.preventDefault();
      reactDomExports.flushSync(() => {
        setIsTransitioning(true);
      });
      const unsub = router2.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router2.navigate({
        ..._options,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  if (externalLink) {
    return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const handleFocus = (_2) => {
    if (disabled) return;
    if (preload) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e2) => {
    if (disabled || !preload) return;
    if (!preloadDelay) {
      doPreload();
    } else {
      const eventTarget = e2.target;
      if (timeoutMap.has(eventTarget)) {
        return;
      }
      const id = setTimeout(() => {
        timeoutMap.delete(eventTarget);
        doPreload();
      }, preloadDelay);
      timeoutMap.set(eventTarget, id);
    }
  };
  const handleLeave = (e2) => {
    if (disabled || !preload || !preloadDelay) return;
    const eventTarget = e2.target;
    const id = timeoutMap.get(eventTarget);
    if (id) {
      clearTimeout(id);
      timeoutMap.delete(eventTarget);
    }
  };
  const resolvedActiveProps = isActive ? functionalUpdate$1(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
  const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate$1(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = (style || resolvedActiveProps.style || resolvedInactiveProps.style) && {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  return {
    ...propsSafeToSpread,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: hrefOption?.href,
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onFocus: composeHandlers([onFocus, handleFocus]),
    onMouseEnter: composeHandlers([onMouseEnter, handleEnter]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...resolvedStyle && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && STATIC_DISABLED_PROPS,
    ...isActive && STATIC_ACTIVE_PROPS,
    ...isTransitioning && STATIC_TRANSITIONING_PROPS
  };
}
const STATIC_EMPTY_OBJECT = {};
const STATIC_ACTIVE_OBJECT = { className: "active" };
const STATIC_DISABLED_PROPS = { role: "link", "aria-disabled": true };
const STATIC_ACTIVE_PROPS = { "data-status": "active", "aria-current": "page" };
const STATIC_TRANSITIONING_PROPS = { "data-transitioning": "transitioning" };
const timeoutMap = /* @__PURE__ */ new WeakMap();
const intersectionObserverOptions = {
  rootMargin: "100px"
};
const composeHandlers = (handlers) => (e2) => {
  for (const handler of handlers) {
    if (!handler) continue;
    if (e2.defaultPrevented) return;
    handler(e2);
  }
};
const Link = reactExports.forwardRef(
  (props, ref) => {
    const { _asChild, ...rest } = props;
    const {
      type: _type,
      ref: innerRef,
      ...linkProps
    } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (_asChild === void 0) {
      delete linkProps.disabled;
    }
    return reactExports.createElement(
      _asChild ? _asChild : "a",
      {
        ...linkProps,
        ref: innerRef
      },
      children
    );
  }
);
function isCtrlEvent(e2) {
  return !!(e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey);
}
let Route$7 = class Route extends BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d2) => opts?.select ? opts.select(d2.context) : d2.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = G$2.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
};
function createRoute(options) {
  return new Route$7(
    // TODO: Help us TypeChris, you're our only hope!
    options
  );
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
class RootRoute extends BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d2) => opts?.select ? opts.select(d2.context) : d2.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = G$2.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  if (typeof path === "object") {
    return new FileRoute(path, {
      silent: true
    }).createRoute(path);
  }
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      warning(
        this.silent
      );
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({
        select: opts2?.select,
        from: this.options.id,
        structuralSharing: opts2?.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return useMatch({
        from: this.options.id,
        select: (d2) => opts2?.select ? opts2.select(d2.context) : d2.context
      });
    };
    this.useSearch = (opts2) => {
      return useSearch({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return useParams({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      const router2 = useRouter();
      return useNavigate({ from: router2.routesById[this.options.id].fullPath });
    };
    this.options = opts;
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createLazyFileRoute(id) {
  if (typeof id === "object") {
    return new LazyRoute(id);
  }
  return (opts) => new LazyRoute({ id, ...opts });
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName];
      }).catch((err) => {
        error = err;
        if (isModuleNotFoundError(error)) {
          if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
            const storageKey = `tanstack_router_reload:${error.message}`;
            if (!sessionStorage.getItem(storageKey)) {
              sessionStorage.setItem(storageKey, "1");
              reload = true;
            }
          }
        }
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) {
      throw error;
    }
    if (!comp) {
      if (reactExports.use) {
        reactExports.use(load());
      } else {
        throw load();
      }
    }
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
const createRouter = (options) => {
  return new Router(options);
};
class Router extends RouterCore {
  constructor(options) {
    super(options);
  }
}
if (typeof globalThis !== "undefined") {
  globalThis.createFileRoute = createFileRoute;
  globalThis.createLazyFileRoute = createLazyFileRoute;
} else if (typeof window !== "undefined") {
  window.createFileRoute = createFileRoute;
  window.createLazyFileRoute = createLazyFileRoute;
}
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
function Asset({
  tag,
  attrs,
  children,
  nonce
}) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", { ...attrs, suppressHydrationWarning: true, children });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { ...attrs, suppressHydrationWarning: true });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", { ...attrs, nonce, suppressHydrationWarning: true });
    case "style":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          nonce
        }
      );
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, { attrs, children });
    default:
      return null;
  }
}
function Script({
  attrs,
  children
}) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      const existingScript = Array.from(
        document.querySelectorAll("script[src]")
      ).find((el) => el.src === normSrc);
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) {
        if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
          script.setAttribute(
            key,
            typeof value === "boolean" ? "" : String(value)
          );
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      const existingScript = Array.from(
        document.querySelectorAll("script:not([src])")
      ).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      });
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
          if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
            script.setAttribute(
              key,
              typeof value === "boolean" ? "" : String(value)
            );
          }
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    return void 0;
  }, [attrs, children]);
  if (!router2.isServer) {
    const { src, ...rest } = attrs || {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: "" },
        ...rest
      }
    );
  }
  if (attrs?.src && typeof attrs.src === "string") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("script", { ...attrs, suppressHydrationWarning: true });
  }
  if (typeof children === "string") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        suppressHydrationWarning: true
      }
    );
  }
  return null;
}
const useTags = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const routeMeta = useRouterState({
    select: (state) => {
      return state.matches.map((match) => match.meta).filter(Boolean);
    }
  });
  const meta = reactExports.useMemo(() => {
    const resultMeta = [];
    const metaByAttribute = {};
    let title;
    for (let i2 = routeMeta.length - 1; i2 >= 0; i2--) {
      const metas = routeMeta[i2];
      for (let j2 = metas.length - 1; j2 >= 0; j2--) {
        const m2 = metas[j2];
        if (!m2) continue;
        if (m2.title) {
          if (!title) {
            title = {
              tag: "title",
              children: m2.title
            };
          }
        } else {
          const attribute = m2.name ?? m2.property;
          if (attribute) {
            if (metaByAttribute[attribute]) {
              continue;
            } else {
              metaByAttribute[attribute] = true;
            }
          }
          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m2,
              nonce
            }
          });
        }
      }
    }
    if (title) {
      resultMeta.push(title);
    }
    if (nonce) {
      resultMeta.push({
        tag: "meta",
        attrs: {
          property: "csp-nonce",
          content: nonce
        }
      });
    }
    resultMeta.reverse();
    return resultMeta;
  }, [routeMeta, nonce]);
  const links = useRouterState({
    select: (state) => {
      const constructed = state.matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
        tag: "link",
        attrs: {
          ...link,
          nonce
        }
      }));
      const manifest = router2.ssr?.manifest;
      const assets = state.matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map(
        (asset) => ({
          tag: "link",
          attrs: {
            ...asset.attrs,
            suppressHydrationWarning: true,
            nonce
          }
        })
      );
      return [...constructed, ...assets];
    },
    structuralSharing: true
  });
  const preloadLinks = useRouterState({
    select: (state) => {
      const preloadLinks2 = [];
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
          preloadLinks2.push({
            tag: "link",
            attrs: {
              rel: "modulepreload",
              href: preload,
              nonce
            }
          });
        })
      );
      return preloadLinks2;
    },
    structuralSharing: true
  });
  const styles = useRouterState({
    select: (state) => state.matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
      tag: "style",
      attrs,
      children,
      nonce
    })),
    structuralSharing: true
  });
  const headScripts = useRouterState({
    select: (state) => state.matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce
      },
      children
    })),
    structuralSharing: true
  });
  return uniqBy(
    [
      ...meta,
      ...preloadLinks,
      ...links,
      ...styles,
      ...headScripts
    ],
    (d2) => {
      return JSON.stringify(d2);
    }
  );
};
function HeadContent() {
  const tags = useTags();
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, { ...tag, key: `tsr-meta-${JSON.stringify(tag)}`, nonce }));
}
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
const Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const assetScripts = useRouterState({
    select: (state) => {
      const assetScripts2 = [];
      const manifest = router2.ssr?.manifest;
      if (!manifest) {
        return [];
      }
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => manifest.routes[route.id]?.assets?.filter((d2) => d2.tag === "script").forEach((asset) => {
          assetScripts2.push({
            tag: "script",
            attrs: { ...asset.attrs, nonce },
            children: asset.children
          });
        })
      );
      return assetScripts2;
    },
    structuralSharing: true
  });
  const { scripts } = useRouterState({
    select: (state) => ({
      scripts: state.matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
        tag: "script",
        attrs: {
          ...script,
          suppressHydrationWarning: true,
          nonce
        },
        children
      }))
    }),
    structuralSharing: true
  });
  let serverBufferedScript = void 0;
  if (router2.serverSsr) {
    serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  }
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) {
    allScripts.unshift(serverBufferedScript);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: allScripts.map((asset, i2) => /* @__PURE__ */ reactExports.createElement(Asset, { ...asset, key: `tsr-scripts-${asset.tag}-${i2}` })) });
};
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};
var defaultTimeoutProvider = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
  // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
  // type at app boot; and if we leave that type, then any new timer provider
  // would need to support ReturnType<typeof setTimeout>, which is infeasible.
  //
  // We settle for type safety for the TimeoutProvider type, and accept that
  // this class is unsafe internally to allow for extension.
  #provider = defaultTimeoutProvider;
  #providerCalled = false;
  setTimeoutProvider(provider) {
    this.#provider = provider;
  }
  setTimeout(callback, delay) {
    return this.#provider.setTimeout(callback, delay);
  }
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId);
  }
  setInterval(callback, delay) {
    return this.#provider.setInterval(callback, delay);
  }
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId);
  }
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_2, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a3, b2) {
  if (a3 === b2) {
    return true;
  }
  if (typeof a3 !== typeof b2) {
    return false;
  }
  if (a3 && b2 && typeof a3 === "object" && typeof b2 === "object") {
    return Object.keys(b2).every((key) => partialMatchKey(a3[key], b2[key]));
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a3, b2) {
  if (a3 === b2) {
    return a3;
  }
  const array = isPlainArray(a3) && isPlainArray(b2);
  if (!array && !(isPlainObject(a3) && isPlainObject(b2))) return b2;
  const aItems = array ? a3 : Object.keys(a3);
  const aSize = aItems.length;
  const bItems = array ? b2 : Object.keys(b2);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i2 = 0; i2 < bSize; i2++) {
    const key = array ? i2 : bItems[i2];
    const aItem = a3[key];
    const bItem = b2[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i2 < aSize : hasOwn.call(a3, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v2 = replaceEqualDeep(aItem, bItem);
    copy[key] = v2;
    if (v2 === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a3 : copy;
}
function shallowEqualObjects(a3, b2) {
  if (!b2 || Object.keys(a3).length !== Object.keys(b2).length) {
    return false;
  }
  for (const key in a3) {
    if (a3[key] !== b2[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o4) {
  if (!hasObjectPrototype(o4)) {
    return false;
  }
  const ctor = o4.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o4) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o4) {
  return Object.prototype.toString.call(o4) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") {
    return throwOnError(...params);
  }
  return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false;
  let signal;
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal();
      if (consumed) {
        return signal;
      }
      consumed = true;
      if (signal.aborted) {
        onCancelled();
      } else {
        signal.addEventListener("abort", onCancelled, { once: true });
      }
      return signal;
    }
  });
  return object;
}
var FocusManager = class extends Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
function tryResolveSync(promise) {
  let data;
  promise.then((result) => {
    data = result;
    return result;
  }, noop)?.catch(noop);
  if (data !== void 0) {
    return { data };
  }
  return void 0;
}
function defaultTransformerFn(data) {
  return data;
}
function dehydrateMutation(mutation) {
  return {
    mutationKey: mutation.options.mutationKey,
    state: mutation.state,
    ...mutation.options.scope && { scope: mutation.options.scope },
    ...mutation.meta && { meta: mutation.meta }
  };
}
function dehydrateQuery(query, serializeData, shouldRedactErrors) {
  const dehydratePromise = () => {
    const promise = query.promise?.then(serializeData).catch((error) => {
      if (!shouldRedactErrors(error)) {
        return Promise.reject(error);
      }
      return Promise.reject(new Error("redacted"));
    });
    promise?.catch(noop);
    return promise;
  };
  return {
    dehydratedAt: Date.now(),
    state: {
      ...query.state,
      ...query.state.data !== void 0 && {
        data: serializeData(query.state.data)
      }
    },
    queryKey: query.queryKey,
    queryHash: query.queryHash,
    ...query.state.status === "pending" && {
      promise: dehydratePromise()
    },
    ...query.meta && { meta: query.meta }
  };
}
function defaultShouldDehydrateMutation(mutation) {
  return mutation.state.isPaused;
}
function defaultShouldDehydrateQuery(query) {
  return query.state.status === "success";
}
function defaultShouldRedactErrors(_2) {
  return true;
}
function dehydrate(client, options = {}) {
  const filterMutation = options.shouldDehydrateMutation ?? client.getDefaultOptions().dehydrate?.shouldDehydrateMutation ?? defaultShouldDehydrateMutation;
  const mutations = client.getMutationCache().getAll().flatMap(
    (mutation) => filterMutation(mutation) ? [dehydrateMutation(mutation)] : []
  );
  const filterQuery = options.shouldDehydrateQuery ?? client.getDefaultOptions().dehydrate?.shouldDehydrateQuery ?? defaultShouldDehydrateQuery;
  const shouldRedactErrors = options.shouldRedactErrors ?? client.getDefaultOptions().dehydrate?.shouldRedactErrors ?? defaultShouldRedactErrors;
  const serializeData = options.serializeData ?? client.getDefaultOptions().dehydrate?.serializeData ?? defaultTransformerFn;
  const queries = client.getQueryCache().getAll().flatMap(
    (query) => filterQuery(query) ? [dehydrateQuery(query, serializeData, shouldRedactErrors)] : []
  );
  return { mutations, queries };
}
function hydrate(client, dehydratedState, options) {
  if (typeof dehydratedState !== "object" || dehydratedState === null) {
    return;
  }
  const mutationCache = client.getMutationCache();
  const queryCache = client.getQueryCache();
  const deserializeData = client.getDefaultOptions().hydrate?.deserializeData ?? defaultTransformerFn;
  const mutations = dehydratedState.mutations || [];
  const queries = dehydratedState.queries || [];
  mutations.forEach(({ state, ...mutationOptions }) => {
    mutationCache.build(
      client,
      {
        ...client.getDefaultOptions().hydrate?.mutations,
        ...options?.defaultOptions?.mutations,
        ...mutationOptions
      },
      state
    );
  });
  queries.forEach(
    ({ queryKey, state, queryHash, meta, promise, dehydratedAt }) => {
      const syncData = promise ? tryResolveSync(promise) : void 0;
      const rawData = state.data === void 0 ? syncData?.data : state.data;
      const data = rawData === void 0 ? rawData : deserializeData(rawData);
      let query = queryCache.get(queryHash);
      const existingQueryIsPending = query?.state.status === "pending";
      const existingQueryIsFetching = query?.state.fetchStatus === "fetching";
      if (query) {
        const hasNewerSyncData = syncData && // We only need this undefined check to handle older dehydration
        // payloads that might not have dehydratedAt
        dehydratedAt !== void 0 && dehydratedAt > query.state.dataUpdatedAt;
        if (state.dataUpdatedAt > query.state.dataUpdatedAt || hasNewerSyncData) {
          const { fetchStatus: _ignored, ...serializedState } = state;
          query.setState({
            ...serializedState,
            data
          });
        }
      } else {
        query = queryCache.build(
          client,
          {
            ...client.getDefaultOptions().hydrate?.queries,
            ...options?.defaultOptions?.queries,
            queryKey,
            queryHash,
            meta
          },
          // Reset fetch status to idle to avoid
          // query being stuck in fetching state upon hydration
          {
            ...state,
            data,
            fetchStatus: "idle",
            status: data !== void 0 ? "success" : state.status
          }
        );
      }
      if (promise && !existingQueryIsPending && !existingQueryIsFetching && // Only hydrate if dehydration is newer than any existing data,
      // this is always true for new queries
      (dehydratedAt === void 0 || dehydratedAt > query.state.dataUpdatedAt)) {
        query.fetch(void 0, {
          // RSC transformed promises are not thenable
          initialPromise: Promise.resolve(promise).then(deserializeData)
        }).catch(noop);
      }
    }
  );
}
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();
var OnlineManager = class extends Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  const thenable = pendingThenable();
  const isResolved = () => thenable.status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved()) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved()) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}
var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      this.#gcTimeout = timeoutManager.setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      timeoutManager.clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};
var Query = class extends Removable {
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState$1(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState$1(this.options);
      if (defaultState.data !== void 0) {
        this.setState(
          successState(defaultState.data, defaultState.dataUpdatedAt)
        );
        this.#initialState = defaultState;
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveEnabled(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x2) => x2.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x2) => x2.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x2) => x2 !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && // If the promise in the retyer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    this.#retryer?.status() !== "rejected") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x2) => x2.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    this.options.behavior?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) {
          this.setState({
            ...this.#revertState,
            fetchStatus: "idle"
          });
        }
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    try {
      const data = await this.#retryer.start();
      if (data === void 0) {
        if (false) ;
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      this.#cache.config.onSuccess?.(data, this);
      this.#cache.config.onSettled?.(
        data,
        this.state.error,
        this
      );
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) {
          return this.#retryer.promise;
        } else if (error.revert) {
          if (this.state.data === void 0) {
            throw error;
          }
          return this.state.data;
        }
      }
      this.#dispatch({
        type: "error",
        error
      });
      this.#cache.config.onError?.(
        error,
        this
      );
      this.#cache.config.onSettled?.(
        this.state.data,
        error,
        this
      );
      throw error;
    } finally {
      this.scheduleGc();
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          this.#revertState = action.manual ? newState : void 0;
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            // flag existing data as invalidated if we get a background error
            // note that "no data" always means stale so we can set unconditionally here
            isInvalidated: true
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState$1(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var QueryObserver = class extends Subscribable {
  constructor(client, options) {
    super();
    this.options = options;
    this.#client = client;
    this.#selectError = null;
    this.#currentThenable = pendingThenable();
    this.bindMethods();
    this.setOptions(options);
  }
  #client;
  #currentQuery = void 0;
  #currentQueryInitialState = void 0;
  #currentResult = void 0;
  #currentResultState;
  #currentResultOptions;
  #currentThenable;
  #selectError;
  #selectFn;
  #selectResult;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #lastQueryWithDefinedData;
  #staleTimeoutId;
  #refetchIntervalId;
  #currentRefetchInterval;
  #trackedProps = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.#currentQuery, this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }
      this.#updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#clearStaleTimeout();
    this.#clearRefetchInterval();
    this.#currentQuery.removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = this.#currentQuery;
    this.options = this.#client.defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, this.#currentQuery) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    this.#updateQuery();
    this.#currentQuery.setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      this.#client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.#currentQuery,
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      this.#currentQuery,
      prevQuery,
      this.options,
      prevOptions
    )) {
      this.#executeFetch();
    }
    this.updateResult();
    if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || resolveStaleTime(this.options.staleTime, this.#currentQuery) !== resolveStaleTime(prevOptions.staleTime, this.#currentQuery))) {
      this.#updateStaleTimeout();
    }
    const nextRefetchInterval = this.#computeRefetchInterval();
    if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
      this.#updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      this.#currentResult = result;
      this.#currentResultOptions = this.options;
      this.#currentResultState = this.#currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked?.(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
            this.#currentThenable.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    this.#trackedProps.add(key);
  }
  getCurrentQuery() {
    return this.#currentQuery;
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options);
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery();
    let promise = this.#currentQuery.fetch(
      this.options,
      fetchOptions
    );
    if (!fetchOptions?.throwOnError) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout();
    const staleTime = resolveStaleTime(
      this.options.staleTime,
      this.#currentQuery
    );
    if (isServer || this.#currentResult.isStale || !isValidTimeout(staleTime)) {
      return;
    }
    const time = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime);
    const timeout = time + 1;
    this.#staleTimeoutId = timeoutManager.setTimeout(() => {
      if (!this.#currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  #computeRefetchInterval() {
    return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval();
    this.#currentRefetchInterval = nextInterval;
    if (isServer || resolveEnabled(this.options.enabled, this.#currentQuery) === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
      return;
    }
    this.#refetchIntervalId = timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.#executeFetch();
      }
    }, this.#currentRefetchInterval);
  }
  #updateTimers() {
    this.#updateStaleTimeout();
    this.#updateRefetchInterval(this.#computeRefetchInterval());
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId) {
      timeoutManager.clearTimeout(this.#staleTimeoutId);
      this.#staleTimeoutId = void 0;
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId) {
      timeoutManager.clearInterval(this.#refetchIntervalId);
      this.#refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery;
    const prevOptions = this.options;
    const prevResult = this.#currentResult;
    const prevResultState = this.#currentResultState;
    const prevResultOptions = this.#currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          this.#lastQueryWithDefinedData?.state.data,
          this.#lastQueryWithDefinedData
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult?.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
        data = this.#selectResult;
      } else {
        try {
          this.#selectFn = options.select;
          data = options.select(data);
          data = replaceData(prevResult?.data, data, options);
          this.#selectResult = data;
          this.#selectError = null;
        } catch (selectError) {
          this.#selectError = selectError;
        }
      }
    }
    if (this.#selectError) {
      error = this.#selectError;
      data = this.#selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: this.#currentThenable,
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (thenable) => {
        if (nextResult.status === "error") {
          thenable.reject(nextResult.error);
        } else if (nextResult.data !== void 0) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = this.#currentThenable = nextResult.promise = pendingThenable();
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = this.#currentThenable;
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery, this.options);
    this.#currentResultState = this.#currentQuery.state;
    this.#currentResultOptions = this.options;
    if (this.#currentResultState.data !== void 0) {
      this.#lastQueryWithDefinedData = this.#currentQuery;
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    this.#currentResult = nextResult;
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? this.#trackedProps
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key;
        const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    this.#notify({ listeners: shouldNotifyListeners() });
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options);
    if (query === this.#currentQuery) {
      return;
    }
    const prevQuery = this.#currentQuery;
    this.#currentQuery = query;
    this.#currentQueryInitialState = query.state;
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      this.#updateTimers();
    }
  }
  #notify(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.#currentResult);
        });
      }
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated"
      });
    });
  }
};
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          addConsumeAwareSignal(
            object,
            () => context.signal,
            () => cancelled = true
          );
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
var Mutation = class extends Removable {
  #client;
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.#client = config.client;
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x2) => x2 !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        this.#dispatch({ type: "pending", variables, isPaused });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this,
          mutationFnContext
        );
        const context = await this.options.onMutate?.(
          variables,
          mutationFnContext
        );
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this,
        mutationFnContext
      );
      await this.options.onSuccess?.(
        data,
        variables,
        this.state.context,
        mutationFnContext
      );
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this,
        mutationFnContext
      );
      await this.options.onSettled?.(
        data,
        null,
        variables,
        this.state.context,
        mutationFnContext
      );
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this,
          mutationFnContext
        );
      } catch (e2) {
        void Promise.reject(e2);
      }
      try {
        await this.options.onError?.(
          error,
          variables,
          this.state.context,
          mutationFnContext
        );
      } catch (e2) {
        void Promise.reject(e2);
      }
      try {
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this,
          mutationFnContext
        );
      } catch (e2) {
        void Promise.reject(e2);
      }
      try {
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context,
          mutationFnContext
        );
      } catch (e2) {
        void Promise.reject(e2);
      }
      this.#dispatch({ type: "error", error });
      throw error;
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m2) => m2.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m2) => m2 !== mutation && m2.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x2) => x2.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}
var MutationObserver = class extends Subscribable {
  #client;
  #currentResult = void 0;
  #currentMutation;
  #mutateOptions;
  constructor(client, options) {
    super();
    this.#client = client;
    this.setOptions(options);
    this.bindMethods();
    this.#updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    this.options = this.#client.defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      this.#client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.#currentMutation,
        observer: this
      });
    }
    if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (this.#currentMutation?.state.status === "pending") {
      this.#currentMutation.setOptions(this.options);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#currentMutation?.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.#updateResult();
    this.#notify(action);
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  reset() {
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = void 0;
    this.#updateResult();
    this.#notify();
  }
  mutate(variables, options) {
    this.#mutateOptions = options;
    this.#currentMutation?.removeObserver(this);
    this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
    this.#currentMutation.addObserver(this);
    return this.#currentMutation.execute(variables);
  }
  #updateResult() {
    const state = this.#currentMutation?.state ?? getDefaultState();
    this.#currentResult = {
      ...state,
      isPending: state.status === "pending",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
  }
  #notify(action) {
    notifyManager.batch(() => {
      if (this.#mutateOptions && this.hasListeners()) {
        const variables = this.#currentResult.variables;
        const onMutateResult = this.#currentResult.context;
        const context = {
          client: this.#client,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        if (action?.type === "success") {
          try {
            this.#mutateOptions.onSuccess?.(
              action.data,
              variables,
              onMutateResult,
              context
            );
          } catch (e2) {
            void Promise.reject(e2);
          }
          try {
            this.#mutateOptions.onSettled?.(
              action.data,
              null,
              variables,
              onMutateResult,
              context
            );
          } catch (e2) {
            void Promise.reject(e2);
          }
        } else if (action?.type === "error") {
          try {
            this.#mutateOptions.onError?.(
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e2) {
            void Promise.reject(e2);
          }
          try {
            this.#mutateOptions.onSettled?.(
              void 0,
              action.error,
              variables,
              onMutateResult,
              context
            );
          } catch (e2) {
            void Promise.reject(e2);
          }
        }
      }
      this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
    });
  }
};
var QueryCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};
var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache();
    this.#mutationCache = config.mutationCache || new MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1) return;
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0) return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};
var QueryClientContext = reactExports.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = reactExports.useContext(QueryClientContext);
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  reactExports.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientContext.Provider, { value: client, children });
};
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer2, queryClient) {
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer2(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query?.promise
    );
    promise?.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function setupCoreRouterSsrQueryIntegration({
  router: router2,
  queryClient,
  handleRedirects = true
}) {
  const ogHydrate = router2.options.hydrate;
  const ogDehydrate = router2.options.dehydrate;
  if (router2.isServer) {
    const sentQueries = /* @__PURE__ */ new Set();
    const queryStream = createPushableStream();
    let unsubscribe = void 0;
    router2.options.dehydrate = async () => {
      router2.serverSsr.onRenderFinished(() => {
        queryStream.close();
        unsubscribe?.();
        unsubscribe = void 0;
      });
      const ogDehydrated = await ogDehydrate?.();
      const dehydratedRouter = {
        ...ogDehydrated,
        // prepare the stream for queries coming up during rendering
        queryStream: queryStream.stream
      };
      const dehydratedQueryClient = dehydrate(queryClient);
      if (dehydratedQueryClient.queries.length > 0) {
        dehydratedQueryClient.queries.forEach((query) => {
          sentQueries.add(query.queryHash);
        });
        dehydratedRouter.dehydratedQueryClient = dehydratedQueryClient;
      }
      return dehydratedRouter;
    };
    const ogClientOptions = queryClient.getDefaultOptions();
    queryClient.setDefaultOptions({
      ...ogClientOptions,
      dehydrate: {
        shouldDehydrateQuery: () => true,
        ...ogClientOptions.dehydrate
      }
    });
    unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (!router2.serverSsr?.isDehydrated()) {
        return;
      }
      if (sentQueries.has(event.query.queryHash)) {
        return;
      }
      if (!event.query.promise) {
        return;
      }
      if (queryStream.isClosed()) {
        console.warn(
          `tried to stream query ${event.query.queryHash} after stream was already closed`
        );
        return;
      }
      sentQueries.add(event.query.queryHash);
      queryStream.enqueue(
        dehydrate(queryClient, {
          shouldDehydrateQuery: (query) => {
            if (query.queryHash === event.query.queryHash) {
              return ogClientOptions.dehydrate?.shouldDehydrateQuery?.(query) ?? true;
            }
            return false;
          }
        })
      );
    });
  } else {
    router2.options.hydrate = async (dehydrated) => {
      await ogHydrate?.(dehydrated);
      if (dehydrated.dehydratedQueryClient) {
        hydrate(queryClient, dehydrated.dehydratedQueryClient);
      }
      const reader = dehydrated.queryStream.getReader();
      reader.read().then(async function handle({ done, value }) {
        hydrate(queryClient, value);
        if (done) {
          return;
        }
        const result = await reader.read();
        return handle(result);
      }).catch((err) => {
        console.error("Error reading query stream:", err);
      });
    };
    if (handleRedirects) {
      const ogMutationCacheConfig = queryClient.getMutationCache().config;
      queryClient.getMutationCache().config = {
        ...ogMutationCacheConfig,
        onError: (error, ...rest) => {
          if (isRedirect(error)) {
            error.options._fromLocation = router2.state.location;
            return router2.navigate(router2.resolveRedirect(error).options);
          }
          return ogMutationCacheConfig.onError?.(error, ...rest);
        }
      };
      const ogQueryCacheConfig = queryClient.getQueryCache().config;
      queryClient.getQueryCache().config = {
        ...ogQueryCacheConfig,
        onError: (error, ...rest) => {
          if (isRedirect(error)) {
            error.options._fromLocation = router2.state.location;
            return router2.navigate(router2.resolveRedirect(error).options);
          }
          return ogQueryCacheConfig.onError?.(error, ...rest);
        }
      };
    }
  }
}
function createPushableStream() {
  let controllerRef;
  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
    }
  });
  let _isClosed = false;
  return {
    stream,
    enqueue: (chunk) => controllerRef.enqueue(chunk),
    close: () => {
      controllerRef.close();
      _isClosed = true;
    },
    isClosed: () => _isClosed,
    error: (err) => controllerRef.error(err)
  };
}
function setupRouterSsrQueryIntegration(opts) {
  setupCoreRouterSsrQueryIntegration(opts);
  if (opts.wrapQueryClient === false) {
    return;
  }
  const OGWrap = opts.router.options.Wrap || reactExports.Fragment;
  opts.router.options.Wrap = ({ children }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: opts.queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OGWrap, { children }) });
  };
}
function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Products and collections: 5 minute stale time
        staleTime: 5 * 60 * 1e3,
        // Keep unused data for 30 minutes
        gcTime: 30 * 60 * 1e3
      }
    }
  });
  return { queryClient };
}
function Provider({
  children,
  queryClient
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children });
}
function __insertCSS(code) {
  if (typeof document == "undefined") return;
  let head = document.head || document.getElementsByTagName("head")[0];
  let style = document.createElement("style");
  style.type = "text/css";
  head.appendChild(style);
  style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
const getAsset = (type) => {
  switch (type) {
    case "success":
      return SuccessIcon;
    case "info":
      return InfoIcon;
    case "warning":
      return WarningIcon;
    case "error":
      return ErrorIcon;
    default:
      return null;
  }
};
const bars = Array(12).fill(0);
const Loader = ({ visible, className }) => {
  return /* @__PURE__ */ G$2.createElement("div", {
    className: [
      "sonner-loading-wrapper",
      className
    ].filter(Boolean).join(" "),
    "data-visible": visible
  }, /* @__PURE__ */ G$2.createElement("div", {
    className: "sonner-spinner"
  }, bars.map((_2, i2) => /* @__PURE__ */ G$2.createElement("div", {
    className: "sonner-loading-bar",
    key: `spinner-bar-${i2}`
  }))));
};
const SuccessIcon = /* @__PURE__ */ G$2.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ G$2.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
}));
const WarningIcon = /* @__PURE__ */ G$2.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ G$2.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
}));
const InfoIcon = /* @__PURE__ */ G$2.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ G$2.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
}));
const ErrorIcon = /* @__PURE__ */ G$2.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ G$2.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
}));
const CloseIcon = /* @__PURE__ */ G$2.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ G$2.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ G$2.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const useIsDocumentHidden = () => {
  const [isDocumentHidden, setIsDocumentHidden] = G$2.useState(document.hidden);
  G$2.useEffect(() => {
    const callback = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", callback);
    return () => window.removeEventListener("visibilitychange", callback);
  }, []);
  return isDocumentHidden;
};
let toastsCounter = 1;
class Observer {
  constructor() {
    this.subscribe = (subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);
      };
    };
    this.publish = (data) => {
      this.subscribers.forEach((subscriber) => subscriber(data));
    };
    this.addToast = (data) => {
      this.publish(data);
      this.toasts = [
        ...this.toasts,
        data
      ];
    };
    this.create = (data) => {
      var _data_id;
      const { message, ...rest } = data;
      const id = typeof (data == null ? void 0 : data.id) === "number" || ((_data_id = data.id) == null ? void 0 : _data_id.length) > 0 ? data.id : toastsCounter++;
      const alreadyExists = this.toasts.find((toast) => {
        return toast.id === id;
      });
      const dismissible = data.dismissible === void 0 ? true : data.dismissible;
      if (this.dismissedToasts.has(id)) {
        this.dismissedToasts.delete(id);
      }
      if (alreadyExists) {
        this.toasts = this.toasts.map((toast) => {
          if (toast.id === id) {
            this.publish({
              ...toast,
              ...data,
              id,
              title: message
            });
            return {
              ...toast,
              ...data,
              id,
              dismissible,
              title: message
            };
          }
          return toast;
        });
      } else {
        this.addToast({
          title: message,
          ...rest,
          dismissible,
          id
        });
      }
      return id;
    };
    this.dismiss = (id) => {
      if (id) {
        this.dismissedToasts.add(id);
        requestAnimationFrame(() => this.subscribers.forEach((subscriber) => subscriber({
          id,
          dismiss: true
        })));
      } else {
        this.toasts.forEach((toast) => {
          this.subscribers.forEach((subscriber) => subscriber({
            id: toast.id,
            dismiss: true
          }));
        });
      }
      return id;
    };
    this.message = (message, data) => {
      return this.create({
        ...data,
        message
      });
    };
    this.error = (message, data) => {
      return this.create({
        ...data,
        message,
        type: "error"
      });
    };
    this.success = (message, data) => {
      return this.create({
        ...data,
        type: "success",
        message
      });
    };
    this.info = (message, data) => {
      return this.create({
        ...data,
        type: "info",
        message
      });
    };
    this.warning = (message, data) => {
      return this.create({
        ...data,
        type: "warning",
        message
      });
    };
    this.loading = (message, data) => {
      return this.create({
        ...data,
        type: "loading",
        message
      });
    };
    this.promise = (promise, data) => {
      if (!data) {
        return;
      }
      let id = void 0;
      if (data.loading !== void 0) {
        id = this.create({
          ...data,
          promise,
          type: "loading",
          message: data.loading,
          description: typeof data.description !== "function" ? data.description : void 0
        });
      }
      const p2 = Promise.resolve(promise instanceof Function ? promise() : promise);
      let shouldDismiss = id !== void 0;
      let result;
      const originalPromise = p2.then(async (response) => {
        result = [
          "resolve",
          response
        ];
        const isReactElementResponse = G$2.isValidElement(response);
        if (isReactElementResponse) {
          shouldDismiss = false;
          this.create({
            id,
            type: "default",
            message: response
          });
        } else if (isHttpResponse(response) && !response.ok) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
          const description = typeof data.description === "function" ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !G$2.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (response instanceof Error) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(response) : data.error;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !G$2.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (data.success !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.success === "function" ? await data.success(response) : data.success;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !G$2.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "success",
            description,
            ...toastSettings
          });
        }
      }).catch(async (error) => {
        result = [
          "reject",
          error
        ];
        if (data.error !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(error) : data.error;
          const description = typeof data.description === "function" ? await data.description(error) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !G$2.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        }
      }).finally(() => {
        if (shouldDismiss) {
          this.dismiss(id);
          id = void 0;
        }
        data.finally == null ? void 0 : data.finally.call(data);
      });
      const unwrap = () => new Promise((resolve, reject) => originalPromise.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject));
      if (typeof id !== "string" && typeof id !== "number") {
        return {
          unwrap
        };
      } else {
        return Object.assign(id, {
          unwrap
        });
      }
    };
    this.custom = (jsx, data) => {
      const id = (data == null ? void 0 : data.id) || toastsCounter++;
      this.create({
        jsx: jsx(id),
        id,
        ...data
      });
      return id;
    };
    this.getActiveToasts = () => {
      return this.toasts.filter((toast) => !this.dismissedToasts.has(toast.id));
    };
    this.subscribers = [];
    this.toasts = [];
    this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const ToastState = new Observer();
const toastFunction = (message, data) => {
  const id = (data == null ? void 0 : data.id) || toastsCounter++;
  ToastState.addToast({
    title: message,
    ...data,
    id
  });
  return id;
};
const isHttpResponse = (data) => {
  return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
};
const basicToast = toastFunction;
const getHistory = () => ToastState.toasts;
const getToasts = () => ToastState.getActiveToasts();
Object.assign(basicToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
  custom: ToastState.custom,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading
}, {
  getHistory,
  getToasts
});
__insertCSS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function isAction(action) {
  return action.label !== void 0;
}
const VISIBLE_TOASTS_AMOUNT = 3;
const VIEWPORT_OFFSET = "24px";
const MOBILE_VIEWPORT_OFFSET = "16px";
const TOAST_LIFETIME = 4e3;
const TOAST_WIDTH = 356;
const GAP = 14;
const SWIPE_THRESHOLD = 45;
const TIME_BEFORE_UNMOUNT = 200;
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getDefaultSwipeDirections(position) {
  const [y2, x2] = position.split("-");
  const directions = [];
  if (y2) {
    directions.push(y2);
  }
  if (x2) {
    directions.push(x2);
  }
  return directions;
}
const Toast = (props) => {
  var _toast_classNames, _toast_classNames1, _toast_classNames2, _toast_classNames3, _toast_classNames4, _toast_classNames5, _toast_classNames6, _toast_classNames7, _toast_classNames8;
  const { invert: ToasterInvert, toast, unstyled, interacting, setHeights, visibleToasts, heights, index, toasts, expanded, removeToast, defaultRichColors, closeButton: closeButtonFromToaster, style, cancelButtonStyle, actionButtonStyle, className = "", descriptionClassName = "", duration: durationFromToaster, position, gap, expandByDefault, classNames, icons, closeButtonAriaLabel = "Close toast" } = props;
  const [swipeDirection, setSwipeDirection] = G$2.useState(null);
  const [swipeOutDirection, setSwipeOutDirection] = G$2.useState(null);
  const [mounted, setMounted] = G$2.useState(false);
  const [removed, setRemoved] = G$2.useState(false);
  const [swiping, setSwiping] = G$2.useState(false);
  const [swipeOut, setSwipeOut] = G$2.useState(false);
  const [isSwiped, setIsSwiped] = G$2.useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = G$2.useState(0);
  const [initialHeight, setInitialHeight] = G$2.useState(0);
  const remainingTime = G$2.useRef(toast.duration || durationFromToaster || TOAST_LIFETIME);
  const dragStartTime = G$2.useRef(null);
  const toastRef = G$2.useRef(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast.type;
  const dismissible = toast.dismissible !== false;
  const toastClassname = toast.className || "";
  const toastDescriptionClassname = toast.descriptionClassName || "";
  const heightIndex = G$2.useMemo(() => heights.findIndex((height) => height.toastId === toast.id) || 0, [
    heights,
    toast.id
  ]);
  const closeButton = G$2.useMemo(() => {
    var _toast_closeButton;
    return (_toast_closeButton = toast.closeButton) != null ? _toast_closeButton : closeButtonFromToaster;
  }, [
    toast.closeButton,
    closeButtonFromToaster
  ]);
  const duration = G$2.useMemo(() => toast.duration || durationFromToaster || TOAST_LIFETIME, [
    toast.duration,
    durationFromToaster
  ]);
  const closeTimerStartTimeRef = G$2.useRef(0);
  const offset = G$2.useRef(0);
  const lastCloseTimerStartTimeRef = G$2.useRef(0);
  const pointerStartRef = G$2.useRef(null);
  const [y2, x2] = position.split("-");
  const toastsHeightBefore = G$2.useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex) {
        return prev;
      }
      return prev + curr.height;
    }, 0);
  }, [
    heights,
    heightIndex
  ]);
  const isDocumentHidden = useIsDocumentHidden();
  const invert = toast.invert || ToasterInvert;
  const disabled = toastType === "loading";
  offset.current = G$2.useMemo(() => heightIndex * gap + toastsHeightBefore, [
    heightIndex,
    toastsHeightBefore
  ]);
  G$2.useEffect(() => {
    remainingTime.current = duration;
  }, [
    duration
  ]);
  G$2.useEffect(() => {
    setMounted(true);
  }, []);
  G$2.useEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;
      setInitialHeight(height);
      setHeights((h2) => [
        {
          toastId: toast.id,
          height,
          position: toast.position
        },
        ...h2
      ]);
      return () => setHeights((h2) => h2.filter((height2) => height2.toastId !== toast.id));
    }
  }, [
    setHeights,
    toast.id
  ]);
  G$2.useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = "auto";
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;
    setInitialHeight(newHeight);
    setHeights((heights2) => {
      const alreadyExists = heights2.find((height) => height.toastId === toast.id);
      if (!alreadyExists) {
        return [
          {
            toastId: toast.id,
            height: newHeight,
            position: toast.position
          },
          ...heights2
        ];
      } else {
        return heights2.map((height) => height.toastId === toast.id ? {
          ...height,
          height: newHeight
        } : height);
      }
    });
  }, [
    mounted,
    toast.title,
    toast.description,
    setHeights,
    toast.id,
    toast.jsx,
    toast.action,
    toast.cancel
  ]);
  const deleteToast = G$2.useCallback(() => {
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h2) => h2.filter((height) => height.toastId !== toast.id));
    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [
    toast,
    removeToast,
    setHeights,
    offset
  ]);
  G$2.useEffect(() => {
    if (toast.promise && toastType === "loading" || toast.duration === Infinity || toast.type === "loading") return;
    let timeoutId;
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.current;
        remainingTime.current = remainingTime.current - elapsedTime;
      }
      lastCloseTimerStartTimeRef.current = (/* @__PURE__ */ new Date()).getTime();
    };
    const startTimer = () => {
      if (remainingTime.current === Infinity) return;
      closeTimerStartTimeRef.current = (/* @__PURE__ */ new Date()).getTime();
      timeoutId = setTimeout(() => {
        toast.onAutoClose == null ? void 0 : toast.onAutoClose.call(toast, toast);
        deleteToast();
      }, remainingTime.current);
    };
    if (expanded || interacting || isDocumentHidden) {
      pauseTimer();
    } else {
      startTimer();
    }
    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    interacting,
    toast,
    toastType,
    isDocumentHidden,
    deleteToast
  ]);
  G$2.useEffect(() => {
    if (toast.delete) {
      deleteToast();
      toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
    }
  }, [
    deleteToast,
    toast.delete
  ]);
  function getLoadingIcon() {
    var _toast_classNames9;
    if (icons == null ? void 0 : icons.loading) {
      var _toast_classNames12;
      return /* @__PURE__ */ G$2.createElement("div", {
        className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames12 = toast.classNames) == null ? void 0 : _toast_classNames12.loader, "sonner-loader"),
        "data-visible": toastType === "loading"
      }, icons.loading);
    }
    return /* @__PURE__ */ G$2.createElement(Loader, {
      className: cn(classNames == null ? void 0 : classNames.loader, toast == null ? void 0 : (_toast_classNames9 = toast.classNames) == null ? void 0 : _toast_classNames9.loader),
      visible: toastType === "loading"
    });
  }
  const icon = toast.icon || (icons == null ? void 0 : icons[toastType]) || getAsset(toastType);
  var _toast_richColors, _icons_close;
  return /* @__PURE__ */ G$2.createElement("li", {
    tabIndex: 0,
    ref: toastRef,
    className: cn(className, toastClassname, classNames == null ? void 0 : classNames.toast, toast == null ? void 0 : (_toast_classNames = toast.classNames) == null ? void 0 : _toast_classNames.toast, classNames == null ? void 0 : classNames.default, classNames == null ? void 0 : classNames[toastType], toast == null ? void 0 : (_toast_classNames1 = toast.classNames) == null ? void 0 : _toast_classNames1[toastType]),
    "data-sonner-toast": "",
    "data-rich-colors": (_toast_richColors = toast.richColors) != null ? _toast_richColors : defaultRichColors,
    "data-styled": !Boolean(toast.jsx || toast.unstyled || unstyled),
    "data-mounted": mounted,
    "data-promise": Boolean(toast.promise),
    "data-swiped": isSwiped,
    "data-removed": removed,
    "data-visible": isVisible,
    "data-y-position": y2,
    "data-x-position": x2,
    "data-index": index,
    "data-front": isFront,
    "data-swiping": swiping,
    "data-dismissible": dismissible,
    "data-type": toastType,
    "data-invert": invert,
    "data-swipe-out": swipeOut,
    "data-swipe-direction": swipeOutDirection,
    "data-expanded": Boolean(expanded || expandByDefault && mounted),
    "data-testid": toast.testId,
    style: {
      "--index": index,
      "--toasts-before": index,
      "--z-index": toasts.length - index,
      "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
      "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
      ...style,
      ...toast.style
    },
    onDragEnd: () => {
      setSwiping(false);
      setSwipeDirection(null);
      pointerStartRef.current = null;
    },
    onPointerDown: (event) => {
      if (event.button === 2) return;
      if (disabled || !dismissible) return;
      dragStartTime.current = /* @__PURE__ */ new Date();
      setOffsetBeforeRemove(offset.current);
      event.target.setPointerCapture(event.pointerId);
      if (event.target.tagName === "BUTTON") return;
      setSwiping(true);
      pointerStartRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    },
    onPointerUp: () => {
      var _toastRef_current, _toastRef_current1, _dragStartTime_current;
      if (swipeOut || !dismissible) return;
      pointerStartRef.current = null;
      const swipeAmountX = Number(((_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0);
      const swipeAmountY = Number(((_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0);
      const timeTaken = (/* @__PURE__ */ new Date()).getTime() - ((_dragStartTime_current = dragStartTime.current) == null ? void 0 : _dragStartTime_current.getTime());
      const swipeAmount = swipeDirection === "x" ? swipeAmountX : swipeAmountY;
      const velocity = Math.abs(swipeAmount) / timeTaken;
      if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
        setOffsetBeforeRemove(offset.current);
        toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
        if (swipeDirection === "x") {
          setSwipeOutDirection(swipeAmountX > 0 ? "right" : "left");
        } else {
          setSwipeOutDirection(swipeAmountY > 0 ? "down" : "up");
        }
        deleteToast();
        setSwipeOut(true);
        return;
      } else {
        var _toastRef_current2, _toastRef_current3;
        (_toastRef_current2 = toastRef.current) == null ? void 0 : _toastRef_current2.style.setProperty("--swipe-amount-x", `0px`);
        (_toastRef_current3 = toastRef.current) == null ? void 0 : _toastRef_current3.style.setProperty("--swipe-amount-y", `0px`);
      }
      setIsSwiped(false);
      setSwiping(false);
      setSwipeDirection(null);
    },
    onPointerMove: (event) => {
      var _window_getSelection, _toastRef_current, _toastRef_current1;
      if (!pointerStartRef.current || !dismissible) return;
      const isHighlighted = ((_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString().length) > 0;
      if (isHighlighted) return;
      const yDelta = event.clientY - pointerStartRef.current.y;
      const xDelta = event.clientX - pointerStartRef.current.x;
      var _props_swipeDirections;
      const swipeDirections = (_props_swipeDirections = props.swipeDirections) != null ? _props_swipeDirections : getDefaultSwipeDirections(position);
      if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
        setSwipeDirection(Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y");
      }
      let swipeAmount = {
        x: 0,
        y: 0
      };
      const getDampening = (delta) => {
        const factor = Math.abs(delta) / 20;
        return 1 / (1.5 + factor);
      };
      if (swipeDirection === "y") {
        if (swipeDirections.includes("top") || swipeDirections.includes("bottom")) {
          if (swipeDirections.includes("top") && yDelta < 0 || swipeDirections.includes("bottom") && yDelta > 0) {
            swipeAmount.y = yDelta;
          } else {
            const dampenedDelta = yDelta * getDampening(yDelta);
            swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
          }
        }
      } else if (swipeDirection === "x") {
        if (swipeDirections.includes("left") || swipeDirections.includes("right")) {
          if (swipeDirections.includes("left") && xDelta < 0 || swipeDirections.includes("right") && xDelta > 0) {
            swipeAmount.x = xDelta;
          } else {
            const dampenedDelta = xDelta * getDampening(xDelta);
            swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
          }
        }
      }
      if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
        setIsSwiped(true);
      }
      (_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.setProperty("--swipe-amount-x", `${swipeAmount.x}px`);
      (_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.setProperty("--swipe-amount-y", `${swipeAmount.y}px`);
    }
  }, closeButton && !toast.jsx && toastType !== "loading" ? /* @__PURE__ */ G$2.createElement("button", {
    "aria-label": closeButtonAriaLabel,
    "data-disabled": disabled,
    "data-close-button": true,
    onClick: disabled || !dismissible ? () => {
    } : () => {
      deleteToast();
      toast.onDismiss == null ? void 0 : toast.onDismiss.call(toast, toast);
    },
    className: cn(classNames == null ? void 0 : classNames.closeButton, toast == null ? void 0 : (_toast_classNames2 = toast.classNames) == null ? void 0 : _toast_classNames2.closeButton)
  }, (_icons_close = icons == null ? void 0 : icons.close) != null ? _icons_close : CloseIcon) : null, (toastType || toast.icon || toast.promise) && toast.icon !== null && ((icons == null ? void 0 : icons[toastType]) !== null || toast.icon) ? /* @__PURE__ */ G$2.createElement("div", {
    "data-icon": "",
    className: cn(classNames == null ? void 0 : classNames.icon, toast == null ? void 0 : (_toast_classNames3 = toast.classNames) == null ? void 0 : _toast_classNames3.icon)
  }, toast.promise || toast.type === "loading" && !toast.icon ? toast.icon || getLoadingIcon() : null, toast.type !== "loading" ? icon : null) : null, /* @__PURE__ */ G$2.createElement("div", {
    "data-content": "",
    className: cn(classNames == null ? void 0 : classNames.content, toast == null ? void 0 : (_toast_classNames4 = toast.classNames) == null ? void 0 : _toast_classNames4.content)
  }, /* @__PURE__ */ G$2.createElement("div", {
    "data-title": "",
    className: cn(classNames == null ? void 0 : classNames.title, toast == null ? void 0 : (_toast_classNames5 = toast.classNames) == null ? void 0 : _toast_classNames5.title)
  }, toast.jsx ? toast.jsx : typeof toast.title === "function" ? toast.title() : toast.title), toast.description ? /* @__PURE__ */ G$2.createElement("div", {
    "data-description": "",
    className: cn(descriptionClassName, toastDescriptionClassname, classNames == null ? void 0 : classNames.description, toast == null ? void 0 : (_toast_classNames6 = toast.classNames) == null ? void 0 : _toast_classNames6.description)
  }, typeof toast.description === "function" ? toast.description() : toast.description) : null), /* @__PURE__ */ G$2.isValidElement(toast.cancel) ? toast.cancel : toast.cancel && isAction(toast.cancel) ? /* @__PURE__ */ G$2.createElement("button", {
    "data-button": true,
    "data-cancel": true,
    style: toast.cancelButtonStyle || cancelButtonStyle,
    onClick: (event) => {
      if (!isAction(toast.cancel)) return;
      if (!dismissible) return;
      toast.cancel.onClick == null ? void 0 : toast.cancel.onClick.call(toast.cancel, event);
      deleteToast();
    },
    className: cn(classNames == null ? void 0 : classNames.cancelButton, toast == null ? void 0 : (_toast_classNames7 = toast.classNames) == null ? void 0 : _toast_classNames7.cancelButton)
  }, toast.cancel.label) : null, /* @__PURE__ */ G$2.isValidElement(toast.action) ? toast.action : toast.action && isAction(toast.action) ? /* @__PURE__ */ G$2.createElement("button", {
    "data-button": true,
    "data-action": true,
    style: toast.actionButtonStyle || actionButtonStyle,
    onClick: (event) => {
      if (!isAction(toast.action)) return;
      toast.action.onClick == null ? void 0 : toast.action.onClick.call(toast.action, event);
      if (event.defaultPrevented) return;
      deleteToast();
    },
    className: cn(classNames == null ? void 0 : classNames.actionButton, toast == null ? void 0 : (_toast_classNames8 = toast.classNames) == null ? void 0 : _toast_classNames8.actionButton)
  }, toast.action.label) : null);
};
function getDocumentDirection() {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction;
  }
  return dirAttribute;
}
function assignOffset(defaultOffset, mobileOffset) {
  const styles = {};
  [
    defaultOffset,
    mobileOffset
  ].forEach((offset, index) => {
    const isMobile = index === 1;
    const prefix = isMobile ? "--mobile-offset" : "--offset";
    const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
    function assignAll(offset2) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((key) => {
        styles[`${prefix}-${key}`] = typeof offset2 === "number" ? `${offset2}px` : offset2;
      });
    }
    if (typeof offset === "number" || typeof offset === "string") {
      assignAll(offset);
    } else if (typeof offset === "object") {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((key) => {
        if (offset[key] === void 0) {
          styles[`${prefix}-${key}`] = defaultValue;
        } else {
          styles[`${prefix}-${key}`] = typeof offset[key] === "number" ? `${offset[key]}px` : offset[key];
        }
      });
    } else {
      assignAll(defaultValue);
    }
  });
  return styles;
}
const Toaster = /* @__PURE__ */ G$2.forwardRef(function Toaster2(props, ref) {
  const { id, invert, position = "bottom-right", hotkey = [
    "altKey",
    "KeyT"
  ], expand, closeButton, className, offset, mobileOffset, theme = "light", richColors, duration, style, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions, dir = getDocumentDirection(), gap = GAP, icons, containerAriaLabel = "Notifications" } = props;
  const [toasts, setToasts] = G$2.useState([]);
  const filteredToasts = G$2.useMemo(() => {
    if (id) {
      return toasts.filter((toast) => toast.toasterId === id);
    }
    return toasts.filter((toast) => !toast.toasterId);
  }, [
    toasts,
    id
  ]);
  const possiblePositions = G$2.useMemo(() => {
    return Array.from(new Set([
      position
    ].concat(filteredToasts.filter((toast) => toast.position).map((toast) => toast.position))));
  }, [
    filteredToasts,
    position
  ]);
  const [heights, setHeights] = G$2.useState([]);
  const [expanded, setExpanded] = G$2.useState(false);
  const [interacting, setInteracting] = G$2.useState(false);
  const [actualTheme, setActualTheme] = G$2.useState(theme !== "system" ? theme : typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light");
  const listRef = G$2.useRef(null);
  const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  const lastFocusedElementRef = G$2.useRef(null);
  const isFocusWithinRef = G$2.useRef(false);
  const removeToast = G$2.useCallback((toastToRemove) => {
    setToasts((toasts2) => {
      var _toasts_find;
      if (!((_toasts_find = toasts2.find((toast) => toast.id === toastToRemove.id)) == null ? void 0 : _toasts_find.delete)) {
        ToastState.dismiss(toastToRemove.id);
      }
      return toasts2.filter(({ id: id2 }) => id2 !== toastToRemove.id);
    });
  }, []);
  G$2.useEffect(() => {
    return ToastState.subscribe((toast) => {
      if (toast.dismiss) {
        requestAnimationFrame(() => {
          setToasts((toasts2) => toasts2.map((t2) => t2.id === toast.id ? {
            ...t2,
            delete: true
          } : t2));
        });
        return;
      }
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts((toasts2) => {
            const indexOfExistingToast = toasts2.findIndex((t2) => t2.id === toast.id);
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts2.slice(0, indexOfExistingToast),
                {
                  ...toasts2[indexOfExistingToast],
                  ...toast
                },
                ...toasts2.slice(indexOfExistingToast + 1)
              ];
            }
            return [
              toast,
              ...toasts2
            ];
          });
        });
      });
    });
  }, [
    toasts
  ]);
  G$2.useEffect(() => {
    if (theme !== "system") {
      setActualTheme(theme);
      return;
    }
    if (theme === "system") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setActualTheme("dark");
      } else {
        setActualTheme("light");
      }
    }
    if (typeof window === "undefined") return;
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      darkMediaQuery.addEventListener("change", ({ matches }) => {
        if (matches) {
          setActualTheme("dark");
        } else {
          setActualTheme("light");
        }
      });
    } catch (error) {
      darkMediaQuery.addListener(({ matches }) => {
        try {
          if (matches) {
            setActualTheme("dark");
          } else {
            setActualTheme("light");
          }
        } catch (e2) {
          console.error(e2);
        }
      });
    }
  }, [
    theme
  ]);
  G$2.useEffect(() => {
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [
    toasts
  ]);
  G$2.useEffect(() => {
    const handleKeyDown = (event) => {
      var _listRef_current;
      const isHotkeyPressed = hotkey.every((key) => event[key] || event.code === key);
      if (isHotkeyPressed) {
        var _listRef_current1;
        setExpanded(true);
        (_listRef_current1 = listRef.current) == null ? void 0 : _listRef_current1.focus();
      }
      if (event.code === "Escape" && (document.activeElement === listRef.current || ((_listRef_current = listRef.current) == null ? void 0 : _listRef_current.contains(document.activeElement)))) {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    hotkey
  ]);
  G$2.useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({
            preventScroll: true
          });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [
    listRef.current
  ]);
  return (
    // Remove item from normal navigation flow, only available via hotkey
    /* @__PURE__ */ G$2.createElement("section", {
      ref,
      "aria-label": `${containerAriaLabel} ${hotkeyLabel}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false",
      suppressHydrationWarning: true
    }, possiblePositions.map((position2, index) => {
      var _heights_;
      const [y2, x2] = position2.split("-");
      if (!filteredToasts.length) return null;
      return /* @__PURE__ */ G$2.createElement("ol", {
        key: position2,
        dir: dir === "auto" ? getDocumentDirection() : dir,
        tabIndex: -1,
        ref: listRef,
        className,
        "data-sonner-toaster": true,
        "data-sonner-theme": actualTheme,
        "data-y-position": y2,
        "data-x-position": x2,
        style: {
          "--front-toast-height": `${((_heights_ = heights[0]) == null ? void 0 : _heights_.height) || 0}px`,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${gap}px`,
          ...style,
          ...assignOffset(offset, mobileOffset)
        },
        onBlur: (event) => {
          if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
            isFocusWithinRef.current = false;
            if (lastFocusedElementRef.current) {
              lastFocusedElementRef.current.focus({
                preventScroll: true
              });
              lastFocusedElementRef.current = null;
            }
          }
        },
        onFocus: (event) => {
          const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
          if (isNotDismissible) return;
          if (!isFocusWithinRef.current) {
            isFocusWithinRef.current = true;
            lastFocusedElementRef.current = event.relatedTarget;
          }
        },
        onMouseEnter: () => setExpanded(true),
        onMouseMove: () => setExpanded(true),
        onMouseLeave: () => {
          if (!interacting) {
            setExpanded(false);
          }
        },
        onDragEnd: () => setExpanded(false),
        onPointerDown: (event) => {
          const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
          if (isNotDismissible) return;
          setInteracting(true);
        },
        onPointerUp: () => setInteracting(false)
      }, filteredToasts.filter((toast) => !toast.position && index === 0 || toast.position === position2).map((toast, index2) => {
        var _toastOptions_duration, _toastOptions_closeButton;
        return /* @__PURE__ */ G$2.createElement(Toast, {
          key: toast.id,
          icons,
          index: index2,
          toast,
          defaultRichColors: richColors,
          duration: (_toastOptions_duration = toastOptions == null ? void 0 : toastOptions.duration) != null ? _toastOptions_duration : duration,
          className: toastOptions == null ? void 0 : toastOptions.className,
          descriptionClassName: toastOptions == null ? void 0 : toastOptions.descriptionClassName,
          invert,
          visibleToasts,
          closeButton: (_toastOptions_closeButton = toastOptions == null ? void 0 : toastOptions.closeButton) != null ? _toastOptions_closeButton : closeButton,
          interacting,
          position: position2,
          style: toastOptions == null ? void 0 : toastOptions.style,
          unstyled: toastOptions == null ? void 0 : toastOptions.unstyled,
          classNames: toastOptions == null ? void 0 : toastOptions.classNames,
          cancelButtonStyle: toastOptions == null ? void 0 : toastOptions.cancelButtonStyle,
          actionButtonStyle: toastOptions == null ? void 0 : toastOptions.actionButtonStyle,
          closeButtonAriaLabel: toastOptions == null ? void 0 : toastOptions.closeButtonAriaLabel,
          removeToast,
          toasts: filteredToasts.filter((t2) => t2.position == toast.position),
          heights: heights.filter((h2) => h2.position == toast.position),
          setHeights,
          expandByDefault: expand,
          gap,
          expanded,
          swipeDirections: props.swipeDirections
        });
      }));
    }))
  );
});
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
createServerFn().handler(createSsrRpc("274cd802c5bd7003755661af6ce9586775d2bdf91eda7151ce8ee59403ae9383"));
const getCart = createServerFn().handler(createSsrRpc("b8dd0f36e8a3d268b2086b2789c8b5c9393da68f6d37cb77c92e1a348ae259ed"));
const createCartAndSetCookie = createServerFn({
  method: "POST"
}).handler(createSsrRpc("e04972e716e4eaa7d3250c0ad2a4fe74dca313e6c2b7f5f1a4485a9477a34ab8"));
const addItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  variantId: stringType()
})).handler(createSsrRpc("5cf9c3a6a631874951b2b70c723ae768c656f9d25c13e75f7589ea7e78ecffec"));
const removeItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lineId: stringType()
})).handler(createSsrRpc("993dd7626a82e831b418163daa2c6f73b30e30efc29a74db84b6d8d61acb95c4"));
const updateItemQuantity = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lineId: stringType(),
  merchandiseId: stringType(),
  quantity: numberType()
})).handler(createSsrRpc("0b91da24cdb686267c68b4f84c7dbc7483835cfdf55189086846ab394a92959a"));
const getCheckoutUrl = createServerFn().handler(createSsrRpc("5506db276d8244b0b69096c53b351b028859ab190bb23fa1fc32a67afff26576"));
const CartContext = reactExports.createContext(void 0);
function calculateItemCost(quantity, price) {
  return (Number(price) * quantity).toString();
}
function createEmptyCart() {
  return {
    id: void 0,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" }
    }
  };
}
function updateCartTotals(lines) {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";
  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode }
    }
  };
}
function CartProvider({ children }) {
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    staleTime: 0
    // Always refetch cart
  });
  const createCartMutation = useMutation({
    mutationFn: () => createCartAndSetCookie(),
    onSuccess: (newCart) => {
      queryClient.setQueryData(["cart"], newCart);
    }
  });
  const addItemMutation = useMutation({
    mutationFn: (variantId) => addItem({ data: { variantId } }),
    onMutate: async (variantId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);
      if (previousCart) {
        const existingItem = previousCart.lines.find(
          (item) => item.merchandise.id === variantId
        );
        let updatedLines;
        if (existingItem) {
          updatedLines = previousCart.lines.map(
            (item) => item.merchandise.id === variantId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedLines = previousCart.lines;
        }
        const totals = updateCartTotals(updatedLines);
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          ...totals,
          lines: updatedLines
        });
      }
      return { previousCart };
    },
    onError: (_err, _variantId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
  const updateItemMutation = useMutation({
    mutationFn: async ({
      lineId,
      merchandiseId,
      quantity
    }) => {
      if (quantity === 0) {
        return removeItem({ data: { lineId } });
      }
      return updateItemQuantity({ data: { lineId, merchandiseId, quantity } });
    },
    onMutate: async ({ merchandiseId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);
      if (previousCart) {
        let updatedLines;
        if (quantity === 0) {
          updatedLines = previousCart.lines.filter(
            (item) => item.merchandise.id !== merchandiseId
          );
        } else {
          updatedLines = previousCart.lines.map((item) => {
            if (item.merchandise.id === merchandiseId) {
              const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
              return {
                ...item,
                quantity,
                cost: {
                  ...item.cost,
                  totalAmount: {
                    ...item.cost.totalAmount,
                    amount: calculateItemCost(
                      quantity,
                      singleItemAmount.toString()
                    )
                  }
                }
              };
            }
            return item;
          });
        }
        const totals = updatedLines.length > 0 ? updateCartTotals(updatedLines) : createEmptyCart();
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          ...totals,
          lines: updatedLines
        });
      }
      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
  const removeItemMutation = useMutation({
    mutationFn: (lineId) => removeItem({ data: { lineId } }),
    onMutate: async (lineId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);
      if (previousCart) {
        const updatedLines = previousCart.lines.filter(
          (item) => item.id !== lineId
        );
        const totals = updatedLines.length > 0 ? updateCartTotals(updatedLines) : createEmptyCart();
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          ...totals,
          lines: updatedLines
        });
      }
      return { previousCart };
    },
    onError: (_err, _lineId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
  const updateCartItem = (merchandiseId, updateType) => {
    if (!cart) return;
    const item = cart.lines.find((i2) => i2.merchandise.id === merchandiseId);
    if (!item?.id) return;
    if (updateType === "delete") {
      removeItemMutation.mutate(item.id);
    } else {
      const newQuantity = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
      updateItemMutation.mutate({
        lineId: item.id,
        merchandiseId,
        quantity: newQuantity
      });
    }
  };
  const addCartItem = (variant, _product) => {
    if (!cart) {
      createCartMutation.mutate(void 0, {
        onSuccess: () => {
          addItemMutation.mutate(variant.id);
        }
      });
    } else {
      addItemMutation.mutate(variant.id);
    }
  };
  const isAddingItem = addItemMutation.isPending || createCartMutation.isPending;
  const value = reactExports.useMemo(
    () => ({
      cart,
      isLoading,
      isAddingItem,
      updateCartItem,
      addCartItem
    }),
    [cart, isLoading, isAddingItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value, children });
}
function useCart() {
  const context = reactExports.useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
function CopyrightYear() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const copyrightDate = `2025${currentYear > 2025 ? `-${currentYear}` : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: copyrightDate });
}
function r$6(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o4 = e2.length;
    for (t2 = 0; t2 < o4; t2++) e2[t2] && (f2 = r$6(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o4 = arguments.length; f2 < o4; f2++) (e2 = arguments[f2]) && (t2 = r$6(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function FooterMenuItem({ item }) {
  const location = useLocation();
  const active = location.pathname === item.path;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: item.path,
      className: clsx(
        "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300",
        {
          "text-black dark:text-neutral-300": active
        }
      ),
      children: item.title
    }
  ) });
}
function FooterMenu({ menu }) {
  if (!menu.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: menu.map((item) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FooterMenuItem, { item }, item.title);
  }) }) });
}
function LogoIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": `${process.env.SITE_NAME} logo`,
      viewBox: "0 0 32 28",
      ...props,
      className: clsx("h-4 w-4 fill-black dark:fill-white", props.className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Company Logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" })
      ]
    }
  );
}
function LogoSquare({ size }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: clsx(
        "flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm"
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LogoIcon,
        {
          className: clsx({
            "h-[16px] w-[16px]": !size,
            "h-[10px] w-[10px]": size === "sm"
          })
        }
      )
    }
  );
}
const SITE_NAME$3 = "Shopify Store";
function Footer() {
  const { data: menu = [] } = useQuery({
    queryKey: ["menu", "next-js-frontend-footer-menu"],
    queryFn: () => getMenu("next-js-frontend-footer-menu"),
    staleTime: 5 * 60 * 1e3
  });
  const copyrightName = SITE_NAME$3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-neutral-500 text-sm dark:text-neutral-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-7xl flex-col gap-6 border-neutral-200 border-t px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          className: "flex items-center gap-2 text-black md:pt-1 dark:text-white",
          to: "/",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogoSquare, { size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: SITE_NAME$3 })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterMenu, { menu }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          className: "flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-black text-xs dark:border-neutral-700 dark:bg-black dark:text-white",
          "aria-label": "Deploy on Vercel",
          href: "https://vercel.com/templates/next.js/nextjs-commerce",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3", children: "▲" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "h-full border-neutral-200 border-r dark:border-neutral-700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3", children: "Deploy" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-neutral-200 border-t py-6 text-sm dark:border-neutral-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyrightYear, {}),
        " ",
        copyrightName,
        copyrightName.length && !copyrightName.endsWith(".") ? "." : "",
        " ",
        "All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mx-4 hidden h-4 w-[1px] border-neutral-400 border-l md:inline-block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/vercel/commerce", children: "View the source" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "md:ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://vercel.com", className: "text-black dark:text-white", children: "Created by ▲ Vercel" }) })
    ] }) })
  ] });
}
var i$5 = Object.defineProperty;
var d$3 = (t2, e2, n2) => e2 in t2 ? i$5(t2, e2, { enumerable: true, configurable: true, writable: true, value: n2 }) : t2[e2] = n2;
var r$5 = (t2, e2, n2) => (d$3(t2, typeof e2 != "symbol" ? e2 + "" : e2, n2), n2);
let o$7 = class o {
  constructor() {
    r$5(this, "current", this.detect());
    r$5(this, "handoffState", "pending");
    r$5(this, "currentId", 0);
  }
  set(e2) {
    this.current !== e2 && (this.handoffState = "pending", this.currentId = 0, this.current = e2);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
let s$6 = new o$7();
function l$4(n2) {
  var u2;
  return s$6.isServer ? null : n2 == null ? document : (u2 = n2 == null ? void 0 : n2.ownerDocument) != null ? u2 : document;
}
function r$4(n2) {
  var u2, o4;
  return s$6.isServer ? null : n2 == null ? document : (o4 = (u2 = n2 == null ? void 0 : n2.getRootNode) == null ? void 0 : u2.call(n2)) != null ? o4 : document;
}
function e$3(n2) {
  var u2, o4;
  return (o4 = (u2 = r$4(n2)) == null ? void 0 : u2.activeElement) != null ? o4 : null;
}
function d$2(n2) {
  return e$3(n2) === n2;
}
function t$4(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o4) => setTimeout(() => {
    throw o4;
  }));
}
function o$6() {
  let s2 = [], r2 = { addEventListener(e2, t2, n2, i2) {
    return e2.addEventListener(t2, n2, i2), r2.add(() => e2.removeEventListener(t2, n2, i2));
  }, requestAnimationFrame(...e2) {
    let t2 = requestAnimationFrame(...e2);
    return r2.add(() => cancelAnimationFrame(t2));
  }, nextFrame(...e2) {
    return r2.requestAnimationFrame(() => r2.requestAnimationFrame(...e2));
  }, setTimeout(...e2) {
    let t2 = setTimeout(...e2);
    return r2.add(() => clearTimeout(t2));
  }, microTask(...e2) {
    let t2 = { current: true };
    return t$4(() => {
      t2.current && e2[0]();
    }), r2.add(() => {
      t2.current = false;
    });
  }, style(e2, t2, n2) {
    let i2 = e2.style.getPropertyValue(t2);
    return Object.assign(e2.style, { [t2]: n2 }), this.add(() => {
      Object.assign(e2.style, { [t2]: i2 });
    });
  }, group(e2) {
    let t2 = o$6();
    return e2(t2), this.add(() => t2.dispose());
  }, add(e2) {
    return s2.includes(e2) || s2.push(e2), () => {
      let t2 = s2.indexOf(e2);
      if (t2 >= 0) for (let n2 of s2.splice(t2, 1)) n2();
    };
  }, dispose() {
    for (let e2 of s2.splice(0)) e2();
  } };
  return r2;
}
function p$3() {
  let [e2] = reactExports.useState(o$6);
  return reactExports.useEffect(() => () => e2.dispose(), [e2]), e2;
}
let n$6 = (e2, t2) => {
  s$6.isServer ? reactExports.useEffect(e2, t2) : reactExports.useLayoutEffect(e2, t2);
};
function s$5(e2) {
  let r2 = reactExports.useRef(e2);
  return n$6(() => {
    r2.current = e2;
  }, [e2]), r2;
}
let o$5 = function(t2) {
  let e2 = s$5(t2);
  return G$2.useCallback((...r2) => e2.current(...r2), [e2]);
};
function n$5(e2) {
  return reactExports.useMemo(() => e2, Object.values(e2));
}
let e$2 = reactExports.createContext(void 0);
function a$a() {
  return reactExports.useContext(e$2);
}
function t$3(...r2) {
  return Array.from(new Set(r2.flatMap((n2) => typeof n2 == "string" ? n2.split(" ") : []))).filter(Boolean).join(" ");
}
function u$7(r2, n2, ...a3) {
  if (r2 in n2) {
    let e2 = n2[r2];
    return typeof e2 == "function" ? e2(...a3) : e2;
  }
  let t2 = new Error(`Tried to handle "${r2}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u$7), t2;
}
var A$2 = ((a3) => (a3[a3.None = 0] = "None", a3[a3.RenderStrategy = 1] = "RenderStrategy", a3[a3.Static = 2] = "Static", a3))(A$2 || {}), C$4 = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(C$4 || {});
function K() {
  let n2 = $$1();
  return reactExports.useCallback((r2) => U({ mergeRefs: n2, ...r2 }), [n2]);
}
function U({ ourProps: n2, theirProps: r2, slot: e2, defaultTag: a3, features: s2, visible: t2 = true, name: l2, mergeRefs: i2 }) {
  i2 = i2 != null ? i2 : I$5;
  let o4 = P$1(r2, n2);
  if (t2) return F(o4, e2, a3, l2, i2);
  let y2 = s2 != null ? s2 : 0;
  if (y2 & 2) {
    let { static: f2 = false, ...u2 } = o4;
    if (f2) return F(u2, e2, a3, l2, i2);
  }
  if (y2 & 1) {
    let { unmount: f2 = true, ...u2 } = o4;
    return u$7(f2 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return F({ ...u2, hidden: true, style: { display: "none" } }, e2, a3, l2, i2);
    } });
  }
  return F(o4, e2, a3, l2, i2);
}
function F(n2, r2 = {}, e2, a3, s2) {
  let { as: t2 = e2, children: l2, refName: i2 = "ref", ...o4 } = h$3(n2, ["unmount", "static"]), y2 = n2.ref !== void 0 ? { [i2]: n2.ref } : {}, f2 = typeof l2 == "function" ? l2(r2) : l2;
  "className" in o4 && o4.className && typeof o4.className == "function" && (o4.className = o4.className(r2)), o4["aria-labelledby"] && o4["aria-labelledby"] === o4.id && (o4["aria-labelledby"] = void 0);
  let u2 = {};
  if (r2) {
    let d2 = false, p2 = [];
    for (let [c2, T3] of Object.entries(r2)) typeof T3 == "boolean" && (d2 = true), T3 === true && p2.push(c2.replace(/([A-Z])/g, (g2) => `-${g2.toLowerCase()}`));
    if (d2) {
      u2["data-headlessui-state"] = p2.join(" ");
      for (let c2 of p2) u2[`data-${c2}`] = "";
    }
  }
  if (b$1(t2) && (Object.keys(m$3(o4)).length > 0 || Object.keys(m$3(u2)).length > 0)) if (!reactExports.isValidElement(f2) || Array.isArray(f2) && f2.length > 1 || D$2(f2)) {
    if (Object.keys(m$3(o4)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${a3} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(m$3(o4)).concat(Object.keys(m$3(u2))).map((d2) => `  - ${d2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d2) => `  - ${d2}`).join(`
`)].join(`
`));
  } else {
    let d2 = f2.props, p2 = d2 == null ? void 0 : d2.className, c2 = typeof p2 == "function" ? (...R) => t$3(p2(...R), o4.className) : t$3(p2, o4.className), T3 = c2 ? { className: c2 } : {}, g2 = P$1(f2.props, m$3(h$3(o4, ["ref"])));
    for (let R in u2) R in g2 && delete u2[R];
    return reactExports.cloneElement(f2, Object.assign({}, g2, u2, y2, { ref: s2(H$2(f2), y2.ref) }, T3));
  }
  return reactExports.createElement(t2, Object.assign({}, h$3(o4, ["ref"]), !b$1(t2) && y2, !b$1(t2) && u2), f2);
}
function $$1() {
  let n2 = reactExports.useRef([]), r2 = reactExports.useCallback((e2) => {
    for (let a3 of n2.current) a3 != null && (typeof a3 == "function" ? a3(e2) : a3.current = e2);
  }, []);
  return (...e2) => {
    if (!e2.every((a3) => a3 == null)) return n2.current = e2, r2;
  };
}
function I$5(...n2) {
  return n2.every((r2) => r2 == null) ? void 0 : (r2) => {
    for (let e2 of n2) e2 != null && (typeof e2 == "function" ? e2(r2) : e2.current = r2);
  };
}
function P$1(...n2) {
  if (n2.length === 0) return {};
  if (n2.length === 1) return n2[0];
  let r2 = {}, e2 = {};
  for (let s2 of n2) for (let t2 in s2) t2.startsWith("on") && typeof s2[t2] == "function" ? (e2[t2] != null || (e2[t2] = []), e2[t2].push(s2[t2])) : r2[t2] = s2[t2];
  if (r2.disabled || r2["aria-disabled"]) for (let s2 in e2) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s2) && (e2[s2] = [(t2) => {
    var l2;
    return (l2 = t2 == null ? void 0 : t2.preventDefault) == null ? void 0 : l2.call(t2);
  }]);
  for (let s2 in e2) Object.assign(r2, { [s2](t2, ...l2) {
    let i2 = e2[s2];
    for (let o4 of i2) {
      if ((t2 instanceof Event || (t2 == null ? void 0 : t2.nativeEvent) instanceof Event) && t2.defaultPrevented) return;
      o4(t2, ...l2);
    }
  } });
  return r2;
}
function Y(n2) {
  var r2;
  return Object.assign(reactExports.forwardRef(n2), { displayName: (r2 = n2.displayName) != null ? r2 : n2.name });
}
function m$3(n2) {
  let r2 = Object.assign({}, n2);
  for (let e2 in r2) r2[e2] === void 0 && delete r2[e2];
  return r2;
}
function h$3(n2, r2 = []) {
  let e2 = Object.assign({}, n2);
  for (let a3 of r2) a3 in e2 && delete e2[a3];
  return e2;
}
function H$2(n2) {
  return G$2.version.split(".")[0] >= "19" ? n2.props.ref : n2.ref;
}
function b$1(n2) {
  return n2 === reactExports.Fragment || n2 === /* @__PURE__ */ Symbol.for("react.fragment");
}
function D$2(n2) {
  return b$1(n2.type);
}
let a$9 = "span";
var s$4 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.Focusable = 2] = "Focusable", e2[e2.Hidden = 4] = "Hidden", e2))(s$4 || {});
function l$3(t2, r2) {
  var n2;
  let { features: d2 = 1, ...e2 } = t2, o4 = { ref: r2, "aria-hidden": (d2 & 2) === 2 ? true : (n2 = e2["aria-hidden"]) != null ? n2 : void 0, hidden: (d2 & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(d2 & 4) === 4 && (d2 & 2) !== 2 && { display: "none" } } };
  return K()({ ourProps: o4, theirProps: e2, slot: {}, defaultTag: a$9, name: "Hidden" });
}
let f$6 = Y(l$3);
function o$4(e2) {
  return typeof e2 != "object" || e2 === null ? false : "nodeType" in e2;
}
function t$2(e2) {
  return o$4(e2) && "tagName" in e2;
}
function n$4(e2) {
  return t$2(e2) && "accessKey" in e2;
}
function i$4(e2) {
  return t$2(e2) && "tabIndex" in e2;
}
function r$3(e2) {
  return t$2(e2) && "style" in e2;
}
function u$6(e2) {
  return n$4(e2) && e2.nodeName === "IFRAME";
}
function l$2(e2) {
  return n$4(e2) && e2.nodeName === "INPUT";
}
let u$5 = /* @__PURE__ */ Symbol();
function T$3(t2, n2 = true) {
  return Object.assign(t2, { [u$5]: n2 });
}
function y$2(...t2) {
  let n2 = reactExports.useRef(t2);
  reactExports.useEffect(() => {
    n2.current = t2;
  }, [t2]);
  let c2 = o$5((e2) => {
    for (let o4 of n2.current) o4 != null && (typeof o4 == "function" ? o4(e2) : o4.current = e2);
  });
  return t2.every((e2) => e2 == null || (e2 == null ? void 0 : e2[u$5])) ? void 0 : c2;
}
let a$8 = reactExports.createContext(null);
a$8.displayName = "DescriptionContext";
function f$5() {
  let r2 = reactExports.useContext(a$8);
  if (r2 === null) {
    let e2 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e2, f$5), e2;
  }
  return r2;
}
function H$1() {
  let [r2, e2] = reactExports.useState([]);
  return [r2.length > 0 ? r2.join(" ") : void 0, reactExports.useMemo(() => function(t2) {
    let i2 = o$5((n2) => (e2((o4) => [...o4, n2]), () => e2((o4) => {
      let s2 = o4.slice(), p2 = s2.indexOf(n2);
      return p2 !== -1 && s2.splice(p2, 1), s2;
    }))), l2 = reactExports.useMemo(() => ({ register: i2, slot: t2.slot, name: t2.name, props: t2.props, value: t2.value }), [i2, t2.slot, t2.name, t2.props, t2.value]);
    return G$2.createElement(a$8.Provider, { value: l2 }, t2.children);
  }, [e2])];
}
let I$4 = "p";
function C$3(r2, e2) {
  let c2 = reactExports.useId(), t2 = a$a(), { id: i2 = `headlessui-description-${c2}`, ...l2 } = r2, n2 = f$5(), o4 = y$2(e2);
  n$6(() => n2.register(i2), [i2, n2.register]);
  let s2 = n$5({ ...n2.slot, disabled: t2 || false }), p2 = { ref: o4, ...n2.props, id: i2 };
  return K()({ ourProps: p2, theirProps: l2, slot: s2, defaultTag: I$4, name: n2.name || "Description" });
}
let _$2 = Y(C$3), M$2 = Object.assign(_$2, {});
var o$3 = ((r2) => (r2.Space = " ", r2.Enter = "Enter", r2.Escape = "Escape", r2.Backspace = "Backspace", r2.Delete = "Delete", r2.ArrowLeft = "ArrowLeft", r2.ArrowUp = "ArrowUp", r2.ArrowRight = "ArrowRight", r2.ArrowDown = "ArrowDown", r2.Home = "Home", r2.End = "End", r2.PageUp = "PageUp", r2.PageDown = "PageDown", r2.Tab = "Tab", r2))(o$3 || {});
let e$1 = reactExports.createContext(() => {
});
function C$2({ value: t2, children: o4 }) {
  return G$2.createElement(e$1.Provider, { value: t2 }, o4);
}
let a$7 = class a extends Map {
  constructor(t2) {
    super();
    this.factory = t2;
  }
  get(t2) {
    let e2 = super.get(t2);
    return e2 === void 0 && (e2 = this.factory(t2), this.set(t2, e2)), e2;
  }
};
var h$2 = Object.defineProperty;
var v$1 = (t2, e2, r2) => e2 in t2 ? h$2(t2, e2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t2[e2] = r2;
var S$5 = (t2, e2, r2) => (v$1(t2, e2 + "", r2), r2), b = (t2, e2, r2) => {
  if (!e2.has(t2)) throw TypeError("Cannot " + r2);
};
var i$3 = (t2, e2, r2) => (b(t2, e2, "read from private field"), r2 ? r2.call(t2) : e2.get(t2)), c$5 = (t2, e2, r2) => {
  if (e2.has(t2)) throw TypeError("Cannot add the same private member more than once");
  e2 instanceof WeakSet ? e2.add(t2) : e2.set(t2, r2);
}, u$4 = (t2, e2, r2, s2) => (b(t2, e2, "write to private field"), e2.set(t2, r2), r2);
var n$3, a$6, o$2;
let T$2 = class T {
  constructor(e2) {
    c$5(this, n$3, {});
    c$5(this, a$6, new a$7(() => /* @__PURE__ */ new Set()));
    c$5(this, o$2, /* @__PURE__ */ new Set());
    S$5(this, "disposables", o$6());
    u$4(this, n$3, e2), s$6.isServer && this.disposables.microTask(() => {
      this.dispose();
    });
  }
  dispose() {
    this.disposables.dispose();
  }
  get state() {
    return i$3(this, n$3);
  }
  subscribe(e2, r2) {
    if (s$6.isServer) return () => {
    };
    let s2 = { selector: e2, callback: r2, current: e2(i$3(this, n$3)) };
    return i$3(this, o$2).add(s2), this.disposables.add(() => {
      i$3(this, o$2).delete(s2);
    });
  }
  on(e2, r2) {
    return s$6.isServer ? () => {
    } : (i$3(this, a$6).get(e2).add(r2), this.disposables.add(() => {
      i$3(this, a$6).get(e2).delete(r2);
    }));
  }
  send(e2) {
    let r2 = this.reduce(i$3(this, n$3), e2);
    if (r2 !== i$3(this, n$3)) {
      u$4(this, n$3, r2);
      for (let s2 of i$3(this, o$2)) {
        let l2 = s2.selector(i$3(this, n$3));
        j$3(s2.current, l2) || (s2.current = l2, s2.callback(l2));
      }
      for (let s2 of i$3(this, a$6).get(e2.type)) s2(i$3(this, n$3), e2);
    }
  }
};
n$3 = /* @__PURE__ */ new WeakMap(), a$6 = /* @__PURE__ */ new WeakMap(), o$2 = /* @__PURE__ */ new WeakMap();
function j$3(t2, e2) {
  return Object.is(t2, e2) ? true : typeof t2 != "object" || t2 === null || typeof e2 != "object" || e2 === null ? false : Array.isArray(t2) && Array.isArray(e2) ? t2.length !== e2.length ? false : f$4(t2[Symbol.iterator](), e2[Symbol.iterator]()) : t2 instanceof Map && e2 instanceof Map || t2 instanceof Set && e2 instanceof Set ? t2.size !== e2.size ? false : f$4(t2.entries(), e2.entries()) : p$2(t2) && p$2(e2) ? f$4(Object.entries(t2)[Symbol.iterator](), Object.entries(e2)[Symbol.iterator]()) : false;
}
function f$4(t2, e2) {
  do {
    let r2 = t2.next(), s2 = e2.next();
    if (r2.done && s2.done) return true;
    if (r2.done || s2.done || !Object.is(r2.value, s2.value)) return false;
  } while (true);
}
function p$2(t2) {
  if (Object.prototype.toString.call(t2) !== "[object Object]") return false;
  let e2 = Object.getPrototypeOf(t2);
  return e2 === null || Object.getPrototypeOf(e2) === null;
}
var a$5 = Object.defineProperty;
var r$2 = (e2, c2, t2) => c2 in e2 ? a$5(e2, c2, { enumerable: true, configurable: true, writable: true, value: t2 }) : e2[c2] = t2;
var p$1 = (e2, c2, t2) => (r$2(e2, typeof c2 != "symbol" ? c2 + "" : c2, t2), t2);
var k$1 = ((t2) => (t2[t2.Push = 0] = "Push", t2[t2.Pop = 1] = "Pop", t2))(k$1 || {});
let y$1 = { [0](e2, c2) {
  let t2 = c2.id, s2 = e2.stack, i2 = e2.stack.indexOf(t2);
  if (i2 !== -1) {
    let n2 = e2.stack.slice();
    return n2.splice(i2, 1), n2.push(t2), s2 = n2, { ...e2, stack: s2 };
  }
  return { ...e2, stack: [...e2.stack, t2] };
}, [1](e2, c2) {
  let t2 = c2.id, s2 = e2.stack.indexOf(t2);
  if (s2 === -1) return e2;
  let i2 = e2.stack.slice();
  return i2.splice(s2, 1), { ...e2, stack: i2 };
} };
let o$1 = class o2 extends T$2 {
  constructor() {
    super(...arguments);
    p$1(this, "actions", { push: (t2) => this.send({ type: 0, id: t2 }), pop: (t2) => this.send({ type: 1, id: t2 }) });
    p$1(this, "selectors", { isTop: (t2, s2) => t2.stack[t2.stack.length - 1] === s2, inStack: (t2, s2) => t2.stack.includes(s2) });
  }
  static new() {
    return new o2({ stack: [] });
  }
  reduce(t2, s2) {
    return u$7(s2.type, y$1, t2, s2);
  }
};
const x$4 = new a$7(() => o$1.new());
var withSelector = { exports: {} };
var useSyncExternalStoreWithSelector_production = {};
var hasRequiredUseSyncExternalStoreWithSelector_production;
function requireUseSyncExternalStoreWithSelector_production() {
  if (hasRequiredUseSyncExternalStoreWithSelector_production) return useSyncExternalStoreWithSelector_production;
  hasRequiredUseSyncExternalStoreWithSelector_production = 1;
  var React2 = requireReact();
  function is(x2, y2) {
    return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = React2.useSyncExternalStore, useRef = React2.useRef, useEffect = React2.useEffect, useMemo = React2.useMemo, useDebugValue = React2.useDebugValue;
  useSyncExternalStoreWithSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
    var instRef = useRef(null);
    if (null === instRef.current) {
      var inst = { hasValue: false, value: null };
      instRef.current = inst;
    } else inst = instRef.current;
    instRef = useMemo(
      function() {
        function memoizedSelector(nextSnapshot) {
          if (!hasMemo) {
            hasMemo = true;
            memoizedSnapshot = nextSnapshot;
            nextSnapshot = selector(nextSnapshot);
            if (void 0 !== isEqual && inst.hasValue) {
              var currentSelection = inst.value;
              if (isEqual(currentSelection, nextSnapshot))
                return memoizedSelection = currentSelection;
            }
            return memoizedSelection = nextSnapshot;
          }
          currentSelection = memoizedSelection;
          if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
          var nextSelection = selector(nextSnapshot);
          if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
            return memoizedSnapshot = nextSnapshot, currentSelection;
          memoizedSnapshot = nextSnapshot;
          return memoizedSelection = nextSelection;
        }
        var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
        return [
          function() {
            return memoizedSelector(getSnapshot());
          },
          null === maybeGetServerSnapshot ? void 0 : function() {
            return memoizedSelector(maybeGetServerSnapshot());
          }
        ];
      },
      [getSnapshot, getServerSnapshot, selector, isEqual]
    );
    var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
    useEffect(
      function() {
        inst.hasValue = true;
        inst.value = value;
      },
      [value]
    );
    useDebugValue(value);
    return value;
  };
  return useSyncExternalStoreWithSelector_production;
}
var hasRequiredWithSelector;
function requireWithSelector() {
  if (hasRequiredWithSelector) return withSelector.exports;
  hasRequiredWithSelector = 1;
  {
    withSelector.exports = requireUseSyncExternalStoreWithSelector_production();
  }
  return withSelector.exports;
}
var withSelectorExports = requireWithSelector();
function S$4(e2, n2, r2 = j$3) {
  return withSelectorExports.useSyncExternalStoreWithSelector(o$5((i2) => e2.subscribe(s$3, i2)), o$5(() => e2.state), o$5(() => e2.state), o$5(n2), r2);
}
function s$3(e2) {
  return e2;
}
function I$3(o4, s2) {
  let t2 = reactExports.useId(), r2 = x$4.get(s2), [i2, c2] = S$4(r2, reactExports.useCallback((e2) => [r2.selectors.isTop(e2, t2), r2.selectors.inStack(e2, t2)], [r2, t2]));
  return n$6(() => {
    if (o4) return r2.actions.push(t2), () => r2.actions.pop(t2);
  }, [r2, o4, t2]), o4 ? c2 ? i2 : true : false;
}
let f$3 = /* @__PURE__ */ new Map(), u$3 = /* @__PURE__ */ new Map();
function h$1(t2) {
  var e2;
  let r2 = (e2 = u$3.get(t2)) != null ? e2 : 0;
  return u$3.set(t2, r2 + 1), r2 !== 0 ? () => m$2(t2) : (f$3.set(t2, { "aria-hidden": t2.getAttribute("aria-hidden"), inert: t2.inert }), t2.setAttribute("aria-hidden", "true"), t2.inert = true, () => m$2(t2));
}
function m$2(t2) {
  var i2;
  let r2 = (i2 = u$3.get(t2)) != null ? i2 : 1;
  if (r2 === 1 ? u$3.delete(t2) : u$3.set(t2, r2 - 1), r2 !== 1) return;
  let e2 = f$3.get(t2);
  e2 && (e2["aria-hidden"] === null ? t2.removeAttribute("aria-hidden") : t2.setAttribute("aria-hidden", e2["aria-hidden"]), t2.inert = e2.inert, f$3.delete(t2));
}
function y(t2, { allowed: r2, disallowed: e2 } = {}) {
  let i2 = I$3(t2, "inert-others");
  n$6(() => {
    var d2, c2;
    if (!i2) return;
    let a3 = o$6();
    for (let n2 of (d2 = e2 == null ? void 0 : e2()) != null ? d2 : []) n2 && a3.add(h$1(n2));
    let s2 = (c2 = r2 == null ? void 0 : r2()) != null ? c2 : [];
    for (let n2 of s2) {
      if (!n2) continue;
      let l2 = l$4(n2);
      if (!l2) continue;
      let o4 = n2.parentElement;
      for (; o4 && o4 !== l2.body; ) {
        for (let p2 of o4.children) s2.some((E2) => p2.contains(E2)) || a3.add(h$1(p2));
        o4 = o4.parentElement;
      }
    }
    return a3.dispose;
  }, [i2, r2, e2]);
}
function p(s2, n2, o4) {
  let i2 = s$5((t2) => {
    let e2 = t2.getBoundingClientRect();
    e2.x === 0 && e2.y === 0 && e2.width === 0 && e2.height === 0 && o4();
  });
  reactExports.useEffect(() => {
    if (!s2) return;
    let t2 = n2 === null ? null : n$4(n2) ? n2 : n2.current;
    if (!t2) return;
    let e2 = o$6();
    if (typeof ResizeObserver != "undefined") {
      let r2 = new ResizeObserver(() => i2.current(t2));
      r2.observe(t2), e2.add(() => r2.disconnect());
    }
    if (typeof IntersectionObserver != "undefined") {
      let r2 = new IntersectionObserver(() => i2.current(t2));
      r2.observe(t2), e2.add(() => r2.disconnect());
    }
    return () => e2.dispose();
  }, [n2, i2, s2]);
}
let E$1 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "details>summary", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(","), S$3 = ["[data-autofocus]"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var T$1 = ((o4) => (o4[o4.First = 1] = "First", o4[o4.Previous = 2] = "Previous", o4[o4.Next = 4] = "Next", o4[o4.Last = 8] = "Last", o4[o4.WrapAround = 16] = "WrapAround", o4[o4.NoScroll = 32] = "NoScroll", o4[o4.AutoFocus = 64] = "AutoFocus", o4))(T$1 || {}), A$1 = ((n2) => (n2[n2.Error = 0] = "Error", n2[n2.Overflow = 1] = "Overflow", n2[n2.Success = 2] = "Success", n2[n2.Underflow = 3] = "Underflow", n2))(A$1 || {}), O$1 = ((t2) => (t2[t2.Previous = -1] = "Previous", t2[t2.Next = 1] = "Next", t2))(O$1 || {});
function x$3(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(E$1)).sort((r2, t2) => Math.sign((r2.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function h(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(S$3)).sort((r2, t2) => Math.sign((r2.tabIndex || Number.MAX_SAFE_INTEGER) - (t2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var I$2 = ((t2) => (t2[t2.Strict = 0] = "Strict", t2[t2.Loose = 1] = "Loose", t2))(I$2 || {});
function H(e2, r2 = 0) {
  var t2;
  return e2 === ((t2 = l$4(e2)) == null ? void 0 : t2.body) ? false : u$7(r2, { [0]() {
    return e2.matches(E$1);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(E$1)) return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
var g = ((t2) => (t2[t2.Keyboard = 0] = "Keyboard", t2[t2.Mouse = 1] = "Mouse", t2))(g || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e2) => {
  e2.metaKey || e2.altKey || e2.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e2) => {
  e2.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e2.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function w$4(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let _$1 = ["textarea", "input"].join(",");
function P(e2) {
  var r2, t2;
  return (t2 = (r2 = e2 == null ? void 0 : e2.matches) == null ? void 0 : r2.call(e2, _$1)) != null ? t2 : false;
}
function G$1(e2, r2 = (t2) => t2) {
  return e2.slice().sort((t2, l2) => {
    let n2 = r2(t2), a3 = r2(l2);
    if (n2 === null || a3 === null) return 0;
    let u2 = n2.compareDocumentPosition(a3);
    return u2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : u2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v(e2, r2, { sorted: t2 = true, relativeTo: l2 = null, skipElements: n2 = [] } = {}) {
  let a3 = Array.isArray(e2) ? e2.length > 0 ? r$4(e2[0]) : document : r$4(e2), u2 = Array.isArray(e2) ? t2 ? G$1(e2) : e2 : r2 & 64 ? h(e2) : x$3(e2);
  n2.length > 0 && u2.length > 1 && (u2 = u2.filter((i2) => !n2.some((d2) => d2 != null && "current" in d2 ? (d2 == null ? void 0 : d2.current) === i2 : d2 === i2))), l2 = l2 != null ? l2 : a3 == null ? void 0 : a3.activeElement;
  let o4 = (() => {
    if (r2 & 5) return 1;
    if (r2 & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), M2 = (() => {
    if (r2 & 1) return 0;
    if (r2 & 2) return Math.max(0, u2.indexOf(l2)) - 1;
    if (r2 & 4) return Math.max(0, u2.indexOf(l2)) + 1;
    if (r2 & 8) return u2.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), N2 = r2 & 32 ? { preventScroll: true } : {}, m2 = 0, c2 = u2.length, s2;
  do {
    if (m2 >= c2 || m2 + c2 <= 0) return 0;
    let i2 = M2 + m2;
    if (r2 & 16) i2 = (i2 + c2) % c2;
    else {
      if (i2 < 0) return 3;
      if (i2 >= c2) return 1;
    }
    s2 = u2[i2], s2 == null || s2.focus(N2), m2 += o4;
  } while (s2 !== e$3(s2));
  return r2 & 6 && P(s2) && s2.select(), 2;
}
function t$1() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i$2() {
  return /Android/gi.test(window.navigator.userAgent);
}
function n$2() {
  return t$1() || i$2();
}
function i$1(t2, e2, o4, n2) {
  let u2 = s$5(o4);
  reactExports.useEffect(() => {
    if (!t2) return;
    function r2(m2) {
      u2.current(m2);
    }
    return document.addEventListener(e2, r2, n2), () => document.removeEventListener(e2, r2, n2);
  }, [t2, e2, n2]);
}
function s$2(t2, e2, o4, n2) {
  let i2 = s$5(o4);
  reactExports.useEffect(() => {
    if (!t2) return;
    function r2(d2) {
      i2.current(d2);
    }
    return window.addEventListener(e2, r2, n2), () => window.removeEventListener(e2, r2, n2);
  }, [t2, e2, n2]);
}
const C$1 = 30;
function k(o4, f2, h2) {
  let m2 = s$5(h2), s2 = reactExports.useCallback(function(e2, c2) {
    if (e2.defaultPrevented) return;
    let r2 = c2(e2);
    if (r2 === null || !r2.getRootNode().contains(r2) || !r2.isConnected) return;
    let M2 = (function u2(n2) {
      return typeof n2 == "function" ? u2(n2()) : Array.isArray(n2) || n2 instanceof Set ? n2 : [n2];
    })(f2);
    for (let u2 of M2) if (u2 !== null && (u2.contains(r2) || e2.composed && e2.composedPath().includes(u2))) return;
    return !H(r2, I$2.Loose) && r2.tabIndex !== -1 && e2.preventDefault(), m2.current(e2, r2);
  }, [m2, f2]), i2 = reactExports.useRef(null);
  i$1(o4, "pointerdown", (t2) => {
    var e2, c2;
    n$2() || (i2.current = ((c2 = (e2 = t2.composedPath) == null ? void 0 : e2.call(t2)) == null ? void 0 : c2[0]) || t2.target);
  }, true), i$1(o4, "pointerup", (t2) => {
    if (n$2() || !i2.current) return;
    let e2 = i2.current;
    return i2.current = null, s2(t2, () => e2);
  }, true);
  let l2 = reactExports.useRef({ x: 0, y: 0 });
  i$1(o4, "touchstart", (t2) => {
    l2.current.x = t2.touches[0].clientX, l2.current.y = t2.touches[0].clientY;
  }, true), i$1(o4, "touchend", (t2) => {
    let e2 = { x: t2.changedTouches[0].clientX, y: t2.changedTouches[0].clientY };
    if (!(Math.abs(e2.x - l2.current.x) >= C$1 || Math.abs(e2.y - l2.current.y) >= C$1)) return s2(t2, () => i$4(t2.target) ? t2.target : null);
  }, true), s$2(o4, "blur", (t2) => s2(t2, () => u$6(window.document.activeElement) ? window.document.activeElement : null), true);
}
function u$2(...e2) {
  return reactExports.useMemo(() => l$4(...e2), [...e2]);
}
function E(n2, e2, a3, t2) {
  let i2 = s$5(a3);
  reactExports.useEffect(() => {
    n2 = n2 != null ? n2 : window;
    function r2(o4) {
      i2.current(o4);
    }
    return n2.addEventListener(e2, r2, t2), () => n2.removeEventListener(e2, r2, t2);
  }, [n2, e2, t2]);
}
function o3(t2) {
  return reactExports.useSyncExternalStore(t2.subscribe, t2.getSnapshot, t2.getSnapshot);
}
function a$4(o4, r2) {
  let t2 = o4(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s2) {
    let i2 = r2[e2].call(t2, ...s2);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function d$1() {
  let r2;
  return { before({ doc: e2 }) {
    var l2;
    let o4 = e2.documentElement, t2 = (l2 = e2.defaultView) != null ? l2 : window;
    r2 = Math.max(0, t2.innerWidth - o4.clientWidth);
  }, after({ doc: e2, d: o4 }) {
    let t2 = e2.documentElement, l2 = Math.max(0, t2.clientWidth - t2.offsetWidth), n2 = Math.max(0, r2 - l2);
    o4.style(t2, "paddingRight", `${n2}px`);
  } };
}
function w$3() {
  return t$1() ? { before({ doc: o4, d: r2, meta: m2 }) {
    function a3(s2) {
      for (let l2 of m2().containers) for (let c2 of l2()) if (c2.contains(s2)) return true;
      return false;
    }
    r2.microTask(() => {
      var c2;
      if (window.getComputedStyle(o4.documentElement).scrollBehavior !== "auto") {
        let t2 = o$6();
        t2.style(o4.documentElement, "scrollBehavior", "auto"), r2.add(() => r2.microTask(() => t2.dispose()));
      }
      let s2 = (c2 = window.scrollY) != null ? c2 : window.pageYOffset, l2 = null;
      r2.addEventListener(o4, "click", (t2) => {
        if (i$4(t2.target)) try {
          let e2 = t2.target.closest("a");
          if (!e2) return;
          let { hash: n2 } = new URL(e2.href), f2 = o4.querySelector(n2);
          i$4(f2) && !a3(f2) && (l2 = f2);
        } catch {
        }
      }, true), r2.group((t2) => {
        r2.addEventListener(o4, "touchstart", (e2) => {
          if (t2.dispose(), i$4(e2.target) && r$3(e2.target)) if (a3(e2.target)) {
            let n2 = e2.target;
            for (; n2.parentElement && a3(n2.parentElement); ) n2 = n2.parentElement;
            t2.style(n2, "overscrollBehavior", "contain");
          } else t2.style(e2.target, "touchAction", "none");
        });
      }), r2.addEventListener(o4, "touchmove", (t2) => {
        if (i$4(t2.target)) {
          if (l$2(t2.target)) return;
          if (a3(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && e2.dataset.headlessuiPortal !== "" && !(e2.scrollHeight > e2.clientHeight || e2.scrollWidth > e2.clientWidth); ) e2 = e2.parentElement;
            e2.dataset.headlessuiPortal === "" && t2.preventDefault();
          } else t2.preventDefault();
        }
      }, { passive: false }), r2.add(() => {
        var e2;
        let t2 = (e2 = window.scrollY) != null ? e2 : window.pageYOffset;
        s2 !== t2 && window.scrollTo(0, s2), l2 && l2.isConnected && (l2.scrollIntoView({ block: "nearest" }), l2 = null);
      });
    });
  } } : {};
}
function r$1() {
  return { before({ doc: e2, d: o4 }) {
    o4.style(e2.documentElement, "overflow", "hidden");
  } };
}
function r(e2) {
  let o4 = {};
  for (let t2 of e2) Object.assign(o4, t2(o4));
  return o4;
}
let c$4 = a$4(() => /* @__PURE__ */ new Map(), { PUSH(e2, o4) {
  var n2;
  let t2 = (n2 = this.get(e2)) != null ? n2 : { doc: e2, count: 0, d: o$6(), meta: /* @__PURE__ */ new Set(), computedMeta: {} };
  return t2.count++, t2.meta.add(o4), t2.computedMeta = r(t2.meta), this.set(e2, t2), this;
}, POP(e2, o4) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(o4), t2.computedMeta = r(t2.meta)), this;
}, SCROLL_PREVENT(e2) {
  let o4 = { doc: e2.doc, d: e2.d, meta() {
    return e2.computedMeta;
  } }, t2 = [w$3(), d$1(), r$1()];
  t2.forEach(({ before: n2 }) => n2 == null ? void 0 : n2(o4)), t2.forEach(({ after: n2 }) => n2 == null ? void 0 : n2(o4));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
c$4.subscribe(() => {
  let e2 = c$4.getSnapshot(), o4 = /* @__PURE__ */ new Map();
  for (let [t2] of e2) o4.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let n2 = o4.get(t2.doc) === "hidden", a3 = t2.count !== 0;
    (a3 && !n2 || !a3 && n2) && c$4.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && c$4.dispatch("TEARDOWN", t2);
  }
});
function a$3(r2, e2, n2 = () => ({ containers: [] })) {
  let f2 = o3(c$4), o$12 = e2 ? f2.get(e2) : void 0, i2 = o$12 ? o$12.count > 0 : false;
  return n$6(() => {
    if (!(!e2 || !r2)) return c$4.dispatch("PUSH", e2, n2), () => c$4.dispatch("POP", e2, n2);
  }, [r2, e2]), i2;
}
function f$2(e2, c2, n2 = () => [document.body]) {
  let r2 = I$3(e2, "scroll-lock");
  a$3(r2, c2, (t2) => {
    var o4;
    return { containers: [...(o4 = t2.containers) != null ? o4 : [], n2] };
  });
}
function c$3(u2 = 0) {
  let [r2, a3] = reactExports.useState(u2), g2 = reactExports.useCallback((e2) => a3(e2), []), s2 = reactExports.useCallback((e2) => a3((l2) => l2 | e2), []), m2 = reactExports.useCallback((e2) => (r2 & e2) === e2, [r2]), n2 = reactExports.useCallback((e2) => a3((l2) => l2 & ~e2), []), F2 = reactExports.useCallback((e2) => a3((l2) => l2 ^ e2), []);
  return { flags: r2, setFlag: g2, addFlag: s2, hasFlag: m2, removeFlag: n2, toggleFlag: F2 };
}
var T2, S$2;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((T2 = process == null ? void 0 : process.env) == null ? void 0 : T2["NODE_ENV"]) === "test" && typeof ((S$2 = Element == null ? void 0 : Element.prototype) == null ? void 0 : S$2.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var A = ((i2) => (i2[i2.None = 0] = "None", i2[i2.Closed = 1] = "Closed", i2[i2.Enter = 2] = "Enter", i2[i2.Leave = 4] = "Leave", i2))(A || {});
function x$2(e2) {
  let r2 = {};
  for (let t2 in e2) e2[t2] === true && (r2[`data-${t2}`] = "");
  return r2;
}
function N(e2, r2, t2, n2) {
  let [i2, a3] = reactExports.useState(t2), { hasFlag: s2, addFlag: o4, removeFlag: l2 } = c$3(e2 && i2 ? 3 : 0), u2 = reactExports.useRef(false), f2 = reactExports.useRef(false), E2 = p$3();
  return n$6(() => {
    var d2;
    if (e2) {
      if (t2 && a3(true), !r2) {
        t2 && o4(3);
        return;
      }
      return (d2 = n2 == null ? void 0 : n2.start) == null || d2.call(n2, t2), C(r2, { inFlight: u2, prepare() {
        f2.current ? f2.current = false : f2.current = u2.current, u2.current = true, !f2.current && (t2 ? (o4(3), l2(4)) : (o4(4), l2(2)));
      }, run() {
        f2.current ? t2 ? (l2(3), o4(4)) : (l2(4), o4(3)) : t2 ? l2(1) : o4(1);
      }, done() {
        var p2;
        f2.current && D$1(r2) || (u2.current = false, l2(7), t2 || a3(false), (p2 = n2 == null ? void 0 : n2.end) == null || p2.call(n2, t2));
      } });
    }
  }, [e2, t2, r2, E2]), e2 ? [i2, { closed: s2(1), enter: s2(2), leave: s2(4), transition: s2(2) || s2(4) }] : [t2, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function C(e2, { prepare: r2, run: t2, done: n2, inFlight: i2 }) {
  let a3 = o$6();
  return j$2(e2, { prepare: r2, inFlight: i2 }), a3.nextFrame(() => {
    t2(), a3.requestAnimationFrame(() => {
      a3.add(M$1(e2, n2));
    });
  }), a3.dispose;
}
function M$1(e2, r2) {
  var a3, s2;
  let t2 = o$6();
  if (!e2) return t2.dispose;
  let n2 = false;
  t2.add(() => {
    n2 = true;
  });
  let i2 = (s2 = (a3 = e2.getAnimations) == null ? void 0 : a3.call(e2).filter((o4) => o4 instanceof CSSTransition)) != null ? s2 : [];
  return i2.length === 0 ? (r2(), t2.dispose) : (Promise.allSettled(i2.map((o4) => o4.finished)).then(() => {
    n2 || r2();
  }), t2.dispose);
}
function j$2(e2, { inFlight: r2, prepare: t2 }) {
  if (r2 != null && r2.current) {
    t2();
    return;
  }
  let n2 = e2.style.transition;
  e2.style.transition = "none", t2(), e2.offsetHeight, e2.style.transition = n2;
}
function D$1(e2) {
  var t2, n2;
  return ((n2 = (t2 = e2.getAnimations) == null ? void 0 : t2.call(e2)) != null ? n2 : []).some((i2) => i2 instanceof CSSTransition && i2.playState !== "finished");
}
function m$1(u2, t2) {
  let e2 = reactExports.useRef([]), r2 = o$5(u2);
  reactExports.useEffect(() => {
    let o4 = [...e2.current];
    for (let [a3, l2] of t2.entries()) if (e2.current[a3] !== l2) {
      let n2 = r2(t2, o4);
      return e2.current = t2, n2;
    }
  }, [r2, ...t2]);
}
let n$1 = reactExports.createContext(null);
n$1.displayName = "OpenClosedContext";
var i = ((e2) => (e2[e2.Open = 1] = "Open", e2[e2.Closed = 2] = "Closed", e2[e2.Closing = 4] = "Closing", e2[e2.Opening = 8] = "Opening", e2))(i || {});
function u$1() {
  return reactExports.useContext(n$1);
}
function c$2({ value: o4, children: t2 }) {
  return G$2.createElement(n$1.Provider, { value: o4 }, t2);
}
function s$1({ children: o4 }) {
  return G$2.createElement(n$1.Provider, { value: null }, o4);
}
function t(n2) {
  function e2() {
    document.readyState !== "loading" && (n2(), document.removeEventListener("DOMContentLoaded", e2));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e2), e2());
}
let n = [];
t(() => {
  function e2(t2) {
    if (!i$4(t2.target) || t2.target === document.body || n[0] === t2.target) return;
    let r2 = t2.target;
    r2 = r2.closest(E$1), n.unshift(r2 != null ? r2 : t2.target), n = n.filter((o4) => o4 != null && o4.isConnected), n.splice(10);
  }
  window.addEventListener("click", e2, { capture: true }), window.addEventListener("mousedown", e2, { capture: true }), window.addEventListener("focus", e2, { capture: true }), document.body.addEventListener("click", e2, { capture: true }), document.body.addEventListener("mousedown", e2, { capture: true }), document.body.addEventListener("focus", e2, { capture: true });
});
function c$1(t2) {
  let r2 = o$5(t2), e2 = reactExports.useRef(false);
  reactExports.useEffect(() => (e2.current = false, () => {
    e2.current = true, t$4(() => {
      e2.current && r2();
    });
  }), [r2]);
}
let e = reactExports.createContext(false);
function a$2() {
  return reactExports.useContext(e);
}
function l$1(o4) {
  return G$2.createElement(e.Provider, { value: o4.force }, o4.children);
}
function W(e2) {
  let o4 = a$2(), l2 = reactExports.useContext(c), [r2, p2] = reactExports.useState(() => {
    var s2;
    if (!o4 && l2 !== null) return (s2 = l2.current) != null ? s2 : null;
    if (s$6.isServer) return null;
    let t2 = e2 == null ? void 0 : e2.getElementById("headlessui-portal-root");
    if (t2) return t2;
    if (e2 === null) return null;
    let n2 = e2.createElement("div");
    return n2.setAttribute("id", "headlessui-portal-root"), e2.body.appendChild(n2);
  });
  return reactExports.useEffect(() => {
    r2 !== null && (e2 != null && e2.body.contains(r2) || e2 == null || e2.body.appendChild(r2));
  }, [r2, e2]), reactExports.useEffect(() => {
    o4 || l2 !== null && p2(l2.current);
  }, [l2, p2, o4]), r2;
}
let _ = reactExports.Fragment, j$1 = Y(function(o4, l2) {
  let { ownerDocument: r2 = null, ...p2 } = o4, t2 = reactExports.useRef(null), n2 = y$2(T$3((a3) => {
    t2.current = a3;
  }), l2), s2 = u$2(t2.current), C2 = r2 != null ? r2 : s2, u2 = W(C2), y2 = reactExports.useContext(m), g2 = p$3(), v2 = K();
  return c$1(() => {
    var a3;
    u2 && u2.childNodes.length <= 0 && ((a3 = u2.parentElement) == null || a3.removeChild(u2));
  }), u2 ? reactDomExports.createPortal(G$2.createElement("div", { "data-headlessui-portal": "", ref: (a3) => {
    g2.dispose(), y2 && a3 && g2.add(y2.register(a3));
  } }, v2({ ourProps: { ref: n2 }, theirProps: p2, slot: {}, defaultTag: _, name: "Portal" })), u2) : null;
});
function S$1(e2, o4) {
  let l2 = y$2(o4), { enabled: r2 = true, ownerDocument: p2, ...t2 } = e2, n2 = K();
  return r2 ? G$2.createElement(j$1, { ...t2, ownerDocument: p2, ref: l2 }) : n2({ ourProps: { ref: l2 }, theirProps: t2, slot: {}, defaultTag: _, name: "Portal" });
}
let I$1 = reactExports.Fragment, c = reactExports.createContext(null);
function D(e2, o4) {
  let { target: l2, ...r2 } = e2, t2 = { ref: y$2(o4) }, n2 = K();
  return G$2.createElement(c.Provider, { value: l2 }, n2({ ourProps: t2, theirProps: r2, defaultTag: I$1, name: "Popover.Group" }));
}
let m = reactExports.createContext(null);
function ee$1() {
  let e2 = reactExports.useContext(m), o4 = reactExports.useRef([]), l2 = o$5((t2) => (o4.current.push(t2), e2 && e2.register(t2), () => r2(t2))), r2 = o$5((t2) => {
    let n2 = o4.current.indexOf(t2);
    n2 !== -1 && o4.current.splice(n2, 1), e2 && e2.unregister(t2);
  }), p2 = reactExports.useMemo(() => ({ register: l2, unregister: r2, portals: o4 }), [l2, r2, o4]);
  return [o4, reactExports.useMemo(() => function({ children: n2 }) {
    return G$2.createElement(m.Provider, { value: p2 }, n2);
  }, [p2])];
}
let J = Y(S$1), X$1 = Y(D), te$1 = Object.assign(J, { Group: X$1 });
function a$1(o4, r2 = typeof document != "undefined" ? document.defaultView : null, t2) {
  let n2 = I$3(o4, "escape");
  E(r2, "keydown", (e2) => {
    n2 && (e2.defaultPrevented || e2.key === o$3.Escape && t2(e2));
  });
}
function f$1() {
  var t2;
  let [e2] = reactExports.useState(() => typeof window != "undefined" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [o4, c2] = reactExports.useState((t2 = e2 == null ? void 0 : e2.matches) != null ? t2 : false);
  return n$6(() => {
    if (!e2) return;
    function n2(r2) {
      c2(r2.matches);
    }
    return e2.addEventListener("change", n2), () => e2.removeEventListener("change", n2);
  }, [e2]), o4;
}
function S({ defaultContainers: l2 = [], portals: n2, mainTreeNode: o4 } = {}) {
  let c2 = o$5(() => {
    var r2, u2;
    let i2 = l$4(o4), t2 = [];
    for (let e2 of l2) e2 !== null && (t$2(e2) ? t2.push(e2) : "current" in e2 && t$2(e2.current) && t2.push(e2.current));
    if (n2 != null && n2.current) for (let e2 of n2.current) t2.push(e2);
    for (let e2 of (r2 = i2 == null ? void 0 : i2.querySelectorAll("html > *, body > *")) != null ? r2 : []) e2 !== document.body && e2 !== document.head && t$2(e2) && e2.id !== "headlessui-portal-root" && (o4 && (e2.contains(o4) || e2.contains((u2 = o4 == null ? void 0 : o4.getRootNode()) == null ? void 0 : u2.host)) || t2.some((E2) => e2.contains(E2)) || t2.push(e2));
    return t2;
  });
  return { resolveContainers: c2, contains: o$5((i2) => c2().some((t2) => t2.contains(i2))) };
}
let d = reactExports.createContext(null);
function j({ children: l2, node: n2 }) {
  let [o4, c2] = reactExports.useState(null), i2 = x$1(n2 != null ? n2 : o4);
  return G$2.createElement(d.Provider, { value: i2 }, l2, i2 === null && G$2.createElement(f$6, { features: s$4.Hidden, ref: (t2) => {
    var r2, u2;
    if (t2) {
      for (let e2 of (u2 = (r2 = l$4(t2)) == null ? void 0 : r2.querySelectorAll("html > *, body > *")) != null ? u2 : []) if (e2 !== document.body && e2 !== document.head && t$2(e2) && e2 != null && e2.contains(t2)) {
        c2(e2);
        break;
      }
    }
  } }));
}
function x$1(l2 = null) {
  var n2;
  return (n2 = reactExports.useContext(d)) != null ? n2 : l2;
}
function s() {
  let r2 = typeof document == "undefined";
  return "useSyncExternalStore" in React ? ((o4) => o4.useSyncExternalStore)(React)(() => () => {
  }, () => false, () => !r2) : false;
}
function l() {
  let r2 = s(), [e2, n2] = reactExports.useState(s$6.isHandoffComplete);
  return e2 && s$6.isHandoffComplete === false && n2(false), reactExports.useEffect(() => {
    e2 !== true && n2(true);
  }, [e2]), reactExports.useEffect(() => s$6.handoff(), []), r2 ? false : e2;
}
function f() {
  let e2 = reactExports.useRef(false);
  return n$6(() => (e2.current = true, () => {
    e2.current = false;
  }), []), e2;
}
var a2 = ((r2) => (r2[r2.Forwards = 0] = "Forwards", r2[r2.Backwards = 1] = "Backwards", r2))(a2 || {});
function u() {
  let e2 = reactExports.useRef(0);
  return s$2(true, "keydown", (r2) => {
    r2.key === "Tab" && (e2.current = r2.shiftKey ? 1 : 0);
  }, true), e2;
}
function x(o4) {
  if (!o4) return /* @__PURE__ */ new Set();
  if (typeof o4 == "function") return new Set(o4());
  let t2 = /* @__PURE__ */ new Set();
  for (let e2 of o4.current) t$2(e2.current) && t2.add(e2.current);
  return t2;
}
let $ = "div";
var G = ((n2) => (n2[n2.None = 0] = "None", n2[n2.InitialFocus = 1] = "InitialFocus", n2[n2.TabLock = 2] = "TabLock", n2[n2.FocusLock = 4] = "FocusLock", n2[n2.RestoreFocus = 8] = "RestoreFocus", n2[n2.AutoFocus = 16] = "AutoFocus", n2))(G || {});
function w$2(o4, t2) {
  let e2 = reactExports.useRef(null), r2 = y$2(e2, t2), { initialFocus: u$12, initialFocusFallback: a$12, containers: n2, features: s2 = 15, ...f2 } = o4;
  l() || (s2 = 0);
  let l$12 = u$2(e2.current);
  re(s2, { ownerDocument: l$12 });
  let T3 = ne(s2, { ownerDocument: l$12, container: e2, initialFocus: u$12, initialFocusFallback: a$12 });
  oe(s2, { ownerDocument: l$12, container: e2, containers: n2, previousActiveElement: T3 });
  let g2 = u(), A2 = o$5((c2) => {
    if (!n$4(e2.current)) return;
    let E2 = e2.current;
    ((V2) => V2())(() => {
      u$7(g2.current, { [a2.Forwards]: () => {
        v(E2, T$1.First, { skipElements: [c2.relatedTarget, a$12] });
      }, [a2.Backwards]: () => {
        v(E2, T$1.Last, { skipElements: [c2.relatedTarget, a$12] });
      } });
    });
  }), v$12 = I$3(!!(s2 & 2), "focus-trap#tab-lock"), N2 = p$3(), b2 = reactExports.useRef(false), k2 = { ref: r2, onKeyDown(c2) {
    c2.key == "Tab" && (b2.current = true, N2.requestAnimationFrame(() => {
      b2.current = false;
    }));
  }, onBlur(c2) {
    if (!(s2 & 4)) return;
    let E2 = x(n2);
    n$4(e2.current) && E2.add(e2.current);
    let L = c2.relatedTarget;
    i$4(L) && L.dataset.headlessuiFocusGuard !== "true" && (I(E2, L) || (b2.current ? v(e2.current, u$7(g2.current, { [a2.Forwards]: () => T$1.Next, [a2.Backwards]: () => T$1.Previous }) | T$1.WrapAround, { relativeTo: c2.target }) : i$4(c2.target) && w$4(c2.target)));
  } }, B = K();
  return G$2.createElement(G$2.Fragment, null, v$12 && G$2.createElement(f$6, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: A2, features: s$4.Focusable }), B({ ourProps: k2, theirProps: f2, defaultTag: $, name: "FocusTrap" }), v$12 && G$2.createElement(f$6, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: A2, features: s$4.Focusable }));
}
let ee = Y(w$2), ge = Object.assign(ee, { features: G });
function te(o4 = true) {
  let t2 = reactExports.useRef(n.slice());
  return m$1(([e2], [r2]) => {
    r2 === true && e2 === false && t$4(() => {
      t2.current.splice(0);
    }), r2 === false && e2 === true && (t2.current = n.slice());
  }, [o4, n, t2]), o$5(() => {
    var e2;
    return (e2 = t2.current.find((r2) => r2 != null && r2.isConnected)) != null ? e2 : null;
  });
}
function re(o4, { ownerDocument: t2 }) {
  let e2 = !!(o4 & 8), r2 = te(e2);
  m$1(() => {
    e2 || d$2(t2 == null ? void 0 : t2.body) && w$4(r2());
  }, [e2]), c$1(() => {
    e2 && w$4(r2());
  });
}
function ne(o4, { ownerDocument: t2, container: e2, initialFocus: r2, initialFocusFallback: u2 }) {
  let a3 = reactExports.useRef(null), n2 = I$3(!!(o4 & 1), "focus-trap#initial-focus"), s2 = f();
  return m$1(() => {
    if (o4 === 0) return;
    if (!n2) {
      u2 != null && u2.current && w$4(u2.current);
      return;
    }
    let f2 = e2.current;
    f2 && t$4(() => {
      if (!s2.current) return;
      let l2 = t2 == null ? void 0 : t2.activeElement;
      if (r2 != null && r2.current) {
        if ((r2 == null ? void 0 : r2.current) === l2) {
          a3.current = l2;
          return;
        }
      } else if (f2.contains(l2)) {
        a3.current = l2;
        return;
      }
      if (r2 != null && r2.current) w$4(r2.current);
      else {
        if (o4 & 16) {
          if (v(f2, T$1.First | T$1.AutoFocus) !== A$1.Error) return;
        } else if (v(f2, T$1.First) !== A$1.Error) return;
        if (u2 != null && u2.current && (w$4(u2.current), (t2 == null ? void 0 : t2.activeElement) === u2.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      a3.current = t2 == null ? void 0 : t2.activeElement;
    });
  }, [u2, n2, o4]), a3;
}
function oe(o4, { ownerDocument: t2, container: e2, containers: r2, previousActiveElement: u2 }) {
  let a3 = f(), n2 = !!(o4 & 4);
  E(t2 == null ? void 0 : t2.defaultView, "focus", (s2) => {
    if (!n2 || !a3.current) return;
    let f2 = x(r2);
    n$4(e2.current) && f2.add(e2.current);
    let l2 = u2.current;
    if (!l2) return;
    let T3 = s2.target;
    n$4(T3) ? I(f2, T3) ? (u2.current = T3, w$4(T3)) : (s2.preventDefault(), s2.stopPropagation(), w$4(l2)) : w$4(u2.current);
  }, true);
}
function I(o4, t2) {
  for (let e2 of o4) if (e2.contains(t2)) return true;
  return false;
}
function ue(e2) {
  var t2;
  return !!(e2.enter || e2.enterFrom || e2.enterTo || e2.leave || e2.leaveFrom || e2.leaveTo) || !b$1((t2 = e2.as) != null ? t2 : de) || G$2.Children.count(e2.children) === 1;
}
let V = reactExports.createContext(null);
V.displayName = "TransitionContext";
var De = ((n2) => (n2.Visible = "visible", n2.Hidden = "hidden", n2))(De || {});
function He$1() {
  let e2 = reactExports.useContext(V);
  if (e2 === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e2;
}
function Ae() {
  let e2 = reactExports.useContext(w$1);
  if (e2 === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e2;
}
let w$1 = reactExports.createContext(null);
w$1.displayName = "NestingContext";
function M(e2) {
  return "children" in e2 ? M(e2.children) : e2.current.filter(({ el: t2 }) => t2.current !== null).filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function Te(e2, t2) {
  let n2 = s$5(e2), l2 = reactExports.useRef([]), S2 = f(), R = p$3(), d2 = o$5((o4, i2 = C$4.Hidden) => {
    let a3 = l2.current.findIndex(({ el: s2 }) => s2 === o4);
    a3 !== -1 && (u$7(i2, { [C$4.Unmount]() {
      l2.current.splice(a3, 1);
    }, [C$4.Hidden]() {
      l2.current[a3].state = "hidden";
    } }), R.microTask(() => {
      var s2;
      !M(l2) && S2.current && ((s2 = n2.current) == null || s2.call(n2));
    }));
  }), y2 = o$5((o4) => {
    let i2 = l2.current.find(({ el: a3 }) => a3 === o4);
    return i2 ? i2.state !== "visible" && (i2.state = "visible") : l2.current.push({ el: o4, state: "visible" }), () => d2(o4, C$4.Unmount);
  }), C2 = reactExports.useRef([]), p2 = reactExports.useRef(Promise.resolve()), h2 = reactExports.useRef({ enter: [], leave: [] }), g2 = o$5((o4, i2, a3) => {
    C2.current.splice(0), t2 && (t2.chains.current[i2] = t2.chains.current[i2].filter(([s2]) => s2 !== o4)), t2 == null || t2.chains.current[i2].push([o4, new Promise((s2) => {
      C2.current.push(s2);
    })]), t2 == null || t2.chains.current[i2].push([o4, new Promise((s2) => {
      Promise.all(h2.current[i2].map(([r2, f2]) => f2)).then(() => s2());
    })]), i2 === "enter" ? p2.current = p2.current.then(() => t2 == null ? void 0 : t2.wait.current).then(() => a3(i2)) : a3(i2);
  }), v2 = o$5((o4, i2, a3) => {
    Promise.all(h2.current[i2].splice(0).map(([s2, r2]) => r2)).then(() => {
      var s2;
      (s2 = C2.current.shift()) == null || s2();
    }).then(() => a3(i2));
  });
  return reactExports.useMemo(() => ({ children: l2, register: y2, unregister: d2, onStart: g2, onStop: v2, wait: p2, chains: h2 }), [y2, d2, l2, g2, v2, h2, p2]);
}
let de = reactExports.Fragment, fe = A$2.RenderStrategy;
function Fe(e2, t2) {
  var ee2, te2;
  let { transition: n2 = true, beforeEnter: l$12, afterEnter: S2, beforeLeave: R, afterLeave: d2, enter: y2, enterFrom: C2, enterTo: p2, entered: h2, leave: g2, leaveFrom: v2, leaveTo: o4, ...i$12 } = e2, [a3, s2] = reactExports.useState(null), r2 = reactExports.useRef(null), f2 = ue(e2), U2 = y$2(...f2 ? [r2, t2, s2] : t2 === null ? [] : [t2]), H2 = (ee2 = i$12.unmount) == null || ee2 ? C$4.Unmount : C$4.Hidden, { show: u2, appear: z2, initial: K$1 } = He$1(), [m2, j2] = reactExports.useState(u2 ? "visible" : "hidden"), Q = Ae(), { register: A2, unregister: F2 } = Q;
  n$6(() => A2(r2), [A2, r2]), n$6(() => {
    if (H2 === C$4.Hidden && r2.current) {
      if (u2 && m2 !== "visible") {
        j2("visible");
        return;
      }
      return u$7(m2, { ["hidden"]: () => F2(r2), ["visible"]: () => A2(r2) });
    }
  }, [m2, r2, A2, F2, u2, H2]);
  let G2 = l();
  n$6(() => {
    if (f2 && G2 && m2 === "visible" && r2.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [r2, m2, G2, f2]);
  let ce = K$1 && !z2, Y2 = z2 && u2 && K$1, B = reactExports.useRef(false), I2 = Te(() => {
    B.current || (j2("hidden"), F2(r2));
  }, Q), Z = o$5((W2) => {
    B.current = true;
    let L = W2 ? "enter" : "leave";
    I2.onStart(r2, L, (_2) => {
      _2 === "enter" ? l$12 == null || l$12() : _2 === "leave" && (R == null || R());
    });
  }), $2 = o$5((W2) => {
    let L = W2 ? "enter" : "leave";
    B.current = false, I2.onStop(r2, L, (_2) => {
      _2 === "enter" ? S2 == null || S2() : _2 === "leave" && (d2 == null || d2());
    }), L === "leave" && !M(I2) && (j2("hidden"), F2(r2));
  });
  reactExports.useEffect(() => {
    f2 && n2 || (Z(u2), $2(u2));
  }, [u2, f2, n2]);
  let pe = /* @__PURE__ */ (() => !(!n2 || !f2 || !G2 || ce))(), [, T3] = N(pe, a3, u2, { start: Z, end: $2 }), Ce = m$3({ ref: U2, className: ((te2 = t$3(i$12.className, Y2 && y2, Y2 && C2, T3.enter && y2, T3.enter && T3.closed && C2, T3.enter && !T3.closed && p2, T3.leave && g2, T3.leave && !T3.closed && v2, T3.leave && T3.closed && o4, !T3.transition && u2 && h2)) == null ? void 0 : te2.trim()) || void 0, ...x$2(T3) }), N$1 = 0;
  m2 === "visible" && (N$1 |= i.Open), m2 === "hidden" && (N$1 |= i.Closed), u2 && m2 === "hidden" && (N$1 |= i.Opening), !u2 && m2 === "visible" && (N$1 |= i.Closing);
  let he = K();
  return G$2.createElement(w$1.Provider, { value: I2 }, G$2.createElement(c$2, { value: N$1 }, he({ ourProps: Ce, theirProps: i$12, defaultTag: de, features: fe, visible: m2 === "visible", name: "Transition.Child" })));
}
function Ie(e2, t2) {
  let { show: n2, appear: l$12 = false, unmount: S2 = true, ...R } = e2, d2 = reactExports.useRef(null), y2 = ue(e2), C2 = y$2(...y2 ? [d2, t2] : t2 === null ? [] : [t2]);
  l();
  let p2 = u$1();
  if (n2 === void 0 && p2 !== null && (n2 = (p2 & i.Open) === i.Open), n2 === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [h2, g2] = reactExports.useState(n2 ? "visible" : "hidden"), v2 = Te(() => {
    n2 || g2("hidden");
  }), [o4, i$12] = reactExports.useState(true), a3 = reactExports.useRef([n2]);
  n$6(() => {
    o4 !== false && a3.current[a3.current.length - 1] !== n2 && (a3.current.push(n2), i$12(false));
  }, [a3, n2]);
  let s2 = reactExports.useMemo(() => ({ show: n2, appear: l$12, initial: o4 }), [n2, l$12, o4]);
  n$6(() => {
    n2 ? g2("visible") : !M(v2) && d2.current !== null && g2("hidden");
  }, [n2, v2]);
  let r2 = { unmount: S2 }, f2 = o$5(() => {
    var u2;
    o4 && i$12(false), (u2 = e2.beforeEnter) == null || u2.call(e2);
  }), U2 = o$5(() => {
    var u2;
    o4 && i$12(false), (u2 = e2.beforeLeave) == null || u2.call(e2);
  }), H2 = K();
  return G$2.createElement(w$1.Provider, { value: v2 }, G$2.createElement(V.Provider, { value: s2 }, H2({ ourProps: { ...r2, as: reactExports.Fragment, children: G$2.createElement(me, { ref: C2, ...r2, ...R, beforeEnter: f2, beforeLeave: U2 }) }, theirProps: {}, defaultTag: reactExports.Fragment, features: fe, visible: h2 === "visible", name: "Transition" })));
}
function Le(e2, t2) {
  let n2 = reactExports.useContext(V) !== null, l2 = u$1() !== null;
  return G$2.createElement(G$2.Fragment, null, !n2 && l2 ? G$2.createElement(X, { ref: t2, ...e2 }) : G$2.createElement(me, { ref: t2, ...e2 }));
}
let X = Y(Ie), me = Y(Fe), Oe = Y(Le), Ke$1 = Object.assign(X, { Child: Oe, Root: X });
var we = ((o4) => (o4[o4.Open = 0] = "Open", o4[o4.Closed = 1] = "Closed", o4))(we || {}), Be = ((t2) => (t2[t2.SetTitleId = 0] = "SetTitleId", t2))(Be || {});
let Ue = { [0](e2, t2) {
  return e2.titleId === t2.id ? e2 : { ...e2, titleId: t2.id };
} }, w = reactExports.createContext(null);
w.displayName = "DialogContext";
function O(e2) {
  let t2 = reactExports.useContext(w);
  if (t2 === null) {
    let o4 = new Error(`<${e2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o4, O), o4;
  }
  return t2;
}
function He(e2, t2) {
  return u$7(t2.type, Ue, e2, t2);
}
let z = Y(function(t2, o4) {
  let a3 = reactExports.useId(), { id: n2 = `headlessui-dialog-${a3}`, open: i$12, onClose: p$12, initialFocus: d2, role: s2 = "dialog", autoFocus: f2 = true, __demoMode: u2 = false, unmount: y$12 = false, ...S$12 } = t2, R = reactExports.useRef(false);
  s2 = (function() {
    return s2 === "dialog" || s2 === "alertdialog" ? s2 : (R.current || (R.current = true, console.warn(`Invalid role [${s2}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  })();
  let g2 = u$1();
  i$12 === void 0 && g2 !== null && (i$12 = (g2 & i.Open) === i.Open);
  let T3 = reactExports.useRef(null), I2 = y$2(T3, o4), F2 = u$2(T3.current), c2 = i$12 ? 0 : 1, [b2, Q] = reactExports.useReducer(He, { titleId: null, descriptionId: null, panelRef: reactExports.createRef() }), m2 = o$5(() => p$12(false)), B = o$5((r2) => Q({ type: 0, id: r2 })), D2 = l() ? c2 === 0 : false, [Z, ee2] = ee$1(), te2 = { get current() {
    var r2;
    return (r2 = b2.panelRef.current) != null ? r2 : T3.current;
  } }, v2 = x$1(), { resolveContainers: M2 } = S({ mainTreeNode: v2, portals: Z, defaultContainers: [te2] }), U2 = g2 !== null ? (g2 & i.Closing) === i.Closing : false;
  y(u2 || U2 ? false : D2, { allowed: o$5(() => {
    var r2, W2;
    return [(W2 = (r2 = T3.current) == null ? void 0 : r2.closest("[data-headlessui-portal]")) != null ? W2 : null];
  }), disallowed: o$5(() => {
    var r2;
    return [(r2 = v2 == null ? void 0 : v2.closest("body > *:not(#headlessui-portal-root)")) != null ? r2 : null];
  }) });
  let P2 = x$4.get(null);
  n$6(() => {
    if (D2) return P2.actions.push(n2), () => P2.actions.pop(n2);
  }, [P2, n2, D2]);
  let H2 = S$4(P2, reactExports.useCallback((r2) => P2.selectors.isTop(r2, n2), [P2, n2]));
  k(H2, M2, (r2) => {
    r2.preventDefault(), m2();
  }), a$1(H2, F2 == null ? void 0 : F2.defaultView, (r2) => {
    r2.preventDefault(), r2.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), m2();
  }), f$2(u2 || U2 ? false : D2, F2, M2), p(D2, T3, m2);
  let [oe2, ne2] = H$1(), re2 = reactExports.useMemo(() => [{ dialogState: c2, close: m2, setTitleId: B, unmount: y$12 }, b2], [c2, m2, B, y$12, b2]), N2 = n$5({ open: c2 === 0 }), le = { ref: I2, id: n2, role: s2, tabIndex: -1, "aria-modal": u2 ? void 0 : c2 === 0 ? true : void 0, "aria-labelledby": b2.titleId, "aria-describedby": oe2, unmount: y$12 }, ae = !f$1(), E2 = G.None;
  D2 && !u2 && (E2 |= G.RestoreFocus, E2 |= G.TabLock, f2 && (E2 |= G.AutoFocus), ae && (E2 |= G.InitialFocus));
  let ie = K();
  return G$2.createElement(s$1, null, G$2.createElement(l$1, { force: true }, G$2.createElement(te$1, null, G$2.createElement(w.Provider, { value: re2 }, G$2.createElement(X$1, { target: T3 }, G$2.createElement(l$1, { force: false }, G$2.createElement(ne2, { slot: N2 }, G$2.createElement(ee2, null, G$2.createElement(ge, { initialFocus: d2, initialFocusFallback: T3, containers: M2, features: E2 }, G$2.createElement(C$2, { value: m2 }, ie({ ourProps: le, theirProps: S$12, slot: N2, defaultTag: Ne, features: We, visible: c2 === 0, name: "Dialog" })))))))))));
}), Ne = "div", We = A$2.RenderStrategy | A$2.Static;
function $e(e2, t2) {
  let { transition: o4 = false, open: a3, ...n2 } = e2, i2 = u$1(), p2 = e2.hasOwnProperty("open") || i2 !== null, d2 = e2.hasOwnProperty("onClose");
  if (!p2 && !d2) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!p2) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!d2) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i2 && typeof e2.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e2.open}`);
  if (typeof e2.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e2.onClose}`);
  return (a3 !== void 0 || o4) && !n2.static ? G$2.createElement(j, null, G$2.createElement(Ke$1, { show: a3, transition: o4, unmount: n2.unmount }, G$2.createElement(z, { ref: t2, ...n2 }))) : G$2.createElement(j, null, G$2.createElement(z, { ref: t2, open: a3, ...n2 }));
}
let je = "div";
function Ye(e2, t2) {
  let o4 = reactExports.useId(), { id: a3 = `headlessui-dialog-panel-${o4}`, transition: n2 = false, ...i2 } = e2, [{ dialogState: p2, unmount: d2 }, s2] = O("Dialog.Panel"), f2 = y$2(t2, s2.panelRef), u2 = n$5({ open: p2 === 0 }), y2 = o$5((I2) => {
    I2.stopPropagation();
  }), S2 = { ref: f2, id: a3, onClick: y2 }, R = n2 ? Oe : reactExports.Fragment, g2 = n2 ? { unmount: d2 } : {}, T3 = K();
  return G$2.createElement(R, { ...g2 }, T3({ ourProps: S2, theirProps: i2, slot: u2, defaultTag: je, name: "Dialog.Panel" }));
}
let Je = "div";
function Ke(e2, t2) {
  let { transition: o4 = false, ...a3 } = e2, [{ dialogState: n2, unmount: i2 }] = O("Dialog.Backdrop"), p2 = n$5({ open: n2 === 0 }), d2 = { ref: t2, "aria-hidden": true }, s2 = o4 ? Oe : reactExports.Fragment, f2 = o4 ? { unmount: i2 } : {}, u2 = K();
  return G$2.createElement(s2, { ...f2 }, u2({ ourProps: d2, theirProps: a3, slot: p2, defaultTag: Je, name: "Dialog.Backdrop" }));
}
let Xe = "h2";
function Ve(e2, t2) {
  let o4 = reactExports.useId(), { id: a3 = `headlessui-dialog-title-${o4}`, ...n2 } = e2, [{ dialogState: i2, setTitleId: p2 }] = O("Dialog.Title"), d2 = y$2(t2);
  reactExports.useEffect(() => (p2(a3), () => p2(null)), [a3, p2]);
  let s2 = n$5({ open: i2 === 0 }), f2 = { ref: d2, id: a3 };
  return K()({ ourProps: f2, theirProps: n2, slot: s2, defaultTag: Xe, name: "Dialog.Title" });
}
let qe = Y($e), ze = Y(Ye);
Y(Ke);
let Qe = Y(Ve), ht = Object.assign(qe, { Panel: ze, Title: Qe, Description: M$2 });
function Bars3Icon({
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
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  }));
}
const ForwardRef$5 = /* @__PURE__ */ reactExports.forwardRef(Bars3Icon);
function MagnifyingGlassIcon({
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
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const ForwardRef$4 = /* @__PURE__ */ reactExports.forwardRef(MagnifyingGlassIcon);
function MinusIcon({
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
    d: "M5 12h14"
  }));
}
const ForwardRef$3 = /* @__PURE__ */ reactExports.forwardRef(MinusIcon);
function PlusIcon({
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
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const ForwardRef$2 = /* @__PURE__ */ reactExports.forwardRef(PlusIcon);
function ShoppingCartIcon({
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
    d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const ForwardRef$1 = /* @__PURE__ */ reactExports.forwardRef(ShoppingCartIcon);
function XMarkIcon({
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
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(XMarkIcon);
const domains = {
  "images.ctfassets.net": "contentful",
  "cdn.builder.io": "builder.io",
  "images.prismic.io": "imgix",
  "www.datocms-assets.com": "imgix",
  "cdn.sanity.io": "imgix",
  "images.unsplash.com": "imgix",
  "cdn.shopify.com": "shopify",
  "s7d1.scene7.com": "scene7",
  "ip.keycdn.com": "keycdn",
  "assets.caisy.io": "bunny",
  "images.contentstack.io": "contentstack",
  "ucarecdn.com": "uploadcare",
  "imagedelivery.net": "cloudflare_images"
};
const subdomains = {
  "imgix.net": "imgix",
  "files.wordpress.com": "wordpress",
  "b-cdn.net": "bunny",
  "storyblok.com": "storyblok",
  "kc-usercontent.com": "kontent.ai",
  "cloudinary.com": "cloudinary",
  "kxcdn.com": "keycdn",
  "imgeng.in": "imageengine",
  "imagekit.io": "imagekit",
  "cloudimg.io": "cloudimage",
  "ucarecdn.com": "uploadcare",
  "supabase.co": "supabase",
  "graphassets.com": "hygraph"
};
const paths = {
  "/cdn-cgi/image/": "cloudflare",
  "/cdn-cgi/imagedelivery/": "cloudflare_images",
  "/_next/image": "nextjs",
  "/_next/static": "nextjs",
  "/_vercel/image": "vercel",
  "/is/image": "scene7",
  "/_ipx/": "ipx",
  "/_image": "astro",
  "/.netlify/images": "netlify",
  "/storage/v1/object/public/": "supabase",
  "/storage/v1/render/image/public/": "supabase"
};
const roundIfNumeric = (value) => {
  if (!value) {
    return value;
  }
  const num = Number(value);
  return isNaN(num) ? value : Math.round(num);
};
const setParamIfDefined = (url, key, value, deleteExisting, roundValue) => {
  if (value) {
    if (roundValue) {
      value = roundIfNumeric(value);
    }
    url.searchParams.set(key, value.toString());
  } else if (deleteExisting) {
    url.searchParams.delete(key);
  }
};
const setParamIfUndefined = (url, key, value) => {
  if (!url.searchParams.has(key)) {
    url.searchParams.set(key, value.toString());
  }
};
const getNumericParam = (url, key) => {
  const value = Number(url.searchParams.get(key));
  return isNaN(value) ? void 0 : value;
};
const toRelativeUrl = (url) => {
  const { pathname, search } = url;
  return `${pathname}${search}`;
};
const toCanonicalUrlString = (url) => {
  return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
const toUrl = (url, base) => {
  return typeof url === "string" ? new URL(url, base ?? "http://n/") : url;
};
const cdnDomains = new Map(Object.entries(domains));
const cdnSubdomains = Object.entries(subdomains);
function getImageCdnForUrl(url) {
  return getImageCdnForUrlByDomain(url) || getImageCdnForUrlByPath(url);
}
function getImageCdnForUrlByDomain(url) {
  if (typeof url === "string" && !url.startsWith("https://")) {
    return false;
  }
  const { hostname } = toUrl(url);
  if (cdnDomains.has(hostname)) {
    return cdnDomains.get(hostname);
  }
  for (const [subdomain, cdn] of cdnSubdomains) {
    if (hostname.endsWith(`.${subdomain}`)) {
      return cdn;
    }
  }
  return false;
}
function getImageCdnForUrlByPath(url) {
  const { pathname } = toUrl(url);
  for (const [prefix, cdn] of Object.entries(paths)) {
    if (pathname.startsWith(prefix)) {
      return cdn;
    }
  }
  return false;
}
const transform$p = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  if (width && width > 4e3) {
    if (height) {
      height = Math.round(height * 4e3 / width);
    }
    width = 4e3;
  }
  if (height && height > 4e3) {
    if (width) {
      width = Math.round(width * 4e3 / height);
    }
    height = 4e3;
  }
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format);
  setParamIfUndefined(url, "fit", "fill");
  return url;
};
const transform$o = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  if (width && height) {
    setParamIfUndefined(url, "fit", "cover");
    setParamIfUndefined(url, "sharp", "true");
  }
  return url;
};
const transform$n = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfUndefined(url, "fit", "min");
  if (format) {
    url.searchParams.set("fm", format);
    const fm = url.searchParams.get("auto");
    if (fm === "format") {
      url.searchParams.delete("auto");
    } else if (fm?.includes("format")) {
      url.searchParams.set("auto", fm.split(",").filter((s2) => s2 !== "format").join(","));
    }
  } else {
    url.searchParams.delete("fm");
    if (!url.searchParams.get("auto")?.includes("format")) {
      url.searchParams.append("auto", "format");
    }
  }
  return url;
};
const shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
const parse$9 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const match = url.pathname.match(shopifyRegex);
  if (!match) {
    throw new Error("Invalid Shopify URL");
  }
  const [, path, size, width, height, crop, extension, format] = match;
  url.pathname = `${path}${extension}`;
  const widthString = width ? width : url.searchParams.get("width");
  const heightString = height ? height : url.searchParams.get("height");
  url.searchParams.delete("width");
  url.searchParams.delete("height");
  return {
    base: url.toString(),
    width: Number(widthString) || void 0,
    height: Number(heightString) || void 0,
    format: format ? format.slice(1) : void 0,
    params: { crop, size },
    cdn: "shopify"
  };
};
const generate$a = ({ base, width, height, format, params }) => {
  const url = toUrl(base);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "crop", params?.crop);
  setParamIfDefined(url, "format", format);
  return url;
};
const transform$m = ({ url: originalUrl, width, height }) => {
  const parsed = parse$9(originalUrl);
  if (!parsed) {
    return;
  }
  const props = {
    ...parsed,
    width,
    height
  };
  return generate$a(props);
};
const transform$l = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfUndefined(url, "crop", "1");
  return url;
};
const transform$k = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "q", getNumericParam(url, "q"), true);
  return url;
};
const cloudinaryRegex = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<idAndFormat>[^\s]+)$/g;
const parseTransforms$2 = (transformations) => {
  return transformations ? Object.fromEntries(transformations.split(",").map((t2) => t2.split("_"))) : {};
};
const formatUrl$3 = ({ host, cloudName, assetType, deliveryType, signature, transformations = {}, version, id, format }) => {
  if (format) {
    transformations.f = format;
  }
  const transformString = Object.entries(transformations).map(([key, value]) => `${key}_${value}`).join(",");
  const pathSegments = [
    host,
    cloudName,
    assetType,
    deliveryType,
    signature,
    transformString,
    version,
    id
  ].filter(Boolean).join("/");
  return `https://${pathSegments}`;
};
const parse$8 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [...url.toString().matchAll(cloudinaryRegex)];
  if (!matches.length) {
    throw new Error("Invalid Cloudinary URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString = "", idAndFormat, ...baseParams } = group;
  delete group.idAndFormat;
  const lastDotIndex = idAndFormat.lastIndexOf(".");
  const id = lastDotIndex < 0 ? idAndFormat : idAndFormat.slice(0, lastDotIndex);
  const originalFormat = lastDotIndex < 0 ? void 0 : idAndFormat.slice(lastDotIndex + 1);
  const { w: w2, h: h2, f: f2, ...transformations } = parseTransforms$2(transformString);
  const format = f2 && f2 !== "auto" ? f2 : originalFormat;
  const base = formatUrl$3({ ...baseParams, id, transformations });
  return {
    base,
    width: Number(w2) || void 0,
    height: Number(h2) || void 0,
    format,
    cdn: "cloudinary",
    params: {
      ...group,
      id: group.deliveryType === "fetch" ? idAndFormat : id,
      format,
      transformations
    }
  };
};
const generate$9 = ({ base, width, height, format, params }) => {
  const parsed = parse$8(base.toString());
  const props = {
    transformations: {},
    ...parsed.params,
    ...params,
    format: format || "auto"
  };
  if (width) {
    props.transformations.w = roundIfNumeric(width).toString();
  }
  if (height) {
    props.transformations.h = roundIfNumeric(height).toString();
  }
  props.transformations.c ||= "lfill";
  return formatUrl$3(props);
};
const transform$j = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$8(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudinary URL");
  }
  if (parsed.params?.assetType !== "image") {
    throw new Error("Cloudinary transformer only supports images");
  }
  if (parsed.params?.signature) {
    throw new Error("Cloudinary transformer does not support signed URLs");
  }
  const props = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$9(props);
};
const cloudflareRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/image\/(?<transformations>[^\/]+)?\/(?<path>.*)$/g;
const parseTransforms$1 = (transformations) => Object.fromEntries(transformations.split(",").map((t2) => t2.split("=")));
const formatUrl$2 = ({ host, transformations = {}, path }) => {
  const transformString = Object.entries(transformations).map(([key, value]) => `${key}=${value}`).join(",");
  const pathSegments = [
    host,
    "cdn-cgi",
    "image",
    transformString,
    path
  ].join("/");
  return `https://${pathSegments}`;
};
const parse$7 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [...url.toString().matchAll(cloudflareRegex)];
  if (!matches.length) {
    throw new Error("Invalid Cloudflare URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString, ...baseParams } = group;
  const { width, height, f: f2, ...transformations } = parseTransforms$1(transformString);
  formatUrl$2({ ...baseParams, transformations });
  return {
    base: url.toString(),
    width: Number(width) || void 0,
    height: Number(height) || void 0,
    format: f2,
    cdn: "cloudflare",
    params: { ...group, transformations }
  };
};
const generate$8 = ({ base, width, height, format, params }) => {
  const parsed = parse$7(base.toString());
  const props = {
    transformations: {},
    ...parsed.params,
    ...params
  };
  if (width) {
    props.transformations.width = width?.toString();
  }
  if (height) {
    props.transformations.height = height?.toString();
  }
  if (format) {
    props.transformations.f = format === "jpg" ? "jpeg" : format;
  }
  props.transformations.fit ||= "cover";
  return new URL(formatUrl$2(props));
};
const transform$i = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$7(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudflare URL");
  }
  const props = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$8(props);
};
const transform$h = ({ url: originalUrl, width, height }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  if (width && height) {
    setParamIfUndefined(url, "aspect_ratio", `${width}:${height}`);
  }
  return url;
};
const storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/g;
const storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/g;
const splitFilters = (filters) => {
  if (!filters) {
    return {};
  }
  return Object.fromEntries(filters.split(":").map((filter) => {
    if (!filter)
      return [];
    const [key, value] = filter.split("(");
    return [key, value.replace(")", "")];
  }));
};
const generateFilters = (filters) => {
  if (!filters) {
    return void 0;
  }
  const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
  if (filterItems.length === 0) {
    return void 0;
  }
  return `filters:${filterItems.join(":")}`;
};
const parse$6 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const regex = url.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets;
  const [matches] = url.pathname.matchAll(regex);
  if (!matches || !matches.groups) {
    throw new Error("Invalid Storyblok URL");
  }
  const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
  const { format, ...filterMap } = splitFilters(filters);
  if (url.hostname === "img2.storyblok.com") {
    url.hostname = "a.storyblok.com";
  }
  return {
    base: url.origin + id,
    width: Number(width) || void 0,
    height: Number(height) || void 0,
    format,
    params: {
      crop,
      filters: filterMap,
      flipx,
      flipy
    },
    cdn: "storyblok"
  };
};
const generate$7 = ({ base, width = 0, height = 0, format, params = {} }) => {
  const { crop, filters, flipx = "", flipy = "" } = params;
  const size = `${flipx}${width}x${flipy}${height}`;
  return new URL([base, "m", crop, size, generateFilters(filters), format].filter(Boolean).join("/"));
};
const transform$g = ({ url: originalUrl, width, height, format }) => {
  const parsed = parse$6(originalUrl);
  if (!parsed) {
    return;
  }
  if (format) {
    if (!parsed.params) {
      parsed.params = { filters: {} };
    }
    if (!parsed.params.filters) {
      parsed.params.filters = {};
    }
    parsed.params.filters.format = format;
  }
  return generate$7({
    ...parsed,
    width,
    height
  });
};
const transform$f = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format, true);
  if (width && height) {
    setParamIfUndefined(url, "fit", "crop");
  }
  return url;
};
const delegateUrl = (url) => {
  const parsed = toUrl(url);
  const source = parsed.searchParams.get("url");
  if (!source || !source.startsWith("http")) {
    return false;
  }
  const cdn = getImageCdnForUrlByDomain(source);
  if (!cdn) {
    return false;
  }
  return {
    cdn,
    url: source
  };
};
const generate$6 = ({ base, width, params: { quality = 75, root = "_vercel" } = {} }) => {
  const url = new URL("http://n");
  url.pathname = `/${root}/image`;
  url.searchParams.set("url", base.toString());
  setParamIfDefined(url, "w", width, false, true);
  setParamIfUndefined(url, "q", quality);
  return toRelativeUrl(url);
};
const transform$e = ({ url, width, cdn }) => {
  const parsedUrl = toUrl(url);
  const isNextImage = parsedUrl.pathname.startsWith("/_next/image") || parsedUrl.pathname.startsWith("/_vercel/image");
  const src = isNextImage ? parsedUrl.searchParams.get("url") : url.toString();
  if (!src) {
    return void 0;
  }
  setParamIfDefined(parsedUrl, "w", width, true, true);
  if (isNextImage) {
    return toCanonicalUrlString(parsedUrl);
  }
  return generate$6({
    base: src,
    width,
    params: { root: cdn === "nextjs" ? "_next" : "_vercel" }
  });
};
const transform$d = (params) => transform$e({ ...params, cdn: "nextjs" });
const transform$c = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "wid", width, true, true);
  setParamIfDefined(url, "hei", height, true, true);
  setParamIfDefined(url, "fmt", format, true);
  setParamIfDefined(url, "qlt", getNumericParam(url, "qlt"), true);
  setParamIfDefined(url, "scl", getNumericParam(url, "scl"), true);
  setParamIfUndefined(url, "fit", "crop");
  if (!width && !height) {
    setParamIfUndefined(url, "scl", 1);
  }
  return url;
};
const transform$b = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format, true);
  setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
  setParamIfUndefined(url, "enlarge", 0);
  return url;
};
const transform$a = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
  return url;
};
const OBJECT_TO_DIRECTIVES_MAP = {
  width: "w",
  height: "h",
  autoWidthWithFallback: "w_auto",
  auto_width_fallback: "w_auto",
  scaleToScreenWidth: "pc",
  scale_to_screen_width: "pc",
  crop: "cr",
  outputFormat: "f",
  format: "f",
  fit: "m",
  fitMethod: "m",
  compression: "cmpr",
  sharpness: "s",
  rotate: "r",
  inline: "in",
  keepMeta: "meta",
  keep_meta: "meta",
  noOptimization: "pass",
  no_optimization: "pass",
  force_download: "dl",
  max_device_pixel_ratio: "maxdpr",
  maxDevicePixelRatio: "maxdpr"
};
function getDirective(key) {
  let keyArray = Object.keys(OBJECT_TO_DIRECTIVES_MAP);
  let directive = keyArray.find((k2) => OBJECT_TO_DIRECTIVES_MAP[k2] === key) || "";
  return directive;
}
function getParameterArray(url) {
  let url_string = url.toString();
  let paramArray = [];
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      paramArray = splitURL[1].split("/");
    }
  }
  return paramArray;
}
function getBaseUrl(url) {
  let url_string = url.toString();
  let baseUrl = "";
  if (url_string) {
    let splitURL = url_string.split("imgeng=");
    if (splitURL.length > 1) {
      baseUrl = splitURL[0].slice(0, -1);
    } else {
      baseUrl = url_string;
    }
  }
  return baseUrl;
}
const transform$9 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  const src = getBaseUrl(url);
  let directives = {};
  const param = url.toString() === src ? [] : getParameterArray(url);
  if (param.length) {
    directives = getDirectives(param);
  }
  if (width) {
    directives["width"] = width;
  }
  if (height) {
    directives["height"] = height;
  }
  if (format) {
    directives["format"] = format;
  }
  if (!directives.hasOwnProperty("fit")) {
    directives = { ...directives, "fit": "cropbox" };
  }
  let directives_string = build_IE_directives(directives);
  let query_string = build_IE_query_string(directives_string);
  let query_prefix = query_string === "" ? "" : src.includes("?") ? "&" : "?";
  return `${src}${query_prefix}${query_string}`;
};
function build_IE_directives(directives) {
  return Object.entries(directives).reduce((acc, [k2, v2]) => {
    return acc + maybe_create_directive(k2, v2);
  }, "");
}
function build_IE_query_string(directives_string) {
  if (directives_string && directives_string !== "") {
    return `imgeng=${directives_string}`;
  }
  return "";
}
function maybe_create_directive(directive, value) {
  let translated_directive = OBJECT_TO_DIRECTIVES_MAP[directive];
  if (translated_directive && (value || value === 0)) {
    return `/${translated_directive}_${value}`;
  }
  return "";
}
function getDirectives(paramArray) {
  let directives = {};
  paramArray.forEach((para) => {
    let keyValue = para.split("_");
    if (keyValue.length > 1) {
      let key = keyValue[0];
      let value = keyValue[1];
      let directiveKey = getDirective(key);
      if (directiveKey) {
        directives[directiveKey] = value;
      }
    }
  });
  return directives;
}
const transform$8 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  setParamIfDefined(url, "width", width, true, true);
  setParamIfDefined(url, "height", height, true, true);
  setParamIfDefined(url, "format", format);
  if (!url.searchParams.has("format")) {
    setParamIfUndefined(url, "auto", "webp");
  }
  if (width && height) {
    setParamIfUndefined(url, "fit", "crop");
  }
  return url;
};
const cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const imagedeliveryRegex = /https?:\/\/(?<host>imagedelivery.net)\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const parseTransforms = (transformations) => Object.fromEntries(transformations?.split(",")?.map((t2) => t2.split("=")) ?? []);
const formatUrl$1 = ({ host, accountHash, transformations = {}, imageId }) => {
  const transformString = Object.entries(transformations).filter(([key, value]) => Boolean(key) && value !== void 0).map(([key, value]) => `${key}=${value}`).join(",");
  const pathSegments = [
    ...host === "imagedelivery.net" ? [host] : [host, "cdn-cgi", "imagedelivery"],
    accountHash,
    imageId,
    transformString
  ].join("/");
  return `https://${pathSegments}`;
};
const parse$5 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matches = [
    ...url.toString().matchAll(cloudflareImagesRegex),
    ...url.toString().matchAll(imagedeliveryRegex)
  ];
  if (!matches.length) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const group = matches[0].groups || {};
  const { transformations: transformString, ...baseParams } = group;
  const { w: w2, h: h2, f: f2, ...transformations } = parseTransforms(transformString);
  return {
    base: url.toString(),
    width: Number(w2) || void 0,
    height: Number(h2) || void 0,
    format: f2,
    cdn: "cloudflare_images",
    params: { ...baseParams, transformations }
  };
};
const generate$5 = ({ base, width, height, format, params }) => {
  const parsed = parse$5(base.toString());
  const props = {
    transformations: {},
    ...parsed.params,
    ...params
  };
  if (width) {
    props.transformations.w = width?.toString();
  }
  if (height) {
    props.transformations.h = height?.toString();
  }
  if (format) {
    props.transformations.f = format;
  }
  props.transformations.fit ||= "cover";
  return new URL(formatUrl$1(props));
};
const transform$7 = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse$5(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const props = {
    ...parsed,
    width,
    height,
    format
  };
  return generate$5(props);
};
const parse$4 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const [modifiers, ...id] = url.pathname.split("/").slice(1);
  const params = Object.fromEntries(modifiers.split(",").map((modifier) => {
    const [key, value] = modifier.split("_");
    return [key, value];
  }));
  if (params.s) {
    const [width, height] = params.s.split("x");
    params.w ||= width;
    params.h ||= height;
  }
  return {
    base: id.join("/"),
    width: Number(params.w) || void 0,
    height: Number(params.h) || void 0,
    quality: Number(params.q) || void 0,
    format: params.f || "auto",
    params,
    cdn: "ipx"
  };
};
const generate$4 = ({ base: id, width, height, format, params }) => {
  const modifiers = params?.modifiers ?? {};
  if (width && height) {
    modifiers.s = `${width}x${height}`;
  } else if (width) {
    modifiers.w = `${width}`;
  } else if (height) {
    modifiers.h = `${height}`;
  }
  if (format) {
    modifiers.f = format;
  }
  const base = params?.base.endsWith("/") ? params?.base : `${params?.base}/`;
  const modifiersString = Object.entries(modifiers).map(([key, value]) => `${key}_${value}`).join(",");
  const stringId = id.toString();
  const image = stringId.startsWith("/") ? stringId.slice(1) : stringId;
  return `${base}${modifiersString}/${image}`;
};
const transform$6 = (options) => {
  const url = String(options.url);
  const parsedUrl = toUrl(url);
  const defaultBase = parsedUrl.pathname.startsWith("/_ipx") && parsedUrl.hostname !== "n" ? `${parsedUrl.origin}/_ipx` : "/_ipx";
  const base = options.cdnOptions?.ipx?.base ?? defaultBase;
  const isIpxUrl = base && base !== "/" && url.startsWith(base);
  if (isIpxUrl) {
    const parsed = parse$4(url.replace(base, ""));
    return generate$4({
      ...parsed,
      ...options,
      params: {
        ...options.cdnOptions?.ipx,
        base
      }
    });
  }
  return generate$4({
    ...options,
    base: url,
    params: {
      ...options.cdnOptions?.ipx,
      base
    }
  });
};
const transform$5 = ({ url: originalUrl, width, height, format, cdnOptions }) => {
  const parsedUrl = toUrl(originalUrl);
  const href = toCanonicalUrlString(new URL(parsedUrl.pathname, parsedUrl.origin));
  const url = { searchParams: new URLSearchParams() };
  setParamIfDefined(url, "href", href, true, true);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "f", format);
  setParamIfUndefined(url, "fit", "cover");
  const endpoint = cdnOptions?.astro?.endpoint ?? "/_image";
  return `${endpoint}?${url.searchParams.toString()}`;
};
const skippedParams = /* @__PURE__ */ new Set([
  "w",
  "h",
  "q",
  "fm",
  "url",
  "width",
  "height",
  "quality"
]);
const parse$3 = (url) => {
  const parsed = toUrl(url);
  const width = Number(parsed.searchParams.get("w") ?? parsed.searchParams.get("width")) ?? void 0;
  const height = Number(parsed.searchParams.get("h") ?? parsed.searchParams.get("height")) ?? void 0;
  const quality = Number(parsed.searchParams.get("q") ?? parsed.searchParams.get("quality")) || void 0;
  const format = parsed.searchParams.get("fm") || void 0;
  const base = parsed.searchParams.get("url") || "";
  const params = {
    quality
  };
  parsed.searchParams.forEach((value, key) => {
    if (skippedParams.has(key)) {
      return;
    }
    params[key] = value;
  });
  parsed.search = "";
  return {
    base,
    width,
    height,
    format,
    params,
    cdn: "netlify"
  };
};
const generate$3 = ({ base, width, height, format, params: { site, quality, ...params } = {} }) => {
  const url = toUrl("/.netlify/images", site);
  Object.entries(params).forEach(([key, value]) => setParamIfDefined(url, key, value));
  setParamIfDefined(url, "q", quality, true, true);
  setParamIfDefined(url, "w", width, true, true);
  setParamIfDefined(url, "h", height, true, true);
  setParamIfDefined(url, "fm", format);
  setParamIfUndefined(url, "fit", "cover");
  url.searchParams.set("url", base.toString());
  return toCanonicalUrlString(url);
};
const transform$4 = (options) => {
  const url = toUrl(options.url);
  if (url.pathname.startsWith("/.netlify/images")) {
    const { params, base, format } = parse$3(url);
    return generate$3({
      base,
      format,
      ...options,
      params: {
        ...params,
        // If hostname is "n", we're dealing with a relative URL, so we don't need to set the site param
        site: url.hostname === "n" ? void 0 : url.origin
      }
    });
  }
  return generate$3({
    ...options,
    base: options.url,
    params: {
      site: options.cdnOptions?.netlify?.site
    }
  });
};
const getTransformParams = (url) => {
  const transforms = url.searchParams.get("tr") || "";
  return transforms.split(",").reduce((acc, transform2) => {
    const [key, value] = transform2.split("-");
    acc[key] = value;
    return acc;
  }, {});
};
const transform$3 = ({ url: originalUrl, width, height, format }) => {
  const url = toUrl(originalUrl);
  const transformParams = getTransformParams(url);
  transformParams.w = width ? Math.round(width) : width;
  transformParams.h = height ? Math.round(height) : height;
  if (!transformParams.f) {
    transformParams.f = "auto";
  }
  if (format) {
    transformParams.f = format;
  }
  const tr = Object.keys(transformParams).map((key) => {
    const value = transformParams[key];
    if (value) {
      return `${key}-${value}`;
    }
  }).filter((x2) => x2).join(",");
  url.searchParams.set("tr", tr);
  return url;
};
const uploadcareRegex = /^https?:\/\/(?<host>[^\/]+)\/(?<uuid>[^\/]+)/g;
function extractFilename(cdnUrl) {
  const url = new URL(cdnUrl);
  const noOrigin = url.pathname + url.search + url.hash;
  const urlFilenameIdx = noOrigin.lastIndexOf("http");
  const plainFilenameIdx = noOrigin.lastIndexOf("/");
  let filename = "";
  if (urlFilenameIdx >= 0) {
    filename = noOrigin.slice(urlFilenameIdx);
  } else if (plainFilenameIdx >= 0) {
    filename = noOrigin.slice(plainFilenameIdx + 1);
  }
  return filename;
}
function isFileUrl(filename) {
  return filename.startsWith("http");
}
function splitFileUrl(fileUrl) {
  const url = new URL(fileUrl);
  return {
    pathname: url.origin + url.pathname || "",
    search: url.search || "",
    hash: url.hash || ""
  };
}
function trimFilename(cdnUrl) {
  const url = new URL(cdnUrl);
  const filename = extractFilename(cdnUrl);
  const filenamePathPart = isFileUrl(filename) ? splitFileUrl(filename).pathname : filename;
  url.pathname = url.pathname.replace(filenamePathPart, "");
  url.search = "";
  url.hash = "";
  return url.toString();
}
const normalizeCdnOperation = (operation) => {
  if (typeof operation !== "string" || !operation) {
    return "";
  }
  let str = operation.trim();
  if (str.startsWith("-/")) {
    str = str.slice(2);
  } else if (str.startsWith("/")) {
    str = str.slice(1);
  }
  if (str.endsWith("/")) {
    str = str.slice(0, str.length - 1);
  }
  return str;
};
function extractOperations(cdnUrl) {
  const withoutFilename = trimFilename(cdnUrl);
  const url = new URL(withoutFilename);
  const operationsMarker = url.pathname.indexOf("/-/");
  if (operationsMarker === -1) {
    return [];
  }
  const operationsStr = url.pathname.substring(operationsMarker);
  return operationsStr.split("/-/").filter(Boolean).map((operation) => normalizeCdnOperation(operation));
}
const parseOperations = (operations) => {
  return operations.length ? operations.reduce((acc, operation) => {
    const [key, value] = operation.split("/");
    return {
      ...acc,
      [key]: value
    };
  }, {}) : {};
};
const formatUrl = ({ host, uuid, operations = {}, filename }) => {
  const operationString = Object.entries(operations).map(([key, value]) => `${key}/${value}`).join("/-/");
  const pathSegments = [
    host,
    uuid,
    operationString ? `-/${operationString}` : "",
    filename
  ].join("/");
  return `https://${pathSegments}`;
};
const parse$2 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const matchers = [...url.toString().matchAll(uploadcareRegex)];
  if (!matchers.length) {
    throw new Error("Invalid Uploadcare URL");
  }
  const group = matchers[0].groups || {};
  const { ...baseParams } = group;
  const filename = extractFilename(url.toString());
  const { format: f2, ...operations } = parseOperations(extractOperations(url.toString()));
  const format = f2 && f2 !== "auto" ? f2 : "auto";
  const base = formatUrl({
    ...baseParams,
    filename: filename || void 0,
    operations: {
      ...operations,
      format
    }
  });
  return {
    base,
    cdn: "uploadcare",
    params: {
      ...group,
      filename: filename || void 0,
      operations: {
        ...operations,
        format
      }
    }
  };
};
const generate$2 = ({ base, width, height, params }) => {
  const baseUrl = base.toString();
  const parsed = parse$2(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  const props = {
    operations: {},
    ...parsed.params,
    ...params
  };
  if (width && height) {
    props.operations = {
      ...props.operations,
      resize: `${width}x${height}`
    };
  } else {
    if (width) {
      props.operations = {
        ...props.operations,
        resize: `${width}x`
      };
    }
    if (height) {
      props.operations = {
        ...props.operations,
        resize: `x${height}`
      };
    }
  }
  return formatUrl(props);
};
const transform$2 = ({ url: originalUrl, width, height }) => {
  const parsed = parse$2(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Uploadcare URL");
  }
  const props = {
    ...parsed,
    width,
    height
  };
  return generate$2(props);
};
const ALLOWED_FORMATS = ["origin"];
const STORAGE_URL_PREFIX = "/storage/v1/object/public/";
const RENDER_URL_PREFIX = "/storage/v1/render/image/public/";
const isRenderUrl = (url) => url.pathname.startsWith(RENDER_URL_PREFIX);
const parse$1 = (imageUrl) => {
  const url = toUrl(imageUrl);
  const isRender = isRenderUrl(url);
  if (!isRender) {
    return {
      cdn: "supabase",
      base: url.origin + url.pathname
    };
  }
  const imagePath = url.pathname.replace(RENDER_URL_PREFIX, "");
  const quality = url.searchParams.has("quality") ? Number(url.searchParams.get("quality")) : void 0;
  const width = url.searchParams.has("width") ? Number(url.searchParams.get("width")) : void 0;
  const height = url.searchParams.has("height") ? Number(url.searchParams.get("height")) : void 0;
  const format = url.searchParams.has("format") ? url.searchParams.get("format") : void 0;
  const resize = url.searchParams.has("resize") ? url.searchParams.get("resize") : void 0;
  return {
    cdn: "supabase",
    base: url.origin + STORAGE_URL_PREFIX + imagePath,
    width,
    height,
    format,
    params: {
      quality,
      resize
    }
  };
};
const generate$1 = ({ base, width, height, format, params }) => {
  const parsed = parse$1(base.toString());
  base = parsed.base;
  width = width || parsed.width;
  height = height || parsed.height;
  format = format || parsed.format;
  params = { ...parsed.params, ...params };
  const searchParams = new URLSearchParams();
  if (width)
    searchParams.set("width", roundIfNumeric(width).toString());
  if (height)
    searchParams.set("height", roundIfNumeric(height).toString());
  if (format && ALLOWED_FORMATS.includes(format)) {
    searchParams.set("format", format);
  }
  if (params?.quality) {
    searchParams.set("quality", roundIfNumeric(params.quality).toString());
  }
  if (params?.resize)
    searchParams.set("resize", params.resize);
  if (searchParams.toString() === "")
    return base;
  return parsed.base.replace(STORAGE_URL_PREFIX, RENDER_URL_PREFIX) + "?" + searchParams.toString();
};
const transform$1 = ({ url, width, height, format, cdnOptions }) => {
  const parsed = parse$1(url);
  return generate$1({
    base: parsed.base,
    width: width || parsed.width,
    height: height || parsed.height,
    format: format || parsed.format,
    params: cdnOptions?.supabase || parsed.params
  });
};
const hygraphRegex = /https:\/\/(?<region>[a-z0-9-]+)\.graphassets\.com\/(?<envId>[a-z0-9]+)(?:\/(?<transformations>.*?))?\/(?<handle>[a-z0-9]+)$/;
const parse = (url) => {
  const base = url.toString();
  const matches = base.match(hygraphRegex);
  if (!matches?.length) {
    throw new Error("Invalid Hygraph URL");
  }
  const group = matches.groups || {};
  const { transformations: unparsedTransformations, ...params } = group;
  const transformations = parseTransformations(unparsedTransformations || "");
  return {
    base,
    width: Number(transformations.resize?.width) || void 0,
    height: Number(transformations.resize?.height) || void 0,
    format: transformations.auto_image ? "auto" : transformations.output?.format?.toString() || void 0,
    params: { transformations, ...params },
    cdn: "hygraph"
  };
};
const generate = ({ base, width, height, format, params }) => {
  const parsed = parse(base.toString());
  const props = {
    transformations: {},
    ...parsed.params,
    ...params
  };
  if (width || height) {
    props.transformations.resize ||= {};
  }
  if (width && height) {
    props.transformations.resize.fit ||= "crop";
  }
  if (width) {
    props.transformations.resize.width = width;
  }
  if (height) {
    props.transformations.resize.height = height;
  }
  if (format === "auto") {
    props.transformations.auto_image = {};
  } else if (format) {
    props.transformations.output ||= {};
    props.transformations.output.format = format;
  }
  const url = new URL(base);
  url.pathname = `/${props.envId}/${formatTransformations(props.transformations)}/${props.handle}`;
  return url.toString();
};
const transform = ({ url: originalUrl, width, height, format = "auto" }) => {
  const parsed = parse(originalUrl);
  if (!parsed) {
    throw new Error("Invalid Hygraph URL");
  }
  const props = {
    ...parsed,
    width,
    height,
    format
  };
  return generate(props);
};
const parseTransformations = (transformations) => {
  if (!transformations) {
    return {};
  }
  return transformations.split("/").reduce((result, part) => {
    const [operation, params] = part.split("=");
    if (params) {
      result[operation] = params.split(",").reduce((obj, param) => {
        const [key, value] = param.split(":");
        obj[key] = isNaN(Number(value)) ? value : Number(value);
        return obj;
      }, {});
    } else {
      result[operation] = {};
    }
    return result;
  }, {});
};
const formatTransformations = (transformations) => {
  return Object.entries(transformations).filter(([key, value]) => Boolean(key) && value !== void 0).map(([key, value]) => Object.keys(value).length === 0 ? key : `${key}=${Object.entries(value).map(([key2, value2]) => `${key2}:${value2}`).join(",")}`).join("/");
};
const delegators = {
  vercel: delegateUrl,
  nextjs: delegateUrl
};
function getDelegatedCdn(url, cdn) {
  if (!(cdn in delegators)) {
    return false;
  }
  const maybeDelegate = delegators[cdn];
  if (!maybeDelegate) {
    return false;
  }
  return maybeDelegate(url);
}
function getCanonicalCdnForUrl(url, defaultCdn) {
  const cdn = getImageCdnForUrl(url) || defaultCdn;
  if (!cdn) {
    return false;
  }
  const maybeDelegated = getDelegatedCdn(url, cdn);
  if (maybeDelegated) {
    return maybeDelegated;
  }
  return { cdn, url };
}
const getTransformer = (cdn) => ({
  imgix: transform$n,
  contentful: transform$p,
  "builder.io": transform$o,
  shopify: transform$m,
  wordpress: transform$l,
  cloudimage: transform$k,
  cloudinary: transform$j,
  bunny: transform$h,
  storyblok: transform$g,
  cloudflare: transform$i,
  vercel: transform$e,
  nextjs: transform$d,
  scene7: transform$c,
  "kontent.ai": transform$f,
  keycdn: transform$b,
  directus: transform$a,
  imageengine: transform$9,
  contentstack: transform$8,
  "cloudflare_images": transform$7,
  ipx: transform$6,
  astro: transform$5,
  netlify: transform$4,
  imagekit: transform$3,
  uploadcare: transform$2,
  supabase: transform$1,
  hygraph: transform
})[cdn];
var getSizes = (width, layout) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size, image width is the max size,
    // otherwise it's the width of the screen
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case `fixed`:
      return `${width}px`;
    // Image is always the width of the screen
    case `fullWidth`:
      return `100vw`;
    default:
      return void 0;
  }
};
var pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
var getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  background
}) => {
  const styleEntries = [
    ["object-fit", objectFit]
  ];
  if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:") || background?.startsWith("/")) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["height", pixelate(height)]);
  }
  return Object.fromEntries(
    styleEntries.filter(([, value]) => value)
  );
};
var DEFAULT_RESOLUTIONS = [
  6016,
  // 6K
  5120,
  // 5K
  4480,
  // 4.5K
  3840,
  // 4K
  3200,
  // QHD+
  2560,
  // WQXGA
  2048,
  // QXGA
  1920,
  // 1080p
  1668,
  // Various iPads
  1280,
  // 720p
  1080,
  // iPhone 6-8 Plus
  960,
  // older horizontal phones
  828,
  // iPhone XR/11
  750,
  // iPhone 6-8
  640
  // older and lower-end phones
];
var LOW_RES_WIDTH = 24;
var getBreakpoints = ({
  width,
  layout,
  resolutions = DEFAULT_RESOLUTIONS
}) => {
  if (layout === "fullWidth") {
    return resolutions;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...resolutions.filter((w2) => w2 < doubleWidth)
    ];
  }
  return [];
};
var getSrcSetEntries = ({
  src,
  width,
  layout = "constrained",
  height,
  aspectRatio,
  breakpoints,
  cdn,
  transformer,
  format,
  cdnOptions
}) => {
  const canonical = getCanonicalCdnForUrl(src, cdn);
  if (canonical && !transformer) {
    transformer = getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return [];
  }
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints.sort((a3, b2) => a3 - b2).map((bp) => {
    let transformedHeight;
    if (height && aspectRatio) {
      transformedHeight = Math.round(bp / aspectRatio);
    }
    return {
      url: canonical ? canonical.url : src,
      width: bp,
      height: transformedHeight,
      format,
      cdnOptions
    };
  });
};
var getSrcSet = (options) => {
  let { src, cdn, transformer } = options;
  const canonical = getCanonicalCdnForUrl(src, cdn);
  if (canonical && !transformer) {
    transformer = getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return "";
  }
  return getSrcSetEntries({ ...options, transformer }).map((transform2) => {
    const url = transformer(transform2);
    return `${url?.toString()} ${transform2.width}w`;
  }).join(",\n");
};
function transformSharedProps({
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  ...props
}) {
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  if (priority) {
    props.loading ||= "eager";
    props.fetchpriority ||= "high";
  } else {
    props.loading ||= "lazy";
    props.decoding ||= "async";
  }
  if (props.alt === "") {
    props.role ||= "presentation";
  }
  if (aspectRatio) {
    if (width) {
      if (height) ;
      else {
        height = Math.round(width / aspectRatio);
      }
    } else if (height) {
      width = Math.round(height * aspectRatio);
    } else ;
  } else if (width && height) {
    aspectRatio = width / height;
  } else ;
  return {
    width,
    height,
    aspectRatio,
    layout,
    ...props
  };
}
function transformProps(props) {
  let {
    src,
    cdn,
    transformer,
    background,
    layout,
    objectFit,
    breakpoints,
    width,
    height,
    aspectRatio,
    unstyled,
    cdnOptions,
    ...transformedProps
  } = transformSharedProps(props);
  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : void 0;
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH / aspectRatio) : void 0;
    const lowResImage = transformer({
      url,
      width: LOW_RES_WIDTH,
      height: lowResHeight,
      cdnOptions
    });
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }
  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background
  };
  transformedProps.sizes ||= getSizes(width, layout);
  if (!unstyled) {
    transformedProps.style = {
      ...getStyle(styleProps),
      ...transformedProps.style
    };
  }
  if (transformer) {
    transformedProps.srcset = getSrcSet({
      src: url,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      cdn,
      cdnOptions
    });
    const transformed = transformer({ url, width, height, cdnOptions });
    if (transformed) {
      url = transformed;
    }
    if (layout === "fullWidth" || layout === "constrained") {
      width = void 0;
      height = void 0;
    }
  }
  return {
    ...transformedProps,
    src: url?.toString(),
    width,
    height
  };
}
function normalizeImageType(type) {
  if (!type) {
    return {};
  }
  if (type.startsWith("image/")) {
    return {
      format: type.slice(6),
      mimeType: type
    };
  }
  return {
    format: type,
    mimeType: `image/${type === "jpg" ? "jpeg" : type}`
  };
}
function transformSourceProps({ media, type, ...props }) {
  let {
    src,
    cdn,
    transformer,
    layout,
    breakpoints,
    width,
    height,
    aspectRatio,
    sizes,
    loading,
    decoding,
    cdnOptions,
    ...rest
  } = transformSharedProps(props);
  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : void 0;
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return {};
  }
  const { format, mimeType } = normalizeImageType(type);
  sizes ||= getSizes(width, layout);
  const srcset = getSrcSet({
    src: url,
    width,
    height,
    aspectRatio,
    layout,
    breakpoints,
    transformer,
    cdn,
    format,
    cdnOptions
  });
  const transformed = transformer({ url, width, height, cdnOptions });
  if (transformed) {
    url = transformed;
  }
  const returnObject = {
    ...rest,
    sizes,
    srcset
  };
  if (media) {
    {
      returnObject.media = media;
    }
  }
  if (mimeType) {
    returnObject.type = mimeType;
  }
  return returnObject;
}
var nestedKeys = /* @__PURE__ */ new Set(["style"]);
var isNewReact = "use" in React;
var fixedMap = {
  srcset: "srcSet",
  fetchpriority: isNewReact ? "fetchPriority" : "fetchpriority"
};
var camelize = (key) => {
  if (key.startsWith("data-") || key.startsWith("aria-")) {
    return key;
  }
  return fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase());
};
function camelizeProps(props) {
  return Object.fromEntries(
    Object.entries(props).map(([k2, v2]) => [
      camelize(k2),
      nestedKeys.has(k2) && v2 && typeof v2 !== "string" ? camelizeProps(v2) : v2
    ])
  );
}
var Image = reactExports.forwardRef(
  function Image2(props, ref) {
    const camelizedProps = camelizeProps(transformProps(props));
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { ...camelizedProps, ref });
  }
);
reactExports.forwardRef(
  function Source2(props, ref) {
    const camelizedProps = camelizeProps(
      transformSourceProps(
        props
      )
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("source", { ...camelizedProps, ref });
  }
);
const dots = "mx-[1px] inline-block h-1 w-1 animate-blink rounded-md";
const LoadingDots = ({ className }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-2 inline-flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: clsx(dots, className) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: clsx(dots, "animation-delay-[200ms]", className) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: clsx(dots, "animation-delay-[400ms]", className) })
  ] });
};
const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className, children: [
  `${new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol"
  }).format(parseFloat(amount))}`,
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: clsx("ml-1 inline", currencyCodeClassName),
      children: `${currencyCode}`
    }
  )
] });
function DeleteItemButton({
  item,
  optimisticUpdate
}) {
  const merchandiseId = item.merchandise.id;
  const handleClick = () => {
    optimisticUpdate(merchandiseId, "delete");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      "aria-label": "Remove cart item",
      className: "flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "mx-[1px] h-4 w-4 text-white dark:text-black" })
    }
  );
}
function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}) {
  const handleClick = () => {
    optimisticUpdate(item.merchandise.id, type);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      "aria-label": type === "plus" ? "Increase item quantity" : "Reduce item quantity",
      className: clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus"
        }
      ),
      children: type === "plus" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-4 w-4 dark:text-neutral-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "h-4 w-4 dark:text-neutral-500" })
    }
  );
}
function OpenCart({
  className,
  quantity
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors dark:border-neutral-700 dark:bg-black dark:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForwardRef$1,
      {
        className: clsx(
          "h-4 transition-all ease-in-out hover:scale-110",
          className
        )
      }
    ),
    quantity ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mt-2 -mr-2 absolute top-0 right-0 h-4 w-4 rounded-sm bg-blue-600 font-medium text-[11px] text-white", children: quantity }) : null
  ] });
}
function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [isCheckingOut, setIsCheckingOut] = reactExports.useState(false);
  const quantityRef = reactExports.useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  reactExports.useEffect(() => {
    if (cart?.totalQuantity && cart?.totalQuantity !== quantityRef.current && cart?.totalQuantity > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity]);
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const checkoutUrl = await getCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": "Open cart",
        onClick: openCart,
        className: "cursor-pointer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(OpenCart, { quantity: cart?.totalQuantity })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ke$1, { show: isOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ht, { onClose: closeCart, className: "relative z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ke$1.Child,
        {
          as: reactExports.Fragment,
          enter: "transition-all ease-in-out duration-300",
          enterFrom: "opacity-0 backdrop-blur-none",
          enterTo: "opacity-100 backdrop-blur-[.5px]",
          leave: "transition-all ease-in-out duration-200",
          leaveFrom: "opacity-100 backdrop-blur-[.5px]",
          leaveTo: "opacity-0 backdrop-blur-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ke$1.Child,
        {
          as: reactExports.Fragment,
          enter: "transition-all ease-in-out duration-300",
          enterFrom: "translate-x-full",
          enterTo: "translate-x-0",
          leave: "transition-all ease-in-out duration-200",
          leaveFrom: "translate-x-0",
          leaveTo: "translate-x-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ht.Panel, { className: "fixed top-0 right-0 bottom-0 flex h-full w-full flex-col border-neutral-200 border-l bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg", children: "My Cart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Close cart", onClick: closeCart, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseCart, {}) })
            ] }),
            !cart || cart.lines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 flex w-full flex-col items-center justify-center overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-16" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center font-bold text-2xl", children: "Your cart is empty." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col justify-between overflow-hidden p-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grow overflow-auto py-4", children: cart.lines.sort(
                (a3, b2) => a3.merchandise.product.title.localeCompare(
                  b2.merchandise.product.title
                )
              ).map((item) => {
                const merchandiseSearchParams = {};
                item.merchandise.selectedOptions.forEach(
                  ({ name, value }) => {
                    if (value !== DEFAULT_OPTION) {
                      merchandiseSearchParams[name.toLowerCase()] = value;
                    }
                  }
                );
                const merchandiseUrl = createUrl(
                  `/product/${item.merchandise.product.handle}`,
                  new URLSearchParams(merchandiseSearchParams)
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "li",
                  {
                    className: "flex w-full flex-col border-neutral-300 border-b dark:border-neutral-700",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full flex-row justify-between px-1 py-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mt-2 -ml-1 absolute z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        DeleteItemButton,
                        {
                          item,
                          optimisticUpdate: updateCartItem
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Image,
                          {
                            className: "h-full w-full object-cover",
                            width: 64,
                            height: 64,
                            alt: item.merchandise.product.featuredImage?.altText || item.merchandise.product.title,
                            src: item.merchandise.product.featuredImage?.url || ""
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: merchandiseUrl,
                            onClick: closeCart,
                            className: "z-30 ml-2 flex flex-row space-x-4",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col text-base", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: item.merchandise.product.title }),
                              item.merchandise.title !== DEFAULT_OPTION ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-500 text-sm dark:text-neutral-400", children: item.merchandise.title }) : null
                            ] })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 flex-col justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Price,
                          {
                            className: "flex justify-end space-y-2 text-right text-sm",
                            amount: item.cost.totalAmount.amount,
                            currencyCode: item.cost.totalAmount.currencyCode
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EditItemQuantityButton,
                            {
                              item,
                              type: "minus",
                              optimisticUpdate: updateCartItem
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "w-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full text-sm", children: item.quantity }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EditItemQuantityButton,
                            {
                              item,
                              type: "plus",
                              optimisticUpdate: updateCartItem
                            }
                          )
                        ] })
                      ] })
                    ] })
                  },
                  item.id ?? item.merchandise.id
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 text-neutral-500 text-sm dark:text-neutral-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-neutral-200 border-b pb-1 dark:border-neutral-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Taxes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Price,
                    {
                      className: "text-right text-base text-black dark:text-white",
                      amount: cart.cost.totalTaxAmount.amount,
                      currencyCode: cart.cost.totalTaxAmount.currencyCode
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Shipping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-right", children: "Calculated at checkout" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Price,
                    {
                      className: "text-right text-base text-black dark:text-white",
                      amount: cart.cost.totalAmount.amount,
                      currencyCode: cart.cost.totalAmount.currencyCode
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleCheckout,
                  disabled: isCheckingOut,
                  className: "block w-full rounded-full bg-blue-600 p-3 text-center font-medium text-sm text-white opacity-90 hover:opacity-100 disabled:opacity-50",
                  children: isCheckingOut ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { className: "bg-white" }) : "Proceed to Checkout"
                }
              )
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
function CloseCart({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ForwardRef,
    {
      className: clsx(
        "h-6 transition-all ease-in-out hover:scale-110",
        className
      )
    }
  ) });
}
function Search() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const qParam = search?.q ?? "";
  const [inputValue, setInputValue] = reactExports.useState(qParam);
  reactExports.useEffect(() => {
    setInputValue(qParam);
  }, [qParam]);
  function onSubmit(event) {
    event.preventDefault();
    const trimmed = inputValue.trim();
    navigate({
      to: "/search",
      search: trimmed ? { q: trimmed } : {}
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      className: "relative w-full w-max-[550px] lg:w-80 xl:w-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "q",
            placeholder: "Search for products...",
            autoComplete: "off",
            value: inputValue,
            onChange: (e2) => setInputValue(e2.target.value),
            className: "h-11 w-full rounded-lg border bg-white px-4 text-base text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-0 right-0 mr-3 flex h-full items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$4, { className: "h-4" }) })
      ]
    }
  );
}
function MobileMenu({ menu }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  reactExports.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  reactExports.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: openMobileMenu,
        "aria-label": "Open mobile menu",
        className: "flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$5, { className: "h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ke$1, { show: isOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ht, { onClose: closeMobileMenu, className: "relative z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ke$1.Child,
        {
          as: reactExports.Fragment,
          enter: "transition-all ease-in-out duration-300",
          enterFrom: "opacity-0 backdrop-blur-none",
          enterTo: "opacity-100 backdrop-blur-[.5px]",
          leave: "transition-all ease-in-out duration-200",
          leaveFrom: "opacity-100 backdrop-blur-[.5px]",
          leaveTo: "opacity-0 backdrop-blur-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ke$1.Child,
        {
          as: reactExports.Fragment,
          enter: "transition-all ease-in-out duration-300",
          enterFrom: "translate-x-[-100%]",
          enterTo: "translate-x-0",
          leave: "transition-all ease-in-out duration-200",
          leaveFrom: "translate-x-0",
          leaveTo: "translate-x-[-100%]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ht.Panel, { className: "fixed top-0 right-0 bottom-0 left-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white",
                onClick: closeMobileMenu,
                "aria-label": "Close mobile menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
            menu.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex w-full flex-col", children: menu.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "py-2 text-black text-xl transition-colors hover:text-neutral-500 dark:text-white",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.path, onClick: closeMobileMenu, children: item.title })
              },
              item.title
            )) }) : null
          ] }) })
        }
      )
    ] }) })
  ] });
}
const SITE_NAME$2 = "Shopify Store";
function Navbar() {
  const { data: menu = [] } = useQuery({
    queryKey: ["menu", "next-js-frontend-header-menu"],
    queryFn: () => getMenu("next-js-frontend-header-menu"),
    staleTime: 5 * 60 * 1e3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "relative flex items-center justify-between p-4 lg:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block flex-none md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileMenu, { menu }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full md:w-1/3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogoSquare, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-2 flex-none font-medium text-sm uppercase md:hidden lg:block", children: SITE_NAME$2 })
            ]
          }
        ),
        menu.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden gap-6 text-sm md:flex md:items-center", children: menu.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.path,
            className: "text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300",
            children: item.title
          }
        ) }, item.title)) }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden justify-center md:flex md:w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end md:w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartModal, {}) })
    ] })
  ] });
}
const appCss = "/assets/styles-DSNGJVwk.css";
const SITE_NAME$1 = "Shopify Store";
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: SITE_NAME$1
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  shellComponent: RootDocument
});
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { closeButton: true })
  ] });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-neutral-600 dark:text-neutral-400", children: "Page not found" })
  ] });
}
const $$splitComponentImporter$5 = () => import("./search-D1pguE8h.js");
const Route$5 = createFileRoute("/search")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["collections"],
      queryFn: getCollections,
      staleTime: 5 * 60 * 1e3
    });
  }
});
const $$splitComponentImporter$4 = () => import("./_page-wFd5QXR3.js");
const Route$4 = createFileRoute("/$page")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  loader: async ({
    params,
    context
  }) => {
    const page = await context.queryClient.ensureQueryData({
      queryKey: ["page", params.page],
      queryFn: () => getPage(params.page),
      staleTime: 5 * 60 * 1e3
    });
    if (!page) {
      throw notFound();
    }
    return {
      page
    };
  },
  head: ({
    loaderData
  }) => {
    const page = loaderData?.page;
    if (!page) {
      return {
        meta: [{
          title: "Page Not Found"
        }]
      };
    }
    return {
      meta: [{
        title: page.seo?.title || page.title
      }, {
        name: "description",
        content: page.seo?.description || page.bodySummary
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "article:published_time",
        content: page.createdAt
      }, {
        property: "article:modified_time",
        content: page.updatedAt
      }]
    };
  }
});
const $$splitComponentImporter$3 = () => import("./index-DFrFh8ZF.js");
const SITE_NAME = "Shopify Store";
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: SITE_NAME
    }, {
      name: "description",
      content: "High-performance ecommerce store built with TanStack Start and Shopify."
    }, {
      property: "og:type",
      content: "website"
    }]
  }),
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["collection-products", "hidden-homepage-featured-items"],
      queryFn: () => getCollectionProducts({
        collection: "hidden-homepage-featured-items"
      }),
      staleTime: 5 * 60 * 1e3
    });
  }
});
const $$splitComponentImporter$2 = () => import("./index-D2S68sLB.js");
const searchParamsSchema$1 = objectType({
  q: stringType().optional(),
  sort: stringType().optional()
});
const Route$2 = createFileRoute("/search/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  validateSearch: searchParamsSchema$1,
  head: () => ({
    meta: [{
      title: "Search"
    }, {
      name: "description",
      content: "Search for products in the store."
    }]
  }),
  loaderDeps: ({
    search
  }) => ({
    q: search.q,
    sort: search.sort
  }),
  loader: async ({
    context,
    deps
  }) => {
    const {
      sortKey,
      reverse
    } = sorting.find((item) => item.slug === deps.sort) || defaultSort;
    await context.queryClient.ensureQueryData({
      queryKey: ["products", {
        query: deps.q,
        sortKey,
        reverse
      }],
      queryFn: () => getProducts({
        query: deps.q,
        sortKey,
        reverse
      }),
      staleTime: 5 * 60 * 1e3
    });
  }
});
const $$splitComponentImporter$1 = () => import("./_collection-94Oi12pF.js");
const searchParamsSchema = objectType({
  sort: stringType().optional()
});
const Route$1 = createFileRoute("/search/$collection")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: searchParamsSchema,
  loaderDeps: ({
    search
  }) => ({
    sort: search.sort
  }),
  loader: async ({
    params,
    context,
    deps
  }) => {
    const collection = await context.queryClient.ensureQueryData({
      queryKey: ["collection", params.collection],
      queryFn: () => getCollection(params.collection),
      staleTime: 5 * 60 * 1e3
    });
    if (!collection) {
      throw notFound();
    }
    const {
      sortKey,
      reverse
    } = sorting.find((item) => item.slug === deps.sort) || defaultSort;
    await context.queryClient.ensureQueryData({
      queryKey: ["collection-products", params.collection, {
        sortKey,
        reverse
      }],
      queryFn: () => getCollectionProducts({
        collection: params.collection,
        sortKey,
        reverse
      }),
      staleTime: 5 * 60 * 1e3
    });
    return {
      collection
    };
  },
  head: ({
    loaderData
  }) => {
    const collection = loaderData?.collection;
    if (!collection) {
      return {
        meta: [{
          title: "Collection Not Found"
        }]
      };
    }
    return {
      meta: [{
        title: collection.seo?.title || collection.title
      }, {
        name: "description",
        content: collection.seo?.description || collection.description || `${collection.title} products`
      }]
    };
  }
});
const $$splitComponentImporter = () => import("./_handle-Di9QFdZm.js");
const Route2 = createFileRoute("/product/$handle")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params,
    context
  }) => {
    const product = await context.queryClient.ensureQueryData({
      queryKey: ["product", params.handle],
      queryFn: () => getProduct(params.handle),
      staleTime: 5 * 60 * 1e3
    });
    if (!product) {
      throw notFound();
    }
    context.queryClient.prefetchQuery({
      queryKey: ["product-recommendations", product.id],
      queryFn: () => getProductRecommendations(product.id),
      staleTime: 5 * 60 * 1e3
    });
    return {
      product
    };
  },
  head: ({
    loaderData
  }) => {
    const product = loaderData?.product;
    if (!product) {
      return {
        meta: [{
          title: "Product Not Found"
        }]
      };
    }
    const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
    return {
      meta: [{
        title: product.seo?.title || product.title
      }, {
        name: "description",
        content: product.seo?.description || product.description
      }, {
        name: "robots",
        content: indexable ? "index, follow" : "noindex, nofollow"
      }, {
        property: "og:title",
        content: product.seo?.title || product.title
      }, {
        property: "og:description",
        content: product.seo?.description || product.description
      }, ...product.featuredImage?.url ? [{
        property: "og:image",
        content: product.featuredImage.url
      }] : []]
    };
  }
});
const SearchRoute = Route$5.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$6
});
const PageRoute = Route$4.update({
  id: "/$page",
  path: "/$page",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const SearchIndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => SearchRoute
});
const SearchCollectionRoute = Route$1.update({
  id: "/$collection",
  path: "/$collection",
  getParentRoute: () => SearchRoute
});
const ProductHandleRoute = Route2.update({
  id: "/product/$handle",
  path: "/product/$handle",
  getParentRoute: () => Route$6
});
const SearchRouteChildren = {
  SearchCollectionRoute,
  SearchIndexRoute
};
const SearchRouteWithChildren = SearchRoute._addFileChildren(SearchRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  PageRoute,
  SearchRoute: SearchRouteWithChildren,
  ProductHandleRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 font-bold text-4xl", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-lg text-neutral-600 dark:text-neutral-400", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "rounded-full bg-blue-600 px-6 py-3 text-white hover:opacity-90",
        children: "Go back home"
      }
    )
  ] });
}
const getRouter = () => {
  const rqContext = getContext();
  const router2 = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFoundComponent,
    Wrap: (props) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { ...rqContext, children: props.children });
    }
  });
  setupRouterSsrQueryIntegration({
    router: router2,
    queryClient: rqContext.queryClient
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ForwardRef$2 as F,
  Image as I,
  Link as L,
  Price as P,
  Route$4 as R,
  useSearch as a,
  useQuery as b,
  clsx as c,
  Route$2 as d,
  Route$1 as e,
  useCart as f,
  Route2 as g,
  router as r,
  useLocation as u
};
