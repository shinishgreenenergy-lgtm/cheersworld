// Only real, already-published quotes. `video` is a /public path — when the
// owner adds a clip, the card grows a play button automatically.
export const testimonials = {
  eyebrow: "Voices",
  title: "Real impact, real voices",
  subtitle: "What clinicians, educators and participants experience with the platform.",
  items: [
    {
      quote: "Cheers Health redefines recovery through awareness.",
      name: "Dr. Sundeep Mishra",
      role: "Ujala Cygnus",
      initials: "SM",
      category: "Clinician",
      linkedin: "https://www.linkedin.com/in/sundeep-mishra-3a42bb1bb" as string | undefined,
      video: undefined as string | undefined,
    },
    {
      quote: "Students feel emotionally safer online with Cheers Digital.",
      name: "Principal",
      role: "Modern School",
      initials: "MS",
      category: "Educator",
      linkedin: undefined as string | undefined,
      video: undefined as string | undefined,
    },
    {
      quote: "It reminded me to eat, rest, and care, like a real companion.",
      name: "Trial Patient",
      role: "Jaipur",
      initials: "TP",
      category: "Participant",
      linkedin: undefined as string | undefined,
      video: undefined as string | undefined,
    },
  ],
};
