"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navGroups } from "@/lib/content";
import { Button } from "../ui/Button";
import { cn } from "@/lib/cn";

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
              <Image src="/cheers-logo.jpg" alt="Cheers Wisdom" width={96} height={96} className="h-full w-full scale-[1.3] object-cover object-top" />
            </span>
            <span className="text-lg font-black tracking-tight">Cheers Wisdom</span>
          </Link>

          {/* Desktop mega-nav */}
          <nav className="hidden items-center xl:flex">
            {navGroups.map((g, i) => {
              const twoCol = g.items.length > 6;
              const alignRight = i >= Math.ceil(navGroups.length / 2);
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
                    <div
                      className={cn(
                        "rounded-2xl border border-line bg-white/95 p-2.5 shadow-[0_24px_50px_-20px_rgba(20,22,42,0.28)] backdrop-blur",
                        twoCol ? "w-[30rem]" : "w-56",
                      )}
                    >
                      {g.full && (
                        <div className="px-2.5 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{g.full}</div>
                      )}
                      <div className={cn("grid gap-0.5", twoCol ? "grid-cols-2" : "grid-cols-1")}>
                        {g.items.map((it) => (
                          <Link
                            key={it.label}
                            href={it.href}
                            className="rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                          >
                            {it.label}
                          </Link>
                        ))}
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
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-black">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {navGroups.map((g) => (
                <details key={g.label} className="border-b border-line/70">
                  <summary className="flex items-center justify-between px-2 py-3.5 text-[15px] font-bold text-ink">
                    {g.full ?? g.label}
                    <ChevronDown className="chev h-4 w-4 text-muted" />
                  </summary>
                  <div className="flex flex-col pb-2">
                    {g.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-canvas"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
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
