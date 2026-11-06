# Cross Reproduction Notes

**Executor:** Codex AI Agent, not a teammate self-run. **Frozen input:** `806ba19`. **Task relation:** D04 verification and I02 baseline (Partial).

## Cart Supplemental Reproduction

Reused existing teammate source without edits: manual `origin/s3/F01-manual @ b77f5d6`, AI `origin/s3/G01-ai @ f4696c6`. Both are overlaid onto a temporary archive of the frozen baseline. Runtime source bytes match the working frozen production; configs use the same Cart scope, concurrency 2 and timeout policy. No variant tests enter main or the frozen baseline. Metadata records overlay commits and SHA-256.

| Cart test set | Tests pass | Killed | Timeout | Survived | NoCoverage | RuntimeError | Score |
|---|---:|---:|---:|---:|---:|---:|---:|
| Frozen baseline | 36 | 82 | 25 | 34 | 2 | 7 | 74.83% |
| Hiệp manual reproduction | 44 | 105 | 25 | 11 | 2 | 7 | 90.91% |
| Existing AI reproduction | 41 | 95 | 25 | 21 | 2 | 7 | 83.92% |

Both comparisons match source bytes and 150/150 mutant signatures. Manual adds 23 assertion kills; AI adds 13. All non-new-kill states remain unchanged in these reproductions. [Manual mapping](runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-manual-frozen-comparison.json), [AI mapping](runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-ai-frozen-comparison.json).

## Three Concrete Business Cases for the Team Requirement

| Frozen Cart mutant | Why the weak suite misses it | Expected / detecting assertion |
|---|---|---|
| L286 ArrayDeclaration `[]` → `["Stryker was here"]` (id 6) | GET status stays 200 even if a new cart contains an invalid entry | Newly initialized cart is an empty list; manual body assertion detects the injected element |
| L293 CallExpression `userCarts[userId].push(req.body)` → `;` (id 15) | POST still returns success without storing the item | Add/read distinct cart items; preserved contents from FR-07 distinguish the missing update |
| L335 StringLiteral `"canceled"` → `""` (id 68) | Cancel handler still returns success while persisting the wrong state | Pending order transitions to canceled under FR-10; manual DB state assertion detects the empty status |

These three locations have actual kill mapping and at least three human-authored manual assertions in the teammate's suite. Tool totals also include payload/message convention checks; do not describe all 23 kills as distinct SRS business faults. Existing AI provenance (including its partial-blind limitation) remains in Hiệp's original log/audit; this is a rerun, not a new AI generation or model-ranking study.

## Auth — I02 Partial

Original Hoàng handoff: 26 tests pass, 23 separate defect cases fail at assertions. Frozen mutation: 125 mutants, Killed 60, Timeout 27, Survived 23, NoCoverage 7, RuntimeError 8. Comparison with E03-provisional matches all signatures and source after removing CR line-ending bytes; four errors become Timeout, with no new assertion kill. Platform/runtime/concurrency differ; no single cause is established.

Auth F03/G03/H03 have not been delivered. Those portions of I02 remain Pending. Agent cannot claim Hòa, Hiệp or Hoàng performed these runs; human review/self-run and teammates' own cross-reproduction tasks remain separate.
