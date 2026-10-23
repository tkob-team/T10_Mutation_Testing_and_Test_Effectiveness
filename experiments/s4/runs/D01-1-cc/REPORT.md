# D01-1-cc REPORT

## Thông tin run

| Mục | Giá trị |
|---|---|
| Task | S4-D01 — reproduction walkthrough Coupons, **chỉ** theo `materials/s4/Guide_Contribution_Thai_Hoa.md` |
| Executor | Claude Code, model `claude-opus-5-5` (run `-cc`, không phải Tấn Hiệp tự chạy) |
| Thời gian | 2026-10-23 14:40:46–14:48:24 (+07:00) |
| OS / shell | Windows 11 Home Single Language 10.0.26200; PowerShell 7 (như guide) |
| Versions | Node v24.15.0, npm 11.12.1 (guide ghi run đã lưu dùng Node 24.16.0, npm 12.0.2) |
| Guide đã thử | `guide-tested.md` (bản sao), SHA-256 `0cd4b2803b6ce7fade4671196ccd30af0fbd92a3d9830c88210a3433bfe79da0`, file ở seminar commit `906e947` |
| SUT | clone mới `eshop-coupons-s4` trong `C:\Users\tanhi\AppData\Local\Temp\claude\D--HK7-Testing-Seminars-Repo\3058f82a-a124-4cce-853c-9bab797d6360\scratchpad\d01`, detached `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` |

Nguyên tắc: chỉ làm theo chữ trong guide. Không đọc experiment log, AI record hay file reproduction của người khác để đoán bước thiếu. Riêng `Guide_Reproduction_Thai_Hoa.md` chỉ được đọc **sau khi** walkthrough xong, để lấy cấu trúc cho file Tan_Hiep.

## Evidence

- `console.log`: mọi lệnh, header `### <giờ> | <commit> | cwd | > <lệnh>`, dòng `--- START | END | giây | exit`; các dòng `### NOTE` ghi chỗ phải xử lý ngoài chữ của guide.
- `coupons/`, `coupons-manual/`, `coupons-ai/`: `mutation.json` và `mutation.html`.
- `count_d01.js` → `count_d01.md`: đếm trạng thái từ `mutation.json`, liệt kê mutant đổi trạng thái so với baseline (khóa bằng vị trí + mutator + replacement).
- `guide-tested.md`, `guide-tested.sha256`.

## Kết quả từng bước

| Mục guide | Lệnh | Thời gian | Kết quả | So với guide |
|---|---|---|---|---|
| Installation | `git clone ... eshop-coupons-s4`; `Set-Location`; `git rev-parse --show-toplevel`; `git status --short`; `git switch --detach 806ba19…`; `git rev-parse HEAD` | 14:40:46–14:40:48 | exit 0; HEAD `806ba19ee4e0…` | Khớp |
| Installation | `node --version`; `npm.cmd --version` | 14:40:48 | v24.15.0; 11.12.1 | Khác version đã ghi trong guide, chạy vẫn được |
| Installation | `npm.cmd ci --no-audit --no-fund` | 14:40:48–14:41:05 (17 s) | exit 0, 672 packages | Khớp |
| Installation | `npm.cmd test` | 14:41:05–14:41:07 (2 s) | 4 suites, 88/88 pass | Khớp (88) |
| Installation | `npm.cmd run test:coupons` | 14:41:07–14:41:08 (1 s) | 2 suites, 26/26 pass | Khớp (26 = 25 + 1) |
| First Test | `npm.cmd run test:coupons` | 14:41:19–14:41:20 (1 s) | 26/26 pass | Khớp |
| First Test | `npm.cmd run coupons:dry` | 14:41:20–14:41:24 (4 s) | exit 0; 120 mutants; dry run "Ran 52 tests" | Guide không nêu số; xem G-04 |
| First Test | `npm.cmd run mutate:coupons` | 14:41:24–14:43:26 (122 s; Stryker 2 min 0 s) | 120 mutants: Killed 39, Timeout 21, Survived 30, NoCoverage 25, RuntimeError 5; score 52.17% | **Khớp** bảng tham chiếu |
| Persisted-Limit Gap | đọc `server.js:474`, report | — | dòng 474 `max_uses_per_user \|\| 1,`; mutant 111 ConditionalExpression `true` Survived, 113 LogicalOperator `max_uses_per_user && 1` Survived | Khớp (ID 111, 113 cũng trùng) |
| Advanced, overlay (lần 1) | clone seminar vào thư mục cha `<tmp>\d01`, chạy khối overlay nguyên văn | 14:43:50–14:43:53 | `git clone` exit 128: `Filename too long`, checkout thất bại; overlay báo `Cannot find path ...`; hai lệnh jest exit 1 | **Lỗi**, xem G-01, G-02 |
| Advanced, overlay (lần 2) | khối overlay, dòng `$docsRoot` đổi thành clone seminar có sẵn `D:\HK7\Testing\Seminars\Repo\T10_Mutation_Testing_and_Test_Effectiveness` (guide cho phép "reuse its path") | 14:44:09 | copy 7 file: 2 jest config, 2 stryker config, `test/ai/coupons.ai.js`, `test/helpers/coupons-scenarios.js`, `test/manual/coupons.manual.js` | Khớp "seven-file overlay" |
| Advanced | `node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand` | 14:44:09–14:44:10 | 3 suites, 35/35 pass | Khớp (35) |
| Advanced | `node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand` | 14:44:10–14:44:12 | 3 suites, 40/40 pass | Khớp (40) |
| Advanced | `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json` | 14:44:20–14:46:14 (114 s) | 41 / 21 / 28 / 25 / 5; 53.91%; Killed/valid 35.65% | **Khớp** |
| Advanced | `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json` | 14:46:14–14:48:24 (130 s) | 41 / 21 / 28 / 25 / 5; 53.91%; Killed/valid 35.65% | **Khớp** |
| Compare and Explain | đếm từ `mutation.json` | — | Manual và AI cùng kill đúng 2 mutant so với baseline: 111 (`true`) và 113 (`&&`) ở 474:7; không mutant nào khác đổi trạng thái | Khớp ("same two additional limit mutants") |
| Review or Request an AI Candidate | — | — | **Not run**: không gửi request AI mới; link PROVENANCE tồn tại (chỉ kiểm có file) | — |

Sau các bước: `server.js`, `database.js`, `database.sqlite`, `package.json`, `package-lock.json` không đổi (`git diff --quiet HEAD`); working tree chỉ có 7 file untracked của overlay.

Link tương đối trong guide: 9/9 đường dẫn tồn tại trong seminar repo (kiểm có file, chưa đọc nội dung). Link URL ngoài: Not checked.

## Bước thiếu, mơ hồ hoặc lỗi

- **G-01 (mơ hồ, chặn nếu chưa có clone):** guide yêu cầu bắt đầu "in a new parent directory containing the seminar documentation clone" nhưng không có lệnh hay URL để clone seminar repo. "New" và "containing the clone" mâu thuẫn với người chưa có clone. Claude Code lấy URL từ remote của clone local.
- **G-02 (lỗi thật trên Windows):** `git clone` seminar repo trong thư mục sâu (`<tmp>\d01`, khoảng 125 ký tự) checkout thất bại: `fatal: cannot create directory at 'ai-audit/evidence/s3/Phuc_Hoang/PH-S3-TOOLING-01_s3-experiment_AI_Draft/references': Filename too long`. Giả thuyết chưa kiểm chứng: vượt giới hạn 260 ký tự của Windows; thư mục cha ngắn hơn hoặc `git config core.longpaths true` có thể tránh được. Troubleshooting chưa có dòng này.
- **G-03 (thiếu hướng dẫn):** khối overlay hard-code `'../../T10_Mutation_Testing_and_Test_Effectiveness'`. Guide nói "reuse its path" nhưng không chỉ phải sửa dòng `$docsRoot` thế nào. Nếu đường dẫn sai, `Get-ChildItem` lỗi nhưng hai lệnh jest sau đó chỉ báo exit 1 không rõ nguyên nhân.
- **G-04 (chưa giải thích):** dry run báo "Ran 52 tests" (baseline), 70 (manual), 80 (AI), gấp đôi số Jest (26 / 35 / 40). Guide không nhắc; người đọc có thể tưởng sai số test. Hiện tượng tương tự ở Cart (F01a, C01-rehearsal-cc). Nguyên nhân chưa kiểm chứng.
- **G-05 (cảnh báo không có trong Troubleshooting):** cả ba run Stryker in nhiều dòng `ChildProcessCrashedError ... exit code 3221225477` (60 dòng "exited unexpectedly" trong log), nhưng run vẫn exit 0 và số liệu khớp. Troubleshooting của guide chưa có dòng cho cảnh báo này.
- **G-06 (nhỏ):** guide không nêu thời gian chạy dự kiến; mỗi full run Coupons mất khoảng 2 phút trên máy này.
- **G-07 (nhỏ):** guide không nói cách dọn 7 file overlay sau khi xong (checkout là disposable nên có thể chấp nhận).

## Ghi chú thuyết trình

1. Guide Coupons tái lập đúng mọi số liệu trên Windows: baseline 52.17%, hai profile mở rộng 53.91%, cùng kill 2 mutant ở dòng 474.
2. Điểm vướng thật nằm ở bước lấy overlay từ seminar repo (đường dẫn dài trên Windows, thiếu lệnh clone), không nằm ở Stryker.
3. Số "tests" trong dry run Stryker gấp đôi số Jest ở cả Cart và Coupons; khi trình bày nên đọc số Jest.

## AI usage

Log phiên do hook ghi: `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.
