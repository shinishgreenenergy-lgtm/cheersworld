import { Quote } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { testimonials } from "@/lib/content";

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
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-4xl border border-line bg-surface p-7">
                <Quote className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-sm font-black text-accent">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.name}</span>
                    <span className="block text-xs text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
