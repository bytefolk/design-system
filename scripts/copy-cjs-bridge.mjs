import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await Promise.all([
  copyFile(
    path.join(repositoryRoot, 'src/tailwind-preset-require.cjs'),
    path.join(repositoryRoot, 'dist/tailwind-preset-require.cjs'),
  ),
  copyFile(
    path.join(repositoryRoot, 'src/tailwind-preset-require.d.cts'),
    path.join(repositoryRoot, 'dist/tailwind-preset-require.d.cts'),
  ),
]);
