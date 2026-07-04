import type { IconName } from "@/components/ui/Icon";

export type TeamMember = {
  name: string;
  role: string;
  affiliation?: string;
  photo?: string; // /public path
  href?: string;
};

export const team = {
  eyebrow: "Team",
  title: "Built by clinicians, scientists and engineers",
  subtitle:
    "The platform is shaped by the people who use it — profiles of our leadership, advisors and researchers are being published here.",
  groups: [
    { name: "Leadership", blurb: "Company direction and strategy.", icon: "Compass" as IconName, members: [] as TeamMember[] },
    { name: "Scientific Advisors", blurb: "Independent scientific oversight.", icon: "Microscope" as IconName, members: [] as TeamMember[] },
    { name: "Clinical Experts", blurb: "Care pathways and patient safety.", icon: "HeartPulse" as IconName, members: [] as TeamMember[] },
    { name: "Engineering", blurb: "Platform, AI and security.", icon: "BrainCircuit" as IconName, members: [] as TeamMember[] },
    { name: "Research", blurb: "Studies, trials and evidence.", icon: "FlaskConical" as IconName, members: [] as TeamMember[] },
    { name: "Operations", blurb: "Programs and partner success.", icon: "Users" as IconName, members: [] as TeamMember[] },
  ],
};
