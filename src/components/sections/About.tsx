"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { CompanyTimeline } from "../ui/CompanyTimeline";
import { PhilosophyRing } from "../ui/PhilosophyRing";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  const words = about.title.split(" ");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-70, 70]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const yRing = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <section ref={ref} id="about" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere with parallax */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: yBlob1 }} className="absolute -left-20 top-4 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[130px]" />
        <motion.div style={{ y: yBlob2 }} className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-3/15 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* centered header */}
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {about.eyebrow}
            </span>

            <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              {words.map((w, i) => (
                <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={i === 0 ? "inline-block" : "text-gradient inline-block"}
                    initial={{ y: "115%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: i * 0.09, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h2>

            <p className="text-[15px] leading-relaxed text-white/60">{about.paragraphs[0]}</p>
          </div>
        </Reveal>

        {/* animated continuous-loop centerpiece (parallax) + supporting copy */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1}>
            <motion.div style={{ y: yRing }}>
              <PhilosophyRing dark />
            </motion.div>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-lg leading-relaxed text-white/70">{about.paragraphs[1]}</p>
          </Reveal>
        </div>

        {/* Mission / Vision / Philosophy — dark glass, shining */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="beam-border relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7"
                  style={{ "--beam-color": t.bar } as CSSProperties}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 14px 30px -16px ${t.glow}` }}>
                    <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Company timeline */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-2">Our journey</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </Reveal>
        <CompanyTimeline dark />
      </div>
    </section>
  );
}
