import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { team, type TeamMember } from "@/lib/content";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function ProfileCard({ m }: { m: TeamMember }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/20">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/[0.03]">
        {m.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="grid h-full w-full place-items-center text-3xl font-black text-white/25">{initials(m.name)}</span>
        )}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(10,13,18,0.55))]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-[17px] font-extrabold tracking-tight text-white">{m.name}</h4>
        <p className="mt-0.5 text-[12.5px] font-semibold text-accent-2">{[m.role, m.affiliation].filter(Boolean).join(" · ")}</p>
        {m.bio && <p className="mt-3 text-[13px] leading-relaxed text-white/60">{m.bio}</p>}
        {m.quote && (
          <blockquote className="mt-3 border-l-2 border-accent-2/60 pl-3 font-serif text-[13.5px] font-medium italic leading-relaxed text-white/80 [font-variation-settings:'opsz'_20]">
            “{m.quote}”
          </blockquote>
        )}
      </div>
    </article>
  );
}

export function Team() {
  return (
    <section id="team" className="relative isolate flex min-h-[100svh] flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading dark eyebrow={team.eyebrow} title={team.title} subtitle={team.subtitle} />

        {/* Groups — big profile cards, leadership (CEO first) then advisory */}
        <div className="mt-14 space-y-14">
          {team.groups.map((g) => (
            <div key={g.name}>
              <div className="mb-6 flex items-center gap-4">
                <h3 className="font-display text-lg font-extrabold tracking-tight text-white">{g.name}</h3>
                <span aria-hidden className="h-px flex-1 bg-white/10" />
                <span className="text-[12px] text-white/45">{g.blurb}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.members.map((m, i) => (
                  <Reveal key={m.name} delay={(i % 3) * 0.07}>
                    <ProfileCard m={m} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
