import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { deliverChatbotEvent } from '@/lib/chatbot-delivery';
import { departmentForInterest, type ChatbotInterest } from '@/lib/chatbot';

const MessageSchema = z.object({
  sessionId: z.uuid(),
  message: z.string().trim().min(1, 'Please enter a message.').max(1000),
  pageUrl: z.string().url().max(1000).optional().default(''),
  interest: z.enum(['studio', 'one_bed_apartment', 'two_bed_apartment', 'commercial', 'office', 'food_court_space', 'other']),
});

async function readJson(request: Request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const raw = await readJson(request);
  const parsed = MessageSchema.safeParse(raw);

  if (!parsed.success) {
    return Response.json({ ok: false, message: 'Please enter a valid message.' }, { status: 400 });
  }

  const result = await deliverChatbotEvent({
    event: 'message_received',
    eventId: randomUUID(),
    sessionId: parsed.data.sessionId,
    source: 'website_chatbot',
    channel: 'website',
    status: 'active',
    department: departmentForInterest(parsed.data.interest as ChatbotInterest),
    message: parsed.data.message,
    pageUrl: parsed.data.pageUrl,
    referrer: '',
    submittedAt: new Date().toISOString(),
    ip: (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || request.headers.get('x-real-ip') || '',
    userAgent: (request.headers.get('user-agent') ?? '').slice(0, 300),
  });

  if (!result.ok) {
    return Response.json({ ok: false, message: 'Your message could not be sent. Please try again.' }, { status: 503 });
  }

  const replyUrl = process.env.CHATBOT_REPLY_URL;
  if (replyUrl) {
    try {
      const response = await fetch(replyUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sessionId: parsed.data.sessionId,
          message: parsed.data.message,
          source: 'website_chatbot',
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      });
      const body = (await response.json().catch(() => ({}))) as { reply?: unknown };
      if (response.ok && typeof body.reply === 'string' && body.reply.trim()) {
        return Response.json({ ok: true, reply: body.reply.trim() });
      }
    } catch (error) {
      console.error('[chatbot] reply provider failed:', error);
    }
  }

  return Response.json({
    ok: true,
    reply: 'Thank you. I have shared your message with the Aureum Sales Team. They will guide you with the latest availability and details.',
  });
}
