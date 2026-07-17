"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Icon } from "../ui/Icon";
import { PhilosophyRing } from "../ui/PhilosophyRing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const STATUS = {
  done: { label: "Delivered", color: "#2e9e5b" },
  current: { label: "In progress", color: "#14b8a6" },
  future: { label: "Ahead", color: "rgba(255,255,255,0.45)" },
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
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: s.color }} />
          )}
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

  return (
    <section ref={ref} id="about" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere with parallax */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: yBlob1 }} className="absolute -left-20 top-4 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[130px]" />
        <motion.div style={{ y: yBlob2 }} className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-3/15 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* centered header */}
        <SectionHeading dark eyebrow={about.eyebrow} title={about.title} subtitle={about.paragraphs[0]} />

        {/* the loop + pillars, side by side */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1}>
            <motion.div style={{ y: yRing }}>
              <PhilosophyRing dark />
            </motion.div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              <p className="text-lg leading-relaxed text-white/70">{about.paragraphs[1]}</p>

              <Accordion type="single" collapsible defaultValue={about.pillars[0]?.title} className="mt-8">
                {about.pillars.map((p, i) => {
                  const t = TINTS[i % TINTS.length];
                  return (
                    <AccordionItem key={p.title} value={p.title} className="border-white/10">
                      <AccordionTrigger className="gap-3 py-4 hover:no-underline [&>svg]:text-white/40">
                        <span className="flex items-center gap-3.5">
                          <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                            style={{ background: t.tile, boxShadow: `0 12px 26px -14px ${t.glow}` }}
                          >
                            <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.7} />
                          </span>
                          <span className="font-display text-[16px] font-extrabold tracking-tight text-white">{p.title}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pl-[3.35rem]">
                        <p className="text-[14.5px] leading-relaxed text-white/65">{p.body}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </Reveal>
        </div>

        {/* the journey — horizontal milestone strip */}
        <Reveal className="mt-16">
          <Carousel opts={{ align: "start" }} className="w-full">
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-2">Our journey</span>
              <span className="h-px flex-1 bg-white/15" />
              <div className="flex items-center gap-2">
                <CarouselPrevious className="border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]" />
                <CarouselNext className="border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]" />
              </div>
            </div>

            <CarouselContent className="mt-6">
              {about.milestones.map((m) => (
                <CarouselItem key={m.title} className="basis-4/5 sm:basis-2/5 lg:basis-[31%]">
                  <article
                    className="flex h-full flex-col rounded-2xl border p-6"
                    style={{
                      borderColor: m.status === "current" ? "rgba(20,184,166,0.35)" : "rgba(255,255,255,0.1)",
                      background: m.status === "current" ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/40">{m.label}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <h3 className="mt-3 font-display text-[16px] font-extrabold tracking-tight text-white">{m.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{m.body}</p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
