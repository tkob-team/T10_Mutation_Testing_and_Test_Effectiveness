# F01c-1-cc REPORT

## Thông tin run

| Mục | Giá trị |
|---|---|
| Task | S4-F01c — kiểm chứng `draft/User_Guide.md` mục 2.2 đến 4.1 trên Windows |
| Executor | Claude Code, model `claude-opus-5-5` |
| Thời gian | 2026-10-23 14:09–14:13 (+07:00) |
| OS / shell | Windows 11 Home Single Language 10.0.26200; PowerShell 7 (lệnh chính), Git Bash (chẩn đoán, sửa file) |
| Versions | git 2.47.0.windows.2, `node --version` v24.15.0, `npm --version` 11.12.1, StrykerJS 10.0.0, Jest 30.5.2 |
| Workshop repo | `https://github.com/tkob-team/eshop-sut-workshop.git` @ `6d2e790` (chore: prepare workshop starter with isolated baseline tests); `main` lúc clone cũng là `6d2e790` |
| Thư mục tạm | `C:\Users\tanhi\AppData\Local\Temp\claude\D--HK7-Testing-Seminars-Repo\3058f82a-a124-4cce-853c-9bab797d6360\scratchpad\f01c\eshop-sut-workshop` |
| Guide | `draft/User_Guide.md` tại seminar commit `d7c1b05` (không sửa) |

## Evidence

- `console.log`: mọi lệnh theo guide, header `### <giờ> | <commit> workshop | > <lệnh>`, dòng cuối `--- exit <code> | <giây>`. Bước sửa file ghi dòng `(editor)`.
- `baseline.json`, `first-test.json`, `manual.json`: các bản copy theo đúng lệnh `cp` của guide.
- `mutation.html`: report cuối (sau 4.1).
- `stryker.config.json`: config tạo nguyên văn theo guide 2.3.
- `workshop-changes.diff`: diff `test/cart-orders.test.js` và `package.json` sau 4.1.
- `diag-tempDirName.log`: run chẩn đoán, không chính thức.

## Kết quả so với guide

Số liệu Stryker đếm từ `mutation.json`, không chép từ console.

| Mục guide | Lệnh | Expected (guide) | Thực tế | Khớp |
|---|---|---|---|---|
| 2.2 | `npm ci`; `npm test` | 4 suites, 88 tests pass (Cart 36, Coupons 26, Auth 26) | 4 suites, 88/88 pass; tách từng file (chẩn đoán): cart-orders 36, coupons 25 + coupons-flow 1, auth 26 | Có |
| 2.3 | `npm install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/jest-runner@10.0.0` | cài được | exit 0 (22 s) | Có |
| 3.1 | `npm run test:cart`; `npx stryker run` | 36 pass; 7 mutants, 7 Survived | 36/36 pass; 7 mutants: Survived 7 | Có |
| 3.2 | đọc report | ArrayDeclaration dòng 286 `[]` → `["Stryker was here"]` | có đúng mutant đó, Survived | Có |
| 3.3 | sửa CO-02; `npm run test:cart`; `npx stryker run` | 36 pass; 3 Killed (gồm ArrayDeclaration), 4 Survived | 36/36 pass; Killed 3 (286 ConditionalExpression `false`, 286 BooleanLiteral, 286 ArrayDeclaration), Survived 4 | Có |
| 4.1 | thêm Case 2, Case 3; `npm test`; `npx stryker run` | 88 pass; 7 Killed, 0 Survived, 0 Timeout | 88/88 pass; Killed 7, Timeout 0, Survived 0, NoCoverage 0, RuntimeError 0; score 100% | Có |

Score = Detected / Valid = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage). Config: `coverageAnalysis: perTest`, `concurrency: 2`, timeout mặc định.

Danh sách 7 mutant (dòng, mutator, replacement): 286 ConditionalExpression `true`; 286 ConditionalExpression `false`; 286 BooleanLiteral `userCarts[userId]`; 286 ArrayDeclaration `["Stryker was here"]`; 293 CallExpression `;`; 335 ArrayDeclaration `[]`; 335 StringLiteral `""`. Sau 3.3, mutant 286 ConditionalExpression `true` vẫn Survived; sau 4.1 thì bị kill.

Các lệnh `cp` chạy được trong PowerShell (alias `Copy-Item`). Stryker mỗi lần chạy khoảng 2–3 s.

**Không có lệch nào về lệnh hoặc số liệu, nên không sửa `draft/User_Guide.md`.**

## tempDirName có cần không

Run chẩn đoán, không chính thức (`diag-tempDirName.log`): dùng đúng config của guide nhưng bỏ key `tempDirName` (Stryker dùng thư mục mặc định `.stryker-tmp`), report ghi ra `reports/diag.*`. Kết quả: dry run "Ran 36 tests", 7 Killed / 0 Survived, exit 0, giống run chính thức.

Kết luận cho config trong guide: **`tempDirName` không bắt buộc** trên máy này. Lỗi `No tests were found` của S3 (quyết định 2026-10-22) xảy ra với config SUT. Giả thuyết, chưa kiểm chứng: khác biệt nằm ở chỗ guide đặt `projects: []` và `testMatch` cụ thể. Giữ `tempDirName` cũng không hại gì. Chỉ kiểm trên một máy; chưa kiểm khi bỏ cả `modulePathIgnorePatterns`.

## Bất thường và ghi chú

- Lỗi script của Claude Code, không phải của guide: lần áp snippet CO-02 đầu (14:11:33) so khớp LF trên file CRLF nên không thay gì; run Stryker 14:11:33–14:11:40 vì vậy không hợp lệ (vẫn 7 Survived). Đã ghi NOTE trong `console.log`, áp lại và chạy lại lúc 14:11:52. Case 3 (CO-12) lần đầu cũng không áp do escaping backtick trong PowerShell; đã áp lại bằng node trước khi chạy 4.1. Mọi số trong bảng lấy từ các run sau khi áp đúng.
- Test file của workshop dùng CRLF trên Windows (`core.autocrlf`); người làm theo guide bằng editor sẽ không gặp chuyện này.
- PowerShell trong môi trường Claude Code có ExecutionPolicy `Process = Bypass`, nên chưa tái hiện được lỗi `npm.ps1` bị chặn mà guide nhắc ở 2.1.
- `npm ci` và `npm install` báo vulnerabilities; không chạy `npm audit fix`.
- `npm install` ở 2.3 sửa `package.json` (2 devDependencies) và `package-lock.json`. Guide không nhắc điều này; đây không phải lệch số liệu nên không sửa.

## Ghi chú thuyết trình

1. Ba mốc 7 Survived → 3 Killed → 7 Killed tái hiện được trên Windows với Node 24 / npm 11, mỗi lần Stryker chạy chỉ vài giây.
2. Sau CO-02, mutant `if (true)` ở dòng 286 vẫn sống: assertion body rỗng chỉ bắt mutant làm giỏ mới sai, không bắt mutant reset giỏ cũ; Case 2 (đọc lại hai sản phẩm) mới kill nó.
3. `tempDirName` là workaround cho config nhiều project của SUT, không bắt buộc với config tối giản của guide.

## AI usage

Log phiên do hook ghi: `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`.
