import { market } from "@/lib/site";

/**
 * DUITMETER demo market series.
 *
 * Every price, candle and volume here is fake and generated with a seeded
 * PRNG (mulberry32) — no `Math.random()` at render or module time, so the
 * server markup and the client hydration always agree on every candle.
 * Series are generated once per range and cached.
 */

export type RangeKey = "1J" | "24J" | "7H" | "30H";

export type Candle = {
  /** Candle open time, epoch milliseconds (UTC). */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  /** Illustrative volume in USD for this candle. */
  volume: number;
};

export type Series = {
  range: RangeKey;
  /** Oldest candle first. */
  candles: Candle[];
  /** Highest high across the range. */
  high: number;
  /** Lowest low across the range. */
  low: number;
  /** First candle open. */
  open: number;
  /** Last candle close — always exactly `market.priceUsd`. */
  close: number;
  /** Change from first open to last close, e.g. 18.4. */
  changePct: number;
  /** Total illustrative volume for the range, in USD. */
  volume: number;
};

export type RangeMeta = {
  key: RangeKey;
  /** Tab label. Indonesian: J = jam (hour), H = hari (day). */
  label: string;
  ariaLabel: string;
  /** Length of one candle, shown in the toolbar. */
  candleLabel: string;
  candleCount: number;
  /** Milliseconds between two candle opens. */
  stepMs: number;
};

export const RANGES: readonly RangeMeta[] = [
  { key: "1J", label: "1J", ariaLabel: "1 jam terakhir", candleLabel: "3 MNT", candleCount: 20, stepMs: 3 * 60_000 },
  { key: "24J", label: "24J", ariaLabel: "24 jam terakhir", candleLabel: "1 JAM", candleCount: 24, stepMs: 60 * 60_000 },
  { key: "7H", label: "7H", ariaLabel: "7 hari terakhir", candleLabel: "6 JAM", candleCount: 28, stepMs: 6 * 60 * 60_000 },
  {
    key: "30H",
    label: "30H",
    ariaLabel: "30 hari terakhir",
    candleLabel: "1 HARI",
    candleCount: 30,
    stepMs: 24 * 60 * 60_000,
  },
] as const;

/** Fixed "now" for the demo data: 13:04:18 WIB, 19 Oct 2026. */
export const SERIES_UPDATED_AT = Date.UTC(2026, 9, 19, 6, 4, 18);

const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_NAMES = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"] as const;
const MONTH_NAMES = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MEI",
  "JUN",
  "JUL",
  "AGU",
  "SEP",
  "OKT",
  "NOV",
  "DES",
] as const;

function pad2(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/** Fixed WIB (UTC+7) wall clock — never depend on the viewer's time zone. */
function wibDate(ms: number): Date {
  return new Date(ms + WIB_OFFSET_MS);
}

/** Seeded PRNG (mulberry32). Same seed → same stream on server and client. */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

const RANGE_SEEDS: Record<RangeKey, number> = {
  "1J": 0x1a2b3c,
  "24J": 0x2b3c4d,
  "7H": 0x3c4d5e,
  "30H": 0x4d5e6f,
};

/**
 * Where each range starts. The 24J start mirrors `market.change24h` exactly,
 * so the chart and the +18,4% badge can never disagree.
 */
const RANGE_START: Record<RangeKey, number> = {
  "1J": market.priceUsd / 1.0125,
  "24J": market.priceUsd / (1 + market.change24h / 100),
  "7H": market.priceUsd / 1.49,
  "30H": market.priceUsd / 2.105,
};

/** Per-candle noise amplitude — longer windows move harder, degen style. */
const RANGE_VOLATILITY: Record<RangeKey, number> = {
  "1J": 0.006,
  "24J": 0.034,
  "7H": 0.05,
  "30H": 0.075,
};

/** Illustrative USD volume per range, derived from the 24h volume fact. */
const RANGE_VOLUME: Record<RangeKey, number> = {
  "1J": market.volume24h / 24,
  "24J": market.volume24h,
  "7H": market.volume24h * 7,
  "30H": market.volume24h * 30,
};

const seriesCache = new Map<RangeKey, Series>();

function buildSeries(range: RangeKey): Series {
  const meta = RANGES.find((entry) => entry.key === range);
  if (!meta) throw new Error(`Unknown DUITMETER range: ${range}`);

  const rand = createSeededRandom(RANGE_SEEDS[range]);
  const count = meta.candleCount;
  const start = RANGE_START[range];
  const end = market.priceUsd;
  const volatility = RANGE_VOLATILITY[range];
  const logStart = Math.log(start);
  const logEnd = Math.log(end);

  // Random-walk "bridge": pinned to the start and end anchors, so the last
  // close is always exactly market.priceUsd while the path still pulls back.
  const walk: number[] = [0];
  for (let index = 1; index <= count; index += 1) {
    walk.push(walk[index - 1] + (rand() * 2 - 1) * volatility);
  }
  const bridgeEnd = walk[count];

  const candles: Candle[] = [];
  const rawVolumes: number[] = [];
  let previousClose = start;
  let high = start;
  let low = start;
  let rawVolumeTotal = 0;
  const lastOpen = SERIES_UPDATED_AT - meta.stepMs;

  for (let index = 0; index < count; index += 1) {
    const progress = (index + 1) / count;
    const bridge = walk[index + 1] - progress * bridgeEnd;
    const close = Math.exp(logStart + progress * (logEnd - logStart) + bridge);
    const open = previousClose;
    const bodyTop = Math.max(open, close);
    const bodyBottom = Math.min(open, close);
    const wick = (0.12 + rand() * 0.75) * volatility;
    const candleHigh = bodyTop * (1 + wick * (0.5 + rand() * 0.8));
    const candleLow = bodyBottom * (1 - wick * (0.5 + rand() * 0.8));
    const volumeWeight = 0.35 + rand() * 1.3;

    candles.push({
      time: lastOpen - (count - 1 - index) * meta.stepMs,
      open,
      high: candleHigh,
      low: candleLow,
      close,
      volume: 0,
    });

    rawVolumes.push(volumeWeight);
    rawVolumeTotal += volumeWeight;
    high = Math.max(high, candleHigh);
    low = Math.min(low, candleLow);
    previousClose = close;
  }

  const targetVolume = RANGE_VOLUME[range];
  for (let index = 0; index < count; index += 1) {
    candles[index].volume = (rawVolumes[index] / rawVolumeTotal) * targetVolume;
  }

  const open = candles[0].open;
  const close = candles[count - 1].close;

  return {
    range,
    candles,
    high,
    low,
    open,
    close,
    changePct: (close / open - 1) * 100,
    volume: targetVolume,
  };
}

/** Deterministic OHLC series for one range. Cached, safe to call during render. */
export function getSeries(range: RangeKey): Series {
  const cached = seriesCache.get(range);
  if (cached) return cached;
  const built = buildSeries(range);
  seriesCache.set(range, built);
  return built;
}

/** `0.000420` — micro-cap prices always need six decimals. */
export function formatPrice(value: number): string {
  return value.toFixed(6);
}

/** `+18,4%` / `-4,2%` — Indonesian decimal comma. */
export function formatPct(value: number): string {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${Math.abs(value).toFixed(1).replace(".", ",")}%`;
}

/** `13:04:18 WIB` for the data timestamp. */
export function formatClockWib(ms: number): string {
  const date = wibDate(ms);
  return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}:${pad2(date.getUTCSeconds())} WIB`;
}

/** `13:04` — short clock used by the x axis and the tooltip. */
export function formatShortClockWib(ms: number): string {
  const date = wibDate(ms);
  return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
}

/** Compact x-axis labels, tuned per range. */
export function formatAxisTime(range: RangeKey, ms: number): string {
  const date = wibDate(ms);
  if (range === "7H") return `${DAY_NAMES[date.getUTCDay()]} ${pad2(date.getUTCDate())}`;
  if (range === "30H") return `${pad2(date.getUTCDate())} ${MONTH_NAMES[date.getUTCMonth()]}`;
  return formatShortClockWib(ms);
}

/** `SEN, 13 OKT · 12:04 WIB` — tooltip header. */
export function formatTooltipTime(range: RangeKey, ms: number): string {
  const date = wibDate(ms);
  const day = DAY_NAMES[date.getUTCDay()];
  const dateLabel = `${pad2(date.getUTCDate())} ${MONTH_NAMES[date.getUTCMonth()]}`;
  if (range === "1J" || range === "24J" || range === "7H") {
    return `${day}, ${dateLabel} · ${formatShortClockWib(ms)} WIB`;
  }
  return `${day}, ${dateLabel}`;
}
