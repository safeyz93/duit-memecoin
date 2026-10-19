export const site = {
  name: "DUIT",
  symbol: "$DUIT",
  ticker: "DUIT",
  chain: "Solana",
  standard: "SPL Token",
  /** Placeholder contract address — illustrative only. */
  contract: "Du1tKq7xN4vR2pLm8sWc5Tb9Yh3Gf6Jd1",
  tagline: "Receh jadi gede.",
  description:
    "DUIT adalah meme coin untuk rakyat receh: 1 miliar koin, likuiditas dibakar, dan satu komunitas yang keras kepala. Bukan nasihat keuangan.",
  nav: [
    { label: "Chart", href: "#chart" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Galeri", href: "#galeri" },
    { label: "Cara Beli", href: "#cara-beli" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "FAQ", href: "#faq" },
  ],
  socials: [
    { label: "X / Twitter", handle: "@duitcoin", href: "#", stat: "38.4K" },
    { label: "Telegram", handle: "t.me/duitcoin", href: "#", stat: "21.7K" },
    { label: "Discord", handle: "discord.gg/duit", href: "#", stat: "9.8K" },
    { label: "TikTok", handle: "@duitcoin", href: "#", stat: "52.1K" },
  ],
} as const;

export const market = {
  priceUsd: 0.00042,
  priceLabel: "$0.000420",
  change24h: 18.4,
  marketCapLabel: "$12.4M",
  marketCap: 12_400_000,
  liquidityLabel: "$2.1M",
  liquidity: 2_100_000,
  volume24hLabel: "$3.8M",
  volume24h: 3_800_000,
  holdersLabel: "24.812",
  holders: 24_812,
  supply: 1_000_000_000,
  supplyLabel: "1.000.000.000",
  lpBurnedPct: 100,
  taxBuy: 0,
  taxSell: 0,
} as const;

/** Every number, price and transaction on this site is fake. Say it out loud. */
export const demoNote =
  "Angka, harga, dan transaksi di halaman ini adalah data ilustratif untuk demo desain — bukan data pasar nyata.";

export const phases = {
  current: 2,
} as const;
