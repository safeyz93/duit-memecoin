# DUIT — Design & Build Contract (single source of truth)

> Meme coin concept site. Indonesian-first copy, degen English sprinkled in.
> **Everything on this site is illustrative / demo data — never real financial data.**

## 1. Brand

- **Name:** DUIT (`$DUIT`), chain: Solana (SPL Token)
- **Mascot:** "Pak Duit" — a smug gold coin with a face, thick ink outline. Built as parametric SVG.
- **Tagline:** `Receh jadi gede.`
- **Hero line:** `DARI RECEH JADI GEDE.`
- **Voice:** confident, self-aware, funny, never promises profit. Bahasa Indonesia santai + degen slang (wagmi, ser, ape, HODL).
- **Fake contract address (placeholder, must be labeled *ilustratif*):** `Du1tKq7xN4vR2pLm8sWc5Tb9Yh3Gf6Jd1`

## 2. Visual direction

**70% Neo-Brutalism + 30% Degen.** Thick solid borders (`border-[3px] border-ink`), hard offset shadows (no blur),
flat saturated color, tight-poster typography, physical hover (lift / press). Dark "terminal" zones mixed with cream
"paper" zones. No soft gradients, no glassmorphism, no rounded pill soup.

### Tokens (Tailwind v4 `@theme` in `app/globals.css`) — already defined

| Token | Hex | Role |
|---|---|---|
| `void` | `#0B0A09` | dark background |
| `paper` | `#FFF4D6` | cream background / surface |
| `ink` | `#0B0A09` | text + borders on light |
| `lime` | `#C9FF2E` | **primary accent / CTA** (always ink text on it) |
| `pink` | `#FF3D8B` | secondary accent / "sell"/alert stickers |
| `gold` | `#FFC53D` | coin / money accent |
| `up` | `#2BFF88` | price up (dark bg only) |
| `down` | `#FF4D4D` | price down (dark bg only) |
| `muted` | `#8B8270` | muted text on **dark** bg |
| `muted-ink` | `#5E574A` | muted text on **paper** bg |

Shadows: `shadow-hard` `shadow-hard-sm` `shadow-hard-lg` `shadow-hard-xl` (ink), `shadow-lime`, `shadow-pink`, `shadow-paper`.
Animations: `animate-marquee`, `animate-marquee-slow`, `animate-float`, `animate-spin-slow`, `animate-blink`, `animate-wiggle`.
Utilities: `bg-dots`, `bg-grid`, `bg-diag-lines` (use `text-ink/20` etc. as the pattern color via `currentColor`).

Fonts: `font-display` (Anton), `font-body` (Space Grotesk), `font-mono` (JetBrains Mono) — via `next/font`.

Hard rules:
- Only token classes for color. No raw hex utilities (a one-off SVG `fill` attribute is fine).
- `focus-visible` must be visible; respect `motion-reduce`; decorative SVG gets `aria-hidden`.
- No horizontal scroll at 360px. Marquee/rotated art wrapped in `overflow-hidden`.
- Body copy on paper = `text-ink/80` or `text-muted-ink`, never low-contrast pastel.
- No dynamic Tailwind class strings like `bg-${x}`. Use static maps.

## 3. Foundation API (owned by Lead — **do not edit these files**)

| File | Exports |
|---|---|
| `lib/utils.ts` | `cn(...)` |
| `lib/site.ts` | `site` (name, symbol, contract, nav[], socials[]), `market` (labels + numbers), `demoNote` |
| `components/ui/button.tsx` | `Button` (button), `ButtonLink` (anchor), `buttonStyles({tone,size,className})` |
| `components/ui/card.tsx` | `Card({tone, className, children})` |
| `components/ui/sticker.tsx` | `Sticker({children, tone, rotate, className})` |
| `components/ui/section.tsx` | `Section({id,tone,className,children})`, `Container({className})`, `SectionHead({kicker,title,desc,align,tone})`, `Kicker({children,tone})` |
| `components/art/mascot.tsx` | `DuitMascot({mood, accessory, className, title})` |
| `components/art/props.tsx` | `Sparkle`, `StarBurst`, `Bolt`, `Moon`, `Rocket`, `Diamond`, `CoinStack`, `ScribbleArrow` |
| `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `components/site/*` | Lead only |

### Component signatures

```tsx
// Button / ButtonLink
type Tone = "lime" | "pink" | "gold" | "paper" | "ink";
type Size = "sm" | "md" | "lg";
<Button tone="lime" size="lg" onClick={...}>Beli $DUIT</Button>
<ButtonLink href="#chart" tone="ink" size="md">Lihat Chart</ButtonLink>
buttonStyles({ tone: "lime", size: "md", className?: string }) // for custom <a>/<button>

// Card
<Card tone="paper" className="...">...</Card>
// tones: paper | void | ink | lime | pink | gold  (each already has border + shadow)

// Sticker
<Sticker tone="lime" rotate={-3}>LIVE DI SOLANA</Sticker>
// tones: lime | pink | gold | paper | ink

// Section / SectionHead
<Section id="chart" tone="paper" className="...">...</Section>
// tones: void | paper | lime | pink | ink  (adds py-20 md:py-28, relative, overflow-hidden)
<SectionHead
  kicker="// DUITMETER"
  title={<>HARGA NAIK, <span className="text-lime">HATI TENANG.</span></>}
  desc="..."
  tone="ink"      // text tone: "ink" for paper sections, "paper" for dark sections
  align="left"    // left | center
/>
<Kicker tone="lime">LIVE</Kicker>
```

```tsx
// Mascot — parametric SVG coin character, no fixed size (fills parent width)
type Mood = "smug" | "happy" | "panic" | "cry" | "laser" | "chill" | "shock" | "love";
type Accessory = "none" | "sunglasses" | "crown" | "diamond" | "coffee" | "rocket" | "parachute" | "shield" | "chain";
<DuitMascot mood="laser" accessory="crown" className="w-64" />
```

## 4. Section ownership + page order

`app/page.tsx` (Lead) stacks:

1. `components/site/nav.tsx` + hero — Lead
2. `components/sections/hero.tsx` — Lead (includes ticker marquee band)
3. `<ChartSection />` — **Teammate charts** — `<Section tone="paper" id="chart">`
4. `<TokenomicsSection />` — **Teammate charts** — `<Section tone="void" id="tokenomics">`
5. `<MemeVault />` — **Teammate gallery** — `<Section tone="paper" id="galeri">`
6. `<HowToBuy />` — **Teammate content** — `<Section tone="void" id="cara-beli">`
7. `<Roadmap />` — **Teammate content** — `<Section tone="paper" id="roadmap">`
8. `<CommunitySection />` — **Teammate content** — `<Section tone="void" id="komunitas">`
9. `<FaqSection />` — **Teammate content** — `<Section tone="paper" id="faq">`
10. CTA band + footer — Lead

All named exports, no props. Each section component includes its own `<Section>` root and a visible `id`.

## 5. Content facts (use these, don't invent different numbers)

- Supply: 1.000.000.000 `$DUIT`, 0% buy/sell tax, LP burned 100%, mint authority revoked (illustrative).
- Price `$0.000420`, +18,4% 24h, mcap `$12.4M`, liq `$2.1M`, vol 24h `$3.8M`, holders `24.812`.
- Socials: X `@duitcoin` 38.4K · Telegram 21.7K · Discord 9.8K · TikTok 52.1K (illustrative counts).
- `demoNote` from `lib/site.ts` must appear at least once per data-heavy section, small and legible.
- **Never** write profit guarantees, price targets, or "guaranteed". No real brand logos/characters.
