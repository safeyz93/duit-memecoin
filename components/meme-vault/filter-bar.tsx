"use client";

import { FILTERS, type MemeFilterId } from "@/lib/meme-data";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  active: MemeFilterId;
  shown: number;
  onChange: (filter: MemeFilterId) => void;
};

/** Bar filter gaya konsol terminal: chip chunky, hitungan diturunkan dari data. */
export function FilterBar({ active, shown, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 border-[3px] border-ink bg-ink p-3 text-paper shadow-hard sm:flex-row sm:items-center sm:justify-between sm:p-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="hidden items-center gap-2 pr-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper/60 sm:flex">
          <span aria-hidden="true" className="block size-2 animate-blink bg-lime motion-reduce:animate-none" />
          Filter
        </span>
        <div role="group" aria-label="Filter meme" className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {FILTERS.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(filter.id)}
                className={cn(
                  "inline-flex items-center gap-2 border-[3px] px-3 py-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.16em] sm:text-[11px]",
                  "transition-[transform,box-shadow,background-color,border-color] duration-100 ease-out",
                  "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime",
                  isActive
                    ? "border-lime bg-lime text-ink shadow-[4px_4px_0_0_var(--color-paper)]"
                    : "border-paper/25 bg-transparent text-paper hover:-translate-y-0.5 hover:border-paper hover:bg-paper/10 active:translate-y-0",
                )}
              >
                {filter.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "border-[2px] px-1.5 py-0.5 text-[9px] leading-none tracking-normal",
                    isActive ? "border-ink bg-ink text-lime" : "border-paper/30 text-paper/65",
                  )}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p
        aria-live="polite"
        className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60"
      >
        <span className="text-lime">{shown}</span> meme tampil
      </p>
    </div>
  );
}
