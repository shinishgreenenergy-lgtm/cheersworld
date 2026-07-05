"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ScienceWheel } from "../ui/ScienceWheel";
import { science } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Science() {
  const [active, setActive] = useState(0);
  const d = science.disciplines[active];
  const t = TINTS[(active * 5) % TINTS.length];

  return (
    <section id="science" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={science.eyebrow} title={science.title} subtitle={science.subtitle} />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <ScienceWheel active={active} onSelect={setActive} />
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{d.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{d.blurb}</p>
                <div className="mt-6 rounded-2xl p-5" style={{ background: t.soft }}>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: t.text }}>
                    In the platform
                  </span>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{d.use}</p>
                </div>
                <p className="mt-5 text-[12px] font-medium text-muted/70">
                  Dedicated science pages · <span className="font-bold uppercase tracking-[0.08em]">Soon</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
