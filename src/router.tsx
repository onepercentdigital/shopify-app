import { createRouter, Link } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import * as TanstackQuery from './integrations/tanstack-query/root-provider';
import { routeTree } from './routeTree.gen';

function NotFoundComponent() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4 font-bold text-4xl">404</h1>
      <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-full bg-blue-600 px-6 py-3 text-white hover:opacity-90"
      >
        Go back home
      </Link>
    </div>
  );
}

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: NotFoundComponent,
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
