"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { formsEndpoint } from "@/lib/forms";

const SUPPORT_EMAIL = "support@cheerswisdom.com";

const SOLUTIONS = [
  "Whole platform",
  "Cheers Health",
  "Cheers Digital",
  "Cheers Miner",
  "Cheers Drive",
  "Cheers Finance",
  "Cheers Social",
  "Cheers Sports",
  "Something else",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<"name" | "email" | "organisation", string>>;

function validate(form: { name: string; email: string; organisation: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (form.organisation.trim().length < 2) errors.organisation = "Please tell us your organisation.";
  return errors;
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={200}
        aria-invalid={error ? true : undefined}
        className={`rounded-none border-0 border-b bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-accent ${error ? "border-red-400" : "border-line"}`}
      />
      {error && <span className="text-[12.5px] font-semibold text-red-600">{error}</span>}
    </label>
  );
}

export function DemoRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", organisation: "", role: "", solution: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setFieldErrors((prev) => (k in prev ? { ...prev, [k]: undefined } : prev));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(formsEndpoint("demo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.error ?? null);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass grid place-items-center rounded-3xl px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white shadow-[0_16px_34px_-12px_rgba(46,158,91,0.6)]">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">Demo request received</h2>
        <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">
          We&apos;ll reach out shortly to schedule a walkthrough tailored to your domain. You can also write to{" "}
          <span className="font-semibold text-ink">{SUPPORT_EMAIL}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white/80 p-6 backdrop-blur sm:p-9">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2e9e5b,#14b8a6)]" />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <p className="hidden">
          <label>
            Don&apos;t fill this out:{" "}
            <input name="company" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" name="name" value={form.name} onChange={set("name")} required placeholder="Your name" error={fieldErrors.name} />
          <Field label="Work email" name="email" type="email" value={form.email} onChange={set("email")} required placeholder="you@organisation.org" error={fieldErrors.email} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Organisation" name="organisation" value={form.organisation} onChange={set("organisation")} required placeholder="Hospital, school, mine, fleet…" error={fieldErrors.organisation} />
          <Field label="Your role" name="role" value={form.role} onChange={set("role")} placeholder="e.g. Head of Safety" />
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">What would you like to see?</span>
          <select
            name="solution"
            value={form.solution}
            onChange={set("solution")}
            className="rounded-none border-0 border-b border-line bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors focus:border-accent"
          >
            <option value="">Choose a solution…</option>
            {SOLUTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">Anything specific?</span>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={set("message")}
            maxLength={5000}
            placeholder="Your population, the outcomes you're after, timelines — anything that helps us tailor the demo."
            className="rounded-none border-0 border-b border-line bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-accent"
          />
        </label>

        {status === "error" && (
          <p className="text-[13px] font-semibold text-red-600">
            {errorMsg ?? `Something went wrong. Please email us at ${SUPPORT_EMAIL}.`}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : "Request demo"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="text-[12px] leading-relaxed text-muted">
            Used only to arrange your demo —{" "}
            <a href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
