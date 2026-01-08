# TanStack Start Shopify Commerce Application

## Important Rules

1. **NEVER deploy or commit without explicit permission.** Always ask before running `git commit`, `git push`, `bun run deploy`, or any deployment commands.
2. **All deployments go through GitHub.** Push changes to a branch and create a PR - Cloudflare will build and deploy automatically from the `main` branch.

## Project Overview

A high-performance, server-rendered ecommerce application built with TanStack Start and deployed on Cloudflare Workers. Integrates with Shopify as a headless storefront using the Storefront API.

Originally based on Vercel's Next.js Commerce template, migrated to TanStack Start for edge deployment on Cloudflare Workers.

## Tech Stack

### Core Framework
- **TanStack Start 1.146.0** - Full-stack React framework with SSR
- **TanStack Router 1.146.0** - Type-safe file-based routing
- **TanStack Query 5.90.16** - Data fetching, caching, and server state
- **Vite 7.3.1** - Build tool and dev server
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type-safe development
- **Bun 1.3.5** - JavaScript runtime and package manager

### Deployment
- **Cloudflare Workers** - Edge deployment via `@cloudflare/vite-plugin`
- **Wrangler 4.58.0** - Cloudflare CLI for deployment

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS via `@tailwindcss/vite`
- **@tailwindcss/typography** - Typographic defaults
- **@tailwindcss/container-queries** - Container query support
- **Geist Font 1.5.1** - Vercel's typeface
- **clsx** - Utility for constructing className strings

### UI Components
- **@headlessui/react 2.2.9** - Unstyled, accessible UI components
- **@heroicons/react 2.2.0** - SVG icons
- **Sonner 2.0.7** - Toast notifications
- **@unpic/react 1.0.2** - Image optimization

### Development Tools
- **Biome 2.3.11** - Fast formatter and linter

### Shopify Integration
- **Shopify Storefront API** - GraphQL API for headless commerce
- Custom integration layer in `src/lib/shopify/`

## Project Structure

```
shopify-app/
├── src/
│   ├── routes/                   # TanStack Router file-based routes
│   │   ├── __root.tsx            # Root layout (navbar, footer, providers)
│   │   ├── index.tsx             # Homepage
│   │   ├── $page.tsx             # Dynamic CMS pages
│   │   ├── search.tsx            # Search layout (sidebar, filters)
│   │   ├── product/
│   │   │   └── $handle.tsx       # Product detail page
│   │   └── search/
│   │       ├── index.tsx         # Search results
│   │       └── $collection.tsx   # Collection pages
│   ├── components/               # React components
│   │   ├── cart/                 # Shopping cart (modal, add/remove buttons)
│   │   ├── grid/                 # Product grid layouts
│   │   ├── icons/                # Icon components
│   │   ├── layout/               # Navbar, footer, search
│   │   └── product/              # Gallery, variant selector, description
│   ├── lib/                      # Utilities and integrations
│   │   ├── shopify/              # Shopify API layer
│   │   │   ├── fragments/        # GraphQL fragments
│   │   │   ├── mutations/        # Cart mutations
│   │   │   ├── queries/          # Product/collection queries
│   │   │   ├── types.ts          # TypeScript types
│   │   │   └── index.ts          # Main API functions
│   │   ├── cart/                 # Cart server functions
│   │   ├── constants.ts          # App constants
│   │   ├── type-guards.ts        # Type guard utilities
│   │   └── utils.ts              # Helper functions
│   ├── integrations/
│   │   └── tanstack-query/       # Query client provider
│   ├── router.tsx                # Router configuration
│   ├── routeTree.gen.ts          # Auto-generated route tree
│   ├── styles.css                # Global styles (Tailwind imports)
│   └── vite-env.d.ts             # Vite type definitions
├── vite.config.ts                # Vite + plugins configuration
├── wrangler.jsonc                # Cloudflare Workers config
├── tsconfig.json                 # TypeScript configuration
├── biome.json                    # Biome linter/formatter config
└── package.json                  # Dependencies and scripts
```

## Development Scripts

```bash
# Development
bun dev              # Start Vite dev server on port 3000
bun run build        # Build for production (vite build + tsc)
bun run preview      # Preview production build locally

# Deployment
bun run deploy       # Build and deploy to Cloudflare Workers
bun run cf-typegen   # Generate Cloudflare bindings types

# Code Quality
bun run type         # TypeScript type checking
bun run check        # Biome lint and format check
bun run fix          # Auto-fix issues with Biome
bun run fix-unsafe   # Auto-fix including unsafe fixes
bun run check-all    # Run type + check together
```

## Environment Variables

Required environment variables in `.env.local`:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_REVALIDATION_SECRET=your-secret-key
SITE_NAME=Your Site Name
```

### Environment Variable Access Pattern

Environment variables are accessed via `import.meta.env` which Vite bakes in at build time:

```typescript
const storeDomain = import.meta.env.SHOPIFY_STORE_DOMAIN || '';
const key = import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
```

- **Local development:** Variables loaded from `.env.local`
- **Cloudflare CI builds:** Variables configured in Cloudflare Dashboard under Build settings

### Production Environment (Cloudflare)

Variables must be configured in **two places** in the Cloudflare Dashboard:

**1. Build-time variables** (Settings > Build > Variables and secrets):
- `SHOPIFY_STORE_DOMAIN` - Required for Vite to bake into SSR bundle
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Required for Vite to bake into SSR bundle

**2. Runtime variables** (Settings > Variables and Secrets):
- `SHOPIFY_STORE_DOMAIN` (Plaintext)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (Secret)
- `SHOPIFY_REVALIDATION_SECRET` (Secret)

To add/update runtime secrets via CLI:
```bash
wrangler secret put SHOPIFY_STOREFRONT_ACCESS_TOKEN
wrangler secret put SHOPIFY_REVALIDATION_SECRET
```

## Key Architecture Patterns

### 1. Route Loaders with TanStack Query

Data is prefetched in route loaders using `ensureQueryData`:

```typescript
export const Route = createFileRoute('/product/$handle')({
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData({
      queryKey: ['product', params.handle],
      queryFn: () => getProduct(params.handle),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});
```

### 2. Cache Strategy (TanStack Query staleTime)

| Data Type | staleTime | Rationale |
|-----------|-----------|-----------|
| Products | 5 minutes | Balance freshness with performance |
| Collections | 5 minutes | Infrequently changing |
| Cart | 0 (always fresh) | User-specific, must be current |

```typescript
// In components, use the same query keys
const { data: product } = useQuery({
  queryKey: ['product', handle],
  queryFn: () => getProduct(handle),
  staleTime: 5 * 60 * 1000,
});
```

### 3. Server Functions for Mutations

Cart operations use TanStack Start server functions:

```typescript
// src/lib/cart/actions.ts
export const addItem = createServerFn({ method: 'POST' })
  .validator(addItemSchema)
  .handler(async ({ data }) => {
    let cartId = getCartIdFromCookie();
    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
      setCartCookie(cartId);
    }
    return addToCartWithId(cartId, [{ 
      merchandiseId: data.merchandiseId, 
      quantity: 1 
    }]);
  });
```

### 4. Cookie Handling in Cloudflare Workers

Cookies are accessed via Web Standards API:

```typescript
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server';

// Reading cookies
const cookieHeader = getRequestHeader('Cookie');
const cartId = parseCookies(cookieHeader).cartId;

// Setting cookies
setResponseHeader('Set-Cookie', `cartId=${id}; Path=/; HttpOnly; SameSite=Lax`);
```

### 5. Image Optimization with @unpic/react

```typescript
import { Image } from '@unpic/react';

<Image
  src={product.featuredImage.url}
  layout="constrained"
  width={550}
  height={550}
  alt={product.featuredImage.altText}
  priority={true}
/>
```

Unpic automatically handles Shopify CDN image transforms via URL parameters.

## Shopify API Integration

### Key Functions (`src/lib/shopify/index.ts`)

**Product Operations:**
- `getProduct(handle)` - Get single product by handle
- `getProducts({ query, reverse, sortKey })` - Search/list products
- `getProductRecommendations(productId)` - Related products

**Collection Operations:**
- `getCollection(handle)` - Get single collection
- `getCollections()` - Get all collections
- `getCollectionProducts({ collection, reverse, sortKey })` - Products in collection

**Cart Operations (require cartId parameter):**
- `createCart()` - Create new cart
- `getCartById(cartId)` - Get cart by ID
- `addToCartWithId(cartId, lines)` - Add items
- `removeFromCartWithId(cartId, lineIds)` - Remove items
- `updateCartWithId(cartId, lines)` - Update quantities

**Content Operations:**
- `getMenu(handle)` - Navigation menu
- `getPage(handle)` - CMS page content
- `getPages()` - All pages

### GraphQL Structure

```
src/lib/shopify/
├── fragments/
│   ├── cart.ts          # Cart fields
│   ├── image.ts         # Image fields
│   ├── product.ts       # Product fields
│   └── seo.ts           # SEO fields
├── mutations/
│   └── cart.ts          # Cart create/update/delete
├── queries/
│   ├── cart.ts          # Get cart
│   ├── collection.ts    # Collection queries
│   ├── menu.ts          # Navigation menu
│   ├── page.ts          # CMS pages
│   └── product.ts       # Product queries
└── types.ts             # TypeScript interfaces
```

## Configuration Files

### vite.config.ts

```typescript
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envPrefix: ['VITE_', 'SHOPIFY_'],
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
```

### wrangler.jsonc

```jsonc
{
  "name": "shopify-app",
  "compatibility_date": "2025-01-08",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".output/server/index.js",
  "assets": { "directory": ".output/client" },
  "observability": { "enabled": true }
}
```

### tsconfig.json Path Aliases

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "lib/*": ["./src/lib/*"],
      "components/*": ["./src/components/*"]
    }
  }
}
```

## Component Patterns

### Client Components

Components that need interactivity use `'use client'` directive:

```typescript
'use client';

import { useProduct, useUpdateURL } from '@/components/product/product-context';

export function VariantSelector({ options, variants }) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  // ...
}
```

**Client components in this project:**
- `cart/modal.tsx` - Cart modal with open/close state
- `cart/add-to-cart.tsx` - Add to cart with mutations
- `cart/delete-item-button.tsx` - Remove items
- `cart/edit-item-quantity-button.tsx` - Update quantities
- `product/gallery.tsx` - Image gallery with navigation
- `product/variant-selector.tsx` - Option selection
- `product/product-context.tsx` - Product state management
- `layout/navbar/search.tsx` - Search input
- `layout/navbar/mobile-menu.tsx` - Mobile navigation
- `layout/search/filter/dropdown.tsx` - Sort dropdown
- `layout/search/collections.tsx` - Collection list
- `price.tsx` - Price formatting

### Navigation with TanStack Router

```typescript
import { Link, useNavigate, useSearch } from '@tanstack/react-router';

// Link component
<Link to="/product/$handle" params={{ handle: 'my-product' }}>
  View Product
</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate({ to: '/search', search: { q: query } });

// Reading search params
const { q, sort } = Route.useSearch();
```

## Code Style (Biome)

**Formatting:**
- 2 space indentation
- 80 character line width
- Single quotes
- Semicolons always
- Trailing commas

**Linting:**
- Recommended rules enabled
- Sorted Tailwind classes
- Import type usage warnings
- Accessibility checks

## Git Workflow

**Main Branch:** `main`
**Current Branch:** `build/tanstack`

## Deployment

### Local Development
```bash
bun dev
# Opens http://localhost:3000
```

### Production Build
```bash
bun run build
# Outputs to dist/client and dist/server
```

### Deploy to Cloudflare (via GitHub)

**All deployments go through GitHub.** The repo is connected to Cloudflare Pages/Workers with automatic builds:

1. Push changes to a feature branch
2. Create a Pull Request to `main`
3. Cloudflare automatically builds and deploys when merged to `main`

**Production URL:** https://shopify-app.onepercentdigital.workers.dev

**Do NOT run `bun run deploy` directly** - always go through GitHub for production deployments.

### First-time Setup (Cloudflare Secrets)

`SHOPIFY_STORE_DOMAIN` is set as a plaintext variable in `wrangler.jsonc`.

Secrets must be set in Cloudflare Dashboard or via CLI:
```bash
wrangler secret put SHOPIFY_STOREFRONT_ACCESS_TOKEN
wrangler secret put SHOPIFY_REVALIDATION_SECRET
```

## Troubleshooting

### Common Issues

**"useProduct must be used within a ProductProvider"**
- Ensure the component is rendered inside `<ProductProvider>` in the route
- Check that imports use correct path aliases (`@/components/...`)

**Dynamic import errors**
- Clear Vite cache: `rm -rf node_modules/.vite`
- Restart dev server

**Environment variables not loading**
- Ensure variables are in `.env.local`
- Prefix must be `SHOPIFY_` or `VITE_` (configured in vite.config.ts)
- Restart dev server after changes

**Build errors with path aliases**
- Verify tsconfig.json has correct `paths` configuration
- Ensure `vite-tsconfig-paths` plugin is in vite.config.ts

### Development Tips

1. **Check route tree**: The `src/routeTree.gen.ts` is auto-generated - don't edit manually
2. **Query debugging**: TanStack Query devtools are available at `/__debug`
3. **Type errors**: Run `bun run type` to catch issues before build
4. **Cache issues**: Query cache persists - hard refresh or clear in devtools

## Additional Resources

- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Query Docs](https://tanstack.com/query)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Biome Documentation](https://biomejs.dev/)
- [@unpic/react Docs](https://unpic.pics/img/react/)
