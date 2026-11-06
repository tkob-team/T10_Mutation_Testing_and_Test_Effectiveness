// Count statuses and compare C01 rehearsal reports with S3 runs, keyed by location+mutator+replacement
const fs = require('fs'), path = require('path');
const load = (p) => {
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const m = {};
  for (const f of Object.values(j.files)) for (const x of f.mutants) {
    const s = x.location.start, e = x.location.end;
    m[`${s.line}:${s.column}-${e.line}:${e.column}|${x.mutatorName}|${x.replacement}`] = x;
  }
  return m;
};
const tally = (m) => { const c = {}; Object.values(m).forEach((x) => (c[x.status] = (c[x.status] || 0) + 1)); return c; };
const score = (c) => { const d = (c.Killed || 0) + (c.Timeout || 0); return (100 * d / (d + (c.Survived || 0) + (c.NoCoverage || 0))).toFixed(2); };
const [, , runDir, s3Dir] = process.argv;
for (const [name, s3] of [['baseline', 'E01-1'], ['manual', 'F01-2'], ['ai', 'G01-2']]) {
  const a = load(path.join(runDir, name, 'mutation.json')), b = load(path.join(s3Dir, s3, 'mutation.json'));
  const ca = tally(a), cb = tally(b);
  console.log(`== ${name}: total ${Object.keys(a).length}, ${JSON.stringify(ca)}, score ${score(ca)}% | S3 ${s3}: ${JSON.stringify(cb)}, score ${score(cb)}%`);
  for (const loc of ['292:7', '550:11']) {
    Object.entries(a).filter(([k]) => k.startsWith(loc + '-')).forEach(([k, x]) => console.log(`  ${k} -> ${x.status}${x.killedBy && x.killedBy.length ? ' killedBy ' + x.killedBy.length : ''} (S3: ${b[k] ? b[k].status : 'missing'})`));
  }
  const diff = Object.keys(a).filter((k) => !b[k] || b[k].status !== a[k].status);
  console.log(`  status khác S3: ${diff.length}`);
  diff.forEach((k) => console.log(`    ${k}: ${b[k] ? b[k].status : 'missing'} -> ${a[k].status}`));
  const survA = Object.keys(a).filter((k) => a[k].status === 'Survived').sort().join(), survB = Object.keys(b).filter((k) => b[k].status === 'Survived').sort().join();
  console.log(`  tập Survived trùng S3: ${survA === survB}`);
}
