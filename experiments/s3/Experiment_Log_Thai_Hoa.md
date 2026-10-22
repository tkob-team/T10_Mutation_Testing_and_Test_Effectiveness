# Experiment Log

**Document Role:** S3 working log; evidence thật, không thay member experience.
**Stage:** S3. **Member / task owner:** Tống Dương Thái Hòa.
**Executor:** OpenAI Codex AI Agent trong chat hiện tại; GPT-6 family, exact backend revision không được session expose.
**Task IDs:** S3-C02/D02 — Agent verification complete, member run/review Pending.
**Domain:** Coupons. **Date:** 2026-10-22 (Asia/Saigon); raw command timestamps dùng UTC.
**SUT branch:** codex/s3-coupons-hoa, production base 92bbf22; code commit ghi trong Run Summary.
**Evidence Status:** 25 baseline tests pass; 16 original-defect tests fail tại assertions như kỳ vọng; Stryker dry run pass. Full EShop mutation E02, F02/G02/H02/I02 Not run.
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

## Baseline / Survivors & Manual Assertions / AI Runs / Comparison

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
Chưa cập nhật Sheet/status Done; không điền member verdict, reflection hoặc chữ ký.

