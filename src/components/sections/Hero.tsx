"use client";

import { motion } from "motion/react";
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

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Soft neutral base with just a hint of green */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8f9fb_0%,#eef1f1_100%)]" />
      {/* Faint grid texture */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      {/* structura-style vertical hairlines across the hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto flex max-w-7xl justify-between px-4 sm:px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-px bg-[linear-gradient(180deg,transparent,rgba(20,22,42,0.06)_12%,rgba(20,22,42,0.06)_88%,transparent)]"
          />
        ))}
      </div>
      {/* Soft glows (subtle) */}
      <div className="absolute -left-20 top-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/[0.07] blur-[130px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[24rem] w-[24rem] rounded-full bg-accent-3/[0.06] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-36 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-44">
        <div>
          <motion.span
            {...wipeLine(0, 0.55)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Adaptive AI Wellness Companions
          </motion.span>

          <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.3rem]">
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

          <motion.p {...wipeLine(1.0)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Where neuroscience, behavioral science, and emotional intelligence meet adaptive AI, turning awareness into
            measurable, life-changing outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.18, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href={hero.ctaPrimary.href} icon="arrow">
              {hero.ctaPrimary.label}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </Button>
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
    </section>
  );
}
