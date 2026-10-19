import type { DuitAccessory, DuitMood } from "@/components/art/mascot";

/**
 * DUIT Meme Vault — data ilustratif untuk galeri meme.
 * Semua angka (like, nomor arsip) adalah data demo, bukan data on-chain.
 */

export const MEME_TONES = ["paper", "lime", "gold", "pink", "void"] as const;
export type MemeTone = (typeof MEME_TONES)[number];

/** Empat tag yang juga dipakai sebagai filter galeri. */
export const MEME_TAGS = ["WAGMI", "PANIK", "CLASSIC", "KOPI"] as const;
export type MemeTag = (typeof MEME_TAGS)[number];

export type MemeFilterId = "Semua" | MemeTag;

/** Dekorasi kecil yang mengelilingi maskot di dalam kartu. */
export const MEME_PROPS = ["sparkle", "heart", "bolt", "moon", "rocket", "diamond", "coin", "arrow"] as const;
export type MemeProp = (typeof MEME_PROPS)[number];

export type Meme = {
  id: string;
  /** Judul pendek, huruf besar, gaya poster. */
  title: string;
  /** Satu baris keterangan. */
  caption: string;
  tags: readonly MemeTag[];
  /** Warna permukaan kartu. */
  tone: MemeTone;
  mood: DuitMood;
  accessory: DuitAccessory;
  prop: MemeProp;
  /** Angka ilustratif — bukan data on-chain. */
  likes: number;
  /** Dua meme unggulan: pembuka dan penutup grid. */
  featured?: boolean;
};

export const MEMES: readonly Meme[] = [
  {
    id: "panik-jam-3-pagi",
    title: "Panik Jam 3 Pagi",
    caption: "Jual di harga receh, nangis sampai subuh.",
    tags: ["PANIK"],
    tone: "void",
    mood: "panic",
    accessory: "none",
    prop: "bolt",
    likes: 6900,
    featured: true,
  },
  {
    id: "wagmi-sampai-mati",
    title: "Wagmi Sampai Mati",
    caption: "Portofolio kosong, tapi keyakinan penuh.",
    tags: ["WAGMI"],
    tone: "lime",
    mood: "smug",
    accessory: "sunglasses",
    prop: "sparkle",
    likes: 4200,
  },
  {
    id: "kopi-dulu-profit-kemudian",
    title: "Kopi Dulu, Profit Kemudian",
    caption: "Chart bisa nunggu. Kopi tubruk nggak bisa.",
    tags: ["KOPI"],
    tone: "gold",
    mood: "chill",
    accessory: "coffee",
    prop: "coin",
    likes: 2900,
  },
  {
    id: "diamond-hands-tulang-besi",
    title: "Diamond Hands, Tulang Besi",
    caption: "Nggak pernah jual — lupa kalau punya koin.",
    tags: ["CLASSIC", "WAGMI"],
    tone: "paper",
    mood: "smug",
    accessory: "diamond",
    prop: "diamond",
    likes: 5100,
  },
  {
    id: "wen-moon-nanti",
    title: "Wen Moon? Nanti.",
    caption: "Jawaban yang selalu benar, tapi nggak membantu.",
    tags: ["CLASSIC"],
    tone: "pink",
    mood: "chill",
    accessory: "rocket",
    prop: "moon",
    likes: 3800,
  },
  {
    id: "whale-receh",
    title: "Whale Receh",
    caption: "Punya lima puluh ribu, mentalnya lima puluh miliar.",
    tags: ["CLASSIC"],
    tone: "paper",
    mood: "smug",
    accessory: "chain",
    prop: "coin",
    likes: 3400,
  },
  {
    id: "gm-tapi-belum-tidur",
    title: "GM, Tapi Belum Tidur",
    caption: "Pagi di grup WA, tengah malam di hati.",
    tags: ["WAGMI", "KOPI"],
    tone: "lime",
    mood: "happy",
    accessory: "crown",
    prop: "sparkle",
    likes: 4400,
  },
  {
    id: "ngmi-tapi-tetap-beli",
    title: "NGMI, Tapi Tetap Beli",
    caption: "Logika bilang jangan. Jempol bilang gas.",
    tags: ["PANIK"],
    tone: "pink",
    mood: "cry",
    accessory: "none",
    prop: "arrow",
    likes: 5600,
  },
  {
    id: "airdrop-dari-langit",
    title: "Airdrop Dari Langit",
    caption: "Belum ada isinya, screenshot-nya udah di-pin.",
    tags: ["WAGMI"],
    tone: "gold",
    mood: "love",
    accessory: "parachute",
    prop: "heart",
    likes: 7100,
  },
  {
    id: "ath-sama-atm",
    title: "ATH = ATM",
    caption: "Beli di puncak, nanya kenapa saldo tipis.",
    tags: ["CLASSIC", "PANIK"],
    tone: "paper",
    mood: "shock",
    accessory: "none",
    prop: "arrow",
    likes: 6300,
  },
  {
    id: "hodl-sampai-kpr-lunas",
    title: "HODL Sampai KPR Lunas",
    caption: "Koinnya nunggu bulan. KPR-nya nunggu transfer.",
    tags: ["WAGMI", "CLASSIC"],
    tone: "void",
    mood: "laser",
    accessory: "shield",
    prop: "rocket",
    likes: 8800,
  },
  {
    id: "laser-eyes-mata-minus",
    title: "Laser Eyes, Mata Minus",
    caption: "Nembak ke bulan pakai kacamata minus delapan.",
    tags: ["PANIK", "KOPI"],
    tone: "lime",
    mood: "laser",
    accessory: "sunglasses",
    prop: "sparkle",
    likes: 3900,
    featured: true,
  },
];

/** Chip filter — hitungannya diturunkan langsung dari MEMES. */
export const FILTERS: readonly { id: MemeFilterId; label: string; count: number }[] = [
  { id: "Semua", label: "Semua", count: MEMES.length },
  ...MEME_TAGS.map((tag) => ({
    id: tag,
    label: tag,
    count: MEMES.filter((meme) => meme.tags.includes(tag)).length,
  })),
];

/** Catatan kecil di bawah grid. Angka like itu hiasan, bukan on-chain. */
export const memeNote =
  "Like, nomor arsip, dan gelar meme of the week itu ilustratif — dibikin jam tiga pagi, bukan riset keuangan.";
