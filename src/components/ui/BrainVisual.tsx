"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { DomainRing } from "./DomainRing";


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

// WebGL support never changes within a session — detect once, cache, and expose
// it as an external store (server snapshot: false, so SSR/hydration render the
// static fallback and the client upgrades to 3D right after hydration).
let webglSupport: boolean | undefined;
const subscribeNoop = () => () => {};
const getWebglSnapshot = () => {
  if (webglSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
};
const getWebglServerSnapshot = () => false;

export function BrainVisual() {
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(subscribeNoop, getWebglSnapshot, getWebglServerSnapshot);

  const use3D = webgl && !reduce;

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

      <DomainRing />
    </div>
  );
}
