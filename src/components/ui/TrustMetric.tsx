"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";

// Counts up when scrolled into view; no value ⇒ honest "Coming Soon".
// Reduced motion: the value appears immediately, with no count-up animation.
export function TrustMetric({ label, value, suffix }: { label: string; value?: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  // useReducedMotion resolves after hydration; derive the final value directly so
  // reduced-motion users never wait on the viewport trigger.
  const shown = reduce && value !== undefined ? value : n;

  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 py-6 text-center"
      onViewportEnter={() => value !== undefined && setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      {value !== undefined ? (
        // Solid accent, NOT the text-gradient util — background-clip:text does not
        // clip to NumberFlow's nested digit spans, so a gradient renders invisible.
        <span className="flex items-baseline font-display text-[2.6rem] font-black leading-none tracking-tight text-accent">
          <NumberFlow value={shown} animated={!reduce} />
          {suffix && <span>{suffix}</span>}
        </span>
      ) : (
        <span className="rounded-full border border-dashed border-line bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
          Coming Soon
        </span>
      )}
      <span className="text-[12.5px] font-semibold text-muted">{label}</span>
    </motion.div>
  );
}
