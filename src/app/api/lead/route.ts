import { LeadSchema } from '@/lib/lead-schema';
import { deliverLead, toLeadRecord } from '@/lib/lead-delivery';

/** Submissions faster than this after the form became interactive are treated as bots. */
const MIN_FILL_MS = 2500;

function wantsHtml(request: Request) {
  const type = request.headers.get('content-type') ?? '';
  return type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data');
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (wantsHtml(request)) {
    const form = await request.formData();
    return Object.fromEntries([...form.entries()].map(([key, value]) => [key, typeof value === 'string' ? value : '']));
  }
  const json = await request.json();
  return json && typeof json === 'object' ? (json as Record<string, unknown>) : {};
}

function respond(request: Request, status: number, body: { ok: boolean; message: string; fieldErrors?: Record<string, string> }) {
  // Without JavaScript the browser posts the form directly, so answer with a redirect it can follow.
  if (wantsHtml(request)) {
    const target = body.ok ? '/thank-you' : `/contact?lead=error#enquiry`;
    return Response.redirect(new URL(target, request.url), 303);
  }
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request);
  } catch {
    return respond(request, 400, { ok: false, message: 'Unable to read the form. Please try again.' });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return respond(request, 400, { ok: false, message: 'Please check the highlighted fields.', fieldErrors });
  }

  const lead = parsed.data;
  // Bots: answer as if it worked so they do not retry, but deliver nothing.
  const tooFast = typeof lead.startedAt === 'number' && lead.startedAt > 0 && Date.now() - lead.startedAt < MIN_FILL_MS;
  if (lead.company || tooFast) {
    return respond(request, 200, { ok: true, message: 'Thank you.' });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
  const record = toLeadRecord(lead, { ip, userAgent: request.headers.get('user-agent') ?? '' });
  const result = await deliverLead(record);
  if (!result.ok) {
    return respond(request, 503, {
      ok: false,
      message: 'We could not send your request just now. Please call or WhatsApp our sales team and we will help you straight away.',
    });
  }
  return respond(request, 200, { ok: true, message: 'Thank you. Your request has been received.' });
}
