import json,sys,collections,csv
d=json.load(open(sys.argv[1])); fl=d['files']['server.js']
R=[("POST /api/register",20,31),("POST /api/login",32,67),("POST /api/forgot-password",68,86),("POST /api/reset-password",87,99),("authenticateToken (middleware, shared)",100,111),("GET /api/users/me",112,117),("PUT /api/users/me",118,136)]
def route(l):
    for n,a,b in R:
        if a<=l<=b: return n
    return None
ST=['Killed','Timeout','Survived','NoCoverage','RuntimeError']
c=collections.defaultdict(collections.Counter); rows=[]
for m in fl['mutants']:
    s,e=m['location']['start'],m['location']['end']
    r=route(s['line']); assert r, m
    c[r][m['status']]+=1
    rows.append([m['id'],r,m['status'],m['mutatorName'],f"{s['line']}:{s['column']}-{e['line']}:{e['column']}",(m.get('replacement') or '').replace('\n',' ')[:80],len(m.get('killedBy',[])) if 'killedBy' in m else ''])
tot=collections.Counter()
out=["| Route / unit | Lines | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError |","|---|---|---|---|---|---|---|---|"]
for n,a,b in R:
    v=c[n]; tot.update(v)
    out.append(f"| {n} | {a}–{b} | {sum(v.values())} | "+" | ".join(str(v[s]) for s in ST)+" |")
out.append(f"| **Total** | 20–135 | {sum(tot.values())} | "+" | ".join(str(tot[s]) for s in ST)+" |")
K,T,S_,N,E=[tot[s] for s in ST]
out.append("")
out.append(f"Stryker score = (Killed+Timeout)/(Killed+Timeout+Survived+NoCoverage) = ({K}+{T})/({K+T+S_+N}) = {100*(K+T)/(K+T+S_+N):.2f}%; covered = {100*(K+T)/(K+T+S_):.2f}%; assertion-kill = {K}/{K+T+S_+N} = {100*K/(K+T+S_+N):.2f}%; RuntimeError {E} excluded from denominator.")
open(sys.argv[2]+'/by_route.md','w').write("\n".join(out)+"\n")
with open(sys.argv[2]+'/mutants.csv','w',newline='') as f:
    w=csv.writer(f); w.writerow(['id','route','status','mutator','location','replacement','killedBy_count']); w.writerows(rows)
print("\n".join(out))
