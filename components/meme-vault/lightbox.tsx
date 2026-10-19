"use client";

import { useEffect, useId, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { DuitMascot } from "@/components/art/mascot";
import { Sticker } from "@/components/ui/sticker";
import type { Meme } from "@/lib/meme-data";
import { cn, formatId } from "@/lib/utils";
import { PropDeco } from "./prop-deco";
import { MEME_TONE_STYLES } from "./tone";

type LightboxProps = {
  meme: Meme;
  index: number;
  total: number;
  liked: boolean;
  likeCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleLike: () => void;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Lightbox meme: overlay full-screen tanpa blur, kartu tebal bergaya poster.
 * Esc = tutup, panah kiri/kanan = geser (wrap-around), Tab dikurung di dialog.
 */
export function Lightbox({
  meme,
  index,
  total,
  liked,
  likeCount,
  onClose,
  onPrev,
  onNext,
  onToggleLike,
}: LightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tone = MEME_TONE_STYLES[meme.tone];
  const serial = String(index + 1).padStart(2, "0");
  const totalSerial = String(total).padStart(2, "0");

  // Fokus pindah ke tombol tutup saat pertama dibuka.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Scroll lock + keyboard: Esc / panah / Tab trap.
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-void/90" onClick={onClose} role="presentation">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-dots text-paper/[0.08]" />

      <div className="relative flex min-h-full items-start justify-center p-3 py-6 sm:items-center sm:p-6">
        <div className="relative w-full max-w-[940px]">
          {/* papan belakang lime: bikin kartu kelihatan nempel di atas poster */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 translate-x-2 translate-y-2 rotate-[0.8deg] border-[3px] border-ink bg-lime"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full border-[3px] border-ink bg-paper text-ink shadow-hard-xl"
          >
          {/* pembaca layar: umumkan meme yang sedang dibuka */}
          <p className="sr-only" aria-live="polite">
            Meme {index + 1} dari {total}: {meme.title}
          </p>

          {/* title bar */}
          <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink bg-ink px-3 py-2 sm:px-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper/65">
              Meme vault <span className="text-lime">//</span> {serial} / {totalSerial}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup lightbox"
              className={cn(
                "inline-flex items-center gap-1.5 border-[3px] border-lime bg-lime px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-ink",
                "transition-[transform,box-shadow] duration-100 ease-out",
                "hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-paper)] active:translate-y-0",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
                "motion-reduce:transition-none",
              )}
            >
              <X aria-hidden="true" className="size-3.5" strokeWidth={3} />
              Tutup
            </button>
          </div>

          <div className="grid md:grid-cols-[1.02fr_1fr]">
            {/* panel seni */}
            <div
              className={cn(
                "relative flex min-h-[260px] flex-col overflow-hidden border-b-[3px] border-ink p-4 sm:min-h-[340px] sm:p-6 md:border-b-0 md:border-r-[3px]",
                tone.card,
              )}
            >
              <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 bg-dots", tone.pattern)} />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-3 -top-1 h-5 w-20 -rotate-6 border-[2px] border-ink/40 bg-paper/50"
              />

              <div className="relative z-10 flex items-start justify-between gap-2">
                <Sticker tone={tone.sticker} rotate={-3}>
                  {meme.tags[0]}
                </Sticker>
                <span className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.18em]", tone.sub)}>
                  #{serial}
                </span>
              </div>

              <div className="relative z-10 flex flex-1 items-center justify-center py-2">
                <PropDeco
                  prop={meme.prop}
                  className={cn(
                    "pointer-events-none absolute right-1 top-2 h-8 w-8 rotate-12 sm:h-10 sm:w-10",
                    tone.deco,
                  )}
                />
                <PropDeco
                  prop={meme.prop === "heart" ? "sparkle" : "heart"}
                  className={cn(
                    "pointer-events-none absolute bottom-2 left-1 h-7 w-7 -rotate-6 sm:h-9 sm:w-9",
                    tone.deco,
                  )}
                />
                <DuitMascot
                  mood={meme.mood}
                  accessory={meme.accessory}
                  className="relative z-10 h-auto w-[66%] max-w-[260px] sm:max-w-[320px]"
                />
              </div>

              <div className={cn("relative z-10 flex items-center justify-between gap-2 border-t-[3px] pt-2.5", tone.divider)}>
                <span className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.18em]", tone.sub)}>
                  pak duit / {meme.mood}
                </span>
                {meme.featured ? (
                  <span className="bg-ink px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                    of the week
                  </span>
                ) : null}
              </div>
            </div>

            {/* panel teks */}
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-ink">
                  Arsip meme #{serial}
                </p>
                <h3
                  id={titleId}
                  className="mt-1 font-display text-[clamp(2rem,5vw,3.3rem)] uppercase leading-[0.88] tracking-tight text-ink"
                >
                  {meme.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">{meme.caption}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {meme.tags.map((tag) => (
                  <Sticker key={tag} tone={tone.sticker} rotate={tag.length % 2 === 0 ? 2 : -2}>
                    {tag}
                  </Sticker>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 border-t-[3px] border-ink/15 pt-4">
                <button
                  type="button"
                  aria-pressed={liked}
                  aria-label={`${liked ? "Batalkan suka" : "Suka"} meme: ${meme.title} (${formatId(likeCount)} suka)`}
                  onClick={onToggleLike}
                  className={cn(
                    "inline-flex items-center gap-2 border-[3px] border-ink px-4 py-3 font-mono text-xs font-bold uppercase leading-none tracking-[0.08em] text-ink shadow-hard-sm",
                    "transition-[transform,box-shadow,background-color] duration-100 ease-out",
                    "hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0 active:shadow-none",
                    "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ink",
                    "motion-reduce:transition-none",
                    liked ? "bg-lime" : "bg-gold",
                  )}
                >
                  <Heart
                    aria-hidden="true"
                    strokeWidth={2.8}
                    className={cn("size-4 shrink-0", liked ? "fill-ink" : "fill-transparent")}
                  />
                  <span aria-hidden="true">{formatId(likeCount)}</span>
                  <span aria-hidden="true" className="text-[9px] tracking-[0.14em] opacity-60">
                    {liked ? "tersuka" : "suka"}
                  </span>
                </button>
                <p className="max-w-[24ch] font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted-ink">
                  Like-nya ilustratif. Nggak ada koin pindah tangan di sini.
                </p>
              </div>
            </div>
          </div>

          {/* navigasi bawah */}
          <div className="flex items-center justify-between gap-2 border-t-[3px] border-ink px-3 py-2.5 sm:px-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Meme sebelumnya"
              className={cn(
                "inline-flex items-center gap-1.5 border-[3px] border-ink bg-paper px-2.5 py-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-ink shadow-hard-sm",
                "transition-[transform,box-shadow,background-color] duration-100 ease-out",
                "hover:-translate-y-0.5 hover:bg-lime hover:shadow-hard active:translate-y-0 active:shadow-none",
                "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink",
                "motion-reduce:transition-none",
              )}
            >
              <ChevronLeft aria-hidden="true" className="size-3.5" strokeWidth={3} />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink">
              <span className="text-ink">{serial}</span> / {totalSerial}
              <span className="hidden sm:inline"> · esc tutup · ← → geser</span>
            </p>

            <button
              type="button"
              onClick={onNext}
              aria-label="Meme berikutnya"
              className={cn(
                "inline-flex items-center gap-1.5 border-[3px] border-ink bg-paper px-2.5 py-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-ink shadow-hard-sm",
                "transition-[transform,box-shadow,background-color] duration-100 ease-out",
                "hover:-translate-y-0.5 hover:bg-lime hover:shadow-hard active:translate-y-0 active:shadow-none",
                "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink",
                "motion-reduce:transition-none",
              )}
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <ChevronRight aria-hidden="true" className="size-3.5" strokeWidth={3} />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
