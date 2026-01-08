import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { CartItem } from '@/lib/shopify/types';

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: (merchandiseId: string, type: 'plus' | 'minus') => void;
}) {
  const handleClick = () => {
    optimisticUpdate(item.merchandise.id, type);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full min-w-9 max-w-9 flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus',
        },
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="size-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="size-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
