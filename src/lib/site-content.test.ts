import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SEO_ROUTE_CONTRACTS } from '@/features/content-seo/data';
import { getAllPosts, postImage } from '@/features/news/posts';
import { PAYMENT_PLAN_PAGES } from '@/features/payment-plans/plan-pages';
import { APARTMENT_TYPES, DEVELOPER, LEADERSHIP, TEAM, visibleTeam } from './project-facts';

const publicFile = (path: string) => existsSync(join(process.cwd(), 'public', path));

describe('images referenced by the content exist', () => {
  it.each([...LEADERSHIP.flatMap((leader) => [leader.image.src, ...(leader.inset ? [leader.inset.src] : [])]), ...DEVELOPER.portfolio.map((project) => project.image), DEVELOPER.logo, ...TEAM.flatMap((member) => (member.image ? [member.image] : []))])('%s', (src) => {
    expect(publicFile(src)).toBe(true);
  });

  it('every blog post has a cover image on disk', () => {
    for (const post of getAllPosts()) {
      const image = postImage(post);
      expect(image, post.slug).toBeDefined();
      expect(publicFile(image!), image).toBe(true);
    }
  });
});

describe('team', () => {
  it('has unique ids', () => {
    expect(new Set(TEAM.map((member) => member.id)).size).toBe(TEAM.length);
  });

  it('never publishes anyone without a name outside local development', () => {
    // Vitest runs with NODE_ENV=test, like a production build, so placeholders must be filtered out.
    expect(visibleTeam().every((member) => member.name)).toBe(true);
    expect(visibleTeam().length).toBe(TEAM.filter((member) => member.name).length);
  });
});

describe('apartment types', () => {
  it('each type matches at least one unit in the price list', async () => {
    const { PRICED_UNITS } = await import('@/features/payment-plans/units');
    for (const type of APARTMENT_TYPES) {
      expect(PRICED_UNITS.some((unit) => unit.table.id === 'apartments' && unit.row.type === type.rowType), type.id).toBe(true);
    }
  });
});

describe('SEO', () => {
  it('has a unique route, title and description for every contract', () => {
    for (const key of ['route', 'title', 'description'] as const) {
      expect(new Set(SEO_ROUTE_CONTRACTS.map((contract) => contract[key])).size, key).toBe(SEO_ROUTE_CONTRACTS.length);
    }
  });

  it('keeps descriptions within the length Google shows', () => {
    for (const contract of SEO_ROUTE_CONTRACTS) expect(contract.description.length, contract.route).toBeLessThanOrEqual(165);
  });

  it('covers every payment plan page and the team page', () => {
    const routes = new Set(SEO_ROUTE_CONTRACTS.map((contract) => contract.route));
    for (const page of PAYMENT_PLAN_PAGES) expect(routes.has(page.href), page.href).toBe(true);
    expect(routes.has('/team')).toBe(true);
  });
});
