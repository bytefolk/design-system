/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const uiPresetModule = require('@fullstack-ai-infra/ui/tailwind-preset');

const uiPreset = uiPresetModule.default || uiPresetModule;

if (!uiPreset?.theme?.extend?.colors?.ai) {
  throw new Error('CommonJS consumer could not load the shared AI token');
}

process.stdout.write('CommonJS Tailwind preset loaded.\n');
