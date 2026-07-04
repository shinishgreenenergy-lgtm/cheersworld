"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, CornerDownLeft } from "lucide-react";
import { navGroups, sectionIndex } from "@/lib/content";
import { cn } from "@/lib/cn";

type Entry = { label: string; group: string; href: string };

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Bump a generation counter on every open so AnimatePresence always mounts
  // a fresh PaletteDialog (reset-by-remount survives fast reopen during exit).
  const gen = useRef(0);
  const prevOpen = useRef(false);
  if (open && !prevOpen.current) gen.current += 1;
  prevOpen.current = open;

  return (
    <AnimatePresence>
      {open && <PaletteDialog key={gen.current} onClose={onClose} />}
    </AnimatePresence>
  );
}

// Mounted fresh on every open (via `open && …` above), so query/selection state
// resets naturally without effect-driven setState.
function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo<Entry[]>(
    () => [
      ...sectionIndex.map((s) => ({ label: s.label, group: "Sections", href: s.href })),
      ...navGroups.flatMap((g) =>
        g.items.filter((i) => i.href).map((i) => ({ label: i.label, group: g.label, href: i.href! })),
      ),
    ],
    [],
  );

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    const pool = t
      ? entries.filter((e) => e.label.toLowerCase().includes(t) || e.group.toLowerCase().includes(t))
      : entries;
    return pool.slice(0, 9);
  }, [q, entries]);

  // Focus the input and lock body scroll while the palette is open.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const go = (href: string) => {
    onClose();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] grid place-items-start justify-items-center bg-ink/40 px-4 pt-[18vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="glass w-full max-w-xl overflow-hidden rounded-2xl bg-white/80 shadow-[0_40px_80px_-30px_rgba(20,22,42,0.45)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          if (e.key === "Enter" && results[active]) go(results[active].href);
        }}
      >
        <div className="flex items-center gap-3 border-b border-line/70 px-5 py-4">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder="Search the platform, science, research…"
            className="w-full bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-muted"
            aria-label="Search"
          />
          <kbd className="rounded-md border border-line bg-white/70 px-1.5 py-0.5 text-[10px] font-bold text-muted">ESC</kbd>
        </div>
        <ul className="max-h-[19rem] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted">No matches — try &ldquo;research&rdquo; or &ldquo;mining&rdquo;.</li>
          )}
          {results.map((r, i) => (
            <li key={`${r.group}-${r.label}`}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                  i === active ? "bg-accent/10" : "hover:bg-white/70",
                )}
              >
                <span className="text-[14px] font-semibold text-ink">{r.label}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">{r.group}</span>
                {i === active && <CornerDownLeft className="ml-auto h-3.5 w-3.5 text-muted" />}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
