"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { dimensions, dimensionsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

const FIELDS = [
  { key: "why", label: "Why it matters" },
  { key: "assessment", label: "How the AI assesses it" },
  { key: "intervention", label: "How the platform intervenes" },
] as const;

export function Dimensions() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="dimensions" className="relative isolate scroll-mt-24 overflow-hidden bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading {...dimensionsIntro} />

        {/* colour-coded accordion — each dimension owns its own background colour */}
        <div className="mt-14 flex flex-col gap-3 lg:h-[30rem] lg:flex-row">
          {dimensions.map((dim, i) => {
            const t = TINTS[i % TINTS.length];
            const on = i === active;
            return (
              <motion.div
                key={dim.name}
                onClick={() => setActive(i)}
                animate={{ flexGrow: on ? 2.6 : 1 }}
                transition={{ duration: 0.6, ease }}
                style={{
                  flexBasis: 0,
                  background: `linear-gradient(158deg, ${t.bar}${on ? "3a" : "24"} 0%, ${t.bar}0d 100%)`,
                  borderColor: on ? `${t.bar}80` : `${t.bar}33`,
                }}
                className={
                  "group relative flex min-h-[13rem] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.75rem] border transition-shadow duration-300 " +
                  (on ? "shadow-[0_30px_70px_-34px_rgba(20,22,42,0.4)]" : "")
                }
              >
                {/* soft colour orb top-right */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                  style={{ background: `${t.bar}33` }}
                />
                <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />

                {/* content */}
                <div className="relative flex h-full flex-col p-5 sm:p-6">
                  <motion.span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{ background: t.tile, boxShadow: `0 14px 30px -14px ${t.glow}` }}
                    animate={reduce ? {} : { y: on ? [0, -5, 0] : 0 }}
                    transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon name={dim.icon} className="h-6 w-6" strokeWidth={1.7} />
                  </motion.span>

                  <h3 className="mt-auto font-display text-xl font-extrabold tracking-tight text-ink">{dim.name}</h3>

                  <AnimatePresence mode="wait">
                    {on ? (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease, delay: 0.12 }}
                        className="mt-3"
                      >
                        <p className="max-w-xl text-[14px] leading-relaxed text-ink-soft">{dim.definition}</p>
                        <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {FIELDS.map((f) => (
                            <div key={f.key}>
                              <h4 className="text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: t.text }}>
                                {f.label}
                              </h4>
                              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft/80">{dim[f.key]}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-1.5">
                          {dim.solutions.map((s) => (
                            <Link
                              key={s}
                              href="#solutions"
                              onClick={(e) => e.stopPropagation()}
                              className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold backdrop-blur transition-transform hover:scale-105"
                              style={{ color: t.text }}
                            >
                              {s}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-[12.5px] leading-snug text-ink-soft/75"
                      >
                        {dim.definition.split("—")[0]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
