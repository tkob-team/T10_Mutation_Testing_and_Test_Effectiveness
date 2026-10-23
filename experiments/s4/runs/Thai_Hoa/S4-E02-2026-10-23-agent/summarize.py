"""Derive all comparison counts and mappings from the completed joint reports."""
import collections
import hashlib
import json
from pathlib import Path

P = Path(__file__).resolve().parent
PROFILES = ('baseline','manual','ai')
def signature(file, m):
    return json.dumps([file,m['location'],m['mutatorName'],m['replacement']],sort_keys=True,ensure_ascii=False)
def domain(m):
    n=m['location']['start']['line']
    return 'Auth' if 20<=n<=135 else ('Coupons' if 355<=n<=492 else 'Cart')
def metric(counts):
    c={s:counts.get(s,0) for s in ('Killed','Timeout','Survived','NoCoverage','RuntimeError','CompileError','Ignored','Pending')}
    v=sum(c[s] for s in ('Killed','Timeout','Survived','NoCoverage'))
    return dict(c,total=sum(c.values()),valid=v,score=round(100*(c['Killed']+c['Timeout'])/v,6) if v else None,assertionKill=round(100*c['Killed']/v,6) if v else None)
def main():
    reports={k:json.loads((P/(k+'-mutation.json')).read_text(encoding='utf-8')) for k in PROFILES}
    maps={k:{signature(f,m):dict(m,file=f,domain=domain(m)) for f,fd in d['files'].items() for m in fd['mutants']} for k,d in reports.items()}
    assert len(maps['baseline'])==395
    assert all(set(maps[k])==set(maps['baseline']) for k in PROFILES)
    sources={k:{f:hashlib.sha256(fd['source'].replace('\r\n','\n').encode()).hexdigest() for f,fd in d['files'].items()} for k,d in reports.items()}
    assert all(sources[k]==sources['baseline'] for k in PROFILES)
    summary={'sameUniverse':True,'sameSource':True,'sourceHashes':sources,'profiles':{},'comparisons':{}}
    for k,d in reports.items():
        js=json.loads((P/(k+'-tests.json')).read_text(encoding='utf-8'))
        assert js['success'] and js['numFailedTests']==0
        summary['profiles'][k]=dict(metric(collections.Counter(m['status'] for m in maps[k].values())),tests=js['numPassedTests'],suites=js['numPassedTestSuites'],domains={dom:metric(collections.Counter(m['status'] for m in maps[k].values() if m['domain']==dom)) for dom in ('Cart','Coupons','Auth')})
    rows=[]
    added={}
    for k in ('manual','ai'):
        transitions=collections.Counter(maps['baseline'][s]['status']+' -> '+maps[k][s]['status'] for s in maps['baseline'] if maps['baseline'][s]['status']!=maps[k][s]['status'])
        new=[s for s in maps['baseline'] if maps['baseline'][s]['status'] in ('Survived','NoCoverage') and maps[k][s]['status']=='Killed']
        added[k]=set(new)
        summary['comparisons'][k]=dict(transitions=dict(transitions),newAssertionKills=len(new),detectedToUndetected=sum(1 for s in maps['baseline'] if maps['baseline'][s]['status'] in ('Killed','Timeout') and maps[k][s]['status'] in ('Survived','NoCoverage')))
    summary['overlap']={'both':len(added['manual']&added['ai']),'manualOnly':len(added['manual']-added['ai']),'aiOnly':len(added['ai']-added['manual']),'union':len(added['manual']|added['ai'])}
    for s,b in maps['baseline'].items():
        row={'signature':json.loads(s),'domain':b['domain'],'states':{k:maps[k][s]['status'] for k in PROFILES},'ids':{k:maps[k][s]['id'] for k in PROFILES},'killers':{}}
        for k,d in reports.items():
            tests={t['id']:{'file':f,'name':t['name']} for f,fd in d.get('testFiles',{}).items() for t in fd.get('tests',[])}
            row['killers'][k]=[tests.get(t,{'id':t}) for t in maps[k][s].get('killedBy',[])]
        rows.append(row)
    (P/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (P/'mutant-mapping.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    header='| Domain | Location | Mutator / replacement | Baseline | Manual | AI | Manual killer | AI killer |\n|---|---|---|---|---|---|---|---|\n'
    def safe(s):return str(s).replace('|','&#124;').replace('\n',' ').replace('`','')
    lines=[]
    for r in rows:
        loc=r['signature'][1]['start']
        cols=[r['domain'],f"{loc['line']}:{loc['column']}",r['signature'][2]+' / '+r['signature'][3],*r['states'].values()]
        cols += ['; '.join(t.get('file','')+': '+t.get('name',str(t)) for t in r['killers'][k]) for k in ('manual','ai')]
        lines.append('| '+' | '.join(safe(c) for c in cols)+' |')
    (P/'mutant-mapping.md').write_text('# Joint Mutant Mapping\n\nGenerated from the three completed reports. Killer lists reflect the information recorded by Stryker, which can stop after a detecting failure.\n\n'+header+'\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in summary.items() if k not in ('sourceHashes',)},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
