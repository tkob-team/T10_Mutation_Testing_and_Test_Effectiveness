const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { domains, conditions, counts } = require('../config/profiles.cjs');
const [directory, historicalDirectory] = process.argv.slice(2);
if (!directory || !path.isAbsolute(directory)) throw new Error('Usage: node scripts/summarize-audit.cjs ABS_EVIDENCE [ABS_HISTORICAL_JOINT_RUN]');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const hash = text => crypto.createHash('sha256').update(text.replaceAll('\r\n', '\n')).digest('hex');
const states = ['Killed', 'Timeout', 'Survived', 'NoCoverage', 'RuntimeError', 'CompileError', 'Ignored', 'Pending'];

function index(report) {
  const tests = new Map(Object.values(report.testFiles || {}).flatMap(file => file.tests.map(test => [test.id, test.name])));
  const entries = Object.entries(report.files).flatMap(([file, data]) => data.mutants.map(mutant => {
    const signature = JSON.stringify([file.replaceAll('\\', '/'), mutant.location.start.line, mutant.location.start.column,
      mutant.location.end.line, mutant.location.end.column, mutant.mutatorName, mutant.replacement]);
    return [signature, { ...mutant, file, killingTests: (mutant.killedBy || []).map(id => tests.get(id) || id) }];
  }));
  const map = new Map(entries);
  if (map.size !== entries.length) throw new Error('Duplicate mutant signatures');
  return map;
}

function describe(report) {
  const mutants = index(report);
  const tally = Object.fromEntries(states.map(state => [state, 0]));
  for (const mutant of mutants.values()) tally[mutant.status] = (tally[mutant.status] || 0) + 1;
  const valid = tally.Killed + tally.Timeout + tally.Survived + tally.NoCoverage;
  return { ...tally, total: mutants.size, valid,
    toolScore: valid ? 100 * (tally.Killed + tally.Timeout) / valid : null,
    killedProportion: valid ? 100 * tally.Killed / valid : null,
    sourceHashes: Object.fromEntries(Object.entries(report.files).map(([file, data]) => [file, hash(data.source)])),
    reportedTests: Object.values(report.testFiles || {}).reduce((n, file) => n + file.tests.length, 0) };
}

function compare(before, after) {
  const a = index(before); const b = index(after);
  const sameUniverse = a.size === b.size && [...a.keys()].every(key => b.has(key));
  if (!sameUniverse) throw new Error('Mutant universe differs across conditions');
  const transitions = {};
  const rows = [...a].map(([signature, mutant]) => {
    const changed = b.get(signature);
    if (mutant.status !== changed.status) {
      const transition = `${mutant.status} -> ${changed.status}`;
      transitions[transition] = (transitions[transition] || 0) + 1;
    }
    return { signature, location: mutant.location, mutatorName: mutant.mutatorName, replacement: mutant.replacement,
      before: mutant.status, after: changed.status, killingTests: changed.killingTests };
  });
  return { sameUniverse, transitions,
    newKilledFromSurvivedOrNoCoverage: rows.filter(row => ['Survived', 'NoCoverage'].includes(row.before) && row.after === 'Killed').length,
    detectedToUndetected: rows.filter(row => ['Killed', 'Timeout'].includes(row.before) && ['Survived', 'NoCoverage'].includes(row.after)).length,
    rows };
}

const summary = { generatedUtc: new Date().toISOString(), profiles: {}, comparisons: {}, historical: {},
  commonValid: {},
  interpretation: 'Killed counts and new Killed transitions are tool observations; only separately probed examples are assertion-verified. Agent execution of retained collections, not fresh generation, independent human-only control, member self-run or model ranking.' };
const reports = {};
for (const domain of domains) {
  for (const condition of conditions) {
    const name = `${domain}-${condition}`;
    const file = path.join(directory, 'mutation', name, 'mutation.json');
    if (!fs.existsSync(file)) continue;
    const report = read(file); reports[name] = report;
    const stats = describe(report);
    const stderr = fs.readFileSync(path.join(directory, 'commands', 'mutate-' + name + '.stderr.log'), 'utf8');
    const stdout = fs.readFileSync(path.join(directory, 'commands', 'mutate-' + name + '.stdout.log'), 'utf8');
    stats.workerCrashMentions = (stderr.concat(stdout).match(/exited unexpectedly/g) || []).length;
    const timing = stdout.match(/Initial test run succeeded\. Ran (\d+) tests.*?\(net (\d+) ms, overhead (\d+) ms\)/);
    if (timing) stats.initialTestTiming = { tests: Number(timing[1]), netMs: Number(timing[2]), overheadMs: Number(timing[3]),
      configuredTimeoutMs: Number(timing[2]) * 1.5 + 5000 + Number(timing[3]) };
    stats.expectedTests = counts[domain][condition];
    if (stats.reportedTests !== stats.expectedTests) throw new Error(`${name}: report has unexpected or duplicate test population`);
    summary.profiles[name] = stats;
  }
  for (const condition of ['manual', 'ai']) {
    if (!reports[domain + '-baseline'] || !reports[domain + '-' + condition]) continue;
    const comparison = compare(reports[domain + '-baseline'], reports[domain + '-' + condition]);
    const { rows, ...stats } = comparison;
    const sourcesEqual = JSON.stringify(describe(reports[domain + '-baseline']).sourceHashes) === JSON.stringify(describe(reports[domain + '-' + condition]).sourceHashes);
    if (!sourcesEqual) throw new Error(`${domain}: production source differs across profiles`);
    summary.comparisons[domain + '-' + condition] = { ...stats, sameSource: sourcesEqual };
    fs.writeFileSync(path.join(directory, `${domain}-${condition}-mapping.json`), JSON.stringify(rows, null, 2) + '\n');
  }
  if (conditions.every(condition => reports[domain + '-' + condition])) {
    const maps = Object.fromEntries(conditions.map(condition => [condition, index(reports[domain + '-' + condition])]));
    const common = [...maps.baseline.keys()].filter(signature => conditions.every(condition =>
      ['Killed', 'Timeout', 'Survived', 'NoCoverage'].includes(maps[condition].get(signature)?.status)));
    const profiles = {};
    for (const condition of conditions) {
      const tally = { Killed: 0, Timeout: 0, Survived: 0, NoCoverage: 0 };
      for (const signature of common) tally[maps[condition].get(signature).status]++;
      profiles[condition] = { ...tally, valid: common.length,
        detectedProportion: common.length ? 100 * (tally.Killed + tally.Timeout) / common.length : null,
        killedProportion: common.length ? 100 * tally.Killed / common.length : null };
    }
    summary.commonValid[domain] = { count: common.length, excludedFromAnyCondition: maps.baseline.size - common.length, profiles };
  }
}
if (historicalDirectory) for (const condition of conditions) {
  const oldFile = path.join(historicalDirectory, `${condition}-mutation.json`);
  const fresh = reports[`overall-${condition}`];
  if (!fs.existsSync(oldFile) || !fresh) continue;
  const previous = read(oldFile);
  const { rows, ...comparison } = compare(previous, fresh);
  summary.historical[condition] = { old: describe(previous), current: describe(fresh), ...comparison };
  fs.writeFileSync(path.join(directory, `historical-${condition}-mapping.json`), JSON.stringify(rows, null, 2) + '\n');
}
fs.writeFileSync(path.join(directory, 'mutation-summary.json'), JSON.stringify(summary, null, 2) + '\n');
const invalid = Object.entries(reports).flatMap(([profile, report]) => [...index(report).values()]
  .filter(mutant => ['RuntimeError', 'CompileError'].includes(mutant.status)).map(mutant => ({ profile,
    location: mutant.location, mutatorName: mutant.mutatorName, replacement: mutant.replacement,
    status: mutant.status, reason: mutant.statusReason,
    classification: mutant.statusReason?.includes('3221225477') && mutant.replacement === '""'
      ? 'Native crash matching independently reproduced empty-SQL/bind-parameter pattern'
      : 'Other mutant execution error; retain raw reason, exclude from valid-mutant comparison' })));
fs.writeFileSync(path.join(directory, 'invalid-mutants.json'), JSON.stringify(invalid, null, 2) + '\n');
console.log(JSON.stringify({ profiles: Object.fromEntries(Object.entries(summary.profiles).map(([name, stats]) => [name,
  { tests: stats.reportedTests, total: stats.total, Killed: stats.Killed, Timeout: stats.Timeout,
    Survived: stats.Survived, NoCoverage: stats.NoCoverage, RuntimeError: stats.RuntimeError, score: stats.toolScore }])),
  comparisons: summary.comparisons, commonValid: summary.commonValid, historicalTransitions: Object.fromEntries(
    Object.entries(summary.historical).map(([name, value]) => [name, value.transitions])) }, null, 2));
