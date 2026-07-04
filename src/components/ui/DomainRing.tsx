"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/lib/content";

// 8 domain nodes on a circle around the brain, with connection lines and
// traveling pulses. Pure DOM/SVG — works over both WebGL and WebP fallback.
const R = 46; // ring radius in viewBox units (viewBox 0 0 100 100)
const NODES = hero.domains.map((d, i) => {
  const a = ((-90 + i * (360 / hero.domains.length)) * Math.PI) / 180;
  // Round to 2dp so SSR and client render identical markup (hydration safety).
  const x = Math.round((50 + R * Math.cos(a)) * 100) / 100;
  const y = Math.round((50 + R * Math.sin(a)) * 100) / 100;
  return { ...d, x, y };
});

export function DomainRing() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-label="Domains connected to the platform">
      {/* connection lines + pulses */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        {NODES.map((n, i) => (
          <g key={n.name}>
            <line
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth={hovered === i ? 0.5 : 0.25}
              strokeOpacity={hovered === i ? 0.7 : 0.28}
              strokeDasharray="1.5 1.5"
            />
            {!reduce && (
              <motion.circle
                r={0.9}
                fill={n.color}
                initial={{ cx: 50, cy: 50, opacity: 0 }}
                animate={{ cx: [50, n.x], cy: [50, n.y], opacity: [0, 0.9, 0] }}
                transition={{ duration: 2.6, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* node chips */}
      {NODES.map((n, i) => (
        <motion.div
          key={n.name}
          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          animate={reduce ? {} : { y: [0, i % 2 === 0 ? -5 : 5, 0] }}
          transition={reduce ? {} : { duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-[0_10px_24px_-12px_rgba(20,22,42,0.35)] transition-transform duration-200 hover:scale-105"
            style={hovered === i ? { borderColor: n.color } : undefined}
          >
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: n.color }} />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
            </span>
            <span className="whitespace-nowrap text-[11.5px] font-bold text-ink-soft">{n.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
