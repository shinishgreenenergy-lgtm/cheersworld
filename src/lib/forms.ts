// Where form submissions are POSTed. Same-origin by default: nginx on the
// EC2 proxies /api/forms/* to the mail API (scripts/email-server.mjs), so
// no CORS is involved. Override at build time with NEXT_PUBLIC_FORMS_ENDPOINT
// (e.g. http://localhost:8787 for local testing against the mail server).
const base = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "/api/forms";

export const formsEndpoint = (name: "contact" | "careers" | "demo") => `${base}/${name}`;
