import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';

import { cn } from '../lib';

/**
 * The shared select entry point. It deliberately keeps Ant Design's option
 * model intact while making sizing, invalid state and the stable ui-select
 * hook part of the product contract.
 */
export interface SelectProps<ValueType = unknown> extends AntSelectProps<ValueType> {
  invalid?: boolean;
}

export function Select<ValueType = unknown>({
  className,
  invalid,
  status,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectProps<ValueType>) {
  return (
    <AntSelect<ValueType>
      className={cn('ui-select', className)}
      status={invalid ? 'error' : status}
      aria-invalid={(ariaInvalid ?? invalid) || undefined}
      {...props}
    />
  );
}
