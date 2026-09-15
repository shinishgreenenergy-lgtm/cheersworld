"use client";

import { m, useScroll, useTransform } from "motion/react";

// Page-wide ambient background. The blobs start green near the top and warm
// toward orange as the page scrolls down.
//
// The soft look comes from radial-gradients, NOT filter: blur(140px) — a
// viewport-sized animated blur forces the GPU to re-filter enormous layers
// every frame and was a measured Lighthouse-mobile bottleneck.
const blob = (v: string) => `radial-gradient(closest-side, ${v}, transparent 72%)`;

export function Aurora() {
  const { scrollYProgress } = useScroll();

  const c1 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(46,158,91,0.10)", "rgba(245,158,11,0.10)", "rgba(249,115,22,0.13)"]);
  const c2 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(20,184,166,0.06)", "rgba(245,158,11,0.07)", "rgba(244,114,182,0.08)"]);
  const c3 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(143,191,77,0.05)", "rgba(251,191,36,0.07)", "rgba(251,146,60,0.10)"]);
  // a steady blue patch that drifts in tone but stays blue throughout
  const c4 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(59,130,246,0.07)", "rgba(37,99,235,0.08)", "rgba(96,165,250,0.09)"]);
  const g1 = useTransform(c1, blob);
  const g2 = useTransform(c2, blob);
  const g3 = useTransform(c3, blob);
  const g4 = useTransform(c4, blob);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />
      <m.div
        className="absolute -left-40 -top-48 h-[42rem] w-[42rem] animate-floaty"
        style={{ backgroundImage: g1 }}
      />
      <m.div
        className="absolute -right-44 top-1/3 h-[38rem] w-[38rem] animate-floaty"
        style={{ backgroundImage: g2, animationDelay: "-5s" }}
      />
      <m.div
        className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] animate-floaty"
        style={{ backgroundImage: g3, animationDelay: "-9s" }}
      />
      <m.div
        className="absolute right-1/4 top-2/3 h-[30rem] w-[30rem] animate-floaty"
        style={{ backgroundImage: g4, animationDelay: "-13s" }}
      />
      {/* texture: faint dot grid + fine grain */}
      <div className="absolute inset-0 bg-dots opacity-[0.45] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light" />
    </div>
  );
}
