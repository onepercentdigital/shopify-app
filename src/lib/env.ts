// Env is declared as a global interface in worker-configuration.d.ts

// Cache the environment to avoid repeated require() calls
let cachedEnv: Env | null = null;

// Get environment variables that work in both local dev and Cloudflare Workers
export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  // In Cloudflare Workers, use the cloudflare:workers module
  // This is wrapped in a try-catch because the module doesn't exist locally
  try {
    // Use require() in a try-catch to handle module not found errors in local dev
    const { env } = require('cloudflare:workers') as { env: Env };
    if (env) {
      cachedEnv = env;
      return env;
    }
  } catch {
    // Not in Cloudflare Workers environment
  }

  // Fallback for local development - use import.meta.env
  cachedEnv = {
    SHOPIFY_STORE_DOMAIN: import.meta.env.SHOPIFY_STORE_DOMAIN || '',
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      import.meta.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    SHOPIFY_REVALIDATION_SECRET:
      import.meta.env.SHOPIFY_REVALIDATION_SECRET || '',
    SITE_NAME: import.meta.env.VITE_SITE_NAME || '',
    COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || '',
  } as Env;
  return cachedEnv;
}
