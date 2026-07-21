"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import { team, type TeamMember } from "@/lib/content";

// lucide-react no longer ships brand icons, so the LinkedIn glyph is inlined.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function PortraitCard({ m, index }: { m: TeamMember; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
    >
      {/* portrait */}
      {m.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      ) : (
        <span className="grid aspect-[3/4] w-full place-items-center text-4xl font-black text-white/25">{initials(m.name)}</span>
      )}

      {/* index */}
      <span
        aria-hidden
        className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] font-bold tabular-nums text-white/85 backdrop-blur-sm"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* links — float in from the corner */}
      {(m.linkedin || m.href) && (
        <span className="absolute right-4 top-4 flex gap-1.5">
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white/85 backdrop-blur-sm transition-colors hover:bg-accent hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {m.href && (
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} profile`}
              className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white/85 backdrop-blur-sm transition-colors hover:bg-accent hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </span>
      )}

      {/* identity */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(180deg,transparent,rgba(6,8,12,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h4 className="font-display text-[19px] font-extrabold tracking-tight text-white">{m.name}</h4>
        <p className="mt-0.5 text-[12.5px] font-semibold text-accent-2">{[m.role, m.affiliation].filter(Boolean).join(" · ")}</p>
        {m.bio && (
          <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-white/65 sm:line-clamp-none sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-24 sm:group-hover:opacity-100">
            {m.bio}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export function Team() {
  let idx = -1;
  return (
    <section id="team" className="relative isolate flex min-h-[100svh] flex-col justify-center scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[50rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* dossier header */}
        <Reveal>
          <div>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">{team.eyebrow}</span>
              <span className="block h-px w-10 bg-accent-2" />
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.13] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
                {team.title}
              </h2>
              <p className="max-w-md text-[14.5px] leading-relaxed text-white/60 lg:pb-1.5">{team.subtitle}</p>
            </div>
          </div>
        </Reveal>

        {/* portrait wall — everyone visible, grouped and ruled */}
        <div className="mt-12 space-y-12">
          {team.groups.map((g) => (
            <Reveal key={g.name}>
              <div className="mb-5 flex items-center gap-4">
                <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/50">{g.name}</h3>
                <span aria-hidden className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[10.5px] tabular-nums text-white/35">{String(g.members.length).padStart(2, "0")}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {g.members.map((m) => {
                  idx += 1;
                  return <PortraitCard key={m.name} m={m} index={idx} />;
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
