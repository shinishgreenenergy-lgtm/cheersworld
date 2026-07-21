"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
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

type Member = TeamMember & { group: string };

const MEMBERS: Member[] = team.groups.flatMap((g) => g.members.map((m) => ({ ...m, group: g.name })));

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/* The spotlight — portrait, identity, bio and links for the member in focus. */
function Spotlight({ m }: { m: Member }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
        {m.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.photo} alt={m.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        ) : (
          <span className="grid aspect-[4/5] w-full place-items-center text-4xl font-black text-white/25">{initials(m.name)}</span>
        )}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(8,10,14,0.85))]" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-accent-2">{m.group}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">{m.name}</h3>
          <p className="mt-0.5 text-[12.5px] font-semibold text-white/75">{[m.role, m.affiliation].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      {m.bio && <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">{m.bio}</p>}
      {(m.linkedin || m.href) && (
        <div className="mt-4 flex items-center gap-2">
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-accent-2/60 hover:text-accent-2"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {m.href && (
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1 rounded-full border border-white/15 px-3.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-accent-2/60 hover:text-accent-2"
            >
              Profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Team() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = MEMBERS[active];
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

        {/* the roster + the spotlight */}
        <Reveal className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {team.groups.map((g) => (
              <div key={g.name} className="mb-9 last:mb-0">
                <div className="mb-1 flex items-center gap-4">
                  <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/45">{g.name}</h3>
                  <span aria-hidden className="h-px flex-1 bg-white/10" />
                  <span className="font-mono text-[10.5px] tabular-nums text-white/35">{String(g.members.length).padStart(2, "0")}</span>
                </div>

                {g.members.map((m) => {
                  idx += 1;
                  const i = idx;
                  const on = active === i;
                  return (
                    <div key={m.name} className="border-b border-white/10 first-of-type:border-t">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        aria-pressed={on}
                        className="group flex w-full items-baseline gap-4 py-4 text-left sm:py-5"
                      >
                        <span className={`font-mono text-[11px] tabular-nums transition-colors ${on ? "text-accent-2" : "text-white/35"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.35rem,3vw,2.1rem)] font-extrabold leading-none tracking-tight transition-colors duration-300 ${
                            on ? "text-accent-2" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {m.name}
                        </span>
                        <span className="ml-auto hidden max-w-[16rem] shrink-0 text-right text-[12px] leading-snug text-white/45 sm:block">
                          {m.role}
                        </span>
                      </button>

                      {/* focused detail expands in place below lg */}
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            key="detail"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden lg:hidden"
                          >
                            <div className="max-w-sm pb-6">
                              <Spotlight m={{ ...m, group: g.name }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* sticky spotlight (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Spotlight m={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
