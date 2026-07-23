"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, FileText, Paperclip, X } from "lucide-react";
import { formsEndpoint } from "@/lib/forms";

const CAREERS_EMAIL = "careers@cheerswisdom.com";
const AREAS = ["Engineering", "Clinical & Research", "Behavioral Science", "Design & Communication", "Something else"];
const ACCEPT = ".pdf,.doc,.docx,.rtf,.txt,.odt";
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const prettyBytes = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(n / 1024)} KB`);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/i;
const MIN_MESSAGE = 20;

type FieldErrors = Partial<Record<"name" | "email" | "link" | "message", string>>;

function validate(form: { name: string; email: string; link: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (form.link.trim() && !URL_RE.test(form.link.trim()))
    errors.link = "That link doesn't look right — e.g. github.com/you or a full URL.";
  const note = form.message.trim();
  if (note.length === 0) errors.message = "Tell us a little about yourself and what you'd like to work on.";
  else if (note.length < MIN_MESSAGE) errors.message = `A few more words, please — at least ${MIN_MESSAGE} characters.`;
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

export function CareersApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", area: "", link: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    // clear the field's error as soon as the user starts fixing it
    setFieldErrors((prev) => (k in prev ? { ...prev, [k]: undefined } : prev));
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFileError(null);
    if (!f) return setFile(null);
    const ext = f.name.toLowerCase().split(".").pop() ?? "";
    if (!ACCEPT.includes(`.${ext}`)) {
      setFileError(`Only ${ACCEPT.replaceAll(",", ", ")} files are accepted.`);
      return setFile(null);
    }
    if (f.size > MAX_FILE_BYTES) {
      setFileError("File is larger than 4 MB — please attach a smaller CV.");
      return setFile(null);
    }
    setFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(f);
    });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setStatus("sending");
    setErrorMsg(null);
    try {
      const payload: Record<string, unknown> = { ...form, company: honeypot };
      if (file) payload.file = { filename: file.name, data: await toBase64(file) };
      const res = await fetch(formsEndpoint("careers"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-ink">Application sent</h2>
        <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">
          Thanks — we read every application. If the work fits, we&apos;ll be in touch. You can also reach us at{" "}
          <a href={`mailto:${CAREERS_EMAIL}`} className="font-semibold text-accent hover:underline">
            {CAREERS_EMAIL}
          </a>
          .
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
          <Field label="Email" name="email" type="email" value={form.email} onChange={set("email")} required placeholder="you@example.com" error={fieldErrors.email} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">Area of interest</span>
            <select
              name="area"
              value={form.area}
              onChange={set("area")}
              className="rounded-none border-0 border-b border-line bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors focus:border-accent"
            >
              <option value="">Choose an area…</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <Field label="Portfolio / LinkedIn" name="link" value={form.link} onChange={set("link")} placeholder="github.com/you, linkedin.com/in/you…" error={fieldErrors.link} />
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            What would you build here? <span className="text-accent">*</span>
          </span>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={set("message")}
            maxLength={5000}
            aria-invalid={fieldErrors.message ? true : undefined}
            placeholder="A short note about yourself and the problems you want to work on."
            className={`rounded-none border-0 border-b bg-transparent px-0 py-2 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-accent ${fieldErrors.message ? "border-red-400" : "border-line"}`}
          />
          {fieldErrors.message && <span className="text-[12.5px] font-semibold text-red-600">{fieldErrors.message}</span>}
        </label>

        {/* CV upload */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft">CV / Resume</span>
          <input ref={fileInput} type="file" accept={ACCEPT} onChange={onFile} className="hidden" id="cv-upload" />
          {file ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/5 px-4 py-3">
              <span className="flex min-w-0 items-center gap-2.5 text-[14px] text-ink">
                <FileText className="h-4 w-4 shrink-0 text-accent" />
                <span className="truncate font-medium">{file.name}</span>
                <span className="shrink-0 text-[12.5px] text-muted">{prettyBytes(file.size)}</span>
              </span>
              <button type="button" onClick={clearFile} aria-label="Remove file" className="rounded-full p-1 text-muted transition-colors hover:bg-black/5 hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="cv-upload"
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-line px-4 py-3 text-[14px] text-muted transition-colors hover:border-accent hover:text-ink"
            >
              <Paperclip className="h-4 w-4" />
              Attach your CV — PDF, DOC, DOCX, RTF · 4 MB max
            </label>
          )}
          {fileError && <p className="text-[13px] font-semibold text-red-600">{fileError}</p>}
        </div>

        {status === "error" && (
          <p className="text-[13px] font-semibold text-red-600">
            {errorMsg ?? `Something went wrong. Please email us at ${CAREERS_EMAIL}.`}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_16px_34px_-14px_rgba(20,22,42,0.6)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : "Send application"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="text-[12px] leading-relaxed text-muted">
            Prefer email?{" "}
            <a href={`mailto:${CAREERS_EMAIL}`} className="font-semibold text-accent underline-offset-2 hover:underline">
              {CAREERS_EMAIL}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
