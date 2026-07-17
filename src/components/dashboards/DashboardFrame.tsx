import { TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardConfig } from "@/lib/content";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/cn";

// Status stays semantically fixed (green/amber/rose) so it never collides with
// a role's accent tint and reads the same across every dashboard.
const STATUS = {
  ok: { label: "On track", color: "#2e9e5b" },
  watch: { label: "Watch", color: "#f59e0b" },
  act: { label: "Action", color: "#f43f5e" },
} as const;

// Pure-CSS + SVG mock UI in a device frame. All data is illustrative by design.
// `accent` tints each role's command centre in its own colour.
export function DashboardFrame({ config, accent = "#2e9e5b" }: { config: DashboardConfig; accent?: string }) {
  const max = Math.max(...config.chart);
  const n = config.chart.length;
  const linePts = config.chart.map((v, i) => `${((i + 0.5) / n) * 100},${100 - (v / max) * 100}`).join(" ");
  const x0 = (0.5 / n) * 100;
  const xL = ((n - 0.5) / n) * 100;
  const areaPts = `${x0},100 ${linePts} ${xL},100`;

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(20,22,42,0.45)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line/70 bg-white/60 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[12px] font-bold text-ink-soft">{config.title}</span>
        <span className="ml-2 hidden items-center gap-1.5 sm:inline-flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: accent }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted">Live</span>
        </span>
        <Badge className="ml-auto border border-line bg-white/70 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-muted">
          Illustrative preview
        </Badge>
      </div>

      <div className="grid gap-4 bg-white/40 p-5 sm:grid-cols-2">
        {/* KPI row */}
        <div className="col-span-full grid grid-cols-3 gap-3">
          {config.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-line/70 bg-white/70 p-3.5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-extrabold tracking-tight text-ink">{k.value}</span>
                {k.trend === "up" && <TrendingUp className="h-3.5 w-3.5" style={{ color: accent }} />}
                {k.trend === "down" && <TrendingDown className="h-3.5 w-3.5" style={{ color: accent }} />}
              </div>
              <p className="mt-0.5 text-[10.5px] font-semibold text-muted">{k.label}</p>
            </div>
          ))}
        </div>

        {/* chart: bars + trend line */}
        <div className="rounded-xl border border-line/70 bg-white/70 p-4">
          <p className="text-[11px] font-bold text-ink-soft">{config.chartLabel}</p>
          <div className="relative mt-3 h-28">
            {/* faint gridlines */}
            <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((g) => (
                <span key={g} className="h-px w-full bg-line/60" />
              ))}
            </div>
            {/* bars */}
            <div className="absolute inset-0 flex items-end gap-1.5">
              {config.chart.map((v, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${accent}, ${accent}99)`, opacity: 0.4 + (v / max) * 0.4 }}
                />
              ))}
            </div>
            {/* trend overlay */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id={`area-${config.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={areaPts} fill={`url(#area-${config.key})`} />
              <polyline points={linePts} fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        {/* rows */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-ink-soft">{config.audience}</p>
          {config.rows.map((r) => {
            const s = STATUS[r.status];
            const color = s.color;
            return (
              <div key={r.label} className="flex items-center gap-3 rounded-xl border border-line/70 bg-white/70 px-3.5 py-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-bold text-ink">{r.label}</span>
                  <span className="block truncate text-[10.5px] text-muted">{r.meta}</span>
                </span>
                <Badge
                  className={cn("shrink-0 border-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]")}
                  style={{ background: `${color}1f`, color }}
                >
                  {s.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
