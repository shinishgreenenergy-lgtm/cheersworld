// Distinct per-card accent colors, used to "separate" cards by colour across sections.
export type Tint = {
  tile: string; // gradient for filled icon tiles
  bar: string; // solid accent (top bar / underline)
  glow: string; // shadow colour
  soft: string; // faint tinted background
  text: string; // readable accent text/icon colour
};

export const TINTS: Tint[] = [
  { tile: "linear-gradient(135deg,#5bb873,#2e8b57)", bar: "#2e9e5b", glow: "rgba(46,158,91,0.5)", soft: "rgba(46,158,91,0.10)", text: "#2e8b57" }, // emerald
  { tile: "linear-gradient(135deg,#34d6c6,#0e9488)", bar: "#14b8a6", glow: "rgba(20,184,166,0.5)", soft: "rgba(20,184,166,0.10)", text: "#0f8b80" }, // teal
  { tile: "linear-gradient(135deg,#fbbf3c,#e0820a)", bar: "#f59e0b", glow: "rgba(245,158,11,0.5)", soft: "rgba(245,158,11,0.12)", text: "#b45309" }, // amber
  { tile: "linear-gradient(135deg,#f472b6,#db2777)", bar: "#ec4899", glow: "rgba(236,72,153,0.5)", soft: "rgba(236,72,153,0.10)", text: "#be185d" }, // pink
  { tile: "linear-gradient(135deg,#818cf8,#4f46e5)", bar: "#6366f1", glow: "rgba(99,102,241,0.5)", soft: "rgba(99,102,241,0.10)", text: "#4338ca" }, // indigo
  { tile: "linear-gradient(135deg,#60a5fa,#2563eb)", bar: "#3b82f6", glow: "rgba(59,130,246,0.5)", soft: "rgba(59,130,246,0.10)", text: "#1d4ed8" }, // blue
];
