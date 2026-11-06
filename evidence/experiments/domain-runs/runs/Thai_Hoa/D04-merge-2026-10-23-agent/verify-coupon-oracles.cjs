// Counterfactual validation in an isolated derivative. Never changes tracked SUT code.
const fs=require('node:fs'), path=require('node:path'), os=require('node:os'), crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const backend=process.argv[2];
if(!path.isAbsolute(backend||'')) throw new Error('Pass absolute SUT backend path');
const destination=path.join(__dirname,'oracle-patch-check');
if(fs.existsSync(destination)) throw new Error('Preserve existing evidence; choose a new run id');
fs.mkdirSync(destination);
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'t10-coupon-oracle-'));
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const before=sha(path.join(backend,'server.js'));
for(const file of ['server.js','database.js','package.json']) fs.copyFileSync(path.join(backend,file),path.join(scratch,file));
fs.cpSync(path.join(backend,'test'),path.join(scratch,'test'),{recursive:true});
fs.symlinkSync(path.join(backend,'node_modules'),path.join(scratch,'node_modules'),'junction');
const config={rootDir:scratch,testEnvironment:'node',setupFiles:['<rootDir>/test/helpers/isolate.js'],testMatch:['<rootDir>/test/defects/coupons.defects.js']};
fs.writeFileSync(path.join(scratch,'jest.oracle.config.json'),JSON.stringify(config,null,2));
const startedUtc=new Date().toISOString();
const run=(id,args)=>{
  const command=[path.join(backend,'node_modules/jest/bin/jest.js'),'--config',path.join(scratch,'jest.oracle.config.json'),'--runInBand',...args,'--json','--outputFile',path.join(destination,id+'.json')];
  const result=spawnSync(process.execPath,command,{cwd:scratch,encoding:'utf8',timeout:120000,maxBuffer:16*1024*1024});
  fs.writeFileSync(path.join(destination,id+'.log'),(result.stdout||'')+'\n'+(result.stderr||''));
  return {id,command,exitCode:result.status,error:result.error?.message};
};
const original=run('original-controls',['-t','CD-01|CD-02|CD-03']);
let text=fs.readFileSync(path.join(scratch,'server.js'),'utf8');
const changes=[['total_amount > coupon.min_order_amount','total_amount >= coupon.min_order_amount',1],['expiry < now','expiry <= now',1],['total_amount * (1 - coupon.discount_value)','total_amount * coupon.discount_value / 100',2]];
for(const [from,to,expected] of changes){const count=text.split(from).length-1;if(count!==expected)throw new Error('Unexpected patch occurrences: '+from);text=text.split(from).join(to);}
fs.writeFileSync(path.join(scratch,'server.js'),text);
const patched=run('patched-controls',['-t','CD-01|CD-02|CD-03']);
const baselineConfig={...config,testMatch:['<rootDir>/test/coupons.test.js','<rootDir>/test/coupons-flow.test.js']};
fs.writeFileSync(path.join(scratch,'jest.oracle.config.json'),JSON.stringify(baselineConfig,null,2));
const baseline=run('patched-baseline',[]);
const diff=spawnSync('git',['diff','--no-index','--',path.join(backend,'server.js'),path.join(scratch,'server.js')],{encoding:'utf8'});
fs.writeFileSync(path.join(destination,'server.patch'),diff.stdout||'');
const after=sha(path.join(backend,'server.js'));
const meta={executor:'OpenAI Codex AI Agent',startedUtc,finishedUtc:new Date().toISOString(),scratch,patches:changes,original,patched,baseline,productionSha256Before:before,productionSha256After:after,productionUnchanged:before===after,expected:{originalExit:1,patchedExit:0,baselineExit:0}};
fs.writeFileSync(path.join(destination,'metadata.json'),JSON.stringify(meta,null,2)+'\n');
console.log(JSON.stringify(meta,null,2));
if(original.exitCode!==1||patched.exitCode!==0||baseline.exitCode!==0||before!==after)process.exitCode=1;
