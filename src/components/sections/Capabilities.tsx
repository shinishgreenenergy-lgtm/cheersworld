"use client";

import { motion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { capabilities } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-3 py-6 sm:px-5">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#181b24_0%,#101219_100%)] px-5 py-16 sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-14">
        {/* faint lime glow + grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-64 w-[42rem] max-w-[90%] -translate-x-1/2 rounded-full bg-accent-2/10 blur-[120px]" />
          <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
        </div>

        {/* heading with lime marker highlight */}
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-extrabold leading-[1.08] tracking-tight text-white">
            {capabilities.heading.pre}{" "}
            <span className="relative inline-block whitespace-nowrap rounded-2xl bg-accent-2 px-3 py-0.5 text-ink">
              {capabilities.heading.highlight}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-white/55">
            {capabilities.subhead}
          </p>
        </Reveal>

        {/* feature cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease }}
                className="group flex h-full min-h-[19rem] flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent-2/40 hover:bg-white/[0.05] sm:min-h-[22rem]"
              >
                {/* icon circle(s) */}
                <div className="flex -space-x-3">
                  {c.icons.map((name, k) => (
                    <span
                      key={name}
                      className={
                        "grid h-12 w-12 place-items-center rounded-full border ring-4 ring-[#141721] " +
                        (k === 0
                          ? "border-transparent bg-accent-2 text-ink"
                          : "border-white/10 bg-white/[0.06] text-accent-2")
                      }
                    >
                      <Icon name={name} className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                  ))}
                </div>

                {/* title + body pinned to the bottom */}
                <div className="mt-auto pt-10">
                  <h3 className="whitespace-pre-line font-display text-[1.6rem] font-extrabold leading-[1.05] tracking-tight text-white">
                    {c.title}
                  </h3>
                  <div className="my-4 border-t border-dotted border-white/20" />
                  <p className="text-[13.5px] leading-relaxed text-white/55">{c.body}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
