'use client';

import type { ReactNode } from 'react';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';

type WhatsAppLinkProps = {
  children: ReactNode;
  interest?: string;
  placement: string;
  className?: string;
};

/** A WhatsApp link that records a whatsapp_click event (GA4 / Meta) with where it was clicked. */
export function WhatsAppLink({ children, interest, placement, className }: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={whatsappHref(interest)}
      target="_blank"
      rel="noopener"
      onClick={() => track(ANALYTICS_EVENTS.whatsappClick, { page: window.location.pathname, placement })}
    >
      {children}
    </a>
  );
}
