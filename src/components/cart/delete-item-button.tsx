import { XMarkIcon } from '@heroicons/react/24/outline';
import type { CartItem } from '@/lib/shopify/types';

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: (merchandiseId: string, type: 'delete') => void;
}) {
  const merchandiseId = item.merchandise.id;

  const handleClick = () => {
    optimisticUpdate(merchandiseId, 'delete');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Remove cart item"
      className="flex size-6 items-center justify-center rounded-full bg-neutral-500"
    >
      <XMarkIcon className="mx-px size-4 text-white dark:text-black" />
    </button>
  );
}
