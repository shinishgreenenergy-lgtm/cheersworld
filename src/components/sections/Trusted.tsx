import { Reveal } from "../ui/Reveal";
import { TrustMetric } from "../ui/TrustMetric";
import { Icon, type IconName } from "../ui/Icon";
import { trust } from "@/lib/content";
import { TINTS } from "@/lib/tints";

// Each partner category gets a colour from the shared TINTS palette plus an
// icon + one-line descriptor, so the strip reads as a structured credential
// ledger instead of an anonymous logo soup.
const GROUP_STYLE: Record<string, { tint: number; icon: IconName; blurb: string }> = {
  Clinical: { tint: 0, icon: "HeartPulse", blurb: "Hospitals & recovery" },
  Academic: { tint: 2, icon: "GraduationCap", blurb: "Schools & universities" },
  Research: { tint: 4, icon: "FlaskConical", blurb: "Labs & science" },
  Government: { tint: 5, icon: "Landmark", blurb: "Public sector" },
  Technology: { tint: 1, icon: "Network", blurb: "Platform & infra" },
};

function LogoMark({ name, logo }: { name: string; logo: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={name}
      title={name}
      loading="lazy"
      className="h-8 w-auto max-w-[132px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function Trusted() {
  const realGroups = trust.groups.filter((g) => !g.soon);
  const soonGroups = trust.groups.filter((g) => g.soon);
  const realMetrics = trust.metrics.filter((m) => m.value !== undefined);
  const soonMetrics = trust.metrics.filter((m) => m.value === undefined);

  return (
    <section
      id="trust"
      className="relative isolate scroll-mt-24 overflow-hidden border-y border-line bg-white py-16 sm:py-20"
    >
      {/* atmosphere: faint dotted field fading out to the edges, hairline accent on top */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(46,158,91,0.35),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Trusted Collaborations
            </span>
            <h2 className="max-w-xl text-balance font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight tracking-tight text-ink">
              {trust.eyebrow}
            </h2>
          </div>
        </Reveal>

        {/* category credential cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {realGroups.map((g, gi) => {
            const s = GROUP_STYLE[g.label] ?? { tint: gi % TINTS.length, icon: "Sparkles" as IconName, blurb: "" };
            const t = TINTS[s.tint % TINTS.length];
            return (
              <Reveal key={g.label} delay={gi * 0.08}>
                <div className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(20,22,42,0.35)]">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                      style={{ background: t.tile, boxShadow: `0 12px 26px -14px ${t.glow}` }}
                    >
                      <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[15px] font-extrabold tracking-tight text-ink">{g.label}</h3>
                      <p className="truncate text-[12px] text-muted">{s.blurb}</p>
                    </div>
                    <span
                      className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums"
                      style={{ background: t.soft, color: t.text }}
                    >
                      {g.items.length}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-1 flex-wrap items-center gap-x-6 gap-y-4 border-t border-line/70 pt-5">
                    {g.items.map((p) => p.logo && <LogoMark key={p.name} name={p.name} logo={p.logo} />)}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* coming-soon partner categories */}
        {soonGroups.length > 0 && (
          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {soonGroups.map((g) => {
                const s = GROUP_STYLE[g.label];
                return (
                  <span
                    key={g.label}
                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-line bg-white/50 px-4 py-2 text-[12px] font-semibold text-muted"
                  >
                    {s && <Icon name={s.icon} className="h-4 w-4 text-muted/70" strokeWidth={1.8} />}
                    {g.label}
                    <span className="rounded-full bg-canvas px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-muted/80">
                      Soon
                    </span>
                  </span>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* metrics — two honest tiers: proven today, and on the roadmap */}
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-line/70 bg-canvas/50">
            {/* proven */}
            <div className="flex items-center gap-2 border-b border-line/60 px-5 pt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Proven today</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-line/60">
              {realMetrics.map((m) => (
                <TrustMetric key={m.label} {...m} />
              ))}
            </div>

            {/* roadmap */}
            <div className="border-t border-line/60 bg-white/40 px-5 py-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                On the roadmap
                <span className="ml-2 font-medium normal-case tracking-normal text-muted/70">
                  — reported as it becomes real, never fabricated
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {soonMetrics.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line bg-white/60 px-3 py-1.5 text-[12px] font-semibold text-muted"
                  >
                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
