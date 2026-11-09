---
name: "stryker-js-mutation-testing"
description: "Set up, run and interpret StrykerJS mutation testing for JavaScript/TypeScript (Jest, Vitest, Mocha), then strengthen tests by killing surviving mutants with spec-based assertions, including AI-written ones. Use whenever someone mentions Stryker, mutation testing, mutation score, surviving/killed mutants, mutation.json/mutation.html, 'are my tests actually checking anything', or wants one test that kills a specific survivor, even if they don't say 'mutation testing'."
---

# StrykerJS Mutation Testing (v2)

Reply in the user's language; keep commands, mutator names and statuses (Killed, Survived...) in English.

Principles, because a mutation score is only as honest as its inputs:
- **The spec is the oracle, not the code.** Code may be wrong; an expected value copied from it "learns the bug". If the spec is silent, say so.
- **Evidence beats explanation.** A test kills a mutant only when it passes on the original code AND the mutant is Killed in a real run.
- **Never invent results.** Not run → `Not run`. Don't edit production code, or tests/config to make numbers match.

## Before starting

Ask once, in one message: (1) where the spec/requirements are, (2) the command that runs the tests, (3) which file or line range to mutate. Don't ask again later.
Non-interactive (`claude -p`, CI): don't ask. Default to the smallest sensible scope (one file or a range of ≤30 mutants), pick the test command from `package.json`, and list every assumption at the top of the output.

## Quick path

Run every command from the project root (no `cd x && ...`); it keeps commands simple to allow-list and to reproduce.

1. Record OS, `node -v`, `npx stryker --version`, test runner version, commit/branch.
2. Run the plain tests. They must pass first; isolate known-defect tests in a separate config.
3. Reuse what exists: if a Stryker config (`stryker.config.*`, `stryker.*.json`) is present, use it unchanged and narrow scope on the CLI with `--mutate`. Only when there is none: install `npm i -D --save-exact @stryker-mutator/core @stryker-mutator/<runner>-runner` and create one minimal config (`coverageAnalysis: "perTest"`, reporters `clear-text`, `html`, `json`; runners: `references/runners.md`).
4. Estimate time before a big run (`references/performance.md`); start with ≤30 mutants.
5. `npx stryker run [config] --mutate "path/file.js:start-end" 2>&1 | tee runs/<run-id>/console.log` (create `runs/<run-id>/` first). Pass flags directly, not through `npm run x --`.
6. Copy `mutation.json` and `mutation.html` into `runs/<run-id>/` before the next run overwrites them.
7. Count statuses from JSON: `node <skill-dir>/references/count.js runs/<run-id>/mutation.json` (meaning and score: `references/status-metrics.md`).
8. For each Survived mutant: label it (`missing-assertion`, `missing-input`, `untestable-path`, `defect-fixing`, `equivalent-candidate`) and kill the fixable ones (mode below).
9. Put new tests where the existing test selection already picks them up (an existing test file, or a file matching its pattern), so the rerun needs no new config.
10. Rerun with the **same command and `--mutate`**, compare absolute Survived counts, write up with `references/report-template.md`.

Strange errors, Timeouts, crashes or Windows problems: check `references/traps.md` (observed examples, not universal rules).

## Mode: kill one survivor

Input: one survivor (location, mutator, original → replacement), the code around it, the spec excerpt, available test helpers.
1. Find the distinguishing input: what makes original and mutant produce different output or state.
2. Assert body and side effects (DB, stored state), not only HTTP status; if the API only returns a message, read the resource back.
3. Exact expected value (`toBe`, `toEqual`) taken from the spec. Async helpers need `await`.
4. Spec silent, or the mutant removes a bug (`defect-fixing`) → output `DECLINE: <reason>` instead of a test.
5. Output only: one ```js block with a complete test file, plus one line `Spec: <section> — <requirement>`.
Gates before accepting any test (human or AI): spec basis checked → passes on original → target Killed (not Timeout) in a real run → kill comes from a business assertion, not broken setup.

## Speed and diagnostics

- `--mutate "file:start-end"`: a 16-mutant range took 25 s where 150 mutants took about 4 min (our measurements, `references/performance.md`).
- `--incremental`: reuses results for unchanged code/tests; a rerun after editing one test took 23 s instead of about 4 min. Do a full run for final numbers.
- `--disableBail`: needed when you want `killedBy` to list every test that kills a mutant (default stops at the first failing test).
- `concurrency`: lower it if native modules crash or tests share state (DB, files, globals).

## Recommendations

- Commit the tests and config before a measured run, so commit + config + command reproduce the numbers.
- Label who ran what. Run ID = `<scope>-<n>`, plus exactly one `-ai` at the end when an AI agent executed it (`cart-1-ai`, `cart-2-ai`); the suffix marks the executor, so never add it twice or use it to mean "AI-written tests".
- Report scope with the score ("79.7% on 150 mutants in 2 ranges"), all status counts, and the Stryker version.
