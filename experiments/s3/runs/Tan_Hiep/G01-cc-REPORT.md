# G01-cc-REPORT — S3-G01 AI assertions (Cart & Orders)

## Run G01-1-cc

### Metadata

- Task ID: S3-G01. Run ID: `G01-1-cc` (raw AI output, chưa review).
- Executor: Claude Code, model `claude-opus-5-5` (Opus 5.5). Nhóm tool: StrykerJS + AI Agent; run này không chạy Stryker.
- Ngày giờ: 2026-10-23T01:59:01+07:00. OS: Windows 11 Home Single Language 10.0.26200.
- EShop: branch `s3/G01-ai`, HEAD trước commit `78745e2`. Seminar: branch `main`, HEAD trước commit `77a3ed2`.
- Versions: Node v24.15.0, npm 11.12.1, Jest 30.5.2. Stryker không chạy, nên không ghi version.

### Inputs đã dùng

- `README.md` (SRS v2.0), `api_specification.md` §4, §6.2.
- `backend/server.js` (dòng 284–349, 510–568), `backend/test/cart-orders.test.js`, `backend/test/helpers/`, `backend/jest.ai.config.js`, `backend/package.json`.
- `experiments/s3/runs/Tan_Hiep/E01-1-cc/mutation.json`: đọc diff, `coveredBy` và tên test.
- Không đọc nhánh `s3/F01-manual`, Experiment Log, `runs/Tan_Hiep/F01-*`, `F01-cc-REPORT.md`, `ai-audit/`. Không đọc `AGENTS.md`, `CONTEXT.md`, `docs/*` hay skill `t10-mutation-testing`, vì các file này có thể chứa kết quả F01 (giữ blind; lệch với preflight chuẩn).

### Lệnh

```
cd eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/backend
npm run test:ai 2>&1 | tee -a <seminar>/experiments/s3/runs/Tan_Hiep/G01-1-cc/test-ai.log
```

Kết quả: **Pass**. Test Suites 2 passed / 2; Tests 41 passed / 41, gồm 36 test baseline và 5 test AI. Exit code 0. Chạy đúng một lần, không sửa test sau khi chạy. Evidence: `G01-1-cc/test-ai.log`. Jest không chạy ở chế độ verbose nên log không liệt kê tên từng test; con số 5 test AI suy ra từ 41 − 36 (theo E01-1-cc, baseline có 36 test).

Sau khi chạy, `git status` của EShop chỉ có `backend/test/ai/cart-orders.ai.js`; `backend/database.sqlite` không đổi (`isolate.js` dùng `:memory:`), nên không cần `git restore`.

### Bảng 6 mutant

Test ID trong cột 1 là ID của E01-1-cc trong `mutation.json`. Test AI nằm ở `backend/test/ai/cart-orders.ai.js`.

| Mutant (server.js) | coveredBy (E01) | Vì sao baseline không kill | Test AI / lý do không viết | Oracle | Code gốc |
| --- | --- | --- | --- | --- | --- |
| 286:7 ConditionalExpression → `false` (GET /api/cart không khởi tạo giỏ) | 1, 2, 4 (CO-02, CO-03, CO-05) | Với user mới, mutant trả `res.json(undefined)` nhưng status vẫn 200. Ở CO-03 thì POST đã khởi tạo giỏ trước đó. Baseline chỉ assert status. | AI-CO-01: user mới GET /api/cart → 200, body là mảng và `toEqual([])` | FR-07 và §4.1 (giỏ trống). Dạng `[]` lấy từ code (server.js:286–287) vì spec không mô tả response | Pass |
| 292:7 ConditionalExpression → `true` (POST /api/cart luôn reset giỏ) | 2, 3, 4, 6 (CO-03, CO-04, CO-05, CO-07) | Mỗi lần POST vẫn trả 200. Không test nào đọc lại nội dung giỏ sau 2 lần thêm. | AI-CO-02: thêm itemA và itemB rồi GET → độ dài 2, chứa cả hai item (không giả định thứ tự) | FR-07 và body §4.2. Dạng mảng item lấy từ code (server.js:293) | Pass |
| 326:47 ObjectLiteral → `{}` (cancel 404 body rỗng) | 15, 16 (CO-14, CO-15) | Status 404 giữ nguyên. Baseline không đọc body. | AI-CO-03: cancel đơn 999999 → 404, `body.error` là string không rỗng | Oracle yếu: SRS/spec không định nghĩa body 404. Lấy theo FR-10 "trả về lỗi với thông báo phù hợp" (áp dụng mở rộng sang lỗi không tìm thấy); tên trường `error` lấy từ code | Pass |
| 346:45 ObjectLiteral → `{}` (GET order detail 404 body rỗng) | 9 (CO-10) | Status 404 giữ nguyên. Baseline không đọc body. | AI-CO-04: GET /api/orders/999999 → 404, có `body.error` | Như dòng trên (§4.5; trường `error` lấy từ code) | Pass |
| 532:47 ObjectLiteral → `{}` (admin status 404 body rỗng) | 35 (CO-19) | Status 404 giữ nguyên. Baseline không đọc body. | AI-CO-05: admin PUT status cho đơn 999999 → 404, có `body.error` | Như dòng trên (FR-18, §6.2; trường `error` lấy từ code) | Pass |
| 550:11 ConditionalExpression → `false` (bỏ cạnh canceled → delivered) | 18–34 (CO-17, CO-18) | Mutant chỉ đổi hành vi khi `currentStatus = canceled` và `status = delivered`. Baseline cố ý không test cạnh này: code trả 200, đúng spec phải 400 (DEF-05, nằm ở `test/defects/`). | **Không viết.** Mutant biến 200 thành 400, tức là làm code đúng spec. Test kill được mutant phải assert canceled → delivered = 200, trái FR-10 (canceled là trạng thái kết thúc). Test đúng spec (400) lại fail trên code gốc. Không có hành vi quan sát được nào khác bị mutant thay đổi. | FR-10 (final states) | N/A |

### Lệch / bất thường

- 3 test 404 (AI-CO-03..05) dựa trên oracle một phần lấy từ code (tên trường `error`). Phiên thảo luận cần quyết định khi review có chấp nhận oracle này hay không.
- AI-CO-01 và AI-CO-02 assert dạng mảng, lấy từ code. Spec §4.1 không mô tả response.
- Mutant 550:11 là "bug-masking mutant": nó sửa đúng defect DEF-05. Không viết được test vừa đúng spec vừa pass trên code gốc. Mutant này chỉ bị kill bởi test trong `test/defects/` (ngoài baseline).
- Header có sẵn của `cart-orders.ai.js` ghi "(đã review)". Tôi giữ nguyên header và thêm comment khối ghi rõ đây là raw G01-1-cc, chưa review.
- Ngoài phạm vi, chưa kiểm chứng bằng test: `GET /api/orders/:id` (server.js:344) không có `authenticateToken`, có khả năng vi phạm SEC-02 / FR-11. Tôi không viết test cho điểm này.

### Limits

- Session G01 trước đó bị dừng ở preflight vì lệnh `git log --oneline -1` in ra 2 subject commit của F01 (không có assertion hay số liệu). **Lưu ý: G01-1-cc chạy tiếp trong chính session đó, không phải session mới mở.** EShop đã được checkout sẵn `s3/G01-ai`. Thông tin đã lộ chỉ gồm hai subject: `docs(S3-F01): fix spec reference and oracle note in manual suite` và `docs(S3-F01): fill comparison table for baseline and manual runs`. Không có nội dung test, diff hay số liệu nào của F01 lọt vào session.
- Raw output, chưa review. Chưa chạy Stryker nên chưa biết các test có thực sự kill mutant hay không (E-run tiếp theo).

### Files

- EShop: `backend/test/ai/cart-orders.ai.js` (thêm 5 test).
- Seminar: `experiments/s3/runs/Tan_Hiep/G01-1-cc/test-ai.log`, `experiments/s3/runs/Tan_Hiep/G01-cc-REPORT.md`.

### Ghi chú thuyết trình

1. Baseline chỉ assert status, nên các mutant làm đổi body hoặc state mà giữ nguyên status đều sống. Thêm assertion lên body/state là cách kill trực tiếp nhất.
2. Không phải survivor nào cũng nên kill: 550:11 sống vì code gốc sai spec. Kill nó đồng nghĩa với việc khóa cứng bug bằng test.
3. Oracle lấy từ code (dạng `[]`, trường `error`) là rủi ro: test như vậy chỉ xác nhận hành vi hiện tại, không chứng minh code đúng spec.

### AI usage

- AI log: `ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md` (hook Stop ghi; tôi không mở file này để giữ blind).


---

## Run G01-2-cc

### Metadata

- Task ID: S3-G01. Run ID: `G01-2-cc` (AI assertions sau spec review, mutation run). Yêu cầu blind đã hết theo prompt.
- Executor: Claude Code, model `claude-opus-5-5`; không phải run chính thức của Tấn Hiệp.
- Ngày giờ: 2026-10-23T02:05:04+07:00 (`test:ai`), 02:05:11–02:05:42 (Stryker `Done in 30 seconds`). OS: Windows 11 Home Single Language 10.0.26200.
- EShop: `s3/G01-ai` @ `f4696c6` (chưa push). Seminar: `main`; commit log hook trước task `3dc7ae1`.
- Versions: Node v24.15.0, npm 11.12.1, Jest 30.5.2, StrykerJS 10.0.0.

### Comment-only Edit (commit `f4696c6`)

`backend/test/ai/cart-orders.ai.js`: dòng 1 bỏ "(đã review)"; dòng 2 thành provenance G01-1-cc (session blind một phần); comment "AI assertions đã review đặt ở đây." và khối "G01-1-cc — raw AI assertions … CHƯA review" thay bằng ghi chú spec review 2026-10-23. Kiểm `git diff`: không dòng nào ngoài comment thay đổi; assertion giữ nguyên.

### Commands

1. `npx jest --config jest.ai.config.js --listTests` → `test/cart-orders.test.js`, `test/ai/cart-orders.ai.js` (`G01-2-cc/listTests.log`).
2. `npm run test:ai` → **41/41 passed**, 2 suites, exit 0 (`G01-2-cc/test-ai.log`).
3. `npm run mutate:cart-orders:ai` → exit 0; `G01-2-cc/console.log`, `mutation.html`, `mutation.json`. Stryker tự dọn `stryker-tmp/`.

So sánh sinh bằng `G01-2-cc/compare_runs.py` → `G01-2-cc/compare_runs.md` (đếm từ `mutation.json`; mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement).

### Status Counts

| Run | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Score | Covered |
|---|---|---|---|---|---|---|---|---|---|---|
| E01-1-cc | 150 | 87 | 19 | 34 | 2 | 8 | 0 | 0 | 74.65 | 75.71 |
| F01-2-cc | 150 | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 90.91 | 92.20 |
| G01-2-cc | 150 | 97 | 23 | 21 | 2 | 7 | 0 | 0 | 83.92 | 85.11 |

Cùng tập mutant ở cả 3 run: có (150 / 150 / 150).

Định nghĩa: score = Detected / Valid × 100, Detected = Killed + Timeout, Valid = tổng − RuntimeError − CompileError. Timeout tính vào Detected theo tool, không phải assertion kill.

### E01-1-cc Survived/NoCoverage → G01-2-cc Killed

13 mutants. `killedBy` lấy từ `mutation.json` của G01-2-cc; cột F01-2-cc để đối chiếu.

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc | killedBy (G01-2-cc) |
|---|---|---|---|---|---|
| 286:7 | BooleanLiteral | `userCarts[userId]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 286:7 | ConditionalExpression | `false` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 286:7 | ConditionalExpression | `true` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 286:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 292:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 293:3 | CallExpression | `;` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 326:56 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 346:54 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 532:56 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |

2 NoCoverage của E01-1-cc vẫn NoCoverage ở G01-2-cc.

### Other Status Changes (E01-1-cc → G01-2-cc)

| Line:Col | Mutator | Replacement | E01-1-cc | G01-2-cc | F01-2-cc |
|---|---|---|---|---|---|
| 311:67 | BlockStatement | `{}` | Timeout | Killed | Killed |
| 347:5 | CallExpression | `;` | Killed | Timeout | Killed |
| 510:63 | BlockStatement | `{}` | Killed | Timeout | Killed |
| 519:22 | BlockStatement | `{}` | Killed | Timeout | Killed |
| 520:7 | CallExpression | `;` | Killed | Timeout | Killed |
| 532:11 | BooleanLiteral | `order` | RuntimeError | Timeout | Timeout |

### Killed Overlap (F01-2-cc vs G01-2-cc)

- Killed ở cả hai: 97
- Killed ở F01-2-cc nhưng không Killed ở G01-2-cc: 15
- Killed ở G01-2-cc nhưng không Killed ở F01-2-cc: 0

### Target Mutants (6)

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc | killedBy (F01-2-cc) | G01-2-cc | killedBy (G01-2-cc) |
|---|---|---|---|---|---|---|---|
| 286:7 | ConditionalExpression | `false` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 550:11 | ConditionalExpression | `false` | Survived | Survived | — | Survived | — |

Trên 6 mutant mục tiêu, manual và AI cho cùng kết quả: kill 5/6, 550:11 Survived ở cả hai (defect-fixing, cả hai nhánh đều không viết test). Khác biệt toàn run (Killed 112 vs 97) đến từ 3 test manual ngoài 6 mục tiêu (cancel, checkout, admin status) — không phải so sánh cùng phạm vi.

### Lệch / bất thường

- 4 mutant Killed ở E01-1-cc nhưng **Timeout** ở G01-2-cc: 347:5 CallExpression, 510:63 BlockStatement, 519:22 BlockStatement, 520:7 CallExpression (F01-2-cc: Killed cả 4). Tổng Killed + Timeout + RuntimeError của G01-2-cc = 127 khác E01 (114) vì có 13 mutant mới bị kill, nên không so tổng được như ở E01. Giả thuyết: giống quan sát Timeout phụ thuộc môi trường (Experiment Log, Limits) — **chưa kiểm chứng**, chưa chạy lại.
- `backend/database.sqlite` không đổi; vẫn `git restore` theo prompt.

### Ghi chú thuyết trình

- Cùng 6 mutant mục tiêu, AI và manual đều kill 5/6 và đều không kill được 550:11 vì mutant đó sửa lỗi gốc; score toàn run khác nhau chủ yếu do số test khác nhau, nên phải so trên cùng tập mutant.
- Score AI-assisted (83.92%) có 23 Timeout; tách Timeout khỏi assertion kill khi trình bày.

### AI usage (G01-2-cc)

- Tool: Claude Code, model `claude-opus-5-5`, skill `t10-run-report`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-G01 — spec review xong, run G01-2-cc (skill t10-run-report). Hết yêu cầu blind.
  > 1. EShop s3/G01-ai, backend/test/ai/cart-orders.ai.js: CHỈ sửa comment, không đụng assertion.
  >    - Dòng 1: bỏ "(đã review)". Dòng 2 → "Sinh bởi Claude Code (claude-opus-5-5) ở G01-1-cc; session blind một phần (lộ 2 subject commit F01, xem G01-cc-REPORT.md)."
  >    - "// AI assertions đã review đặt ở đây." và khối "CHƯA review" → "Spec review 2026-10-23 (Tấn Hiệp + phiên thảo luận): giữ 5/5 test, không sửa assertion; oracle một phần lấy từ code (dạng [], trường error) đã ghi ở từng test; 550:11 không viết (defect-fixing)."
  >    Commit: test(S3-G01): mark AI assertions as reviewed and fix provenance header
  > 2. npm run test:ai (phải pass) → npm run mutate:cart-orders:ai → lưu console.log, mutation.html, mutation.json vào runs/Tan_Hiep/G01-2-cc/.
  > 3. G01-cc-REPORT.md, thêm mục G01-2-cc: số Killed/Timeout/Survived/NoCoverage/RuntimeError/score; mutant Survived/NoCoverage ở E01-1-cc → Killed ở G01-2-cc kèm killedBy; bảng 6 mutant mục tiêu: trạng thái ở F01-2-cc vs G01-2-cc, killedBy mỗi bên.
  > 4. Experiment_Log_Tan_Hiep.md:
  >    - AI Runs: 1 dòng artifact G01-01 (raw 5 test, assertion không sửa; spec review như bước 1; kết quả code gốc; kết quả mutant; evidence).
  >    - Comparison: điền dòng AI-assisted (G01-2-cc). Ghi chú: AI = baseline 36 + AI 5; Manual có 8 test, 3 test ngoài 6 mutant mục tiêu, nên so sánh công bằng là trên 6 mutant mục tiêu (xem G01-cc-REPORT.md).
  >    - Thêm dòng G01-1-cc, G01-2-cc vào bảng Runs.
  > 5. git restore backend/database.sqlite. Commit seminar: docs(S3-G01): add G01-2-cc mutation run and comparison

- Output chính: commit comment-only `f4696c6`; G01-2-cc (41/41 pass; 150 mutants, 83.92%); `compare_runs.py`/`compare_runs.md`; Experiment Log (AI Runs, Comparison, Runs); 1 commit seminar.
