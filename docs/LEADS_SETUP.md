# Website leads: how they are delivered

Every form on the site posts to `/api/lead`. The server checks the fields, drops spam (hidden honeypot
field + a minimum fill time), then sends the lead as JSON to **one webhook URL** set in Vercel:

| Vercel environment variable | What to put |
|---|---|
| `LEAD_WEBHOOK_URL` | The Google Apps Script web app URL (ends in `/exec`), or a CRM webhook URL later |
| `LEAD_WEBHOOK_SECRET` | The same secret phrase you set in the script |

Changing to a CRM later only means changing `LEAD_WEBHOOK_URL`; no code changes.

If the webhook is missing or fails (after one retry), the visitor sees a message asking them to call or
WhatsApp, with both links — the lead is never silently "accepted" and lost. In local development
(`npm run dev`) without a webhook, leads are printed in the terminal instead.

## Google Sheet setup (≈5 minutes)

1. Create a Google Sheet called **Aureum Website Leads**.
2. **Extensions → Apps Script**. Delete the sample code, paste all of `docs/lead-webhook-google-sheet.gs`.
3. Change `SECRET` to a long random phrase. Optional: add sales emails to `NOTIFY_EMAILS` for an email per lead.
4. **Deploy → New deployment → Web app**. Execute as **Me**, access **Anyone**. Authorise.
5. Copy the **Web app URL**.
6. Vercel → Project → **Settings → Environment Variables**: add `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET`
   (Production and Preview), then **Redeploy**.
7. Send a test lead from `/contact`. It should appear in the sheet within seconds and you land on `/thank-you`.

## What each lead contains

Name, phone in international format (e.g. `+923001234567`), email, interest, request type
(`enquiry` / `site_visit` / `payment_plan`), message, the page the form was sent from, the first landing
page, referrer, UTM source/medium/campaign/content/term, Google/Facebook click IDs, IP and browser.

## Analytics events fired

| Event | When | Meta Pixel |
|---|---|---|
| `form_start` | First focus in a form | – |
| `form_submit` | Lead accepted by the server | `Lead` |
| `form_error` | Server rejected or could not deliver | – |
| `whatsapp_click` | Any WhatsApp button (`placement`: floating, mobile_bar, article_aside) | `Contact` |
| `call_click` | Call buttons (header, mobile bar) | `Contact` |

Events go to `dataLayer` (Google Tag Manager), `gtag` (GA4) and `fbq` (Meta Pixel) whenever those are installed.
GA4/GTM and the Pixel themselves are not installed yet (Sprint 3, S3-7).
