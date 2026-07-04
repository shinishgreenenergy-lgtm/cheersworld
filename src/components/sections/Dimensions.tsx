"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { dimensions, dimensionsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

const FIELDS = [
  { key: "definition", label: "What it is" },
  { key: "why", label: "Why it matters" },
  { key: "assessment", label: "How the AI assesses it" },
  { key: "intervention", label: "How the platform intervenes" },
] as const;

export function Dimensions() {
  const [active, setActive] = useState(0);
  const d = dimensions[active];
  const t = TINTS[active % TINTS.length];

  return (
    <section id="dimensions" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading {...dimensionsIntro} />

        <Reveal className="mt-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            {/* selector rail */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Wellbeing dimensions">
              {dimensions.map((dim, i) => {
                const ti = TINTS[i % TINTS.length];
                const selected = i === active;
                return (
                  <button
                    key={dim.name}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
                      selected ? "glass shadow-[0_16px_36px_-20px_rgba(20,22,42,0.4)]" : "border-transparent hover:bg-white/50",
                    )}
                    style={selected ? { borderColor: ti.bar } : undefined}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: ti.soft, color: ti.text }}>
                      <Icon name={dim.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{dim.name}</span>
                      <span className="hidden text-[12px] text-muted lg:block">{dim.definition.split("—")[0]}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* detail panel */}
            <div className="relative min-h-[26rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.name}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="glass h-full overflow-hidden rounded-3xl p-7 sm:p-9"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.key}>
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: t.text }}>
                          {f.label}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{d[f.key]}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line/70 pt-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Solutions:</span>
                    {d.solutions.map((s) => (
                      <Link key={s} href="#solutions" className="rounded-full px-3 py-1 text-[12px] font-bold transition-transform hover:scale-105" style={{ background: t.soft, color: t.text }}>
                        {s}
                      </Link>
                    ))}
                    <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
                    {d.links.map((l) =>
                      l.href ? (
                        <Link key={l.label} href={l.href} className="text-[12px] font-bold text-muted underline-offset-2 hover:text-ink hover:underline">
                          {l.label} →
                        </Link>
                      ) : (
                        <span key={l.label} className="text-[12px] font-medium text-muted/60">{l.label} · Soon</span>
                      ),
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
