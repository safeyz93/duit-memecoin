import { DuitMascot } from "@/components/art/mascot";
import { ArrowUpRight } from "@/components/site/icons";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHead } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { demoNote, site } from "@/lib/site";
import { cn, truncateMiddle } from "@/lib/utils";

type StepTone = "lime" | "pink" | "gold" | "paper";

type Step = {
  n: string;
  tag: string;
  title: string;
  desc: string;
  chips: readonly string[];
  note: string;
  tone: StepTone;
};

const steps: readonly Step[] = [
  {
    n: "01",
    tag: "Dompet",
    title: "Siapkan Dompet",
    desc: "Wallet Solana dulu, bukan dompet ortu. Install extension atau app resminya, lalu simpan seed phrase di tempat yang nggak bisa difoto orang lain.",
    chips: ["Phantom", "Solflare", "Backpack"],
    note: "Seed phrase itu kunci rumah: nggak ada admin, satpam, atau panitia yang perlu tahu isinya.",
    tone: "lime",
  },
  {
    n: "02",
    tag: "SOL",
    title: "Isi SOL",
    desc: "Beli SOL di exchange yang kamu percaya, kirim ke wallet kamu sendiri. Sisain sedikit buat gas — namanya juga warung, parkir tetap bayar.",
    chips: ["Beli SOL", "Kirim ke wallet", "Sisain gas"],
    note: "Jangan kirim SOL lewat jaringan lain. Salah jaringan, bukan salah kita — dan bukan salah siapa-siapa.",
    tone: "gold",
  },
  {
    n: "03",
    tag: "Swap",
    title: "Tukar ke $DUIT",
    desc: "Buka DEX favoritmu, tempel contract address resmi dari panel CA, lalu swap. Cek alamat dua kali, klik sekali.",
    chips: ["Jupiter", "Raydium", "CA resmi"],
    note: "Link dari DM, grup random, atau 'admin' yang baru kenal satu jam: bukan sumber alamat yang baik.",
    tone: "pink",
  },
  {
    n: "04",
    tag: "Budaya",
    title: "HODL & Bikin Meme",
    desc: "Masuk komunitas, bikin meme pertama, lalu hadapi candle merah tanpa kehilangan selera humor. Ini langkah yang paling menentukan.",
    chips: ["Gabung", "Bikin meme", "Jangan panik"],
    note: "HODL bukan janji cuan. HODL itu keputusan pribadi yang sebaiknya didiskusikan dengan dirimu sendiri.",
    tone: "paper",
  },
];

const numberTones: Record<StepTone, string> = {
  lime: "text-lime",
  gold: "text-gold",
  pink: "text-pink",
  paper: "text-paper",
};

const tagTones: Record<StepTone, string> = {
  lime: "bg-lime text-ink",
  gold: "bg-gold text-ink",
  pink: "bg-pink text-ink",
  paper: "bg-paper text-ink",
};

export function HowToBuy() {
  return (
    <Section id="cara-beli" tone="void">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid text-paper/5" />
      <Container className="relative">
        <SectionHead
          tone="paper"
          kicker="// Cara beli"
          title={
            <>
              Empat langkah, <span className="text-lime">nol drama.</span>
            </>
          }
          desc="Nggak perlu jadi trader. Perlu dompet, sedikit SOL, dan kesadaran bahwa halaman ini demo desain. Estimasi lima menit — sisanya buat scroll meme."
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y-[3px] border-paper/15 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-paper/50">
            <span>Estimasi 5 menit</span>
            <span aria-hidden="true" className="text-paper/25">
              //
            </span>
            <span>Modal: gas + tekad</span>
            <span aria-hidden="true" className="text-paper/25">
              //
            </span>
            <span>Risk: ada, baca FAQ</span>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-lime">
            Bukan nasihat keuangan
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
          <ol className="space-y-6 sm:space-y-7">
            {steps.map((step) => (
              <li key={step.n}>
                <div className="flex items-stretch gap-3 sm:gap-5">
                  <div className="flex w-11 shrink-0 flex-col items-center sm:w-16">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-[2.4rem] leading-[0.78] tracking-tight sm:text-[3.6rem]",
                        numberTones[step.tone],
                      )}
                    >
                      {step.n}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-3 min-h-10 w-1.5 flex-1 bg-diag-lines text-paper/30"
                    />
                  </div>

                  <Card tone="paper" className="relative min-w-0 flex-1 p-4 shadow-lime sm:p-6">
                    {step.n === "04" ? (
                      <DuitMascot
                        mood="chill"
                        accessory="coffee"
                        className="pointer-events-none absolute right-3 top-2 hidden h-14 w-14 rotate-6 sm:block"
                      />
                    ) : null}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={cn(
                          "border-[3px] border-ink px-2 py-1 font-mono text-[9px] font-bold uppercase leading-none tracking-[0.16em]",
                          tagTones[step.tone],
                        )}
                      >
                        {step.tag}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase leading-none tracking-[0.16em] text-muted-ink">
                        Langkah {step.n}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-[clamp(1.45rem,2.4vw,2rem)] uppercase leading-[0.94]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-[15px]">{step.desc}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {step.chips.map((chip) => (
                        <li
                          key={chip}
                          className="inline-flex items-center border-[3px] border-ink bg-paper px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 border-t-[3px] border-ink/15 pt-3 text-xs leading-relaxed text-muted-ink">
                      {step.note}
                    </p>
                  </Card>
                </div>
              </li>
            ))}
          </ol>

          <aside aria-labelledby="ca-resmi-title" className="lg:self-start">
            <div className="relative">
              <Sticker
                tone="pink"
                rotate={-4}
                className="absolute -top-4 right-4 z-20 sm:-top-5 sm:right-5"
              >
                Selalu cek CA
              </Sticker>

              <Card tone="paper" className="p-0 shadow-lime-lg">
                <div className="border-b-[3px] border-ink bg-lime px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-2.5 shrink-0 bg-ink" />
                    <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.24em]">
                      CA resmi
                    </span>
                  </div>
                  <h3
                    id="ca-resmi-title"
                    className="mt-2 font-display text-[clamp(1.3rem,2vw,1.7rem)] uppercase leading-[0.95]"
                  >
                    Copy dari sini, bukan dari DM.
                  </h3>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="border-[3px] border-ink bg-void p-3">
                    <p className="font-mono text-[9px] uppercase leading-none tracking-[0.2em] text-paper/45">
                      SPL Token · Solana
                    </p>
                    <p
                      className="mt-2 break-all font-mono text-[13px] font-bold leading-relaxed text-paper"
                      title={site.contract}
                    >
                      {truncateMiddle(site.contract, 8, 8)}
                    </p>
                    <span className="sr-only">Alamat kontrak lengkap: {site.contract}</span>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-ink/75">
                    <span className="font-bold text-ink">CA palsu banyak, ser.</span> Beda satu huruf, beda kolam.
                    Kalau ada yang minta seed phrase, itu bukan kami.
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    <ButtonLink
                      href="#galeri"
                      tone="lime"
                      size="md"
                      className="w-full"
                      icon={<ArrowUpRight className="size-4" />}
                    >
                      Lihat Galeri Meme
                    </ButtonLink>
                    <ButtonLink href="#chart" tone="ink" size="md" className="w-full">
                      Lihat Chart
                    </ButtonLink>
                  </div>

                  <p className="mt-4 border-t-[3px] border-ink/15 pt-3 font-mono text-[10px] leading-relaxed text-muted-ink">
                    {demoNote}
                  </p>
                </div>
              </Card>
            </div>

            <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-paper/40">
              Transaksi selalu di wallet kamu sendiri.
            </p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
