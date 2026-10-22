# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Lê Tấn Hiệp  
**Assignment:** T10 Seminar  
**Class / Cohort:** Software Testing - CQ2023/3, Nhóm 12  
**AI Use:** Yes  
**Evidence Status:** Partial — AI-S3-A01-01, AI-S3-B01-01, AI-S3-C01-01 đã có verdict; AI-S3-D01-01, AI-S3-D01-02, AI-S3-WF-01 chờ review; còn thiếu transcript export

Copy file này thành `ai-audit/AI_Record_<Member>.md` khi bắt đầu ghi usage. Mỗi người dùng một file xuyên suốt S1–S8. Điền ngay khi làm; mỗi artifact có Stage và Task ID để không lẫn các giai đoạn. Mục reflection do chính thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký điền trực tiếp vào bản nộp bởi thành viên; không đưa vào prompt AI.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-A01 | drafting / data analysis | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01…05, Source Register SRC-01…07, SRC-10 | Tra cứu docs/papers, soạn notes, chạy ví dụ Stryker trong sandbox AI | Review nội dung, chấp nhận nguyên trạng; tự chạy lại F-A01-04 ở S3-C01 (C01-2, C01-4): kết quả khớp | AI-S3-A01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-B01 | drafting | `research/s3/Research_Notes_Tan_Hiep.md` — F-B01-01…04, SRC-08, SRC-09, SRC-11…13 | Tra cứu docs, đọc source EShop, soạn sơ đồ kiến trúc, prompt skeleton, verification gates | Review nội dung, chấp nhận nguyên trạng | AI-S3-B01-01 |
| Claude (claude.ai, chat mới ngoài Project, model Claude Opus 5.5) | s3 | S3-C01 | coding | `mt-demo/test/cart.ai.test.js` → lưu tại `experiments/s3/runs/Tan_Hiep/C01-ai/` | Phân tích input phân biệt mutant, đề xuất 3 test Jest | Viết input prompt (requirement, code, test, mutant), review theo requirement, chạy G2/G3, phát hiện lý do sai ở test tùy chọn | AI-S3-C01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-D01 | coding / drafting | `SUT/backend/test/` (harness, `cart-orders.test.js`, `defects/cart-orders.defects.js`), `package.json`, `stryker.cart-orders.config.json`; Experiment Log mục Test Cases/D01; Research Notes F-B01-04 (sửa) | Đọc SRS `README.md`, đề xuất phương án cho 5 câu hỏi scope, viết harness test-only và 36 baseline tests + 8 defect tests, chạy thử trong sandbox | Chọn phương án cho các câu hỏi scope (D01-Q1…Q5); [tự điền sau review: phần đã kiểm tra/sửa; chạy D01-1…3 trên máy] | AI-S3-D01-01 |
| Claude Code (model Claude Opus 5.5) | s3 | S3-D01 | coding / data analysis | Runs `experiments/s3/runs/Tan_Hiep/D01-{1,2,3}-cc/`, `D01-cc-REPORT.md`; giải nén bộ test vào nhánh local `s3/D01-cart-orders` | Chạy `npm install`, `npm test`, `npm run test:defects`, Stryker dry run; lưu evidence; chẩn đoán lỗi dry run trên Windows | Dán prompt, đọc báo cáo, quyết định cấu hình Stryker; sẽ tự chạy lại D01-1…3 | AI-S3-D01-02 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | — (workflow, phục vụ S3-D01 trở đi) | other | Skills `t10-mutation-testing`, `t10-run-report` (tài khoản claude.ai); `Repo/CLAUDE.md` (ngoài repo nhóm) | Đề xuất quy trình claude.ai ↔ Claude Code, soạn 2 skill và CLAUDE.md | Đề xuất quy trình, chỉ ra lỗi giả định thư mục ngày, chọn mẫu báo cáo ngắn từ dự án khác | AI-S3-WF-01 |

## 2. Artifact Audit

### Artifact AI-S3-A01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A01 |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16, khoảng 18:57–19:20 (UTC+7), theo timestamp tin nhắn trong conversation claude.ai |
| Output Artifact / Section | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01 → F-A01-05 |
| Verdict | VALID — accepted as-is (Tấn Hiệp review 2026-10-16) |
| Reasoning & Source | Claims dẫn SRC-01…07, SRC-10 trong notes. Course slide/ISTQB section theo AI-02: Pending |
| Verification | AI tự chạy F-A01-04 trong sandbox: Node v22.22.0, StrykerJS 10.0.0 → weak 20.00% (3/15), strong 93.33% (14/15). **Member run 2026-10-16 (S3-C01, C01-2/C01-4, Windows 11, Node v24.15.0, StrykerJS 10.0.0):** weak 20.00%, strong 93.33% — khớp; evidence `experiments/s3/runs/Tan_Hiep/C01-weak/`, `C01-strong/` |
| Student Fix | Accepted as-is; không có thay đổi so với bản AI (bản AI gửi trong conversation 2026-10-16) |

#### Verbatim Prompt

```text
Giờ cứ bắt đầu hỗ trợ giúp tôi thực hiện từ S3, theo thứ tự nhé. Nếu kiểu như gặp mắc kẹt (do phải chờ task người khác), cứ nói với tôi nhé. Giờ bắt đầu với S3 nhé. Theo thứ tự để có gì sau tôi còn viết docs để hiểu, rồi còn thuyết trình trên lớp nữa. Có thể dạy tôi thêm kiến thức lý thuyết để hiểu thêm nếu cần
```

#### Verbatim AI Output

```text
Output dài: bản nháp đầu tiên là file Research_Notes_Tan_Hiep.md gửi trong conversation
claude.ai ngày 2026-10-16 (cấu trúc tự do, chưa theo template nhóm), sau đó được
chuyển sang template nhóm ở AI-S3-B01-01. Lưu transcript/export conversation vào
ai-audit/evidence/s3/Tan_Hiep/ khi review: Pending — Tấn Hiệp export
```

#### Corrected Artifact & Highlighted Changes

```diff
Accepted as-is: không có diff so với bản AI gửi trong conversation 2026-10-16.
```

### Artifact AI-S3-B01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-B01 (kèm chuyển A01 sang template nhóm) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16, khoảng 19:23–19:45 (UTC+7), theo timestamp tin nhắn trong conversation claude.ai |
| Output Artifact / Section | `research/s3/Research_Notes_Tan_Hiep.md` — F-B01-01 → F-B01-04; file `ai-audit/AI_Record_Tan_Hiep.md` |
| Verdict | INCOMPLETE — usable after edits (đổi từ VALID ngày 2026-10-18) |
| Reasoning & Source | SRC-07…13; F-B01-04 là source inspection EShop @ `85af3ba`. Lỗi phát hiện 2026-10-18: F-B01-04 bỏ sót `SUT/README.md` (SRS, SRC-14), nên kết luận "cart/checkout không có rule" và các câu hỏi scope 1–4 sai hoặc thừa |
| Verification | Source inspection (đọc file), không chạy. Prompt skeleton F-B01-02: **Not run** (dùng thật ở S3-G01) |
| Student Fix | 2026-10-18: sửa Research Notes F-A01-02 (nhận xét), Q9, F-B01-04, Open questions, thêm SRC-14 — xem Corrected Artifact |

#### Verbatim Prompt

```text
Repo EShop: https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness
Repo Seminar: https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness
---
nhân tiện, mình vừa up thêm các docs của nhóm mình vào context của bạn, bạn đã thấy chưa?
===
Mình đưa thêm các file bạn cần, hoặc các file template, hoặc là các file mà đã được chuyển thành proposal từ Scope_and_Decisions.md nhé
Bạn còn cần thêm gì nữa bảo mình nehs
```

#### Verbatim AI Output

```text
Output dài: file research/s3/Research_Notes_Tan_Hiep.md (bản theo template) và file
ai-audit/AI_Record_Tan_Hiep.md, gửi trong conversation claude.ai ngày 2026-10-16.
Bản gốc AI = commit đầu tiên của hai file này nếu Tấn Hiệp commit nguyên trạng trước khi sửa.
```

#### Corrected Artifact & Highlighted Changes

```diff
2026-10-18 — Research Notes, F-B01-04 (tóm tắt; diff đầy đủ: git diff của commit sửa Research Notes):
- | `POST /api/cart` push nguyên body, không validate | ... | spec §4.2 không nêu rule quantity | Cần GV/nhóm xác nhận ...
+ | `POST /api/cart` push nguyên body | 290–295 | FR-07: thêm cùng sản phẩm phải tăng số lượng | Lỗi gốc DEF-01 |
- Seam: `module.exports = app` + chỉ listen khi `require.main === module` (sửa production code)
+ Test-only: mock `express` để lấy `app`, mock `sqlite3` dùng `:memory:` — không sửa production code
+ Thêm SRC-14 (README.md, SRS v2.0); Open questions 1–4 đánh dấu đã giải quyết
```

### Artifact AI-S3-C01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-C01 (dòng C01-5 trong Experiment Log) |
| Tool / Model | Claude (claude.ai), chat mới không thuộc Project; model: Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16, trước 19:56 (UTC+7) — thời điểm Tấn Hiệp dán response vào conversation chính; giờ gửi prompt chính xác: unknown |
| Output Artifact / Section | `test/cart.ai.test.js` (3 tests) trong project demo `mt-demo`; bản lưu `experiments/s3/runs/Tan_Hiep/C01-ai/` |
| Verdict | VALID — accepted as-is (code test). Ghi chú: một lý do giải thích của Claude sai (xem Verification) |
| Reasoning & Source | Expected values tính tay từ requirement trong prompt; danh sách mutators StrykerJS (Research Notes SRC-06) cho thấy không có mutator đổi hằng số |
| Verification | G1: 3 expected đúng requirement. G2: `npx jest test/cart.ai.test.js` → 3/3 pass. G3: `npx stryker run stryker.ai.config.json` + `node show-mutants.js reports/ai/mutation.json` → mutant `subtotal > 500000` (cart.js:8) **Killed** bởi test "subtotal exactly 500,000"; tổng 14 killed / 1 survived, 93.33%. Lỗi phát hiện: Claude nói test 499.999 "would catch mutants like `>= 499999`" — StrykerJS không sinh mutant này; thực tế test đó kill 2 mutant khác (`freeShip = true`, `subtotal - shippingFee`) |
| Student Fix | Accepted as-is: dán nguyên code Claude, không sửa. Không chấp nhận lý do giải thích của test tùy chọn (ghi vào Limits & Failure Modes của Experiment Log) |

#### Verbatim Prompt

```text
You are helping write Jest assertions for a JavaScript function.

Business requirement (source of truth):
- The cart total is the sum of price × quantity for every item with quantity greater than 0. Items with quantity 0 or negative are ignored.
- If that subtotal is 500,000 or more, shipping is free. Otherwise the shipping fee is added.

Relevant production code (do not change it):
function calcCartTotal(items, shippingFee) {
  let subtotal = 0;
  for (const item of items) {
    if (item.quantity > 0) {
      subtotal += item.price * item.quantity;
    }
  }
  const freeShip = subtotal >= 500000;
  return freeShip ? subtotal : subtotal + shippingFee;
}
module.exports = { calcCartTotal };

Existing test:
const { calcCartTotal } = require('../src/cart');
test('tinh tong gio hang (weak)', () => {
  const total = calcCartTotal([{ price: 100000, quantity: 2 }], 30000);
  expect(total).toBeGreaterThan(0);
});

A mutation testing tool (StrykerJS) produced this SURVIVING mutant:
src/cart.js:8:20  EqualityOperator
-     const freeShip = subtotal >= 500000;
+     const freeShip = subtotal > 500000;

Task:
1. Explain which input makes the original and the mutant behave differently.
2. Propose 1–3 assertions (Jest code) that pass on the original code and fail on this mutant.
3. Base expected values on the business requirement, not on the current implementation.
   If the code contradicts the requirement, say so instead of asserting the code's behaviour.
4. Only use APIs that exist in the code above.
```

#### Verbatim AI Output

````text
## 1. Which input tells them apart

The two versions only disagree when **subtotal is exactly 500,000**:

| subtotal | original (`>=`) | mutant (`>`) |
|---|---|---|
| 499,999 | + fee | + fee |
| **500,000** | **free ship** | **+ fee** |
| 500,001 | free ship | free ship |

Two other conditions are needed:
- `shippingFee` must be non-zero. With a fee of 0, both versions return 500,000.
- The assertion must check the exact value. The existing `toBeGreaterThan(0)` passes for any positive total, so it can never kill this mutant.

**Requirement vs code:** The requirement says "500,000 or more → free shipping", which is `>=`. The original code matches the requirement, so the expected values below come from the requirement and agree with the code. No contradiction.

## 2–3. Assertions (pass on original, fail on mutant)

```js
const { calcCartTotal } = require('../src/cart');

describe('calcCartTotal – free-shipping boundary (500,000)', () => {
  test('subtotal exactly 500,000 → free shipping (requirement: "500,000 or more")', () => {
    // 250,000 × 2 = 500,000 → fee must NOT be added
    expect(calcCartTotal([{ price: 250000, quantity: 2 }], 30000)).toBe(500000);
    // mutant returns 530,000
  });

  test('subtotal reaches exactly 500,000 only after ignoring qty ≤ 0 items → free shipping', () => {
    const items = [
      { price: 300000, quantity: 1 },
      { price: 200000, quantity: 1 },
      { price: 999999, quantity: 0 },  // ignored per requirement
      { price: 100000, quantity: -1 }, // ignored per requirement
    ];
    expect(calcCartTotal(items, 30000)).toBe(500000);
    // mutant returns 530,000
  });
});
```

How each test arrives at its expected value:
- **Test 1:** 250,000 × 2 = 500,000, which is "500,000 or more", so shipping is free and the total is 500,000.
- **Test 2:** The quantity 0 and quantity -1 items are excluded, leaving 300,000 + 200,000 = 500,000. That meets the threshold, so the total is 500,000. This test also checks the filtering rule together with the boundary.

Both tests use only `calcCartTotal(items, shippingFee)` and the `price` and `quantity` fields.

**Optional extra test:** This one does *not* kill this mutant, but it pins the other side of the boundary and would catch mutants like `>= 499999`:

```js
expect(calcCartTotal([{ price: 499999, quantity: 1 }], 30000)).toBe(529999);
```
````

#### Corrected Artifact & Highlighted Changes

```diff
Accepted as-is: code test dán nguyên văn vào test/cart.ai.test.js.
Chỉ thêm wrapper test(...) cho dòng expect của "Optional extra test" (Claude chỉ đưa một dòng expect):
+  test('subtotal 499,999 → shipping added (Claude optional)', () => {
     expect(calcCartTotal([{ price: 499999, quantity: 1 }], 30000)).toBe(529999);
+  });
Rejected: câu giải thích "would catch mutants like `>= 499999`" (StrykerJS không có mutator này).
```

### Artifact AI-S3-D01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-D01 (kèm C01-7) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-18, từ 13:02 (UTC+7), theo timestamp tin nhắn trong conversation claude.ai |
| Output Artifact / Section | `SUT/backend/test/helpers/isolate.js`, `test/helpers/app.js`, `test/cart-orders.test.js` (CO-01…CO-19, 36 tests), `test/defects/cart-orders.defects.js` (DEF-01…08), `package.json` (devDependencies, scripts, jest), `stryker.cart-orders.config.json`; Experiment Log mục Test Cases và D01 |
| Verdict | Pending — chờ Tấn Hiệp review và chạy D01-1…3 |
| Reasoning & Source | Expected results từ `SUT/README.md` (SRS v2.0: FR-07, FR-08, FR-10, FR-11, FR-12, FR-18, FR-20, SEC-03) và `api_specification.md` §4, §6.2. [Bổ sung course slide/ISTQB section theo AI-02 khi review] |
| Verification | Sandbox Claude (Linux, Node v22.22.0): `npm test` 36/36 pass (3 lần + `--runInBand`); `npm run test:defects` 8/8 fail đúng lý do; `database.sqlite` không đổi (md5); Stryker 150 mutants, score 74.83%. **Member run: Not run** (D01-1…3 trong Experiment Log) |
| Student Fix | Pending |

#### Verbatim Prompt

```text
Câu trả lời của Hoà đây: "mấy cái test dc giao thì đc quyết rồi viết rõ ra
tại nó là z đó"
===
Câu trả lời của Hoà theo mình hiểu là, được giao thì thực hiện, rồi viết rõ việc mình đã thực hiện ra
```

Câu trả lời của Tấn Hiệp cho các câu hỏi Claude đặt ra (AskUserQuestion), nguyên văn:

```text
Q (hủy shipping): "Bạn có thể xem trong repo gốc: https://github.com/ttbhanh/eshop-sut; thì đọc docs thử nó có cho phép hay không, hoặc là trong đó có comment tương tự như vậy hay không. Nếu có như vậy thì theo recommend của bạn nhé"
Q (transition): "Vòng đời chuẩn (Recommended)"
Q (lỗi gốc): "File test riêng (Recommended)"
Q (cart/total): "Test theo spec + ghi spec gap (Recommended)"
Q (baseline): "Chỉ assert status (Recommended)"
```

#### Verbatim AI Output

```text
Output dài: các file trong S3-D01_cart-orders_tests.zip và các mục Experiment Log
(Test Cases, D01 — Lỗi gốc / Quyết định scope / Harness / Runs) gửi trong conversation
claude.ai ngày 2026-10-18. Bản gốc AI = commit đầu tiên của các file này nếu commit
nguyên trạng trước khi sửa.
Lưu ý: câu hỏi "cart/total" được Claude đặt trên giả định sai ("spec không có rule");
sau khi đọc README.md, Claude áp dụng ý "test theo spec" của câu trả lời: rule có trong
FR-07/FR-08 → viết thành test lỗi gốc DEF-01…03 thay vì ghi spec gap.
```

#### Corrected Artifact & Highlighted Changes

```diff
[Pending — diff giữa bản AI và bản sau khi Tấn Hiệp review/sửa]
```

### Artifact AI-S3-D01-02

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-D01 (kèm C01-7) |
| Tool / Model | Claude Code, model Claude Opus 5.5 (Tấn Hiệp xác nhận) |
| Recorded Time & Provenance | 2026-10-22, trước 19:55 (UTC+7) — thời điểm Tấn Hiệp dán báo cáo vào claude.ai; giờ chạy chính xác: xem `D01-cc-REPORT.md` |
| Output Artifact / Section | `experiments/s3/runs/Tan_Hiep/D01-1-cc/`, `D01-2-cc/`, `D01-3-cc/`, `D01-cc-REPORT.md`; nhánh local `s3/D01-cart-orders` (repo EShop): `backend/package.json`, `backend/package-lock.json`, `backend/stryker.cart-orders.config.json`, `backend/test/` |
| Verdict | Pending — chờ Tấn Hiệp review evidence và tự chạy lại |
| Reasoning & Source | Expected của từng run lấy từ Experiment Log mục D01 — Runs (bản 2026-10-18) |
| Verification | Theo báo cáo: D01-1-cc 36/36 pass; D01-2-cc 8/8 fail đúng lý do; D01-3-cc fail (`No tests were found`). Chẩn đoán thêm với `--tempDirName stryker-tmp` thì dry run thành công. Claude Code không sửa test/config. **Member run: Not run** |
| Student Fix | Pending |

#### Verbatim Prompt

```text
Task S3-D01 (Cart & Orders). Dùng skill t10-run-report và t10-mutation-testing.

1. Dùng 2 repo có sẵn trong thư mục này; git status, nếu sạch thì git pull --ff-only.
2. Repo EShop: tạo nhánh local s3/D01-cart-orders, giải nén S3-D01_cart-orders_tests.zip (ở thư mục này) vào gốc repo EShop. Zip có sẵn backend/, sẽ thay backend/package.json.
3. Trong backend: npm install, rồi chạy 3 run:
   - D01-1-cc: npm test → kỳ vọng 36 passed
   - D01-2-cc: npm run test:defects → kỳ vọng 8 failed (DEF-01…08, xem test/defects/)
   - D01-3-cc: npx stryker run stryker.cart-orders.config.json --dryRunOnly → kỳ vọng "Initial test run succeeded. Ran 36 tests"
4. Lưu evidence vào repo seminar: experiments/s3/runs/Tan_Hiep/<Run_ID>/. Với D01-2-cc, ghi lý do fail của từng DEF.
5. Kiểm tra git status cả 2 repo; database.sqlite không được đổi.

Không commit, không push, không sửa server.js/database.js. Kết quả khác kỳ vọng thì ghi lại nguyên trạng, đừng sửa test cho khớp. Viết REPORT.md và báo cáo ngắn.
```

#### Verbatim AI Output

```text
S3-D01: Partial. Hai run đầu đúng kỳ vọng, dry run Stryker thì fail.

- D01-1-cc (npm test): 36/36 passed, đúng kỳ vọng.
- D01-2-cc (npm run test:defects): 8/8 failed, đúng kỳ vọng. Lý do fail từng DEF nằm trong bảng của report:
  - DEF-01: thêm lại cùng sản phẩm tạo dòng mới.
  - DEF-02: backend lưu total_amount client gửi (lưu 1 thay vì 12000000).
  - DEF-03: giỏ không bị xóa sau checkout.
  - DEF-04: user hủy được đơn shipping (trả 200).
  - DEF-05: đơn canceled vẫn chuyển được sang delivered (trả 200).
  - DEF-06, DEF-07: user thường gọi được API admin (trả 200).
  - DEF-08: xem chi tiết đơn không cần token (trả 200).
- D01-3-cc (Stryker --dryRunOnly): fail, exit 1, báo No tests were found / ConfigError: No tests were executed. Không sinh mutation.json/html, nên số liệu mutant là Not run.
- Evidence: T10_Mutation_Testing_and_Test_Effectiveness/experiments/s3/runs/Tan_Hiep/D01-{1,2,3}-cc/. Report ở Tan_Hiep/D01-cc-REPORT.md; tôi đặt tên này thay cho REPORT.md theo quy ước task nhiều run của skill.
- Nguyên nhân D01-3-cc (mới là giả thuyết, chưa đối chiếu tài liệu Jest/Stryker): Stryker chạy Jest trong .stryker-tmp/sandbox-*, thư mục bắt đầu bằng dấu chấm. Có vẻ Jest 30 không khớp testMatch khi đường dẫn đi qua thư mục dạng này. Tôi chạy thử thêm một lần với --tempDirName stryker-tmp (chỉ để chẩn đoán, không phải run chính thức) thì ra Initial test run succeeded. Ran 36 tests. Log chẩn đoán lưu cùng thư mục D01-3-cc. File test và config tôi không sửa.
- Cần bạn quyết định: có đổi tempDirName (hoặc dùng testRegex) trong stryker.cart-orders.config.json không. Sau đó bạn chạy lại D01-3 chính thức. Nếu đổi thì xóa backend/.stryker-tmp/ cũ trước khi chạy.
- Lưu ý DEF-08: test dừng ở assertion đầu (gọi không token, trả 200). Assertion kiểm tra quyền sở hữu đơn chưa được chạy. DEF-04/05/06 cũng vậy: các assertion kiểm tra trạng thái DB phía sau chưa chạy.
- Trên lớp: test defect đúng spec nhưng fail trên code gốc nên nằm ngoài baseline. Dry run phải xanh thì Stryker mới chạy mutant.
- database.sqlite không đổi. npm install báo 25 vulnerabilities, tôi không chạy audit fix.
- Chưa commit:
  - Repo EShop, nhánh s3/D01-cart-orders: sửa backend/package.json và backend/package-lock.json (lockfile do npm install cập nhật); thêm stryker.cart-orders.config.json và test/.
  - Repo seminar: thêm 3 thư mục run và D01-cc-REPORT.md.
```

Bản đầy đủ: `experiments/s3/runs/Tan_Hiep/D01-cc-REPORT.md`.

#### Corrected Artifact & Highlighted Changes

```diff
[Pending]
```

### Artifact AI-S3-WF-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / — (quy trình làm việc claude.ai ↔ Claude Code, dùng từ S3-D01) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-22, 19:34–19:55 (UTC+7), theo timestamp tin nhắn trong conversation claude.ai |
| Output Artifact / Section | Skills `t10-mutation-testing`, `t10-run-report` (lưu trên tài khoản claude.ai, đồng bộ sang Claude Code); `Repo/CLAUDE.md` (thư mục làm việc trên máy, ngoài repo nhóm) |
| Verdict | INCOMPLETE — usable after edits |
| Reasoning & Source | Vị trí nạp CLAUDE.md và skills theo tài liệu Claude Code: https://code.claude.com/docs/en/memory, https://code.claude.com/docs/en/skills (truy cập 2026-10-22) |
| Verification | Bản 1 giả định Claude Code mở trong thư mục theo ngày (`22102026`) và clone repo mới mỗi lần — sai với cách Tấn Hiệp làm việc (một thư mục `Repo` cố định chứa sẵn các clone). Bản 2 sửa CLAUDE.md và skill `t10-run-report`. Bản 3 rút gọn khối báo cáo theo mẫu CLAUDE.md dự án khác của Tấn Hiệp. Chạy thật: Claude Code dùng bản 2 ở AI-S3-D01-02 |
| Student Fix | Tấn Hiệp chỉ ra lỗi giả định thư mục; yêu cầu báo cáo ngắn hơn; cung cấp mẫu CLAUDE.md để tham khảo |

#### Verbatim Prompt

```text
Đợi chút. Response mới nhất mình sẽ chưa thực hiện. Giờ mình muốn chuẩn bị lại. Bạn nghĩ các skill hiện tại có thể áp dụng để hoàn thành các task được không? Hoặc là có thể lên mạng tìm, hoặc tự tạo skill để làm Task được không. Mình nghĩ là mình sẽ brainstorm, thảo luận với claude.ai ở đây. Và người thực hiện test sandbox là Claude Code. Sau khi chạy xong, thì viết lại báo cáo cho bạn, và mình sẽ gửi nó lại cho bạn. Và lúc viết báo cáo cũng yêu cầu nó viết báo cáo ngắn để mình cũng có thể đọc (dưới 20 dòng).
---
Trên là ý kiến của mình để nâng cao hiệu suất. Bạn thấy sao, nên làm gì, nên cải thiện thêm gì và không nên làm gì
```

```text
hiện tại 2 skill test-design-istqb và qa-evidence-review có vẻ không liên quan nhiều về mutation testing lắm nhỉ, nên mình muốn viết thêm 1 skill để dùng cho cả claude.ai và Claude Code. Còn vì giờ sử dụng thêm Claude Code, nên sẽ viết các skills, CLAUDE.md cần thiết nhé.
---
Đúng là không coi run của Claude Code là mình tự chạy, vì sau cùng mình cũng sẽ chạy lại hết. Để còn hiểu sâu hơn và demo thuyết trình trên lớp nữa
```

```text
Có gì đó sai sai ở đây, mình không hề sử dụng ở thư mục ngày. Mình đặt hết vào thư mục cha là: "Repo". Không biết cần thay đổi gì không
```

```text
Lần sau, nhớ rằng cái gì không biết thì hỏi mình, đừng có hallucination, giả định gì cả nhé
---
thấy báo cáo hơi dài, bạn tham khảo CLAUDE.md mà mình dùng ở dự án khác thấy ổn nhé
```

#### Verbatim AI Output

```text
Output dài: nội dung 2 skill (thẻ đề xuất skill trong conversation claude.ai) và file CLAUDE.md
gửi trong conversation ngày 2026-10-22 (bản 1 lúc 19:40, bản 2 lúc 19:48, bản 3 lúc 19:55).
```

#### Corrected Artifact & Highlighted Changes

```diff
- Bản 1: "Thư mục này chứa các thư mục làm việc theo ngày (ví dụ 22102026)… repos được clone vào chính thư mục ngày đó."
+ Bản 2: "Thư mục này (Repo) là workspace cố định… Dùng các clone có sẵn, không clone thêm."
+ Bản 3: khối "Báo cáo cho phiên thảo luận" ≤ 15 dòng, nội dung dài ghi vào REPORT; mục "Quyết định đã chốt"; quy tắc "không biết thì hỏi, không giả định"
```

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 4 | 100% |
| VALID: accepted as-is | 2 | 50% |
| INVALID: rejected | 0 | 0% |
| INCOMPLETE: usable after edits | 2 | 50% |

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** [Tự viết sau khi có verdict]

## 4. Disclosure Inputs

- All tools used: Claude (claude.ai), model Claude Opus 5.5; Claude Code (model Claude Opus 5.5)
- AI categories used: Cat.5 integrated — Seminar Track thuộc AI Use Category 5 theo Seminar Guide §7; Tấn Hiệp xác nhận
- Stages/use types: S3 — drafting, data analysis, coding (research notes, demo assertions, baseline test suite)
- 2–3 most impactful prompts: AI-S3-C01-01 (assertion cho surviving mutant), AI-S3-A01-01 (research notes S3); prompt nguyên văn ở mục 2
- Full prompt log: Pending — export conversation chính và chat của AI-S3-C01-01 vào `ai-audit/evidence/s3/Tan_Hiep/`
- Specific AI-assisted parts: `research/s3/Research_Notes_Tan_Hiep.md` (toàn bộ bản nháp); `mt-demo/test/cart.ai.test.js` (3 tests, lưu tại `experiments/s3/runs/Tan_Hiep/C01-ai/`); `SUT/backend/test/` harness, baseline và defect tests Cart & Orders (S3-D01)
- Entirely self-authored parts: [ ]
- Review/revision/verification methods: đọc lại notes và đối chiếu sources; tự chạy lại ví dụ F-A01-04 trên máy (C01-2, C01-4); với test AI: G1 tính tay expected theo requirement, G2 chạy Jest trên code gốc, G3 chạy Stryker và đọc `killedBy` trong `mutation.json`
- IEEE citation inputs: Anthropic, Claude (Claude Opus 5.5), claude.ai, accessed 2026-10-16
- Disclosure text inputs: Claude Opus 5.5 hỗ trợ soạn research notes S3 và đề xuất 3 Jest tests cho một surviving mutant trên project demo. Code test dùng nguyên văn; một lý do giải thích của Claude bị loại vì không khớp với mutators của StrykerJS. Mọi run và số liệu do Tấn Hiệp chạy trên máy mình

## 5. Reflection Inputs

Write your answers in English from your own experience. Leader uses these inputs for AI-04 and the 300-word final reflection according to S2 scope; this is not a requirement for every member to submit 300 words separately.

### 1. How did AI support your work?

[Your answer + artifact IDs]

### 2. What did you accept, reject, or revise from AI outputs?

[Your answer]

### 3. What errors, biases, or limitations did you notice in the AI outputs?

[Concrete evidence]

### 4. How did you verify information, sources, or claims provided by AI?

[Actual verification]

### 5. What did you learn through this project that you could not have learned by simply accepting AI output?

[Your own learning and intellectual contribution]

## 6. Member Review & Handoff

- Missing artifacts / pending verification: transcript export (cả chat chính và chat mới của AI-S3-C01-01); course slide/ISTQB source cho Reasoning & Source theo AI-02
- Member confirmation of accuracy: Pending
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: Pending — bàn giao ở S8

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
