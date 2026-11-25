export type ChatbotEventPayload = {
  event: 'lead_registered' | 'message_received' | 'session_expired';
  eventId: string;
  sessionId: string;
  source: 'website_chatbot';
  channel: 'website';
  status: 'new' | 'active' | 'expired';
  department: string;
  lead?: {
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
    email: string;
    interest: string;
    interestLabel: string;
  };
  message?: string;
  pageUrl: string;
  referrer: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
};

export type ChatbotDeliveryResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'webhook_failed' };

export async function deliverChatbotEvent(payload: ChatbotEventPayload): Promise<ChatbotDeliveryResult> {
  const url = process.env.CHATBOT_CRM_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[chatbot] CRM webhook is not configured; event not delivered in development:', payload.event, payload.sessionId);
      return { ok: true };
    }

    console.error('[chatbot] CRM webhook is not configured in production.');
    return { ok: false, reason: 'not_configured' };
  }

  const secret = process.env.CHATBOT_CRM_WEBHOOK_SECRET || process.env.LEAD_WEBHOOK_SECRET || '';
  const body = JSON.stringify({
    ...payload,
    secret,
  });

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-aureum-chatbot-event': payload.event,
          'x-aureum-idempotency-key': payload.eventId,
        },
        body,
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) {
        const text = await response.text();
        if (!/"ok"\s*:\s*false/i.test(text)) return { ok: true };
        console.error('[chatbot] CRM webhook rejected the event:', text.slice(0, 200));
        return { ok: false, reason: 'webhook_failed' };
      }

      console.error(`[chatbot] CRM webhook answered ${response.status} (attempt ${attempt}).`);
    } catch (error) {
      console.error(`[chatbot] CRM webhook request failed (attempt ${attempt}):`, error);
    }
  }

  return { ok: false, reason: 'webhook_failed' };
}
