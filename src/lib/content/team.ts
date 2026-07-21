import type { IconName } from "@/components/ui/Icon";

export type TeamMember = {
  name: string;
  role: string;
  affiliation?: string;
  bio?: string;
  quote?: string;
  photo?: string; // /public path
  href?: string;
  linkedin?: string;
};

export const team = {
  eyebrow: "Team",
  title: "Built by clinicians, scientists and engineers",
  subtitle:
    "The platform is shaped by the people who use it — profiles of our leadership, advisors and researchers are being published here.",
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
          href: "https://cheerswisdom.com/team#",
          linkedin: "https://www.linkedin.com/in/sohail-m-6412b2171",
        },
        {
          name: "Javed",
          role: "Chief Technology Officer",
          bio: "Technology architect building the next generation of emotionally intelligent AI systems for human wellness.",
          photo: "/team/javed.jpg",
          href: "https://cheerswisdom.com/team#",
          linkedin: "https://www.linkedin.com/in/cheerswisdom/",
        },
        {
          name: "Jayanth",
          role: "Chief Financial Officer",
          bio: "Strategic financial leader ensuring sustainable growth and impact in the AI wellness ecosystem.",
          photo: "/team/jayanth.jpg",
          linkedin: "https://www.linkedin.com/in/reddy-sai-shiva-jayanth",
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
          href: "https://faubertlab.com",
          linkedin: "https://www.linkedin.com/in/jocelyn-faubert-255725a/",
        },
        {
          name: "Prof. Raakesh Kriplani",
          role: "Cyber Psychology Advisor",
          affiliation: "CIIPS",
          bio: "Futurist, cyber psychologist and policy advisor — pioneering how the world understands mental health in the digital era.",
          photo: "/team/raakesh-kriplani.jpg",
          href: "https://ciipsindia.com",
          linkedin: "https://www.linkedin.com/in/prof-dr-raakesh-kriplani-21449222",
        },
        {
          name: "Prof. Kanad Ray",
          role: "Scientific Advisor, Cheers Health",
          bio: "Distinguished researcher in biomedical engineering and AI applications in healthcare systems.",
          photo: "/team/kanad-ray.jpg",
          linkedin: "https://www.linkedin.com/in/kanad-ray-45373b86/",
        },
      ] as TeamMember[],
    },
  ],
};
