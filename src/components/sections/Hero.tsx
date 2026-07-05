"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/lib/content";
import { Button } from "../ui/Button";
import { RotatingText } from "../ui/RotatingText";
import { BrainVisual } from "../ui/BrainVisual";
import { PhilosophyLoop } from "../ui/PhilosophyLoop";

const ease = [0.22, 1, 0.36, 1] as const;

// Reveal a line by wiping it open left -> right (clip-path). Negative top/right/
// bottom insets keep descenders and the "Consciousness" glow from being clipped.
function wipeLine(delay = 0, duration = 0.72) {
  return {
    initial: { clipPath: "inset(-12% 100% -12% 0%)" },
    animate: { clipPath: "inset(-12% -12% -12% 0%)" },
    transition: { duration, delay, ease },
  };
}

// Slow-drifting coloured mesh blobs (the multi-dimension palette, kept light).
const BLOBS = [
  { c: "#14b8a6", className: "left-[6%] top-[12%] h-72 w-72", x: [0, 26, 0], y: [0, -18, 0], d: 17 },
  { c: "#3b82f6", className: "right-[8%] top-[6%] h-80 w-80", x: [0, -22, 0], y: [0, 24, 0], d: 21 },
  { c: "#f59e0b", className: "left-[34%] bottom-[6%] h-72 w-72", x: [0, 30, 0], y: [0, 14, 0], d: 19 },
  { c: "#8b5cf6", className: "right-[28%] bottom-[10%] h-64 w-64", x: [0, -18, 0], y: [0, -22, 0], d: 23 },
];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Soft neutral base */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f9fafb_0%,#eef1f1_100%)]" />

      {/* Drifting multicolour mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[120px] ${b.className}`}
            style={{ background: b.c, opacity: 0.1 }}
            animate={reduce ? {} : { x: b.x, y: b.y }}
            transition={reduce ? {} : { duration: b.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Faint grid texture */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      {/* vertical hairlines */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto flex max-w-7xl justify-between px-4 sm:px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-px bg-[linear-gradient(180deg,transparent,rgba(20,22,42,0.05)_12%,rgba(20,22,42,0.05)_88%,transparent)]"
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-36 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-44">
        <div>
          <motion.span
            {...wipeLine(0, 0.55)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,5.4vw,4.3rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            <motion.span {...wipeLine(0.18)} className="block w-fit">
              {hero.titleTop}
            </motion.span>
            <motion.span {...wipeLine(0.4)} className="text-gradient block w-fit pb-[0.12em]">
              {hero.titleAccent}
            </motion.span>
          </h1>

          <motion.p {...wipeLine(0.66)} className="mt-6 flex w-fit flex-wrap items-center gap-x-2 text-xl font-extrabold text-ink-soft">
            <span>One platform for</span>
            <RotatingText words={hero.rotating} className="font-display text-gradient-animated" />
          </motion.p>

          <motion.p {...wipeLine(0.84)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href={hero.ctaPrimary.href} icon="arrow">
              {hero.ctaPrimary.label}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
            className="mt-11 border-t border-line/70 pt-7"
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">How the platform thinks</p>
            <PhilosophyLoop />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <BrainVisual />
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-line p-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      )}
    </section>
  );
}
