'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PRIMARY_NAV } from '@/lib/site';
import { BrandMark } from '@/components/ui/BrandMark';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SITE } from '@/lib/site';
import { track } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="utilityBar">
        <div className="container utilityBarInner">
          <span>{SITE.location}.</span>
          <div className="utilityLinks"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href="https://www.facebook.com/aureummall" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/aureum.mall" target="_blank" rel="noreferrer">Instagram</a></div>
        </div>
      </div>
      <div className="container navRow">
        <Link className="brand" href="/" onClick={() => setIsOpen(false)} aria-label={SITE.name}>
          <BrandMark />
        </Link>
        <button className="menuToggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen((open) => !open)}>
          <span className="srOnly">{isOpen ? 'Close' : 'Open'} navigation</span><span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
        </button>
        <nav id="primary-navigation" aria-label="Primary navigation" className={`navLinks ${isOpen ? 'isOpen' : ''}`}>
          {PRIMARY_NAV.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
          <span className="headerCall"><small>Call the experts</small><a href={`tel:${SITE.phoneE164}`} onClick={() => track(ANALYTICS_EVENTS.callClick, { placement: 'header' })}>{SITE.phoneDisplay}</a></span>
          <ButtonLink variant="nav" href="/apartments" onClick={() => setIsOpen(false)}>Explore Residences</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
