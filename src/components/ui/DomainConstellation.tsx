"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroOrb } from "./HeroOrb";
import {
  GraduationCap,
  ShieldCheck,
  HardHat,
  Car,
  TrendingUp,
  PieChart,
  Footprints,
  Landmark,
  Plus,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Domain = { label: string; Icon: LucideIcon; color: string };

const GREEN = "#2e9e5b";
const ORANGE = "#f59e0b";

// Clockwise from the top — matches the reference diagram order. Alternating
// green / orange accents.
const DOMAINS: Domain[] = [
  { label: "Education", Icon: GraduationCap, color: GREEN },
  { label: "Cyber Safety", Icon: ShieldCheck, color: ORANGE },
  { label: "Mining", Icon: HardHat, color: GREEN },
  { label: "Transportation\n& Road Safety", Icon: Car, color: ORANGE },
  { label: "Finance", Icon: TrendingUp, color: GREEN },
  { label: "Sports", Icon: PieChart, color: ORANGE },
  { label: "Sports Performance", Icon: Footprints, color: GREEN },
  { label: "Government", Icon: Landmark, color: ORANGE },
  { label: "Healthcare", Icon: Plus, color: GREEN },
  { label: "Social Wellbeing &\nAppearance Intelligence", Icon: Sparkles, color: ORANGE },
];

const CX = 500;
const CY = 500;
const RX = 340;
const RY = 356;
const HUB_R = 150;

const NODES = DOMAINS.map((d, i) => {
  const a = ((-90 + i * (360 / DOMAINS.length)) * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    ...d,
    a,
    cos,
    sin,
    x: CX + RX * cos,
    y: CY + RY * sin,
    sx: CX + (HUB_R + 6) * cos,
    sy: CY + (HUB_R + 6) * sin,
  };
});

// Deterministic speckles.
const STARS = (() => {
  let s = 987654321;
  const rnd = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  return Array.from({ length: 54 }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    r: 0.6 + rnd() * 1.6,
    o: 0.12 + rnd() * 0.3,
    c: rnd() > 0.5 ? GREEN : ORANGE,
    d: rnd() * 3,
  }));
})();

export function DomainConstellation() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[44rem]">
      {/* speckles */}
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" aria-hidden>
        {STARS.map((st, i) => (
          <circle
            key={i}
            cx={st.x * 10}
            cy={st.y * 10}
            r={st.r}
            className={reduce ? "" : "neuron-dot"}
            style={{ fill: st.c, opacity: st.o, animationDelay: `${st.d}s` }}
          />
        ))}
      </svg>

      {/* network lines */}
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="tendrilG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={GREEN} />
            <stop offset="1" stopColor={ORANGE} />
          </linearGradient>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* outer ring */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#9fd3b6" strokeOpacity={0.6} strokeWidth={1.3} />

        {/* faint mesh between neighbours */}
        {NODES.map((n, i) => {
          const m = NODES[(i + 1) % NODES.length];
          return (
            <line key={`m-${i}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#b8dcc7" strokeOpacity={0.6} strokeWidth={1} />
          );
        })}

        {/* tendrils from hub to each node */}
        <g filter="url(#lineGlow)">
          {NODES.map((n, i) => {
            const mx = (n.sx + n.x) / 2 + n.sin * 26;
            const my = (n.sy + n.y) / 2 - n.cos * 26;
            return (
              <path
                key={`t-${i}`}
                d={`M${n.sx},${n.sy} Q${mx},${my} ${n.x},${n.y}`}
                fill="none"
                stroke="url(#tendrilG)"
                strokeOpacity={0.5}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* travelling pulses */}
        {!reduce &&
          NODES.map((n, i) => (
            <motion.circle
              key={`p-${i}`}
              r={3}
              fill={n.color}
              initial={{ cx: n.sx, cy: n.sy, opacity: 0 }}
              animate={{ cx: [n.sx, n.x], cy: [n.sy, n.y], opacity: [0, 1, 0] }}
              transition={{ duration: 2.6, delay: (i * 0.28) % 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            />
          ))}
      </svg>

      {/* central hub sphere */}
      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 place-items-center">
        <motion.div
          className="absolute inset-[-38%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(46,158,91,0.22), rgba(245,158,11,0.08) 55%, transparent 72%)" }}
          animate={reduce ? {} : { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={reduce ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-full border border-emerald-400/40 bg-white shadow-[0_0_50px_6px_rgba(46,158,91,0.28),inset_0_0_40px_rgba(46,158,91,0.14)]">
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, rgba(46,158,91,0.14), rgba(255,255,255,0.95) 72%)" }} />

          {/* rotating mindful green brain */}
          <div className="absolute inset-[8%]">
            <HeroOrb compact />
          </div>

          <p className="relative px-2 text-center font-display text-[clamp(0.55rem,1.35vw,0.95rem)] font-extrabold uppercase leading-tight tracking-wide text-ink [text-shadow:0_1px_8px_rgba(255,255,255,0.95),0_0_4px_rgba(255,255,255,0.9)]">
            Human
            <br />
            Intelligence
            <br />
            Platform
          </p>
        </div>
      </div>

      {/* domain nodes + labels */}
      {NODES.map((n, i) => {
        const left = `${n.x / 10}%`;
        const top = `${n.y / 10}%`;
        const horizontal = Math.abs(n.cos) > 0.45;
        const labelStyle: React.CSSProperties = horizontal
          ? {
              left: n.cos > 0 ? "calc(100% + 12px)" : "auto",
              right: n.cos > 0 ? "auto" : "calc(100% + 12px)",
              top: "50%",
              transform: "translateY(-50%)",
              textAlign: n.cos > 0 ? "left" : "right",
            }
          : {
              left: "50%",
              top: n.sin > 0 ? "calc(100% + 8px)" : "auto",
              bottom: n.sin > 0 ? "auto" : "calc(100% + 8px)",
              transform: "translateX(-50%)",
              textAlign: "center",
            };
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left, top }}
          >
            <div className="relative">
              <span
                className="grid h-[clamp(2.4rem,4.8vw,3.4rem)] w-[clamp(2.4rem,4.8vw,3.4rem)] place-items-center rounded-full border bg-white"
                style={{ borderColor: `${n.color}55`, color: n.color, boxShadow: `0 6px 18px -6px ${n.color}66` }}
              >
                <n.Icon className="h-[46%] w-[46%]" strokeWidth={1.8} />
              </span>
              <span
                className="absolute w-max max-w-[8.5rem] whitespace-pre-line text-[clamp(0.6rem,1.1vw,0.88rem)] font-semibold leading-tight text-ink-soft"
                style={labelStyle}
              >
                {n.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* corner sparkle */}
      <svg viewBox="0 0 24 24" className="absolute -bottom-1 right-1 h-5 w-5 text-accent" fill="currentColor" aria-hidden>
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>
    </div>
  );
}
