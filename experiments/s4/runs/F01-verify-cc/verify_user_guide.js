// S4-F01: verify materials/s4/User_Guide.md against requirements, sources and run evidence.
// Usage (from seminar repo root): node experiments/s4/runs/F01-verify-cc/verify_user_guide.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GUIDE = 'materials/s4/User_Guide.md';
const guide = fs.readFileSync(GUIDE, 'utf8').replace(/\r/g, '');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r/g, '');
const out = [];
const log = (s = '') => out.push(s);

// ---------- 1. Structure ----------
const h2 = [...guide.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const section = (name) => {
  const start = guide.indexOf(`\n## ${name}\n`);
  if (start < 0) return '';
  const rest = guide.slice(start + name.length + 5);
  const end = rest.search(/\n## /);
  return end < 0 ? rest : rest.slice(0, end);
};
log('== 1. Structure');
log(`H2 headings (${h2.length}): ${h2.join(' | ')}`);
const req17 = ['Introduction', 'Installation', 'First Test', 'Advanced Usage', 'Troubleshooting', 'References'];
req17.forEach((s) => log(`  REQ-17 section "${s}": ${h2.includes(s) ? 'present' : 'MISSING'}`));
log(`  Failure Modes section: ${h2.includes('Failure Modes') ? 'present' : 'MISSING'}`);

const fm = section('Failure Modes');
const fmItems = fm.split(/\n### /).slice(1).map((b) => {
  const title = b.split('\n')[0];
  const evidence = /\]\(\.\.\/\.\.\/experiments|Evidence:|thí nghiệm|starter, CO-02|ví dụ toy|sandbox|bản mở rộng Coupons 35\/40/.test(b);
  return { title, evidence, links: (b.match(/\]\(\.\.\/\.\.\/experiments[^)]*\)/g) || []).length };
});
log(`  Failure Modes items: ${fmItems.length}`);
fmItems.forEach((f) => log(`    - ${f.title} | evidence mention: ${f.evidence ? 'yes' : 'no'} | links to experiments: ${f.links}`));

const ts = section('Troubleshooting');
const rows = ts.split('\n').filter((l) => l.startsWith('| ') && !l.startsWith('| Triệu chứng') && !l.startsWith('|---'));
const status = rows.map((r) => r.split(' | ')[2] || '');
const observed = rows.filter((r, i) => /Đã gặp/.test(status[i]));
const unlabeled = rows.filter((r, i) => !/Đã gặp|Đề xuất/.test(status[i]));
log(`  Troubleshooting rows: ${rows.length}; with "Đã gặp" (Observed): ${observed.length}; only "Đề xuất": ${rows.filter((r, i) => /Đề xuất/.test(status[i]) && !/Đã gặp/.test(status[i])).length}; unlabeled: ${unlabeled.length}`);
observed.forEach((r) => log(`    Observed: ${r.split(' | ')[0].slice(2, 90)}`));

// ---------- 2. Numbers ----------
const loadMut = (p) => {
  const j = JSON.parse(read(p));
  const m = {};
  for (const f of Object.values(j.files)) for (const x of f.mutants) {
    const s = x.location.start, e = x.location.end;
    m[`${s.line}:${s.column}-${e.line}:${e.column}|${x.mutatorName}|${x.replacement}`] = x.status;
  }
  return m;
};
const tally = (m) => {
  const c = { Killed: 0, Timeout: 0, Survived: 0, NoCoverage: 0, RuntimeError: 0, CompileError: 0, Ignored: 0 };
  Object.values(m).forEach((s) => (c[s] = (c[s] || 0) + 1));
  const valid = c.Killed + c.Timeout + c.Survived + c.NoCoverage;
  c.total = Object.keys(m).length;
  c.valid = valid;
  c.score = valid ? (100 * (c.Killed + c.Timeout) / valid).toFixed(2) : 'n/a';
  c.assertionKill = valid ? (100 * c.Killed / valid).toFixed(2) : 'n/a';
  return c;
};
const fmt = (c) => `total ${c.total}, K ${c.Killed}, T ${c.Timeout}, S ${c.Survived}, NC ${c.NoCoverage}, RE ${c.RuntimeError}, Ign ${c.Ignored}, score ${c.score}%, assertion kill ${c.assertionKill}%`;
const results = [];
const claim = (id, guideText, sourcePath, check) => {
  const inGuide = guide.includes(guideText);
  let verdict, detail;
  if (!fs.existsSync(path.join(ROOT, sourcePath))) { verdict = 'NO SOURCE'; detail = `${sourcePath} not found`; }
  else {
    try { const r = check(); verdict = r.ok ? 'MATCH' : 'MISMATCH'; detail = r.detail; }
    catch (e) { verdict = 'ERROR'; detail = e.message; }
  }
  if (!inGuide) verdict += ' (text not found in guide)';
  results.push({ id, verdict, guideText, sourcePath, detail });
};
const eq = (c, exp) => {
  const bad = Object.entries(exp).filter(([k, v]) => String(c[k]) !== String(v));
  return { ok: bad.length === 0, detail: fmt(c) + (bad.length ? ` | expected ${JSON.stringify(exp)}` : '') };
};
const R3 = 'experiments/s3/runs', R4 = 'experiments/s4/runs';

// Cart workshop (F01c-1-cc)
claim('Cart-WS baseline', 'Stryker sinh 7 mutant và cả 7 đều **Survived**', `${R4}/F01c-1-cc/baseline.json`, () => eq(tally(loadMut(`${R4}/F01c-1-cc/baseline.json`)), { total: 7, Survived: 7 }));
claim('Cart-WS after CO-02', '3 mutant chuyển sang **Killed**', `${R4}/F01c-1-cc/first-test.json`, () => eq(tally(loadMut(`${R4}/F01c-1-cc/first-test.json`)), { Killed: 3, Survived: 4 }));
claim('Cart-WS after 3 assertions', '7 Killed, 0 Survived và 0 Timeout', `${R4}/F01c-1-cc/manual.json`, () => eq(tally(loadMut(`${R4}/F01c-1-cc/manual.json`)), { Killed: 7, Survived: 0, Timeout: 0 }));
// Cart SUT (S3)
claim('Cart-SUT baseline Timeout 25/107', '25 trong 107 mutant bị phát hiện ở baseline là Timeout', `${R3}/Tan_Hiep/E01-1/mutation.json`, () => { const c = tally(loadMut(`${R3}/Tan_Hiep/E01-1/mutation.json`)); return { ok: c.Timeout === 25 && c.Killed + c.Timeout === 107, detail: fmt(c) }; });
claim('Cart-SUT Timeout 25 (frozen config, Hòa)', '25 Timeout với một cấu hình', `${R3}/Thai_Hoa/D04-merge-2026-10-23-agent/cart-reproduced-manual/mutation.json`, () => { const c = tally(loadMut(`${R3}/Thai_Hoa/D04-merge-2026-10-23-agent/cart-reproduced-manual/mutation.json`)); return { ok: c.Timeout === 25, detail: 'cart-reproduced-manual: ' + fmt(c) }; });
claim('Cart-SUT Timeout 18 (branch config)', '18 với cấu hình khác', `${R3}/Tan_Hiep/F01-2/mutation.json`, () => { const a = tally(loadMut(`${R3}/Tan_Hiep/F01-2/mutation.json`)), b = tally(loadMut(`${R3}/Tan_Hiep/G01-2/mutation.json`)); return { ok: a.Timeout === 18 && b.Timeout === 18, detail: `F01-2: ${fmt(a)} || G01-2: ${fmt(b)}` }; });
// Coupons
const coup = { total: 120, Killed: 39, Timeout: 21, Survived: 30, NoCoverage: 25, RuntimeError: 5, score: '52.17', assertionKill: '33.91', valid: 115 };
const coupExt = { total: 120, Killed: 41, Timeout: 21, Survived: 28, NoCoverage: 25, RuntimeError: 5, score: '53.91', assertionKill: '35.65' };
for (const [run, p] of [['S3 frozen (Hòa)', `${R3}/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-coupons-baseline/mutation.json`], ['D01-1-cc', `${R4}/D01-1-cc/coupons/mutation.json`], ['D01-1', `${R4}/Tan_Hiep/D01-1/coupons/mutation.json`]])
  claim(`Coupons baseline [${run}]`, '| 26 | 120 | 39 | 21 | 30 | 25 | 5 | 52.17% |', p, () => eq(tally(loadMut(p)), coup));
claim('Coupons valid 115 / 33.91%', '`39 / 115 * 100 = 33.91%`', `${R4}/D01-1-cc/coupons/mutation.json`, () => eq(tally(loadMut(`${R4}/D01-1-cc/coupons/mutation.json`)), { valid: 115, assertionKill: '33.91' }));
for (const [run, m, a] of [['S3 extensions (Hòa)', `${R3}/Thai_Hoa/Coupons-extensions-2026-10-23-agent/manual-mutation.json`, `${R3}/Thai_Hoa/Coupons-extensions-2026-10-23-agent/ai-mutation.json`], ['D01-1-cc', `${R4}/D01-1-cc/coupons-manual/mutation.json`, `${R4}/D01-1-cc/coupons-ai/mutation.json`], ['D01-1', `${R4}/Tan_Hiep/D01-1/coupons-manual/mutation.json`, `${R4}/Tan_Hiep/D01-1/coupons-ai/mutation.json`]]) {
  claim(`Coupons extended manual [${run}]`, '| Extended manual-analysis | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |', m, () => eq(tally(loadMut(m)), coupExt));
  claim(`Coupons extended AI [${run}]`, '| Extended Agent | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |', a, () => eq(tally(loadMut(a)), coupExt));
}
// Auth
const E03 = `${R3}/Phuc_Hoang/E03-baseline/mutation.json`, F03 = `${R3}/Phuc_Hoang/F03-manual/mutation.json`, G03 = `${R3}/Phuc_Hoang/G03-ai/mutation.json`;
claim('Auth baseline', '| 125 | 60 | 27 | 23 | 7 | 8 | 74.36% (= 87/117) | 51.28% (= 60/117) |', E03, () => eq(tally(loadMut(E03)), { total: 125, Killed: 60, Timeout: 27, Survived: 23, NoCoverage: 7, RuntimeError: 8, score: '74.36', assertionKill: '51.28', valid: 117 }));
claim('Auth manual', 'Killed 83, Timeout 27, Survived 4, NoCoverage 3, RuntimeError 8; Stryker score 94.02%, assertion kill 70.94%', F03, () => eq(tally(loadMut(F03)), { Killed: 83, Timeout: 27, Survived: 4, NoCoverage: 3, RuntimeError: 8, score: '94.02', assertionKill: '70.94' }));
claim('Auth AI reviewed', 'Killed 74, Timeout 27, Survived 13, NoCoverage 3, RuntimeError 8; Stryker score 86.32%, assertion kill 63.25%', G03, () => eq(tally(loadMut(G03)), { Killed: 74, Timeout: 27, Survived: 13, NoCoverage: 3, RuntimeError: 8, score: '86.32', assertionKill: '63.25' }));
claim('Auth AI raw 89.74%', 'Raw score là 89.74%', `${R3}/Phuc_Hoang/G03-ai/raw-candidate-run/mutation.json`, () => eq(tally(loadMut(`${R3}/Phuc_Hoang/G03-ai/raw-candidate-run/mutation.json`)), { score: '89.74' }));
claim('Auth 27/87 Timeout (31%), 23.1 points', '27 trong 87 mutant "detected" (31%)', E03, () => { const c = tally(loadMut(E03)); const pct = Math.round(100 * c.Timeout / (c.Killed + c.Timeout)); const gap = (c.score - c.assertionKill).toFixed(1); return { ok: c.Timeout === 27 && c.Killed + c.Timeout === 87 && pct === 31 && gap === '23.1' && guide.includes('23.1 điểm'), detail: `Timeout ${c.Timeout}/${c.Killed + c.Timeout} = ${pct}%, gap ${gap}` }; });
claim('Auth same 27 Timeout in baseline/manual/AI', 'Cùng 27 mutant đó là Timeout ở các run baseline, manual và AI', G03, () => { const sets = [E03, F03, G03].map((p) => Object.entries(loadMut(p)).filter(([, s]) => s === 'Timeout').map(([k]) => k).sort().join()); return { ok: sets[0] === sets[1] && sets[1] === sets[2], detail: `identical Timeout sets: ${sets[0] === sets[1] && sets[1] === sets[2]}` }; });
claim('Auth kill mapping 14/23/13/1/10/6', 'Claude kill 14 trong 30 mutant đã phân tích; manual tests kill 23. 13 mutant bị cả hai kill, một mutant chỉ Claude kill, 10 chỉ manual kill, 6 không bên nào kill', G03, () => {
  const b = loadMut(E03), m = loadMut(F03), a = loadMut(G03);
  const target = Object.keys(b).filter((k) => b[k] === 'Survived' || b[k] === 'NoCoverage');
  const mk = target.filter((k) => m[k] === 'Killed'), ak = target.filter((k) => a[k] === 'Killed');
  const both = mk.filter((k) => ak.includes(k)).length;
  const back = Object.keys(b).filter((k) => b[k] === 'Killed' && m[k] !== 'Killed').length;
  const r = { analysed: target.length, manual: mk.length, ai: ak.length, both, onlyAI: ak.length - both, onlyManual: mk.length - both, neither: target.length - mk.length - ak.length + both, manualRegressions: back };
  return { ok: r.analysed === 30 && r.manual === 23 && r.ai === 14 && both === 13 && r.onlyAI === 1 && r.onlyManual === 10 && r.neither === 6 && back === 0, detail: JSON.stringify(r) };
});
claim('Auth Windows reproduction 0 differences', 'Cùng 125 mutant và trạng thái cũng đã được tái lập trên Windows', `${R3}/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-auth-baseline/mutation.json`, () => { const x = loadMut(E03), y = loadMut(`${R3}/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-auth-baseline/mutation.json`); const keys = new Set([...Object.keys(x), ...Object.keys(y)]); const diff = [...keys].filter((k) => x[k] !== y[k]).length; return { ok: diff === 0 && keys.size === 125, detail: `${keys.size} mutants, ${diff} differences` }; });
claim('Auth sandbox weak 66.67%', 'weak tests 66.67%', `${R3}/Phuc_Hoang/C03-weak/mutation.json`, () => eq(tally(loadMut(`${R3}/Phuc_Hoang/C03-weak/mutation.json`)), { score: '66.67' }));
claim('Auth sandbox strong 88.89%', 'strong tests 88.89%', `${R3}/Phuc_Hoang/C03-strong/mutation.json`, () => eq(tally(loadMut(`${R3}/Phuc_Hoang/C03-strong/mutation.json`)), { score: '88.89' }));
claim('Auth disable comment 88.89% -> 100%', 'Score tăng từ 88.89% lên 100%', `${R3}/Phuc_Hoang/A03-S1-ignored/mutation.json`, () => { const s = tally(loadMut(`${R3}/Phuc_Hoang/A03-S1-strong/mutation.json`)), i = tally(loadMut(`${R3}/Phuc_Hoang/A03-S1-ignored/mutation.json`)); return { ok: s.score === '88.89' && i.score === '100.00', detail: `strong: ${fmt(s)} || ignored: ${fmt(i)}` }; });
const PROV = `${R3}/Phuc_Hoang/E03-provisional/mutation.json`, TOY = `${R3}/Thai_Hoa/C02-D02-2026-10-22-agent/tutorial-weak/mutation.json`;
claim('Auth provisional 73.45%', 'provisional 73.45% với baseline 74.36%', PROV, () => { const x = loadMut(PROV), y = loadMut(E03); const p = tally(x); const moved = Object.keys(y).filter((k) => x[k] === 'RuntimeError' && y[k] === 'Timeout').length; return { ok: p.score === '73.45' && moved === 4, detail: `provisional: ${fmt(p)} | RuntimeError->Timeout vs baseline: ${moved}` }; });
claim('Coupons toy example 60%', 'mutation score chỉ 60%', TOY, () => eq(tally(loadMut(TOY)), { score: '60.00' }));

// Test counts from logs
const grepLog = (p, re) => { const m = read(p).match(re); return m ? m[0] : null; };
const tests = [
  ['88 tests (Coupons checkout)', `${R4}/D01-1-cc/console.log`, /Tests:\s+88 passed, 88 total/],
  ['26 Coupons tests', `${R4}/D01-1-cc/console.log`, /Tests:\s+26 passed, 26 total/],
  ['35 manual / 40 AI Coupons', `${R4}/D01-1-cc/console.log`, /Tests:\s+35 passed[\s\S]*Tests:\s+40 passed/],
  ['36 Cart tests (workshop)', `${R4}/F01c-1-cc/console.log`, /Tests:\s+36 passed, 36 total/],
  ['88 tests (workshop)', `${R4}/F01c-1-cc/console.log`, /Tests:\s+88 passed, 88 total/],
  ['39 Auth manual tests', `${R3}/Phuc_Hoang/F03-manual/test-auth-manual.log`, /Tests:\s+39 passed, 39 total/],
  ['37 Auth AI tests', `${R3}/Phuc_Hoang/G03-ai/test-auth-ai.log`, /Tests:\s+37 passed, 37 total/],
];
tests.forEach(([id, p, re]) => results.push({ id: `Tests: ${id}`, verdict: fs.existsSync(p) ? (grepLog(p, re) ? 'MATCH' : 'NOT FOUND IN LOG') : 'NO SOURCE', guideText: '', sourcePath: p, detail: '' }));

log('');
log('== 2. Numbers (guide claim vs source)');
results.forEach((r) => log(`[${r.verdict}] ${r.id} | source: ${r.sourcePath}${r.detail ? ' | ' + r.detail : ''}`));

// ---------- 3. Mechanical ----------
log('');
log('== 3. Mechanical');
const blocks = (s) => [...s.replace(/\r/g, '').matchAll(/(```|~~~)[^\n]*\n([\s\S]*?)\n\1/g)].map((m) => m[2]);
const guideBlocks = new Set(blocks(guide));
for (const f of ['Guide_Contribution_Tan_Hiep.md', 'Guide_Contribution_Thai_Hoa.md', 'Guide_Contribution_Phuc_Hoang.md']) {
  const b = blocks(read(`materials/s4/${f}`));
  const miss = b.filter((x) => !guideBlocks.has(x));
  log(`  ${f}: ${b.length} code blocks, missing in guide: ${miss.length}`);
  miss.forEach((m) => log(`    MISSING: ${m.slice(0, 100).replace(/\n/g, ' | ')}`));
}
const links = [...guide.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]).filter((l) => !/^https?:|^#|^mailto:/.test(l));
const brokenLinks = links.filter((l) => !fs.existsSync(path.join(ROOT, 'materials/s4', l.split('#')[0])));
log(`  Relative links: ${links.length}, broken: ${brokenLinks.length}${brokenLinks.length ? ' -> ' + brokenLinks.join(', ') : ''}`);
const anchors = [...guide.matchAll(/\]\(#([^)]+)\)/g)].map((m) => m[1]);
const slug = (h) => h.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
const slugs = new Set([...guide.matchAll(/^#+ (.+)$/gm)].map((m) => slug(m[1])));
log(`  In-page anchors: ${anchors.length}, unresolved: ${anchors.filter((a) => !slugs.has(a)).join(', ') || 'none'}`);
// Blank out code blocks and inline code (keeping line breaks) so syntax such as <rootDir> is not reported.
const prose = guide
  .replace(/(```|~~~)[^\n]*\n[\s\S]*?\n\1/g, (m) => m.replace(/[^\n]/g, ' '))
  .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
const ph = [...prose.matchAll(/TODO|TBD|FIXME|XXX|điền sau|placeholder|<[A-Za-zÀ-ỹ _-]+>|lorem/gi)].map((m) => {
  const line = prose.slice(0, m.index).split('\n').length;
  return `line ${line}: "${m[0]}"`;
});
log(`  Placeholder tokens: ${ph.length}${ph.length ? ' -> ' + ph.join('; ') : ''}`);

fs.writeFileSync(path.join(__dirname, 'verify_output.txt'), out.join('\n') + '\n');
console.log(out.join('\n'));
