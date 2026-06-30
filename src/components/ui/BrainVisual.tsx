"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { about } from "@/lib/content";

const NODE_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

// Neuron points on a Fibonacci sphere (deterministic → no hydration mismatch).
const R = 172;
const DOTS = Array.from({ length: 60 }, (_, i) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / 59) * 2;
  const rad = Math.sqrt(1 - y * y);
  const theta = golden * i;
  return {
    x: Math.cos(theta) * rad * R,
    y: y * R,
    z: Math.sin(theta) * rad * R,
    size: 2.5 + ((i * 7) % 5) * 0.8,
    color: NODE_COLORS[i % NODE_COLORS.length],
    delay: (i % 9) * 0.35,
  };
});

// 2D label positions around the visual (pentagon).
const LABELS = about.dimensions.map((name, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180);
  const r = 46;
  return { name, color: NODE_COLORS[i % NODE_COLORS.length], x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
});

export function BrainVisual() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  // Labels appear one-by-one (build up), hold, then all fade out, then repeat.
  useEffect(() => {
    if (reduce) {
      setShown(LABELS.length);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n = n >= LABELS.length + 1 ? 0 : n + 1; // 0(hidden) -> 1..5(build) -> 6(hold) -> repeat
      setShown(Math.min(n, LABELS.length));
    }, 850);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center [perspective:1200px]">
      {/* soft multicolour aura that gently breathes */}
      <motion.div
        aria-hidden
        className="absolute inset-16 rounded-full blur-[64px]"
        style={{ background: "conic-gradient(from 0deg,#14b8a6,#3b82f6,#ef4444,#f59e0b,#8b5cf6,#14b8a6)" }}
        animate={reduce ? { opacity: 0.16 } : { opacity: [0.12, 0.22, 0.12], scale: [0.96, 1.04, 0.96] }}
        transition={reduce ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* shared tilted 3D stage */}
      <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "rotateX(-12deg)" }}>
        {/* ENERGY FIELD — neuron sphere + rings orbit continuously around the brain */}
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={reduce ? {} : { rotateY: 360 }}
          transition={reduce ? {} : { duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {DOTS.map((d, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: d.size,
                height: d.size,
                marginLeft: -d.size / 2,
                marginTop: -d.size / 2,
                transform: `translate3d(${d.x}px, ${d.y}px, ${d.z}px)`,
                background: d.color,
                boxShadow: `0 0 8px ${d.color}`,
              }}
              animate={reduce ? {} : { opacity: [0.35, 1, 0.35] }}
              transition={reduce ? {} : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
            />
          ))}

          {/* faint great-circle rings to read as a sphere */}
          {["rotateX(90deg)", "rotateX(90deg) rotateY(60deg)", "rotateX(90deg) rotateY(120deg)"].map((t, i) => (
            <span
              key={`ring-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-ink/[0.08]"
              style={{ width: R * 2, height: R * 2, marginLeft: -R, marginTop: -R, transform: t }}
            />
          ))}
        </motion.div>

        {/* BRAIN — stays forward-facing; gentle living sway + breathing float (never goes edge-on) */}
        <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]">
          <motion.div
            className="w-[46%] [transform-style:preserve-3d]"
            animate={
              reduce
                ? {}
                : { rotateY: [-13, 13, -13], rotateX: [5, -6, 5], y: [-6, 6, -6], scale: [1, 1.035, 1] }
            }
            transition={reduce ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/brain-neural.png"
              alt="Neural brain representing human consciousness"
              width={640}
              height={427}
              priority
              sizes="(max-width: 1024px) 50vw, 22vw"
              className="h-auto w-full [filter:drop-shadow(0_12px_28px_rgba(20,22,42,0.18))]"
            />
          </motion.div>
        </div>
      </div>

      {/* 2D labels — appear one by one, then fade out */}
      {LABELS.map((l, i) => (
        <motion.div
          key={l.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
          animate={{ opacity: i < shown ? 1 : 0, y: i < shown ? 0 : 8, scale: i < shown ? 1 : 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-[0_10px_24px_-12px_rgba(20,22,42,0.35)]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
            <span className="whitespace-nowrap text-[12px] font-bold text-ink-soft">{l.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
