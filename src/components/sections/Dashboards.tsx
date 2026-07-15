"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { dashboards, dashboardsIntro } from "@/lib/content";
import { cn } from "@/lib/cn";

// Code-split: the mock UI only loads when this section approaches the viewport.
const DashboardFrame = dynamic(() => import("../dashboards/DashboardFrame").then((m) => m.DashboardFrame), {
  loading: () => <div className="glass h-[26rem] animate-pulse rounded-3xl" />,
});

export function Dashboards() {
  const [tab, setTab] = useState(0);

  return (
    <section id="dashboards" className="min-h-[100svh] flex flex-col justify-center scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={dashboardsIntro.eyebrow} title={dashboardsIntro.title} subtitle={dashboardsIntro.subtitle} />

        <Reveal className="mt-12">
          <div role="tablist" aria-label="Dashboard previews" className="flex flex-wrap justify-center gap-2">
            {dashboards.map((d, i) => (
              <button
                key={d.key}
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn(
                  "rounded-full border px-4.5 py-2 text-[13px] font-bold tracking-tight transition-all duration-200",
                  i === tab
                    ? "border-accent/50 bg-accent text-white shadow-[0_12px_28px_-14px_rgba(46,158,91,0.6)]"
                    : "border-line bg-white/60 text-ink-soft hover:border-accent/40",
                )}
              >
                {d.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-10">
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
      </div>
    </section>
  );
}
