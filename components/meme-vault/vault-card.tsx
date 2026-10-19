"use client";

import { Heart } from "lucide-react";
import { DuitMascot } from "@/components/art/mascot";
import { Sticker } from "@/components/ui/sticker";
import type { Meme } from "@/lib/meme-data";
import { cn, formatId } from "@/lib/utils";
import { PropDeco } from "./prop-deco";
import { MEME_TONE_STYLES } from "./tone";

export type CardEmphasis = "hero" | "normal" | "wide";

const MASCOT_ROTATIONS = ["-rotate-1", "rotate-1", "rotate-2", "rotate-0"] as const;

const PROP_POSITIONS = [
  "right-1 top-1 h-7 w-7 rotate-12 sm:h-8 sm:w-8",
  "left-0 top-1/2 h-6 w-6 -rotate-12 sm:h-7 sm:w-7",
  "right-2 bottom-1 h-7 w-7 -rotate-6 sm:h-9 sm:w-9",
] as const;

type VaultCardProps = {
  meme: Meme;
  index: number;
  emphasis: CardEmphasis;
  liked: boolean;
  likeCount: number;
  onOpen: (id: string, trigger: HTMLButtonElement) => void;
  onToggleLike: (id: string) => void;
};

/**
 * Kartu meme. Seluruh kartu adalah <button> asli (membuka lightbox); tombol
 * like sengaja jadi sibling — bukan nested button — supaya markupnya valid.
 */
export function VaultCard({
  meme,
  index,
  emphasis,
  liked,
  likeCount,
  onOpen,
  onToggleLike,
}: VaultCardProps) {
  const tone = MEME_TONE_STYLES[meme.tone];
  const isHero = emphasis === "hero";
  const isWide = emphasis === "wide";
  const showTape = meme.tone !== "paper" && index % 3 === 1;
  const serial = String(index + 1).padStart(2, "0");
  const rotate = MASCOT_ROTATIONS[index % MASCOT_ROTATIONS.length];

  return (
    <article
      className={cn(
        "group relative isolate h-full min-w-0 animate-pop motion-reduce:animate-none",
        isHero && "sm:col-span-2 lg:row-span-2",
        isWide && "sm:col-span-2 lg:col-span-1 xl:col-span-2",
      )}
      style={{ animationDelay: `${Math.min(index, 9) * 40}ms` }}
    >
      <button
        type="button"
        aria-label={`Buka meme: ${meme.title}`}
        onClick={(event) => onOpen(meme.id, event.currentTarget)}
        className={cn(
          "relative flex h-full w-full flex-col border-[3px] border-ink text-left shadow-hard",
          "transition-[transform,box-shadow] duration-150 ease-out",
          "hover:-translate-x-0.5 hover:-translate-y-1 hover:-rotate-1 hover:shadow-hard-lg",
          "active:translate-x-0 active:translate-y-0 active:rotate-0 active:shadow-hard-sm",
          "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ink",
          "motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0",
          isHero ? "p-4 sm:p-6" : "p-4 sm:p-5",
          tone.card,
        )}
      >
        {/* corner sticker = tag utama */}
        <Sticker tone={tone.sticker} rotate={index % 2 === 0 ? -4 : -3} className="absolute -top-3 left-4 z-10">
          {meme.tags[0]}
        </Sticker>

        {showTape ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 right-10 z-10 h-5 w-14 -rotate-3 border-[2px] border-ink/40 bg-paper/70"
          />
        ) : null}

        <div className="flex items-center justify-end gap-2">
          {isHero ? (
            <span className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.18em]", tone.sub)}>
              pilihan grup WA
            </span>
          ) : null}
          <span className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.2em]", tone.sub)}>#{serial}</span>
        </div>

        {/* panggung maskot */}
        <div
          className={cn(
            "relative flex flex-1 items-center justify-center pt-1",
            isHero ? "min-h-[190px] py-3 sm:min-h-[240px]" : "min-h-[150px] py-2",
          )}
        >
          <span aria-hidden="true" className={cn("pointer-events-none absolute inset-x-1 inset-y-2 bg-dots", tone.pattern)} />
          {isHero ? (
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute left-1/2 top-1/2 hidden aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-12 border-[3px] border-paper/15 lg:block" />
              <span className="absolute left-1/2 top-1/2 hidden aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 -rotate-6 border-[2px] border-dashed border-lime/30 lg:block" />
              <span
                className={cn(
                  "absolute -bottom-6 -left-2 font-display text-[6rem] uppercase leading-none opacity-25 sm:-bottom-12 sm:text-[13rem]",
                  tone.outline,
                )}
              >
                {serial}
              </span>
            </span>
          ) : null}
          <PropDeco
            prop={meme.prop}
            className={cn("pointer-events-none absolute z-10", tone.deco, PROP_POSITIONS[index % PROP_POSITIONS.length])}
          />
          {isHero || isWide ? (
            <PropDeco
              prop={meme.prop === "heart" ? "sparkle" : "heart"}
              className={cn(
                "pointer-events-none absolute bottom-1 left-1 z-10 h-6 w-6 -rotate-6 sm:h-8 sm:w-8",
                tone.deco,
              )}
            />
          ) : null}
          <DuitMascot
            mood={meme.mood}
            accessory={meme.accessory}
            className={cn(
              "relative z-10 h-auto",
              isHero
                ? "w-[72%] max-w-[320px] sm:max-w-[420px] lg:max-w-[480px]"
                : isWide
                  ? "w-[62%] max-w-[240px] sm:max-w-[280px]"
                  : "w-[74%] max-w-[210px]",
              rotate,
              "transition-transform duration-200 ease-out group-hover:rotate-0 motion-reduce:transition-none",
            )}
          />
        </div>

        {/* judul + caption */}
        <div className="relative z-10 mt-2">
          {isHero || isWide ? (
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Sticker tone={isHero ? "lime" : "paper"} rotate={isHero ? -2 : 2}>
                {isHero ? "Meme of the week" : "Penutup vault"}
              </Sticker>
            </div>
          ) : null}
          <h3
            className={cn(
              "font-display uppercase leading-[0.9] tracking-tight",
              isHero
                ? "text-[clamp(2rem,4.6vw,3.1rem)]"
                : isWide
                  ? "text-2xl leading-[0.92] sm:text-3xl"
                  : "text-[1.3rem] leading-[0.95] sm:text-[1.45rem]",
            )}
          >
            {meme.title}
          </h3>
          <p
            className={cn(
              "mt-2 leading-snug",
              isHero ? "text-sm sm:text-base" : "line-clamp-2 text-[13px]",
              tone.sub,
            )}
          >
            {meme.caption}
          </p>
        </div>

        {/* baris bawah: tag mono + status mood (tombol like mengapung di kanan) */}
        <div className={cn("mt-3 flex flex-wrap items-end gap-x-3 gap-y-1 border-t-[3px] pt-3 pr-24", tone.divider)}>
          {meme.tags.map((tag) => (
            <span key={tag} className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.18em]", tone.sub)}>
              #{tag}
            </span>
          ))}
          <span className={cn("ml-auto hidden font-mono text-[9px] uppercase tracking-[0.18em] sm:inline", tone.sub)}>
            // {meme.mood}
          </span>
        </div>
      </button>

      {/* tombol like — sibling dari kartu, jadi nggak nested button */}
      <button
        type="button"
        aria-pressed={liked}
        aria-label={`${liked ? "Batalkan suka" : "Suka"} meme: ${meme.title} (${formatId(likeCount)} suka)`}
        onClick={(event) => {
          event.stopPropagation();
          onToggleLike(meme.id);
        }}
        className={cn(
          "absolute z-20 inline-flex items-center gap-1.5 border-[3px] border-ink bg-paper px-2.5 py-1.5 font-mono text-[10px] font-bold leading-none text-ink shadow-hard-sm",
          "transition-[transform,box-shadow,background-color] duration-100 ease-out",
          "hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0 active:shadow-none",
          "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ink",
          "motion-reduce:transition-none",
          liked && "bg-lime",
          isHero ? "bottom-4 right-4 sm:bottom-6 sm:right-6" : "bottom-4 right-4 sm:bottom-5 sm:right-5",
        )}
      >
        <Heart
          aria-hidden="true"
          strokeWidth={2.8}
          className={cn("size-3.5 shrink-0", liked ? "fill-ink" : "fill-transparent")}
        />
        <span aria-hidden="true">{formatId(likeCount)}</span>
      </button>
    </article>
  );
}
