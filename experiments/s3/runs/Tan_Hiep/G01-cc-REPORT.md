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
