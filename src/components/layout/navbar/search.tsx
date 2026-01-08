import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export default function Search() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { q?: string } | undefined;
  const qParam = search?.q ?? '';
  const [inputValue, setInputValue] = useState(qParam);

  useEffect(() => {
    setInputValue(qParam);
  }, [qParam]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = inputValue.trim();

    navigate({
      to: '/search',
      search: trimmed ? { q: trimmed } : {},
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-[550px] lg:w-80 xl:w-full"
    >
      <input
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-11 w-full rounded-lg border bg-white px-4 text-base text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="pointer-events-none absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full max-w-[550px] lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="h-11 w-full rounded-lg border bg-white px-4 text-base text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
