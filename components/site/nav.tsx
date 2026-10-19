"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, CoinMark, MenuIcon, UpTriangle } from "@/components/site/icons";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* honesty strip */}
      <div className="border-b-[3px] border-ink bg-lime">
        <div className="mx-auto flex h-7 max-w-[1280px] items-center justify-between gap-4 px-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink sm:px-8 sm:text-[10px]">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="block size-1.5 animate-blink bg-ink motion-reduce:animate-none" />
            Demo konsep — bukan produk keuangan
          </span>
          <span className="hidden sm:block">Semua data ilustratif · bukan nasihat investasi</span>
        </div>
      </div>

      <div
        className={cn(
          "border-b-[3px] bg-void/95 transition-[border-color,box-shadow] duration-200",
          scrolled ? "border-paper/40 shadow-[0_5px_0_0_var(--color-lime)]" : "border-paper/20",
        )}
      >
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8">
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-2.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-lime"
            aria-label="DUIT — ke atas halaman"
          >
            <CoinMark className="size-9 transition-transform duration-200 group-hover:-rotate-12 sm:size-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[26px] uppercase leading-none tracking-wide text-paper sm:text-[30px]">
                {site.name}
              </span>
              <span className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-lime sm:text-[9px]">
                Receh jadi gede
              </span>
            </span>
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-[2px] border-transparent px-2.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-paper/70 transition-colors hover:border-paper/30 hover:text-lime focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 border-[3px] border-paper/25 px-3 py-1.5 md:flex">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper/50">$DUIT</span>
              <span className="font-mono text-[11px] font-bold text-paper">$0.000420</span>
              <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-up">
                <UpTriangle className="size-2.5" />
                18,4%
              </span>
            </div>
            <ButtonLink href="#cara-beli" tone="lime" size="sm" className="hidden sm:inline-flex">
              Beli $DUIT
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="inline-flex size-11 items-center justify-center border-[3px] border-paper/40 text-paper transition-colors hover:border-lime hover:text-lime focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime lg:hidden"
            >
              {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>

        {/* mobile / tablet panel */}
        <div
          id="menu-mobile"
          className={cn(
            "overflow-hidden border-t-[3px] border-paper/20 bg-void transition-[max-height,opacity] duration-200 lg:hidden",
            open ? "max-h-[520px] opacity-100" : "max-h-0 border-t-0 opacity-0",
          )}
        >
          <nav aria-label="Navigasi mobile" className="mx-auto flex max-w-[1280px] flex-col px-4 py-2 sm:px-8">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b-[2px] border-paper/10 py-3 font-display text-2xl uppercase tracking-wide text-paper transition-colors hover:text-lime focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                {item.label}
                <span aria-hidden="true" className="font-mono text-xs text-lime">
                  ↘
                </span>
              </a>
            ))}
            <div className="flex flex-col gap-2 py-4">
              <ButtonLink href="#cara-beli" tone="lime" size="md" onClick={() => setOpen(false)}>
                Beli $DUIT
              </ButtonLink>
              <ButtonLink href="#galeri" tone="paper" size="md" onClick={() => setOpen(false)}>
                Lihat Galeri Meme
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
