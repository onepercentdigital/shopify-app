'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { getCollections } from '@/lib/shopify';
import FilterList from './filter';

function CollectionList() {
  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <CollectionsSkeleton />;
  }

  // 1. Sanitize: Remove any collection from Shopify that has the root '/search' path.
  // This prevents duplicate key errors and visual duplicates.
  const collectionsWithoutRoot = collections.filter(
    (collection) => collection.path !== '/search',
  );

  // 2. Prepare: Prepend a placeholder "All" item. Its path is a simple placeholder
  // because the client components will dynamically create the real, query-aware link.
  const finalList = [
    { title: 'All', path: '/search' },
    ...collectionsWithoutRoot,
  ];

  return <FilterList list={finalList} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

function CollectionsSkeleton() {
  return (
    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
      <div className={clsx(skeleton, activeAndTitles)} />
      <div className={clsx(skeleton, activeAndTitles)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
      <div className={clsx(skeleton, items)} />
    </div>
  );
}

export default function Collections() {
  return <CollectionList />;
}
