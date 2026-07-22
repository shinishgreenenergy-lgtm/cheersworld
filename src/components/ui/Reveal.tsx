"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Robust "has scrolled into view" detection: IntersectionObserver plus
// geometry re-checks, so anchor jumps and programmatic scrolls can never
// leave content invisible. Shared by Reveal and bespoke section choreography.
export function useRevealed() {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const show = () => setShown(true);

    // Primary trigger: the element scrolls into view.
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && show(),
      { rootMargin: "-80px" },
    );
    io.observe(el);

    // Safety net: anchor jumps (/#contact, /#research) and programmatic
    // scrolls can slip past the observer and leave content invisible or
    // blurred. Re-check real geometry after mount and whenever scrolling
    // settles — if the element is on screen, it must be shown.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show();
    };
    const t1 = window.setTimeout(check, 250);
    const t2 = window.setTimeout(check, 1000);
    window.addEventListener("scrollend", check, { passive: true });
    window.addEventListener("hashchange", check);
    return () => {
      io.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scrollend", check);
      window.removeEventListener("hashchange", check);
    };
  }, [shown]);

  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  const { ref, shown } = useRevealed();
  const reduce = useReducedMotion();

  return (
    <MotionTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      animate={shown || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
