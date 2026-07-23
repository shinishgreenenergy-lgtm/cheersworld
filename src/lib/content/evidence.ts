import type { IconName } from "@/components/ui/Icon";

export interface EvidenceDomain {
  name: string;
  icon: IconName;
  solution: string;
  challenge: string;
  platform: string;
  outcome?: string;
  proof?: string;
  // Stage 03 — set when outcomes have been measured (not just under study).
  measured?: string;
  // Stage 04 — set when peer-reviewed evidence exists.
  published?: { label: string; href: string };
}

export interface EvidenceContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  domains: EvidenceDomain[];
}

export const evidence: EvidenceContent = {
  eyebrow: "Evidence",
  title: "Named. Applied. Measured. Published.",
  subtitle:
    "Every domain follows the same discipline: name the human challenge, apply the platform, measure the outcome, publish the evidence.",
  domains: [
    {
      name: "Healthcare",
      icon: "HeartPulse" as IconName,
      solution: "Cheers Health",
      challenge: "Recovery doesn't end at discharge — patients lose guidance exactly when adherence matters most.",
      platform: "Continuous recovery awareness with adaptive nudges for medication, movement, rest and care routines.",
      measured: "Post-PCI clinical trial demonstrating improved triage and reduced hospitalizations.",
      published: {
        label: "JACC · Vol. 86, No. 17S",
        href: "https://www.jacc.org/doi/pdf/10.1016/j.jacc.2025.09.1117?download=true",
      },
    },
    {
      name: "Education",
      icon: "GraduationCap" as IconName,
      solution: "Cheers Digital",
      challenge: "Students face escalating cyber risk and digital-emotional strain that schools can't see.",
      platform: "Cyber-wellbeing awareness and guidance for students, with visibility for educators and parents.",
    },
    {
      name: "Mining",
      icon: "Mountain" as IconName,
      solution: "Cheers Miner",
      challenge: "Fatigue and cognitive load drive incidents in one of the world's most hazardous industries.",
      platform: "Fatigue and readiness awareness for miners, with safety-manager dashboards for intervention.",
    },
    {
      name: "Transportation",
      icon: "Car" as IconName,
      solution: "Cheers Drive",
      challenge: "Driver fatigue and stress are leading causes of road deaths — and mostly invisible until too late.",
      platform: "Driver wellness and alertness awareness across fleets, from long-haul to daily commutes.",
    },
    {
      name: "Finance",
      icon: "Wallet" as IconName,
      solution: "Cheers Finance",
      challenge: "Financial stress quietly erodes health, sleep and decision quality.",
      platform: "Awareness-driven financial habits and emotional balance around money.",
    },
    {
      name: "Sports",
      icon: "Trophy" as IconName,
      solution: "Cheers Sports",
      challenge: "Athletic performance is cognitive as much as physical — and cognition is rarely trained.",
      platform: "Perceptual-cognitive training and readiness awareness, building on Faubert Lab research.",
    },
    {
      name: "Government",
      icon: "Landmark" as IconName,
      solution: "Platform programs",
      challenge: "Public agencies need population-scale wellbeing impact with evidence they can stand behind.",
      platform: "Multi-domain programs across health, education and road safety with transparent reporting.",
    },
  ],
};
