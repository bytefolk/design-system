// Extract design-system semantic tokens (tokens.css) into W3C Design Tokens JSON (light+dark modes)
// Usage: node extract-tokens.mjs <tokens.css> <output.json>
import { readFileSync, writeFileSync } from 'node:fs';

const [, , cssPath, outPath] = process.argv;
const css = readFileSync(cssPath, 'utf8');

function extractBlock(css, selector) {
  const re = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}', 's');
  const m = css.match(re);
  if (!m) return {};
  const vars = {};
  const varRe = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
  let mm;
  while ((mm = varRe.exec(m[1]))) vars[mm[1]] = mm[2].trim();
  return vars;
}

const light = extractBlock(css, ":root,\n[data-theme='light']");
const dark = extractBlock(css, "[data-theme='dark']");

function classify(name) {
  const n = name.replace(/^ui-/, '');
  if (
    /^(canvas|navigation|surface|foreground|border|primary|ai|info|success|warning|danger|overlay|focus|selection)/.test(
      n,
    )
  )
    return 'color';
  if (/^font-(sans|mono)$/.test(n)) return 'fontFamily';
  if (/^text-/.test(n)) return 'fontSize';
  if (/^leading-/.test(n)) return 'lineHeight';
  if (/^(space-|rail-width|sidebar-width|topbar-height)/.test(n)) return 'dimension';
  if (/^radius-/.test(n)) return 'borderRadius';
  if (/^shadow-/.test(n)) return 'boxShadow';
  if (/^duration-/.test(n)) return 'duration';
  if (/^ease$/.test(n)) return 'timingFunction';
  return 'other';
}

const groups = {};
for (const key of Object.keys(light)) {
  const group = classify(key);
  const short = key.replace(/^ui-/, '');
  const isColor = group === 'color';
  const darkVal = dark[key];
  const value =
    darkVal && darkVal !== light[key] ? { light: light[key], dark: darkVal } : light[key];
  groups[group] ??= {};
  groups[group][short] = {
    $type: group,
    $value: value,
  };
}

const out = {
  $schema: 'https://design-tokens.github.io/community-group/format/',
  name: '@fullstack-ai-infra/ui',
  description:
    'Warm Agent Workspace semantic design tokens (light+dark). Extracted from design-system/src/styles/tokens.css on 2026-08-23 by Design Lead.',
  tokens: groups,
};

writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(
  `Wrote ${outPath}: ${Object.keys(groups).length} groups, ${Object.keys(light).length} tokens (light), ${Object.keys(dark).length} tokens (dark).`,
);
