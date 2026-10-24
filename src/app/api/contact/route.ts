import { LeadSchema } from '@/lib/lead-schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ ok: false, message: 'Please check the form fields.' }, { status: 400 });
    }

    // Keep the endpoint deliberately inert until a website-owned delivery
    // method is approved. No CRM, email provider, or external webhook is used.
    return Response.json(
      { ok: false, message: 'Website contact delivery is not enabled yet.' },
      { status: 503 },
    );
  } catch {
    return Response.json({ ok: false, message: 'Unable to submit request.' }, { status: 400 });
  }
}
