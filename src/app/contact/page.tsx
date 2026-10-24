import { LeadForm } from '@/components/LeadForm'; import { SITE } from '@/lib/site'; import { createRouteMetadata } from '@/features/content-seo/metadata';
export const metadata = createRouteMetadata('/contact');
export default function Page(){return <section className="section"><div className="container split"><div><p className="eyebrow">Contact</p><h1>Talk to the Aureum sales team</h1><p>{SITE.phoneDisplay}<br/>{SITE.email}<br/>{SITE.location}</p></div><LeadForm /></div></section>}
