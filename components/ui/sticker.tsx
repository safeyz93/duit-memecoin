import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StickerTone = "lime" | "pink" | "gold" | "paper" | "ink";

const tones: Record<StickerTone, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  gold: "bg-gold text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
};

export function Sticker({
  children,
  tone = "lime",
  rotate = 0,
  className,
}: {
  children: ReactNode;
  tone?: StickerTone;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-[3px] border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.18em] shadow-hard-sm sm:text-[11px]",
        tones[tone],
        className,
      )}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {children}
    </span>
  );
}
