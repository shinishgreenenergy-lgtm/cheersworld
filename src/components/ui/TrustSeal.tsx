"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

// Repeated once around the ring — sized to roughly fill the circumference.
const SEAL_TEXT = "TRUSTED BY LEADING HOSPITALS · SCHOOLS · RESEARCH LABS · ";

export function TrustSeal() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-0 right-0 z-40 hidden h-[240px] w-[240px] translate-x-[46%] translate-y-[46%] md:block"
    >
      {/* static disc + center mark; only the lettering ring spins */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.92),rgba(238,240,243,0.7))] shadow-[0_18px_50px_-18px_rgba(20,22,42,0.3)] ring-1 ring-black/[0.08] backdrop-blur-md" />
      <div className="absolute inset-[18px] rounded-full border border-dashed border-ink/15" />

      <motion.svg
        viewBox="0 0 240 240"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 44, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="seal-ring" d="M120,120 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <text
          className="fill-ink/45 font-display"
          style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.2em" }}
        >
          <textPath href="#seal-ring" startOffset="0">
            {SEAL_TEXT}
          </textPath>
        </text>
      </motion.svg>

      {/* still center mark */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white/75 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_6px_16px_-8px_rgba(20,22,42,0.4)] ring-1 ring-black/[0.06]">
          <ShieldCheck className="h-7 w-7 text-ink/45" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
