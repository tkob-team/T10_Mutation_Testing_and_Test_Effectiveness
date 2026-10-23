"""Validate the S4 handoff and its evidence without rerunning experiments."""
import collections
import hashlib
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote,urlsplit

P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'CONTEXT.md').exists())
FILES=[ROOT/'materials/s4'/name for name in ('Guide_Contribution_Thai_Hoa.md','Report_Contribution_Thai_Hoa.md','Demo_Contribution_Thai_Hoa.md','Guide_Reproduction_Thai_Hoa.md','Seminar_Report.md','Verification_Notes_Thai_Hoa.md')]+[ROOT/'experiments/s4/Overall_Comparison.md',ROOT/'draft/Seminar_Report.md',P/'README.md',P.parent/'S4-D02-2026-10-23-agent/README.md']

def main():
    errors=[]
    checks=[]
    def check(ok,label):
        checks.append({'check':label,'pass':bool(ok)})
        if not ok: errors.append(label)
    def clean_code(text):
        return re.sub(r'^(```|~~~)[^\n]*\n.*?^\1\s*$', '',text,flags=re.M|re.S)
    def slug(s):
        s=re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',s).lower()
        s=s.replace('`','').replace('**','').replace('\\','')
        return re.sub(r'[^\w\- ]','',s).replace(' ','-')
    inventory={rel:(ROOT/rel).exists() for rel in ('materials/s4/Guide_Contribution_Phuc_Hoang.md','materials/s4/User_Guide.md','materials/s4/Report_Contribution_Tan_Hiep.md','materials/s4/Report_Contribution_Phuc_Hoang.md')}
    link_count=0
    for f in FILES:
        check(f.exists(),'exists '+str(f.relative_to(ROOT)))
        if not f.exists():continue
        raw=f.read_text(encoding='utf-8')
        check(not any(c in raw for c in ('\u00b7','\u2014')),'punctuation '+f.name)
        fences=re.findall(r'^(?:```|~~~)',raw,re.M)
        check(len(fences)%2==0,'balanced fences '+f.name)
        text=clean_code(raw)
        targets=re.findall(r'\]\(([^)]+)\)',text)+re.findall(r'^\[\d+\]:\s+(\S+)',text,re.M)
        for target in targets:
            target=html.unescape(target)
            if urlsplit(target).scheme:continue
            link_count+=1
            path,_,anchor=target.partition('#')
            dest=(f.parent/unquote(path)).resolve() if path else f
            check(dest.exists(),f.name+' link exists '+target)
            if anchor and dest.exists() and dest.is_file():
                contents=clean_code(dest.read_text(encoding='utf-8'))
                ids=re.findall(r'<a\s+(?:id|name)=[\"\']([^\"\']+)',contents)
                ids += [slug(h) for h in re.findall(r'^#{1,6}\s+(.+)$',contents,re.M)]
                check(unquote(anchor) in ids,f.name+' anchor exists '+target)
        check(not any(x in text for x in ('[Tên người thực hiện]','[Các task dùng file này]','[Phạm vi được giao]')),'filled template slots '+f.name)
    for t in [ROOT/'materials/s4'/n for n in ('Guide_Contribution_TEMPLATE.md','Report_Contribution_TEMPLATE.md','Demo_Contribution_TEMPLATE.md')]+[ROOT/'docs/templates/Task_Notes_TEMPLATE.md']:
        committed=subprocess.check_output(['git','show','91b87c6a4b5b047d592961b62b20b0b57572f642:'+t.relative_to(ROOT).as_posix()],cwd=ROOT)
        check(committed.replace(b'\r\n',b'\n')==t.read_bytes().replace(b'\r\n',b'\n'),'template unchanged '+t.name)
    if (P/'summary.json').exists():
        s=json.loads((P/'summary.json').read_text(encoding='utf-8'))
        for k,d in s['profiles'].items():
            r=json.loads((P/(k+'-mutation.json')).read_text(encoding='utf-8'))
            counts=collections.Counter(m['status'] for f in r['files'].values() for m in f['mutants'])
            check(sum(counts.values())==395,k+' 395 raw mutants')
            check(all(counts[v]==d[v] for v in counts),k+' summary matches raw states')
            v=sum(counts[t] for t in ('Killed','Timeout','Survived','NoCoverage'))
            check(abs(d['score']-100*(counts['Killed']+counts['Timeout'])/v)<1e-5,k+' score denominator')
            check(d['Pending']==0,k+' no pending mutants')
            tests=json.loads((P/(k+'-tests.json')).read_text(encoding='utf-8'))
            check(tests['success'] and tests['numPassedTests']==d['tests'],k+' passing tests')
            log=(P/(k+'-mutation.log')).read_text(encoding='utf-8')
            check('Done in ' in log,k+' full mutation completed')
        base=json.loads((P/'protected-before.json').read_text())
        for k in ('baseline','manual','ai'):
            check(json.loads((P/(k+'-protected-after.json')).read_text())==base,k+' protected runtime unchanged')
        pres=json.loads((P/'source-preservation.json').read_text())
        check(all(pres['before'][f]==pres['after'][f] for f in pres['before'] if f!='backend/package.json'),'original SUT production and lock unchanged across external update')
        check(pres.get('agentWritesToSourceRepository')==[],'no original SUT writes recorded for this Agent')
        check(pres.get('changedFiles')==['backend/package.json'] and (P/'postflight-recovery.json').exists(),'external package commit explicitly disclosed')
    canonical=ROOT/'materials/s4/Seminar_Report.md'
    if canonical.exists():
        stage=canonical.read_text(encoding='utf-8')
        reverted=re.sub(r'(\]\(|^\[\d+\]: )\.\./\.\./',r'\1../',stage,flags=re.M)
        check(reverted==(ROOT/'draft/Seminar_Report.md').read_text(encoding='utf-8'),'report/draft synchronized')
        for stale in ('chưa có dữ liệu manual/AI comparison','Chưa có bàn giao completed comparison','Auth manual/AI comparison chưa có','chưa có combined mutation run','gpt-sol-6-1'):
            check(stale not in stage,'removed stale report claim '+stale)
    repro=P.parent/'S4-D02-2026-10-23-agent'
    result=json.loads((repro/'result.json').read_text(encoding='utf-8'))
    check(hashlib.sha256((repro/'guide-tested.md').read_bytes()).hexdigest()==result['guideSHA256'],'Auth guide tested snapshot hash')
    check(result['protectedBefore']==result['protectedAfter'],'Auth guide runtime protected files unchanged')
    commands=json.loads((repro/'commands.json').read_text())
    check(all(r['exitCode']==0 for r in commands[:-1]) and commands[-1]['label']=='manual-command' and commands[-1]['exitCode']==1,'Auth guide stopped at actual missing-script command')
    check('Missing script: "test:auth:manual"' in (repro/'manual-command.log').read_text(),'Auth guide concrete missing-script evidence')
    d=json.loads((repro/'auth-mutation.json').read_text())
    c=collections.Counter(m['status'] for f in d['files'].values() for m in f['mutants'])
    check(c=={'Killed':60,'Timeout':27,'Survived':23,'NoCoverage':7,'RuntimeError':8},'Auth guide raw mutation counts match documented result')
    record={'pass':not errors,'checks':len(checks),'localLinkOccurrences':link_count,'inventory':inventory,'findings':errors,'details':checks}
    (P/'document-validation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in record.items() if k!='details'},ensure_ascii=False,indent=2))
    if errors:raise SystemExit(1)

if __name__=='__main__':main()
