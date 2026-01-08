# Shopify Commerce (TanStack Start + Cloudflare Workers)

A high-performance ecommerce storefront built with TanStack Start, deployed on Cloudflare Workers edge network.

> **Note:** For detailed technical documentation, see [CLAUDE.md](./CLAUDE.md).

## Tech Stack

- **TanStack Start** - Full-stack React framework with SSR
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Data fetching and caching
- **Vite** - Build tool and dev server
- **Cloudflare Workers** - Edge deployment
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Shopify Storefront API** - Headless commerce

## Quick Start

```bash
# Install dependencies
bun install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your Shopify credentials

# Start development server
bun dev
```

Your app will be running at [localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_REVALIDATION_SECRET=your-secret-key
SITE_NAME=Your Store Name
```

## Available Scripts

```bash
bun dev          # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
bun run deploy   # Deploy to Cloudflare Workers
bun run type     # TypeScript checking
bun run check    # Lint and format check
bun run fix      # Auto-fix issues
```

## Project Structure

```
src/
├── routes/           # File-based routing
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Homepage
│   ├── product/      # Product pages
│   └── search/       # Search & collections
├── components/       # React components
├── lib/              # Utilities & Shopify API
└── integrations/     # TanStack Query setup
```

## Key Features

- **Edge Deployment** - Cloudflare Workers for global low-latency
- **Smart Caching** - TanStack Query with 5-minute staleTime for products
- **Type-Safe Routing** - Full TypeScript support with TanStack Router
- **Optimized Images** - @unpic/react with Shopify CDN
- **Cart Management** - Cookie-based cart with optimistic updates
- **Search & Filters** - Collection browsing with sort options

## Deployment

### Deploy to Cloudflare Workers

```bash
# Set production secrets (first time only)
wrangler secret put SHOPIFY_STOREFRONT_ACCESS_TOKEN
wrangler secret put SHOPIFY_REVALIDATION_SECRET

# Build and deploy
bun run deploy
```

## Architecture

This app uses TanStack Start's SSR capabilities with Cloudflare Workers:

1. **Route Loaders** prefetch data during SSR using TanStack Query
2. **Server Functions** handle cart mutations with cookie-based cart IDs
3. **Client Components** provide interactivity (cart modal, variant selection)
4. **Edge Caching** via Cloudflare for static assets

### Caching Strategy

| Data | Cache Duration | Strategy |
|------|----------------|----------|
| Products | 5 minutes | TanStack Query staleTime |
| Collections | 5 minutes | TanStack Query staleTime |
| Cart | Always fresh | staleTime: 0 |

## Origins

Based on [Vercel's Next.js Commerce](https://github.com/vercel/commerce), migrated to TanStack Start for Cloudflare Workers deployment.

## License

MIT License - see LICENSE file for details.
