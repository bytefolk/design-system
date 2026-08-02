import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  moduleRail: ReactNode;
  sidebar: ReactNode;
  topbar: ReactNode;
}

export function AppShell({
  moduleRail,
  sidebar,
  topbar,
  children,
  className,
  ...props
}: AppShellProps) {
  return (
    <div className={cn('ui-app-shell', className)} {...props}>
      <div className="ui-app-shell__rail">{moduleRail}</div>
      <div className="ui-app-shell__sidebar">{sidebar}</div>
      <div className="ui-app-shell__topbar">{topbar}</div>
      <main className="ui-app-shell__main" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
