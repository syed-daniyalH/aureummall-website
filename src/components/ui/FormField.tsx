import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export function FormField({ label, children }: FormFieldProps) {
  return <label className="formField">{label}{children}</label>;
}
