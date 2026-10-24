import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'children' | 'className'> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'nav';
  className?: string;
};

const variantClasses = {
  primary: 'button primary',
  secondary: 'button secondary',
  dark: 'button darkButton',
  nav: 'navCta',
} as const;

export function ButtonLink({ href, children, variant = 'primary', className = '', ...linkProps }: ButtonLinkProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();
  return <Link className={classes} href={href} {...linkProps}>{children}</Link>;
}
