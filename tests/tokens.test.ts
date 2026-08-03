import fs from 'node:fs';
import path from 'node:path';

import preset from '../src/tailwind-preset';

const tokens = fs.readFileSync(path.resolve('src/styles/tokens.css'), 'utf8');

function token(name: string): string {
  const match = tokens.match(new RegExp(`--ui-${name}:\\s*(#[0-9a-f]{6})`));
  if (!match?.[1]) throw new Error(`Missing hex token: ${name}`);
  return match[1];
}

function luminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function contrast(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe('semantic token contract', () => {
  it('ships the frozen C color roles in light and dark themes', () => {
    expect(tokens).toContain("[data-theme='light']");
    expect(tokens).toContain("[data-theme='dark']");
    expect(tokens).toContain('--ui-canvas: #f5f1e8');
    expect(tokens).toContain('--ui-primary: #5f735e');
    expect(tokens).toContain('--ui-ai: #7568a8');
    expect(tokens.match(/--ui-canvas:/g)).toHaveLength(3);
  });

  it('turns off design-system motion when the user requests reduced motion', () => {
    expect(tokens).toContain('@media (prefers-reduced-motion: reduce)');
    expect(tokens).toContain('--ui-duration-normal: 0ms');
    expect(tokens).toContain('animation-duration: 0.01ms !important');
  });

  it('maps Tailwind utilities onto semantic variables instead of brand literals', () => {
    expect(preset.theme?.extend?.colors).toMatchObject({
      canvas: {
        DEFAULT: 'var(--ui-canvas)',
        subtle: 'var(--ui-canvas-subtle)',
      },
      navigation: 'var(--ui-navigation)',
      surface: {
        DEFAULT: 'var(--ui-surface)',
        raised: 'var(--ui-surface-raised)',
        inset: 'var(--ui-surface-inset)',
      },
      foreground: {
        DEFAULT: 'var(--ui-foreground)',
        muted: 'var(--ui-foreground-muted)',
        subtle: 'var(--ui-foreground-subtle)',
      },
      border: {
        DEFAULT: 'var(--ui-border)',
        strong: 'var(--ui-border-strong)',
      },
      primary: {
        DEFAULT: 'var(--ui-primary)',
        soft: 'var(--ui-primary-soft)',
      },
      ai: {
        DEFAULT: 'var(--ui-ai)',
        strong: 'var(--ui-ai-strong)',
        soft: 'var(--ui-ai-soft)',
      },
      info: { DEFAULT: 'var(--ui-info)', soft: 'var(--ui-info-soft)' },
      success: {
        DEFAULT: 'var(--ui-success)',
        strong: 'var(--ui-success-strong)',
        soft: 'var(--ui-success-soft)',
      },
      warning: {
        DEFAULT: 'var(--ui-warning)',
        strong: 'var(--ui-warning-strong)',
        soft: 'var(--ui-warning-soft)',
      },
      danger: { DEFAULT: 'var(--ui-danger)', soft: 'var(--ui-danger-soft)' },
    });

    const mappedColors = JSON.stringify(preset.theme?.extend?.colors);
    const semanticColorTokens = [
      'canvas',
      'canvas-subtle',
      'navigation',
      'surface',
      'surface-raised',
      'surface-inset',
      'foreground',
      'foreground-muted',
      'foreground-subtle',
      'border',
      'border-strong',
      'primary',
      'primary-hover',
      'primary-foreground',
      'primary-soft',
      'ai',
      'ai-strong',
      'ai-hover',
      'ai-foreground',
      'ai-soft',
      'info',
      'info-soft',
      'success',
      'success-strong',
      'success-soft',
      'warning',
      'warning-strong',
      'warning-soft',
      'danger',
      'danger-soft',
      'overlay',
      'focus',
      'selection',
    ];
    for (const semanticToken of semanticColorTokens) {
      expect(mappedColors, `Tailwind mapping for --ui-${semanticToken}`).toContain(
        `var(--ui-${semanticToken})`,
      );
    }

    expect(preset.theme?.extend).toMatchObject({
      fontSize: { xs: 'var(--ui-text-xs)', '2xl': 'var(--ui-text-2xl)' },
      lineHeight: { tight: 'var(--ui-leading-tight)', normal: 'var(--ui-leading-normal)' },
      spacing: { 1: 'var(--ui-space-1)', 12: 'var(--ui-space-12)' },
      borderRadius: { sm: 'var(--ui-radius-sm)', full: 'var(--ui-radius-full)' },
      boxShadow: { sm: 'var(--ui-shadow-sm)', lg: 'var(--ui-shadow-lg)' },
      transitionDuration: {
        fast: 'var(--ui-duration-fast)',
        normal: 'var(--ui-duration-normal)',
      },
      transitionTimingFunction: { ui: 'var(--ui-ease)' },
      width: { rail: 'var(--ui-rail-width)', sidebar: 'var(--ui-sidebar-width)' },
      height: { topbar: 'var(--ui-topbar-height)' },
    });
  });

  it('keeps light-theme text and compact status pairs at WCAG AA contrast', () => {
    const pairs = [
      ['foreground', 'canvas'],
      ['foreground-muted', 'canvas'],
      ['foreground-subtle', 'canvas'],
      ['primary-foreground', 'primary'],
      ['ai-foreground', 'ai'],
      ['ai-strong', 'ai-soft'],
      ['success-strong', 'success-soft'],
      ['warning-strong', 'warning-soft'],
      ['danger', 'danger-soft'],
      ['info', 'info-soft'],
    ] as const;

    for (const [foreground, background] of pairs) {
      expect(
        contrast(token(foreground), token(background)),
        `${foreground} on ${background}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
