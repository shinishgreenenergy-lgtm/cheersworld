"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";

// Counts up when scrolled into view; no value ⇒ honest "Coming Soon".
// Reduced motion: the value appears immediately, with no count-up animation.
export function TrustMetric({ label, value, suffix }: { label: string; value?: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  // useReducedMotion resolves after hydration; sync the final value then so
  // reduced-motion users never wait on the viewport trigger.
  useEffect(() => {
    if (reduce && value !== undefined) setN(value);
  }, [reduce, value]);

  return (
    <motion.div
      className="flex flex-col items-center gap-1 py-4 text-center"
      onViewportEnter={() => value !== undefined && setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      {value !== undefined ? (
        <span className="flex items-baseline font-display text-3xl font-extrabold tracking-tight text-ink">
          <NumberFlow value={n} animated={!reduce} />
          {suffix && <span className="text-accent">{suffix}</span>}
        </span>
      ) : (
        <span className="rounded-full border border-dashed border-line bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          Coming Soon
        </span>
      )}
      <span className="text-[12.5px] font-medium text-muted">{label}</span>
    </motion.div>
  );
}
