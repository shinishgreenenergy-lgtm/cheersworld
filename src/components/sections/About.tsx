"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const DIMENSION_ICONS: IconName[] = ["Activity", "BrainCircuit", "Users", "ShieldCheck", "Wallet"];
const DIMENSION_BACK: string[] = [
  "Recovery, rehabilitation & lasting vitality.",
  "Clarity, focus & emotional resilience.",
  "Connection, belonging & support.",
  "Safety & wellbeing in digital life.",
  "Security, balance & confidence.",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax: header text and the dimension grid drift at different speeds for depth.
  const yGlow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);
  const yHead = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const yGrid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  return (
    <section ref={ref} id="about" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-accent-3/[0.05] blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Editorial header: title left, copy right */}
        <motion.div style={{ y: yHead }} className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <div className="flex flex-col items-start gap-2.5">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">{about.eyebrow}</span>
                <span className="block h-[3px] w-10 rounded-full bg-accent" />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {about.title}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </motion.div>

        {/* Five dimensions as square tiles */}
        <motion.div style={{ y: yGrid }} className="mt-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">
                Five dimensions of wellness
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </Reveal>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {about.dimensions.map((d, i) => {
              const t = TINTS[i % TINTS.length];
              return (
                <Reveal key={d} delay={(i % 5) * 0.07}>
                  <div className="group/flip h-52 [perspective:1000px]">
                    <div className="relative h-full w-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)]">
                      {/* front */}
                      <div className="glass absolute inset-0 flex flex-col items-start overflow-hidden p-5 [backface-visibility:hidden]">
                        <span
                          className="pointer-events-none absolute right-3 top-1 font-display text-4xl font-black leading-none"
                          style={{ color: t.text, opacity: 0.14 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="grid h-12 w-12 place-items-center rounded-xl"
                          style={{ background: t.soft, color: t.text }}
                        >
                          <Icon name={DIMENSION_ICONS[i]} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                        </span>
                        <span className="mt-auto font-display text-lg font-extrabold tracking-tight text-ink">{d}</span>
                      </div>
                      {/* back */}
                      <div
                        className="absolute inset-0 flex flex-col items-start justify-between overflow-hidden p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
                        style={{ background: t.tile, boxShadow: `0 20px 45px -20px ${t.glow}` }}
                      >
                        <Icon name={DIMENSION_ICONS[i]} className="h-6 w-6" strokeWidth={1.7} />
                        <p className="text-[13px] font-medium leading-relaxed text-white/90">{DIMENSION_BACK[i]}</p>
                        <span className="font-display text-base font-extrabold">{d}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
