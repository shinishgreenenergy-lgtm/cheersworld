import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { scienceSoul } from "@/lib/content";

export function ScienceSoul() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2e9e5b_0%,#1f8a4c_60%,#2e8b57_100%)] py-20 sm:py-28">
      <div className="absolute inset-0 bg-dots opacity-[0.12]" />
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/75">{scienceSoul.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-balance text-3xl font-light leading-tight text-white sm:text-4xl">
              {scienceSoul.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/85">{scienceSoul.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {scienceSoul.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.08}>
              <div className="group flex flex-col items-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/35 text-white transition-colors duration-300 group-hover:bg-white/10">
                  <Icon name={f.icon} className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
