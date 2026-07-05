import { ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { government } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Government() {
  return (
    <section id="government" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-20 bg-[#eef1f4]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={government.eyebrow} title={government.title} subtitle={government.subtitle} />

        {/* program areas */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {government.areas.map((a, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={a.name} delay={(i % 7) * 0.05}>
                <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-5">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: t.soft, color: t.text }}>
                    <Icon name={a.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-3 font-display text-[14px] font-extrabold tracking-tight text-ink">{a.name}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{a.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* implementation journey */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">Implementation journey</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>
        <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {government.journey.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.08} className="flex flex-1 items-stretch gap-3">
              <div className="glass flex-1 rounded-2xl p-5">
                <span className="font-display text-[12px] font-black uppercase tracking-[0.12em] text-accent">
                  {String(i + 1).padStart(2, "0")} · {j.step}
                </span>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{j.body}</p>
              </div>
              {i < government.journey.length - 1 && (
                <ChevronRight aria-hidden className="hidden h-5 w-5 self-center text-muted lg:block" />
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
