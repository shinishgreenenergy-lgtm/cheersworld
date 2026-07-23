import nodemailer from "nodemailer";
import { esc, buildEmail, receivedNow, makeTransportConfig } from "./lib/email.mjs";

// Careers-application handler: receives the application as JSON (CV attached
// as base64) and relays it through ZeptoMail SMTP.
// Env: ZEPTO_* as in contact.mjs, plus
//   CAREERS_TO  (defaults to careers@cheerswisdom.com)
//   CAREERS_CC  (defaults to shinish@kryil.com)

const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;
// Netlify sync functions cap payloads at 6 MB; 4 MB of file is ~5.4 MB base64.
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const ALLOWED_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  rtf: "application/rtf",
  txt: "text/plain",
  odt: "application/vnd.oasis.opendocument.text",
};

const prettyBytes = (n) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(n / 1024)} KB`);

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
  const area = String(body.area ?? "").trim().slice(0, MAX_FIELD);
  const link = String(body.link ?? "").trim().slice(0, MAX_FIELD);
  const message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (name.length < 2) {
    return new Response(JSON.stringify({ error: "Please enter your name" }), { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Please enter a valid email address" }), { status: 400 });
  }
  if (message.length < 20) {
    return new Response(JSON.stringify({ error: "Please tell us a little more — at least 20 characters" }), { status: 400 });
  }
  if (link && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/i.test(link)) {
    return new Response(JSON.stringify({ error: "Portfolio link doesn't look like a valid URL" }), { status: 400 });
  }

  // Optional CV attachment: { filename, data (base64) }
  let attachment = null;
  if (body.file && body.file.data) {
    const filename = String(body.file.filename ?? "cv").replace(/[/\\]/g, "_").slice(0, 120);
    const ext = filename.toLowerCase().split(".").pop();
    if (!ALLOWED_TYPES[ext]) {
      return new Response(
        JSON.stringify({ error: `File type .${ext} not accepted — use ${Object.keys(ALLOWED_TYPES).map((e) => `.${e}`).join(", ")}` }),
        { status: 400 }
      );
    }
    const data = String(body.file.data).replace(/^data:[^,]*,/, "");
    const approxBytes = Math.floor(data.length * 0.75);
    if (approxBytes > MAX_FILE_BYTES) {
      return new Response(JSON.stringify({ error: "File too large — 4 MB max" }), { status: 400 });
    }
    let content;
    try {
      content = Buffer.from(data, "base64");
    } catch {
      return new Response(JSON.stringify({ error: "Unreadable file data" }), { status: 400 });
    }
    attachment = { filename, content, contentType: ALLOWED_TYPES[ext] };
  }

  const transporter = nodemailer.createTransport(makeTransportConfig());
  const from = process.env.ZEPTO_FROM ?? "noreply@nextdooh.com";
  const to = process.env.CAREERS_TO ?? "careers@cheerswisdom.com";
  const cc = process.env.CAREERS_CC ?? "shinish@kryil.com";
  const receivedAt = receivedNow();

  const rows = [
    ["From", `<a href="mailto:${esc(email)}" style="color:#2e8b57; text-decoration:none;">${esc(email)}</a>`],
  ];
  if (area) rows.push(["Area", esc(area)]);
  if (link) {
    const href = /^https?:\/\//i.test(link) ? link : `https://${link}`;
    rows.push(["Portfolio", `<a href="${esc(href)}" style="color:#2e8b57; text-decoration:none;">${esc(link)}</a>`]);
  }
  rows.push([
    "CV",
    attachment
      ? `${esc(attachment.filename)} <span style="color:#8a9088;">&middot; ${prettyBytes(attachment.content.length)} &middot; attached</span>`
      : `<span style="color:#8a9088;">not attached</span>`,
  ]);
  rows.push(["Received", esc(receivedAt)]);

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    area ? `Area: ${area}` : null,
    link ? `Portfolio: ${link}` : null,
    `CV: ${attachment ? attachment.filename : "not attached"}`,
    `Received: ${receivedAt}`,
  ].filter(Boolean);

  try {
    await transporter.sendMail({
      from: `"Cheers Wisdom website" <${from}>`,
      to,
      ...(cc ? { cc } : {}),
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Application — ${name}${area ? `, ${area}` : ""}`,
      text: textLines.join("\n") + `\n\n${message}`,
      html: buildEmail({
        eyebrow: "Job application",
        title: name,
        titleAccent: area,
        subline: "applied via the careers page",
        rows,
        messageLabel: "Cover note",
        message,
        reply: { name, email },
        footerNote: "Sent by the careers form at cheerswisdom.com",
      }),
      ...(attachment ? { attachments: [attachment] } : {}),
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("careers function send failed:", err.message);
    return new Response(JSON.stringify({ error: "Failed to send" }), { status: 502 });
  }
};

export default handler;
