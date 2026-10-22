// Map each mutant of a StrykerJS mutation.json to the Auth & Users route that contains its start line.
const j = require(require('path').resolve(process.argv[2]));
const routes = [
  ['POST /api/register', 20, 30], ['POST /api/login', 32, 66], ['POST /api/forgot-password', 68, 85],
  ['POST /api/reset-password', 87, 98], ['authenticateToken', 100, 110], ['GET /api/users/me', 112, 116], ['PUT /api/users/me', 118, 135],
];
const states = ['Killed', 'Timeout', 'Survived', 'NoCoverage', 'RuntimeError'];
const rows = routes.map(([name, a, b]) => ({ name, a, b, n: 0, ...Object.fromEntries(states.map((s) => [s, 0])) }));
let outside = 0;
for (const f of Object.values(j.files)) for (const m of f.mutants) {
  const r = rows.find((x) => m.location.start.line >= x.a && m.location.start.line <= x.b);
  if (!r) { outside += 1; continue; }
  r.n += 1; r[m.status] += 1;
}
console.log('| Route | Lines | Mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError |\n|---|---|---|---|---|---|---|---|');
for (const r of rows) console.log(`| ${r.name} | ${r.a}-${r.b} | ${r.n} | ${r.Killed} | ${r.Timeout} | ${r.Survived} | ${r.NoCoverage} | ${r.RuntimeError} |`);
console.log(`\nMutants outside the Auth route ranges: ${outside}`);
