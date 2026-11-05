'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { formatPKRShort, PAYMENT_PLAN_PAGES } from '@/features/payment-plans/plan-pages';

/**
 * The "Payment Plans" header item. On desktop it slides down a panel on hover or click: the plans on the
 * left, the hovered plan's key figures in the middle and the calculator on the right. Inside the mobile
 * menu it opens as a simple list of links.
 */
export function PaymentPlansMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(PAYMENT_PLAN_PAGES[0].table.id);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef('');
  const active = PAYMENT_PLAN_PAGES.find((page) => page.table.id === activeId) ?? PAYMENT_PLAN_PAGES[0];
  const unitTypes = [...new Set(active.table.rows.map((row) => row.type))];

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  function navigate() {
    setOpen(false);
    onNavigate();
  }

  return (
    <div
      className={`navMenu${open ? ' isOpen' : ''}`}
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return;
        setOpen(false);
        triggerRef.current?.focus();
      }}
    >
      <button ref={triggerRef} className="navMenuTrigger" type="button" aria-expanded={open} aria-controls="payment-plans-menu"
        onPointerDown={(event) => { lastPointer.current = event.pointerType; }}
        // A mouse has already opened the panel on hover, so its click keeps it open; touch and keyboard toggle it.
        onClick={(event) => {
          const byMouse = event.detail > 0 && lastPointer.current === 'mouse';
          lastPointer.current = '';
          setOpen((value) => (byMouse ? true : !value));
        }}
      >
        Payment Plans<span className="navMenuChevron" aria-hidden="true" />
      </button>
      <div className="navMega" id="payment-plans-menu">
        <div className="navMegaInner">
          <div className="container navMegaGrid">
            <div className="navMegaSide">
              <p className="navMegaSideTitle">Payment plans</p>
              <ul className="navMegaList">
                {PAYMENT_PLAN_PAGES.map((page) => (
                  <li key={page.table.id}>
                    <Link
                      href={page.href}
                      className={page.table.id === active.table.id ? 'isActive' : undefined}
                      onPointerEnter={() => setActiveId(page.table.id)}
                      onFocus={() => setActiveId(page.table.id)}
                      onClick={navigate}
                    >
                      {page.label}<span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/payment-plans" className="navMegaAll" onClick={navigate}>View all payment plans<span aria-hidden="true">→</span></Link>
            </div>

            <div className="navMegaMain" aria-live="polite">
              <p className="navMegaGroup">{active.group}</p>
              <p className="navMegaTitle">{active.label}</p>
              <p className="navMegaSummary">{active.summary}</p>
              <dl className="navMegaFacts">
                <div><dt>Starting from</dt><dd>{formatPKRShort(active.startingFrom)}</dd></div>
                <div><dt>Sizes</dt><dd>{active.sizeRange}</dd></div>
                <div><dt>Booking</dt><dd>10%</dd></div>
                <div><dt>Monthly</dt><dd>{active.table.monthlyCount} × 1%</dd></div>
              </dl>
              <p className="navMegaTypes">{unitTypes.join(' · ')}</p>
              <Link href={active.href} className="navMegaMore" onClick={navigate}>See the {active.label} payment plan<span aria-hidden="true">→</span></Link>
            </div>

            <aside className="navMegaFeature" aria-label="Payment calculator">
              <p className="navMegaFeatureTag">Featured</p>
              <p className="navMegaFeatureTitle">Work out every instalment.</p>
              <p>Pick a unit and see what is due at booking, every month and on possession.</p>
              <Link href={`${active.href}#price-calculator`} className="navMegaFeatureCta" onClick={navigate}>Open the calculator<span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
