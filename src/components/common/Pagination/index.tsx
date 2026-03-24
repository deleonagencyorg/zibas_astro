import React from 'react';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
  disabled = false,
  className = ''
}: PaginationProps) {
  if (!Number.isFinite(pageCount) || pageCount <= 1) return null;

  const maxButtons = 5;
  const safeCurrent = Math.min(Math.max(1, Number(currentPage) || 1), pageCount);

  let start = Math.max(1, safeCurrent - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;
  if (end > pageCount) {
    end = pageCount;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const goTo = (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    const next = Math.min(Math.max(1, page), pageCount);
    onPageChange(next);
  };

  const isFirst = safeCurrent <= 1;
  const isLast = safeCurrent >= pageCount;

  return (
    <div className={`mt-10 flex items-center justify-center gap-2 flex-wrap ${className}`.trim()}>
      <button
        onClick={goTo(1)}
        disabled={isFirst || disabled}
        className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Primera
      </button>

      <button
        onClick={goTo(safeCurrent - 1)}
        disabled={isFirst || disabled}
        className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={goTo(n)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            n === safeCurrent ? 'bg-orange text-white' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={goTo(safeCurrent + 1)}
        disabled={isLast || disabled}
        className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>

      <button
        onClick={goTo(pageCount)}
        disabled={isLast || disabled}
        className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Última
      </button>
    </div>
  );
}
