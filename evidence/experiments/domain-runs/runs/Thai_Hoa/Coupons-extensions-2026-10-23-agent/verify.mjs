import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const evidence = path.dirname(fileURLToPath(import.meta.url));
const inputs = JSON.parse(fs.readFileSync(path.join(evidence, 'inputs.json'), 'utf8').replace(/^\uFEFF/, ''));
const cwd = path.join(inputs.runtime, 'backend');
const jest = path.join(cwd, 'node_modules/jest/bin/jest.js');
const stryker = path.join(cwd, 'node_modules/@stryker-mutator/core/bin/stryker.js');

async function run(name, args) {
  const startedAt = new Date().toISOString();
  const start = performance.now();
  const log = fs.openSync(path.join(evidence, name + '.log'), 'w');
  const child = spawn(process.execPath, args, { cwd, windowsHide: true, stdio: ['ignore', log, log] });
  const { code, signal } = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve({ code, signal }));
  });
  fs.closeSync(log);
  const result = { name, executable: process.execPath, args, cwd, startedAt,
    endedAt: new Date().toISOString(), durationMs: Math.round(performance.now() - start), code, signal,
    nodeVersion: process.version };
  fs.writeFileSync(path.join(evidence, name + '.meta.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
  if (code !== 0) throw new Error(name + ' failed; inspect retained log');
}

if (process.argv[2] === 'tests') {
  await run('baseline-tests', [jest, '--runInBand', '--json', '--outputFile', path.join(evidence, 'baseline-tests.json')]);
  for (const variant of ['manual', 'ai']) {
    await run(variant + '-tests', [jest, '--config', 'jest.coupons.' + variant + '.config.cjs',
      '--runInBand', '--json', '--outputFile', path.join(evidence, variant + '-tests.json')]);
  }
} else if (['manual', 'ai'].includes(process.argv[2])) {
  const variant = process.argv[2];
  await run(variant + '-mutation', [stryker, 'run', 'stryker.coupons.' + variant + '.config.json']);
  for (const extension of ['json', 'html']) {
    fs.copyFileSync(path.join(cwd, 'reports/coupons-' + variant, 'mutation.' + extension),
      path.join(evidence, variant + '-mutation.' + extension));
  }
} else {
  throw new Error('Usage: node verify.mjs tests|manual|ai');
}
