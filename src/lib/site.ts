export const SITE = {
  name: 'Aureum Mall & Residences',
  tagline: 'The Perfect Blend of Serenity and Luxury',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aureummall.info',
  email: 'hello@aureummall.info',
  phoneDisplay: '(0322) 555 1121',
  phoneE164: '+923225551121',
  /** WhatsApp number in international format without "+" (used for wa.me links). */
  whatsappNumber: '923225551121',
  location: 'Bahria Town, Ring Road Interchange, Lahore',
  address: {
    streetAddress: 'Ring Road Interchange, Bahria Town',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  social: {
    facebook: 'https://www.facebook.com/aureummall',
    instagram: 'https://www.instagram.com/aureum.mall',
  },
} as const;

export const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/payment-plans', label: 'Payment Plans' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/immersive-media#virtual-tour', label: '360° Tour' },
  { href: '/news', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
] as const;
