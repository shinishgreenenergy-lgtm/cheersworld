"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DomainConstellation } from "../ui/DomainConstellation";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-white px-4 pb-10 pt-28 sm:px-8"
    >
      <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        {/* left — copy */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Human Intelligence Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease }}
            className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold leading-[1.03] tracking-tight text-ink"
          >
            One platform.
            <br />
            <span className="text-gradient">Every human domain.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-6 max-w-md text-[16px] leading-relaxed text-muted"
          >
            Cheers Wisdom continuously observes, understands and predicts human behaviour — advancing
            wellbeing across healthcare, education, industry and government.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#solutions"
              className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#5bb873,#2e8b57)] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(46,158,91,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center rounded-full border border-line bg-white/60 px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-white"
            >
              How it works
            </Link>
          </motion.div>
        </div>

        {/* right — constellation, no card, sitting on the page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative order-1 lg:order-2"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(46,158,91,0.12), rgba(245,158,11,0.06) 55%, transparent 70%)" }}
          />
          <DomainConstellation />
        </motion.div>
      </div>
    </section>
  );
}
