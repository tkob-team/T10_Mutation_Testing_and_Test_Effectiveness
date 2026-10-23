import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const inputs = read(path.join(root, 'inputs.json'));
const historical = path.join(root, '../D04-merge-2026-10-23-agent');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const normalize = source => source.replace(/\r\n/g, '\n');
const signature = mutant => JSON.stringify([
  mutant.location, mutant.mutatorName, mutant.replacement,
]);
function loadReport(file) {
  const report = read(file);
  const entries = Object.entries(report.files);
  if (entries.length !== 1 || !entries[0][0].endsWith('server.js')) throw new Error('Unexpected mutation scope');
  const [, value] = entries[0];
  const bySignature = new Map(value.mutants.map(mutant => [signature(mutant), mutant]));
  if (bySignature.size !== value.mutants.length) throw new Error('Duplicate mutant signature');
  return { source: normalize(value.source), mutants: value.mutants, bySignature };
}
function compare(before, after) {
  const transitions = [];
  for (const mutant of after.mutants) {
    const previous = before.bySignature.get(signature(mutant));
    if (!previous) throw new Error('Unmatched mutant ' + mutant.id);
    if (previous.status !== mutant.status) transitions.push({
      id: mutant.id, line: mutant.location.start.line, mutator: mutant.mutatorName,
      replacement: mutant.replacement, before: previous.status, after: mutant.status, killedBy: mutant.killedBy,
    });
  }
  if (before.source !== after.source || before.mutants.length !== after.mutants.length) throw new Error('Changed production or mutant universe');
  return { matched: after.mutants.length, sourceEqual: true, transitions };
}
const baseline = loadReport(path.join(historical, 'frozen-coupons-baseline/mutation.json'));
const result = { frozenCommit: inputs.frozenCommit, profiles: {}, protectedFiles: [], frozenInputFiles: [], overlay: [] };
for (const variant of ['manual', 'ai']) {
  const current = loadReport(path.join(root, variant + '-mutation.json'));
  const previous = loadReport(path.join(historical, variant === 'manual' ? 'f02-mutation/mutation.json' : 'g02-mutation/mutation.json'));
  const counts = {};
  for (const mutant of current.mutants) counts[mutant.status] = (counts[mutant.status] || 0) + 1;
  const testRun = read(path.join(root, variant + '-tests.json'));
  result.profiles[variant] = { testsPassed: testRun.numPassedTests, testsFailed: testRun.numFailedTests,
    counts, baseline: compare(baseline, current), previousVariant: compare(previous, current) };
}
for (const item of read(path.join(root, 'protected-before.json'))) {
  const after = hash(path.join(inputs.sut, item.path));
  if (after !== item.sha256.toLowerCase()) throw new Error('Protected file changed: ' + item.path);
  result.protectedFiles.push({ path: item.path, sha256: after, unchanged: true });
}
for (const relative of inputs.overlay) {
  const current = hash(path.join(inputs.sut, relative));
  if (current !== hash(path.join(inputs.runtime, relative)) || current !== hash(path.join(root, 'sources', relative))) {
    throw new Error('Overlay snapshot differs: ' + relative);
  }
  result.overlay.push({ path: relative, sha256: current });
}
for (const relative of ['backend/server.js', 'backend/database.js', 'backend/database.sqlite']) {
  const frozen = execFileSync('git', ['show', inputs.frozenCommit + ':' + relative], { cwd: inputs.sut });
  const runtime = fs.readFileSync(path.join(inputs.runtime, relative));
  const byteEqual = frozen.equals(runtime);
  const textEqual = !relative.endsWith('.sqlite') && normalize(frozen.toString('utf8')) === normalize(runtime.toString('utf8'));
  if (!byteEqual && !textEqual) throw new Error('Runtime differs from frozen production: ' + relative);
  result.frozenInputFiles.push({ path: relative, byteEqual, normalizedTextEqual: textEqual,
    gitBytes: frozen.length, runtimeBytes: runtime.length,
    note: byteEqual ? 'Byte-identical' : 'LF git blob versus CRLF archive/checkout; text otherwise identical' });
}
fs.writeFileSync(path.join(root, 'comparison.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
