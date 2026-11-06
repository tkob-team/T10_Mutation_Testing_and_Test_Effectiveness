# D04 Integration and Frozen Experiment Evidence

**Executor:** OpenAI Codex AI Agent. **Date:** 2026-10-23 Asia/Saigon. Raw timestamps use UTC. No subagents or computer use; the failed Claude CLI invocation is a logged G02 experiment, not a successful generation.

| Evidence | Interpretation |
|---|---|
| [Integration review](../../../D04_Integration_Review_2026-10-23.md) | Reviewed merges, original attribution, stages and limits |
| [Baseline manifest](../../../Baseline_Manifest.md) | SUT `806ba19`, frozen config/test sets and commands |
| [Exact frozen test run](frozen-commit-final-tests.json) / [metadata](frozen-commit-final-tests.meta.json) | 88 tests pass; randomized seed 731023 |
| [Fresh pinned install](frozen-clean-install.meta.json) / [post-install tests](clean-install-baseline.json) | npm ci succeeds on frozen input; all 88 tests pass again |
| [Defects](d04-defects-final.json) / [metadata](d04-defects-final.meta.json) | 54 failures at assertions; one Auth TTL bound is assumed |
| [Auth import hashes](auth-import-sha256.json) | Original five files byte-identical to delivered evidence |
| [Whole-server coverage](coverage/coverage-summary.json) | 68.70% statements, 59.68% branches, 61.42% functions, 71.84% lines |
| [Toy coverage](toy-weak-coverage/coverage-summary.json) | 100% line/statement coverage, zero measured branch sites |
| [Toy weak](tutorial-weak/mutation.json), [AI](tutorial-ai/mutation.json), [stronger](tutorial-strong/mutation.json) | Same 5 signatures; 3/4/5 Killed respectively |
| [Oracle derivative](oracle-patch-check/metadata.json) / [patch](oracle-patch-check/server.patch) | Three failures become pass on a separate copy; original untouched |
| [Coupons baseline](frozen-coupons-baseline/mutation.json) | 39 K / 21 T / 30 S / 25 NC / 5 E |
| [Cart baseline](frozen-cart-orders-baseline/mutation.json) | 82 K / 25 T / 34 S / 2 NC / 7 E |
| [Auth baseline](frozen-auth-baseline/mutation.json) | 60 K / 27 T / 23 S / 7 NC / 8 E |
| [F02 original-code result](f02-original.json), [mutation](f02-mutation/mutation.json), [mapping](coupons-f02-comparison.json) | 29 pass; two new assertion kills; AI-assisted draft for human review |
| [G02 original-code result](g02-original.json), [mutation](g02-mutation/mutation.json), [mapping](coupons-g02-comparison.json) | 28 pass; same two new kills |
| [G02 raw candidate/provenance](G02-Codex/PROVENANCE.md), [executed hash](G02-Codex/executed-sha256.json) | Same-context Codex explicitly chosen; raw bytes match executed file |
| [Failed Claude request](G02-request/metadata.json) / [raw error](G02-request/raw.json) | Not logged in; no successful Claude output claimed |
| [Cart old/new](cart-provisional-vs-frozen.json), [Auth old/new](auth-provisional-vs-frozen.json) | Same signatures; state/error classification differs with runtime/config |
| [Cart manual](cart-reproduced-manual/metadata.json), [Cart AI](cart-reproduced-ai/metadata.json) | Existing teammate files rerun on frozen base; original author retained |
| [Cart manual mapping](cart-manual-frozen-comparison.json), [AI mapping](cart-ai-frozen-comparison.json) | 23 / 13 Survived→Killed; 150/150 signatures match |

Each run has `*.meta.json` containing executable/args, timestamps, commit/branch, runtime and production hashes, plus stdout/stderr logs. Run directories keep HTML and JSON reports. Reproduction scripts are stored here; they refuse to overwrite existing evidence. No raw outputs are edited to fit a narrative.

Starting merge checks have 36→61→87 passing tests; D04 adds the API scenario to reach 88. Earlier failed/superseded attempts remain in `../S3-2026-10-23-agent/` and the recovery stash; they do not validate the final baseline. Interactive initializer was cancelled; the official prepare/pinned-config/run workflow is an explicit adaptation, not a fabricated successful init wizard.

The [detailed log](../../../Experiment_Log_Thai_Hoa.md), [survivor analysis](../../../Coupons_Survivor_Analysis_Thai_Hoa.md), [cross reproduction](../../../Cross_Reproduction_Notes_Thai_Hoa.md) and AI audit retain the human-review, source and same-context limitations. Auth F03/G03/H03 and I02 manual/AI remain Pending.
