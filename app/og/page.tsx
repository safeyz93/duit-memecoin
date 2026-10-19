import type { Metadata } from "next";
import { DuitMascot } from "@/components/art/mascot";
import { Sparkle, StarBurst } from "@/components/art/props";
import { Sticker } from "@/components/ui/sticker";
import { CoinMark } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "DUIT — kartu bagikan",
  robots: { index: false, follow: false },
};

/**
 * 1200×630 social share card. Rendered at /og and captured to /public/og.png
 * by the build-time QA script, so the Open Graph image always matches the brand.
 */
export default function OgCard() {
  return (
    <main className="relative h-[630px] w-[1200px] overflow-hidden bg-void text-paper">
      <div aria-hidden="true" className="absolute inset-0 bg-grid text-paper/[0.06]" />
      <div aria-hidden="true" className="absolute -left-24 -top-16 size-[420px] rotate-12 border-[3px] border-lime/15" />
      <div aria-hidden="true" className="absolute -bottom-24 right-[380px] size-[300px] -rotate-6 border-[3px] border-pink/20" />
      <div className="relative flex h-full w-full flex-col justify-between border-[10px] border-lime p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CoinMark className="size-12" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-[38px] uppercase leading-none text-paper">Duit</span>
              <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-lime">
                Receh jadi gede
              </span>
            </div>
          </div>
          <Sticker tone="paper" rotate={2}>
            SPL Token · Solana
          </Sticker>
        </div>

        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-7 flex flex-col gap-4">
            <div className="flex gap-2">
              <Sticker tone="lime" rotate={-2}>
                0% Tax
              </Sticker>
              <Sticker tone="pink" rotate={1}>
                LP Burned 100%
              </Sticker>
            </div>
            <h1 className="font-display text-[92px] uppercase leading-[0.82] tracking-tight">
              Dari Receh
              <br />
              Jadi <span className="text-lime">Gede.</span>
            </h1>
            <p className="max-w-[46ch] font-body text-lg leading-snug text-paper/65">
              Meme coin untuk rakyat receh. Bukan janji kaya, cuma tempat numpang ngakak.
            </p>
          </div>
          <div className="col-span-5 relative pr-2">
            <div className="relative mx-auto w-[400px]">
              <div aria-hidden="true" className="absolute inset-x-3 top-3 bottom-0 rotate-[4deg] border-[3px] border-ink bg-pink shadow-[12px_12px_0_0_var(--color-gold)]" />
              <div className="relative -rotate-2 border-[3px] border-ink bg-paper p-3 shadow-hard-xl">
                <DuitMascot mood="smug" accessory="sunglasses" />
              </div>
              <div aria-hidden="true" className="absolute -left-7 -top-6 text-gold">
                <StarBurst className="size-10" />
              </div>
              <div aria-hidden="true" className="absolute -right-4 bottom-4 text-paper">
                <Sparkle className="size-9" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[3px] border-paper/20 pt-4">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper/50">
            Duitcoin.example · concept site
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-lime">
            Data ilustratif · bukan nasihat investasi
          </span>
        </div>
      </div>
    </main>
  );
}
