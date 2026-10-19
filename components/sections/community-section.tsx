import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHead } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { demoNote, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Monogram = {
  glyph: string;
  tile: string;
};

/* Simple original monograms — no brand logos, just chunky letterforms. */
const monograms: Record<string, Monogram> = {
  "X / Twitter": { glyph: "X", tile: "bg-lime" },
  Telegram: { glyph: "TG", tile: "bg-gold" },
  Discord: { glyph: "DC", tile: "bg-paper" },
  TikTok: { glyph: "TT", tile: "bg-pink" },
};

const fallbackMonogram: Monogram = { glyph: "??", tile: "bg-paper" };

export function CommunitySection() {
  return (
    <Section id="komunitas" tone="void">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-paper/5" />
      <Container className="relative">
        <SectionHead
          tone="paper"
          kicker="// Komunitas"
          title={
            <>
              24.812 orang tanpa alasan jelas,{" "}
              <span className="block text-lime">tapi tetap di sini.</span>
            </>
          }
          desc="Bukan komunitas yang janji cuan. Ini warung digital: ada yang bikin meme, ada yang jual cerita, ada yang cuma nongkrong sambil pantau chart. Semua diterima — asal jangan minta seed phrase."
          className="max-w-4xl"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <Sticker tone="lime" rotate={-2}>
            Gratis · gak pake undangan
          </Sticker>
          <Sticker tone="paper" rotate={1.5}>
            4 kanal · 1 warung
          </Sticker>
          <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-paper/45">
            Buka 24 jam
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-[3px] border-ink bg-lime p-5 text-ink shadow-pink sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Sticker tone="pink" rotate={-3}>
                Mingguan
              </Sticker>
              <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.2em]">
                // Meme contest
              </span>
            </div>
            <p className="mt-4 font-display text-[clamp(1.7rem,3vw,2.5rem)] uppercase leading-[0.95]">
              Menang gak perlu bisa gambar.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/75">
              Yang penting niat dan sedikit delusi. Hadiah ilustratif, juri subjektif, harga diri tidak
              dipertaruhkan.
            </p>
          </div>
          <ButtonLink
            href="#"
            tone="ink"
            size="lg"
            className="shrink-0 self-start sm:self-center"
            aria-label="Gabung ke grup Telegram DUIT (tautan ilustratif)"
            icon={<ArrowUpRight className="size-5" />}
          >
            Join di Telegram
          </ButtonLink>
        </div>

        <div className="mt-12 flex items-end justify-between gap-4 border-b-[3px] border-paper/15 pb-3 sm:mt-14">
          <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-paper/60">
            Kanal resmi
          </span>
          <span className="hidden font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-paper/35 sm:block">
            Pilih satu, atau semua
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {site.socials.map((social, index) => {
            const mono = monograms[social.label] ?? fallbackMonogram;
            return (
              <Card
                key={social.label}
                tone="paper"
                className="group relative flex h-full flex-col p-5 shadow-lime transition-[transform,box-shadow] duration-100 ease-out hover:-translate-y-1.5 hover:shadow-lime-lg focus-within:-translate-y-1.5 motion-reduce:transition-none sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-12 place-items-center border-[3px] border-ink font-display text-xl leading-none text-ink shadow-hard-sm sm:size-14 sm:text-2xl",
                      mono.tile,
                    )}
                  >
                    {mono.glyph}
                  </span>
                  <span className="font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-muted-ink">
                    0{index + 1} / 04
                  </span>
                </div>

                <p className="mt-5 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-muted-ink">
                  {social.label}
                </p>
                <p className="mt-1.5 break-all font-mono text-[13px] font-bold leading-snug text-ink">
                  {social.handle}
                </p>

                <p className="mt-5 font-display text-[clamp(2.4rem,3.6vw,3rem)] leading-none">{social.stat}</p>
                <p className="mt-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-muted-ink">
                  Followers · ilustratif
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 border-t-[3px] border-ink/15 pt-5">
                  <span className="font-body text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
                    Gabung
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center border-[3px] border-ink bg-lime text-ink transition-transform duration-100 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </div>

                <a
                  href={social.href}
                  aria-label={`Gabung ke ${social.label} DUIT — ${social.handle} (tautan ilustratif)`}
                  className="absolute inset-0 z-10 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime"
                />
              </Card>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl font-mono text-[10px] leading-relaxed text-muted">
          {demoNote} Angka follower di kartu juga ilustratif — beberapa mungkin bot, beberapa mungkin cuma
          mampir lihat meme.
        </p>
      </Container>
    </Section>
  );
}
