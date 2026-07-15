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
  spotlight: {
    name: "Prof. Raakesh Kriplani",
    title: "The Visionary",
    affiliation: "CIIPS",
    photo: "/team/raakesh-kriplani.jpg",
    bio: "A futurist, cyber psychologist, policy advisor and global thought leader. He stands at the intersection of technology, human behaviour and national development — pioneering a new discipline that redefines how the world understands mental health in the digital era.",
    quote: "When the world raced into the digital age, I chose to pause and ask — what about the human mind navigating it?",
    note: "From grassroots awareness to global policy forums, his work has impacted lakhs of individuals across sectors and nations.",
    href: "https://ciipsindia.com",
  },
  groups: [
    {
      name: "Leadership",
      blurb: "Company direction and strategy.",
      icon: "Compass" as IconName,
      members: [
        { name: "Sohail", role: "Chief Executive Officer", photo: "/team/sohail.jpg" },
        { name: "Javed", role: "Chief Technology Officer", photo: "/team/javed.jpg" },
        { name: "Jayanth", role: "Chief Financial Officer", photo: "/team/jayanth.jpg" },
      ] as TeamMember[],
    },
    {
      name: "Scientific Advisory Board",
      blurb: "Independent scientific oversight.",
      icon: "Microscope" as IconName,
      members: [
        { name: "Prof. Jocelyn Faubert", role: "Chief Scientific Officer", affiliation: "NeuroTrackerX", photo: "/team/faubert.jpg" },
        { name: "Prof. Kanad Ray", role: "Scientific Advisor", affiliation: "Cheers Health", photo: "/team/kanad-ray.jpg" },
      ] as TeamMember[],
    },
    { name: "Clinical & Research", blurb: "Care pathways, studies and evidence.", icon: "HeartPulse" as IconName, members: [] as TeamMember[] },
  ],
};
