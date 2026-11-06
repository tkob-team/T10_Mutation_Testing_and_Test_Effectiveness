"""S3-H03: compare the Auth baseline / manual / AI mutation reports. Usage (from runs/Phuc_Hoang/): python3 -I H03-comparison/compare_three.py"""
import json, hashlib, collections

RUNS = [
    ('baseline', 'E03-baseline/mutation.json'),
    ('manual', 'F03-manual/mutation.json'),
    ('ai_reviewed', 'G03-ai/mutation.json'),
    ('ai_raw', 'G03-ai/raw-candidate-run/mutation.json'),
]
D = {k: json.load(open(p)) for k, p in RUNS}
sig = lambda m: (m['location']['start']['line'], m['location']['start']['column'], m['mutatorName'], m.get('replacement'))
M = {k: {sig(m): m for m in d['files']['server.js']['mutants']} for k, d in D.items()}
out, js = [], {}

def tests(d):
    return sum(len(x['tests']) for x in d['testFiles'].values())

# 1. same source / config
out.append('## 1. Same source and configuration\n')
out.append('| Run | server.js source SHA-256 (from report) | Mutants | Tests | coverageAnalysis | concurrency | timeoutMS | timeoutFactor | mutate | Jest config |')
out.append('|---|---|---|---|---|---|---|---|---|---|')
for k, d in D.items():
    c = d['config']; sh = hashlib.sha256(d['files']['server.js']['source'].encode()).hexdigest()[:16]
    out.append(f"| {k} | `{sh}…` | {len(M[k])} | {tests(d)} | {c['coverageAnalysis']} | {c['concurrency']} | {c['timeoutMS']} | {c['timeoutFactor']} | `{c['mutate'][0]}` | `{c['jest']['configFile']}` |")
same_universe = all(set(M[k]) == set(M['baseline']) for k in M)
out.append(f"\nMutant universe (line, column, mutator, replacement) identical in all runs: **{same_universe}**.\n")
js['same_universe'] = same_universe

# 2. raw counts and score definitions
out.append('## 2. Raw counts and score definitions (per run; never summed or averaged across runs or domains)\n')
out.append('| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | Total | Stryker score (K+T)/(K+T+S+N) | Assertion kill K/(K+T+S+N) | K/all 125 (errors kept in denominator) | Timeout share of detected T/(K+T) |')
out.append('|---|---|---|---|---|---|---|---|---|---|---|')
js['counts'] = {}
for k in M:
    c = collections.Counter(m['status'] for m in M[k].values())
    K, T, S, N, E = (c[x] for x in ('Killed', 'Timeout', 'Survived', 'NoCoverage', 'RuntimeError'))
    v = K + T + S + N
    js['counts'][k] = dict(Killed=K, Timeout=T, Survived=S, NoCoverage=N, RuntimeError=E, valid=v, stryker_score=round(100 * (K + T) / v, 2), assertion_kill=round(100 * K / v, 2))
    out.append(f"| {k} | {K} | {T} | {S} | {N} | {E} | {sum(c.values())} | {K+T}/{v} = {100*(K+T)/v:.2f}% | {K}/{v} = {100*K/v:.2f}% | {K}/{sum(c.values())} = {100*K/sum(c.values()):.2f}% | {T}/{K+T} = {100*T/(K+T):.1f}% |")

# 3. fixed sets
out.append('\n## 3. Timeout and RuntimeError sets\n')
for st in ('Timeout', 'RuntimeError'):
    sets = {k: frozenset(s for s, m in M[k].items() if m['status'] == st) for k in M}
    same = len(set(sets.values())) == 1
    out.append(f"- {st}: sizes {({k: len(v) for k, v in sets.items()})}; same set in all four runs: **{same}**.")
    js[st + '_same_set'] = same
src = D['baseline']['files']['server.js']['source'].split('\n')
tc = collections.Counter(m['mutatorName'] for m in M['baseline'].values() if m['status'] == 'Timeout')
out.append(f"- Timeout by mutator: {dict(tc)}. They stop a handler or callback from answering (empty block, `if (true/false)`, removed call), so the request hangs until `timeoutMS`; no assertion decides the outcome.")
out.append(f"- RuntimeError by mutator: {dict(collections.Counter(m['mutatorName'] for m in M['baseline'].values() if m['status']=='RuntimeError'))} — empty SQL string with bind parameters, `sqlite3` 6.0.1 exits with SIGSEGV (see `../E03-baseline/console.log`).\n")

# 4. transitions and overlap on the 30 baseline survivors
out.append('## 4. State changes against the baseline and overlap on the 30 baseline Survived/NoCoverage mutants\n')
for k in ('manual', 'ai_reviewed', 'ai_raw'):
    tr = collections.Counter((M['baseline'][s]['status'], M[k][s]['status']) for s in M['baseline'] if M['baseline'][s]['status'] != M[k][s]['status'])
    out.append(f"- baseline → {k}: " + ", ".join(f"{a}→{b}: {n}" for (a, b), n in sorted(tr.items())) + ('' if tr else 'none') + f"; regressions (Killed/Timeout → other): {sum(n for (a,b),n in tr.items() if a in ('Killed','Timeout'))}.")
    js['transitions_' + k] = {f"{a}->{b}": n for (a, b), n in tr.items()}
base30 = [s for s, m in M['baseline'].items() if m['status'] in ('Survived', 'NoCoverage')]
mk = {s for s in base30 if M['manual'][s]['status'] == 'Killed'}
ak = {s for s in base30 if M['ai_reviewed'][s]['status'] == 'Killed'}
out.append(f"- Of {len(base30)} mutants: manual kills {len(mk)}, reviewed AI kills {len(ak)}; both {len(mk & ak)}, AI only {len(ak - mk)}, manual only {len(mk - ak)}, neither {len(set(base30) - mk - ak)}; union {len(mk | ak)} (from two separate runs; a combined suite was NOT run).")
js['overlap'] = dict(manual=len(mk), ai=len(ak), both=len(mk & ak), ai_only=len(ak - mk), manual_only=len(mk - ak), neither=len(set(base30) - mk - ak), union=len(mk | ak))
kt = {}
for k in ('baseline', 'manual', 'ai_reviewed'):
    d = D[k]; ks = set(i for m in d['files']['server.js']['mutants'] for i in m.get('killedBy', []))
    kt[k] = (len(ks), tests(d))
out.append("- Tests that kill at least one mutant / tests in the run: " + ", ".join(f"{k} {a}/{b}" for k, (a, b) in kt.items()) + '.')
open('H03-comparison/comparison.md', 'w').write('# S3-H03 comparison data (Authentication & Users, SUT 806ba19)\n\nGenerated by `compare_three.py` from the four `mutation.json` files named in its header.\n\n' + "\n".join(out) + "\n")
json.dump(js, open('H03-comparison/comparison.json', 'w'), indent=2)
print("\n".join(out))
