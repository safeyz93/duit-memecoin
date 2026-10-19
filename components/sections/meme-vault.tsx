import { Sparkle } from "@/components/art/props";
import { VaultExplorer } from "@/components/meme-vault/vault-explorer";
import { Container, Section, SectionHead } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { cn } from "@/lib/utils";

const VAULT_RULES = ["Like boleh, janji jangan.", "Meme bukan nasihat keuangan.", "NGMI tetap dilayani."] as const;

const VAULT_FACTS = [
  { label: "12 meme mentah", dot: "bg-ink" },
  { label: "0 janji manis", dot: "bg-pink" },
  { label: "dibikin jam 3 pagi", dot: "bg-ink" },
  { label: "like = ilustratif", dot: "bg-pink" },
] as const;

function VaultRules() {
  return (
    <aside
      aria-label="Aturan vault"
      className="relative mx-auto w-full max-w-[340px] rotate-[1.5deg] border-[3px] border-ink bg-paper shadow-hard-lg lg:mx-0"
    >
      <div className="flex items-center justify-between gap-2 border-b-[3px] border-ink bg-ink px-3 py-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper">Vault rules</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-lime">
          <span aria-hidden="true" className="block size-1.5 animate-blink bg-lime motion-reduce:animate-none" />
          open
        </span>
      </div>
      <ul className="divide-y-2 divide-ink/15">
        {VAULT_RULES.map((rule, index) => (
          <li key={rule} className="flex items-start gap-3 px-3 py-2.5">
            <span
              aria-hidden="true"
              className="mt-px inline-flex size-5 shrink-0 items-center justify-center border-[2px] border-ink bg-lime font-mono text-[9px] font-bold leading-none text-ink"
            >
              {index + 1}
            </span>
            <span className="text-[13px] font-semibold leading-snug text-ink">{rule}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 border-t-[3px] border-ink px-3 py-2">
        <Sticker tone="lime" rotate={-3}>
          100% receh
        </Sticker>
        <span className="text-right font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-muted-ink">
          arsip: subuh ini
        </span>
      </div>
    </aside>
  );
}

function VaultFactsStrip() {
  return (
    <div className="mt-10 border-[3px] border-ink bg-ink shadow-hard">
      <ul className="grid grid-cols-1 gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
        {VAULT_FACTS.map((fact) => (
          <li
            key={fact.label}
            className="flex items-center gap-2.5 bg-lime px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink sm:text-[11px]"
          >
            <span aria-hidden="true" className={cn("block size-2.5 shrink-0 border-[2px] border-ink", fact.dot)} />
            {fact.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MemeVault() {
  return (
    <Section id="galeri" tone="paper" className="border-y-[3px] border-ink">
      {/* latar dekoratif */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-ink/[0.06]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 size-64 bg-diag-lines text-ink/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-28 size-60 rotate-6 border-[3px] border-ink/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-2 hidden select-none font-display text-[11rem] uppercase leading-none text-outline-ink opacity-[0.08] xl:block"
      >
        Vault
      </span>
      <Sparkle className="pointer-events-none absolute left-1 top-16 hidden h-8 w-8 rotate-12 text-pink lg:block" />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12">
          <SectionHead
            kicker="// MEME VAULT"
            title={
              <>
                Arsip meme <span className="text-outline-ink">receh</span> yang nggak pernah dijual.
              </>
            }
            desc="Dua belas meme hasil rapat darurat grup WA jam tiga pagi. Pilih yang paling nggak jelas, kasih like, lalu pura-pura produktif. Angka like ilustratif; meme bukan nasihat keuangan."
          />
          <VaultRules />
        </div>

        <VaultFactsStrip />

        <div className="mt-6">
          <VaultExplorer />
        </div>
      </Container>
    </Section>
  );
}
