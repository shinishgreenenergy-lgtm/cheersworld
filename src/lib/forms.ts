// Where form submissions are POSTed. Defaults to Netlify Functions paths
// (works on Netlify hosting and `netlify dev`). When the static site is
// hosted elsewhere (VM, Hostinger…), set NEXT_PUBLIC_FORMS_ENDPOINT at build
// time to the mail API's base URL, e.g. "https://api.cheerswisdom.com" —
// the standalone server in scripts/email-server.mjs serves the same routes.
const base = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "/.netlify/functions";

export const formsEndpoint = (name: "contact" | "careers") => `${base}/${name}`;
