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
        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{body}</p>
      ) : (
        <span className="mt-1 inline-block rounded-full border border-dashed border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
          {soon ? "Coming Soon" : ""}
        </span>
      )}
    </div>
  );
}

export function Evidence() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="evidence" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-20 bg-[#e7ebe6]" />
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(rgba(70,108,84,0.13)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={evidence.eyebrow} title={evidence.title} subtitle={evidence.subtitle} />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {evidence.domains.map((d, i) => {
            const t = TINTS[i % TINTS.length];
            const isOpen = open === i;
            return (
              <Reveal key={d.name} delay={(i % 4) * 0.06}>
                <div className={cn("glass overflow-hidden rounded-2xl transition-shadow duration-300", isOpen && "shadow-[0_28px_56px_-28px_rgba(20,22,42,0.35)]")}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 10px 22px -10px ${t.glow}` }}>
                      <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[16px] font-extrabold tracking-tight text-ink">{d.name}</span>
                      <span className="block text-[12.5px] font-semibold" style={{ color: t.text }}>
                        {d.solution}
                      </span>
                    </span>
                    <ChevronDown className={cn("h-4.5 w-4.5 shrink-0 text-muted transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="grid gap-4 border-t border-line/70 px-6 py-5 sm:grid-cols-2">
                          <Step label="Challenge" body={d.challenge} tintText={t.text} />
                          <Step label="Platform" body={d.platform} tintText={t.text} />
                          <Step label="Outcome" body={d.outcome} tintText={t.text} soon />
                          <Step label="Evidence" body={d.proof} tintText={t.text} soon />
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
