# User Guide Contribution

**Document Role:** Coupons walkthrough for guide assembly.  
**Stage:** S4  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S4-A02  
**Domain / Section:** Coupons; StrykerJS and an AI Agent  
**Evidence Status:** Written from retained S3 runs; fresh combined S4 execution is recorded separately. Member reproduction and review remain Pending.

## Introduction

This walkthrough shows how to run API integration tests, locate a surviving coupon mutant, review additional assertions and verify their effect. Jest executes the tests, Supertest calls the Express application and SQLite stores isolated in-memory test data. You do not need the frontend or a separately running backend server.

Our example concerns `max_uses_per_user`. FR-17 requires the administrator's valid limit to be stored. FR-09 C5 allows a user to apply a coupon only while that user's recorded usage is below the limit. A successful creation response alone does not prove that the correct value was saved. See the [Coupons contract](../../experiments/s3/Coupons_Test_Contract_Thai_Hoa.md) and the frozen [SRS](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/README.md).

Use a disposable checkout. The research baseline is `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. The separate workshop guide in `draft/User_Guide.md` uses another starter and a Cart exercise. Its seven-mutant result is not a Coupons baseline.

## Installation

### Prepare the Frozen Checkout

The retained Windows runs used Node.js 24.16.0, npm 12.0.2, Jest 30.5.2, Supertest 7.3.1, SQLite 6.0.1 and Stryker core/Jest runner 10.0.0. These are recorded versions, not claims about the latest releases. macOS instructions have not been reproduced by this contribution's author.

In PowerShell, start in a new parent directory containing the seminar documentation clone. If you already have that clone, reuse its path in the overlay step.

```powershell
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-coupons-s4
Set-Location eshop-coupons-s4
git rev-parse --show-toplevel
git status --short
git switch --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef
git rev-parse HEAD
Set-Location backend
node --version
npm.cmd --version
npm.cmd ci --no-audit --no-fund
npm.cmd test
npm.cmd run test:coupons
```

Expected: 88 tests pass in the integration suite and 26 in the Coupons profile. The latter consists of 25 Coupons cases and one API-flow case. Preserve the command output and exact versions for your own run. The baseline manifest contains the [original execution evidence](../../experiments/s3/Baseline_Manifest.md).

Do not install Stryker again in this research checkout: its dependencies are already pinned in the lockfile. The workshop exercise teaches installation separately. Check out the frozen revision before `npm ci`; current development HEAD can contain unrelated edits or manifest errors.

### Understand Data Reset

`test/helpers/isolate.js` and `test/helpers/coupons.js` load an isolated application and SQLite database. Coupons/usage rows are reset between cases. The fixture freezes Date while retaining the native timers needed by SQLite and HTTP. Tests obtain real JWTs through login. When a scenario advances Date, it obtains a fresh token so that token expiry does not replace the intended coupon condition.

Do not import `database.js` into an extra production process to reset data: its seed logic can recreate tables. Use the existing harness and keep the tracked `database.sqlite` unchanged.

## First Test

### Run the Domain Baseline

From the research checkout's `backend` directory:

```powershell
npm.cmd run test:coupons
npm.cmd run coupons:dry
npm.cmd run mutate:coupons
```

The dry run checks instrumentation and test discovery. It does not execute every mutant and provides no final mutation score. After the full run, open `reports/coupons/mutation.html`; retain its adjacent JSON file and console output before rerunning.

Historical reference on the frozen source:

| Tests | Total mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 26 | 120 | 39 | 21 | 30 | 25 | 5 | 52.17% |

Your observed report is authoritative for your run. A different state distribution must be investigated and recorded. The reference comes from the [S3 experiment log](../../experiments/s3/Experiment_Log_Thai_Hoa.md#h02--comparison--limits).

### Inspect the Persisted-Limit Gap

At `server.js` line 474, inspect the expression below and its two retained surviving variants:

```javascript
// Original
max_uses_per_user || 1
// Retained mutant 111
true
// Retained mutant 113
max_uses_per_user && 1
```

The existing create case supplies limit 1. SQLite also stores the two replacements as 1 for that input, so this example cannot distinguish them. Use a valid non-default limit, then read the configured value back through the API.

The manual-analysis profile supplies 3. Its critical check is:

```javascript
expect(listed.body[0].max_uses_per_user).toBe(3);
```

Two further scenarios record two uses and three uses, respectively. With a fixed discount of 25000 and total 100000, the below-limit quote must contain discount 25000 and final amount 75000. At the limit, the quote must be refused. The retained tests use HTTP 400 as the shared implementation convention; the SRS's essential rule is refusal without a discount.

## Advanced Usage

### Load the Retained Additional Tests

The frozen checkout contains no extended manual/AI files. Copy the exact seven-file overlay from the seminar repo's [source snapshot](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend). This example assumes the seminar clone is a sibling of `eshop-coupons-s4`:

```powershell
$docsRoot = (Resolve-Path '../../T10_Mutation_Testing_and_Test_Effectiveness').Path
$overlayRoot = Join-Path $docsRoot 'experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend'
$backendRoot = (Get-Location).Path
Get-ChildItem -LiteralPath $overlayRoot -Recurse -File | ForEach-Object {
  $relative = $_.FullName.Substring($overlayRoot.Length + 1)
  $destination = Join-Path $backendRoot $relative
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destination) | Out-Null
  Copy-Item -LiteralPath $_.FullName -Destination $destination
}
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
```

Expect 35 original-code tests in the extended manual-analysis profile and 40 in the extended Agent profile. Save the respective HTML/JSON reports from `reports/coupons-manual` and `reports/coupons-ai`.

| Profile | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score | Killed / valid |
|---|---:|---:|---:|---:|---:|---:|---:|
| Extended manual-analysis | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |
| Extended Agent | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |

These are retained domain results. Both profiles detect the same two additional limit mutants. The extra scenarios improve observed behavior coverage without adding further mutant kills in this universe. See the [extension evidence](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md).

### Review or Request an AI Candidate

For a recording with saved evidence, open the [original request, failure and Codex provenance](../../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md). State that you are reviewing a retained candidate. The historical Claude CLI request failed authentication; the user selected Codex in the same context. Do not label this output as a successful Claude generation or an independent human-versus-AI trial.

For a new request, use an authenticated AI Agent and record the actual tool/model. Supply the specification, test harness, baseline report and mutant diff. The following is a reusable new prompt, not a historical transcript:

```text
Use README.md FR-09 C5 and FR-17, api_specification.md sections 5 and 6.4,
the existing Coupons harness, and the baseline mutation report.
Analyze the surviving replacements of max_uses_per_user || 1 at line 474.
Propose tests using a valid non-default limit and the existing helper APIs.
Check persistence and usage below/at the configured limit.
Preserve the original tests, production source, dependencies and mutation scope.
For each proposed assertion, identify its specification basis and target mutant.
Label any HTTP/payload convention not specified by the SRS.
Return candidate code and reasoning for review; do not claim execution results.
```

Review imports, reset logic, expected amounts, token identity and oracle provenance. Reject an assertion that only encodes a known original defect. Run the candidate against original code first, then run mutation testing. Keep raw output, the reviewed version, edits and both reports. A new output may have different counts; report those actual observations.

### Compare and Explain

Match mutants by source, location, mutator and replacement. Read `killedBy` and the associated failing test. Numeric IDs are local to a particular report. Never infer an added assertion kill from a higher percentage alone.

For Coupons, valid mutants are `39 + 21 + 30 + 25 = 115`. Stryker's baseline score is `(39 + 21) / 115 * 100 = 52.17%`. The separate assertion-kill proportion is `39 / 115 * 100 = 33.91%`. Runtime errors are outside the score denominator. Use the [official definitions](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/).

`test.each([2, 4])` is data-driven testing. Persisted values, response amounts, refusal and usage-row counts are checkpoints. This is a semi-automated testing workflow; no GUI Record & Playback capability is claimed.

## Troubleshooting

| Observation | Check and action | Evidence boundary |
|---|---|---|
| Invalid `package.json` / `EJSONPARSE` | Confirm the frozen SHA before installation. Preserve unrelated development changes; use the disposable checkout | HEAD `69b845a` had a missing comma at initial inspection; an external commit `4b28756` fixed it during this session. The recorded runs still use frozen `806ba19` |
| PowerShell blocks `npm.ps1` | Use `npm.cmd` as shown | Shell workaround; no global execution-policy change needed |
| SQLite native binding missing | Check Node/npm and the tracked allowScripts policy; reinstall with the frozen lockfile and inspect the install log | Prior S3 installation encountered blocked native scripts; do not enable every install script globally |
| `No tests were found` | Confirm backend directory, Jest config, file paths and `stryker-tmp` exclusion | The prior Cart handoff exposed discovery failure; a dry-run failure is not a mutation result |
| `npx` fails to locate the intended binary | Use the explicit local `node node_modules/...` commands above | Keeps the pinned package version |
| Tests fail on original code | Inspect the actual assertion and whether a defect profile was selected | Separate defect tests intentionally fail; do not weaken valid expectations |
| HTML shows older values | Wait for completion and reopen the correct profile's HTML/JSON | Retain reports before the next execution |
| AI authentication fails | Record the error; use the disclosed saved-candidate replay or authenticate before a new request | No successful generation is inferred from an attempted request |

## Failure Modes

1. High line coverage can coexist with weak assertions. The retained toy example has full line/statement coverage but only 60% mutation score; its zero branch sites do not prove decision coverage.
2. A Timeout contributes to Stryker's score without an assertion deciding the result. Report it separately from Killed.
3. Original minimum/expiry defects limit which specification-correct tests pass on original code. Correcting mutants must not be killed by deliberately wrong expected values.
4. More cases do not guarantee more kills: the 35/40-test Coupons extensions preserve the initial variants' mutation states.
5. Shared context and helper code prevent an independent human-versus-AI interpretation. Report the tested collections and their provenance.

## References

- [S3 research notes](../../research/s3/Research_Notes_Thai_Hoa.md): coverage, assertions, configuration and source register.
- [Baseline manifest](../../experiments/s3/Baseline_Manifest.md): frozen inputs and domain selections.
- [Coupons experiment log](../../experiments/s3/Experiment_Log_Thai_Hoa.md): historical execution and limitations.
- [Stryker configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) and [Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/): checked during this S4 preparation on 2026-10-23.
- [Joint S4 comparison](../../experiments/s4/Overall_Comparison.md): separately executed combined profiles; do not substitute joint counts for domain-only counts.
- AI assistance: `TH-S4-DOCS-20261023` in the [individual AI record](../../ai-audit/AI_Record_Thai_Hoa.md).
