# S3-E01 Run Report — Cart & Orders Domain Baseline (Claude Code)

## Summary

| Field | Value |
|---|---|
| Task ID | S3-E01 (Cart & Orders) |
| Run | E01-1-cc — **baseline domain, trước D04** (Thái Hòa cho chạy E01 trên suite domain trước khi S3-D04 ghép, 2026-10-22) |
| Executor | Claude Code (model `claude-opus-5-5`), không phải run chính thức của Tấn Hiệp |
| Date | 2026-10-22, 20:58:20–20:58:49 (+07:00); Stryker báo `Done in 26 seconds` |
| OS | Windows 11 Home Single Language 10.0.26200; shell Git Bash |
| Overall | **Done** |

## Environment

| Item | Value |
|---|---|
| EShop repo | branch `s3/D01-cart-orders` @ `8d60e9b` (up to date với `origin/s3/D01-cart-orders`), working tree sạch |
| Seminar repo | branch `main` @ `e2851f8` (`chore(ai-log): update prompt logs`, commit log hook trước khi làm task theo CLAUDE.md) |
| Node / npm | v24.15.0 / 11.12.1 |
| Jest | 30.5.2 |
| StrykerJS | 10.0.0 (`@stryker-mutator/core`, `@stryker-mutator/jest-runner`) |
| Config | `backend/stryker.cart-orders.config.json`: `testRunner: jest`, `coverageAnalysis: perTest`, `mutate: ["server.js:280-349", "server.js:510-568"]`, `tempDirName: stryker-tmp`, reporters `clear-text`, `progress`, `html`, `json` |
| Test set | `backend/test/cart-orders.test.js` (36 tests); `test/defects/` không thuộc run (Jest `testMatch` chỉ nhận `*.test.js`) |

Config và tests nằm trong commit `8d60e9b`, nên không copy lại vào run-dir.

## Run E01-1-cc

- Command (trong `backend/`): `npx stryker run stryker.cart-orders.config.json`
- Exit 0. Stryker tự dọn `stryker-tmp/` sau run; không xóa tay.
- Evidence: `experiments/s3/runs/Tan_Hiep/E01-1-cc/` — `console.log`, `mutation.html`, `mutation.json`, `mutants_by_route.md`, `mutants_by_route.py`

Số liệu đếm từ `mutation.json` bằng `mutants_by_route.py` (không chép từ console; console cho cùng số):

| Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Mutation score | Score on covered |
|---|---|---|---|---|---|---|---|---|---|
| 150 | 87 | 19 | 34 | 2 | 8 | 0 | 0 | **74.65%** | 75.71% |

Định nghĩa (StrykerJS 10.0.0): Detected = Killed + Timeout = 106; Undetected = Survived + NoCoverage = 36; Valid = 142; Invalid = RuntimeError + CompileError = 8 (loại khỏi score). Mutation score = Detected / Valid × 100 = 74.65%. Score on covered = Detected / (Detected + Survived) × 100 = 75.71%. Timeout tính vào Detected theo định nghĩa tool nhưng không phải assertion kill.

Nhóm theo route và danh sách từng mutant Survived/NoCoverage/Timeout/RuntimeError (line, mutator, replacement, coveredBy): `E01-1-cc/mutants_by_route.md`. Line ranges route do Tấn Hiệp đưa trong prompt, đúng với commit `8d60e9b`; cả 150 mutants rơi vào 8 route, không mutant nào ngoài. Báo cáo này không phân tích lý do survive (thuộc S3-F01).

## Deviations

| Item | Reference | Actual |
|---|---|---|
| So với run sandbox Linux trước đó của Claude (Node v22.22.0, `.stryker-tmp`; ghi ở Experiment Log mục D01 — Runs) | 150 mutants; Killed 91, Timeout 16, Survived 34, NoCoverage 2, RuntimeError 7; 74.83% | 150 mutants; Killed 87, Timeout 19, Survived 34, NoCoverage 2, RuntimeError 8; 74.65% |

Survived và NoCoverage giống nhau; khác ở Killed (−4), Timeout (+3), RuntimeError (+1). Chưa xác định nguyên nhân (môi trường khác: OS, Node, cách cấp timeout). Chưa so từng mutant vì không có `mutation.json` của run sandbox trong repo. Đây không phải lỗi; số chính thức của baseline là số thật của run này.

## Docs Updated

- `experiments/s3/Experiment_Log_Tan_Hiep.md`, mục Baseline: thêm dòng E01-1-cc (ghi "baseline domain, trước D04"); giữ dòng `[S3-E01] Pending (S3-D04)` cho run sau khi D04 ghép.
- `ai-audit/AI_Record_Tan_Hiep.md`: bỏ "(đề xuất của Claude, chờ Tấn Hiệp xác nhận)" ở 5 artifacts; chốt verdict C01-02, C01-03, D01-02, D01-03 = VALID; D01-01, D01-04, WF-02 = INCOMPLETE; Accuracy Summary tổng 11 (VALID 6 = 54.55%, INVALID 0, INCOMPLETE 5 = 45.45%). Cập nhật theo đó dòng Evidence Status (đầu file) và mục Member Review & Handoff (bỏ phần "verdict D01-01, D01-02 và xác nhận các verdict đề xuất"). D01-01, D01-02 trước là Pending, giờ ghi nhãn chuẩn "usable after edits" / "accepted as-is" như các artifact khác.

## Repository State

- EShop: sạch (`reports/` nằm trong `.gitignore`); `backend/database.sqlite` không đổi.
- Seminar: commit theo prompt (hash trong khối báo cáo / `git log`).

## Presentation Notes

- Mutation score 74.65% gồm cả 19 Timeout; phần lớn Timeout là mutant làm handler không trả response, nên không chứng minh assertion mạnh. Khi trình bày, tách Killed và Timeout.
- 8 RuntimeError bị loại khỏi mẫu số; cùng code và tests nhưng khác môi trường (Linux sandbox vs Windows) đã cho Killed/Timeout/RuntimeError khác nhau, nên luôn ghi môi trường kèm score.
- Route `GET /api/cart` và `POST /api/cart` có score thấp nhất (42.86%, 44.44%) — đầu vào cho S3-F01.

## AI Usage

- Tool: Claude Code, model `claude-opus-5-5`, skills `t10-run-report`, `t10-mutation-testing`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-E01 (Cart & Orders). Dùng skill t10-run-report và t10-mutation-testing. Được commit, không push.
  >
  > Bối cảnh: Hòa cho chạy E01 trên suite domain trước khi D04 ghép (2026-10-22). Ghi rõ "baseline domain, trước D04".
  >
  > 1. Repo EShop, nhánh s3/D01-cart-orders @ 8d60e9b, trong backend:
  >    - E01-1-cc: npx stryker run stryker.cart-orders.config.json (full run). Để Stryker tự dọn sandbox, không xóa tay.
  >    - Lưu console.log, mutation.html, mutation.json vào experiments/s3/runs/Tan_Hiep/E01-1-cc/.
  > 2. Đếm status từ mutation.json. Tạo E01-1-cc/mutants_by_route.md bằng script: nhóm mutant theo route (server.js 284-288 GET cart, 290-295 POST cart, 297-309 checkout, 311-319 my-orders, 321-342 cancel, 344-349 order detail, 510-523 admin list, 525-568 admin status), mỗi nhóm đếm theo status; liệt kê từng Survived/NoCoverage/Timeout/RuntimeError: line, mutator, replacement, coveredBy. KHÔNG phân tích vì sao survive (đó là F01).
  > 3. Experiment Log, mục Baseline: thêm dòng E01-1-cc (SUT commit, config, command, đường dẫn evidence, Killed/Timeout/Survived/NoCoverage/RuntimeError/score). Tham khảo sandbox Linux trước đó: 150 mutants, 74.83%; khác thì ghi số thật.
  > 4. AI Record: bỏ "(đề xuất…)" và chốt verdict: C01-02, C01-03, D01-02, D01-03 = VALID; D01-01, D01-04, WF-02 = INCOMPLETE. Cập nhật Accuracy Summary (tổng 11).
  > 5. Commit seminar: "docs(S3-E01): record Cart & Orders domain baseline run; finalize AI Record verdicts".
  > 6. Báo cáo theo CLAUDE.md.

- Output chính: E01-1-cc full run (150 mutants, 74.65%); script `mutants_by_route.py` và `mutants_by_route.md`; dòng Baseline trong Experiment Log; verdict và Accuracy Summary trong AI Record; 1 commit seminar.
