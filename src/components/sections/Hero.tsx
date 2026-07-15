"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DomainConstellation } from "../ui/DomainConstellation";

const ease = [0.19, 1, 0.22, 1] as const;

/* Masked line reveal — each headline line rises out of its own clip. */
function RevealLine({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Real credentials — the premium proof, no invented numbers. */
const PROOF: { label: string; detail: string; href?: string }[] = [
  { label: "JACC · 2025", detail: "Peer-reviewed clinical trial", href: "https://www.jacc.org/doi/abs/10.1016/j.jacc.2025.09.1117" },
  { label: "Patent IN 510420", detail: "Wisdom Network · granted" },
  { label: "NeuroTrackerX", detail: "Founding science" },
];

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-white px-4 pb-10 pt-28 sm:px-8"
    >
      <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-x-10 gap-y-12 lg:grid-cols-[0.86fr_1.14fr]">
        {/* left — copy */}
        <div className="order-2 lg:order-1">
          {/* overline: drawn rule + instrument label */}
          <div className="flex items-center gap-3">
            <motion.span
              aria-hidden
              className="h-px w-10 origin-left bg-accent"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            />
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
            >
              Human Intelligence Platform
            </motion.span>
          </div>

          <h1 className="mt-7 font-serif text-[clamp(2.7rem,5vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.012em] text-ink [font-variation-settings:'opsz'_72]">
            <RevealLine delay={0.15} reduce={reduce}>One platform.</RevealLine>
            <RevealLine delay={0.26} reduce={reduce}>
              Every <em className="italic text-accent [font-variation-settings:'opsz'_72,'SOFT'_60]">human</em> domain.
            </RevealLine>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-7 max-w-md text-[16.5px] leading-[1.75] text-muted"
          >
            Cheers Wisdom continuously observes, understands and predicts human behaviour — advancing
            wellbeing across healthcare, education, industry and government.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <Link
              href="#solutions"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#5bb873,#2e8b57)] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_18px_44px_-16px_rgba(46,158,91,0.6)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-18px_rgba(46,158,91,0.7)]"
            >
              {/* sheen sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-[130%] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
              />
              Explore the Platform
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#about"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink"
            >
              <span className="relative">
                How it works
                <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink/25 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-0" />
                <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform delay-150 duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          </motion.div>

          {/* proof strip — real credentials, instrument voice */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease }}
            className="mt-12 flex max-w-lg flex-wrap items-stretch gap-y-4 border-t border-line pt-6"
          >
            {PROOF.map((p, i) => {
              const body = (
                <>
                  <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/80">
                    {p.label}
                    {p.href && <ArrowUpRight className="mb-0.5 ml-1 inline h-3 w-3 text-muted transition-colors group-hover/proof:text-accent" />}
                  </dt>
                  <dd className="mt-1 text-[12px] leading-snug text-muted">{p.detail}</dd>
                </>
              );
              return (
                <div key={p.label} className={i > 0 ? "border-l border-line pl-5 pr-5 last:pr-0" : "pr-5"}>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="group/proof block">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </div>
              );
            })}
          </motion.dl>
        </div>

        {/* right — constellation, no card, sitting on the page */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
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
