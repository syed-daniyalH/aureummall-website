import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FINDER_FILTER_LABELS, type FinderFilters } from '../data';

type FinderSelectionSummaryProps = {
  filters: FinderFilters;
  compareCount: number;
  onShare: () => void;
};

const isSelected = (value: string) => value !== 'any' && value !== 'all';

export function FinderSelectionSummary({ filters, compareCount, onShare }: FinderSelectionSummaryProps) {
  const selections = (Object.entries(filters) as Array<[keyof FinderFilters, string]>)
    .filter(([, value]) => isSelected(value));

  return (
    <div className="finderSelectionSummary" aria-live="polite">
      <div>
        <Eyebrow>Your search</Eyebrow>
        <h2>{selections.length ? `${selections.length} filters selected` : 'A clear starting point'}</h2>
      </div>
      <div className="finderChips">
        {selections.length ? selections.map(([key, value]) => <span className="finderChip" key={key}>{FINDER_FILTER_LABELS[key]}: {value}</span>) : <span className="finderChip">All approved pathways</span>}
      </div>
      <div className="finderSummaryActions">
        <Button type="button" variant="secondary" className="onLight" onClick={onShare}>Share search</Button>
        {compareCount ? <span className="compareCount">{compareCount} selected to compare</span> : null}
      </div>
    </div>
  );
}
