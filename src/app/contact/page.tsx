"use client";

import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { formsEndpoint } from "@/lib/forms";

const SUPPORT_EMAIL = "support@cheerswisdom.com";

const AUDIENCES = ["Hospitals", "Schools", "Mines", "Fleets", "Agencies", "Teams"];

// What actually happens after the form is sent — no black hole.
const NEXT_STEPS = [
  { n: "01", title: "Routed to the right team", body: "Clinical, education, industry or government — your enquiry goes to the people who run that domain." },
  { n: "02", title: "Scoping conversation", body: "We talk through your organisation, the outcomes you're after, and what a meaningful baseline looks like." },
  { n: "03", title: "Pilot proposal", body: "A scoped pilot with measurable baselines — see the outcomes before you scale." },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", organisation: "", role: "", message: "" });
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(formsEndpoint("contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Aurora />
      <Header />
      <main className="min-h-[100svh] px-4 pb-24 pt-32 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          {/* dossier header */}
          <Reveal>
            <div>
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Contact</span>
                <span className="block h-px w-10 bg-accent" />
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <h1 className="max-w-2xl font-serif text-[clamp(2.2rem,4.6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_60]">
                  Bring the platform to{" "}
                  <em className="italic text-accent [font-variation-settings:'opsz'_60,'SOFT'_60]">your organisation</em>
                </h1>
                <p className="max-w-md text-[15px] leading-relaxed text-muted lg:pb-2">
                  Tell us about your organisation and goals. We&apos;ll set up a scoped pilot with measurable
                  baselines — and show outcomes before you scale.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12 grid items-start gap-12 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* left — direct line + what happens next */}
            <div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-3.5 rounded-2xl border border-line bg-white/70 px-4 py-3.5 backdrop-blur transition-colors hover:border-accent/40"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[12px] font-semibold text-muted">Prefer email?</span>
                  <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{SUPPORT_EMAIL}</span>
                </span>
              </a>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted">What happens next</p>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <ol className="mt-2">
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s.n} className={`flex gap-4 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
                      <span className="pt-0.5 font-mono text-[12px] font-bold text-accent">{s.n}</span>
                      <div>
                        <h3 className="font-display text-[14.5px] font-extrabold tracking-tight text-ink">{s.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted">Who we work with</p>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {AUDIENCES.map((a) => (
                    <span key={a} className="rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* right — the form */}
            <div className="relative overflow-hidden rounded-3xl border border-line bg-white/80 p-6 backdrop-blur sm:p-9">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2e9e5b,#14b8a6)]" />
              {status === "sent" ? (
                <div className="grid place-items-center py-16 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white shadow-[0_16px_34px_-12px_rgba(46,158,91,0.6)]">
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">Message sent</h2>
                  <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">
                    Thanks for reaching out — your enquiry is on its way to the right team. You can also email us at{" "}
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-accent hover:underline">
                      {SUPPORT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form name="contact" method="POST" onSubmit={onSubmit} className="flex flex-col gap-6">
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out: <input name="company" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full name" name="name" value={form.name} onChange={set("name")} required placeholder="Dr. A. Sharma" />
                    <Field label="Work email" name="email" type="email" value={form.email} onChange={set("email")} required placeholder="you@organisation.org" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Organisation" name="organisation" value={form.organisation} onChange={set("organisation")} placeholder="Hospital, school, company…" />
                    <Field label="Your role" name="role" value={form.role} onChange={set("role")} placeholder="e.g. Head of Cardiology" />
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                      How can we help? <span className="text-accent">*</span>
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your organisation, the outcomes you're after, and any timeline."
                      className="rounded-none border-0 border-b border-line bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-accent"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-[13px] font-semibold text-red-600">
                      Something went wrong. Please email us at {SUPPORT_EMAIL}.
                    </p>
                  )}

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <p className="text-[12px] leading-relaxed text-muted">
                      Used only to respond to your enquiry —{" "}
                      <a href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="rounded-none border-0 border-b border-line bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-accent"
      />
    </label>
  );
}
