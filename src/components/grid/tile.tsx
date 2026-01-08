import { Image } from '@unpic/react';
import clsx from 'clsx';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  alt,
  fill,
  priority,
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  src?: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const imageClassName = clsx('relative h-full w-full object-contain', {
    'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
  });

  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active,
        },
      )}
    >
      {src ? (
        fill ? (
          <Image
            src={src}
            alt={alt}
            layout="fullWidth"
            priority={priority}
            className={imageClassName}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            layout="constrained"
            width={800}
            height={800}
            priority={priority}
            className={imageClassName}
          />
        )
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
