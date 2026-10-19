import { cn } from "@/lib/utils";

const INK = "var(--color-ink)";
const PAPER = "var(--color-paper)";
const LIME = "var(--color-lime)";
const PINK = "var(--color-pink)";
const GOLD = "var(--color-gold)";

type PropProps = { className?: string; title?: string };

/* Chunky decorative props for hero + meme gallery. All inherit currentColor
   where it makes sense; pass `className="text-lime"` etc. from the parent. */

export function Sparkle({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-8 w-8", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" />
    </svg>
  );
}

export function StarBurst({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M32 2 L38 24 L60 18 L44 34 L62 48 L38 44 L32 62 L26 44 L2 48 L20 34 L4 18 L26 24 Z"
        fill="currentColor"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bolt({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 32 48"
      className={cn("h-10 w-7", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M20 1 L2 28 H13 L9 47 L30 19 H17 Z"
        fill={LIME}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Moon({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-12 w-12", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M46 6 A 28 28 0 1 0 58 42 A 22 22 0 0 1 46 6 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="30" r="4" fill={INK} opacity="0.5" />
      <circle cx="33" cy="44" r="3" fill={INK} opacity="0.35" />
    </svg>
  );
}

export function Rocket({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-14 w-14", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      strokeLinejoin="round"
    >
      <path d="M32 4 q17 16 17 32 v8 h-34 v-8 q0 -16 17 -32 z" fill={PAPER} stroke={INK} strokeWidth="4" />
      <path d="M15 36 l-11 14 h11 z" fill={PINK} stroke={INK} strokeWidth="4" />
      <path d="M49 36 l11 14 h-11 z" fill={PINK} stroke={INK} strokeWidth="4" />
      <circle cx="32" cy="26" r="7" fill={LIME} stroke={INK} strokeWidth="3.5" />
      <path d="M32 46 q6 10 0 16 q-6 -6 0 -16 z" fill={GOLD} stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Diamond({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      strokeLinejoin="round"
    >
      <path d="M24 2 L44 18 L24 46 L4 18 Z" fill={LIME} stroke={INK} strokeWidth="3" />
      <path d="M4 18 H44 M24 2 L15 18 L24 46 L33 18 Z" fill="none" stroke={INK} strokeWidth="2.5" />
    </svg>
  );
}

export function CoinStack({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-14 w-14", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      strokeLinejoin="round"
    >
      <ellipse cx="32" cy="50" rx="24" ry="9" fill={GOLD} stroke={INK} strokeWidth="3.5" />
      <path d="M8 40 v10 M56 40 v10" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="32" cy="40" rx="24" ry="9" fill={GOLD} stroke={INK} strokeWidth="3.5" />
      <path d="M8 30 v10 M56 30 v10" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="32" cy="30" rx="24" ry="9" fill={GOLD} stroke={INK} strokeWidth="3.5" />
      <path d="M8 20 v10 M56 20 v10" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="32" cy="20" rx="24" ry="9" fill={GOLD} stroke={INK} strokeWidth="3.5" />
      <path d="M28 15 h8 v10 h-8 z" fill={PAPER} opacity="0" />
    </svg>
  );
}

export function ScribbleArrow({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={cn("h-14 w-20", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      <path
        d="M4 14 C 26 2, 44 10, 46 26 C 48 40, 30 46, 24 36 C 19 27, 32 20, 48 26 C 60 30, 68 38, 72 46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M64 48 L72 46 L70 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Heart({ className, title }: PropProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M16 29 C 4 21, 0 14, 2 8 C 4 2, 12 2, 16 8 C 20 2, 28 2, 30 8 C 32 14, 28 21, 16 29 Z"
        fill={PINK}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
