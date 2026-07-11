"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";
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
function MetricStat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const shown = reduce ? value : n;
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 py-7 text-center"
      onViewportEnter={() => setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <span className="flex items-baseline font-display text-[2.6rem] font-black leading-none tracking-tight text-accent-2">
        <NumberFlow value={shown} animated={!reduce} />
        {suffix && <span>{suffix}</span>}
      </span>
      <span className="text-[12.5px] font-semibold text-white/65">{label}</span>
    </motion.div>
  );
}

// One logo on a bright glass tile with a soft sheen — stays light so dark logos read.
function LogoTile({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      title={name}
      className="relative flex h-[68px] w-[188px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white px-6 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.55),transparent)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        loading="lazy"
        className="relative h-9 w-auto max-w-[136px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

export function Trusted() {
  const realGroups = trust.groups.filter((g) => !g.soon);
  const soonGroups = trust.groups.filter((g) => g.soon);
  const realMetrics = trust.metrics.filter((m) => m.value !== undefined);
  const soonMetrics = trust.metrics.filter((m) => m.value === undefined);
  const logos = realGroups.flatMap((g) => g.items.filter((p) => p.logo));

  return (
    <section id="trust" className="scroll-mt-24 px-3 py-6 sm:px-5">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#23262f_0%,#15171d_100%)] px-5 py-16 sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-14">
        {/* atmosphere: grain + faint accent glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-64 w-[46rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
          <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
        </div>

        {/* header */}
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              Trusted Collaborations
            </span>
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.15rem)] font-extrabold leading-tight tracking-tight text-white">
              {trust.eyebrow}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/65">{trust.subhead}</p>
          </div>
        </Reveal>

        {/* 1 — metrics (proven today + roadmap) */}
        <Reveal delay={0.06}>
          <div
            className="beam-border relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
            style={{ "--beam-color": "#8fbf4d" } as CSSProperties}
          >
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
                <span className="ml-2 font-medium normal-case tracking-normal text-white/45">
                  — reported as it becomes real, never fabricated
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {soonMetrics.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/25 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white/70"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2 — moving logo wall */}
        <Reveal delay={0.1}>
          <div className="mt-6">
            <Marquee duration={42} gap={20}>
              {logos.map((p) => (
                <LogoTile key={p.name} name={p.name} logo={p.logo!} />
              ))}
            </Marquee>
          </div>
        </Reveal>

        {/* 3 — credential grid (glass, shining) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {realGroups.map((g, gi) => {
            const s = GROUP_STYLE[g.label] ?? { tint: gi % TINTS.length, icon: "Sparkles" as IconName, blurb: "" };
            const t = TINTS[s.tint % TINTS.length];
            return (
              <Reveal key={g.label} delay={gi * 0.06}>
                <div
                  className="beam-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl transition-colors duration-300 hover:bg-white/[0.07]"
                  style={{ "--beam-color": t.bar } as CSSProperties}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-white"
                    style={{ background: t.tile, boxShadow: `0 12px 26px -14px ${t.glow}` }}
                  >
                    <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-[2rem] font-black leading-none tracking-tight text-white">
                      {g.items.length}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-wide text-white/45">partners</span>
                  </div>
                  <h3 className="mt-3 font-display text-[15px] font-extrabold tracking-tight text-white">{g.label}</h3>
                  <p className="text-[12px] text-white/60">{s.blurb}</p>
                </div>
              </Reveal>
            );
          })}

          {soonGroups.map((g, gi) => {
            const s = GROUP_STYLE[g.label];
            return (
              <Reveal key={g.label} delay={(realGroups.length + gi) * 0.06}>
                <div className="relative flex h-full flex-col rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white/50">
                    {s && <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.8} />}
                  </span>
                  <span className="mt-4 inline-flex w-fit rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/50">
                    Soon
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-extrabold tracking-tight text-white/80">{g.label}</h3>
                  <p className="text-[12px] text-white/55">{s?.blurb}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
