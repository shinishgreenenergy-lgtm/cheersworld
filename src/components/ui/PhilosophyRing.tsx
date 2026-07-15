"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eye, Brain, TrendingUp, Zap, Activity, Sparkles, Infinity as Loop } from "lucide-react";
import { hero } from "@/lib/content";

const ICONS = [Eye, Brain, TrendingUp, Zap, Activity, Sparkles];

// The Observe → Understand → Predict → Intervene → Measure → Improve loop, drawn as a
// living ring: nodes sit around a circle, a light packet orbits, and each stage lights
// up in turn — the signature "continuous loop" the whole company runs on.
export function PhilosophyRing({ dark = false }: { dark?: boolean }) {
  const reduce = useReducedMotion();
  const steps = hero.philosophy;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((p) => (p + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, [steps.length, reduce]);

  const nodes = useMemo(
    () =>
      steps.map((label, i) => {
        const a = (-90 + i * (360 / steps.length)) * (Math.PI / 180);
        return { label, x: 50 + Math.cos(a) * 42, y: 50 + Math.sin(a) * 42 };
      }),
    [steps],
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* rotating dashed orbit */}
      <motion.div
        aria-hidden
        className="absolute inset-[9%] rounded-full border border-dashed border-accent/30"
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* orbiting light packet */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-[9%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_18px_4px_rgba(46,158,91,0.6)]" />
        </motion.div>
      )}

      {/* centre medallion */}
      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/80 text-center shadow-[0_20px_50px_-24px_rgba(20,22,42,0.4)] backdrop-blur">
        <div className="flex flex-col items-center gap-1">
          <motion.span
            animate={reduce ? {} : { rotate: 360 }}
            transition={reduce ? {} : { duration: 12, repeat: Infinity, ease: "linear" }}
            className="text-accent"
          >
            <Loop className="h-6 w-6" />
          </motion.span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Continuous</span>
        </div>
      </div>

      {/* stage nodes */}
      {nodes.map((n, i) => {
        const Icon = ICONS[i];
        const on = active === i || reduce;
        return (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <motion.span
              animate={{
                scale: on ? 1.14 : 1,
                boxShadow: on ? "0 12px 28px -10px rgba(46,158,91,0.6)" : "0 0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={
                "grid h-11 w-11 place-items-center rounded-2xl border transition-colors duration-300 " +
                (on
                  ? "border-transparent bg-[linear-gradient(120deg,#5bb873,#2e8b57)] text-white"
                  : "border-line bg-white text-muted")
              }
            >
              <Icon className="h-5 w-5" />
            </motion.span>
            <span
              className={
                "text-[11px] font-bold tracking-tight transition-colors duration-300 " +
                (on ? (dark ? "text-white" : "text-ink") : dark ? "text-white/55" : "text-muted")
              }
            >
              {n.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
