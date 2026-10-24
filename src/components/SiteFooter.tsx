import { SITE } from '@/lib/site';
import Link from 'next/link';
import { BrandMark } from '@/components/ui/BrandMark';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
      <div className="footerBrand"><BrandMark tone="light" /><div><strong>{SITE.name}</strong><p>{SITE.tagline}</p></div></div>
        <div className="footerLinks"><div><strong>Explore</strong><Link href="/about">About Aureum</Link><Link href="/apartments">Residences</Link><Link href="/commercial-shops">Commercial</Link><Link href="/corporate-offices">Corporate Offices</Link><Link href="/gallery">Gallery</Link><Link href="/payment-plans">Payment Plans</Link></div><div><strong>Connect</strong><span>{SITE.location}</span><span>{SITE.phoneDisplay}</span><span>{SITE.email}</span></div></div>
      </div>
      <div className="container footerBottom"><span>© {new Date().getFullYear()} {SITE.name}</span><span>{SITE.tagline}</span></div>
    </footer>
  );
}
