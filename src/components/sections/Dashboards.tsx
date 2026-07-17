"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { HeartPulse, GraduationCap, HardHat, Truck, Landmark, FlaskConical, ChevronRight, type LucideIcon } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
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
  loading: () => <div className="h-[26rem] animate-pulse rounded-3xl border border-line bg-white/60" />,
});

export function Dashboards() {
  const [tab, setTab] = useState(dashboards[0].key);
  const reduce = useReducedMotion();
  const activeIndex = dashboards.findIndex((d) => d.key === tab);

  return (
    <section id="dashboards" className="flex min-h-[100svh] scroll-mt-24 flex-col justify-center py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={dashboardsIntro.eyebrow} title={dashboardsIntro.title} subtitle={dashboardsIntro.subtitle} />

        <Tabs
          value={tab}
          onValueChange={setTab}
          orientation="vertical"
          className="mt-14 gap-6 lg:flex-row lg:gap-8"
        >
          {/* role selector */}
          <TabsList className="h-auto w-full flex-col gap-2.5 bg-transparent p-0 lg:w-[20rem] lg:shrink-0">
            {dashboards.map((d, i) => {
              const t = TINTS[i % TINTS.length];
              const Icon = ROLE_ICON[d.key] ?? HeartPulse;
              return (
                <TabsTrigger
                  key={d.key}
                  value={d.key}
                  className="group h-auto w-full justify-start gap-3.5 rounded-2xl border border-line bg-white/60 p-3.5 text-left transition-all duration-200 after:hidden hover:border-accent/40 hover:bg-white data-[state=active]:shadow-[0_16px_36px_-24px_rgba(20,22,42,0.4)]"
                  style={{ ["--on-border" as string]: `${t.bar}66`, ["--on-bg" as string]: `${t.bar}0f` }}
                  data-tint
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 10px 22px -12px ${t.glow}` }}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{d.tab}</span>
                    <span className="block truncate text-[12px] font-normal text-muted">{d.audience}</span>
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-muted/40 transition-all group-hover:translate-x-0 group-data-[state=active]:translate-x-0 group-data-[state=active]:text-ink" />
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* live preview */}
          {dashboards.map((d, i) => (
            <TabsContent key={d.key} value={d.key} className="lg:flex-1">
              <Reveal>
                <motion.div
                  key={d.key}
                  initial={reduce ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DashboardFrame config={d} accent={TINTS[i % TINTS.length].bar} />
                </motion.div>
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>

        {/* active-tab tint applied via inline style on the selected trigger */}
        <style>{`
          [data-tint][data-state="active"] {
            border-color: var(--on-border) !important;
            background: var(--on-bg) !important;
          }
        `}</style>

        <span className="sr-only" aria-live="polite">
          Showing {dashboards[activeIndex]?.tab} dashboard
        </span>
      </div>
    </section>
  );
}
