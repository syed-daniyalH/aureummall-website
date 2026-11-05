import Image from 'next/image';
import Link from 'next/link';
import { calcHref, formatLakhCrore, formatPKR, formatSqFt, PRICED_UNITS } from '@/features/payment-plans/units';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ACCESS, AMENITIES, APARTMENT_TYPES, BUILDING_LEVELS, DEVELOPER, IMAGE_DISCLAIMER, LEADERSHIP, PROJECT_DISCLAIMERS, visibleTeam, type TeamMember } from '@/lib/project-facts';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { personWhatsappHref } from '@/lib/whatsapp';

/** `note` replaces the default "Artist’s impression" caption (e.g. for drawings and maps). */
export type ShowcaseImage = { src: string; alt: string; label?: string; note?: string };

export function DeveloperSection() {
  return (
    <section className="section developerSection" aria-labelledby="developer-heading">
      <div className="container developerGrid">
        <div className="developerLogo"><Image src={DEVELOPER.logo} alt={`${DEVELOPER.shortName}, ${DEVELOPER.name}`} width={300} height={281} /></div>
        <div>
          <Eyebrow>The developer</Eyebrow>
          <h2 id="developer-heading">We don’t just lay bricks, we lay the foundation for your future.</h2>
          <p>{DEVELOPER.summary}</p>
          <dl className="developerStats">{DEVELOPER.stats.map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}</dl>
        </div>
      </div>
      <div className="container portfolioBlock">
        <div className="portfolioIntro">
          <Eyebrow>The portfolio</Eyebrow>
          <h3>Landmarks that define Karachi.</h3>
        </div>
        <ul className="portfolioGrid">
          {DEVELOPER.portfolio.map((project, index) => (
            <li className="portfolioCard" key={project.name}>
              <div className="portfolioImage">
                <Image src={project.image} alt={`${project.name}, ${project.detail}`} fill sizes="(max-width: 860px) 92vw, 400px" />
                <span className="portfolioBadge">Delivered</span>
              </div>
              <div className="portfolioBody">
                <p className="portfolioIndex">{String(index + 1).padStart(2, '0')} · Bahria Town Karachi</p>
                <h4>{project.name}</h4>
                <p className="portfolioDetail">{project.detail}</p>
                <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Chairman and CEO, as alternating editorial rows: portrait on one side, name, role and profile on the other. */
export function LeadershipSection() {
  return (
    <section className="section leadershipSection" aria-labelledby="leadership-heading">
      <div className="container">
        <div className="leadershipIntro">
          <Eyebrow>Leadership</Eyebrow>
          <h2 id="leadership-heading">The people behind Aureum.</h2>
          <p>Aureum Mall &amp; Residences is backed by {DEVELOPER.name}: a chairman with a record of delivered landmarks, and a chief executive building the next one.</p>
        </div>
        <div className="leadershipList">
          {LEADERSHIP.map((leader, index) => (
            <article className={`leaderRow${index % 2 ? ' isReversed' : ''}`} key={leader.name} aria-labelledby={`leader-${index}`}>
              <div className="leaderMedia">
                <div className="leaderPortrait">
                  <Image src={leader.image.src} alt={leader.image.alt} fill sizes="(max-width: 860px) 92vw, 460px" style={{ objectPosition: leader.image.position, transform: `scale(${leader.image.zoom})`, transformOrigin: '50% 0' }} />
                </div>
                {leader.inset ? (
                  <div className="leaderInset">
                    <Image src={leader.inset.src} alt={leader.inset.alt} fill sizes="200px" style={{ objectPosition: leader.inset.position }} />
                  </div>
                ) : null}
                <span className="leaderIndex" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="leaderBody">
                <p className="leaderRole">{leader.role}</p>
                <h3 id={`leader-${index}`}>{leader.name}</h3>
                <ul className="leaderOrgs">{leader.organisations.map((organisation) => <li key={organisation}>{organisation}</li>)}</ul>
                <p className="leaderBio">{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Team portraits share one crop and a monochrome navy treatment that evens out their different
 * backgrounds and lighting; hovering shows the photo in full colour.
 */
function TeamPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="teamPhoto">
      <Image src={member.image} alt={member.name ? `${member.name}${member.role ? `, ${member.role}` : ''} at Aureum Mall & Residences` : 'Aureum team member'} fill sizes="(max-width: 560px) 46vw, (max-width: 1000px) 30vw, 290px" style={member.position ? { objectPosition: member.position } : undefined} />
    </div>
  );
}

const PREVIEW_COUNT = 4;

/** About page: the first few team faces and a link to the full Team page. */
export function TeamPreview() {
  const members = visibleTeam().slice(0, PREVIEW_COUNT);
  if (members.length === 0) return null;

  return (
    <section className="section teamSection" aria-labelledby="team-heading">
      <div className="container">
        <SectionHeading id="team-heading" eyebrow="Our team" title="The people you will meet." description="The Aureum sales and project team: the people who show you the site, take you through the payment plan and answer your questions along the way." />
        <ul className="teamGrid">
          {members.map((member) => (
            <li className="teamCard" key={member.id}>
              <TeamPortrait member={member} />
              <div className="teamCaption">
                <p className="teamName">{member.name ?? 'Name to be confirmed'}</p>
                <p className="teamRole">{member.role ?? 'Aureum Mall & Residences'}</p>
              </div>
            </li>
          ))}
        </ul>
        <ButtonLink href="/team" variant="dark" className="teamMoreLink">Meet the whole team <span aria-hidden="true">→</span></ButtonLink>
      </div>
    </section>
  );
}

/** Team page: every member with what they handle, their languages and a direct WhatsApp button. */
export function TeamDirectory() {
  const members = visibleTeam();
  if (members.length === 0) return null;

  return (
    <section className="section teamSection teamDirectory" id="team" aria-labelledby="team-directory-heading">
      <div className="container">
        <SectionHeading id="team-directory-heading" eyebrow="Sales & project team" title="Talk to the person, not a call centre." description="Message any member of the team directly on WhatsApp. They can share current availability, walk you through the payment plan and arrange your site visit." />
        <ul className="teamGrid">
          {members.map((member) => (
            <li className="teamCard teamCardFull" key={member.id}>
              <TeamPortrait member={member} />
              <div className="teamCaption">
                <p className="teamName">{member.name ?? 'Name to be confirmed'}</p>
                <p className="teamRole">{member.role ?? 'Aureum Mall & Residences'}</p>
                {member.quote ? <blockquote className="teamQuote">“{member.quote}”</blockquote> : null}
                {member.focus?.length ? <p className="teamMeta"><span>Handles</span>{member.focus.join(' · ')}</p> : null}
                {member.languages?.length ? <p className="teamMeta"><span>Speaks</span>{member.languages.join(' · ')}</p> : null}
                <a className="teamWhatsapp" href={personWhatsappHref(member.name, member.whatsapp)} target="_blank" rel="noopener">
                  Message on WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BuildingLevelsSection({ image }: { image?: ShowcaseImage }) {
  return (
    <section className="section levelsSection" aria-labelledby="levels-heading">
      <div className="container levelsGrid">
        <div>
          <SectionHeading id="levels-heading" eyebrow="The building" title="A destination, level by level." description="Floor heights shown for the commercial levels." />
          <ol className="levelsList">
            {BUILDING_LEVELS.map((level) => (
              <li key={level.level}><strong>{level.level}</strong><span>{level.detail}</span>{'height' in level ? <em>{level.height}</em> : null}</li>
            ))}
          </ol>
        </div>
        {image ? <ShowcaseFigure image={image} className="levelsImage" sizes="(max-width: 900px) 92vw, 520px" /> : null}
      </div>
    </section>
  );
}

export function AccessSection() {
  return (
    <section className="section accessSection" aria-labelledby="access-heading">
      <div className="container">
        <SectionHeading id="access-heading" eyebrow="Arrival & intelligence" title="A separate way in for everyone." description="AI smart access at every entrance, AI surveillance with 24/7 CCTV monitoring, professional security and fire management, power backup and automated building systems." />
        <ul className="accessGrid">{ACCESS.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}</ul>
      </div>
    </section>
  );
}

export function AmenitiesSection({ images = [] }: { images?: readonly ShowcaseImage[] }) {
  return (
    <section className="section amenitiesSection" aria-labelledby="amenities-heading">
      <div className="container">
        <SectionHeading id="amenities-heading" eyebrow="Amenities" title="More than an address." description="Twenty planned amenities and facilities for residents, office owners and visitors." />
        <ol className="amenitiesGrid">{AMENITIES.map((amenity, index) => <li key={amenity}><span>{String(index + 1).padStart(2, '0')}</span>{amenity}</li>)}</ol>
        {images.length ? <ShowcaseGallery images={images} /> : null}
      </div>
    </section>
  );
}

/** Every apartment type from the catalogue, with its sizes, category, rate, prices, layout and a link to the calculator. */
export function ApartmentTypesSection() {
  const types = APARTMENT_TYPES.map((type) => {
    const units = PRICED_UNITS.filter((unit) => unit.table.id === 'apartments' && unit.row.type === type.rowType);
    const rates = [...new Set(units.map((unit) => unit.row.ratePerSqFt))];
    const categories = [...new Set(units.map((unit) => unit.row.unitCategory).filter(Boolean))];
    const cheapest = units.reduce((best, unit) => (unit.row.totalPrice < best.row.totalPrice ? unit : best), units[0]);
    return { ...type, units, rates, categories, cheapest };
  }).filter((type) => type.units.length > 0);

  return (
    <section className="section apartmentTypesSection" aria-labelledby="apartment-types-heading">
      <div className="container">
        <SectionHeading id="apartment-types-heading" eyebrow="The apartments" title="Space for your lifestyle." description="Five apartment types on the 6th to 12th floors, from a 426 sq ft studio to the premium Signature Glass Apartments, with a private residential entrance, three dedicated lifts and a 28 × 50 ft lobby." />
        <div className="aptTypes">
          {types.map((type, index) => (
            <article className={`aptType${type.premium ? ' isPremium' : ''}`} key={type.id} aria-labelledby={`apt-${type.id}`}>
              <header className="aptTypeHead">
                <p className="aptTypeKicker">
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {type.premium ? <strong className="premiumTag">Premium</strong> : 'Apartment type'}
                </p>
                <h3 id={`apt-${type.id}`}>{type.name}</h3>
                <p className="aptTypeSummary">{type.summary}</p>
              </header>

              <dl className="aptSpecs">
                <div><dt>Size</dt><dd>{type.units.map((unit) => formatSqFt(unit.row.sizeSqFt)).join(' · ')}</dd></div>
                <div><dt>Category</dt><dd>{type.premium ? `Premium · ${type.categories.join(' / ')}` : type.categories.join(' / ')}</dd></div>
                <div><dt>Rate</dt><dd>{type.rates.map((rate) => formatPKR(rate)).join(' / ')} per sq ft</dd></div>
                <div><dt>Starting price</dt><dd>{formatPKR(type.cheapest.row.totalPrice)}<small>≈ {formatLakhCrore(type.cheapest.row.totalPrice)}</small></dd></div>
                <div><dt>Booking 10%</dt><dd>{formatPKR(type.cheapest.row.booking)}</dd></div>
                <div><dt>Monthly from</dt><dd>{formatPKR(type.cheapest.row.monthlyInstallment)}<small>× {type.cheapest.table.monthlyCount} months</small></dd></div>
              </dl>

              <div className="aptTypeDetail">
                <div>
                  <p className="aptTypeLabel">Representative layout</p>
                  <ul className="aptLayout">{type.layout.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <p className="aptTypeLabel">Ideal for</p>
                  <p className="aptIdeal">{type.idealFor}</p>
                </div>
              </div>

              <footer className="aptTypeFoot">
                <p className="aptTypeLabel">Calculate the payment plan</p>
                <div className="aptUnitLinks">
                  {type.units.map((unit) => (
                    <Link key={unit.id} href={`/payment-plans/apartments${calcHref(unit.id)}`}>
                      {formatSqFt(unit.row.sizeSqFt)} · {formatPKR(unit.row.totalPrice)}<span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </footer>
            </article>
          ))}
        </div>
        <p className="aptTypesNote">Prices are starting base prices from the Aureum Catalogue, November 2026. Inner and outer categories are as per the official price list; applicable 10% category charges are additional. Layouts are representative and subject to final approved drawings.</p>
      </div>
    </section>
  );
}

export function ShowcaseFigure({ image, className = '', sizes, zoomable = false }: { image: ShowcaseImage; className?: string; sizes: string; zoomable?: boolean }) {
  const picture = <Image src={image.src} alt={image.alt} fill sizes={sizes} />;
  return (
    <figure className={`showcaseFigure ${className}`.trim()}>
      {zoomable ? (
        <a className="showcaseFigureImage" href={image.src} target="_blank" rel="noopener" aria-label={`Open full-size ${image.label ?? image.alt}`}>{picture}<span className="zoomHint" aria-hidden="true">Tap to zoom ↗</span></a>
      ) : (
        <div className="showcaseFigureImage">{picture}</div>
      )}
      <figcaption>{image.label ? <strong>{image.label}</strong> : null}<span>{image.note ?? 'Artist’s impression'}</span></figcaption>
    </figure>
  );
}

export function FloorPlanGallery({ plans }: { plans: readonly ShowcaseImage[] }) {
  return <div className="showcaseGallery floorPlanGallery">{plans.map((plan) => <ShowcaseFigure key={plan.src} image={plan} zoomable className="planFigure" sizes="(max-width: 700px) 92vw, 46vw" />)}</div>;
}

export function ShowcaseGallery({ images, branded = false }: { images: readonly ShowcaseImage[]; branded?: boolean }) {
  return (
    <div className="showcaseGallery">
      {images.map((image) => <ShowcaseFigure key={image.src} image={image} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px" />)}
      {branded ? <p className="showcaseNote">{IMAGE_DISCLAIMER}</p> : null}
    </div>
  );
}

export function ProjectDisclaimers() {
  return (
    <section className="section disclaimerSection" aria-label="Important information">
      <div className="container"><Eyebrow>Important information</Eyebrow><ul>{PROJECT_DISCLAIMERS.map((line) => <li key={line}>{line}</li>)}</ul></div>
    </section>
  );
}
