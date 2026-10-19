import { cn } from "@/lib/utils";

export type DuitMood = "smug" | "happy" | "panic" | "cry" | "laser" | "chill" | "shock" | "love";

export type DuitAccessory =
  | "none"
  | "sunglasses"
  | "crown"
  | "diamond"
  | "coffee"
  | "rocket"
  | "parachute"
  | "shield"
  | "chain";

type MascotProps = {
  mood?: DuitMood;
  accessory?: DuitAccessory;
  className?: string;
  title?: string;
};

const INK = "var(--color-ink)";
const GOLD = "var(--color-gold)";
const PAPER = "var(--color-paper)";
const LIME = "var(--color-lime)";
const PINK = "var(--color-pink)";
const DOWN = "var(--color-down)";

/* ------------------------------------------------------------------ */
/*  Faces                                                              */
/* ------------------------------------------------------------------ */

function Eyes({ mood }: { mood: DuitMood }) {
  if (mood === "cry" || mood === "chill") {
    const d = mood === "cry" ? "M74 120 Q92 106 110 120" : "M74 116 Q92 132 110 116";
    return (
      <g fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round">
        <path d={d} />
        <path d="M130 116 Q148 132 166 116" />
        {mood === "cry" ? (
          <>
            <path d="M84 128 q-7 16 0 24 q7 -8 0 -24" fill={PAPER} strokeWidth="4" />
            <path d="M156 128 q-7 16 0 24 q7 -8 0 -24" fill={PAPER} strokeWidth="4" />
          </>
        ) : null}
      </g>
    );
  }

  if (mood === "love") {
    return (
      <g stroke={INK} strokeWidth="5" strokeLinejoin="round">
        <path
          d="M92 108 c-4 -7 -14 -8 -16 0 c-2 8 8 14 16 20 c8 -6 18 -12 16 -20 c-2 -8 -12 -7 -16 0 z"
          fill={PINK}
        />
        <path
          d="M148 108 c-4 -7 -14 -8 -16 0 c-2 8 8 14 16 20 c8 -6 18 -12 16 -20 c-2 -8 -12 -7 -16 0 z"
          fill={PINK}
        />
      </g>
    );
  }

  const eyeR = mood === "panic" ? 19 : mood === "shock" ? 20 : 17;
  const pupilR = mood === "panic" ? 5 : mood === "shock" ? 6 : 7.5;
  const pupilDx = mood === "smug" ? 4 : 0;
  const pupilDy = mood === "smug" ? 4 : 2;

  return (
    <g>
      <circle cx="94" cy="118" r={eyeR} fill={PAPER} stroke={INK} strokeWidth="6" />
      <circle cx="146" cy="118" r={eyeR} fill={PAPER} stroke={INK} strokeWidth="6" />
      <circle cx={94 + pupilDx} cy={118 + pupilDy} r={pupilR} fill={INK} />
      <circle cx={146 + pupilDx} cy={118 + pupilDy} r={pupilR} fill={INK} />
      {mood === "shock" || mood === "panic" ? (
        <g>
          <circle cx="99" cy="112" r="2.4" fill={PAPER} opacity="0.9" />
          <circle cx="151" cy="112" r="2.4" fill={PAPER} opacity="0.9" />
        </g>
      ) : null}
    </g>
  );
}

function Brows({ mood }: { mood: DuitMood }) {
  const common = { fill: "none", stroke: INK, strokeWidth: 7, strokeLinecap: "round" as const };
  switch (mood) {
    case "smug":
      return (
        <g {...common}>
          <path d="M72 92 L112 90" />
          <path d="M128 82 L168 88" />
        </g>
      );
    case "happy":
    case "love":
      return (
        <g {...common}>
          <path d="M74 92 Q94 78 114 92" />
          <path d="M126 92 Q146 78 166 92" />
        </g>
      );
    case "panic":
      return (
        <g {...common}>
          <path d="M70 78 L110 86" />
          <path d="M130 86 L170 78" />
        </g>
      );
    case "cry":
      return (
        <g {...common}>
          <path d="M72 96 L112 84" />
          <path d="M128 84 L168 96" />
        </g>
      );
    case "shock":
      return (
        <g {...common}>
          <path d="M72 74 L112 72" />
          <path d="M128 72 L168 74" />
        </g>
      );
    case "chill":
      return (
        <g {...common}>
          <path d="M74 94 L112 94" />
          <path d="M128 94 L166 94" />
        </g>
      );
    case "laser":
      return (
        <g {...common}>
          <path d="M72 88 L112 100" />
          <path d="M128 100 L168 88" />
        </g>
      );
    default:
      return null;
  }
}

function Mouth({ mood }: { mood: DuitMood }) {
  switch (mood) {
    case "smug":
      return (
        <path d="M100 150 Q124 172 150 142" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      );
    case "happy":
    case "love":
      return (
        <g stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M94 144 Q120 186 146 144 Z" fill={INK} />
          <path d="M112 164 Q120 176 128 164" fill={PINK} strokeWidth="4" />
        </g>
      );
    case "panic":
      return (
        <g>
          <ellipse cx="120" cy="158" rx="13" ry="17" fill={INK} />
          <ellipse cx="120" cy="163" rx="7" ry="8" fill={PINK} />
        </g>
      );
    case "cry":
      return (
        <path d="M104 164 Q120 146 136 164" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      );
    case "shock":
      return (
        <g stroke={INK} strokeWidth="5">
          <ellipse cx="120" cy="156" rx="15" ry="19" fill={INK} />
          <ellipse cx="120" cy="160" rx="8" ry="10" fill={PAPER} />
        </g>
      );
    case "chill":
      return (
        <path d="M106 152 Q120 164 134 152" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      );
    case "laser":
      return (
        <path d="M100 158 L140 158" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Accessories                                                        */
/* ------------------------------------------------------------------ */

function AccessoryBack({ accessory }: { accessory: DuitAccessory }) {
  if (accessory === "parachute") {
    return (
      <g stroke={INK} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 62 Q120 2 208 62 Q170 40 120 44 Q70 40 32 62 Z" fill={PINK} />
        <path d="M68 47 Q120 28 172 47" fill="none" stroke={PAPER} strokeWidth="5" />
        <path d="M44 56 L84 116" fill="none" strokeWidth="4" />
        <path d="M196 56 L156 116" fill="none" strokeWidth="4" />
      </g>
    );
  }
  if (accessory === "rocket") {
    return (
      <g transform="translate(172 94) rotate(24)">
        <g stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M0 -72 q26 26 26 66 v30 h-52 v-30 q0 -40 26 -66 z" fill={PAPER} />
          <path d="M-26 8 l-22 32 h22 z" fill={PINK} />
          <path d="M26 8 l22 32 h-22 z" fill={PINK} />
          <circle cx="0" cy="-30" r="13" fill={LIME} />
          <path d="M0 32 q9 20 0 34 q-9 -16 0 -34 z" fill={GOLD} />
        </g>
      </g>
    );
  }
  return null;
}

function AccessoryFront({ accessory }: { accessory: DuitAccessory }) {
  switch (accessory) {
    case "sunglasses":
      return (
        <g stroke={INK} strokeWidth="5" strokeLinejoin="round">
          <path d="M56 96 h128" fill="none" strokeWidth="8" strokeLinecap="round" opacity="0.001" />
          <rect x="62" y="102" width="52" height="34" rx="10" fill={INK} />
          <rect x="126" y="102" width="52" height="34" rx="10" fill={INK} />
          <path d="M114 116 h12" strokeWidth="7" />
          <path d="M62 112 l-12 -6 M178 112 l12 -6" strokeWidth="6" strokeLinecap="round" />
          <path d="M72 110 l18 18" stroke={PAPER} strokeWidth="4" opacity="0.85" />
          <path d="M136 110 l18 18" stroke={PAPER} strokeWidth="4" opacity="0.85" />
        </g>
      );
    case "crown":
      return (
        <g transform="rotate(-6 120 54)" stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M70 62 L70 26 L92 44 L120 12 L148 44 L170 26 L170 62 Z" fill={GOLD} />
          <path d="M70 62 H170" strokeWidth="8" strokeLinecap="round" />
          <circle cx="120" cy="52" r="6" fill={PINK} strokeWidth="4" />
          <circle cx="88" cy="52" r="4.5" fill={LIME} strokeWidth="4" />
          <circle cx="152" cy="52" r="4.5" fill={LIME} strokeWidth="4" />
        </g>
      );
    case "diamond":
      return (
        <g transform="rotate(10 186 62)" stroke={INK} strokeWidth="5" strokeLinejoin="round">
          <path d="M186 30 L214 56 L186 96 L158 56 Z" fill={LIME} />
          <path d="M158 56 H214 M186 30 L172 56 L186 96 L200 56 Z" fill="none" strokeWidth="4" />
        </g>
      );
    case "coffee":
      return (
        <g stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M54 168 h58 v26 q0 18 -18 18 h-22 q-18 0 -18 -18 z" fill={PAPER} />
          <path d="M112 176 q18 0 18 12 t-18 12" fill="none" />
          <path d="M62 156 h42" strokeWidth="7" />
          <path d="M70 146 q-6 -10 2 -16 M92 146 q-6 -10 2 -16" fill="none" strokeWidth="4" />
        </g>
      );
    case "shield":
      return (
        <g stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M120 158 l40 15 v24 q0 24 -40 34 q-40 -10 -40 -34 v-24 z" fill={LIME} />
          <path d="M102 197 l13 13 l25 -27" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "chain":
      return (
        <g stroke={INK} strokeWidth="5" strokeLinecap="round">
          <path d="M62 176 Q120 216 178 176" fill="none" strokeWidth="16" />
          <path d="M62 176 Q120 216 178 176" fill="none" stroke={GOLD} strokeWidth="10" />
          <circle cx="120" cy="208" r="15" fill={GOLD} />
          <circle cx="120" cy="208" r="6" fill="none" strokeWidth="4" />
        </g>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Mascot                                                             */
/* ------------------------------------------------------------------ */

export function DuitMascot({ mood = "smug", accessory = "none", className, title }: MascotProps) {
  const showCheeks = mood === "smug" || mood === "happy" || mood === "love" || mood === "chill";

  return (
    <svg
      viewBox="0 0 240 240"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("h-auto w-full overflow-visible", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <AccessoryBack accessory={accessory} />

      {/* coin body */}
      <circle cx="120" cy="128" r="88" fill={GOLD} stroke={INK} strokeWidth="9" />
      <circle
        cx="120"
        cy="128"
        r="73"
        fill="none"
        stroke={INK}
        strokeWidth="4"
        strokeDasharray="2 11"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M48 95 A 79 79 0 0 1 100 52"
        fill="none"
        stroke={PAPER}
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.42"
      />

      {/* laser beams behind the eyes */}
      {mood === "laser" ? (
        <g fill={DOWN} opacity="0.9">
          <polygon points="94,118 14,84 14,152" />
          <polygon points="146,118 226,84 226,152" />
          <polygon points="94,118 14,110 14,126" fill={PAPER} opacity="0.55" />
          <polygon points="146,118 226,110 226,126" fill={PAPER} opacity="0.55" />
        </g>
      ) : null}

      {showCheeks ? (
        <g fill={PINK} opacity="0.55">
          <ellipse cx="72" cy="146" rx="10" ry="7" />
          <ellipse cx="168" cy="146" rx="10" ry="7" />
        </g>
      ) : null}

      <Eyes mood={mood} />
      <Brows mood={mood} />
      <Mouth mood={mood} />

      {/* sweat / stress marks */}
      {mood === "panic" ? (
        <g fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round">
          <path d="M52 84 q-8 16 0 24 q8 -8 0 -24" />
          <path d="M190 74 q-7 14 0 21 q7 -7 0 -21" />
        </g>
      ) : null}

      {/* sparkles */}
      <g fill={PAPER} opacity="0.95">
        <path d="M204 34 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 l12 -4 z" />
        <path d="M28 138 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 z" opacity="0.8" />
      </g>

      <AccessoryFront accessory={accessory} />
    </svg>
  );
}
