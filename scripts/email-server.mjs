// Standalone mail API for non-Netlify hosting (VM, Hostinger VPS, …).
// Serves the same handlers as the Netlify Functions:
//   POST /contact   POST /careers   (also accepts /.netlify/functions/* paths)
//
// Usage:
//   node scripts/email-server.mjs            # port 8787 (or PORT env)
//
// Env (same as Netlify): ZEPTO_SMTP_HOST, ZEPTO_SMTP_PORT, ZEPTO_SMTP_USER,
// ZEPTO_SMTP_PASS, ZEPTO_FROM, CONTACT_TO/CC, CAREERS_TO/CC.
// Reads .env.local / .env from the repo root if present.
// If the static site is served from a different origin, set
// ALLOWED_ORIGIN=https://www.cheerswisdom.com for CORS.

import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// lightweight .env loader — process env always wins
for (const file of [".env.local", ".env"]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const i = line.indexOf("=");
    if (i < 1 || line.trimStart().startsWith("#")) continue;
    const key = line.slice(0, i).trim();
    if (!(key in process.env)) process.env[key] = line.slice(i + 1).trim();
  }
}

const { default: contact } = await import(join(root, "netlify/functions/contact.mjs"));
const { default: careers } = await import(join(root, "netlify/functions/careers.mjs"));
const { default: demo } = await import(join(root, "netlify/functions/demo.mjs"));

const routes = { "/contact": contact, "/careers": careers, "/demo": demo };
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*";
const cors = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = http.createServer(async (req, res) => {
  const path = (req.url ?? "/").split("?")[0].replace(/^\/\.netlify\/functions/, "");
  const handler = routes[path];

  if (req.method === "OPTIONS") {
    res.writeHead(handler ? 204 : 404, cors);
    return res.end();
  }
  if (!handler) {
    res.writeHead(404, { "Content-Type": "application/json", ...cors });
    return res.end(JSON.stringify({ error: "Not found" }));
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);

  try {
    const response = await handler(
      new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: chunks.length ? Buffer.concat(chunks) : undefined,
      })
    );
    res.writeHead(response.status, { ...Object.fromEntries(response.headers), ...cors });
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error("email-server error:", err);
    res.writeHead(500, { "Content-Type": "application/json", ...cors });
    res.end(JSON.stringify({ error: "Internal error" }));
  }
});

const port = Number(process.env.PORT ?? 8787);
server.listen(port, () => console.log(`Mail API listening on :${port} (origin: ${allowedOrigin})`));
