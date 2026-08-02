import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixtureRoot = path.join(repositoryRoot, 'tests/fixtures/pack-consumer');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    // `npm publish --dry-run` exports npm_config_dry_run=true to lifecycle
    // scripts. This fixture must still materialize and install its disposable
    // tarball so the publish preflight exercises the real consumer contract.
    env: { ...process.env, NO_COLOR: '1', npm_config_dry_run: 'false' },
  });

  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }

  return result.stdout;
}

const consumerRoot = await mkdtemp(path.join(tmpdir(), 'fullstack-ai-ui-consumer-'));

try {
  await cp(fixtureRoot, consumerRoot, { recursive: true });
  const packOutput = run(
    npmCommand,
    ['pack', '--dry-run=false', '--json', '--pack-destination', consumerRoot],
    repositoryRoot,
  );
  const [{ filename }] = JSON.parse(packOutput);

  run(
    npmCommand,
    ['install', '--ignore-scripts', '--no-audit', '--no-fund', `./${filename}`],
    consumerRoot,
  );
  run(npmCommand, ['exec', 'tsc', '--', '--noEmit'], consumerRoot);
  run(process.execPath, ['./src/runtime.mjs'], consumerRoot);
  run(process.execPath, ['./src/runtime.cjs'], consumerRoot);

  const installedFiles = await readdir(
    path.join(consumerRoot, 'node_modules/@fullstack-ai-infra/ui/dist'),
  );
  if (
    !installedFiles.includes('index.d.ts') ||
    !installedFiles.includes('index.cjs') ||
    !installedFiles.includes('tailwind-preset.d.ts') ||
    !installedFiles.includes('tailwind-preset.cjs')
  ) {
    throw new Error('Packed consumer is missing public declaration files');
  }

  process.stdout.write('Packed consumer: install, TypeScript, and runtime preset checks passed.\n');
} finally {
  await rm(consumerRoot, { recursive: true, force: true });
}
