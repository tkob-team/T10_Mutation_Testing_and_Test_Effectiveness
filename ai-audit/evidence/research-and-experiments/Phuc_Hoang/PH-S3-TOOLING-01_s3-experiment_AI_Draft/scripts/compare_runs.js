#!/usr/bin/env node
// Compare two StrykerJS mutation.json reports mutant by mutant (matched on file + location +
// mutator + replacement, since mutant ids are not stable across runs).
// Usage: node compare_runs.js <before.json> <after.json> [--all]
'use strict';
const fs = require('fs');

const args = process.argv.slice(2);
const files = args.filter((a) => !a.startsWith('--'));
if (files.length !== 2) {
  console.error('Usage: node compare_runs.js <before.json> <after.json> [--all]');
  process.exit(2);
}
const showAll = args.includes('--all');

function index(file) {
  const report = JSON.parse(fs.readFileSync(file, 'utf8'));
  const map = new Map();
  for (const [path, fr] of Object.entries(report.files)) {
    for (const m of fr.mutants) {
      const { start, end } = m.location;
      const key = `${path}:${start.line}:${start.column}-${end.line}:${end.column} ${m.mutatorName} ${JSON.stringify(m.replacement)}`;
      map.set(key, { status: m.status, path, line: start.line, column: start.column, mutator: m.mutatorName, replacement: m.replacement });
    }
  }
  return map;
}

const before = index(files[0]);
const after = index(files[1]);
const transitions = new Map();
const changed = [];
const keys = new Set([...before.keys(), ...after.keys()]);

for (const key of keys) {
  const a = before.get(key);
  const b = after.get(key);
  const from = a ? a.status : '(absent)';
  const to = b ? b.status : '(absent)';
  const t = `${from} -> ${to}`;
  transitions.set(t, (transitions.get(t) || 0) + 1);
  if (from !== to || showAll) changed.push({ m: a || b, from, to });
}

console.log(`# ${files[0]}  ->  ${files[1]}`);
console.log(`Mutants matched: ${[...keys].filter((k) => before.has(k) && after.has(k)).length}; only in before: ${[...keys].filter((k) => !after.has(k)).length}; only in after: ${[...keys].filter((k) => !before.has(k)).length}`);
console.log('\n| Transition | Count |\n|---|---|');
[...transitions.entries()].sort((x, y) => y[1] - x[1]).forEach(([t, n]) => console.log(`| ${t} | ${n} |`));

if (changed.length) {
  console.log('\n| Location | Mutator | Replacement | Before | After |\n|---|---|---|---|---|');
  changed
    .sort((x, y) => x.m.path.localeCompare(y.m.path) || x.m.line - y.m.line || x.m.column - y.m.column)
    .forEach(({ m, from, to }) =>
      console.log(`| ${m.path}:${m.line}:${m.column} | ${m.mutator} | \`${String(m.replacement).replace(/\|/g, '\\|').replace(/\n/g, ' ')}\` | ${from} | ${to} |`));
}
const killedToTimeout = transitions.get('Killed -> Timeout') || 0;
if (killedToTimeout) {
  console.log(`\nNote: ${killedToTimeout} mutant(s) went Killed -> Timeout; Timeout is not an assertion kill.`);
}
