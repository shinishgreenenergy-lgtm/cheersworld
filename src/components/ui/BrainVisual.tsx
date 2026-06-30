"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { about } from "@/lib/content";

const NODE_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

export function BrainVisual() {
  const reduce = useReducedMotion();
  const nodes = about.dimensions;
  const ring = { duration: 60, repeat: Infinity, ease: "linear" as const };

  // Interactive 3D tilt toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 15 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* slowly-rotating multicolour aura, matching the brain's palette */}
      <motion.div
        aria-hidden
        className="absolute inset-10 rounded-full blur-[60px]"
        style={{
          background: "conic-gradient(from 0deg, #14b8a6, #3b82f6, #ef4444, #f59e0b, #84cc16, #14b8a6)",
          opacity: 0.2,
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* rotating dashed ring with orbiting dimension nodes */}
      <motion.div className="absolute inset-1" animate={reduce ? {} : { rotate: 360 }} transition={ring}>
        <div className="absolute inset-0 rounded-full border border-dashed border-ink/10" />
        {nodes.map((n, i) => {
          const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
          const r = 48;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <motion.div
              key={n}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={ring}
            >
              <div className="flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-2.5 py-1 shadow-[0_6px_16px_-8px_rgba(20,22,42,0.3)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: NODE_COLORS[i % NODE_COLORS.length] }} />
                <span className="whitespace-nowrap text-[11px] font-bold text-ink-soft">{n}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* colourful brain: white background blended away, floating + tilting */}
      <motion.div
        className="relative z-10 w-[80%] [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
        animate={reduce ? {} : { y: [0, -12, 0] }}
        transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/brain-neural.png"
          alt="Colourful neural brain representing human consciousness"
          width={640}
          height={427}
          priority
          sizes="(max-width: 1024px) 70vw, 30vw"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
