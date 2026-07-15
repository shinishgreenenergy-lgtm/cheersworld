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
        { label: "Overview", href: "#solutions" },
        { label: "AI Architecture", href: "#architecture" },
        { label: "Dashboards", href: "#dashboards" },
        { label: "Analytics" },
        { label: "Security" },
        { label: "Integrations" },
      ] as SoonLink[],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Cheers Health", href: "#solutions" },
        { label: "Cheers Digital", href: "#solutions" },
        { label: "Cheers Mining", href: "#solutions" },
        { label: "Cheers Drive", href: "#solutions" },
        { label: "Cheers Presence", href: "#solutions" },
        { label: "Cheers Finance", href: "#solutions" },
        { label: "Cheers Sports", href: "#solutions" },
      ] as SoonLink[],
    },
    {
      heading: "Science & Research",
      links: [
        { label: "Scientific Foundation", href: "#science" },
        { label: "Five Dimensions", href: "#dimensions" },
        { label: "Studies & Trials", href: "#research" },
        { label: "Publications", href: "#research" },
        { label: "Patents", href: "#research" },
      ] as SoonLink[],
    },
    {
      heading: "Industries",
      links: [
        { label: "Healthcare", href: "#evidence" },
        { label: "Education", href: "#evidence" },
        { label: "Mining", href: "#evidence" },
        { label: "Transportation", href: "#evidence" },
        { label: "Government", href: "#government" },
        { label: "Sports", href: "#evidence" },
      ] as SoonLink[],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Team", href: "#team" },
        { label: "Gallery", href: "#gallery" },
        { label: "Knowledge Centre", href: "#knowledge" },
        { label: "Contact", href: "#contact" },
        { label: "Careers" },
        { label: "Investors" },
        { label: "Media" },
      ] as SoonLink[],
    },
    {
      heading: "Trust Centre",
      links: [
        { label: "Privacy" },
        { label: "Responsible AI" },
        { label: "Accessibility" },
      ] as SoonLink[],
    },
  ],
  socials: ["LinkedIn", "X", "Instagram", "YouTube"],
  newsletter: {
    title: "Research & platform updates",
    body: "Occasional updates on studies, publications and platform milestones. No noise.",
  },
  copyright: "© 2026 Cheers Wisdom Pvt. Ltd. All rights reserved.",
};
