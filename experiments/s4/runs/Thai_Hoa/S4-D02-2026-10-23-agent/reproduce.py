"""Follow the delivered Auth guide until its first blocking instruction."""
import hashlib,json,os,subprocess,tempfile
from datetime import datetime,timezone
from pathlib import Path

P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'CONTEXT.md').exists())
SUT=ROOT.parent/'eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness'
RUN=Path(tempfile.mkdtemp(prefix='t10-s4-auth-guide-'))/'eshop-sut'
BASE='806ba19ee4e09eafe9b2696ccf117a2b1ab841ef'
records=[]
guide=ROOT/'materials/s4/Guide_Contribution_Phuc_Hoang.md'
snapshot=guide.read_bytes()
(P/'guide-tested.md').write_bytes(snapshot)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
meta={'guide':'materials/s4/Guide_Contribution_Phuc_Hoang.md','guideSHA256':sha(guide),'docsCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT).decode().strip(),'executor':'OpenAI Codex AI Agent','runtime':str(RUN),'adaptation':'npm.cmd/npx.cmd for Windows shell; local shared clone preserves the same frozen source; no supplementary setup added','frozenCommit':BASE}
def run(label,args,cwd,expected=0):
    print('START '+label,flush=True)
    r={'label':label,'args':list(map(str,args)),'cwd':str(cwd),'startUTC':datetime.now(timezone.utc).isoformat()}
    with (P/(label+'.log')).open('w',encoding='utf-8') as out:
        p=subprocess.run(args,cwd=cwd,stdout=out,stderr=subprocess.STDOUT,env=dict(os.environ,CI='true',FORCE_COLOR='0'),timeout=900)
    r.update(exitCode=p.returncode,endUTC=datetime.now(timezone.utc).isoformat());records.append(r)
    (P/'commands.json').write_text(json.dumps(records,indent=2)+'\n',encoding='utf-8')
    print('END '+label+': '+str(p.returncode),flush=True)
    assert p.returncode==expected,(label,p.returncode)
run('clone',['git','clone','--shared',str(SUT),str(RUN)],SUT.parent)
assert Path(subprocess.check_output(['git','rev-parse','--show-toplevel'],cwd=RUN).decode().strip()).resolve()==RUN.resolve()
meta['statusBeforeCheckout']=subprocess.check_output(['git','status','--short'],cwd=RUN).decode()
run('checkout',['git','checkout','--detach',BASE],RUN)
b=RUN/'backend'
protected={p:sha(b/p) for p in ('server.js','database.js','database.sqlite','package.json','package-lock.json')}
meta['versions']={k:subprocess.check_output(v).decode().strip() for k,v in {'node':['node','--version'],'npm':['npm.cmd','--version']}.items()}
run('install',['npm.cmd','ci','--no-audit','--no-fund'],b)
run('integration',['npm.cmd','test'],b)
run('auth-tests',['npm.cmd','run','test:auth'],b)
run('auth-dry',['npx.cmd','stryker','run','stryker.auth.config.json','--dryRunOnly'],b)
run('auth-mutation',['npm.cmd','run','mutate:auth'],b)
for ext in ('html','json'):(P/('auth-mutation.'+ext)).write_bytes((b/'reports/auth'/('mutation.'+ext)).read_bytes())
run('manual-command',['npm.cmd','run','test:auth:manual'],b,expected=1)
after={p:sha(b/p) for p in protected}
assert after==protected
meta.update(protectedBefore=protected,protectedAfter=after,stoppedAt='Advanced Usage 2: npm run test:auth:manual; missing script after instructed frozen checkout',status='Blocked at manual setup; baseline portion technically reproduced; member self-run remains Pending')
(P/'result.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('COMPLETE: baseline reproduced; advanced guide command blocked',flush=True)
