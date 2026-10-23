# Task Notes

**Document Role:** Ghi chú kiểm chứng S4-F01 cho User Guide phần Cart & Orders (`draft/User_Guide.md`) và các contribution S4 của Tấn Hiệp. Bản AI-drafted (Claude Code, Opus 5.5). Mục kiểm số liệu dựa trên các run đã chạy (F01a-1-cc, F01c-1-cc); mục cần máy khác hoặc người khác ghi **Not checked** / **Not run**.  
**Stage:** S4  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S4-F01 (F01a, F01c)  
**Domain / Section:** Kiểm chứng `draft/User_Guide.md` (mục 1–8, walkthrough Cart & Orders trên workshop starter) theo REQ-17/REQ-18 và evidence S4  
**Evidence Status:** Partial — mục 2.2–4.1 của guide đã chạy lại trên Windows 11 (F01c-1-cc), khớp 4 mốc số liệu; chưa chạy macOS, mục 4.2 AI Agent, lỗi `npm.ps1`; chưa có người ngoài tác giả chạy theo guide.

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Assigned Work & Inputs

- **Task:** theo Task Output Map, S4-F01 → `materials/s4/Verification_Notes_Tan_Hiep.md`, mẫu Task Notes.
- **Đối tượng kiểm:** [`draft/User_Guide.md`](../../draft/User_Guide.md) (bản tiếng Việt, walkthrough Cart & Orders trên `eshop-sut-workshop` @ `6d2e790`).
- **Tiêu chí:** REQ-17 (User Guide, ≥6 phần: Introduction, Install, First Test, Advanced Usage, Troubleshooting, References) và REQ-18 (Failure Modes ≥3) trong `docs/requirements/Seminar_Requirements_Consolidated.md`.
- **Nguồn đối chiếu:** [`F01a-cc-REPORT.md`](../../experiments/s4/runs/F01a-cc-REPORT.md) và `experiments/s4/runs/F01a-1-cc/console.log`; [`F01c-1-cc/REPORT.md`](../../experiments/s4/runs/F01c-1-cc/REPORT.md) cùng `console.log`, `baseline.json`, `first-test.json`, `manual.json`, `diag-tempDirName.log`; run S3 `experiments/s3/runs/Tan_Hiep/E01-1/`.
- **Ngôn ngữ:** guide viết tiếng Việt (giữ English technical terms, lệnh, tiêu đề) theo quyết định của Tấn Hiệp; **khác REQ-17** (yêu cầu User Guide English). Cần nhóm thống nhất trước khi nộp.

## Record

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| REQ-17: đủ 6 phần bắt buộc | **Đủ:** 1 Introduction, 2 Install, 3 First Test, 4 Advanced Usage, 6 Troubleshooting, 8 References; có thêm 5 Interpreting Results, 7 Failure Modes | Headings của `draft/User_Guide.md` | — |
| REQ-17: ngôn ngữ English | **Không đạt theo chữ:** guide viết tiếng Việt theo quyết định của Tấn Hiệp | — | Nhóm thống nhất ngôn ngữ trước khi ghép `materials/s4/User_Guide.md` (Auth của Phúc đang English) |
| Mục 2.2: `git clone`, `npm ci`, `npm test` | **Khớp:** 4 suites, 88/88 tests pass; tách từng file: Cart 36, Coupons 25 + 1 (coupons-flow), Auth 26 | F01c-1-cc `console.log`; REPORT bảng kết quả | — |
| Mục 2.3: cài Stryker 10.0.0, tạo `stryker.config.json` | **Khớp:** `npm install` exit 0; config nguyên văn chạy được | F01c-1-cc `stryker.config.json`, `console.log` | Guide không nhắc `npm install` sửa `package.json`/`package-lock.json`; không phải lệch số liệu |
| Mục 3.1: baseline | **Khớp:** 36 tests pass; 7 mutants, 7 Survived | F01c-1-cc `baseline.json` | — |
| Mục 3.2: mutant ArrayDeclaration dòng 286 | **Khớp:** `[]` → `["Stryker was here"]`, Survived | `baseline.json` | — |
| Mục 3.3: thêm assertion CO-02 | **Khớp:** 36 pass; 3 Killed (286 ConditionalExpression `false`, 286 BooleanLiteral, 286 ArrayDeclaration), 4 Survived | F01c-1-cc `first-test.json` | — |
| Mục 4.1: thêm 3 assertion (CO-02, CO-04, CO-12) | **Khớp:** 88 pass; 7 Killed, 0 Survived, 0 Timeout, score 100% | F01c-1-cc `manual.json`, `workshop-changes.diff` | — |
| Mục 1 "Tested environment" | Guide ghi Node.js 24.16.0, npm 12.0.2; F01c chạy trên Node v24.15.0, npm 11.12.1 và vẫn khớp số liệu | F01c-1-cc REPORT | Ghi thêm môi trường F01c vào guide hoặc giữ nguyên — Tấn Hiệp quyết định |
| REQ-18: Failure Modes ≥3 | **Đủ 3:** 7.1 passing tests che thiếu kiểm tra; 7.2 score phóng đại do Timeout và phạm vi; 7.3 AI viết test pass nhưng vô ích | Mục 7 của guide | Xem 3 dòng dưới về evidence từng mục |
| 7.1 có evidence | **Có:** baseline CO-02 chỉ assert status 200, mutant ArrayDeclaration 286 Survived; thêm body assertion thì Killed | F01c-1-cc `baseline.json` → `first-test.json` | — |
| 7.2 có evidence | **Một phần:** trong bài workshop Timeout = 0; trên SUT S3, baseline Cart có Timeout 25 trên 107 detected | `experiments/s3/runs/Tan_Hiep/E01-1/mutation.json` | Evidence lấy từ S3, không từ walkthrough |
| 7.3 có evidence | **Chưa có** evidence trong S4: mục 4.2 chưa chạy | — | Chạy 4.2 hoặc trỏ tới evidence S3-G01 sau khi kiểm |
| Troubleshooting: ≥3 lỗi thật | **Có 3 dòng có evidence:** (1) script `.ps1` của npm bị execution policy chặn — `npx.ps1` bị chặn trên máy Tấn Hiệp ở S3 (ghi trong `Repo/CLAUDE.md` mục Môi trường), chưa tái hiện ở F01c; (2) npm báo vulnerabilities — F01a và F01c; (3) Stryker chạy tests trùng — dry run SUT `806ba19` "Ran 72 tests" so với Jest 36 (F01a, E01-1); config của guide cho 36 (F01c) | F01a-cc-REPORT; F01c-1-cc `console.log`, `diag-tempDirName.log` | Các dòng còn lại (EBADENGINE, SQLite binding, npm 12 blocked scripts, lockfile, Timeout) là gợi ý chưa gặp; cân nhắc gắn nhãn *untested* |
| `tempDirName` | Bỏ key này vẫn 7 Killed (run chẩn đoán, không chính thức); với config của guide không bắt buộc | F01c-1-cc `diag-tempDirName.log` | **Chưa kiểm chứng nguyên nhân** lỗi `No tests were found` ở S3 |
| `backend/package.json` SUT main | Lỗi JSON trên main `69b845a` (thiếu dấu phẩy dòng 24; `806ba19` parse OK); Hòa đã sửa (`4b28756`) | F01a-cc-REPORT | Không ảnh hưởng guide (guide dùng repo workshop) |
| macOS | **Not run** | — | Guide đã ghi "chưa được chạy kiểm chứng trên máy Mac" |
| Mục 4.2 Try an AI Agent | **Not run** — chưa cài/đăng nhập Codex hoặc Claude Code theo guide, chưa chạy prompt | — | Chạy trên máy Tấn Hiệp trước khi nộp |
| Lỗi `npm.ps1` (Troubleshooting) | **Not checked** — PowerShell trong môi trường Claude Code có ExecutionPolicy `Process = Bypass` | F01c-1-cc REPORT | Tái hiện trên PowerShell thường của máy Tấn Hiệp |
| Link ngoài trong References | **Not checked** | — | Mở lại trước khi nộp |

**Lỗi trong quá trình kiểm (đã xử lý):** script áp snippet của Claude Code sai 2 lần ở F01c (CRLF ở CO-02, escaping backtick ở CO-12); run 14:11:33–14:11:40 bị loại và chạy lại. Mọi số trong bảng lấy từ run sau khi áp đúng.

## Handoff & Review

- Deliverable and destination: `materials/s4/Verification_Notes_Tan_Hiep.md`; evidence ở `experiments/s4/runs/F01a-1-cc/`, `experiments/s4/runs/F01c-1-cc/`.
- Pending / blockers: (1) nhóm thống nhất ngôn ngữ guide (REQ-17 ghi English); (2) chạy mục 4.2 AI Agent; (3) tái hiện lỗi `npm.ps1`; (4) kiểm macOS hoặc giữ câu "chưa kiểm chứng"; (5) mở lại link ngoài; (6) người ngoài tác giả chạy theo guide.
- Checks performed: chạy lại mục 2.2–4.1 trên Windows 11 (F01c-1-cc); đếm Stryker từ `mutation.json`; đối chiếu headings với REQ-17/REQ-18; run chẩn đoán `tempDirName`. Không có gì khác.
- Leader review: Pending

## Task-Specific Checklist

- [x] Đủ 6 phần REQ-17 và mục Failure Modes ≥3 (REQ-18).
- [x] Lệnh mục 2.2–4.1 chạy được trên Windows 11, số liệu khớp 4 mốc (F01c-1-cc).
- [x] Số liệu Stryker truy được về `mutation.json`.
- [ ] Guide English theo REQ-17 — không đạt theo chữ; viết tiếng Việt theo quyết định của Tấn Hiệp.
- [ ] Mục 4.2 AI Agent — Not run.
- [ ] macOS — Not run.
- [ ] Lỗi `npm.ps1` — Not checked.
- [ ] Nguyên nhân cần `tempDirName` ở S3 — chưa kiểm chứng.
- [ ] Link URL ngoài — Not checked.
- [ ] Người khác chạy lại guide từ máy sạch — Not run.
