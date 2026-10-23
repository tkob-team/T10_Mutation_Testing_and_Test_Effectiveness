# Task Notes

**Document Role:** Kết quả reproduction guide Coupons và feedback cho tác giả.  
**Stage:** S4  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S4-D01  
**Domain / Section:** Coupons walkthrough của Thái Hòa (`Guide_Contribution_Thai_Hoa.md`)  
**Evidence Status:** Claude Code (run `D01-1-cc`) chạy hết Installation, First Test và Advanced Usage (trừ phần gửi AI request mới); mọi số liệu khớp guide. Có 1 lỗi thật ở bước lấy overlay. **Tấn Hiệp tự chạy (D01-1):** đã chạy Installation, First Test và Advanced Usage, số liệu khớp guide và D01-1-cc; chưa làm phần Review or Request an AI Candidate.

## Assigned Work & Inputs

Đầu vào duy nhất là [Coupons Guide Contribution](Guide_Contribution_Thai_Hoa.md). Bản đã thử được chụp nguyên văn tại [guide-tested.md](../../experiments/s4/runs/D01-1-cc/guide-tested.md), SHA-256 `0cd4b2803b6ce7fade4671196ccd30af0fbd92a3d9830c88210a3433bfe79da0` (seminar commit `906e947`). Chỉ làm theo chữ trong guide. Không đọc experiment log hay AI record của tác giả để đoán bước thiếu.

**Executor:** Claude Code, model `claude-opus-5-5`. Đây là lần chạy của Claude Code (hậu tố `-cc`), **không phải** Tấn Hiệp tự chạy.

Môi trường thực tế: Windows 11, PowerShell 7, Node v24.15.0, npm 11.12.1; guide ghi run đã lưu dùng Node 24.16.0, npm 12.0.2. SUT clone mới, detached đúng `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Adaptation duy nhất: ở bước overlay, `$docsRoot` trỏ tới clone seminar có sẵn, vì clone mới trong thư mục tạm checkout thất bại (D01-01).

## Record

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Clone SUT, detached checkout `806ba19` | Đúng frozen SHA | [console.log](../../experiments/s4/runs/D01-1-cc/console.log) | Pass |
| `npm.cmd ci --no-audit --no-fund` | Exit 0, 17 s | console.log | Pass |
| `npm.cmd test` | 88/88 pass | console.log | Khớp guide |
| `npm.cmd run test:coupons` | 26/26 pass (2 suites) | console.log | Khớp guide |
| `npm.cmd run coupons:dry` | Exit 0; 120 mutants; "Ran 52 tests" | console.log | D01-04 |
| `npm.cmd run mutate:coupons` | 120 mutants: 39 Killed, 21 Timeout, 30 Survived, 25 NoCoverage, 5 RuntimeError; 52.17%; 2 phút 0 giây | [JSON](../../experiments/s4/runs/D01-1-cc/coupons/mutation.json), [HTML](../../experiments/s4/runs/D01-1-cc/coupons/mutation.html) | Khớp bảng tham chiếu |
| Persisted-Limit Gap, `server.js:474` | Mutant 111 (`true`) và 113 (`&&`) Survived ở baseline | `coupons/mutation.json` | Khớp guide |
| Overlay, lần 1 (clone seminar vào thư mục cha) | `git clone` lỗi `Filename too long`, checkout thất bại; overlay `Cannot find path`; jest exit 1 | console.log 14:43:50–14:43:53 | D01-01, D01-02 |
| Overlay, lần 2 (`$docsRoot` = clone có sẵn) | Copy đủ 7 file | console.log 14:44:09 | D01-03 |
| Jest manual / AI mở rộng | 35/35 và 40/40 pass | console.log | Khớp guide |
| Stryker manual mở rộng | 41 / 21 / 28 / 25 / 5; 53.91%; Killed/valid 35.65%; 1 phút 54 giây | [JSON](../../experiments/s4/runs/D01-1-cc/coupons-manual/mutation.json) | Khớp guide |
| Stryker AI mở rộng | 41 / 21 / 28 / 25 / 5; 53.91%; Killed/valid 35.65%; 2 phút 10 giây | [JSON](../../experiments/s4/runs/D01-1-cc/coupons-ai/mutation.json) | Khớp guide |
| Mutant đổi trạng thái so với baseline | Cả hai profile chỉ kill thêm 111 và 113 | [count_d01.md](../../experiments/s4/runs/D01-1-cc/count_d01.md) | Khớp "same two additional limit mutants" |
| Review or Request an AI Candidate | Not run; không gửi request AI mới | — | Ngoài phạm vi run này |
| Link tương đối trong guide | 9/9 tồn tại (chỉ kiểm có file) | [REPORT](../../experiments/s4/runs/D01-1-cc/REPORT.md) | Link URL ngoài: Not checked |
| File SUT sau run | `server.js`, `database.js`, `database.sqlite`, `package.json`, lockfile không đổi; chỉ có 7 file untracked của overlay | REPORT | Pass |

### Tấn Hiệp tự chạy (D01-1)

Executor: Lê Tấn Hiệp, 2026-10-23, Windows 11, Node v24.15.0, npm 11.12.1, thư mục `C:\w\D01-1`. Tấn Hiệp dán các khối PowerShell do Claude Code soạn sẵn (lệnh nguyên văn từ guide, bọc trong hàm `Step` để in header). Evidence: [console.log](../../experiments/s4/runs/Tan_Hiep/D01-1/console.log) (Start-Transcript), [NOTES.md](../../experiments/s4/runs/Tan_Hiep/D01-1/NOTES.md), report `coupons/`, `coupons-manual/`, `coupons-ai/` và [count_d01.md](../../experiments/s4/runs/Tan_Hiep/D01-1/count_d01.md) trong cùng thư mục.

Khác guide (theo NOTES): (1) chạy trong thư mục ngắn `C:\w\D01-1`, không chứa clone seminar; (2) dòng `$docsRoot` trỏ tới clone seminar có sẵn; (3) thêm khối chuẩn bị, hàm `Step`, dòng `XONG KHOI n` / `BẠN LÀM`.

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Lần chạy 1 (14:56–15:19), khối 0–3 | Trong log, hai lệnh bị cắt: khối overlay kết thúc bằng `-Destination $des`, và lệnh Stryker manual thành `node node_modules/@stryker-mutstryker.coupons.manual.config.json` (exit 1). Ba file overlay bị copy lạc vào `backend/` gốc (`coupons.ai.js`, `coupons.manual.js`, `coupons-scenarios.js`) | console.log 15:18:09–15:18:12 | Giả thuyết: lệnh bị cắt khi dán. Ba file lạc không khớp `testMatch` của config overlay nên không ảnh hưởng lần 2 |
| Lần chạy 2 (15:23–15:35), chạy lại khối 0–3 trong cùng thư mục | `New-Item` báo thư mục đã tồn tại, `git clone` exit 128 (thư mục có sẵn); các lệnh sau chạy trên clone đã checkout `806ba19`; mọi lệnh khác exit 0 | console.log từ 15:23 | Report cuối lấy từ lần 2 |
| `npm.cmd test`, `npm.cmd run test:coupons` | 88 và 26 tests pass (Tấn Hiệp ghi trong NOTES) | NOTES | Khớp guide |
| `mutate:coupons` | 120 mutants: 39 / 21 / 30 / 25 / 5; 52.17% (đếm từ `mutation.json`) | `coupons/mutation.json` | Khớp guide |
| Dòng 474, mutant 111 / 113 | Tấn Hiệp thấy `true` và `max_uses_per_user && 1` | NOTES | Khớp guide |
| Jest manual / AI | 35 / 40 pass (NOTES) | NOTES | Khớp guide |
| Stryker manual / AI | Cả hai 41 / 21 / 28 / 25 / 5; 53.91%; chỉ kill thêm 111 và 113 | `count_d01.md` | Khớp guide; 0 mutant khác trạng thái so với D01-1-cc ở cả 3 report |
| Review or Request an AI Candidate | NOTES ghi "không làm"; request AI mới: không làm. Cuối log có lệnh kiểm SHA-256 của `candidate.raw.js`, kết quả `7B51…1E81` trùng `executed-sha256.json` | NOTES; cuối console.log | **Pending** |
| Bước mơ hồ (NOTES) | "Provenance, không hiểu làm gì" | NOTES | Feedback cho tác giả: guide chưa nói rõ người đọc phải làm gì với PROVENANCE |
| File SUT sau run | `server.js`, `database.js`, `database.sqlite`, `package.json`, lockfile không đổi | `git diff --quiet HEAD` | Pass |

Hạn chế của evidence: `console.log` chỉ có header, mô tả và exit code của từng lệnh; output của các lệnh native (Jest, Stryker, npm) không vào transcript khi chạy qua hàm `Step`. Số liệu trên lấy từ `mutation.json` và NOTES của Tấn Hiệp. Tấn Hiệp báo đã chạy `Stop-Transcript`; `console.log` không đổi sau đó và không có dòng "PowerShell transcript end". Xem [REPORT.md](../../experiments/s4/runs/Tan_Hiep/D01-1/REPORT.md).

## Handoff & Review

- Deliverable and destination: `materials/s4/Guide_Reproduction_Tan_Hiep.md`; evidence ở `experiments/s4/runs/D01-1-cc/`.
- Pending / blockers: (1) Tấn Hiệp tự chạy: đã xong Installation, First Test, Advanced Usage (D01-1); còn phần Review or Request an AI Candidate; (2) tác giả xem feedback D01-01 đến D01-05 và quyết định sửa; (3) retest bước overlay sau khi sửa.
- Checks performed: Claude Code chạy toàn bộ lệnh trong guide trừ phần AI request mới; đếm số liệu từ `mutation.json`; kiểm file SUT không đổi; kiểm link tương đối. Đây không phải member self-run.
- Leader review: Pending.

## Task-Specific Checklist

### Concrete Feedback for the Author

**D01-01, lỗi thật trên Windows:** khi clone seminar repo vào thư mục sâu, checkout thất bại: `fatal: cannot create directory at 'ai-audit/evidence/s3/Phuc_Hoang/PH-S3-TOOLING-01_s3-experiment_AI_Draft/references': Filename too long`. Đề xuất: thêm dòng Troubleshooting (dùng thư mục cha ngắn, hoặc `git config --global core.longpaths true`; cách này chưa kiểm chứng).

**D01-02, thiếu bước:** guide yêu cầu "a new parent directory containing the seminar documentation clone" nhưng không có lệnh và URL clone seminar repo. Đề xuất: thêm lệnh `git clone` của seminar repo trước khi clone SUT.

**D01-03, mơ hồ:** khối overlay hard-code `'../../T10_Mutation_Testing_and_Test_Effectiveness'`; câu "reuse its path" không chỉ rõ phải sửa dòng `$docsRoot`. Khi đường dẫn sai, `Get-ChildItem` lỗi nhưng script vẫn chạy tiếp, nên hai lệnh jest sau đó chỉ exit 1. Đề xuất: ghi rõ cách đặt `$docsRoot` và kiểm `Test-Path $overlayRoot` trước khi copy.

**D01-04, chưa giải thích:** dry run báo "Ran 52 / 70 / 80 tests", gấp đôi số Jest (26 / 35 / 40). Đề xuất: thêm một câu để người đọc không hiểu sai số test.

**D01-05, cảnh báo chưa có trong Troubleshooting:** mỗi run Stryker in nhiều `ChildProcessCrashedError ... exit code 3221225477`, nhưng run vẫn hoàn tất và số liệu khớp. Đề xuất: thêm một dòng Troubleshooting và nêu rằng đây không phải mutant kill.

### Retest Acceptance

1. Nhận guide version mới, ghi hash; giữ bản đã thử.
2. Dùng thư mục mới, làm đúng bước clone seminar và overlay theo bản sửa; lưu output.
3. Chạy lại Jest manual/AI và hai profile Stryker; đối chiếu trạng thái mutant theo vị trí + mutator + replacement.
4. Chốt D01-01 đến D01-05 là resolved hay còn mở.
5. Tấn Hiệp tự chạy và xác nhận trải nghiệm người đọc (Pending).
