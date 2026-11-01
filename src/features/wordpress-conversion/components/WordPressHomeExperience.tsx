import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BuildingExplorer } from '@/features/building-explorer/components/BuildingExplorer';
import { VirtualTourEmbed } from '@/features/immersive-media/components/VirtualTourEmbed';
import { PriceCalculator } from '@/features/payment-plans/components/PriceCalculator';
import { AMENITIES, DEVELOPER, PROJECT_STATS } from '@/lib/project-facts';
import { ShowcaseGallery } from '@/features/project-showcase/components/ProjectShowcase';
import { BrochureDownloads } from '@/features/project-showcase/components/BrochureDownloads';
import { FOOD_COURT_IMAGE, LEISURE_IMAGES, LOCATION_MAP, MALL_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';

// The homepage tells the project in order: what it is, what is inside, where you fit, what it costs, then how to visit.
export function WordPressHomeExperience() {
  return (
    <>
      <section className="wpIntroSection section">
        <div className="container wpIntroGrid">
          <div className="wpIntroCopy">
            <Eyebrow>The destination</Eyebrow>
            <h2>One address for shopping, dining, work and home.</h2>
            <p>Aureum rises at the Bahria Town Ring Road Interchange: three retail levels around a central atrium, a food court and family entertainment, a luxury hotel, full-glass corporate offices and residences above. Developed by {DEVELOPER.name} ({DEVELOPER.shortName}).</p>
            <ButtonLink href="/about" variant="dark">About the project</ButtonLink>
          </div>
          <div className="wpIntroStats" aria-label="Project statistics">
            {PROJECT_STATS.map(([value, label]) => <div className="wpStat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section showcaseSection" aria-labelledby="wp-inside-heading">
        <div className="container">
          <SectionHeading id="wp-inside-heading" eyebrow="Inside Aureum" title="Shop, dine, play and live." description="Three retail levels around a central atrium, a food court beside the playland, and homes planned for light and calm." />
          <ShowcaseGallery images={[MALL_IMAGES[0], FOOD_COURT_IMAGE, LEISURE_IMAGES[0], RESIDENCE_IMAGES[0], MALL_IMAGES[2], RESIDENCE_IMAGES[2]]} branded />
          <ButtonLink href="/gallery" variant="dark">Open the full gallery</ButtonLink>
        </div>
      </section>

      <section className="section explorerSection" id="explore-building" aria-labelledby="wp-explorer-heading">
        <div className="container">
          <SectionHeading id="wp-explorer-heading" eyebrow="Explore the building" title="Find your place, level by level." description="From the basements to the residences: choose a level to see what is there, its floor plan and the base price of every unit." />
          <BuildingExplorer />
        </div>
      </section>

      <section className="section calcSection" aria-labelledby="wp-prices-heading">
        <div className="container">
          <SectionHeading id="wp-prices-heading" eyebrow="Prices & payment plan" title="What it costs, in plain numbers." description="Choose a unit to see its base price and every instalment, from booking to possession." />
          <PriceCalculator />
          <ButtonLink href="/payment-plans" variant="dark">See every payment table</ButtonLink>
        </div>
      </section>

      <section className="wpTourSection section" aria-labelledby="wp-tour-heading">
        <div className="container wpTourGrid">
          <div>
            <SectionHeading id="wp-tour-heading" eyebrow="360° virtual tour" title="Walk through Aureum before you visit." description="Step inside an interactive 360° concept tour of the development: look around the arrival, the mall, the residences and lifestyle spaces." />
            <ButtonLink href="/immersive-media#virtual-tour" variant="dark">See all project media</ButtonLink>
          </div>
          <VirtualTourEmbed placement="home" />
        </div>
      </section>

      <section className="wpAmenitiesSection section" aria-labelledby="wp-amenities-heading">
        <div className="container wpAmenitiesGrid">
          <div>
            <Eyebrow>Amenities</Eyebrow>
            <h2 id="wp-amenities-heading">Everything you need, under one roof.</h2>
            <p>Twenty planned amenities for residents, office users and visitors, from a swimming pool and gym to a cinema, masjid and rooftop restaurant.</p>
            <ButtonLink href="/amenities">See all amenities</ButtonLink>
          </div>
          <ul className="wpAmenitiesList">
            {AMENITIES.map((amenity, index) => <li key={amenity}><span>{String(index + 1).padStart(2, '0')}</span>{amenity}</li>)}
          </ul>
        </div>
      </section>

      <section className="wpLocationSection section" aria-labelledby="wp-location-heading">
        <div className="container wpLocationGrid">
          <div className="wpLocationVisual wpLocationMap" style={{ position: 'relative' }}><Image src={LOCATION_MAP.src} alt={LOCATION_MAP.alt} fill sizes="(max-width: 900px) 92vw, 560px" /></div>
          <div>
            <Eyebrow>Location / Ring Road Interchange</Eyebrow>
            <h2 id="wp-location-heading">At the gateway to Bahria Town.</h2>
            <p>On the Ring Road Interchange, 0 minutes from Bahria Town and about 25 minutes from Lahore airport.</p>
            <ButtonLink href="/location">Explore the location</ButtonLink>
          </div>
        </div>
      </section>

      <BrochureDownloads />
    </>
  );
}
