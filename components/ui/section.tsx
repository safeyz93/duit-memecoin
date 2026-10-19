import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "void" | "paper" | "lime" | "pink" | "ink";

const sectionTones: Record<SectionTone, string> = {
  void: "bg-void text-paper",
  paper: "bg-paper text-ink",
  lime: "bg-lime text-ink",
  pink: "bg-pink text-white",
  ink: "bg-ink text-paper",
};

export function Section({
  id,
  tone = "void",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative overflow-hidden py-16 sm:py-20 md:py-28", sectionTones[tone], className)}>
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export type KickerTone = "ink" | "paper" | "lime" | "pink";

const kickerTones: Record<KickerTone, { text: string; square: string }> = {
  ink: { text: "text-ink", square: "bg-lime" },
  paper: { text: "text-paper", square: "bg-lime" },
  lime: { text: "text-lime", square: "bg-lime" },
  pink: { text: "text-pink", square: "bg-pink" },
};

export function Kicker({ children, tone = "ink", className }: { children: ReactNode; tone?: KickerTone; className?: string }) {
  const t = kickerTones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.24em] sm:text-[11px]",
        t.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("inline-block size-2.5 shrink-0", t.square)} />
      {children}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  desc,
  tone = "ink",
  align = "left",
  className,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  tone?: "ink" | "paper";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {kicker ? <Kicker tone={tone === "paper" ? "lime" : "ink"}>{kicker}</Kicker> : null}
      <h2
        className={cn(
          "font-display text-[clamp(2.35rem,5.6vw,4.8rem)] uppercase leading-[0.88] tracking-tight",
          tone === "paper" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "paper" ? "text-paper/75" : "text-ink/75",
          )}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
