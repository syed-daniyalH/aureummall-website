/**
 * Aureum website leads → Google Sheet (+ optional email alert to sales)
 *
 * Setup (about 5 minutes, see docs/LEADS_SETUP.md for screenshots-free steps):
 * 1. Create a Google Sheet, e.g. "Aureum Website Leads".
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 * 3. Change SECRET below to a long random phrase. Put the SAME phrase in Vercel as LEAD_WEBHOOK_SECRET.
 * 4. Optional: put sales email addresses in NOTIFY_EMAILS to get an email for every lead.
 * 5. Deploy → New deployment → type "Web app"; Execute as: Me; Who has access: Anyone. Authorise when asked.
 * 6. Copy the Web app URL (ends in /exec) into Vercel as LEAD_WEBHOOK_URL, then redeploy the site.
 * 7. Send one test lead from the website and check it appears in the sheet.
 *
 * After editing this script later, use Deploy → Manage deployments → Edit → Version: New version,
 * so the same /exec URL keeps working.
 */

const SECRET = 'CHANGE-ME-to-a-long-random-phrase';
const SHEET_NAME = 'Website Leads';
const NOTIFY_EMAILS = ''; // e.g. 'sales@aureummall.info, marketing@aureummall.info'

const COLUMNS = [
  ['submittedAt', 'Submitted (UTC)'],
  ['fullName', 'Name'],
  ['phone', 'Phone / WhatsApp'],
  ['email', 'Email'],
  ['propertyInterest', 'Interested in'],
  ['intent', 'Request type'],
  ['message', 'Message'],
  ['utmSource', 'UTM source'],
  ['utmMedium', 'UTM medium'],
  ['utmCampaign', 'UTM campaign'],
  ['utmContent', 'UTM content'],
  ['utmTerm', 'UTM term'],
  ['gclid', 'Google click ID'],
  ['fbclid', 'Facebook click ID'],
  ['landingPage', 'Landing page'],
  ['pageUrl', 'Form page'],
  ['referrer', 'Referrer'],
  ['ip', 'IP'],
  ['userAgent', 'Browser'],
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }
  if (SECRET && data.secret !== SECRET) return json_({ ok: false, error: 'bad_secret' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_();
    // Leading apostrophe keeps phone numbers like +92300… as text instead of turning them into formulas/numbers.
    const row = COLUMNS.map(([key]) => {
      const value = data[key] == null ? '' : String(data[key]);
      return key === 'phone' || /^[=+\-@]/.test(value) ? "'" + value : value;
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAILS) {
    try {
      const subject = 'New website lead: ' + (data.fullName || '') + ' (' + (data.propertyInterest || '') + ')';
      const body = COLUMNS.filter(([key]) => data[key]).map(([key, label]) => label + ': ' + data[key]).join('\n');
      MailApp.sendEmail(NOTIFY_EMAILS, subject, body);
    } catch (err) {
      // The lead is already saved; a failed email must not lose it.
    }
  }
  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: 'aureum-leads' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
