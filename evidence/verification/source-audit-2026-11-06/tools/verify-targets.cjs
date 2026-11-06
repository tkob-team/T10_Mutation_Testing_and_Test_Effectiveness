// Check representative survivor kills at the assertion level in a separate copy.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { testFiles } = require('../config/profiles.cjs');
const [evidence, installedRuntime, probeRuntime, ...flags] = process.argv.slice(2);
const resume = flags.includes('--resume');
if (![evidence, installedRuntime, probeRuntime].every(value => value && path.isAbsolute(value))) {
  throw new Error('Usage: node scripts/verify-targets.cjs ABS_EVIDENCE ABS_INSTALLED_RUNTIME ABS_NEW_PROBE_RUNTIME');
}
if (fs.existsSync(probeRuntime) && !resume) throw new Error('Probe runtime must be new');
const output = path.join(evidence, 'target-verification');
if (fs.existsSync(output) && !resume) throw new Error('Target verification already exists');
const backend = path.join(probeRuntime, 'backend');
if (!resume) {
  fs.cpSync(path.join(evidence, 'inputs/backend'), backend, { recursive: true });
  fs.symlinkSync(path.join(installedRuntime, 'backend/node_modules'), path.join(backend, 'node_modules'), 'junction');
}
fs.mkdirSync(output, { recursive: true });
const base = fs.readFileSync(path.join(evidence, 'inputs/backend/server.js'), 'utf8');
const definitions = [
  { domain: 'cart-orders', line: 286, replacement: '["Stryker was here"]', original: '[]', manual: 'Kill Mutant 286:7', ai: 'AI-CO-01' },
  { domain: 'coupons', line: 474, replacement: 'max_uses_per_user && 1', original: 'max_uses_per_user || 1', manual: 'MF-01', ai: 'AI: admin limit 2 ' },
  { domain: 'auth', line: 124, replacement: 'true', original: 'role', manual: 'AM-01', ai: 'AI-U01' },
];
const identity = mutant => JSON.stringify([mutant.location.start.line, mutant.location.start.column,
  mutant.location.end.line, mutant.location.end.column, mutant.mutatorName, mutant.replacement]);
const readMutants = (domain, condition) => Object.values(JSON.parse(fs.readFileSync(path.join(evidence, 'mutation', `${domain}-${condition}`, 'mutation.json'))).files).flatMap(file => file.mutants);
function offset(position) {
  // Mutation-testing-elements report positions use one-based lines and columns.
  return base.split('\n').slice(0, position.line - 1).reduce((n, line) => n + line.length + 1, 0) + position.column - 1;
}
const results = [];
for (const target of definitions) {
  const mutant = readMutants(target.domain, 'baseline').find(candidate => candidate.location.start.line === target.line && candidate.replacement === target.replacement);
  if (!mutant || mutant.status !== 'Survived') throw new Error(`Expected baseline survivor for ${target.domain}`);
  const signature = identity(mutant);
  for (const condition of ['manual', 'ai']) {
    const candidate = readMutants(target.domain, condition).find(candidate => identity(candidate) === signature);
    if (candidate?.status !== 'Killed') throw new Error(`Expected ${condition} kill for ${target.domain}`);
  }
  const start = offset(mutant.location.start); const end = offset(mutant.location.end);
  if (base.slice(start, end) !== target.original) throw new Error(`Source location mismatch for ${target.domain}: ${base.slice(start, end)}`);
  const changed = base.slice(0, start) + mutant.replacement + base.slice(end);
  for (const version of ['original', 'mutant']) {
    fs.writeFileSync(path.join(backend, 'server.js'), version === 'original' ? base : changed);
    for (const condition of ['baseline', 'manual', 'ai']) {
      const name = `${target.domain}-${version}-${condition}`;
      const metaFile = path.join(output, name + '.meta.json');
      if (resume && fs.existsSync(metaFile)) {
        const prior = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
        if (prior.mutantSignature !== signature) throw new Error('Stored target signature differs: ' + name);
        results.push(prior);
        console.log('REUSE ' + name);
        continue;
      }
      const suffix = condition === 'baseline' ? '' : '.' + condition;
      const resultFile = path.join(output, name + '.json');
      const args = [path.join(backend, 'node_modules/jest/bin/jest.js'), '--config', `jest.${target.domain}${suffix}.config.cjs`, '--runInBand', '--json', '--outputFile', resultFile];
      if (condition !== 'baseline') {
        const baseline = testFiles(target.domain, 'baseline');
        const candidateFile = testFiles(target.domain, condition).find(file => !baseline.includes(file));
        args.push('--runTestsByPath', candidateFile, '--testNamePattern', target[condition]);
      }
      const result = spawnSync(process.execPath, args, { cwd: backend, encoding: 'utf8', timeout: 30000, windowsHide: true });
      fs.writeFileSync(path.join(output, name + '.log'), (result.stdout || '') + '\n' + (result.stderr || ''));
      const json = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
      const failures = json.testResults.flatMap(suite => suite.assertionResults).filter(test => test.status === 'failed');
      const expectedExit = version === 'mutant' && condition !== 'baseline' ? 1 : 0;
      if (result.status !== expectedExit || (condition !== 'baseline' && version === 'original' && json.numPassedTests !== 1) ||
        (expectedExit === 1 && (failures.length !== 1 || failures[0].failureMessages.some(message => !message.includes('expect('))))) {
        throw new Error(`Assertion verification failed for ${name}`);
      }
      const record = { name, executable: process.execPath, args, cwd: backend, exitCode: result.status,
        total: json.numTotalTests, passed: json.numPassedTests, failed: json.numFailedTests,
        mutantSignature: signature, failures: failures.map(test => ({ name: test.fullName, messages: test.failureMessages })) };
      fs.writeFileSync(path.join(output, name + '.meta.json'), JSON.stringify(record, null, 2) + '\n');
      results.push(record);
      console.log(name + ': ' + (expectedExit === 1 ? 'one assertion failure verified' : 'pass'));
    }
  }
}
fs.writeFileSync(path.join(backend, 'server.js'), base);
fs.writeFileSync(path.join(output, 'summary.json'), JSON.stringify({ executor: 'OpenAI Codex AI Agent',
  scope: 'Three matched baseline survivors and six assertion-verified candidate detections; no production fix',
  results }, null, 2) + '\n');
