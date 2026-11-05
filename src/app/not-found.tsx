import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

const POPULAR = [
  { href: '/payment-plans', label: 'Payment plans' },
  { href: '/apartments', label: 'Apartments' },
  { href: '/commercial-shops', label: 'Commercial shops' },
  { href: '/corporate-offices', label: 'Corporate offices' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact the team' },
] as const;

export default function NotFound() {
  return (
    <section className="recoveryPage">
      <div className="container recoveryCard">
        <Eyebrow>404 / Page not found</Eyebrow>
        <h1>We couldn’t find that page.</h1>
        <p>The link may be out of date or the page may have moved. Start from the homepage, or go straight to one of the pages most visitors look for.</p>
        <div className="actions"><ButtonLink href="/" variant="dark">Back to homepage</ButtonLink><ButtonLink href="/contact" variant="secondary" className="onLight">Contact the team</ButtonLink></div>
        <nav className="recoveryLinks" aria-label="Popular pages">
          {POPULAR.map((page) => <Link key={page.href} href={page.href}>{page.label} <span aria-hidden="true">→</span></Link>)}
        </nav>
      </div>
    </section>
  );
}
