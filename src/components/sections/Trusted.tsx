import { Reveal } from "../ui/Reveal";
import { TrustMetric } from "../ui/TrustMetric";
import { trust } from "@/lib/content";

function LogoMark({ name, logo }: { name: string; logo: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={name}
      loading="lazy"
      className="h-9 w-auto max-w-[150px] object-contain opacity-65 grayscale mix-blend-multiply transition-all duration-300 hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function Trusted() {
  const soonGroups = trust.groups.filter((g) => g.soon);
  return (
    <section id="trust" className="relative isolate scroll-mt-24 overflow-hidden border-y border-line bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em] text-muted">{trust.eyebrow}</p>
        </Reveal>

        {/* grouped logo rows */}
        <div className="mt-8 flex flex-col gap-6">
          {trust.groups.filter((g) => !g.soon).map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.06}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
                <span className="w-28 shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-accent sm:text-right">
                  {g.label}
                </span>
                <span className="hidden h-px flex-1 max-w-10 bg-line sm:block" />
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                  {g.items.map((p) => p.logo && <LogoMark key={p.name} name={p.name} logo={p.logo} />)}
                </div>
              </div>
            </Reveal>
          ))}
          {soonGroups.length > 0 && (
            <Reveal delay={0.2}>
              <p className="text-center text-[12px] font-semibold text-muted">
                {soonGroups.map((g) => g.label).join(" & ")} partnerships —{" "}
                <span className="rounded-full border border-dashed border-line px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">
                  Coming Soon
                </span>
              </p>
            </Reveal>
          )}
        </div>

        {/* metrics band */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-3 divide-x divide-line/60 rounded-2xl border border-line/70 bg-canvas/60 sm:grid-cols-5 lg:grid-cols-9">
            {trust.metrics.map((m) => (
              <TrustMetric key={m.label} {...m} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
