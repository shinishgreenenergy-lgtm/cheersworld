import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { partners } from "@/lib/content";

export function Partners() {
  return (
    <section id="research" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={partners.eyebrow} title={partners.title} subtitle={partners.subtitle} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {partners.groups.map((g, i) => (
            <Reveal key={g.heading} delay={i * 0.08}>
              <div className="group flex h-full flex-col items-center border border-line bg-white px-8 py-10 text-center shadow-[0_24px_50px_-34px_rgba(20,22,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_rgba(46,158,91,0.35)]">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <Icon name={g.icon} className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">{g.heading}</h3>
                <span className="mt-3 block h-[2px] w-8 bg-accent/70" />
                <ul className="mt-5 w-full">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="border-t border-line/80 py-3 text-[15px] text-ink-soft transition-colors duration-200 hover:text-accent"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
