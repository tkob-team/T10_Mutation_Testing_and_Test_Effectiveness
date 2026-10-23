# S4-F01a — Claude Code REPORT

## F01a-1-cc (2026-10-23)

| Mục | Giá trị |
|---|---|
| Task | S4-F01a (kiểm chứng môi trường cho Verification Notes S4-F01) |
| Executor | Claude Code, model `claude-opus-5-5` |
| Thời gian | 2026-10-23 12:49–12:51 (+07:00) |
| OS | Windows 11 Home Single Language 10.0.26200; shell Git Bash |
| Versions | Node v24.15.0, npm 11.12.1, StrykerJS 10.0.0, Jest 30.5.2 (đo trong worktree 806ba19) |
| Seminar repo | `main` @ `1f93af0` (sau commit `chore(ai-log): update prompt logs`), up to date với `origin/main` |
| EShop repo | clone chính ở `s3/G01-ai` @ `f4696c6` (sạch, không đổi nhánh); `origin/main` @ `69b845a` (Merge pull request #3 from tkob-team/s3/G03-auth) |
| Baseline | worktree detached `806ba19` tại `C:/Users/tanhi/AppData/Local/Temp/claude/D--HK7-Testing-Seminars-Repo/3058f82a-a124-4cce-853c-9bab797d6360/scratchpad/wt-806ba19` |
| Evidence | `experiments/s4/runs/F01a-1-cc/console.log` |

Vị trí evidence: `docs/Task_Output_Map.md` chỉ ghi output S4-F01 là `materials/s4/Verification_Notes_Tan_Hiep.md`; run-dir theo mẫu S4-E02 `experiments/s4/runs/<Run_ID>/`.

### 1. Kiểm `backend/package.json` trên SUT main

Kiểm trên `origin/main` (`69b845a`) bằng `git show` để không đổi nhánh clone chính:

```
git show origin/main:backend/package.json | node -e "JSON.parse(require('fs').readFileSync(0,'utf8'))"
```

Kết quả: **Fail, exit 1** — `SyntaxError: Expected ',' or '}' after property value in JSON at position 1492 (line 25 column 5)`.

Nguyên nhân thấy trực tiếp trong file: dòng 24 `"mutate:auth:ai": "stryker run stryker.auth.ai.config.json"` thiếu dấu phẩy, dòng 25 là `"test:auth:manual": ...`. Hai script auth ai/manual có vẻ đến từ hai nhánh khác nhau được merge (giả thuyết, chưa kiểm bằng git log). Hệ quả: trên `main` hiện tại, mọi lệnh `npm ci` / `npm run ...` trong `backend` sẽ lỗi parse package.json (chưa chạy để xác nhận). Không sửa (không thuộc phạm vi, cần quyết định).

Đối chiếu: `backend/package.json` ở `806ba19` parse OK.

### 2. Baseline 806ba19

| Lệnh | Bắt đầu | Kết thúc | Thời lượng | Kết quả |
|---|---|---|---|---|
| `npm ci` | 12:50:11 | 12:50:33 | 22 s | exit 0; npm báo 6 vulnerabilities (1 low, 2 moderate, 1 high, 2 critical), không chạy audit fix |
| `npm run test:cart-orders` | 12:50:33 | 12:50:35 | 2 s | exit 0; 1 suite, **36/36 passed**, Jest time 1.013 s |
| `npx stryker run stryker.cart-orders.config.json --dryRunOnly` | 12:50:35 | 12:50:40 | 5 s | exit 0; 150 mutants instrumented, initial test run succeeded "Ran 72 tests in 1 second (net 600 ms, overhead 945 ms)", không test mutant |

Config Stryker: `coverageAnalysis: perTest`, `concurrency: 2`, `timeoutMS: 5000`, `timeoutFactor: 1.5`.

Giờ ghi bằng `date -Iseconds` (+07:00) trước/sau mỗi lệnh, độ phân giải giây.

Lệch: Jest chạy 36 tests nhưng dry run Stryker báo 72 tests. E01-1 (Tấn Hiệp, cùng commit 806ba19) cũng báo 72; E01-1-cc (8d60e9b) báo 36. Giả thuyết chưa kiểm chứng: config Stryker ở 806ba19 trỏ Jest config có nhiều project nên cùng file test được chạy hai lần. Số mutant (150) không đổi; ảnh hưởng chính là thời gian chạy.

Sau run: `git -C wt-806ba19 status -s` rỗng, `database.sqlite` không đổi.

### 3. Thời gian full mutate Cart từ runs S3

Nguồn: dòng `MutationTestExecutor Done in ...` trong `console.log` của từng run. Các run D01-1, D01-2, D01-2-cc, D01-3 (chỉ dry run), D01-4-cc không có dòng này.

| Run | Executor | Commit / config | Tests dry run | Full mutate |
|---|---|---|---|---|
| E01-1 | Tấn Hiệp | 806ba19, `npm run mutate:cart-orders` | 72 | 2 min 33 s |
| E01-1-cc | Claude Code | 8d60e9b, cart-orders config | 36 | 26 s |
| F01-1 | (xem F01-cc-REPORT) | manual | 41 | 27 s |
| F01-2 | Tấn Hiệp | b77f5d6, `stryker.cart-orders.manual.config.json` | 44 | 2 min 5 s |
| F01-2-cc | Claude Code | manual | 44 | 27 s |
| G01-2 | Tấn Hiệp | f4696c6, `stryker.cart-orders.ai.config.json` | 41 | 2 min 3 s |
| G01-2-cc | Claude Code | ai | 41 | 30 s |
| Thai_Hoa D04 cart-reproduced-manual | Thái Hòa (agent) | D04 merge | 88 | 2 min 28 s |
| Thai_Hoa D04 cart-reproduced-ai | Thái Hòa (agent) | D04 merge | 82 | 2 min 31 s |

Số liệu chép từ console, không đo lại. Run của Tấn Hiệp / Thái Hòa chậm hơn run `-cc` khoảng 4–5 lần cùng 150 mutants; nguyên nhân chưa kiểm chứng (máy khác, số tests gấp đôi ở 806ba19/D04, tải máy).

Ước lượng cho guide: trên 806ba19, full mutate Cart ≈ 2.5 phút (E01-1); dry run ≈ 5 s.

### Files đã tạo/sửa

- Seminar: `experiments/s4/runs/F01a-1-cc/console.log`, `experiments/s4/runs/F01a-cc-REPORT.md` (mới).
- EShop: không sửa file nào. Thêm worktree detached ở scratchpad (đăng ký trong `git worktree list` của EShop); có thể gỡ bằng `git worktree remove --force <path>` khi không cần.

### Ghi chú thuyết trình

1. `--dryRunOnly` chỉ instrument và chạy test gốc một lần: xác nhận môi trường trong ~5 s trước khi chạy full ~2.5 phút.
2. Số "tests" trong dry run Stryker có thể khác Jest khi config chạy nhiều project; so sánh run nên dùng số mutant và Survived tuyệt đối.
3. `main` hiện có package.json không hợp lệ; guide nên chỉ người đọc dùng baseline `806ba19` cho tới khi main được sửa.

### AI usage

Log phiên do hook ghi: `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.
