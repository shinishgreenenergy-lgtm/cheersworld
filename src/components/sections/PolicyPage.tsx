import { Mail } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import type { PolicyDoc } from "@/lib/content";

/* Shared layout for Trust Centre documents — dossier header + ruled sections. */
export function PolicyPage({ doc }: { doc: PolicyDoc }) {
  return (
    <>
      <Aurora />
      <Header />
      <main className="pt-16">
        <section className="py-20 sm:py-28">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <Reveal>
              <div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Trust Centre</span>
                  <span className="block h-px w-10 bg-accent" />
                </div>
                <h1 className="mt-6 font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_60]">
                  {doc.title}
                </h1>
                <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted/70">
                  Last updated · {doc.updated}
                </p>
                <p className="mt-6 max-w-2xl border-l-2 border-accent/60 pl-5 font-serif text-[1.15rem] font-medium leading-[1.55] text-ink-soft [font-variation-settings:'opsz'_24]">
                  {doc.lead}
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div>
                {doc.sections.map((s, i) => (
                  <div key={s.heading} className="grid gap-3 border-t border-line py-8 last:border-b sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="mt-1 font-display text-[16px] font-extrabold leading-snug tracking-tight text-ink">{s.heading}</h2>
                    </div>
                    <div className="space-y-3.5">
                      {s.body?.map((p) => (
                        <p key={p.slice(0, 40)} className="text-[14.5px] leading-relaxed text-ink-soft">
                          {p}
                        </p>
                      ))}
                      {s.bullets && (
                        <ul className="space-y-2.5">
                          {s.bullets.map((b) => (
                            <li key={b.slice(0, 40)} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
                              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white/60 px-6 py-5 backdrop-blur">
                <p className="text-[13.5px] font-semibold text-ink-soft">Questions about this document?</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" /> Contact us
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
