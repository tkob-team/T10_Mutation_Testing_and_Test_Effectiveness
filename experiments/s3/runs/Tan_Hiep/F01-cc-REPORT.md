# S3-F01 / S3-G01 Setup Report — Cart & Orders (Claude Code)

## Summary

| Field | Value |
|---|---|
| Task ID | S3-F01 setup (kèm khung nhánh S3-G01) |
| Executor | Claude Code (model `claude-opus-5-5`) |
| Date | 2026-10-22, ~21:05–21:15 (+07:00) |
| OS | Windows 11 Home Single Language 10.0.26200; shell Git Bash |
| Overall | **Done** — config và khung file đúng yêu cầu; `npm test` 36/36 trên cả hai nhánh. Không viết assertion nào |

## Environment

| Item | Value |
|---|---|
| EShop | `s3/F01-manual` @ `c0954de` và `s3/G01-ai` @ `78745e2`, cùng tách từ `8d60e9b` |
| Seminar | `main`; commit log hook trước task `69a0a16` (`chore(ai-log): update prompt logs`) |
| Versions | Node v24.15.0, npm 11.12.1, Jest 30.5.2, StrykerJS 10.0.0 |

## Changes

Nhánh `s3/F01-manual` (commit `c0954de`, `test(S3-F01): add manual-branch Jest and Stryker config`):

- `backend/jest.manual.config.js`: `testEnvironment`, `setupFiles` giống `"jest"` trong `package.json`; `testMatch` = `<rootDir>/test/**/*.test.js` (pattern baseline thật trong `package.json`) + `<rootDir>/test/manual/**/*.manual.js`.
- `backend/stryker.cart-orders.manual.config.json`: như `stryker.cart-orders.config.json`, thêm `"jest": { "configFile": "jest.manual.config.js" }`, reports ra `reports/cart-orders-manual/`.
- `backend/package.json`: scripts `test:manual` (`jest --config jest.manual.config.js`), `mutate:cart-orders:manual` (`stryker run stryker.cart-orders.manual.config.json`).
- `backend/test/manual/cart-orders.manual.js`: chỉ khung — require helpers, `beforeAll` gọi `loadApp` và login admin, comment "Tấn Hiệp tự viết". Không có test.

Nhánh `s3/G01-ai` (commit `78745e2`, `test(S3-G01): add AI-branch Jest and Stryker config`): tương tự với `jest.ai.config.js` (`test/ai/**/*.ai.js`), `stryker.cart-orders.ai.config.json` (`reports/cart-orders-ai/`), scripts `test:ai`, `mutate:cart-orders:ai`, khung `test/ai/cart-orders.ai.js` (comment: sinh trong session sạch, không thấy nhánh manual).

## Checks

| Branch | Command | Result | Evidence |
|---|---|---|---|
| F01-manual | `npx jest --listTests` | chỉ `test/cart-orders.test.js` — baseline không nhận file manual | — |
| F01-manual | `npx jest --config jest.manual.config.js --listTests` | `cart-orders.test.js` + `manual/cart-orders.manual.js` | — |
| F01-manual | `npm test` | **36 passed**, exit 0 | `F01-setup-cc/npm-test.log` |
| F01-manual | `npm run test:manual` (chẩn đoán, không chính thức) | exit 1: `Your test suite must contain at least one test.` cho file manual; 36 baseline pass | `F01-setup-cc/test-manual-diagnostic.log` |
| F01-manual | `npx stryker run stryker.cart-orders.manual.config.json --dryRunOnly` (chẩn đoán) | exit 1, cùng lỗi — config nạp đúng, Jest tìm thấy file manual | `F01-setup-cc/stryker-manual-dryrun-diagnostic.log` |
| G01-ai | `--listTests` (2 config) | tương tự F01 | — |
| G01-ai | `npm test` | **36 passed**, exit 0 | `G01-setup-cc/npm-test.log` |
| G01-ai | `npm run test:ai`, Stryker AI dry run (chẩn đoán) | cùng lỗi `must contain at least one test` | `G01-setup-cc/test-ai-diagnostic.log`, `G01-setup-cc/stryker-ai-dryrun-diagnostic.log` |

Lỗi "must contain at least one test" là hệ quả của khung không có test theo yêu cầu, không phải lỗi config. Sẽ hết khi file có ít nhất một test.

## Issues

- Stryker dry run fail không tự dọn `backend/stryker-tmp/sandbox-*`. Sandbox còn lại từ dry run manual gây cảnh báo `jest-haste-map: Haste module naming collision` và — quan trọng hơn — chứa bản sao file nhánh manual trên working tree nhánh AI. Đã xóa cả hai sandbox (manual, AI): gỡ junction `node_modules` bằng PowerShell `.Delete()` trước, kiểm không còn junction, rồi `rm -rf`. `npm install --dry-run` báo `up to date`, `node_modules` thật không bị ảnh hưởng.
- `database.sqlite` không đổi.

## Docs Updated

- Experiment Log, Limits & Failure Modes: dòng "Environment-dependent Timeout (E01-1-cc vs sandbox Linux)" (commit `3cf939c`). Commit kèm report này rút gọn câu giả thuyết cho đúng nguyên văn được giao (bỏ cụm "thay vì bị kill bởi assertion" do tôi tự thêm).
- `Repo/CLAUDE.md` (ngoài repo): thêm quyết định 2026-10-22 về E01 trước D04 và hai nhánh F01/G01.

## Presentation Notes

- Hai nhánh tách từ cùng commit, cùng mutate scope và production code; chỉ khác testMatch và thư mục report — đây là điều kiện để so sánh manual vs AI công bằng.
- Jest coi file test rỗng là suite lỗi; Stryker dừng ở dry run nếu bất kỳ suite nào lỗi.

## AI Usage

- Tool: Claude Code, model `claude-opus-5-5`, skill `t10-run-report`.
- Prompt Tấn Hiệp đưa (nguyên văn):

  > Task S3-F01 setup (Cart & Orders). Dùng skill t10-run-report. Được commit, không push. KHÔNG viết assertion nào.
  >
  > 1. Repo EShop, tạo 2 nhánh từ 8d60e9b: s3/F01-manual và s3/G01-ai.
  > 2. Trên s3/F01-manual, trong backend:
  >    - jest.manual.config.js: lấy cấu hình jest trong package.json, testMatch = baseline (test/*.test.js) + test/manual/**/*.manual.js
  >    - stryker.cart-orders.manual.config.json: như stryker.cart-orders.config.json, nhưng jest.configFile = jest.manual.config.js, reports ra reports/cart-orders-manual/
  >    - scripts: "test:manual", "mutate:cart-orders:manual"
  >    - test/manual/cart-orders.manual.js: chỉ phần khung (require helpers, beforeAll loadApp, comment "Tấn Hiệp tự viết"), không có test.
  >    - Kiểm tra: npm test vẫn 36 passed (file manual không bị baseline nhận).
  >    Commit: "test(S3-F01): add manual-branch Jest and Stryker config".
  > 3. Trên s3/G01-ai: làm tương tự với hậu tố ai (test/ai/**/*.ai.js, reports/cart-orders-ai/). Commit: "test(S3-G01): add AI-branch Jest and Stryker config".
  > 4. Seminar, Experiment Log, mục Limits & Failure Modes: thêm 1 dòng — E01-1-cc so với sandbox Linux: Killed 87/91, Timeout 19/16, RuntimeError 8/7; tổng 3 loại đều là 114; Survived/NoCoverage giống nhau; giả thuyết do máy chậm hơn chạm ngưỡng timeout, chưa kiểm chứng. Commit: "docs(S3-E01): note environment-dependent Timeout counts".
  > 5. Repo/CLAUDE.md, mục Quyết định đã chốt: thêm "2026-10-22: E01 chạy trên baseline domain trước D04 (Hòa cho phép). Nhánh manual s3/F01-manual và AI s3/G01-ai cùng tách từ 8d60e9b; AI không được đọc nhánh manual."
  > 6. Báo cáo theo CLAUDE.md.

- Output chính: 2 nhánh EShop với config/scripts/khung; dòng Limits trong Experiment Log; quyết định trong CLAUDE.md; report này.
