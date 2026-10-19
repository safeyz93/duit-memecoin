"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { MEMES, memeNote, type MemeFilterId } from "@/lib/meme-data";
import { demoNote } from "@/lib/site";
import { FilterBar } from "./filter-bar";
import { Lightbox } from "./lightbox";
import { VaultCard } from "./vault-card";

type LikeEntry = { count: number; liked: boolean };

function buildLikeState(): Record<string, LikeEntry> {
  const state: Record<string, LikeEntry> = {};
  for (const meme of MEMES) {
    state[meme.id] = { count: meme.likes, liked: false };
  }
  return state;
}

/**
 * Otak galeri: filter aktif, state like, dan meme yang sedang dibuka di
 * lightbox. Semua state lokal — tidak ada penyimpanan, tidak ada backend.
 */
export function VaultExplorer() {
  const [filter, setFilter] = useState<MemeFilterId>("Semua");
  const [likes, setLikes] = useState<Record<string, LikeEntry>>(buildLikeState);
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isAll = filter === "Semua";
  const visible = useMemo(
    () => (isAll ? MEMES : MEMES.filter((meme) => meme.tags.includes(filter))),
    [filter, isAll],
  );

  const openMeme = useCallback((id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenId(id);
  }, []);

  const closeLightbox = useCallback(() => {
    setOpenId(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenId((current) => {
        if (!current) return current;
        const currentIndex = visible.findIndex((meme) => meme.id === current);
        if (currentIndex < 0) return current;
        const nextIndex = (currentIndex + direction + visible.length) % visible.length;
        return visible[nextIndex].id;
      });
    },
    [visible],
  );

  const handlePrev = useCallback(() => step(-1), [step]);
  const handleNext = useCallback(() => step(1), [step]);

  const toggleLike = useCallback((id: string) => {
    setLikes((current) => {
      const entry = current[id];
      if (!entry) return current;
      return {
        ...current,
        [id]: { count: entry.count + (entry.liked ? -1 : 1), liked: !entry.liked },
      };
    });
  }, []);

  const activeMeme = openId ? visible.find((meme) => meme.id === openId) : undefined;
  const activeIndex = activeMeme ? visible.findIndex((meme) => meme.id === activeMeme.id) : -1;

  return (
    <div>
      <FilterBar active={filter} shown={visible.length} onChange={setFilter} />

      {visible.length === 0 ? (
        <p className="mt-6 border-[3px] border-dashed border-ink/40 px-5 py-10 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-ink">
          Vault kosong. Coba filter lain, ser.
        </p>
      ) : (
        <div
          key={filter}
          className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
        >
          {visible.map((meme, index) => {
            const like = likes[meme.id];
            return (
              <VaultCard
                key={meme.id}
                meme={meme}
                index={index}
                emphasis={isAll ? (meme.featured ? (index === 0 ? "hero" : "wide") : "normal") : "normal"}
                liked={like.liked}
                likeCount={like.count}
                onOpen={openMeme}
                onToggleLike={toggleLike}
              />
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-muted-ink sm:flex-row sm:items-start sm:justify-between sm:text-[10px]">
        <p className="max-w-2xl">{memeNote}</p>
        <p className="shrink-0">
          <span className="text-ink">{visible.length}</span> / {MEMES.length} meme
        </p>
      </div>

      <p className="mt-3 border-t-[3px] border-ink/15 pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted-ink sm:text-[10px]">
        {demoNote}
      </p>

      {activeMeme ? (
        <Lightbox
          meme={activeMeme}
          index={activeIndex}
          total={visible.length}
          liked={likes[activeMeme.id].liked}
          likeCount={likes[activeMeme.id].count}
          onClose={closeLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
          onToggleLike={() => toggleLike(activeMeme.id)}
        />
      ) : null}
    </div>
  );
}
