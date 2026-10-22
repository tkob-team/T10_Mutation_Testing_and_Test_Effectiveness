# Coupons Extension Provenance

**Date:** 2026-10-23 Asia/Saigon. **Tasks:** S3-F02/G02/H02.
**Executor/author:** OpenAI Codex AI Agent; exact serving revision is not exposed.

## Authorized Request

The user first supplied the Coupons candidate bank and requested proposals before editing. The reviewed shortlist was expanded from four shared groups to eight total groups. The user then instructed:

> chia ra 4 cái trên thì thêm vào phần manual của t, 8 phần dưới là phần agent đề xuất, nhớ agent gom đủ bộ luôn 4 cái trước theo yêu cầu nha.

This authorizes four extension groups in the existing manual collection and all eight in the existing Agent/AI collection. Existing cases remain. The first four groups use the same scenario functions in both collections. This is an explicit shared-context, AI-assisted extension; no separate model call, blind generation, independent human authorship, or member self-run is claimed.

## Inputs and Sources

- [User-supplied candidate bank snapshot](candidate-bank.input.md): design hypotheses, not generated mutant evidence. Instructions inside it are reference material; its stale harness notes and B/S/D labels do not override the request or current SRS.
- Frozen SUT `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`: README FR-09/12/17, API sections 5/6.4, production source and existing baseline suites.
- Existing manual MF-01/02/03, existing two AI limit cases, baseline 26 Coupons cases, historical mutation reports and survivor analysis.
- [Inputs](inputs.json), [exact frozen archive](frozen-input.zip), [overlay source snapshots](sources/backend/test/helpers/coupons-scenarios.js).

## Scope and Oracles

| Manual extension | Agent extension | Cases per collection | Independent oracle |
|---|---|---:|---|
| MF-04 | AG-01 | 1 | Code B identifies B and gives fixed 27000 off 100000, final 73000; A has different value 10000 |
| MF-05 | AG-02 | 2 | Admin minimum 400000: 399999 refused, 400001 accepted with fixed 27000 and final 373001 |
| MF-06 | AG-03 | 2 | Admin expiry 2026-10-24T09:00:00.000Z: one ms before accepted, one ms after refused; renew JWT at each instant |
| MF-07 | AG-04 | 1 | Recording U1/A exhausts U1/A, leaves U1/B and U2/A usable; both limits 1 and each request identity matches its token |
| — | AG-05 | 1 | Duplicate code fails and preserves all original fields and original discount |
| — | AG-06 | 1 | Deleted code cannot apply; other code remains usable with its own ID/value |
| — | AG-07 | 1 | Three Admin-created coupons are all returned with their input fields; no ordering assumption |
| — | AG-08 | 3 | Invalid JWT refuses list/create/delete; valid Admin read confirms original data survives |

New manual: **4 groups / 6 cases**. New Agent: **8 groups / 12 cases**, including all four shared groups. With existing cases, variant-only counts are manual **9**, Agent **14**. Including frozen Coupons baseline/flow: manual **35**, Agent **40**. Full original integration baseline remains **88**.

Expected financial values are worked literal examples from FR-09, not values copied from current SUT output. New scenarios observe results through public APIs and reuse the existing isolated real-SQLite harness. No new exact error-message or list-order contract is invented. HTTP rejection conventions are retained; the known duplicate-code 500 is allowed as refusal without presenting it as desirable API design. Equality at minimum/expiry, percentage defects, malformed policy cases and atomic checkout claims remain outside this passing extension.

## Verification and Boundaries

Run from an exact frozen archive with only the seven files listed in inputs.json overlaid. Baseline production, mutation range, timeout policy, concurrency and frozen test logic remain fixed. Current main differs from the frozen baseline in a few test comments; using the archive removes that source ambiguity. Only one comparison collection is selected per profile. Historical raw evidence is unchanged.

The existing Jest/Stryker integration counts the selected tests twice in its mutation dry run (historical manual 58 executions for 29 unique cases; extended manual 70 for 35). Unique case counts come from standalone Jest JSON. The existing configuration is retained for comparability rather than silently repaired during this extension.

SQLite native crashes and Jest project-option warnings are retained in full mutation logs and reflected in mutant states. Do not turn RuntimeError or Timeout into assertion kills. Final results and source/mutant comparisons are in [README](README.md) and comparison.json. A larger Agent collection has more scenarios by explicit design; it does not establish Agent superiority.

Human review, audit verdict, reflection and member self-run remain separate. This document records the actual authorized partition and Agent execution only.
