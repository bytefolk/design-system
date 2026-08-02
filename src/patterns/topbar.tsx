import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
}

export function Topbar({ breadcrumbs, actions, children, className, ...props }: TopbarProps) {
  return (
    <header className={cn('ui-topbar', className)} {...props}>
      <div className="ui-topbar__context">{breadcrumbs ?? children}</div>
      {actions ? <div className="ui-topbar__actions">{actions}</div> : null}
    </header>
  );
}
