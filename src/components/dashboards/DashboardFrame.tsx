import { TrendingUp, TrendingDown, Circle } from "lucide-react";
import type { DashboardConfig } from "@/lib/content";
import { cn } from "@/lib/cn";

const STATUS: Record<string, string> = {
  ok: "bg-accent/15 text-accent",
  watch: "bg-amber-500/15 text-amber-600",
  act: "bg-rose-500/15 text-rose-600",
};

// Pure-CSS mock UI in a device frame. All data is illustrative by design.
export function DashboardFrame({ config }: { config: DashboardConfig }) {
  const max = Math.max(...config.chart);
  return (
    <div className="glass overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(20,22,42,0.45)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line/70 bg-white/60 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[12px] font-bold text-ink-soft">{config.title}</span>
        <span className="ml-auto rounded-full border border-line bg-white/70 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-muted">
          Illustrative preview
        </span>
      </div>

      <div className="grid gap-4 bg-white/40 p-5 sm:grid-cols-[1fr_1fr]">
        {/* KPI row */}
        <div className="col-span-full grid grid-cols-3 gap-3">
          {config.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-line/70 bg-white/70 p-3.5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-extrabold tracking-tight text-ink">{k.value}</span>
                {k.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-accent" />}
                {k.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-accent" />}
              </div>
              <p className="mt-0.5 text-[10.5px] font-semibold text-muted">{k.label}</p>
            </div>
          ))}
        </div>

        {/* bar chart */}
        <div className="rounded-xl border border-line/70 bg-white/70 p-4">
          <p className="text-[11px] font-bold text-ink-soft">{config.chartLabel}</p>
          <div className="mt-3 flex h-28 items-end gap-1.5">
            {config.chart.map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-md bg-[linear-gradient(180deg,#5bb873,#2e8b57)]"
                style={{ height: `${(v / max) * 100}%`, opacity: 0.55 + (v / max) * 0.45 }}
              />
            ))}
          </div>
        </div>

        {/* rows */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-ink-soft">{config.audience}</p>
          {config.rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3 rounded-xl border border-line/70 bg-white/70 px-3.5 py-2.5">
              <Circle className={cn("h-2 w-2 fill-current", r.status === "ok" ? "text-accent" : r.status === "watch" ? "text-amber-500" : "text-rose-500")} strokeWidth={0} />
              <span className="flex-1">
                <span className="block text-[12px] font-bold text-ink">{r.label}</span>
                <span className="block text-[10.5px] text-muted">{r.meta}</span>
              </span>
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]", STATUS[r.status])}>
                {r.status === "ok" ? "On track" : r.status === "watch" ? "Watch" : "Action"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
