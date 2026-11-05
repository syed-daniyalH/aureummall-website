import { SITE } from '@/lib/site';
import Link from 'next/link';
import { BrandMark } from '@/components/ui/BrandMark';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { DEVELOPER } from '@/lib/project-facts';

const EXPLORE_LINKS = [
  { href: '/about', label: 'About Aureum' },
  { href: '/team', label: 'Our team' },
  { href: '/apartments', label: 'Residences' },
  { href: '/commercial-shops', label: 'Commercial shops' },
  { href: '/corporate-offices', label: 'Corporate offices' },
  { href: '/food-court', label: 'Food court' },
] as const;

const PLAN_LINKS = [
  { href: '/payment-plans', label: 'Payment plans' },
  { href: '/floor-plans', label: 'Floor plans' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/immersive-media#virtual-tour', label: '360° tour' },
  { href: '/news', label: 'News & guides' },
] as const;

export function SiteFooter() {
  return (
    <footer className="footer siteFooter">
      <div className="container footerTop">
        <div className="footerIntro">
          <BrandMark tone="light" />
          <p className="footerStatement">{SITE.tagline}.</p>
          <p className="footerDeveloper">Developed by {DEVELOPER.name} ({DEVELOPER.shortName}).</p>
          <ButtonLink href="/contact?intent=site_visit#enquiry">Book a visit</ButtonLink>
        </div>
        <nav className="footerColumn" aria-label="Explore Aureum">
          <h2>Explore</h2>
          {EXPLORE_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <nav className="footerColumn" aria-label="Plans and media">
          <h2>Plans &amp; media</h2>
          {PLAN_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="footerColumn">
          <h2>Visit &amp; contact</h2>
          <address>{SITE.location}</address>
          <a href={SITE.directionsUrl} target="_blank" rel="noopener">Get directions <span aria-hidden="true">↗</span></a>
          <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <div className="footerSocial">
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className="container footerBottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Images are artist’s impressions. Plans, prices and specifications are subject to change.</span>
      </div>
    </footer>
  );
}
