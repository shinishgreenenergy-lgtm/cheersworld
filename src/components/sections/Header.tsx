"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navGroups, type NavItem } from "@/lib/content";
import { Button } from "../ui/Button";
import { TINTS } from "@/lib/tints";
import { cn } from "@/lib/cn";

// Material Symbol (ligature name) per nav group + a short blurb for the panel rail.
const GROUP_ICON: Record<string, string> = {
  Platform: "hub",
  Science: "science",
  Research: "biotech",
  Solutions: "category",
  Industries: "domain",
  Evidence: "verified",
  Company: "info",
};
const GROUP_BLURB: Record<string, string> = {
  Platform: "One Human Intelligence Platform, end to end.",
  Science: "Eight disciplines powering the AI.",
  Research: "Studies, trials, publications and patents.",
  Solutions: "Seven solutions, one platform.",
  Industries: "Where the platform creates impact.",
  Evidence: "Outcomes, case studies and proof.",
  Company: "Who we are and where we're headed.",
};

// Keyword -> Material Symbol for individual items. Order matters: first match
// wins, so specific patterns must precede broad catch-alls.
const ICON_RULES: [RegExp, string][] = [
  [/case stud/i, "fact_check"],
  [/whitepaper/i, "article"],
  [/clinical|trial/i, "clinical_notes"],
  [/education/i, "school"],
  [/mining/i, "terrain"],
  [/drive|transport/i, "directions_car"],
  [/decision/i, "query_stats"],
  [/outcome/i, "trending_up"],
  [/situational|awareness/i, "sensors"],
  [/behaviou?r/i, "psychology"],
  [/neuroscience/i, "science"],
  [/human factor/i, "diversity_3"],
  [/phenotyp/i, "monitoring"],
  [/psycholog/i, "psychology"],
  [/overview|platform/i, "hub"],
  [/architecture/i, "schema"],
  [/predict/i, "query_stats"],
  [/intervention/i, "bolt"],
  [/analytic/i, "monitoring"],
  [/responsible|ethic/i, "balance"],
  [/security/i, "security"],
  [/integration/i, "extension"],
  [/publication|paper/i, "description"],
  [/patent/i, "workspace_premium"],
  [/collaborat/i, "handshake"],
  [/stud/i, "biotech"],
  [/report/i, "description"],
  [/team|leadership|advisor/i, "groups"],
  [/health/i, "local_hospital"],
  [/digital/i, "verified_user"],
  [/presence/i, "groups"],
  [/finance/i, "account_balance"],
  [/sport/i, "sports_soccer"],
  [/government/i, "account_balance"],
  [/corporate/i, "business"],
  [/insurance/i, "shield"],
  [/ngo/i, "volunteer_activism"],
  [/success/i, "emoji_events"],
  [/roi/i, "trending_up"],
  [/story/i, "auto_stories"],
  [/vision|mission/i, "flag"],
  [/timeline/i, "timeline"],
  [/gallery/i, "photo_library"],
  [/contact/i, "mail"],
  [/media/i, "newspaper"],
  [/career/i, "work"],
  [/science/i, "science"],
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

function SoonChip() {
  return (
    <span className="ml-auto shrink-0 rounded-full border border-line/80 bg-white/50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-muted">
      Soon
    </span>
  );
}

// One panel row: a link when href exists, a muted non-link otherwise.
function PanelItem({ item, group, tintText }: { item: NavItem; group: string; tintText: string }) {
  const inner = (
    <>
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/70 bg-white/60"
        style={{ color: item.href ? tintText : "var(--color-muted)" }}
      >
        <Sym name={itemIcon(item.label, group)} className="text-[18px]" />
      </span>
      <span
        className={cn(
          "text-[13px] font-semibold",
          item.href ? "text-ink-soft transition-colors group-hover/i:text-ink" : "text-muted",
        )}
      >
        {item.label}
      </span>
      {!item.href && <SoonChip />}
    </>
  );
  const facets = item.facets && (
    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 pl-[42px]">
      {item.facets.map((f) =>
        f.href ? (
          <Link key={f.label} href={f.href} className="text-[11px] font-semibold text-muted underline-offset-2 hover:text-ink hover:underline">
            {f.label}
          </Link>
        ) : (
          <span key={f.label} className="text-[11px] font-medium text-muted/60">
            {f.label}
          </span>
        ),
      )}
    </span>
  );
  if (!item.href) {
    return (
      <span className="flex cursor-default flex-col rounded-xl px-2.5 py-2 opacity-75">
        <span className="flex items-center gap-2.5">{inner}</span>
        {facets}
      </span>
    );
  }
  return (
    <span className="flex flex-col">
      <Link href={item.href} className="group/i flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/70">
        {inner}
      </Link>
      {facets}
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
    <header
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "py-2" : "py-4")}
      // Escape closes whichever mega panel currently holds focus.
      onKeyDown={(e) => {
        if (e.key === "Escape") (document.activeElement as HTMLElement | null)?.blur();
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(20,22,42,0.18)]" : "bg-transparent",
          )}
        >
          {/* Logo */}
          <Link href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center">
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
                    className="flex items-center gap-0.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-ink-soft transition-colors group-hover:text-accent group-focus-within:text-accent"
                  >
                    {g.label}
                    <ChevronDown className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div
                    className={cn(
                      "absolute top-full z-50 pt-3",
                      alignRight ? "right-0" : "left-0",
                      "pointer-events-none translate-y-1 opacity-0 transition-all duration-200",
                      "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                      "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    )}
                  >
                    <div className="glass w-[40rem] overflow-hidden rounded-2xl shadow-[0_30px_60px_-24px_rgba(20,22,42,0.34)]">
                      <div className="grid grid-cols-[13rem_1fr]">
                        {/* intro rail */}
                        <div className="flex flex-col gap-3 border-r border-line/60 bg-white/35 p-5">
                          <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: t.soft, color: t.text }}>
                            <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[24px]" />
                          </span>
                          <p className="font-display text-base font-extrabold leading-tight text-ink">{g.full ?? g.label}</p>
                          <p className="text-[13px] leading-relaxed text-muted">{GROUP_BLURB[g.label]}</p>
                          <Link href={g.href} className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: t.text }}>
                            Explore <Sym name="arrow_forward" className="text-[16px]" />
                          </Link>
                        </div>
                        {/* items */}
                        <div className={cn("grid gap-1 p-3", g.label === "Solutions" ? "grid-cols-1" : "grid-cols-2")}>
                          {g.items.map((it) => (
                            <PanelItem key={it.label} item={it} group={g.label} tintText={t.text} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
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
                        <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: t.soft, color: t.text }}>
                          <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[18px]" />
                        </span>
                        {g.full ?? g.label}
                      </span>
                      <ChevronDown className="chev h-4 w-4 text-muted" />
                    </summary>
                    <div className="flex flex-col pb-2 pl-2">
                      {g.items.map((it) =>
                        it.href ? (
                          <Link
                            key={it.label}
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-canvas"
                          >
                            <Sym name={itemIcon(it.label, g.label)} className="text-[18px] text-muted" />
                            {it.label}
                          </Link>
                        ) : (
                          <span key={it.label} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted opacity-75">
                            <Sym name={itemIcon(it.label, g.label)} className="text-[18px] text-muted" />
                            {it.label}
                            <SoonChip />
                          </span>
                        ),
                      )}
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
