import type { IconName } from "@/components/ui/Icon";

export const government = {
  eyebrow: "For Government",
  title: "Population-scale wellbeing, with evidence attached",
  subtitle:
    "One platform, deployed as public programs — from hospital recovery to school cyber-safety to road-safety fleets — with transparent reporting agencies can stand behind.",
  areas: [
    { name: "Healthcare", icon: "HeartPulse" as IconName, body: "Post-discharge recovery programs across public hospitals." },
    { name: "Education", icon: "GraduationCap" as IconName, body: "Cyber-wellbeing programs for public school systems." },
    { name: "Road Safety", icon: "Car" as IconName, body: "Driver alertness programs for public and commercial fleets." },
    { name: "Mining", icon: "Mountain" as IconName, body: "Fatigue-safety compliance for regulated mining operations." },
    { name: "Smart Cities", icon: "Building" as IconName, body: "Citizen-wellbeing signals for urban planning programs." },
    { name: "Police", icon: "Siren" as IconName, body: "Readiness and resilience support for first responders." },
    { name: "Public Health", icon: "Activity" as IconName, body: "Cohort-level prevention and early-intervention programs." },
  ],
  journey: [
    { step: "Problem", body: "Define the population challenge and its measurable cost." },
    { step: "Pilot", body: "A scoped pilot with a partner institution and clear baselines." },
    { step: "Implementation", body: "Phased rollout with training, governance and data protection." },
    { step: "Reports", body: "Transparent reporting to the agency at every stage." },
    { step: "Expected Outcomes", body: "Measured impact against the baselines — published, not promised." },
  ],
  cta: { label: "Talk to our government team", href: "#contact" },
};
