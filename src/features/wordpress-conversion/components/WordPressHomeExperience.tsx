'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VirtualTourEmbed } from '@/features/immersive-media/components/VirtualTourEmbed';
import type { NewsCardItem } from '@/features/news/posts';
import { AMENITIES, PROJECT_STATS } from '@/lib/project-facts';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { FOOD_COURT_IMAGE, LEISURE_IMAGES, LOCATION_MAP, MALL_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';
import { NewsCardList } from './NewsCardList';

const FLOOR_PLANS = [
  { label: 'Ground Floor', image: '/assets/aureum/approved/floor-plans/aureum-ground-floor-plan-2026.webp' },
  { label: '1st Floor', image: '/assets/aureum/approved/floor-plans/aureum-first-floor-plan.webp' },
  { label: '2nd Floor', image: '/assets/aureum/approved/floor-plans/aureum-second-floor-plan-2026.webp' },
  { label: 'Food Court', image: '/assets/aureum/approved/floor-plans/aureum-food-court-floor-plan-2026.webp' },
  { label: 'Residential Floor', image: '/assets/aureum/approved/floor-plans/aureum-residential-floor-plan-2026.webp' },
  { label: 'Basement Level 1', image: '/assets/aureum/approved/floor-plans/aureum-basement-1-plan-2026.webp' },
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

      <section className="section showcaseSection" aria-labelledby="wp-inside-heading">
        <div className="container">
          <SectionHeading id="wp-inside-heading" eyebrow="Inside Aureum" title="Shop, dine, play and live." description="Three retail levels around a central atrium, a food court beside the playland, and homes planned for light and calm." />
          <ShowcaseGallery images={[MALL_IMAGES[0], FOOD_COURT_IMAGE, LEISURE_IMAGES[0], RESIDENCE_IMAGES[0], MALL_IMAGES[2], RESIDENCE_IMAGES[2]]} branded />
          <ButtonLink href="/gallery" variant="dark">Open the full gallery <span aria-hidden="true">→</span></ButtonLink>
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

      <section className="wpTourSection section" aria-labelledby="wp-tour-heading">
        <div className="container wpTourGrid">
          <div>
            <SectionHeading id="wp-tour-heading" eyebrow="360° virtual tour" title="Walk through Aureum before you visit." description="Step inside an interactive 360° concept tour of the development: look around the arrival, the mall, the residences and lifestyle spaces." />
            <ButtonLink href="/immersive-media#virtual-tour" variant="dark">See all project media <span aria-hidden="true">→</span></ButtonLink>
          </div>
          <VirtualTourEmbed placement="home" />
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
          <div className="wpPlanImage" style={{ position: 'relative' }}><Image src={MALL_IMAGES[1].src} alt={MALL_IMAGES[1].alt} fill sizes="(max-width: 900px) 92vw, 520px" /></div>
          <div>
            <SectionHeading id="wp-plans-heading" eyebrow="Investment / payment plans" title="A plan that makes the next step easier to understand." description="Experience luxury living with a flexible payment plan designed to make premium living and smart investment more accessible." />
            <ButtonLink href="/payment-plans" variant="dark">Open full payment plans <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
      </section>

      <BrochureDownloads />

      <section className="wpNewsSection section" aria-labelledby="wp-news-heading">
        <div className="container">
          <SectionHeading id="wp-news-heading" eyebrow="Latest / project context" title="Keep up with Aureum." description="Read the latest project updates, location information and payment-plan guidance for Aureum Mall &amp; Residences." />
          <NewsCardList items={latestNews} />
        </div>
      </section>

      <section className="wpLocationSection section" aria-labelledby="wp-location-heading">
        <div className="container wpLocationGrid">
          <div className="wpLocationVisual wpLocationMap" style={{ position: 'relative' }}><Image src={LOCATION_MAP.src} alt={LOCATION_MAP.alt} fill sizes="(max-width: 900px) 92vw, 560px" /></div>
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
