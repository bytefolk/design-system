/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const resolveConfig = require('tailwindcss/resolveConfig');
const uiPreset = require('@fullstack-ai-infra/ui/tailwind-preset');

if (!uiPreset?.theme?.extend?.colors?.ai) {
  throw new Error('CommonJS consumer could not load the shared AI token');
}

const resolved = resolveConfig({ content: [], presets: [uiPreset] });
if (!resolved.theme.colors.ai || resolved.plugins.length !== 1) {
  throw new Error('Tailwind 3 could not resolve the CommonJS preset contract');
}

process.stdout.write('CommonJS Tailwind preset loaded.\n');
