"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

const DIMENSION_ICONS: IconName[] = ["Activity", "BrainCircuit", "Users", "ShieldCheck", "Wallet"];
const DIMENSION_BACK: string[] = [
  "Recovery, rehabilitation & lasting vitality.",
  "Clarity, focus & emotional resilience.",
  "Connection, belonging & support.",
  "Safety & wellbeing in digital life.",
  "Security, balance & confidence.",
];

// Drifting coloured smoke that rises inside a dimension card.
function Smoke({ color }: { color: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const puffs = [
    { c: "left-3 h-16 w-16", delay: 0, d: 7 },
    { c: "right-4 h-20 w-20", delay: 1.6, d: 9 },
    { c: "left-1/3 h-14 w-14", delay: 3.2, d: 8 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {puffs.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute -bottom-6 rounded-full blur-2xl ${p.c}`}
          style={{ background: color }}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.55, 0], y: [0, -90], scale: [0.6, 1.45] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

// Peel-in like a sticker flapping down from its top edge.
const peel = {
  initial: { opacity: 0, rotateX: -82, y: -6 },
  whileInView: { opacity: 1, rotateX: 0, y: 0 },
  viewport: { once: false, amount: 0.5 },
};

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
      {/* grey-green band covering the whole section */}
      <div className="absolute inset-0 -z-20 bg-[#e7ebe6]" />
      {/* animated grey-green dot pattern on top of the grey */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(rgba(70,108,84,0.13)_1px,transparent_1px)] [background-size:24px_24px]"
        animate={reduce ? {} : { backgroundPosition: ["0px 0px", "24px 24px"] }}
        transition={reduce ? {} : { duration: 7, repeat: Infinity, ease: "linear" }}
      />
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
          <div className="[perspective:1100px]">
            <motion.div
              className="flex origin-top flex-col items-start gap-2.5"
              style={{ transformStyle: "preserve-3d" }}
              initial={reduce ? false : peel.initial}
              whileInView={peel.whileInView}
              viewport={peel.viewport}
              transition={{ duration: 0.6, ease }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">{about.eyebrow}</span>
              <span className="block h-[3px] w-10 rounded-full bg-accent" />
            </motion.div>
            <motion.h2
              className="mt-5 origin-top text-balance text-[clamp(2rem,4.6vw,3.75rem)] font-light leading-[1.1] tracking-tight text-ink"
              style={{ transformStyle: "preserve-3d" }}
              initial={reduce ? false : peel.initial}
              whileInView={peel.whileInView}
              viewport={peel.viewport}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {about.title}
            </motion.h2>
          </div>
          <div className="space-y-5 [perspective:1100px]">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="origin-top text-lg leading-relaxed text-muted"
                style={{ transformStyle: "preserve-3d" }}
                initial={reduce ? false : peel.initial}
                whileInView={peel.whileInView}
                viewport={peel.viewport}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.16, ease }}
              >
                {p}
              </motion.p>
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
                        <Smoke color={t.glow} />
                        <span
                          className="pointer-events-none absolute right-3 top-1 z-[1] font-display text-4xl font-black leading-none"
                          style={{ color: t.text, opacity: 0.14 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="relative z-[1] grid h-12 w-12 place-items-center rounded-xl"
                          style={{ background: t.soft, color: t.text }}
                        >
                          <Icon name={DIMENSION_ICONS[i]} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                        </span>
                        <span className="relative z-[1] mt-auto font-display text-lg font-extrabold tracking-tight text-ink">{d}</span>
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
