import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { DemoRequestForm } from "@/components/sections/DemoRequestForm";

export const metadata: Metadata = {
  title: "Request a Demo · Cheers Wisdom",
  description:
    "See the Human Intelligence Platform live — a walkthrough tailored to your domain, from clinical recovery to workforce safety.",
};

const STEPS = [
  {
    n: "01",
    title: "A walkthrough, not a pitch",
    body: "30 minutes in the live platform — the daily check-in experience, the AI risk engine, and the dashboards your teams would use.",
  },
  {
    n: "02",
    title: "Tailored to your domain",
    body: "Hospital, school, mine or fleet — we demo the solution and outcomes that match your population, not a generic tour.",
  },
  {
    n: "03",
    title: "Pilot scoping",
    body: "If it resonates, we sketch what a measurable pilot would look like for your organisation — baselines, timeline, effort.",
  },
];

export default function Page() {
  return (
    <>
      <Aurora />
      <Header />
      <main className="min-h-[100svh] px-4 pb-24 pt-32 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Request a demo</span>
              <span className="block h-px w-10 bg-accent" />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* left — what to expect */}
            <Reveal>
              <div>
                <h1 className="max-w-xl text-balance font-serif text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_60]">
                  See the platform <em className="text-accent-2 not-italic">live</em>
                </h1>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted">
                  One platform observing, understanding and predicting human behaviour — demoed on the domain you care
                  about. Tell us who you are and we&apos;ll set it up.
                </p>

                <div className="mt-10 flex flex-col gap-6">
                  {STEPS.map((s) => (
                    <div key={s.n} className="flex gap-4 border-t border-line pt-5">
                      <span className="font-mono text-[11px] font-bold text-accent">{s.n}</span>
                      <div>
                        <h3 className="font-display text-[15px] font-extrabold tracking-tight text-ink">{s.title}</h3>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* right — the form */}
            <Reveal delay={0.08}>
              <DemoRequestForm />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
