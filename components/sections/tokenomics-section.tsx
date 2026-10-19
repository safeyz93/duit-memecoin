import { Ban, Flame, KeyRound } from "lucide-react";
import { Section, Container, SectionHead } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/sticker";
import { demoNote, market, site } from "@/lib/site";
import { cn, formatId, truncateMiddle } from "@/lib/utils";

const ALLOCATION = [
  {
    label: "Komunitas & Likuiditas",
    pct: 60,
    desc: "drop komunitas + LP dikunci & dibakar",
    bar: "bg-lime",
    swatch: "bg-lime",
    hatch: false,
  },
  {
    label: "Warung Treasury",
    pct: 15,
    desc: "bensin konten, meme, dan warung kopi",
    bar: "bg-gold",
    swatch: "bg-gold",
    hatch: false,
  },
  {
    label: "Meme Fund",
    pct: 12,
    desc: "budget bikin meme, bukan budget pribadi",
    bar: "bg-pink",
    swatch: "bg-pink",
    hatch: false,
  },
  {
    label: "Tim · vesting 12 bln",
    pct: 8,
    desc: "cair bertahap, cliff 12 bulan",
    bar: "bg-paper",
    swatch: "bg-paper",
    hatch: true,
  },
  {
    label: "Airdrop",
    pct: 5,
    desc: "buat yang percaya dari hari pertama",
    bar: "bg-up",
    swatch: "bg-up",
    hatch: false,
  },
] as const;

const FACTS = [
  { label: "Tax beli", value: "0%", note: "masuk tanpa potongan", accent: "text-lime", Icon: Ban },
  { label: "Tax jual", value: "0%", note: "keluar juga tanpa potongan", accent: "text-lime", Icon: Ban },
  { label: "LP dibakar", value: "100%", note: "kolam likuiditas dikunci", accent: "text-gold", Icon: Flame },
  {
    label: "Mint authority",
    value: "Revoked",
    note: "supply nggak bisa nambah",
    accent: "text-paper",
    Icon: KeyRound,
  },
] as const;

/** TOKENOMICS — supply, allocation, hard facts and the (fake) contract. */
export function TokenomicsSection() {
  return (
    <Section tone="void" id="tokenomics">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid text-paper/[0.05]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            tone="paper"
            kicker="// TOKENOMICS"
            title={
              <>
                SEMUA DUIT, <span className="text-lime">SUDAH DIBAGI.</span>
              </>
            }
            desc="1 miliar $DUIT, sekali cetak, nggak bisa nambah. 60% buat komunitas & likuiditas, sisanya buat perang meme, warung, dan tim yang vesting 12 bulan."
          />
          <div className="flex shrink-0 flex-col items-start gap-2.5 md:items-end">
            <Sticker tone="lime" rotate={-3}>
              No mint · No drama
            </Sticker>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Supply fixed di genesis</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Supply hero */}
          <Card
            tone="lime"
            className="relative flex min-w-0 flex-col overflow-hidden p-5 shadow-paper-lg sm:p-7 lg:col-span-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-diag-lines text-ink/[0.06]"
            />
            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-ink/70">
                Total supply
              </p>
              <Sticker tone="ink" rotate={3}>
                Fixed · No Mint
              </Sticker>
            </div>
            <p className="relative mt-4 font-display text-[clamp(2.55rem,9.4vw,5rem)] uppercase leading-[0.82] tracking-tight text-ink">
              {market.supplyLabel} <span className="text-ink/55">$DUIT</span>
            </p>
            <p className="relative mt-3 max-w-lg text-sm font-medium leading-snug text-ink/80 sm:text-base">
              Total supply — fixed, tidak bisa nambah. Sekali cetak di genesis; mint authority dicabut, jadi
              nggak ada tombol &ldquo;tambah supply&rdquo; buat admin.
            </p>
            <div className="relative mt-auto flex flex-wrap items-end justify-between gap-3 border-t-[3px] border-ink pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/75">
                {formatId(market.supply)} DUIT · 9 decimals
              </p>
              <span className="font-display text-2xl uppercase leading-none tracking-tight text-ink">$DUIT</span>
            </div>
          </Card>

          {/* Contract panel */}
          <Card tone="paper" className="flex min-w-0 flex-col p-5 shadow-lime-lg sm:p-6 lg:col-span-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-ink">
                  Contract address
                </p>
                <p className="mt-1 font-display text-2xl uppercase leading-none tracking-tight text-ink">
                  SPL Token
                </p>
              </div>
              <Sticker tone="pink" rotate={2}>
                Ilustratif
              </Sticker>
            </div>

            <div className="mt-4 border-[3px] border-ink bg-ink px-3 py-3 shadow-hard-sm">
              <p
                className="break-all font-mono text-[11px] font-bold tracking-[0.06em] text-lime sm:text-xs"
                title={site.contract}
              >
                <span className="text-paper/55">CA:</span> {truncateMiddle(site.contract, 10, 8)}
              </p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60">
                DUIT · SPL TOKEN · SOLANA
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink">
              <span className="border-2 border-ink bg-lime px-1.5 py-0.5">Solana</span>
              <span className="border-2 border-ink px-1.5 py-0.5">SPL</span>
              <span className="border-2 border-ink px-1.5 py-0.5">9 decimals</span>
              <span className="border-2 border-ink bg-ink px-1.5 py-0.5 text-paper">0% tax</span>
            </div>

            <p className="mt-auto pt-4 font-mono text-[10px] leading-relaxed text-muted-ink sm:text-[11px]">
              Alamat palsu buat demo desain. Jangan kirim duit beneran ke sini, ser — verifikasi sendiri
              sebelum ape.
            </p>
          </Card>
        </div>

        {/* Allocation */}
        <Card tone="paper" className="mt-5 min-w-0 p-5 shadow-lime-lg sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-ink">
                Alokasi supply
              </p>
              <h3 className="mt-1 font-display text-2xl uppercase leading-none tracking-tight text-ink sm:text-3xl">
                60% buat kita semua.
              </h3>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-ink">
              Total 100% · {market.supplyLabel} $DUIT
            </p>
          </div>

          <div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-muted-ink">
            {[0, 25, 50, 75, 100].map((pct) => (
              <span key={pct}>{pct}%</span>
            ))}
          </div>
          <div className="mt-1 border-[3px] border-ink bg-paper shadow-hard sm:shadow-hard-lg">
            <div className="flex h-14 w-full sm:h-20">
              {ALLOCATION.map((item, index) => {
                const last = index === ALLOCATION.length - 1;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "relative flex items-center justify-center",
                      item.bar,
                      last ? undefined : "border-r-[3px] border-ink",
                    )}
                    style={{ width: `${item.pct}%` }}
                  >
                    {item.hatch ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-diag-lines text-ink/15"
                      />
                    ) : null}
                    {item.pct >= 8 ? (
                      <span className="relative hidden font-mono text-[11px] font-bold text-ink sm:inline">
                        {item.pct}%
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-ink">
            Tim vesting 12 bulan · LP dibakar · nggak ada mint cadangan
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {ALLOCATION.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "border-[3px] border-ink bg-paper p-3 shadow-hard-sm",
                  index === ALLOCATION.length - 1 ? "col-span-2 sm:col-span-1" : undefined,
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("relative inline-block size-4 border-2 border-ink", item.swatch)}>
                    {item.hatch ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-diag-lines text-ink/30"
                      />
                    ) : null}
                  </span>
                  <span className="font-display text-xl leading-none tracking-tight text-ink sm:text-2xl">
                    {item.pct}%
                  </span>
                </div>
                <p className="mt-2 font-body text-[13px] font-bold leading-tight text-ink sm:text-sm">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-[9px] leading-snug text-muted-ink">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Hard facts */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FACTS.map((fact) => {
            const Icon = fact.Icon;
            const longValue = fact.value.length > 5;
            return (
              <Card key={fact.label} tone="void" className="flex flex-col p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted">
                    {fact.label}
                  </p>
                  <Icon className={cn("size-4 shrink-0", fact.accent)} aria-hidden="true" />
                </div>
                <p
                  className={cn(
                    "mt-3 font-display uppercase leading-none tracking-tight",
                    longValue ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
                    fact.accent,
                  )}
                >
                  {fact.value}
                </p>
                <p className="mt-2 font-mono text-[9px] leading-snug text-paper/60">{fact.note}</p>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          <span aria-hidden="true" className="inline-block size-2 border border-paper/40 bg-pink" />
          Nggak ada: mint authority · tax tersembunyi · janji manis.
        </p>

        <p className="mt-8 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-muted sm:mt-10 sm:text-[11px]">
          <span aria-hidden="true" className="mt-0.5 inline-block size-2 shrink-0 border border-paper/40 bg-pink" />
          <span className="max-w-3xl">{demoNote}</span>
        </p>
      </Container>
    </Section>
  );
}
