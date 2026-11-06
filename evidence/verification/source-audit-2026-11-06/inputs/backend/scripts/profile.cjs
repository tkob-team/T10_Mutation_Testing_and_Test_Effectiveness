// Shared entrypoint for tests, discovery, dry runs and full mutation profiles.
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { rootDir, testFiles } = require('../config/profiles.cjs');
const [mode, domain = 'overall', condition = 'baseline', ...extra] = process.argv.slice(2);
testFiles(domain, condition); // Validate before starting a child process.
if (!['test', 'list', 'dry', 'mutate'].includes(mode)) {
  throw new Error('Usage: node scripts/profile.cjs test|list|dry|mutate DOMAIN baseline|manual|ai [...args]');
}
const suffix = condition === 'baseline' ? '' : `.${condition}`;
const args = mode === 'test' || mode === 'list'
  ? [path.join(rootDir, 'node_modules/jest/bin/jest.js'), '--config', `jest.${domain}${suffix}.config.cjs`, '--runInBand', ...(mode === 'list' ? ['--listTests', '--json'] : []), ...extra]
  : [path.join(rootDir, 'node_modules/@stryker-mutator/core/bin/stryker.js'), 'run', `stryker.${domain}${suffix}.config.json`, ...(mode === 'dry' ? ['--dryRunOnly'] : []), ...extra];
const result = spawnSync(process.execPath, args, { cwd: rootDir, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 2;
