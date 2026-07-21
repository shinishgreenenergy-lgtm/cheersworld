"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { gallery } from "@/lib/content";

const ALL = "All";

export function Gallery() {
  const [filter, setFilter] = useState(ALL);
  const [idx, setIdx] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Only offer categories that actually have photos.
  const categories = useMemo(
    () => [ALL, ...gallery.categories.filter((c) => gallery.items.some((i) => i.category === c))],
    [],
  );
  const items = useMemo(
    () => (filter === ALL ? gallery.items : gallery.items.filter((i) => i.category === filter)),
    [filter],
  );

  const open = idx !== null;
  const active = idx !== null ? items[idx] : null;
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  // Lightbox keyboard navigation + scroll lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="flex min-h-[70svh] flex-col justify-center scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* editorial header */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{gallery.eyebrow}</span>
          <span className="block h-px w-10 bg-accent" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
            {gallery.title}
          </h2>
          <p className="max-w-md text-[14.5px] leading-relaxed text-muted lg:pb-1.5">{gallery.subtitle}</p>
        </div>

        {gallery.items.length > 0 ? (
          <Reveal className="mt-9">
            {/* filter rail */}
            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const on = filter === c;
                  const count = c === ALL ? gallery.items.length : gallery.items.filter((i) => i.category === c).length;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setFilter(c);
                        setIdx(null);
                      }}
                      aria-pressed={on}
                      className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
                        on
                          ? "border-accent/50 bg-accent text-white"
                          : "border-line bg-white/60 text-ink-soft hover:border-accent/40"
                      }`}
                    >
                      {c}
                      <span className={`ml-1 font-mono text-[10px] ${on ? "text-white/70" : "opacity-60"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
              <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
              <span className="hidden font-mono text-[11px] font-semibold tabular-nums text-muted/70 sm:block">
                {String(items.length).padStart(2, "0")} moments
              </span>
            </div>

            {/* mosaic wall — natural heights, column flow */}
            <motion.div
              key={filter}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4"
            >
              {items.map((it, i) => (
                <button
                  key={it.src}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Enlarge: ${it.caption}`}
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white/50 text-left sm:mb-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.caption}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(10,12,20,0.72))] opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                    <span className="min-w-0">
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">{it.category}</span>
                      <span className="mt-0.5 line-clamp-2 text-[12px] font-semibold leading-snug text-white">{it.caption}</span>
                    </span>
                    <Expand className="mb-0.5 h-3.5 w-3.5 shrink-0 text-white/70 transition-transform group-hover:scale-110" />
                  </span>
                </button>
              ))}
            </motion.div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.categories.slice(0, 4).map((c) => (
              <div key={c} className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-line bg-white/40 text-center">
                <div>
                  <Camera className="mx-auto h-7 w-7 text-muted/50" strokeWidth={1.5} />
                  <p className="mt-3 text-[13px] font-bold text-muted">{c}</p>
                  <span className="mt-1.5 inline-block rounded-full border border-dashed border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* lightbox — navigate the whole filtered set without leaving it */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#0a0d12]/95 backdrop-blur-sm"
            onClick={close}
          >
            {/* top bar */}
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-2">{active.category}</span>
              <span aria-hidden className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[11px] tabular-nums text-white/50">
                {(idx ?? 0) + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pb-2 sm:px-20">
              <AnimatePresence mode="wait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={active.src}
                  src={active.src}
                  alt={active.caption}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.22 }}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white sm:left-6"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white sm:right-6"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* caption */}
            <p className="mx-auto max-w-3xl px-6 pb-7 pt-4 text-center text-[13.5px] font-medium leading-relaxed text-white/85" onClick={(e) => e.stopPropagation()}>
              {active.caption}
            </p>

            {/* preload neighbours for instant stepping */}
            {items.length > 1 && idx !== null && (
              <div className="hidden" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={items[(idx + 1) % items.length].src} alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={items[(idx - 1 + items.length) % items.length].src} alt="" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
