"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { PhilosophyRing } from "../ui/PhilosophyRing";
import { Badge } from "../ui/badge";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

// Real, verifiable credentials — the same proofs surfaced in the hero. Grounds
// the "global R&D company" claim in evidence rather than adjectives.
const CREDENTIALS: { value: string; label: string; href?: string }[] = [
  { value: "JACC · 2025", label: "Peer-reviewed clinical trial", href: "https://www.jacc.org/doi/abs/10.1016/j.jacc.2025.09.1117" },
  { value: "Patent IN 510420", label: "Wisdom Network · granted" },
  { value: "NeuroTrackerX", label: "Founding science" },
];

const STATUS = {
  done: { label: "Delivered", color: "#2e9e5b" },
  current: { label: "In progress", color: "#14b8a6" },
  future: { label: "Ahead", color: "rgba(255,255,255,0.42)" },
} as const;

function StatusBadge({ status }: { status: keyof typeof STATUS }) {
  const s = STATUS[status];
  const reduce = useReducedMotion();
  return (
    <Badge
      className="gap-1.5 border-0 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]"
      style={{
        background: status === "future" ? "rgba(255,255,255,0.07)" : `${s.color}22`,
        color: status === "future" ? "rgba(255,255,255,0.5)" : s.color,
      }}
    >
      {status === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
      {status === "current" && (
        <span className="relative flex h-2 w-2">
          {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: s.color }} />}
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: s.color }} />
        </span>
      )}
      {status === "future" && <Minus className="h-3 w-3" strokeWidth={2.5} />}
      {s.label}
    </Badge>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-70, 70]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const yRing = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  // Progress rail spans from the first node to the last non-future node.
  const n = about.milestones.length;
  const lastActive = about.milestones.reduce((acc, m, i) => (m.status !== "future" ? i : acc), 0);
  const leftPct = (0.5 / n) * 100;
  const railWidth = ((lastActive + 0.5) / n) * 100 - leftPct;

  return (
    <section ref={ref} id="about" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere with parallax */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: yBlob1 }} className="absolute -left-20 top-4 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[130px]" />
        <motion.div style={{ y: yBlob2 }} className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-3/15 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={about.eyebrow} title={about.title} subtitle={about.paragraphs[0]} />

        {/* Statement band — the loop as anchor, the credentials as proof */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <motion.div style={{ y: yRing }}>
              <PhilosophyRing dark />
            </motion.div>
            <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">
              Observe · Understand · Predict · Intervene · Measure · Improve
            </p>
          </Reveal>

          <Reveal delay={0.16} className="order-1 lg:order-2">
            <p className="max-w-xl text-[1.35rem] font-medium leading-[1.5] tracking-[-0.005em] text-white/85 sm:text-[1.5rem]">
              {about.paragraphs[1]}
            </p>

            <dl className="mt-9 grid grid-cols-1 gap-y-5 border-t border-white/12 pt-7 sm:grid-cols-3 sm:gap-x-6">
              {CREDENTIALS.map((c) => {
                const inner = (
                  <>
                    <dt className="font-mono text-[12.5px] font-bold uppercase tracking-[0.06em] text-white">{c.value}</dt>
                    <dd className="mt-1 text-[12px] leading-snug text-white/50">{c.label}</dd>
                  </>
                );
                return c.href ? (
                  <a key={c.value} href={c.href} target="_blank" rel="noreferrer" className="group block sm:border-l sm:border-white/10 sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                    <span className="transition-colors group-hover:[&>dt]:text-accent-2">{inner}</span>
                  </a>
                ) : (
                  <div key={c.value} className="sm:border-l sm:border-white/10 sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                    {inner}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        {/* Pillars — Mission / Vision / Philosophy, shown openly */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div
                  className="beam-border relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ "--beam-color": t.bar } as React.CSSProperties}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 14px 30px -16px ${t.glow}` }}>
                      <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <span className="font-serif text-4xl font-medium leading-none [font-variation-settings:'opsz'_48]" style={{ color: t.bar, opacity: 0.38 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Journey — a connected roadmap rail with progress */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-2">Our journey</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="relative min-w-[60rem] lg:min-w-0">
              {/* rail */}
              <div aria-hidden className="absolute left-0 right-0 top-[13px] h-px bg-white/12" />
              <div
                aria-hidden
                className="absolute top-[13px] h-px"
                style={{ left: `${leftPct}%`, width: `${railWidth}%`, background: "linear-gradient(90deg,#2e9e5b,#14b8a6)" }}
              />

              <ol className="relative grid grid-cols-7 gap-3">
                {about.milestones.map((m) => {
                  const s = STATUS[m.status];
                  return (
                    <li key={m.title} className="flex flex-col">
                      {/* node */}
                      <span className="relative mx-auto grid h-[27px] w-[27px] place-items-center">
                        {m.status === "current" && !reduce && (
                          <span className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${s.color}`, animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
                        )}
                        <span
                          className="grid h-[15px] w-[15px] place-items-center rounded-full"
                          style={
                            m.status === "future"
                              ? { border: "1.5px dashed rgba(255,255,255,0.3)", background: "#0d1015" }
                              : { background: s.color, boxShadow: `0 0 0 4px ${s.color}22` }
                          }
                        >
                          {m.status === "done" && <Check className="h-2.5 w-2.5 text-[#06110b]" strokeWidth={4} />}
                        </span>
                      </span>

                      {/* card */}
                      <div
                        className="mt-4 flex flex-1 flex-col rounded-xl border p-4"
                        style={{
                          borderColor: m.status === "current" ? "rgba(20,184,166,0.35)" : "rgba(255,255,255,0.1)",
                          background: m.status === "current" ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{m.label}</span>
                          <StatusBadge status={m.status} />
                        </div>
                        <h4 className="mt-2.5 font-display text-[14px] font-extrabold leading-tight tracking-tight text-white">{m.title}</h4>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{m.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
