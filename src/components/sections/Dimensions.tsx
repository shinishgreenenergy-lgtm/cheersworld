"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { dimensions, dimensionsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

// Deterministic bubble specs (no Math.random → stable SSR/CSR).
const BUBBLES = [
  { x: "22%", delay: 0.0, dur: 4.4, size: 7 },
  { x: "54%", delay: 1.3, dur: 5.2, size: 4 },
  { x: "72%", delay: 0.7, dur: 3.7, size: 9 },
  { x: "38%", delay: 2.1, dur: 4.9, size: 5 },
  { x: "84%", delay: 1.7, dur: 4.2, size: 6 },
];

const FIELDS = [
  { key: "why", label: "Why it matters" },
  { key: "assessment", label: "How the AI assesses it" },
  { key: "intervention", label: "How the platform intervenes" },
] as const;

// Animated liquid that fills the lower part of a glass card.
function Water({ color, active, reduce }: { color: string; active: boolean; reduce: boolean | null }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      animate={{ height: active ? "74%" : "40%" }}
      transition={{ duration: 0.7, ease }}
    >
      {/* liquid body */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${color}59 0%, ${color}26 100%)` }} />
      {/* wave crest riding the surface */}
      <div className={"absolute -top-4 left-0 h-8 w-[200%]" + (reduce ? "" : " wave-anim")}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0,22 C100,4 200,4 300,22 C400,40 500,40 600,22 C700,4 800,4 900,22 C1000,40 1100,40 1200,22 L1200,40 L0,40 Z"
            fill={color}
            opacity="0.55"
          />
        </svg>
      </div>
      {/* rising bubbles */}
      {!reduce &&
        BUBBLES.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: b.x, width: b.size, height: b.size, bottom: -8 }}
            animate={{ y: [0, -150], opacity: [0, 0.8, 0] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
    </motion.div>
  );
}

export function Dimensions() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="dimensions" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* aggressive animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-20 top-10 h-[28rem] w-[28rem] rounded-full bg-accent-3/10 blur-[130px]"
          animate={reduce ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={reduce ? {} : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[130px]"
          animate={reduce ? {} : { x: [0, -36, 0], y: [0, 26, 0] }}
          transition={reduce ? {} : { duration: 21, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading {...dimensionsIntro} />

        {/* liquid-glass accordion */}
        <div className="mt-14 flex flex-col gap-3 lg:h-[32rem] lg:flex-row">
          {dimensions.map((dim, i) => {
            const t = TINTS[i % TINTS.length];
            const on = i === active;
            return (
              <motion.div
                key={dim.name}
                onClick={() => setActive(i)}
                animate={{ flexGrow: on ? 2.6 : 1 }}
                transition={{ duration: 0.6, ease }}
                style={{ flexBasis: 0, "--beam-color": t.bar } as CSSProperties}
                className={
                  "group relative flex min-h-[13rem] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] border transition-colors duration-300 " +
                  (on ? "beam-border border-white/70 shadow-[0_30px_70px_-34px_rgba(20,22,42,0.45)]" : "border-line hover:border-white/70")
                }
              >
                {/* solid card base */}
                <div className="absolute inset-0 bg-white" />
                <Water color={t.bar} active={on} reduce={reduce} />
                <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: t.bar }} />

                {/* content */}
                <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                  <motion.span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{ background: t.tile, boxShadow: `0 14px 30px -14px ${t.glow}` }}
                    animate={reduce ? {} : { y: on ? [0, -5, 0] : 0 }}
                    transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon name={dim.icon} className="h-6 w-6" strokeWidth={1.7} />
                  </motion.span>

                  <h3 className="mt-auto font-display text-xl font-extrabold tracking-tight text-ink">{dim.name}</h3>

                  <AnimatePresence mode="wait">
                    {on ? (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease, delay: 0.12 }}
                        className="mt-3"
                      >
                        <p className="max-w-xl text-[14px] leading-relaxed text-ink-soft">{dim.definition}</p>
                        <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {FIELDS.map((f) => (
                            <div key={f.key}>
                              <h4 className="text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: t.text }}>
                                {f.label}
                              </h4>
                              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{dim[f.key]}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-1.5">
                          {dim.solutions.map((s) => (
                            <Link
                              key={s}
                              href="#solutions"
                              onClick={(e) => e.stopPropagation()}
                              className="rounded-full px-3 py-1 text-[11px] font-bold transition-transform hover:scale-105"
                              style={{ background: t.soft, color: t.text }}
                            >
                              {s}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-[12.5px] leading-snug text-muted"
                      >
                        {dim.definition.split("—")[0]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
