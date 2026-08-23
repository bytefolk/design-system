import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

const preset = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  theme: {
    extend: {
      colors: {
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
          hover: 'var(--ui-primary-hover)',
          foreground: 'var(--ui-primary-foreground)',
          soft: 'var(--ui-primary-soft)',
        },
        ai: {
          DEFAULT: 'var(--ui-ai)',
          strong: 'var(--ui-ai-strong)',
          hover: 'var(--ui-ai-hover)',
          foreground: 'var(--ui-ai-foreground)',
          soft: 'var(--ui-ai-soft)',
        },
        info: {
          DEFAULT: 'var(--ui-info)',
          soft: 'var(--ui-info-soft)',
        },
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
        danger: {
          DEFAULT: 'var(--ui-danger)',
          soft: 'var(--ui-danger-soft)',
        },
        overlay: 'var(--ui-overlay)',
        focus: 'var(--ui-focus)',
        selection: 'var(--ui-selection)',
      },
      fontFamily: {
        sans: ['var(--ui-font-sans)'],
        mono: ['var(--ui-font-mono)'],
      },
      fontSize: {
        xs: 'var(--ui-text-xs)',
        sm: 'var(--ui-text-sm)',
        base: 'var(--ui-text-base)',
        lg: 'var(--ui-text-lg)',
        xl: 'var(--ui-text-xl)',
        '2xl': 'var(--ui-text-2xl)',
      },
      lineHeight: {
        tight: 'var(--ui-leading-tight)',
        normal: 'var(--ui-leading-normal)',
      },
      spacing: {
        1: 'var(--ui-space-1)',
        2: 'var(--ui-space-2)',
        3: 'var(--ui-space-3)',
        4: 'var(--ui-space-4)',
        5: 'var(--ui-space-5)',
        6: 'var(--ui-space-6)',
        8: 'var(--ui-space-8)',
        10: 'var(--ui-space-10)',
        12: 'var(--ui-space-12)',
      },
      borderRadius: {
        sm: 'var(--ui-radius-sm)',
        md: 'var(--ui-radius-md)',
        lg: 'var(--ui-radius-lg)',
        xl: 'var(--ui-radius-xl)',
        full: 'var(--ui-radius-full)',
      },
      boxShadow: {
        sm: 'var(--ui-shadow-sm)',
        md: 'var(--ui-shadow-md)',
        lg: 'var(--ui-shadow-lg)',
      },
      transitionDuration: {
        fast: 'var(--ui-duration-fast)',
        normal: 'var(--ui-duration-normal)',
      },
      transitionTimingFunction: {
        ui: 'var(--ui-ease)',
      },
      width: {
        rail: 'var(--ui-rail-width)',
        sidebar: 'var(--ui-sidebar-width)',
        sidebarWide: 'var(--ui-sidebar-wide)',
      },
      height: {
        topbar: 'var(--ui-topbar-height)',
      },
    },
  },
  plugins: [forms],
} satisfies Config;

export default preset;
