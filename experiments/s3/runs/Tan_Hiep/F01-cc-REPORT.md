# S3-F01 / S3-G01 Setup Report — Cart & Orders (Claude Code)

## Summary

| Field | Value |
|---|---|
| Task ID | S3-F01 setup (kèm khung nhánh S3-G01) |
| Executor | Claude Code (model `claude-opus-5-5`) |
| Date | 2026-10-22, ~21:05–21:15 (+07:00) |
| OS | Windows 11 Home Single Language 10.0.26200; shell Git Bash |
| Overall | **Done** — config và khung file đúng yêu cầu; `npm test` 36/36 trên cả hai nhánh. Không viết assertion nào |

## Environment

| Item | Value |
|---|---|
| EShop | `s3/F01-manual` @ `c0954de` và `s3/G01-ai` @ `78745e2`, cùng tách từ `8d60e9b` |
| Seminar | `main`; commit log hook trước task `69a0a16` (`chore(ai-log): update prompt logs`) |
| Versions | Node v24.15.0, npm 11.12.1, Jest 30.5.2, StrykerJS 10.0.0 |

## Changes

Nhánh `s3/F01-manual` (commit `c0954de`, `test(S3-F01): add manual-branch Jest and Stryker config`):

- `backend/jest.manual.config.js`: `testEnvironment`, `setupFiles` giống `"jest"` trong `package.json`; `testMatch` = `<rootDir>/test/**/*.test.js` (pattern baseline thật trong `package.json`) + `<rootDir>/test/manual/**/*.manual.js`.
- `backend/stryker.cart-orders.manual.config.json`: như `stryker.cart-orders.config.json`, thêm `"jest": { "configFile": "jest.manual.config.js" }`, reports ra `reports/cart-orders-manual/`.
- `backend/package.json`: scripts `test:manual` (`jest --config jest.manual.config.js`), `mutate:cart-orders:manual` (`stryker run stryker.cart-orders.manual.config.json`).
- `backend/test/manual/cart-orders.manual.js`: chỉ khung — require helpers, `beforeAll` gọi `loadApp` và login admin, comment "Tấn Hiệp tự viết". Không có test.

Nhánh `s3/G01-ai` (commit `78745e2`, `test(S3-G01): add AI-branch Jest and Stryker config`): tương tự với `jest.ai.config.js` (`test/ai/**/*.ai.js`), `stryker.cart-orders.ai.config.json` (`reports/cart-orders-ai/`), scripts `test:ai`, `mutate:cart-orders:ai`, khung `test/ai/cart-orders.ai.js` (comment: sinh trong session sạch, không thấy nhánh manual).

## Checks

| Branch | Command | Result | Evidence |
|---|---|---|---|
| F01-manual | `npx jest --listTests` | chỉ `test/cart-orders.test.js` — baseline không nhận file manual | — |
| F01-manual | `npx jest --config jest.manual.config.js --listTests` | `cart-orders.test.js` + `manual/cart-orders.manual.js` | — |
| F01-manual | `npm test` | **36 passed**, exit 0 | `F01-setup-cc/npm-test.log` |
| F01-manual | `npm run test:manual` (chẩn đoán, không chính thức) | exit 1: `Your test suite must contain at least one test.` cho file manual; 36 baseline pass | `F01-setup-cc/test-manual-diagnostic.log` |
| F01-manual | `npx stryker run stryker.cart-orders.manual.config.json --dryRunOnly` (chẩn đoán) | exit 1, cùng lỗi — config nạp đúng, Jest tìm thấy file manual | `F01-setup-cc/stryker-manual-dryrun-diagnostic.log` |
| G01-ai | `--listTests` (2 config) | tương tự F01 | — |
| G01-ai | `npm test` | **36 passed**, exit 0 | `G01-setup-cc/npm-test.log` |
| G01-ai | `npm run test:ai`, Stryker AI dry run (chẩn đoán) | cùng lỗi `must contain at least one test` | `G01-setup-cc/test-ai-diagnostic.log`, `G01-setup-cc/stryker-ai-dryrun-diagnostic.log` |

Lỗi "must contain at least one test" là hệ quả của khung không có test theo yêu cầu, không phải lỗi config. Sẽ hết khi file có ít nhất một test.

## Issues

- Stryker dry run fail không tự dọn `backend/stryker-tmp/sandbox-*`. Sandbox còn lại từ dry run manual gây cảnh báo `jest-haste-map: Haste module naming collision` và — quan trọng hơn — chứa bản sao file nhánh manual trên working tree nhánh AI. Đã xóa cả hai sandbox (manual, AI): gỡ junction `node_modules` bằng PowerShell `.Delete()` trước, kiểm không còn junction, rồi `rm -rf`. `npm install --dry-run` báo `up to date`, `node_modules` thật không bị ảnh hưởng.
- `database.sqlite` không đổi.

## Docs Updated

- Experiment Log, Limits & Failure Modes: dòng "Environment-dependent Timeout (E01-1-cc vs sandbox Linux)" (commit `3cf939c`). Commit kèm report này rút gọn câu giả thuyết cho đúng nguyên văn được giao (bỏ cụm "thay vì bị kill bởi assertion" do tôi tự thêm).
- `Repo/CLAUDE.md` (ngoài repo): thêm quyết định 2026-10-22 về E01 trước D04 và hai nhánh F01/G01.

## Presentation Notes

- Hai nhánh tách từ cùng commit, cùng mutate scope và production code; chỉ khác testMatch và thư mục report — đây là điều kiện để so sánh manual vs AI công bằng.
- Jest coi file test rỗng là suite lỗi; Stryker dừng ở dry run nếu bất kỳ suite nào lỗi.

## AI Usage

- Tool: Claude Code, model `claude-opus-5-5`, skill `t10-run-report`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-F01 setup (Cart & Orders). Dùng skill t10-run-report. Được commit, không push. KHÔNG viết assertion nào.
  >
  > 1. Repo EShop, tạo 2 nhánh từ 8d60e9b: s3/F01-manual và s3/G01-ai.
  > 2. Trên s3/F01-manual, trong backend:
  >    - jest.manual.config.js: lấy cấu hình jest trong package.json, testMatch = baseline (test/*.test.js) + test/manual/**/*.manual.js
  >    - stryker.cart-orders.manual.config.json: như stryker.cart-orders.config.json, nhưng jest.configFile = jest.manual.config.js, reports ra reports/cart-orders-manual/
  >    - scripts: "test:manual", "mutate:cart-orders:manual"
  >    - test/manual/cart-orders.manual.js: chỉ phần khung (require helpers, beforeAll loadApp, comment "Tấn Hiệp tự viết"), không có test.
  >    - Kiểm tra: npm test vẫn 36 passed (file manual không bị baseline nhận).
  >    Commit: "test(S3-F01): add manual-branch Jest and Stryker config".
  > 3. Trên s3/G01-ai: làm tương tự với hậu tố ai (test/ai/**/*.ai.js, reports/cart-orders-ai/). Commit: "test(S3-G01): add AI-branch Jest and Stryker config".
  > 4. Seminar, Experiment Log, mục Limits & Failure Modes: thêm 1 dòng — E01-1-cc so với sandbox Linux: Killed 87/91, Timeout 19/16, RuntimeError 8/7; tổng 3 loại đều là 114; Survived/NoCoverage giống nhau; giả thuyết do máy chậm hơn chạm ngưỡng timeout, chưa kiểm chứng. Commit: "docs(S3-E01): note environment-dependent Timeout counts".
  > 5. Repo/CLAUDE.md, mục Quyết định đã chốt: thêm "2026-10-22: E01 chạy trên baseline domain trước D04 (Hòa cho phép). Nhánh manual s3/F01-manual và AI s3/G01-ai cùng tách từ 8d60e9b; AI không được đọc nhánh manual."
  > 6. Báo cáo theo CLAUDE.md.

- Output chính: 2 nhánh EShop với config/scripts/khung; dòng Limits trong Experiment Log; quyết định trong CLAUDE.md; report này.


---

## F01-2-cc — Manual-branch Mutation Run

| Field | Value |
|---|---|
| Executor | Claude Code (model `claude-opus-5-5`), không phải run chính thức của Tấn Hiệp |
| Date | 2026-10-23, 01:31:47 (`test:manual`) và 01:31:54–01:32:23 (+07:00) (Stryker `Done in 27 seconds`) |
| EShop | `s3/F01-manual` @ `b77f5d6` (up to date với origin); không sửa file test/config; `server.js`, `database.js` không đổi so với `8d60e9b` |
| Seminar | `main`; commit log hook trước task `56aa428` |
| Versions | Node v24.15.0, npm 11.12.1, Jest 30.5.2, StrykerJS 10.0.0, Windows 11 |
| Overall | **Done** |

### Test Files

`npx jest --config jest.manual.config.js --listTests` và `testFiles` trong `mutation.json`: `test/cart-orders.test.js` (36 baseline) và `test/manual/cart-orders.manual.js` (8 manual) — tổng 44 tests. `test/defects/` không được nhận. Evidence: `F01-2-cc/listTests.log`.

### Commands

1. `npm run test:manual` → **44/44 passed**, 2 suites, exit 0 (`F01-2-cc/test-manual.log`).
2. `npm run mutate:cart-orders:manual` (= `stryker run stryker.cart-orders.manual.config.json`) → exit 0; reports `reports/cart-orders-manual/` copy vào `F01-2-cc/` (`console.log`, `mutation.html`, `mutation.json`). Stryker tự dọn `stryker-tmp/`.

So sánh sinh bằng `F01-2-cc/compare_runs.py` → `F01-2-cc/compare_runs.md` (đếm từ `mutation.json` của E01-1-cc, F01-1, F01-2-cc; mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement). F01-1 là run của Tấn Hiệp (`F01-1/`, trên suite manual trước khi xóa test coupon).

### Status Counts

| Run | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Score | Covered |
|---|---|---|---|---|---|---|---|---|---|---|
| E01-1-cc | 150 | 87 | 19 | 34 | 2 | 8 | 0 | 0 | 74.65 | 75.71 |
| F01-1 | 150 | 100 | 19 | 20 | 2 | 9 | 0 | 0 | 84.40 | 85.61 |
| F01-2-cc | 150 | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 90.91 | 92.20 |

Cùng tập mutant ở cả 3 run: có (150 / 150 / 150).

Định nghĩa: score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage) × 100; RuntimeError loại khỏi mẫu số. Cả 3 run có cùng tập 150 mutants. Timeout tính vào Detected theo định nghĩa tool, không phải assertion kill.

### E01-1-cc Survived/NoCoverage → F01-2-cc Killed

23 mutants. `killedBy` lấy từ `mutation.json` của F01-2-cc.

| Line:Col | Mutator | Replacement | E01-1-cc | killedBy (F01-2-cc) |
|---|---|---|---|---|
| 286:7 | BooleanLiteral | `userCarts[userId]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 286:7 | ConditionalExpression | `false` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 286:7 | ConditionalExpression | `true` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 286:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 292:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 293:3 | CallExpression | `;` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 294:12 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 294:23 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 306:27 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp POST /api/checkout - Verify successful order creation and DB pending status (`cart-orders.manual.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 326:56 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 335:9 | ArrayDeclaration | `[]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 335:10 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 337:20 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 337:31 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 346:54 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 532:56 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 561:9 | ArrayDeclaration | `[]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |
| 563:20 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |
| 563:31 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |

Ghi chú: 2 NoCoverage của E01-1-cc vẫn NoCoverage ở F01-2-cc.

### Other Status Changes (E01-1-cc → F01-2-cc)

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc |
|---|---|---|---|---|
| 311:67 | BlockStatement | `{}` | Timeout | Killed |
| 315:22 | BlockStatement | `{}` | Timeout | Killed |
| 532:11 | BooleanLiteral | `order` | RuntimeError | Timeout |

### Selected Survivors

| Line:Col | Mutator | Replacement | E01-1-cc | F01-1 | F01-2-cc | killedBy (F01-2-cc) |
|---|---|---|---|---|---|---|
| 286:7 | ConditionalExpression | `false` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 550:11 | ConditionalExpression | `false` | Survived | Survived | Survived | — |

550:11 vẫn Survived (được 18 tests cover, không test nào kill) — đúng như dự kiến ở bảng Survivors (`defect-fixing`, không viết test manual).

### Issues

- Lần đầu chạy `compare_runs.py`, key chỉ gồm vị trí đầu nên 5 cặp mutant cùng điểm bắt đầu bị gộp (Total 145). Đã sửa key thêm vị trí cuối và assert không trùng; số sau sửa khớp console cả 3 run (74.65 / 84.40 / 90.91).
- `backend/database.sqlite` không đổi; vẫn chạy `git restore backend/database.sqlite` theo prompt.

### Docs Updated

- Experiment Log: cột Original-Code Result / Mutant Result của 6 dòng bảng Survivors; dòng F01-2-cc trong bảng run (bảng `D01 — Runs`, bảng duy nhất có cột Executor/Result; Experiment Log chưa có bảng run riêng cho F01); dòng Failure mode "assertion học theo bug (F01-1, human)" cuối Limits & Failure Modes (nguyên văn prompt).

### Integrity Note

Session Claude Code này đã đọc tên test và kết quả của nhánh manual (F01). Theo rule, session này **không** được sinh AI assertions cho S3-G01.

### Presentation Notes

- 8 manual tests (5 test nhắm đúng 5 survivor đã chọn, 3 test khác cho cancel, checkout, admin status) kill thêm 23 mutants (một assertion về body/state thường giết nhiều mutant trên cùng dòng: ObjectLiteral + StringLiteral, ConditionalExpression + ArrayDeclaration).
- Score tăng từ 74.65% lên 90.91%, nhưng 550:11 vẫn sống vì mutant đó sửa đúng lỗi gốc — score cao không có nghĩa là test bắt được lỗi gốc.

### AI Usage (F01-2-cc)

- Tool: Claude Code, model `claude-opus-5-5`, skill `t10-run-report`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-F01 — run F01-2-cc (skill t10-run-report).
  > 1. EShop: checkout s3/F01-manual, git pull. Không sửa file test/config.
  > 2. backend: npm run test:manual → phải pass hết; fail thì dừng, báo cáo.
  > 3. npm run mutate:cart-orders:manual → lưu console.log, mutation.html, mutation.json vào seminar experiments/s3/runs/Tan_Hiep/F01-2-cc/.
  > 4. REPORT (experiments/s3/runs/Tan_Hiep/F01-cc-REPORT.md, thêm mục F01-2-cc):
  >    - config manual chạy những test file nào;
  >    - số Killed/Timeout/Survived/NoCoverage/score so với E01-1-cc và F01-1;
  >    - danh sách mutant Survived/NoCoverage ở E01-1-cc mà Killed ở F01-2-cc, kèm killedBy (từ mutation.json);
  >    - trạng thái của 6 mutant 286:7(false), 292:7(true), 326:47, 346:45, 532:47, 550:11(false).
  > 5. Experiment_Log_Tan_Hiep.md: chỉ điền 2 cột Original-Code Result / Mutant Result của bảng Survivors theo kết quả thật (Pass/Fail; Killed by <test> / Survived, run F01-2-cc). Thêm dòng run F01-2-cc vào bảng run. Thêm vào cuối Limits & Failure Modes:
  >    - **Failure mode — assertion học theo bug (F01-1, human):** test Survivor 4 (`POST /api/apply-coupon`) tính expected bằng đúng công thức chép từ `server.js:399–400`, nên pass trên code gốc kể cả khi code sai spec (FR-09); `/api/apply-coupon` cũng nằm ngoài vùng mutate (`280-349`, `510-568`) nên không nhắm mutant nào. Đã xóa khỏi suite manual trước F01-2. Bài học: expected lấy từ SRS/spec, không lấy từ code đang test.
  > 6. git restore backend/database.sqlite. Commit seminar: docs(S3-F01): add F01-2-cc run evidence and results

- Output chính: F01-2-cc (44/44 pass; 150 mutants, 90.91%); `compare_runs.py`/`compare_runs.md`; Experiment Log (Survivors, run row, failure mode); 1 commit seminar.
