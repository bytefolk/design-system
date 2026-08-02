import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn('ui-page-header', className)} {...props}>
      <div className="ui-page-header__copy">
        {eyebrow ? <div className="ui-page-header__eyebrow">{eyebrow}</div> : null}
        <h1 className="ui-page-header__title">{title}</h1>
        {description ? <p className="ui-page-header__description">{description}</p> : null}
        {meta ? <div className="ui-page-header__meta">{meta}</div> : null}
      </div>
      {actions ? <div className="ui-page-header__actions">{actions}</div> : null}
    </header>
  );
}
