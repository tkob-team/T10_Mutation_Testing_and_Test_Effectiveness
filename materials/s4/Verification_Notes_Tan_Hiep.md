# Task Notes

**Document Role:** Ghi chú kiểm chứng S4-F01 cho toàn bộ `materials/s4/User_Guide.md` (bản ghép ba domain) và phần Cart & Orders đã kiểm trước đó. Bản AI-drafted (Claude Code, Opus 5.5). Kiểm số liệu, code block, link bằng script (**đã chạy**); các bước cần người hoặc máy khác ghi **chưa kiểm chứng** / **Not run**.  
**Stage:** S4  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S4-F01 (F01a, F01c, kiểm User Guide bản ghép)  
**Domain / Section:** Kiểm chứng `materials/s4/User_Guide.md` (Cart & Orders, Coupons, Authentication & Users) theo REQ-17/REQ-18 và evidence S3/S4  
**Evidence Status:** Partial — số liệu trong guide khớp nguồn 36/36 claim; code block và link đủ. Đã chạy lại theo guide: Cart (F01c-1-cc), Coupons (D01-1-cc, D01-1), Auth Installation/First Test (D02, agent Codex). Chưa kiểm chứng: các bước mới thêm ở AI-S4-E01-02, Advanced Usage của Auth theo guide, mục AI Agent của Cart, macOS; chưa có người review bản dịch.

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Assigned Work & Inputs

- **Task:** theo Task Output Map, S4-F01 → `materials/s4/Verification_Notes_Tan_Hiep.md`, mẫu Task Notes. Lượt này mở rộng từ phần Cart sang toàn bộ bản ghép.
- **Đối tượng kiểm:** [`User_Guide.md`](User_Guide.md) (bản ghép, commit gần nhất `768701a`); phần Cart & Orders cũ kiểm trên `draft/User_Guide.md` (giữ nguyên bên dưới).
- **Tiêu chí:** REQ-17 (User Guide, ≥6 phần: Introduction, Install, First Test, Advanced Usage, Troubleshooting, References) và REQ-18 (Failure Modes ≥3 cách thật) trong `docs/requirements/Seminar_Requirements_Consolidated.md`; Troubleshooting ≥3 lỗi thật có nhãn.
- **Nguồn đối chiếu:** `experiments/s4/runs/` (F01a-1-cc, F01c-1-cc, D01-1-cc, `Tan_Hiep/D01-1`, C01-rehearsal-cc), [`Guide_Reproduction_Thai_Hoa.md`](Guide_Reproduction_Thai_Hoa.md) (D02), `experiments/s3/runs/Phuc_Hoang/`, `experiments/s3/runs/Thai_Hoa/`, `experiments/s3/runs/Tan_Hiep/`.
- **Ngôn ngữ:** guide viết tiếng Việt (giữ English technical terms, lệnh, tiêu đề mục chuẩn). Theo Tấn Hiệp, Hòa (leader) đã đồng ý; khác chữ của REQ-17 (English).

## Record

Script: [`verify_user_guide.js`](../../experiments/s4/runs/F01-verify-cc/verify_user_guide.js); đầu ra: [`verify_output.txt`](../../experiments/s4/runs/F01-verify-cc/verify_output.txt). Chạy từ gốc repo seminar: `node experiments/s4/runs/F01-verify-cc/verify_user_guide.js`.

### A. Requirements

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| REQ-17: đủ section | **Đủ:** 8 heading cấp 2: Ghi chú bản ghép, Introduction, Installation, First Test, Advanced Usage, Troubleshooting, Failure Modes, References; đủ 6 section bắt buộc | `verify_output.txt` mục 1 | — |
| REQ-17: ngôn ngữ | Guide viết **tiếng Việt**; theo Tấn Hiệp, Hòa đã đồng ý. Không đạt theo chữ của REQ-17 (English) | Ghi chú bản ghép đầu guide | Cần giảng viên biết (chưa có evidence đã báo) |
| REQ-18: ≥3 failure modes thật | **Đạt:** 8 mục; 6 mục có evidence nêu trong guide (mục 1–6: run/log, sandbox, toy, thí nghiệm); mục 7 (console ghi kill sai test, Cart) và mục 8 (context dùng chung, Coupons) không dẫn evidence trong guide | `verify_output.txt` mục 1 | Tác giả bổ sung evidence cho mục 7, 8 (xem mục cần sửa) |
| Troubleshooting: ≥3 lỗi thật có nhãn | **Đạt:** 24 dòng; 11 dòng có nhãn "Đã gặp" (Observed), 8 dòng chỉ "Đề xuất", 5 dòng chưa gắn nhãn (đều của Coupons) | `verify_output.txt` mục 1 | Hòa gắn nhãn 5 dòng còn lại |

### B. Bước theo domain × mục

"Đã kiểm" = có run chạy đúng bước đó; "chưa kiểm chứng" = chưa có run nào chạy bước đó theo guide.

| Domain | Mục | Bước / lệnh | Evidence | Trạng thái |
|---|---|---|---|---|
| Chung | Installation chung | `git --version`, `node --version`, `npm --version`; Node 24.x | F01c-1-cc, D01-1-cc (Node v24.15.0, npm 11.12.1) | Đã kiểm (Windows); macOS chưa kiểm chứng |
| Cart | Installation | `git clone` workshop, `npm ci`, `npm test` (88) | F01c-1-cc | Đã kiểm |
| Cart | Installation | `npm install --save-dev --save-exact @stryker-mutator/...@10.0.0`, tạo `stryker.config.json` | F01c-1-cc | Đã kiểm |
| Cart | First Test | `npm run test:cart`, `npx stryker run` (7 Survived), `cp` baseline | F01c-1-cc | Đã kiểm |
| Cart | First Test | Sửa CO-02, chạy lại (3 Killed, 4 Survived) | F01c-1-cc | Đã kiểm |
| Cart | Advanced Usage | Củng cố ba kiểm tra (CO-04, CO-12), 7 Killed | F01c-1-cc | Đã kiểm |
| Cart | Advanced Usage | Thử với AI Agent (cài Codex/Claude Code, prompt, `cp` ai.json) | — | **Chưa kiểm chứng** |
| Cart | Advanced Usage | Mở rộng phạm vi (`mutate: ["server.js"]`) | — | Chưa kiểm chứng (hướng dẫn mở, không có số mong đợi) |
| Coupons | Installation | `git clone` repo seminar ở thư mục cha ngắn (**mới thêm ở AI-S4-E01-02**) | D01-1-cc: lệnh này lỗi `Filename too long` ở thư mục tạm sâu | **Chưa kiểm chứng** ở thư mục ngắn |
| Coupons | Installation | Clone SUT, `git switch --detach 806ba19…`, `npm.cmd ci`, `npm.cmd test` (88), `npm.cmd run test:coupons` (26) | D01-1-cc, D01-1 | Đã kiểm |
| Coupons | First Test | `test:coupons`, `coupons:dry`, `mutate:coupons` (120; 39/21/30/25/5; 52.17%) | D01-1-cc, D01-1; S3 `frozen-coupons-baseline` | Đã kiểm |
| Coupons | First Test | Dòng 474, mutant 111 (`true`), 113 (`&&`) Survived | D01-1-cc `count_d01.md`; D01-1 NOTES | Đã kiểm |
| Coupons | Advanced Usage | Khối overlay nguyên văn (`$docsRoot` tương đối, clone seminar nằm cạnh) | D01-1-cc lần 1: lỗi vì clone seminar thất bại | Chưa chạy được nguyên văn |
| Coupons | Advanced Usage | Khối overlay với `$docsRoot` trỏ clone có sẵn | D01-1-cc lần 2, D01-1 | Đã kiểm (7 file) |
| Coupons | Advanced Usage | Jest manual / AI (35 / 40), Stryker manual / AI (41/21/28/25/5; 53.91%) | D01-1-cc, D01-1; S3 Coupons-extensions | Đã kiểm |
| Coupons | Advanced Usage | PROVENANCE: kiểm hash `candidate.raw.js` | D01-1 (cuối `console.log`): khớp `7B51…1E81` | Đã kiểm |
| Coupons | Advanced Usage | PROVENANCE: review candidate theo 5 điểm | — | **Chưa làm** (D01-1 khối 4 Pending) |
| Coupons | Advanced Usage | Request AI mới (prompt mới) | — | Chưa kiểm chứng |
| Auth | Installation | Clone SUT, checkout `806ba19`, `npm ci --no-audit --no-fund`, `npm test` (88) | D02 (Windows, agent Codex); S3 E03 (macOS, Phúc) | Đã kiểm |
| Auth | Installation | Sandbox C03 (66.67% / 88.89%) | S3 `C03-weak`, `C03-strong` | Đã kiểm (số liệu) |
| Auth | First Test | `npm run test:auth` (26), dry run, `npm run mutate:auth` (125; 60/27/23/7/8; 74.36%) | D02; S3 E03-baseline (+ repeat); S3 `frozen-auth-baseline` (Windows, agent Codex) | Đã kiểm |
| Auth | Advanced Usage | `git switch --detach eea3ed4…` (**mới thêm ở AI-S4-E01-02**) | — | **Chưa kiểm chứng** theo guide |
| Auth | Advanced Usage | `npm run test:auth:manual` (39), `npm run mutate:auth:manual` (83/27/4/3/8; 94.02%) | S3 F03-manual (Phúc, trên `eea3ed4`); D02 theo guide cũ: `Missing script` | Số liệu đã kiểm; bước theo guide **chưa kiểm chứng** |
| Auth | Advanced Usage | `mkdir ai-run && cd ai-run`, `claude -p "$(cat prompt.txt)" ...` và câu đặt `prompt.txt` vào `ai-run` (**câu mới thêm ở AI-S4-E01-02**) | S3 G03-ai `command.txt` (lệnh đã chạy ở S3); D02-02 (desk review) | **Chưa kiểm chứng** theo guide |
| Auth | Advanced Usage | `git switch --detach b27fce2…` (**mới thêm ở AI-S4-E01-02**) | — | **Chưa kiểm chứng** theo guide |
| Auth | Advanced Usage | `npm run test:auth:ai` (37), `npm run mutate:auth:ai` (74/27/13/3/8; 86.32%) | S3 G03-ai (Phúc, trên `b27fce2`) | Số liệu đã kiểm; bước theo guide **chưa kiểm chứng** |
| Auth | Advanced Usage | Bảng Stryker option (Run / *untested here*) | Nhãn của Phúc | Không kiểm lại |

### C. Số liệu trong guide so với nguồn (script)

**36/36 claim khớp, 0 lệch, 0 không tìm thấy nguồn.** Script trích các câu/bảng số trong `User_Guide.md`, đếm trạng thái từ `mutation.json` (khóa mutant bằng vị trí đầu–cuối + mutator + replacement) hoặc tìm dòng `Tests:` trong log.

| Nhóm | Claim đã kiểm | Nguồn |
|---|---|---|
| Cart workshop | 7 Survived → 3 Killed / 4 Survived → 7 Killed / 0 Survived / 0 Timeout | `s4/runs/F01c-1-cc/{baseline,first-test,manual}.json` |
| Cart SUT (Failure Modes 2) | 25 Timeout trên 107 detected; 25 Timeout (config đóng băng) và 18 Timeout (config nhánh) | `s3/runs/Tan_Hiep/E01-1`, `F01-2`, `G01-2`; `s3/runs/Thai_Hoa/D04-merge-…/cart-reproduced-manual` |
| Coupons | Baseline 120; 39/21/30/25/5; 52.17%; valid 115; 33.91% | `frozen-coupons-baseline` (S3), D01-1-cc, D01-1 |
| Coupons | Extended manual và AI 41/21/28/25/5; 53.91%; 35.65% | `Coupons-extensions-…` (S3), D01-1-cc, D01-1 |
| Coupons (Failure Modes 1) | Toy example 60% | `s3/runs/Thai_Hoa/C02-D02-…/tutorial-weak/mutation.json` |
| Auth | Baseline 125; 60/27/23/7/8; 74.36%; 51.28%; manual 94.02% / 70.94%; AI 86.32% / 63.25%; raw 89.74% | `s3/runs/Phuc_Hoang/E03-baseline`, `F03-manual`, `G03-ai`, `G03-ai/raw-candidate-run` |
| Auth | 27/87 Timeout (31%), chênh 23.1 điểm; cùng tập 27 Timeout ở baseline/manual/AI | `E03-baseline`, `F03-manual`, `G03-ai` |
| Auth | Kill mapping 30 analysed: manual 23, AI 14, cả hai 13, chỉ AI 1, chỉ manual 10, không bên nào 6; manual không làm Killed tụt | tính từ 3 `mutation.json` |
| Auth | Windows tái lập 0 khác biệt / 125; provisional 73.45% (4 mutant RuntimeError → Timeout) | `frozen-auth-baseline`, `E03-provisional` |
| Auth | Sandbox 66.67% / 88.89%; disable comment 88.89% → 100% | `C03-weak`, `C03-strong`, `A03-S1-strong`, `A03-S1-ignored` |
| Số tests | 88, 26, 35/40 (Coupons); 36, 88 (Cart workshop); 39, 37 (Auth) | `console.log` của D01-1-cc, F01c-1-cc; log của F03/G03 |

**Không kiểm bằng script** (không có số trong `mutation.json`, hoặc là nhận định): thời gian chạy ("about 1 min 25 s"); 544 packages; 9 nhóm candidate (7/1/1) và 12 mutant Claude từ chối; "17 vs 18 / 13 vs 12" trong tóm tắt của Claude; nhãn "5 spec / 18 convention"; 8 RuntimeError do SQL rỗng (nguyên nhân); 42/60 dòng cảnh báo crash (đếm tay từ log ở lượt trước).

### D. Kiểm cơ học

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Code block của ba `Guide_Contribution_*` còn nguyên văn trong guide | **Đạt:** Tan_Hiep 20/20, Thai_Hoa 6/6, Phuc_Hoang 5/5 | `verify_output.txt` mục 3 | — |
| Link tương đối | **Đạt:** 51 link, 0 hỏng; 1 anchor nội bộ (`#failure-modes`) phân giải được | `verify_output.txt` mục 3 | Link URL ngoài: Not checked |
| Placeholder / TODO | **Đạt:** 0 (không tính `<rootDir>`, `<Mutator>`, `<reason>` trong code, là cú pháp thật) | `verify_output.txt` mục 3 | — |

### E. Phần Cart & Orders (kiểm trên `draft/User_Guide.md`, giữ nguyên từ lượt trước)

Số mục trong bảng này theo cách đánh số của `draft/User_Guide.md`; trong bản ghép, các mục này nằm ở Setup riêng / First Test / Advanced Usage của Cart. Dòng "Mục 1 Tested environment" đã được xử lý ở AI-S4-E01-02 (guide đổi sang môi trường F01c).

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

### F. Section/bước cần tác giả sửa

Không tự sửa guide trong lượt này; danh sách để tác giả xử lý.

| Tác giả | Vị trí (heading) | Việc cần sửa | Lý do |
|---|---|---|---|
| Thái Hòa | Troubleshooting: 5 dòng Coupons "chưa gắn nhãn" (`EJSONPARSE`, `npx` không tìm đúng binary, tests fail trên code gốc, HTML hiển thị giá trị cũ, xác thực AI thất bại) | Gắn nhãn Đã gặp / Đề xuất | Bản ghép không có evidence để tự gắn nhãn |
| Thái Hòa | Failure Modes › 6 "Thêm case không đảm bảo thêm kill"; 8 "Context và helper dùng chung…" | Thêm link evidence (mục 6 có thể dẫn `Coupons-extensions-…/README.md` hoặc D01-1-cc `count_d01.md`; mục 8 chưa có nguồn) | REQ-18 cần failure mode "thật", có evidence |
| Thái Hòa | Installation › Setup riêng: Coupons › Prepare the Frozen Checkout (lệnh clone seminar) | Chạy lệnh clone ở thư mục cha ngắn và ghi kết quả, hoặc ghi rõ cách dùng lại clone là cách chính | Lần clone duy nhất có evidence (D01-1-cc) bị `Filename too long` |
| Thái Hòa | Advanced Usage › Coupons › Load the Retained Additional Tests | Cân nhắc thêm kiểm `Test-Path $overlayRoot` để khối lệnh dừng khi đường dẫn sai | D01-1-cc lần 1: lỗi `Cannot find path` nhưng khối vẫn chạy tiếp, jest exit 1 |
| Phúc Hoàng | Advanced Usage › Authentication & Users › 2. Manual assertions và 3. Quy trình với Claude › bước 5 (checkout `eea3ed4`, `b27fce2`) | Chạy lại theo guide từ checkout `806ba19` và xác nhận 39 / 37 tests, số mutation | Bước do bản ghép thêm dựa trên Experiment Log; chưa ai chạy theo guide |
| Phúc Hoàng | Advanced Usage › Authentication & Users › 3. Quy trình với Claude › bước 2 | Sửa lệnh để `prompt.txt` được đặt vào `ai-run` (ví dụ thêm lệnh copy), rồi chạy lại | Bản ghép chỉ thêm câu giải thích; lệnh vẫn `cd ai-run` trước `cat prompt.txt` |
| Tấn Hiệp | Failure Modes › 7 "Output trên console có thể ghi nhận kill sai test" | Dẫn evidence cụ thể (run/log S3 nơi quan sát) | Mục này không dẫn evidence trong guide |
| Tấn Hiệp | Advanced Usage › Cart & Orders › Thử với AI Agent | Chạy trên máy mình, ghi tool/model và kết quả | Chưa có run nào |
| Tấn Hiệp | Troubleshooting › dòng `No tests were found` (phần Cart) | Cân nhắc ghi thêm: với config tối giản của guide, bỏ `tempDirName` vẫn chạy được (F01c `diag-tempDirName.log`, run chẩn đoán) | Tránh người đọc hiểu `tempDirName` là bắt buộc với mọi config |

## Handoff & Review

- Deliverable and destination: `materials/s4/Verification_Notes_Tan_Hiep.md`; script và đầu ra ở `experiments/s4/runs/F01-verify-cc/`; evidence chạy ở `experiments/s4/runs/F01a-1-cc/`, `F01c-1-cc/`, `D01-1-cc/`, `Tan_Hiep/D01-1/`.
- **Việc cần người:**
  1. Review bản dịch Coupons và Auth trong `User_Guide.md` — Tấn Hiệp, **chưa làm**.
  2. Chạy lại các bước mới thêm ở AI-S4-E01-02: checkout `eea3ed4` / `b27fce2` và bước `prompt.txt` (Phúc); clone repo seminar ở thư mục ngắn (Hòa).
  3. Chạy mục "Thử với AI Agent" của Cart — Tấn Hiệp.
  4. Review candidate G02 theo 5 điểm ở phần PROVENANCE (khối 4 của D01-1 đang Pending) — Tấn Hiệp.
  5. Gắn nhãn 5 dòng Troubleshooting Coupons — Hòa.
  6. Mở lại link URL ngoài; tái hiện lỗi `npm.ps1` trên PowerShell thường; macOS — chưa ai làm.
- Checks performed: script kiểm cấu trúc, số liệu (36 claim), code block, link, placeholder; đối chiếu từng bước với run S3/S4 và reproduction D02; phần Cart chạy lại ở F01c-1-cc. Không có gì khác.
- Leader review: Pending

## Task-Specific Checklist

- [x] Đủ 6 section REQ-17; Failure Modes 8 mục, 6 mục có evidence (REQ-18).
- [x] Troubleshooting ≥3 lỗi thật có nhãn (11 dòng "Đã gặp").
- [x] Số liệu trong guide truy được về `mutation.json` / log: 36/36 khớp.
- [x] Code block của ba contribution còn nguyên văn; link tương đối không hỏng; không còn placeholder.
- [x] Cart: lệnh chạy được trên Windows 11, khớp 4 mốc (F01c-1-cc).
- [x] Coupons: Installation, First Test, Advanced Usage (trừ AI request mới và review candidate) chạy lại khớp (D01-1-cc, D01-1).
- [ ] Auth Advanced Usage theo guide — chưa kiểm chứng (bước checkout mới thêm).
- [ ] Các bước mới thêm ở AI-S4-E01-02 — chưa kiểm chứng.
- [ ] Mục AI Agent của Cart — Not run.
- [ ] Review bản dịch Coupons/Auth — chưa làm.
- [ ] Guide English theo chữ REQ-17 — không; tiếng Việt theo quyết định của Tấn Hiệp, Hòa đã đồng ý (theo Tấn Hiệp).
- [ ] macOS, lỗi `npm.ps1`, link URL ngoài — Not checked.
- [ ] Nguyên nhân cần `tempDirName` ở S3 — chưa kiểm chứng.
- [ ] Người ngoài tác giả chạy lại guide từ máy sạch — Cart: Not run; Coupons: Tấn Hiệp đã chạy (D01-1); Auth: chỉ agent (D02).
