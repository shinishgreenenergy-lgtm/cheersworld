"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Reading-progress hairline — sits above the header, gradient in the brand arc. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-[linear-gradient(90deg,#2e9e5b,#8fbf4d_55%,#14b8a6)]"
      style={{ scaleX }}
    />
  );
}
