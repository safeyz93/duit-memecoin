import { Container } from "@/components/ui/section";
import { ContractBox } from "@/components/site/copy-contract";
import { CoinMark, UpTriangle } from "@/components/site/icons";
import { demoNote, market, site } from "@/lib/site";

const socialMonograms: Record<string, string> = {
  "X / Twitter": "X",
  Telegram: "TG",
  Discord: "DC",
  TikTok: "TT",
};

function SocialPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={`${label} (tautan demo)`}
      className="group inline-flex size-10 items-center justify-center border-[3px] border-paper/30 font-mono text-[10px] font-bold uppercase text-paper/70 transition-colors hover:border-lime hover:bg-lime hover:text-ink focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime"
    >
      {socialMonograms[label] ?? label.slice(0, 2).toUpperCase()}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-paper/20 bg-void">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid text-paper/[0.04]" />
      <Container className="relative">
        {/* giant wordmark */}
        <div className="relative flex items-end justify-between gap-6 border-b-[3px] border-paper/15 pt-12 sm:pt-16">
          <div>
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
              // akhir halaman, bukan akhir cerita
            </p>
            <h2 className="mt-2 font-display text-[clamp(4.5rem,17vw,12rem)] uppercase leading-[0.75] tracking-tight text-outline-paper sm:mt-3">
              Duit
            </h2>
          </div>
          <div className="mb-3 hidden shrink-0 flex-col items-end gap-3 md:flex">
            <div className="flex items-center gap-2 border-[3px] border-paper/25 px-3 py-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper/50">
                $DUIT
              </span>
              <span className="font-mono text-xs font-bold text-paper">$0.000420</span>
              <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-up">
                <UpTriangle className="size-2.5" />
                18,4%
              </span>
            </div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-paper/40">
              angka ilustratif
            </span>
          </div>
        </div>

        {/* columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <a
              href="#top"
              className="flex w-fit items-center gap-2.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              <CoinMark className="size-10" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[32px] uppercase leading-none text-paper">{site.name}</span>
                <span className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-lime">
                  {site.tagline}
                </span>
              </span>
            </a>
            <p className="max-w-[40ch] text-sm leading-relaxed text-paper/60">
              Meme coin untuk rakyat receh. Dibuat sebagai <strong className="text-paper">konsep desain</strong>{" "}
              — tidak ada token yang benar-benar diluncurkan, tidak ada penawaran finansial.
            </p>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((social) => (
                <SocialPill key={social.label} href={social.href} label={social.label} />
              ))}
            </div>
            <div className="max-w-md pt-1">
              <ContractBox compactLabel />
            </div>
          </div>

          <nav aria-label="Navigasi footer" className="lg:col-span-3">
            <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper/40">
              Navigasi
            </h3>
            <ul className="flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-paper/75 transition-colors hover:text-lime focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    <span aria-hidden="true" className="h-px w-3 bg-paper/30 transition-all group-hover:w-5 group-hover:bg-lime" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper/40">
              Baca ini, ser
            </h3>
            <div className="border-[3px] border-pink/60 bg-pink/5 p-4">
              <p className="font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-pink">
                Peringatan risiko
              </p>
              <p className="mt-2 text-xs leading-relaxed text-paper/65">
                Meme coin sangat volatil dan bisa kehilangan seluruh nilai. Tidak ada jaminan
                keuntungan, listing, maupun roadmap. Selalu riset sendiri, jangan pakai uang yang
                tidak siap hilang. Ini bukan nasihat keuangan.
              </p>
            </div>
            <ul className="mt-4 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/45">
              <li>Supply · {market.supplyLabel}</li>
              <li>Tax · {market.taxBuy}% beli / {market.taxSell}% jual</li>
              <li>LP · dibakar {market.lpBurnedPct}%</li>
              <li>Chain · {site.chain} ({site.standard})</li>
            </ul>
          </div>
        </div>

        {/* disclaimer */}
        <div className="border-t-[3px] border-paper/15 py-6">
          <p className="max-w-4xl text-[11px] leading-relaxed text-paper/45">{demoNote}</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t-[3px] border-paper/15 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-paper/40">
            © 2026 {site.name} Labs (konsep) · dibuat di warung, bukan di bank
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime transition-colors hover:text-paper focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Balik ke atas
            <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
