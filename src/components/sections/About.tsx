"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Check, Minus, ArrowUpRight } from "lucide-react";
import { Reveal, useRevealed } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { PhilosophyRing } from "../ui/PhilosophyRing";
import { Badge } from "../ui/badge";
import { about } from "@/lib/content";

// Real, verifiable credentials — the same proofs surfaced in the hero. Grounds
// the "global R&D company" claim in evidence rather than adjectives.
const CREDENTIALS: { value: string; label: string; href?: string }[] = [
  { value: "JACC · 2025", label: "Peer-reviewed clinical trial", href: "https://www.jacc.org/doi/abs/10.1016/j.jacc.2025.09.1117" },
  { value: "Patent IN 510420", label: "Wisdom Network · granted" },
  { value: "Faubert Lab", label: "Founding science" },
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
        {/* dossier header + statement, ring as the counterweight */}
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">{about.eyebrow}</span>
                <span className="block h-px w-10 bg-accent-2" />
              </div>
              <h2 className="mt-6 font-serif text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
                {about.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">{about.paragraphs[0]}</p>

              <p className="mt-8 max-w-xl border-l-2 border-accent-2/70 pl-5 font-serif text-[1.25rem] font-medium leading-[1.5] text-white/90 sm:text-[1.4rem] [font-variation-settings:'opsz'_28]">
                {about.paragraphs[1]}
              </p>

              {/* proof ledger — claims backed by records */}
              <dl className="mt-9 max-w-xl">
                {CREDENTIALS.map((c) => {
                  const inner = (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5">
                      <dt className="font-mono text-[12.5px] font-bold uppercase tracking-[0.06em] text-white">
                        {c.value}
                        {c.href && <ArrowUpRight className="ml-1.5 inline h-3.5 w-3.5 align-[-2px] text-white/40" />}
                      </dt>
                      <dd className="text-[12.5px] leading-snug text-white/50">{c.label}</dd>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.value} href={c.href} target="_blank" rel="noreferrer" className="block border-t border-white/12 transition-colors last:border-b hover:[&_dt]:text-accent-2">
                      {inner}
                    </a>
                  ) : (
                    <div key={c.value} className="border-t border-white/12 last:border-b">
                      {inner}
                    </div>
                  );
                })}
              </dl>
            </div>

          <div>
            <motion.div style={{ y: yRing }}>
              <PhilosophyRing dark />
            </motion.div>
            <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">
              Observe · Understand · Predict · Intervene · Measure · Improve
            </p>
          </div>
        </Reveal>

        {/* Mission / Vision / Philosophy — three ruled columns, no ornament */}
        <div className="mt-16 grid gap-8 border-t border-white/12 pt-10 md:grid-cols-3 md:gap-0">
          {about.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} y={18} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-white/10"} ${i === about.pillars.length - 1 ? "md:pr-0" : ""}`}>
              <div className="flex items-center gap-2.5">
                <Icon name={p.icon} className="h-4 w-4 text-accent-2" strokeWidth={1.8} />
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-2">{p.title}</h3>
              </div>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/70">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Journey — a connected roadmap rail with progress. One viewport
            trigger for the whole rail, then milestones land one by one while
            the progress line draws across underneath them. */}
        <Journey milestones={about.milestones} leftPct={leftPct} railWidth={railWidth} />
      </div>
    </section>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP = 0.16; // seconds between one milestone landing and the next

function Journey({
  milestones,
  leftPct,
  railWidth,
}: {
  milestones: typeof about.milestones;
  leftPct: number;
  railWidth: number;
}) {
  const { ref, shown } = useRevealed();
  const reduce = useReducedMotion();
  const on = shown || !!reduce;

  return (
    <div ref={(el) => void (ref.current = el)} className="mt-16">
      <span id="timeline" className="block scroll-mt-28" aria-hidden />
      <div className="flex items-center gap-4">
        <motion.span
          className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-2"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={on ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Our journey
        </motion.span>
        <motion.span
          className="h-px flex-1 origin-left bg-white/15"
          initial={reduce ? false : { scaleX: 0 }}
          animate={on ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        />
        <motion.span
          className="font-mono text-[11px] text-white/40"
          initial={reduce ? false : { opacity: 0 }}
          animate={on ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          2019 — today
        </motion.span>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative min-w-[60rem] lg:min-w-0">
          {/* rail */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[13px] h-px origin-left bg-white/12"
            initial={reduce ? false : { scaleX: 0 }}
            animate={on ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          />
          {/* progress — draws in step with the cards landing on it */}
          <motion.div
            aria-hidden
            className="absolute top-[13px] h-px origin-left"
            style={{ left: `${leftPct}%`, width: `${railWidth}%`, background: "linear-gradient(90deg,#2e9e5b,#14b8a6)" }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={on ? { scaleX: 1 } : undefined}
            transition={{ duration: STEP * (milestones.length - 1), ease: "linear", delay: 0.35 }}
          />

          <ol className="relative grid grid-cols-7 gap-3">
            {milestones.map((m, i) => {
              const s = STATUS[m.status];
              const d = 0.25 + i * STEP;
              return (
                <li key={m.title} className="flex flex-col">
                  {/* node */}
                  <span className="relative mx-auto grid h-[27px] w-[27px] place-items-center">
                    {m.status === "current" && !reduce && (
                      <span className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${s.color}`, animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
                    )}
                    <motion.span
                      className="grid h-[15px] w-[15px] place-items-center rounded-full"
                      style={
                        m.status === "future"
                          ? { border: "1.5px dashed rgba(255,255,255,0.3)", background: "#0d1015" }
                          : { background: s.color, boxShadow: `0 0 0 4px ${s.color}22` }
                      }
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      animate={on ? { scale: 1, opacity: 1 } : undefined}
                      transition={{ type: "spring", stiffness: 480, damping: 20, delay: d }}
                    >
                      {m.status === "done" && <Check className="h-2.5 w-2.5 text-[#06110b]" strokeWidth={4} />}
                    </motion.span>
                  </span>

                  {/* card */}
                  <motion.div
                    className="mt-4 flex flex-1 flex-col rounded-xl border p-4"
                    style={{
                      borderColor: m.status === "current" ? "rgba(20,184,166,0.35)" : "rgba(255,255,255,0.1)",
                      background: m.status === "current" ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.03)",
                    }}
                    initial={reduce ? false : { opacity: 0, y: 22, scale: 0.96, filter: "blur(5px)" }}
                    animate={on ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
                    transition={{ duration: 0.6, ease: EASE, delay: d + 0.06 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{m.label}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <h4 className="mt-2.5 font-display text-[14px] font-extrabold leading-tight tracking-tight text-white">{m.title}</h4>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-white/55">{m.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
