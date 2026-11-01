'use client';

import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RESIDENCE_CLIPS } from '../images';

/**
 * A silent looping clip that only plays while it is on screen. Visitors who prefer reduced motion see its first frame.
 */
function LoopingClip({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} src={`${src}#t=0.1`} muted loop playsInline preload="metadata" disablePictureInPicture aria-label={label} />;
}

export function ResidenceWalkthrough() {
  return (
    <section className="section walkthroughSection" aria-labelledby="walkthrough-heading">
      <div className="container">
        <SectionHeading id="walkthrough-heading" eyebrow="Step inside" title="From the corridor to your living room." description="A short walk through a typical residential floor, from the lift lobby corridor to the open living and dining space." />
        <ol className="walkthroughGrid">
          {RESIDENCE_CLIPS.map((clip, index) => (
            <li key={clip.src} className="walkthroughItem">
              <div className="walkthroughMedia">
                <LoopingClip src={clip.src} label={clip.label} />
                <span className="walkthroughStep" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{clip.label}</h3>
              <p>{clip.detail}</p>
            </li>
          ))}
        </ol>
        <p className="showcaseNote">Interior impressions. Finishes, furniture and fit-out are illustrative.</p>
      </div>
    </section>
  );
}
