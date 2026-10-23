# Claude Assertion Protocol (task G)

Mục tiêu: so sánh công bằng giữa assertions của Claude và manual assertions trên **cùng mutants, cùng baseline**, có raw output và kết quả kiểm chứng (CONTEXT Experiment Contract #4).

## Why a separate context

Phiên đang chạy skill này thường đã thấy manual assertions của task F. Nếu Claude sinh candidate trong cùng phiên, kết quả "AI" thực ra bị dẫn dắt bởi lời giải của người. Vì vậy candidate phải sinh ở **context mới** chỉ chứa input đã chuẩn bị. Hỏi người dùng chọn một kênh và ghi lại kênh đó trong AI Record:

1. **`claude -p --bare`** (tái lập tốt nhất; cần `ANTHROPIC_API_KEY`, không dùng subscription login):
   ```bash
   claude --bare -p "$(cat prompt.txt)" --output-format json > raw.json
   ```
   Lưu nguyên `raw.json`. Có thể thêm `--json-schema` để ép cấu trúc; kết quả nằm ở `.structured_output`.
2. **Chat Claude mới** (claude.ai hoặc session Claude Code mới, không có Project/memory chứa lời giải): người dùng dán prompt và chép nguyên văn output về.

Không spawn subagent nếu người dùng chưa cho phép (AGENTS.md).

## Input package

Chuẩn bị file `prompt.txt` (lưu vào evidence) gồm:
- đoạn code quanh mutant (file:line, commit);
- đoạn spec liên quan, hoặc ghi rõ "spec silent";
- mutant diff, mutator và state;
- test hiện có (baseline, **không** gồm manual assertions của F);
- harness/fixture API mà test được phép dùng;
- phạm vi xét (black-box API hay được inject state/clock).

## Prompt template — assertion candidates

```text
<role>You propose Jest assertions that kill specific StrykerJS mutants. A human will review and run them.</role>
<context>
  <code file="{{FILE}}" commit="{{COMMIT}}" lines="{{RANGE}}">{{SOURCE_EXCERPT}}</code>
  <spec>{{SPEC_EXCERPT_OR_"spec silent"}}</spec>
  <harness>{{HOW_TESTS_CALL_THE_APP_AND_SET_FIXTURES}}</harness>
  <scope>{{STATE_AND_INPUT_SCOPE}}</scope>
  <existing_tests>{{BASELINE_TESTS}}</existing_tests>
</context>
<mutants>
  <mutant id="{{ID}}">{{ORIGINAL}} -> {{REPLACEMENT}} ({{MUTATOR}}, {{STATUS}})</mutant>
</mutants>
<task>
For each mutant:
1. Quote the exact code lines that decide the behavior.
2. Give the input/state that makes original and mutant behave differently, or say why none exists in this scope.
3. State the expected result from the spec; if the spec is silent, say "spec silent" and do not invent one.
4. Write one runnable Jest test using only the harness above.
If context is insufficient, answer "insufficient context" for that mutant.
</task>
```

Template phân loại survivor (khi không cần sinh test): xem `research/s3/Research_Notes_Phuc_Hoang.md` F-B03-02.

## Verification gates

1. Lưu raw output **trước khi sửa**. Bản đã sửa lưu riêng và ghi diff trong log / AI Record.
2. Review: expected có khớp spec không, hay đang mã hóa behavior hiện tại? Test có dùng API ngoài harness không?
3. Chạy test trên code gốc: phải pass. Nếu fail, ghi lại; không sửa expected để cho pass nếu spec nói khác.
4. Chạy Stryker cùng config: mutant đích phải `Killed`. Nếu là `Timeout`, không tính là assertion kill.
5. Ghi vào bảng AI Runs: Artifact ID, raw/edited, spec review, kết quả trên gốc, kết quả trên mutant, run evidence.
6. Verdict của Claude về "equivalent" chỉ là candidate; người review quyết định, kèm lập luận phạm vi.
