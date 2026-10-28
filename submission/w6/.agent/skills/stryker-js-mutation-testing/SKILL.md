---
name: "stryker-js-mutation-testing"
description: "Run, read and act on StrykerJS mutation testing for JavaScript/TypeScript projects: config, metrics, survivor analysis, assertion design, AI-assisted tests and honest reporting."
---

# StrykerJS Mutation Testing

Use this skill when a user wants to set up or run StrykerJS, interpret a mutation report (`mutation.html` / `mutation.json`), analyze surviving mutants, strengthen a test suite, generate or review AI-suggested assertions, compare two test suites, or write up mutation testing results (report, guide, slides).

Reply in the user's language. Keep tool names, commands, mutator names and statuses (Killed, Survived, ...) in English.

## Core principles

1. **The specification is the oracle, not the code.** Expected values come from requirements, API docs or explicitly stated business rules. Code under test may be wrong. If the spec is silent, say so and label the oracle as *inferred*.
2. **Evidence beats explanation.** "This assertion will kill the mutant" is a hypothesis. Evidence is: the test passes on the original code AND the target mutant turns Killed in a real report.
3. **Never invent results.** Not run → write `Not run`. Not enough basis → `Pending` or `equivalent candidate`. Never fill a results column with predictions.
4. **Do not change production code to kill mutants**, and do not edit tests or config just to make numbers match expectations.
5. **Say who ran what.** A run executed by an AI agent is not a run by the human; label it (for example a `-ai` suffix on the run ID).

## Workflow

### 1. Preflight

- Record: OS, `node -v`, `npm -v`, `npx stryker --version`, test runner version, git commit and branch.
- Run the plain test suite first. **Original tests must pass** before any mutation score means anything. Failing tests → fix or isolate them (known-defect tests go in a separate folder/config), then continue.
- Commit the test code you will measure. A run on an uncommitted working tree cannot prove what was tested.

### 2. Minimal configuration (Jest example)

```sh
npm install --save-dev --save-exact @stryker-mutator/core @stryker-mutator/jest-runner
```

```json
{
  "testRunner": "jest",
  "coverageAnalysis": "perTest",
  "mutate": ["src/cart.js"],
  "reporters": ["clear-text", "html", "json"],
  "htmlReporter": { "fileName": "reports/mutation.html" },
  "jsonReporter": { "fileName": "reports/mutation.json" },
  "concurrency": 2
}
```

- Start with a **small `mutate` scope** (one file or a line range like `src/server.js:280-349`) so the first run is fast and readable. Line ranges are only valid for the commit you chose.
- Choose the tests explicitly: `jest.configFile` or an inline `jest.config` with `testMatch`. If `package.json` defines Jest `projects`, an inline `"projects": []` stops Stryker from loading every project.
- `perTest` needs the default jest-circus runner. The `command` test runner has no coverage analysis.
- Pin versions and keep the config in git; every reported number should be reproducible from commit + config + command.

### 3. Run

```sh
npx stryker run                      # uses stryker.config.json
npx stryker run other.config.json --concurrency 2
```

- Pass flags to `npx stryker run ...` directly. Some shells/shims drop arguments after `npm run <script> --`.
- Save `mutation.json`, `mutation.html` and the console output per run in a run folder (`runs/<run-id>/`) before the next run overwrites them.
- Do not recursively delete Stryker's sandbox folder by hand: it may contain links to the real `node_modules`. Let Stryker clean it on the next run.

### 4. Read the results

| Status | Meaning |
|---|---|
| Killed | At least one test failed with the mutant active |
| Survived | Tests ran over the mutant and all passed |
| NoCoverage | No test executes the mutated code |
| Timeout | Run exceeded the time limit (often an infinite loop or a request that never responds) |
| RuntimeError / CompileError | Mutant crashed the process or failed to compile; excluded from the score |
| Ignored | Excluded by config or comments |

- Detected = Killed + Timeout; Undetected = Survived + NoCoverage; Valid = Detected + Undetected.
- **Mutation score = Detected / Valid × 100.** Score on covered code = Detected / (Detected + Survived) × 100.
- Always report every status count next to the score, plus scope, mutant count and tool version. Never average scores across modules.
- Timeout counts as detected but is not proof of a good assertion. If you want an "assertion kill" figure, define it explicitly (for example Killed / Valid) and report it separately.

Count statuses from the JSON, not by copying the console:

```js
// count.js — node count.js reports/mutation.json
const r = require(require('path').resolve(process.argv[2]));
const c = {};
for (const f of Object.values(r.files))
  for (const m of f.mutants) c[m.status] = (c[m.status] || 0) + 1;
const det = (c.Killed || 0) + (c.Timeout || 0);
const valid = det + (c.Survived || 0) + (c.NoCoverage || 0);
console.log(c, 'score', (100 * det / valid).toFixed(2) + '%');
```

- The console credits a kill only to the **first** failing test. To know which tests kill or cover a mutant, read `killedBy` / `coveredBy` in `mutation.json` and map ids to names through `testFiles`.
- Mutant ids can change between runs. Identify a mutant by **file + start AND end location + mutatorName + replacement**; start position alone can merge different mutants on the same line.

### 5. Analyze each survivor

Record: location, mutator, original → replacement, the tests that cover it (`coveredBy`), and one reason label:

- `missing-assertion` — tests reach the code but do not check the changed value or side effect.
- `missing-input` — no test input reaches the difference (boundary, other branch).
- `untestable-path` — only reachable when the environment fails (e.g. `if (err)` from a DB); needs fault injection.
- `defect-fixing` — the mutant makes the code *more* correct than the original (it removes a bug). A test that kills it must assert the bug; a spec-correct test fails on the original. Do not lock the bug in; record a defect instead.
- `equivalent-candidate` — argue over the input domain why no output can differ. Call it an **equivalent mutant** only with that argument, within a stated scope.

For each fixable survivor write the distinguishing input, the expected result with its spec reference, and the kind of check needed (exact value, response body, persisted state, state unchanged after rejection).

### 6. Assertion design checklist

- Exact values (`toBe`, `toEqual`) instead of truthy or `> 0`, unless the spec itself only requires presence.
- Both sides of every boundary and both branches.
- Check the body and side effects (database, stored state), not only the HTTP status. Check the right response: if `POST` returns only a message, `GET` the resource afterwards.
- After a rejected operation, assert that state did not change.
- Use only matchers available in the project.
- Data-driven tests (`test.each`) when the same rule must hold for several inputs.
- **Never copy a formula or a literal from the code to compute the expected value** ("assertion learns the bug").
- When the spec is silent (e.g. exact error text): either assert the exact string and note it is implementation-bound, or assert a weaker spec-backed property (e.g. `error` is a non-empty string). State the choice in a comment.

### 7. AI-assisted assertions

Give the AI: the relevant spec excerpt, the code, the existing tests, the target mutants (location, mutator, replacement) and the baseline `mutation.json`. Ask for: distinguishing input, assertions that pass on the original and fail on the mutant, expected values sourced from the spec, and permission to decline when no spec-correct passing test exists.

Gates before accepting a candidate:

1. **Spec review** — every expected value has a spec basis; nothing is copied from the implementation.
2. **Passes on original code.**
3. **Target mutant is Killed** (not just Timeout) in a real run.
4. **Kill comes from a business assertion**, not from a broken setup.
5. **Record it** — prompt and raw output verbatim, what you kept/changed/rejected, run IDs.

For a fair human-vs-AI comparison: same production code, config, scope, baseline and target mutants; the AI session must not see the human's answers (fresh session, solution files outside the project, no reading of branches/commits that contain them). If anything leaks, stop and label the result "partially blind". Compare on the target mutants, not only whole-run score.

### 8. Compare runs

- Compare **absolute Survived counts** on the same mutant set, together with each status count. Score alone hides changes in the Valid denominator (RuntimeError can vary).
- Killed↔Timeout can shift between runs or configurations (load, test order, how Stryker invokes the runner) while Survived stays the same. Report the config next to Killed/Timeout and do not draw conclusions from a small Killed/Timeout difference.
- A single run per configuration does not measure flakiness.

### 9. Write it up

Per run: run ID, executor (human or AI agent + model), date, OS, commit/branch, versions, config, exact commands, status counts + score + definition, deviations from expectations, errors and hypotheses (marked verified or unverified), evidence paths.

In guides and reports: take numbers only from saved `mutation.json` or logs, cite the run ID, label unverified troubleshooting as "Suggested" vs "Observed", and state the scope that a score represents ("100% on 7 mutants in 3 lines", not "100% tested").

## Known traps

- **Tests depend on shared state** (a file-based DB, a global cart in memory): run with an isolated in-memory DB or reset state per test; restore any tracked data file changed by a test run.
- **App starts a server on import** (`app.listen` at module level, no export): isolate it in a test setup file (e.g. mock the framework to capture `app` and make `listen` a no-op) instead of editing production code.
- **Removed `res.json` / emptied handler** → the request never answers → Timeout, not an assertion kill.
- **A `StringLiteral` mutant that empties a SQL string** can crash native DB bindings → RuntimeError, counts vary between runs.
- **Dry run reports a different test count than Jest** (e.g. double) in some setups; cause can be project-specific. Note it, do not quote it as the test count.
- **Windows**: if PowerShell blocks `npm.ps1`/`npx.ps1`, use `npm.cmd`/`npx.cmd`; use `curl.exe` rather than the `curl` alias. Some setups report `No tests were found` with the default sandbox folder `.stryker-tmp`; setting `"tempDirName": "stryker-tmp"` has been observed to help, but the root cause is not established. Deep paths can hit `Filename too long` when cloning; use a short folder.
- **Worker crashes** (e.g. exit code 3221225477 on Windows) may appear in the log while the run still finishes; read statuses from `mutation.json`, do not count warnings.
- StrykerJS has no mutator that changes numeric constants; check the official mutator list before trusting an explanation that relies on one.
- **`mutation.json` is the source of truth**; HTML may still show a previous run if opened too early.

## References

- StrykerJS configuration: https://stryker-mutator.io/docs/stryker-js/configuration/
- Jest runner: https://stryker-mutator.io/docs/stryker-js/jest-runner/
- Mutant states and metrics: https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/
- Supported mutators: https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/
- Equivalent mutants: https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/