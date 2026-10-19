import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format numbers the Indonesian way: 24.812 / 1.000.000.000 */
export function formatId(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

/** Short display helper: 12.4M, 3.8M, 892K */
export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** 0xabc… — truncate wallet / contract strings. */
export function truncateMiddle(value: string, head = 6, tail = 6) {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}
