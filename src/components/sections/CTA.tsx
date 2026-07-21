"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeartPulse, GraduationCap, HardHat, Truck, Landmark, Users, ArrowUpRight, Mail, type LucideIcon } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { cta } from "@/lib/content";

const AUDIENCES: { label: string; Icon: LucideIcon }[] = [
  { label: "Hospitals", Icon: HeartPulse },
  { label: "Schools", Icon: GraduationCap },
  { label: "Mines", Icon: HardHat },
  { label: "Fleets", Icon: Truck },
  { label: "Agencies", Icon: Landmark },
  { label: "Teams", Icon: Users },
];

// How an engagement actually runs — pilots first, scale only on evidence.
const PILOT_STEPS = [
  { n: "01", title: "Scope", body: "Define the cohort, baselines and success measures with your team — before anything is deployed." },
  { n: "02", title: "Deploy", body: "The platform is configured for your organisation: portals, dashboards and check-ins for your people." },
  { n: "03", title: "Measure", body: "Outcomes are tracked against the agreed baselines and reported openly — never fabricated." },
  { n: "04", title: "Scale", body: "Expand only when the numbers earn it — from one cohort to the whole organisation." },
];

export function CTA() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[linear-gradient(135deg,#1a6e3d_0%,#2e9e5b_48%,#12a08f_100%)] px-4 py-24 sm:px-6"
    >
      {/* full-bleed decor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-[0.18]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-white/12 blur-[130px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-[6%] h-[26rem] w-[26rem] rounded-full bg-[#a7f3d0]/20 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* the ask */}
          <div>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9e88f]">Get started</span>
              <span className="block h-px w-10 bg-[#c9e88f]" />
            </div>

            <h2 className="mt-6 max-w-xl text-balance font-serif text-[clamp(2rem,4.4vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.01em] text-white [font-variation-settings:'opsz'_60]">
              {cta.title}
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">
              Start with a scoped pilot and measurable baselines — see the outcomes before you scale.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={cta.button.href}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-bold text-[#1a6e3d] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {cta.button.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="mailto:support@cheerswisdom.com?subject=Demo%20request"
                className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:bg-white/10"
              >
                Request a Demo
              </Link>
            </div>

            <a
              href="mailto:support@cheerswisdom.com"
              className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/85 underline-offset-4 hover:underline"
            >
              <Mail className="h-4 w-4" /> support@cheerswisdom.com
            </a>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-white/60">
              Your enquiry is routed to the right team — clinical, education, industry or government.
            </p>

            {/* who it's for */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {AUDIENCES.map((a) => (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur"
                >
                  <a.Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                  {a.label}
                </span>
              ))}
            </div>
          </div>

          {/* how a pilot runs — the informative half */}
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#c9e88f]">How a pilot runs</h3>
              <span aria-hidden className="h-px flex-1 bg-white/20" />
              <span className="font-mono text-[10.5px] tabular-nums text-white/50">4 steps</span>
            </div>

            <ol className="mt-2">
              {PILOT_STEPS.map((s, i) => (
                <li key={s.n} className={`flex gap-4 py-4 sm:gap-5 ${i > 0 ? "border-t border-white/15" : ""}`}>
                  <span className="pt-0.5 font-mono text-[12px] font-bold text-[#c9e88f]">{s.n}</span>
                  <div>
                    <h4 className="font-display text-[15px] font-extrabold tracking-tight text-white">{s.title}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/75">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="border-t border-white/15 pt-4 text-[12px] leading-relaxed text-white/60">
              The same discipline behind our published work: name the challenge, apply the platform, measure the
              outcome — and publish the evidence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
