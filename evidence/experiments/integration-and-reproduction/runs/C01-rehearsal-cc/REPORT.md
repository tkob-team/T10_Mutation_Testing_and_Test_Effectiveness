# C01-rehearsal-cc REPORT

## Thông tin run

| Mục | Giá trị |
|---|---|
| Task | S4-C01 rehearsal — chạy đúng các lệnh trong bảng `materials/s4/Demo_Contribution_Tan_Hiep.md` theo thứ tự |
| Executor | Claude Code, model `claude-opus-5-5` |
| Thời gian | 2026-10-23 14:28:17–14:36:09 (+07:00) |
| OS / shell | Windows 11 Home Single Language 10.0.26200; Git Bash (script `c01_run.sh`, nội dung lệnh y như bảng) |
| Versions | Node v24.15.0, npm 11.12.1, StrykerJS 10.0.0, Jest 30.5.2; `claude --version`: 2.1.309 (Claude Code) |
| SUT | clone mới `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness` → `eshop-demo` trong thư mục tạm `C:\Users\tanhi\AppData\Local\Temp\claude\D--HK7-Testing-Seminars-Repo\3058f82a-a124-4cce-853c-9bab797d6360\scratchpad\c01`; baseline trên `main` `4b28756` (sau khi Hòa sửa package.json), manual trên `s3/F01-manual` `b77f5d6`, AI trên `s3/G01-ai` `f4696c6` |

## Evidence

- `console.log`: từng lệnh, header `### <giờ> | <commit> <nhánh> | > <lệnh>`, dòng cuối `--- START | END | giây | exit`.
- `baseline/`, `manual/`, `ai/`: `mutation.json` và `mutation.html` của từng run.
- `count_c01.js` (script đếm và so với S3, khóa mutant bằng vị trí đầu–cuối + mutator + replacement), đầu ra `count_c01.md`.

## Thời gian và kết quả từng lệnh

| # | Lệnh (nhánh) | Bắt đầu–Kết thúc | Thời lượng | Kết quả |
|---|---|---|---|---|
| 1 | `git clone ... eshop-demo` | 14:28:17–14:28:18 | 1 s | exit 0, `main` `4b28756` |
| 2 | `node --version` / `npm --version` | 14:28:18–14:28:19 | <1 s | v24.15.0 / 11.12.1 |
| 3 | `npm ci` (main) | 14:28:19–14:28:40 | 21 s | exit 0 |
| 4 | `npm run test:cart-orders` (main) | 14:28:40–14:28:42 | 2 s | 1 suite, 36/36 pass |
| 5 | `npm run mutate:cart-orders` (main) | 14:28:42–14:31:31 | 169 s (Stryker: 2 min 47 s) | exit 0; report ở `reports/cart-orders/mutation.html` |
| 6 | `git checkout s3/F01-manual` | 14:31:32 | <1 s | exit 0, working tree sạch, không cần restore `database.sqlite` |
| 7 | `npm run test:manual` | 14:31:32–14:31:34 | 2 s | 2 suites, 44/44 pass |
| 8 | `npx stryker run stryker.cart-orders.manual.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5` | 14:31:34–14:33:51 | 137 s (Stryker: 2 min 14 s) | exit 0 |
| 9 | `claude --version` | 14:33:51 | <1 s | 2.1.309 (Claude Code); không chạy `claude` tương tác |
| 10 | `git checkout s3/G01-ai` | 14:33:51–14:33:52 | 1 s | exit 0 |
| 11 | `npm run test:ai` | 14:33:52–14:33:54 | 2 s | 2 suites, 41/41 pass |
| 12 | `npx stryker run stryker.cart-orders.ai.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5` | 14:33:54–14:36:08 | 134 s (Stryker: 2 min 12 s) | exit 0 |

Hàng "Claude / Basic" trong bảng chỉ mở output đã lưu của G01-1-cc, không có lệnh chạy.

## So sánh số liệu (đếm từ `mutation.json`)

Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage).

| Run | Mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError | Score | Bảng Demo | Khớp |
|---|---|---|---|---|---|---|---|---|---|
| Baseline (main) | 150 | 82 | 25 | 34 | 2 | 7 | 74.83% | 82/25/34/2/7, 74.83% | Có |
| Manual (`s3/F01-manual`) | 150 | **109** | **21** | 11 | 2 | 7 | 90.91% | 112/18/11/2/7, 90.91% | Score, Survived khớp; **Killed/Timeout lệch 3** |
| AI (`s3/G01-ai`) | 150 | **100** | **20** | 21 | 2 | 7 | 83.92% | 102/18/21/2/7, 83.92% | Score, Survived khớp; **Killed/Timeout lệch 2** |

- Mutant demo `292:7` (`ConditionalExpression` → `true`): Survived ở baseline; **Killed** ở manual và AI. Khớp.
- `550:11` (`ConditionalExpression` → `false`, 550:11–550:65): **Survived** ở cả ba run. Khớp.
- Tập Survived trùng hoàn toàn với run S3 tương ứng (E01-1, F01-2, G01-2) ở cả ba run.
- Mutant đổi trạng thái so với S3 (đều Killed → Timeout): manual `316:7 CallExpression`, `519:22 BlockStatement`, `520:7 CallExpression`; AI `519:22 BlockStatement`, `520:7 CallExpression`. Baseline 0 khác biệt.

**Lệch:** số Killed và Timeout của manual và AI không khớp bảng Demo (bảng lấy từ F01-2/G01-2 của Tấn Hiệp). Score và Survived không đổi vì Timeout cũng tính là detected. Không sửa số liệu trong bảng.

Giả thuyết, chưa kiểm chứng: các mutant này nằm sát ngưỡng timeout (5000 ms × 1.5) nên lúc thì kịp bị kill, lúc thì timeout, tùy tải máy. Log có 42 dòng `ChildProcessCrashedError ... exit code 3221225477` (worker Jest crash rồi Stryker khởi động lại); các run S3 cũng có (E01-1 28, F01-2 14, G01-2 14 dòng "exited unexpectedly"), nên đây không phải hiện tượng mới.

## Ghi chú cho buổi quay

- `main` hiện chạy được (`package.json` đã sửa), không cần checkout `806ba19`.
- Dry run baseline vẫn in "Ran 72 tests" trong khi Jest chạy 36 (giống E01-1).
- Khi quay, nên đọc score và Survived thay vì đọc Killed/Timeout chính xác, vì hai số này dao động giữa các lần chạy; hoặc nói rõ số trên màn hình là của lần chạy đó.
- Mỗi Stryker run mất 2 min 12 s – 2 min 47 s trên máy này.

## Files đã tạo

`experiments/s4/runs/C01-rehearsal-cc/`: `REPORT.md`, `console.log`, `count_c01.js`, `count_c01.md`, `baseline/`, `manual/`, `ai/` (mỗi thư mục có `mutation.json`, `mutation.html`). Clone tạm nằm ngoài repo, không sửa file nào trong SUT.

## AI usage

Log phiên do hook ghi: `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.
