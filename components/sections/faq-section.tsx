import type { ReactNode } from "react";
import { DuitMascot } from "@/components/art/mascot";
import { Container, Section, SectionHead } from "@/components/ui/section";
import { Sticker } from "@/components/ui/sticker";
import { demoNote, site } from "@/lib/site";

type Faq = {
  q: string;
  a: ReactNode;
};

const inlineLink =
  "font-bold text-ink underline decoration-[3px] decoration-pink underline-offset-4 transition-colors hover:bg-lime focus-visible:bg-lime focus-visible:outline-ink";

const inlineCode =
  "border-[3px] border-ink bg-void px-1.5 py-0.5 font-mono text-[0.8em] font-bold break-all align-middle text-paper box-decoration-clone";

const faqs: readonly Faq[] = [
  {
    q: "Apa itu DUIT?",
    a: (
      <>
        DUIT ($DUIT) itu meme coin di Solana: 1 miliar koin, 0% tax, LP dibakar 100%, dan mint authority
        dicabut — semuanya ilustratif. Konsepnya sederhana: receh bukan cuma nominal, tapi mindset. Halaman
        ini sendiri adalah demo desain, bukan produk keuangan yang dijual beneran.
      </>
    ),
  },
  {
    q: "Apakah DUIT investasi?",
    a: (
      <>
        Bukan. DUIT di sini adalah konsep dan demo desain — bukan penawaran finansial, bukan nasihat
        investasi, bukan tiket keluar dari kerja kantoran. Kalau kamu mencari instrumen yang aman, ini
        bukan tempatnya.
      </>
    ),
  },
  {
    q: "Bagaimana cara beli?",
    a: (
      <>
        Ringkas: siapkan wallet Solana, isi SOL, lalu swap ke $DUIT di DEX pakai CA resmi. Panduan empat
        langkah lengkapnya ada di{" "}
        <a href="#cara-beli" className={inlineLink}>
          bagian cara beli
        </a>
        . Kalau malas baca, jangan beli apa pun — itu saran gratis dan paling berguna di halaman ini.
      </>
    ),
  },
  {
    q: "Berapa tax beli dan jual?",
    a: (
      <>
        0% beli, 0% jual — di konsep tokenomics demo ini. Nggak ada tax tersembunyi di desainnya, tetapi
        tetap ada slippage dan biaya jaringan Solana. Itu urusan DEX dan validator, bukan urusan kami.
      </>
    ),
  },
  {
    q: "Apakah LP benar-benar dibakar?",
    a: (
      <>
        Di konsep ini: 100% likuiditas dibakar dan mint authority dicabut (ilustratif). Tapi jangan percaya
        tulisan di website — termasuk website ini. Cek sendiri di explorer, verifikasi alamatnya, baca
        transaksinya. Verifikasi menang atas vibes.
      </>
    ),
  },
  {
    q: "Kenapa harga meme coin bisa naik-turun ekstrem?",
    a: (
      <>
        Karena harganya digerakkan likuiditas tipis dan sentimen komunitas, bukan laporan keuangan. Bisa
        naik tajam dalam sehari, bisa turun drastis di minggu yang sama. Modal bisa hilang total. Ini bukan
        peringatan formal — ini pengingat.
      </>
    ),
  },
  {
    q: "Di mana alamat kontrak resminya?",
    a: (
      <>
        Ini: <code className={inlineCode}>{site.contract}</code>. Selalu cek ulang lewat kanal resmi
        sebelum swap. CA palsu biasanya mirip satu-dua huruf — dan di dunia ini, satu huruf bisa
        membedakan warung dan jebakan.
      </>
    ),
  },
  {
    q: "Apakah roadmap dijamin tercapai?",
    a: (
      <>
        Tidak. Roadmap itu rencana, bukan janji. Fase bisa bergeser, dibatalkan, atau diubah kalau kondisi
        pasar berubah. Satu hal yang pasti: komunitas akan tetap punya pendapat.
      </>
    ),
  },
];

export function FaqSection() {
  return (
    <Section id="faq" tone="paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots text-ink/5" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
          <div className="lg:self-start">
            <SectionHead
              tone="ink"
              kicker="// FAQ"
              title={
                <>
                  Tanya dulu. <span className="inline-block bg-lime px-2 text-ink">Baru ape.</span>
                </>
              }
              desc="Delapan pertanyaan yang paling sering muncul. Kalau masih ada yang ganjil, berarti kamu belum baca nomor dua."
            />

            <div className="mt-7 inline-flex -rotate-2 border-[3px] border-ink bg-pink px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-hard-sm">
              Bukan nasihat keuangan
            </div>

            {/* fills the editorial column on wide screens */}
            <div className="relative mt-10 hidden max-w-[290px] -rotate-2 lg:block">
              <div
                aria-hidden="true"
                className="absolute inset-x-2 top-2 bottom-0 rotate-2 border-[3px] border-ink bg-lime"
              />
              <div className="relative border-[3px] border-ink bg-paper p-4 shadow-hard">
                <div className="flex items-center justify-between border-b-[3px] border-ink pb-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-ink">
                    Pak Duit / faq mode
                  </span>
                  <span className="bg-ink px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-lime">
                    chill
                  </span>
                </div>
                <DuitMascot mood="chill" accessory="coffee" className="mx-auto mt-3 w-[74%]" />
                <p className="mt-3 border-t-[3px] border-ink pt-2.5 text-xs leading-relaxed text-ink/70">
                  Masih bingung? Minum kopi dulu. Jawaban paling jujur biasanya ada di nomor enam.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.q}
                open={index === 0}
                className="group border-[3px] border-ink bg-paper shadow-hard open:shadow-hard-lg"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 p-4 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink sm:items-center sm:gap-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-mono text-[10px] font-bold leading-none tracking-[0.1em] text-muted-ink sm:mt-0 sm:text-[11px]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] uppercase leading-[1.05] tracking-tight">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center border-[3px] border-ink bg-lime font-mono text-base font-bold leading-none text-ink transition-transform duration-100 group-open:rotate-45 motion-reduce:transition-none sm:size-8 sm:text-lg"
                  >
                    +
                  </span>
                </summary>

                <div className="border-t-[3px] border-ink/15 px-4 pb-5 pt-4 sm:px-5">
                  <div className="max-w-2xl text-sm leading-relaxed text-ink/80 sm:text-[15px]">{faq.a}</div>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12 border-[3px] border-pink bg-paper p-5 shadow-hard sm:mt-16 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <Sticker tone="ink" rotate={-2}>
              Baca ini
            </Sticker>
            <span aria-hidden="true" className="h-[3px] min-w-16 flex-1 bg-pink/40" />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/80 sm:text-[15px]">
            Ini halaman konsep desain, bukan penawaran finansial atau nasihat investasi. Tidak ada token
            yang dijual di sini. Meme coin sangat volatil: likuiditas bisa tipis, harga bisa turun
            mendekati nol, dan modal bisa hilang total. Kalau kamu nggak siap kehilangan receh, jangan
            ikut. Serius.
          </p>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-ink">{demoNote}</p>
        </div>
      </Container>
    </Section>
  );
}
