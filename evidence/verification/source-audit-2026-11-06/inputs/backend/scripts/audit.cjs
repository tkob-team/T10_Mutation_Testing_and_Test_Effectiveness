// Reproduce the complete experiment from a snapshot in a disposable directory.
// Does not checkout refs, commit, or modify historical evidence.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync, execFileSync } = require('node:child_process');
const { rootDir, domains, conditions, counts, testFiles } = require('../config/profiles.cjs');

const [outputArg, runtimeArg, ...flags] = process.argv.slice(2);
if (!outputArg || !runtimeArg || !path.isAbsolute(outputArg) || !path.isAbsolute(runtimeArg)) {
  throw new Error('Usage: node scripts/audit.cjs ABS_EVIDENCE ABS_NEW_RUNTIME [--resume] [--backend-only] [--tests-only]');
}
const output = path.resolve(outputArg);
const runtime = path.resolve(runtimeArg);
const source = path.dirname(rootDir);
const backend = path.join(runtime, 'backend');
const resume = flags.includes('--resume');
const testsOnly = flags.includes('--tests-only');
const protectedFiles = ['backend/server.js', 'backend/database.js', 'backend/database.sqlite'];
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const write = (file, data) => {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
};
const read = file => JSON.parse(fs.readFileSync(path.join(output, file), 'utf8'));
const git = (...args) => execFileSync('git', args, { cwd: source, encoding: 'utf8' }).trim();
const within = (candidate, parent) => candidate === parent || candidate.startsWith(parent + path.sep);
if (within(runtime, source) || within(source, runtime) || within(runtime, output) || within(output, runtime)) {
  throw new Error('Runtime, source and evidence must not contain each other (evidence may be in the docs repo).');
}
if (fs.existsSync(output) && !resume) throw new Error('Evidence already exists. Use a new directory or --resume.');
if (fs.existsSync(runtime) && !resume) throw new Error('Runtime already exists. Use a new directory or --resume.');
fs.mkdirSync(output, { recursive: true });

const npmCli = process.env.npm_execpath || path.join(path.dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
if (!fs.existsSync(npmCli)) throw new Error('Cannot locate npm CLI next to Node.js. Invoke via npm run audit -- ...');
const records = [];

function command(name, args, cwd = backend, expectedExit = 0, timeout = 1200000) {
  const metaFile = path.join(output, 'commands', name + '.json');
  if (fs.existsSync(metaFile)) {
    const prior = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    if (prior.exitCode !== expectedExit) throw new Error(`Previous ${name} failed; preserve it and start a new audit after fixes.`);
    records.push(prior);
    console.log(`RESUME ${name}`);
    return prior;
  }
  console.log(`START ${name}`);
  const dir = path.join(output, 'commands');
  fs.mkdirSync(dir, { recursive: true });
  const out = fs.openSync(path.join(dir, name + '.stdout.log'), 'wx');
  const err = fs.openSync(path.join(dir, name + '.stderr.log'), 'wx');
  const startedUtc = new Date().toISOString();
  const started = performance.now();
  const result = spawnSync(process.execPath, args, {
    cwd, stdio: ['ignore', out, err], timeout,
    env: { ...process.env, FORCE_COLOR: '0', CI: 'true' },
    windowsHide: true,
  });
  fs.closeSync(out);
  fs.closeSync(err);
  const record = { name, executable: process.execPath, args, cwd, startedUtc,
    finishedUtc: new Date().toISOString(), elapsedMs: Math.round(performance.now() - started),
    exitCode: result.status, signal: result.signal, error: result.error?.message };
  write('commands/' + name + '.json', record);
  records.push(record);
  console.log(`END ${name}: exit=${result.status}, ${record.elapsedMs} ms`);
  if (result.status !== expectedExit) throw new Error(`${name}: expected exit ${expectedExit}, got ${result.status}. See commands logs.`);
  return record;
}

function prepare() {
  if (resume && fs.existsSync(path.join(output, 'inputs.json'))) return read('inputs.json');
  const paths = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z'], { cwd: source, encoding: 'utf8' })
    .split('\0').filter(Boolean).filter(file => file.startsWith('backend/') || file.startsWith('frontend-') || file === '.nvmrc');
  const hashes = {};
  for (const file of paths) {
    const from = path.join(source, file);
    if (!fs.statSync(from).isFile()) continue;
    hashes[file] = hash(from);
    const to = path.join(runtime, file);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    // Keep the executable research input, including configs/tests, with evidence.
    const snapshot = path.join(output, 'inputs', file);
    fs.mkdirSync(path.dirname(snapshot), { recursive: true });
    fs.copyFileSync(from, snapshot);
  }
  const input = {
    executor: 'OpenAI Codex AI Agent; not a member self-run or human review',
    source, sourceHead: git('rev-parse', 'HEAD'), sourceStatus: git('status', '--short'), runtime,
    historicalProduction: '806ba19ee4e09eafe9b2696ccf117a2b1ab841ef',
    node: process.version, platform: process.platform, arch: process.arch,
    npm: execFileSync(process.execPath, [npmCli, '--version'], { encoding: 'utf8' }).trim(),
    createdUtc: new Date().toISOString(), inputSha256: hashes,
    protectedBefore: Object.fromEntries(protectedFiles.map(file => [file, hash(path.join(source, file))])),
    policy: { concurrency: 1, timeoutMS: 5000, timeoutFactor: 1.5, coverageAnalysis: 'perTest' },
    profiles: Object.fromEntries(domains.map(domain => [domain, Object.fromEntries(conditions.map(condition =>
      [condition, { files: testFiles(domain, condition), expectedTests: counts[domain][condition] }]))])),
  };
  write('inputs.json', input);
  return input;
}

function checkTestResult(name, domain, condition, expectedFailures = false) {
  const result = read('tests/' + name + '.json');
  const rows = result.testResults.flatMap(suite => suite.assertionResults);
  const names = rows.map(row => row.fullName);
  const duplicateNames = names.filter((name, i) => names.indexOf(name) !== i);
  const runtimeErrors = result.testResults.filter(suite => suite.testExecError || suite.assertionResults.length === 0);
  if (duplicateNames.length || runtimeErrors.length) throw new Error(`${name}: duplicate test identities or suite/runtime failure`);
  if (expectedFailures) {
    if (result.numTotalTests !== 54 || result.numFailedTests !== 54 || rows.some(row => row.status !== 'failed' || row.failureMessages.some(message => !message.includes('expect(')))) {
      throw new Error(`${name}: expected 54 separate original-defect assertion failures`);
    }
  } else if (result.numTotalTests !== counts[domain][condition] || result.numFailedTests !== 0 || result.numPendingTests !== 0) {
    throw new Error(`${name}: unexpected test population or result`);
  }
  return { tests: result.numTotalTests, passed: result.numPassedTests, failed: result.numFailedTests,
    suites: result.numTotalTestSuites, duplicateNames, runtimeErrors: runtimeErrors.length };
}

function tests() {
  const summary = {};
  for (const domain of domains) for (const condition of conditions) {
    const suffix = condition === 'baseline' ? '' : '.' + condition;
    const name = `${domain}-${condition}`;
    const config = `jest.${domain}${suffix}.config.cjs`;
    const jest = path.join(backend, 'node_modules/jest/bin/jest.js');
    command('list-' + name, [jest, '--config', config, '--listTests', '--json', '--runInBand']);
    const files = JSON.parse(fs.readFileSync(path.join(output, 'commands', 'list-' + name + '.stdout.log'), 'utf8'));
    const selected = files.map(file => path.relative(backend, file).replaceAll('\\', '/')).sort();
    const expected = testFiles(domain, condition).slice().sort();
    if (JSON.stringify(selected) !== JSON.stringify(expected)) throw new Error(`${name}: selected test files do not match profile`);
    const resultFile = path.join(output, 'tests', name + '.json');
    fs.mkdirSync(path.dirname(resultFile), { recursive: true });
    command('test-' + name, [jest, '--config', config, '--runInBand', '--json', '--outputFile', resultFile]);
    summary[name] = checkTestResult(name, domain, condition);
  }
  const jest = path.join(backend, 'node_modules/jest/bin/jest.js');
  const shuffled = path.join(output, 'tests', 'overall-shuffled.json');
  command('test-overall-shuffled', [jest, '--config', 'jest.overall.config.cjs', '--runInBand', '--randomize', '--seed', '61106', '--json', '--outputFile', shuffled]);
  summary['overall-shuffled'] = checkTestResult('overall-shuffled', 'overall', 'baseline');
  const defects = path.join(output, 'tests', 'original-defects.json');
  command('test-original-defects', [jest, '--config', 'jest.defects.config.cjs', '--runInBand', '--json', '--outputFile', defects], backend, 1);
  summary['original-defects'] = checkTestResult('original-defects', null, null, true);
  for (const name of ['weak', 'strong', 'ai']) command('tutorial-' + name,
    [jest, '--config', `tutorial/jest.${name}.config.cjs`, '--runInBand']);
  write('test-summary.json', summary);
}

function mutation() {
  const stryker = path.join(backend, 'node_modules/@stryker-mutator/core/bin/stryker.js');
  for (const domain of domains) for (const condition of conditions) {
    const suffix = condition === 'baseline' ? '' : '.' + condition;
    const name = `${domain}-${condition}`;
    const config = `stryker.${domain}${suffix}.config.json`;
    command('dry-' + name, [stryker, 'run', config, '--dryRunOnly']);
    const dryLog = fs.readFileSync(path.join(output, 'commands', 'dry-' + name + '.stdout.log'), 'utf8');
    const match = dryLog.match(/Initial test run succeeded\. Ran (\d+) tests/);
    if (!match || Number(match[1]) !== counts[domain][condition]) throw new Error(`${name}: dry-run population differs from standalone Jest`);
    command('mutate-' + name, [stryker, 'run', config]);
    const reportDir = `${domain}${condition === 'baseline' ? '' : '-' + condition}`;
    const dest = path.join(output, 'mutation', name);
    fs.mkdirSync(dest, { recursive: true });
    for (const extension of ['json', 'html']) {
      fs.copyFileSync(path.join(backend, 'reports', reportDir, 'mutation.' + extension), path.join(dest, 'mutation.' + extension));
    }
  }
}

function frontends() {
  for (const component of ['frontend-web', 'frontend-admin']) {
    const cwd = path.join(runtime, component);
    command('install-' + component, [npmCli, 'ci', '--no-audit', '--no-fund'], cwd);
    command('build-' + component, [npmCli, 'run', 'build'], cwd);
  }
  // Mobile needs Expo/device checks outside this backend experiment. Record its
  // package and lockfile in inputs; do not claim native execution from a build.
}

const inputs = prepare();
let failure;
try {
  command('install-backend', [npmCli, 'ci', '--no-audit', '--no-fund']);
  command('environment', ['-e', "const fs=require('node:fs');const names=['jest','@stryker-mutator/core','@stryker-mutator/jest-runner','sqlite3'];console.log(JSON.stringify(Object.fromEntries(names.map(n=>[n,JSON.parse(fs.readFileSync('node_modules/'+n+'/package.json')).version]))));const sqlite=require('sqlite3');const db=new sqlite.Database(':memory:');db.get('SELECT sqlite_version() version',(e,r)=>{if(e)throw e;console.log(r);db.close()});"]);
  tests();
  if (!testsOnly) mutation();
  if (!testsOnly && !flags.includes('--backend-only')) frontends();
} catch (error) {
  failure = error;
  console.error(error.stack);
} finally {
  const sourceAfter = Object.fromEntries(protectedFiles.map(file => [file, hash(path.join(source, file))]));
  const runtimeAfter = Object.fromEntries(protectedFiles.map(file => [file, hash(path.join(runtime, file))]));
  const changedSource = protectedFiles.filter(file => sourceAfter[file] !== inputs.protectedBefore[file]);
  const changedRuntime = protectedFiles.filter(file => runtimeAfter[file] !== inputs.inputSha256[file]);
  const currentInputs = Object.fromEntries(Object.keys(inputs.inputSha256).map(file => [file, hash(path.join(source, file))]));
  const changedInputs = Object.keys(currentInputs).filter(file => currentInputs[file] !== inputs.inputSha256[file]);
  write('preservation.json', { sourceAfter, runtimeAfter, changedSource, changedRuntime, changedInputs });
  write('completion.json', { completed: !failure && !changedSource.length && !changedRuntime.length && !changedInputs.length,
    error: failure?.message, commands: records.length, testsOnly, backendOnly: flags.includes('--backend-only'),
    finishedUtc: new Date().toISOString() });
  if (changedSource.length || changedRuntime.length || changedInputs.length) {
    failure ||= new Error('Input preservation check failed; see preservation.json');
  }
}
if (failure) process.exitCode = 1;
