"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrainCircuit, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { solutions } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const DIGITAL_SHOTS = [
  { src: "/cheers-digital/home.jpg", caption: "Personalised home" },
  { src: "/cheers-digital/screening.jpg", caption: "Guided screening" },
  { src: "/cheers-digital/journal-summary.jpg", caption: "Journal & interventions" },
  { src: "/cheers-digital/reports.jpg", caption: "Weekly impact reports" },
  { src: "/cheers-digital/observations.jpg", caption: "Parent & student reports" },
];

const HEALTH_SHOTS = [
  { src: "/cheers-health/portal.jpg", caption: "Choose your portal" },
  { src: "/cheers-health/welcome.jpg", caption: "Guided onboarding" },
  { src: "/cheers-health/home.jpg", caption: "Your health home" },
  { src: "/cheers-health/mood.jpg", caption: "Daily check-in" },
  { src: "/cheers-health/appointment.jpg", caption: "Book appointments" },
  { src: "/cheers-health/reports.jpg", caption: "Clinical reports" },
];

function AppShowcase({
  eyebrow,
  title,
  subtitle,
  shots,
  accent,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  shots: { src: string; caption: string }[];
  accent: string;
  href: string;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal className="mt-20">
      {/* ruled ledger header — no card, the rule carries the structure */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
          {eyebrow}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="font-mono text-[11px] font-semibold tabular-nums text-muted/70">
          {String(shots.length).padStart(2, "0")} screens
        </span>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h3 className="max-w-2xl font-serif text-2xl font-medium leading-[1.18] tracking-[-0.01em] text-ink sm:text-3xl [font-variation-settings:'opsz'_40]">
          {title}
        </h3>
        <div className="lg:pb-1 lg:text-right">
          <p className="max-w-xl text-[14px] leading-relaxed text-muted lg:ml-auto">{subtitle}</p>
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            style={{ color: accent }}
          >
            Explore {eyebrow} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group shrink-0 snap-center"
          >
            <div className="relative w-[180px] rounded-[2rem] border border-ink/10 bg-ink p-1.5 shadow-[0_30px_60px_-30px_rgba(20,22,42,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg] group-hover:scale-[1.03] sm:w-[196px]">
              <span aria-hidden className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={`${title} — ${shot.caption}`} loading="lazy" className="w-full rounded-[1.6rem] object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-[12.5px] font-semibold text-ink-soft">{shot.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </Reveal>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  return (
    <section id="solutions" className="min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={solutions.eyebrow} title={solutions.title} subtitle={solutions.subtitle} />

        {/* hub node */}
        <Reveal className="mt-14">
          <div className="flex flex-col items-center">
            <div className="glass relative flex items-center gap-3 rounded-full px-7 py-4 shadow-[0_24px_50px_-24px_rgba(46,158,91,0.5)]">
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-accent/40"
                  animate={{ scale: [1, 1.15], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white">
                <BrainCircuit className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">{solutions.hub}</span>
            </div>
            {/* connector stem down to the grid */}
            <span aria-hidden className="mt-0 h-10 w-[2px] bg-[linear-gradient(180deg,#2e9e5b,transparent)]" />
          </div>
        </Reveal>

        {/* spoke cards */}
        <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-7">
          {solutions.items.map((s, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={s.name} delay={(i % 7) * 0.06}>
                <div className="group relative flex h-full flex-col">
                  {/* per-card connector thread */}
                  <span aria-hidden className="mx-auto block h-6 w-[2px] bg-[linear-gradient(180deg,transparent,_var(--thread))]" style={{ "--thread": t.bar } as CSSProperties} />
                  <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl px-5 py-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-26px_rgba(11,11,20,0.34)]">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                    <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}>
                      <Icon name={s.icon} className="h-5.5 w-5.5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 font-display text-[15px] font-extrabold leading-tight tracking-tight text-ink">{s.name}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{s.tagline}</p>
                    <span className="mt-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ background: t.soft, color: t.text }}>
                      {s.domain}
                    </span>
                    <div className="mt-auto flex flex-wrap gap-x-2 gap-y-0.5 pt-4 text-[10.5px]">
                      {s.facets.map((f) =>
                        f.href ? (
                          <Link key={f.label} href={f.href} className="font-bold underline-offset-2 hover:underline" style={{ color: t.text }}>
                            {f.label}
                          </Link>
                        ) : (
                          <span key={f.label} className="font-medium text-muted/60">{f.label}</span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Real apps in action */}
        <AppShowcase
          eyebrow="Cheers Health"
          title="Clinical recovery & patient wellbeing — in your pocket"
          subtitle="Patient, doctor and hospital portals, daily check-ins, appointments and clinical reports — powered by the same platform core."
          shots={HEALTH_SHOTS}
          accent="#0f8b80"
          href="/products/cheers-health"
        />
        <AppShowcase
          eyebrow="Cheers Digital"
          title="Cyber safety & digital wellbeing — in your pocket"
          subtitle="Daily check-ins, guided screening, journal interventions and clear reports for parents, students and educators — powered by the same platform core."
          shots={DIGITAL_SHOTS}
          accent="#2e8b57"
          href="/products/cheers-digital"
        />
      </div>
    </section>
  );
}
