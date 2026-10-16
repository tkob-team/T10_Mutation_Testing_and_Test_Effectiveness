# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Lê Tấn Hiệp  
**Assignment:** T10 Seminar  
**Class / Cohort:** [Tự điền]  
**AI Use:** Yes  
**Evidence Status:** Partial — S3-A01, S3-B01 đã có verdict; còn thiếu transcript export và member run F-A01-04

Copy file này thành `ai-audit/AI_Record_<Member>.md` khi bắt đầu ghi usage. Mỗi người dùng một file xuyên suốt S1–S8. Điền ngay khi làm; mỗi artifact có Stage và Task ID để không lẫn các giai đoạn. Mục reflection do chính thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký điền trực tiếp vào bản nộp bởi thành viên; không đưa vào prompt AI.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-A01 | drafting / data analysis | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01…05, Source Register SRC-01…07, SRC-10 | Tra cứu docs/papers, soạn notes, chạy ví dụ Stryker trong sandbox AI | Review nội dung, chấp nhận nguyên trạng; tự chạy lại F-A01-04 ở S3-C01 (Pending) | AI-S3-A01-01 |
| Claude (claude.ai, model Claude Opus 5.5) | s3 | S3-B01 | drafting | `research/s3/Research_Notes_Tan_Hiep.md` — F-B01-01…04, SRC-08, SRC-09, SRC-11…13 | Tra cứu docs, đọc source EShop, soạn sơ đồ kiến trúc, prompt skeleton, verification gates | Review nội dung, chấp nhận nguyên trạng | AI-S3-B01-01 |

## 2. Artifact Audit

### Artifact AI-S3-A01-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A01 |
| Tool / Model | Claude (claude.ai), Claude Opus 5.5 |
| Recorded Time & Provenance | 2026-10-16, khoảng 18:57–19:20 (UTC+7), theo timestamp tin nhắn trong conversation claude.ai |
| Output Artifact / Section | `research/s3/Research_Notes_Tan_Hiep.md` — F-A01-01 → F-A01-05 |
| Verdict | VALID — accepted as-is (Tấn Hiệp review 2026-10-16) |
| Reasoning & Source | Claims dẫn SRC-01…07, SRC-10 trong notes. [Bổ sung course slide/ISTQB section theo AI-02 khi review] |
| Verification | AI tự chạy F-A01-04 trong sandbox: Node v22.22.0, StrykerJS 10.0.0 → weak 20.00% (3/15), strong 93.33% (14/15). **Member run: Not run** (làm ở S3-C01) |
| Student Fix | Accepted as-is; không có thay đổi so với bản AI (commit `159984b`) |

#### Verbatim Prompt

```text
Giờ cứ bắt đầu hỗ trợ giúp tôi thực hiện từ S3, theo thứ tự nhé. Nếu kiểu như gặp mắc kẹt (do phải chờ task người khác), cứ nói với tôi nhé. Giờ bắt đầu với S3 nhé. Theo thứ tự để có gì sau tôi còn viết docs để hiểu, rồi còn thuyết trình trên lớp nữa. Có thể dạy tôi thêm kiến thức lý thuyết để hiểu thêm nếu cần
```

#### Verbatim AI Output

```text
Output dài: bản nháp đầu tiên là file Research_Notes_Tan_Hiep.md gửi trong conversation
claude.ai ngày 2026-10-16 (cấu trúc tự do, chưa theo template nhóm), sau đó được
chuyển sang template nhóm ở AI-S3-B01-01. Lưu transcript/export conversation vào
ai-audit/evidence/s3/Tan_Hiep/ khi review: [Pending — Tấn Hiệp export]
```

#### Corrected Artifact & Highlighted Changes

```diff
Accepted as-is: không có diff so với bản AI tại commit 159984b.
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
| Student Fix | Accepted as-is; không có thay đổi so với bản AI (commit `159984b`) |

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
Accepted as-is: không có diff so với bản AI tại commit 159984b.
```

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 2 | 100% |
| VALID: accepted as-is | 2 | 100% |
| INVALID: rejected | 0 | 0% |
| INCOMPLETE: usable after edits | 0 | 0% |

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** [Tự viết sau khi có verdict]

## 4. Disclosure Inputs

- All tools used: Claude (claude.ai) — [bổ sung nếu dùng thêm]
- AI categories used: [Tự xác nhận]
- Stages/use types: S3 — drafting, data analysis
- 2–3 most impactful prompts: [Chọn sau]
- Full prompt log: [Link export conversation — Pending]
- Specific AI-assisted parts: `research/s3/Research_Notes_Tan_Hiep.md` (toàn bộ bản nháp)
- Entirely self-authored parts: [ ]
- Review/revision/verification methods: [ ]
- IEEE citation inputs: Anthropic, Claude (Claude Opus 5.5), claude.ai, accessed 2026-10-16
- Disclosure text inputs: [ ]

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

- Missing artifacts / pending verification: member run F-A01-04 (S3-C01); transcript export; course slide/ISTQB source cho Reasoning & Source theo AI-02
- Member confirmation of accuracy: Pending
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: [Links cho dữ liệu cá nhân; không điền thay người khác]

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
