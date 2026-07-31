"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { formsEndpoint } from "@/lib/forms";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formsEndpoint("contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscription",
          email: email.trim(),
          message: `Please add ${email.trim()} to the newsletter list.`,
          company: honeypot,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 flex max-w-sm gap-2">
      <p className="hidden">
        <label>
          Don&apos;t fill this out:{" "}
          <input name="company" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Work email"
        aria-label="Email address"
        aria-invalid={status === "error" ? true : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted/80 focus:border-accent focus:ring-2 focus:ring-accent/25 ${
          status === "error" ? "border-red-400" : "border-ink/15 hover:border-ink/25"
        }`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="shrink-0 rounded-xl bg-[linear-gradient(120deg,#5bb873,#2e8b57)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(46,158,91,0.55)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {status === "sending" ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
