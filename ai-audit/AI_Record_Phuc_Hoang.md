# Individual AI Record

**Document Role:** Phiếu cá nhân để leader tổng hợp; không thay AI-02/03/04 chính thức.  
**Member:** Nguyễn Phúc Hoàng  
**Assignment:** T10 Seminar  
**Class / Cohort:** Pending member input  
**AI Use:** Yes — Claude Code hỗ trợ research, sandbox runs và drafting S3  
**Evidence Status:** AI usage recorded với transcript chat nguyên văn; member review/verdict/reflection Pending

Phiếu này ghi usage của Phúc Hoàng xuyên suốt S1–S8. Mỗi artifact có Stage và Task ID; reflection do thành viên viết từ trải nghiệm thật. Student ID, ngày nộp và chữ ký do thành viên điền trực tiếp vào bản nộp, không đưa vào prompt AI.

## 1. Tools, Stages & Contributions

| Tool / Model | Stage | Task ID | Use Type | Artifact / Section | AI Contribution | My Own Work | Evidence |
|---|---|---|---|---|---|---|---|
| Claude Code 2.1.292 (CLI), model Claude Opus 5.5 (`claude-opus-5-5`) | S3 | S3-A03, S3-B03 | brainstorming / data analysis / coding / drafting | [Research Notes](../research/s3/Research_Notes_Phuc_Hoang.md); [run evidence](../experiments/s3/runs/Phuc_Hoang/) | Lập plan; đọc repo/SUT; tra và đối chiếu nguồn; viết sandbox code/tests/harness; chạy Stryker; phân tích mutants; viết draft notes và phiếu này | Giao task và đầu vào; quyết định gộp B03, chạy sandbox, dùng SUT local, yêu cầu ghi audit nguyên văn. Review/sửa nội dung: Pending | PH-S3-A03B03-01 |

## 2. Artifact Audit

### Artifact PH-S3-A03B03-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A03, S3-B03 |
| Tool / Model | Claude Code 2.1.292; Claude Opus 5.5 (`claude-opus-5-5`); chạy trong terminal trên máy của thành viên |
| Recorded Time & Provenance | 2026-10-19 (ngày của session). Stryker console logs ghi các run trong khoảng 13:33–13:40 giờ máy local. Giờ của từng lượt chat: unknown |
| Output Artifact / Section | `research/s3/Research_Notes_Phuc_Hoang.md` (toàn bộ); `experiments/s3/runs/Phuc_Hoang/A03-*`; file này; [transcript](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md) |
| Verdict | Pending member review. Chưa gán VALID/INVALID/INCOMPLETE |
| Reasoning & Source | Source Register của notes (P01–P15, L01–L03): Jia & Harman 2011, TCE ICSE 2015, Google 2018/2021, Stryker docs, Claude Code/Anthropic docs, ISSTA'24 LLM-EMD, Meta ACH, MuTAP; SUT `bd31bbf`. AI-02 yêu cầu course slide/ISTQB section: Pending. Thành viên cần bổ sung nếu đưa vào audit chính thức |
| Verification | Do AI thực hiện trong session; **chưa phải xác nhận của thành viên**: (1) đọc lại nguồn bằng fetch/PDF text; (2) chạy Jest (tests pass) và 7 run Stryker 10.0.0, lưu HTML/JSON/console/config; (3) kiểm `git status` của SUT: không có thay đổi mới ngoài `frontend-mobile/App.js` vốn đã modified trước session; (4) kiểm relative links trong notes và phiếu này. P03, P07–P09 chỉ đọc abstract; `claude -p` Not run |
| Student Fix | Pending. Bản AI gốc bất biến: [PH-S3-A03B03-01_Research_Notes_AI_Draft.md](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Research_Notes_AI_Draft.md) (sha1 `e59cb55a…`). Diff với bản sau review sẽ là evidence cho mục này |

#### Verbatim Prompt

Hai lượt prompt của thành viên, nguyên văn (kể cả phần task note được dán): xem [transcript §Turn 1 và §Turn 2](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md). Prompt chính:

```text
hiện tôi đang thực hiện task S3-A03 với nội dung như sau:
- Task: Research theory: Equivalent Mutants, Limits & AI Approaches
- Required Output: research/s3/Research_Notes_Phuc_Hoang.md
- Notes: 
"Làm: Giải thích equivalent mutants, giới hạn và hướng dùng AI; thêm ví dụ nhỏ. S3 giao notes; S4-B mới chuyển thành report.
Đầu vào: T10 §2/§5; Jia & Harman; Stryker Getting Started; State of Mutation Testing at Google.
Xong khi: Notes trả lời chủ đề được giao, có ví dụ/sources và dùng được cho report.
Mẫu: research/s3/Research_Notes_TEMPLATE.md; tạo file khi bắt đầu, giữ nguyên TEMPLATE."

Hãy đọc repo và lên plan thực hiện những công việc cần làm để hoàn thành được task này
```

```text
1. S3-B03 làm 
"Làm: Khảo sát scripts/prompts tái sử dụng, advanced usage và failure modes của cả hai tool.
Đầu vào: Official docs của StrykerJS và Claude; scope S2.
Xong khi: Phần được giao nói về cả hai tool, có sources và giới hạn đã kiểm tra.
Mẫu: research/s3/Research_Notes_TEMPLATE.md; tạo file khi bắt đầu, giữ nguyên TEMPLATE."
 và hãy gộp vào file này luôn
2. Chạy sandbox cho tôi
3. Chạy trong SUT đã ở đường dẫn: /Users/nphoang/Developer/hcmus/software-testing/eshop-sut-fithcmus
4. Hãy tạo cho tôi ai-audit bắt đầu từ đoạn chat này luôn (đảm bao ghi nguyên cả input lẫn outout)
```

#### Verbatim AI Output

Toàn bộ chat output nguyên văn (plan, các cập nhật tiến độ, câu trả lời cuối) nằm trong [transcript](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md). File output nguyên văn:
- Notes: [AI draft snapshot](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Research_Notes_AI_Draft.md).
- Code/tests/config sandbox và reports: [`experiments/s3/runs/Phuc_Hoang/`](../experiments/s3/runs/Phuc_Hoang/).

Nội dung chi tiết của từng tool call (lệnh shell, kết quả fetch) không chép lại toàn bộ; transcript có bảng log các bước chính kèm kết quả.

#### Corrected Artifact & Highlighted Changes

```diff
Pending: thành viên review notes rồi diff với AI draft snapshot.
Chưa có sửa đổi của thành viên tại thời điểm tạo phiếu.
```

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

- All tools used: Claude Code 2.1.292 với Claude Opus 5.5 (record này). Usage trước đó: Pending member input.
- AI categories used: [Cat.1 No AI / Cat.2 preparation / Cat.3 feedback & revision / Cat.4 assisted production / Cat.5 integrated; tự xác nhận]
- Stages/use types: S3: research, data analysis (mutation reports), coding (sandbox tests/harness), drafting.
- 2–3 most impactful prompts: PH-S3-A03B03-01, Turn 1 và Turn 2 (nguyên văn ở trên).
- Full prompt log: [transcript](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md).
- Specific AI-assisted parts: toàn bộ `research/s3/Research_Notes_Phuc_Hoang.md`; `experiments/s3/runs/Phuc_Hoang/A03-*` (code, tests, harness, configs, reports).
- Entirely self-authored parts: [ ]
- Review/revision/verification methods: [ ]
- IEEE citation inputs: Anthropic, "Claude Code," v2.1.292, model Claude Opus 5.5 (claude-opus-5-5), CLI, used 2026-10-19. Thành viên kiểm lại định dạng IEEE.
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

- Missing artifacts / pending verification: member review và verdict cho PH-S3-A03B03-01; đọc full text P03, P07–P09; nguồn course slide/ISTQB cho AI-02.
- Member confirmation of accuracy: Pending
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: [Links cho dữ liệu cá nhân; không điền thay người khác]

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
