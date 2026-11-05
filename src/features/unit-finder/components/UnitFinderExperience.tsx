import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatPKR, startingPrice } from '@/features/payment-plans/units';
import { FOOD_COURT_IMAGE, MALL_IMAGES, OFFICE_IMAGES, RESIDENCE_IMAGES } from '@/features/project-showcase/images';

/** Each space links to its page and its payment plan; starting prices come from the price tables. */
const SPACES = [
  {
    title: 'Apartments',
    description: 'Studios, one and two-bedroom homes and premium Signature Glass Apartments on the 6th to 12th floors.',
    href: '/apartments',
    plan: '/payment-plans/apartments',
    tables: ['apartments'],
    image: RESIDENCE_IMAGES[0],
  },
  {
    title: 'Commercial shops',
    description: 'Shops on three retail levels around the central atrium, with travelators, kiosks and a supermarket.',
    href: '/commercial-shops',
    plan: '/payment-plans/first-floor-shops',
    tables: ['first-floor-shops', 'second-floor-shops'],
    image: MALL_IMAGES[2],
  },
  {
    title: 'Food court',
    description: 'Third-floor food court units beside the playland and trampoline park, where family footfall is highest.',
    href: '/food-court',
    plan: '/payment-plans/food-court',
    tables: ['food-court'],
    image: FOOD_COURT_IMAGE,
  },
  {
    title: 'Corporate offices',
    description: 'Full-glass offices facing Ring Road, with their own entrance, dedicated lifts and a lifetime amenities membership.',
    href: '/corporate-offices',
    plan: '/payment-plans/offices',
    tables: ['offices'],
    image: OFFICE_IMAGES[0],
  },
] as const;

export function UnitFinderExperience() {
  return (
    <>
      <section className="wpInternalHero section">
        <div className="container wpInternalHeroGrid">
          <div>
            <Eyebrow>Find your space</Eyebrow>
            <h1>Find the right space at Aureum.</h1>
            <p>Homes, shops, food court units and offices under one roof. Compare the starting prices, then open the payment plan for the space that fits your plans.</p>
            <ButtonLink href="#spaces">Compare the spaces <span aria-hidden="true">↓</span></ButtonLink>
          </div>
          <div className="wpInternalHeroImage"><Image src={MALL_IMAGES[0].src} alt={MALL_IMAGES[0].alt} fill priority sizes="(max-width: 900px) 92vw, 560px" /></div>
        </div>
      </section>

      <section className="section spacesSection" id="spaces">
        <div className="container">
          <SectionHeading eyebrow="Choose a space" title="Start with the space that matters to you." description="Every price is a starting base price from the current Aureum price list; applicable 10% category charges are additional." />
          <ul className="spaceGrid">
            {SPACES.map((space) => {
              const from = startingPrice(space.tables);
              return (
                <li className="spaceCard" key={space.title}>
                  <Link href={space.href} className="spaceImage" tabIndex={-1} aria-hidden="true">
                    <Image src={space.image.src} alt="" fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 300px" />
                  </Link>
                  <div className="spaceBody">
                    <h3><Link href={space.href}>{space.title}</Link></h3>
                    <p>{space.description}</p>
                    {from ? <p className="spaceFrom"><small>From</small>{formatPKR(from)}</p> : null}
                    <div className="spaceLinks">
                      <Link href={space.href}>Explore <span aria-hidden="true">→</span></Link>
                      <Link href={space.plan}>Payment plan <span aria-hidden="true">→</span></Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section wpInquirySection" id="enquiry">
        <div className="container wpInquiryGrid">
          <div><Eyebrow>Current availability</Eyebrow><h2>Let the project team guide your next step.</h2><p>Tell us which space you are exploring and the Aureum team will share current availability, the price list and the payment plan.</p></div>
          <div className="wpInquiryCard"><LeadForm /></div>
        </div>
      </section>
    </>
  );
}
