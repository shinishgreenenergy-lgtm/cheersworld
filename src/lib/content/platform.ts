import type { IconName } from "@/components/ui/Icon";
import type { SoonLink } from "./types";

const FACETS: SoonLink[] = [
  { label: "Overview", href: "#solutions" },
  { label: "Research" },
  { label: "Evidence" },
  { label: "Demo" },
  { label: "Use Cases" },
];

export const solutions = {
  eyebrow: "Human Intelligence Platform",
  title: "One platform. Seven connected solutions.",
  subtitle:
    "Every Cheers solution runs on the same platform core — the same situational awareness, prediction and intervention engines, tuned to a different domain of human life.",
  hub: "Human Intelligence Platform",
  items: [
    { name: "Cheers Health", tagline: "Clinical recovery & patient wellbeing", domain: "Healthcare", icon: "HeartPulse" as IconName, facets: FACETS },
    { name: "Cheers Digital", tagline: "Cyber safety & digital wellbeing", domain: "Education", icon: "Shield" as IconName, facets: FACETS },
    { name: "Cheers Mining", tagline: "Miner safety & fatigue awareness", domain: "Mining", icon: "Mountain" as IconName, facets: FACETS },
    { name: "Cheers Drive", tagline: "Driver wellness & road safety", domain: "Transportation", icon: "Car" as IconName, facets: FACETS },
    { name: "Cheers Presence", tagline: "Social presence & team wellbeing", domain: "Corporate", icon: "Users" as IconName, facets: FACETS },
    { name: "Cheers Finance", tagline: "Financial behaviour & balance", domain: "Finance", icon: "Wallet" as IconName, facets: FACETS },
    { name: "Cheers Sports", tagline: "Athlete cognition & performance", domain: "Sports", icon: "Trophy" as IconName, facets: FACETS },
  ],
};

export const architecture = {
  eyebrow: "Platform Architecture",
  title: "From signal to outcome — one continuous loop",
  subtitle:
    "Enterprise AI architecture: every stage feeds the next, and outcomes feed back into learning. This is how one platform serves seven domains.",
  stages: [
    { name: "Assessment", body: "Structured and passive signals establish each person's baseline.", icon: "ClipboardList" as IconName },
    { name: "Situational Awareness", body: "Signals are interpreted in context — what is happening, right now, for this person.", icon: "ScanEye" as IconName },
    { name: "Behaviour Intelligence", body: "Patterns of habit, stress and engagement build a behavioural model.", icon: "BrainCircuit" as IconName },
    { name: "Prediction", body: "The platform projects risk and opportunity before they materialise.", icon: "TrendingUp" as IconName },
    { name: "Intervention", body: "Adaptive, timely guidance — the right nudge, at the right moment.", icon: "Zap" as IconName },
    { name: "Reports", body: "Clear reporting for clinicians, educators, safety managers and agencies.", icon: "FileText" as IconName },
    { name: "Analytics", body: "Population and cohort insight across organisations and programs.", icon: "BarChart3" as IconName },
    { name: "Continuous Learning", body: "Measured outcomes retrain the models — the loop closes and the platform improves.", icon: "RefreshCw" as IconName },
  ],
};
