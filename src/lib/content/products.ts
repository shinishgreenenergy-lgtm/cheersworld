// Product detail pages (/products/[slug]). Content mirrors the reference
// site (72.61.77.69) product pages; images live under /public/products.
export type ProductCta = { label: string; href: string };

export type ProductSectionItem = {
  icon?: string;
  title?: string;
  desc?: string;
  href?: string; // external profile/source link rendered on the card

  // Stat items: `value` present ⇒ rendered in the stats grid instead of a card.
  value?: string;
  label?: string;
};

export type ProductSection = {
  id?: string; // anchor target (e.g. /platform#prediction)
  eyebrow?: string;
  heading?: string;
  body?: string;
  items?: ProductSectionItem[];
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline?: string;
  heroTitle: string;
  heroBody?: string;
  heroImage?: string;
  ctas: ProductCta[];
  sections: ProductSection[];
};

const JACC_PDF =
  "https://www.jacc.org/doi/pdf/10.1016/j.jacc.2025.09.1117?download=true";

export const products: Product[] = [
  {
    slug: "cheers-health",
    name: "Cheers Health",
    tagline: "Cheers Health — Flagship",
    heroTitle: "AI-powered recovery intelligence for clinical guidance",
    heroBody:
      "A longitudinal clinical intelligence platform that traces patient recovery trajectories and guides early intervention — published in JACC, the Journal of the American College of Cardiology.",
    heroImage: "/products/cheers-health/cheers-health-hero.jpg",
    ctas: [
      { label: "Request a clinical demo", href: "/#contact" },
      { label: "View clinical evidence", href: JACC_PDF },
    ],
    sections: [
      {
        eyebrow: "The Problem",
        heading: "The post-procedure visibility gap",
        body:
          "After major procedures like PCI, patients enter the most critical recovery window with almost no continuous monitoring. Vital signs drift, medications are missed, and symptoms go unreported between follow-up visits. Cheers Health closes this gap with lightweight AI monitoring that detects risk escalation days before a clinical event — no EHR integration required.",
        image: "/products/cheers-health/image16.jpg",
      },
      {
        eyebrow: "How It Works",
        heading: "The recovery intelligence process",
        items: [
          {
            icon: "1",
            title: "Enroll at discharge",
            desc: "Patient joins via mobile app in English, Hindi, Telugu, or Marathi.",
          },
          {
            icon: "2",
            title: "Daily check-ins",
            desc: "60-second daily logs: BP, heart rate, sleep, fatigue, bleeding status.",
          },
          {
            icon: "3",
            title: "AI risk analysis",
            desc: "Composite risk scores from physiological, behavioral, and adherence signals.",
          },
          {
            icon: "4",
            title: "Clinical escalation",
            desc: "Contextual alerts sent to care teams when risk thresholds are crossed.",
          },
        ],
      },
      {
        eyebrow: "Scientific Foundations",
        heading: "Longitudinal recovery intelligence",
        body:
          "Recovery is not a single event — it is a dynamic trajectory that unfolds over weeks. Cheers Health models this trajectory continuously rather than relying on isolated snapshots.",
        items: [
          {
            icon: "🫀",
            title: "Physiological signals",
            desc: "Blood pressure trends, heart rate variability, bleeding symptoms — tracked daily to detect drift from baseline.",
          },
          {
            icon: "🧠",
            title: "Behavioral signals",
            desc: "Sleep quality, fatigue levels, physical activity, recovery perception — early changes often appear here first.",
          },
          {
            icon: "💊",
            title: "Treatment adherence",
            desc: "Medication compliance, missed doses, adherence patterns — correlated with risk score changes over time.",
          },
        ],
        image: "/products/cheers-health/image1.jpg",
      },
      {
        eyebrow: "Risk Detection",
        heading: "Early warning before clinical events",
        body:
          "Complications rarely happen suddenly. The AI detects subtle trajectory shifts days in advance.",
        items: [
          {
            icon: "🟢",
            title: "Day 1–3",
            desc: "Stable recovery signals across all dimensions.",
          },
          {
            icon: "🟠",
            title: "Day 4–6",
            desc: "Increasing fatigue and declining sleep quality detected.",
          },
          {
            icon: "🟠",
            title: "Day 7",
            desc: "Missed medication dose flagged by the adherence tracker.",
          },
          {
            icon: "🔴",
            title: "Day 8",
            desc: "Elevated blood pressure — clinician alert triggered.",
          },
        ],
        image: "/products/cheers-health/image14.jpg",
      },
      {
        eyebrow: "Clinical Evidence",
        heading: "Published in the world's #1 cardiovascular journal",
        body:
          "“AI-Powered Chatbot for Symptom Monitoring in Post-PCI Care” — Journal of the American College of Cardiology, Vol. 86, No. 17 Supplement. The study evaluated the feasibility of AI-assisted monitoring to improve early triage and patient engagement during post-PCI recovery. Authors: Prof. Dr. Sundeep Mishra, Sohail Mahammad, Jocelyn Faubert, Kanad Ray, and collaborating researchers.",
      },
      {
        eyebrow: "Health Economics",
        heading: "Improving outcomes while reducing costs",
        body:
          "Structured monitoring of 1,000 post-PCI patients could avoid ~35 readmissions annually at ₹6,000 per patient — generating ₹28–52 lakh in savings against typical readmission rates of 12–18%.",
        items: [
          { value: "₹6,000", label: "Cost per member (90 days)" },
          { value: "4 mo", label: "Break-even point" },
          { value: "35", label: "Avoided hospitalizations / year" },
          { value: "₹52L", label: "Annual savings / 1K patients" },
        ],
      },
      {
        eyebrow: "Clinical Intelligence",
        heading: "Five layers of insight",
        body:
          "A comprehensive intelligence system for clinicians, administrators, and insurance partners.",
        items: [
          {
            icon: "📈",
            title: "Population risk overview",
            desc: "Real-time distribution of patients across risk tiers, 30-day readmission predictions, and net savings tracking.",
          },
          {
            icon: "🎚️",
            title: "Risk stratification engine",
            desc: "6-component AI scoring: behavioral stability, trend deviation, escalation velocity, adherence, symptom volatility, engagement continuity.",
          },
          {
            icon: "🚨",
            title: "Escalation analytics",
            desc: "Timeline of alerts, clinician response times, resolution rates by severity tier, and alert–hospitalization correlation.",
          },
          {
            icon: "💹",
            title: "Economic impact modeling",
            desc: "ROI scenario modeling with conservative, moderate, and optimistic projections. Break-even analysis and multi-year savings.",
          },
          {
            icon: "🗂️",
            title: "Audit & compliance",
            desc: "Timestamped audit trails, clinician confirmation tracking, and HIPAA/IRDAI-ready PDF-exportable compliance reports.",
          },
        ],
        image: "/products/cheers-health/image12.jpg",
      },
      {
        eyebrow: "Patient Stories",
        heading: "Early risk detection in action",
        body:
          "A 58-year-old male recovering from PCI with a coronary stent reported fatigue and dizziness through the daily health journal during week two. The system detected the trajectory change and alerted clinicians; medication was adjusted and symptoms stabilized — avoiding an emergency visit. “After my procedure, the daily check-ins helped me stay aware of my recovery. When I reported unusual fatigue, my doctor contacted me quickly. It made me feel much safer recovering at home.” (Published with patient consent.)",
        image: "/products/cheers-health/image5.jpg",
      },
      {
        eyebrow: "Platform Expansion",
        heading: "Beyond cardiology",
        body:
          "The same longitudinal intelligence engine, adapted for new clinical domains: PCI → kidney → dementia → chronic care.",
        items: [
          {
            icon: "🧬",
            title: "Kidney transplant monitoring",
            desc: "Lifelong monitoring for graft survival: creatinine trends, immunosuppressant compliance, and behavioral signals for early rejection detection. Clinical trial with NIMS Hyderabad, led by Dr. G. Swarnalatha.",
          },
          {
            icon: "🧠",
            title: "Dementia behavioral monitoring",
            desc: "Detecting routine disruptions, behavioral pattern changes, and emotional signals to give caregivers and clinicians early warning of cognitive decline. Research collaboration with Dr. Surya Prabha.",
          },
        ],
        image: "/products/cheers-health/image10.jpg",
      },
      {
        eyebrow: "Clinical Leadership",
        heading: "Principal investigators",
        items: [
          {
            icon: "🩺",
            title: "Prof. Dr. Sundeep Mishra",
            desc: "Vice-Chancellor, NIMS University Jaipur. Former Director Professor of Cardiology, AIIMS Delhi. Board of Trustee, SCAI (USA).",
            href: "https://www.linkedin.com/in/sundeep-mishra-3a42bb1bb",
          },
          {
            icon: "🩺",
            title: "Dr. G. Swarnalatha",
            desc: "Professor and Head of Nephrology, NIMS Hyderabad. 20+ years of experience and 1,700+ transplants.",
            href: "https://www.skedoc.com/hyderabad/doctor/dr-swarnalatha-guditi-nephrologist",
          },
          {
            icon: "🩺",
            title: "Dr. Hassana",
            desc: "VP of Clinical Operations. Clinical research and operations leadership.",
            href: "https://www.linkedin.com/in/dr-hassana-jabeen-1b219a182/",
          },
        ],
      },
      {
        eyebrow: "Who Benefits",
        heading: "Designed for the entire care ecosystem",
        items: [
          {
            icon: "❤️",
            title: "Patients",
            desc: "Structured daily monitoring with personalized alerts in their preferred language during the most critical recovery window.",
          },
          {
            icon: "🩺",
            title: "Clinicians",
            desc: "AI-driven risk dashboards, contextual escalation alerts, and complete intervention timelines for every patient.",
          },
          {
            icon: "🏥",
            title: "Hospitals & insurers",
            desc: "Economic impact modeling, avoided admission tracking, and audit-ready compliance reports for cost control.",
          },
        ],
      },
    ],
  },
  {
    slug: "cheers-digital",
    name: "Cheers Digital",
    tagline: "Cheers Digital — Active",
    heroTitle: "AI-powered cyberbullying prevention & digital resilience",
    heroBody:
      "A behavioral intelligence platform that helps schools detect cyberbullying early, support students experiencing digital stress, and build long-term digital resilience — connecting students, parents, and educators through three integrated portals.",
    heroImage: "/products/cheers-digital-portals.jpg",
    ctas: [{ label: "Request a school demo", href: "/#contact" }],
    sections: [
      {
        eyebrow: "The Challenge",
        heading: "The digital wellness challenge",
        body:
          "Digital technology is deeply integrated into student life — messaging apps, social media, gaming, and online learning. While enabling communication, these tools introduce new psychological challenges that schools struggle to detect early. Research suggests 20–35% of students experience cyberbullying during school years, with many incidents remaining unreported.",
      },
      {
        eyebrow: "Our Approach",
        heading: "Digital wellness — not digital surveillance",
        body:
          "Many cyberbullying tools rely on invasive monitoring or keyword scanning. Cheers Digital follows a different philosophy: student safety should never come at the cost of student dignity.",
        items: [
          {
            icon: "🧠",
            title: "Behavioral signals",
            desc: "Focuses on behavioral patterns of digital stress rather than invasive content surveillance.",
          },
          {
            icon: "🔍",
            title: "Early detection",
            desc: "Detects harmful online interactions through context-aware AI, not simple keyword filtering.",
          },
          {
            icon: "🤝",
            title: "Student resilience",
            desc: "Helps students reflect on digital experiences and build healthy habits through guided journaling.",
          },
        ],
      },
      {
        eyebrow: "How It Works",
        heading: "The digital resilience process",
        items: [
          {
            icon: "1",
            title: "School onboarding",
            desc: "Configure portal roles, define alert thresholds, and enroll students via unique codes.",
          },
          {
            icon: "2",
            title: "Student journaling",
            desc: "Students record digital experiences through guided journaling and confidentially report incidents.",
          },
          {
            icon: "3",
            title: "AI detection",
            desc: "NLP and Vision AI analyze patterns to detect bullying, harassment, and emotional distress signals.",
          },
          {
            icon: "4",
            title: "School intervention",
            desc: "Structured incident response workflows guide schools from detection through resolution.",
          },
        ],
      },
      {
        eyebrow: "The Platform",
        heading: "Three portals, one ecosystem",
        body:
          "The entire school community connected through three specialized portals — student safety without sacrificing student dignity or privacy.",
        items: [
          {
            icon: "🧑‍🎓",
            title: "Student portal",
            desc: "Safe digital space for guided journaling, confidential incident reporting, AI-guided support, and cyber awareness resources.",
          },
          {
            icon: "👨‍👩‍👧",
            title: "Parent portal",
            desc: "Digital wellness summaries, teacher/counselor communication, incident reporting, and screen time insights — without invasive monitoring.",
          },
          {
            icon: "🏫",
            title: "Teacher / school portal",
            desc: "Cyberbullying detection dashboards, incident investigation workflows, intervention tracking, and school-wide digital wellness analytics.",
          },
        ],
      },
      {
        eyebrow: "AI Capabilities",
        heading: "Intelligent detection beyond keywords",
        body:
          "Cheers Digital goes beyond keyword filtering. Our AI understands context, detects patterns, and adapts to new forms of digital harm in real time.",
        items: [
          {
            icon: "💬",
            title: "NLP detection",
            desc: "Analyzes communication to detect bullying, threats, and emotional distress — understanding slang and coded language.",
          },
          {
            icon: "👁️",
            title: "Vision AI",
            desc: "Detects manipulated images, harmful memes, and visual harassment that text-only systems miss.",
          },
          {
            icon: "📓",
            title: "Journal analysis",
            desc: "Journal patterns feed into the wellness model over time to detect early signs of digital distress.",
          },
          {
            icon: "📊",
            title: "Behavioral patterns",
            desc: "Sudden withdrawal, increased negativity, reduced participation — detected across time, not snapshots.",
          },
        ],
      },
      {
        eyebrow: "Early Detection",
        heading: "Behavioral markers of digital distress",
        body:
          "Cyberbullying rarely appears suddenly. Early warning signals emerge through behavioral patterns in student digital activity and emotional responses.",
        items: [
          {
            icon: "🟢",
            title: "Emotional",
            desc: "Sadness or frustration in journal entries, expressions of isolation, repeated negative emotional language.",
          },
          {
            icon: "🟠",
            title: "Behavioral",
            desc: "Withdrawal from peer communication, sudden changes in online engagement, reduced participation.",
          },
          {
            icon: "🔴",
            title: "Social",
            desc: "Repeated exposure to harmful messages, exclusion from groups, conflict patterns — school intervention triggered.",
          },
        ],
      },
      {
        eyebrow: "Research Partnership",
        heading: "Grounded in cyber psychology research",
        body:
          "The behavioral science behind Cheers Digital is guided by CIIPS — the Cosmic Integrated Institute of Psychology & Security, India's leading cyber psychology institution — combining expertise in digital behavior, student mental health, and AI-driven intervention design. Founded by Dr. Raakesh Kriplani, cyber psychologist and digital behavior expert: “When the world rushed into the digital age, very few stopped to ask how the human mind would adapt to it.” Launch event in New Delhi; pilot schools include Modern School and Sancheti School.",
        items: [
          { value: "25+", label: "Years in psychology" },
          { value: "30+", label: "Cities across India" },
          { value: "20+", label: "States reached" },
          { value: "2", label: "Pilot schools" },
        ],
      },
      {
        eyebrow: "Institutional Intelligence",
        heading: "School wellness dashboard",
        body:
          "Administrators receive institutional insights to design better digital safety policies and education programs.",
        items: [
          {
            icon: "📈",
            title: "Cyberbullying incident trends",
            desc: "Track incident frequency, patterns, and emerging hotspots across the entire school community over time.",
          },
          {
            icon: "🎚️",
            title: "Severity distribution",
            desc: "Classify incidents by severity level to prioritize responses and allocate resources effectively.",
          },
          {
            icon: "✅",
            title: "Intervention effectiveness",
            desc: "Measure how well interventions resolve cases and prevent recurrence — a continuous improvement loop.",
          },
          {
            icon: "🧭",
            title: "Student wellness indicators",
            desc: "Aggregate digital wellness metrics: engagement quality, journal sentiment trends, and resilience scores.",
          },
        ],
        image: "/products/cheers-digital-dashboard.jpg",
      },
      {
        eyebrow: "Incident Response",
        heading: "Structured response workflow",
        body:
          "When incidents occur, reports from students, parents, or teachers follow a standardized process ensuring transparency and accountability.",
        items: [
          { icon: "1", title: "Report", desc: "Confidential submission from any portal." },
          { icon: "2", title: "Review", desc: "Administrative severity assessment." },
          { icon: "3", title: "Investigate", desc: "Evidence gathering and context analysis." },
          { icon: "4", title: "Intervene", desc: "Appropriate response and student support." },
          { icon: "5", title: "Resolve", desc: "Follow-up confirmation and case closure." },
        ],
      },
      {
        eyebrow: "Who Benefits",
        heading: "Designed for the entire school ecosystem",
        items: [
          {
            icon: "🧑‍🎓",
            title: "Students",
            desc: "A safe environment for expression, guided journaling, and AI-supported digital awareness building.",
          },
          {
            icon: "👨‍👩‍👧",
            title: "Parents",
            desc: "Greater awareness of student digital wellness with appropriate visibility and communication tools.",
          },
          {
            icon: "🧑‍🏫",
            title: "Teachers",
            desc: "Tools to detect cyberbullying early, manage incidents, and track intervention outcomes.",
          },
          {
            icon: "🏫",
            title: "Schools",
            desc: "Institution-wide insights into digital safety trends, compliance reporting, and policy guidance.",
          },
        ],
      },
    ],
  },
  {
    slug: "cheers-finance",
    name: "Cheers Finance",
    tagline: "Cheers Finance — Research",
    heroTitle: "Financial resilience system",
    heroBody:
      "Behavioral risk intelligence for insurance and financial services institutions. Detecting financial distress early through longitudinal behavioral analysis.",
    heroImage: "/products/human-state-map.jpg",
    ctas: [{ label: "Join the research program", href: "/#contact" }],
    sections: [
      {
        eyebrow: "The Problem",
        heading: "The financial visibility gap",
        body:
          "Most financial systems detect distress only after defaults, missed payments, or claims spikes. By then, the damage is done. Financial behavior — spending patterns, debt accumulation, decision quality — changes gradually over weeks and months before crisis. Without longitudinal monitoring, these early signals remain invisible to the institutions responsible for financial well-being.",
      },
      {
        eyebrow: "What Makes Us Different",
        heading: "Longitudinal behavioral intelligence for finance",
        body:
          "Detecting financial distress before it becomes a crisis.",
        items: [
          {
            icon: "📉",
            title: "Financial resilience scoring",
            desc: "AI models that analyze behavioral patterns in spending, saving, and debt management to produce dynamic resilience scores.",
          },
          {
            icon: "🚨",
            title: "Debt stress detection",
            desc: "Early identification of behavioral patterns that precede financial distress, enabling intervention before default.",
          },
          {
            icon: "🧠",
            title: "Behavioral finance insights",
            desc: "Understanding how cognitive biases and emotional states influence financial decision-making over time.",
          },
          {
            icon: "⚡",
            title: "Early intervention triggers",
            desc: "Automated alerts when behavioral trajectories indicate increasing financial risk, enabling proactive support.",
          },
          {
            icon: "📊",
            title: "Institutional analytics",
            desc: "Portfolio-level behavioral intelligence for insurers and financial service providers to assess and manage risk dynamically.",
          },
        ],
      },
      {
        eyebrow: "How It Works",
        heading: "From behavior to early intervention",
        body:
          "A four-stage process that transforms raw financial behavior into actionable risk intelligence.",
        items: [
          {
            icon: "1",
            title: "Behavioral baseline",
            desc: "Financial behavior patterns are established through structured inputs and transaction analysis.",
          },
          {
            icon: "2",
            title: "Longitudinal tracking",
            desc: "The system monitors changes in financial behavior over weeks and months, building trajectory models.",
          },
          {
            icon: "3",
            title: "Risk signal detection",
            desc: "AI identifies deviations from healthy financial patterns and flags emerging distress signals.",
          },
          {
            icon: "4",
            title: "Guided intervention",
            desc: "Personalized recommendations and institutional alerts enable early support before crisis occurs.",
          },
        ],
      },
      {
        eyebrow: "Who It's For",
        heading: "Designed for financial institutions",
        body:
          "Cheers Finance delivers behavioral risk intelligence to the institutions responsible for financial well-being at scale.",
        items: [
          {
            icon: "🏦",
            title: "Insurance companies",
            desc: "Claims cost reduction through early behavioral detection of financial distress — shifting from reactive claims processing to preventive care models that reduce loss ratios and improve member outcomes.",
          },
          {
            icon: "💰",
            title: "Banks & lenders",
            desc: "Early default prevention through longitudinal behavioral monitoring. Identify borrowers showing signs of financial distress weeks before missed payments, enabling proactive support and portfolio protection.",
          },
          {
            icon: "🏛️",
            title: "Government programs",
            desc: "Financial wellness monitoring at population scale. Behavioral intelligence for social protection programs, enabling targeted interventions for at-risk populations before financial crises cascade.",
          },
        ],
      },
    ],
  },
  {
    slug: "cheers-foresite",
    name: "Cheers ForeSite",
    tagline: "Cheers ForeSite — Research",
    heroTitle: "AI-powered behavioural intelligence for safer operations",
    heroBody:
      "An AI-powered workforce safety platform designed to detect early human-performance risks before they lead to incidents — combining behavioural science with occupational health research to monitor worker readiness, detect fatigue patterns, and support preventive safety decisions.",
    heroImage: "/products/signals-to-trajectories.jpg",
    ctas: [{ label: "Join the research program", href: "/#contact" }],
    sections: [
      {
        eyebrow: "The Problem",
        heading: "The safety monitoring gap",
        body:
          "In mining, railways, heavy industry, and infrastructure operations, safety incidents are rarely sudden. Worker fatigue builds over shifts. Stress accumulates across weeks. Readiness declines gradually. Yet most safety systems only detect problems after an incident has occurred — a reactive approach that costs lives and resources. Behavioral signals appear early; without longitudinal monitoring, those signals remain invisible.",
      },
      {
        eyebrow: "What Makes Us Different",
        heading: "Predictive behavioral safety intelligence",
        body: "Detecting workforce risk before incidents occur.",
        items: [
          {
            icon: "😴",
            title: "Fatigue monitoring",
            desc: "Continuous tracking of behavioral fatigue indicators across shifts, detecting accumulation patterns that precede safety incidents.",
          },
          {
            icon: "✅",
            title: "Worker readiness assessment",
            desc: "Pre-shift and ongoing readiness evaluation using behavioral and cognitive indicators to determine fitness for duty.",
          },
          {
            icon: "🛡️",
            title: "Accident prevention intelligence",
            desc: "Predictive models that identify high-risk periods and conditions before incidents occur, enabling preventive action.",
          },
          {
            icon: "🧠",
            title: "Occupational stress detection",
            desc: "Longitudinal monitoring of stress indicators across the workforce, identifying individuals and teams at elevated risk.",
          },
          {
            icon: "🏭",
            title: "Industry-specific models",
            desc: "Behavioral intelligence calibrated for mining, railways, manufacturing, and infrastructure environments.",
          },
        ],
      },
      {
        eyebrow: "How It Works",
        heading: "From baseline to prevention",
        body:
          "A four-stage process that transforms workforce behavioral data into preventive safety intelligence.",
        items: [
          {
            icon: "1",
            title: "Workforce baseline",
            desc: "Behavioral patterns are established for each worker through structured assessments and operational data.",
          },
          {
            icon: "2",
            title: "Continuous monitoring",
            desc: "The system tracks fatigue, stress, and readiness indicators across shifts and over weeks.",
          },
          {
            icon: "3",
            title: "Risk pattern detection",
            desc: "AI identifies behavioral trajectories that indicate declining safety readiness.",
          },
          {
            icon: "4",
            title: "Preventive alerts",
            desc: "Safety teams receive contextualized alerts with recommended interventions before incidents occur.",
          },
        ],
      },
      {
        eyebrow: "Who It's For",
        heading: "Built for high-risk industries",
        body:
          "Cheers ForeSite delivers predictive safety intelligence to the industries where workforce readiness is a matter of life and safety.",
        items: [
          {
            icon: "⛏️",
            title: "Mining operations",
            desc: "Underground and surface mining environments where fatigue accumulation, shift rotation patterns, and environmental stress create compounding safety risks.",
          },
          {
            icon: "🚂",
            title: "Railways & transport",
            desc: "Long-haul operations and safety-critical transport roles where operator fatigue and alertness degradation directly impact passenger and crew safety.",
          },
          {
            icon: "🏭",
            title: "Heavy manufacturing",
            desc: "Industrial environments with heavy machinery, repetitive operations, and shift work where cognitive fatigue leads to increased incident rates.",
          },
          {
            icon: "🔌",
            title: "Infrastructure & utilities",
            desc: "Power generation, water treatment, and utility operations where continuous staffing and shift work create cumulative fatigue risks.",
          },
          {
            icon: "🏗️",
            title: "Construction & industrial projects",
            desc: "Large-scale projects where distributed workforces, harsh conditions, and high-consequence tasks demand proactive readiness assessment.",
          },
        ],
      },
      {
        eyebrow: "Our Commitment",
        heading: "Worker-first design principles",
        body: "Cheers ForeSite is designed to support workers, not surveil them.",
        items: [
          {
            icon: "🚫",
            title: "No surveillance",
            desc: "The platform does not monitor worker location, communications, or personal activities.",
          },
          {
            icon: "🔇",
            title: "No audio/video monitoring",
            desc: "No cameras, microphones, or recording devices are used by the system.",
          },
          {
            icon: "🩺",
            title: "No medical diagnosis",
            desc: "The system does not diagnose medical conditions. It identifies behavioral patterns that may indicate readiness risk.",
          },
          {
            icon: "🛡️",
            title: "No disciplinary linkage",
            desc: "Data is used for safety support, not for performance evaluation or disciplinary action.",
          },
        ],
      },
    ],
  },
  {
    slug: "cheers-social",
    name: "Cheers Social",
    tagline: "Cheers Social — Active",
    heroTitle: "Social wellness & resilience intelligence",
    heroBody:
      "Digital environments and public platforms can expose individuals to intense social pressure. Cheers Social analyzes behavioral and emotional signals to understand how individuals respond to social stress — and recover from it.",
    heroImage: "/products/applications-wellbeing.jpg",
    ctas: [
      { label: "Visit Cheers Social", href: "https://social.cheersaipm.cloud/" },
      { label: "Request a demo", href: "/#contact" },
    ],
    sections: [
      {
        eyebrow: "Why It Matters",
        heading: "Understanding social behavior and lifestyle choices",
        body:
          "Human well-being is influenced by identity, social interaction, and daily lifestyle decisions. Cheers Wisdom explores how behavioral signals can guide healthier social and lifestyle choices — tracking how individuals respond to social pressure, peer conflict, and public exposure.",
        items: [
          {
            icon: "🤝",
            title: "Social resilience improvement",
            desc: "Tracking how individuals respond to social stress and recover from it.",
          },
          {
            icon: "📱",
            title: "Digital influence & social pressure analysis",
            desc: "Understanding the psychological impact of social media interactions.",
          },
          {
            icon: "🧠",
            title: "Emotional recovery patterns",
            desc: "Analyzing behavioral and emotional signals to understand recovery from social stress over time.",
          },
        ],
      },
    ],
  },
  {
    slug: "cheers-fashion",
    name: "Cheers Fashion",
    tagline: "Cheers Fashion — Coming Soon",
    heroTitle: "Fashion psychology & outcome-aligned consumption",
    heroBody:
      "Fashion and lifestyle choices influence identity, confidence, and emotional state. Cheers Fashion aligns consumption with psychological wellness and financial responsibility — guided by research from NIFT.",
    heroImage: "/products/cheers-fashion/CWFashion.jpeg",
    ctas: [{ label: "Request a demo", href: "/#contact" }],
    sections: [
      {
        eyebrow: "The Problem",
        heading: "When consumption drives identity, not the other way around",
        body:
          "Modern consumer environments encourage impulsive consumption and identity-driven spending. People buy to feel confident, express themselves, or cope with stress — often without understanding the emotional triggers behind their choices. Cheers Fashion uses AI to map the relationship between emotional states, clothing and lifestyle choices, and well-being outcomes — guiding individuals toward mindful, outcome-aligned consumption.",
        image: "/products/cheers-fashion/CWFashion2.jpeg",
      },
      {
        eyebrow: "Our Approach",
        heading: "Where fashion meets psychology",
        body:
          "Understanding the emotional and psychological drivers behind what people wear, buy, and consume.",
        items: [
          {
            icon: "🧠",
            title: "Emotional state mapping",
            desc: "AI analyzes the connection between clothing choices and emotional states — identifying patterns in how people dress when stressed, confident, or empowered.",
          },
          {
            icon: "🛒",
            title: "Impulse behavior reduction",
            desc: "Detect and interrupt impulsive shopping triggers by understanding the emotional and contextual factors that drive unplanned purchases.",
          },
          {
            icon: "🎯",
            title: "Outcome-aligned guidance",
            desc: "Guide wardrobe and lifestyle decisions toward outcomes that matter — confidence, professional presence, self-expression — rather than trend-chasing.",
          },
        ],
      },
      {
        eyebrow: "How It Works",
        heading: "From impulse to intention",
        items: [
          {
            icon: "1",
            title: "Style & behavior profile",
            desc: "Capture lifestyle preferences, shopping habits, emotional triggers, and personal style goals through guided assessment.",
          },
          {
            icon: "2",
            title: "Emotional pattern analysis",
            desc: "AI maps the relationship between emotional states and consumption behavior, identifying stress-driven and confidence-driven patterns.",
          },
          {
            icon: "3",
            title: "Outcome alignment",
            desc: "Match lifestyle choices to desired outcomes: professional confidence, creative expression, financial responsibility, or wellness goals.",
          },
          {
            icon: "4",
            title: "Mindful recommendations",
            desc: "Deliver personalized guidance that reduces impulsive behavior and strengthens intentional, identity-affirming choices.",
          },
        ],
      },
      {
        eyebrow: "Intelligence Engine",
        heading: "Fashion psychology meets AI",
        body:
          "The platform goes beyond style recommendations — it understands the psychological relationship between clothing, identity, and emotional well-being.",
        items: [
          {
            icon: "🧠",
            title: "Emotional state mapping",
            desc: "AI maps how clothing choices correlate with emotional states — identifying patterns in how people dress when stressed, confident, anxious, or empowered.",
          },
          {
            icon: "💪",
            title: "Confidence & identity support",
            desc: "Strengthen the relationship between what people wear and how they feel, building identity expression and self-confidence over time.",
          },
          {
            icon: "🌱",
            title: "Mindful consumption",
            desc: "Encourage intentional, values-driven purchasing that aligns lifestyle choices with psychological wellness and financial responsibility.",
          },
        ],
        image: "/products/cheers-fashion/CWFashion3.jpeg",
      },
      {
        eyebrow: "Research Partnership",
        heading: "Grounded in fashion & psychology research",
        body:
          "The behavioral science behind Cheers Fashion is guided by research from NIFT — the National Institute of Fashion Technology, India's premier fashion education and research institution — combining fashion psychology, consumer behavior analysis, and AI-driven outcome alignment. Research lead: Dr. Kaustav Sengupta, Professor, NIFT.",
      },
      {
        eyebrow: "Who Benefits",
        heading: "Designed for mindful living",
        items: [
          {
            icon: "🧍",
            title: "Individuals",
            desc: "Build a healthier relationship between what you wear and how you feel, with AI-guided wardrobe and lifestyle decisions.",
          },
          {
            icon: "🏬",
            title: "Fashion brands",
            desc: "Understand the emotional drivers behind consumer choices, enabling more responsible and outcome-aligned product positioning.",
          },
          {
            icon: "🏢",
            title: "Enterprises",
            desc: "Integrate fashion psychology into employee wellness programs — dress confidence impacts workplace performance and identity.",
          },
        ],
      },
    ],
  },
];
