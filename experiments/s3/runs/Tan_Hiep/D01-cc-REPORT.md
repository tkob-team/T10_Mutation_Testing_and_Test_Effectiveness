# S3-D01 Run Report — Cart & Orders (Claude Code)

## Summary

| Field | Value |
|---|---|
| Task ID | S3-D01 (Cart & Orders) |
| Runs | D01-1-cc, D01-2-cc, D01-3-cc |
| Executor | Claude Code (model `claude-opus-5-5`), không phải run chính thức của Tấn Hiệp |
| Date | 2026-10-22, 19:52–19:53 (+07:00) |
| OS | Windows 11 Home Single Language 10.0.26200; shell Git Bash |
| Overall | **Partial** — D01-1-cc và D01-2-cc đúng kỳ vọng; D01-3-cc lệch kỳ vọng (Stryker "No tests were found") |

## Environment

| Item | Value |
|---|---|
| Seminar repo | branch `main`, commit `e0e82a4` (sau `git pull --ff-only` từ `017b080`) |
| EShop repo | branch local `s3/D01-cart-orders` tạo từ `main` @ `92bbf22` (đã up to date) |
| Test input | `S3-D01_cart-orders_tests.zip`, SHA-256 `104ed074dc55c7d778534774882b8d7459155d7cf35e6e872579c3c578a73cbf`, giải nén vào gốc repo EShop |
| Node / npm | v24.15.0 / 11.12.1 |
| Jest | 30.5.2 |
| StrykerJS | 10.0.0 (`@stryker-mutator/core`, `@stryker-mutator/jest-runner`) |
| Stryker config | `backend/stryker.cart-orders.config.json`: `testRunner: jest`, `coverageAnalysis: perTest`, `mutate: ["server.js:280-349", "server.js:510-568"]`, `tempDirName: .stryker-tmp` |

Bản sao file test/config đã dùng (chưa nằm trong commit SUT): `D01-1-cc/inputs/backend/`.

Preflight: cả hai repo sạch trước khi làm. `npm install` (log: `D01-1-cc/npm-install.log`) cài 537 packages, báo 25 vulnerabilities; **không** chạy `npm audit fix`.

## Runs

### D01-1-cc — baseline tests

- Command (trong `backend/`): `npm test` (= `jest`)
- Result: **36 passed / 36**, 1 suite, exit 0. Khớp kỳ vọng.
- Evidence: `D01-1-cc/console.log`

### D01-2-cc — defect tests

- Command: `npm run test:defects` (= `jest --testMatch "**/test/defects/*.defects.js"`)
- Result: **8 failed / 8**, exit 1. Khớp kỳ vọng (mọi test đúng spec fail trên code gốc).
- Evidence: `D01-2-cc/console.log`

| DEF | Spec | Assertion fail đầu tiên | Expected | Received | Lý do fail (hành vi code gốc) |
|---|---|---|---|---|---|
| DEF-01 | FR-07 | `cart.body` toEqual 1 dòng `quantity: 3` | 1 dòng, quantity 3 | 2 dòng cùng `id: 4` (quantity 2 và 1) | Thêm lại cùng sản phẩm tạo dòng mới thay vì cộng số lượng |
| DEF-02 | FR-08 | `orders.total_amount` toBe 12000000 | 12000000 | 1 | Backend lưu `total_amount` client gửi, không tự tính lại từ giỏ |
| DEF-03 | FR-08 | `GET /api/cart` toEqual `[]` sau checkout | `[]` | giỏ vẫn còn item id 4 × 2 | Checkout thành công không xóa giỏ hàng |
| DEF-04 | FR-10, FR-20 | status hủy đơn `shipping` toBe 400 | 400 | 200 | User hủy được đơn đang `shipping` |
| DEF-05 | FR-10 | status `canceled → delivered` toBe 400 | 400 | 200 | Admin chuyển được đơn `canceled` (trạng thái kết thúc) sang `delivered` |
| DEF-06 | FR-12, SEC-03 | status `PUT /api/admin/orders/:id/status` bằng token user ∈ [401, 403] | 401 hoặc 403 | 200 | API admin đổi trạng thái không kiểm tra `role = 'admin'` |
| DEF-07 | FR-12, SEC-03 | status `GET /api/admin/orders` bằng token user ∈ [401, 403] | 401 hoặc 403 | 200 | API admin liệt kê đơn không kiểm tra `role = 'admin'` |
| DEF-08 | §4 header, FR-11 | status `GET /api/orders/:id` không token toBe 401 | 401 | 200 | Xem chi tiết đơn không yêu cầu token |

Ghi chú DEF-08: Jest dừng ở assertion đầu tiên (anonymous → 200), nên assertion thứ hai (user khác xem đơn → 403/404) **chưa được thực thi** trong run này; chưa có evidence về kiểm tra ownership. Tương tự DEF-04/05/06 dừng ở assertion status, assertion DB state phía sau chưa chạy.

### D01-3-cc — Stryker dry run

- Command: `npx stryker run stryker.cart-orders.config.json --dryRunOnly`
- Result: **FAIL, exit 1** — lệch kỳ vọng. Stryker instrument 150 mutants trong `server.js`, sau đó:
  ```
  INFO DryRunExecutor No tests were found
  ERROR Stryker No tests were executed. Stryker will exit prematurely. Please check your configuration.
  ConfigError: No tests were executed. Stryker will exit prematurely. Please check your configuration.
  ```
- Không có `reports/cart-orders/mutation.html|json` (dry run fail trước khi report). Killed/Survived/... : **Not run**.
- Evidence: `D01-3-cc/console.log`

#### Diagnosis (chỉ để chẩn đoán, không phải run chính thức)

Không sửa test hay config. Hai lần chạy chẩn đoán bổ sung:

1. `npx stryker run stryker.cart-orders.config.json --dryRunOnly --logLevel debug --concurrency 1` → `D01-3-cc/diagnostic-debug.log`. Kết quả: 4 file `test/**` đều được đọc vào sandbox; Jest config trong sandbox đúng (`setupFiles` isolate.js, `testMatch: <rootDir>/test/**/*.test.js`), nhưng `rootDir` = `backend\.stryker-tmp\sandbox-XXXX` — đường dẫn chứa thư mục bắt đầu bằng dấu chấm. Vẫn "No tests were found".
2. `npx stryker run stryker.cart-orders.config.json --dryRunOnly --tempDirName stryker-tmp` (CLI override, file config không đổi) → `D01-3-cc/diagnostic-tempdir-override.log`. Kết quả: `Initial test run succeeded. Ran 36 tests in 1 second (net 463 ms, overhead 702 ms).`, exit 0.

Kết luận tạm (Proposed, chưa xác minh trong tài liệu Jest/Stryker): với Jest 30, `testMatch` dạng glob không khớp file khi `rootDir` nằm dưới thư mục dot (`.stryker-tmp`), nên đổi `tempDirName` sang tên không có dấu chấm (hoặc dùng `testRegex` / `roots`) sẽ cho dry run chạy được 36 tests. Đây là quyết định config cần Tấn Hiệp chốt; Claude Code **chưa sửa** `stryker.cart-orders.config.json`.

Ghi chú phụ cho lần chạy override: ProjectReader báo "Found 1 of 33 file(s)" (thay vì 11) vì sandbox cũ trong `backend/.stryker-tmp/` (do 2 lần chạy fail để lại) không còn bị ignore khi `tempDirName` đổi. Nếu áp dụng cách sửa này, nên xóa `.stryker-tmp/` cũ trước khi chạy. Thư mục `stryker-tmp/` đã được Stryker tự xóa sau run thành công.

## Deviations

| Run | Expected | Actual | Handling |
|---|---|---|---|
| D01-3-cc | `Initial test run succeeded. Ran 36 tests` | `No tests were found` → ConfigError, exit 1 | Ghi nguyên trạng; chẩn đoán bằng 2 run phụ; không sửa test/config |
| npm install | — | `backend/package-lock.json` bị cập nhật (zip không kèm lockfile mới cho devDependencies) | Để nguyên ở working tree, cần Tấn Hiệp quyết định commit cùng package.json |

## Repository State (uncommitted)

`backend/database.sqlite` **không đổi** sau mọi run (isolate.js mở `:memory:`), không cần restore.

EShop repo, branch `s3/D01-cart-orders`:

```
 M backend/package-lock.json
 M backend/package.json
?? backend/stryker.cart-orders.config.json
?? backend/test/
```

`backend/.stryker-tmp/` (sandbox của 2 run fail) còn trên đĩa, đã được `.gitignore` bỏ qua.

Seminar repo, branch `main`:

```
?? experiments/s3/runs/Tan_Hiep/D01-1-cc/
?? experiments/s3/runs/Tan_Hiep/D01-2-cc/
?? experiments/s3/runs/Tan_Hiep/D01-3-cc/
?? experiments/s3/runs/Tan_Hiep/D01-cc-REPORT.md
```

Không commit, không push. Không sửa `server.js`, `database.js`, Experiment Log, AI Record.

## AI Usage (cho AI Record)

- Tool: Claude Code, model `claude-opus-5-5`, skills `t10-run-report`, `t10-mutation-testing`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-D01 (Cart & Orders). Dùng skill t10-run-report và t10-mutation-testing.
  >
  > 1. Dùng 2 repo có sẵn trong thư mục này; git status, nếu sạch thì git pull --ff-only.
  > 2. Repo EShop: tạo nhánh local s3/D01-cart-orders, giải nén S3-D01_cart-orders_tests.zip (ở thư mục này) vào gốc repo EShop. Zip có sẵn backend/, sẽ thay backend/package.json.
  > 3. Trong backend: npm install, rồi chạy 3 run:
  >    - D01-1-cc: npm test → kỳ vọng 36 passed
  >    - D01-2-cc: npm run test:defects → kỳ vọng 8 failed (DEF-01…08, xem test/defects/)
  >    - D01-3-cc: npx stryker run stryker.cart-orders.config.json --dryRunOnly → kỳ vọng "Initial test run succeeded. Ran 36 tests"
  > 4. Lưu evidence vào repo seminar: experiments/s3/runs/Tan_Hiep/<Run_ID>/. Với D01-2-cc, ghi lý do fail của từng DEF.
  > 5. Kiểm tra git status cả 2 repo; database.sqlite không được đổi.
  >
  > Không commit, không push, không sửa server.js/database.js. Kết quả khác kỳ vọng thì ghi lại nguyên trạng, đừng sửa test cho khớp. Viết REPORT.md và báo cáo ngắn.

- Output chính: 3 run như trên; bảng lý do fail DEF-01…08 đối chiếu README FR-07/08/10/11/12/20, SEC-03; chẩn đoán D01-3-cc (dot-directory `tempDirName`) kèm 2 log chẩn đoán. Verdict của Tấn Hiệp: Pending.

---

## Follow-up 2026-10-22 — D01-4-cc, D01-5-cc (sau D01-Q7, D01-Q8)

| Field | Value |
|---|---|
| Executor | Claude Code (model `claude-opus-5-5`), không phải run chính thức của Tấn Hiệp |
| Date | 2026-10-22, 20:14 (+07:00) |
| Overall | **Done** — cả hai run đúng kỳ vọng |
| Preflight | Seminar `main` @ `e0e82a4`, EShop `s3/D01-cart-orders` @ `92bbf22`; cả hai đang bẩn do task trước và docs mới của Tấn Hiệp (tiếp tục cùng task, không pull). Docs mới đã có: `Experiment_Log_Tan_Hiep.md` chứa `D01-Q7`, `AI_Record_Tan_Hiep.md` chứa `AI-S3-WF-01` |
| Versions | Như phần đầu (Node v24.15.0, npm 11.12.1, Jest 30.5.2, StrykerJS 10.0.0) |

### Changes theo quyết định D01-Q7, D01-Q8 (EShop)

- `backend/stryker.cart-orders.config.json`: `"tempDirName": ".stryker-tmp"` → `"tempDirName": "stryker-tmp"`.
- `.gitignore` (gốc repo): thêm `stryker-tmp/` ngay dưới `.stryker-tmp/`.
- Xóa `backend/.stryker-tmp/` (2 sandbox cũ của D01-3-cc và run chẩn đoán).
- `backend/test/defects/cart-orders.defects.js`: tách DEF-08 thành `DEF-08a spec §4 header, SEC-02` (không token → 401) và `DEF-08b FR-11` (token user khác → 403 hoặc 404). Assertion giữ nguyên như bản gộp; mỗi test tự tạo owner/đơn riêng. Không sửa test khác.

Sự cố khi xóa `backend/.stryker-tmp/`: mỗi sandbox chứa junction `node_modules` trỏ tới `backend/node_modules` thật. Lệnh `rmdir` gỡ junction trước bị lỗi đường dẫn ("The system cannot find the path specified"), sau đó `rm -rf .stryker-tmp` (Git Bash) vẫn chạy. Đã kiểm tra: `npm ls --depth=0` đủ 9 dependencies, `npm install --dry-run` báo `up to date`, nên `node_modules` thật không bị mất. Hai run dưới chạy trên `node_modules` này.

### D01-4-cc — defect tests sau khi tách DEF-08

- Command (trong `backend/`): `npm run test:defects`
- Result: **9 failed / 9**, exit 1. Khớp kỳ vọng.
- Evidence: `D01-4-cc/console.log`

| DEF | Expected | Received |
|---|---|---|
| DEF-01 … DEF-07 | như D01-2-cc | giống hệt D01-2-cc (xem bảng D01-2-cc) |
| DEF-08a | 401 | 200 — `GET /api/orders/:id` không token vẫn thành công |
| DEF-08b | 403 hoặc 404 | 200 — user khác xem được chi tiết đơn |

Ghi chú: DEF-08b chỉ assert status; run này chứng minh status 200, **chưa** có assertion nào chứng minh body trả về đúng là đơn của owner. DEF-04/05/06 vẫn dừng ở assertion status, assertion DB state phía sau chưa chạy (không đổi so với D01-2-cc).

### D01-5-cc — Stryker dry run với `tempDirName: "stryker-tmp"`

- Command: `npx stryker run stryker.cart-orders.config.json --dryRunOnly`
- Result: **Pass**, exit 0: `Initial test run succeeded. Ran 36 tests in 1 second (net 426 ms, overhead 705 ms).` và `The dry-run has been completed successfully. No mutations have been executed.`
- Dry run không chạy mutant nên không có `reports/cart-orders/mutation.json|html`; Killed/Timeout/Survived/NoCoverage/RuntimeError/Ignored/score: **Not run** (thuộc run mutation đầy đủ sau này).
- `backend/stryker-tmp/` được Stryker tự xóa sau run.
- Evidence: `D01-5-cc/console.log`

### Repository State

`backend/database.sqlite` không đổi sau cả hai run.

Docs seminar cập nhật theo prompt (chỉ các chỗ sau):

- `experiments/s3/Experiment_Log_Tan_Hiep.md`: cột Result của D01-4-cc, D01-5-cc; cột Actual Result của DEF-08a, DEF-08b.
- `ai-audit/AI_Record_Tan_Hiep.md`: AI-S3-D01-02, khối Verbatim Prompt = prompt nguyên văn ở mục AI Usage phía trên.

Commit (không push): xem khối báo cáo trong chat / `git log` của hai repo.

### Presentation Notes

- Lỗi `No tests were found` không phải do test sai mà do môi trường: Jest không nhận test khi sandbox của Stryker nằm trong thư mục bắt đầu bằng dấu chấm. Dry run xanh là điều kiện để Stryker chạy mutant.
- Tách DEF-08 cho thấy một test fail chỉ chứng minh assertion fail đầu tiên; muốn có evidence cho từng yêu cầu thì mỗi yêu cầu một test.

### AI Usage (follow-up)

- Tool: Claude Code, model `claude-opus-5-5`, skills `t10-run-report`, `t10-mutation-testing`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Tiếp S3-D01. Dùng skill t10-run-report và t10-mutation-testing. Task này ĐƯỢC commit, KHÔNG push.
  >
  > 0. Kiểm tra repo seminar đã có docs mới: Experiment_Log_Tan_Hiep.md chứa "D01-Q7", AI_Record_Tan_Hiep.md chứa "AI-S3-WF-01". Không có → dừng, báo.
  > 1. Repo EShop, nhánh s3/D01-cart-orders:
  >    - backend/stryker.cart-orders.config.json: "tempDirName": "stryker-tmp"
  >    - .gitignore (gốc repo): thêm dòng stryker-tmp/
  >    - Xóa backend/.stryker-tmp/ nếu còn.
  >    - backend/test/defects/cart-orders.defects.js: tách DEF-08 thành DEF-08a (GET /api/orders/:id không token → 401) và DEF-08b (token user khác → 403 hoặc 404). Không sửa test khác.
  > 2. Chạy: D01-4-cc = npm run test:defects (kỳ vọng 9 failed); D01-5-cc = npx stryker run stryker.cart-orders.config.json --dryRunOnly (kỳ vọng "Ran 36 tests").
  > 3. Cập nhật docs (chỉ các chỗ sau):
  >    - Experiment Log: cột Result của dòng D01-4-cc, D01-5-cc; cột Actual Result của DEF-08a, DEF-08b.
  >    - AI Record, AI-S3-D01-02, khối Verbatim Prompt: chép nguyên văn prompt từ mục AI usage của D01-cc-REPORT.md.
  >    - Ghi lần chạy này vào cuối D01-cc-REPORT.md.
  > 4. Commit:
  >    - EShop (nhánh s3/D01-cart-orders): "test(S3-D01): add Cart & Orders baseline and defect tests with isolated harness"
  >    - Seminar (nhánh hiện tại, báo tên nhánh): "docs(S3-D01): record Cart & Orders tests, defects, decisions and Claude Code runs; clarify F-A01-05"
  > 5. Báo cáo theo khối trong CLAUDE.md, kèm hash 2 commit.

- Output chính: sửa config/.gitignore/defects theo D01-Q7, D01-Q8; D01-4-cc 9/9 failed đúng lý do; D01-5-cc dry run `Ran 36 tests`; cập nhật Experiment Log, AI Record; 2 commit local.
