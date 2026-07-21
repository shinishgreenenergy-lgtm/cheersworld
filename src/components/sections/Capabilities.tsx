"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { capabilities } from "@/lib/content";

// The four capabilities are a real pipeline — each carries its verb and order.
const STAGE_VERBS = ["Sense", "Understand", "Predict", "Act"];

export function Capabilities() {
  return (
    <section id="capabilities" className="min-h-[100svh] flex flex-col justify-center scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* the goal, then the engine as a numbered ledger */}
          <Reveal>
            <div>
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Our Goals</span>
                <span className="block h-px w-10 bg-accent" />
              </div>
              <h2 className="mt-6 max-w-xl font-serif text-[clamp(1.9rem,4.2vw,3.1rem)] font-medium leading-[1.12] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
                Empowering people to <em className="not-italic text-accent">thrive</em> with human intelligence.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{capabilities.subhead}</p>

              <div className="mt-10">
                {capabilities.cards.map((c, i) => (
                  <div
                    key={c.title}
                    className="group flex gap-5 border-t border-line py-5 transition-colors last:border-b hover:bg-accent/[0.04] sm:gap-6"
                  >
                    <span className="pt-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-[16.5px] font-extrabold tracking-tight text-ink">
                          {c.title.replace("\n", " ")}
                        </h3>
                        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted/70">
                          {STAGE_VERBS[i] ?? ""}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-lg text-[13.5px] leading-relaxed text-muted">{c.body}</p>
                    </div>
                    <span className="hidden self-center text-accent/70 sm:block">
                      <Icon name={c.icons[0]} className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/#solutions"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                See the solutions it powers
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* the product doing the work — real app, real greeting */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(160deg,rgba(46,158,91,0.14),rgba(20,184,166,0.10))] px-8 py-10 sm:px-12 sm:py-14">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
                <div className="absolute inset-0 bg-noise opacity-[0.25] mix-blend-overlay" />
              </div>
              <div className="relative mx-auto max-w-[19rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cheers-health/home.jpg"
                  alt="Cheers Health companion greeting a patient with a daily check-in"
                  loading="lazy"
                  className="w-full rounded-[2rem] border-[6px] border-ink/90 object-cover shadow-[0_50px_90px_-40px_rgba(20,22,42,0.55)]"
                />
                {/* the moment that matters — a check-in, answered */}
                <div className="absolute -left-10 bottom-10 hidden rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_24px_50px_-24px_rgba(20,22,42,0.45)] backdrop-blur sm:block">
                  <p className="font-display text-[13px] font-extrabold text-ink">“How are you today?”</p>
                  <p className="mt-0.5 text-[11.5px] text-muted">Every day, for every person in recovery</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
