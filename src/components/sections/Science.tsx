"use client";

import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { science } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

export function Science() {
  return (
    <section id="science" className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[46rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* header */}
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {science.eyebrow}
            </span>
            <h2 className="font-display text-[clamp(1.7rem,3.7vw,2.7rem)] font-extrabold leading-tight tracking-tight text-white">
              {science.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/60">{science.subtitle}</p>
          </div>
        </Reveal>

        {/* discipline grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {science.disciplines.map((d, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={d.name} delay={(i % 4) * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1c2029] p-6 transition-colors duration-300 hover:border-white/25"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  {/* faint number glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: t.bar }}
                  />
                  <div className="relative flex items-baseline justify-between">
                    <span className="font-display text-[2.1rem] font-black leading-none tracking-tight" style={{ color: t.bar }}>
                      0{i + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">{d.short}</span>
                  </div>
                  <h3 className="relative mt-4 font-display text-[17px] font-extrabold leading-tight tracking-tight text-white">
                    {d.name}
                  </h3>
                  <p className="relative mt-2 text-[13px] leading-relaxed text-white/55">{d.blurb}</p>
                  <div className="relative mt-auto pt-4">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: t.bar }}>
                        In the platform
                      </span>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/55">{d.use}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
