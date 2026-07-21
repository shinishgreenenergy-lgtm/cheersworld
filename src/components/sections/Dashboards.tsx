"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HeartPulse, GraduationCap, HardHat, Truck, Landmark, FlaskConical, type LucideIcon } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { dashboards, dashboardsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const ROLE_ICON: Record<string, LucideIcon> = {
  hospital: HeartPulse,
  school: GraduationCap,
  mining: HardHat,
  fleet: Truck,
  government: Landmark,
  research: FlaskConical,
};

// Code-split: the mock UI only loads when this section approaches the viewport.
const DashboardFrame = dynamic(() => import("../dashboards/DashboardFrame").then((m) => m.DashboardFrame), {
  loading: () => <div className="h-[26rem] animate-pulse rounded-2xl bg-ink/5" />,
});

export function Dashboards() {
  const [tab, setTab] = useState(dashboards[0].key);
  const reduce = useReducedMotion();
  const activeIndex = dashboards.findIndex((d) => d.key === tab);
  const active = dashboards[activeIndex] ?? dashboards[0];
  const activeTint = TINTS[activeIndex % TINTS.length];

  return (
    <section id="dashboards" className="flex min-h-[100svh] scroll-mt-24 flex-col justify-center py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* editorial header */}
        <Reveal>
          <div>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{dashboardsIntro.eyebrow}</span>
              <span className="block h-px w-10 bg-accent" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
                {dashboardsIntro.title}
              </h2>
              <p className="max-w-md text-[14.5px] leading-relaxed text-muted lg:pb-1.5">{dashboardsIntro.subtitle}</p>
            </div>
          </div>
        </Reveal>

        {/* the command centre itself — one app shell, six seats at the console */}
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-ink/15 bg-[#12161d] shadow-[0_60px_120px_-50px_rgba(20,22,42,0.55)]">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              <span className="ml-3 text-[12px] font-bold text-white/85">Cheers Command Centre</span>
              <span className="ml-auto rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/50">
                Illustrative preview
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* role nav — the people this is built for */}
              <nav
                aria-label="Dashboard roles"
                className="flex gap-1.5 overflow-x-auto border-b border-white/10 p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:w-[16.5rem] lg:shrink-0 lg:flex-col lg:justify-start lg:border-b-0 lg:border-r lg:p-3"
              >
                {dashboards.map((d, i) => {
                  const t = TINTS[i % TINTS.length];
                  const Icon = ROLE_ICON[d.key] ?? HeartPulse;
                  const on = d.key === tab;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setTab(d.key)}
                      aria-pressed={on}
                      className="relative flex flex-none items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.06] lg:w-full"
                      style={on ? { background: "rgba(255,255,255,0.08)" } : undefined}
                    >
                      {on && (
                        <span aria-hidden className="absolute left-0 top-1/2 hidden h-6 w-[3px] -translate-y-1/2 rounded-full lg:block" style={{ background: t.bar }} />
                      )}
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white"
                        style={on ? { background: t.tile, boxShadow: `0 10px 22px -12px ${t.glow}` } : { background: "rgba(255,255,255,0.08)" }}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className={`block font-display text-[13.5px] font-extrabold tracking-tight ${on ? "text-white" : "text-white/75"}`}>
                          {d.tab}
                        </span>
                        <span className="hidden max-w-[10.5rem] truncate text-[10.5px] text-white/40 sm:block">{d.audience}</span>
                      </span>
                    </button>
                  );
                })}
                <p className="mt-auto hidden px-3 pb-1 pt-4 text-[10.5px] leading-relaxed text-white/35 lg:block">
                  Role-specific command centres, configured per organisation.
                </p>
              </nav>

              {/* main pane */}
              <div className="min-w-0 flex-1 bg-canvas">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DashboardFrame config={active} accent={activeTint.bar} bare />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <span className="sr-only" aria-live="polite">
          Showing {active.tab} dashboard
        </span>
      </div>
    </section>
  );
}
