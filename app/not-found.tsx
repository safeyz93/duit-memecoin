import type { Metadata } from "next";
import { DuitMascot } from "@/components/art/mascot";
import { ButtonLink } from "@/components/ui/button";
import { Sticker } from "@/components/ui/sticker";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-screen items-center overflow-hidden bg-void py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid text-paper/[0.05]" />
      <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <Sticker tone="pink" rotate={-2}>
            Error 404
          </Sticker>
          <h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] uppercase leading-[0.85] tracking-tight text-paper">
            Halaman ini
            <br />
            <span className="text-lime">udah rugpull.</span>
          </h1>
          <p className="max-w-[44ch] text-base leading-relaxed text-paper/70 sm:text-lg">
            Entah salah ketik, entah link-nya hilang. Yang jelas, dompet kamu masih aman. Balik ke
            warung utama dan lanjut ngakak.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" tone="lime" size="lg">
              Balik ke Beranda
            </ButtonLink>
            <ButtonLink href="/#faq" tone="ink" size="lg">
              Baca FAQ
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[360px]">
          <div aria-hidden="true" className="absolute inset-x-3 top-3 bottom-0 rotate-[4deg] border-[3px] border-ink bg-pink shadow-[12px_12px_0_0_var(--color-gold)]" />
          <div className="relative -rotate-2 border-[3px] border-ink bg-paper p-5 shadow-hard-xl">
            <DuitMascot mood="shock" accessory="none" title="Pak Duit kaget karena halaman tidak ditemukan" />
            <div className="mt-2 flex items-center justify-between border-t-[3px] border-ink pt-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                Pak Duit / bingung
              </span>
              <span className="bg-ink px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-lime">
                404
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
