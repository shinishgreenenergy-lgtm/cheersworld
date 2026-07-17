"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { evidence, type EvidenceDomain } from "@/lib/content";

const DONE = "#2e9e5b"; // stages delivered today
const MEASURING = "#14b8a6"; // stages under measurement

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

/* Ledger grid shared by the legend and every row so columns stay aligned. */
const COLS = "lg:grid lg:grid-cols-[minmax(0,1.9fr)_repeat(4,minmax(0,1fr))] lg:items-center lg:gap-3";

function StageDot({ state, small }: { state: StageState; small?: boolean }) {
  const reduce = useReducedMotion();
  const size = small ? "h-5 w-5" : "h-7 w-7";
  if (state === "done") {
    return (
      <span className={`grid ${size} place-items-center rounded-full`} style={{ background: DONE, color: "#06110b" }}>
        <Check className={small ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={3} />
        <span className="sr-only">delivered</span>
      </span>
    );
  }
  if (state === "measuring") {
    return (
      <span className={`relative grid ${size} place-items-center rounded-full`}>
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
          className={`grid ${size} place-items-center rounded-full`}
          style={{ border: `1.5px solid ${MEASURING}`, background: "rgba(20,184,166,0.08)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: MEASURING }} />
          <span className="sr-only">in measurement</span>
        </span>
      </span>
    );
  }
  return (
    <span className={`grid ${size} place-items-center rounded-full border border-dashed border-white/20 text-white/30`}>
      <Minus className={small ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={2.5} />
      <span className="sr-only">queued</span>
    </span>
  );
}

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

export function Evidence() {
  return (
    <section
      id="evidence"
      className="relative isolate flex min-h-[100svh] flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0e1116_0%,#080b0f_100%)] py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-[#14b8a6]/10 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.3] mix-blend-overlay" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={evidence.eyebrow} title={evidence.title} subtitle={evidence.subtitle} />

        {/* The evidence register — one row per domain, one column per stage */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
            {/* column legend */}
            <div className={`hidden border-b border-white/10 px-6 py-4 ${COLS}`}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Domain</span>
              {STAGES.map((s) => (
                <span key={s.n} className="pr-6">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                    {s.n} · {s.label}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-white/35">{s.caption}</span>
                </span>
              ))}
            </div>

            <Accordion type="single" collapsible defaultValue="Healthcare">
              {evidence.domains.map((d) => {
                const states = stageStates(d);
                return (
                  <AccordionItem key={d.name} value={d.name} className="border-white/10">
                    <AccordionTrigger className="px-4 py-4 hover:no-underline data-[state=open]:bg-white/[0.03] sm:px-6 [&>svg]:text-white/40">
                      <div className={`w-full ${COLS}`}>
                        <span className="flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/85 ring-1 ring-white/10">
                            <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[15.5px] font-extrabold tracking-tight text-white">{d.name}</span>
                            <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">{d.solution}</span>
                          </span>
                        </span>

                        {/* stage status — aligned cells on desktop */}
                        {states.map((st, i) => (
                          <span key={STAGES[i].n} className="hidden lg:block">
                            <StageDot state={st} />
                          </span>
                        ))}

                        {/* compact status cluster on mobile */}
                        <span className="mt-2.5 flex items-center gap-2 lg:hidden">
                          {states.map((st, i) => (
                            <span key={STAGES[i].n} className="flex items-center gap-1">
                              <StageDot state={st} small />
                            </span>
                          ))}
                          <span className="ml-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/35">
                            {states.filter((s) => s === "done").length}/4 delivered
                          </span>
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-6 sm:px-6">
                      <div className="grid gap-5 border-l border-white/10 pl-4 sm:grid-cols-3 sm:gap-6 lg:ml-[3.25rem]">
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: DONE }}>
                            01 · Named
                          </span>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{d.challenge}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: DONE }}>
                            02 · Applied
                          </span>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{d.platform}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: MEASURING }}>
                            03 · 04 · Measured &amp; Published
                          </span>
                          {d.published ? (
                            <div className="mt-1.5">
                              <p className="text-[13px] leading-relaxed text-white/65">{d.measured}</p>
                              <Badge
                                asChild
                                className="mt-2.5 border-0 px-3 py-1 text-[10.5px] font-bold"
                                style={{ background: `${DONE}26`, color: "#7fd6a4" }}
                              >
                                <a href={d.published.href} target="_blank" rel="noopener noreferrer">
                                  {d.published.label} <ArrowUpRight className="h-3 w-3" />
                                </a>
                              </Badge>
                            </div>
                          ) : (
                            <div className="mt-1.5 rounded-lg bg-[#14b8a6]/[0.05] px-2.5 py-2 ring-1 ring-inset ring-[#14b8a6]/15">
                              <PulseLine />
                              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#14b8a6]/80">
                                In measurement — publication to follow
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
