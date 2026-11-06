# Baseline Manifest

**Stage / Task:** S3-D04. **Owner:** Thái Hòa. **Executor:** OpenAI Codex AI Agent.
**Evidence Status:** Agent integration verified and input commit frozen; member self-run/review remains Pending.

## Frozen Inputs

| Item | Value / Evidence |
|---|---|
| SUT repository / frozen commit | `tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness` / `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` on `s3/D04-baseline` |
| Reviewed merge base | `main` at `fd6cbfad71d5aec485f1a2da7679f52d034a7b45`: Cart merge `b271c41`, Coupons merge `a32af52`, Auth import `958fca3` / merge `fd6cbfa` |
| Scope/spec | SUT `README.md` FR/SEC and `api_specification.md` at the frozen commit; three domains: Cart & Orders, Coupons, Authentication & Users |
| Production changes | None: `server.js`, `database.js`, `database.sqlite` match original `92bbf22`; run metadata records SHA-256 before/after |
| Runtime/tooling | Windows x64, Node `v24.16.0`, npm `12.0.2`; Jest `30.5.2`, Supertest `7.3.1`, SQLite `6.0.1`, Stryker core/Jest runner `10.0.0`; use tracked lockfile, project `allowScripts` for SQLite |
| Baseline selection | `npm test`: 88 tests in four files: Cart 36, Coupons 25, Coupons API flow 1, Auth 26. No tutorial, defects, manual or AI additions |
| Isolation | Jest projects isolate original Cart/Coupons memory DB/Express wrapper from original Auth DB mock/listen spy. Config and Auth cleanup are integration code; the five imported Auth files remain byte-identical to handoff |
| Reset/clock | Fresh Jest runtime/SQLite memory per file; Coupons reset usage/coupons and freeze only Date; Auth resets users per test. No tracked SQLite DB is used by tests |
| Original test evidence | [Exact frozen-commit run](runs/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-commit-final-tests.meta.json): 88 pass, randomized seed 731023; input before freeze also passed seed 421023. [Defects](runs/Thai_Hoa/D04-merge-2026-10-23-agent/d04-defects-final.meta.json): 54 fail at assertions, no runtime suite failure. [Coverage log](runs/Thai_Hoa/D04-merge-2026-10-23-agent/d04-coverage.log) is whole `server.js`, not domain-only |
| Domain mutation | `stryker.cart-orders.config.json`: lines 280–349 and 510–568, Cart suite only. `stryker.coupons.config.json`: lines 355–492, Coupons + flow. `stryker.auth.config.json`: lines 20–135, original Auth suite. Never add or average domain scores |
| Shared mutation policy | `coverageAnalysis: perTest`, concurrency 2, `timeoutMS: 5000`, `timeoutFactor: 1.5`, `tempDirName: stryker-tmp`; HTML/JSON/console kept separately per run |
| Manual / AI comparison | `s3/F02-coupons` / `a6abc7f` and `s3/G02-coupons` / `f12a6cc` fork from this commit; production, scope and timeout policy unchanged. F02 is an AI-assisted spec-analysis draft for Hòa to review. G02 uses Codex in the same context by explicit user choice after failed Claude login; independent/blind comparison is not claimed |

## Supplemental Coupons Extension

Theo yêu cầu người dùng ngày 2026-10-23: thêm bốn nhóm vào manual, tám nhóm vào Agent (bao gồm bốn nhóm chung), giữ các tests cũ. [Evidence/snapshots](runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md) dùng archive chính xác của frozen commit với variants/helper/config overlays có hashes. Đây là rerun của variants trên frozen input, không thay baseline. Fresh original-code profiles: 88 baseline, 35 manual và 40 Agent pass. Comparisons cũ ở bảng trên vẫn là records lịch sử tại commits đã ghi.

## Reproduction

Checkout the frozen commit in the SUT repository, then run from `backend/`:

```powershell
npm ci --no-audit --no-fund
npm test
npm run test:defects
npm run test:auth
npm run test:coupons
npm run test:cart-orders
npm run mutate:coupons
npm run mutate:cart-orders
npm run mutate:auth
```

`test:defects` is intentionally exit 1 on original production: Cart 9 + Coupons 22 + Auth 23. Auth DF-10 assumes a 24-hour OTP bound absent from spec, so do not classify it as a proven violation of a specified duration. Other refusals use HTTP conventions when the SRS gives no exact code.

Each mutation command selects its domain's **frozen test set**. The full baseline is tested together for integration; per-domain reports have distinct universes. Any test/config/source change affecting a comparison requires a new baseline revision or a rerun from this frozen input. Preserve earlier provisional reports, label their changed conditions, and do not compare numeric mutant IDs without matching source/location/mutator/replacement.

## Original Defects & Pending Inputs

Production bugs remain in the original baseline and are disclosed, never encoded as expected-correct behavior. Defect tests run separately. See [Coupons contract](Coupons_Test_Contract_Thai_Hoa.md), [Hiệp log](Experiment_Log_Tan_Hiep.md), [Hoàng log](Experiment_Log_Phuc_Hoang.md). Scope assumptions (OTP duration, coupon rounding/normalization/atomicity and uncertain order transitions) remain explicit.

Agent runs do not replace the three members' self-runs, human review, audit verdicts or signatures. Auth manual/AI/comparison have not been supplied; corresponding I02 steps remain Pending until those inputs exist. Sheet status must distinguish verified artifacts from member completion.
