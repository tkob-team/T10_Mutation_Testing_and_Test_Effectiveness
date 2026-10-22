# C02 / D02 Agent Run Evidence

**Executor:** OpenAI Codex AI Agent, current chat, GPT-6 family (exact serving revision unavailable).
**Date:** 2026-10-22 Asia/Saigon. Raw timestamps UTC.
**SUT:** branch codex/s3-coupons-hoa; production base 92bbf22; tested code commit `6850e9f899a47702982fb65a482ad821245de31e`.
**Role:** setup and spec suite handoff; not common mutation baseline, member run or G02.

| Evidence | Purpose |
|---|---|
| [commands.json](commands.json) | Actual commands, timestamps and exit expectations |
| [environment.json](environment.json) | Runtime versions and protected file hashes |
| [baseline.log](baseline.log), [baseline-repeat.log](baseline-repeat.log) | 25/25 pass, repeatability |
| [defects.json](defects.json), [defects.log](defects.log) | 16 assertion failures, expected exit 1 |
| [dry-run.log](dry-run.log) | 25 initial tests pass; no mutation execution |
| [install.log](install.log) | Clean npm ci with project allowScripts |
| [tutorial-weak.log](tutorial-weak.log), [weak JSON](tutorial-weak/mutation.json), [HTML](tutorial-weak/mutation.html) | 3 Killed / 2 Survived of 5; score 60% |
| [tutorial-ai.log](tutorial-ai.log), [AI JSON](tutorial-ai/mutation.json), [HTML](tutorial-ai/mutation.html) | 4 Killed / 1 Survived of 5; score 80% |
| [AI candidate](ai-candidate.raw.txt), [provenance](AI_Provenance.md) | Same-session generated assertion and evidence limits |

Target mutant signature: eligibility.js line 4, EqualityOperator, replacement total > minimum. id 3 in both reports.
NoCoverage, Timeout and RuntimeError all 0 in both toy reports.
Source/test/config input hashes: [input-sha256.json](input-sha256.json); runtime/dependency versions: environment.json.
Final checks: [final-review.json](final-review.json) — source/DB preservation, pinned harness/lock reuse, identical toy source/mutant signatures, raw candidate identity, baseline discovery, personal guide boundary and 53 local document links.
Standards/spec review was performed by the primary Agent without subagents, honoring workspace instructions. No actionable implementation blocker was found; original SUT defects and unresolved policies remain explicit in Contract.
Member verification, common D04 baseline, F02/G02/H02/I02 remain Pending.

Sources consulted: [Stryker Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/), [metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), [Jest timer mocks](https://jestjs.io/docs/timer-mocks).

