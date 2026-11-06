# User Guide Contribution

**Document Role:** Domain section cho User_Guide.md; leader hợp nhất sau review. Bản AI-drafted (Claude Code, Sonnet 5.5), chờ member review.  
**Stage:** S4  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S4-A03  
**Domain / Section:** Authentication & Users (register, login/lock, forgot/reset password, `GET`/`PUT /api/users/me`, `authenticateToken`); Advanced Usage và Failure Modes từ Research Notes A03/B03  
**Evidence Status:** Partial — mọi lệnh và số liệu dưới đây lấy từ run đã lưu ở S3 (macOS arm64, Node v26.12.1, 2026-10-23). Chưa có người ngoài nhóm chạy lại hướng dẫn này (xem `Guide_Reproduction_Phuc_Hoang.md`, `Verification_Notes_Phuc_Hoang.md`). Mục "untested" được đánh dấu rõ.

Write the deliverable in English. This file contains your domain section; the leader assembles User_Guide.md after review.

## Introduction

This section teaches a reader who has never used mutation testing to measure and improve the tests of one API domain: **Authentication & Users** of the EShop backend (Express + SQLite). It shows two ways to improve the tests: writing assertions by hand and asking an AI agent (Claude) for candidates, and how to check each one with StrykerJS.

Key terms (used in the rest of the guide):

- **Mutant**: a copy of the code with one small change, for example `>= 3` changed to `> 3`.
- **Killed**: at least one test fails on the mutant. **Survived**: all tests still pass, so no assertion noticed the change. **NoCoverage**: no test runs that line. **Timeout**: the mutant made the code hang, so the run was stopped. **RuntimeError**: the mutant crashed the test process and is excluded from the score.
- **Equivalent mutant**: a mutant whose behaviour cannot be told apart from the original code. A survivor is only an *equivalent candidate* until someone argues why no input can distinguish it.
- **Assertion kill** (this guide's term): Killed / (Killed + Timeout + Survived + NoCoverage). **Stryker score**: (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage). The two differ by the Timeout count.

Prerequisites: Node.js 22 or later (tested with v26.12.1), npm, Git, and for the AI step the `claude` CLI (Claude Code 2.1.308 was used) with a logged-in account. Spec used as the oracle: `api_specification.md` §1–2 and the functional requirements FR-02, FR-03, FR-04 and SEC-06 in the SUT `README.md`. The shared baseline is fixed in [`Baseline_Manifest.md`](../../experiments/s3/Baseline_Manifest.md): SUT commit `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`.

## Installation

Verified on macOS (Darwin arm64), Node v26.12.1, npm 11.20.0, StrykerJS 10.0.0 (`core` and `jest-runner`), Jest 30.5.2. Source: [`run_meta.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/run_meta.txt).

```sh
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-sut
cd eshop-sut
git checkout --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef   # frozen baseline
cd backend
npm ci --no-audit --no-fund       # installs exactly the lockfile versions
npm test                          # expected: 88 tests pass (Cart 36 + Coupons 26 + Auth 26)
```

- `npm ci` printed peer-dependency and deprecation warnings only; no errors ([log](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/npm-ci.log)).
- **Reset between runs.** Auth tests start every test from a fresh in-memory SQLite database (`test/auth-cleanup.cjs`, `testDb.js`), so no manual reset is needed. Delete `stryker-tmp/` and `reports/` if a run was interrupted. The production files `server.js`, `database.js` and `database.sqlite` are never edited; the run records their SHA-256 before and after ([`sha-before.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/sha-before.txt), [`sha-after.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/sha-after.txt)).
- To try the tools on a 20-line function before touching EShop, the small sandbox in [`C03-weak/`](../../experiments/s3/runs/Phuc_Hoang/C03-weak/) and [`C03-strong/`](../../experiments/s3/runs/Phuc_Hoang/C03-strong/) was installed from an empty folder (`npm i -D jest @stryker-mutator/core @stryker-mutator/jest-runner`, 544 packages; weak tests 66.67%, strong tests 88.89%).

## First Test

**Goal:** run the existing Auth tests, then the baseline mutation run, and open the report.

```sh
npm run test:auth                                   # 26 tests pass on the original code
npx stryker run stryker.auth.config.json --dryRunOnly   # checks that Stryker can run the tests
npm run mutate:auth                                 # about 1 min 25 s on the tested machine
```

The report is written to `reports/auth/mutation.html` and `reports/auth/mutation.json`. Expected output on `806ba19` (run twice, identical per mutant):

| Mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError | Stryker score | Assertion kill |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 125 | 60 | 27 | 23 | 7 | 8 | 74.36% (= 87/117) | 51.28% (= 60/117) |

Evidence: [`E03-baseline/`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/) (`console.log`, `mutation.html`, `mutation.json`, `run_meta.txt`, `repeat/`). The same 125 mutants and states were also reproduced on Windows (Node v24.16.0) by another team member (0 differences, see [`compare_vs_thai_hoa_frozen.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/compare_vs_thai_hoa_frozen.txt)).

**How to read the HTML report.** Open `mutation.html`, filter by status *Survived*. Each row shows the changed line. Start with a mutant that changes behaviour a user can see. Example from this baseline:

```js
// server.js line 124 (PUT /api/users/me)
if (role) { ... }            // mutant: if (true)  -> Survived
```

Reading it: the profile-update tests (AU-U04…U06) never read the user's `role` back. When the mutant makes every update write `role`, `NULL` is stored for users who sent no `role`, and nothing fails. The test checked status 200 and the new name, not the other columns of the row.

## Advanced Usage

### 1. Analyse survivors before writing tests

For each Survived/NoCoverage mutant write down: the line it changes, the input or state that makes original and mutant behave differently, the expected value **from the spec**, and one of the categories in [Failure Modes](#failure-modes). In this domain 30 baseline mutants were analysed ([`F03-manual/mutant_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/mutant_mapping.md)). Only write an assertion when the spec (or a clearly labelled convention) gives the expected value; otherwise record "spec silent".

### 2. Manual assertions

Add a new test file, never edit the baseline tests. Example that kills the `if (true)` mutant above ([`auth.manual.test.js`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/auth.manual.test.js), AM-01):

```js
test('AM-01 a profile update without `role` leaves the stored role unchanged', async () => {
  const token = await loginOk(app, ALICE);
  expect((await update(token, PROFILE)).status).toBe(200);
  expect((await testApi.userByEmail(ALICE.email)).role).toBe('user');   // persisted state
  expect((await me(token)).body.role).toBe('user');
});
```

Run the new test on the **original** code first (it must pass), then the mutation run on the extended set:

```sh
npm run test:auth:manual       # 39 tests pass = 26 baseline + 13 new (branch s3/F03-auth)
npm run mutate:auth:manual
```

Result: Killed 83, Timeout 27, Survived 4, NoCoverage 3, RuntimeError 8; Stryker score 94.02%, assertion kill 70.94%. 23 of the 30 analysed mutants moved to Killed and none moved the other way. About 5 of those 23 rest directly on a spec sentence (FR-02/03/04); the other 18 rest on conventions (HTTP 500 when the database fails; an error body exists), which the test names say. Evidence: [`F03-manual/`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/).

To see which assertion killed a mutant, read the `killedBy` field in `mutation.json` or the test list in the HTML report. Mutants are matched between runs by line, column, mutator and replacement, **not** by the numeric id.

### 3. Claude workflow (semi-automated)

1. **Prepare the prompt** (kept as `prompt.txt`): source lines under test, the spec text, the harness/fixture files, the **baseline tests only**, and the exact list of survivors from the baseline report. Do not include the manual tests if you want an independent candidate. See [`G03-ai/prompt.txt`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/prompt.txt).
2. **Call Claude without tools and without your local settings**, so another machine can reproduce it ([`command.txt`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/command.txt)):

   ```sh
   mkdir ai-run && cd ai-run        # an empty directory
   claude -p "$(cat prompt.txt)" --output-format json --tools "" \
     --disable-slash-commands --strict-mcp-config --no-session-persistence --setting-sources local
   ```

   Save the raw JSON and the text unedited (`raw.json`, `raw_result.md`).
3. **Review every candidate against the spec** and label it Accepted, Edited or Rejected with a reason. In this domain Claude proposed 9 groups of tests: 7 accepted, 1 edited (renamed to say "interpretation, spec silent"), 1 rejected (see Failure Modes). It also declined to write tests for 12 mutants because the spec is silent, and that refusal was accepted.
4. **Commit the raw file first, then the edited file** on a branch that starts from the baseline (`s3/G03-auth`: raw `0c57bf2`, edited `b27fce2`) so that the human edits are a visible diff ([`human-edits.diff`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/human-edits.diff)).
5. **Verify by running**, not by trusting Claude's summary:

   ```sh
   npm run test:auth:ai       # 37 tests pass on the original code
   npm run mutate:auth:ai
   ```

Result after review (two identical runs): Killed 74, Timeout 27, Survived 13, NoCoverage 3, RuntimeError 8; Stryker score 86.32%, assertion kill 63.25%. Claude killed 14 of the 30 analysed mutants; the manual tests killed 23. 13 mutants are killed by both, one only by Claude, 10 only by the manual tests, 6 by neither ([`kill_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/kill_mapping.md)). Do not read this as "manual is better than AI": it is one prompt, one domain, and the same agent wrote the prompt and reviewed the output (stated in the experiment log).

### 4. Useful Stryker options (status shown honestly)

| Feature | Use | Status |
|---|---|---|
| `mutate: ["server.js:20-135"]` | Mutate only the lines of one domain, because all routes live in one file | **Run** (all Auth runs) |
| `coverageAnalysis: "perTest"`, `concurrency`, `timeoutMS`, `timeoutFactor` | Same policy for baseline, manual and AI so scores are comparable | **Run** (2, 5000, 1.5) |
| `// Stryker disable next-line <Mutator>: <reason>` | Marks equivalent mutants as Ignored | **Run** in the sandbox, see Failure Mode 1 |
| `--dryRunOnly`, `--logLevel trace`, `--cleanTempDir false` | Diagnose "tests pass locally but fail in Stryker" | dry run **run**; the other two from the docs, *untested here* |
| `incremental`, `--force`, `thresholds.break`, `ignoreStatic`, `disableBail` | Faster loops, CI gates, per-assertion kill list | from the Stryker docs, *untested here* |

## Troubleshooting

Observed in this domain (all with logs in the run folders):

| Symptom | Cause found | Fix that worked |
|---|---|---|
| 8 mutants end as **RuntimeError**; log shows `exited unexpectedly with exit code null (SIGSEGV)` | A `StringLiteral ""` mutant replaces a SQL string that has bind parameters; `sqlite3` 6.0.1 crashes. Reproduced outside Stryker with `db.run("", [..], cb)` | None needed: Stryker excludes them from the score. Report them separately; do not count them as Killed. Check the *count* is stable (8 in every run) |
| 4 mutants `if (!user)` → `false` are RuntimeError in one harness and Timeout in another | An error thrown inside a callback outside `try/catch` kills the process; which status you see depends on the test harness | Compare scores only between runs with the same harness and commit (provisional 73.45% vs baseline 74.36% differ by this alone; [`compare_vs_provisional.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/compare_vs_provisional.txt)) |
| `claude --bare` fails with "Not logged in" | `--bare` needs an API key and ignores subscription login | Use `claude -p` with `--setting-sources local` as in step 3 |
| Timeout counts could differ between machines | Timeouts depend on machine speed and on `timeoutMS`/`concurrency` | Keep the same Stryker policy, report `Killed` and `Timeout` separately and say which machine ran them. For Auth the baseline gave the same 27 Timeouts on macOS and on a Windows run (0 state differences in 125 mutants) |
| `npm ci` shows `ERESOLVE overriding peer dependency`, `deprecated glob`, "21 moderate severity vulnerabilities" | Dependency warnings of the toolchain | Ignored; run still works. Not fixed: `npm audit fix` was not run |
| Node was upgraded by Homebrew between two sessions (v26.12.0 → v26.12.1) | Machine update | No result change was observed, but record `node -v` in every run |

*Untested suggestions:* if Jest cannot find tests inside the Stryker sandbox, the Stryker troubleshooting page points to hidden temp folders; this config already sets `tempDirName: "stryker-tmp"` so the problem did not occur here.

## Failure Modes

Ways the tools can lead a user to a wrong conclusion. Each has a run or log as evidence.

1. **Timeout is counted as detected (Stryker).** In the baseline, 27 of the 87 "detected" mutants (31%) are Timeouts caused by handlers that never respond (`BlockStatement {}`, `if (true)`); no assertion decided them. The Stryker score (74.36%) is 23.1 points above the assertion-kill rate (51.28%). The same 27 mutants are Timeout in the baseline, manual and AI runs, so adding assertions cannot change that part of the score. *Avoid:* always report Killed and Timeout separately and show both formulas. Evidence: [`E03-baseline/`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/), [`H03-comparison/comparison.md`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md).
2. **A disable comment hides mutants that could be killed (Stryker).** In the sandbox, `// Stryker disable next-line EqualityOperator` ignored all equality mutants on the line, including two that the tests had killed. Score went from 88.89% to 100% with no new assertion. *Avoid:* disable at the narrowest mutator, give a written reason, and report the score before ignoring. Evidence: [`A03-S1-strong/`](../../experiments/s3/runs/Phuc_Hoang/A03-S1-strong/) vs [`A03-S1-ignored/`](../../experiments/s3/runs/Phuc_Hoang/A03-S1-ignored/).
3. **An AI candidate can raise the score by encoding a known bug (Claude).** The raw Claude file contained a `test.failing` test that asserts the correct behaviour (`PUT /me` must not change `role`). It fails on the original code, so `test.failing` makes it "pass", and the four mutants that delete the `role` branch counted as Killed only because they remove the vulnerability. The raw score was 89.74%; after the member removed the test it was 86.32%. *Avoid:* run every AI test on the original code and read why it passes; keep tests for known defects in a separate suite. Evidence: [`G03-ai/raw-candidate-run/`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/raw-candidate-run/), [`human-edits.diff`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/human-edits.diff).
4. **The AI's own summary can be wrong (Claude).** Claude reported "17 mutants have a test, 13 do not"; the file really covered 18 and left 12. It also left unused imports and named the wrong task in a header. *Avoid:* count from the report, not from the message. Evidence: [`G03-ai/raw_result.md`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/raw_result.md), experiment log §AI Runs.
5. **A survivor is not always a weak test (Stryker).** The survivor `newAttempts >= 3` → `> 3` cannot be killed through the API on the original code because the failure counter only takes even values (the code adds 2 per failed login, the requirement says 1). It is an *equivalent candidate within that scope*, and it becomes killable once the code follows the spec. Stryker cannot tell the difference. *Avoid:* label survivors as real gap, stubborn, spec silent, masked by a defect or equivalent candidate, and state the scope. Evidence: [`F03-manual/probes.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/probes.md).

## References

- API spec: `api_specification.md` §1–2; SUT `README.md` FR-02, FR-03, FR-04, SEC-06 (SUT commit `806ba19`).
- Experiment log: [`Experiment_Log_Phuc_Hoang.md`](../../experiments/s3/Experiment_Log_Phuc_Hoang.md); frozen setup: [`Baseline_Manifest.md`](../../experiments/s3/Baseline_Manifest.md).
- Reports and runs: [`E03-baseline`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/), [`F03-manual`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/), [`G03-ai`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/), [`H03-comparison`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/).
- Research notes with sources [P01]–[P16]: [`Research_Notes_Phuc_Hoang.md`](../../research/s3/Research_Notes_Phuc_Hoang.md).
- StrykerJS: [Configuration](https://stryker-mutator.io/docs/stryker-js/configuration/), [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), [Equivalent mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/), [Disable mutants](https://stryker-mutator.io/docs/stryker-js/disable-mutants/), [Troubleshooting](https://stryker-mutator.io/docs/stryker-js/troubleshooting/).
- Claude Code: [Run Claude Code programmatically](https://code.claude.com/docs/en/headless).
- AI use for this section: [`AI_Record_Phuc_Hoang.md`](../../ai-audit/AI_Record_Phuc_Hoang.md) (artifact `PH-S4-GUIDE-A03`).
