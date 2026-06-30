"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const items = testimonials.items;
  const reduce = useReducedMotion();
  const [[idx, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length],
  );

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => go(1), 5200);
    return () => clearInterval(timer);
  }, [go, reduce, idx]);

  const t = TINTS[idx % TINTS.length];
  const item = items[idx];

  const variants = {
    enter: (d: number) => ({ x: d >= 0 ? 90 : -90, opacity: 0, filter: "blur(10px)", scale: 0.95 }),
    center: { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: (d: number) => ({ x: d >= 0 ? -90 : 90, opacity: 0, filter: "blur(10px)", scale: 0.95 }),
  };

  return (
    <section id="insights" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          subtitle="What partners, clinicians, and people experience with Cheers Wisdom."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative grid min-h-[19rem] place-items-stretch">
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.figure
                key={idx}
                custom={dir}
                variants={reduce ? undefined : variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease }}
                className="glass relative col-start-1 row-start-1 flex flex-col items-center overflow-hidden p-10 text-center sm:p-12"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                <Quote className="h-10 w-10" style={{ color: t.text }} />
                <blockquote className="mt-6 text-xl font-semibold leading-relaxed text-ink-soft sm:text-2xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-sm font-black text-white"
                    style={{ background: t.tile, boxShadow: `0 12px 26px -14px ${t.glow}` }}
                  >
                    {item.initials}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-bold">{item.name}</span>
                    <span className="block text-xs text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/70 backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i >= idx ? 1 : -1])}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 24 : 8, background: i === idx ? t.bar : "rgba(20,22,42,0.18)" }}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/70 backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
