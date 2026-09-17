import { Input as AntInput, type InputRef } from 'antd';
import { forwardRef, useCallback, type InputHTMLAttributes } from 'react';

import { cn } from '../lib';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    const forwardNativeInput = useCallback(
      (handle: InputRef | null) => {
        const input = handle?.input ?? null;
        if (typeof ref === 'function') ref(input);
        else if (ref) ref.current = input;
      },
      [ref],
    );

    return (
      <AntInput
        ref={forwardNativeInput}
        className={cn('ui-input', className)}
        status={invalid ? 'error' : undefined}
        aria-invalid={(ariaInvalid ?? invalid) || undefined}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
