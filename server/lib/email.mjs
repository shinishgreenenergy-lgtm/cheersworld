// Shared branded email template for notification mails sent by the
// Netlify functions. Table-based and fully inlined so it renders
// consistently in Gmail, Outlook and Apple Mail.

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const MONO = "'SF Mono',Menlo,Consolas,monospace";
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "Helvetica,Arial,sans-serif";

const detailRow = (label, valueHtml, isLast) => `
    <tr>
      <td style="padding:13px 0 12px; border-bottom:${isLast ? "none" : "1px solid #eceee9"}; font-family:${MONO}; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#8a9088; width:130px; vertical-align:top; padding-top:16px;">${label}</td>
      <td style="padding:13px 0 12px; border-bottom:${isLast ? "none" : "1px solid #eceee9"}; font-family:${SERIF}; font-size:16px; color:#1c2320; line-height:1.5;">${valueHtml}</td>
    </tr>`;

/**
 * buildEmail — renders the branded notification shell.
 * rows: array of [label, valueHtml] (valueHtml must already be escaped).
 */
export const buildEmail = ({
  eyebrow,
  title,
  titleAccent,
  subline,
  rows,
  messageLabel = "Message",
  message,
  reply,
  footerNote,
}) => `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#f2f4f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f0; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- eyebrow -->
          <tr>
            <td style="padding:0 8px 14px;">
              <span style="font-family:${MONO}; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#2e9e5b; font-weight:bold;">Cheers&nbsp;Wisdom</span>
              <span style="font-family:${MONO}; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#9aa39b;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;${esc(eyebrow)}</span>
            </td>
          </tr>

          <!-- card -->
          <tr>
            <td style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(28,35,32,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <!-- gradient top bar -->
                <tr>
                  <td height="5" style="background:linear-gradient(90deg,#2e9e5b,#14b8a6); background-color:#2e9e5b; font-size:0; line-height:0;">&nbsp;</td>
                </tr>

                <!-- headline -->
                <tr>
                  <td style="padding:36px 40px 8px;">
                    <div style="font-family:${SERIF}; font-size:26px; line-height:1.25; color:#14162a;">
                      ${esc(title)}
                      ${titleAccent ? `<span style="color:#8a9088;">&nbsp;&middot;&nbsp;</span><span style="color:#2e8b57; font-style:italic;">${esc(titleAccent)}</span>` : ""}
                    </div>
                    <div style="font-family:${SANS}; font-size:13px; color:#8a9088; padding-top:8px;">${esc(subline)}</div>
                  </td>
                </tr>

                <!-- details -->
                <tr>
                  <td style="padding:22px 40px 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${rows.map(([label, valueHtml], i) => detailRow(esc(label), valueHtml, i === rows.length - 1)).join("")}
                    </table>
                  </td>
                </tr>

                <!-- message -->
                <tr>
                  <td style="padding:10px 40px 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#f6f8f4; border-left:3px solid #2e9e5b; border-radius:0 10px 10px 0; padding:22px 26px;">
                          <div style="font-family:${MONO}; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#8a9088; padding-bottom:10px;">${esc(messageLabel)}</div>
                          <div style="font-family:${SERIF}; font-size:16px; line-height:1.65; color:#1c2320; white-space:pre-wrap;">${esc(message)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- reply strip -->
                <tr>
                  <td style="background-color:#14162a; padding:20px 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:${SANS}; font-size:13px; color:#b9c0bb; line-height:1.5;">
                          Hit <span style="color:#ffffff; font-weight:bold;">reply</span> to answer ${esc(reply.name)} directly.
                        </td>
                        <td align="right">
                          <a href="mailto:${esc(reply.email)}" style="display:inline-block; background-color:#2e9e5b; color:#ffffff; font-family:${SANS}; font-size:13px; font-weight:bold; text-decoration:none; padding:9px 20px; border-radius:99px;">Reply&nbsp;&rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:18px 8px 0; font-family:${SANS}; font-size:11px; color:#9aa39b; line-height:1.6;">
              ${esc(footerNote)} &middot; One Human Intelligence Platform advancing human outcomes.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const receivedNow = () =>
  new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) + " IST";

export const makeTransportConfig = () => ({
  host: process.env.ZEPTO_SMTP_HOST ?? "smtp.zeptomail.in",
  port: Number(process.env.ZEPTO_SMTP_PORT ?? 465),
  secure: Number(process.env.ZEPTO_SMTP_PORT ?? 465) === 465,
  auth: {
    user: process.env.ZEPTO_SMTP_USER ?? "emailapikey",
    pass: process.env.ZEPTO_SMTP_PASS,
  },
});
