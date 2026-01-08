import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Products and collections: 5 minute stale time
        staleTime: 5 * 60 * 1000,
        // Keep unused data for 30 minutes
        gcTime: 30 * 60 * 1000,
      },
    },
  });
  return { queryClient };
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
