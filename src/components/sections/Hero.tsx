"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Rocket, ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

// Each ribbon morphs between two open top-curves (identical command structure). The
// closed area below is filled and a bright crest line rides the surface — warm silk.
const TAIL = " L1440,660 L0,660 Z";
const RIBBONS = [
  { from: "M0,290 C260,350 520,230 780,290 C1040,350 1260,240 1440,290", to: "M0,310 C260,240 520,370 780,290 C1040,230 1260,360 1440,290", fillOp: 0.2, crestOp: 0, blur: 8, dur: 17 },
  { from: "M0,340 C240,255 520,452 760,340 C1000,252 1240,452 1440,340", to: "M0,322 C240,440 520,256 760,340 C1000,450 1240,264 1440,332", fillOp: 0.28, crestOp: 0.32, blur: 5, dur: 15 },
  { from: "M0,388 C260,292 520,486 760,388 C1000,292 1240,486 1440,388", to: "M0,372 C260,470 520,294 760,388 C1000,478 1240,302 1440,380", fillOp: 0.36, crestOp: 0.48, blur: 3, dur: 13 },
  { from: "M0,438 C300,352 560,520 820,438 C1080,352 1262,512 1440,438", to: "M0,422 C300,512 560,360 820,438 C1080,522 1262,368 1440,438", fillOp: 0.44, crestOp: 0.6, blur: 2, dur: 11 },
  { from: "M0,486 C280,410 540,566 800,486 C1060,406 1290,556 1440,486", to: "M0,472 C280,558 540,410 800,486 C1060,566 1290,418 1440,480", fillOp: 0.52, crestOp: 0.7, blur: 1, dur: 10 },
  { from: "M0,532 C320,486 560,602 820,532 C1080,470 1300,596 1440,532", to: "M0,522 C320,600 560,482 820,532 C1080,604 1300,486 1440,528", fillOp: 0.6, crestOp: 0.8, blur: 0, dur: 9 },
  { from: "M0,574 C300,542 560,626 820,574 C1080,526 1300,620 1440,574", to: "M0,566 C300,624 560,530 820,574 C1080,626 1300,534 1440,568", fillOp: 0.66, crestOp: 0.85, blur: 0, dur: 8 },
];

function Waves() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1440 660"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[74%] w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="silkFill" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#ff6a24" />
          <stop offset="0.5" stopColor="#ff934a" />
          <stop offset="1" stopColor="#ffc985" />
        </linearGradient>
        <linearGradient id="silkCrest" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe8c6" />
          <stop offset="0.5" stopColor="#ffb066" />
          <stop offset="1" stopColor="#ff7e3a" />
        </linearGradient>
      </defs>
      {RIBBONS.map((r, i) => (
        <g key={i}>
          <motion.path
            d={r.from + TAIL}
            fill="url(#silkFill)"
            opacity={r.fillOp}
            style={{ filter: `blur(${r.blur}px)` }}
            animate={reduce ? {} : { d: [r.from + TAIL, r.to + TAIL, r.from + TAIL] }}
            transition={reduce ? {} : { duration: r.dur, repeat: Infinity, ease: "easeInOut" }}
          />
          {r.crestOp > 0 && (
            <motion.path
              d={r.from}
              fill="none"
              stroke="url(#silkCrest)"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={r.crestOp}
              style={{ filter: "blur(0.6px)" }}
              animate={reduce ? {} : { d: [r.from, r.to, r.from] }}
              transition={reduce ? {} : { duration: r.dur, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </g>
      ))}
      {/* bright waterline reflection near the base */}
      <rect x="0" y="558" width="1440" height="4" fill="url(#silkCrest)" opacity="0.55" style={{ filter: "blur(2px)" }} />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-32 text-center sm:pt-40"
    >
      {/* warm gradient base */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, #fdf5ec 34%, #fbe6d4 60%, #f7cfa8 82%, #f2b585 100%)",
        }}
      />
      {/* drifting warm glow */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[38%] -z-10 h-[46rem] w-[70rem] max-w-[120%] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,150,80,0.5), transparent)" }}
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={reduce ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* flowing silk waves */}
      <Waves />
      {/* glossy reflection strip along the base */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,190,140,0.5))]"
      />

      {/* headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-4xl font-display text-[clamp(2.6rem,6.2vw,5rem)] font-semibold leading-[1.02] tracking-tight text-ink"
      >
        <span className="font-serif italic">Intelligence</span> That
        <br />
        Flows With You
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease }}
        className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft/80"
      >
        One platform that observes, understands and predicts human behaviour — as smooth and
        adaptive as the world around you.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.24, ease }}
        className="mt-9 flex flex-wrap items-center justify-center gap-5"
      >
        <Link
          href={hero.ctaPrimary.href}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_34px_-12px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Rocket className="h-4 w-4" />
          {hero.ctaPrimary.label}
        </Link>
        <Link
          href={hero.ctaSecondary.href}
          className="inline-flex items-center gap-1 text-[15px] font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          {hero.ctaSecondary.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>

    </section>
  );
}
