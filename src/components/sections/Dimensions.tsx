"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/badge";
import { dimensions, dimensionsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

const FIELDS = [
  { key: "why", label: "Why it matters" },
  { key: "assessment", label: "How the AI assesses it" },
  { key: "intervention", label: "How the platform intervenes" },
] as const;

// Node positions on the wheel — five points, starting at 12 o'clock.
const RADIUS = 41; // % of wheel size
const POS = dimensions.map((_, i) => {
  const a = (-90 + i * (360 / dimensions.length)) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) };
});

export function Dimensions() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const dim = dimensions[active];
  const t = TINTS[active % TINTS.length];

  return (
    <section id="dimensions" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-canvas py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* editorial header */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{dimensionsIntro.eyebrow}</span>
          <span className="block h-px w-10 bg-accent" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
            {dimensionsIntro.title}
          </h2>
          <p className="max-w-md text-[14.5px] leading-relaxed text-muted lg:pb-1.5">{dimensionsIntro.subtitle}</p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* the wheel — one person at the centre, five dimensions around them */}
          <div className="mx-auto aspect-square w-full max-w-[26rem] lg:max-w-[30rem]">
            <div className="relative h-full w-full">
              {/* orbit + spokes */}
              <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(20,22,42,0.14)" strokeWidth="0.35" strokeDasharray="1.6 2.2" />
                {POS.map((p, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke={i === active ? TINTS[i % TINTS.length].bar : "rgba(20,22,42,0.1)"}
                    strokeWidth={i === active ? 0.7 : 0.35}
                    className="transition-all duration-500"
                  />
                ))}
              </svg>

              {/* the person */}
              <div className="absolute left-1/2 top-1/2 grid h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-center shadow-[0_30px_60px_-30px_rgba(20,22,42,0.35)]">
                <div>
                  <p className="font-serif text-[clamp(0.95rem,2.2vw,1.25rem)] font-medium leading-tight text-ink [font-variation-settings:'opsz'_28]">
                    One
                    <br />
                    person
                  </p>
                  <p className="mt-1 font-mono text-[max(0.5rem,min(0.6rem,1.4vw))] font-semibold uppercase tracking-[0.14em] text-muted">
                    5 dimensions
                  </p>
                </div>
              </div>

              {/* dimension nodes */}
              {dimensions.map((d, i) => {
                const nt = TINTS[i % TINTS.length];
                const on = i === active;
                return (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={`${d.name} dimension`}
                    className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 outline-none"
                    style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                  >
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-accent sm:h-14 sm:w-14"
                      style={
                        on
                          ? { background: nt.tile, borderColor: "transparent", color: "#fff", boxShadow: `0 16px 34px -14px ${nt.glow}`, transform: "scale(1.08)" }
                          : { background: "#fff", borderColor: "var(--color-line)", color: nt.text, boxShadow: "0 10px 24px -16px rgba(20,22,42,0.3)" }
                      }
                    >
                      <Icon name={d.icon} className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.9} />
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-bold tracking-tight transition-colors duration-300 sm:text-[12px]"
                      style={on ? { color: nt.text } : { color: "var(--color-muted)" }}
                    >
                      {d.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* the active dimension, in full */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={dim.name}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-9"
                style={{
                  borderColor: `${t.bar}4d`,
                  background: `linear-gradient(150deg, ${t.bar}1c 0%, ${t.bar}08 48%, rgba(255,255,255,0.72) 100%)`,
                }}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.text }}>
                  Dimension {String(active + 1).padStart(2, "0")} · {dim.name}
                </span>
                <h3 className="mt-3.5 text-balance font-serif text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium leading-[1.2] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_36]">
                  {dim.definition}
                </h3>

                <div className="mt-7 space-y-5 border-t pt-6" style={{ borderColor: `${t.bar}30` }}>
                  {FIELDS.map((f) => (
                    <div key={f.key}>
                      <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: t.text }}>
                        {f.label}
                      </h4>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{dim[f.key]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] font-semibold text-muted">Delivered through</span>
                  {dim.solutions.map((s) => (
                    <Badge
                      key={s}
                      asChild
                      variant="outline"
                      className="border-transparent bg-white/80 px-3.5 py-1.5 text-[11.5px] font-bold shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                      style={{ color: t.text }}
                    >
                      <Link href="/#solutions">{s}</Link>
                    </Badge>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
