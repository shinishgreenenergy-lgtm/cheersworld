"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { capabilities, trust } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Capabilities() {
  // Partner names as white text on the banner — reliable regardless of logo backgrounds.
  const partners = trust.groups
    .flatMap((g) => g.items)
    .slice(0, 5)
    .map((p) => p.name);

  return (
    <section id="capabilities" className="scroll-mt-24 px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-[86rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_100px_-50px_rgba(20,22,42,0.4)] sm:rounded-[2.5rem]">
        {/* green gradient logo banner */}
        <div className="relative overflow-hidden bg-[linear-gradient(115deg,#2e8b57_0%,#2e9e5b_45%,#14b8a6_100%)] px-6 py-7 sm:px-10">
          {/* diagonal sheen */}
          <div aria-hidden className="pointer-events-none absolute -inset-y-8 left-[-10%] w-1/3 -rotate-12 bg-white/10 blur-md" />
          <p className="relative text-center text-[13px] font-semibold text-white/90">
            Advancing wellbeing with leading institutions
          </p>
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
            {partners.map((n, i) => (
              <div key={n} className="flex items-center gap-x-5 sm:gap-x-7">
                {i > 0 && <span aria-hidden className="h-3.5 w-px bg-white/30" />}
                <span className="text-[14px] font-bold tracking-tight text-white/95 sm:text-[15px]">{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* goals */}
        <div className="px-6 py-16 text-center sm:px-12 sm:py-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-line bg-canvas px-4 py-1.5 text-[13px] font-semibold text-ink shadow-sm">
              Our Goals
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
              Empowering people to thrive with human intelligence.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              {capabilities.subhead}
            </p>
          </Reveal>

          {/* frosted-glass feature cards with glossy green orb icons */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="group h-full rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(233,244,238,0.55))] p-6 text-left shadow-[0_20px_50px_-30px_rgba(20,22,42,0.4)] backdrop-blur-md"
                >
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full text-white"
                    style={{
                      background: "radial-gradient(circle at 34% 26%, #7fe6a6 0%, #2e9e5b 52%, #1c6e3f 100%)",
                      boxShadow:
                        "0 12px 26px -10px rgba(46,158,91,0.65), inset 0 2px 5px rgba(255,255,255,0.55), inset 0 -4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Icon name={c.icons[0]} className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 whitespace-pre-line font-display text-lg font-extrabold leading-tight tracking-tight text-ink">
                    {c.title.replace("\n", " ")}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link
              href="#solutions"
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
