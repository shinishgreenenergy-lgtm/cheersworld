"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { about } from "@/lib/content";

export function BrainVisual() {
  const reduce = useReducedMotion();
  const nodes = about.dimensions;
  const ring = { duration: 52, repeat: Infinity, ease: "linear" as const };

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[32rem] place-items-center">
      {/* warm glow */}
      <div className="absolute inset-12 rounded-full bg-[radial-gradient(circle,rgba(46,158,91,0.30),transparent_65%)] blur-2xl" />

      {/* outer rotating dashed ring with orbiting dimension nodes */}
      <motion.div className="absolute inset-1" animate={reduce ? {} : { rotate: 360 }} transition={ring}>
        <div className="absolute inset-0 rounded-full border border-dashed border-accent/30" />
        {nodes.map((n, i) => {
          const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
          const r = 47;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <motion.div
              key={n}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={ring}
            >
              <div className="flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-2.5 py-1 shadow-[0_6px_16px_-8px_rgba(20,22,42,0.3)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="whitespace-nowrap text-[11px] font-bold text-ink-soft">{n}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* realistic brain in a circular portal, gently floating */}
      <motion.div
        className="relative grid place-items-center"
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-[17rem] w-[17rem] overflow-hidden rounded-full border border-white/70 shadow-[0_34px_90px_-28px_rgba(46,158,91,0.55)] ring-1 ring-black/5 sm:h-[20rem] sm:w-[20rem] lg:h-[23rem] lg:w-[23rem]">
          {/* structura "ken-burn-center": slow continuous zoom + drift */}
          <motion.div
            className="absolute inset-0"
            animate={reduce ? {} : { scale: [1.12, 1.26, 1.12], x: ["0%", "-2%", "0%"], y: ["0%", "1.5%", "0%"] }}
            transition={reduce ? {} : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/brain.jpg"
              alt="Realistic human brain model, lateral view"
              fill
              sizes="(max-width: 1024px) 70vw, 30vw"
              priority
              className="object-cover object-[70%_42%]"
            />
          </motion.div>
          {/* warm tint to harmonize with the palette + soft vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(46,158,91,0.18),transparent_45%,rgba(20,22,42,0.22))] mix-blend-multiply" />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(20,22,42,0.4)]" />
        </div>
      </motion.div>
    </div>
  );
}
