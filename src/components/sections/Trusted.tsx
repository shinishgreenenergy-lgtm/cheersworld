"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Reveal } from "../ui/Reveal";
import type { IconName } from "../ui/Icon";
import { trust } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const GROUP_STYLE: Record<string, { tint: number; icon: IconName; blurb: string }> = {
  Clinical: { tint: 0, icon: "HeartPulse", blurb: "Hospitals & recovery" },
  Academic: { tint: 2, icon: "GraduationCap", blurb: "Schools & universities" },
  Research: { tint: 4, icon: "FlaskConical", blurb: "Labs & science" },
  Government: { tint: 5, icon: "Landmark", blurb: "Public sector" },
  Technology: { tint: 1, icon: "Network", blurb: "Platform & infra" },
};

// A proven metric in the ledger — serif numeral counting up on scroll.
function ProvenStat({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const shown = reduce ? value : n;
  return (
    <motion.div
      className="flex flex-col gap-1"
      onViewportEnter={() => setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <span className="font-serif text-[2.8rem] font-medium leading-none tracking-tight text-accent-2 [font-variation-settings:'opsz'_48]">
        <NumberFlow value={shown} animated={!reduce} />
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">{label}</span>
    </motion.div>
  );
}

export function Trusted() {
  const realGroups = trust.groups.filter((g) => !g.soon);
  const realMetrics = trust.metrics.filter((m) => m.value !== undefined);
  const soonMetrics = trust.metrics.filter((m) => m.value === undefined);

  return (
    <section id="trust" className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-0 h-64 w-[42rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-16">
          {/* ledger rail — the claim, then the numbers that back it */}
          <Reveal>
            <div className="flex h-full flex-col">
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">Trusted Collaborations</span>
                <span className="block h-px w-10 bg-accent-2" />
              </div>
              <h2 className="mt-5 max-w-md font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.14] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
                {trust.eyebrow}
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/65">{trust.subhead}</p>

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">Proven today</p>
                <div className="mt-5 grid grid-cols-3 gap-6">
                  {realMetrics.map((m) => (
                    <ProvenStat key={m.label} label={m.label} value={m.value as number} />
                  ))}
                </div>
              </div>

              {/* same ledger, unfilled slots — nothing invented, the dash is the value */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                  On the roadmap
                  <span className="ml-2 font-medium normal-case tracking-normal text-white/40">reported as it becomes real</span>
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-8">
                  {soonMetrics.map((m) => (
                    <li key={m.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-white/10 py-2">
                      <span className="text-[12.5px] font-medium text-white/55">{m.label}</span>
                      <span aria-label="not yet reported" className="font-serif text-[15px] text-white/30">—</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* the register — every partner, grouped, ruled, countable.
              One Reveal for the whole column: per-group reveals can miss their
              viewport trigger on anchor jumps and leave partners invisible. */}
          <Reveal className="flex flex-col gap-9">
            {realGroups.map((g, gi) => {
              const s = GROUP_STYLE[g.label] ?? { tint: gi % TINTS.length, icon: "Sparkles" as IconName, blurb: "" };
              const t = TINTS[s.tint % TINTS.length];
              const withLogos = g.items.filter((p) => p.logo);
              return (
                  <div key={g.label}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: t.bar }} />
                      <h3 className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">{g.label}</h3>
                      <span className="hidden text-[12px] text-white/45 sm:block">{s.blurb}</span>
                      <span aria-hidden className="h-px flex-1 bg-white/10" />
                      <span className="font-mono text-[11.5px] font-semibold tabular-nums" style={{ color: t.bar }}>
                        {String(withLogos.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {withLogos.map((p) => (
                        <div
                          key={p.name}
                          className="group flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-16px_rgba(0,0,0,0.7)]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.logo!}
                            alt=""
                            loading="lazy"
                            className="h-10 w-auto max-w-[6rem] shrink-0 object-contain"
                          />
                          <span className="text-[13.5px] font-semibold leading-snug text-ink">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
