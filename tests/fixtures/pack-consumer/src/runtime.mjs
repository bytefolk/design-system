import preset from '@fullstack-ai-infra/ui/tailwind-preset';

if (!Array.isArray(preset.plugins) || preset.plugins.length !== 1) {
  throw new Error('The installed Tailwind preset did not load its forms plugin');
}

if (import.meta.resolve('@fullstack-ai-infra/ui/styles.css').length === 0) {
  throw new Error('The installed package did not resolve its stylesheet export');
}
