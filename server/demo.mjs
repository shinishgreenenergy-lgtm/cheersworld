import nodemailer from "nodemailer";
import { esc, buildEmail, receivedNow, makeTransportConfig } from "./lib/email.mjs";

// Demo-request handler: receives the /demo form as JSON and relays it
// through ZeptoMail SMTP. Env: ZEPTO_* as in contact.mjs, plus
//   DEMO_TO  (defaults to support@cheerswisdom.com)
//   DEMO_CC  (optional CC; no CC by default)

const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;

const handler = async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  // Honeypot — real users never fill this hidden field.
  if (body.company) return new Response(JSON.stringify({ ok: true }), { status: 200 });

  const name = String(body.name ?? "").trim().slice(0, MAX_FIELD);
  const email = String(body.email ?? "").trim().slice(0, MAX_FIELD);
  const organisation = String(body.organisation ?? "").trim().slice(0, MAX_FIELD);
  const role = String(body.role ?? "").trim().slice(0, MAX_FIELD);
  const solution = String(body.solution ?? "").trim().slice(0, MAX_FIELD);
  const message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (name.length < 2) {
    return new Response(JSON.stringify({ error: "Please enter your name" }), { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Please enter a valid email address" }), { status: 400 });
  }
  if (organisation.length < 2) {
    return new Response(JSON.stringify({ error: "Please tell us your organisation" }), { status: 400 });
  }

  const transporter = nodemailer.createTransport(makeTransportConfig());
  const from = process.env.ZEPTO_FROM ?? "noreply@nextdooh.com";
  const to = process.env.DEMO_TO ?? "support@cheerswisdom.com";
  const cc = process.env.DEMO_CC ?? "";
  const receivedAt = receivedNow();

  const rows = [
    ["From", `<a href="mailto:${esc(email)}" style="color:#2e8b57; text-decoration:none;">${esc(email)}</a>`],
  ];
  if (role) rows.push(["Role", esc(role)]);
  if (solution) rows.push(["Interested in", esc(solution)]);
  rows.push(["Received", esc(receivedAt)]);

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation}`,
    role ? `Role: ${role}` : null,
    solution ? `Interested in: ${solution}` : null,
    `Received: ${receivedAt}`,
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from: `"Cheers Wisdom website" <${from}>`,
      to,
      ...(cc ? { cc } : {}),
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Demo request — ${name}, ${organisation}`,
      text: textLines.join("\n") + (message ? `\n\n${message}` : ""),
      html: buildEmail({
        eyebrow: "Demo request",
        title: name,
        titleAccent: organisation,
        subline: "requested a platform demo",
        rows,
        messageLabel: "Context",
        message: message || "No additional context provided.",
        reply: { name, email },
        footerNote: "Sent by the demo form at cheerswisdom.com",
      }),
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("demo function send failed:", err.message);
    return new Response(JSON.stringify({ error: "Failed to send" }), { status: 502 });
  }
};

export default handler;
