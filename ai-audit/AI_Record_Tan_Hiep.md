# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Lê Tấn Hiệp  
**Assignment:** T10 Seminar  
**Class / Cohort:** Software Testing - CQ2023/3, Nhóm 12  
**AI Use:** Yes  
**Evidence Status:** Partial — AI-S3-A01-01, AI-S3-B01-01, AI-S3-C01-01 đã có verdict; còn thiếu transcript export

Copy file này thành `ai-audit/AI_Record_<Member>.md` khi bắt đầu ghi usage. Mỗi người dùng một file xuyên suốt S1–S8. Điền ngay khi làm; mỗi artifact có Stage và Task ID để không lẫn các giai đoạn. Mục reflection do chính thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký điền trực tiếp vào bản nộp bởi thành viên; không đưa vào prompt AI.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-A01 | drafting / data analysis | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01…05, Source Register SRC-01…07, SRC-10 | Tra cứu docs/papers, soạn notes, chạy ví dụ Stryker trong sandbox AI | Review nội dung, chấp nhận nguyên trạng; tự chạy lại F-A01-04 ở S3-C01 (C01-2, C01-4): kết quả khớp | AI-S3-A01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-B01 | drafting | `research/s3/Research_Notes_Tan_Hiep.md` — F-B01-01…04, SRC-08, SRC-09, SRC-11…13 | Tra cứu docs, đọc source EShop, soạn sơ đồ kiến trúc, prompt skeleton, verification gates | Review nội dung, chấp nhận nguyên trạng | AI-S3-B01-01 |
| Claude (claude.ai, chat mới ngoài Project, model Claude Opus 5.5) | s3 | S3-C01 | coding | `mt-demo/test/cart.ai.test.js` → lưu tại `experiments/s3/runs/Tan_Hiep/C01-ai/` | Phân tích input phân biệt mutant, đề xuất 3 test Jest | Viết input prompt (requirement, code, test, mutant), review theo requirement, chạy G2/G3, phát hiện lý do sai ở test tùy chọn | AI-S3-C01-01 |

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
| Verdict | VALID — accepted as-is (Tấn Hiệp review 2026-10-16) |
| Reasoning & Source | SRC-07…13; F-B01-04 là source inspection EShop @ `85af3ba` |
| Verification | Source inspection (đọc file), không chạy. Prompt skeleton F-B01-02: **Not run** (dùng thật ở S3-G01) |
| Student Fix | Accepted as-is; không có thay đổi so với bản AI (bản AI gửi trong conversation 2026-10-16) |

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
Accepted as-is: không có diff so với bản AI gửi trong conversation 2026-10-16.
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

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 3 | 100% |
| VALID: accepted as-is | 3 | 100% |
| INVALID: rejected | 0 | 0% |
| INCOMPLETE: usable after edits | 0 | 0% |

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** [Tự viết sau khi có verdict]

## 4. Disclosure Inputs

- All tools used: Claude (claude.ai), model Claude Opus 5.5
- AI categories used: Cat.5 integrated — Seminar Track thuộc AI Use Category 5 theo Seminar Guide §7; Tấn Hiệp xác nhận
- Stages/use types: S3 — drafting, data analysis, coding
- 2–3 most impactful prompts: AI-S3-C01-01 (assertion cho surviving mutant), AI-S3-A01-01 (research notes S3); prompt nguyên văn ở mục 2
- Full prompt log: Pending — export conversation chính và chat của AI-S3-C01-01 vào `ai-audit/evidence/s3/Tan_Hiep/`
- Specific AI-assisted parts: `research/s3/Research_Notes_Tan_Hiep.md` (toàn bộ bản nháp); `mt-demo/test/cart.ai.test.js` (3 tests, lưu tại `experiments/s3/runs/Tan_Hiep/C01-ai/`)
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
