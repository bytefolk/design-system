import { Tag } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../lib';

const badgeVariants = cva('ui-badge', {
  variants: {
    tone: {
      neutral: 'ui-badge--neutral',
      success: 'ui-badge--success',
      warning: 'ui-badge--warning',
      danger: 'ui-badge--danger',
      ai: 'ui-badge--ai',
      info: 'ui-badge--info',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

const antdColorByTone = {
  neutral: 'default',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  ai: 'purple',
  info: 'processing',
} as const;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <Tag
      color={antdColorByTone[tone ?? 'neutral']}
      className={cn(badgeVariants({ tone }), className)}
      {...props}
    />
  );
}
