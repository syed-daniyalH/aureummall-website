'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { PAYMENT_PLAN_PAGES } from '@/features/payment-plans/plan-pages';
import { ANALYTICS_EVENTS } from '@/features/content-seo/data';
import { track } from '@/lib/analytics';
import { PRIMARY_NAV, SITE } from '@/lib/site';
import { clamp01, getHeaderMotion } from '@/lib/navigation-motion';

const EXPLORE = [
  { label: 'Gallery', href: '/gallery', detail: 'Discover our spaces' },
  { label: '360° Tour', href: '/immersive-media#virtual-tour', detail: 'Explore virtually' },
  { label: 'Blogs', href: '/news', detail: 'Stories and project updates' },
] as const;

const SECONDARY_ROUTES = new Set(['/gallery', '/immersive-media#virtual-tour', '/news', '/payment-plans']);

export function AureumFloatingNav() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<'explore' | 'plans' | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!dropdown) return;
    const active = pillRef.current?.querySelector(`[data-dropdown="${dropdown}"]`);
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !active?.contains(event.target)) setDropdown(null);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [dropdown]);

  // Compute scroll geometry in an animation frame; no new animation package required.
  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const render = () => {
      frame = 0;
      const pill = pillRef.current;
      if (!pill || openRef.current) return;
      const firstSection = document.querySelector<HTMLElement>('#main-content > section:first-of-type');
      const distance = Math.max(420, firstSection?.offsetHeight ?? window.innerHeight);
      const progress = reduced.matches ? 1 : clamp01(window.scrollY / distance);
      const motion = getHeaderMotion(progress, window.innerWidth);
      pill.style.setProperty('--aureum-pill-width', motion.width + 'px');
      pill.style.setProperty('--aureum-pill-top', motion.top + 'px');
      pill.style.setProperty('--aureum-pill-radius', motion.radius + 'px');
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Native modal dialog provides keyboard focus trapping and Escape support.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (dialog.open) {
      dialog.close();
    }
    return () => {
      if (open) {
        if (dialog.open) dialog.close();
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setDropdown(null);
  }

  function handleDialogClose() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header className="siteHeader aureumFloatingHeader">
      <div className="aureumFloatingPill" ref={pillRef} onKeyDown={(event) => {
        if (event.key !== 'Escape' || !dropdown) return;
        setDropdown(null);
        pillRef.current?.querySelector<HTMLButtonElement>(`[data-dropdown="${dropdown}"] button`)?.focus();
      }}>
        <div className="aureumPillGroup">
          <button
            className="aureumPillMenu"
            type="button"
            ref={menuButtonRef}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="aureum-mega-dialog"
            aria-label="Menu"
            onClick={() => { setDropdown(null); setOpen(true); }}
          >
            <span className="aureumHamburger" aria-hidden="true"><i /><i /></span>
            <span>MENU</span>
          </button>
          <div className="aureumPillDropdown" data-dropdown="explore"
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(null); }}>
            <button type="button" className="aureumPillTrigger" aria-expanded={dropdown === 'explore'}
              aria-controls="aureum-explore-links" onClick={() => setDropdown(dropdown === 'explore' ? null : 'explore')}>
              Explore <span className="aureumPillChevron" aria-hidden="true">⌄</span>
            </button>
            <div id="aureum-explore-links" className="aureumPillLinks" hidden={dropdown !== 'explore'}>
              {EXPLORE.map((item) => (
                <Link href={item.href} key={item.href} onClick={closeMenu}>
                  <span><strong>{item.label}</strong><small>{item.detail}</small></span><span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link className="aureumPillBrand" href="/" onClick={closeMenu} aria-label={SITE.name + ' home'}>
          <BrandMark tone="light" />
        </Link>
        <div className="aureumPillGroup aureumPillGroupEnd">
          <div className="aureumPillDropdown" data-dropdown="plans"
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(null); }}>
            <button type="button" className="aureumPillTrigger" aria-label="Payment Plans" aria-expanded={dropdown === 'plans'}
              aria-controls="aureum-payment-links" onClick={() => setDropdown(dropdown === 'plans' ? null : 'plans')}>
              <span><span className="aureumPillPaymentWord">Payment </span>Plans</span>
              <span className="aureumPillChevron" aria-hidden="true">⌄</span>
            </button>
            <div id="aureum-payment-links" className="aureumPillLinks aureumPillLinksEnd" hidden={dropdown !== 'plans'}>
              <Link href="/payment-plans" onClick={closeMenu}><strong>All payment plans</strong><span aria-hidden="true">↗</span></Link>
              {PAYMENT_PLAN_PAGES.map((page) => (
                <Link href={page.href} key={page.table.id} onClick={closeMenu}>{page.label}</Link>
              ))}
            </div>
          </div>
          <Link className="aureumPillInquire" href="/contact?intent=site_visit#enquiry" onClick={closeMenu} aria-label="Inquire">
            <span>INQUIRE</span><span aria-hidden="true" className="aureumPillArrow">→</span>
          </Link>
        </div>
      </div>

      <dialog
        className="aureumMegaDialog"
        id="aureum-mega-dialog"
        ref={dialogRef}
        aria-label="Aureum website navigation"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClose={handleDialogClose}
        onClick={(event) => { if (event.target === dialogRef.current) closeMenu(); }}
      >
        <div className="aureumMegaSurface">
          <div className="aureumMegaTop">
            <button className="aureumMegaClose" type="button" onClick={closeMenu} autoFocus>
              <span aria-hidden="true">×</span> CLOSE
            </button>
            <Link className="aureumMegaLogo" href="/" onClick={closeMenu} aria-label={SITE.name + ' home'}>
              <BrandMark tone="light" />
            </Link>
            <Link className="aureumMegaInquire" href="/contact?intent=site_visit#enquiry" onClick={closeMenu}>INQUIRE <span aria-hidden="true">↗</span></Link>
          </div>

          <nav className="aureumMegaNavigation" aria-label="All website pages">
            <div className="aureumMegaHeading">
              <p className="aureumMegaKicker">WELCOME TO AUREUM</p>
              <h2>Explore exceptional living.</h2>
              <p>Discover the project, our spaces, and your next visit.</p>
            </div>

            <div className="aureumMegaColumns">
              <section className="aureumMegaPrimary" aria-label="Main pages">
                <p className="aureumMegaLabel">THE PROJECT</p>
                {PRIMARY_NAV.filter((item) => !SECONDARY_ROUTES.has(item.href)).map((item, index) => (
                  <Link key={item.href} href={item.href} className="aureumMegaMainLink" onClick={closeMenu}>
                    <span className="aureumMegaIndex">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </section>

              <aside className="aureumMegaFeature" aria-label="Visit Aureum">
                <p>AN ICONIC ADDRESS</p>
                <h3>Discover Aureum Mall &amp; Residences.</h3>
                <span>{SITE.location}</span>
                <Link href="/contact?intent=site_visit#enquiry" onClick={closeMenu}>Arrange a site visit <span aria-hidden="true">↗</span></Link>
              </aside>
            </div>
          </nav>
          <div className="aureumMegaBottom">
            <span>{SITE.location}</span>
            <a href={'tel:' + SITE.phoneE164} onClick={() => track(ANALYTICS_EVENTS.callClick, { placement: 'mega_menu' })}>{SITE.phoneDisplay}</a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
