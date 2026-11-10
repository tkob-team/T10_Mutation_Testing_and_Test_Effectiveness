# Time, scope and incremental runs

## Our measurements

One project, Windows 11, Node 24, StrykerJS 10, Jest, concurrency 1.

| Scope | Mutants | Tests | Time |
|---|---|---|---|
| 1 route (12 lines) | 16 | 36 | 25 s |
| 1 handler (22 lines) | 28 | 36 | 44 s |
| 2 ranges, one domain | 150 | 36 | 3 min 51 s |
| Same 150 mutants, 88 tests selected | 150 | 88 | 5 min 02 s |
| 4 ranges, three domains | 395 | 88 | 16 min 27 s |

Rough rule on that machine: about 1.5 s per mutant. Selecting only the relevant tests mattered (3:51 vs 5:02 on the same mutants).

## Estimating before you run

- Run a small range first. The log lines `Instrumented ... with M mutant(s)` and `Done in ...` give a per-mutant baseline; scale by mutant count and divide by concurrency.
- `--mutate "src/file.js:start-end"` (several ranges: comma-separated) narrows a run without editing the config. Line ranges are only valid for the commit you chose.
- `--concurrency n` speeds up CPU-bound suites; keep it at 1 or 2 if tests share a DB or file, or native modules crash.

## Incremental mode

`npx stryker run <config> --incremental --incrementalFile reports/stryker-incremental.json`

| Situation (150 mutants) | Results reused | Time |
|---|---|---|
| Cold (no incremental file) | 0 | 3 min 55 s |
| Rerun, nothing changed | 150/150 | 2 s |
| One assertion added to a narrow test | 139/150 | 23 s |
| Assertions added to two tests, one covering many mutants | 112/150 | 1 min 43 s |

- Savings depend on how many mutants the changed tests cover.
- Incremental compares source and test files; changes in helpers, config or the environment may not invalidate results. Use a full run for reported numbers.

## killedBy and bail

By default Stryker stops testing a mutant at the first failing test, so `killedBy` lists one test. `--disableBail` runs all covering tests and lists every killer, which helps when comparing two suites on the same mutant. Our 28-mutant range: 46 to 49 s with `--disableBail`, 43 to 45 s without.
