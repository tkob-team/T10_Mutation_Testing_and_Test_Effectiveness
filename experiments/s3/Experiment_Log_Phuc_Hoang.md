# Experiment Log

**Document Role:** Working log cá nhân S3; chỉ ghi kết quả đã chạy thật trên máy Phúc Hoàng.  
**Stage:** S3  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S3-C03 (xong, còn C03-5 Pending chờ D04); S3-D03 (tests đã viết và chạy, chờ review); S3-E03, S3-F03, S3-G03, S3-H03, S3-I03 (chưa bắt đầu)  
**Domain / Section:** Authentication & Users  
**Evidence Status:** Partial — C03-1 → C03-4 đã chạy (C03-3: `--bare` lỗi "Not logged in", chạy lại bằng `claude -p` không `--bare`); C03-5 Pending (chờ S3-D04); D03 đã chạy (26 pass, 23 defect tests fail đúng lý do)

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Setup

Máy: macOS (Darwin 27.0.0 arm64), zsh. Node v26.12.0, npm 11.20.0 (2026-10-22). StrykerJS 10.x yêu cầu Node ≥ 22.

Lưu ý phạm vi: demo C03-1/2 là `equiv.js` từ sandbox A03-S1 (chọn theo yêu cầu của thành viên), **không phải** project làm từng bước theo trang Getting Started của Stryker; project được dựng mới và cài lại từ đầu trên máy này.

| OS / Runtime / Tool Versions | Install / Run Command | Result | Evidence | Reset Method |
|---|---|---|---|---|
| C03-1 Cài đặt (project `mt-demo`): macOS arm64, Node v26.12.0, npm 11.20.0, StrykerJS 10.0.0, Jest 30.5.2 | `npm init -y`<br>`npm i -D jest @stryker-mutator/core @stryker-mutator/jest-runner`<br>`npx stryker --version; npx jest --version` | **Pass** 2026-10-22 21:28 — `added 544 packages`. Chỉ có warnings: `ERESOLVE overriding peer dependency` (4 lần), `deprecated glob@10.5.0`, `21 moderate severity vulnerabilities`, và `install-scripts 2 packages have install scripts not yet covered by allowScripts` (`@parcel/watcher`, `unrs-resolver`); không có error. Không chạy `npm audit fix` và không `approve` install-scripts; Stryker và Jest vẫn chạy bình thường | `experiments/s3/runs/Phuc_Hoang/C03-weak/install.log` | Xóa `node_modules`, `reports/`, `stryker-tmp/` |
| C03-2 Stryker run, weak và strong test (cùng `src/equiv.js`) | `npx stryker run stryker.weak.config.json`<br>`npx stryker run stryker.strong.config.json` | **Pass** 2026-10-22 — cả hai exit 0, 18 mutants, errors 0, Timeout 0, NoCoverage 0. **Weak:** Killed 12, Survived 6, score **66.67%**. **Strong:** Killed 16, Survived 2, score **88.89%**; survivors `item.quantity >= 0` (L8) và `if (false)` (L5), cả hai là equivalent candidate (lập luận ở Research Notes F-A03-05). Khớp hoàn toàn A03-S1 chạy trước đó | `experiments/s3/runs/Phuc_Hoang/C03-weak/`, `C03-strong/` (console.log, mutation.html/json, config, `run_meta.txt`) | Không cần |
| C03-3 Claude assertion workflow (survivor mục tiêu của weak: `age >= 18` → `age > 18`, `equiv.js:17:10`, mutant id 15) | Lần 1: `claude --bare -p "Reply with the single word: ok" --output-format json` (probe).<br>Lần 2 (thư mục trống, không tools): `claude -p "$(cat prompt.txt)" --output-format json --tools "" --disable-slash-commands --strict-mcp-config --no-session-persistence --setting-sources local`<br>`npx jest test/equiv.ai.test.js`<br>`npx stryker run stryker.ai.config.json` (weak test + test Claude) | **Lần 1 Fail** 2026-10-22 — exit 1, `Not logged in · Please run /login` (`--bare` không dùng đăng nhập thường, không có `ANTHROPIC_API_KEY`). **Lần 2 Pass** — exit 0, model `claude-sonnet-5-5`. **Spec review:** Claude trích đúng dòng quyết định, chọn input `18`, expected `true` khớp spec demo; 1 test, dùng đúng harness. Test tùy chọn `canRegister(17)` được Claude nói là để bắt mutant "đổi 18 thành 17"; StrykerJS không có mutator đổi hằng số nên không có mutant như vậy (cùng kết luận C01-5 của Tấn Hiệp). **Original-code:** 1/1 pass. **Mutant:** id 15 `age > 18` chuyển **Survived → Killed** (`compare_runs.js`). Tổng 18 mutants: Killed 13, Timeout 0, Survived 5, NoCoverage 0; score **72.22%** (weak 66.67%). Survivor còn lại gồm `return true` (L17), vì test Claude chỉ khẳng định `true`. **Giới hạn:** (1) spec của demo do mình viết trong prompt; (2) đã bỏ comment trong code vì comment gốc nói thẳng "differs at exactly 18" (lộ đáp án); (3) context "sạch" chỉ theo nghĩa thư mục trống, không tools, chỉ nạp settings `local`; chưa xác minh cấu hình cấp user có được nạp hay không; (4) chỉ 1 lần chạy, 1 mutant, chưa đo độ lặp lại | `C03-claude-probe/` (lỗi), `C03-claude/` (`prompt.txt`, `command.txt`, `raw.json` chưa sửa, `raw.err`), `C03-claude-run/` (mutation.json/html, console.log, `equiv.ai.test.js`, config); AI Record: Pending (chưa tạo artifact) | Không cần |
| C03-4 EShop backend + seed/reset Auth & Users (bản copy `git archive bd31bbf backend`, không sửa SUT) | `npm install`<br>`node -e 'require("./database.js")'`<br>`sqlite3 database.sqlite "select id,name,email,role,login_attempts,locked_until from users"` | **Pass** 2026-10-22 21:29 — `npm install` OK (warning: `sqlite3@6.0.1` install script chưa trong allowScripts, vẫn hoạt động). `require('./database.js')` in `Database initialized and seeded (Phase 2).` rồi `Connected to database`. Seed gồm 2 user: `admin@eshop.com` (admin) và `test@eshop.com` (user), `login_attempts` 0. Đặt `login_attempts=2` cho id 1 rồi require lại → về `0`: reset hoạt động vì `database.js` DROP + seed lại mỗi lần được load. Hai lỗi do mình truy vấn sai tên cột (`username`, `lock_until`; cột thật là `name`, `locked_until`), không phải lỗi SUT | `experiments/s3/runs/Phuc_Hoang/C03-seed-reset/console.log` | Require lại `database.js` (DROP + seed), hoặc xóa `database.sqlite` |
| C03-5 Seed/reset Auth trong test (harness) | — | Pending — chờ seams S3-D04. Quan sát: `database.js` chỉ export `db`; `server.js` gọi `app.listen` ở top level (dòng 570) và không export `app` | `experiments/s3/runs/Phuc_Hoang/C03-seed-reset/console.log` | Pending (tham khảo harness fake DB ở `runs/Phuc_Hoang/A03-S2-harness/`, chưa phải quyết định) |

## Test Cases

| Case ID | Spec Section | Input / Fixture | Expected Result | Actual Result | Test File / Commit |
|---|---|---|---|---|---|
| AU-R01, R02 | API 1.1, 1.2 | Đăng ký user mới (Carol) rồi đăng nhập | 200, `User registered successfully`, id số (3); đăng nhập bằng đúng credential trả 200 | **Pass** 26/26 (3 lần chạy) | `backend/test/auth.spec.test.js` (SUT branch `s3/D03-auth-phuc-hoang`, chưa commit; bản sao ở `runs/Phuc_Hoang/D03-auth/tests/`) |
| AU-L01 → L04 | API 1.2; README FR-02 | Login đúng; JWT; sai mật khẩu; email không tồn tại | 200 + token + user; JWT chứa `id`, `role`; sai → 401 (convention, spec không nêu mã); email lạ có status/body giống sai mật khẩu (FR-02 "không để lộ nguyên nhân") | **Pass** | `backend/test/auth.spec.test.js` (SUT branch `s3/D03-auth-phuc-hoang`, chưa commit; bản sao ở `runs/Phuc_Hoang/D03-auth/tests/`) |
| AU-L05 → L09 | README FR-02 | 3 lần sai liên tiếp; +29 s; hết hạn lock (sau 24 h, fake clock); sai–đúng–sai–đúng; user khác | Sau 3 lần sai: mật khẩu đúng bị từ chối 403 (convention); +29 s vẫn khóa; hết hạn thì đăng nhập được; đăng nhập đúng reset bộ đếm; khóa user A không ảnh hưởng B | **Pass** | `backend/test/auth.spec.test.js` (SUT branch `s3/D03-auth-phuc-hoang`, chưa commit; bản sao ở `runs/Phuc_Hoang/D03-auth/tests/`) |
| AU-P01 → P06 | API 1.3, 1.4; README FR-03, SEC-07 | Xin OTP; email lạ; reset đúng; token sai; token của email khác; dùng lại token | 200 + `resetToken`; email lạ không có token; reset đúng đổi mật khẩu (mới vào được, cũ không); token sai/của email khác → 400 (convention); token dùng xong bị vô hiệu | **Pass** | `backend/test/auth.spec.test.js` (SUT branch `s3/D03-auth-phuc-hoang`, chưa commit; bản sao ở `runs/Phuc_Hoang/D03-auth/tests/`) |
| AU-U01 → U08 | API 2.1, 2.2; README FR-04, SEC-02 | GET/PUT `/users/me` không token, token sai, token đúng; phone 10 và 11 chữ số | Không token → 401; token sai → 401 hoặc 403; chỉ trả hồ sơ của chủ token; PUT cập nhật name/address/phone; không đổi user khác và email; phone 10–11 số bắt đầu 0 được chấp nhận | **Pass** | `backend/test/auth.spec.test.js` (SUT branch `s3/D03-auth-phuc-hoang`, chưa commit; bản sao ở `runs/Phuc_Hoang/D03-auth/tests/`) |
| DF-01 → DF-03 | README FR-02 | Sai 1 lần; sai 2 lần rồi đúng; khóa rồi +31 s | Bộ đếm = 1 mỗi lần sai; 2 lần sai chưa khóa; khóa 30 s | **Fail (defect)**: bộ đếm = 2 (`+ 2`); 2 lần sai đã 403; +31 s vẫn 403 (khóa `180000` ms) | `backend/test/auth.defects.test.js` (cùng branch; bản sao như trên) |
| DF-04 → DF-08 | README FR-01, SEC-01 | Email sai định dạng (3 dạng); email trùng; 5 mật khẩu yếu; thiếu name; kiểm tra cột `password` | Bị từ chối (4xx) và không tạo user; mật khẩu không lưu plaintext | **Fail (defect)**: tất cả trả 200 và tạo user; `password` lưu plaintext | `backend/test/auth.defects.test.js` (cùng branch; bản sao như trên) |
| DF-09 → DF-11 | README FR-03, SEC-07 | Độ dài OTP; token cũ hơn 24 h; mật khẩu mới yếu | OTP 6 chữ số; token hết hạn bị từ chối (cận 24 h là giả định của test, spec không nêu); mật khẩu mới theo FR-01 | **Fail (defect)**: OTP 4 chữ số (vd `9857`); token vẫn dùng được sau 24 h; mật khẩu `weak` được chấp nhận | `backend/test/auth.defects.test.js` (cùng branch; bản sao như trên) |
| DF-12, DF-13 | README FR-04, SEC-06; API 2.2 | PUT `/me` với `role: admin`; phone 9/12 số, không bắt đầu 0, có chữ, rỗng | `role` không đổi; phone sai bị từ chối (4xx) | **Fail (defect)**: `role` thành `admin`; mọi phone sai trả 200 | `backend/test/auth.defects.test.js` (cùng branch; bản sao như trên) |

Nguồn expected: `api_specification.md` §1–2 (chỉ định nghĩa phản hồi thành công) và `README.md` FR-01…FR-04, SEC-01…SEC-07 của SUT (quy tắc lock, OTP, validation). Mã lỗi 401/403/400 là convention HTTP vì spec chỉ nói "thông báo lỗi phù hợp"; các test ghi rõ ở tên/comment.

**Cô lập:** DB = SQLite `:memory:` với schema `users` giống `database.js` (`test/testDb.js`, `jest.mock('../database')`), nên `server.js` chạy SQL thật; reset bằng `resetUsers()` trước mỗi test. Thời gian = Jest fake `Date` (`freezeClock`, `advanceClock`). Token = JWT thật từ `/api/login` (không giả mạo secret). OTP đọc từ response của `/api/forgot-password`, không cần mock `Math.random`. Không sửa production code; `app.listen` bị chặn bằng spy (`test/harness.js`).

**Kiểm chứng hai chiều:** suite `auth.spec.test.js` 26/26 pass trên code gốc, 3 lần liên tiếp. Suite `auth.defects.test.js` 23/23 fail trên code gốc, đúng lý do (bảng trên). Để chứng minh expected không sai, mình vá một bản copy (`D03-auth/patched-check/server.patch`: `+ 1`, `30000` ms, OTP 6 chữ số, bỏ `role`): DF-01, 02, 03, 09, 12 chuyển pass, 18 test còn lại vẫn fail (cần sửa validation/OTP expiry/hash), suite spec vẫn 26/26. Evidence: `experiments/s3/runs/Phuc_Hoang/D03-auth/` (`console.spec.log`, `console.defects.log`, `patched-check/`).

**Lỗi gốc phát hiện (original defects):** lock cộng 2 mỗi lần sai và khóa 180 s (FR-02: +1, 30 s); không validate email/mật khẩu/tên/trùng email (FR-01); mật khẩu lưu plaintext (SEC-01); OTP 4 chữ số và không hết hạn (FR-03, SEC-07); `PUT /me` cho đổi `role` (SEC-06, FR-04); không validate phone (FR-04). Câu hỏi "rule `+2` có cố ý không" trong Research Notes đã được trả lời bằng `README.md` FR-02; Research Notes đã được sửa tương ứng (2026-10-22). Chờ nhóm xác nhận: baseline giữ code lỗi nguyên trạng hay có sửa.

**Bàn giao S3-D04:** baseline đề xuất = `auth.spec.test.js` (26 test pass) với harness `testDb.js` + `harness.js` + `fixtures.js`. `auth.defects.test.js` không đưa vào baseline vì fail trên code gốc. Pending: nhóm chốt seam/harness (D04), `package.json` của SUT đã thêm `jest` và `supertest` vào devDependencies và 2 script `test`, `test:defects` (chưa commit), và chưa chạy Stryker trên suite này (thuộc S3-E03).

## Baseline

| Run ID | SUT Commit | Config / Test Set | Command | HTML / JSON / Log | Outcome |
|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] | [ ] | Not run |

## Survivors & Manual Assertions

| Mutant ID / Diff | State | Why Survived | Distinguishing Input | Manual Assertion / Test | Original-Code Result | Mutant Result / Evidence |
|---|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] | [ ] | Not run | Not run |

## AI Runs

| AI Record Artifact ID | Raw Candidate / Edited Test | Spec Review | Original-Code Result | Mutant Result | Run Evidence |
|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | Not run | Not run | [ ] |

## Comparison

| Run / Test Set | Killed | Timeout | Survived | NoCoverage | Tool Score & Definition | Evidence |
|---|---|---|---|---|---|---|
| Baseline | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Manual | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| AI-assisted | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

## Limits & Failure Modes

[Equivalent candidates có lập luận/phạm vi; failure-mode case có nguồn/evidence. Không coi Timeout là assertion kill.]

## Cross Reproduction

| Teammate Domain / Guide | Commands | Result | Missing Step / Issue | Evidence |
|---|---|---|---|---|
| [ ] | [ ] | Not run | [ ] | [ ] |
