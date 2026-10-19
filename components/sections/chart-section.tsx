import { Activity, ArrowUpRight, Coins, Droplets, Users } from "lucide-react";
import { Section, Container, SectionHead } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/sticker";
import { demoNote, market } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  SERIES_UPDATED_AT,
  formatClockWib,
  formatPct,
  formatPrice,
  getSeries,
} from "@/lib/market-series";
import { ChartCanvas } from "./chart-canvas";
import { LiveTrades } from "./chart-trades";

const STATS = [
  {
    label: "Market cap",
    value: market.marketCapLabel,
    note: "duit beredar, ser",
    accent: "bg-lime",
    Icon: Coins,
  },
  {
    label: "Volume 24j",
    value: market.volume24hLabel,
    note: "ramai tiap jam",
    accent: "bg-pink",
    Icon: Activity,
  },
  {
    label: "Likuiditas",
    value: market.liquidityLabel,
    note: "kolam dikunci + dibakar",
    accent: "bg-gold",
    Icon: Droplets,
  },
  {
    label: "Holders",
    value: market.holdersLabel,
    note: "keras kepala, setia",
    accent: "bg-ink text-paper",
    Icon: Users,
  },
] as const;

/**
 * DUITMETER — the showpiece price section. Server Component shell; only the
 * chart canvas and the live-trades feed are client components.
 */
export function ChartSection() {
  const day = getSeries("24J");

  return (
    <Section tone="paper" id="chart">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-ink/[0.07]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            kicker="// DUITMETER"
            title={
              <>
                HIJAU MERAH, <span className="text-pink">TETAP GAS.</span>
              </>
            }
            desc="Papan harga $DUIT dari 1 jam sampai 30 hari. Candle-nya simulasi, semangatnya beneran — bukan sinyal beli, cuma teman ngopi."
          />
          <div className="flex shrink-0 flex-col items-start gap-2.5 md:items-end">
            <Sticker tone="lime" rotate={-3}>
              Live · Simulasi
            </Sticker>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-ink">
              Update {formatClockWib(SERIES_UPDATED_AT)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-12">
          <Card tone="paper" className="min-w-0 shadow-hard-lg lg:col-span-8">
            {/* Terminal header: price hero */}
            <div className="bg-ink px-4 pb-4 pt-3.5 text-paper sm:px-5 sm:pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 animate-blink bg-lime motion-reduce:animate-none"
                  />
                  <span className="text-paper">$DUIT / USD</span>
                  <span aria-hidden="true" className="text-paper/30">/</span>
                  <span>Solana · SPL</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60 sm:inline">
                    {formatClockWib(SERIES_UPDATED_AT)}
                  </span>
                  <Sticker tone="lime" className="border-paper shadow-none">
                    Data simulasi
                  </Sticker>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="font-display text-[clamp(2.9rem,8.4vw,4.6rem)] uppercase leading-[0.82] tracking-tight text-paper">
                    {market.priceLabel}
                  </span>
                  <span className="mb-1 inline-flex items-center gap-1 border-[3px] border-lime bg-lime px-2 py-1 font-mono text-xs font-bold text-ink sm:text-sm">
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    {formatPct(market.change24h)}
                  </span>
                  <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
                    24 jam
                  </span>
                </div>
                <dl className="flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/60 sm:items-end sm:text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <dt>Tertinggi</dt>
                    <dd className="text-paper">{formatPrice(day.high)}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <dt>Terendah</dt>
                    <dd className="text-paper">{formatPrice(day.low)}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <dt>Vol 24j</dt>
                    <dd className="text-paper/70">{market.volume24hLabel}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <ChartCanvas />
          </Card>

          <div className="min-w-0 lg:col-span-4">
            <LiveTrades />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.Icon;
            return (
              <div key={stat.label} className="border-[3px] border-ink bg-paper p-3.5 shadow-hard-sm sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink/60">
                    {stat.label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex size-6 shrink-0 items-center justify-center border-2 border-ink",
                      stat.accent,
                    )}
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl uppercase leading-none tracking-tight text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-ink">
                  {stat.note}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-muted-ink sm:mt-10 sm:text-[11px]">
          <span aria-hidden="true" className="mt-0.5 inline-block size-2 shrink-0 border border-ink bg-pink" />
          <span className="max-w-3xl">{demoNote}</span>
        </p>
      </Container>
    </Section>
  );
}
