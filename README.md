# Cheers Wisdom — cheerswisdom.com

Marketing site for the Cheers Wisdom Human Intelligence Platform. Built with
Next.js 16 (App Router, Turbopack) and exported as a fully static site
(`output: "export"` → `out/`), currently deployed on Netlify
(site `chworld23576`, https://chworld23576.netlify.app) with room to move to a
VM or Hostinger later.

## Commands

```bash
npm run dev          # Next dev server only (no email functions) — http://localhost:3000
npx netlify dev      # Next dev + email functions together — http://localhost:8888  ← use this
npm run build        # static production build into out/
npm run lint         # eslint
node scripts/email-server.mjs   # standalone mail API for non-Netlify hosting (port 8787)
```

Always test the contact/careers forms on **http://localhost:8888** (`netlify dev`);
on plain `next dev` the `/.netlify/functions/*` endpoints don't exist and forms
will show "Something went wrong".

## Email pipeline

Contact (`/contact`) and careers (`/careers`) forms send through
**ZeptoMail SMTP** via serverless functions in `netlify/functions/`
(`contact.mjs`, `careers.mjs`, shared branded template in `lib/email.mjs`).
The careers form accepts CV attachments (`.pdf .doc .docx .rtf .txt .odt`, 4 MB max).

The frontend posts to `formsEndpoint()` from `src/lib/forms.ts` — defaults to
`/.netlify/functions`, overridable at build time with
`NEXT_PUBLIC_FORMS_ENDPOINT` for non-Netlify hosting.

## Environment variables

Set locally in `.env.local` (gitignored) and in
**Netlify → Site settings → Environment variables** (already configured for
`chworld23576`). The SMTP token is a **secret** — it lives only in `.env.local`
and Netlify's env store, never in git or this file.

| Variable | Value | Notes |
| --- | --- | --- |
| `ZEPTO_SMTP_HOST` | `smtp.zeptomail.in` | ZeptoMail SMTP server (India DC) |
| `ZEPTO_SMTP_PORT` | `465` | SSL. Use `587` for STARTTLS instead |
| `ZEPTO_SMTP_USER` | `emailapikey` | Literal username for ZeptoMail SMTP |
| `ZEPTO_SMTP_PASS` | *(secret — see `.env.local` / Netlify env, prod-context secret)* | ZeptoMail send-mail token for the nextdooh.com Mail Agent |
| `ZEPTO_FROM` | `noreply@nextdooh.com` | Verified sender domain on ZeptoMail |
| `CONTACT_TO` | `support@cheerswisdom.com` *(default, optional override)* | Where contact-form mail lands |
| `CONTACT_CC` | *(unset — no CC by default)* | Optional CC on contact mail |
| `CAREERS_TO` | `careers@cheerswisdom.com` *(default, optional override)* | Where applications land |
| `CAREERS_CC` | *(unset — no CC by default)* | Optional CC on applications |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | *(unset on Netlify)* | Build-time. Set to the mail API base URL (e.g. `https://api.cheerswisdom.com`) when hosting the static site off Netlify |
| `ALLOWED_ORIGIN` | *(standalone server only)* | CORS origin for `scripts/email-server.mjs`, e.g. `https://www.cheerswisdom.com` |
| `PORT` | `8787` *(default)* | Port for the standalone mail server |

## Hosting notes

- **Netlify (current):** static site + functions deploy together from `main`
  via GitHub. Env vars above are already set; changing them requires a redeploy.
- **VM / Hostinger (future):** serve `out/` as static files, run
  `node scripts/email-server.mjs` (systemd/pm2) with the same `ZEPTO_*` vars +
  `ALLOWED_ORIGIN`, and rebuild the site with `NEXT_PUBLIC_FORMS_ENDPOINT`
  pointing at that server. It answers both `/contact`-style and
  `/.netlify/functions/contact`-style paths.

## Project layout

- `src/app/` — routes (contact, careers, products/[slug], platform, …)
- `src/lib/content/` — all page copy as typed data (products, nav, footer, team, …)
- `src/components/sections/` — page sections; `src/components/ui/` — primitives
- `netlify/functions/` — email functions + shared template
- `scripts/email-server.mjs` — standalone mail API for non-Netlify hosts
- `public/` — static assets (`cheers-mark.png` is the brand mark used in header,
  footer and favicon; team portraits in `public/team/`)
