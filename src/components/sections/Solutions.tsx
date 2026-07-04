"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { solutions } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Solutions() {
  const reduce = useReducedMotion();
  return (
    <section id="solutions" className="scroll-mt-24 overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={solutions.eyebrow} title={solutions.title} subtitle={solutions.subtitle} />

        {/* hub node */}
        <Reveal className="mt-14">
          <div className="flex flex-col items-center">
            <div className="glass relative flex items-center gap-3 rounded-full px-7 py-4 shadow-[0_24px_50px_-24px_rgba(46,158,91,0.5)]">
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-accent/40"
                  animate={{ scale: [1, 1.15], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white">
                <BrainCircuit className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">{solutions.hub}</span>
            </div>
            {/* connector stem down to the grid */}
            <span aria-hidden className="mt-0 h-10 w-[2px] bg-[linear-gradient(180deg,#2e9e5b,transparent)]" />
          </div>
        </Reveal>

        {/* spoke cards */}
        <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-7">
          {solutions.items.map((s, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={s.name} delay={(i % 7) * 0.06}>
                <div className="group relative flex h-full flex-col">
                  {/* per-card connector thread */}
                  <span aria-hidden className="mx-auto block h-6 w-[2px] bg-[linear-gradient(180deg,transparent,_var(--thread))]" style={{ "--thread": t.bar } as CSSProperties} />
                  <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl px-5 py-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-26px_rgba(11,11,20,0.34)]">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}>
                      <Icon name={s.icon} className="h-5.5 w-5.5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-display text-[15px] font-extrabold leading-tight tracking-tight text-ink">{s.name}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{s.tagline}</p>
                    <span className="mt-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ background: t.soft, color: t.text }}>
                      {s.domain}
                    </span>
                    <div className="mt-auto flex flex-wrap gap-x-2 gap-y-0.5 pt-4 text-[10.5px]">
                      {s.facets.map((f) =>
                        f.href ? (
                          <Link key={f.label} href={f.href} className="font-bold underline-offset-2 hover:underline" style={{ color: t.text }}>
                            {f.label}
                          </Link>
                        ) : (
                          <span key={f.label} className="font-medium text-muted/60">{f.label}</span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
