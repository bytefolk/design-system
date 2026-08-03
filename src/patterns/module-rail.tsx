import type { KeyboardEvent, ReactNode } from 'react';

import { cn } from '../lib';

export interface ModuleRailItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  href?: string;
  onSelect?: () => void;
}

export interface ModuleRailProps {
  items: ModuleRailItem[];
  label?: string;
  brand?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function focusRelativeItem(event: KeyboardEvent<HTMLElement>) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[data-ui-module-item]'),
  );
  const currentIndex = items.indexOf(document.activeElement as HTMLElement);
  let nextIndex = currentIndex;

  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = items.length - 1;
  if (event.key === 'ArrowDown') nextIndex = (Math.max(currentIndex, -1) + 1) % items.length;
  if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length;

  event.preventDefault();
  items[nextIndex]?.focus();
}

export function ModuleRail({
  items,
  label = 'Products',
  brand,
  footer,
  className,
}: ModuleRailProps) {
  return (
    <nav
      className={cn('ui-module-rail', className)}
      aria-label={label}
      onKeyDown={focusRelativeItem}
    >
      {brand ? <div className="ui-module-rail__brand">{brand}</div> : null}
      <div className="ui-module-rail__items">
        {items.map((item) => {
          const common = {
            className: cn('ui-module-rail__item', item.active && 'is-active'),
            'data-ui-module-item': true,
            'aria-label': item.label,
            'aria-current': item.active ? ('page' as const) : undefined,
            onClick: item.onSelect,
          };
          const content = (
            <>
              <span className="ui-module-rail__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="ui-module-rail__label">{item.label}</span>
            </>
          );

          return item.href ? (
            <a key={item.id} href={item.href} {...common}>
              {content}
            </a>
          ) : (
            <button key={item.id} type="button" {...common}>
              {content}
            </button>
          );
        })}
      </div>
      {footer ? <div className="ui-module-rail__footer">{footer}</div> : null}
    </nav>
  );
}
