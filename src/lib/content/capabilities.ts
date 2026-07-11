import type { IconName } from "@/components/ui/Icon";

// The "must-haves" grid — the core engine, expressed as four capabilities.
export const capabilities = {
  heading: {
    pre: "All the must-haves of a professional",
    highlight: "wellbeing platform.",
  },
  subhead:
    "One core engine — situational awareness, prediction and intervention — powering every Cheers solution across every domain.",
  cards: [
    {
      title: "Situational\nAwareness",
      body: "Understands what is happening for each person, right now — live context, not snapshots.",
      icons: ["ScanEye", "Eye"] as IconName[],
    },
    {
      title: "Behaviour\nIntelligence",
      body: "Builds a living model of habit, stress and engagement over time.",
      icons: ["BrainCircuit"] as IconName[],
    },
    {
      title: "Prediction\nEngine",
      body: "Projects risk and opportunity before they ever materialise.",
      icons: ["TrendingUp", "Gauge"] as IconName[],
    },
    {
      title: "Adaptive\nIntervention",
      body: "The right nudge, at the right moment — guidance that adapts to each person.",
      icons: ["Zap"] as IconName[],
    },
  ],
};
