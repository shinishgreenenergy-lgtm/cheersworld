"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { about } from "@/lib/content";
import { cn } from "@/lib/cn";

const DOT: Record<string, string> = {
  done: "bg-accent text-white",
  current: "bg-white text-accent ring-2 ring-accent",
  future: "border-2 border-dashed border-line bg-white text-muted",
};

// Horizontal journey on desktop (scrollable if cramped), vertical rail on mobile.
export function CompanyTimeline() {
  const reduce = useReducedMotion();
  return (
    <ol className="relative mt-10 flex snap-x gap-4 overflow-x-auto pb-4 max-lg:flex-col max-lg:overflow-visible lg:gap-0" aria-label="Company timeline">
      {/* connecting line (desktop) */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-[13px] hidden h-[2px] w-full origin-left bg-[linear-gradient(90deg,#2e9e5b_65%,#e8e8f0_85%)] lg:block"
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {about.milestones.map((m, i) => (
        <motion.li
          key={m.title}
          className="relative flex min-w-[11rem] flex-1 snap-start gap-4 lg:flex-col lg:gap-0 lg:pr-5"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={cn("z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full", DOT[m.status])}>
            {m.status === "done" ? (
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            ) : m.status === "current" ? (
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
            )}
          </span>
          {/* vertical connector on mobile */}
          {i < about.milestones.length - 1 && (
            <span aria-hidden className="absolute left-[13px] top-8 h-[calc(100%-16px)] w-[2px] bg-line lg:hidden" />
          )}
          <div className="pb-6 lg:mt-4 lg:pb-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">{m.label}</span>
            <h3 className="mt-1 font-display text-[15px] font-extrabold tracking-tight text-ink">{m.title}</h3>
            <p className="mt-1 max-w-[15rem] text-[13px] leading-relaxed text-muted">{m.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
