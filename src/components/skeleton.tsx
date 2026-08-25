import { Skeleton as AntSkeleton } from 'antd';
import type { HTMLAttributes } from 'react';

import { cn } from '../lib';

export function Skeleton({
  className,
  'aria-label': ariaLabel,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('ui-skeleton', className)}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
      {...props}
    >
      <AntSkeleton active paragraph={{ rows: 1 }} title={false} />
    </div>
  );
}
