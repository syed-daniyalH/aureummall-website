'use client';

import { useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';

const categories = [
  { id: 'residence', label: 'Residence', description: 'A considered home for the everyday.' },
  { id: 'retail', label: 'Retail', description: 'A visible place for your next chapter.' },
  { id: 'office', label: 'Office', description: 'A professional address with presence.' },
] as const;

export function UnitFinderPreview() {
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('residence');
  const selected = categories.find((item) => item.id === category) ?? categories[0];

  return (
    <div className="finderPanel">
      <div className="finderIntro">
        <Eyebrow className="cardEyebrow">A guided beginning</Eyebrow>
        <h3>Find the space that feels like yours.</h3>
        <p>Explore apartments, commercial shops and corporate offices, then contact the Aureum team for current details.</p>
      </div>
      <div className="finderControl">
        <span className="fieldLabel" id="finder-category-label">I am looking for</span>
        <div className="finderChoices" aria-labelledby="finder-category-label">
          {categories.map((item) => (
            <button key={item.id} type="button" className={`finderChoice ${item.id === category ? 'isSelected' : ''}`} aria-pressed={item.id === category} onClick={() => setCategory(item.id)}>
              <span>{item.label}</span><small>{item.id === category ? 'Selected' : 'Explore'}</small>
            </button>
          ))}
        </div>
        <div className="finderResult" aria-live="polite">
          <span className="resultNumber">0{categories.findIndex((item) => item.id === selected.id) + 1}</span>
          <div><strong>{selected.label}</strong><p>{selected.description}</p></div>
          <ButtonLink variant="dark" href="/unit-finder">Continue <span aria-hidden="true">→</span></ButtonLink>
        </div>
      </div>
    </div>
  );
}
