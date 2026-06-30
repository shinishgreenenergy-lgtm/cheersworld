"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navGroups } from "@/lib/content";
import { Button } from "../ui/Button";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

// Material Symbol (ligature name) per nav group + a short blurb for the panel rail.
const GROUP_ICON: Record<string, string> = {
  About: "info",
  Science: "science",
  Platform: "dashboard",
  Solutions: "category",
  Industries: "domain",
  Evidence: "verified",
  Resources: "menu_book",
  Partners: "handshake",
  Trust: "shield",
  Contact: "mail",
};
const GROUP_BLURB: Record<string, string> = {
  About: "Who we are and where we're headed.",
  Science: "The research powering our AI.",
  Platform: "How the technology works.",
  Solutions: "Adaptive AI across every domain.",
  Industries: "Where we create real impact.",
  Evidence: "Proof, outcomes and stories.",
  Resources: "Learn, watch and explore.",
  Partners: "The institutions we build with.",
  Trust: "Privacy, security and ethics.",
  Contact: "Talk to the right team.",
};

// Keyword -> Material Symbol for individual items.
const ICON_RULES: [RegExp, string][] = [
  [/story/i, "auto_stories"], [/vision|mission/i, "flag"], [/leader|advisor|board/i, "diversity_3"],
  [/team/i, "groups"], [/timeline/i, "timeline"], [/career/i, "work"],
  [/foundation|scientific/i, "science"], [/publication|white\s*paper|report/i, "description"],
  [/clinical|trial/i, "clinical_notes"], [/patent/i, "workspace_premium"], [/collaborat/i, "diversity_3"],
  [/architecture/i, "schema"], [/situational|awareness/i, "sensors"], [/intervention|engine/i, "bolt"],
  [/analytic/i, "monitoring"], [/security/i, "security"], [/privacy/i, "lock"],
  [/complian/i, "policy"], [/responsible|ethic/i, "balance"],
  [/health|hospital/i, "local_hospital"], [/digital\s*safety/i, "verified_user"],
  [/mining/i, "terrain"], [/driving|transport/i, "directions_car"], [/finance/i, "account_balance"],
  [/social/i, "groups"], [/sport/i, "sports_soccer"], [/future/i, "rocket_launch"],
  [/government/i, "account_balance"], [/education|school|universit/i, "school"],
  [/enterprise/i, "business"], [/technology/i, "memory"], [/ngo/i, "volunteer_activism"],
  [/case\s*stud/i, "fact_check"], [/success/i, "emoji_events"], [/outcome/i, "trending_up"],
  [/testimonial/i, "format_quote"], [/knowledge/i, "menu_book"], [/blog/i, "article"],
  [/video/i, "smart_display"], [/download/i, "download"], [/gallery/i, "photo_library"],
  [/event/i, "event"], [/media/i, "newspaper"], [/sales/i, "sell"], [/research/i, "biotech"],
  [/support/i, "support_agent"],
];
function itemIcon(label: string, group: string): string {
  for (const [re, ic] of ICON_RULES) if (re.test(label)) return ic;
  return GROUP_ICON[group] ?? "chevron_right";
}

function Sym({ name, className }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={cn("msym", className)}>
      {name}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "py-2" : "py-4")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(20,22,42,0.18)]" : "bg-transparent",
          )}
        >
          {/* Logo */}
          <Link href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-[#0a160d] ring-1 ring-black/5">
              <Image src="/cheers-logo.svg" alt="Cheers Wisdom" width={56} height={56} className="h-full w-full" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">Cheers Wisdom</span>
          </Link>

          {/* Desktop mega-nav */}
          <nav className="hidden items-center xl:flex">
            {navGroups.map((g, i) => {
              const alignRight = i >= Math.ceil(navGroups.length / 2);
              const t = TINTS[i % TINTS.length];
              return (
                <div key={g.label} className="group relative">
                  <Link
                    href={g.href}
                    className="flex items-center gap-0.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-ink-soft transition-colors group-hover:text-accent"
                  >
                    {g.label}
                    <ChevronDown className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div
                    className={cn(
                      "absolute top-full z-50 pt-3",
                      alignRight ? "right-0" : "left-0",
                      "pointer-events-none translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                    )}
                  >
                    <div className="glass w-[40rem] overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgba(20,22,42,0.34)]">
                      <div className="grid grid-cols-[13rem_1fr]">
                        {/* intro rail */}
                        <div className="flex flex-col gap-3 border-r border-line/60 bg-white/35 p-5">
                          <span
                            className="grid h-11 w-11 place-items-center rounded-xl"
                            style={{ background: t.soft, color: t.text }}
                          >
                            <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[24px]" />
                          </span>
                          <p className="font-display text-base font-extrabold leading-tight text-ink">{g.full ?? g.label}</p>
                          <p className="text-[13px] leading-relaxed text-muted">{GROUP_BLURB[g.label]}</p>
                          <Link
                            href={g.href}
                            className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold"
                            style={{ color: t.text }}
                          >
                            Explore <Sym name="arrow_forward" className="text-[16px]" />
                          </Link>
                        </div>
                        {/* items */}
                        <div className="grid grid-cols-2 gap-1 p-3">
                          {g.items.map((it) => (
                            <Link
                              key={it.label}
                              href={it.href}
                              className="group/i flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/70"
                            >
                              <span
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/70 bg-white/60 transition-colors"
                                style={{ color: t.text }}
                              >
                                <Sym name={itemIcon(it.label, g.label)} className="text-[18px]" />
                              </span>
                              <span className="text-[13px] font-semibold text-ink-soft transition-colors group-hover/i:text-ink">
                                {it.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 xl:block">
            <Button href="#contact" className="px-5 py-2.5">
              Get in Touch
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/60 xl:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer with accordions */}
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.7))] shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display font-extrabold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {navGroups.map((g, i) => {
                const t = TINTS[i % TINTS.length];
                return (
                  <details key={g.label} className="border-b border-line/70">
                    <summary className="flex items-center justify-between px-2 py-3.5 text-[15px] font-bold text-ink">
                      <span className="flex items-center gap-2.5">
                        <span
                          className="grid h-8 w-8 place-items-center rounded-lg"
                          style={{ background: t.soft, color: t.text }}
                        >
                          <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[18px]" />
                        </span>
                        {g.full ?? g.label}
                      </span>
                      <ChevronDown className="chev h-4 w-4 text-muted" />
                    </summary>
                    <div className="flex flex-col pb-2 pl-2">
                      {g.items.map((it) => (
                        <Link
                          key={it.label}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-canvas"
                        >
                          <Sym name={itemIcon(it.label, g.label)} className="text-[18px] text-muted" />
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
            <div className="border-t border-line p-4">
              <Button href="#contact" magnetic={false} className="w-full">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
