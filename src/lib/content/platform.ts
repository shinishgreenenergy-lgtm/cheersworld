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
