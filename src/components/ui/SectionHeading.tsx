import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
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
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
          <span className="block h-[3px] w-10 rounded-full bg-accent" />
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
