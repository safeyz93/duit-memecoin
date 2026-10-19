import { Card } from "@/components/ui/card";
import { Container, Section, SectionHead } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { demoNote } from "@/lib/site";
import { cn } from "@/lib/utils";

type PhaseStatus = "selesai" | "aktif" | "segera";

type Phase = {
  n: string;
  title: string;
  status: PhaseStatus;
  desc: string;
  items: readonly string[];
  target: string;
};

const phases: readonly Phase[] = [
  {
    n: "01",
    title: "Mimpi Receh",
    status: "selesai",
    desc: "Dari nol jadi receh resmi. Token live, LP dibakar 100%, dan komunitas pertama mulai nongkrong.",
    items: ["Token launch di Solana", "LP dibakar 100%", "Mint authority dicabut", "5.000 holders pertama"],
    target: "5.000",
  },
  {
    n: "02",
    title: "Naik Warung",
    status: "aktif",
    desc: "Warung mulai rame. Yang datang bukan cuma bot — beberapa beneran bawa meme.",
    items: ["10.000 holders", "Meme contest mingguan", "Listing di DEX aggregator", "AMA rutin (kadang ngaco)"],
    target: "10.000",
  },
  {
    n: "03",
    title: "Pasar Malam",
    status: "segera",
    desc: "Lampu lebih terang, dagangan lebih banyak. Risikonya tetap sama: jangan bawa uang dapur.",
    items: ["25.000 holders", '"Staking receh" (eksperimen)', "Merch drop", "Kolaborasi sama warung lain"],
    target: "25.000",
  },
  {
    n: "04",
    title: "Legenda Kampung",
    status: "segera",
    desc: "Kalau sampai sini, ini bukan lagi meme. Ini kampung — lengkap dengan taman bacaan dan patung Pak Duit.",
    items: ["100.000 holders", "Event offline", "DAO receh", "Museum meme"],
    target: "100.000",
  },
];

const statusStyles: Record<PhaseStatus, string> = {
  selesai: "bg-ink text-paper",
  aktif: "bg-ink text-lime",
  segera: "bg-transparent text-ink",
};

const statusLabels: Record<PhaseStatus, string> = {
  selesai: "Selesai",
  aktif: "Aktif",
  segera: "Segera",
};

export function Roadmap() {
  return (
    <Section id="roadmap" tone="paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-ink/5" />
      <Container className="relative">
        <SectionHead
          tone="ink"
          kicker="// Roadmap"
          title={
            <>
              Rencana naik kelas.{" "}
              <span className="inline-block bg-lime px-2 text-ink">Bukan janji.</span>
            </>
          }
          desc="Empat fase dengan target yang kami tulis terbuka. Fase kedua sedang jalan; sisanya masih rencana — dan rencana bisa berubah."
          className="max-w-4xl"
        />

        <div className="relative mt-12 lg:mt-16 lg:pt-14">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-[3px] bg-ink/25 lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {phases.map((phase) => {
              const active = phase.status === "aktif";
              return (
                <li key={phase.n} className="relative flex flex-col">
                  <div className="relative z-10 mb-4 flex items-center gap-3 lg:absolute lg:-top-14 lg:left-0 lg:right-0 lg:mb-0 lg:justify-center">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-11 place-items-center border-[3px] border-ink font-display text-base leading-none shadow-hard-sm lg:size-12 lg:text-lg",
                        active ? "bg-lime" : "bg-paper",
                      )}
                    >
                      {phase.n}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-muted-ink lg:sr-only">
                      Fase {phase.n}
                    </span>
                  </div>

                  <Card
                    tone={active ? "lime" : "paper"}
                    className={cn(
                      "relative flex h-full flex-col p-5 sm:p-6",
                      active && "shadow-hard-lg lg:-translate-y-2 lg:-rotate-1",
                    )}
                  >
                    {active ? (
                      <Sticker tone="pink" rotate={-6} className="absolute -top-4 right-4 z-10">
                        Kamu di sini
                      </Sticker>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-ink/60">
                        Fase {phase.n}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 border-[3px] border-ink px-2 py-1 font-mono text-[9px] font-bold uppercase leading-none tracking-[0.16em]",
                          statusStyles[phase.status],
                        )}
                      >
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="size-1.5 animate-blink bg-lime motion-reduce:animate-none"
                          />
                        ) : null}
                        {statusLabels[phase.status]}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2rem)] uppercase leading-[0.92]">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{phase.desc}</p>

                    <ul className="mt-5 space-y-2.5">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13px] font-medium leading-snug text-ink/80"
                        >
                          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 bg-ink" />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t-[3px] border-ink/15 pt-4">
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] font-bold uppercase leading-none tracking-[0.16em] text-ink/60">
                          Target holders
                        </p>
                        <p className="mt-1.5 font-display text-3xl leading-none sm:text-4xl">{phase.target}</p>
                      </div>
                      <span className="pb-1 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-ink/55">
                        ilustratif
                      </span>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-[3px] border-ink/20 pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p className="max-w-2xl font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.1em]">
            Roadmap = rencana, bukan janji. Tidak ada jaminan harga atau listing.
          </p>
          <p className="max-w-md font-mono text-[10px] leading-relaxed text-muted-ink">{demoNote}</p>
        </div>
      </Container>
    </Section>
  );
}
