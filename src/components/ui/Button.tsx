import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
};

const variantClasses = {
  primary: 'button primary',
  secondary: 'button secondary',
  dark: 'button darkButton',
} as const;

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${variantClasses[variant]} ${className}`.trim()} {...props}>{children}</button>;
}
