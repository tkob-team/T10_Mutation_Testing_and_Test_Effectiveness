const fs=require('node:fs'),path=require('node:path');
const [baselinePath,variantPath,label]=process.argv.slice(2);
if(!baselinePath||!variantPath||!label)throw new Error('Pass baseline JSON, variant JSON, comparison label');
const base=JSON.parse(fs.readFileSync(baselinePath,'utf8'));
const variant=JSON.parse(fs.readFileSync(variantPath,'utf8'));
const key=m=>[m.location.start.line,m.location.start.column,m.location.end.line,m.location.end.column,m.mutatorName,m.replacement].join('|');
const counts=report=>{
  const states={Killed:0,Timeout:0,Survived:0,NoCoverage:0,RuntimeError:0,CompileError:0,Ignored:0,Pending:0};
  for(const f of Object.values(report.files))for(const m of f.mutants)states[m.status]=(states[m.status]||0)+1;
  const valid=states.Killed+states.Timeout+states.Survived+states.NoCoverage;
  return {...states,total:Object.values(states).reduce((a,b)=>a+b,0),valid,score:valid?100*(states.Killed+states.Timeout)/valid:null,assertionKillPercent:valid?100*states.Killed/valid:null};
};
const names=Object.fromEntries(Object.values(variant.testFiles||{}).flatMap(f=>(f.tests||[]).map(t=>[t.id,t.name])));
const rows=[]; let sameSource=true; let sameSourceIgnoringCR=true; let matched=0;
for(const [file,b] of Object.entries(base.files)){
  const v=variant.files[file];
  if(!v){sameSource=false;sameSourceIgnoringCR=false;continue;}
  sameSource&&=b.source===v.source;
  sameSourceIgnoringCR&&=b.source.replaceAll('\r','')===v.source.replaceAll('\r','');
  const byKey=new Map(v.mutants.map(m=>[key(m),m]));
  for(const m of b.mutants){const n=byKey.get(key(m));if(n)matched++;
    rows.push({file,signature:key(m),baselineId:m.id,variantId:n?.id,baseline:m.status,variant:n?.status||'Missing',killedBy:(n?.killedBy||[]).map(id=>({id,name:names[id]||null}))});
  }
}
const transitions={};for(const row of rows){const k=row.baseline+' -> '+row.variant;transitions[k]=(transitions[k]||0)+1;}
const summary={label,sameSource,sameSourceIgnoringCR,matched,totalBaseline:rows.length,sameUniverse:matched===rows.length&&rows.length===Object.values(variant.files).reduce((s,f)=>s+f.mutants.length,0),baseline:counts(base),variant:counts(variant),transitions,newAssertionKills:rows.filter(r=>['Survived','NoCoverage'].includes(r.baseline)&&r.variant==='Killed')};
const stem=path.join(__dirname,label);
fs.writeFileSync(stem+'.json',JSON.stringify({summary,mutants:rows},null,2)+'\n');
fs.writeFileSync(stem+'.md',`# ${label}\n\nSame source: ${sameSource}; same universe: ${summary.sameUniverse}. Matched ${matched}/${rows.length}.\n\n| Baseline ID | Location / mutator / replacement | Baseline | Variant | Killed by |\n|---|---|---|---|---|\n`+rows.map(r=>`| ${r.baselineId} | ${r.signature.replaceAll('|',' / ')} | ${r.baseline} | ${r.variant} | ${r.killedBy.map(t=>t.name||t.id).join(';')} |`).join('\n')+'\n');
console.log(JSON.stringify(summary));
if(!sameSourceIgnoringCR||!summary.sameUniverse)process.exitCode=1;
