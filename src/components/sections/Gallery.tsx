"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { gallery } from "@/lib/content";

const ALL = "All";

export function Gallery() {
  const [filter, setFilter] = useState(ALL);
  const [idx, setIdx] = useState(0);
  const [full, setFull] = useState(false);
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  // Only offer categories that actually have photos.
  const categories = useMemo(
    () => [ALL, ...gallery.categories.filter((c) => gallery.items.some((i) => i.category === c))],
    [],
  );
  const items = useMemo(
    () => (filter === ALL ? gallery.items : gallery.items.filter((i) => i.category === filter)),
    [filter],
  );
  const active = items[Math.min(idx, items.length - 1)];

  const step = useCallback(
    (d: number) => setIdx((i) => (i + d + items.length) % items.length),
    [items.length],
  );

  // Keep the active thumbnail centred as the exhibition advances. Scroll the
  // rail itself — scrollIntoView would also scroll the page to the gallery,
  // including on initial load.
  useEffect(() => {
    const rail = railRef.current;
    const thumb = rail?.children[idx] as HTMLElement | undefined;
    if (!rail || !thumb) return;
    rail.scrollTo({
      left: thumb.offsetLeft - (rail.clientWidth - thumb.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [idx, reduce]);

  // Fullscreen: keyboard navigation + scroll lock.
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [full, step]);

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
                      setIdx(0);
                    }}
                    aria-pressed={on}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
                      on ? "border-accent/50 bg-accent text-white" : "border-line bg-white/60 text-ink-soft hover:border-accent/40"
                    }`}
                  >
                    {c}
                    <span className={`ml-1 font-mono text-[10px] ${on ? "text-white/70" : "opacity-60"}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* the stage */}
            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-line bg-ink shadow-[0_50px_100px_-50px_rgba(20,22,42,0.6)]">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/8.5]">
                <AnimatePresence mode="wait">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    key={active.src}
                    src={active.src}
                    alt={active.caption}
                    initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* counter + expand */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[11px] tabular-nums text-white/90 backdrop-blur-sm">
                    {idx + 1} / {items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFull(true)}
                    aria-label="View fullscreen"
                    className="grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-accent"
                  >
                    <Expand className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* caption plate */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(6,8,12,0.85))]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-accent-2">{active.category}</p>
                    <p className="mt-1 max-w-2xl text-[13.5px] font-semibold leading-snug text-white sm:text-[15px]">{active.caption}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-white/85 backdrop-blur-sm transition-colors hover:bg-accent"
                    >
                      <ArrowLeft className="h-4.5 w-4.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-white/85 backdrop-blur-sm transition-colors hover:bg-accent"
                    >
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* thumbnail rail */}
            <div
              ref={railRef}
              className="mt-4 flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((it, i) => {
                const on = i === idx;
                return (
                  <button
                    key={it.src}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={it.caption}
                    aria-current={on}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:h-[4.5rem] sm:w-28 ${
                      on ? "border-accent ring-2 ring-accent/40" : "border-line opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
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

      {/* fullscreen viewer */}
      <AnimatePresence>
        {full && active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#0a0d12]/95 backdrop-blur-sm"
            onClick={() => setFull(false)}
          >
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-2">{active.category}</span>
              <span aria-hidden className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[11px] tabular-nums text-white/50">
                {idx + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setFull(false)}
                aria-label="Close fullscreen"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

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

            <p className="mx-auto max-w-3xl px-6 pb-7 pt-4 text-center text-[13.5px] font-medium leading-relaxed text-white/85" onClick={(e) => e.stopPropagation()}>
              {active.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
