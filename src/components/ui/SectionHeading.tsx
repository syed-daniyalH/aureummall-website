import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, className = '', id }: SectionHeadingProps) {
  return (
    <div className={`sectionHeading ${className}`.trim()} id={id}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {description ? <p className="sectionNote">{description}</p> : null}
    </div>
  );
}
