"use client";

import { useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { HeartPulse, GraduationCap, HardHat, Truck, Landmark, FlaskConical, ChevronRight, type LucideIcon } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { dashboards, dashboardsIntro } from "@/lib/content";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

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
  loading: () => <div className="h-[26rem] animate-pulse rounded-3xl border border-line bg-white/60" />,
});

export function Dashboards() {
  const [tab, setTab] = useState(0);

  return (
    <section id="dashboards" className="flex min-h-[100svh] scroll-mt-24 flex-col justify-center py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={dashboardsIntro.eyebrow} title={dashboardsIntro.title} subtitle={dashboardsIntro.subtitle} />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[0.85fr_1.6fr]">
          {/* role selector */}
          <Reveal>
            <div role="tablist" aria-label="Dashboard roles" className="flex flex-col gap-2.5">
              {dashboards.map((d, i) => {
                const t = TINTS[i % TINTS.length];
                const Icon = ROLE_ICON[d.key] ?? HeartPulse;
                const on = i === tab;
                return (
                  <button
                    key={d.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(i)}
                    style={on ? ({ borderColor: `${t.bar}66`, background: `${t.bar}0f` } as CSSProperties) : undefined}
                    className={cn(
                      "group flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-200",
                      on ? "shadow-[0_16px_36px_-24px_rgba(20,22,42,0.4)]" : "border-line bg-white/60 hover:border-accent/40 hover:bg-white",
                    )}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 10px 22px -12px ${t.glow}` }}>
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{d.tab}</span>
                      <span className="block truncate text-[12px] text-muted">{d.audience}</span>
                    </span>
                    <ChevronRight className={cn("ml-auto h-4 w-4 shrink-0 transition-all", on ? "translate-x-0 text-ink" : "-translate-x-1 text-muted/40 group-hover:translate-x-0")} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* live preview */}
          <Reveal delay={0.1}>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dashboards[tab].key}
                  initial={{ opacity: 0, y: 16, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.99 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DashboardFrame config={dashboards[tab]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
