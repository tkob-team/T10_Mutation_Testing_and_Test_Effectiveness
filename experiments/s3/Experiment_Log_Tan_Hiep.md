# Experiment Log

**Document Role:** Working log cá nhân S3; chỉ ghi kết quả đã chạy thật trên máy Tấn Hiệp.  
**Stage:** S3  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S3-C01 (In Progress); S3-D01, S3-E01, S3-F01, S3-G01, S3-H01, S3-I01 (chưa bắt đầu)  
**Domain / Section:** Cart & Orders  
**Evidence Status:** Partial — C01-1 → C01-5 đã chạy; C01-6 chưa; C01-7 Pending

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Setup

Máy: Windows 11, PowerShell. Node v24.15.0 (`node -v`, 2026-10-16). StrykerJS 10.x yêu cầu Node ≥ 22.

| OS / Runtime / Tool Versions | Install / Run Command | Result | Evidence | Reset Method |
|---|---|---|---|---|
| C01-1 Hello world (project `mt-demo`): Windows 11, Node v24.15.0, npm 11.12.1, StrykerJS 10.0.0, Jest 30.5.2 | `npm i -D jest @stryker-mutator/core @stryker-mutator/jest-runner`<br>`npx stryker --version; npx jest --version; npm -v` | **Pass** 2026-10-16 — `added 544 packages`. Chỉ có warnings: nhiều `ERESOLVE overriding peer dependency`, `deprecated glob@10.5.0`, `21 moderate severity vulnerabilities`; không có error. Không chạy `npm audit fix --force` | Console (đã dán trong conversation); versions ở `runs/Tan_Hiep/C01-weak/console.log` dòng 1–4 | Xóa `node_modules`, `reports/`, `.stryker-tmp/` |
| C01-2 Weak test run | `npm run mutate:weak` (= `stryker run stryker.weak.config.json`) | **Pass** 2026-10-16 19:43 — 15 mutants; Killed 3, Survived 12, Timeout 0, NoCoverage 0, errors 0; **mutation score 20.00%**. Dry run: 1 test, net 1 ms, overhead 1435 ms; Stryker tạo 15 test runner processes; done in 3 s. Khớp kết quả sandbox ở Research Notes F-A01-04 | `experiments/s3/runs/Tan_Hiep/C01-weak/console.log`; `mutation.html`, `mutation.json` | Không cần |
| C01-3 Line coverage đối chiếu (weak test) | `npx jest test/cart.weak.test.js --coverage` | **Pass** 2026-10-16 — 1 test passed; Stmts 100%, Branch 50%, Funcs 100%, Lines 100% (uncovered branches dòng 4–9). Đối chiếu C01-2: **line coverage 100% nhưng mutation score 20%** | `experiments/s3/runs/Tan_Hiep/C01-coverage/console.log` | Không cần |
| C01-4 Strong test run | `npm run mutate:strong` | **Pass** 2026-10-16 19:48 — 15 mutants; Killed 14, Survived 1, Timeout 0, NoCoverage 0, errors 0; **mutation score 93.33%**. Kill theo test: test 1 (`toBe(230000)`) 11, test 2 (ngưỡng 500.000) 2, test 3 (quantity âm) 1. Survivor duy nhất `quantity > 0` → `>= 0` (equivalent candidate, lập luận ở Research Notes F-A01-04). Khớp sandbox | `experiments/s3/runs/Tan_Hiep/C01-strong/console.log`; `mutation.html`, `mutation.json` | Không cần |
| C01-5 Claude assertion workflow trên demo (survivor `subtotal >= 500000` → `> 500000` từ C01-2) | Chat Claude mới, ngoài Project (không có lời giải manual trong context); prompt skeleton F-B01-02<br>`npx jest test/cart.ai.test.js`<br>`npx stryker run stryker.ai.config.json` (weak test + 3 test Claude)<br>`node show-mutants.js reports/ai/mutation.json` | **Pass** 2026-10-16 20:00. **G1** spec review: expected của 3 test đúng requirement (tính tay); test 1 trùng input với manual test "đúng ngưỡng"; lý do Claude đưa cho test tùy chọn (bắt mutant `>= 499999`) sai vì StrykerJS không có mutator đổi hằng số. **G2** 3/3 pass trên code gốc. **G3** mutant mục tiêu `subtotal > 500000` (cart.js:8) **Killed** bởi test Claude "subtotal exactly 500,000". Tổng: 15 mutants; Killed 14, Survived 1, Timeout 0, NoCoverage 0; **score 93.33%** — bằng nhánh manual C01-4, cùng survivor `quantity >= 0`. Test tùy chọn (Claude nói không kill mutant mục tiêu) thực tế kill 2 mutant khác còn sống ở baseline: `freeShip = true`, `subtotal - shippingFee`. Console chỉ ghi kill cho test fail đầu tiên (weak test hiện `covered 14`, 0 kill) → phải đọc `killedBy` trong JSON | `experiments/s3/runs/Tan_Hiep/C01-ai/` (console.log, killedBy.log, mutation.html, mutation.json, `cart.ai.test.js`, `stryker.ai.config.json`); `ai-audit/AI_Record_Tan_Hiep.md` — AI-S3-C01-01 | Không cần |
| C01-6 EShop backend chạy local @ `85af3ba` | `cd backend`<br>`npm install`<br>`node server.js` | Not run | Console log | Restart server (database.js drop + seed khi được require) |
| C01-7 Seed/reset cho Cart & Orders trong test | — | Pending — chờ seams S3-D04 (export `app`, DB path cho test) | — | Pending |

## Test Cases

| Case ID | Spec Section | Input / Fixture | Expected Result | Actual Result | Test File / Commit |
|---|---|---|---|---|---|
| [S3-D01] | §4, §6.2 | Pending | Pending — chờ chốt scope (Research Notes, Open questions 1–3) | Not run | — |

## Baseline

| Run ID | SUT Commit | Config / Test Set | Command | HTML / JSON / Log | Outcome |
|---|---|---|---|---|---|
| [S3-E01] | Pending (S3-D04) | — | — | — | Not run |

## Survivors & Manual Assertions

| Mutant ID / Diff | State | Why Survived | Distinguishing Input | Manual Assertion / Test | Original-Code Result | Mutant Result / Evidence |
|---|---|---|---|---|---|---|
| [S3-F01] | — | — | — | — | Not run | Not run |

## AI Runs

| AI Record Artifact ID | Raw Candidate / Edited Test | Spec Review | Original-Code Result | Mutant Result | Run Evidence |
|---|---|---|---|---|---|
| [S3-G01] | — | — | Not run | Not run | — |

## Comparison

| Run / Test Set | Killed | Timeout | Survived | NoCoverage | Tool Score & Definition | Evidence |
|---|---|---|---|---|---|---|
| Baseline | — | — | — | — | — | — |
| Manual | — | — | — | — | — | — |
| AI-assisted | — | — | — | — | — | — |

## Limits & Failure Modes

- **Equivalent candidate (demo):** `item.quantity > 0` → `>= 0` (cart.js:4) sống ở cả nhánh manual (C01-4) và AI (C01-5). Khác biệt chỉ khi `quantity === 0`, khi đó mutant cộng `price × 0 = 0` → output giống gốc với `price` hữu hạn. Lập luận chi tiết: Research Notes F-A01-04.
- **Failure mode — kill attribution trong console (C01-5):** console Stryker chỉ ghi công cho test fail đầu tiên của mỗi mutant; weak test hiện `covered 14`, 0 kill khi chạy chung với test AI, dù chạy riêng kill 3 (C01-2). Không dùng số "killed N" trong console để kết luận một test vô dụng; đọc `killedBy` trong `mutation.json`.
- **Failure mode — AI giải thích sai về tool (C01-5):** Claude biện minh test 499.999 bằng mutant `>= 499999`, mutant mà StrykerJS không sinh ra (không có mutator đổi hằng số, SRC-06 trong Research Notes). Assertion vẫn đúng và có ích; lý do thì sai → phải kiểm bằng run, không tin lời giải thích.

## Cross Reproduction

| Teammate Domain / Guide | Commands | Result | Missing Step / Issue | Evidence |
|---|---|---|---|---|
| Coupons (S3-I01) | — | Not run | — | — |
