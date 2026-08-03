import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../lib';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, 'aria-invalid': ariaInvalid, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('ui-input', className)}
      aria-invalid={(ariaInvalid ?? invalid) || undefined}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
