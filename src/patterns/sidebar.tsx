import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode;
  footer?: ReactNode;
  label?: string;
}

export function Sidebar({
  header,
  footer,
  label = 'Workspace',
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside className={cn('ui-sidebar', className)} aria-label={label} {...props}>
      {header ? <div className="ui-sidebar__header">{header}</div> : null}
      <div className="ui-sidebar__content">{children}</div>
      {footer ? <div className="ui-sidebar__footer">{footer}</div> : null}
    </aside>
  );
}

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
  count?: number;
}

export function SidebarItem({
  icon,
  active,
  count,
  className,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <button
      type="button"
      className={cn('ui-sidebar-item', active && 'is-active', className)}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {icon ? (
        <span className="ui-sidebar-item__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="ui-sidebar-item__label">{children}</span>
      {count !== undefined ? <span className="ui-sidebar-item__count">{count}</span> : null}
    </button>
  );
}

export function SidebarSection({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-sidebar-section', className)} {...props} />;
}

export function SidebarSectionLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-sidebar-section__label', className)} {...props} />;
}
