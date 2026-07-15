import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal>
        <div className={cn("flex flex-col gap-2.5", align === "center" ? "items-center" : "items-start")}>
          <span className={cn("text-[12px] font-bold uppercase tracking-[0.2em]", dark ? "text-accent-2" : "text-accent")}>{eyebrow}</span>
          <span className={cn("block h-[3px] w-10 rounded-full", dark ? "bg-accent-2" : "bg-accent")} />
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className={cn("max-w-3xl text-balance text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.12] tracking-tight", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={cn("max-w-2xl text-pretty text-lg leading-relaxed", dark ? "text-white/60" : "text-muted")}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
