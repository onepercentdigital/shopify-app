'use client';

export default function FormattedDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const formatted = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return <span className={className}>{formatted}</span>;
}
