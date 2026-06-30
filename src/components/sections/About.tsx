import { Reveal } from "../ui/Reveal";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <div className="flex flex-col items-start gap-2.5">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">{about.eyebrow}</span>
              <span className="block h-[3px] w-10 rounded-full bg-accent" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-balance text-4xl font-light leading-[1.12] tracking-tight text-ink sm:text-5xl">
              {about.title}
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="grad-border relative overflow-hidden rounded-4xl border border-line glass p-8 sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
            <p className="relative text-sm font-bold uppercase tracking-[0.14em] text-accent">
              Five dimensions of wellness
            </p>
            <ul className="relative mt-6 flex flex-col gap-3">
              {about.dimensions.map((d, i) => (
                <li key={d} className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-4 py-3.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-xs font-black text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
