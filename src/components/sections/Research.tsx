"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Download, FlaskConical, Landmark } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { research, trust, type Publication, type Patent } from "@/lib/content";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

const STATUS_TINT: Record<Publication["status"], string> = {
  Published: "#2e9e5b",
  "In Review": "#f59e0b",
  "In Preparation": "#6366f1",
};

// Nature-style card; every field optional so real papers drop straight in.
function PublicationCard({ p }: { p: Publication }) {
  return (
    <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-canvas px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">{p.kind}</span>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white" style={{ background: STATUS_TINT[p.status] }}>
          {p.status}
        </span>
      </div>
      <h3 className="mt-4 font-display text-[16px] font-extrabold leading-snug tracking-tight text-ink">{p.title}</h3>
      {p.authors && <p className="mt-2 text-[13px] italic text-muted">{p.authors}</p>}
      <p className="mt-1 text-[13px] font-semibold text-ink-soft">
        {[p.journal, p.year].filter(Boolean).join(" · ")}
      </p>
      <div className="mt-auto flex items-center gap-4 pt-5 text-[12.5px] font-bold">
        {p.doi && (
          <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
            DOI: {p.doi}
          </a>
        )}
        {p.href && (
          <a href={p.href} className="inline-flex items-center gap-1 text-ink-soft hover:text-ink">
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        )}
      </div>
    </article>
  );
}

function PatentCard({ p }: { p: Patent }) {
  return (
    <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-canvas px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">Patent</span>
        <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">{p.status}</span>
      </div>
      <h3 className="mt-4 font-display text-[16px] font-extrabold leading-snug tracking-tight text-ink">{p.title}</h3>
      {p.inventor && <p className="mt-2 text-[13px] italic text-muted">Inventor: {p.inventor}</p>}
      <p className="mt-1 text-[13px] font-semibold text-ink-soft">{p.office}</p>
      <dl className="mt-4 space-y-1.5 border-t border-line/70 pt-4 text-[12.5px]">
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-ink-soft">Patent No.</dt>
          <dd className="font-bold text-accent">{p.number}</dd>
        </div>
        {p.applicationNo && (
          <div className="flex justify-between gap-3">
            <dt className="font-semibold text-muted">Application</dt>
            <dd className="text-muted">{p.applicationNo}</dd>
          </div>
        )}
        {p.filed && (
          <div className="flex justify-between gap-3">
            <dt className="font-semibold text-muted">Filed</dt>
            <dd className="text-muted">{p.filed}</dd>
          </div>
        )}
        {p.granted && (
          <div className="flex justify-between gap-3">
            <dt className="font-semibold text-muted">Granted</dt>
            <dd className="text-muted">{p.granted}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

function SoonCard({ icon: IconCmp, text }: { icon: typeof FileText; text: string }) {
  return (
    <div className="col-span-full grid place-items-center rounded-3xl border-2 border-dashed border-line bg-white/40 px-6 py-16 text-center">
      <IconCmp className="h-8 w-8 text-muted/60" strokeWidth={1.5} />
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{text}</p>
      <span className="mt-3 rounded-full border border-dashed border-line px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
        Coming Soon
      </span>
    </div>
  );
}

export function Research() {
  const [tab, setTab] = useState(0);
  const collaborators = trust.groups.filter((g) => !g.soon).flatMap((g) => g.items);

  return (
    <section id="research" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={research.eyebrow} title={research.title} subtitle={research.subtitle} />

        {/* tabs */}
        <Reveal className="mt-12">
          <div role="tablist" aria-label="Research categories" className="flex flex-wrap justify-center gap-2">
            {research.tabs.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[13.5px] font-bold tracking-tight transition-all duration-200",
                  i === tab
                    ? "border-accent/50 bg-accent text-white shadow-[0_12px_28px_-14px_rgba(46,158,91,0.6)]"
                    : "border-line bg-white/60 text-ink-soft hover:border-accent/40",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-10 min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {tab === 0 &&
                research.studies.map((s, i) => {
                  const t = TINTS[i % TINTS.length];
                  return (
                    <article key={s.title} className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                      <span className="w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ background: t.soft, color: t.text }}>
                        {s.kind}
                      </span>
                      <h3 className="mt-4 font-display text-[16px] font-extrabold leading-snug tracking-tight text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[13.5px] text-muted">with {s.partner}</p>
                      <span className="mt-auto flex items-center gap-1.5 pt-4 text-[12px] font-bold text-ink-soft">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute h-full w-full animate-ping rounded-full opacity-60" style={{ background: t.bar }} />
                          <span className="relative h-2 w-2 rounded-full" style={{ background: t.bar }} />
                        </span>
                        {s.status}
                      </span>
                    </article>
                  );
                })}

              {tab === 1 &&
                (research.publications.length > 0 ? (
                  research.publications.map((p) => <PublicationCard key={p.title} p={p} />)
                ) : (
                  <SoonCard icon={FileText} text={research.publicationsSoon} />
                ))}

              {tab === 2 &&
                (research.patents.length > 0 ? (
                  research.patents.map((p) => <PatentCard key={p.number} p={p} />)
                ) : (
                  <SoonCard icon={Landmark} text={research.patentsSoon} />
                ))}

              {tab === 3 && (
                <div className="col-span-full grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {collaborators.map((c) => (
                    <div key={c.name} className="glass flex h-28 flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center">
                      {c.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.logo} alt={c.name} loading="lazy" className="h-9 w-auto max-w-[120px] object-contain opacity-75 grayscale" />
                      ) : (
                        <FlaskConical className="h-6 w-6 text-muted" />
                      )}
                      <span className="text-[11.5px] font-semibold leading-tight text-muted">{c.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
