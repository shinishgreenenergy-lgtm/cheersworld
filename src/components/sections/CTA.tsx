"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeartPulse, GraduationCap, HardHat, Truck, Landmark, Users, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { cta } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const AUDIENCES: { label: string; Icon: LucideIcon }[] = [
  { label: "Hospitals", Icon: HeartPulse },
  { label: "Schools", Icon: GraduationCap },
  { label: "Mines", Icon: HardHat },
  { label: "Fleets", Icon: Truck },
  { label: "Agencies", Icon: Landmark },
  { label: "Teams", Icon: Users },
];

const STEPS = ["Scoped pilot", "Measurable baselines", "Clear outcomes"];

export function CTA() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[linear-gradient(135deg,#1a6e3d_0%,#2e9e5b_48%,#12a08f_100%)] px-4 py-24 text-center sm:px-6"
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
      {/* soft top/bottom vignette to seat it between neighbours */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),transparent)]" />

      <Reveal>
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Get started
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-[3.5rem]">
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Start with a scoped pilot and measurable baselines — see the outcomes before you scale.
          </p>

          {/* audience pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {AUDIENCES.map((a, i) => (
              <motion.span
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur"
              >
                <a.Icon className="h-4 w-4" strokeWidth={1.9} />
                {a.label}
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={cta.button.href}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#1a6e3d] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {cta.button.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="mailto:support@cheerswisdom.com?subject=Demo%20request"
              className="inline-flex items-center rounded-full border border-white/40 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Request a Demo
            </Link>
          </div>

          {/* steps */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-semibold text-white/80">
            {STEPS.map((s, i) => (
              <span key={s} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-white/50" />}
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
