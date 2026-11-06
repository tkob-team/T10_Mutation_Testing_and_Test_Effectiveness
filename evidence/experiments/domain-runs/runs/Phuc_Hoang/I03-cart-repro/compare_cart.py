"""Compare my Cart runs with Tan Hiep's member runs and Thai Hoa's reproduction. Run from runs/Phuc_Hoang/ with python3 -I I03-cart-repro/compare_cart.py"""
import json, collections, os
T = '../Tan_Hiep/'; H = '../Thai_Hoa/D04-merge-2026-10-23-agent/'
pairs = {
    'baseline': ('I03-cart-repro/baseline/mutation.json', T + 'E01-1/mutation.json', H + 'frozen-cart-orders-baseline/mutation.json'),
    'manual': ('I03-cart-repro/manual/mutation.json', T + 'F01-2/mutation.json', H + 'cart-reproduced-manual/mutation.json'),
    'ai': ('I03-cart-repro/ai/mutation.json', T + 'G01-2/mutation.json', H + 'cart-reproduced-ai/mutation.json'),
}
def load(f):
    d = json.load(open(f)); fl = d['files']['server.js']
    tests = {t['id']: t['name'] for x in d['testFiles'].values() for t in x['tests']}
    return {(m['location']['start']['line'], m['location']['start']['column'], m['location']['end']['line'], m['location']['end']['column'], m['mutatorName'], m.get('replacement')): (m, tests) for m in fl['mutants']}, fl['source'].replace('\r', '')
out = ['| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | Stryker score | vs Hiệp (member run) | vs Hòa (Codex rerun) |', '|---|---|---|---|---|---|---|---|---|']
for k, (mine, hiep, hoa) in pairs.items():
    a, sa = load(mine); c = collections.Counter(m['status'] for m, _ in a.values())
    v = c['Killed'] + c['Timeout'] + c['Survived'] + c['NoCoverage']
    cells = []
    for f in (hiep, hoa):
        b, sb = load(f)
        diff = collections.Counter((b[x][0]['status'], a[x][0]['status']) for x in set(a) & set(b) if a[x][0]['status'] != b[x][0]['status'])
        cells.append(f"{len(set(a)&set(b))}/150 matched, source same: {sa == sb}, state differences: {sum(diff.values())}" + (f" ({', '.join(f'{p}→{q}: {n}' for (p, q), n in diff.items())})" if diff else ''))
    out.append(f"| {k} | {c['Killed']} | {c['Timeout']} | {c['Survived']} | {c['NoCoverage']} | {c['RuntimeError']} | {c['Killed']+c['Timeout']}/{v} = {100*(c['Killed']+c['Timeout'])/v:.2f}% | {cells[0]} | {cells[1]} |")
for k in ('manual', 'ai'):
    a, _ = load(f'I03-cart-repro/{k}/mutation.json'); b, _ = load(f'I03-cart-repro/{k}/npm-script-run/mutation.json')
    out.append(f"\n{k}: flags command vs `npm run mutate:cart-orders:{k}` — state differences: {sum(1 for x in a if a[x][0]['status'] != b[x][0]['status'])}/150")
# three shared cases (Thai Hoa notes: ids 6, 15, 68)
out.append('\n### Three shared Cart mutant cases (ids from Cross_Reproduction_Notes_Thai_Hoa.md)\n')
out.append('| id | Location | Mutator → replacement | Baseline | Manual (killedBy) | AI (killedBy) |')
out.append('|---|---|---|---|---|---|')
by = {k: {m['id']: (m, t) for m, t in load(pairs[k][0])[0].values()} for k in pairs}
for mid in ('6', '15', '68'):
    m, _ = by['baseline'][mid]; s, e = m['location']['start'], m['location']['end']
    def kb(k):
        mm, t = by[k][mid]; return mm['status'] + (' — ' + '; '.join(sorted({t[i].split('Tấn Hiệp ')[-1][:95] for i in mm.get('killedBy', [])})) if mm.get('killedBy') else '')
    out.append(f"| {mid} | L{s['line']}:{s['column']}–{e['line']}:{e['column']} | {m['mutatorName']} → `{m.get('replacement')}` | {m['status']} | {kb('manual')} | {kb('ai')} |")
open('I03-cart-repro/comparison.md', 'w').write('# S3-I03 comparison of my Cart reruns\n\n' + "\n".join(out) + "\n")
print("\n".join(out))
