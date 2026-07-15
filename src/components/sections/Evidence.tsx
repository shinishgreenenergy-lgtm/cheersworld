"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { evidence } from "@/lib/content";

const DONE = "#2e9e5b"; // stages the platform delivers today
const MEASURING = "#14b8a6"; // stages under measurement

const STAGES = [
  { n: "01", label: "Challenge", caption: "Name the human challenge", state: "done" as const },
  { n: "02", label: "Platform", caption: "Apply the platform", state: "done" as const },
  { n: "03", label: "Outcome", caption: "Measure the outcome", state: "measuring" as const },
  { n: "04", label: "Evidence", caption: "Publish the evidence", state: "measuring" as const },
];

const MEASURED = [
  { n: "03", label: "Outcome" },
  { n: "04", label: "Evidence" },
];

/* A heartbeat trace that continuously redraws — the "in measurement" signal. */
function PulseLine() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 220 28" preserveAspectRatio="none" className="h-6 w-full" aria-hidden>
      <path d="M0 14 H120 l4 -8 l5 16 l5 -20 l4 12 H220" fill="none" stroke={MEASURING} strokeOpacity="0.14" strokeWidth="1.4" />
      <motion.path
        d="M0 14 H120 l4 -8 l5 16 l5 -20 l4 12 H220"
        fill="none"
        stroke={MEASURING}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="70 260"
        style={{ filter: `drop-shadow(0 0 4px ${MEASURING}88)` }}
        initial={{ strokeDashoffset: 330 }}
        animate={reduce ? { strokeDashoffset: 330 } : { strokeDashoffset: [330, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* The signature: the method itself, stated once as an instrument rail. */
function MethodTrack() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* connecting line behind the nodes (desktop) */}
      <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-[2px] sm:block">
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-full" style={{ background: DONE }} />
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-full" style={{ background: `${MEASURING}44` }}>
          {!reduce && (
            <motion.div
              className="h-full w-1/2"
              style={{ background: `linear-gradient(90deg,transparent,${MEASURING},transparent)` }}
              animate={{ x: ["-60%", "220%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>

      <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
        {STAGES.map((s) => {
          const done = s.state === "done";
          const color = done ? DONE : MEASURING;
          return (
            <li key={s.n} className="flex flex-col items-center text-center">
              <span className="relative grid h-10 w-10 place-items-center rounded-full">
                {!done && !reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1.5px solid ${MEASURING}` }}
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-mono text-[12px] font-bold"
                  style={
                    done
                      ? { background: color, color: "#06110b" }
                      : { border: `1.5px solid ${color}`, color, background: "rgba(20,184,166,0.08)" }
                  }
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : s.n}
                </span>
              </span>
              <span className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">{s.label}</span>
              <span className="mt-1 text-[11.5px] leading-snug text-white/45">{s.caption}</span>
              <span
                className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ color }}
              >
                {done ? "Delivered" : "Measuring"}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StageLine({ n, label, color, children }: { n: string; label: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
        {n} · {label}
      </span>
      <p className="mt-1 text-[13px] leading-relaxed text-white/65">{children}</p>
    </div>
  );
}

export function Evidence() {
  const products = evidence.domains.filter((d) => d.solution.toLowerCase().startsWith("cheers"));
  const programs = evidence.domains.filter((d) => !d.solution.toLowerCase().startsWith("cheers"));

  return (
    <section
      id="evidence"
      className="relative isolate flex min-h-[100svh] flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0e1116_0%,#080b0f_100%)] py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-[#14b8a6]/10 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.3] mix-blend-overlay" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={evidence.eyebrow} title={evidence.title} subtitle={evidence.subtitle} />

        {/* Signature — the method, stated once */}
        <Reveal className="mt-14">
          <MethodTrack />
        </Reveal>

        {/* The same discipline, applied to every product domain */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.06}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20">
                <header className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/85 ring-1 ring-white/10">
                    <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block font-display text-[16px] font-extrabold tracking-tight text-white">{d.name}</span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{d.solution}</span>
                  </span>
                </header>

                <div className="mt-5 flex flex-1 flex-col gap-4">
                  <StageLine n="01" label="Challenge" color={DONE}>{d.challenge}</StageLine>
                  <StageLine n="02" label="Platform" color={DONE}>{d.platform}</StageLine>
                </div>

                {/* 03 / 04 — measuring */}
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  {MEASURED.map((s) => (
                    <div key={s.n}>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: MEASURING }}>
                        {s.n} · {s.label}
                      </span>
                      <div className="mt-1.5 rounded-lg bg-[#14b8a6]/[0.05] px-2 py-1.5 ring-1 ring-inset ring-[#14b8a6]/15">
                        <PulseLine />
                        <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#14b8a6]/80">In measurement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Cross-cutting government programs — different in kind, full width */}
        {programs.map((d) => (
          <Reveal key={d.name} className="mt-4">
            <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
                <div>
                  <header className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/85 ring-1 ring-white/10">
                      <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block font-display text-[16px] font-extrabold tracking-tight text-white">{d.name}</span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{d.solution}</span>
                    </span>
                  </header>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <StageLine n="01" label="Challenge" color={DONE}>{d.challenge}</StageLine>
                    <StageLine n="02" label="Platform" color={DONE}>{d.platform}</StageLine>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:border-l lg:border-white/10 lg:pl-6">
                  {MEASURED.map((s) => (
                    <div key={s.n}>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: MEASURING }}>
                        {s.n} · {s.label}
                      </span>
                      <div className="mt-1.5 rounded-lg bg-[#14b8a6]/[0.05] px-2 py-1.5 ring-1 ring-inset ring-[#14b8a6]/15">
                        <PulseLine />
                        <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#14b8a6]/80">In measurement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
