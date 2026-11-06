// Re-run existing teammate tests, not new authorship. Original checkout stays untouched.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const backend=process.argv[2]; if(!path.isAbsolute(backend||''))throw new Error('Absolute backend required');
const repo=path.dirname(backend);
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'t10-cart-reproduce-'));
const command=(exe,args,options={})=>{const r=spawnSync(exe,args,{encoding:'utf8',maxBuffer:64*1024*1024,...options});if(r.error)throw r.error;return r;};
const archive=path.join(scratch,'baseline.tar');
const archived=command('git',['archive','--format=tar','--output='+archive,'806ba19ee4e09eafe9b2696ccf117a2b1ab841ef','backend'],{cwd:repo});if(archived.status)throw new Error(archived.stderr);
const unpack=command('tar',['-xf',archive,'-C',scratch]);if(unpack.status)throw new Error(unpack.stderr);
const target=path.join(scratch,'backend');
fs.symlinkSync(path.join(backend,'node_modules'),path.join(target,'node_modules'),'junction');
// Preserve the working runtime's exact source bytes; Git normalization only affects EOL.
for(const file of ['server.js','database.js','database.sqlite'])fs.copyFileSync(path.join(backend,file),path.join(target,file));
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const sourceHash=sha(path.join(backend,'server.js'));
const results=[];
for(const [kind,ref,overlay] of [['manual','origin/s3/F01-manual','test/manual/cart-orders.manual.js'],['ai','origin/s3/G01-ai','test/ai/cart-orders.ai.js']]){
  const dest=path.join(__dirname,'cart-reproduced-'+kind);if(fs.existsSync(dest))throw new Error('Existing evidence');fs.mkdirSync(dest);
  const original=command('git',['show',ref+':backend/'+overlay],{cwd:repo});if(original.status)throw new Error(original.stderr);
  const overlayPath=path.join(target,overlay);fs.mkdirSync(path.dirname(overlayPath),{recursive:true});fs.writeFileSync(overlayPath,original.stdout);
  const config=JSON.parse(fs.readFileSync(path.join(target,'stryker.cart-orders.config.json'),'utf8'));
  config.jest.config.testMatch=['**/test/cart-orders.test.js','**/'+overlay];
  config.htmlReporter.fileName=path.join(dest,'mutation.html');config.jsonReporter.fileName=path.join(dest,'mutation.json');
  const configPath=path.join(target,'reproduce-'+kind+'.json');fs.writeFileSync(configPath,JSON.stringify(config,null,2));
  const jestConfig=path.join(target,'jest-reproduce-'+kind+'.json');fs.writeFileSync(jestConfig,JSON.stringify(config.jest.config,null,2));
  const startedUtc=new Date().toISOString();
  const tested=command(process.execPath,[path.join(target,'node_modules/jest/bin/jest.js'),'--config',jestConfig,'--runInBand','--json','--outputFile',path.join(dest,'original-tests.json')],{cwd:target,timeout:120000});
  fs.writeFileSync(path.join(dest,'original-tests.log'),tested.stdout+'\n'+tested.stderr);if(tested.status)throw new Error('Teammate original-code tests failed; inspect evidence');
  const runArgs=[path.join(target,'node_modules/@stryker-mutator/core/bin/stryker.js'),'run',configPath];
  const mutated=command(process.execPath,runArgs,{cwd:target,timeout:900000});
  fs.writeFileSync(path.join(dest,'console.log'),mutated.stdout+'\n'+mutated.stderr);
  const meta={executor:'OpenAI Codex AI Agent reproduction, not a teammate self-run',baseCommit:'806ba19ee4e09eafe9b2696ccf117a2b1ab841ef',overlayRef:ref,overlayCommit:command('git',['rev-parse',ref],{cwd:repo}).stdout.trim(),overlay,overlaySha256:sha(overlayPath),startedUtc,finishedUtc:new Date().toISOString(),scratch,command:[process.execPath,...runArgs],node:process.version,originalExit:tested.status,mutationExit:mutated.status,sourceSha256:sha(path.join(target,'server.js')),workingSourceUnchanged:sha(path.join(backend,'server.js'))===sourceHash};
  fs.writeFileSync(path.join(dest,'metadata.json'),JSON.stringify(meta,null,2)+'\n');
  fs.copyFileSync(configPath,path.join(dest,'stryker.config.json'));fs.copyFileSync(overlayPath,path.join(dest,path.basename(overlayPath)));
  results.push(meta);console.log(JSON.stringify({kind,originalExit:tested.status,mutationExit:mutated.status,overlayCommit:meta.overlayCommit}));if(mutated.status)process.exit(1);
}
