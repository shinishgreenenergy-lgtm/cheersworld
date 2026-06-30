"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

const SEAL_TEXT = "TRUSTED · VERIFIED PARTNER · ";

// Small grey "trusted" stamp that tucks into a card's bottom-right corner.
// The parent card uses overflow-hidden, so the disc is clipped to a corner peek.
export function CardSeal({ index = 0 }: { index?: number }) {
  const reduce = useReducedMotion();
  const ringId = `card-seal-ring-${index}`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.95),rgba(234,236,239,0.72))] shadow-[0_8px_22px_-12px_rgba(20,22,42,0.4)] ring-1 ring-black/[0.06] backdrop-blur-sm" />
      <div className="absolute inset-[8px] rounded-full border border-dashed border-ink/15" />

      <motion.svg
        viewBox="0 0 96 96"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id={ringId} d="M48,48 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
        </defs>
        <text className="fill-ink/45 font-display" style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "0.14em" }}>
          <textPath href={`#${ringId}`} startOffset="0">
            {SEAL_TEXT}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-white/85 shadow-[0_4px_10px_-6px_rgba(20,22,42,0.45)] ring-1 ring-black/[0.06]">
          <ShieldCheck className="h-4 w-4 text-ink/45" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}
