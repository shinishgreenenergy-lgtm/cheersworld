import nodemailer from "nodemailer";
import { esc, buildEmail, receivedNow, makeTransportConfig } from "./lib/email.mjs";

// Contact-form handler: receives the site's form as JSON and relays it
// through ZeptoMail SMTP. All secrets live in Netlify environment variables:
//   ZEPTO_SMTP_HOST  (smtp.zeptomail.in)
//   ZEPTO_SMTP_PORT  (465 = SSL, 587 = STARTTLS)
//   ZEPTO_SMTP_USER  (emailapikey)
//   ZEPTO_SMTP_PASS  (ZeptoMail send-mail token)
//   ZEPTO_FROM       (verified sender, e.g. noreply@nextdooh.com)
//   CONTACT_TO       (where submissions land; defaults to support@cheerswisdom.com)
//   CONTACT_CC       (optional CC; no CC by default)

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
  const message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Name, a valid email and a message are required" }), { status: 400 });
  }

  const transporter = nodemailer.createTransport(makeTransportConfig());
  const from = process.env.ZEPTO_FROM ?? "noreply@nextdooh.com";
  const to = process.env.CONTACT_TO ?? "support@cheerswisdom.com";
  const cc = process.env.CONTACT_CC ?? "";
  const receivedAt = receivedNow();

  const rows = [
    ["From", `<a href="mailto:${esc(email)}" style="color:#2e8b57; text-decoration:none;">${esc(email)}</a>`],
  ];
  if (role) rows.push(["Role", esc(role)]);
  rows.push(["Received", esc(receivedAt)]);

  const lines = [
    ["Name", name],
    ["Email", email],
    ["Organisation", organisation || "—"],
    ["Role", role || "—"],
    ["Received", receivedAt],
  ];

  try {
    await transporter.sendMail({
      from: `"Cheers Wisdom website" <${from}>`,
      to,
      ...(cc ? { cc } : {}),
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New enquiry — ${name}${organisation ? `, ${organisation}` : ""}`,
      text: lines.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${message}`,
      html: buildEmail({
        eyebrow: "Website enquiry",
        title: name,
        titleAccent: organisation,
        subline: "wants to bring the platform to their organisation",
        rows,
        messageLabel: "Message",
        message,
        reply: { name, email },
        footerNote: "Sent by the contact form at cheerswisdom.com",
      }),
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("contact function send failed:", err.message);
    return new Response(JSON.stringify({ error: "Failed to send" }), { status: 502 });
  }
};

export default handler;
