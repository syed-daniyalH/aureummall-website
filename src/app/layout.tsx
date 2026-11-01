import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactActions } from '@/components/ContactActions';
import { SITE } from '@/lib/site';
import { SiteSchema } from '@/features/content-seo/components/SiteSchema';
import { AnalyticsScripts } from '@/components/AnalyticsScripts';

// Self-hosted by next/font: DM Sans for text, Cormorant Garamond for large headings.
const sans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], display: 'swap', variable: '--font-cormorant' });

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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
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
