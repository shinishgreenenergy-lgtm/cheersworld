"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { trust } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const GROUP_STYLE: Record<string, { tint: number; icon: IconName; blurb: string }> = {
  Clinical: { tint: 0, icon: "HeartPulse", blurb: "Hospitals & recovery" },
  Academic: { tint: 2, icon: "GraduationCap", blurb: "Schools & universities" },
  Research: { tint: 4, icon: "FlaskConical", blurb: "Labs & science" },
  Government: { tint: 5, icon: "Landmark", blurb: "Public sector" },
  Technology: { tint: 1, icon: "Network", blurb: "Platform & infra" },
};

// A single proven metric, counting up on scroll — lime digits on the dark glass.
function MetricStat({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const shown = reduce ? value : n;
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 py-6 text-center"
      onViewportEnter={() => setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <span className="font-serif text-[2.6rem] font-medium leading-none tracking-tight text-accent-2 [font-variation-settings:'opsz'_48]">
        <NumberFlow value={shown} animated={!reduce} />
      </span>
      <span className="mt-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">{label}</span>
    </motion.div>
  );
}

export function Trusted() {
  const realGroups = trust.groups.filter((g) => !g.soon);
  const soonGroups = trust.groups.filter((g) => g.soon);
  const realMetrics = trust.metrics.filter((m) => m.value !== undefined);
  const soonMetrics = trust.metrics.filter((m) => m.value === undefined);

  return (
    <section id="trust" className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[46rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">Trusted Collaborations</span>
              <span className="block h-px w-10 bg-accent-2" />
            </div>
            <h2 className="font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.14] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
              {trust.eyebrow}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/65">{trust.subhead}</p>
          </div>
        </Reveal>

        {/* partner wall — real logos grouped by category */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {realGroups.map((g, gi) => {
            const s = GROUP_STYLE[g.label] ?? { tint: gi % TINTS.length, icon: "Sparkles" as IconName, blurb: "" };
            const t = TINTS[s.tint % TINTS.length];
            const withLogos = g.items.filter((p) => p.logo);
            return (
              <Reveal key={g.label} delay={gi * 0.08}>
                <div
                  className="beam-border relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                  style={{ "--beam-color": t.bar } as CSSProperties}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 12px 26px -14px ${t.glow}` }}>
                      <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[16px] font-extrabold tracking-tight text-white">{g.label}</h3>
                      <p className="truncate text-[12px] text-white/55">{s.blurb}</p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums" style={{ background: `${t.bar}22`, color: t.bar }}>
                      {withLogos.length}
                    </span>
                  </div>

                  <div className="mt-5 grid flex-1 grid-cols-2 gap-2.5 border-t border-white/10 pt-5">
                    {withLogos.map((p) => (
                      <div
                        key={p.name}
                        title={p.name}
                        className="group/tile flex h-16 items-center justify-center rounded-xl border border-white/70 bg-white px-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(0,0,0,0.55)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.logo!}
                          alt={p.name}
                          loading="lazy"
                          className="h-8 w-auto max-w-[104px] object-contain opacity-80 grayscale transition-all duration-300 group-hover/tile:opacity-100 group-hover/tile:grayscale-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* coming-soon categories */}
        {soonGroups.length > 0 && (
          <Reveal delay={0.16}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {soonGroups.map((g) => {
                const s = GROUP_STYLE[g.label];
                return (
                  <span key={g.label} className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/20 bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-white/70">
                    {s && <Icon name={s.icon} className="h-4 w-4 text-white/50" strokeWidth={1.8} />}
                    {g.label}
                    <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white/50">Soon</span>
                  </span>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* honest metrics */}
        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 pt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              <span className="pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">Proven today</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {realMetrics.map((m) => (
                <MetricStat key={m.label} label={m.label} value={m.value as number} />
              ))}
            </div>
            <div className="border-t border-white/10 bg-black/10 px-5 py-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
                On the roadmap
                <span className="ml-2 font-medium normal-case tracking-normal text-white/45">— reported as it becomes real, never fabricated</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {soonMetrics.map((m) => (
                  <span key={m.label} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/25 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white/70">
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
