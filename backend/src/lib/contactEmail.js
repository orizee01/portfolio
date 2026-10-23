// The notification email the site owner receives for each contact form message.
// Table layout + inline styles, because that is what renders reliably in Gmail, Outlook and Apple Mail.

const SUBJECT_SNIPPET = 45;
const PREHEADER_LENGTH = 110;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Collapses whitespace and strips control characters (incl. CR/LF), so a value is safe in a header.
const oneLine = (value) => String(value).replace(/[\u0000-\u001f\u007f\s]+/g, " ").trim();
const truncate = (value, max) => (value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value);

// The public site address, for the "Open inbox" button: SITE_URL, else the first https CORS origin.
function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const origin = (process.env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).find((o) => o.startsWith("https://"));
  return origin || null;
}

function formatDate(date) {
  // e.g. "Saturday, 24 October 2026 at 10:30 GMT+1" (dateStyle can't be combined with timeZoneName)
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: process.env.TIMEZONE || "Africa/Lagos",
    timeZoneName: "short",
  }).format(date);
}

export function contactEmail({ name, email, message, receivedAt = new Date() }) {
  const cleanName = oneLine(name);
  const snippet = truncate(oneLine(message), SUBJECT_SNIPPET);
  const subject = `New portfolio message from ${cleanName}: “${snippet}”`;
  const preheader = truncate(oneLine(message), PREHEADER_LENGTH);
  const when = formatDate(receivedAt);
  const site = siteUrl();
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: your message on my portfolio`)}`;
  const initial = escapeHtml((cleanName[0] || "?").toUpperCase());

  const text = [
    `New message from your portfolio contact form`,
    ``,
    `From:     ${cleanName} <${email}>`,
    `Received: ${when}`,
    ``,
    message,
    ``,
    `Reply to this email to answer ${cleanName} directly.`,
    site ? `All messages: ${site}/messages` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const button = (href, label, primary) => `
              <td style="padding:0 8px 8px 0;">
                <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 20px;border-radius:10px;font-weight:600;font-size:14px;text-decoration:none;${
                  primary ? "background-color:#10b981;color:#ffffff;" : "background-color:#f1f5f9;color:#0f172a;border:1px solid #e2e8f0;"
                }">${label}</a>
              </td>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
          <tr>
            <td style="height:6px;background-color:#10b981;background-image:linear-gradient(90deg,#34d399,#06b6d4,#7c3aed);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#0891b2;font-weight:600;">Portfolio · Contact form</p>
              <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#0f172a;">You have a new message</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <td width="56" style="padding:16px 0 16px 16px;vertical-align:top;">
                    <div style="width:40px;height:40px;border-radius:20px;background-color:#7c3aed;color:#ffffff;font-size:18px;font-weight:700;line-height:40px;text-align:center;">${initial}</div>
                  </td>
                  <td style="padding:16px;vertical-align:top;">
                    <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;">${escapeHtml(cleanName)}</p>
                    <p style="margin:2px 0 0;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#059669;text-decoration:none;">${escapeHtml(email)}</a></p>
                    <p style="margin:6px 0 0;font-size:12px;color:#64748b;">${escapeHtml(when)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 0;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#64748b;font-weight:600;">Message</p>
              <div style="border-left:4px solid #10b981;padding:4px 0 4px 16px;font-size:15px;line-height:1.6;color:#1e293b;white-space:pre-wrap;word-break:break-word;">${escapeHtml(message)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>${button(replyHref, `Reply to ${escapeHtml(cleanName)}`, true)}${site ? button(`${site}/messages`, "Open all messages", false) : ""}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 28px;border-top:1px solid #f1f5f9;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">Sent by the contact form on your portfolio. Replying to this email goes straight to ${escapeHtml(cleanName)}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
