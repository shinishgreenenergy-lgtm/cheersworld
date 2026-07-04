"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RefreshCw, ChevronRight } from "lucide-react";
import { hero } from "@/lib/content";
import { cn } from "@/lib/cn";

// The signature Cheers Wisdom framework as a living loop: the active step
// pulses and advances on a timer; reduced-motion renders it static.
export function PhilosophyLoop({ className }: { className?: string }) {
  const steps = hero.philosophy;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 1500);
    return () => clearInterval(id);
  }, [reduce, steps.length]);

  return (
    <div className={className}>
      <ol aria-label="Platform philosophy: observe, understand, predict, intervene, measure, improve" className="flex flex-wrap items-center gap-y-2.5">
        {steps.map((s, i) => {
          const isActive = !reduce && i === active;
          return (
            <li key={s} className="flex items-center">
              <motion.span
                animate={{ scale: isActive ? 1.06 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold tracking-tight transition-colors duration-300",
                  isActive
                    ? "border-accent/50 bg-accent text-white shadow-[0_10px_24px_-12px_rgba(46,158,91,0.65)]"
                    : "border-line bg-white/70 text-ink-soft",
                )}
              >
                {s}
              </motion.span>
              {i < steps.length - 1 ? (
                <ChevronRight className="mx-0.5 h-3.5 w-3.5 text-muted" aria-hidden />
              ) : (
                <span className="ml-1.5 grid h-6 w-6 place-items-center rounded-full border border-line bg-white/70" aria-hidden>
                  <RefreshCw className={cn("h-3 w-3 text-accent", !reduce && "animate-[spin_6s_linear_infinite]")} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
