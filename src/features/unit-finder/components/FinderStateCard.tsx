import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { FinderResultState } from '../data';

type FinderStateCardProps = {
  state: FinderResultState;
  onRetry?: () => void;
};

const STATE_COPY: Record<FinderResultState, { eyebrow: string; title: string; description: string }> = {
  loading: { eyebrow: 'Loading inventory', title: 'Preparing your results.', description: 'We are checking the approved property register.' },
  empty: { eyebrow: 'No approved results yet', title: 'The finder is ready for the property register.', description: 'No live inventory has been connected yet. Your filters are saved in this experience and can drive the catalogue when the approved data is supplied.' },
  unavailable: { eyebrow: 'Currently unavailable', title: 'This selection is not available right now.', description: 'Try another pathway or request the latest official availability.' },
  reserved: { eyebrow: 'Reserved', title: 'This selection is currently reserved.', description: 'We can help you understand the next available option.' },
  available: { eyebrow: 'Available', title: 'A matching unit is ready to explore.', description: 'Review the approved unit details before taking the next step.' },
  contact: { eyebrow: 'Contact for availability', title: 'The latest availability is handled by the project team.', description: 'Request the official details and we will direct you to the approved next step.' },
  error: { eyebrow: 'Something went wrong', title: 'We could not load the finder results.', description: 'Please try again or contact the team for the latest approved information.' },
};

export function FinderStateCard({ state, onRetry }: FinderStateCardProps) {
  const copy = STATE_COPY[state];

  return (
    <div className={`finderState finderState-${state}`} role={state === 'error' ? 'alert' : 'status'}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h3>{copy.title}</h3>
      <p>{copy.description}</p>
      {state === 'error' && onRetry ? <Button type="button" onClick={onRetry}>Try again</Button> : null}
      {state === 'empty' || state === 'unavailable' || state === 'reserved' || state === 'contact' ? <ButtonLink href="/contact" variant="dark">Request official details <span aria-hidden="true">↗</span></ButtonLink> : null}
    </div>
  );
}
