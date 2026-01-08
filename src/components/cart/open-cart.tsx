import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-black transition-colors dark:border-neutral-700 dark:bg-black dark:text-white">
      <ShoppingCartIcon
        className={clsx(
          'h-4 transition-all ease-in-out hover:scale-110',
          className,
        )}
      />

      {quantity ? (
        <div className="-mt-2 -mr-2 absolute top-0 right-0 h-4 w-4 rounded-sm bg-blue-600 font-medium text-[11px] text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
