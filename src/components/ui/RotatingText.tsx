"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function RotatingText({
  words,
  className,
  interval = 2200,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduce]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="relative inline-grid align-bottom">
      {/* invisible sizer reserves the width of the longest word so layout never jumps */}
      <span className={`invisible col-start-1 row-start-1 ${className ?? ""}`}>{longest}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={reduce ? false : { y: "0.7em", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { y: "-0.7em", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`col-start-1 row-start-1 whitespace-nowrap ${className ?? ""}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
