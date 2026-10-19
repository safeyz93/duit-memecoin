import { DuitMascot } from "@/components/art/mascot";
import { Sparkle, StarBurst } from "@/components/art/props";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { ArrowUpRight } from "@/components/site/icons";
import { market, site } from "@/lib/site";
import { truncateMiddle } from "@/lib/utils";

/** Loud lime closer before the footer. */
export function CtaBand() {
  return (
    <Section id="beli" tone="lime" className="py-16 sm:py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-ink/15" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex flex-wrap gap-2.5">
              <Sticker tone="ink" rotate={-2}>
                Tanpa janji manis
              </Sticker>
              <Sticker tone="paper" rotate={1.5}>
                Cuma meme & komunitas
              </Sticker>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,8vw,6rem)] uppercase leading-[0.86] tracking-tight text-ink">
              Siap jadi
              <br />
              whale receh?
            </h2>
            <p className="mt-5 max-w-[52ch] text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
              Beli {site.symbol} di DEX favoritmu, cek contract address dua kali, lalu masuk ke
              warung komunitas. Kalau panik, minum kopi dulu.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#cara-beli"
                tone="ink"
                size="lg"
                className="w-full sm:w-auto"
                icon={<ArrowUpRight className="size-5" />}
              >
                Beli $DUIT
              </ButtonLink>
              <ButtonLink href="#faq" tone="paper" size="lg" className="w-full sm:w-auto">
                Baca FAQ Dulu
              </ButtonLink>
            </div>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-ink/60">
              CA: {truncateMiddle(site.contract, 12, 10)} · supply {market.supplyLabel} · LP burned{" "}
              {market.lpBurnedPct}% · ilustratif
            </p>
          </div>

          <div className="relative mx-auto w-52 sm:w-64 lg:col-span-4 lg:w-full">
            <div
              aria-hidden="true"
              className="absolute inset-2 rotate-[6deg] border-[3px] border-ink bg-pink shadow-[12px_12px_0_0_var(--color-ink)]"
            />
            <div className="relative -rotate-2 border-[3px] border-ink bg-paper p-4 shadow-hard-xl">
              <DuitMascot
                mood="happy"
                accessory="crown"
                title="Pak Duit memakai mahkota, tersenyum lebar"
              />
            </div>
            <div aria-hidden="true" className="absolute -left-6 -top-5 text-ink">
              <StarBurst className="size-9 animate-wiggle motion-reduce:animate-none" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-3 -right-5 text-paper">
              <Sparkle className="size-10" />
            </div>
            <Sticker tone="paper" rotate={-6} className="absolute -bottom-5 left-2">
              24.812 apes
            </Sticker>
          </div>
        </div>
      </Container>
    </Section>
  );
}
