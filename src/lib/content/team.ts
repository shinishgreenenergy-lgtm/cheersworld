import type { IconName } from "@/components/ui/Icon";

export type TeamMember = {
  name: string;
  role: string;
  affiliation?: string;
  bio?: string;
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
        {
          name: "Sohail",
          role: "Chief Executive Officer",
          bio: "Visionary leader driving Cheers Wisdom's mission to advance human consciousness through adaptive AI wellness companions.",
          photo: "/team/sohail.jpg",
        },
        {
          name: "Javed",
          role: "Chief Technology Officer",
          bio: "Technology architect building the next generation of emotionally intelligent AI systems for human wellness.",
          photo: "/team/javed.jpg",
        },
        {
          name: "Jayanth",
          role: "Chief Financial Officer",
          bio: "Strategic financial leader ensuring sustainable growth and impact in the AI wellness ecosystem.",
          photo: "/team/jayanth.jpg",
        },
      ] as TeamMember[],
    },
    {
      name: "Scientific Advisory Board",
      blurb: "Independent scientific oversight.",
      icon: "Microscope" as IconName,
      members: [
        {
          name: "Prof. Jocelyn Faubert",
          role: "Chief Scientific Officer",
          affiliation: "NeuroTrackerX",
          bio: "World-renowned neuroscientist and founder of NeuroTrackerX, pioneering cognitive performance research.",
          photo: "/team/faubert.jpg",
        },
        {
          name: "Prof. Kanad Ray",
          role: "Scientific Advisor, Cheers Health",
          bio: "Distinguished researcher in biomedical engineering and AI applications in healthcare systems.",
          photo: "/team/kanad-ray.jpg",
        },
      ] as TeamMember[],
    },
  ],
};
