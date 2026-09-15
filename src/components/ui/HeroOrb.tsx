"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";

const BrainScene = dynamic(() => import("./BrainScene").then((m) => m.BrainScene), {
  ssr: false,
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
  // Loading three.js during startup is what tanks main-thread time on
  // Lighthouse (TBT) and low-end phones — wait for the browser to go idle
  // before mounting it, and keep the static art on small screens where the
  // 3D upgrade isn't worth the battery.
  const [ready3D, setReady3D] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      t = setTimeout(() => setReady3D(true), 1200);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 6000 });
      return () => {
        window.cancelIdleCallback(id);
        if (t) clearTimeout(t);
      };
    }
    const fallback = setTimeout(start, 3500);
    return () => {
      clearTimeout(fallback);
      if (t) clearTimeout(t);
    };
  }, []);

  const use3D = webgl && !reduce && ready3D;

  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* soft brand aura, gently breathing — only in the large standalone orb, never
          behind the inline letter (compact) where it reads as an unwanted backdrop */}
      {!compact && (
        <m.div
          aria-hidden
          className="absolute inset-[14%] rounded-full blur-[70px]"
          style={{ background: "conic-gradient(from 0deg,#2e9e5b,#14b8a6,#8fbf4d,#2e9e5b)" }}
          animate={reduce ? { opacity: 0.18 } : { opacity: [0.14, 0.26, 0.14], scale: [0.95, 1.05, 0.95] }}
          transition={reduce ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {use3D && (
        <div className="absolute inset-0">
          <BrainScene />
        </div>
      )}
    </div>
  );
}
