"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { useRef, useState } from "react";
import { cn, formatCompact } from "@/lib/utils";
import {
  RANGES,
  formatAxisTime,
  formatPct,
  formatPrice,
  formatTooltipTime,
  getSeries,
  type Candle,
  type RangeKey,
} from "@/lib/market-series";

const PLOT_HEIGHT = "h-[300px] sm:h-[340px] lg:h-[380px]";
const Y_TICKS = 5;
const X_TICKS = 5;

const TAB_BASE =
  "inline-flex min-w-11 items-center justify-center border-[3px] border-ink px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-[transform,background-color,color,box-shadow] duration-75 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none sm:min-w-12 sm:text-xs";

/**
 * DUITMETER chart canvas: range tabs + inline SVG candles + pointer/keyboard
 * crosshair with an OHLC tooltip. Client-only because it owns state; this is
 * the smallest component that can hold it.
 */
export function ChartCanvas() {
  const [range, setRange] = useState<RangeKey>("24J");
  const [hovered, setHovered] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement | null>(null);

  const series = getSeries(range);
  const meta = RANGES.find((entry) => entry.key === range) ?? RANGES[0];
  const count = series.candles.length;

  const span = series.high - series.low || series.close * 0.02;
  const yMin = series.low - span * 0.08;
  const yMax = series.high + span * 0.08;

  // Round viewBox coordinates so server and client serialise identical markup.
  const roundCoord = (value: number) => Math.round(value * 1000) / 1000;
  const yPct = (price: number) => roundCoord(((yMax - price) / (yMax - yMin)) * 100);
  const xPct = (index: number) => roundCoord(((index + 0.5) / count) * 100);
  const slot = 100 / count;
  const bodyWidth = slot * 0.58;
  const currentY = Math.min(96, Math.max(4, yPct(series.close)));

  const activeIndex = hovered !== null && hovered >= 0 && hovered < count ? hovered : null;
  const active: Candle | null = activeIndex === null ? null : series.candles[activeIndex];
  const activeUp = active ? active.close >= active.open : true;
  const activeChange = active ? ((active.close - active.open) / active.open) * 100 : 0;

  const volumeMax = series.candles.reduce((max, candle) => Math.max(max, candle.volume), 1);

  // Where the floating price tag sits — axis labels too close get hidden so
  // the tag never collides with a tick label.
  const tagY = Math.min(96, Math.max(4, active !== null ? yPct(active.close) : currentY));

  const yTicks = Array.from({ length: Y_TICKS }, (_, index) => {
    const pct = (index / (Y_TICKS - 1)) * 100;
    return { pct, price: yMax - (pct / 100) * (yMax - yMin) };
  });

  const xTickIndexes = Array.from({ length: X_TICKS }, (_, index) =>
    Math.round((index / (X_TICKS - 1)) * (count - 1)),
  ).filter((value, index, list) => list.indexOf(value) === index);

  function hoverFromClientX(clientX: number) {
    const element = plotRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = (clientX - rect.left) / rect.width;
    const index = Math.min(count - 1, Math.max(0, Math.floor(ratio * count)));
    setHovered(index);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    hoverFromClientX(event.clientX);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    hoverFromClientX(event.clientX);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setHovered((current) => (current === null ? count - 1 : Math.max(0, current - 1)));
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setHovered((current) => (current === null ? 0 : Math.min(count - 1, current + 1)));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setHovered(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setHovered(count - 1);
      return;
    }
    if (event.key === "Escape") {
      setHovered(null);
    }
  }

  return (
    <div>
      {/* Toolbar: range tabs + legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-ink bg-paper px-3 py-2.5 sm:px-4">
        <div role="group" aria-label="Rentang waktu grafik" className="flex items-center gap-1.5 sm:gap-2">
          {RANGES.map((entry) => {
            const selected = entry.key === range;
            return (
              <button
                key={entry.key}
                type="button"
                aria-pressed={selected}
                aria-label={`Rentang ${entry.ariaLabel}`}
                onClick={() => {
                  setRange(entry.key);
                  setHovered(null);
                }}
                className={cn(
                  TAB_BASE,
                  selected
                    ? "bg-lime text-ink shadow-hard-sm"
                    : "bg-paper text-ink/60 hover:bg-ink hover:text-paper",
                )}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-ink sm:gap-3 sm:text-[10px]">
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true" className="inline-block size-2.5 border-2 border-ink bg-lime" />
            naik
          </span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true" className="inline-block size-2.5 border-2 border-ink bg-pink" />
            turun
          </span>
          <span className="hidden items-center gap-1 border-l-2 border-ink/15 pl-2.5 sm:inline-flex">
            CANDLE {meta.candleLabel}
          </span>
        </div>
      </div>

      {/* Plot: candles + axis */}
      <div className="relative px-3 pb-1 pt-4 sm:px-4">
        <div className="flex gap-1">
          <div className="min-w-0 flex-1">
            <div
              ref={plotRef}
              role="group"
              tabIndex={0}
              aria-label={`Grafik candlestick $DUIT rentang ${meta.ariaLabel}. Tekan panah kiri dan kanan untuk menjelajah candle, Escape untuk menutup tooltip.`}
              aria-keyshortcuts="ArrowLeft ArrowRight Home End Escape"
              aria-roledescription="grafik harga interaktif"
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerDown}
              onPointerLeave={() => setHovered(null)}
              onPointerCancel={() => setHovered(null)}
              onKeyDown={handleKeyDown}
              onFocus={() => setHovered((current) => current ?? count - 1)}
              onBlur={() => setHovered(null)}
              className={cn(
                "relative w-full cursor-crosshair touch-pan-y bg-paper focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ink",
                PLOT_HEIGHT,
              )}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
                className="absolute inset-0 block h-full w-full"
              >
                {/* Horizontal price grid */}
                {yTicks.map((tick, index) => (
                  <line
                    key={`grid-h-${tick.pct}`}
                    x1="0"
                    x2="100"
                    y1={tick.pct}
                    y2={tick.pct}
                    stroke="var(--color-ink)"
                    strokeOpacity={index === yTicks.length - 1 ? 0.3 : 0.14}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {/* Vertical time grid */}
                {xTickIndexes.map((index) => (
                  <line
                    key={`grid-v-${index}`}
                    x1={xPct(index)}
                    x2={xPct(index)}
                    y1="0"
                    y2="100"
                    stroke="var(--color-ink)"
                    strokeOpacity={0.1}
                    strokeWidth={1}
                    strokeDasharray="2 4"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {/* Dashed current price line */}
                <line
                  x1="0"
                  x2="100"
                  y1={yPct(series.close)}
                  y2={yPct(series.close)}
                  stroke="var(--color-ink)"
                  strokeOpacity={0.6}
                  strokeWidth={2}
                  strokeDasharray="6 5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Candles */}
                {series.candles.map((candle, index) => {
                  const up = candle.close >= candle.open;
                  const openY = yPct(candle.open);
                  const closeY = yPct(candle.close);
                  const rawBody = Math.abs(closeY - openY);
                  const bodyHeight = Math.max(rawBody, 0.7);
                  const bodyTop = Math.min(openY, closeY) - (bodyHeight - rawBody) / 2;
                  const center = xPct(index);
                  return (
                    <g key={candle.time}>
                      <line
                        x1={center}
                        x2={center}
                        y1={yPct(candle.high)}
                        y2={yPct(candle.low)}
                        stroke="var(--color-ink)"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <rect
                        x={center - bodyWidth / 2}
                        y={bodyTop}
                        width={bodyWidth}
                        height={bodyHeight}
                        fill={up ? "var(--color-lime)" : "var(--color-pink)"}
                        stroke="var(--color-ink)"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Hovered candle band + crosshair */}
              {active !== null && activeIndex !== null ? (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 bg-ink/5"
                    style={{ left: `${xPct(activeIndex) - slot / 2}%`, width: `${slot}%` }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 border-l-2 border-dashed border-ink/40"
                    style={{ left: `${xPct(activeIndex)}%` }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-ink/40"
                    style={{ top: `${yPct(active.close)}%` }}
                  />
                  {/* OHLC tooltip */}
                  <div
                    className="pointer-events-none absolute top-2 z-20 w-44 border-[3px] border-ink bg-paper px-2.5 py-2 font-mono shadow-hard-sm"
                    style={{
                      left: `clamp(0px, calc(${xPct(activeIndex)}% - 88px), calc(100% - 176px))`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 border-b-2 border-ink/15 pb-1 text-[9px] font-bold uppercase tracking-[0.06em] text-muted-ink">
                      <span>{formatTooltipTime(range, active.time)}</span>
                      <span className="inline-flex items-center gap-1 text-ink">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "inline-block size-2 border-2 border-ink",
                            activeUp ? "bg-lime" : "bg-pink",
                          )}
                        />
                        {formatPct(activeChange)}
                      </span>
                    </div>
                    <dl className="mt-1 grid grid-cols-2 gap-x-2 text-[10px] leading-snug text-ink">
                      <div className="flex items-center justify-between gap-1">
                        <dt className="text-muted-ink">O</dt>
                        <dd>{formatPrice(active.open)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <dt className="text-muted-ink">H</dt>
                        <dd>{formatPrice(active.high)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <dt className="text-muted-ink">L</dt>
                        <dd>{formatPrice(active.low)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <dt className="text-muted-ink">C</dt>
                        <dd className="font-bold">{formatPrice(active.close)}</dd>
                      </div>
                    </dl>
                    <div className="mt-1 flex items-center justify-between border-t-2 border-ink/15 pt-1 text-[9px] uppercase tracking-[0.08em] text-muted-ink">
                      <span>VOL</span>
                      <span className="font-bold text-ink">${formatCompact(active.volume)}</span>
                    </div>
                  </div>
                </>
              ) : null}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 left-2 font-mono text-[8px] uppercase tracking-[0.24em] text-ink/25"
              >
                DUITMETER · SIM
              </span>
            </div>

            {/* Volume strip */}
            <div className="relative mt-2 h-10 border-t-2 border-dashed border-ink/25 sm:h-12">
              <span
                aria-hidden="true"
                className="absolute -top-[9px] left-0 bg-paper px-1 font-mono text-[8px] uppercase leading-none tracking-[0.2em] text-muted-ink"
              >
                VOL
              </span>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
                className="absolute inset-0 block h-full w-full"
              >
                {series.candles.map((candle, index) => {
                  const up = candle.close >= candle.open;
                  const height = Math.max((candle.volume / volumeMax) * 100, 2);
                  return (
                    <rect
                      key={`vol-${candle.time}`}
                      x={xPct(index) - bodyWidth / 2}
                      y={100 - height}
                      width={bodyWidth}
                      height={height}
                      fill={up ? "var(--color-lime)" : "var(--color-pink)"}
                      fillOpacity={0.55}
                    />
                  );
                })}
              </svg>
              {activeIndex !== null ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 border-l-2 border-dashed border-ink/40"
                  style={{ left: `${xPct(activeIndex)}%` }}
                />
              ) : null}
            </div>

            {/* Time axis */}
            <div className="relative mt-1.5 h-4 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-ink sm:text-[10px]">
              {xTickIndexes.map((index) => {
                const first = index === 0;
                const last = index === count - 1;
                return (
                  <span
                    key={`x-label-${index}`}
                    className="absolute top-0 whitespace-nowrap"
                    style={{
                      left: `${xPct(index)}%`,
                      transform: `translateX(${first ? "0%" : last ? "-100%" : "-50%"})`,
                    }}
                  >
                    {formatAxisTime(range, series.candles[index].time)}
                  </span>
                );
              })}
            </div>

            <p className="mt-2 hidden text-right font-mono text-[8px] uppercase tracking-[0.18em] text-muted-ink sm:block">
              Hover atau ← → buat lihat OHLC
            </p>
          </div>

          {/* Price axis */}
          <div
            aria-hidden="true"
            className={cn(
              "relative w-12 shrink-0 font-mono text-[9px] leading-none text-muted-ink sm:w-16 sm:text-[10px]",
              PLOT_HEIGHT,
            )}
          >
            {yTicks.map((tick, index) => {
              if (Math.abs(tick.pct - tagY) < 7) return null;
              return (
                <span
                  key={`y-label-${tick.pct}`}
                  className="absolute right-0.5 whitespace-nowrap"
                  style={{
                    top: `${tick.pct}%`,
                    transform: `translateY(${index === 0 ? "0%" : index === yTicks.length - 1 ? "-100%" : "-50%"})`,
                  }}
                >
                  {formatPrice(tick.price)}
                </span>
              );
            })}
            {active !== null ? (
              <span
                className="absolute right-0 -translate-y-1/2 whitespace-nowrap border-2 border-ink bg-paper px-1 py-0.5 text-[8px] font-bold text-ink shadow-hard-sm sm:text-[10px]"
                style={{ top: `${tagY}%` }}
              >
                {formatPrice(active.close)}
              </span>
            ) : (
              <span
                className="absolute right-0 -translate-y-1/2 whitespace-nowrap border-2 border-ink bg-lime px-1 py-0.5 text-[8px] font-bold text-ink shadow-hard-sm sm:text-[10px]"
                style={{ top: `${tagY}%` }}
              >
                {formatPrice(series.close)}
              </span>
            )}
          </div>
        </div>

        {/* Screen-reader summary + live candle readout */}
        <p aria-live="polite" className="sr-only">
          {active !== null
            ? `${formatTooltipTime(range, active.time)}. Buka ${formatPrice(active.open)}, tertinggi ${formatPrice(active.high)}, terendah ${formatPrice(active.low)}, tutup ${formatPrice(active.close)}, volume ${formatCompact(active.volume)} dolar.`
            : `Grafik harga $DUIT rentang ${meta.ariaLabel}. Harga awal ${formatPrice(series.open)}, tertinggi ${formatPrice(series.high)}, terendah ${formatPrice(series.low)}, harga terakhir ${formatPrice(series.close)}, perubahan ${formatPct(series.changePct)}. Semua data simulasi.`}
        </p>
      </div>

      {/* Range summary footer */}
      <div className="grid grid-cols-3 divide-x-[3px] divide-ink border-t-[3px] border-ink bg-paper">
        <div className="px-3 py-2.5 sm:px-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-ink">RENDAH</p>
          <p className="mt-0.5 font-mono text-[11px] font-bold text-ink sm:text-sm">{formatPrice(series.low)}</p>
        </div>
        <div className="px-3 py-2.5 sm:px-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-ink">TINGGI</p>
          <p className="mt-0.5 font-mono text-[11px] font-bold text-ink sm:text-sm">{formatPrice(series.high)}</p>
        </div>
        <div className="px-3 py-2.5 sm:px-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-ink">PERUBAHAN</p>
          <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink sm:text-sm">
            <span
              aria-hidden="true"
              className={cn(
                "inline-block size-2.5 border-2 border-ink",
                series.changePct >= 0 ? "bg-lime" : "bg-pink",
              )}
            />
            {formatPct(series.changePct)}
          </p>
        </div>
      </div>
    </div>
  );
}
