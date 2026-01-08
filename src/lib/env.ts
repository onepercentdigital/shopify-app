// Env is declared as a global interface in worker-configuration.d.ts

// Get environment variables that work in both local dev and Cloudflare Workers
export function getEnv(): Env {
  // In Cloudflare Workers, use the cloudflare:workers module
  // Wrapped in try-catch because the module doesn't exist locally
  try {
    const { env } = require('cloudflare:workers') as { env: Env };
    if (env?.SHOPIFY_STORE_DOMAIN) {
      return env;
    }
  } catch {
    // Not in Cloudflare Workers environment
  }

  // Fallback for local development - use import.meta.env
  return {
    SHOPIFY_STORE_DOMAIN: import.meta.env.SHOPIFY_STORE_DOMAIN || '',
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    SHOPIFY_REVALIDATION_SECRET:
      import.meta.env.SHOPIFY_REVALIDATION_SECRET || '',
    SITE_NAME: import.meta.env.VITE_SITE_NAME || '',
    COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || '',
  } as Env;
}
