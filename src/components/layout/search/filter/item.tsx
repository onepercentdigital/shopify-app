import { Link, useLocation, useSearch } from '@tanstack/react-router';
import clsx from 'clsx';
import { useMemo } from 'react';
import type { SortFilterItem } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import type { ListItem, PathFilterItem as PathFilterItemType } from '.';

function PathFilterItemComponent({ item }: { item: PathFilterItemType }) {
  const location = useLocation();
  const pathname = location.pathname;
  const active = pathname === item.path;

  const href = useMemo(() => {
    const newParams = new URLSearchParams();
    return createUrl(item.path, newParams);
  }, [item.path]);

  const commonProps = {
    className: clsx(
      'w-full text-sm underline-offset-4 hover:underline',
      'dark:hover:text-neutral-100',
      { 'underline underline-offset-4': active },
    ),
  };

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      {active ? (
        <p {...commonProps}>{item.title}</p>
      ) : (
        <Link to={href} {...commonProps}>
          {item.title}
        </Link>
      )}
    </li>
  );
}

function SortFilterItemComponent({ item }: { item: SortFilterItem }) {
  const location = useLocation();
  const pathname = location.pathname;
  const search = useSearch({ strict: false }) as { q?: string; sort?: string };

  const q = search?.q;
  const active = search?.sort === item.slug;

  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (item.slug) params.set('sort', item.slug);
    return createUrl(pathname, params);
  }, [pathname, q, item.slug]);

  const commonProps = {
    className: clsx('w-full hover:underline hover:underline-offset-4', {
      'underline underline-offset-4': active,
    }),
  };

  return (
    <li
      className="mt-2 flex text-black text-sm dark:text-white"
      key={item.title}
    >
      {active ? (
        <p {...commonProps}>{item.title}</p>
      ) : (
        <Link to={href} {...commonProps}>
          {item.title}
        </Link>
      )}
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? (
    <PathFilterItemComponent item={item as PathFilterItemType} />
  ) : (
    <SortFilterItemComponent item={item} />
  );
}
