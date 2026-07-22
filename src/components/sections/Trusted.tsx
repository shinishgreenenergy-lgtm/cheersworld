"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Reveal, useRevealed } from "../ui/Reveal";
import { Icon, type IconName } from "../ui/Icon";
import { trust } from "@/lib/content";
import { TINTS } from "@/lib/tints";

const GROUP_STYLE: Record<string, { tint: number; icon: IconName; blurb: string }> = {
  Clinical: { tint: 0, icon: "HeartPulse", blurb: "Hospitals & recovery" },
  Academic: { tint: 2, icon: "GraduationCap", blurb: "Schools & universities" },
  Research: { tint: 4, icon: "FlaskConical", blurb: "Labs & science" },
  Government: { tint: 5, icon: "Landmark", blurb: "Public sector" },
  Technology: { tint: 1, icon: "Network", blurb: "Platform & infra" },
};

// A proven metric in the ledger — serif numeral counting up on scroll.
function ProvenStat({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const shown = reduce ? value : n;
  return (
    <motion.div
      className="flex flex-col gap-1"
      onViewportEnter={() => setN(value)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <span className="font-serif text-[2.8rem] font-medium leading-none tracking-tight text-accent-2 [font-variation-settings:'opsz'_48]">
        <NumberFlow value={shown} animated={!reduce} />
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">{label}</span>
    </motion.div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

// The partner register with one viewport trigger for the whole column
// (per-group triggers can miss on anchor jumps and leave partners invisible),
// then a choreographed cascade: dot pops, rule draws, count ticks, cards rise.
function PartnerRegister({ groups }: { groups: typeof trust.groups }) {
  const { ref, shown } = useRevealed();
  const reduce = useReducedMotion();
  const on = shown || !!reduce;

  let slot = 0; // running stagger index across headers and cards
  const at = (span = 1) => {
    const d = 0.08 + slot * 0.055;
    slot += span;
    return d;
  };

  return (
    <div ref={(el) => void (ref.current = el)} className="flex flex-col gap-9">
      {groups.map((g, gi) => {
        const s = GROUP_STYLE[g.label] ?? { tint: gi % TINTS.length, icon: "Sparkles" as IconName, blurb: "" };
        const t = TINTS[s.tint % TINTS.length];
        const head = at();
        return (
          <div key={g.label}>
            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: t.bar }}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={on ? { scale: 1, opacity: 1 } : undefined}
                transition={{ type: "spring", stiffness: 500, damping: 22, delay: head }}
              />
              <motion.h3
                className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-white"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={on ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: head + 0.04 }}
              >
                {g.label}
              </motion.h3>
              <motion.span
                className="hidden text-[12px] text-white/45 sm:block"
                initial={reduce ? false : { opacity: 0 }}
                animate={on ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5, delay: head + 0.12 }}
              >
                {s.blurb}
              </motion.span>
              <motion.span
                aria-hidden
                className="h-px flex-1 origin-left bg-white/10"
                initial={reduce ? false : { scaleX: 0 }}
                animate={on ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: head + 0.08 }}
              />
              <motion.span
                className="font-mono text-[11.5px] font-semibold tabular-nums"
                style={{ color: t.bar }}
                initial={reduce ? false : { opacity: 0 }}
                animate={on ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: head + 0.1 }}
              >
                <NumberFlow
                  value={on ? g.items.length : 0}
                  animated={!reduce}
                  format={{ minimumIntegerDigits: 2 }}
                />
              </motion.span>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {g.items.map((p) => {
                const d = at();
                return (
                  <motion.div
                    key={p.name}
                    initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96, filter: "blur(5px)" }}
                    animate={on ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
                    transition={{ duration: 0.55, ease: EASE, delay: d }}
                  >
                  <motion.div
                    className="group flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.6)] transition-shadow duration-300 hover:shadow-[0_18px_38px_-16px_rgba(0,0,0,0.7)]"
                    whileHover={reduce ? undefined : { y: -3 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo}
                        alt=""
                        loading="lazy"
                        className="h-10 w-auto max-w-[6rem] shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-[1.06]"
                        style={{ background: t.soft, color: t.bar }}
                      >
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                    )}
                    <span className="text-[13.5px] font-semibold leading-snug text-ink">{p.name}</span>
                  </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Trusted() {
  const realGroups = trust.groups.filter((g) => !g.soon);
  const realMetrics = trust.metrics.filter((m) => m.value !== undefined);
  const soonMetrics = trust.metrics.filter((m) => m.value === undefined);

  return (
    <section id="trust" className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#12161d_0%,#0a0d12_100%)] py-24 sm:py-32">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-0 h-64 w-[42rem] max-w-[92%] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-16">
          {/* ledger rail — the claim, then the numbers that back it */}
          <Reveal>
            <div className="flex h-full flex-col">
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-2">Trusted Collaborations</span>
                <span className="block h-px w-10 bg-accent-2" />
              </div>
              <h2 className="mt-5 max-w-md font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.14] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_48]">
                {trust.eyebrow}
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/65">{trust.subhead}</p>

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-2">Proven today</p>
                <div className="mt-5 grid grid-cols-3 gap-6">
                  {realMetrics.map((m) => (
                    <ProvenStat key={m.label} label={m.label} value={m.value as number} />
                  ))}
                </div>
              </div>

              {/* same ledger, unfilled slots — nothing invented, the dash is the value */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                  On the roadmap
                  <span className="ml-2 font-medium normal-case tracking-normal text-white/40">reported as it becomes real</span>
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-8">
                  {soonMetrics.map((m) => (
                    <li key={m.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-white/10 py-2">
                      <span className="text-[12.5px] font-medium text-white/55">{m.label}</span>
                      <span aria-label="not yet reported" className="font-serif text-[15px] text-white/30">—</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* the register — every partner, grouped, ruled, countable. */}
          <PartnerRegister groups={realGroups} />
        </div>
      </div>
    </section>
  );
}
