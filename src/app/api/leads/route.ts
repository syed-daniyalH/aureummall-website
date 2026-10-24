// The old lead route is intentionally disabled. Website-only scope does not
// include a CRM or external lead destination. The form posts to /api/contact.
export async function POST() {
  return Response.json(
    { ok: false, message: 'Website contact delivery is not enabled yet.' },
    { status: 410 },
  );
}
