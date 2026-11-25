# Aureum Website Chatbot — Goal-Based Implementation Plan

## 1. Product goal

Build a premium Aureum Sales Team chatbot that:

1. Uses the approved Aureum visual language and the compact three-action structure reviewed from the reference widget.
2. Captures the visitor's minimum lead details before chat:
   - First name
   - Last name
   - Phone / WhatsApp
   - Interested in
   - Email as an optional follow-up field
3. Creates a CRM lead only when the required registration data is valid.
4. Leaves the lead unassigned initially, then routes it to a CRM department.
5. Records the session, messages, inactivity, and final status against one session ID.
6. Closes an inactive session after 120 seconds, with a reminder at 90 seconds.
7. Keeps the existing CRM code untouched; the website communicates through a server-side webhook adapter.

## 2. Current implementation in this branch

### Goal A — Premium widget shell

Status: implemented.

- Site-wide Next.js client component: `src/components/AureumChatbot.tsx`
- Premium visual styles: `src/components/AureumChatbot.module.css`
- Mounted in `src/app/layout.tsx`
- Three connected action tabs:
  - Enquire
  - Call
  - Chat
- Chat is the active tab when the chat panel is open:
  - bold label
  - champagne active background
  - active underline
  - stronger contrast
- Aureum Sales Team header:
  - Sat–Thu, 11 AM–8 PM PKT
  - close control
  - accessible labels and keyboard focus states

### Goal B — Lead-first registration

Status: implemented.

- Chat and Enquire open the registration screen when there is no active session.
- Name, phone and interest are required.
- Email is optional so a useful lead is not lost when a visitor does not want to share email.
- No permanent CRM lead is created when the required fields fail validation.
- The interest dropdown includes:
  - Studio
  - 1 Bed Apartment
  - 2 Bed Apartment
  - Commercial
  - Office
  - Food Court Space
  - Other

### Goal C — CRM event contract

Status: initial adapter implemented.

- Server-side adapter: `src/lib/chatbot-delivery.ts`
- Registration route: `POST /api/chatbot/session`
- Message route: `POST /api/chatbot/message`
- The browser never receives CRM secrets.
- Every event has:
  - `eventId`
  - `sessionId`
  - source and channel
  - department
  - lead or message data
  - page URL
  - referrer
  - timestamp
  - user-agent and IP metadata
- Idempotency headers are included so the CRM adapter can safely deduplicate retries.

### Goal D — Inactivity handling

Status: implemented in the widget.

- At 90 seconds: show a reminder.
- At 120 seconds: post `session_expired`, reset the local chat state and close the active session.
- A manual close does not expire the session; the visitor can reopen it during the active session.
- CRM can mark the session as expired without deleting the original registered lead.

## 3. Department routing

| Interest | CRM department | Initial status |
|---|---|---|
| Studio | Residential Sales | New / Unassigned |
| 1 Bed Apartment | Residential Sales | New / Unassigned |
| 2 Bed Apartment | Residential Sales | New / Unassigned |
| Commercial | Commercial Sales | New / Unassigned |
| Office | Commercial Sales | New / Unassigned |
| Food Court Space | Commercial Sales | New / Unassigned |
| Other | Concierge | New / Unassigned |

The website sends the department recommendation. The CRM remains the source of truth for assignment, agent ownership, pipeline status and follow-up tasks.

## 4. CRM payload contract

### Registration event

```json
{
  "event": "lead_registered",
  "eventId": "uuid",
  "sessionId": "uuid",
  "source": "website_chatbot",
  "channel": "website",
  "status": "new",
  "department": "Residential Sales",
  "lead": {
    "firstName": "Example",
    "lastName": "Visitor",
    "fullName": "Example Visitor",
    "phone": "+923001234567",
    "email": "visitor@example.com",
    "interest": "studio",
    "interestLabel": "Studio"
  },
  "pageUrl": "https://aureummall.info/apartments/studio",
  "referrer": "https://www.google.com/",
  "submittedAt": "2026-11-25T00:00:00.000Z",
  "metadata": {
    "assignmentStatus": "unassigned",
    "leadSource": "Aureum website chatbot",
    "registrationRequired": true
  }
}
```

### Message event

```json
{
  "event": "message_received",
  "eventId": "uuid",
  "sessionId": "uuid",
  "source": "website_chatbot",
  "channel": "website",
  "status": "active",
  "department": "Sales Operations",
  "message": "I want the payment plan.",
  "pageUrl": "https://aureummall.info/payment-plans",
  "submittedAt": "2026-11-25T00:01:00.000Z"
}
```

### Expiry event

```json
{
  "event": "session_expired",
  "eventId": "uuid",
  "sessionId": "uuid",
  "source": "website_chatbot",
  "channel": "website",
  "status": "expired",
  "department": "Sales Operations",
  "submittedAt": "2026-11-25T00:02:00.000Z",
  "metadata": {
    "reason": "no_response",
    "inactivityWindowSeconds": 120
  }
}
```

## 5. Required server environment variables

Add these only to the website deployment environment:

```env
CHATBOT_CRM_WEBHOOK_URL=https://crm.aureummall.info/api/...
CHATBOT_CRM_WEBHOOK_SECRET=replace-with-server-secret
CHATBOT_REPLY_URL=https://your-approved-reply-service/api/chat
```

Fallback behavior:

- `CHATBOT_CRM_WEBHOOK_URL` falls back to the existing `LEAD_WEBHOOK_URL` during the transition.
- `CHATBOT_CRM_WEBHOOK_SECRET` falls back to `LEAD_WEBHOOK_SECRET`.
- If no CRM webhook is configured:
  - development logs the event and continues;
  - production returns a safe error and does not claim that the lead was saved.
- `CHATBOT_REPLY_URL` is optional in this first slice. Without it, the widget returns a safe acknowledgement. It must be connected to the approved knowledge-base/AI service before public launch if automated answers are required.

## 6. Screen-by-screen delivery plan

### Screen 1 — Closed widget

- Small bottom-right Chat with Aureum control.
- No blocking modal.
- Responsive width on mobile.
- Accessible name and keyboard focus.

### Screen 2 — Welcome panel

- Aureum Sales Team identity.
- Hours.
- One short greeting.
- Three connected action tabs.
- Chat tab bold and visibly active when the chat panel is open.

### Screen 3 — Lead registration

- First name.
- Last name.
- Phone / WhatsApp.
- Email optional.
- Interest dropdown.
- Consent copy.
- Inline validation and retry state.
- Do not create a CRM lead until required fields pass.

### Screen 4 — Active conversation

- Conversation transcript.
- User message and bot/team message styling.
- Message composer.
- 90-second reminder.
- Manual close keeps the registered session available to reopen.

### Screen 5 — Expired session

- Clear local session state after 120 seconds.
- Send expiry event.
- Show the welcome state on the next open.
- Preserve the original registered CRM lead and transcript reference.

### CRM Screen 6 — New chatbot lead

The CRM should display:

- Lead source: Website Chatbot
- Lead status: New
- Assignment: Unassigned
- Department recommendation
- Full name
- Phone / WhatsApp
- Email
- Interested property
- Session ID
- First page / last page
- Registration timestamp
- Transcript / message timeline
- Expiry reason when applicable

## 7. Restrictions and security rules

1. CRM credentials stay server-side.
2. Do not trust a client-supplied department; recompute it server-side from the interest value.
3. Do not create a lead when first name, last name, phone or interest is invalid.
4. Do not send payment credentials, CNIC, bank details or sensitive documents through the widget.
5. Do not promise discounts, approvals, availability or appointment confirmation without staff verification.
6. Keep user-agent and IP data restricted to the CRM/backend.
7. Add rate limiting before production launch.
8. Add webhook signature verification on the CRM endpoint.
9. Deduplicate with `eventId` and `sessionId`.
10. Add an outbox/retry worker if the CRM must receive events even during temporary downtime.
11. Keep the existing CRM code unchanged until the payload is accepted and tested in a staging endpoint.
12. Add privacy/consent wording approved by the business before launch.

## 8. Completion gates

### Gate 1 — Frontend

- Widget opens and closes on desktop and mobile.
- Chat is bold when active.
- Enquire and Chat cannot bypass registration.
- Call opens the configured phone destination.
- Interest dropdown values are exact.

### Gate 2 — API

- Invalid registration returns field errors.
- Valid registration returns a session ID.
- CRM webhook receives exactly one registration event.
- Duplicate event delivery is safely ignored.
- Message event includes the same session ID.
- Expiry event is sent after two minutes.

### Gate 3 — CRM

- Lead appears in All Leads.
- Lead starts New and Unassigned.
- Department value is visible.
- Existing leads and existing CRM workflows are unaffected.
- Agent can assign, reply and close the lead.

### Gate 4 — Production

- Configure environment variables.
- Test from the production domain.
- Test English, Urdu and Roman Urdu messages.
- Test phone validation with Pakistani and international numbers.
- Test closing/reopening and the two-minute inactivity path.
- Review server logs for secrets and personally identifiable data.
- Deploy only after staging payload verification.

## 9. Next implementation phase

The next code phase should add:

1. A real CRM endpoint contract or adapter URL.
2. HMAC signature verification.
3. Durable outbox/retry handling.
4. CRM transcript persistence.
5. Approved Aureum knowledge-base answers.
6. Human handoff and business-hours routing.
7. Rate limiting and abuse protection.
8. Automated route tests and browser smoke tests.
9. Analytics events for open, registration success, error, message sent and expiry.
10. A staging switch so the first live tests cannot create production records accidentally.
