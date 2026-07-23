import type { SoonLink } from "./types";

export const cta = {
  title: "Bring the platform to your organisation",
  body: "Hospitals, schools, mines, fleets, agencies and teams — start with a scoped pilot and measurable baselines.",
  button: { label: "Get in Touch", href: "/contact" },
};

export const footer = {
  blurb:
    "One Human Intelligence Platform advancing human outcomes across healthcare, education, mining, transportation, finance, sports and government.",
  columns: [
    {
      heading: "Platform",
      links: [
        { label: "Overview", href: "/#solutions" },
        { label: "AI Architecture", href: "/#architecture" },
        { label: "Dashboards", href: "/#dashboards" },
        { label: "Analytics", href: "/platform#analytics" },
        { label: "Security", href: "/platform#security" },
        { label: "Integrations", href: "/platform#integrations" },
      ] as SoonLink[],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Cheers Health", href: "/products/cheers-health" },
        { label: "Cheers Digital", href: "/products/cheers-digital" },
        { label: "Cheers Miner", href: "/products/cheers-miner" },
        { label: "Cheers Social", href: "/products/cheers-social" },
        { label: "Cheers Fashion", href: "/products/cheers-fashion" },
        { label: "Cheers Finance", href: "/products/cheers-finance" },
        { label: "Cheers Sports", href: "/#solutions" },
      ] as SoonLink[],
    },
    {
      heading: "Science & Research",
      links: [
        { label: "Scientific Foundation", href: "/#science" },
        { label: "Five Dimensions", href: "/#dimensions" },
        { label: "Studies & Trials", href: "/#research" },
        { label: "Publications", href: "/#research" },
        { label: "Patents", href: "/#research" },
      ] as SoonLink[],
    },
    {
      heading: "Industries",
      links: [
        { label: "Healthcare", href: "/#evidence" },
        { label: "Education", href: "/#evidence" },
        { label: "Mining", href: "/#evidence" },
        { label: "Transportation", href: "/#evidence" },
        { label: "Government", href: "/#government" },
        { label: "Sports", href: "/#evidence" },
      ] as SoonLink[],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/#about" },
        { label: "Team", href: "/#team" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Knowledge Centre", href: "/knowledge" },
        { label: "Contact", href: "/#contact" },
        { label: "Careers", href: "/careers" },
        { label: "Media" },
      ] as SoonLink[],
    },
    {
      heading: "Trust Centre",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Responsible AI", href: "/responsible-ai" },
        { label: "Accessibility", href: "/accessibility" },
      ] as SoonLink[],
    },
  ],
  socials: [
    { label: "Instagram · cheers_wisdom", href: "https://www.instagram.com/cheers_wisdom/" },
    { label: "cheers_healthai", href: "https://www.instagram.com/cheers_healthai/" },
    { label: "cheerscyberwellness", href: "https://www.instagram.com/cheerscyberwellness/" },
  ],
  newsletter: {
    title: "Research & platform updates",
    body: "Occasional updates on studies, publications and platform milestones. No noise.",
  },
  copyright: "© 2026 Cheers Wisdom Pvt. Ltd. All rights reserved.",
};
