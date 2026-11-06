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
    const signature = JSON.stringify([file.replaceAll('\\', '/'), mutant.location.start, mutant.location.end, mutant.mutatorName, mutant.replacement]);
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
    addedAssertionKills: rows.filter(row => ['Survived', 'NoCoverage'].includes(row.before) && row.after === 'Killed').length,
    detectedToUndetected: rows.filter(row => ['Killed', 'Timeout'].includes(row.before) && ['Survived', 'NoCoverage'].includes(row.after)).length,
    rows };
}

const summary = { generatedUtc: new Date().toISOString(), profiles: {}, comparisons: {}, historical: {},
  interpretation: 'Agent-executed reproduction of existing collections. No fresh AI generation, independent human-only control, member self-run or model ranking.' };
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
console.log(JSON.stringify({ profiles: summary.profiles, comparisons: summary.comparisons }, null, 2));
