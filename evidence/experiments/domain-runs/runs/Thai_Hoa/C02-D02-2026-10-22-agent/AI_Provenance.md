# AI Provenance — TH-S3-C02D02-01

**Tool:** OpenAI Codex AI Agent. Model family GPT-6; exact serving revision unavailable.
**Date:** 2026-10-22, client Asia/Saigon.
**Tasks:** S3-C02/D02. No human authorship, human approval or F02 completion claimed.

## Verbatim User Instruction Excerpt

> Hiểu được việc chưa? Rồi thì thực hiện đi, khi nào xong thì báo. Nhớ phải có căn cứ logic và tìm chuẩn những edge cases bị bỏ qua nha, thứ t cần là chất lượng, không phải số lượng.

Scope from the preceding accepted plan: Coupons setup/tests/seed-reset; defects separate; production preserved; walkthrough outside team repositories; record actual agent/model.

## Generation & Output

- Agent read SUT README FR-09/12/17/SEC-02/03, API §5/6.4, source and team contract.
- Agent reused Hiệp harness and pinned dependencies from 8d60e9b.
- Baseline/defect tests and C02 toy candidate were generated in this chat via file patches.
- [ai-candidate.raw.txt](ai-candidate.raw.txt) is a byte snapshot of the generated toy candidate; SHA-256 input manifest checks it against tutorial/ai.test.js.
- The toy contract is inclusive eligibility(total,minimum) for finite nonnegative numeric inputs. Candidate checks 100/100 -> true.
- Weak/AI reports were executed locally and compared by signature; target total > minimum changes Survived to Killed.
- Full conversation/tool-call transcript has not been exported into the team repo. This note is a provenance summary, not a verbatim model API request/response transcript.

## Verification & Limits

Agent-run verification: original tests pass, defect failures are assertions, toy target killed, source/DB preserved. Human spec review, actual self-run and official verdict remain Pending.
Toy candidate was produced by the same Agent with visible toy code in this session. No independent/blinded session or comparison to a human manual solution is claimed.
Tests/tooling and docs are AI-assisted production. Personal walkthrough is outside both team repositories by user request.

