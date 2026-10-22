# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Tống Dương Thái Hòa  
**Assignment:** T10 Seminar  
**Class / Cohort:** Pending member input  
**AI Use:** Yes — Codex-assisted S3 research/drafting  
**Evidence Status:** AI usage recorded; member review/reflection/disclosure Pending

Phiếu này ghi usage của Thái Hòa xuyên suốt S1–S8. Mỗi artifact có Stage và Task ID; reflection do thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký do thành viên điền trực tiếp vào bản nộp.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| OpenAI Codex (exact model variant not logged) | S3 | S3-A02, S3-B02 | research/drafting/verification | Research_Notes_Thai_Hoa.md | Source checks, explanations, inline examples and draft | Pending member input; not attributed as self-authored | TH-S3-RESEARCH-01 |
| OpenAI Codex AI Agent (GPT-6 family; exact serving revision unavailable) | S3 | S3-C02, S3-D02 | assisted production / local verification | Coupons harness/tests/tooling, tutorial and experiment evidence | Spec cases, original-defect suite, seeded memory DB, tool execution, evidence/docs | Member self-run and review Pending | TH-S3-C02D02-01 |
| OpenAI Codex AI Agent (exact serving revision unavailable) | S3 | S3-D04/E02/F02/G02/H02/I02 | integration, experiment, analysis and assisted drafting | Frozen baseline, reports, spec-analysis draft and same-context AI candidate | Merges/import with attribution; tests, mutation runs, per-mutant comparisons and evidence | User chose workflow and same-context fallback; assertions reviewed by Agent only, human review/self-run Pending | TH-S3-D04H02-01 |

## 2. Artifact Audit

### Artifact TH-S3-RESEARCH-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A02, S3-B02 |
| Tool / Model | OpenAI Codex; exact model variant not logged in this record |
| Recorded Time & Provenance | Date 2026-10-18 from client session context; exact time unknown |
| Output Artifact / Section | [Research Notes](../research/s3/Research_Notes_Thai_Hoa.md), S3-A02/B02 |
| Verdict | Pending member review; no VALID/INVALID/INCOMPLETE verdict assigned |
| Reasoning & Source | Stryker official docs/schema, Anthropic official docs, Jia & Harman §1–2.2, Google Research abstract, Node docs and SUT source inspection; Source Register in notes |
| Verification | Codex checked sources, SUT source, example calculations and document links. Research remains pending member review; EShop/Stryker/Claude experiment Not run |
| Student Fix | Pending; no student review, edit, reflection or acceptance invented |

#### Verbatim Prompt

Nội dung yêu cầu nghiên cứu của người dùng, kèm mention plugin mattpocock-skills:

> Giờ làm tasks nghiên cứu trước đi, hãy làm thật rõ ràng chi tiết nhưng dễ hiểu, explain like im 10 vậy

#### Verbatim AI Output

Pending — chưa có bản raw output bất biến trong bộ tài liệu hiện tại. Research Notes là bản làm việc đã chỉnh sửa; không dùng thay cho raw transcript. Phần audit này chưa đủ evidence để kết luận hoàn tất.

#### Corrected Artifact & Highlighted Changes

Current artifact: [Research Notes](../research/s3/Research_Notes_Thai_Hoa.md). Human/student corrections and highlighted changes: Pending. Agent validation does not count as member approval.

### Artifact TH-S3-C02D02-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-C02, S3-D02 |
| Tool / Model | OpenAI Codex AI Agent; GPT-6 family, exact serving revision not exposed |
| Recorded Time & Provenance | 2026-10-22 Asia/Saigon; actual UTC timestamps in commands.json |
| Output Artifact / Section | [Experiment Log](../experiments/s3/Experiment_Log_Thai_Hoa.md), [Contract](../experiments/s3/Coupons_Test_Contract_Thai_Hoa.md), SUT branch codex/s3-coupons-hoa |
| Verdict | Pending member review; no official verdict assigned |
| Reasoning & Source | SUT README FR-09/12/17/SEC-02/03, API §5/6.4; official Jest/Stryker docs; npm 12 local help/source |
| Verification | Agent-run: npm ci pass, 25 baseline tests pass twice, 16 defect tests fail at assertions, dry run pass; tutorial target Survived→Killed; source/DB hashes unchanged |
| Raw / Provenance | [AI Provenance](../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md), [raw toy candidate](../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/ai-candidate.raw.txt); full chat transcript not exported |
| Student Fix | Pending; no member corrections/approval invented |

Personal learning/run walkthrough is outside both team repos by explicit user request. This artifact is AI-assisted D02 and a C02 tutorial, not self-authored F02 or completed G02. Same-session toy candidate generation is not a blinded manual-vs-AI comparison.

### Artifact TH-S3-D04H02-01

| Field | Value |
|---|---|
| Stage / Tasks | S3 / D04, E02, F02, G02, H02; I02 Partial |
| Tool / Model | OpenAI Codex; exact serving revision not exposed. Attempted Claude Code 2.1.301 returned Not logged in, zero successful model output |
| Provenance | User approved review/merge to main and new D04 branch; authorized import from Hoàng handoff without a SUT commit; asked Codex to draft manual analysis for human review; selected same-context Codex G02 after login failure |
| Inputs / sources | SUT SRS/API, original delivered suites, frozen source/config, mutation JSONs; no credentials/student IDs supplied |
| Output | [Manifest](../experiments/s3/Baseline_Manifest.md), [log/comparison](../experiments/s3/Experiment_Log_Thai_Hoa.md), [analysis](../experiments/s3/Coupons_Survivor_Analysis_Thai_Hoa.md), [integration review](../experiments/s3/D04_Integration_Review_2026-10-23.md) |
| Raw / retained output | [Codex G02 raw file and provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md), failed Claude request, run commands/metadata/HTML/JSON. This is file-output evidence, not a fabricated full API/conversation transcript |
| Agent verification | 88 baseline pass, 54 defect assertion failures; original source/DB unchanged; Auth import SHA-256 identical; 120 Coupons signatures match across baseline/F02/G02; two Survived→Killed in each variant; exact G02 raw/executed hashes match |
| Review / edits | Agent accepted G02 file without edits after spec check and original/mutation execution; F02 is Codex-assisted, not human-independent. Auto verdict is not the member's AI audit verdict |
| Limitations | Shared context; only two business targets at one location; original defects remain; Auth manual/AI input absent; performance/model superiority conclusions unsupported |
| Human verdict / fixes | Pending Hòa review. No member approval, reflection, labour time or signature invented |

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 0 | n.a. |
| VALID: accepted as-is | 0 | n.a. |
| INVALID: rejected | 0 | n.a. |
| INCOMPLETE: usable after edits | 0 | n.a. |

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** [Tự viết patterns, điểm tốt/yếu và khuyến nghị từ artifacts của mình. ≥600 từ là yêu cầu AI-02 chung trong Seminar Guide, không tự áp mỗi thành viên một quota mới.]

## 4. Disclosure Inputs

- All tools used: OpenAI Codex in this record; prior usage Pending member input.
- AI categories used: [Cat.1 No AI / Cat.2 preparation / Cat.3 feedback & revision / Cat.4 assisted production / Cat.5 integrated; tự xác nhận]
- Stages/use types: [ ]
- 2–3 most impactful prompts: [Artifact IDs + prompt nguyên văn]
- Full prompt log: nội dung yêu cầu nghiên cứu ở trên; transcript đầy đủ và prior artifacts Pending member input.
- Specific AI-assisted parts: S3-A02/B02 notes và ví dụ trong notes; TH-S3-RESEARCH-01.
- Entirely self-authored parts: [ ]
- Review/revision/verification methods: [ ]
- IEEE citation inputs: [Tool/model/URL/version/date biết được; không dựng nguồn]
- Disclosure text inputs: [Artifact, tool, phần sửa, edge cases thêm, phần hoàn toàn tự viết]

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

- Missing artifacts / pending verification: raw output bất biến, member review và verdict cho TH-S3-RESEARCH-01 còn Pending.
- Member confirmation of accuracy: Pending
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: [Links cho dữ liệu cá nhân; không điền thay người khác]

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
