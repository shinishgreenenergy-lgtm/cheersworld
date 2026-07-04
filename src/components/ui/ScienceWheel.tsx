"use client";

import { motion, useReducedMotion } from "motion/react";
import { science } from "@/lib/content";
import { TINTS } from "@/lib/tints";

// SVG donut: 8 segment buttons around an "AI + Continuous Learning" core.
const N = science.disciplines.length;
const C = 100; // center
const R0 = 52; // inner radius
const R1 = 86; // outer radius
const GAP = 2.4; // degrees between segments

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [Math.round((C + r * Math.cos(a)) * 100) / 100, Math.round((C + r * Math.sin(a)) * 100) / 100];
}

function segmentPath(i: number) {
  const a0 = (360 / N) * i + GAP / 2;
  const a1 = (360 / N) * (i + 1) - GAP / 2;
  const [x0, y0] = polar(R1, a0);
  const [x1, y1] = polar(R1, a1);
  const [x2, y2] = polar(R0, a1);
  const [x3, y3] = polar(R0, a0);
  return `M ${x0} ${y0} A ${R1} ${R1} 0 0 1 ${x1} ${y1} L ${x2} ${y2} A ${R0} ${R0} 0 0 0 ${x3} ${y3} Z`;
}

export function ScienceWheel({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {science.disciplines.map((d, i) => {
          // offset tint index so adjacent segments differ (8 segments, 6 tints)
          const t = TINTS[(i * 5) % TINTS.length];
          const selected = i === active;
          const mid = (360 / N) * (i + 0.5);
          const [lx, ly] = polar((R0 + R1) / 2, mid);
          return (
            <g key={d.name}>
              <motion.path
                d={segmentPath(i)}
                fill={selected ? t.bar : t.soft}
                stroke={t.bar}
                strokeWidth={selected ? 0 : 0.6}
                role="button"
                tabIndex={0}
                aria-label={d.name}
                onClick={() => onSelect(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(i)}
                className="cursor-pointer outline-none focus-visible:opacity-80"
                animate={{ scale: selected && !reduce ? 1.04 : 1 }}
                style={{ transformOrigin: "100px 100px" }}
                transition={{ duration: 0.25 }}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none font-display"
                fill={selected ? "#ffffff" : t.text}
                fontSize="7.5"
                fontWeight="800"
              >
                {d.short}
              </text>
            </g>
          );
        })}
        {/* core */}
        <circle cx={C} cy={C} r={R0 - 8} fill="white" stroke="#e8e8f0" />
        <text x={C} y={C - 7} textAnchor="middle" fontSize="11" fontWeight="800" fill="#14162a" className="font-display">
          AI
        </text>
        <text x={C} y={C + 6} textAnchor="middle" fontSize="5.4" fontWeight="700" fill="#5d6478">
          CONTINUOUS
        </text>
        <text x={C} y={C + 13} textAnchor="middle" fontSize="5.4" fontWeight="700" fill="#5d6478">
          LEARNING
        </text>
        {!reduce && (
          <motion.circle
            cx={C}
            cy={C}
            r={R0 - 8}
            fill="none"
            stroke="#2e9e5b"
            strokeOpacity={0.4}
            animate={{ r: [R0 - 8, R0 - 2], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}
