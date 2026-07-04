export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; full?: string; href: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "#about",
    items: [
      { label: "Story", href: "#about" },
      { label: "Vision & Mission", href: "#about" },
      { label: "Leadership", href: "#" },
      { label: "Team", href: "#" },
      { label: "Advisory Board", href: "#" },
      { label: "Timeline", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    label: "Science",
    full: "Science & Research",
    href: "#research",
    items: [
      { label: "Scientific Foundations", href: "#research" },
      { label: "Publications", href: "#" },
      { label: "Clinical Trials", href: "#" },
      { label: "Patents", href: "#" },
      { label: "White Papers", href: "#" },
      { label: "Research Collaborations", href: "#research" },
    ],
  },
  {
    label: "Platform",
    href: "#products",
    items: [
      { label: "AI Architecture", href: "#" },
      { label: "Situational Awareness", href: "#" },
      { label: "Intervention Engine", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    label: "Solutions",
    href: "#products",
    items: [
      { label: "Healthcare", href: "#products" },
      { label: "Digital Safety", href: "#products" },
      { label: "Mining", href: "#" },
      { label: "Driving", href: "#" },
      { label: "Finance", href: "#products" },
      { label: "Social Wellness", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Future Solutions", href: "#" },
    ],
  },
  {
    label: "Industries",
    href: "#",
    items: [
      { label: "Government", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Education", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Transportation", href: "#" },
      { label: "Mining", href: "#" },
      { label: "Sports", href: "#" },
    ],
  },
  {
    label: "Evidence",
    href: "#insights",
    items: [
      { label: "Case Studies", href: "#" },
      { label: "Success Stories", href: "#insights" },
      { label: "Outcomes", href: "#" },
      { label: "Testimonials", href: "#insights" },
      { label: "Reports", href: "#" },
    ],
  },
  {
    label: "Resources",
    href: "#insights",
    items: [
      { label: "Knowledge Centre", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Videos", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "Gallery", href: "#" },
      { label: "Events", href: "#" },
      { label: "Media Centre", href: "#" },
    ],
  },
  {
    label: "Partners",
    href: "#research",
    items: [
      { label: "Universities", href: "#research" },
      { label: "Hospitals", href: "#research" },
      { label: "Government", href: "#" },
      { label: "NGOs", href: "#" },
      { label: "Technology", href: "#" },
    ],
  },
  {
    label: "Trust",
    full: "Trust Centre",
    href: "#",
    items: [
      { label: "Privacy", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Responsible AI", href: "#" },
      { label: "Security", href: "#" },
      { label: "Ethics", href: "#" },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
    items: [
      { label: "Sales", href: "#contact" },
      { label: "Government", href: "#contact" },
      { label: "Research", href: "#contact" },
      { label: "Support", href: "#contact" },
      { label: "Media", href: "#contact" },
      { label: "Careers", href: "#" },
    ],
  },
];
