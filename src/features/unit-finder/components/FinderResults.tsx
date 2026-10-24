import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { UnitPlan } from '@/lib/property-data';
import type { FinderResultState } from '../data';
import { FinderStateCard } from './FinderStateCard';

type FinderResultsProps = {
  results: UnitPlan[];
  state: FinderResultState;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onRetry: () => void;
};

const availabilityLabels = {
  available: 'Available',
  reserved: 'Reserved',
  unavailable: 'Unavailable',
  contact: 'Contact for availability',
} as const;

export function FinderResults({ results, state, compareIds, onToggleCompare, onRetry }: FinderResultsProps) {
  if (state !== 'available' && state !== 'contact' && state !== 'reserved' && state !== 'unavailable') {
    return <FinderStateCard state={state} onRetry={onRetry} />;
  }

  if (!results.length) {
    return <FinderStateCard state="empty" />;
  }

  return (
    <div className="finderResultsList">
      {results.map((unit) => {
        const availability = unit.availability ?? 'contact';
        return (
          <article className="unitResultCard" key={unit.id}>
            <div className="unitResultHeader"><Eyebrow>{unit.category.replace('_', ' ')}</Eyebrow><span className={`unitAvailability unitAvailability-${availability}`}>{availabilityLabels[availability]}</span></div>
            <h3>{unit.unitType}</h3>
            <div className="unitResultMeta"><span>{unit.floor || 'Floor to be confirmed'}</span><span>{unit.sizeSqFt ? `${unit.sizeSqFt} sq ft` : 'Size to be confirmed'}</span></div>
            <div className="unitResultActions">
              <Button type="button" variant="secondary" className="onLight" aria-pressed={compareIds.includes(unit.id)} onClick={() => onToggleCompare(unit.id)}>{compareIds.includes(unit.id) ? 'Compared' : 'Compare'}</Button>
              <ButtonLink href={`/contact?unit=${encodeURIComponent(unit.id)}`} variant="dark">Request details <span aria-hidden="true">↗</span></ButtonLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
