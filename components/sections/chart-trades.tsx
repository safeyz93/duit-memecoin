"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Flame, KeyRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, truncateMiddle } from "@/lib/utils";
import { createSeededRandom } from "@/lib/market-series";

type Side = "buy" | "sell";

type Trade = {
  id: number;
  side: Side;
  wallet: string;
  sol: number;
  time: string;
};

/** 12:04:18 — the demo feed starts at a fixed clock so SSR and hydration match. */
const BASE_SECONDS = 12 * 3600 + 4 * 60 + 18;
const ROW_LIMIT = 7;
const FIRST_GENERATED_ID = 1000;

const WALLETS = [
  "Du1tKq7xN4vR2pLm8sWc5Tb9Yh3Gf6Jd",
  "7xKQp2mNvT4rLb9sWc5Tb8Yh3Gf1JdZq",
  "3FmRtY6uHjK9sLpQ2wE5rT8yU1iO4aS7d",
  "9pLmK3vBnC7xZ2wQ5rT8yU1iO4aS6dF3g",
  "5tRvB8nMqW2eR6yU9iO3aA7dF1gH4jK8l",
  "2kLpO9iU8yT7rE6wQ5aS4dF3gH2jK1lZ",
  "8mNbV7cX6zL5kJ4hG3fD2sA1pO9iU8yT",
] as const;

function pad2(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/** `12:04:18` from a seconds-of-day value (wraps around midnight). */
function formatSeconds(totalSeconds: number): string {
  const bounded = ((totalSeconds % 86_400) + 86_400) % 86_400;
  const hours = Math.floor(bounded / 3600);
  const minutes = Math.floor((bounded % 3600) / 60);
  const seconds = bounded % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

/** Deterministic first render — no Math.random, no clock reads. */
const INITIAL_TRADES: Trade[] = [
  { id: 1, side: "buy", wallet: WALLETS[0], sol: 2.41, time: formatSeconds(BASE_SECONDS) },
  { id: 2, side: "sell", wallet: WALLETS[1], sol: 0.87, time: formatSeconds(BASE_SECONDS - 26) },
  { id: 3, side: "buy", wallet: WALLETS[2], sol: 5.2, time: formatSeconds(BASE_SECONDS - 41) },
  { id: 4, side: "buy", wallet: WALLETS[3], sol: 1.06, time: formatSeconds(BASE_SECONDS - 63) },
  { id: 5, side: "sell", wallet: WALLETS[4], sol: 3.75, time: formatSeconds(BASE_SECONDS - 82) },
  { id: 6, side: "buy", wallet: WALLETS[5], sol: 0.42, time: formatSeconds(BASE_SECONDS - 97) },
  { id: 7, side: "sell", wallet: WALLETS[6], sol: 12.8, time: formatSeconds(BASE_SECONDS - 113) },
];

const SAFETY = [
  { label: "LP dibakar 100%", Icon: Flame },
  { label: "Mint authority revoked", Icon: KeyRound },
  { label: "Tax beli & jual 0%", Icon: Check },
] as const;

/** Static depth ladder — purely decorative, labelled SIM. */
const ORDER_BOOK = {
  asks: [
    { price: "0.000427", sol: 18.4, depth: 62 },
    { price: "0.000424", sol: 9.2, depth: 38 },
    { price: "0.000422", sol: 4.6, depth: 22 },
  ],
  bids: [
    { price: "0.000418", sol: 12.7, depth: 55 },
    { price: "0.000415", sol: 22.1, depth: 78 },
    { price: "0.000411", sol: 6.3, depth: 28 },
  ],
} as const;

/**
 * Live-trades side panel. First paint is a fixed list, then a seeded PRNG
 * pushes a new trade every 4s from inside an effect — never during render.
 */
export function LiveTrades() {
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);

  useEffect(() => {
    const rand = createSeededRandom(0xd017);
    // Warm the stream up so the first generated trade doesn't mirror the seed.
    for (let index = 0; index < 24; index += 1) rand();

    let sequence = 0;
    const timer = window.setInterval(() => {
      sequence += 1;
      const side: Side = rand() > 0.4 ? "buy" : "sell";
      const wallet = WALLETS[Math.floor(rand() * WALLETS.length)];
      const sol = Math.round((0.08 + rand() * 8.5) * 100) / 100;
      const seconds = BASE_SECONDS + sequence * 4 + Math.floor(rand() * 3);
      const nextTrade: Trade = {
        id: FIRST_GENERATED_ID + sequence,
        side,
        wallet,
        sol,
        time: formatSeconds(seconds),
      };
      setTrades((current) => [nextTrade, ...current].slice(0, ROW_LIMIT));
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Card tone="void" className="flex h-full min-w-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-paper/15 px-3.5 py-3 sm:px-4">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-2.5 animate-blink bg-up motion-reduce:animate-none" />
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">Live trades</h3>
        </div>
        <span className="border-2 border-paper/40 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-paper/60">
          Sim
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 px-3.5 pb-1 pt-2.5 font-mono text-[8px] uppercase tracking-[0.18em] text-muted sm:px-4">
        <span>Wallet</span>
        <span>SOL · Waktu</span>
      </div>

      <ul className="divide-y-2 divide-paper/10 border-t-2 border-paper/10">
        {trades.map((trade) => {
          const buy = trade.side === "buy";
          const generated = trade.id >= FIRST_GENERATED_ID;
          return (
            <li
              key={trade.id}
              className={cn(
                "flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4",
                generated ? "animate-pop motion-reduce:animate-none" : undefined,
              )}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-0.5 border-2 px-1 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-ink",
                    buy ? "border-up bg-up" : "border-down bg-down",
                  )}
                >
                  {buy ? (
                    <ArrowUpRight className="size-2.5" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="size-2.5" aria-hidden="true" />
                  )}
                  {buy ? "Buy" : "Sell"}
                </span>
                <span className="truncate font-mono text-[10px] text-paper/70 sm:text-[11px]">
                  {truncateMiddle(trade.wallet, 4, 4)}
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end font-mono leading-tight">
                <span className="text-[10px] font-bold text-paper sm:text-[11px]">{trade.sol.toFixed(2)} SOL</span>
                <span className="text-[8px] text-paper/55">{trade.time}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-t-[3px] border-paper/15 px-3.5 py-3 sm:px-4">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
          <span className="text-muted">Buku order</span>
          <span className="text-paper/50">Sim</span>
        </div>
        <ul className="mt-1.5 space-y-[3px]">
          {[...ORDER_BOOK.asks, ...ORDER_BOOK.bids].map((row, index) => {
            const ask = index < ORDER_BOOK.asks.length;
            return (
              <li
                key={`${ask ? "ask" : "bid"}-${row.price}`}
                className="relative flex items-center justify-between overflow-hidden border border-paper/10 px-1.5 py-[2px] font-mono text-[9px] leading-none"
              >
                <span
                  aria-hidden="true"
                  className={cn("absolute inset-y-0 right-0", ask ? "bg-down/20" : "bg-up/20")}
                  style={{ width: `${row.depth}%` }}
                />
                <span className={cn("relative font-bold", ask ? "text-down" : "text-up")}>{row.price}</span>
                <span className="relative text-paper/60">{row.sol.toFixed(1)} SOL</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto border-t-[3px] border-paper/15 px-3.5 py-3.5 sm:px-4">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
          <span className="text-muted">Tekanan 24j</span>
          <span className="text-paper">62% / 38%</span>
        </div>
        <div className="mt-1.5 flex h-3 w-full overflow-hidden border-2 border-paper/30">
          <span className="bg-lime" style={{ width: "62%" }} />
          <span className="bg-pink" style={{ width: "38%" }} />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-paper/60">
          <span>buy 62%</span>
          <span>sell 38%</span>
        </div>
      </div>

      <ul className="space-y-1.5 border-t-[3px] border-paper/15 px-3.5 py-3.5 sm:px-4">
        {SAFETY.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-paper/70 sm:text-[10px]"
          >
            <span className="inline-flex size-4 shrink-0 items-center justify-center border-2 border-lime bg-lime text-ink">
              <item.Icon className="size-2.5" aria-hidden="true" />
            </span>
            {item.label}
          </li>
        ))}
      </ul>

      <p className="border-t-[3px] border-paper/15 px-3.5 py-2.5 font-mono text-[9px] leading-relaxed text-muted sm:px-4">
        Transaksi simulasi. Bukan data on-chain — jangan dipakai buat analisa, ser.
      </p>
    </Card>
  );
}
