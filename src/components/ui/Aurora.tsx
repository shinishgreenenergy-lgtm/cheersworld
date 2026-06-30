"use client";

import { motion, useScroll, useTransform } from "motion/react";

// Page-wide ambient background. The blobs start green near the top and warm
// toward orange as the page scrolls down.
export function Aurora() {
  const { scrollYProgress } = useScroll();

  const c1 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(46,158,91,0.10)", "rgba(245,158,11,0.10)", "rgba(249,115,22,0.13)"]);
  const c2 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(20,184,166,0.06)", "rgba(245,158,11,0.07)", "rgba(244,114,182,0.08)"]);
  const c3 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(143,191,77,0.05)", "rgba(251,191,36,0.07)", "rgba(251,146,60,0.10)"]);
  // a steady blue patch that drifts in tone but stays blue throughout
  const c4 = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(59,130,246,0.07)", "rgba(37,99,235,0.08)", "rgba(96,165,250,0.09)"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />
      <motion.div
        className="absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full blur-[140px] animate-floaty"
        style={{ backgroundColor: c1 }}
      />
      <motion.div
        className="absolute -right-44 top-1/3 h-[38rem] w-[38rem] rounded-full blur-[140px] animate-floaty"
        style={{ backgroundColor: c2, animationDelay: "-5s" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full blur-[150px] animate-floaty"
        style={{ backgroundColor: c3, animationDelay: "-9s" }}
      />
      <motion.div
        className="absolute right-1/4 top-2/3 h-[30rem] w-[30rem] rounded-full blur-[150px] animate-floaty"
        style={{ backgroundColor: c4, animationDelay: "-13s" }}
      />
      {/* texture: faint dot grid + fine grain */}
      <div className="absolute inset-0 bg-dots opacity-[0.45] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light" />
    </div>
  );
}
