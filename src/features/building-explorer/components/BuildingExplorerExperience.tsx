import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PriceCalculator } from '@/features/payment-plans/components/PriceCalculator';
import { ProjectDisclaimers } from '@/features/project-showcase/components/ProjectShowcase';
import { BuildingExplorer } from './BuildingExplorer';

export function BuildingExplorerExperience() {
  return (
    <>
      <section className="section explorerHero">
        <div className="container explorerHeroGrid">
          <div>
            <Eyebrow>Building explorer</Eyebrow>
            <h1>See Aureum, level by level.</h1>
            <p>From two basements of parking, through three retail floors and the food court, to the hotel, offices and residences above.</p>
            <ButtonLink href="#explorer-workspace">Explore the levels <span aria-hidden="true">↓</span></ButtonLink>
          </div>
          <div className="explorerHeroStamp" aria-hidden="true"><span>Basements to 12th floor</span><strong>B2–12</strong></div>
        </div>
      </section>
      <section className="section explorerSection" id="explorer-workspace" aria-labelledby="explorer-heading">
        <div className="container">
          <SectionHeading id="explorer-heading" eyebrow="Choose a level" title="What is on every floor." description="Choose a level to see what is there, its floor plan and the base price of every unit." />
          <BuildingExplorer />
        </div>
      </section>
      <section className="section calcSection" aria-labelledby="explorer-prices-heading">
        <div className="container">
          <SectionHeading id="explorer-prices-heading" eyebrow="Prices & payment plan" title="Work out the payment plan." description="Choose a unit to see its base price and every instalment, from booking to possession." />
          <PriceCalculator />
        </div>
      </section>
      <ProjectDisclaimers />
    </>
  );
}
