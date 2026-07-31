import type { Metadata } from "next";

// The contact page itself is a client component (form state), so its
// metadata lives here — otherwise it inherits the homepage title and
// canonical from the root layout.
export const metadata: Metadata = {
  title: "Contact · Cheers Wisdom",
  description:
    "Talk to the Cheers Wisdom team about bringing the Human Intelligence Platform to your hospital, school or organisation.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
