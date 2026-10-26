'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { captureAttribution } from '@/lib/attribution';
import { callHref, interestForPath, whatsappHref } from '@/lib/whatsapp';

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 3C6.98 3 3 6.73 3 11.33c0 2.4 1.1 4.56 2.86 6.08L5 21l3.9-1.9c.97.27 2.01.42 3.1.42 5.02 0 9-3.73 9-8.33S17.02 3 12 3Zm-3.5 9.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm3.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2Zm12 8H5v9h14v-9ZM7 12h4v4H7v-4Z"
      />
    </svg>
  );
}

/**
 * Site-wide quick contact: a floating WhatsApp button on desktop and a Call / WhatsApp / Book visit bar on mobile.
 * The WhatsApp message mentions what the visitor was looking at (apartments, shops, offices…).
 */
export function ContactActions() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  const whatsapp = whatsappHref(interestForPath(pathname));
  const page = pathname || '/';

  return (
    <>
      <a
        className="whatsappFloat"
        href={whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Chat with the Aureum sales team on WhatsApp (opens WhatsApp)"
        onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { page, placement: 'floating' })}
      >
        <ChatIcon />
        <span>WhatsApp us</span>
      </a>

      <nav className="mobileCtaBar" aria-label="Quick contact">
        <a href={callHref} onClick={() => track(ANALYTICS_EVENTS.callClick, { page, placement: 'mobile_bar' })}>
          <PhoneIcon />
          <span>Call</span>
        </a>
        <a
          className="mobileCtaWhatsapp"
          href={whatsapp}
          target="_blank"
          rel="noopener"
          onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { page, placement: 'mobile_bar' })}
        >
          <ChatIcon />
          <span>WhatsApp</span>
        </a>
        <Link href="/contact?intent=site_visit#enquiry">
          <CalendarIcon />
          <span>Book visit</span>
        </Link>
      </nav>
    </>
  );
}
