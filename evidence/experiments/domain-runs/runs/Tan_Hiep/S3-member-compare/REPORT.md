# S3 member self-runs — evidence check and comparison (Claude Code report)

- Executor của run: Tấn Hiệp (2026-10-23, 11:34–11:41 theo dòng `###` trong console.log). Kiểm tra/so sánh: Claude Code (`claude-opus-5-5`), không chạy lại Jest/Stryker.
- Repo seminar `main`; EShop `s3/G01-ai` @ `f4696c6`, sạch (không đụng).

## Evidence check

| Run | Dòng `###` (giờ, commit, lệnh) | Files | Kết quả (console) | Stryker (đếm từ `mutation.json`) |
|---|---|---|---|---|
| D01-1 | 11:34:20, `8d60e9b s3/D01-cart-orders`, `npm test` | console.log | 36 passed | — |
| D01-2 | 11:34:22, `8d60e9b`, `npm run test:defects` | console.log | 9 failed (DEF-01…07, 08a, 08b) | — |
| D01-3 | 11:34:23, `8d60e9b`, `npx stryker run stryker.cart-orders.config.json --dryRunOnly` | console.log | `Ran 36 tests` | dry run, không có report |
| E01-1 | 11:34:28, `806ba19`, `npm run mutate:cart-orders` | console.log, mutation.html, mutation.json | dry run `Ran 72 tests`; Done in 2 min 33 s | 82/25/34/2/7, 150, 74.83% |
| F01-2 | 11:37:03 `npm run test:manual`; 11:37:05 `npx stryker run stryker.cart-orders.manual.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5` (`b77f5d6 s3/F01-manual`) | console.log, mutation.html, mutation.json | 44 passed; Done in 2 min 5 s | 112/18/11/2/7, 150, 90.91% |
| G01-2 | 11:39:12 `npm run test:ai`; 11:39:14 `npx stryker run stryker.cart-orders.ai.config.json --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5` (`f4696c6 s3/G01-ai`) | console.log, mutation.html, mutation.json | 41 passed; Done in 2 min 3 s | 102/18/21/2/7, 150, 83.92% |

Thứ tự: Killed/Timeout/Survived/NoCoverage/RuntimeError, tổng, score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage). CompileError = Ignored = 0.

## Comparison

Script `member_compare.py` → `member_comparison.md` (khóa như H01). Tập Survived trùng ở cả 6 cặp.

| Cặp | Đổi trạng thái | Liên quan Survived | Killed↔Timeout | Khác |
|---|---:|---:|---:|---:|
| E01-1 vs E01-1-cc | 6 | 0 | 5 | 1 (`532:11` RuntimeError → Timeout) |
| E01-1 vs Hòa frozen-cart-orders-baseline | 0 | 0 | 0 | 0 |
| F01-2 vs F01-2-cc | 0 | 0 | 0 | 0 |
| F01-2 vs Hòa cart-reproduced-manual | 7 | 0 | 7 | 0 |
| G01-2 vs G01-2-cc | 5 | 0 | 5 | 0 |
| G01-2 vs Hòa cart-reproduced-ai | 7 | 0 | 7 | 0 |

## Observations (sự kiện)

- E01-1-cc chạy trên `8d60e9b`, E01-1 trên `806ba19`; khóa 150 mutant vẫn trùng hết.
- Theo console: run `-cc` (E01-1-cc, F01-2-cc, G01-2-cc) tạo 15 test runner process; E01-1, F01-2, G01-2 tạo 2.
- Dry run E01-1 `Ran 72 tests` (= 2×36); D01-3 trên `8d60e9b` `Ran 36 tests`.
- Mỗi Stryker run (E01-1, F01-2, G01-2) có 14 dòng `WARN ChildProcessProxy ... exit code 3221225477`.
- console.log của member có ký tự tiếng Việt / ký hiệu bị lỗi mã hóa (ví dụ `├ù`, `ΓåÆ`); số liệu không bị ảnh hưởng.

## Files

- `D01-1/`, `D01-2/`, `D01-3/`, `E01-1/`, `F01-2/`, `G01-2/` (do Tấn Hiệp đặt, commit nguyên trạng)
- `S3-member-compare/member_compare.py`, `member_comparison.md`, `REPORT.md`
- `experiments/s3/Experiment_Log_Tan_Hiep.md`: header (Task IDs, Evidence Status), D01 Runs (D01-1/2/3), Baseline (E01-1 thay dòng `[S3-E01]` Pending), Comparison (E01-1/F01-2/G01-2 + đoạn số liệu so từng mutant)

## AI usage

`ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.
