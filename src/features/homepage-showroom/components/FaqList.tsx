import { SectionHeading } from '@/components/ui/SectionHeading';
import { HOMEPAGE_FAQS } from '../data';

export function FaqList() {
  return (
    <section className="section faqSection" aria-labelledby="faq-heading">
      <div className="container faqGrid">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions people actually ask"
          title="A clear answer is part of the design."
          description="The homepage gives visitors a direct path to the next useful piece of information."
        />
        <div className="faqList">
          {HOMEPAGE_FAQS.map((item) => (
            <details className="faqItem" key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
