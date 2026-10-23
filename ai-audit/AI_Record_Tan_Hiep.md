# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Lê Tấn Hiệp  
**Assignment:** T10 Seminar  
**Class / Cohort:** Software Testing - CQ2023/3, Nhóm 12  
**AI Use:** Yes  
**Evidence Status:** Partial — có prompt log claude.ai và Claude Code; verdict đã chốt cho cả 16 artifacts (2026-10-23)

Copy file này thành `ai-audit/AI_Record_<Member>.md` khi bắt đầu ghi usage. Mỗi người dùng một file xuyên suốt S1–S8. Điền ngay khi làm; mỗi artifact có Stage và Task ID để không lẫn các giai đoạn. Mục reflection do chính thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký điền trực tiếp vào bản nộp bởi thành viên; không đưa vào prompt AI.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| Claude (claude.ai), model Claude Sonnet 4.6 và Claude Opus 5.5 (theo prompt log #1–#2) | s3 | S3-A01 | drafting / data analysis | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01…05, Source Register SRC-01…07, SRC-10 | Tra cứu docs/papers, soạn notes, chạy ví dụ Stryker trong sandbox AI | Review nội dung, chấp nhận nguyên trạng; tự chạy lại F-A01-04 ở S3-C01 (C01-2, C01-4): kết quả khớp | AI-S3-A01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-B01 | drafting | `research/s3/Research_Notes_Tan_Hiep.md` — F-B01-01…04, SRC-08, SRC-09, SRC-11…13 | Tra cứu docs, đọc source EShop, soạn sơ đồ kiến trúc, prompt skeleton, verification gates | Review nội dung, chấp nhận nguyên trạng | AI-S3-B01-01 |
| Claude (claude.ai, chat mới ngoài Project, model Claude Opus 5.5) | s3 | S3-C01 | coding | `mt-demo/test/cart.ai.test.js` → lưu tại `experiments/s3/runs/Tan_Hiep/C01-ai/` | Phân tích input phân biệt mutant, đề xuất 3 test Jest | Viết input prompt (requirement, code, test, mutant), review theo requirement, chạy G2/G3, phát hiện lý do sai ở test tùy chọn | AI-S3-C01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-D01 | coding / drafting | `SUT/backend/test/` (harness, `cart-orders.test.js`, `defects/cart-orders.defects.js`), `package.json`, `stryker.cart-orders.config.json`; Experiment Log mục Test Cases/D01; Research Notes F-B01-04 (sửa) | Đọc SRS `README.md`, đề xuất phương án cho 5 câu hỏi scope, viết harness test-only và 36 baseline tests + 8 defect tests, chạy thử trong sandbox | Chọn phương án cho các câu hỏi scope (D01-Q1…Q5); [tự điền sau review: phần đã kiểm tra/sửa; chạy D01-1…3 trên máy] | AI-S3-D01-01 |
| Claude Code (model Claude Opus 5.5) | s3 | S3-D01 | coding / data analysis | Runs `experiments/s3/runs/Tan_Hiep/D01-{1,2,3}-cc/`, `D01-cc-REPORT.md`; giải nén bộ test vào nhánh local `s3/D01-cart-orders` | Chạy `npm install`, `npm test`, `npm run test:defects`, Stryker dry run; lưu evidence; chẩn đoán lỗi dry run trên Windows | Dán prompt, đọc báo cáo, quyết định cấu hình Stryker; sẽ tự chạy lại D01-1…3 | AI-S3-D01-02 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | — (workflow, phục vụ S3-D01 trở đi) | other | Skills `t10-mutation-testing`, `t10-run-report` (tài khoản claude.ai); `Repo/CLAUDE.md` (ngoài repo nhóm) | Đề xuất quy trình claude.ai ↔ Claude Code, soạn 2 skill và CLAUDE.md | Đề xuất quy trình, chỉ ra lỗi giả định thư mục ngày, chọn mẫu báo cáo ngắn từ dự án khác | AI-S3-WF-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-C01 | drafting / data analysis | `experiments/s3/Experiment_Log_Tan_Hiep.md` (C01-1…C01-6, Limits & Failure Modes); `console.log`/`killedBy.log` trong `experiments/s3/runs/Tan_Hiep/C01-*/`; `show-mutants.js`; verdict và nội dung AI Record | Ghi kết quả từ output Tấn Hiệp dán, phân tích output, viết script đọc `killedBy`, soạn prompt C01-5 | Tự chạy mọi lệnh trên máy, dán output, copy reports, commit | AI-S3-C01-02 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-C01 | coding | `SUT/.gitignore` (commit EShop 92bbf22) | Soạn `.gitignore` gốc repo EShop | Restore `database.sqlite`, xóa lockfile thừa, commit | AI-S3-C01-03 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-D01 | drafting | Tin nhắn gửi Thái Hòa về seams và scope Cart & Orders | Soạn tin nhắn | Gửi tin, chuyển câu trả lời của Hòa | AI-S3-D01-04 |
| Claude Code (model Claude Opus 5.5) + Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-D01 | coding / data analysis | Đổi `tempDirName`, `.gitignore` EShop, tách DEF-08; runs D01-4-cc, D01-5-cc; commit 8d60e9b, 5fc08df | claude.ai soạn prompt và docs; Claude Code sửa file, chạy, commit | Chọn phương án D01-Q7, D01-Q8; cho phép commit | AI-S3-D01-03 |
| Claude (claude.ai, model Claude Opus 5.5) + Claude Code (model Claude Opus 5.5) | s3 | — (workflow) | coding | `Repo/tools/extract_ai_log.py`, `Repo/.claude/settings.json` (hook Stop), hai prompt log trong `ai-audit/evidence/s3/Tan_Hiep/` | Viết script trích log, cấu hình hook, trích log; Claude Code cài và kiểm tra | Yêu cầu tự xuất log; quyết định che tên user, xóa file thừa | AI-S3-WF-02 |
| Claude Code (model Claude Opus 5.5) + Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-G01 | coding / data analysis | `SUT/backend/test/ai/cart-orders.ai.js` (AI-CO-01…05, nhánh `s3/G01-ai`); runs `G01-1-cc`, `G01-2-cc`; `G01-cc-REPORT.md`; Experiment Log mục AI Runs, Comparison | Claude Code: phân tích 6 survivor, sinh 5 test, giải thích vì sao không viết test cho 550:11, chạy Jest và Stryker. claude.ai: soạn prompt, spec review | Chọn 6 mutant mục tiêu (phương án a), quyết định cách xử lý khi lộ thông tin ở preflight, duyệt kết quả spec review | AI-S3-G01-01 |
| Claude (claude.ai, model Claude Opus 5.5) + Claude Code (model Claude Opus 5.5) | s3 | — (workflow, chuyển S3 → S4) | other / drafting | `claude/Handoff_T10_Tan_Hiep.md` (Project claude.ai, ngoài repo); cập nhật skill `t10-mutation-testing`, `t10-run-report`; `Repo/CLAUDE.md`; hook Stop chuyển sang `ai-audit/evidence/s4/Tan_Hiep/` | claude.ai đề xuất cập nhật skill, viết handoff (và cập nhật mục 8 lúc 10:14), soạn prompt WF; Claude Code sửa `CLAUDE.md`, cấu hình hook | Yêu cầu handoff, lưu skill, dán prompt | AI-S3-WF-03 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-I01 | data analysis / drafting | Prompt I01 cho Claude Code; lệnh PowerShell cho member run I01-1/2/3; phân tích nguồn `frozen-input.zip`; nháp "### S3-I01 — Three shared mutant cases"; bản sửa README Coupons-extensions của Hòa (`7ab200b`); review Experiment Log | Kiểm repo, so overlay với `main`, đối chiếu `mutation.json`/SRS, soạn prompt, nháp, review | Chọn phạm vi I01 (bản mở rộng, chạy theo guide zip), tự chạy I01-1/2/3, tự sửa nháp 3 cases, gửi góp ý cho Hòa, push | AI-S3-I01-01 |
| Claude Code (model Claude Opus 5.5) | s3 | S3-I01 | coding / data analysis | Runs `I01-{1,2,3}-cc`; `I01-cc-compare/` (`i01_compare.py`, `i01_member_provenance.py`); `I01-1/git-reflog.txt`; `I01-cc-REPORT.md`; Experiment Log mục Cross Reproduction | Chạy baseline/manual/AI Coupons theo guide, ghi missing step, so từng mutant, provenance (reflog, hash), ghi log | Dán prompt, đọc báo cáo, trả lời Q1/Q2, tự chạy lại I01-1/2/3 | AI-S3-I01-02 |
| Claude (claude.ai, model Claude Opus 5.5) + Claude Code (model Claude Opus 5.5) | s3 | S3-D01, S3-E01, S3-F01, S3-G01 | data analysis | Lệnh member self-run; `experiments/s3/runs/Tan_Hiep/S3-member-compare/`; Experiment Log mục D01 Runs, Baseline, Comparison, header | claude.ai kiểm `8d60e9b` vs `806ba19`, soạn lệnh có header provenance; Claude Code so từng mutant, cập nhật log | Chọn cách chạy (nhánh cũ + policy chung qua CLI), tự chạy D01-1/2/3, E01-1, F01-2, G01-2 | AI-S3-E01-01 |

## 2. Artifact Audit

### Artifact AI-S3-A01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A01 |
| Tool / Model | Claude (claude.ai). Theo transcript: Claude Sonnet 4.6 trả lời lượt #1 (đọc workbook) và phần đầu lượt #2 (tra docs/papers, lập task list); Claude Opus 5.5 phần còn lại của #2 (viết notes, chạy ví dụ Stryker). Sửa 2026-10-22; bản trước ghi chỉ Opus 5.5 |
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
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #1–#2 (nguyên văn, có giờ và model từng lượt).
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
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #3. Sửa 2026-10-18: lượt #23.
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
| Recorded Time & Provenance | 2026-10-16, trước 19:56 (UTC+7) — thời điểm Tấn Hiệp dán response vào conversation chính (prompt log claude.ai lượt #11); giờ gửi prompt chính xác: unknown. Chat riêng này không nằm trong prompt log |
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
| Verdict | INCOMPLETE — usable after edits |
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
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #23. Bộ test gốc do AI viết: commit EShop 8d60e9b (đã gồm thay đổi của AI-S3-D01-03).
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
| Verdict | VALID — accepted as-is |
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

Bản đầy đủ: `experiments/s3/runs/Tan_Hiep/D01-cc-REPORT.md`. Prompt log: `ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md` lượt #1; prompt do claude.ai soạn ở `ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md` lượt #26–#27.

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
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #24–#28.
```

#### Corrected Artifact & Highlighted Changes

```diff
- Bản 1: "Thư mục này chứa các thư mục làm việc theo ngày (ví dụ 22102026)… repos được clone vào chính thư mục ngày đó."
+ Bản 2: "Thư mục này (Repo) là workspace cố định… Dùng các clone có sẵn, không clone thêm."
+ Bản 3: khối "Báo cáo cho phiên thảo luận" ≤ 15 dòng, nội dung dài ghi vào REPORT; mục "Quyết định đã chốt"; quy tắc "không biết thì hỏi, không giả định"
```

### Artifact AI-S3-C01-02

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-C01 |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16 19:33–20:27 (UTC+7), prompt log claude.ai lượt #4–#18, #20, #21 |
| Output Artifact / Section | `experiments/s3/Experiment_Log_Tan_Hiep.md` dòng C01-1…C01-6 và mục Limits & Failure Modes; `console.log`/`killedBy.log` trong `experiments/s3/runs/Tan_Hiep/C01-*/` (tạo từ output Tấn Hiệp dán); `show-mutants.js` (công cụ phụ, không commit); prompt C01-5; cập nhật AI Record |
| Verdict | VALID — số liệu chép từ output thật; Tấn Hiệp đã review và commit (b43a899, 42f5003) |
| Reasoning & Source | Output console của các lần chạy C01 trên máy Tấn Hiệp |
| Verification | Đối chiếu số trong log với console output (C01-2: 20.00%, C01-4: 93.33%, C01-5: 93.33%); `killedBy.log` sinh bằng script từ `mutation.json` thật |
| Student Fix | Chỉ ra Claude không nói rõ nơi đặt `console.log` (lượt #12); sửa vị trí thư mục report |

#### Verbatim Prompt / Verbatim AI Output

```text
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #4–#18, #20, #21.
```

### Artifact AI-S3-C01-03

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-C01 |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16 20:20 (UTC+7), prompt log claude.ai lượt #19 |
| Output Artifact / Section | `SUT/.gitignore` (commit EShop 92bbf22) |
| Verdict | VALID |
| Reasoning & Source | `git status` thật của Tấn Hiệp (lượt #19) |
| Verification | Claude thử các rule trên bản clone: chỉ `.gitignore` hiện là file mới, `backend/package-lock.json` vẫn được track. Nội dung trên GitHub trùng bản gửi (kiểm 2026-10-16) |
| Student Fix | Accepted as-is |

#### Verbatim Prompt / Verbatim AI Output

```text
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #19.
```

### Artifact AI-S3-D01-04

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-D01 (gỡ chặn scope và seams) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16 20:28 (UTC+7), prompt log claude.ai lượt #22 |
| Output Artifact / Section | Tin nhắn gửi Thái Hòa (ngoài repo) |
| Verdict | INCOMPLETE — các câu hỏi scope dựa trên F-B01-04 bản cũ, chưa đọc SRS `README.md`; câu hỏi 1 thừa |
| Reasoning & Source | Research Notes F-B01-04 (bản 2026-10-16) |
| Verification | Câu trả lời của Hòa (lượt #23) dẫn tới việc đọc SRS và sửa F-B01-04 |
| Student Fix | Accepted as-is khi gửi |

#### Verbatim Prompt / Verbatim AI Output

```text
Xem prompt log ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #22 (khối "[Soạn tin nhắn — Ngắn, có phương án]").
```

### Artifact AI-S3-D01-03

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-D01 (follow-up) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 — soạn prompt và docs; Claude Code, Claude Opus 5.5 — sửa file, chạy, commit |
| Recorded Time & Provenance | 2026-10-22 20:04–20:16 (UTC+7): claude.ai lượt #29; Claude Code lượt #2 |
| Output Artifact / Section | `backend/stryker.cart-orders.config.json` (`tempDirName: "stryker-tmp"`), `.gitignore` EShop, `backend/test/defects/cart-orders.defects.js` (DEF-08a/08b); runs `D01-4-cc`, `D01-5-cc`; Experiment Log D01; commit EShop 8d60e9b, seminar 5fc08df |
| Verdict | VALID |
| Reasoning & Source | Quyết định D01-Q7, D01-Q8 của Tấn Hiệp (Experiment Log) |
| Verification | D01-4-cc: 9/9 defect tests fail đúng lý do; D01-5-cc: dry run `Ran 36 tests`. **Member run: Not run** |
| Student Fix | Accepted as-is |

#### Verbatim Prompt / Verbatim AI Output

```text
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #29.
Claude Code: ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md, lượt #2.
```

### Artifact AI-S3-WF-02

| Field | Value |
|---|---|
| Stage / Task ID | S3 / — (công cụ trích AI log) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 — viết script và hook; Claude Code, Claude Opus 5.5 — cài, trích log, kiểm tra, commit |
| Recorded Time & Provenance | 2026-10-22 20:16–20:41 (UTC+7): claude.ai lượt #30–#33 và các lượt sau; Claude Code lượt #3–#5 |
| Output Artifact / Section | `Repo/tools/extract_ai_log.py`, `Repo/.claude/settings.json` (ngoài repo nhóm); `ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md`, `ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md`; commit seminar b1674c8, 345e1b1, 78642bd |
| Verdict | INCOMPLETE — cần 4 lần sửa trước khi đạt |
| Reasoning & Source | Định dạng transcript JSONL của Claude Code; tài liệu hooks https://code.claude.com/docs/en/hooks (truy cập 2026-10-22) |
| Verification | Script chạy thật trên transcript claude.ai và Claude Code; hook Stop tự ghi log sau lượt (Claude Code xác nhận); grep `tanhi`, MSSV, email = 0 trong cả hai log |
| Student Fix | Lỗi phát hiện qua review: (1) tính lệnh local `/exit` là prompt; (2) transcript rỗng ghi đè file `unknown_session`; (3) phiên resume làm lặp prompt; (4) không che tên user Windows đứng riêng, regex phân biệt hoa thường; (5) prompt ghi sai đường dẫn `Repo-setup.zip`. Đã sửa (1)–(4) trong script; (5) sửa ở prompt sau. Bản sửa `re.I` của (4) chưa cài trên máy |

#### Verbatim Prompt / Verbatim AI Output

```text
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #30–#33 (các lượt sau sẽ có ở lần trích kế tiếp).
Claude Code: ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md, lượt #3–#5.
```

### Artifact AI-S3-G01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-G01 |
| Tool / Model | Claude Code, Claude Opus 5.5 (`claude-opus-5-5`) — sinh assertion, chạy Jest/Stryker, ghi evidence; Claude (claude.ai), Claude Opus 5.5 — soạn prompt, spec review |
| Recorded Time & Provenance | 2026-10-23 01:40–02:08 (UTC+7). Claude Code session `85a13ef2`: lượt #11 (bị dừng ở preflight), #12 (G01-1-cc), lượt G01-2-cc kế tiếp. claude.ai: lượt #59–#64 |
| Output Artifact / Section | `backend/test/ai/cart-orders.ai.js` — AI-CO-01…05 (EShop `s3/G01-ai` @ `143a016` raw, `f4696c6` chỉ sửa comment); runs `experiments/s3/runs/Tan_Hiep/G01-1-cc/`, `G01-2-cc/`; `G01-cc-REPORT.md`; Experiment Log mục AI Runs, Comparison |
| Verdict | VALID |
| Reasoning & Source | Oracle theo SRS `README.md` (FR-07, FR-10 dòng 162, FR-18) và `api_specification.md` §4.1, §4.2, §4.5, §4.6, §6.2. Spec không định nghĩa body lỗi 404 và dạng response của GET /api/cart; AI tự ghi rõ hai chỗ oracle một phần lấy từ code (dạng `[]`, trường `error`) và không assert nguyên văn chuỗi lỗi. 550:11 không viết test vì là mutant defect-fixing (DEF-05) — lập luận đúng |
| Verification | G01-1-cc: 41/41 pass trên code gốc, chạy một lần, không sửa test. G01-2-cc: 286:7, 292:7, 326:47, 346:45, 532:47 Killed, mỗi mutant bởi test AI tương ứng (`killedBy` trong `mutation.json`); 550:11 Survived. Toàn run: Killed 97, Timeout 23, Survived 21, NoCoverage 2, RuntimeError 7; score 83.92%. Spec review từng test: kiểm FR/§ trích dẫn trong README và `api_specification.md`, dữ liệu item khớp seed `database.js:98, 101`. **Member run: Not run** |
| Student Fix | Accepted as-is (assertion không sửa). Chỉ sửa comment header ở `f4696c6`: header có sẵn từ commit setup ghi "(đã review)" và "sinh trong session sạch" — cả hai sai tại thời điểm sinh. Hạn chế ghi nhận: **blind một phần** — session `85a13ef2` đã in 2 subject commit F01 ở preflight (không có assertion, diff hay số liệu); agent tự phát hiện, dừng và báo; G01-1-cc chạy tiếp trong chính session đó thay vì session mới như phương án đã chọn |

#### Verbatim Prompt / Verbatim AI Output

```text
Claude Code: ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md, session 85a13ef2, lượt #11, #12 và lượt G01-2-cc kế tiếp.
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #59–#64.
```

### Artifact AI-S3-WF-03

| Field | Value |
|---|---|
| Stage / Task ID | S3 / — (workflow, chuyển giao S3 → S4) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 — đề xuất cập nhật skill, viết handoff, soạn prompt WF; Claude Code, Claude Opus 5.5 — sửa `Repo/CLAUDE.md`, chuyển hook |
| Recorded Time & Provenance | 2026-10-23 02:31–02:46 (UTC+7): claude.ai phiên `9ffbcb5b` lượt #71–#74; Claude Code session `4a560803` lượt WF (log S3 #16, thiếu output; log S4 #1–#2, đầy đủ). Cập nhật handoff mục 8 lúc 10:14: claude.ai lượt #75 |
| Output Artifact / Section | `claude/Handoff_T10_Tan_Hiep.md` (Project claude.ai, ngoài repo); cập nhật skill `t10-mutation-testing`, `t10-run-report` (tài khoản claude.ai); `Repo/CLAUDE.md`; hook Stop ghi vào `ai-audit/evidence/s4/Tan_Hiep/` với `--since 2026-10-22T19:38:28Z` |
| Verdict | VALID |
| Reasoning & Source | Handoff đối chiếu được với repo khi phiên `5aa8b0cf` bắt đầu: SHA nhánh và cấu trúc thư mục khớp |
| Verification | Phiên `5aa8b0cf` clone 2 repo: `s3/D01-cart-orders` `8d60e9b`, `s3/F01-manual` `b77f5d6`, `s3/G01-ai` `f4696c6`, EShop main `b271c41` khớp handoff. Hook ghi đủ các lượt I01 vào `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md`. Skill và `CLAUDE.md` không đổi sau phiên S3 (Tấn Hiệp xác nhận 2026-10-23 10:37) |
| Student Fix | Accepted as-is. Hạn chế phát hiện sau: (1) preflight skill `t10-run-report` (commit AI log rồi `pull --ff-only`) bị từ chối khi remote có commit mới (sự cố rebase ở AI-S3-I01-02), chưa sửa skill; (2) mục 8 (lượt #75) ghi "xác nhận giả thuyết Timeout phụ thuộc môi trường" — nói quá, dữ liệu member run cho thấy concurrency không phải nguyên nhân (xem AI-S3-E01-01) |

#### Verbatim Prompt / Verbatim AI Output

```text
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md, lượt #71–#75.
Claude Code: ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md, lượt #16; ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md, lượt #1–#2.
```

### Artifact AI-S3-I01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-I01 |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 (`claude-opus-5-5`) |
| Recorded Time & Provenance | 2026-10-23 10:18–12:10 (UTC+7), phiên `5aa8b0cf`, từ lượt #8 |
| Output Artifact / Section | Prompt I01 (v1, v2) cho Claude Code; lệnh PowerShell member run I01-1/2/3; phân tích nguồn `frozen-input.zip`; nháp "### S3-I01 — Three shared mutant cases" (Experiment Log); bản sửa `experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md` theo yêu cầu của Hòa (commit `7ab200b`); tin nhắn góp ý cho Hòa; review Experiment Log; nháp mục AI Record này; bảng đề xuất xử lý góp ý G1–G7 của Phúc (S3-I03), Tấn Hiệp duyệt, Claude Code ghi vào feedback_for_Tan_Hiep.md và Experiment Log (`6a82fe7`) |
| Verdict | INCOMPLETE — dùng được sau khi sửa |
| Reasoning & Source | Đối chiếu `mutation.json` của I01-1/2/3; SRS `README.md` FR-09 C2/C3/C5, FR-17; `api_specification.md` §5.1; `backend/test/coupons.test.js`, `test/defects/coupons.defects.js` @ `806ba19`; schema `@stryker-mutator/core` 10.0.0 |
| Verification | "EShop main `52ed6ac` chứa đủ 7 file overlay" và "zip có nội dung bằng `git archive --format=zip 806ba19`" kiểm bằng so byte/hash trong sandbox. Mọi mutant, `killedBy`, `coveredBy` trong nháp 3 cases đọc từ `mutation.json`. I01-1/2/3 do Tấn Hiệp tự chạy, khớp 120/120 với report của Hòa |
| Student Fix | Lỗi của AI phát hiện qua review: (1) prompt I01 v1 thiếu `git fetch`, expected values, thư mục tạm, đường dẫn log s4, cảnh báo dry run đếm test 2 lần — AI tự sửa khi Tấn Hiệp hỏi "đủ chưa"; (2) lệnh member run dùng `Tee-Object` không ghi dòng lệnh/commit nên thiếu provenance — bổ sung bằng reflog và hash; (3) nháp Case 3 sai 2 ý: "test baseline chỉ assert status" (thực tế còn `not.toHaveProperty('discount_amount')`) và "Hòa cố ý không dùng oracle lỗi" (CP-02 assert `body.error` kiểu String); (4) góp ý `inputs.json` cho Hòa là thừa (README đã ghi), AI rút lại; (5) review bỏ sót việc commit `5d5bf16` xóa mục `## Cross Reproduction` — Claude Code phát hiện, đã khôi phục (`95b7d7e`); (6) đặt log phiên vào `evidence/s4` dù công việc là S3 — Tấn Hiệp chỉ ra, chuyển sang `evidence/s3`. Tấn Hiệp tự viết lại nháp 3 cases (các lỗi trong bản tự viết được review và sửa ở `5d5bf16`, `970f880`, không thuộc artifact này) |

#### Verbatim Prompt / Verbatim AI Output

```text
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-23_5aa8b0cf.md, từ lượt #8 (lượt #1–#7: lập kế hoạch và nháp S4-A01, chưa dùng).
```

### Artifact AI-S3-I01-02

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-I01 |
| Tool / Model | Claude Code, Claude Opus 5.5 (`claude-opus-5-5`) |
| Recorded Time & Provenance | 2026-10-23 10:26–11:52 (UTC+7), Claude Code session `ad369217`: lượt #3 (I01-cc), #4 (member reruns, so sánh), #5 (provenance), #7 (Q1), lượt Q2 kế tiếp |
| Output Artifact / Section | Runs `experiments/s3/runs/Tan_Hiep/I01-{1,2,3}-cc/`; `I01-cc-compare/i01_compare.py` (+ cờ `--member`), `i01_comparison.md`, `i01_member_provenance.py`, `i01_member_provenance.md`; `I01-1/git-reflog.txt`; `I01-cc-REPORT.md`; Experiment Log mục Cross Reproduction; commit `8d38cb4`, `133f782`, `8ba51ab`, `98407b9`, `95b7d7e` (bản sao khác hash nằm trên nhánh `s3/A03-B03-phuc-hoang`, merge `ce7d817`) |
| Verdict | VALID |
| Reasoning & Source | Guide `Coupons-extensions-2026-10-23-agent/README.md`; report tham chiếu của Hòa (`D04-merge-2026-10-23-agent/frozen-coupons-baseline/mutation.json`, `manual-mutation.json`, `ai-mutation.json`) |
| Verification | I01-{1,2,3}-cc khớp report của Hòa 120/120 mutant, 0 đổi trạng thái; Tấn Hiệp tự chạy I01-1/2/3 cho cùng kết quả; claude.ai đếm lại độc lập từ `mutation.json`. Missing step thiếu `npm ci` tái hiện được, README đã sửa (`7ab200b`) |
| Student Fix | Accepted. Hạn chế quy trình: commit AI log trước khi pull → `pull --ff-only` bị từ chối, agent rebase commit local chưa push (không xung đột; gốc lỗi ở preflight skill). Khi thiếu dữ liệu (placeholder lệnh, mục Log bị xóa) agent dừng và hỏi (Q1, Q2) thay vì tự quyết |

#### Verbatim Prompt / Verbatim AI Output

```text
Claude Code: ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md, session ad369217, lượt #3–#5, #7 và lượt Q2 kế tiếp (hook chuyển sang s4 từ cuối S3).
```

### Artifact AI-S3-E01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-D01, S3-E01, S3-F01, S3-G01 (member self-run và so sánh) |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 — kiểm baseline, soạn lệnh; Claude Code, Claude Opus 5.5 — so sánh, ghi log |
| Recorded Time & Provenance | 2026-10-23 11:30–12:16 (UTC+7). claude.ai phiên `5aa8b0cf` lượt #21–#22, #27; Claude Code session `ad369217` lượt #6 |
| Output Artifact / Section | Lệnh PowerShell (hàm `Run` ghi giờ, commit, lệnh vào đầu `console.log`); `experiments/s3/runs/Tan_Hiep/S3-member-compare/` (REPORT, `member_compare.py`, `member_comparison.md`); Experiment Log mục D01 Runs, Baseline, Comparison, header; commit `87d6b08`; bullet 'Tổng hợp Killed ↔ Timeout' cuối mục Limits của Experiment_Log_Tan_Hiep.md — claude.ai soạn, Tấn Hiệp dùng nguyên văn (commit `6a82fe7`) |
| Verdict | VALID |
| Reasoning & Source | `8d60e9b` vs `806ba19`: `server.js`, `database.js`, `cart-orders.test.js`, helpers Cart và `package-lock.json` giống nhau (git diff); cờ `--concurrency`, `--timeoutMS`, `--timeoutFactor` và mặc định `timeoutMS 5000`, `timeoutFactor 1.5` theo schema `@stryker-mutator/core` 10.0.0 |
| Verification | Member run: D01-1 36 pass, D01-2 9 fail đúng lý do, D01-3 dry run 36 tests; E01-1 82/25/34/2/7 (0 khác biệt với run lại của Hòa), F01-2 112/18/11/2/7, G01-2 102/18/21/2/7. Tập Survived trùng ở cả 6 cặp; claude.ai đếm lại độc lập từ `mutation.json` |
| Student Fix | Accepted. Hạn chế: lệnh không đặt UTF-8 cho console nên chữ tiếng Việt trong `console.log` bị lỗi mã hóa (số liệu không ảnh hưởng; giữ nguyên log thô). Giả thuyết "Killed↔Timeout do concurrency" bị dữ liệu bác: F01-2 (concurrency 2) giống hệt F01-2-cc (concurrency 15). claude.ai đưa giả thuyết Jest testTimeout 5 s chạy đua với timeout Stryker (phiên 5aa8b0cf lượt #22); dữ liệu 3 máy bác bỏ (cả hai config dùng testTimeout mặc định, kết quả lặp lại trên Windows/macOS) — claude.ai tự rút lại ở lượt #27 |

#### Verbatim Prompt / Verbatim AI Output

```text
claude.ai: ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-23_5aa8b0cf.md, lượt #21–#22, #27.
Claude Code: ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md, session ad369217, lượt #6.
```

### Artifact AI-S4-A01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-A01 |
| Tool / Model | Claude (claude.ai), Claude Sonnet 5.5 |
| Recorded Time & Provenance | 2026-10-23 12:38–13:20 (UTC+7): phiên `51fe5d1c` lượt #2–#4 |
| Output Artifact / Section | `materials/s4/Guide_Contribution_Tan_Hiep.md`; `draft/User_Guide.md` (bản tiếng Việt) |
| Verdict | ĐỀ XUẤT: VALID sau sửa (chờ bạn xác nhận) |
| Reasoning & Source | Lệnh cài đặt lấy từ tài liệu chính thức; số liệu đã chạy lại trong sandbox Linux/Node 22 |
| Verification | Chạy lại trên Windows 11, Node v24.15.0, npm 11.12.1 (F01c-1-cc): 4 mốc khớp; chưa tái hiện lỗi npm.ps1 |
| Student Fix | Lỗi AI tự phát hiện: (1) dẫn FR-07 làm căn cứ "giỏ hàng mới rỗng" — sửa thành oracle suy luận; (2) câu "phiên AI từng thấy bài manual" nói quá — viết lại. Ngôn ngữ: bạn yêu cầu chuyển bản English sang tiếng Việt (AI dịch lại) |
 
### Artifact AI-S4-B01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-B01 |
| Tool / Model | Claude (claude.ai), Claude Sonnet 5.5 |
| Recorded Time & Provenance | 2026-10-23 12:38–13:20 (UTC+7): phiên `51fe5d1c` |
| Output Artifact / Section | `materials/s4/Report_Contribution_Tan_Hiep.md`; sửa trực tiếp `draft/Seminar_Report.md` |
| Verdict | ĐỀ XUẤT: VALID (chờ bạn xác nhận) |
| Reasoning & Source | Bảng 6.2/6.5/6.6 đối chiếu với `experiments/s3/Experiment_Log_Tan_Hiep.md`; mutant 550:11 là mutant sửa lỗi (DEF-05) nên cả manual và AI đều để Survived |
| Verification | Đối chiếu số liệu với log S3; mức review B (đọc diff, chạy lại lệnh)|
 
### Artifact AI-S4-C01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-C01 |
| Tool / Model | Claude (claude.ai), Claude Sonnet 5.5 |
| Recorded Time & Provenance | 2026-10-23 12:38–13:20 (UTC+7): phiên `51fe5d1c` |
| Output Artifact / Section | `materials/s4/Demo_Contribution_Tan_Hiep.md` (kịch bản phần Cart & Orders). Hòa đã viết lại `docs/Demo_Script.md` (case Coupons) nên phần Cart nộp ở dạng kịch bản trong file này, chưa quay |
| Verdict | ĐỀ XUẤT: VALID sau sửa (chờ bạn xác nhận) |
| Reasoning & Source | Lệnh cài đặt dùng tài liệu chính thức |
| Verification | Lệnh và số liệu lấy từ run S3 của Tấn Hiệp trên Windows 11 (E01-1, F01-2, G01-2); lệnh install chạy lại ở F01a-1-cc. Chưa chạy theo kịch bản và chưa quay. |
| Student Fix | Lỗi AI: python edit lần đầu sai chuỗi "Mở" (đã sửa). Ngôn ngữ: bạn yêu cầu chuyển bản English sang tiếng Việt (AI dịch lại) |
 
### Artifact AI-S4-WF-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / — (workflow, handoff cuối phiên `5aa8b0cf`, lượt #31) |
| Tool / Model | Claude (claude.ai), Opus 5.5 — viết handoff, phiên 5aa8b0cf (theo AI Record S3); Claude (claude.ai), Sonnet 5.5 — kiểm chứng handoff, phiên 51fe5d1c |
| Recorded Time & Provenance | Handoff: phiên `5aa8b0cf` lượt #31. Kiểm chứng: 2026-10-23 12:38–12:52, phiên `51fe5d1c` lượt #2 |
| Output Artifact / Section | `claude/Handoff_T10_Tan_Hiep.md` |
| Verdict | ĐỀ XUẤT: INCOMPLETE (chờ bạn xác nhận) |
| Reasoning & Source | Clone 2 repo và đối chiếu với handoff |
| Verification | Sai: (1) hash `main` của SUT cũ; (2) "User_Guide ~880 dòng" thực tế 334; (3) `main` seminar đã tiến lên; (4) không phát hiện lỗi thiếu dấu phẩy `backend/package.json` dòng 24 trên SUT `main` |
| Student Fix | Dùng trạng thái repo thật thay cho handoff; Hòa đã sửa package.json trên SUT main (4b28756, 14:05); nhánh đề xuất đã xóa, không dùng. **Verbatim Prompt/Output lượt #31: PENDING** — cần transcript `5aa8b0cf` |
 
### Artifact AI-S4-F01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-F01 (F01a, F01c) |
| Tool / Model | Claude Code, Claude Opus 5.5 (`claude-opus-5-5`) |
| Recorded Time & Provenance | 2026-10-23 12:49–12:51 (F01a) và 14:09–14:13 (F01c) (UTC+7): Claude Code session `3058f82a`; log `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md` |
| Output Artifact / Section | `experiments/s4/runs/F01a-1-cc/`, `experiments/s4/runs/F01a-cc-REPORT.md`; `experiments/s4/runs/F01c-1-cc/` (REPORT, console.log, json, html, diff, log chẩn đoán `tempDirName`) |
| Verdict | ĐỀ XUẤT: VALID |
| Reasoning & Source | F01a: kiểm `backend/package.json` trên SUT main (lỗi JSON dòng 24) và dry run baseline `806ba19` (36 tests Jest, 150 mutants); thời gian full mutate Cart lấy từ console.log S3. F01c: làm đúng `draft/User_Guide.md` mục 2.2–4.1 trên workshop `6d2e790`; số Stryker đếm từ `mutation.json` |
| Verification | F01c-1-cc khớp 4 mốc của guide: 88 tests; 7 mutants, 7 Survived; sau CO-02 3 Killed; sau 3 assertion 7 Killed, 0 Survived. Lỗi AI: script áp snippet sai 2 lần (CRLF ở CO-02, escaping backtick ở CO-12); run 14:11:33–14:11:40 bị loại và chạy lại |
| Student Fix | (điền sau review) |
 
### Artifact AI-S4-D01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-D01 (D01-1-cc; chuẩn bị khối lệnh cho D01-1) |
| Tool / Model | Claude Code, Claude Opus 5.5 (`claude-opus-5-5`) |
| Recorded Time & Provenance | 2026-10-23 14:40–14:48 (D01-1-cc) và 14:53–15:50 (chuẩn bị khối lệnh, thu kết quả D01-1) (UTC+7): Claude Code session `3058f82a`; log `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md` |
| Output Artifact / Section | `experiments/s4/runs/D01-1-cc/` (REPORT, console.log, 3 bộ report, `guide-tested.md` + SHA-256); `materials/s4/Guide_Reproduction_Tan_Hiep.md`; khối lệnh PowerShell 0–4 và `experiments/s4/runs/Tan_Hiep/D01-1/NOTES.md` (mẫu), `REPORT.md`, `count_d01.md` |
| Verdict | ĐỀ XUẤT: INCOMPLETE |
| Reasoning & Source | D01-1-cc chỉ làm theo `Guide_Contribution_Thai_Hoa.md`; số Stryker đếm từ `mutation.json`. Khối lệnh D01-1 lấy nguyên văn lệnh của guide, chỉ thêm khối chuẩn bị, hàm `Step`, `BẠN LÀM` / `XONG KHOI n`, và đổi dòng `$docsRoot` (ghi trong "Khác guide") |
| Verification | D01-1-cc: mọi số khớp guide (120 mutants, 39/21/30/25/5, 52.17%; manual và AI 41/21/28/25/5, 53.91%). D01-1 (Tấn Hiệp tự chạy): 0 mutant khác trạng thái so với D01-1-cc. Lỗi AI: (1) khối lệnh chạy qua hàm `Step` không ghi output native của npm/Jest/Stryker vào transcript, nên số tests của D01-1 chỉ có trong NOTES; (2) khối overlay khi chạy lần 1 bị cắt thành `-Destination $des` (bản in trong chat đầy đủ; nguyên nhân bị cắt chưa xác định), 3 file bị copy lạc, phải chạy lại khối 0–3. Khối 4 (review candidate G02): Pending |
| Student Fix | (điền sau review) |
 
### Artifact AI-S4-E01-01
 
| Field | Value |
|---|---|
| Stage / Task ID | S4 / S4-E01 (ghép User Guide) |
| Tool / Model | Claude Code, Claude Opus 5.5 (`claude-opus-5-5`) |
| Recorded Time & Provenance | 2026-10-23 (UTC+7): Claude Code session `3058f82a`; log `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md` |
| Output Artifact / Section | `materials/s4/User_Guide.md` (thay bản copy một phần trước đó): ghép `Guide_Contribution_Tan_Hiep.md` (giữ tiếng Việt), `Guide_Contribution_Thai_Hoa.md` và `Guide_Contribution_Phuc_Hoang.md` (dịch English sang tiếng Việt); ghi chú đầu file gồm nguồn/tác giả, "Cần quyết định", "Việc tác giả cần sửa" |
| Verdict | ĐỀ XUẤT: INCOMPLETE |
| Reasoning & Source | Chỉ dịch văn xuôi; lệnh, code, số liệu, đường dẫn, mã mutant, tên test, prompt giữ nguyên. Installation chung + Setup riêng theo domain. Troubleshooting gộp 27 dòng nguồn (Tấn Hiệp 12, Hòa 8, Phúc 6 + 1 untested suggestion) thành 22 dòng (bỏ trùng `No tests were found`, `npm.ps1`, SQLite binding, Timeout), Failure Modes gộp từ 15 mục (mỗi tác giả 5) thành 8. Phiên bản Node dung hòa bằng `engines` của workshop (`node >=24 <25`) và các run Windows Node 24.x của cả ba domain. "Việc tác giả cần sửa" lấy từ `Guide_Reproduction_Tan_Hiep.md` và `Guide_Reproduction_Thai_Hoa.md` |
| Verification | Script so khớp: 31/31 code block của ba nguồn có nguyên văn trong bản ghép; mọi số liệu ngoài code block của Hòa và Phúc có mặt, của Tấn Hiệp chỉ thiếu số thứ tự heading; mọi link tương đối phân giải được. Chưa kiểm: chất lượng bản dịch (cần người đọc), link URL ngoài. Còn mở: 2 điểm "Cần quyết định" (base repo khác nhau giữa Cart và Coupons/Auth; tên tỷ lệ Killed/valid); Advanced Usage của Auth bị chặn (D02-01) chưa sửa. Lỗi AI khi viết: thêm một câu "Cách tránh" không có trong nguồn ở Failure Mode 6, đã tự phát hiện và bỏ trước khi commit |
| Student Fix | (điền sau review) |

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 16 | 100% |
| VALID: accepted as-is | 10 | 62.50% |
| INVALID: rejected | 0 | 0% |
| INCOMPLETE: usable after edits | 6 | 37.50% |

VALID: AI-S3-A01-01, AI-S3-C01-01, AI-S3-C01-02, AI-S3-C01-03, AI-S3-D01-02, AI-S3-D01-03, AI-S3-G01-01, AI-S3-WF-03, AI-S3-I01-02, AI-S3-E01-01. INCOMPLETE: AI-S3-B01-01, AI-S3-WF-01, AI-S3-D01-01, AI-S3-D01-04, AI-S3-WF-02, AI-S3-I01-01. Không còn Pending (chốt 2026-10-23).

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** [Tự viết sau khi có verdict]

## 4. Disclosure Inputs

- All tools used: Claude (claude.ai), model Claude Sonnet 4.6 (2 lượt đầu ngày 2026-10-16) và Claude Opus 5.5; Claude Code (model Claude Opus 5.5)
- AI categories used: Cat.5 integrated — Seminar Track thuộc AI Use Category 5 theo Seminar Guide §7; Tấn Hiệp xác nhận
- Stages/use types: S3 — drafting, data analysis, coding (research notes, demo assertions, baseline test suite)
- 2–3 most impactful prompts: AI-S3-C01-01 (assertion cho surviving mutant), AI-S3-A01-01 (research notes S3); prompt nguyên văn ở mục 2
- Full prompt log: `ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md` (claude.ai, trích tự động từ transcript); `ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md` (Claude Code, hook Stop); `ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-23_5aa8b0cf.md` (claude.ai, S3-I01 và member self-run); `ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md` (Claude Code từ cuối S3, gồm các lượt S3-I01). Chat riêng của AI-S3-C01-01 không có transcript; prompt/output nguyên văn ghi trực tiếp trong artifact
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

- Missing artifacts / pending verification: course slide/ISTQB source cho Reasoning & Source theo AI-02
- Member confirmation of accuracy: Pending
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: Pending — bàn giao ở S8

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
