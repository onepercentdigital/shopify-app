'use client';

export default function CopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = `2025${currentYear > 2025 ? `-${currentYear}` : ''}`;

  return <>{copyrightDate}</>;
}
