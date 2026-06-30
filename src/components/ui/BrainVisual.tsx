"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { about } from "@/lib/content";

const NODE_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

// Neuron points distributed on a sphere (Fibonacci sphere — deterministic, so no
// SSR/hydration mismatch). Each gets a colour from the dimension palette.
const R = 168;
const DOTS = Array.from({ length: 56 }, (_, i) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / 55) * 2;
  const rad = Math.sqrt(1 - y * y);
  const theta = golden * i;
  const x = Math.cos(theta) * rad;
  const z = Math.sin(theta) * rad;
  return {
    x: x * R,
    y: y * R,
    z: z * R,
    size: 3 + ((i * 7) % 5) * 0.7,
    color: NODE_COLORS[i % NODE_COLORS.length],
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

  // Labels appear one-by-one (build up), then all become invisible, then repeat.
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
    <div className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center [perspective:1100px]">
      {/* soft multicolour aura */}
      <div
        aria-hidden
        className="absolute inset-16 rounded-full blur-[60px]"
        style={{ background: "conic-gradient(from 0deg,#14b8a6,#3b82f6,#ef4444,#f59e0b,#8b5cf6,#14b8a6)", opacity: 0.18 }}
      />

      {/* tilt, then continuous 360° spin */}
      <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "rotateX(-14deg)" }}>
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={reduce ? {} : { rotateY: 360 }}
          transition={reduce ? {} : { duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {/* neuron sphere */}
          {DOTS.map((d, i) => (
            <span
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
            />
          ))}

          {/* faint great-circle rings to read as a sphere */}
          {[
            "rotateX(90deg)",
            "rotateX(90deg) rotateY(60deg)",
            "rotateX(90deg) rotateY(120deg)",
          ].map((t, i) => (
            <span
              key={`ring-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-ink/10"
              style={{
                width: R * 2,
                height: R * 2,
                marginLeft: -R,
                marginTop: -R,
                transform: t,
              }}
            />
          ))}

          {/* the brain at the centre, spinning with the scene (back face shows a mirrored brain) */}
          <div
            className="absolute left-1/2 top-1/2 w-[46%]"
            style={{ transform: "translate(-50%, -50%) translateZ(1px)", backfaceVisibility: "visible" }}
          >
            <Image
              src="/brain-neural.png"
              alt="Rotating neural brain representing human consciousness"
              width={640}
              height={427}
              priority
              sizes="(max-width: 1024px) 50vw, 22vw"
              className="h-auto w-full"
            />
          </div>
        </motion.div>
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
