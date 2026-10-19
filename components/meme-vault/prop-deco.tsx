import { Bolt, CoinStack, Diamond, Heart, Moon, Rocket, ScribbleArrow, Sparkle } from "@/components/art/props";
import type { MemeProp } from "@/lib/meme-data";

/** Satu prop dekoratif sesuai resep tiap meme. Ukuran/warna diatur lewat className. */
export function PropDeco({ prop, className }: { prop: MemeProp; className?: string }) {
  switch (prop) {
    case "sparkle":
      return <Sparkle className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "bolt":
      return <Bolt className={className} />;
    case "moon":
      return <Moon className={className} />;
    case "rocket":
      return <Rocket className={className} />;
    case "diamond":
      return <Diamond className={className} />;
    case "coin":
      return <CoinStack className={className} />;
    case "arrow":
      return <ScribbleArrow className={className} />;
  }
}
