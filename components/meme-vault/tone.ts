import type { StickerTone } from "@/components/ui/sticker";
import type { MemeTone } from "@/lib/meme-data";

/**
 * Peta statis warna kartu meme. Jangan bikin class dinamis — semua tone
 * punya string lengkap di sini supaya Tailwind bisa mendeteksinya.
 */
export type MemeToneStyle = {
  /** Warna permukaan kartu + warna teks utama di atasnya. */
  card: string;
  /** Teks sekunder di atas permukaan itu. */
  sub: string;
  /** Warna garis pemisah internal kartu. */
  divider: string;
  /** Warna pola (bg-dots pakai currentColor). */
  pattern: string;
  /** Warna untuk prop dekoratif yang memakai currentColor. */
  deco: string;
  /** Stroke outline untuk angka dekoratif besar di belakang maskot. */
  outline: "text-outline-ink" | "text-outline-paper";
  /** Tone stiker yang tetap kontras di atas permukaan ini. */
  sticker: StickerTone;
};

export const MEME_TONE_STYLES: Record<MemeTone, MemeToneStyle> = {
  paper: {
    card: "bg-paper text-ink",
    sub: "text-ink/65",
    divider: "border-ink/20",
    pattern: "text-ink/10",
    deco: "text-ink",
    outline: "text-outline-ink",
    sticker: "pink",
  },
  lime: {
    card: "bg-lime text-ink",
    sub: "text-ink/70",
    divider: "border-ink/25",
    pattern: "text-ink/10",
    deco: "text-ink",
    outline: "text-outline-ink",
    sticker: "ink",
  },
  gold: {
    card: "bg-gold text-ink",
    sub: "text-ink/70",
    divider: "border-ink/25",
    pattern: "text-ink/10",
    deco: "text-ink",
    outline: "text-outline-ink",
    sticker: "ink",
  },
  pink: {
    card: "bg-pink text-ink",
    sub: "text-ink/75",
    divider: "border-ink/30",
    pattern: "text-ink/10",
    deco: "text-ink",
    outline: "text-outline-ink",
    sticker: "paper",
  },
  void: {
    card: "bg-void text-paper",
    sub: "text-paper/65",
    divider: "border-paper/25",
    pattern: "text-paper/10",
    deco: "text-paper",
    outline: "text-outline-paper",
    sticker: "lime",
  },
};
