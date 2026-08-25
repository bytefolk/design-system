import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Drift guard: file: consumers (e.g. org-workbench) read dist/ directly, so
// the built CSS must expose every token variable from src/styles/tokens.css.
// A stale dist silently forces consumers onto literal fallbacks.
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokensCss = readFileSync(path.join(repositoryRoot, 'src/styles/tokens.css'), 'utf8');
const distCss = readFileSync(path.join(repositoryRoot, 'dist/index.css'), 'utf8');

const variables = [...new Set(tokensCss.matchAll(/--ui-[a-z0-9-]+/g))].map((match) => match[0]);

const missing = variables.filter((name) => !distCss.includes(name));
if (missing.length > 0) {
  console.error(`dist/index.css is missing token variables: ${missing.join(', ')}`);
  console.error('Run "npm run build" and reinstall file: consumers before publishing.');
  process.exit(1);
}

console.log(`Dist tokens drift check passed: ${variables.length} token variables intact.`);
