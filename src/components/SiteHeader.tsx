'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { PRIMARY_NAV } from '@/lib/site';
import { BrandMark } from '@/components/ui/BrandMark';
import { PaymentPlansMenu } from '@/components/PaymentPlansMenu';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SITE } from '@/lib/site';
import { track } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';

// Give the hero enough room to breathe before the sticky header changes state.
const SOLID_AFTER_PX = 72;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > SOLID_AFTER_PX, () => false);

  // Publishes the header's real height so a hero can slide up underneath it by exactly that much.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--header-h', `${Math.round(entry.borderBoxSize[0].blockSize)}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={`siteHeader${scrolled || isOpen ? ' isSolid' : ''}`}>
      <div className="container navRow">
        <Link className="brand" href="/" onClick={() => setIsOpen(false)} aria-label={SITE.name}>
          <span className="brandOnLight"><BrandMark /></span>
          <span className="brandOnDark"><BrandMark tone="light" /></span>
        </Link>
        <button className="menuToggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen((open) => !open)}>
          <span className="srOnly">{isOpen ? 'Close' : 'Open'} navigation</span><span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
        </button>
        <nav id="primary-navigation" aria-label="Primary navigation" className={`navLinks ${isOpen ? 'isOpen' : ''}`}>
          {PRIMARY_NAV.map((item) => item.href === '/payment-plans'
            ? <PaymentPlansMenu key={item.href} onNavigate={() => setIsOpen(false)} />
            : <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
          <span className="headerCall"><small>Call the experts</small><a href={`tel:${SITE.phoneE164}`} onClick={() => track(ANALYTICS_EVENTS.callClick, { placement: 'header' })}>{SITE.phoneDisplay}</a></span>
          <ButtonLink variant="nav" href="/contact?intent=site_visit#enquiry" onClick={() => setIsOpen(false)}>Book a visit</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
