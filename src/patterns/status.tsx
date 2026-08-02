import { CircleCheck, CircleDashed, CircleOff, Sparkles, TriangleAlert } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib';

export type AIStatusState = 'idle' | 'thinking' | 'ready' | 'review';

const aiCopy: Record<AIStatusState, string> = {
  idle: 'AI available',
  thinking: 'AI is working',
  ready: 'AI result ready',
  review: 'Needs human review',
};

export interface AIStatusProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  state: AIStatusState;
  label?: string;
}

export function AIStatus({ state, label = aiCopy[state], className, ...props }: AIStatusProps) {
  return (
    <span
      className={cn('ui-status ui-status--ai', `is-${state}`, className)}
      role="status"
      aria-label={label}
      aria-live={state === 'thinking' || state === 'review' ? 'polite' : 'off'}
      {...props}
    >
      <Sparkles aria-hidden="true" size={14} />
      {label}
    </span>
  );
}

export type SourceStatusState = 'available' | 'syncing' | 'offline' | 'error';

const sourceCopy: Record<SourceStatusState, string> = {
  available: 'Source available',
  syncing: 'Source syncing',
  offline: 'Source offline',
  error: 'Source needs attention',
};

const sourceIcon: Record<SourceStatusState, ReactNode> = {
  available: <CircleCheck aria-hidden="true" size={14} />,
  syncing: <CircleDashed aria-hidden="true" size={14} />,
  offline: <CircleOff aria-hidden="true" size={14} />,
  error: <TriangleAlert aria-hidden="true" size={14} />,
};

export interface SourceStatusProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  state: SourceStatusState;
  label?: string;
}

export function SourceStatus({
  state,
  label = sourceCopy[state],
  className,
  ...props
}: SourceStatusProps) {
  return (
    <span
      className={cn('ui-status ui-status--source', `is-${state}`, className)}
      role="status"
      aria-label={label}
      aria-live={state === 'error' ? 'assertive' : 'off'}
      {...props}
    >
      {sourceIcon[state]}
      {label}
    </span>
  );
}
