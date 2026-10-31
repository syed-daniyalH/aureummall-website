import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ACCESS, AMENITIES, APARTMENT_TYPES, BUILDING_LEVELS, DEVELOPER, IMAGE_DISCLAIMER, PROJECT_DISCLAIMERS } from '@/lib/project-facts';

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
          <ul className="developerPortfolio">{DEVELOPER.portfolio.map((project) => <li key={project.name}><strong>{project.name}</strong><span>{project.detail}</span></li>)}</ul>
        </div>
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
        <SectionHeading id="access-heading" eyebrow="Arrival & intelligence" title="A separate way in for everyone." description="Smart access, lighting and security monitoring connected through an Integrated Building Management System (IBMS), with 24/7 security and power backup." />
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

export function ApartmentTypesSection() {
  return (
    <section className="section apartmentTypesSection" aria-labelledby="apartment-types-heading">
      <div className="container">
        <SectionHeading id="apartment-types-heading" eyebrow="The apartments" title="Space for your lifestyle." description="Studios, one- and two-bedroom apartments and a separate Premium Glass Collection, with a private residential entrance away from the mall." />
        <ul className="apartmentTypes">
          {APARTMENT_TYPES.map((type) => (
            <li key={type.name}><Eyebrow>{type.size}</Eyebrow><h3>{type.name}</h3><p>{type.summary}</p><strong>{type.from.startsWith('PKR') ? `From ${type.from}` : type.from}</strong></li>
          ))}
        </ul>
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
