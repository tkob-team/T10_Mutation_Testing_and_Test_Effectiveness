# Experiment Log

**Document Role:** Working log cá nhân S3; chỉ ghi kết quả chạy thật trên máy Tấn Hiệp. Run do AI Agent chạy có hậu tố `-cc` (Claude Code) và ghi executor; Tấn Hiệp chạy lại các run chính thức bằng ID không hậu tố.  
**Stage:** S3  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S3-C01 (Review, 2026-10-22 — C01-7 giải quyết bằng harness D01); S3-D01 (Review, 2026-10-22); S3-E01 (Review, 2026-10-22 — baseline domain trên `s3/D01-cart-orders` @ `8d60e9b`, trước D04); S3-F01 (Review, 2026-10-23); S3-G01 (Review, 2026-10-23); S3-H01 (Review); S3-I01 (I01-1/2/3 và I01-{1,2,3}-cc đã chạy)  
**Domain / Section:** Cart & Orders  
**Evidence Status:** Partial — run `-cc`: C01, D01-1…5-cc, E01-1-cc, F01-2-cc, G01-1-cc, G01-2-cc, I01-{1,2,3}-cc. Member self-runs (executor Tấn Hiệp): F01-1; 2026-10-23: D01-1/2/3, E01-1 (baseline trên frozen `806ba19`, sau D04), F01-2, G01-2, I01-1/2/3

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
| C01-6 EShop backend chạy local @ `85af3ba` (Windows 11, Node v24.15.0) | `cd backend`<br>`npm install`<br>`node server.js`<br>`curl.exe http://localhost:3000/api/products` (cửa sổ PowerShell thứ hai) | **Pass** 2026-10-16 20:17 — `npm install`: added 135 packages, `sqlite3` cài từ prebuilt binary, không lỗi build; warnings: `deprecated prebuild-install@7.1.3`, `5 vulnerabilities (1 low, 1 moderate, 1 high, 2 critical)` — **không** chạy `npm audit fix` để giữ nguyên lockfile của SUT. Server in `Database initialized and seeded (Phase 2).` → `Server is running on http://localhost:3000` → `Connected to database`. `GET /api/products` trả 5 sản phẩm seed (id 1–5). Quan sát: dòng "seeded" in **trước** "Connected to database" vì `console.log` chạy khi câu SQL mới được xếp hàng trong `db.serialize`, chưa thực thi → log không chứng minh seed đã xong (liên quan Research Notes F-B01-04) | `experiments/s3/runs/Tan_Hiep/C01-eshop/console.log` | Tắt server (`Ctrl+C`) và chạy lại: `database.js` DROP + seed lại toàn bộ bảng mỗi lần được require |
| C01-7 Seed/reset cho Cart & Orders trong test | Harness S3-D01: `backend/test/helpers/isolate.js`, `app.js` (xem mục D01 — Harness) | D01-1-cc (Claude Code, 2026-10-22): 36/36 pass, `database.sqlite` không đổi → harness hoạt động trong Jest. Member run: Not run. Không còn phụ thuộc S3-D04 | `experiments/s3/runs/Tan_Hiep/D01-1-cc/`; harness trong SUT: `backend/test/helpers/isolate.js`, `backend/test/helpers/app.js` (`s3/D01-cart-orders` @ `8d60e9b`) | Tự động: mỗi test file mở DB `:memory:` mới và seed lại; mỗi test dùng user mới |

Ghi chú setup (G4, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`): để tái lập theo lockfile, setup nên dùng `npm ci` thay `npm install`. Dòng C01-6 giữ nguyên `npm install` vì ghi đúng lệnh đã chạy ngày 2026-10-16.

## Test Cases

Nguồn expected: `SUT/README.md` (SRS v2.0) và `SUT/api_specification.md`. Baseline chỉ assert **status code** (quyết định D01-Q5). Case data-driven (`test.each`) đếm theo từng dòng dữ liệu: CO-01…CO-19 = 36 Jest tests. File: `backend/test/cart-orders.test.js`.

| Case ID | Spec Section | Input / Fixture | Expected Result | Actual Result | Test File / Commit |
|---|---|---|---|---|---|
| CO-01 [invalid] | §4 header, SEC-02 | `GET /api/cart` không token | 401 | Pass (D01-1-cc) | `cart-orders.test.js` / [commit] |
| CO-02 [normal] | §4.1 | User mới, `GET /api/cart` | 200 | Pass (D01-1-cc) | như trên |
| CO-03 [normal] | §4.2, §4.1 | `POST /api/cart` item A (id 1, qty 2) rồi `GET /api/cart` | 200, 200 | Pass (D01-1-cc) | như trên |
| CO-04 [normal] | §4.2, FR-07 | Thêm item A rồi item B (sản phẩm khác) | 200, 200 | Pass (D01-1-cc) | như trên |
| CO-05 [normal] | §4.1 | User 1 thêm item; user 2 `GET /api/cart` | 200 | Pass (D01-1-cc) | như trên |
| CO-06 [invalid] | §4 header | `POST /api/checkout` không token | 401 | Pass (D01-1-cc) | như trên |
| CO-07 [normal] | §4.3, FR-08 | Giỏ 2 × 6.000.000; checkout `total_amount` 12.000.000 (= tổng giỏ), có địa chỉ | 200 | Pass (D01-1-cc) | như trên |
| CO-08 [normal] | §4.4, FR-11 | User 1 có 2 đơn, user 2 có 1 đơn; user 1 `GET /api/orders/my-orders` | 200 | Pass (D01-1-cc) | như trên |
| CO-09 [normal] | §4.5 | Chủ đơn `GET /api/orders/:id` | 200 | Pass (D01-1-cc) | như trên |
| CO-10 [invalid] | §4.5 | `GET /api/orders/999999` | 404 | Pass (D01-1-cc) | như trên |
| CO-11 [normal] | §6.2, FR-18 | Admin `GET /api/admin/orders` (2 user có đơn) | 200 | Pass (D01-1-cc) | như trên |
| CO-12 [normal] ×2 | §4.6, FR-10, FR-20 | User hủy đơn `pending`; `confirmed` | 200 | Pass (D01-1-cc) | như trên |
| CO-13 [invalid] ×2 | §4.6, FR-10 | User hủy đơn `delivered`; `canceled` | 400 | Pass (D01-1-cc) | như trên |
| CO-14 [invalid] | FR-11 | User khác hủy đơn | 404 | Pass (D01-1-cc) | như trên |
| CO-15 [invalid] | §4.6 | Hủy đơn id 999999 | 404 | Pass (D01-1-cc) | như trên |
| CO-16 [invalid] | §4 header | Hủy không token | 401 | Pass (D01-1-cc) | như trên |
| CO-17 [normal] ×5 | §6.2, FR-10 | Admin: pending→confirmed, confirmed→shipping, shipping→delivered, pending→canceled, confirmed→canceled | 200 | Pass (D01-1-cc) | như trên |
| CO-18 [invalid] ×12 | §6.2, FR-10 | Admin: pending→shipping, pending→delivered, confirmed→delivered, confirmed→pending, shipping→pending, shipping→confirmed, delivered→pending/shipping/canceled, canceled→pending/confirmed, pending→`unknown_status` | 400 | Pass (D01-1-cc) | như trên |
| CO-19 [invalid] | §6.2 | Admin đổi status đơn 999999 | 404 | Pass (D01-1-cc) | như trên |

Fixture đặt status đơn bằng `UPDATE orders` trực tiếp trong DB test (`createOrder` trong `helpers/app.js`), để setup không phụ thuộc logic chuyển trạng thái đang được test.

### D01 — Lỗi gốc (test đúng spec, fail trên code gốc)

File `backend/test/defects/cart-orders.defects.js`, chạy riêng bằng `npm run test:defects`. **Không** thuộc baseline Stryker (Jest `testMatch` chỉ nhận `*.test.js`). Kỳ vọng: 9/9 FAIL trên commit gốc (từ 2026-10-22, DEF-08 tách thành 08a/08b; trước đó 8 tests).

| Defect ID | Requirement | Input | Expected theo spec | Code gốc (source inspection) | Actual Result |
|---|---|---|---|---|---|
| DEF-01 | FR-07 | Thêm cùng sản phẩm qty 2 rồi qty 1 | Một dòng, qty 3 | Hai dòng (`push` nguyên body, server.js:293) | Fail đúng kỳ vọng (D01-2-cc): thêm lại cùng sản phẩm tạo dòng mới |
| DEF-02 | FR-08 | Giỏ 2 × 6.000.000, client gửi `total_amount: 1` | Đơn lưu 12.000.000 | Lưu 1 (server.js:299–303) | Fail đúng kỳ vọng (D01-2-cc): lưu `total_amount` 1 thay vì 12.000.000 |
| DEF-03 | FR-08 | Checkout thành công rồi `GET /api/cart` | `[]` | Giỏ còn nguyên | Fail đúng kỳ vọng (D01-2-cc): giỏ không bị xóa sau checkout |
| DEF-04 | FR-10, FR-20 | User hủy đơn `shipping` | 400, status vẫn `shipping` | 200, chuyển `canceled` (server.js:329) | Fail đúng kỳ vọng (D01-2-cc): trả 200 (DB check phía sau chưa chạy) |
| DEF-05 | FR-10 | Admin `canceled → delivered` | 400, status vẫn `canceled` | 200 (server.js:550–551) | Fail đúng kỳ vọng (D01-2-cc): trả 200 (DB check phía sau chưa chạy) |
| DEF-06 | FR-12, SEC-03 | User thường gọi `PUT /api/admin/orders/:id/status` | 401/403, status không đổi | 200 (server.js:525, chỉ kiểm token) | Fail đúng kỳ vọng (D01-2-cc): user thường nhận 200 (DB check phía sau chưa chạy) |
| DEF-07 | FR-12, SEC-03 | User thường gọi `GET /api/admin/orders` | 401/403 | 200 (server.js:510) | Fail đúng kỳ vọng (D01-2-cc): user thường nhận 200 |
| DEF-08a | §4 header, SEC-02 | `GET /api/orders/:id` không token | 401 | 200 (server.js:344, không auth) | Fail đúng kỳ vọng (D01-4-cc): không token vẫn trả 200 thay vì 401 |
| DEF-08b | FR-11 | `GET /api/orders/:id` với token của user khác | 403 hoặc 404 | 200, trả đơn của người khác (server.js:344) | Fail đúng kỳ vọng (D01-4-cc): token user khác nhận 200 thay vì 403/404 (test chỉ assert status, chưa assert body) |

### D01 — Quyết định scope (Tấn Hiệp, 2026-10-18)

Hòa (2026-10-18): các test được giao đã được quyết định; tự quyết rồi ghi rõ. Căn cứ: README.md (SRS).

| ID | Câu hỏi | Quyết định | Căn cứ |
|---|---|---|---|
| D01-Q1 | User hủy đơn `shipping`? | Không được → DEF-04 | FR-10 ("User không được phép tự hủy"), FR-20; comment server.js:328 |
| D01-Q2 | Expected cho admin transition | State machine FR-10; `canceled → delivered` là lỗi gốc | FR-10, FR-18 |
| D01-Q3 | Test đúng spec nhưng fail trên code gốc | File riêng `test/defects/`, ngoài baseline; ghi lỗi gốc cho S3-D04 | Workbook S3-D01 "ghi lỗi gốc"; S3-D04 "Original tests pass" |
| D01-Q4 | Cart quantity / checkout total | Test theo spec. Rule có trong SRS (FR-07, FR-08) nhưng code không triển khai → DEF-01…03 | FR-07, FR-08 |
| D01-Q5 | Mức assertion của baseline | Chỉ status code; body/DB để S3-F01 (manual, Tấn Hiệp tự viết) và S3-G01 (Claude) | Bản assert đầy đủ chạy thử đạt 95.80%, chỉ còn 4 survivors (3 là mutant "sửa lỗi" L550) → không đủ cho yêu cầu ≥3 survivors / ≥3 manual assertions |
| D01-Q6 | Admin hủy đơn `shipping`? | Chưa rõ → không test | FR-10 có câu "chỉ Admin mới có thể thao tác" nhưng sơ đồ không có cạnh `shipping → canceled` |
| D01-Q7 (2026-10-22) | Stryker dry run lỗi `No tests were found` trên Windows với sandbox `.stryker-tmp` | `tempDirName: "stryker-tmp"` trong `stryker.cart-orders.config.json`; thêm `stryker-tmp/` vào `.gitignore` của EShop | D01-3-cc và run chẩn đoán trên máy Tấn Hiệp; phương án `testRegex` chưa được chạy thử |
| D01-Q8 (2026-10-22) | DEF-08 gộp 2 vế, chỉ vế đầu có evidence | Tách thành DEF-08a (không token) và DEF-08b (token user khác) | Ghi chú D01-2-cc |

### D01 — Harness (không sửa production code)

- `test/helpers/isolate.js` (Jest `setupFiles`): mock `sqlite3` để mọi `Database` mở `:memory:`; mock `express` để lấy `app` và thay `listen` bằng no-op.
- `test/helpers/app.js`: nạp `server.js`, đợi seed xong (bảng `coupons` đủ 4 dòng), helpers `login`, `newUser`, `createOrder`, `orderStatus`.
- Token: đăng nhập thật qua `POST /api/login` (admin seed `admin@eshop.com`; user mới đăng ký cho từng test). Domain không phụ thuộc thời gian.
- `stryker.cart-orders.config.json`: `mutate` = `server.js:280-349`, `server.js:510-568` (routes Cart & Orders và admin orders); jest-runner, `coverageAnalysis: perTest`.

### D01 — Runs

Run do Claude Code thực hiện trên máy Tấn Hiệp (Windows 11) ngày 2026-10-22, nhánh local `s3/D01-cart-orders` của repo EShop, chưa commit. Chi tiết lệnh, versions, commit: `experiments/s3/runs/Tan_Hiep/D01-cc-REPORT.md`. Model của Claude Code: Claude Opus 5.5 (Tấn Hiệp xác nhận 2026-10-22).

| Run ID | Executor | Command | Expected | Result | Evidence |
|---|---|---|---|---|---|
| D01-1-cc | Claude Code | `cd backend; npm install; npm test` | 36 passed; `database.sqlite` không đổi | **Pass** — 36/36 passed; `database.sqlite` không đổi. `npm install` báo 25 vulnerabilities, không chạy `npm audit fix` | `experiments/s3/runs/Tan_Hiep/D01-1-cc/` |
| D01-2-cc | Claude Code | `npm run test:defects` | 8 failed, đúng lý do ở bảng lỗi gốc | **Pass (đúng kỳ vọng)** — 8/8 failed, lý do khớp DEF-01…08 (bảng lỗi gốc) | `experiments/s3/runs/Tan_Hiep/D01-2-cc/` |
| D01-3-cc | Claude Code | `npx stryker run stryker.cart-orders.config.json --dryRunOnly` | `Initial test run succeeded. Ran 36 tests` | **Fail** — exit 1, `No tests were found` / `ConfigError: No tests were executed`; không sinh `mutation.json`/`.html` | `experiments/s3/runs/Tan_Hiep/D01-3-cc/` (kèm log chẩn đoán) |
| D01-3-cc (chẩn đoán, không chính thức) | Claude Code | như D01-3-cc + `--tempDirName stryker-tmp` | — | `Initial test run succeeded. Ran 36 tests` | log chẩn đoán trong `D01-3-cc/` |
| D01-4-cc | Claude Code | `npm run test:defects` (sau khi tách DEF-08) | 9 failed, đúng lý do ở bảng lỗi gốc | **Pass (đúng kỳ vọng)** — 9/9 failed, lý do khớp DEF-01…07, DEF-08a, DEF-08b (bảng lỗi gốc) | `experiments/s3/runs/Tan_Hiep/D01-4-cc/` |
| D01-5-cc | Claude Code | `npx stryker run stryker.cart-orders.config.json --dryRunOnly` (sau D01-Q7) | `Initial test run succeeded. Ran 36 tests` | **Pass** — exit 0, `Initial test run succeeded. Ran 36 tests in 1 second (net 426 ms, overhead 705 ms)`; dry run không sinh `mutation.json`/`.html` | `experiments/s3/runs/Tan_Hiep/D01-5-cc/` |
| F01-1 | Tấn Hiệp | `npm run test:manual`; `npm run mutate:cart-orders:manual` (nhánh `s3/F01-manual`, working tree trước commit `0236267`: 41 tests = 36 baseline + 5 manual, gồm test coupon Survivor 4; khớp số test của `0236267`, nội dung chưa đối chiếu) | Manual suite pass hết trên code gốc | **Pass** — 41/41 passed. 150 mutants: Killed 100, Timeout 19, Survived 20, NoCoverage 2, RuntimeError 9; score 84.40% (đếm từ `mutation.json`, khớp console) | `experiments/s3/runs/Tan_Hiep/F01-1/` |
| F01-2-cc | Claude Code | `npm run test:manual`; `npm run mutate:cart-orders:manual` (nhánh `s3/F01-manual` @ `b77f5d6`, `stryker.cart-orders.manual.config.json`, test files `test/cart-orders.test.js` + `test/manual/cart-orders.manual.js`) | Manual suite pass hết trên code gốc | **Pass** — 44/44 passed (36 baseline + 8 manual). 150 mutants: Killed 112, Timeout 18, Survived 11, NoCoverage 2, RuntimeError 7; score 90.91% (E01-1-cc 74.65%, F01-1 84.40%) | `experiments/s3/runs/Tan_Hiep/F01-2-cc/` |
| G01-1-cc | Claude Code | `npm run test:ai` (nhánh `s3/G01-ai`, raw AI assertions, commit sau run: `143a016`) | AI suite pass hết trên code gốc | **Pass** — 41/41 passed (36 baseline + 5 AI); không chạy Stryker | `experiments/s3/runs/Tan_Hiep/G01-1-cc/` |
| G01-2-cc | Claude Code | `npm run test:ai`; `npm run mutate:cart-orders:ai` (nhánh `s3/G01-ai` @ `f4696c6`, `stryker.cart-orders.ai.config.json`, test files `test/cart-orders.test.js` + `test/ai/cart-orders.ai.js`) | AI suite pass hết trên code gốc | **Pass** — 41/41 passed. 150 mutants: Killed 97, Timeout 23, Survived 21, NoCoverage 2, RuntimeError 7; score 83.92% (E01-1-cc 74.65%, F01-2-cc 90.91%) | `experiments/s3/runs/Tan_Hiep/G01-2-cc/` |
| D01-1 | Tấn Hiệp | `npm test` (`s3/D01-cart-orders` @ `8d60e9b`; 2026-10-23 11:34:20 theo dòng `###` trong console.log) | 36 passed | **Pass** — Test Suites 1 passed; Tests 36 passed | `experiments/s3/runs/Tan_Hiep/D01-1/` |
| D01-2 | Tấn Hiệp | `npm run test:defects` (`8d60e9b`; 11:34:22) | 9 failed | **Pass (đúng kỳ vọng)** — Tests 9 failed; test fail: DEF-01…07, DEF-08a, DEF-08b | `experiments/s3/runs/Tan_Hiep/D01-2/` |
| D01-3 | Tấn Hiệp | `npx stryker run stryker.cart-orders.config.json --dryRunOnly` (`8d60e9b`; 11:34:23) | `Ran 36 tests` | **Pass** — `Initial test run succeeded. Ran 36 tests in 1 second (net 420 ms, overhead 713 ms)` | `experiments/s3/runs/Tan_Hiep/D01-3/` |

Ghi chú commit (G2, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`): số liệu D01 (36 passed / 9 failed / `Ran 36 tests`) là của `s3/D01-cart-orders` @ `8d60e9b`. Trên baseline đóng băng `806ba19`, cùng lệnh cho 88 passed / 54 failed / `Ran 72 tests` (nguồn: log baseline của Phúc, `Phuc_Hoang/I03-cart-repro/baseline/baseline-npm-test.log`, `baseline-test-defects.log`, `baseline-dry.log`).

Ghi chú D01-2-cc: mỗi DEF test dừng ở assertion fail đầu tiên. DEF-08 mới chứng minh vế "không token → vẫn trả 200"; vế "token user khác" chưa được chạy tới. Tương tự, assertion kiểm DB state phía sau ở DEF-04/05/06 chưa chạy.

Chạy thử bởi Claude trong sandbox (Linux, Node v22.22.0), **không phải evidence của Tấn Hiệp**: D01-1 36/36 pass (3 lần liên tiếp và `--runInBand`); D01-2 8/8 fail; Stryker full run với sandbox mặc định `.stryker-tmp` chạy được: 150 mutants — Killed 91, Timeout 16, Survived 34, NoCoverage 2, RuntimeError 7, score 74.83%. Số chính thức của baseline lấy ở S3-E01 sau khi S3-D04 chốt.

## Baseline

| Run ID | SUT Commit | Config / Test Set | Command | HTML / JSON / Log | Outcome |
|---|---|---|---|---|---|
| E01-1-cc (Claude Code; baseline domain, trước D04) | `8d60e9b` (EShop, nhánh `s3/D01-cart-orders`) | `backend/stryker.cart-orders.config.json` (`mutate: server.js:280-349, 510-568`, `coverageAnalysis: perTest`, `tempDirName: stryker-tmp`); test set `backend/test/cart-orders.test.js` (36 tests); StrykerJS 10.0.0, Jest 30.5.2, Node v24.15.0, Windows 11 | `cd backend; npx stryker run stryker.cart-orders.config.json` | `experiments/s3/runs/Tan_Hiep/E01-1-cc/` (`mutation.html`, `mutation.json`, `console.log`, `mutants_by_route.md`) | 150 mutants — Killed 87, Timeout 19, Survived 34, NoCoverage 2, RuntimeError 8, CompileError 0, Ignored 0; score 74.65% (Detected 106 / Valid 142); score on covered 75.71%. Khác sandbox Linux trước đó (74.83%: Killed 91, Timeout 16, RuntimeError 7) |
| E01-1 (Tấn Hiệp; frozen baseline sau D04) | `806ba19` (EShop, detached) | `backend/stryker.cart-orders.config.json` tại `806ba19` (`mutate: server.js:280-349, 510-568`, `concurrency: 2`, `timeoutMS: 5000`, `timeoutFactor: 1.5`, `tempDirName: stryker-tmp`); test set `test/cart-orders.test.js` | `npm run mutate:cart-orders` (2026-10-23 11:34:28 theo dòng `###`) | `experiments/s3/runs/Tan_Hiep/E01-1/` (`mutation.html`, `mutation.json`, `console.log`) | 150 mutants — Killed 82, Timeout 25, Survived 34, NoCoverage 2, RuntimeError 7, CompileError 0, Ignored 0; score 74.83% (Detected 107 / Valid 143), đếm từ `mutation.json`. Dry run `Ran 72 tests`. So từng mutant: `S3-member-compare/member_comparison.md` |
| Hòa (Codex AI Agent) chạy lại Cart — **không phải run của Tấn Hiệp** | `806ba19` (frozen baseline S3-D04) | Cart scope, concurrency 2, cùng timeout policy (theo nguồn) | — | Nguồn: `experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md` (mục Cart Supplemental Reproduction) | 150 mutants — Killed 82, Timeout 25, Survived 34, NoCoverage 2, RuntimeError 7; score 74.83%. Survived baseline/manual/AI = 34/11/21, trùng với E01-1-cc/F01-2-cc/G01-2-cc; chỉ Killed↔Timeout đổi |

## Survivors & Manual Assertions

| Mutant ID / Diff | State | Why Survived | Distinguishing Input | Manual Assertion / Test | Original-Code Result | Mutant Result / Evidence |
|---|---|---|---|---|---|---|
| **286:7** <br> `if (!userCarts[userId])` => `if (false)` | Survived | CO-02 đã gọi `GET /api/cart` nhưng chỉ assert status `200` mà không kiểm tra cấu trúc/nội dung phản hồi (nhãn `missing-assertion`). §4.1 không quy định giỏ trống trả về gì, nên oracle [] là suy luận (inferred from §4.1), không phải yêu cầu. | `GET /api/cart` với token của `userId` chưa từng khởi tạo giỏ hàng. | `expect(res.body).toEqual([])` | Pass (F01-2-cc, `npm run test:manual` 44/44) | Killed by "Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user", run F01-2-cc |
| **292:7** <br> `if (!userCarts[userId])` => `if (true)` | Survived | CO-04 đã gọi `POST /api/cart` nhưng bị thiếu assertion kiểm tra giỏ hàng bị reset dữ liệu (nhãn `missing-assertion`). Mutant khiến `userCarts[userId]` luôn bị gán lại thành `[]` trước mỗi lần push, làm mất toàn bộ sản phẩm đã thêm trước đó. | Gọi `POST /api/cart` thêm sản phẩm A (`id: 1`), sau đó tiếp tục gọi `POST /api/cart` thêm sản phẩm B (`id: 2`). Gọi tiếp `GET /api/cart` để kiểm tra. | Kiểm tra trên response của `GET /api/cart` sau lần POST thứ 2: <br> `expect(res.body).toHaveLength(2)` <br> *(Không assert trực tiếp trên response của `POST /api/cart` vì route này chỉ trả về `{ message: "Added to cart" }`)* | Pass (F01-2-cc, `npm run test:manual` 44/44) | Killed by "Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions", run F01-2-cc |
| **326:47** <br> `{ error: "Order not found" }` => `{}` | Survived | Test case hủy đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `PUT /api/orders/99999/cancel` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 326). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Pass (F01-2-cc, `npm run test:manual` 44/44) | Killed by "Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found", run F01-2-cc |
| **346:45** <br> `{ error: "Order not found" }` => `{}` | Survived | Test case truy vấn đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `GET /api/orders/99999` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 346). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Pass (F01-2-cc, `npm run test:manual` 44/44) | Killed by "Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found", run F01-2-cc |
| **532:47** <br> `{ error: "Order not found" }` => `{}` | Survived | Test case admin cập nhật đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `PUT /api/admin/orders/99999/status` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 532). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Pass (F01-2-cc, `npm run test:manual` 44/44) | Killed by "Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found", run F01-2-cc |
| **550:11** <br> `if (currentStatus === "canceled" && status === "delivered")` => `if (false)` | Survived | Đây là lỗi logic thiếu điều kiện chặn ở mã nguồn gốc, không thuộc về thiếu hụt của test case (nhãn `defect-fixing`). | `PUT /api/admin/orders/:id/status` với đơn hàng có trạng thái hiện tại là `canceled` và `status` mới truyền vào là `delivered`. | test đúng spec thì fail trên code gốc (đã ghi thành DEF-05); test pass trên code gốc thì phải assert theo bug, nên không viết. | — (không có test manual; DEF-05 fail trên code gốc theo D01-4-cc) | Survived, run F01-2-cc |

Ghi chú oracle (G5, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`): oracle "user mới có giỏ hàng rỗng" (286:7, AI-CO-01) là suy luận từ §4.1 (inferred), không phải yêu cầu nêu trong §4.1 hay FR-07. Header test AI trên nhánh `s3/G01-ai` (`f4696c6`) dẫn `FR-07 / §4.1` như yêu cầu; không sửa nhánh đó.

Ghi chú tên test (G6, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`): tên CO-02 ("gets an empty cart") và CO-04 hứa nhiều hơn phần assert (chỉ assert status), nên các mutant chỉ lộ ra qua nội dung giỏ (ví dụ 286:7, 292:7) sống ở baseline. Không đổi tên test vì baseline đã đóng băng (`806ba19`).

## AI Runs

| AI Record Artifact ID | Raw Candidate / Edited Test | Spec Review | Original-Code Result | Mutant Result | Run Evidence |
|---|---|---|---|---|---|
| AI-S3-G01-01 | Raw: 5 test AI-CO-01…05 do Claude Code (claude-opus-5-5) sinh ở G01-1-cc (`s3/G01-ai` @ `143a016`), nhắm 5/6 mutant mục tiêu; 550:11 không viết (defect-fixing). Edited: assertion không sửa, chỉ sửa comment header (`f4696c6`) | Spec review 2026-10-23 (Tấn Hiệp + phiên thảo luận): giữ 5/5 test, không sửa assertion; oracle một phần lấy từ code (dạng `[]`, trường `error`) đã ghi ở từng test | Pass — 41/41 (36 baseline + 5 AI) ở G01-1-cc và G01-2-cc | G01-2-cc: 286:7, 292:7, 326:47, 346:45, 532:47 Killed (mỗi mutant bởi test AI tương ứng); 550:11 Survived. Toàn run: Killed 97, Timeout 23, Survived 21, NoCoverage 2, RuntimeError 7; score 83.92% | `experiments/s3/runs/Tan_Hiep/G01-1-cc/`, `G01-2-cc/`, `G01-cc-REPORT.md` |

## Comparison

| Run / Test Set | Killed | Timeout | Survived | NoCoverage | Tool Score & Definition | Evidence |
|---|---|---|---|---|---|---|
| Baseline (E01-1-cc) | 87 | 19 | 34 | 2 | 74.65% — Detected / Valid × 100; Detected = Killed + Timeout = 106, Valid = tổng − RuntimeError = 150 − 8 = 142 (StrykerJS 10.0.0) | `experiments/s3/runs/Tan_Hiep/E01-1-cc/` |
| Manual (F01-2-cc) | 112 | 18 | 11 | 2 | 90.91% — Detected / Valid × 100; Detected = 130, Valid = tổng − RuntimeError = 150 − 7 = 143 (StrykerJS 10.0.0) | `experiments/s3/runs/Tan_Hiep/F01-2-cc/` |
| AI-assisted (G01-2-cc) | 97 | 23 | 21 | 2 | 83.92% — Detected / Valid × 100; Detected = 120, Valid = tổng − RuntimeError = 150 − 7 = 143 (StrykerJS 10.0.0) | `experiments/s3/runs/Tan_Hiep/G01-2-cc/` |
| Baseline (E01-1, Tấn Hiệp, `806ba19`; `npm run mutate:cart-orders`) | 82 | 25 | 34 | 2 | 74.83% — Detected = 107, Valid = 150 − 7 = 143 | `experiments/s3/runs/Tan_Hiep/E01-1/` |
| Manual (F01-2, Tấn Hiệp, `s3/F01-manual` @ `b77f5d6`; `npm run test:manual` 44 passed; `npx stryker run stryker.cart-orders.manual.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5`) | 112 | 18 | 11 | 2 | 90.91% — Detected = 130, Valid = 150 − 7 = 143 | `experiments/s3/runs/Tan_Hiep/F01-2/` |
| AI-assisted (G01-2, Tấn Hiệp, `s3/G01-ai` @ `f4696c6`; `npm run test:ai` 41 passed; `npx stryker run stryker.cart-orders.ai.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5`) | 102 | 18 | 21 | 2 | 83.92% — Detected = 120, Valid = 150 − 7 = 143 | `experiments/s3/runs/Tan_Hiep/G01-2/` |

Ghi chú: Manual = baseline 36 + manual 8 test (`test/cart-orders.test.js` + `test/manual/cart-orders.manual.js`, nhánh `s3/F01-manual` @ `b77f5d6`). Cả hai run cùng production code, config mutate (`server.js:280-349, 510-568`) và 150 mutants; CompileError = Ignored = 0. Hai run do Claude Code thực hiện trên Windows (Node v24.15.0). AI = baseline 36 + AI 5 test (`test/cart-orders.test.js` + `test/ai/cart-orders.ai.js`, nhánh `s3/G01-ai` @ `f4696c6`), chạy cùng production code, config mutate và 150 mutants. Manual có 8 test, trong đó 3 test nằm ngoài 6 mutant mục tiêu, nên so sánh công bằng là trên 6 mutant mục tiêu: cả hai nhánh kill 5/6, cùng để sống 550:11 (xem `G01-cc-REPORT.md`, mục G01-2-cc).

Member runs so từng mutant (`experiments/s3/runs/Tan_Hiep/S3-member-compare/member_comparison.md`, khóa như H01): tập Survived của E01-1/F01-2/G01-2 trùng với run `-cc` tương ứng và với run tái lập của Hòa (`Thai_Hoa/D04-merge-2026-10-23-agent/{frozen-cart-orders-baseline,cart-reproduced-manual,cart-reproduced-ai}`). Mutant đổi trạng thái: E01-1 vs E01-1-cc 6 (Killed↔Timeout 5; RuntimeError→Timeout 1 ở `532:11`); E01-1 vs Hòa 0; F01-2 vs F01-2-cc 0; F01-2 vs Hòa 7 (Killed↔Timeout); G01-2 vs G01-2-cc 5 (Killed↔Timeout); G01-2 vs Hòa 7 (Killed↔Timeout). Không mutant nào chuyển vào hoặc ra khỏi Survived. Theo console.log: E01-1-cc, F01-2-cc, G01-2-cc tạo 15 test runner process; E01-1, F01-2, G01-2 tạo 2.

Lệnh mutation chuẩn cho member run (G3, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`): `npx stryker run <config> --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5`. Config nhánh `stryker.cart-orders.manual.config.json` (`s3/F01-manual`) và `stryker.cart-orders.ai.config.json` (`s3/G01-ai`) không đặt 3 tham số này (chỉ config baseline `806ba19` có); không sửa config nhánh.

### S3-H01 — Comparison analysis

Dữ liệu sinh bằng `experiments/s3/runs/Tan_Hiep/H01-cc/h01_comparison.py` từ `mutation.json` và `console.log` của E01-1-cc, F01-2-cc, G01-2-cc; không chạy run mới. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col là vị trí đầu. `killedBy` là test Stryker ghi trong `mutation.json`.

**a. 6 mutant mục tiêu**

| Mutant | E01-1-cc | F01-2-cc (killedBy) | G01-2-cc (killedBy) |
|---|---|---|---|
| 286:7 ConditionalExpression → `false` | Survived | Killed (Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`)) | Killed (AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`)) |
| 292:7 ConditionalExpression → `true` | Survived | Killed (Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`)) | Killed (AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`)) |
| 326:47 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`)) |
| 346:45 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`)) |
| 532:47 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`)) |
| 550:11 ConditionalExpression → `false` | Survived | Survived (—) | Survived (—) |

**b. 15 mutant chỉ F01-2-cc kill** (Killed ở F01-2-cc, không Killed ở G01-2-cc), nhóm theo `killedBy` của F01-2-cc

| Test đã kill (F01-2-cc) | Số mutant | Mutant (Line:Col Mutator → replacement; E01-1-cc / G01-2-cc) |
|---|---|---|
| Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) | 4 | 335:9 ArrayDeclaration → `[]` (Survived / Survived)<br>335:10 StringLiteral → `""` (Survived / Survived)<br>337:20 ObjectLiteral → `{}` (Survived / Survived)<br>337:31 StringLiteral → `""` (Survived / Survived) |
| Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | 3 | 510:63 BlockStatement → `{}` (Killed / Timeout)<br>519:22 BlockStatement → `{}` (Killed / Timeout)<br>520:7 CallExpression → `;` (Killed / Timeout) |
| PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) | 3 | 561:9 ArrayDeclaration → `[]` (Survived / Survived)<br>563:20 ObjectLiteral → `{}` (Survived / Survived)<br>563:31 StringLiteral → `""` (Survived / Survived) |
| Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | 2 | 294:12 ObjectLiteral → `{}` (Survived / Survived)<br>294:23 StringLiteral → `""` (Survived / Survived) |
| Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-08 [normal] user reads own order history (another user also has an order) (`cart-orders.test.js`) | 1 | 315:22 BlockStatement → `{}` (Timeout / Timeout) |
| Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id (`cart-orders.test.js`) | 1 | 347:5 CallExpression → `;` (Killed / Timeout) |
| POST /api/checkout - Verify successful order creation and DB pending status (`cart-orders.manual.js`) | 1 | 306:27 StringLiteral → `""` (Survived / Survived) |

Kiểm: 8/15 mutant được kill bởi 3 test manual ngoài 6 mục tiêu (checkout DB, cancel pending, admin transition). Ngoại lệ:

| Mutant | killedBy (F01-2-cc) | E01-1-cc | G01-2-cc |
|---|---|---|---|
| 294:12 ObjectLiteral → `{}` | Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Survived | Survived |
| 294:23 StringLiteral → `""` | Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Survived | Survived |
| 315:22 BlockStatement → `{}` | Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-08 [normal] user reads own order history (another user also has an order) (`cart-orders.test.js`) | Timeout | Timeout |
| 347:5 CallExpression → `;` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id (`cart-orders.test.js`) | Killed | Timeout |
| 510:63 BlockStatement → `{}` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |
| 519:22 BlockStatement → `{}` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |
| 520:7 CallExpression → `;` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |

**c. Metrics mỗi run**

| Run | Tests (baseline + thêm) | Stryker `Done in` | Survived | NoCoverage | Score |
|---|---|---|---|---|---|
| E01-1-cc | 36 + 0 = 36 | 26 s | 34 | 2 | 74.65% |
| F01-2-cc | 36 + 8 = 44 | 27 s | 11 | 2 | 90.91% |
| G01-2-cc | 36 + 5 = 41 | 30 s | 21 | 2 | 83.92% |

Mỗi run chạy 1 lần nên chưa đo flake rate. Tín hiệu: 4 mutant Killed ↔ Timeout giữa các run (xem Limits & Failure Modes).

**Kết luận (Tấn Hiệp viết):** 

1. **Hiệu quả tiêu diệt mutant mục tiêu và bài học từ Oracle & Bug:**
   - Cả bộ test Manual (`F01-2-cc`) và AI (`G01-2-cc`) đều phát hiện 5/6 mutant mục tiêu (`286:7`, `292:7`, `326:47`, `346:45`, `532:47`) thông qua đúng các test case được thiết kế riêng tương ứng.
   - **Bài học về Oracle:** Việc Manual test dùng oracle chặt (assert chính xác giá trị chuỗi `message: "Added to cart"` trong code) giúp diệt thêm 2 mutant phụ (`294:12` và `294:23`), thể hiện sự đánh đổi rõ rệt: oracle càng khắt khe thì khả năng diệt mutant càng cao nhưng lại phụ thuộc chặt vào chi tiết cài đặt hiện tại.
   - **Bài học về Bug mã nguồn (`550:11`):** Mutant `550:11` sống sót ở cả 3 run vì chính mutant lại đóng vai trò là bản sửa lỗi logic (validation) cho code gốc, test kill được mutant này phải assert canceled → delivered = 200, tức là assert theo bug và trái FR-10. Còn test đúng spec (đòi 400) thì fail trên code gốc, nên đã được tách ra thành DEF-05.

2. **Phân tích chênh lệch 10 mutant bị bỏ sót giữa Manual và AI:**
   - Xét theo tiêu chí Survived (21 mutant ở G01 − 11 mutant ở F01 = 10 mutant chênh lệch):
     - **8 mutant:** Do 3 test manual viết bổ sung ngoài mục tiêu (`cancel pending`, `admin transition`, `checkout DB`) bao phủ sâu hơn các luồng thao tác và cập nhật dữ liệu.
     - **2 mutant (`294:12`, `294:23`):** Do assertion kiểm tra nội dung `message` ở response của lệnh `POST /api/cart` trong test manual kill được, trong khi test AI cố ý chỉ check HTTP status code để tránh phụ thuộc chuỗi cứng.
   - **Về 5 mutant chuyển trạng thái giữa Killed ↔ Timeout (`347:5`, `510:63`, `519:22`, `520:7`, `315:22`):** Việc các mutant này chuyển sang Timeout ở run `G01-2-cc` vẫn được Stryker tính vào số lượng mutant phát hiện thành công, nên không làm sai lệch số mutant mà AI bỏ sót.

3. **Cải thiện chỉ số Mutation Score:**
   - So với baseline `E01-1-cc` (Score 74.65%, 34 Survived), việc bổ sung test manual trong `F01-2-cc` giúp giảm Survived xuống 11 (Score 90.91%), còn bộ test AI trong `G01-2-cc` giảm Survived xuống 21 (Score 83.92%).

## Limits & Failure Modes

- **Equivalent candidate (demo):** `item.quantity > 0` → `>= 0` (cart.js:4) sống ở cả nhánh manual (C01-4) và AI (C01-5). Khác biệt chỉ khi `quantity === 0`, khi đó mutant cộng `price × 0 = 0` → output giống gốc với `price` hữu hạn. Lập luận chi tiết: Research Notes F-A01-04.
- **Failure mode — kill attribution trong console (C01-5):** console Stryker chỉ ghi công cho test fail đầu tiên của mỗi mutant; weak test hiện `covered 14`, 0 kill khi chạy chung với test AI, dù chạy riêng kill 3 (C01-2). Không dùng số "killed N" trong console để kết luận một test vô dụng; đọc `killedBy` trong `mutation.json`.
- **Troubleshooting (C01-6):** chạy `npm install` / `node server.js` ở gốc repo EShop → `ENOENT … package.json` và `MODULE_NOT_FOUND … server.js`. Sửa: `cd backend` trước khi chạy. Ghi vào Troubleshooting của User Guide.
- **Failure mode — chạy SUT làm bẩn file đang track (C01-6):** sau `node server.js`, `git status` báo `modified: database.sqlite` vì `database.js` DROP + seed lại DB mỗi lần được require. Nếu vô tình commit, baseline đổi theo dữ liệu chạy thử. Xử lý tạm: `git restore backend/database.sqlite` sau mỗi lần chạy server; trong tests: harness D01 dùng DB `:memory:` nên không chạm file.
- **Quan sát trước baseline (sandbox Claude, cần xác nhận ở S3-E01):** (1) 16 Timeout chủ yếu do BlockStatement xóa thân handler → server không bao giờ trả response, supertest chờ đến timeout — đây là Timeout, không phải assertion kill; (2) 7 RuntimeError do StringLiteral đổi câu SQL thành `""` → `sqlite3` 6.0.1 bị segfault (kiểm riêng: `db.get("", [1], cb)` thoát với mã 139), Stryker loại khỏi score; (3) mutant `if (currentStatus === "canceled" && status === "delivered")` → `false` (L550) làm code **đúng spec hơn**, nên không test đúng spec nào kill được trên code gốc.
- **Troubleshooting (D01-3-cc, Windows):** Stryker dry run với `tempDirName` mặc định `.stryker-tmp` báo `No tests were found`, dù `npm test` pass 36/36 trong repo. Cùng config chạy được trên Linux (sandbox Claude). Đổi `--tempDirName stryker-tmp` (không dấu chấm) thì dry run thành công trên máy Tấn Hiệp. Nguyên nhân chưa xác minh bằng tài liệu Jest/Stryker; giả thuyết của Claude Code: `testMatch` của Jest không khớp đường dẫn đi qua thư mục bắt đầu bằng dấu chấm trên Windows.
- **Failure mode — AI giải thích sai về tool (C01-5):** Claude biện minh test 499.999 bằng mutant `>= 499999`, mutant mà StrykerJS không sinh ra (không có mutator đổi hằng số, SRC-06 trong Research Notes). Assertion vẫn đúng và có ích; lý do thì sai → phải kiểm bằng run, không tin lời giải thích.
- **Environment-dependent Timeout (E01-1-cc vs sandbox Linux):** cùng 150 mutants, E01-1-cc (Windows, Node v24.15.0) so với sandbox Linux của Claude (Node v22.22.0): Killed 87/91, Timeout 19/16, RuntimeError 8/7; tổng ba loại đều là 114. Survived 34 và NoCoverage 2 giống nhau. Giả thuyết: máy chậm hơn nên một số mutant chạm ngưỡng timeout — **chưa kiểm chứng** (chưa so từng mutant vì không có `mutation.json` của run sandbox). Hệ quả: luôn ghi môi trường kèm số Killed/Timeout.
- **Failure mode — assertion học theo bug (F01-1, human):** test Survivor 4 (`POST /api/apply-coupon`) tính expected bằng đúng công thức chép từ `server.js:399–400`, nên pass trên code gốc kể cả khi code sai spec (FR-09); `/api/apply-coupon` cũng nằm ngoài vùng mutate (`280-349`, `510-568`) nên không nhắm mutant nào. Đã xóa khỏi suite manual trước F01-2. Bài học: expected lấy từ SRS/spec, không lấy từ code đang test.
- **Near-miss — rò thông tin vào nhánh AI (G01, workflow):** EShop đang checkout sẵn `s3/F01-manual` khi giao task G01; preflight `git log --oneline -1` in ra subject commit của nhánh manual (và 1 subject F01 ở repo seminar). Claude Code tự phát hiện, dừng và báo trước khi đọc bất kỳ file nào. Phương án chọn là mở session mới, nhưng G01-1-cc lại chạy tiếp trong chính session đó → ghi là "blind một phần" (AI-S3-G01-01). Bài học: trước khi giao task blind, checkout nhánh AI trước; preflight của session blind không chạy `git log`.
- **Killed ↔ Timeout giữa các run (G01-2-cc):** 4 mutant `347:5`, `510:63`, `519:22`, `520:7` Killed ở E01-1-cc và F01-2-cc nhưng Timeout ở G01-2-cc (`G01-2-cc/compare_runs.md`); Timeout dao động 19 → 18 → 23 qua E01-1-cc, F01-2-cc, G01-2-cc. Score gần như không đổi vì Timeout tính vào Detected. Giả thuyết: mutant làm handler không trả response, nên kết quả Killed/Timeout phụ thuộc test nào chạy trước và tải máy (15 process song song) — **chưa kiểm chứng**; kiểm lại khi Tấn Hiệp chạy lại các run. Hệ quả: khi so run, so cả số Survived tuyệt đối (34 → 11 / 21 trên cùng 150 mutant), không chỉ score.
- **Cart chạy lại trên frozen baseline (nguồn Hòa, không phải run của Tấn Hiệp):** Hòa (Codex AI Agent) chạy lại Cart trên `806ba19` ra Killed 82 / Timeout 25 / Survived 34 / NoCoverage 2 / RuntimeError 7 (74.83%); Survived baseline/manual/AI 34/11/21 trùng run của Tấn Hiệp (E01-1-cc, F01-2-cc, G01-2-cc), chỉ Killed↔Timeout đổi. Nguồn: `experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md`.
- **Giới hạn so sánh manual/AI — 335:10 (G7, góp ý S3-I03 của Phúc, `experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md`):** AI không kill 335:10 (`"canceled"` → `""`) vì danh sách 6 mutant mục tiêu giao cho AI không có trạng thái DB sau cancel, không phải do Claude không làm được. Manual kill được nhờ test `cancel pending` viết ngoài 6 mục tiêu.
- Tổng hợp Killed ↔ Timeout (sau member run và cross-run, 2026-10-23): cùng một bộ test, Survived giống hệt nhau ở mọi run (baseline 34, manual 11, AI 21) trên 3 máy và 2 hệ điều hành (Windows của mình và của Hòa, macOS của Phúc). Chỉ số Killed/Timeout thay đổi, và nó đi theo cách Stryker gọi Jest, không theo máy: config đóng băng (jest.config inline) cho 25 Timeout ở cả 3 máy (baseline 82/25; bản overlay manual/AI của Hòa 105/25, 95/25), còn config nhánh (configFile) cho 18 Timeout (manual 112/18 ở 4 run, AI 102/18 ở 3 run, kể cả khi concurrency khác nhau: 2 so với 15, và cả npm run lẫn npx có cờ). Ngoại lệ duy nhất là G01-2-cc (97/23, concurrency 15). Các mutant đổi trạng thái đều thuộc loại xóa thân handler hoặc lời gọi trả response (311:67, 315:22, 316:7, 347:5, 510:63, 519:22, 520:7), làm request treo; config quyết định Stryker ghi Killed hay Timeout. Cơ chế chưa kiểm chứng. Các giả thuyết trước (“máy chậm hơn”, “thứ tự test và tải máy”, “concurrency”) không được dữ liệu này ủng hộ. Hệ quả: Timeout vẫn tính là detected nên score gần như không đổi (chênh 74.65% → 74.83% ở baseline đến từ 5 mutant Killed→Timeout và 532:11 RuntimeError→Timeout); khi so run phải so Survived tuyệt đối và ghi rõ config Stryker/Jest kèm số Killed/Timeout.

## Cross Reproduction

| Teammate Domain / Guide | Commands | Result | Missing Step / Issue | Evidence |
|---|---|---|---|---|
| Coupons (S3-I01) — guide `experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md`; Claude Code (claude-opus-5-5), Windows 11, Node v24.15.0, StrykerJS 10.0.0, Jest 30.5.2 | I01-1-cc (EShop `806ba19`, detached): `npm ci`; `npm run test:coupons`; `npm run mutate:coupons`. I01-2-cc / I01-3-cc (giải nén `frozen-input.zip` vào `Repo/_tmp/I01-coupons/`, overlay 7 file `sources/backend/`): 4 lệnh mục Reproduction (`node node_modules/jest/bin/jest.js --config jest.coupons.{manual,ai}.config.cjs --runInBand`; `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.{manual,ai}.config.json`) | I01-1-cc: 26/26 pass; 120 mutants — Killed 39, Timeout 21, Survived 30, NoCoverage 25, RuntimeError 5; 52.17%. I01-2-cc (manual): 35/35 pass; 41/21/28/25/5; 53.91%. I01-3-cc (AI): 40/40 pass; 41/21/28/25/5; 53.91%. So từng mutant với report của Hòa: 120/120 khớp khóa, 0 mutant đổi trạng thái (Killed↔Timeout 0), tập Survived trùng ở cả 3 cặp | (1) Archive không có `node_modules`; lệnh Reproduction đầu tiên báo `Error: Cannot find module '...\_tmp\I01-coupons\backend\node_modules\jest\bin\jest.js'` (`MODULE_NOT_FOUND`). Xử lý: `npm ci` trong `_tmp/I01-coupons/backend` (lockfile trong archive), rồi chạy lại. (2) Stryker dry run đếm test 2 lần: 52 (= 2×26), 70 (= 2×35), 80 (= 2×40), như Hòa đã ghi. (3) Mỗi Stryker run có 10 dòng `WARN ChildProcessProxy ... exit code 3221225477`; log AI của Hòa cũng có 10 | `experiments/s3/runs/Tan_Hiep/I01-{1,2,3}-cc/`, `I01-cc-compare/`, `I01-cc-REPORT.md` |
| Coupons (S3-I01) — Tấn Hiệp tự chạy (executor: Tấn Hiệp), cùng guide | I01-1: EShop `npm run test:coupons`; `npm run mutate:coupons` (report ghi ở `eshop-sut_.../backend/reports/coupons/`). I01-2 / I01-3: 4 lệnh mục Reproduction trong runtime `Repo/_tmp/I01-coupons/backend` (report ở `reports/coupons-manual/`, `reports/coupons-ai/`). console.log chỉ chứa output, không ghi lại dòng lệnh; lệnh nguyên văn trong I01-cc-REPORT.md (nguồn: phiên thảo luận claude.ai 2026-10-23 10:52, Tấn Hiệp xác nhận; khớp reflog) | I01-1: 26/26 pass; 120 mutants — Killed 39, Timeout 21, Survived 30, NoCoverage 25, RuntimeError 5; 52.17%. I01-2 (manual): 35/35 pass; 41/21/28/25/5; 53.91%. I01-3 (AI): 40/40 pass; 41/21/28/25/5; 53.91%. So từng mutant với report của Hòa và với I01-{1,2,3}-cc: 120/120 khớp khóa, 0 mutant đổi trạng thái (Killed↔Timeout 0), tập Survived trùng ở cả 6 cặp | Stryker dry run đếm test 2 lần: 52, 70, 80. Mỗi Stryker run có 10 dòng `WARN ChildProcessProxy ... exit code 3221225477` | `experiments/s3/runs/Tan_Hiep/I01-{1,2,3}/`, `I01-cc-compare/i01_comparison.md`, `I01-cc-REPORT.md` |

### S3-I01 — Three shared mutant cases

**Case 1 — L474: kill mới duy nhất của manual/AI (`missing-assertion`).**

| Mutant | I01-1 (baseline) | I01-2 (manual) killedBy | I01-3 (AI) killedBy |
|---|---|---|---|
| L474:7 ConditionalExpression `max_uses_per_user \|\| 1` => `true` | Survived | MF-01 Admin input limit 3 is persisted as 3 | AI: admin limit 2 persists and controls the per-user boundary |
| L474:7 LogicalOperator => `max_uses_per_user && 1` | Survived | MF-01 (như trên) | AI (như trên) |

Baseline chỉ tạo coupon với `max_uses_per_user = 1` (CP-15). Khi giá trị đầu vào bằng 1, trong tham số câu lệnh INSERT của `POST /api/admin/coupons` (`[code, type, discount_value, min_order_amount, expired_at, max_uses_per_user || 1]`), cả code gốc lẫn 2 mutant đều cho ra kết quả bằng 1: code gốc `1 || 1 = 1`, mutant `true` được SQLite lưu thành `1`, còn mutant `&&` cho `1 && 1 = 1`. Vì vậy không test nào của baseline phân biệt được. Chỉ cần truyền một giới hạn khác 1 (manual dùng 3 ở MF-01, AI dùng 2) rồi kiểm tra giá trị đã lưu cùng ranh giới số lần dùng (FR-17, FR-09 C5) là kill được cả hai. Đây là **2 mutant ở cùng một vị trí, cùng một nguyên nhân gốc**, không phải 2 lỗi độc lập. Hai mutant này cũng là toàn bộ chênh lệch làm giảm Survived giữa baseline và hai bộ mở rộng (30 => 28). Các test mở rộng còn lại kiểm thêm hành vi nhưng không kill thêm mutant nào.

**Case 2 — L379, L382: mutant sửa lỗi ở biên (`defect-fixing`), cùng loại với 550:11 của Cart.**

| Mutant | Spec | Code gốc tại biên | Mutant | Trạng thái (cả 3 run) |
|---|---|---|---|---|
| L379:11 `total_amount > min` => `>=` | FR-09 C3: tổng **>=** `min_order_amount` | tổng = min bị từ chối (sai spec) | chấp nhận (đúng spec) | Survived |
| L382:13 `expiry < now` => `<=` | FR-09 C2: hiện tại phải **trước** `expired_at` | đúng lúc hết hạn vẫn được dùng (sai spec) | từ chối (đúng spec) | Survived |

Các test baseline chỉ thử hai phía quanh biên (CP-02: `total_amount` bằng `min - 1`; CP-05/CP-06: đồng hồ đóng băng 1 ms trước và 1 ms sau `expired_at`), không thử đúng điểm biên. Tại các điểm biên này, code gốc và mutant cho kết quả giống nhau. Nếu viết test đúng spec tại điểm biên (CD-01 tổng đúng bằng min, CD-03 đúng lúc hết hạn), test case sẽ fail ngay trên code gốc, nên Hòa đã để chúng trong `test/defects/coupons.defects.js`, ngoài baseline. Muốn kill 2 mutant này thì phải assert theo bug của code gốc (tức là "khóa cứng" bug bằng test). Giống 550:11 (DEF-05) ở Cart: survivor không phải lúc nào cũng là dấu hiệu test yếu.

**Case 3 — L367, L376, L383, L392: error body => `{}` (oracle không có trong spec). Mức độ chặt của oracle giữa hai domain.**

Mutant (`ObjectLiteral → {}`; L367/L376/L383 còn có `StringLiteral → ""`) giữ nguyên status 4xx nhưng xóa thông báo lỗi. Các test baseline ngoài check status còn assert `not.toHaveProperty('discount_amount')`, nhưng assertion này vẫn không phân biệt được `{}` nên mutant vẫn Survived ở cả 3 run. Riêng CP-02 của Hòa có assert `res.body.error` kiểu String, nhưng tài liệu spec chỉ quy định response thành công chứ không cố định nội dung chi tiết của thông báo lỗi.

Cả hai domain không hoàn toàn quyết định ngược nhau mà chỉ khác nhau về mức độ chặt của oracle. Ở Coupons, chỉ CP-02 (nhánh dưới ngưỡng) yêu cầu trường error kiểu String; các nhánh L367/L376/L383/L392 không có assertion nào về body lỗi nên mutant sống; trong khi ở Cart, manual test assert nguyên văn chuỗi lỗi trong code (`{ error: "Order not found" }`), còn AI assert `body.error` là chuỗi không rỗng. Lấy oracle chặt từ code thì score cao hơn nhưng test bị gắn chặt vào cách cài đặt hiện tại. Không kill thì giữ được tính độc lập với code nhưng để lại survivor. Cách đúng hơn là bổ sung hợp đồng lỗi vào spec, rồi mới assert.

**Cách tái lập:** `python -I I01-cc-compare/i01_compare.py --member …` (xem REPORT); dòng mutant ở trên đọc từ `I01-{1,2,3}/mutation.json` => `status`, `killedBy`, `coveredBy`.