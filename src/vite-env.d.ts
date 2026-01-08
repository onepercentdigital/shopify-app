/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string;
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_PUBLIC_DOMAIN: string;
  readonly SHOPIFY_STORE_DOMAIN: string;
  readonly SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
  readonly SHOPIFY_REVALIDATION_SECRET: string;
}

// CSS URL imports
declare module '*.css?url' {
  const url: string;
  export default url;
}
