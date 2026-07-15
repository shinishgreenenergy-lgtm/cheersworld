import { ArrowRight, ArrowDown, CornerLeftUp } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { architecture } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Architecture() {
  return (
    <section id="architecture" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* enterprise glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={architecture.eyebrow} title={architecture.title} subtitle={architecture.subtitle} />

        {/* serpentine grid: 4 per row on desktop, single column on mobile */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {architecture.stages.map((s, i) => {
            const t = TINTS[i % TINTS.length];
            const last = i === architecture.stages.length - 1;
            return (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="relative h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: t.tile, boxShadow: `0 10px 22px -10px ${t.glow}` }}>
                        <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="font-serif text-4xl font-medium leading-none [font-variation-settings:'opsz'_48]" style={{ color: t.bar, opacity: 0.4 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-[15px] font-extrabold tracking-tight text-white">{s.name}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{s.body}</p>
                  </div>
                  {/* flow arrows: right on desktop rows (not at row ends), down on mobile */}
                  {!last && (i + 1) % 4 !== 0 && (
                    <span aria-hidden className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ArrowRight className="h-4 w-4 text-white/40" />
                    </span>
                  )}
                  {!last && (
                    <span aria-hidden className="absolute -bottom-3.5 left-1/2 z-10 -translate-x-1/2 lg:hidden">
                      <ArrowDown className="h-4 w-4 text-white/40" />
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* loop-back annotation */}
        <Reveal delay={0.5}>
          <div className="mt-8 flex items-center justify-center gap-2 text-[13px] font-bold text-accent-2">
            <CornerLeftUp className="h-4 w-4" />
            Continuous Learning feeds back into Assessment — the loop never stops improving.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
