"use client";

import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, Check, Building2, MessageSquare } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const SUPPORT_EMAIL = "support@cheerswisdom.com";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

const AUDIENCES = ["Hospitals", "Schools", "Mines", "Fleets", "Agencies", "Teams"];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", organisation: "", role: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Aurora />
      <Header />
      <main className="min-h-[100svh] bg-white px-4 pb-24 pt-32 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* left — copy + details */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Contact
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Bring the platform to <span className="text-gradient">your organisation</span>
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              Tell us about your organisation and goals. We&apos;ll set up a scoped pilot with measurable
              baselines — and show outcomes before you scale.
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 transition-colors hover:bg-white"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white">
                <Mail className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] font-semibold text-muted">Prefer email?</span>
                <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">{SUPPORT_EMAIL}</span>
              </span>
            </a>

            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Who we work with</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {AUDIENCES.map((a) => (
                  <span key={a} className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* right — form */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_40px_100px_-50px_rgba(20,22,42,0.4)] sm:p-8">
            {status === "sent" ? (
              <div className="grid place-items-center py-16 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white shadow-[0_16px_34px_-12px_rgba(46,158,91,0.6)]">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">Message sent</h2>
                <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">
                  Thanks for reaching out — our team will get back to you shortly. You can also email us at{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-accent hover:underline">{SUPPORT_EMAIL}</a>.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" onChange={() => {}} />
                  </label>
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" value={form.name} onChange={set("name")} required />
                  <Field label="Work email" name="email" type="email" value={form.email} onChange={set("email")} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Organisation" name="organisation" icon={<Building2 className="h-4 w-4" />} value={form.organisation} onChange={set("organisation")} />
                  <Field label="Your role" name="role" value={form.role} onChange={set("role")} />
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-ink-soft">
                    <MessageSquare className="h-4 w-4 text-muted" /> How can we help?
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your organisation, the outcomes you're after, and any timeline."
                    className="rounded-xl border border-line bg-canvas px-3.5 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60 focus:bg-white"
                  />
                </label>

                {status === "error" && (
                  <p className="text-[13px] font-semibold text-red-600">
                    Something went wrong. Please email us at {SUPPORT_EMAIL}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#5bb873,#2e8b57)] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_40px_-14px_rgba(46,158,91,0.55)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-[12px] text-muted">
                  We&apos;ll only use your details to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
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
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-ink-soft">
        {icon && <span className="text-muted">{icon}</span>}
        {label}
        {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent/60 focus:bg-white"
      />
    </label>
  );
}
