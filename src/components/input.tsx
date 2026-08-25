import { Input as AntInput, type InputRef } from 'antd';
import { forwardRef, type InputHTMLAttributes, type Ref } from 'react';

import { cn } from '../lib';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, 'aria-invalid': ariaInvalid, ...props }, ref) => (
    <AntInput
      ref={ref as Ref<InputRef>}
      className={cn('ui-input', className)}
      status={invalid ? 'error' : undefined}
      aria-invalid={(ariaInvalid ?? invalid) || undefined}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
