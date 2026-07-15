import { ChevronDown, BookOpen } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { knowledge } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Knowledge() {
  return (
    <section id="knowledge" className="min-h-[100svh] flex flex-col justify-center scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={knowledge.eyebrow} title={knowledge.title} subtitle={knowledge.subtitle} />

        {/* topic tiles (coming soon) */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap justify-center gap-2.5">
            {knowledge.topics.map((tpc, i) => {
              const t = TINTS[i % TINTS.length];
              return (
                <span key={tpc.label} className="flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-[13px] font-bold text-ink-soft">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.bar }} />
                  {tpc.label}
                  <span className="rounded-full border border-dashed border-line px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-muted">
                    Soon
                  </span>
                </span>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* glossary */}
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-accent" strokeWidth={1.7} />
                <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">Glossary</h3>
              </div>
              <dl className="mt-6 space-y-4">
                {knowledge.glossary.map((g) => (
                  <div key={g.term} className="rounded-2xl border border-line bg-white p-5">
                    <dt className="font-display text-[14.5px] font-extrabold tracking-tight text-ink">{g.term}</dt>
                    <dd className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* FAQs */}
          <Reveal delay={0.08}>
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">Frequently asked questions</h3>
              <div className="mt-6 space-y-3">
                {knowledge.faqs.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-line bg-white px-5">
                    <summary className="flex items-center justify-between gap-4 py-4 text-[14.5px] font-bold text-ink">
                      {f.q}
                      <ChevronDown className="chev h-4 w-4 shrink-0 text-muted" />
                    </summary>
                    <p className="pb-5 text-[13.5px] leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
