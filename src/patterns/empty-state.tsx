import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
}

/** One empty collection or panel: one title, optional explanation and next action.
 * Loading, errors, permissions and product copy stay with the consumer. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn('ui-empty-state', compact && 'ui-empty-state--compact', className)}
      {...props}
    >
      {icon ? (
        <div className="ui-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className="ui-empty-state__title">{title}</h3>
      {description ? <div className="ui-empty-state__description">{description}</div> : null}
      {action ? <div className="ui-empty-state__action">{action}</div> : null}
    </div>
  );
}
