'use client';

import { useEffect, useRef, type CSSProperties, type FocusEvent, type ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: 'div' | 'section' | 'li' | 'article';
};

let revealObserver: IntersectionObserver | undefined;

function getRevealObserver() {
  revealObserver ??= new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!entry.target.matches(':focus-within')) entry.target.classList.add('isVisible');
        observer.unobserve(entry.target);
      }
    }
  });
  return revealObserver;
}

export function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div' }: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = getRevealObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <Tag
      ref={(element: HTMLElement | null) => { ref.current = element; }}
      onFocus={({ currentTarget }: FocusEvent<HTMLElement>) => currentTarget.classList.remove('isVisible')}
      className={`reveal ${className}`.trim()}
      style={{ '--reveal-delay': `${delay * 45}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
