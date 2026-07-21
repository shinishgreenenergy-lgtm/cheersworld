// Trust Centre documents — Privacy, Responsible AI, Accessibility.
// Plain-language commitments grounded in how the platform actually works;
// no certifications or guarantees are claimed that we do not hold.

export type PolicySection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type PolicyDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  lead: string;
  sections: PolicySection[];
};

export const trustCentre: PolicyDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Cheers Health collects, uses and protects personal data when you use the Service.",
    updated: "Effective 3 February 2024",
    lead: "Cheers Health (“us”, “we”, or “our”) operates the Cheers Health mobile application (the “Service”). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.",
    sections: [
      {
        heading: "Information collection and use",
        body: [
          "We collect several different types of information for various purposes to provide and improve our Service to you.",
          "While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:",
        ],
        bullets: [
          "Email address",
          "First name and last name",
          "Phone number",
          "Address, State, Province, ZIP/Postal code, City",
          "Cookies and Usage Data",
        ],
      },
      {
        heading: "Usage data",
        body: [
          "When you access the Service by or through a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data (“Usage Data”).",
        ],
      },
      {
        heading: "Tracking & cookies data",
        body: [
          "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.",
          "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. Examples of cookies we use:",
        ],
        bullets: [
          "Session Cookies — to operate our Service.",
          "Preference Cookies — to remember your preferences and various settings.",
          "Security Cookies — for security purposes.",
        ],
      },
      {
        heading: "Use of data",
        body: ["Cheers Health uses the collected data for various purposes:"],
        bullets: [
          "To provide and maintain the Service",
          "To notify you about changes to our Service",
          "To allow you to participate in interactive features of our Service when you choose to do so",
          "To provide customer care and support",
          "To provide analysis or valuable information so that we can improve the Service",
          "To monitor the usage of the Service",
          "To detect, prevent and address technical issues",
          "To provide analytical insights on an aggregate basis for business and celebrity users",
        ],
      },
      {
        heading: "Transfer of data",
        body: [
          "Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.",
          "If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.",
          "Cheers Health will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy, and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.",
        ],
      },
      {
        heading: "Disclosure of data",
        body: ["Cheers Health may disclose your Personal Data in the good faith belief that such action is necessary to:"],
        bullets: [
          "Comply with a legal obligation",
          "Protect and defend the rights or property of Cheers Health",
          "Prevent or investigate possible wrongdoing in connection with the Service",
          "Protect the personal safety of users of the Service or the public",
          "Protect against legal liability",
        ],
      },
      {
        heading: "Security of data",
        body: [
          "The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
        ],
      },
      {
        heading: "Service providers & analytics",
        body: [
          "We may employ third-party companies and individuals to facilitate our Service (“Service Providers”), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
          "We may use third-party Service Providers to monitor and analyze the use of our Service.",
        ],
      },
      {
        heading: "Links to other sites",
        body: [
          "Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.",
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "Our Service does not address anyone under the age of 18 (“Children”). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.",
        ],
      },
      {
        heading: "Changes to this privacy policy",
        body: [
          "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page, and let you know via email and/or a prominent notice on our Service prior to the change becoming effective, updating the “effective date” at the top of this Privacy Policy.",
          "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
        ],
      },
      {
        heading: "Contact us",
        body: ["If you have any questions about this Privacy Policy, please contact us by email: support@cheerswisdom.com."],
      },
    ],
  },
  {
    slug: "responsible-ai",
    title: "Responsible AI",
    description: "The principles and oversight behind Cheers Wisdom's human-first, science-led AI.",
    updated: "22 July 2026",
    lead: "Our platform observes human state and intervenes in human lives — recovery after surgery, a student's digital wellbeing, a driver's alertness. That demands a higher bar than ordinary software. These are the principles we hold ourselves to, and the oversight that keeps us honest.",
    sections: [
      {
        heading: "Evidence before claims",
        body: [
          "Every domain follows the same discipline: name the human challenge, apply the platform, measure the outcome, publish the evidence. Where outcomes are not yet measured, we say so — on this site, metrics that are not yet real are marked as such, never invented. Our first peer-reviewed clinical work is published in JACC, and studies in other domains are in progress with named investigators.",
        ],
      },
      {
        heading: "Humans stay in the loop",
        body: [
          "The AI raises awareness; people make decisions. Clinical alerts route to care teams, school signals route to counsellors and parents, safety signals route to safety managers. The platform is designed to make the responsible human earlier and better informed — not to replace them.",
        ],
      },
      {
        heading: "Transparency with the people observed",
        body: [
          "People know what the platform observes and why. Digital behaviour is understood through consented, transparent methods, and every program states its purpose plainly to the people in it — patients, students and families, workers.",
        ],
      },
      {
        heading: "Proportionality",
        body: [
          "We collect what the program needs and no more. A recovery program observes recovery signals; a cyber-wellbeing program observes digital-behaviour patterns. Observation is scoped to the outcome the program exists to improve.",
        ],
      },
      {
        heading: "Safety boundaries",
        body: [
          "The platform is a wellbeing and awareness companion. It is not an emergency service and does not replace professional diagnosis or treatment. Where the platform detects concerning signals, its job is to bring the right humans in quickly.",
        ],
      },
      {
        heading: "Oversight",
        body: [
          "The scientific direction of the platform is overseen by an independent Scientific Advisory Board, and clinical work runs under named principal investigators at partner institutions, with ethics review as part of every research protocol. Their names are public on this site — accountability starts with being identifiable.",
        ],
      },
      {
        heading: "Raising concerns",
        body: [
          "If you believe the platform has behaved in a way that conflicts with these principles, tell us at support@cheerswisdom.com. Reports go to the team responsible for the program, and to the advisory oversight where warranted.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Cheers Wisdom's accessibility commitments for this website and the Cheers platform.",
    updated: "22 July 2026",
    lead: "Wellbeing technology is used by people recovering from surgery, students, older adults and people under stress. If it is not accessible, it does not work — for exactly the people it exists for. This page describes what we do today and where we are still improving.",
    sections: [
      {
        heading: "Our standard",
        body: [
          "We design this website and the Cheers applications toward WCAG 2.2 level AA. We do not claim full conformance today; we treat the guidelines as the working bar for every new feature and redesign.",
        ],
      },
      {
        heading: "What is built in today",
        bullets: [
          "Reduced motion: animations across the site and platform respect the system 'reduce motion' preference.",
          "Keyboard operability: interactive elements — including galleries, viewers and selectors — are usable with a keyboard, with visible focus states.",
          "Semantic structure: headings, landmarks and labels for assistive technologies, and alt text on meaningful images.",
          "Readable type and contrast on both light and dark surfaces.",
        ],
      },
      {
        heading: "In the platform",
        bullets: [
          "Daily check-ins are designed to be short, simple and forgiving — built for people in recovery, not power users.",
          "Voice-based interaction is available in the health companion for people who prefer speaking to typing.",
          "Programs run in the person's preferred language where the deployment supports it.",
        ],
      },
      {
        heading: "Known limitations",
        body: [
          "Some older photographs and third-party embeds may lack complete descriptions, and some complex visualisations are still being improved for screen-reader users. We prioritise fixes that affect core journeys first — check-ins, alerts and reports.",
        ],
      },
      {
        heading: "Tell us what's broken",
        body: [
          "If something on this site or in a Cheers application is hard or impossible for you to use, we want to know. Write to support@cheerswisdom.com with the page or screen and what happened — accessibility reports are treated as defects, not feedback.",
        ],
      },
    ],
  },
];
