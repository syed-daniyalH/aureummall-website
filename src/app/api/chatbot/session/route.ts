import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { CHATBOT_INTEREST_LABELS, departmentForInterest, normalizeChatbotPhone } from '@/lib/chatbot';
import { deliverChatbotEvent } from '@/lib/chatbot-delivery';

const RegistrationSchema = z.object({
  action: z.literal('register'),
  firstName: z.string().trim().min(2, 'Please enter your first name.').max(60),
  lastName: z.string().trim().min(2, 'Please enter your last name.').max(60),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(30)
    .transform(normalizeChatbotPhone)
    .refine((value) => /^\+?\d{7,15}$/.test(value), 'Please enter a valid phone number.'),
  email: z
    .string()
    .trim()
    .max(160)
    .optional()
    .refine((value) => !value || z.email().safeParse(value).success, 'Please enter a valid email.')
    .transform((value) => value || ''),
  interest: z.enum(['studio', 'one_bed_apartment', 'two_bed_apartment', 'commercial', 'office', 'food_court_space', 'other']),
  pageUrl: z.string().url().max(1000).optional().default(''),
  referrer: z.string().max(1000).optional().default(''),
});

const ExpireSchema = z.object({
  action: z.literal('expire'),
  sessionId: z.uuid(),
  pageUrl: z.string().url().max(1000).optional().default(''),
});

async function readJson(request: Request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

function requestMeta(request: Request) {
  return {
    ip: (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || request.headers.get('x-real-ip') || '',
    userAgent: (request.headers.get('user-agent') ?? '').slice(0, 300),
  };
}

export async function POST(request: Request) {
  const raw = await readJson(request);
  const action = typeof raw.action === 'string' ? raw.action : '';

  if (action === 'register') {
    const parsed = RegistrationSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? 'form');
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return Response.json({ ok: false, message: 'Please check your details.', fieldErrors }, { status: 400 });
    }

    const input = parsed.data;
    const sessionId = randomUUID();
    const eventId = randomUUID();
    const department = departmentForInterest(input.interest);
    const meta = requestMeta(request);
    const submittedAt = new Date().toISOString();

    const result = await deliverChatbotEvent({
      event: 'lead_registered',
      eventId,
      sessionId,
      source: 'website_chatbot',
      channel: 'website',
      status: 'new',
      department,
      lead: {
        firstName: input.firstName,
        lastName: input.lastName,
        fullName: `${input.firstName} ${input.lastName}`,
        phone: input.phone,
        email: input.email,
        interest: input.interest,
        interestLabel: CHATBOT_INTEREST_LABELS[input.interest],
      },
      pageUrl: input.pageUrl,
      referrer: input.referrer,
      submittedAt,
      ...meta,
      metadata: {
        assignmentStatus: 'unassigned',
        leadSource: 'Aureum website chatbot',
        registrationRequired: true,
      },
    });

    if (!result.ok) {
      return Response.json(
        {
          ok: false,
          message: 'We could not connect you to the sales team right now. Please try again or call us directly.',
        },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      sessionId,
      department,
      message: 'Your details are registered. You can now start the conversation.',
    });
  }

  if (action === 'expire') {
    const parsed = ExpireSchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json({ ok: false, message: 'Invalid session.' }, { status: 400 });
    }

    const meta = requestMeta(request);
    const result = await deliverChatbotEvent({
      event: 'session_expired',
      eventId: randomUUID(),
      sessionId: parsed.data.sessionId,
      source: 'website_chatbot',
      channel: 'website',
      status: 'expired',
      department: 'Sales Operations',
      pageUrl: parsed.data.pageUrl,
      referrer: '',
      submittedAt: new Date().toISOString(),
      ...meta,
      metadata: {
        reason: 'no_response',
        inactivityWindowSeconds: 120,
      },
    });

    if (!result.ok) {
      return Response.json({ ok: false, message: 'The session could not be closed cleanly.' }, { status: 503 });
    }

    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, message: 'Unsupported session action.' }, { status: 400 });
}
