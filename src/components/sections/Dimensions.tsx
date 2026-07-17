"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { dimensions, dimensionsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

const FIELDS = [
  { key: "why", label: "Why it matters" },
  { key: "assessment", label: "How the AI assesses it" },
  { key: "intervention", label: "How the platform intervenes" },
] as const;

export function Dimensions() {
  const [active, setActive] = useState(dimensions[0].name);
  const reduce = useReducedMotion();

  return (
    <section id="dimensions" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-canvas py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading {...dimensionsIntro} />

        <Tabs value={active} onValueChange={setActive} className="mt-12">
          {/* segmented control — the five dimensions of one person */}
          <TabsList
            variant="line"
            className="mx-auto h-auto w-full max-w-full justify-start gap-1.5 overflow-x-auto rounded-full border border-line bg-white/70 p-1.5 backdrop-blur sm:w-fit sm:justify-center"
          >
            {dimensions.map((dim, i) => {
              const t = TINTS[i % TINTS.length];
              const on = active === dim.name;
              return (
                <TabsTrigger
                  key={dim.name}
                  value={dim.name}
                  className="h-auto flex-none gap-2 rounded-full border-0 px-3.5 py-2 text-[13px] font-bold text-ink-soft transition-colors duration-300 after:hidden sm:px-4"
                  style={on ? { background: t.tile, color: "#fff", boxShadow: `0 12px 26px -12px ${t.glow}` } : undefined}
                >
                  <Icon name={dim.icon} className="h-4 w-4" strokeWidth={2} />
                  {dim.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* the stage — active dimension paints the panel */}
          {dimensions.map((dim, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <TabsContent key={dim.name} value={dim.name} className="mt-8">
                <motion.article
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease }}
                  className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-10 lg:p-12"
                  style={{
                    borderColor: `${t.bar}4d`,
                    background: `linear-gradient(150deg, ${t.bar}1c 0%, ${t.bar}08 48%, rgba(255,255,255,0.72) 100%)`,
                  }}
                >
                  {/* ghost watermark */}
                  <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 opacity-[0.07] sm:-right-4">
                    <Icon name={dim.icon} className="h-56 w-56 sm:h-72 sm:w-72" strokeWidth={1} style={{ color: t.text }} />
                  </div>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />

                  <div className="relative">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.text }}>
                      Dimension · {dim.name}
                    </span>
                    <h3 className="mt-4 max-w-3xl text-balance font-serif text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.16] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
                      {dim.definition}
                    </h3>

                    <div className="mt-9 grid gap-7 border-t pt-8 sm:grid-cols-3 sm:gap-9" style={{ borderColor: `${t.bar}30` }}>
                      {FIELDS.map((f, fi) => (
                        <motion.div
                          key={f.key}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, ease, delay: 0.12 + fi * 0.07 }}
                        >
                          <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: t.text }}>
                            {f.label}
                          </h4>
                          <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{dim[f.key]}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-9 flex flex-wrap items-center gap-2">
                      <span className="text-[12px] font-semibold text-muted">Delivered through</span>
                      {dim.solutions.map((s) => (
                        <Badge
                          key={s}
                          asChild
                          variant="outline"
                          className="border-transparent bg-white/80 px-3.5 py-1.5 text-[11.5px] font-bold shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                          style={{ color: t.text }}
                        >
                          <Link href="/#solutions">{s}</Link>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
