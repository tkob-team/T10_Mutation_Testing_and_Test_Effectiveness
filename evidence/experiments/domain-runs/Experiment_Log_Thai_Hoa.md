# Experiment Log

**Document Role:** S3 working log; evidence thật, không thay member experience.
**Stage:** S3. **Member / task owner:** Tống Dương Thái Hòa.
**Executor:** OpenAI Codex AI Agent trong chat hiện tại; GPT-6 family, exact backend revision không được session expose.
**Task IDs:** S3-C02/D02/D04/E02/F02/G02/H02 — Agent artifacts/runs recorded; human review and member self-run remain separate. S3-I02 Partial (Auth baseline reproduced; manual/AI inputs missing).
**Domain:** Coupons. **Date:** 2026-10-22 (Asia/Saigon); raw command timestamps dùng UTC.
**SUT branch:** codex/s3-coupons-hoa, production base 92bbf22; code commit ghi trong Run Summary.
**Evidence Status:** Initial 2026-10-22 evidence retained below. Updated 2026-10-23: frozen common baseline 88 passing tests, 54 separate defect assertion failures; full domain mutation and Coupons F02/G02 comparison completed by Agent. No human approval inferred.
**Contract:** [Cases, sources, boundaries and integration](Coupons_Test_Contract_Thai_Hoa.md).

## Setup

Windows x64; Node v24.16.0, npm 12.0.2. Jest 30.5.2, Supertest 7.3.1, Stryker core/Jest runner 10.0.0 được pin theo package lock của Hiệp tại 8d60e9b.
Reused D01 harness không sửa production server/database. SQLite memory, clock UTC, reset trước từng test.

| Run / Command | Actual Result | Evidence |
|---|---|---|
| npm ci --no-audit --no-fund | Exit 0; install policy chỉ allow sqlite3@6.0.1; optional scripts @parcel/watcher/unrs-resolver vẫn blocked, các checks dưới hoạt động | install.log |
| npm test | Exit 0; 25 passed | baseline.log |
| npm run test:coupons | Exit 0; 25 passed lần kế tiếp, reset ổn định | baseline-repeat.log |
| npm run test:defects -- --json --outputFile <evidence>/defects.json | Exit 1; 16 failed; tất cả là matcher failures, không suite setup failure | defects.log, defects.json |
| npm run coupons:dry | Exit 0; 120 mutants instrumented, initial run 25 tests succeeded; không execute mutants | dry-run.log |
| npm run tutorial:mutate:weak | Exit 0; 5 mutants, 3 Killed, 2 Survived; score 60% | tutorial-weak.log, tutorial-weak/mutation.json/html |
| npm run tutorial:mutate:ai | Exit 0; 5 mutants, 4 Killed, 1 Survived; score 80% | tutorial-ai.log, tutorial-ai/mutation.json/html |

Tất cả evidence ở [C02-D02-2026-10-22-agent](runs/Thai_Hoa/C02-D02-2026-10-22-agent/README.md).
[commands.json](runs/Thai_Hoa/C02-D02-2026-10-22-agent/commands.json) có commands/start UTC/exit codes.
[environment.json](runs/Thai_Hoa/C02-D02-2026-10-22-agent/environment.json) có versions và source/DB hashes trước/sau.
Hash server.js, database.js, database.sqlite đều không đổi. Không mở backend production trên file DB đang track.

## Test Cases

[Contract](Coupons_Test_Contract_Thai_Hoa.md#baseline-cases) map CP-01…18 (25 executions) sang requirements, boundary và lý do.
Expected từ README FR-09/12/17, SEC-02/03, API §5/§6.4. Không có oracle lấy từ response đang lỗi.

- Normal fixed formula kiểm literal discount/final; create/list/delete kiểm persisted data và side effects.
- Minimum−1/+1, expiry−1/+1 ms, usage=0/limit−1/limit/limit+1 được kiểm.
- Equality minimum, equality expiry, percent formula, missing/invalid JWT, body identity bypass, role và validation nằm defect suite.
- Baseline không chứa defect tests. Không sửa production để lấp failures; D04 cần quyết định policy chung.

## Original Defects

[Contract CD-01…07](Coupons_Test_Contract_Thai_Hoa.md#original-defects) mô tả 16 executions và actual.
Đặc biệt CD-05 chứng minh request có token của user đã hết lượt vẫn qua được bằng cách bỏ/đổi user_id trong body.
CD-06/07 đọc cả status lẫn row count trong cùng assertion để mutation/DB side effects không bị che bởi assertion status dừng trước.

## C02 Tutorial & AI Agent Workflow

Demo riêng `backend/tutorial/eligibility.js`: eligible(total,minimum) theo rule inclusive.
Đây là toy contract, không dùng production Coupons và không phải baseline chung D04.

Agent tạo candidate `tutorial/ai.test.js` kiểm equality 100/100→true.
Raw candidate: [ai-candidate.raw.txt](runs/Thai_Hoa/C02-D02-2026-10-22-agent/ai-candidate.raw.txt).
[AI Provenance](runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md) giữ user request, phạm vi và giới hạn.

1. Spec check do Agent: exact boundary phải true; literal expected độc lập với implementation.
2. Original-code check: weak + candidate pass (Stryker initial run).
3. Mutation check: mutant id 3, `total > minimum`, Survived ở weak → Killed ở AI report.
4. Remaining survivor `return true` không phải equivalent trong toy domain: input dưới minimum phân biệt được, hiện chưa có test đó. Không tự tăng score bằng ignore.
5. Hai reports cùng source và cùng 5 mutant signatures; Timeout/RuntimeError/NoCoverage=0.
6. Same-session Agent demonstration; không có fresh/blind model request, không claim independent manual-vs-AI comparison. Human review chưa diễn ra.

## Historical Status Before D04 (2026-10-22)

- E02: Not run trên baseline chung; chỉ dry run có 120 instrumented mutants, không có score.
- F02: Not run; chưa tạo manual assertions của thành viên.
- G02: Not run trên domain Coupons. Tutorial không thay G02.
- H02/I02: Not run. Không coi tests xanh là đã hoàn tất S3.
- Không dùng score toy 60%→80% làm score Coupons hoặc bằng chứng AI tốt hơn người.

## Limits & Failure Modes

- npm 12 chặn SQLite install script: lần đầu thiếu native binding, tests fail ở setup. Đã xác minh từ npm local help/source; thêm allowScripts project-scoped cho sqlite3@6.0.1 rồi npm rebuild; clean npm ci sau đó pass. CLI --allow-scripts bị npm từ chối cho project install; không đổi config global.
- npm ci còn peer/deprecation/optional script warnings; không dùng audit fix/upgrade dependencies ngoài scope. Không claim đã security-audit.
- Dry run báo instrumented 120 mutants nhưng không thực thi: chỉ chứng minh discovery/harness, không có mutation score.
- Pass baseline không chứng minh SUT đúng toàn bộ spec: original defects được tách và công bố.
- Raw JSON cần dùng để so từng mutant; score đơn lẻ không đủ. Reports tutorial không có Timeout.
- Fixture times có UTC offset; login lại sau time shift để chỉ thay điều kiện expiry. Không dùng wall clock thật để tạo flaky cases.
- Rounding/negative-final/normalization và usage/checkout atomicity còn giới hạn như Contract, không tự gán expected.

## Cross Reproduction & Member Verification

Member run/review: Pending. S3-I02 Not run.
Hướng dẫn học và tự chạy của người dùng được giữ ở workspace ngoài hai repo team theo yêu cầu; không cần file đó để teammate đọc contract/evidence hay checkout SUT.
At the initial handoff, Sheet was not updated by Agent; no member verdict, reflection or signature was filled.

## D04 Integration & Reproduction — 2026-10-23

User authorized review/merges to main, then `s3/D04-baseline`. Cart/Coupons merges preserve existing commits; Auth import preserves five original files byte-for-byte. Config projects isolate the two existing harnesses. [Review](D04_Integration_Review_2026-10-23.md), [manifest](Baseline_Manifest.md), [defects and assumptions](Original_Defects_and_Assumptions.md).

Frozen SUT commit: `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Original code/database unchanged. `npm test`: 88 pass (Cart 36 + Coupons 25 + API flow 1 + Auth 26). Defects: 54 assertion failures (Cart 9, Coupons 22, Auth 23); Auth DF-10 has an assumed TTL. Random-order runs and an exact clean frozen-commit run pass. Full `server.js` coverage: 68.70% statements, 59.68% branches, 61.42% functions, 71.84% lines. This is not a Coupons-only coverage percentage.

Expanded CD-07 cases cover absent type/discount/minimum/limit and negative discount/limit. Three controls (minimum equality, expiry equality, percent calculation) change fail→pass on an isolated patched copy; all 26 Coupons baseline/flow tests remain green. Original production stays unchanged.

Official-doc-guided prepare/pinned-install/configure/run adaptation uses the existing project and lockfile; interactive init was cancelled, not completed. Toy runs on identical five mutant signatures: weak 3 Killed/2 Survived; AI 4/1; stronger 5/0. Weak line/statement coverage is 100%; branch instrumenter records zero branch sites, so its displayed 100% branch figure is vacuous. These are not EShop score results.

All new evidence: [D04 merge/run directory](runs/Thai_Hoa/D04-merge-2026-10-23-agent/README.md). Executor is Codex, not a fabricated member self-run.

## E02 — Frozen Domain Mutation

| Domain / command from backend | Killed | Timeout | Survived | NoCoverage | RuntimeError | Total | Stryker score |
|---|---:|---:|---:|---:|---:|---:|---:|
| Coupons: `npm run mutate:coupons` | 39 | 21 | 30 | 25 | 5 | 120 | 52.17% |
| Cart reproduction: `npm run mutate:cart-orders` | 82 | 25 | 34 | 2 | 7 | 150 | 74.83% |
| Auth reproduction: `npm run mutate:auth` | 60 | 27 | 23 | 7 | 8 | 125 | 74.36% |

CompileError, Ignored, Pending = 0 in these reports. Scope, domain-specific frozen test sets, concurrency 2 and timeout policy are fixed in the manifest. Never sum or average domain scores. Reports/logs and per-mutant mapping are kept separately.

## F02 — Spec-Analysis / Manual Draft

User explicitly asked Codex to analyse and write this draft for Hòa to review. It is **AI-assisted**, not independent human manual work. SUT branch `s3/F02-coupons`, commit `a6abc7f`, starts at the frozen baseline. `backend/test/manual/coupons.manual.js` adds three cases: persist configured limit 3, accept usage 2, reject usage 3 (FR-17, FR-09 C5). Original-code test profile: **29 pass**.

[Detailed logic](Coupons_Survivor_Analysis_Thai_Hoa.md) explains survivors 111/113 (L474): the old create case used limit 1, which cannot distinguish either replacement. The new persisted-value assertion kills both. These are two mutants of one business location, not three different faults. [Per-mutant comparison](runs/Thai_Hoa/D04-merge-2026-10-23-agent/coupons-f02-comparison.md) maps signatures and `killedBy` to MF-01. Three scenarios contain more than three assertions, but human review remains Pending.

## G02 — AI Candidate

Separate Claude CLI request failed with `Not logged in`; raw error/request retained. User then explicitly selected **Codex in this same context**, so no blindness, independent model invocation or Claude success is claimed. [Provenance and raw candidate](runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md).

SUT branch `s3/G02-coupons`, commit `f12a6cc`, also starts at the same frozen baseline. Candidate uses limits 2/4, verifies persisted input, allowance at limit−1, and refusal at limit. Raw/generated file matches the executed file SHA-256. Auto spec review: no arbitrary error text, SRS-derived numeric expected; accepted without edits by Agent. Original-code profile: **28 pass**. Human verdict Pending.

## H02 — Comparison & Limits

| Coupons test set | Killed | Timeout | Survived | NoCoverage | RuntimeError | Valid | Tool score | Assertion kills / valid |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Frozen baseline (26 tests) | 39 | 21 | 30 | 25 | 5 | 115 | 52.17% | 33.91% |
| F02 draft (29 tests) | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |
| G02 candidate (28 tests) | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |

Both comparisons match **120/120 signatures and identical source**. Only mutants 111/113 change Survived→Killed; all other states stay unchanged. New kill attribution comes from the persisted-limit assertion, not a timeout. [F02 mapping](runs/Thai_Hoa/D04-merge-2026-10-23-agent/coupons-f02-comparison.json), [G02 mapping](runs/Thai_Hoa/D04-merge-2026-10-23-agent/coupons-g02-comparison.json).

This shows a missing test partition corrected by both draft approaches. It cannot support human-vs-AI superiority or model ranking: both are Codex-assisted, share context, and target the same two mutations. Error body/message and correcting-mutant survivors are discussed in the analysis; no ignore/filter trick raises the score.

Failure modes backed by evidence:

1. **Timeout inflates an assertion-only interpretation:** baseline tool score 52.17% includes 21 Timeout; true assertion kills are 33.91% of valid mutants.
2. **Error classification changes the denominator:** Auth old/new comparison has identical 125 signatures and no new assertion kills, but four RuntimeError become Timeout; score rises 73.45%→74.36%. Runtime/platform/concurrency differ; cause is not isolated experimentally.
3. **Original defects distort survivor selection:** minimum/expiry correcting mutants survive; wrong expected values could kill them while reducing spec correctness. The derivative oracle check demonstrates the original defects.
4. **Coverage does not prove detection:** toy weak has 100% line/statement coverage yet only 60% mutation score. Zero branch sites must not be described as full decision coverage.
5. **Context contamination / authorship:** same-context AI generation cannot stand in for an independent manual/AI experiment. Failed Claude login and the user's fallback are disclosed.

Definition reference: [Stryker states/metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/). Timing/logs are actual; no student labour time or productivity comparison is inferred.

## F02/G02 Extension — 2026-10-23

Theo yêu cầu trực tiếp của Hòa, Codex bổ sung **4 nhóm / 6 cases** vào manual (MF-04–07) và **đủ 8 nhóm / 12 cases** vào Agent/AI (AG-01–08), bao gồm cả bốn nhóm chung. Giữ nguyên MF-01–03 và hai AI limit cases cũ. Bốn nhóm chung: chọn đúng coupon, minimum tạo qua Admin, expiry tạo qua Admin và usage isolation qua API. Bốn nhóm Agent bổ sung: duplicate không đổi dữ liệu cũ, xóa rồi apply, list nhiều coupons và invalid JWT cho list/create/delete.

Các nhóm chung dùng `backend/test/helpers/coupons-scenarios.js`; assertions mới quan sát public API, expected tiền là ví dụ literal từ FR-09. Không thêm equality/percent defects, exact messages hoặc giả định atomic checkout vào passing profiles. Không đổi source, SQLite gốc hay baseline selection.

Chạy trên archive chính xác của frozen `806ba19`, overlay đúng variants/configs/helper đã snapshot. Fresh Jest: **88/88 baseline**, **35/35 manual** (26+3+6), **40/40 Agent** (26+2+12). [Evidence và kết quả mutation mới](runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md), [phân chia/provenance](runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md), [source snapshots](runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend/test/helpers/coupons-scenarios.js). Kết quả cũ ở các sections trên là lịch sử và được giữ nguyên.

Fresh mutation của cả hai profiles: **41 Killed / 21 Timeout / 28 Survived / 25 NoCoverage / 5 RuntimeError**, score 53.91%. Source khớp sau chuẩn hóa CRLF/LF, 120/120 signatures khớp. So baseline vẫn chỉ kill thêm 111/113; so F02/G02 cũ không có status transition. Các nhóm bổ sung không tăng số kills trong universe hiện tại. Hashes sáu protected files giữ nguyên; SQLite archived khớp byte với frozen blob.

Đây là phân chia collections theo yêu cầu người dùng; cả phần bổ sung manual và Agent đều do Codex hỗ trợ trong cùng context. Bộ Agent có nhiều scenarios hơn theo thiết kế, không dùng chênh lệch đó để suy ra agent tốt hơn người hoặc đây là thử nghiệm độc lập. Human review/audit verdict và member self-run vẫn riêng biệt.

## I02 — Auth Reproduction

Codex reproduced original Auth suite on this machine: 26 pass; all 23 original defect tests fail at assertions in the separate profile. Full Auth mutation on frozen inputs: 125 mutants, 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage, 8 RuntimeError.

Against Hoàng's E03-provisional, all 125 signatures match; sources match after ignoring CR line-ending bytes. Survived/NoCoverage/Killed remain identical; four previous errors now time out. [Mapping](runs/Thai_Hoa/D04-merge-2026-10-23-agent/auth-provisional-vs-frozen.json). The new run is Windows Node 24.16.0 with concurrency 2; old run was macOS Node 26.12.1. Do not attribute the difference to one cause.

**Pending:** Hoàng has not delivered Auth manual/AI/comparison (F03/G03/H03). I02 is Partial, not Done; these parts cannot be reproduced or invented. Hòa's self-run/review also remains separate. No teammate messages are sent by Agent.

## Supplemental Cart Reproduction / Group Case Evidence

Existing manual `b77f5d6` and AI `f4696c6` suites were reproduced unedited in a temporary archive of frozen `806ba19`, using the same Cart scope/timeout/concurrency. Manual original run 44/44 pass, mutation 105 Killed / 25 Timeout / 11 Survived / 2 NoCoverage / 7 RuntimeError (90.91%); AI original run 41/41 pass, mutation 95/25/21/2/7 (83.92%). All 150 signatures/source bytes match baseline. New assertion kills: 23 manual, 13 AI. No teammate self-run or new model generation claimed.

[Cross reproduction notes](Cross_Reproduction_Notes_Thai_Hoa.md) provide three distinct business locations (empty cart, item persistence, canceled DB state) with actual manual/AI mapping. This supplies group-level evidence without pretending that Coupons' two mutants at one location are three independent cases. Original message-convention assertions in teammate totals remain labelled as such.

