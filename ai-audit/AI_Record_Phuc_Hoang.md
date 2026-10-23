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
| Claude Code, model Claude Sonnet 5.5 (`claude-sonnet-5-5`) | S3 | S3-E03 | coding / data analysis / drafting | [Experiment Log](../experiments/s3/Experiment_Log_Phuc_Hoang.md) (Baseline, E03-baseline); [run evidence](../experiments/s3/runs/Phuc_Hoang/E03-baseline/) | Clone SUT frozen commit, chạy `npm ci`/test/Stryker 2 lần, so khớp từng mutant với provisional và run của Thái Hòa, mapping route, viết log | Giao task và đầu vào (task note S3-E03). Review kết quả: Pending | PH-S3-E03-BASELINE ([transcript](evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md)) |
| Claude Code, model Claude Sonnet 5.5 (`claude-sonnet-5-5`) | S3 | S3-F03 | coding / data analysis | [Experiment Log F03](../experiments/s3/Experiment_Log_Phuc_Hoang.md); [run evidence](../experiments/s3/runs/Phuc_Hoang/F03-manual/) | Phân tích 30 survivor/NoCoverage, viết 13 manual assertions, chạy Stryker và probe | Giao task và đầu vào (task note S3-F03). Review assertions: Pending | PH-S3-F03-MANUAL ([transcript](evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md)) |
| Claude Code CLI (`claude -p`), model Claude Sonnet 5.5 (`claude-sonnet-5-5`) | S3 | S3-C03 | coding (đề xuất assertion) | [Experiment Log C03-3](../experiments/s3/Experiment_Log_Phuc_Hoang.md); [run evidence](../experiments/s3/runs/Phuc_Hoang/C03-claude/) | Đề xuất test `canRegister(18)` cho mutant `age > 18` | Viết spec demo, bỏ comment lộ đáp án, chọn mutant, chạy test và Stryker. Review: Pending | PH-S3-C03-CLAUDE |
| Claude Code 2.1.292 (CLI), model Claude Opus 5.5 (`claude-opus-5-5`) | S3 | tooling cho S3-C03…I03 | coding / drafting | [Skill draft `s3-experiment`](evidence/s3/Phuc_Hoang/PH-S3-TOOLING-01_s3-experiment_AI_Draft/SKILL.md) | Soạn skill hỗ trợ chạy các task experiment S3 (SKILL.md, references, scripts) | Giao yêu cầu và quyết định dùng skill. Review/chỉnh nội dung: Pending | PH-S3-TOOLING-01 |

## 2. Artifact Audit

### Artifact PH-S3-A03B03-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-A03, S3-B03 |
| Tool / Model | Claude Code 2.1.292; Claude Opus 5.5 (`claude-opus-5-5`); chạy trong terminal trên máy của thành viên |
| Recorded Time & Provenance | 2026-10-19 (ngày của session). Stryker console logs ghi các run trong khoảng 13:33–13:40 giờ máy local. Giờ của từng lượt chat: unknown |
| Output Artifact / Section | `research/s3/Research_Notes_Phuc_Hoang.md` (toàn bộ); `experiments/s3/runs/Phuc_Hoang/A03-*`; file này; [transcript](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md) |
| Verdict | **INCOMPLETE (proposed, AI-drafted, chờ member xác nhận)**: notes dùng được sau khi sửa hai lỗi AI (thiếu một mutant Killed → Timeout; ghi sai rằng spec không nêu rule lock). Cùng verdict với bản nháp trong AI-02 |
| Reasoning & Source | Source Register của notes (P01–P15, L01–L03): Jia & Harman 2011, TCE ICSE 2015, Google 2018/2021, Stryker docs, Claude Code/Anthropic docs, ISSTA'24 LLM-EMD, Meta ACH, MuTAP; SUT `bd31bbf`. AI-02 yêu cầu course slide/ISTQB section: Pending. Thành viên cần bổ sung nếu đưa vào audit chính thức |
| Verification | Do AI thực hiện trong session; **chưa phải xác nhận của thành viên**: (1) đọc lại nguồn bằng fetch/PDF text; (2) chạy Jest (tests pass) và 7 run Stryker 10.0.0, lưu HTML/JSON/console/config; (3) kiểm `git status` của SUT: không có thay đổi mới ngoài `frontend-mobile/App.js` vốn đã modified trước session; (4) kiểm relative links trong notes và phiếu này. P03, P07–P09 chỉ đọc abstract; `claude -p` Not run. **2026-10-21, AI tự sửa:** so khớp từng mutant giữa hai `mutation.json` cho thấy FM-S3 ghi thiếu mutant L105:48. Notes đã sửa thành 3 mutant Killed → Timeout; bản AI draft snapshot giữ nguyên. **2026-10-22, AI tự sửa:** trong S3-D03 phát hiện `README.md` FR-02 có rule lock (+1, 3 lần, 30 giây) mà notes ghi "spec không nêu". Đã sửa L3, F-A03-06 #1, Open question 1, Handoff, FM-C2 và thêm nguồn P16; bản AI draft snapshot giữ nguyên |
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

### Artifact PH-S3-TOOLING-01

| Field | Value |
|---|---|
| Stage / Task ID | S3 / tooling cho S3-C03…I03 (ngoài deliverable chính của một task) |
| Tool / Model | Claude Code 2.1.292; Claude Opus 5.5 (`claude-opus-5-5`); terminal trên máy của thành viên |
| Recorded Time & Provenance | 2026-10-21; giờ từng lượt chat: unknown. Transcript do AI chép lại, thành viên đối chiếu với lịch sử phiên (Pending) |
| Output Artifact / Section | [AI draft của skill `s3-experiment`](evidence/s3/Phuc_Hoang/PH-S3-TOOLING-01_s3-experiment_AI_Draft/SKILL.md) (kèm `references/`, `scripts/`); [transcript](evidence/s3/Phuc_Hoang/PH-S3-TOOLING-01_Transcript.md) |
| Verdict | Not audited: skill draft chưa được dùng cho kết quả nào đã nộp và chưa ai review nội dung, nên không gán verdict. Không nằm trong bảng AI-02; được khai ở AI-03 mục 1 |
| Reasoning & Source | Skill dựa trên Experiment Log template, Task Output Map và Working Guide của repo. Nguồn ngoài: Pending member input |
| Verification | Chưa có xác nhận của thành viên. Skill chưa được dùng để tạo deliverable nào đã nộp |
| Student Fix | Pending. Bản AI gốc là snapshot trong thư mục evidence ở trên |

### Artifact PH-S3-E03-BASELINE

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-E03 (kèm cập nhật C03-5, C03-6, D03 trong cùng log) |
| Tool / Model | Claude Code; Claude Sonnet 5.5 (`claude-sonnet-5-5`); terminal trên máy của thành viên. Phiên bản CLI: Pending member input |
| Recorded Time & Provenance | 2026-10-23, Asia/Saigon. Stryker console log ghi hai run 10:09:04–10:10:30 và 10:10:38–10:12:05. Transcript: [PH-S3-E03-BASELINE_Transcript.md](evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md) (trích từ file phiên Claude Code; theo yêu cầu thành viên không che MSSV/email/username) |
| Output Artifact / Section | [Experiment Log](../experiments/s3/Experiment_Log_Phuc_Hoang.md) (Setup C03-5/C03-6, Baseline E03-baseline); [run evidence](../experiments/s3/runs/Phuc_Hoang/E03-baseline/) |
| Verdict | **VALID (proposed, AI-drafted, chờ member xác nhận)**: hai run giống hệt từng mutant, khớp 125/125 với run Windows của Thái Hòa, production hash không đổi; điểm tăng so với provisional được giải thích bằng đổi phân loại, không phải assertion mạnh hơn |
| Reasoning & Source | Task note S3-E03, [Baseline_Manifest](../experiments/s3/Baseline_Manifest.md), SUT `806ba19`, Stryker 10.0.0 |
| Verification | Do AI thực hiện, chưa phải xác nhận của thành viên: chạy `npm ci`, `npm test` (88 pass), `test:auth` (26 pass), dry run, hai run Stryker giống hệt từng mutant (125/125); so khớp từng mutant theo dòng/cột/mutator/replacement với run provisional (4 mutant đổi RuntimeError sang Timeout) và với run Windows của Thái Hòa (0 chênh lệch); SHA-256 `server.js`/`database.js`/`database.sqlite` trước = sau; `cmp` 5 file test D03 với SUT chung |
| Student Fix | Không sửa số liệu. Dùng clone sạch của SUT chung thay cho fork cá nhân có thay đổi chưa commit; giữ run provisional thành record riêng |

### Artifact PH-S3-F03-MANUAL

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-F03 (Authentication & Users: phân tích survivors, manual assertions) |
| Tool / Model | Claude Code, Claude Sonnet 5.5 (`claude-sonnet-5-5`), cùng phiên với PH-S3-E03-BASELINE |
| Recorded Time & Provenance | 2026-10-23, Asia/Saigon; run Stryker 11:13–11:16. Transcript: [PH-S3-E03-BASELINE_Transcript.md](evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md) (turn yêu cầu S3-F03 trở đi) |
| Output Artifact / Section | `backend/test/auth.manual.test.js` (13 test AM-01…AM-13) trong SUT branch cục bộ `s3/F03-auth`, bản lưu ở [`runs/Phuc_Hoang/F03-manual/`](../experiments/s3/runs/Phuc_Hoang/F03-manual/); [Experiment Log](../experiments/s3/Experiment_Log_Phuc_Hoang.md) mục Survivors và Comparison |
| Verdict | **INCOMPLETE (proposed, AI-drafted, chờ member xác nhận)**: 23/30 mutant bị giết và test pass trên code gốc, nhưng 18/23 dựa trên convention (body lỗi, HTTP 500) chứ không phải spec, và 7 mutant còn lại không có case spec-đúng |
| Reasoning & Source | Expected result từ `api_specification.md` §1–2 và README FR-02, FR-03, FR-04, SEC-06, SEC-07 của SUT `806ba19`; phần không có trong spec được ghi là convention ngay trong test. ISTQB: chưa gắn số mục (member bổ sung) |
| Verification | 39/39 pass trên code gốc (3 lần), `npm test` vẫn 88 pass; Stryker 2 lần giống hệt từng mutant; so với E03-baseline: 23 mutant sang Killed, 0 tụt; production hash không đổi; probe trên bản vá `+1`/30 s: 39/39 pass và mutant #52 bị 3 test giết; DF-12 pass trên mutant #133 |
| Student Fix | Pending (member review từng assertion, đặc biệt các test convention AM-05…AM-13) |

### Artifact PH-S3-C03-CLAUDE

| Field | Value |
|---|---|
| Stage / Task ID | S3 / S3-C03 (bước C03-3, Claude assertion workflow) |
| Tool / Model | `claude -p` (Claude Code CLI) ở chế độ không tools; model `claude-sonnet-5-5` theo `modelUsage` trong `raw.json`. Phiên bản CLI: unknown (không có trong output) |
| Recorded Time & Provenance | 2026-10-22 21:33:46 (Asia/Saigon, theo `command.txt`). Một lần chạy thành công; trước đó một probe `--bare` lỗi `Not logged in` ([probe](../experiments/s3/runs/Phuc_Hoang/C03-claude-probe/C03-claude-probe.json), `terminal_reason: api_error`, tách riêng khỏi request thành công) |
| Output Artifact / Section | Test `equiv.ai.test.js` ([run](../experiments/s3/runs/Phuc_Hoang/C03-claude-run/)); mục C03-3 của [Experiment Log](../experiments/s3/Experiment_Log_Phuc_Hoang.md) |
| Verdict | **VALID (proposed, AI-drafted, chờ member xác nhận)**: test chạy được, đúng spec demo, giết mutant mục tiêu |
| Reasoning & Source | Spec demo "đủ 18 tuổi trở lên" (do member viết trong prompt) nên `canRegister(18)` phải `true`; ISTQB CTFL 4.0.1 mục 4.2.2 (boundary value analysis) là tham chiếu thiết kế biên; số mục chưa được member kiểm lại. Ghi chú về "mutant đổi 18 thành 17" không dùng làm evidence vì StrykerJS không có mutator đổi hằng số |
| Verification | Test pass trên code gốc (1/1). Mutant id 15 (`age > 18`) chuyển Survived → Killed, so khớp từng mutant theo vị trí/mutator/replacement giữa hai `mutation.json`. 18 mutants: weak 12 Killed / 6 Survived = 66,67%; weak + test Claude 13 Killed / 5 Survived = 72,22%. Giới hạn: spec do member viết; đã bỏ comment gốc lộ đáp án; chỉ 1 lần chạy, 1 mutant, chưa đo độ lặp lại; "context sạch" chỉ là thư mục trống, không tools, chỉ nạp settings `local` |
| Student Fix | Bỏ comment trong code trước khi đưa vào prompt (comment gốc nói thẳng "differs at exactly 18"); chỉ dùng test bắt buộc ở mục 4 của output, không thêm test tùy chọn `canRegister(17)` vì nó không giết mutant mục tiêu. Test cuối giống nguyên văn test Claude đề xuất |

#### Verbatim Prompt

Nguyên văn (cũng ở [`prompt.txt`](../experiments/s3/runs/Phuc_Hoang/C03-claude/prompt.txt); lệnh ở [`command.txt`](../experiments/s3/runs/Phuc_Hoang/C03-claude/command.txt)):

````text
<role>You propose Jest assertions that kill specific StrykerJS mutants. A human will review and run them.</role>
<context>
  <code file="src/equiv.js" commit="demo file, not under git" lines="1-3">
function canRegister(age) {
  return age >= 18;
}
module.exports = { canRegister };
  </code>
  <spec>Demo requirement: a person may register if and only if their age is 18 or older.</spec>
  <harness>Tests are Jest. Import with: const { canRegister } = require('../src/equiv');</harness>
  <scope>Pure function of one integer argument; no state, no clock.</scope>
  <existing_tests>
const { canRegister } = require('../src/equiv');
test('adult can register', () => {
  expect(canRegister(30)).toBe(true);
});
  </existing_tests>
</context>
<mutants>
  <mutant id="15">return age >= 18; -> return age > 18; (EqualityOperator, Survived)</mutant>
</mutants>
<task>
For each mutant:
1. Quote the exact code lines that decide the behavior.
2. Give the input/state that makes original and mutant behave differently, or say why none exists in this scope.
3. State the expected result from the spec; if the spec is silent, say "spec silent" and do not invent one.
4. Write one runnable Jest test using only the harness above.
If context is insufficient, answer "insufficient context" for that mutant.
</task>
````

#### Verbatim AI Output

Trường `result` của [`raw.json`](../experiments/s3/runs/Phuc_Hoang/C03-claude/raw.json), chưa sửa:

````markdown
## Mutant 15

**1. Deciding code** (`src/equiv.js:2`):
```js
return age >= 18;
```
Mutant: `return age > 18;`

**2. Distinguishing input:** `age = 18`. The original returns `true` (18 >= 18), the mutant returns `false` (18 > 18). Every other integer gives the same result for both, so the boundary is the only killing input. The existing test uses 30, which both versions accept, so the mutant survives.

**3. Expected result from the spec:** "a person may register if and only if their age is 18 or older." Age 18 is "18 or older," so `canRegister(18)` must be `true`.

**4. Jest test:**
```js
const { canRegister } = require('../src/equiv');

test('person aged exactly 18 can register', () => {
  expect(canRegister(18)).toBe(true);
});
```

This passes on the original and fails on the mutant (received `false`).

Optionally, add `expect(canRegister(17)).toBe(false);` as a lower-boundary check. It doesn't kill this mutant, since both versions return `false` for 17, but it guards against the opposite mistake (for example, a mutant changing `18` to `17`).
````

#### Corrected Artifact & Highlighted Changes

```diff
 const { canRegister } = require('../src/equiv');

 test('person aged exactly 18 can register', () => {
   expect(canRegister(18)).toBe(true);
 });
```

Không sửa nội dung test của Claude. Thay đổi của member nằm ở đầu vào (bỏ comment lộ đáp án) và ở việc không dùng gợi ý `canRegister(17)`.

### Artifacts D03 / E03-provisional (phiên 2026-10-22)

Chưa có transcript phiên này trong repo. Bản nháp AI-02/AI-LOG trong `draft/` (do Thái Hòa tạo, 2026-10-23) đã gán các ID và verdict đề xuất cho D03 và E03-provisional, dựa trên log và run evidence; đối chiếu với [Experiment Log](../experiments/s3/Experiment_Log_Phuc_Hoang.md):

| Artifact ID | Nội dung | Verdict đề xuất | Evidence |
|---|---|---|---|
| PH-S3-C03-CLAUDE | Xem artifact đầy đủ ở trên | VALID (đề xuất) | [artifact](#artifact-ph-s3-c03-claude) |
| PH-S3-D03-AUTH | Bộ test Auth: 26 pass + 23 defect fail | VALID | `runs/Phuc_Hoang/D03-auth/`; 5 file giống hệt SUT `806ba19` (`cmp`) |
| PH-S3-E03-PROVISIONAL | Run Stryker provisional trên `bd31bbf`: 125 mutants, 73,45% | VALID | `runs/Phuc_Hoang/E03-provisional/` |

## 3. Accuracy Summary & Audit Conclusion

| Metric | Count | Percentage |
|---|---|---|
| Total audited | 5 (đề xuất, theo AI-02 draft) | 100% |
| VALID: accepted as-is | 4 | 80% |
| INVALID: rejected | 0 | 0% |
| INCOMPLETE: usable after edits | 1 | 20% |

Chỉ đếm artifacts đã có verdict; tổng ba verdict phải bằng Total. Total = 0 thì Percentage ghi n.a.; pending không bị tính là verdict. Leader loại trùng cùng artifact trước khi tổng hợp.

**Conclusion (80–150 words):** Bản nháp nằm ở mục 5 của `draft/[AI-02] … - 23120264.md` (AI-drafted, member sửa lại bằng lời của mình). Ý chính: AI tốt khi spec cho expected result rõ; AI sai ở chỗ bỏ sót rule đã có trong SRS và đếm thiếu trạng thái mutant; điểm mutation không đủ để kết luận assertion tốt hơn; luôn giữ output gốc và so khớp từng mutant.

## 4. Disclosure Inputs

- All tools used: Claude Code 2.1.292 với Claude Opus 5.5 (PH-S3-A03B03-01, PH-S3-TOOLING-01); Claude Code với Claude Sonnet 5.5 (PH-S3-E03-BASELINE). Phiên C03/D03 (2026-10-22) và usage trước đó: Pending member input, chưa có artifact audit.
- AI categories used: bản nháp AI-03/AI-04 đánh Category 5 (và Cat. 2–5 ở AI-04); member tự xác nhận.
- Stages/use types: S3: research, data analysis (mutation reports), coding (sandbox tests/harness, Auth test suite), tooling (skill draft), drafting (log/notes).
- 2–3 most impactful prompts: PH-S3-A03B03-01, Turn 1 và Turn 2 (nguyên văn ở trên).
- Full prompt log: [transcript](evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md).
- Specific AI-assisted parts: toàn bộ `research/s3/Research_Notes_Phuc_Hoang.md`; `experiments/s3/runs/Phuc_Hoang/A03-*` (code, tests, harness, configs, reports).
- Entirely self-authored parts: bản nháp AI-02 mục 6 ghi: yêu cầu task và quyết định gộp A03 với B03 là do member viết. Member xác nhận.
- Review/revision/verification methods: so nguồn, chạy Jest/Stryker, so khớp từng mutant giữa các run (provisional, baseline, run Windows của Thái Hòa), `cmp` file test, hash production. Đây là các bước AI đã thực hiện; phần member tự kiểm: Pending.
- IEEE citation inputs: Anthropic, "Claude Code," v2.1.292, model Claude Opus 5.5 (claude-opus-5-5), CLI, used 2026-10-19. Thành viên kiểm lại định dạng IEEE.
- Disclosure text inputs: xem `draft/[AI-03] … - 23120264.md` (AI-drafted, member xác nhận).

## 5. Reflection Inputs

Write your answers in English from your own experience. Leader uses these inputs for AI-04 and the 300-word final reflection according to S2 scope; this is not a requirement for every member to submit 300 words separately.

Reflection chính thức nằm ở `draft/[AI-04] … - 23120264.md` mục 2 (AI-drafted từ log và run evidence thật; member viết lại bằng trải nghiệm của mình). Gợi ý các sự kiện thật để member dựa vào:

- **Hỗ trợ:** Claude Code viết sandbox/harness/test Auth, chạy Stryker, so khớp mutant; Claude CLI đề xuất assertion `canRegister(18)`.
- **Chấp nhận/sửa/bỏ:** sửa notes (thiếu một mutant Killed → Timeout; rule lock FR-02 bị ghi nhầm là spec không nêu); không dùng giải thích "đổi hằng số 18 thành 17" vì Stryker không có mutator đó; không tính Timeout/RuntimeError là assertion kill.
- **Lỗi/giới hạn của AI:** `claude --bare` lỗi "Not logged in"; 8 mutant `StringLiteral ""` làm `sqlite3` SIGSEGV; score tăng 73,45% → 74,36% chỉ do đổi phân loại 4 mutant.
- **Kiểm chứng:** hai run baseline giống nhau, khớp 125/125 với run Windows, production hash không đổi.
- **Điều học được (member tự viết):** [ ]

## 6. Member Review & Handoff

- Missing artifacts / pending verification: member review và verdict cho PH-S3-A03B03-01, PH-S3-TOOLING-01, PH-S3-E03-BASELINE; artifact PH-S3-C03-CLAUDE đã có (verdict đề xuất, chờ xác nhận); artifact PH-S3-F03-MANUAL đã có (verdict đề xuất, chờ xác nhận); transcript phiên C03/D03 (2026-10-22) và artifact audit D03/E03-provisional đầy đủ chưa có; transcript PH-S3-E03-BASELINE đã xuất (không che, theo yêu cầu thành viên; thành viên đối chiếu với lịch sử phiên); đọc full text P03, P07–P09; nguồn course slide/ISTQB cho AI-02.
- Member confirmation of accuracy: Pending. Verdict và reflection hiện là bản AI soạn để member đọc và sửa
- Official AI-03 disclosure/signature: Pending; mỗi người kiểm tra và tự ký PDF khi leader chuẩn bị bản chính thức.
- Official AI-04 signature when required: Pending; tác giả kiểm tra bản tổng hợp trước khi ký.
- Leader handoff: bộ form cá nhân ở `draft/` (`[AI-02]`, `[AI-03]`, `[AI-04]`, `AI-LOG-…` hậu tố MSSV). Date, Class/Cohort, Instructor và Signature do member điền.

## Sources & Attribution

Adapted as an internal collection worksheet from FIT@HCMUS, AI Policy Templates — 2026 v1.0, adapted from Med Kharbach (2026), CC BY-NC-SA 4.0. This worksheet retains that attribution/license; the originals remain unchanged:

- [AI-02 Audit Report](originals/%5BAI-02%5D%20-%20FIT%40HCMUS%20-%20AI%20Audit%20Report.md)
- [AI-03 Disclosure Form](originals/%5BAI-03%5D%20-%20FIT%40HCMUS%20-%20AI%20Disclosure%20Form.md)
- [AI-04 Reflective Statement](originals/%5BAI-04%5D%20-%20FIT%40HCMUS%20-%20AI%20Reflective%20Statement.md)
