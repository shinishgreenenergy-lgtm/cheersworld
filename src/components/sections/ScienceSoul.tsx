import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { scienceSoul } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function ScienceSoul() {
  return (
    <section className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={scienceSoul.eyebrow}
          title={scienceSoul.title}
          subtitle={scienceSoul.subtitle}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scienceSoul.features.map((f, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={f.title} delay={(i % 4) * 0.07}>
                <div className="group glass relative flex h-full flex-col items-start gap-5 overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1">
                  {/* coloured water that rises to fill the card on hover, with a wave crest riding the surface */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 top-full z-0 transition-[top] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:top-0"
                    style={{ background: t.tile }}
                  >
                    <svg
                      className="wave-anim absolute -top-[13px] left-0 h-[16px] w-[200%]"
                      viewBox="0 0 1200 16"
                      preserveAspectRatio="none"
                      fill={t.bar}
                    >
                      <path d="M0 10 Q150 0 300 10 T600 10 T900 10 T1200 10 L1200 16 L0 16 Z" />
                    </svg>
                  </span>

                  {/* top accent bar */}
                  <span aria-hidden className="absolute inset-x-0 top-0 z-20 h-1" style={{ background: t.bar }} />

                  <span
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl text-white ring-0 ring-white/80 transition-all duration-300 group-hover:ring-2"
                    style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}
                  >
                    <Icon name={f.icon} className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="relative z-10 font-display text-lg font-extrabold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
                    {f.title}
                  </h3>
                  <p className="relative z-10 text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/90">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
