import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://duitcoin.example"),
  title: {
    default: "DUIT — Dari Receh Jadi Gede | Meme Coin Solana",
    template: "%s | DUIT",
  },
  description:
    "DUIT ($DUIT) adalah meme coin Solana untuk rakyat receh: 1 miliar koin, 0% tax, LP dibakar 100%, dan komunitas yang percaya bahwa receh bisa jadi gede. Konsep desain, bukan nasihat keuangan.",
  keywords: ["meme coin", "DUIT", "Solana", "crypto", "memecoin Indonesia", "degen"],
  authors: [{ name: "DUIT Labs (konsep)" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "DUIT — Dari Receh Jadi Gede",
    description:
      "Meme coin Solana untuk rakyat receh. 1 miliar koin, 0% tax, LP dibakar. Konsep demo, bukan produk keuangan.",
    siteName: "DUIT",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DUIT — maskot Pak Duit dan tagline Dari Receh Jadi Gede",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DUIT — Dari Receh Jadi Gede",
    description: "Meme coin Solana untuk rakyat receh. Receh hari ini, whale besok.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0A09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-paper font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-[3px] focus:border-ink focus:bg-lime focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:font-bold focus:text-ink focus:shadow-hard"
        >
          Lompat ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
