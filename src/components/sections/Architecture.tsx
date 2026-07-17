import { ArrowRight, ArrowDown, CornerLeftUp, Check } from "lucide-react";
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

        {/* serpentine grid: 3 per row on desktop, single column on mobile */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  {!last && (i + 1) % 3 !== 0 && (
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
            {architecture.loopNote}
          </div>
        </Reveal>

        {/* The behavioral intelligence engine — signals in, actions out */}
        <Reveal delay={0.1} className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 px-6 py-6 text-center sm:px-8">
              <h3 className="font-serif text-xl font-medium tracking-[-0.01em] text-white sm:text-2xl [font-variation-settings:'opsz'_36]">
                {architecture.engine.heading}
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/55">{architecture.engine.body}</p>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="p-6 sm:border-r sm:border-white/10 sm:p-8">
                <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent-2">
                  {architecture.engine.signals.title}
                </h4>
                <ul className="mt-4 grid gap-2.5">
                  {architecture.engine.signals.items.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-2" strokeWidth={3} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 p-6 sm:border-t-0 sm:p-8">
                <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#14b8a6]">
                  {architecture.engine.actions.title}
                </h4>
                <ul className="mt-4 grid gap-2.5">
                  {architecture.engine.actions.items.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/70">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#14b8a6]" strokeWidth={2.5} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t border-white/10 px-6 py-5 text-center text-[13px] italic leading-relaxed text-white/50 sm:px-8">
              {architecture.engine.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
