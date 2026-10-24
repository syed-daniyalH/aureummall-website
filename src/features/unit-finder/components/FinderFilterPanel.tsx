import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { FINDER_OPTIONS, type FinderFilters } from '../data';

type FinderFilterPanelProps = {
  filters: FinderFilters;
  onChange: <Key extends keyof FinderFilters>(key: Key, value: FinderFilters[Key]) => void;
  onReset: () => void;
};

export function FinderFilterPanel({ filters, onChange, onReset }: FinderFilterPanelProps) {
  return (
    <aside className="finderFilterPanel" aria-labelledby="finder-filters-heading">
      <div className="finderFilterHeader">
        <p className="eyebrow">Refine the search</p>
        <h2 id="finder-filters-heading">Find your direction.</h2>
        <p>Use the filters to describe what you are looking for. Approved inventory will appear here when it is connected.</p>
      </div>
      <div className="finderFilterGrid">
        <FormField label="I am looking for">
          <select value={filters.category} onChange={(event) => onChange('category', event.target.value as FinderFilters['category'])}>
            {FINDER_OPTIONS.category.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
        <FormField label="Unit type">
          <select value={filters.unitType} onChange={(event) => onChange('unitType', event.target.value)}>
            {FINDER_OPTIONS.unitType.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
        <FormField label="Floor">
          <select value={filters.floor} onChange={(event) => onChange('floor', event.target.value)}>
            {FINDER_OPTIONS.floor.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
        <FormField label="Bedrooms">
          <select value={filters.bedrooms} onChange={(event) => onChange('bedrooms', event.target.value as FinderFilters['bedrooms'])}>
            {FINDER_OPTIONS.bedrooms.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
        <FormField label="Budget">
          <select value={filters.budget} onChange={(event) => onChange('budget', event.target.value as FinderFilters['budget'])}>
            {FINDER_OPTIONS.budget.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
        <FormField label="Purpose">
          <select value={filters.purpose} onChange={(event) => onChange('purpose', event.target.value as FinderFilters['purpose'])}>
            {FINDER_OPTIONS.purpose.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FormField>
      </div>
      <Button type="button" variant="secondary" className="onLight" onClick={onReset}>Clear all filters</Button>
    </aside>
  );
}
