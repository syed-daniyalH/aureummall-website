import { describe, expect, it } from 'vitest';
import { getHeaderMotion } from './navigation-motion';

describe('Aureum floating navigation', () => {
  it('starts compact, expands to edges, and returns compact above', () => {
    const start = getHeaderMotion(0, 1440);
    const expanded = getHeaderMotion(0.5, 1440);
    const end = getHeaderMotion(1, 1440);
    expect(start.width).toBe(1120);
    expect(expanded.width).toBe(1416);
    expect(expanded.radius).toBe(28);
    expect(end.width).toBe(start.width);
    expect(end.top).toBeLessThan(start.top);
  });

  it('remains within each viewport at all stages', () => {
    for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
      for (let i = 0; i <= 100; i++) {
        const state = getHeaderMotion(i / 100, width);
        expect(state.width).toBeGreaterThanOrEqual(0);
        expect(state.width).toBeLessThanOrEqual(width);
        if (width <= 768) expect(state.width).toBe(width - 24);
      }
    }
  });

  it('reverses without state or scroll-direction dependency', () => {
    expect(getHeaderMotion(0.28, 1280)).toEqual(getHeaderMotion(0.28, 1280));
  });
});
