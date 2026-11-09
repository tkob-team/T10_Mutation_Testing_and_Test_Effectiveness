# Report template

Use as is, one block per run.

```
## <Run ID>   (suffix -ai if executed by an AI agent)
- Executor: <human name | AI agent + model>
- Date / OS: <ISO date> / <OS>
- Commit / branch: <hash> <branch>   (tests and config committed: yes/no)
- Versions: node <v>, @stryker-mutator/core <v>, <runner> <v>
- Config: <file>, mutate <scope>, concurrency <n>, coverageAnalysis <x>
- Command: <exact command>
- Result: Killed <n> | Timeout <n> | Survived <n> | NoCoverage <n> | RuntimeError <n> | CompileError <n> | Ignored <n>
- Score: <x.xx>% = Detected / Valid (Detected = Killed + Timeout; Valid = Detected + Survived + NoCoverage)
- Duration: <Done in ...>
- Target mutants: <file:line:col mutator -> replacement = status; killedBy>
- Assumptions: <anything decided without asking>
- Deviations / errors: <what differed from expectations>; hypotheses marked Verified / Unverified
- Evidence: runs/<run-id>/mutation.json, mutation.html, console.log
```

Rules: numbers only from saved `mutation.json` or logs; `Not run` for anything not executed; state the scope a score represents ("100% on 7 mutants in 3 lines", not "100% tested").
