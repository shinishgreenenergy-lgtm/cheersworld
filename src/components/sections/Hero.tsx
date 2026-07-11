"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";
import { hero } from "@/lib/content";
import { HeroOrb } from "../ui/HeroOrb";

const ease = [0.22, 1, 0.36, 1] as const;

// Hollow outlined letters — transparent fill, ink stroke that scales with the type.
const HOLLOW = {
  color: "transparent",
  WebkitTextStroke: "0.02em #14162a",
} as const;

function fade(delay = 0, y = 18) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  };
}

export function Hero() {
  const reduce = useReducedMotion();
  const dots = hero.domains.slice(0, 5);

  return (
    <section id="top" className="relative px-3 pb-10 pt-20 sm:px-5 sm:pt-24 lg:pb-16">
      {/* the floating card */}
      <div className="relative mx-auto flex min-h-[34rem] max-w-[86rem] flex-col overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(180deg,#ffffff_0%,#f2f4f4_58%,#eceff0_100%)] px-5 pb-8 pt-16 shadow-[0_50px_120px_-40px_rgba(20,22,42,0.35)] sm:rounded-[2.5rem] sm:px-10 sm:pt-20 lg:min-h-[42rem] lg:px-14 lg:pb-12">
        {/* ambient wavy texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-noise opacity-[0.5] mix-blend-multiply" />
          <div className="absolute -bottom-24 left-[6%] h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute -bottom-20 right-[8%] h-80 w-80 rounded-full bg-accent-2/15 blur-[120px]" />
        </div>

        {/* giant wordmark — hollow outlined letters, brain standing in for the "O" */}
        <motion.h1
          {...fade(0.05, 24)}
          className="relative z-10 text-center font-display font-black tracking-[-0.03em]"
        >
          <span className="block text-[clamp(2.9rem,12vw,9rem)] leading-[0.92]" style={HOLLOW}>
            CHEERS
          </span>
          <span className="flex items-center justify-center text-[clamp(2.9rem,12vw,9rem)] leading-[0.95]">
            <span style={HOLLOW}>WISD</span>
            <span className="relative mx-[0.03em] inline-block aspect-square w-[0.96em] shrink-0 -translate-y-[0.02em] align-middle">
              <HeroOrb compact />
            </span>
            <span style={HOLLOW}>M</span>
            <span className="text-accent">.</span>
          </span>
        </motion.h1>

        {/* top meta row: stat (left) · numbered features (right) */}
        <div className="relative z-20 mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-start sm:justify-between">
          <motion.div {...fade(0.22)} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {dots.map((d) => (
                <span
                  key={d.name}
                  className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                  style={{ background: d.color }}
                />
              ))}
            </div>
            <div className="leading-tight">
              <span className="font-display text-2xl font-black tracking-tight text-ink">
                {hero.stat.value}
              </span>
              <p className="max-w-[13rem] text-[12px] text-muted">{hero.stat.label}</p>
            </div>
          </motion.div>

          <motion.ul {...fade(0.3)} className="flex flex-col gap-1.5 sm:items-end sm:text-right">
            {hero.features.map((f) => (
              <li key={f.n} className="flex items-center gap-2 text-[14px] font-semibold text-ink-soft">
                <span className="text-ink-soft">{f.label}</span>
                <span className="tabular-nums text-muted/70">/{f.n}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* pushes the bottom row down */}
        <div className="hidden flex-1 lg:block" />

        {/* bottom meta row: tagline (left) · "How it works?" circle (right) */}
        <div className="relative z-20 mt-10 flex flex-col items-start gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between lg:mt-0">
          <motion.div {...fade(0.38)} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-ink-soft">{hero.tagline}</p>
            <div className="mt-3 border-t border-dotted border-ink/25" />
          </motion.div>

          <motion.div {...fade(0.46)}>
            <Link
              href={hero.howItWorks.href}
              className="group grid h-28 w-28 place-items-center rounded-full bg-accent-2 text-center transition-transform duration-300 hover:scale-105 sm:h-32 sm:w-32"
            >
              <span className="flex flex-col items-center gap-1 text-[13px] font-bold text-ink">
                <Play className="h-4 w-4 fill-current" />
                {hero.howItWorks.label}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="pointer-events-none mt-6 hidden flex-col items-center gap-2 lg:flex"
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
