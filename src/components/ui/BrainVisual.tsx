"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { about } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const DIM_ICONS: IconName[] = ["Activity", "BrainCircuit", "Users", "ShieldCheck", "Wallet"];

// Pentagon node positions (percent of the square), starting at the top.
const NODES = about.dimensions.map((name, i) => {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  const r = 40;
  return { name, i, x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
});

export function BrainVisual() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  // Interactive 3D tilt toward the cursor — the whole scene tilts as one so the
  // connecting lines stay anchored to their chips.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
    setHovered(null);
  }

  return (
    <div
      className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center [perspective:1300px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* slowly-rotating multicolour aura behind everything */}
      <motion.div
        aria-hidden
        className="absolute inset-12 rounded-full blur-[64px]"
        style={{
          background: "conic-gradient(from 0deg, #14b8a6, #3b82f6, #ef4444, #f59e0b, #8b5cf6, #14b8a6)",
          opacity: 0.22,
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />

      {/* the scene: lines + brain + chips, tilting together */}
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateX, rotateY }}
      >
        {/* dashed orbit + animated data-flow connectors */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(20,22,42,0.10)" strokeWidth="0.18" strokeDasharray="1.4 1.6" />
          {NODES.map((n) => {
            const t = TINTS[n.i % TINTS.length];
            const active = hovered === n.i;
            return (
              <g key={n.name}>
                <line x1="50" y1="50" x2={n.x} y2={n.y} stroke={t.bar} strokeWidth={active ? 0.5 : 0.32} strokeOpacity={active ? 0.85 : 0.32} strokeLinecap="round" />
                {!reduce && (
                  <motion.line
                    x1="50" y1="50" x2={n.x} y2={n.y}
                    stroke={t.bar} strokeWidth={0.55} strokeLinecap="round"
                    strokeDasharray="0.6 5"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -11.2 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: n.i * 0.3 }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* colourful brain at the centre, floating */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2"
          animate={reduce ? {} : { y: ["-4%", "4%", "-4%"] }}
          transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brain-neural.png"
            alt="Colourful neural brain representing human consciousness"
            width={640}
            height={427}
            priority
            sizes="(max-width: 1024px) 60vw, 26vw"
            className="h-auto w-full drop-shadow-[0_18px_40px_rgba(20,22,42,0.18)]"
          />
        </motion.div>

        {/* dimension chips at the pentagon points */}
        {NODES.map((n) => {
          const t = TINTS[n.i % TINTS.length];
          return (
            <motion.div
              key={n.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + n.i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(n.i)}
            >
              <motion.div
                className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-[0_10px_24px_-12px_rgba(20,22,42,0.35)]"
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={reduce ? {} : { duration: 3.4 + n.i * 0.4, repeat: Infinity, ease: "easeInOut", delay: n.i * 0.25 }}
                whileHover={{ scale: 1.08 }}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: t.soft, color: t.text }}>
                  <Icon name={DIM_ICONS[n.i]} className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="whitespace-nowrap text-[12px] font-bold text-ink-soft">{n.name}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
