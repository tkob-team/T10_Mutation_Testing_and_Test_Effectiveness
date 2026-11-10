# Status and metrics

| Status | Meaning |
|---|---|
| Killed | At least one test failed with the mutant active |
| Survived | Tests ran over the mutant and all passed |
| NoCoverage | No test executes the mutated code |
| Timeout | Run exceeded the time limit (infinite loop, request that never answers) |
| RuntimeError / CompileError | Mutant crashed the process or failed to compile; excluded from the score |
| Ignored | Excluded by config or comments |

- Detected = Killed + Timeout. Undetected = Survived + NoCoverage. Valid = Detected + Undetected.
- **Mutation score = Detected / Valid × 100.** Score on covered code = Detected / (Detected + Survived) × 100.
- Report every status count next to the score, plus scope, mutant count and Stryker version. Never average scores across modules.
- Timeout counts as detected but proves no assertion. If you need an "assertion kill" figure, define it (e.g. Killed / Valid) and report it separately.
- The console credits a kill to the **first** failing test only. Read `killedBy` / `coveredBy` in `mutation.json` and map ids through `testFiles`; use `--disableBail` to get every killing test.
- Mutant ids can change between runs. Identify a mutant by file + start AND end location + mutatorName + replacement.

## Comparing runs

- Compare **absolute Survived counts** on the same mutant set; the score hides changes in the Valid denominator (RuntimeError can vary).
- Killed and Timeout can swap between runs (load, test order) while Survived stays the same. Do not draw conclusions from small Killed/Timeout differences.
- One run per configuration does not measure flakiness.
