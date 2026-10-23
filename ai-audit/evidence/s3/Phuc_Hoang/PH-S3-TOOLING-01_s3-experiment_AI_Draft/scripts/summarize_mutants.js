#!/usr/bin/env node
// Summarize a StrykerJS mutation.json: counts per state, Stryker score, assertion-kill rate,
// and every non-killed mutant. Usage: node summarize_mutants.js <mutation.json> [--all] [--json]
'use strict';
const fs = require('fs');

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) {
  console.error('Usage: node summarize_mutants.js <mutation.json> [--all] [--json]');
  process.exit(2);
}
const showAll = args.includes('--all');
const asJson = args.includes('--json');

const report = JSON.parse(fs.readFileSync(file, 'utf8'));
const STATES = ['Killed', 'Timeout', 'Survived', 'NoCoverage', 'Ignored', 'CompileError', 'RuntimeError', 'Pending'];
const counts = Object.fromEntries(STATES.map((s) => [s, 0]));
const rows = [];

for (const [path, fileReport] of Object.entries(report.files)) {
  for (const m of fileReport.mutants) {
    counts[m.status] = (counts[m.status] || 0) + 1;
    if (showAll || m.status !== 'Killed') {
      rows.push({
        id: m.id,
        status: m.status,
        location: `${path}:${m.location.start.line}:${m.location.start.column}`,
        mutator: m.mutatorName,
        replacement: m.replacement,
        reason: m.statusReason || '',
        killedBy: (m.killedBy || []).length,
      });
    }
  }
}

// Stryker definitions: detected = killed + timeout; valid = detected + survived + noCoverage.
const detected = counts.Killed + counts.Timeout;
const valid = detected + counts.Survived + counts.NoCoverage;
const covered = detected + counts.Survived;
const pct = (n, d) => (d === 0 ? 'n.a.' : ((n / d) * 100).toFixed(2) + '%');
const summary = {
  file,
  total: Object.values(counts).reduce((a, b) => a + b, 0),
  counts,
  strykerScore: pct(detected, valid),
  scoreOfCovered: pct(detected, covered),
  assertionKillRate: pct(counts.Killed, valid),
};

if (asJson) {
  console.log(JSON.stringify({ summary, mutants: rows }, null, 2));
  process.exit(0);
}

console.log(`# ${file}`);
console.log(`Total ${summary.total} | Killed ${counts.Killed} | Timeout ${counts.Timeout} | Survived ${counts.Survived} | NoCoverage ${counts.NoCoverage} | Ignored ${counts.Ignored} | Errors ${counts.CompileError + counts.RuntimeError}`);
console.log(`Stryker score (killed+timeout)/valid: ${summary.strykerScore} | covered: ${summary.scoreOfCovered} | assertion kill (killed/valid): ${summary.assertionKillRate}`);
if (rows.length) {
  console.log('\n| ID | State | Location | Mutator | Replacement | Reason |');
  console.log('|---|---|---|---|---|---|');
  rows
    .sort((a, b) => a.location.localeCompare(b.location, undefined, { numeric: true }))
    .forEach((r) => console.log(`| ${r.id} | ${r.status} | ${r.location} | ${r.mutator} | \`${String(r.replacement).replace(/\|/g, '\\|').replace(/\n/g, ' ')}\` | ${r.reason.replace(/\|/g, '\\|')} |`));
}
