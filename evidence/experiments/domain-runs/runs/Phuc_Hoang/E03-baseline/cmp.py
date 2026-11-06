import json,sys,collections
def load(f):
    d=json.load(open(f)); fl=d['files'][[k for k in d['files']][0]]
    out={}
    for m in fl['mutants']:
        l=m['location']['start']; out[(l['line'],l['column'],m['mutatorName'],m.get('replacement'))]=m['status']
    return out
a=load(sys.argv[1]); b=load(sys.argv[2])
print(len(a),len(b),'common',len(set(a)&set(b)),'only a',len(set(a)-set(b)),'only b',len(set(b)-set(a)))
diff=collections.Counter()
for k in set(a)&set(b):
    if a[k]!=b[k]: diff[(a[k],b[k])]+=1; print(k,a[k],'->',b[k])
print(dict(diff))
