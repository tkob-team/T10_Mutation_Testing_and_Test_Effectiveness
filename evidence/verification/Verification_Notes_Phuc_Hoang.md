# Task Notes

**Document Role:** Ghi chú kiểm chứng S4-F03 cho các contribution của Phúc Hoàng; bản AI-drafted (Claude Code, Sonnet 5.5). Kiểm số liệu và link là **đã chạy** (script + đối chiếu log); các mục cần người thật hoặc máy khác ghi **Not checked**.  
**Stage:** S4  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S4-F03  
**Domain / Section:** Kiểm chứng `Guide_Contribution`, `Report_Contribution`, `Demo_Contribution` (Authentication & Users) so với run S3 đã lưu  
**Evidence Status:** Partial — số liệu và link đã kiểm 2026-10-23 bằng script; chưa chạy lại lệnh Stryker/Claude mới trong S4, chưa có người ngoài tác giả đọc hay chạy theo guide, chưa quay video.

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Assigned Work & Inputs

- **Task:** theo Task Output Map, S4-F03 → `materials/s4/Verification_Notes_Phuc_Hoang.md`, mẫu Task Notes. **Giả định (Proposed):** kiểm chứng chính các contribution S4 của tôi (A03, B03, C03) trước khi leader hợp nhất — mô tả task của Team Sheet không có trong repo, cần người giao việc xác nhận phạm vi (ví dụ có gồm `User_Guide.md`/`Seminar_Report.md` hợp nhất của S4-E hay không; các file đó chưa có).
- **Đối tượng kiểm:** [`Guide_Contribution_Phuc_Hoang.md`](Guide_Contribution_Phuc_Hoang.md), [`Report_Contribution_Phuc_Hoang.md`](Report_Contribution_Phuc_Hoang.md), [`Demo_Contribution_Phuc_Hoang.md`](Demo_Contribution_Phuc_Hoang.md).
- **Nguồn đối chiếu:** `mutation.json` và log trong `experiments/s3/runs/Phuc_Hoang/` (E03-baseline, F03-manual, G03-ai, H03-comparison), `Experiment_Log_Phuc_Hoang.md`, `Research_Notes_Phuc_Hoang.md`, `package.json` của nhánh SUT `s3/F03-auth` và `s3/G03-auth`.

## Record

Script: [`verify_s4_docs.py`](../../experiments/s4/runs/Phuc_Hoang/S4-F03-verify/verify_s4_docs.py); đầu ra: [`verify_output.txt`](../../experiments/s4/runs/Phuc_Hoang/S4-F03-verify/verify_output.txt).

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Đếm lại Killed/Timeout/Survived/NoCoverage/RuntimeError, score, assertion kill của 4 run (baseline, manual, AI reviewed, AI raw) từ `mutation.json` | **Khớp** mọi số trong ba contribution (125 mutant/run; 74,36% / 94,02% / 86,32% / 89,74%; assertion kill 51,28% / 70,94% / 63,25% / 66,67%) | `verify_output.txt` bảng đầu | — |
| 27 Timeout là cùng một tập mutant ở cả 4 run; tỷ lệ Timeout trong "detected" | **Khớp:** tập giống hệt; 31,0% / 24,5% / 26,7%; Killed/125 = 48,00% / 66,40% / 59,20% | `verify_output.txt` | — |
| Kill mapping trên 30 survivor/NoCoverage của baseline | **Khớp:** manual 23, AI 14, cả hai 13, chỉ AI 1, chỉ manual 10, không bên nào 6, hợp 24; không có mutant Killed nào tụt trạng thái | `verify_output.txt` | "Hợp 24" là suy ra từ hai run riêng, chưa chạy bộ gộp (đã ghi trong H03) |
| Case demo #132 (`if (role)` → `if (true)`) | **Khớp:** Killed bởi AM-01 (manual) và AI-U01 (AI) trong `mutation.json` | `verify_output.txt` dòng `#132` | — |
| Số test pass từng bộ | Baseline 26, `npm test` 88, manual 39, AI 37: **khớp** log | `E03-baseline/test-auth.log`, `npm-test.log`, `F03-manual/test-auth-manual.log`, `G03-ai/test-auth-ai.log` | — |
| Script npm trong guide/demo tồn tại | `test:auth:manual`, `mutate:auth:manual` có ở `s3/F03-auth`; `test:auth:ai`, `mutate:auth:ai` ở `s3/G03-auth`; **không** có ở `origin/main` của SUT | `package.json` các nhánh (đối chiếu qua `git show`) | Guide/Demo đã ghi rõ cần nhánh; leader cần chốt merge vào `main` hay không |
| Link tương đối trong 4 file của tôi | Tất cả phân giải được (0 thiếu) | `verify_output.txt` mục Link check | Link ngoài (URL) **Not checked** — chưa mở lại ngày này |
| Phiên bản công cụ | Node v26.12.1, npm 11.20.0, Stryker/Jest 10.0.0/30.5.2 khớp `run_meta.txt`; Claude Code 2.1.308 và model `claude-sonnet-5-5` khớp log S3-G03 (phiên bản không nằm trong `raw.json`, chỉ model) | `E03-baseline/run_meta.txt`, `Experiment_Log_Phuc_Hoang.md` mục G03 | Demo đã ghi nguồn đúng |
| Nhãn "5 spec-based / 18 convention" (manual) và "5 / 8 / 1" (AI) | Phép đếm khớp bảng `kill_mapping.md`; **nhãn spec/convention là phán đoán của reviewer**, chưa có member xác nhận | `G03-ai/kill_mapping.md`, `F03-manual/mutant_mapping.md`, `H03-comparison/comparison.md` §5 | **Pending** member review; không dùng như kết luận cuối |
| Số liệu AI approaches (P07: 3.302 cặp, +35,69% F1; P08: precision 0,79/recall 0,47 → 0,95/0,96; P09: 93,57%) | Chép từ Research Notes; nguồn là abstract/trang paper | `Research_Notes_Phuc_Hoang.md` §F-A03-04 | **Not checked** trên full text; mở lại nguồn trước khi nộp |
| Câu "chưa đọc full text P03, P07–P09" trong Report | Có ghi ở đầu mục AI approaches | Report | — |
| Chạy lại hướng dẫn trong guide từ máy sạch (S4) | **Not run** — lệnh trong guide lấy từ run S3, chưa chạy lại trong S4 | — | Cần người khác hoặc tôi chạy lại theo checklist ở `Guide_Reproduction_Phuc_Hoang.md` |
| Troubleshooting "untested suggestions" | Đã gắn nhãn *untested* trong guide (tempDir, `incremental`, `thresholds.break`, `ignoreStatic`, `disableBail`) | Guide | Không khẳng định là đã chạy |
| Lệnh cài Claude Code `npm install -g @anthropic-ai/claude-code` trong demo | **Not verified** trong dự án này | Demo (ghi rõ) | Dùng trang cài đặt chính thức hiện hành khi quay |
| Video demo | **Not run** — chưa quay, chưa đo độ dài | — | Quay sau khi leader chốt Demo_Script chung |

**Lỗi/độ lệch phát hiện khi viết và kiểm (đã sửa trong bản nháp):** (1) ban đầu ghi "10 nhóm candidate, 8 accepted" — thực tế 9 nhóm (7 accepted, 1 edited, 1 rejected) cộng một lần từ chối viết test cho 12 mutant; (2) ghi nhầm Claude Code version nằm trong `raw.json`; (3) hai câu về Timeout giữa OS và về "kill dựa convention" của AI được viết lại cho đúng số liệu (8 kill convention là DB lỗi → 500, không gồm body message); (4) "OTP không hết hạn" đổi thành "spec chỉ nêu có thời hạn".

## Handoff & Review

- Deliverable and destination: `materials/s4/Verification_Notes_Phuc_Hoang.md`; script và đầu ra ở `experiments/s4/runs/Phuc_Hoang/S4-F03-verify/`.
- Pending / blockers: (1) member review mọi số và nhãn; (2) mở lại link ngoài và full text paper; (3) tái lập guide trên máy sạch; (4) quay và đo thời lượng demo; (5) xác nhận phạm vi S4-D03/S4-F03 với người giao việc; (6) quyết định merge hai nhánh test vào `main` của SUT.
- Checks performed: đối chiếu số liệu bằng script từ `mutation.json`; đối chiếu số test pass với log; kiểm script npm trên nhánh; kiểm link tương đối. Không có gì khác.
- Leader review: Pending

## Task-Specific Checklist

- [x] Số liệu trong contribution truy được về `mutation.json`/log (kiểm bằng script).
- [x] Link tương đối trong file của tôi phân giải được.
- [x] Phiên bản công cụ và nhánh/commit nêu trong tài liệu khớp nguồn.
- [ ] Link URL ngoài còn truy cập được — Not checked.
- [ ] Số liệu paper đối chiếu full text — Not checked.
- [ ] Người khác chạy lại guide từ máy sạch — Not run.
- [ ] Video quay xong, 5–8 phút, ≤100 MB — Not run.
- [ ] Member xác nhận verdict/nhãn spec–convention và AI usage — Pending.
