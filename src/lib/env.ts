// Env is declared as a global interface in worker-configuration.d.ts

// Get environment variables that work in both local dev and Cloudflare Workers
export function getEnv(): Env {
  // In Cloudflare Workers, use the cloudflare:workers module
  // This is wrapped in a try-catch because the module doesn't exist locally
  try {
    // Using require() here because the cloudflare:workers module only exists
    // in the Cloudflare Workers runtime, not during local development
    const { env } = require('cloudflare:workers') as { env: Env };
    // If we're in Cloudflare Workers, use this env object
    // The secrets are configured in the Cloudflare dashboard
    if (env) {
      return env;
    }
  } catch {
    // Not in Cloudflare Workers environment, fall through to import.meta.env
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
