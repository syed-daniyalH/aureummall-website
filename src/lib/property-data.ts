export type PropertyCategory = 'apartment' | 'commercial_shop' | 'corporate_office';
export type UnitAvailability = 'available' | 'reserved' | 'unavailable' | 'contact';

export interface UnitPlan {
  id: string;
  category: PropertyCategory;
  unitType: string;
  floor?: string;
  bedrooms?: number;
  purpose?: 'live' | 'invest' | 'work';
  sizeSqFt: number;
  orientation?: 'inner' | 'outer';
  ratePerSqFt?: number;
  totalPrice?: number;
  bookingPercent?: number;
  confirmationPercent?: number;
  installmentCount?: number;
  installmentAmount?: number;
  completionPercent?: number;
  effectiveFrom?: string;
  availability?: UnitAvailability;
  active: boolean;
  approved: boolean;
}

// IMPORTANT: Do not paste live WordPress prices into production without management/finance approval.
// Populate this array only from the approved source-of-truth register.
export const UNIT_PLANS: UnitPlan[] = [];
