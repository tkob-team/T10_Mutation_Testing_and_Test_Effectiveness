# S3-I01 — Cross reproduction Coupons (Thái Hòa) — Claude Code report

## Run info

- Task: S3-I01, chạy lại case Coupons của Hòa. Không blind.
- Executor: Claude Code, model `claude-opus-5-5`. Run IDs: I01-1-cc, I01-2-cc, I01-3-cc.
- Ngày giờ: 2026-10-23, 10:26–10:34 (Asia/Saigon). OS: Windows 11 Home Single Language 10.0.26200.
- Versions: Node v24.15.0, npm 11.12.1, StrykerJS 10.0.0, Jest 30.5.2 (đo trong EShop `806ba19` sau `npm ci`; runtime `_tmp` dùng cùng lockfile).
- Repo seminar: nhánh `main`. Trước task working tree bẩn ở `ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md` (AI log) → commit `chore(ai-log): update prompt logs`. Commit này tạo trước khi pull nên `git pull --ff-only` báo `fatal: Not possible to fast-forward, aborting.` (origin/main có 8 commit mới, không đụng file log đó) → `git rebase origin/main` commit local chưa push; HEAD sau rebase `0b1ae95` trên `77ddedc`.
- Repo EShop: nhánh `s3/G01-ai` @ `f4696c6`, sạch; `git pull --ff-only` already up to date; `git fetch origin` (main → `52ed6ac`, nhánh mới `s3/D04-baseline`). Không commit, không sửa file tracked.

## Commands and results

Score = Detected / Valid = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage). Số đếm từ `mutation.json` bằng `I01-cc-compare/i01_compare.py`.

| Run | Input | Tests | Killed | Timeout | Survived | NoCoverage | RuntimeError | Ignored | Total | Score | Expected |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| I01-1-cc | EShop `806ba19` (detached) | 26/26 pass | 39 | 21 | 30 | 25 | 5 | 0 | 120 | 52.17% | khớp |
| I01-2-cc (manual) | `frozen-input.zip` + overlay | 35/35 pass | 41 | 21 | 28 | 25 | 5 | 0 | 120 | 53.91% | khớp |
| I01-3-cc (AI) | `frozen-input.zip` + overlay | 40/40 pass | 41 | 21 | 28 | 25 | 5 | 0 | 120 | 53.91% | khớp |

### I01-1-cc (EShop, `806ba19`)

```
git checkout --detach 806ba19
cd backend
npm ci                    # exit 0; 672 packages; 6 vulnerabilities (không audit fix)
npm run test:coupons      # Test Suites 2 passed; Tests 26 passed
npm run mutate:coupons    # Done in 1 minute and 41 seconds
```

Sau run: `git status` sạch (`database.sqlite` không đổi, `reports/` bị ignore) → không cần restore. Checkout lại `s3/G01-ai`. Evidence: `I01-1-cc/{console.log, mutation.html, mutation.json}`.

### I01-2-cc / I01-3-cc (guide của Hòa)

Guide: `experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md` (mục Reproduction).

1. Giải nén `frozen-input.zip` (SHA-256 `30097994ab2535f830a2d40fefcd09bdba9ae6bace8e87e4f570a188ddff0b1c`, comment zip `806ba19ee4e0…`) vào `Repo/_tmp/I01-coupons/` (giữ lại, không xóa).
2. Overlay 7 file từ `sources/backend/` (danh sách khớp `inputs.json` → `overlay`); cả 7 chưa tồn tại trong archive trước khi overlay.
3. Lệnh 1 chạy lần đầu (từ `_tmp/I01-coupons/backend`):
   ```
   node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
   Error: Cannot find module 'D:\HK7\Testing\Seminars\Repo\_tmp\I01-coupons\backend\node_modules\jest\bin\jest.js'
     code: 'MODULE_NOT_FOUND'
   ```
   Archive không chứa `node_modules`; guide ghi "with existing pinned dependencies" nhưng không có lệnh cài. Xử lý: `npm ci` trong `_tmp/I01-coupons/backend` (lockfile của archive), exit 0, rồi chạy lại.
4. 4 lệnh Reproduction nguyên văn:
   - `node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand` → 3 suites, 35 passed.
   - `node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand` → 3 suites, 40 passed.
   - `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json` → Done in 1 minute and 57 seconds.
   - `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json` → Done in 2 minutes and 18 seconds.

Không chạy `verify.mjs`/`summarize.mjs` (đường dẫn trong `inputs.json` là máy của Hòa; prompt chỉ giao 4 lệnh Reproduction). Evidence: `I01-2-cc/` (log gồm cả lỗi bước 3 và `npm ci`), `I01-3-cc/`; mỗi thư mục có `console.log`, `mutation.html`, `mutation.json`. Config/test đã dùng là 7 file overlay nằm sẵn trong `Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend/`, không copy lại.

## Mutant comparison

Script: `I01-cc-compare/i01_compare.py` (chạy `python -I I01-cc-compare/i01_compare.py -o I01-cc-compare/i01_comparison.md` từ `experiments/s3/runs/Tan_Hiep`). Khóa: vị trí đầu–cuối + mutatorName + replacement. Kết quả đầy đủ: `I01-cc-compare/i01_comparison.md`.

| Cặp | Mutant chung | Survived (-cc / Hòa) | Đổi trạng thái | Killed↔Timeout |
|---|---:|---|---:|---:|
| I01-1-cc vs `D04-merge-2026-10-23-agent/frozen-coupons-baseline/mutation.json` | 120/120 | 30 / 30, tập trùng | 0 | 0 |
| I01-2-cc vs `Coupons-extensions…/manual-mutation.json` | 120/120 | 28 / 28, tập trùng | 0 | 0 |
| I01-3-cc vs `Coupons-extensions…/ai-mutation.json` | 120/120 | 28 / 28, tập trùng | 0 | 0 |

Giữa các run -cc: baseline → manual và baseline → AI đều chỉ có 2 mutant Survived → Killed, cùng ở `server.js` L474:7–29 (ConditionalExpression `true`, LogicalOperator `max_uses_per_user && 1`); không mutant nào mới Survived. Tập Survived manual = AI.

## Deviations / observations

- Không lệch so với expected ở cả 3 run.
- Guide thiếu bước cài dependency cho thư mục giải nén (lỗi và cách xử lý ở trên).
- Stryker dry run đếm test 2 lần (đã biết, Hòa ghi): `Ran 52 tests` (2×26), `Ran 70 tests` (2×35), `Ran 80 tests` (2×40). Chỉ ghi lại, không sửa config.
- Mỗi Stryker run (cả I01-1-cc) có 10 dòng `WARN ChildProcessProxy Child process ... exited unexpectedly with exit code 3221225477`; `ai-mutation.log` của Hòa cũng có 10. Giả thuyết (chưa kiểm chứng): tương ứng mutant StringLiteral SQL `""` làm `sqlite3` crash (0xC0000005), Stryker ghi RuntimeError (5).
- `npm ci` báo 6 vulnerabilities; không chạy `npm audit fix`.

## Files created / modified (seminar repo)

- `experiments/s3/runs/Tan_Hiep/I01-1-cc/`, `I01-2-cc/`, `I01-3-cc/` (console.log, mutation.html, mutation.json)
- `experiments/s3/runs/Tan_Hiep/I01-cc-compare/i01_compare.py`, `i01_comparison.md`
- `experiments/s3/runs/Tan_Hiep/I01-cc-REPORT.md`
- `experiments/s3/Experiment_Log_Tan_Hiep.md`: Cross Reproduction (dòng Coupons), Baseline (dòng Cart của Hòa, ghi rõ không phải run của Tấn Hiệp), Limits & Failure Modes (bullet Cart frozen baseline, nguồn `Cross_Reproduction_Notes_Thai_Hoa.md`).
- Ngoài repo: `Repo/_tmp/I01-coupons/` (archive giải nén + overlay + node_modules + reports), giữ lại.

## Presentation notes

1. Cross-run khớp tuyệt đối: 120/120 mutant cùng khóa, cùng trạng thái ở cả baseline, manual, AI → kết quả Coupons của Hòa tái lập được trên máy khác (Windows, Node v24).
2. Manual (+9 test) và AI (+14 test) chỉ thêm đúng 2 kill, cùng 2 mutant ở L474; số test nhiều hơn không đồng nghĩa nhiều kill hơn.
3. Guide reproduction cần ghi bước cài dependency khi dùng archive; nếu không, lệnh đầu tiên fail `MODULE_NOT_FOUND`.

## AI usage

Log phiên: `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md` (hook Stop ghi sau lượt này).

## Update 2026-10-23 — member runs I01-1/2/3 (executor: Tấn Hiệp)

Task: kiểm evidence Tấn Hiệp tự chạy, mở rộng script so sánh, ghi Experiment Log. Claude Code (`claude-opus-5-5`) không chạy lại Jest/Stryker trong mục này.

### Evidence check

| Run | Thư mục | Files | Tests (console) | Killed | Timeout | Survived | NoCoverage | RuntimeError | Ignored | Total | Score | Done in |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| I01-1 (baseline) | `I01-1/` | console.log, mutation.html, mutation.json | 26/26 pass | 39 | 21 | 30 | 25 | 5 | 0 | 120 | 52.17% | 1 min 47 s |
| I01-2 (manual) | `I01-2/` | console.log, mutation.html, mutation.json | 35/35 pass | 41 | 21 | 28 | 25 | 5 | 0 | 120 | 53.91% | 2 min 2 s |
| I01-3 (AI) | `I01-3/` | console.log, mutation.html, mutation.json | 40/40 pass | 41 | 21 | 28 | 25 | 5 | 0 | 120 | 53.91% | 1 min 54 s |

Số đếm từ `mutation.json` (script). Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage).

Theo console.log: I01-1 chạy `npm run test:coupons` và `npm run mutate:coupons` trong `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/backend` (report ở `reports/coupons/`); I01-2 / I01-3 chạy trong `Repo/_tmp/I01-coupons/backend` (runtime đã dựng ở I01-2-cc, gồm `node_modules` từ `npm ci`), report ở `reports/coupons-manual/`, `reports/coupons-ai/`. console.log chỉ có output, không ghi dòng lệnh nên không xác nhận được lệnh nguyên văn; commit EShop lúc chạy I01-1 không có trong log. Dry run: `Ran 52 tests`, `Ran 70 tests`, `Ran 80 tests` (đếm 2 lần, như các run -cc). Mỗi run có 10 dòng `WARN ChildProcessProxy ... exit code 3221225477`.

### Comparison

`I01-cc-compare/i01_compare.py` thêm cờ `--member` (đọc `I01-{1,2,3}/mutation.json`, so mỗi run với report tương ứng của Hòa và với `I01-{1,2,3}-cc`); cách gọi cũ không cờ cho output giống hệt bản trước (đã kiểm bằng `diff`). Sinh lại: `python -I I01-cc-compare/i01_compare.py -o I01-cc-compare/i01_comparison.md --member`.

| Cặp | Mutant chung | Survived | Đổi trạng thái | Killed↔Timeout |
|---|---:|---|---:|---:|
| I01-1 vs Hòa frozen baseline | 120/120 | 30 / 30, tập trùng | 0 | 0 |
| I01-1 vs I01-1-cc | 120/120 | 30 / 30, tập trùng | 0 | 0 |
| I01-2 vs Hòa manual | 120/120 | 28 / 28, tập trùng | 0 | 0 |
| I01-2 vs I01-2-cc | 120/120 | 28 / 28, tập trùng | 0 | 0 |
| I01-3 vs Hòa AI | 120/120 | 28 / 28, tập trùng | 0 | 0 |
| I01-3 vs I01-3-cc | 120/120 | 28 / 28, tập trùng | 0 | 0 |

### Files created / modified

- `I01-1/`, `I01-2/`, `I01-3/` (do Tấn Hiệp đặt, commit nguyên trạng)
- `I01-cc-compare/i01_compare.py` (cờ `--member`), `I01-cc-compare/i01_comparison.md` (sinh lại)
- `experiments/s3/Experiment_Log_Tan_Hiep.md`: thêm dòng I01-1/2/3 ở Cross Reproduction
- `I01-cc-REPORT.md`: mục này

### Presentation notes

1. Ba lần chạy độc lập (Hòa/Codex, Claude Code, Tấn Hiệp) cho cùng trạng thái trên 120/120 mutant ở cả baseline, manual, AI; trên Coupons không thấy dao động Killed↔Timeout như Cart.

### AI usage

`ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.

## Update 2026-10-23 — provenance for member runs I01-1/2/3

Claude Code (`claude-opus-5-5`), không chạy lại Jest/Stryker. Chi tiết: `I01-cc-compare/i01_member_provenance.md`.

- I01-1: `I01-1/git-reflog.txt` (`git reflog --date=iso -20`). EShop HEAD = `806ba19` từ `10:42:08` đến `10:56:05` (+07:00); report I01-1 ghi `10:54:17`–`10:56:05` (console.log, mtime `I01-1/mutation.json` 10:56:05.015), nằm trong cửa sổ này. Cửa sổ `10:26:57`–`10:29:21` là I01-1-cc.
- I01-2 / I01-3: SHA-256 của `server.js`, `database.js`, `package-lock.json` và 7 file overlay trong `Repo/_tmp/I01-coupons/backend`, **lấy sau khi chạy** (~11:05). Sau chuẩn hóa CRLF→LF: 3 file khớp `git show 806ba19:backend/<file>`, 7 file khớp `Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend/`. Script: `I01-cc-compare/i01_member_provenance.py`.
- Lệnh nguyên văn Tấn Hiệp đã chạy cho I01-1/2/3. Nguồn: phiên thảo luận claude.ai 2026-10-23 10:52, Tấn Hiệp xác nhận đã chạy đúng (chuyển qua prompt Claude Code, Q1 chọn (a)). Chép nguyên văn:

```powershell
$R = "D:\HK7\Testing\Seminars\Repo"
$E = "$R\T10_Mutation_Testing_and_Test_Effectiveness\experiments\s3\runs\Tan_Hiep"
mkdir "$E\I01-1","$E\I01-2","$E\I01-3" -Force | Out-Null

# I01-1 baseline
cd "$R\eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness"; git checkout --detach 806ba19; cd backend
npm run test:coupons 2>&1 | Tee-Object -FilePath "$E\I01-1\console.log"
npm run mutate:coupons 2>&1 | Tee-Object -FilePath "$E\I01-1\console.log" -Append
Copy-Item reports\coupons\mutation.* "$E\I01-1\"
git status --short; git checkout -    # restore database.sqlite nếu status báo đổi
```

```powershell
# I01-2 manual, I01-3 AI (thư mục Claude Code đã giải nén, overlay và npm ci sẵn)
cd "$R\_tmp\I01-coupons\backend"
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand 2>&1 | Tee-Object -FilePath "$E\I01-2\console.log"
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json 2>&1 | Tee-Object -FilePath "$E\I01-2\console.log" -Append
Copy-Item reports\coupons-manual\mutation.* "$E\I01-2\"
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand 2>&1 | Tee-Object -FilePath "$E\I01-3\console.log"
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json 2>&1 | Tee-Object -FilePath "$E\I01-3\console.log" -Append
Copy-Item reports\coupons-ai\mutation.* "$E\I01-3\"
```

  Đối chiếu với evidence (sự kiện): I01-1 không có `npm ci` (dùng `node_modules` còn từ I01-1-cc); `git checkout --detach 806ba19` và `git checkout -` khớp hai dòng reflog 10:42:08 và 10:56:05; `Copy-Item` giữ mtime nên `I01-1/mutation.json` cùng mtime với `backend/reports/coupons/mutation.json` (10:56:05.015). Dòng lệnh không xuất hiện trong console.log vì `Tee-Object` chỉ ghi output.
