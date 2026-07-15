import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { team, type TeamMember } from "@/lib/content";
import { TINTS } from "@/lib/tints";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

// Fully-designed member card — used the moment real profiles are added.
function MemberCard({ m, tile, glow }: { m: TeamMember; tile: string; glow: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3">
      {m.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={m.photo} alt={m.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-black text-white" style={{ background: tile, boxShadow: `0 10px 22px -12px ${glow}` }}>
          {initials(m.name)}
        </span>
      )}
      <span>
        <span className="block text-[13.5px] font-bold text-white">{m.name}</span>
        <span className="block text-[11.5px] text-white/55">{[m.role, m.affiliation].filter(Boolean).join(" · ")}</span>
      </span>
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative isolate min-h-[100svh] flex flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={team.eyebrow} title={team.title} subtitle={team.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.groups.map((g, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={g.name} delay={(i % 3) * 0.07}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: t.soft, color: t.bar }}>
                      <Icon name={g.icon} className="h-5.5 w-5.5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-display text-[16px] font-extrabold tracking-tight text-white">{g.name}</h3>
                      <p className="text-[12px] text-white/60">{g.blurb}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-1 flex-col gap-2">
                    {g.members.length > 0 ? (
                      g.members.map((m) => <MemberCard key={m.name} m={m} tile={t.tile} glow={t.glow} />)
                    ) : (
                      <div className="grid flex-1 place-items-center rounded-xl border-2 border-dashed border-white/15 bg-white/[0.03] px-4 py-8 text-center">
                        <p className="text-[12.5px] font-semibold text-white/55">
                          Profiles being published
                          <span className="mt-2 block rounded-full border border-dashed border-white/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">
                            Coming Soon
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
