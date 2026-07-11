"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// Lightweight WebP brain — instant paint + permanent fallback when WebGL is
// unavailable or reduced-motion is set.
function StaticBrain() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="w-[64%]">
        <Image
          src="/brain-neural.webp"
          alt="Neural brain representing human intelligence"
          width={640}
          height={427}
          priority
          sizes="(max-width: 1024px) 70vw, 34vw"
          className="h-auto w-full [filter:drop-shadow(0_18px_40px_rgba(20,22,42,0.22))]"
        />
      </div>
    </div>
  );
}

const BrainScene = dynamic(() => import("./BrainScene").then((m) => m.BrainScene), {
  ssr: false,
  loading: () => <StaticBrain />,
});

// WebGL support is stable per session — detect once, expose as an external store
// so SSR renders the static fallback and the client upgrades to 3D after hydration.
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

// The hero centrepiece: a 3D brain that slowly turns inside a soft breathing aura
// and a pair of thin orbit rings — the "living object" the giant wordmark wraps around.
// `compact` tightens the glow/rings for inline use (the brain standing in for a letter).
export function HeroOrb({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(subscribeNoop, getWebglSnapshot, getWebglServerSnapshot);
  const use3D = webgl && !reduce;

  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* soft brand aura, gently breathing — only in the large standalone orb, never
          behind the inline letter (compact) where it reads as an unwanted backdrop */}
      {!compact && (
        <motion.div
          aria-hidden
          className="absolute inset-[14%] rounded-full blur-[70px]"
          style={{ background: "conic-gradient(from 0deg,#2e9e5b,#14b8a6,#8fbf4d,#2e9e5b)" }}
          animate={reduce ? { opacity: 0.18 } : { opacity: [0.14, 0.26, 0.14], scale: [0.95, 1.05, 0.95] }}
          transition={reduce ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* brain (or static fallback) */}
      <div className="absolute inset-0">{use3D ? <BrainScene /> : <StaticBrain />}</div>
    </div>
  );
}
