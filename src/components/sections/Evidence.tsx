"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { evidence } from "@/lib/content";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

function Step({ label, body, tintText, soon }: { label: string; body?: string; tintText: string; soon?: boolean }) {
  return (
    <div>
      <h4 className="text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: tintText }}>
        {label}
      </h4>
      {body ? (
        <p className="mt-1 text-[13.5px] leading-relaxed text-white/70">{body}</p>
      ) : (
        <span className="mt-1 inline-block rounded-full border border-dashed border-white/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/50">
          {soon ? "Coming Soon" : ""}
        </span>
      )}
    </div>
  );
}

export function Evidence() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="evidence" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={evidence.eyebrow} title={evidence.title} subtitle={evidence.subtitle} />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {evidence.domains.map((d, i) => {
            const t = TINTS[i % TINTS.length];
            const isOpen = open === i;
            return (
              <Reveal key={d.name} delay={(i % 4) * 0.06}>
                <div className={cn("overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-shadow duration-300", isOpen && "shadow-[0_28px_56px_-28px_rgba(0,0,0,0.5)]")}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 10px 22px -10px ${t.glow}` }}>
                      <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[16px] font-extrabold tracking-tight text-white">{d.name}</span>
                      <span className="block text-[12.5px] font-semibold" style={{ color: t.bar }}>
                        {d.solution}
                      </span>
                    </span>
                    <ChevronDown className={cn("h-4.5 w-4.5 shrink-0 text-white/50 transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="grid gap-4 border-t border-white/10 px-6 py-5 sm:grid-cols-2">
                          <Step label="Challenge" body={d.challenge} tintText={t.bar} />
                          <Step label="Platform" body={d.platform} tintText={t.bar} />
                          <Step label="Outcome" body={d.outcome} tintText={t.bar} soon />
                          <Step label="Evidence" body={d.proof} tintText={t.bar} soon />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
