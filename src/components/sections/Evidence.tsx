"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { evidence, type EvidenceDomain } from "@/lib/content";

const DONE = "#2e9e5b"; // stages delivered today
const MEASURING = "#14b8a6"; // stages under measurement
const STAMP = "#7fd6a4";

// The method is a real sequence — numbering carries information here.
const STAGES = [
  { n: "01", label: "Named", caption: "the human challenge" },
  { n: "02", label: "Applied", caption: "the platform in the field" },
  { n: "03", label: "Measured", caption: "outcomes under study" },
  { n: "04", label: "Published", caption: "peer-reviewed evidence" },
];

type StageState = "done" | "measuring" | "pending";

function stageStates(d: EvidenceDomain): StageState[] {
  return ["done", "done", d.measured ? "done" : "measuring", d.published ? "done" : "pending"];
}

function StageDot({ state }: { state: StageState }) {
  const reduce = useReducedMotion();
  if (state === "done") {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: DONE, color: "#06110b" }}>
        <Check className="h-3 w-3" strokeWidth={3} />
        <span className="sr-only">delivered</span>
      </span>
    );
  }
  if (state === "measuring") {
    return (
      <span className="relative grid h-5 w-5 place-items-center rounded-full">
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${MEASURING}` }}
            animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span
          className="grid h-5 w-5 place-items-center rounded-full"
          style={{ border: `1.5px solid ${MEASURING}`, background: "rgba(20,184,166,0.08)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: MEASURING }} />
          <span className="sr-only">in measurement</span>
        </span>
      </span>
    );
  }
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full border border-dashed border-white/20 text-white/30">
      <Minus className="h-3 w-3" strokeWidth={2.5} />
      <span className="sr-only">queued</span>
    </span>
  );
}

export function Evidence() {
  return (
    <section
      id="evidence"
      className="relative isolate flex min-h-[100svh] flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0e1116_0%,#080b0f_100%)] py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-[#14b8a6]/10 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.3] mix-blend-overlay" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* dossier header */}
        <Reveal>
          <div>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">{evidence.eyebrow}</span>
              <span className="block h-px w-10 bg-accent-2" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
                {evidence.title}
              </h2>
              <p className="max-w-md text-[14.5px] leading-relaxed text-white/65 lg:pb-1.5">{evidence.subtitle}</p>
            </div>
          </div>
        </Reveal>

        {/* the record wall — the method, then one filed card per domain */}
        <Reveal className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* the discipline itself, filed first */}
            <div className="flex flex-col rounded-2xl border border-accent-2/25 bg-accent-2/[0.05] p-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-2">The discipline</span>
              <ul className="mt-4 flex flex-1 flex-col justify-between gap-3.5">
                {STAGES.map((s) => (
                  <li key={s.n} className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold" style={{ color: DONE }}>{s.n}</span>
                    <span>
                      <span className="block font-display text-[13.5px] font-extrabold tracking-tight text-white">{s.label}</span>
                      <span className="block text-[11.5px] leading-snug text-white/45">{s.caption}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {evidence.domains.map((d) => {
              const states = stageStates(d);
              return (
                <div
                  key={d.name}
                  className="relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20"
                >
                  {/* the verdict, stamped */}
                  {d.published && (
                    <span
                      aria-hidden
                      className="absolute right-4 top-4 -rotate-6 rounded border-2 px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-[0.18em]"
                      style={{ borderColor: STAMP, color: STAMP, background: "rgba(46,158,91,0.08)" }}
                    >
                      Published
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/85 ring-1 ring-white/10">
                      <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] font-extrabold tracking-tight text-white">{d.name}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">{d.solution}</span>
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: DONE }}>Named</span>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">{d.challenge}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: DONE }}>Applied</span>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">{d.platform}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-1.5 pt-5">
                    {states.map((st, i) => (
                      <StageDot key={STAGES[i].n} state={st} />
                    ))}
                    {d.published ? (
                      <a
                        href={d.published.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-80"
                        style={{ background: `${DONE}26`, color: STAMP }}
                      >
                        {d.published.label} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-[#14b8a6]/80">
                        In measurement
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
