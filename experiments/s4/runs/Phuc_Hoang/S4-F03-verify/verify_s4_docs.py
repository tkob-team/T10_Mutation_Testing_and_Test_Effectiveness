"""S4-F03: recompute the numbers quoted in the S4 contributions of Phuc Hoang from the saved mutation.json files and check relative links.
Run from the repo root: python3 -I experiments/s4/runs/Phuc_Hoang/S4-F03-verify/verify_s4_docs.py"""
import json, collections, re, os, sys
R = 'experiments/s3/runs/Phuc_Hoang/'
runs = {'baseline': R + 'E03-baseline/mutation.json', 'manual': R + 'F03-manual/mutation.json',
        'ai': R + 'G03-ai/mutation.json', 'ai_raw': R + 'G03-ai/raw-candidate-run/mutation.json'}
expected = {  # K, T, S, NC, RE, score%, assertion-kill%  as written in the docs
    'baseline': (60, 27, 23, 7, 8, 74.36, 51.28), 'manual': (83, 27, 4, 3, 8, 94.02, 70.94),
    'ai': (74, 27, 13, 3, 8, 86.32, 63.25), 'ai_raw': (78, 27, 12, 0, 8, 89.74, 66.67)}
def load(f):
    d = json.load(open(f)); out = {}
    for m in d['files']['server.js']['mutants']:
        s, e = m['location']['start'], m['location']['end']
        out[(s['line'], s['column'], e['line'], e['column'], m['mutatorName'], m.get('replacement'))] = m
    return out
data = {k: load(v) for k, v in runs.items()}
fail = 0
print('| run | mutants | K | T | S | NC | RE | score | assertion kill | matches docs |\n|---|---|---|---|---|---|---|---|---|---|')
for k, d in data.items():
    c = collections.Counter(m['status'] for m in d.values()); v = c['Killed'] + c['Timeout'] + c['Survived'] + c['NoCoverage']
    got = (c['Killed'], c['Timeout'], c['Survived'], c['NoCoverage'], c['RuntimeError'], round(100 * (c['Killed'] + c['Timeout']) / v, 2), round(100 * c['Killed'] / v, 2))
    ok = got == expected[k]; fail += not ok
    print(f"| {k} | {len(d)} | {' | '.join(map(str, got))} | {'OK' if ok else 'DIFF ' + str(expected[k])} |")
# Timeout set identical, share of detected, RuntimeError denominator alternative
to = {k: {x for x, m in d.items() if m['status'] == 'Timeout'} for k, d in data.items()}
same = all(to[k] == to['baseline'] for k in to)
print('\nTimeout sets identical across 4 runs:', same, '| count', len(to['baseline'])); fail += not same
for k in ('baseline', 'manual', 'ai'):
    c = collections.Counter(m['status'] for m in data[k].values()); det = c['Killed'] + c['Timeout']
    print(f"{k}: Timeout share of detected {100*c['Timeout']/det:.1f}%; Killed/125 = {100*c['Killed']/125:.2f}%")
# kill mapping on the 30 baseline survivors/uncovered
base = data['baseline']; surv = [x for x, m in base.items() if m['status'] in ('Survived', 'NoCoverage')]
kill = {k: {x for x in surv if data[k][x]['status'] == 'Killed'} for k in ('manual', 'ai')}
both, only_ai, only_man = kill['manual'] & kill['ai'], kill['ai'] - kill['manual'], kill['manual'] - kill['ai']
none = set(surv) - kill['manual'] - kill['ai']
got = (len(surv), len(kill['manual']), len(kill['ai']), len(both), len(only_ai), len(only_man), len(none), len(kill['manual'] | kill['ai']))
print('\nsurvivors, manual kills, ai kills, both, only ai, only manual, neither, union =', got, '(docs: 30, 23, 14, 13, 1, 10, 6, 24)')
fail += got != (30, 23, 14, 13, 1, 10, 6, 24)
regress = sum(1 for k in ('manual', 'ai') for x, m in base.items() if m['status'] == 'Killed' and data[k][x]['status'] != 'Killed')
print('Killed->other regressions:', regress); fail += regress != 0
m132 = [m for x, m in base.items() if x[0] == 124 and x[4] == 'ConditionalExpression' and x[5] == 'true']
tn = lambda k: {t['id']: t['name'] for f in json.load(open(runs[k]))['testFiles'].values() for t in f['tests']}
for k in ('manual', 'ai'):
    x = next(x for x in data[k] if x[0] == 124 and x[4] == 'ConditionalExpression' and x[5] == 'true'); names = tn(k)
    print(f'#132 role->true in {k}:', data[k][x]['status'], [names[i][:60] for i in data[k][x].get('killedBy', [])])
# links
print('\nLink check:')
for doc in ['materials/s4/Guide_Contribution_Phuc_Hoang.md', 'materials/s4/Report_Contribution_Phuc_Hoang.md', 'materials/s4/Demo_Contribution_Phuc_Hoang.md',
            'materials/s4/Guide_Reproduction_Phuc_Hoang.md', 'materials/s4/Verification_Notes_Phuc_Hoang.md']:
    if not os.path.exists(doc): print('  (missing doc)', doc); fail += 1; continue
    bad = []
    n = 0
    for t in re.findall(r'\]\(([^)\s]+)\)', open(doc).read()):
        if t.startswith(('http', '#', 'mailto')): continue
        n += 1
        if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(doc), t.split('#')[0]))): bad.append(t)
    print(f'  {doc}: {n} relative links, missing: {bad or 0}'); fail += len(bad)
print('\nRESULT:', 'ALL CHECKS PASSED' if not fail else f'{fail} problem(s)')
