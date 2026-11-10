// Usage: node count.js <mutation.json> [line]
// Prints status counts and score; with [line], also lists mutants on that line with killedBy test names.
const r = require(require('path').resolve(process.argv[2]));
const line = Number(process.argv[3]);
const names = {};
for (const f of Object.values(r.testFiles || {})) for (const t of f.tests) names[t.id] = t.name;
const c = {};
for (const [file, f] of Object.entries(r.files))
  for (const m of f.mutants) {
    c[m.status] = (c[m.status] || 0) + 1;
    if (line && m.location.start.line === line) {
      console.log(`${file}:${line}:${m.location.start.column} ${m.mutatorName} -> ${m.replacement} = ${m.status}`);
      for (const id of m.killedBy || []) console.log(`   killed by: ${names[id] || id}`);
    }
  }
const det = (c.Killed || 0) + (c.Timeout || 0);
const valid = det + (c.Survived || 0) + (c.NoCoverage || 0);
console.log(c, 'score', valid ? (100 * det / valid).toFixed(2) + '%' : 'n/a');
