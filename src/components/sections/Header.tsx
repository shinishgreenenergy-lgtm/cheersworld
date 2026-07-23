"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ChevronDown } from "lucide-react";

import { navGroups, type NavItem } from "@/lib/content";
import { Button } from "../ui/Button";
import { SearchPalette } from "../ui/SearchPalette";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
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
  [/knowledge|glossary|faq/i, "menu_book"],
  [/case stud/i, "fact_check"],
  [/whitepaper/i, "article"],
  [/clinical|trial/i, "clinical_notes"],
  [/education/i, "school"],
  [/mining|miner/i, "terrain"],
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
  [/social/i, "diversity_3"],
  [/fashion/i, "checkroom"],
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
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.07]"
        style={{ color: item.href ? tintText : "rgba(255,255,255,0.4)" }}
      >
        <Sym name={itemIcon(item.label, group)} className="text-[18px]" />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block text-[13px] font-semibold leading-tight",
            item.href ? "text-white/80 transition-colors group-hover/i:text-white" : "text-white/45",
          )}
        >
          {item.label}
        </span>
        {item.desc && <span className="mt-0.5 block text-[11px] leading-snug text-white/45">{item.desc}</span>}
      </span>
      {!item.href && <SoonChip />}
    </>
  );
  const facets = item.facets && (
    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 pl-[42px]">
      {item.facets.map((f) =>
        f.href ? (
          <NavigationMenuLink key={f.label} asChild>
            <Link href={f.href} className="text-[11px] font-semibold text-white/55 underline-offset-2 hover:text-white hover:underline">
              {f.label}
            </Link>
          </NavigationMenuLink>
        ) : (
          <span key={f.label} className="text-[11px] font-medium text-white/35">
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
      <NavigationMenuLink asChild>
        <Link href={item.href} className="group/i flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/[0.07]">
          {inner}
        </Link>
      </NavigationMenuLink>
      {facets}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(false);
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          <Link href="/#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center">
              <Image src="/cheers-mark.png" alt="Cheers Wisdom" width={56} height={56} className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">Cheers Wisdom</span>
          </Link>

          {/* Desktop mega-nav — Radix NavigationMenu, one shared viewport */}
          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList>
              {navGroups.map((g, i) => {
                const t = TINTS[i % TINTS.length];
                return (
                  <NavigationMenuItem key={g.label}>
                    <NavigationMenuTrigger>{g.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="relative w-[46rem] overflow-hidden">
                        {/* gray + red tonal lights along the top */}
                        <div aria-hidden className="pointer-events-none absolute -top-14 left-[18%] h-28 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(224,45,36,0.22),transparent)] blur-2xl" />
                        <div aria-hidden className="pointer-events-none absolute -top-16 right-[12%] h-28 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(200,210,225,0.16),transparent)] blur-2xl" />

                        <div className="relative grid grid-cols-[13rem_1fr]">
                          {/* intro rail */}
                          <div className="flex flex-col gap-3 border-r border-white/10 bg-white/[0.03] p-5">
                            <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: t.soft, color: t.bar }}>
                              <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[24px]" />
                            </span>
                            <p className="font-display text-base font-extrabold leading-tight text-white">{g.full ?? g.label}</p>
                            <p className="text-[13px] leading-relaxed text-white/55">{GROUP_BLURB[g.label]}</p>
                            <NavigationMenuLink asChild>
                              <Link href={g.href} className="mt-1 inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: t.bar }}>
                                Explore <Sym name="arrow_forward" className="text-[16px]" />
                              </Link>
                            </NavigationMenuLink>
                          </div>
                          {/* items */}
                          <div className="grid max-h-[23rem] grid-cols-2 content-start gap-1 overflow-y-auto p-3">
                            {g.items.map((it) => (
                              <PanelItem key={it.label} item={it} group={g.label} tintText={t.bar} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search (⌘K)"
              className="flex items-center gap-2 rounded-xl border border-line bg-white/60 px-3 py-2.5 text-muted transition-colors hover:text-ink"
            >
              <Search className="h-4 w-4" />
              <kbd className="text-[10px] font-bold">⌘K</kbd>
            </button>
            <Button href="/contact" className="px-5 py-2.5">
              Get in Touch
            </Button>
          </div>

          {/* Mobile search + drawer */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/60"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/60"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                aria-describedby={undefined}
                className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.82))] backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetClose aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-2">
                  <Accordion type="single" collapsible>
                    {navGroups.map((g, i) => {
                      const t = TINTS[i % TINTS.length];
                      return (
                        <AccordionItem key={g.label} value={g.label} className="border-line/70">
                          <AccordionTrigger className="px-2 py-3.5 text-[15px] font-bold text-ink hover:no-underline">
                            <span className="flex items-center gap-2.5">
                              <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: t.soft, color: t.text }}>
                                <Sym name={GROUP_ICON[g.label] ?? "category"} className="text-[18px]" />
                              </span>
                              {g.full ?? g.label}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-2 pl-2">
                            <div className="flex flex-col">
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
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
                <div className="border-t border-line p-4">
                  <Button href="/contact" magnetic={false} className="w-full">
                    Get in Touch
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
