"""Run a joint three-domain comparison in a disposable local clone.

Inputs: the sibling SUT repo and the retained S3 evidence in this docs repo.
Usage: python run.py [new-output-directory]
No production files, original tests or original package manifest are edited.
"""
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
DOCS = next(p for p in HERE.parents if (p / 'CONTEXT.md').exists())
SUT = DOCS.parent / 'eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness'
OUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else HERE
BASE = '806ba19ee4e09eafe9b2696ccf117a2b1ab841ef'
SCOPE = ['server.js:20-135', 'server.js:280-349', 'server.js:355-492', 'server.js:510-568']
RUN = Path(tempfile.mkdtemp(prefix='t10-s4-overall-')) / 'sut'
OUT.mkdir(parents=True, exist_ok=True)
RECORDS = []

def now(): return datetime.now(timezone.utc).isoformat()
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
def command(label, args, cwd, allowed=(0,)):
    print('START ' + label, flush=True)
    record = dict(label=label, args=list(map(str,args)), cwd=str(cwd), startUTC=now())
    env = dict(os.environ, FORCE_COLOR='0', NO_COLOR='1', CI='true')
    with (OUT / (label + '.log')).open('w', encoding='utf-8') as stream:
        p = subprocess.run(args, cwd=cwd, stdout=stream, stderr=subprocess.STDOUT, env=env, timeout=1800)
    record.update(endUTC=now(), exitCode=p.returncode)
    RECORDS.append(record)
    save(OUT / 'commands.json', RECORDS)
    print('END ' + label + ': ' + str(p.returncode), flush=True)
    if p.returncode not in allowed: raise RuntimeError(label + ': see retained log')
    return p.returncode
def git(*args, cwd=SUT):
    return subprocess.check_output(['git', *args], cwd=cwd).decode('utf-8').strip()
def mutate_git(*args):
    assert Path(git('rev-parse','--show-toplevel',cwd=RUN)).resolve() == RUN.resolve()
    status = git('status','--short',cwd=RUN)
    RECORDS.append({'gitRoot':str(RUN), 'statusBeforeMutation': status, 'gitAction':args, 'atUTC':now()})
    return git(*args,cwd=RUN)

def main():
    before = {p: sha(SUT / p) for p in ['backend/server.js','backend/database.js','backend/database.sqlite','backend/package.json','backend/package-lock.json']}
    save(OUT / 'original-sut-before.json', before)
    metadata = dict(frozenCommit=BASE, sourceRepository=str(SUT), sourceHead=git('rev-parse','HEAD'), sourceStatus=git('status','--short'), runtime=str(RUN), executor='OpenAI Codex AI Agent', createdUTC=now(), scope=SCOPE)
    save(OUT / 'inputs.json', metadata)
    command('clone', ['git','clone','--shared','--branch','s3/D04-baseline',str(SUT),str(RUN)], SUT.parent)
    assert git('rev-parse','HEAD',cwd=RUN) == BASE
    backend = RUN / 'backend'
    protected = {p: sha(backend / p) for p in ['server.js','database.js','database.sqlite','package.json','package-lock.json','test/cart-orders.test.js','test/coupons.test.js','test/coupons-flow.test.js','test/auth.spec.test.js']}
    save(OUT / 'protected-before.json', protected)
    metadata['versions'] = {name: subprocess.check_output(args).decode().strip() for name,args in {'node':['node','--version'],'npm':['npm.cmd','--version']}.items()}
    save(OUT / 'inputs.json', metadata)
    command('install', ['npm.cmd','ci','--no-audit','--no-fund'], backend)
    for profile in ('baseline','manual','ai'):
        mutate_git('checkout','-b',f'codex/s4-overall-{profile}',BASE)
        overlay = []
        def put(relative, content):
            dest = backend / relative
            dest.parent.mkdir(parents=True,exist_ok=True)
            dest.write_bytes(content)
            snap = OUT / 'inputs' / profile / 'backend' / relative
            snap.parent.mkdir(parents=True,exist_ok=True)
            snap.write_bytes(content)
            overlay.append({'path':'backend/'+relative,'sha256':sha(dest)})
        cart = ['<rootDir>/test/cart-orders.test.js','<rootDir>/test/coupons.test.js','<rootDir>/test/coupons-flow.test.js']
        auth = ['<rootDir>/test/auth.spec.test.js']
        if profile != 'baseline':
            cart_ref = 'b77f5d6' if profile == 'manual' else 'f4696c6'
            cart_path = f'test/{profile}/cart-orders.{profile}.js'
            put(cart_path, subprocess.check_output(['git','show',cart_ref+':backend/'+cart_path],cwd=SUT))
            cart.append('<rootDir>/' + cart_path)
            extension = DOCS / 'experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend'
            coupon_path = f'test/{profile}/coupons.{profile}.js'
            put(coupon_path, (extension / coupon_path).read_bytes())
            put('test/helpers/coupons-scenarios.js',(extension / 'test/helpers/coupons-scenarios.js').read_bytes())
            cart.append('<rootDir>/' + coupon_path)
            auth_path = f'test/auth.{profile}.test.js'
            auth_dir = 'F03-manual' if profile=='manual' else 'G03-ai'
            put(auth_path,(DOCS / 'experiments/s3/runs/Phuc_Hoang' / auth_dir / Path(auth_path).name).read_bytes())
            auth.append('<rootDir>/' + auth_path)
        config = {'projects':[
            {'rootDir':'<rootDir>', 'displayName':'cart-coupons','testEnvironment':'node','setupFiles':['<rootDir>/test/helpers/isolate.js'],'testMatch':cart,'modulePathIgnorePatterns':['<rootDir>/stryker-tmp/']},
            {'rootDir':'<rootDir>', 'displayName':'auth','testEnvironment':'node','testMatch':auth,'setupFilesAfterEnv':['<rootDir>/test/auth-cleanup.cjs'],'modulePathIgnorePatterns':['<rootDir>/stryker-tmp/']}
        ]}
        put('jest.overall.config.cjs', ('module.exports = '+json.dumps(config,indent=2)+';\n').encode())
        stryker = {'$schema':'./node_modules/@stryker-mutator/core/schema/stryker-schema.json','testRunner':'jest','coverageAnalysis':'perTest','mutate':SCOPE,'tempDirName':'stryker-tmp','concurrency':2,'timeoutMS':5000,'timeoutFactor':1.5,'reporters':['clear-text','html','json'],'htmlReporter':{'fileName':'reports/overall/mutation.html'},'jsonReporter':{'fileName':'reports/overall/mutation.json'},'jest':{'configFile':'jest.overall.config.cjs'}}
        put('stryker.overall.config.json',(json.dumps(stryker,indent=2)+'\n').encode())
        mutate_git('add', '--', *['backend/'+p['path'].removeprefix('backend/') for p in overlay])
        mutate_git('-c','user.name=Codex AI Agent','-c','user.email=codex@local.invalid','commit','-m',f'S4 joint {profile} experiment inputs')
        commit = git('rev-parse','HEAD',cwd=RUN)
        save(OUT / (profile+'-inputs.json'), {'branch':f'codex/s4-overall-{profile}','commit':commit,'base':BASE,'overlays':overlay})
        command(profile+'-tests',['node','node_modules/jest/bin/jest.js','--config','jest.overall.config.cjs','--runInBand','--json','--outputFile',str(OUT/(profile+'-tests.json'))],backend)
        command(profile+'-dry',['node','node_modules/@stryker-mutator/core/bin/stryker.js','run','stryker.overall.config.json','--dryRunOnly'],backend)
        command(profile+'-mutation',['node','node_modules/@stryker-mutator/core/bin/stryker.js','run','stryker.overall.config.json'],backend)
        for ext in ('html','json'):
            shutil.copyfile(backend/'reports/overall'/('mutation.'+ext),OUT/(profile+'-mutation.'+ext))
        after = {p:sha(backend/p) for p in protected}
        assert after == protected, (profile,'protected runtime files changed')
        save(OUT/(profile+'-protected-after.json'),after)
    after_source = {p:sha(SUT/p) for p in before}
    save(OUT/'source-preservation.json',{'before':before,'after':after_source,'unchanged':before==after_source,'headBefore':metadata['sourceHead'],'headAfter':git('rev-parse','HEAD'),'statusBefore':metadata['sourceStatus'],'statusAfter':git('status','--short'),'agentWritesToSourceRepository':[],'note':'If the original checkout changed concurrently, inspect its Git diff; runtime protected-file checks above remain separate.'})
    metadata['completedUTC']=now()
    save(OUT/'inputs.json',metadata)
    print('COMPLETE joint experiment',flush=True)

if __name__=='__main__': main()
