export const SITE = {
  name: 'Aureum Mall & Residences',
  tagline: 'The Perfect Blend of Serenity and Luxury',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aureummall.info',
  email: 'hello@aureummall.info',
  phoneDisplay: '(0322) 555 1121',
  phoneE164: '+923225551121',
  location: 'Bahria Town, Ring Road Interchange, Lahore',
} as const;

export const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/payment-plans', label: 'Payment Plans' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
] as const;
