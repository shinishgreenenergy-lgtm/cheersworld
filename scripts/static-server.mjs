// Local preview server for the exported site (out/) with production-style
// clean URLs — in production nginx on the EC2 serves /var/www/cheersworld
// with equivalent try_files rules.
//
// Usage:
//   node scripts/static-server.mjs [root]    # default root: ../out, port 8788 (or PORT env)
//
// Serves Next.js `output: "export"` builds with clean URLs:
//   /contact → contact.html, /products/x → products/x.html, / → index.html
// Unknown paths get 404.html with a 404 status.

import http from "node:http";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize, extname } from "node:path";

const root = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "out");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".glb": "model/gltf-binary",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp4": "video/mp4",
  ".webmanifest": "application/manifest+json",
};

const cacheControl = (path) => {
  if (path.startsWith("/_next/static/")) return "public, max-age=31536000, immutable";
  if (/\.(png|jpe?g|webp|avif|svg|ico|glb|woff2?|mp4)$/.test(path)) return "public, max-age=604800, stale-while-revalidate=86400";
  return "no-cache";
};

async function readIfFile(path) {
  try {
    const stat = await fs.stat(path);
    if (!stat.isFile()) return null;
    return await fs.readFile(path);
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
  } catch {
    res.writeHead(400).end();
    return;
  }

  // resolve within root only — reject traversal
  const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const base = join(root, safe);
  if (!base.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }

  const bare = safe.replace(/\/+$/, "");
  const candidates = safe.endsWith("/") || safe === "."
    ? [join(root, bare, "index.html"), join(root, `${bare}.html`)]
    : [base, `${base}.html`, join(base, "index.html")];

  let body = null;
  let served = null;
  for (const candidate of candidates) {
    body = await readIfFile(candidate);
    if (body) {
      served = candidate;
      break;
    }
  }

  let status = 200;
  if (!body) {
    status = 404;
    served = join(root, "404.html");
    body = (await readIfFile(served)) ?? Buffer.from("Not found");
  }

  res.writeHead(status, {
    "Content-Type": TYPES[extname(served)] ?? "application/octet-stream",
    "Cache-Control": cacheControl(urlPath),
    "X-Content-Type-Options": "nosniff",
  });
  res.end(body);
});

const port = Number(process.env.PORT ?? 8788);
server.listen(port, () => console.log(`Static site on :${port}, root: ${root}`));
