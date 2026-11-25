export const CHATBOT_INTERESTS = [
  'studio',
  'one_bed_apartment',
  'two_bed_apartment',
  'commercial',
  'office',
  'food_court_space',
  'other',
] as const;

export type ChatbotInterest = (typeof CHATBOT_INTERESTS)[number];

export const CHATBOT_INTEREST_LABELS: Record<ChatbotInterest, string> = {
  studio: 'Studio',
  one_bed_apartment: '1 Bed Apartment',
  two_bed_apartment: '2 Bed Apartment',
  commercial: 'Commercial',
  office: 'Office',
  food_court_space: 'Food Court Space',
  other: 'Other',
};

export type ChatbotDepartment = 'Residential Sales' | 'Commercial Sales' | 'Concierge';

export function departmentForInterest(interest: ChatbotInterest): ChatbotDepartment {
  if (interest === 'studio' || interest === 'one_bed_apartment' || interest === 'two_bed_apartment') {
    return 'Residential Sales';
  }

  if (interest === 'commercial' || interest === 'office' || interest === 'food_court_space') {
    return 'Commercial Sales';
  }

  return 'Concierge';
}

export function normalizeChatbotPhone(value: string) {
  const compact = value.trim().replace(/[\s().-]/g, '');
  if (compact.startsWith('00')) return `+${compact.slice(2)}`;
  return compact;
}
