# Experiment Log

**Document Role:** Working log cá nhân S3; chỉ ghi kết quả chạy thật trên máy Tấn Hiệp. Run do AI Agent chạy có hậu tố `-cc` (Claude Code) và ghi executor; Tấn Hiệp chạy lại các run chính thức bằng ID không hậu tố.  
**Stage:** S3  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S3-C01 (Review, 2026-10-22 — C01-7 giải quyết bằng harness D01); S3-D01 (Review, 2026-10-22); S3-E01, S3-F01, S3-G01, S3-H01, S3-I01 (chưa bắt đầu)  
**Domain / Section:** Cart & Orders  
**Evidence Status:** Partial — C01-1 → C01-6 đã chạy; D01-1-cc, D01-2-cc đúng kỳ vọng; D01-3-cc fail (Stryker dry run trên Windows) → quyết định D01-Q7, chạy lại ở D01-5-cc; member runs D01 chưa chạy

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
| C01-7 Seed/reset cho Cart & Orders trong test | Harness S3-D01: `backend/test/helpers/isolate.js`, `app.js` (xem mục D01 — Harness) | D01-1-cc (Claude Code, 2026-10-22): 36/36 pass, `database.sqlite` không đổi → harness hoạt động trong Jest. Member run: Not run. Không còn phụ thuộc S3-D04 | `experiments/s3/runs/Tan_Hiep/D01-tests/` | Tự động: mỗi test file mở DB `:memory:` mới và seed lại; mỗi test dùng user mới |

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
| D01-1 / D01-2 / D01-3 | Tấn Hiệp | `npm test`; `npm run test:defects`; Stryker dry run (cấu hình sau D01-Q7) | 36 passed; 9 failed; `Ran 36 tests` | Not run | `experiments/s3/runs/Tan_Hiep/D01-{1,2,3}/` |

Ghi chú D01-2-cc: mỗi DEF test dừng ở assertion fail đầu tiên. DEF-08 mới chứng minh vế "không token → vẫn trả 200"; vế "token user khác" chưa được chạy tới. Tương tự, assertion kiểm DB state phía sau ở DEF-04/05/06 chưa chạy.

Chạy thử bởi Claude trong sandbox (Linux, Node v22.22.0), **không phải evidence của Tấn Hiệp**: D01-1 36/36 pass (3 lần liên tiếp và `--runInBand`); D01-2 8/8 fail; Stryker full run với sandbox mặc định `.stryker-tmp` chạy được: 150 mutants — Killed 91, Timeout 16, Survived 34, NoCoverage 2, RuntimeError 7, score 74.83%. Số chính thức của baseline lấy ở S3-E01 sau khi S3-D04 chốt.

## Baseline

| Run ID | SUT Commit | Config / Test Set | Command | HTML / JSON / Log | Outcome |
|---|---|---|---|---|---|
| E01-1-cc (Claude Code; baseline domain, trước D04) | `8d60e9b` (EShop, nhánh `s3/D01-cart-orders`) | `backend/stryker.cart-orders.config.json` (`mutate: server.js:280-349, 510-568`, `coverageAnalysis: perTest`, `tempDirName: stryker-tmp`); test set `backend/test/cart-orders.test.js` (36 tests); StrykerJS 10.0.0, Jest 30.5.2, Node v24.15.0, Windows 11 | `cd backend; npx stryker run stryker.cart-orders.config.json` | `experiments/s3/runs/Tan_Hiep/E01-1-cc/` (`mutation.html`, `mutation.json`, `console.log`, `mutants_by_route.md`) | 150 mutants — Killed 87, Timeout 19, Survived 34, NoCoverage 2, RuntimeError 8, CompileError 0, Ignored 0; score 74.65% (Detected 106 / Valid 142); score on covered 75.71%. Khác sandbox Linux trước đó (74.83%: Killed 91, Timeout 16, RuntimeError 7) |
| [S3-E01] | Pending (S3-D04) | — | — | — | Not run |

## Survivors & Manual Assertions

| Mutant ID / Diff | State | Why Survived | Distinguishing Input | Manual Assertion / Test | Original-Code Result | Mutant Result / Evidence |
|---|---|---|---|---|---|---|
| **286:7** <br> `if (!userCarts[userId])` --> `if (false)` | Survived | CO-02 đã gọi `GET /api/cart` nhưng chỉ assert status `200` mà không kiểm tra cấu trúc/nội dung phản hồi (nhãn `missing-assertion`). §4.1 không quy định giỏ trống trả về gì, nên oracle [] là suy luận. | `GET /api/cart` với token của `userId` chưa từng khởi tạo giỏ hàng. | `expect(res.body).toEqual([])` | Not run | Not run |
| **292:7** <br> `if (!userCarts[userId])` --> `if (true)` | Survived | CO-04 đã gọi `POST /api/cart` nhưng bị thiếu assertion kiểm tra giỏ hàng bị reset dữ liệu (nhãn `missing-assertion`). Mutant khiến `userCarts[userId]` luôn bị gán lại thành `[]` trước mỗi lần push, làm mất toàn bộ sản phẩm đã thêm trước đó. | Gọi `POST /api/cart` thêm sản phẩm A (`id: 1`), sau đó tiếp tục gọi `POST /api/cart` thêm sản phẩm B (`id: 2`). Gọi tiếp `GET /api/cart` để kiểm tra. | Kiểm tra trên response của `GET /api/cart` sau lần POST thứ 2: <br> `expect(res.body).toHaveLength(2)` <br> *(Không assert trực tiếp trên response của `POST /api/cart` vì route này chỉ trả về `{ message: "Added to cart" }`)* | Not run | Not run |
| **326:47** <br> `{ error: "Order not found" }` --> `{}` | Survived | Test case hủy đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `PUT /api/orders/99999/cancel` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 326). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Not run | Not run |
| **346:45** <br> `{ error: "Order not found" }` --> `{}` | Survived | Test case truy vấn đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `GET /api/orders/99999` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 346). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Not run | Not run |
| **532:47** <br> `{ error: "Order not found" }` --> `{}` | Survived | Test case admin cập nhật đơn hàng không tồn tại chỉ assert status `404` mà không assert Response Body (nhãn `missing-assertion`). | `PUT /api/admin/orders/99999/status` với `id` đơn hàng không tồn tại. | Oracle chọn: `{ error: "Order not found" }` (Nguồn: Giá trị chuỗi gốc trong `server.js` tại dòng 532). <br> `expect(res.body).toEqual({ error: "Order not found" })` | Not run | Not run |
| **550:11** <br> `if (currentStatus === "canceled" && status === "delivered")` --> `if (false)` | Survived | Đây là lỗi logic thiếu điều kiện chặn ở mã nguồn gốc, không thuộc về thiếu hụt của test case (nhãn `defect-fixing`). | `PUT /api/admin/orders/:id/status` với đơn hàng có trạng thái hiện tại là `canceled` và `status` mới truyền vào là `delivered`. | test đúng spec thì fail trên code gốc (đã ghi thành DEF-05); test pass trên code gốc thì phải assert theo bug, nên không viết. | Not run | Not run |

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
- **Troubleshooting (C01-6):** chạy `npm install` / `node server.js` ở gốc repo EShop → `ENOENT … package.json` và `MODULE_NOT_FOUND … server.js`. Sửa: `cd backend` trước khi chạy. Ghi vào Troubleshooting của User Guide.
- **Failure mode — chạy SUT làm bẩn file đang track (C01-6):** sau `node server.js`, `git status` báo `modified: database.sqlite` vì `database.js` DROP + seed lại DB mỗi lần được require. Nếu vô tình commit, baseline đổi theo dữ liệu chạy thử. Xử lý tạm: `git restore backend/database.sqlite` sau mỗi lần chạy server; trong tests: harness D01 dùng DB `:memory:` nên không chạm file.
- **Quan sát trước baseline (sandbox Claude, cần xác nhận ở S3-E01):** (1) 16 Timeout chủ yếu do BlockStatement xóa thân handler → server không bao giờ trả response, supertest chờ đến timeout — đây là Timeout, không phải assertion kill; (2) 7 RuntimeError do StringLiteral đổi câu SQL thành `""` → `sqlite3` 6.0.1 bị segfault (kiểm riêng: `db.get("", [1], cb)` thoát với mã 139), Stryker loại khỏi score; (3) mutant `if (currentStatus === "canceled" && status === "delivered")` → `false` (L550) làm code **đúng spec hơn**, nên không test đúng spec nào kill được trên code gốc.
- **Troubleshooting (D01-3-cc, Windows):** Stryker dry run với `tempDirName` mặc định `.stryker-tmp` báo `No tests were found`, dù `npm test` pass 36/36 trong repo. Cùng config chạy được trên Linux (sandbox Claude). Đổi `--tempDirName stryker-tmp` (không dấu chấm) thì dry run thành công trên máy Tấn Hiệp. Nguyên nhân chưa xác minh bằng tài liệu Jest/Stryker; giả thuyết của Claude Code: `testMatch` của Jest không khớp đường dẫn đi qua thư mục bắt đầu bằng dấu chấm trên Windows.
- **Failure mode — AI giải thích sai về tool (C01-5):** Claude biện minh test 499.999 bằng mutant `>= 499999`, mutant mà StrykerJS không sinh ra (không có mutator đổi hằng số, SRC-06 trong Research Notes). Assertion vẫn đúng và có ích; lý do thì sai → phải kiểm bằng run, không tin lời giải thích.
- **Environment-dependent Timeout (E01-1-cc vs sandbox Linux):** cùng 150 mutants, E01-1-cc (Windows, Node v24.15.0) so với sandbox Linux của Claude (Node v22.22.0): Killed 87/91, Timeout 19/16, RuntimeError 8/7; tổng ba loại đều là 114. Survived 34 và NoCoverage 2 giống nhau. Giả thuyết: máy chậm hơn nên một số mutant chạm ngưỡng timeout — **chưa kiểm chứng** (chưa so từng mutant vì không có `mutation.json` của run sandbox). Hệ quả: luôn ghi môi trường kèm số Killed/Timeout.

## Cross Reproduction

| Teammate Domain / Guide | Commands | Result | Missing Step / Issue | Evidence |
|---|---|---|---|---|
| Coupons (S3-I01) | — | Not run | — | — |
