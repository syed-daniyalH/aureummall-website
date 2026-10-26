/** Renders one schema.org JSON-LD block. `<` is escaped so content can never close the script tag. */
export function JsonLd({ id, data }: { id?: string; data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
