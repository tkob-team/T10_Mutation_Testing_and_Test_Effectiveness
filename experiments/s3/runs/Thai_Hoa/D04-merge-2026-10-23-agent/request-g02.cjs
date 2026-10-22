// Experimental model request, no tools or repository access. Never reads an F02 solution.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const [backend,cli]=process.argv.slice(2);
if(!path.isAbsolute(backend||'')||!path.isAbsolute(cli||''))throw new Error('Pass absolute backend and Claude executable paths');
const room=path.join(__dirname,'G02-request');
if(fs.existsSync(room))throw new Error('Refusing to overwrite raw request');
fs.mkdirSync(room);
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'frozen-coupons-baseline/mutation.json'),'utf8'));
const file=Object.values(report.files)[0];
const targets=file.mutants.filter(m=>['111','113'].includes(m.id));
const routeSource=file.source.split('\n').slice(354,492).join('\n');
const prompt=`Generate 1-3 Jest integration tests to kill the supplied surviving mutants on the UNCHANGED original EShop code. Return testCode and reasoning using the JSON schema. This is the G02 experimental candidate; no manual solution is provided. Do not assert arbitrary message strings or codify original bugs. Tests must pass original code and derive literal expected values from SRS. Do not edit production or weaken the baseline. Use at least three meaningful assertions. If impossible, explain rather than inventing an oracle.

SRS FR-09: code exists/active; now < expiry; total >= min_order_amount; valid JWT; per-user uses < max_uses_per_user. fixed discount=value; percent discount=total*value/100; final=total-discount. FR-17: Admin create/list/delete coupons. Required unique code, type percent/fixed, positive discount_value, expiry, min_order_amount>=0, max_uses_per_user>=1. Exact HTTP errors unspecified. Known ORIGINAL bugs (not targets): percent formula, inclusive minimum, equality expiry, apply auth/body identity and admin role/validation. Do not write tests that fail because of them.

Candidate file will be backend/test/ai/coupons.ai.js. Use require('../helpers/coupons'). Exports and fixtures below. beforeAll awaits loadApp, beforeEach freezes clock and resets coupons then logs in the USER and ADMIN; afterEach restores real timers; afterAll closes db. Database assertions/seed are test fixtures. Native SQLite/supertest must stay asynchronous.

HELPERS:\n${fs.readFileSync(path.join(backend,'test/helpers/coupons.js'),'utf8')}
Shared helper login(app,{email,password}) returns JWT; bearer(token) makes Authorization header; request is supertest; get(db,sql,params=[]) returns row.

FROZEN ORIGINAL COUPON ROUTES:\n${routeSource}

TARGET SURVIVORS (id/location/mutator/replacement):\n${JSON.stringify(targets,null,2)}

Return a complete file. Code is AI-generated and must be labelled so; no claim of human authorship or execution. Include scope/limitations in reasoning.`;
fs.writeFileSync(path.join(room,'prompt.txt'),prompt);
const schema={type:'object',properties:{testCode:{type:'string'},reasoning:{type:'string'}},required:['testCode','reasoning'],additionalProperties:false};
const args=['--safe-mode','--print',prompt,'--tools','','--no-chrome','--no-session-persistence','--output-format','json','--system-prompt','Generate only the requested test artifact from supplied context. No tools. No manual solution access. Do not claim execution.','--json-schema',JSON.stringify(schema)];
const start=new Date().toISOString();
const result=spawnSync(cli,args,{cwd:room,encoding:'utf8',timeout:180000,maxBuffer:8*1024*1024,windowsHide:true});
fs.writeFileSync(path.join(room,'raw.json'),result.stdout||'');
fs.writeFileSync(path.join(room,'stderr.log'),result.stderr||'');
const meta={executor:'OpenAI Codex orchestrating an explicitly authorized G02 Claude model experiment',startedUtc:start,finishedUtc:new Date().toISOString(),cliVersion:spawnSync(cli,['--version'],{encoding:'utf8',windowsHide:true}).stdout.trim(),exitCode:result.status,error:result.error?.message,promptSha256:crypto.createHash('sha256').update(prompt).digest('hex'),configuration:{safeMode:true,tools:[],sessionPersistence:false,explicitSystemPrompt:true,noChrome:true},context:'SRS excerpt, frozen coupon routes and fixture APIs, two survivor signatures. No F02 code supplied. Managed provider settings not independently audited.'};
fs.writeFileSync(path.join(room,'metadata.json'),JSON.stringify(meta,null,2)+'\n');
console.log(JSON.stringify({exitCode:result.status,metadata:path.join(room,'metadata.json'),error:result.error?.message}));
if(result.status!==0)process.exitCode=1;
