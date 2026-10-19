import { site } from "@/lib/site";

type TickerItem = { text: string; highlight?: boolean };

const ITEMS: TickerItem[] = [
  { text: "$DUIT +18,4%", highlight: true },
  { text: "HOLDERS 24.812" },
  { text: "LP BURNED 100%" },
  { text: "TAX 0% / 0%" },
  { text: "MINT REVOKED" },
  { text: "RECEH JADI GEDE" },
  { text: "WAGMI, SER" },
  { text: "GM", highlight: true },
  { text: "12 MEME DI VAULT" },
  { text: "APING IN" },
  { text: "NGMI? GASKEUN" },
  { text: "1.000.000.000 SUPPLY" },
];

function Star() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-ink" aria-hidden="true">
      <path d="M8 0 L9.8 6.2 L16 8 L9.8 9.8 L8 16 L6.2 9.8 L0 8 L6.2 6.2 Z" fill="currentColor" />
    </svg>
  );
}

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item) => (
        <span
          key={item.text}
          className="flex items-center gap-4 pr-8 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink sm:pr-10 sm:text-xs"
        >
          <span className={item.highlight ? "bg-ink px-1.5 py-0.5 text-lime" : undefined}>{item.text}</span>
          <Star />
        </span>
      ))}
    </div>
  );
}

/** Full-bleed lime ticker strip. Decorative: content is duplicated for the loop. */
export function TickerBar() {
  return (
    <div
      className="relative w-full select-none overflow-hidden border-y-[3px] border-ink bg-lime py-2.5"
      role="presentation"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row ariaHidden />
      </div>
      <span className="sr-only">{site.name} ticker: harga ilustratif dan statistik demo.</span>
    </div>
  );
}
