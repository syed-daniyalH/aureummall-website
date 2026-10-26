'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { NewsCardItem } from '@/features/news/posts';
import { NewsCardList } from './NewsCardList';

const FLOOR_PLANS = [
  { label: 'Basement Level 1', image: '/assets/aureum/floor-basement-level-1.png' },
  { label: 'Ground Floor', image: '/assets/aureum/floor-ground.png' },
  { label: '1st Floor', image: '/assets/aureum/floor-first.png' },
  { label: '1 Bed Apartment', image: '/assets/aureum/1-apartment-floor-render-option-01-scaled.png' },
] as const;

const AMENITIES = [
  'Swimming Pool',
  'Mosque',
  'Gym',
  'Sauna',
  'Steam Room',
  'Spa',
  'Huge Parking',
  'High Speed Elevators',
  'Automated Switches',
  'Generator Backup',
  'CCTV Surveillance',
  'Professional Security',
  'Reception',
  'Conference Hall',
  'Waste Management',
  'Fire Management',
  'Indoor Sports',
  'Indoor Games',
  'Lockers',
  'Food Court',
  'Retail Mall',
] as const;

const PROJECT_STATS = [
  ['210+', 'Total Apartments'],
  ['80+', 'Quality Features'],
  ['35', 'Hotel Rooms'],
  ['98%', 'Success Rates'],
] as const;

export function WordPressHomeExperience({ latestNews }: { latestNews: readonly NewsCardItem[] }) {
  const [activeFloor, setActiveFloor] = useState<(typeof FLOOR_PLANS)[number]['label']>(FLOOR_PLANS[0].label);
  const selectedFloor = FLOOR_PLANS.find((floor) => floor.label === activeFloor) ?? FLOOR_PLANS[0];

  return (
    <>
      <section className="wpIntroSection section">
        <div className="container wpIntroGrid">
          <div className="wpIntroCopy">
            <Eyebrow>The astonishing overview</Eyebrow>
            <h2>About Aureum Mall &amp; Residences</h2>
            <p>At Aureum Mall &amp; Residences, we understand the importance of location when choosing your dream home. Ideally located in Bahria Town Lahore, our landmark development offers the perfect balance of peaceful living, modern convenience and seamless connectivity to the city&apos;s most important destinations.</p>
            <ButtonLink href="/location" variant="dark">Discover Aureum <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <div className="wpIntroStats" aria-label="Project statistics">
            {PROJECT_STATS.map(([value, label]) => <div className="wpStat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="wpFeatureBand section" aria-labelledby="wp-feature-heading">
        <div className="container">
          <SectionHeading id="wp-feature-heading" className="sectionIntro" eyebrow="One destination / many experiences" title="A complete place for living, working and gathering." description="Discover a premium lifestyle with thoughtfully designed spaces, world-class amenities and exceptional convenience." />
          <div className="wpFeatureGrid">
            {['Hotels & Food Courts', 'Residential & Commercials', 'Corporate Offices', '1 & 2 Bed Apartments', 'Wide Parking'].map((feature, index) => <article className="wpFeatureCard" key={feature}><span>0{index + 1}</span><strong>{feature}</strong></article>)}
          </div>
        </div>
      </section>

      <section className="wpFloorSection section" aria-labelledby="wp-floor-heading">
        <div className="container wpFloorGrid">
          <div>
            <SectionHeading id="wp-floor-heading" eyebrow="Explore the building" title="Find your place on the plan." description="Explore the building dimensions floor by floor, from parking and retail to residential living." />
            <div className="wpFloorTabs" role="tablist" aria-label="Floor plans">
              {FLOOR_PLANS.map((floor) => <button key={floor.label} type="button" role="tab" aria-selected={activeFloor === floor.label} className={activeFloor === floor.label ? 'isActive' : ''} onClick={() => setActiveFloor(floor.label)}>{floor.label}</button>)}
            </div>
            <ButtonLink href="/building-explorer" variant="dark">Open building explorer <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <div className="wpFloorVisual" style={{ position: 'relative' }}>
            <Image src={selectedFloor.image} alt={`${selectedFloor.label} plan`} fill sizes="(max-width: 900px) 92vw, 620px" />
            <span>{selectedFloor.label}</span>
          </div>
        </div>
      </section>

      <section className="wpAmenitiesSection section" aria-labelledby="wp-amenities-heading">
        <div className="container wpAmenitiesGrid">
          <div>
            <Eyebrow>Main features / amenities</Eyebrow>
            <h2 id="wp-amenities-heading">Everything you need, close to home.</h2>
            <p>Aureum Mall &amp; Residences combines luxury living, commercial excellence and everyday convenience in one iconic destination.</p>
            <ButtonLink href="/payment-plans">View payment plans <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <ul className="wpAmenitiesList">
            {AMENITIES.map((amenity, index) => <li key={amenity}><span>0{index + 1}</span>{amenity}</li>)}
          </ul>
        </div>
      </section>

      <section className="wpPlansSection section" aria-labelledby="wp-plans-heading">
        <div className="container wpPlansGrid">
          <div className="wpPlanImage" style={{ position: 'relative' }}><Image src="/assets/aureum/payment-plans-10.jpg" alt="Aureum Mall payment plan artwork" fill sizes="(max-width: 900px) 92vw, 520px" /></div>
          <div>
            <SectionHeading id="wp-plans-heading" eyebrow="Investment / payment plans" title="A plan that makes the next step easier to understand." description="Experience luxury living with a flexible payment plan designed to make premium living and smart investment more accessible." />
            <ButtonLink href="/payment-plans" variant="dark">Open full payment plans <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
      </section>

      <section className="wpNewsSection section" aria-labelledby="wp-news-heading">
        <div className="container">
          <SectionHeading id="wp-news-heading" eyebrow="Latest / project context" title="Keep up with Aureum." description="Read the latest project updates, location information and payment-plan guidance for Aureum Mall &amp; Residences." />
          <NewsCardList items={latestNews} />
        </div>
      </section>

      <section className="wpLocationSection section" aria-labelledby="wp-location-heading">
        <div className="container wpLocationGrid">
          <div className="wpLocationVisual" style={{ position: 'relative' }}><Image src="/assets/aureum/map.png" alt="Aureum Mall location map" fill sizes="(max-width: 900px) 92vw, 560px" /></div>
          <div>
            <Eyebrow>Location / Ring Road Interchange</Eyebrow>
            <h2 id="wp-location-heading">A location designed to keep you connected.</h2>
            <p>Find Aureum Mall in Bahria Town Lahore, close to the Ring Road Interchange and the movement that connects the city.</p>
            <ButtonLink href="/location">Explore the location <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
