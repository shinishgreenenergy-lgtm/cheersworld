export type Publication = {
  kind: "journal" | "conference" | "poster" | "whitepaper";
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  doi?: string;
  status: "Published" | "In Review" | "In Preparation";
  href?: string;
};

export type Patent = {
  title: string;
  number: string;
  applicationNo?: string;
  office: string;
  filed?: string;
  granted?: string;
  inventor?: string;
  status: "Granted" | "Filed" | "Pending";
};

export const research = {
  eyebrow: "Research",
  title: "Research is the product",
  subtitle:
    "Every solution begins as a study. Explore the work in progress with our clinical, academic and research partners.",
  tabs: ["Studies & Trials", "Publications", "Patents", "Collaborations"] as const,
  studies: [
    { title: "Cardiac recovery & patient awareness", partner: "NIMS Jaipur", status: "In progress", kind: "Clinical study" },
    { title: "Adolescent cyber-wellbeing pilot", partner: "Modern School", status: "In progress", kind: "School pilot" },
    { title: "Cyber-wellbeing pilot", partner: "Sancheti School", status: "In progress", kind: "School pilot" },
    { title: "Perceptual-cognitive training", partner: "Faubert Lab (NeuroTrackerX)", status: "Active", kind: "Research collaboration" },
    { title: "Cognitive computing research", partner: "Amity Cognitive Computing Lab", status: "Active", kind: "Research collaboration" },
    { title: "Cyber AI research", partner: "CIIPS", status: "Active", kind: "Research collaboration" },
  ],
  // Real papers drop in here — the card component already renders every field.
  publications: [
    {
      kind: "journal",
      title:
        "AI-Powered Chatbot for Symptom Monitoring in Post-PCI Care: A Clinical Trial Demonstrating Improved Triage and Reduced Hospitalizations",
      authors: "Mishra S, Kumar P, Mahammad S, et al. (incl. J. Faubert)",
      journal: "Journal of the American College of Cardiology · 86(17)",
      year: 2025,
      doi: "10.1016/j.jacc.2025.09.1117",
      status: "Published",
      href: "https://www.jacc.org/doi/abs/10.1016/j.jacc.2025.09.1117",
    },
  ] as Publication[],
  publicationsSoon: "More publications are in preparation with our clinical and academic partners.",
  patents: [
    {
      title: "Computer-Implemented System and Method to Create a Wisdom Network",
      number: "IN 510420",
      applicationNo: "202041020979",
      office: "Indian Patent Office",
      filed: "19 May 2020",
      granted: "13 Feb 2024",
      inventor: "Sohail Mahammad",
      status: "Granted",
    },
  ] as Patent[],
  patentsSoon: "Further patent filings are underway. Details will appear here once public.",
};
