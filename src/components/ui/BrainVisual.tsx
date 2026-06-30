"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { about } from "@/lib/content";

const NODE_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

// 2D label positions around the visual (pentagon).
const LABELS = about.dimensions.map((name, i) => {
  const a = (-90 + i * 72) * (Math.PI / 180);
  const r = 46;
  return { name, color: NODE_COLORS[i % NODE_COLORS.length], x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
});

// Lightweight WebP brain — shown instantly (fast LCP), while the WebGL scene loads,
// and as the permanent fallback when WebGL is unavailable or reduced-motion is set.
function StaticBrain() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="w-[46%]">
        <Image
          src="/brain-neural.webp"
          alt="Neural brain representing human consciousness"
          width={640}
          height={427}
          priority
          sizes="(max-width: 1024px) 50vw, 22vw"
          className="h-auto w-full [filter:drop-shadow(0_12px_28px_rgba(20,22,42,0.18))]"
        />
      </div>
    </div>
  );
}

// The three.js bundle is code-split and only fetched on the client (ssr:false),
// and only mounted once we've confirmed WebGL is supported.
const BrainScene = dynamic(() => import("./BrainScene").then((m) => m.BrainScene), {
  ssr: false,
  loading: () => <StaticBrain />,
});

export function BrainVisual() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  // Detect WebGL once on mount; fall back to the static image if unsupported.
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

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

  const use3D = webgl === true && !reduce;

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center">
      {/* soft multicolour aura that gently breathes */}
      <motion.div
        aria-hidden
        className="absolute inset-16 rounded-full blur-[64px]"
        style={{ background: "conic-gradient(from 0deg,#14b8a6,#3b82f6,#ef4444,#f59e0b,#8b5cf6,#14b8a6)" }}
        animate={reduce ? { opacity: 0.16 } : { opacity: [0.12, 0.22, 0.12], scale: [0.96, 1.04, 0.96] }}
        transition={reduce ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D brain (or static fallback) */}
      <div className="absolute inset-0">{use3D ? <BrainScene /> : <StaticBrain />}</div>

      {/* 2D labels — appear one by one, then fade out */}
      {LABELS.map((l, i) => (
        <motion.div
          key={l.name}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
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
