"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "inverse";

const styles: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(120deg,#5bb873,#2e8b57)] shadow-[0_12px_30px_-10px_rgba(46,158,91,0.55)]",
  secondary: "text-ink glass hover:bg-white/85",
  inverse: "bg-white text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = null,
  className,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "play" | null;
  className?: string;
  magnetic?: boolean;
}) {
  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-bold tracking-tight",
        styles[variant],
        className,
      )}
    >
      {icon === "play" && <Play className="h-4 w-4 fill-current" />}
      {children}
      {icon === "arrow" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </motion.span>
  );

  const link = (
    <Link href={href} className="inline-flex">
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic className="inline-flex">{link}</Magnetic> : link;
}
