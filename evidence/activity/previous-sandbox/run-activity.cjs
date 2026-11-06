// Run only after facilitator review, in a disposable workshop clone.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync, execFileSync } = require('node:child_process');
const { createRequire } = require('node:module');

const backend = path.resolve(process.argv[2] || '');
const candidate = path.resolve(process.argv[3] || '');
if (!process.argv[2] || !process.argv[3]) throw Error('Usage: node run-activity.cjs BACKEND CANDIDATE');
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: backend, encoding: 'utf8' }).trim();
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
if (revision !== '6d2e790be54193d44f7e401c59dbdf8283a3f42d') throw Error('Expected workshop starter 6d2e790');
const source = fs.readFileSync(path.join(backend, 'server.js'), 'utf8');
const committed = execFileSync('git', ['show', 'HEAD:backend/server.js'], { cwd: root, encoding: 'utf8' });
if (source.replace(/\r\n/g, '\n') !== committed.replace(/\r\n/g, '\n')) throw Error('server.js differs from starter');
const resolve = createRequire(path.join(backend, 'package.json'));
const jestBin = path.join(path.dirname(resolve.resolve('jest/package.json')), 'bin/jest.js');
const strykerBin = path.join(path.dirname(resolve.resolve('@stryker-mutator/core/package.json')), 'bin/stryker.js');
fs.mkdirSync(path.join(backend, 'reports/activity'), { recursive: true });
fs.rmSync(path.join(backend, 'reports/activity/tally.json'), { force: true });
fs.copyFileSync(candidate, path.join(backend, 'test/activity.candidate.cjs'));
const harness = `const {loadApp,newUser,bearer,createOrder,get,request}=require('./helpers/app');
const candidates=require('./activity.candidate.cjs');
let app,db;
beforeAll(async()=>{({app,db}=await loadApp());});
for(const key of ['K1','K2','K3','K4','K5']) {
  test(key,async()=>{
    const u=await newUser(app);
    const itemA={id:1,name:'A',price:100000,quantity:1};
    const itemB={id:2,name:'B',price:200000,quantity:2};
    const empty=await request(app).get('/api/cart').set(bearer(u.token));
    await request(app).post('/api/cart').set(bearer(u.token)).send(itemA);
    await request(app).post('/api/cart').set(bearer(u.token)).send(itemB);
    const cart=await request(app).get('/api/cart').set(bearer(u.token));
    const reread=await request(app).get('/api/cart').set(bearer(u.token));
    const ownId=await createOrder(app,db,u.token);
    const other=await newUser(app);
    await createOrder(app,db,other.token);
    const history=await request(app).get('/api/orders/my-orders').set(bearer(u.token));
    await request(app).put('/api/orders/'+ownId+'/cancel').set(bearer(u.token));
    const canceled=await get(db,'SELECT * FROM orders WHERE id = ?',[ownId]);
    expect.hasAssertions();
    await candidates[key]({empty,cart,reread,itemA,itemB,history,ownId,canceled});
  });
}`;
fs.writeFileSync(path.join(backend, 'test/activity.test.js'), harness);
const jest = { projects: [], rootDir: backend, testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/helpers/isolate.js'],
  testMatch: ['<rootDir>/test/activity.test.js'],
  modulePathIgnorePatterns: ['<rootDir>/stryker-tmp/'] };
const result = spawnSync(process.execPath, [jestBin, '--config', JSON.stringify(jest), '--runInBand', '--json', '--outputFile', 'reports/activity/original.json'], { cwd: backend, encoding: 'utf8', timeout: 60000 });
fs.writeFileSync(path.join(backend, 'reports/activity/original.log'), result.stdout + result.stderr);
if (result.status !== 0) {
  console.error(result.stderr);
  throw Error('INVALID: candidate must pass on original code and contain assertions. No kills scored.');
}
const config = { testRunner: 'jest', coverageAnalysis: 'perTest', disableBail: true,
  mutate: ['server.js:286-286','server.js:293-293','server.js:314-314','server.js:335-335'],
  tempDirName: 'stryker-tmp', concurrency: 1, reporters: ['clear-text','json','html'],
  jsonReporter: { fileName: 'reports/activity/mutation.json' },
  htmlReporter: { fileName: 'reports/activity/mutation.html' },
  jest: { config: { ...jest, rootDir: undefined } } };
fs.writeFileSync(path.join(backend, 'activity.stryker.json'), JSON.stringify(config, null, 2));
const mutation = spawnSync(process.execPath, [strykerBin, 'run', 'activity.stryker.json'], { cwd: backend, encoding: 'utf8', timeout: 180000 });
fs.writeFileSync(path.join(backend, 'reports/activity/mutation.log'), mutation.stdout + mutation.stderr);
if (mutation.status !== 0) throw Error('Mutation execution failed: inspect reports/activity/mutation.log; no score.');
const report = JSON.parse(fs.readFileSync(path.join(backend, 'reports/activity/mutation.json')));
const mutants = report.files['server.js'].mutants;
const targets = [
 ['K1',286,'ArrayDeclaration','["Stryker was here"]'],
 ['K2',293,'CallExpression',';'],
 ['K3',286,'ConditionalExpression','true'],
 ['K4',314,'ArrayDeclaration','[]'],
 ['K5',335,'StringLiteral','""'],
];
const tests = Object.values(report.testFiles || {}).flatMap(file => file.tests || []);
const rows = targets.map(([key,line,name,replacement]) => {
 const m = mutants.find(m => m.location.start.line===line && m.mutatorName===name && m.replacement===replacement);
 if (!m) throw Error('Missing target '+key);
 const ownKill = (m.killedBy || []).some(id => tests.some(t => t.id===id && t.name===key));
 return { case: key, mutant: m.id, line, mutator: name, replacement, status: m.status,
   ownAssertionKilled: ownKill, point: m.status==='Killed' && ownKill ? 1 : 0 };
});
const tally = { revision, candidate: path.basename(candidate), rows, points: rows.reduce((s,r)=>s+r.point,0), maximum: 5 };
fs.writeFileSync(path.join(backend, 'reports/activity/tally.json'), JSON.stringify(tally,null,2));
console.log(JSON.stringify(tally,null,2));
