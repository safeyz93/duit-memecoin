import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardTone = "paper" | "void" | "ink" | "lime" | "pink" | "gold";

const tones: Record<CardTone, string> = {
  paper: "bg-paper text-ink border-ink shadow-hard",
  void: "bg-void text-paper border-paper shadow-lime",
  ink: "bg-ink text-paper border-paper shadow-hard",
  lime: "bg-lime text-ink border-ink shadow-hard",
  pink: "bg-pink text-white border-ink shadow-hard",
  gold: "bg-gold text-ink border-ink shadow-hard",
};

export function Card({
  tone = "paper",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: CardTone }) {
  return (
    <div className={cn("relative border-[3px]", tones[tone], className)} {...props}>
      {children}
    </div>
  );
}
