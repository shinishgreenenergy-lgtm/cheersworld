"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { CompanyTimeline } from "../ui/CompanyTimeline";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

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

        {/* Mission / Vision / Philosophy */}
        <motion.div style={{ y: yGrid }} className="mt-16">
          <div className="grid gap-5 md:grid-cols-3">
            {about.pillars.map((p, i) => {
              const t = TINTS[i % TINTS.length];
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="glass relative h-full overflow-hidden rounded-2xl p-7">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                    <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: t.soft, color: t.text }}>
                      <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Company timeline */}
          <Reveal className="mt-16">
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">Our journey</span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </Reveal>
          <CompanyTimeline />
        </motion.div>
      </div>
    </section>
  );
}
