import { DuitMascot } from "@/components/art/mascot";
import { Bolt, Sparkle } from "@/components/art/props";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { ContractBox } from "@/components/site/copy-contract";
import { ArrowDown, ArrowUpRight, CoinMark, UpTriangle } from "@/components/site/icons";
import { TickerBar } from "@/components/site/ticker-bar";
import { market } from "@/lib/site";

function RotatingStamp() {
  return (
    <div className="relative size-24 sm:size-28" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="size-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path
            id="duit-stamp-path"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        <circle cx="60" cy="60" r="58" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="3" />
        <text
          className="fill-ink font-mono text-[9.5px] font-bold uppercase"
          style={{ letterSpacing: "2.1px" }}
        >
          <textPath href="#duit-stamp-path" startOffset="0">
            100% MEME · 0% JANJI · DUIT ·
          </textPath>
        </text>
        <circle cx="60" cy="60" r="26" fill="var(--color-ink)" />
        <path
          d="M60 42 L66 56 L80 60 L66 64 L60 78 L54 64 L40 60 L54 56 Z"
          fill="var(--color-lime)"
        />
      </svg>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-[3px] border-paper/20 pl-4 first:border-l-0 first:pl-0 sm:pl-5">
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-paper/45 sm:text-[10px]">
        {label}
      </span>
      <span className="font-display text-2xl uppercase leading-none text-paper sm:text-3xl">{value}</span>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <Section id="top" tone="void" className="pb-0 pt-10 sm:pt-14 md:pt-16">
        {/* background layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid text-paper/[0.05]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 size-[420px] rotate-12 border-[3px] border-pink/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 bottom-24 size-[300px] -rotate-6 border-[3px] border-lime/10"
        />

        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* -------- copy column -------- */}
            <div className="flex flex-col items-start gap-6 lg:col-span-7 lg:gap-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <Sticker tone="lime" rotate={-2}>
                  <span aria-hidden="true" className="block size-1.5 animate-blink bg-ink motion-reduce:animate-none" />
                  Live di Solana
                </Sticker>
                <Sticker tone="paper" rotate={1.5}>
                  SPL Token
                </Sticker>
                <Sticker tone="pink" rotate={-1} className="text-ink">
                  0% Tax
                </Sticker>
              </div>

              <h1 className="font-display uppercase text-paper">
                <span className="block text-[clamp(3.1rem,11vw,6.6rem)] leading-[0.84] tracking-tight">
                  Dari Receh
                </span>
                <span className="block text-[clamp(3.1rem,11vw,6.6rem)] leading-[0.84] tracking-tight">
                  Jadi{" "}
                  <span className="relative inline-block text-lime">
                    Gede.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 24"
                      className="absolute -bottom-2 left-0 w-full text-pink"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M4 15 C 60 4, 110 22, 160 12 S 250 4, 296 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              <p className="max-w-[46ch] text-base leading-relaxed text-paper/70 sm:text-lg">
                DUIT itu meme coin buat rakyat receh. Satu miliar koin, likuiditas dibakar, tax 0%,
                dan komunitas yang nggak butuh alasan jelas buat tetap di sini.{" "}
                <span className="font-bold text-paper">Bukan janji kaya</span> — cuma tempat numpang
                ngakak sebelum jam 3 pagi.
              </p>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href="#cara-beli"
                  tone="lime"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<ArrowUpRight className="size-5" />}
                >
                  Beli $DUIT
                </ButtonLink>
                <ButtonLink
                  href="#chart"
                  tone="ink"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<ArrowDown className="size-4" />}
                >
                  Lihat Chart
                </ButtonLink>
              </div>

              <ContractBox />

              <dl className="grid w-full grid-cols-3 gap-3 border-t-[3px] border-paper/20 pt-5 sm:gap-5">
                <StatItem label="Holders" value={market.holdersLabel} />
                <StatItem label="Market cap" value={market.marketCapLabel} />
                <StatItem label="LP burned" value={`${market.lpBurnedPct}%`} />
              </dl>
            </div>

            {/* -------- art column -------- */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
                {/* back plate */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 top-4 bottom-0 rotate-[3deg] border-[3px] border-ink bg-pink shadow-[14px_14px_0_0_var(--color-gold)]"
                />
                {/* main card */}
                <div className="relative -rotate-1 border-[3px] border-ink bg-paper p-4 shadow-hard-xl sm:p-5">
                  <div className="flex items-center gap-3 border-b-[3px] border-ink pb-2.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                      Pak Duit / v1.0
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50">
                      <span aria-hidden="true" className="block size-1.5 animate-blink bg-ink motion-reduce:animate-none" />
                      Mint revoked
                    </span>
                  </div>
                  <div className="px-2 pb-1 pt-3 sm:px-4">
                    <DuitMascot
                      mood="smug"
                      accessory="sunglasses"
                      title="Pak Duit, maskot koin meme DUIT, memakai kacamata hitam"
                    />
                  </div>
                  <div className="flex items-end justify-between border-t-[3px] border-ink pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <CoinMark className="size-5" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                        $DUIT / SOL
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-ink">
                      Receh · jadi · gede
                    </span>
                  </div>
                </div>

                {/* floating price card */}
                <div className="absolute -bottom-6 -left-3 w-[190px] rotate-[2deg] border-[3px] border-ink bg-void p-3 shadow-hard sm:-left-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper/50">
                      Live price
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper/50">
                      24J
                    </span>
                  </div>
                  <p className="mt-1 font-display text-[26px] leading-none text-paper">$0.000420</p>
                  <div className="mt-2 flex items-center gap-1.5 bg-up/15 px-1.5 py-1">
                    <UpTriangle className="size-2.5 text-up" />
                    <span className="font-mono text-[10px] font-bold text-up">+18,4%</span>
                    <span className="ml-auto font-mono text-[8px] font-bold uppercase tracking-widest text-paper/40">
                      ilustratif
                    </span>
                  </div>
                </div>

                {/* floating stickers */}
                <Sticker
                  tone="gold"
                  rotate={-8}
                  className="absolute -top-4 -left-2 z-10 hidden sm:inline-flex"
                >
                  Wen moon?
                </Sticker>
                <Sticker
                  tone="paper"
                  rotate={6}
                  className="absolute -bottom-4 right-2 z-10 hidden sm:inline-flex"
                >
                  Selamanya degen
                </Sticker>

                <div className="absolute -right-5 -top-9 z-10 hidden sm:block lg:-right-8 lg:-top-10">
                  <RotatingStamp />
                </div>

                <div aria-hidden="true" className="absolute -right-6 top-1/3 hidden text-lime lg:block">
                  <Bolt className="h-12 w-8 animate-float-late motion-reduce:animate-none" />
                </div>
                <div aria-hidden="true" className="absolute -left-7 top-1/4 hidden text-gold lg:block">
                  <Sparkle className="h-9 w-9 animate-wiggle motion-reduce:animate-none" />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-14 sm:mt-16">
          <TickerBar />
        </div>
      </Section>
    </>
  );
}
