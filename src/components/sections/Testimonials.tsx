import { Quote } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { testimonials } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Testimonials() {
  return (
    <section id="insights" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          subtitle="What partners, clinicians, and people experience with Cheers Wisdom."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((t, i) => {
            const c = TINTS[i % TINTS.length];
            return (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="glass relative flex h-full flex-col overflow-hidden rounded-none p-7">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: c.bar }} />
                  <Quote className="h-8 w-8" style={{ color: c.text }} />
                  <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-ink-soft">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full text-sm font-black"
                      style={{ background: c.soft, color: c.text }}
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{t.name}</span>
                      <span className="block text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
