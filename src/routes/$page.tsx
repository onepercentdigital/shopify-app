import { useQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';
import FormattedDate from '@/components/formatted-date';
import Prose from '@/components/prose';
import { getPage } from '@/lib/shopify';

export const Route = createFileRoute('/$page')({
  component: DynamicPage,
  loader: async ({ params, context }) => {
    const page = await context.queryClient.ensureQueryData({
      queryKey: ['page', params.page],
      queryFn: () => getPage(params.page),
      staleTime: 5 * 60 * 1000,
    });

    if (!page) {
      throw notFound();
    }

    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) {
      return { meta: [{ title: 'Page Not Found' }] };
    }

    return {
      meta: [
        { title: page.seo?.title || page.title },
        {
          name: 'description',
          content: page.seo?.description || page.bodySummary,
        },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: page.createdAt },
        { property: 'article:modified_time', content: page.updatedAt },
      ],
    };
  },
});

function DynamicPage() {
  const { page: pageHandle } = Route.useParams();
  const { data: page } = useQuery({
    queryKey: ['page', pageHandle],
    queryFn: () => getPage(pageHandle),
    staleTime: 5 * 60 * 1000,
  });

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-8">
      <h1 className="mb-8 font-bold text-5xl">{page.title}</h1>
      <Prose className="mb-8" html={page.body} />
      <p className="text-sm italic">
        This document was last updated on{' '}
        <FormattedDate date={page.updatedAt} />.
      </p>
    </div>
  );
}
