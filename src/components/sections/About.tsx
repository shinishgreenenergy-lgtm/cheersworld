"use client";

import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { CompanyTimeline } from "../ui/CompanyTimeline";
import { PhilosophyRing } from "../ui/PhilosophyRing";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";
import type { CSSProperties } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  const words = about.title.split(" ");

  return (
    <section id="about" className="scroll-mt-24 px-3 py-6 sm:px-5">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(180deg,#ffffff_0%,#eef2ef_100%)] px-5 py-16 sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-14">
        {/* atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-4 h-[24rem] w-[24rem] rounded-full bg-accent/[0.07] blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-[22rem] w-[22rem] rounded-full bg-accent-3/[0.06] blur-[120px]" />
          <motion.div
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(70,108,84,0.10)_1px,transparent_1px)] [background-size:24px_24px]"
            animate={{ backgroundPosition: ["0px 0px", "24px 24px"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* centered header — matches the other sections' top format */}
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {about.eyebrow}
            </span>

            {/* per-word reveal headline */}
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
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

            <p className="text-[15px] leading-relaxed text-muted">{about.paragraphs[0]}</p>
          </div>
        </Reveal>

        {/* animated continuous-loop centerpiece + supporting copy */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1}>
            <PhilosophyRing />
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-lg leading-relaxed text-muted">{about.paragraphs[1]}</p>
          </Reveal>
        </div>

        {/* Mission / Vision / Philosophy — glass, shining */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="glass beam-border relative h-full overflow-hidden rounded-2xl p-7"
                  style={{ "--beam-color": t.bar } as CSSProperties}
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: t.soft, color: t.text }}>
                    <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                </motion.div>
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
      </div>
    </section>
  );
}
