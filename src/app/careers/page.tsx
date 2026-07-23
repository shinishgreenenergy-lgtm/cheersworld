import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { CareersApplyForm } from "@/components/sections/CareersApplyForm";
import { TINTS } from "@/lib/tints";

const AREAS = [
  {
    title: "Engineering",
    desc: "Mobile, platform and ML engineers building longitudinal intelligence systems that run in the real world — hospitals, schools, mines.",
  },
  {
    title: "Clinical & Research",
    desc: "Clinicians and researchers who want their work to ship: study design, outcome measurement, and peer-reviewed publication.",
  },
  {
    title: "Behavioral Science",
    desc: "Psychologists and behavioral scientists shaping how the platform observes, models and guides human state — responsibly.",
  },
  {
    title: "Design & Communication",
    desc: "People who can make a daily check-in feel human, and a clinical dashboard feel obvious.",
  },
];

export const metadata: Metadata = {
  title: "Careers · Cheers Wisdom",
  description:
    "Join the team building state-aware AI for human well-being — engineering, clinical research, behavioral science and design.",
};

export default function Page() {
  return (
    <>
      <Aurora />
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Careers
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-2xl text-balance font-serif text-[clamp(2.1rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_60]">
                Build AI that helps humans flourish
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted">
                We&apos;re a small team of clinicians, scientists and engineers building state-aware AI across health,
                education, safety and finance. We don&apos;t maintain a big job board — if the work resonates, write to us.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-4 sm:py-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {AREAS.map((a, i) => {
                const t = TINTS[i % TINTS.length];
                return (
                  <Reveal key={a.title} delay={(i % 2) * 0.06}>
                    <div className="glass relative h-full overflow-hidden rounded-2xl px-5 py-6">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                      <h3 className="font-display text-[15.5px] font-extrabold tracking-tight text-ink">{a.title}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{a.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                  <h2 className="text-balance font-serif text-2xl font-medium text-ink sm:text-3xl">
                    Tell us what you&apos;d build here
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted">
                    Send a short note about yourself and the problems you want to work on — attach your CV or share a
                    portfolio link.
                  </p>
                </div>
                <CareersApplyForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
