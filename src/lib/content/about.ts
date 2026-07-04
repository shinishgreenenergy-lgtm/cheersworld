import type { IconName } from "@/components/ui/Icon";

export const about = {
  eyebrow: "Who We Are",
  title: "About Cheers Wisdom",
  paragraphs: [
    "Cheers Wisdom is a global R&D company building one Human Intelligence Platform: adaptive AI that understands, tracks and guides human experience across health, emotion and cognition.",
    "From cardiac recovery to cyber wellbeing, mining safety to driver wellness — one platform turns awareness into measurable, life-changing outcomes.",
  ],
  pillars: [
    {
      title: "Mission",
      body: "Solve human wellbeing challenges through AI and science — turning continuous understanding into timely, adaptive intervention.",
      icon: "Target" as IconName,
    },
    {
      title: "Vision",
      body: "A world where every hospital, school, mine, fleet and government has an intelligence platform advancing the humans it serves.",
      icon: "Eye" as IconName,
    },
    {
      title: "Philosophy",
      body: "Observe → Understand → Predict → Intervene → Measure → Improve. Every solution we build runs this loop, continuously.",
      icon: "Infinity" as IconName,
    },
  ],
  milestones: [
    { label: "2019", title: "Founded", body: "Cheers Wisdom begins as a research-first company.", status: "done" as const },
    { label: "Research", title: "Scientific foundations", body: "Foundational work in situational awareness and behaviour science with academic partners.", status: "done" as const },
    { label: "Clinical", title: "Clinical studies", body: "Recovery and patient-awareness studies begin with partner hospitals.", status: "done" as const },
    { label: "Schools", title: "School pilots", body: "Cheers Digital cyber-wellbeing pilots in partner schools.", status: "done" as const },
    { label: "Government", title: "Government engagement", body: "Working toward public-sector pilots across health, education and road safety.", status: "current" as const },
    { label: "Platform", title: "Multi-domain platform", body: "The platform expands into mining, driving, finance and sports.", status: "current" as const },
    { label: "Future", title: "Future vision", body: "One Human Intelligence Platform across every domain of human life.", status: "future" as const },
  ],
  dimensions: ["Physical", "Mental", "Social", "Cyber", "Financial"],
};
