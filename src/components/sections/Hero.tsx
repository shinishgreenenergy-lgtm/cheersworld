"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { hero } from "@/lib/content";
import { Button } from "../ui/Button";
import { RotatingText } from "../ui/RotatingText";
import { BrainVisual } from "../ui/BrainVisual";

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

// "Consciousness" as handwriting: a cursive word that writes itself on left -> right
// (clip-path) on a continuous loop, with a blinking pen caret at the tip.
function WritingWord({ text }: { text: string }) {
  return (
    <span className="relative inline-block font-script text-[1.15em] font-bold leading-[1.15]">
      <motion.span
        className="text-gradient inline-block"
        initial={{ clipPath: "inset(-18% 100% -24% -4%)" }}
        animate={{
          clipPath: [
            "inset(-18% 100% -24% -4%)", // unwritten
            "inset(-18% -7% -24% -4%)", // fully written
            "inset(-18% -7% -24% -4%)", // hold
            "inset(-18% 100% -24% -4%)", // erased
          ],
        }}
        transition={{
          duration: 6.5,
          times: [0, 0.34, 0.82, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.3,
          delay: 0.5,
        }}
      >
        {text}
        <span className="caret-blink ml-[0.04em] inline-block h-[0.6em] w-[2.5px] translate-y-[0.05em] rounded-full bg-accent align-baseline" />
      </motion.span>
    </span>
  );
}

// Animated count-up figure (rolls 0 -> value on mount).
function Stat({ value, suffix, label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    const t = setTimeout(() => setN(value), delay);
    return () => clearTimeout(t);
  }, [value, delay, reduce]);
  return (
    <div>
      <div className="flex items-baseline">
        <NumberFlow value={n} className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-[2.1rem]" />
        {suffix && <span className="font-display text-2xl font-extrabold text-accent">{suffix}</span>}
      </div>
      <div className="mt-1 text-[12.5px] font-medium leading-tight text-muted">{label}</div>
    </div>
  );
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
            Adaptive AI Wellness Companions
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,5.4vw,4.3rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            <motion.span {...wipeLine(0.18)} className="block w-fit">
              {hero.titleTop}
            </motion.span>
            <span className="block w-fit pb-[0.2em]">
              <WritingWord text={hero.titleAccent} />
            </span>
          </h1>

          <motion.p
            {...wipeLine(0.66)}
            className="mt-6 flex w-fit flex-wrap items-center gap-x-2 text-xl font-extrabold text-ink-soft"
          >
            <span>Adaptive AI for</span>
            <RotatingText words={["recovery", "resilience", "clarity", "safety", "balance"]} className="font-display text-gradient-animated" />
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

          {/* Animated count-up stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
            className="mt-11 flex max-w-lg items-center gap-8 border-t border-line/70 pt-7"
          >
            <Stat value={5} label="Wellness dimensions" delay={1300} />
            <span className="h-9 w-px bg-line" />
            <Stat value={3} label="Sciences unified" delay={1450} />
            <span className="h-9 w-px bg-line" />
            <Stat value={100} suffix="%" label="Adaptive & personal" delay={1600} />
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
