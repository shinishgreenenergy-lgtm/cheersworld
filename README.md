# Cheers Wisdom — cheerswisdom.com

Marketing site for the Cheers Wisdom Human Intelligence Platform. Built with
Next.js 16 (App Router, Turbopack) and exported as a fully static site
(`output: "export"` → `out/`). The static build is uploaded to the web host;
forms POST to the mail API at https://cheersap.cheerswisdom.com.

## Commands

```bash
npm run dev          # Next dev server — http://localhost:3000
npm run build        # static production build into out/
npm run lint         # eslint
node scripts/email-server.mjs   # mail API (port 8787) — runs on the cheersap VM in production
```

On `npm run dev` the forms post to the production mail API
(`https://cheersap.cheerswisdom.com`) unless you run the mail server locally
and set `NEXT_PUBLIC_FORMS_ENDPOINT=http://localhost:8787`.

## Email pipeline

Contact (`/contact`), careers (`/careers`) and demo (`/demo`) forms — plus the
footer newsletter signup, which reuses the contact route — send through
**Amazon SES SMTP (ap-south-1)** via the handlers in `server/`
(`contact.mjs`, `careers.mjs`, `demo.mjs`, shared branded template in
`lib/email.mjs`), served by `scripts/email-server.mjs`.
The careers form accepts CV attachments (`.pdf .doc .docx .rtf .txt .odt`, 4 MB max).

The frontend posts to `formsEndpoint()` from `src/lib/forms.ts` — defaults to
`https://cheersap.cheerswisdom.com`, overridable at build time with
`NEXT_PUBLIC_FORMS_ENDPOINT`.

## Environment variables

**Secrets live in the vault** — AWS SSM Parameter Store, path
`/cheersworld/mail/*` (SecureString, region `ap-south-2`). The EC2's
`cheersworld-mail` service fetches them at start into a tmpfs env file via
an IAM instance role (`cheersworld-mail-ssm`, read-only on that path);
nothing secret is stored on disk, in git, or in this file. To read one:
`aws ssm get-parameter --region ap-south-2 --name /cheersworld/mail/smtp-pass --with-decryption --query Parameter.Value --output text`

| Variable | Value | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `email-smtp.ap-south-1.amazonaws.com` | Amazon SES SMTP endpoint |
| `SMTP_PORT` | `587` | STARTTLS. `465` would mean implicit SSL |
| `SMTP_USER` | *(vault: `smtp-user`)* | SES SMTP username (IAM user `cheers-mail-smtp` access key) |
| `SMTP_PASS` | *(vault: `smtp-pass`)* | SES SMTP password derived from the IAM secret key |
| `MAIL_FROM` | `noreply@cheerswisdom.com` | Verified SES sender (domain DKIM-signed in ap-south-1) |
| `CONTACT_TO` | `support@cheerswisdom.com` *(default, optional override)* | Where contact-form + newsletter mail lands |
| `CONTACT_CC` | *(unset — no CC by default)* | Optional CC on contact mail |
| `CAREERS_TO` | `careers@cheerswisdom.com` *(default, optional override)* | Where applications land |
| `CAREERS_CC` | *(unset — no CC by default)* | Optional CC on applications |
| `DEMO_TO` | `support@cheerswisdom.com` *(default, optional override)* | Where demo requests land |
| `DEMO_CC` | *(unset — no CC by default)* | Optional CC on demo requests |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | `https://cheersap.cheerswisdom.com` *(default)* | Build-time. Mail API base URL |
| `ALLOWED_ORIGIN` | `https://www.cheerswisdom.com` | CORS origin for `scripts/email-server.mjs` |
| `PORT` | `8787` *(default)* | Port for the mail server |

## Hosting

Everything runs on the **cheers-admin-portal EC2** (`ubuntu@18.61.143.104`,
ap-south-2, key `cheers-admin-key.pem`; Cloudflare-proxied DNS), behind the
host nginx (vhosts in `/etc/nginx/sites-available/`, TLS via the self-signed
origin cert in `/etc/nginx/certs-cheers/` — use Cloudflare SSL mode "Full"):

- **www.cheerswisdom.com / cheerswisdom.com** (vhost `cheersworld`) — the
  static export from `/var/www/cheersworld`; `/api/forms/*` is proxied,
  rate-limited, to the mail API. Deploy:
  `npm run build`, rsync `out/` to the instance, then
  `sudo rsync -a --delete --chown=www-data:www-data <staging>/ /var/www/cheersworld/`.
- **cheersap.cheerswisdom.com / portal.cheerswisdom.com** (vhost
  `cheers-admin`) — the Cheers Institution Portal (systemd `cheers-admin`,
  Next.js on port 3000, code in `~/cheersWisdomAdmin`).
- **Mail API** — systemd `cheersworld-mail` (`~/cheersworld-mail`, port 8787):
  this repo's `scripts/email-server.mjs` + `server/` handlers, env in
  `~/cheersworld-mail/.env.local`. Deploy handler changes by rsyncing
  `server/` and `scripts/email-server.mjs` there and
  `sudo systemctl restart cheersworld-mail`.

## Project layout

- `src/app/` — routes (contact, careers, demo, products/[slug], platform, …)
- `src/lib/content/` — all page copy as typed data (products, nav, footer, team, …)
- `src/components/sections/` — page sections; `src/components/ui/` — primitives
- `server/` — form/email handlers + shared template
- `scripts/email-server.mjs` — the mail API that serves them
- `public/` — static assets (`cheers-mark.png` is the brand mark used in header,
  footer and favicon; team portraits in `public/team/`)
