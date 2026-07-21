import type { SoonLink } from "./types";

export type NavItem = SoonLink & { facets?: SoonLink[] };
export type NavGroup = { label: string; full?: string; href: string; items: NavItem[] };

// Homepage sections — powers the ⌘K palette and footer anchors.
export const sectionIndex = [
  { label: "Home", href: "/#top" },
  { label: "Platform", href: "/platform" },
  { label: "Trust & Partners", href: "/#trust" },
  { label: "About & Timeline", href: "/#about" },
  { label: "Five Dimensions", href: "/#dimensions" },
  { label: "Scientific Foundation", href: "/#science" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Platform Architecture", href: "/#architecture" },
  { label: "Research", href: "/#research" },
  { label: "Evidence", href: "/#evidence" },
  { label: "Dashboards", href: "/#dashboards" },
  { label: "Government", href: "/#government" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Team", href: "/#team" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Knowledge Centre", href: "/knowledge" },
  { label: "Contact", href: "/#contact" },
];

const SOLUTION_FACETS: SoonLink[] = [
  { label: "Overview", href: "/#solutions" },
  { label: "Research" },
  { label: "Evidence" },
  { label: "Demo" },
  { label: "Use Cases" },
];

export const navGroups: NavGroup[] = [
  {
    label: "Platform",
    full: "Human Intelligence Platform",
    href: "/#architecture",
    items: [
      { label: "Platform Overview", href: "/platform" },
      { label: "AI Architecture", href: "/#architecture" },
      { label: "Situational Awareness Engine", href: "/platform#situational-awareness" },
      { label: "Behaviour Intelligence Engine", href: "/platform#behaviour-intelligence" },
      { label: "Prediction Engine", href: "/platform#prediction" },
      { label: "Intervention Engine", href: "/platform#intervention" },
      { label: "Analytics", href: "/platform#analytics" },
      { label: "Reports", href: "/platform#reports" },
      { label: "Responsible AI", href: "/platform#responsible-ai" },
      { label: "Security", href: "/platform#security" },
      { label: "Integrations", href: "/platform#integrations" },
    ],
  },
  {
    label: "Science",
    full: "The Science",
    href: "/#science",
    items: [
      { label: "Situational Awareness", href: "/#science" },
      { label: "Neuroscience", href: "/#science" },
      { label: "Behaviour Science", href: "/#science" },
      { label: "Psychology", href: "/#science" },
      { label: "Human Factors", href: "/#science" },
      { label: "Decision Science", href: "/#science" },
      { label: "Digital Phenotyping", href: "/#science" },
      { label: "Outcome Science", href: "/#science" },
    ],
  },
  {
    label: "Research",
    href: "/#research",
    items: [
      { label: "Current Studies", href: "/#research" },
      { label: "Clinical Trials", href: "/#research" },
      { label: "Publications", href: "/#research" },
      { label: "Patents", href: "/#research" },
      { label: "Collaborations", href: "/#research" },
      { label: "Conference Papers" },
      { label: "Whitepapers" },
      { label: "Research Team", href: "/#team" },
    ],
  },
  {
    label: "Solutions",
    href: "/#solutions",
    items: [
      { label: "Cheers Health", href: "/products/cheers-health", facets: SOLUTION_FACETS },
      { label: "Cheers Digital", href: "/products/cheers-digital", facets: SOLUTION_FACETS },
      { label: "Cheers ForeSite", href: "/products/cheers-foresite", facets: SOLUTION_FACETS },
      { label: "Cheers Social", href: "/products/cheers-social", facets: SOLUTION_FACETS },
      { label: "Cheers Fashion", href: "/products/cheers-fashion", facets: SOLUTION_FACETS },
      { label: "Cheers Finance", href: "/products/cheers-finance", facets: SOLUTION_FACETS },
      { label: "Cheers Sports", href: "/#solutions", facets: SOLUTION_FACETS },
    ],
  },
  {
    label: "Industries",
    href: "/#evidence",
    items: [
      { label: "Healthcare", href: "/#evidence" },
      { label: "Education", href: "/#evidence" },
      { label: "Mining", href: "/#evidence" },
      { label: "Transportation", href: "/#evidence" },
      { label: "Government", href: "/#government" },
      { label: "Sports", href: "/#evidence" },
      { label: "Corporate" },
      { label: "Insurance" },
      { label: "NGOs" },
    ],
  },
  {
    label: "Evidence",
    href: "/#evidence",
    items: [
      { label: "Clinical Outcomes", href: "/#evidence" },
      { label: "Education Outcomes", href: "/#evidence" },
      { label: "Mining Outcomes", href: "/#evidence" },
      { label: "Transportation Outcomes", href: "/#evidence" },
      { label: "Case Studies", href: "/#evidence" },
      { label: "Success Stories", href: "/#testimonials" },
      { label: "ROI" },
    ],
  },
  {
    label: "Company",
    href: "/#about",
    items: [
      { label: "Story", href: "/#about" },
      { label: "Vision & Mission", href: "/#about" },
      { label: "Timeline", href: "/#timeline" },
      { label: "Leadership", href: "/#team" },
      { label: "Scientific Advisors", href: "/#team" },
      { label: "Team", href: "/#team" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Knowledge Centre", href: "/knowledge" },
      { label: "Contact", href: "/#contact" },
      { label: "Media" },
      { label: "Careers", href: "/careers" },
    ],
  },
];
