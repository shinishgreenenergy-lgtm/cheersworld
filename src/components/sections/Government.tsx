import { ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { government } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Government() {
  return (
    <section id="government" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={government.eyebrow} title={government.title} subtitle={government.subtitle} />

        {/* program areas */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {government.areas.map((a, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={a.name} delay={(i % 7) * 0.05}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: t.soft, color: t.bar }}>
                    <Icon name={a.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-3 font-display text-[14px] font-extrabold tracking-tight text-white">{a.name}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/60">{a.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* implementation journey */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-2">Implementation journey</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </Reveal>
        <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {government.journey.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.08} className="flex flex-1 items-stretch gap-3">
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-2">
                  {String(i + 1).padStart(2, "0")} · {j.step}
                </span>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{j.body}</p>
              </div>
              {i < government.journey.length - 1 && (
                <ChevronRight aria-hidden className="hidden h-5 w-5 self-center text-white/40 lg:block" />
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Button href={government.cta.href} icon="arrow">
              {government.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
