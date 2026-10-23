// Count Stryker statuses for the Coupons walkthrough and list mutants that changed versus baseline
const fs = require('fs'), path = require('path');
const load = (p) => {
  const m = {};
  for (const f of Object.values(JSON.parse(fs.readFileSync(p, 'utf8')).files)) for (const x of f.mutants) {
    const s = x.location.start, e = x.location.end;
    m[`${s.line}:${s.column}-${e.line}:${e.column}|${x.mutatorName}|${x.replacement}`] = x;
  }
  return m;
};
const dir = process.argv[2];
const base = load(path.join(dir, 'coupons', 'mutation.json'));
for (const name of ['coupons', 'coupons-manual', 'coupons-ai']) {
  const m = load(path.join(dir, name, 'mutation.json'));
  const c = {}; Object.values(m).forEach((x) => (c[x.status] = (c[x.status] || 0) + 1));
  const k = c.Killed || 0, t = c.Timeout || 0, valid = k + t + (c.Survived || 0) + (c.NoCoverage || 0);
  console.log(`== ${name}: total ${Object.keys(m).length} ${JSON.stringify(c)} score ${(100 * (k + t) / valid).toFixed(2)}% killed/valid ${(100 * k / valid).toFixed(2)}%`);
  Object.keys(m).filter((key) => base[key].status !== m[key].status).forEach((key) => console.log(`  vs baseline: ${key} id ${base[key].id}: ${base[key].status} -> ${m[key].status}`));
}
