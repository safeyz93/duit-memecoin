"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { truncateMiddle } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@/components/site/icons";

/** Legacy fallback for browsers/contexts where the Clipboard API is blocked. */
function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  textarea.remove();
  return ok;
}

/**
 * Contract address pill with copy feedback. Copying is a client-only concern,
 * so this stays a tiny client component inside the server-rendered hero.
 */
export function ContractBox({ compactLabel = false }: { compactLabel?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(site.contract);
      ok = true;
    } catch {
      ok = fallbackCopy(site.contract);
    }
    setCopied(ok);
    if (timer.current) clearTimeout(timer.current);
    if (ok) timer.current = setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <div className="inline-flex w-full max-w-full items-stretch border-[3px] border-paper/30 bg-void/60">
      <div className="flex min-w-0 flex-col justify-center gap-1 px-3 py-2 sm:px-4">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-lime">
          {compactLabel ? "CA" : "CA Resmi"} <span className="text-paper/40">/ ilustratif</span>
        </span>
        <span
          className="truncate font-mono text-[11px] font-medium tracking-wide text-paper sm:text-xs"
          title={site.contract}
        >
          {truncateMiddle(site.contract, 10, 8)}
        </span>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Contract address tersalin" : "Salin contract address"}
        className="flex shrink-0 items-center gap-2 border-l-[3px] border-paper/30 bg-lime px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-ink transition-colors hover:bg-paper focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime sm:px-4"
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
        <span className="hidden sm:inline">{copied ? "Tersalin" : "Salin"}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Alamat kontrak disalin ke clipboard" : ""}
      </span>
    </div>
  );
}
