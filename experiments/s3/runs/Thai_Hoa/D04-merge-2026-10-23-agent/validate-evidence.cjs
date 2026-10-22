const fs=require('node:fs'),path=require('node:path');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'../../../../..');
const sut=path.resolve(root,'../eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness');
const checks=[],errors=[];
const read=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
function check(name,ok){checks.push({name,pass:!!ok});if(!ok)errors.push(name);}
let jsonCount=0;
function walk(dir,callback){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file,callback);else callback(file);}}
walk(__dirname,file=>{if(file.endsWith('.json')&&file!==path.join(__dirname,'final-review.json')){try{read(file);jsonCount++;}catch(e){errors.push('Invalid JSON: '+path.relative(root,file)+': '+e.message);}}});
check('Final frozen baseline: 88 pass',read(path.join(__dirname,'frozen-commit-final-tests.json')).numPassedTests===88);
check('Fresh install succeeds; final tests pass',read(path.join(__dirname,'frozen-clean-install.meta.json')).exitCode===0&&read(path.join(__dirname,'clean-install-baseline.json')).numPassedTests===88);
const defects=read(path.join(__dirname,'d04-defects-final.json'));
check('54 separate assertion failures, no runtime suite failure',defects.numFailedTests===54&&defects.numRuntimeErrorTestSuites===0);
check('All original Auth source hashes identical',read(path.join(__dirname,'auth-import-sha256.json')).every(f=>f.identical));
check('G02 raw candidate bytes equal executed candidate',read(path.join(__dirname,'G02-Codex/executed-sha256.json')).identical);
for(const [id,total,kills] of [['coupons-f02-comparison',120,2],['coupons-g02-comparison',120,2],['cart-manual-frozen-comparison',150,23],['cart-ai-frozen-comparison',150,13]]){
  const s=read(path.join(__dirname,id+'.json')).summary;
  check(id+': source/universe/new assertion kills',s.sameSource&&s.sameUniverse&&s.matched===total&&s.newAssertionKills.length===kills);
}
const git=(...args)=>spawnSync('git',args,{cwd:sut,encoding:'utf8'}).stdout.trim();
check('SUT returned to frozen baseline branch',git('branch','--show-current')==='s3/D04-baseline'&&git('rev-parse','HEAD')==='806ba19ee4e09eafe9b2696ccf117a2b1ab841ef');
check('SUT working tree clean',git('status','--short')==='');
check('Production unchanged from original',git('diff','--name-only','92bbf22','HEAD','--','backend/server.js','backend/database.js','backend/database.sqlite')==='');
check('Variant branches share frozen base',git('merge-base','s3/F02-coupons','s3/G02-coupons')==='806ba19ee4e09eafe9b2696ccf117a2b1ab841ef');
let linkCount=0;
const docs=['CONTEXT.md','ai-audit/AI_Record_Thai_Hoa.md','experiments/s3/Experiment_Log_Thai_Hoa.md','experiments/s3/Baseline_Manifest.md','experiments/s3/Coupons_Survivor_Analysis_Thai_Hoa.md','experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md','experiments/s3/D04_Integration_Review_2026-10-23.md','experiments/s3/Original_Defects_and_Assumptions.md','experiments/s3/Sheet_Update_Pending_2026-10-23.md',path.relative(root,path.join(__dirname,'README.md'))];
for(const relative of docs){const file=path.join(root,relative);let fence=false;const content=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(line=>{if(/^\s*(```|~~~)/.test(line)){fence=!fence;return false;}return !fence;}).join('\n');for(const match of content.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)){const target=match[1];if(/^(https?:|mailto:|#)/.test(target))continue;const local=decodeURIComponent(target.split('#')[0]);if(!fs.existsSync(path.resolve(path.dirname(file),local)))errors.push('Broken link: '+relative+' -> '+target);linkCount++;}}
check('Maintained local Markdown links resolve',!errors.some(e=>e.startsWith('Broken link')));
check('Sheet write not falsely claimed successful',read(path.join(root,'experiments/s3/Sheet_Update_Pending_2026-10-23.json')).result.startsWith('403'));
const result={executor:'OpenAI Codex AI Agent',checkedUtc:new Date().toISOString(),checks,jsonFilesParsed:jsonCount,localLinksChecked:linkCount,errors};
fs.writeFileSync(path.join(__dirname,'final-review.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
