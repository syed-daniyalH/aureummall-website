import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactActions } from '@/components/ContactActions';
import { SITE } from '@/lib/site';
import { SiteSchema } from '@/features/content-seo/components/SiteSchema';
import { AnalyticsScripts } from '@/components/AnalyticsScripts';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Aureum Mall & Residences | Bahria Town Lahore', template: '%s | Aureum Mall' },
  description: 'Explore Aureum Mall & Residences in Bahria Town Lahore: apartments, commercial shops, corporate offices, payment plans, location and project updates.',
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    type: 'website',
    images: [{ url: '/assets/aureum/approved/og/og-default.jpg', width: 1200, height: 630, alt: 'Aureum Mall & Residences' }],
  },
  twitter: { card: 'summary_large_image', images: ['/assets/aureum/approved/og/og-default.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteSchema />
        <AnalyticsScripts />
        <a className="skipLink" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <ContactActions />
      </body>
    </html>
  );
}
