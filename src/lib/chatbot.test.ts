import { describe, expect, it } from 'vitest';
import { departmentForInterest, normalizeChatbotPhone } from '@/lib/chatbot';

describe('chatbot routing', () => {
  it('routes residential interests to Residential Sales', () => {
    expect(departmentForInterest('studio')).toBe('Residential Sales');
    expect(departmentForInterest('one_bed_apartment')).toBe('Residential Sales');
    expect(departmentForInterest('two_bed_apartment')).toBe('Residential Sales');
  });

  it('routes commercial interests to Commercial Sales', () => {
    expect(departmentForInterest('commercial')).toBe('Commercial Sales');
    expect(departmentForInterest('office')).toBe('Commercial Sales');
    expect(departmentForInterest('food_court_space')).toBe('Commercial Sales');
  });

  it('normalizes Pakistan numbers with a plus prefix', () => {
    expect(normalizeChatbotPhone('0092 300-1234567')).toBe('+923001234567');
  });
});
