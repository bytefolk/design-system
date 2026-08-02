/* eslint-disable @typescript-eslint/no-require-imports */
import uiPreset = require('@fullstack-ai-infra/ui/tailwind-preset');

if (!uiPreset.theme?.extend?.colors) {
  throw new Error('CommonJS declaration contract is missing theme colors');
}
