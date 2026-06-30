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
                <div className="group glass relative flex h-full flex-col items-start gap-5 overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(20,22,42,0.3)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white"
                    style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}
                  >
                    <Icon name={f.icon} className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="font-display text-lg font-extrabold leading-snug tracking-tight text-ink">{f.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
