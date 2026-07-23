export type DashboardConfig = {
  key: string;
  tab: string;
  title: string;
  audience: string;
  kpis: { label: string; value: string; trend?: "up" | "down" }[];
  chartLabel: string;
  chart: number[]; // bar heights, 0-100
  rows: { label: string; meta: string; status: "ok" | "watch" | "act" }[];
};

export const dashboardsIntro = {
  eyebrow: "Dashboards",
  title: "Built for the people running the program",
  subtitle:
    "Every deployment ships with a role-specific command centre. These are illustrative previews — real dashboards are configured per organisation.",
};

export const dashboards: DashboardConfig[] = [
  {
    key: "hospital",
    tab: "Hospital",
    title: "Recovery Command Centre",
    audience: "Cardiac rehabilitation team",
    kpis: [
      { label: "Patients in program", value: "128", trend: "up" },
      { label: "Adherence this week", value: "84%", trend: "up" },
      { label: "Flagged for follow-up", value: "7", trend: "down" },
    ],
    chartLabel: "Recovery engagement · last 12 weeks",
    chart: [42, 48, 45, 55, 60, 58, 66, 71, 69, 76, 80, 84],
    rows: [
      { label: "Post-discharge cohort A", meta: "Week 6 · 32 patients", status: "ok" },
      { label: "Post-discharge cohort B", meta: "Week 2 · 41 patients", status: "watch" },
      { label: "High-risk follow-ups", meta: "7 patients · action today", status: "act" },
    ],
  },
  {
    key: "school",
    tab: "School",
    title: "Cyber-Wellbeing Overview",
    audience: "School leadership & counsellors",
    kpis: [
      { label: "Students onboarded", value: "412", trend: "up" },
      { label: "Wellbeing check-ins", value: "91%", trend: "up" },
      { label: "Counsellor referrals", value: "5" },
    ],
    chartLabel: "Digital-wellbeing index · by grade",
    chart: [62, 70, 58, 74, 66, 71, 78, 69],
    rows: [
      { label: "Grade 8", meta: "Screen-stress trend improving", status: "ok" },
      { label: "Grade 9", meta: "Late-night usage rising", status: "watch" },
      { label: "Grade 10", meta: "Stable", status: "ok" },
    ],
  },
  {
    key: "mining",
    tab: "Mining",
    title: "Operational Intelligence Dashboard",
    audience: "Site safety managers",
    kpis: [
      { label: "Workforce readiness", value: "88.5%", trend: "up" },
      { label: "Absenteeism", value: "4.2%", trend: "down" },
      { label: "Machine utilization", value: "79.1%", trend: "up" },
    ],
    chartLabel: "Fatigue risk · rolling 14 shifts",
    chart: [30, 34, 28, 40, 38, 32, 26, 30, 24, 28, 22, 26, 20, 18],
    rows: [
      { label: "Night shift · Pit 2", meta: "High fatigue alert", status: "act" },
      { label: "Day shift · Pit 1", meta: "Readiness 92%", status: "ok" },
      { label: "Haul crew", meta: "Recovery time trending up", status: "watch" },
    ],
  },
  {
    key: "fleet",
    tab: "Fleet",
    title: "Driver Wellness Console",
    audience: "Fleet operations",
    kpis: [
      { label: "Active drivers", value: "240" },
      { label: "Alertness score", value: "86%", trend: "up" },
      { label: "Rest-break compliance", value: "94%" },
    ],
    chartLabel: "Alertness · last 10 routes",
    chart: [72, 78, 74, 80, 76, 84, 81, 86, 83, 88],
    rows: [
      { label: "Long-haul north", meta: "On schedule · rested", status: "ok" },
      { label: "Metro deliveries", meta: "2 drivers flagged", status: "watch" },
      { label: "Overnight freight", meta: "Rest plan adjusted", status: "ok" },
    ],
  },
  {
    key: "government",
    tab: "Government",
    title: "Program Impact Monitor",
    audience: "Agency program office",
    kpis: [
      { label: "Programs live", value: "4" },
      { label: "Citizens reached", value: "12k", trend: "up" },
      { label: "Reports issued", value: "16" },
    ],
    chartLabel: "Program reach · by quarter",
    chart: [20, 32, 45, 58, 70, 82],
    rows: [
      { label: "Road-safety pilot", meta: "Region 3 · expanding", status: "ok" },
      { label: "School wellbeing", meta: "12 schools onboarding", status: "watch" },
      { label: "Public-health cohort", meta: "Baseline complete", status: "ok" },
    ],
  },
  {
    key: "research",
    tab: "Research",
    title: "Study Operations",
    audience: "Research partners",
    kpis: [
      { label: "Active studies", value: "6" },
      { label: "Participants", value: "540", trend: "up" },
      { label: "Data completeness", value: "97%" },
    ],
    chartLabel: "Enrolment · last 8 months",
    chart: [12, 20, 28, 35, 42, 48, 52, 54],
    rows: [
      { label: "Cardiac recovery study", meta: "NIMS Jaipur · enrolling", status: "ok" },
      { label: "Cyber-wellbeing pilot", meta: "2 schools · midline", status: "ok" },
      { label: "Cognition protocol", meta: "Ethics review", status: "watch" },
    ],
  },
];
