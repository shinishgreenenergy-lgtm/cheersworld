"use client";

import { motion } from "motion/react";
import { hero } from "@/lib/content";
import { Button } from "../ui/Button";
import { RotatingText } from "../ui/RotatingText";
import { BrainVisual } from "../ui/BrainVisual";

const ease = [0.22, 1, 0.36, 1] as const;

// structura "anima fade-left": fade in while sliding from the left
function fadeLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -42 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.85, delay, ease },
  };
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Light greenish-grey base */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f1f6f1_0%,#e4ede5_100%)]" />
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
      {/* Soft warm glows */}
      <div className="absolute -left-20 top-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/12 blur-[130px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[24rem] w-[24rem] rounded-full bg-accent-2/14 blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-36 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pt-44">
        <div>
          <motion.span
            {...fadeLeft(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Adaptive AI Wellness Companions
          </motion.span>

          <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.3rem]">
            <motion.span {...fadeLeft(0.12)} className="block">
              {hero.titleTop}
            </motion.span>
            <motion.span {...fadeLeft(0.26)} className="block pb-[0.14em]">
              <span className="accent-pulse font-serif font-medium italic">{hero.titleAccent}</span>
            </motion.span>
          </h1>

          <motion.p
            {...fadeLeft(0.42)}
            className="mt-6 flex flex-wrap items-center gap-x-2 text-xl font-extrabold text-ink-soft"
          >
            <span>Adaptive AI for</span>
            <RotatingText words={["recovery", "resilience", "clarity", "safety", "balance"]} className="font-display text-gradient-animated" />
          </motion.p>

          <motion.p {...fadeLeft(0.52)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {hero.body}
          </motion.p>

          <motion.p {...fadeLeft(0.6)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Where neuroscience, behavioral science, and emotional intelligence meet adaptive AI, turning awareness into
            measurable, life-changing outcomes.
          </motion.p>

          <motion.div {...fadeLeft(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
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
