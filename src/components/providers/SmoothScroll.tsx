"use client";

import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 }}
    >
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
