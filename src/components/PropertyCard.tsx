import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

type PropertyCardProps = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  index: string;
};

export function PropertyCard({ title, description, href, eyebrow, index }: PropertyCardProps) {
  return (
    <article className="propertyCard">
      <div className="propertyCardVisual" aria-hidden="true"><span>{index}</span></div>
      <div className="propertyCardBody">
        <Eyebrow className="cardEyebrow">{eyebrow}</Eyebrow>
        <h3>{title}</h3>
        <p>{description}</p>
        <TextLink href={href}>Explore {title}</TextLink>
      </div>
    </article>
  );
}
