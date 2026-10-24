import Link from 'next/link';
import type { ReactNode } from 'react';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function TextLink({ href, children, className = '' }: TextLinkProps) {
  return <Link className={`textLink ${className}`.trim()} href={href}>{children} <span aria-hidden="true">↗</span></Link>;
}
