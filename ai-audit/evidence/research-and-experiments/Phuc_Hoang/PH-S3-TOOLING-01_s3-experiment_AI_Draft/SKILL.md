---
name: s3-experiment
description: Thực hiện các task thực nghiệm S3 của seminar T10 (S3-C0x Setup, D0x tests/harness, E0x baseline mutation, F0x survivors + manual assertions, G0x Claude assertions, H0x comparison/limits, I0x cross reproduction) trên EShop SUT với StrykerJS + Claude, ghi Experiment Log, run evidence và AI Record đúng experiment contract. Dùng skill này bất cứ khi nào người dùng nhắc tới một Task ID S3-C..I, "experiment log", "baseline mutation", "surviving mutants", "manual assertions", "AI assertions", "chạy Stryker trên EShop", hay muốn làm tiếp task S3 của domain mình, kể cả khi không nêu tên skill.
argument-hint: "[task-id, ví dụ S3-C03]"
---

# S3 Experiment Task

Skill này đưa một task thực nghiệm S3 từ đầu vào tới bàn giao: chạy thật, lưu evidence, ghi log và AI record theo `CONTEXT.md`. Giá trị của task nằm ở **evidence kiểm chứng được**. Một con số không có run, command và report đi kèm thì không dùng được cho report S4. Vì vậy, khi phải chọn giữa "trông hoàn chỉnh" và "trung thực", hãy chọn trung thực: ghi `Pending` / `Not run` kèm blocker.

Task được giao: `$ARGUMENTS`. Nếu trống, hỏi Task ID.

## 1. Collect inputs

1. Đọc `AGENTS.md`, `CONTEXT.md` (đặc biệt **Experiment Contract** và **Glossary**), `docs/Working_Guide.md`, dòng Task ID trong `docs/Task_Output_Map.md`.
2. Lấy **task note từ tracker** (Làm / Đầu vào / Xong khi). Note này là định nghĩa có thẩm quyền của task. Nếu người dùng chưa dán, hỏi. Bảng ở `references/task-playbooks.md` chỉ là mapping mặc định theo section của log template; khi lệch với tracker thì theo tracker.
3. Xác định member và domain: hậu tố số của Task ID (01 Tấn Hiệp — Cart & Orders, 02 Thái Hòa — Coupons, 03 Phúc Hoàng — Auth & Users), đối chiếu CONTEXT. File log: `experiments/s3/Experiment_Log_<Member>.md`. Chưa có thì copy từ `Experiment_Log_TEMPLATE.md`, giữ nguyên template.
4. Đọc phần đã có của member: log, `research/s3/Research_Notes_<Member>.md` (Handoff, Open questions), `ai-audit/AI_Record_<Member>.md`, các run trong `experiments/s3/runs/<Member>/`.
5. SUT: hỏi path local của repo EShop nếu chưa biết. Chạy `git -C <SUT> rev-parse HEAD` và `status --short`, ghi lại. Nếu có `experiments/s3/Baseline_Manifest.md` (S3-D04) thì commit, config và tests đã đóng băng ở đó là baseline. Mọi run so sánh phải dùng đúng các thông tin này.

## 2. Check blockers before running

Kiểm tra task có phụ thuộc chưa xong không. Ví dụ: E/F/G/H cần baseline của D04; D cần chốt expected khi spec im lặng; G cần chốt kênh gọi Claude. Nếu bị chặn:
- vẫn làm phần không phụ thuộc (ví dụ: chuẩn bị test cases từ spec, dry run);
- ghi blocker, owner và câu hỏi vào log với trạng thái `Pending`;
- báo người dùng. Không tự quyết thay nhóm những điều CONTEXT coi là quyết định chung (scope, seams production code, expected khi spec không nêu).

## 3. Do the work

Đọc playbook của task trong `references/task-playbooks.md` rồi làm theo. Các nguyên tắc chung:

- **Expected result lấy từ spec**, không lấy từ behavior hiện tại của code. Khi spec không nêu, ghi "spec silent" cùng behavior quan sát được, và đánh dấu cần xác nhận. Nếu viết test theo code, bug sẽ bị đóng băng thành "expected".
- **SUT repo:** tests, config và fixtures đặt trong `SUT/backend`, làm trên branch riêng. Production code chỉ đổi khi baseline/D04 cho phép; mọi thay đổi ghi diff và lý do. Không commit hoặc push SUT nếu người dùng chưa yêu cầu.
- **Thử nghiệm phụ** (sandbox, spike) chạy trên bản copy (`git archive <commit> backend`) trong scratchpad, để repo SUT sạch.
- **Mỗi run** lưu bằng `scripts/save_run.sh` vào `experiments/s3/runs/<Member>/<Run_ID>/`. Run ID dạng `<TaskSuffix>-<label>`, ví dụ `E03-baseline`, `F03-manual`. Ghi command, SUT commit, config và test set vào bảng tương ứng của log.
- **Đọc kết quả** bằng `node scripts/summarize_mutants.js <mutation.json>`. Báo `Killed` và `Timeout` riêng; kèm tỷ lệ assertion kill (`Killed / valid`) bên cạnh Stryker score. Để so hai run, dùng `node scripts/compare_runs.js <a.json> <b.json>`; script so theo từng mutant, nên phát hiện được trường hợp tổng giống nhau nhưng trạng thái từng mutant đã đổi.
- **Equivalent:** chỉ ghi "equivalent" khi có lập luận và phạm vi (input/state/clock). Nếu chưa đủ, ghi `equivalent candidate`. Không loại khỏi mẫu số dựa trên verdict AI. Không dùng `// Stryker disable` để làm đẹp score: nó ignore mọi mutant cùng mutator trên dòng, kể cả mutant kill được.
- **Kill phải được chứng minh hai chiều:** test pass trên code gốc **và** làm mutant đó `Killed` (không phải `Timeout`) trong report.

## 4. Record AI usage as you go

Phiên làm việc này dùng Claude, nên đó là AI usage. Thêm artifact vào `ai-audit/AI_Record_<Member>.md` (tạo từ template nếu chưa có), ID dạng `<initials>-S3-<task>-NN`:
- Prompt và output **nguyên văn** của người dùng / Claude trong phiên. Transcript dài đặt ở `ai-audit/evidence/s3/<Member>/<ArtifactID>_Transcript.md`. Ghi nguyên văn text chat; tool calls tóm tắt thành bảng log và trỏ tới file kết quả.
- Snapshot bất biến của file do AI viết (`<ArtifactID>_<name>_AI_Draft.<ext>`), để sau này diff với bản thành viên sửa.
- Verdict, Student Fix, reflection, AI category, chữ ký: để `Pending` cho thành viên. Không điền thay.
- Không đưa student ID, private key hay course secret vào prompt hoặc record.

Với task G (Claude đề xuất assertion), đọc `references/claude-assertion-protocol.md` trước. Candidate phải được sinh trong một context **không chứa manual assertions** của task F, nếu không thì phép so sánh manual và AI bị nhiễm.

## 5. Validate and hand off

1. Kiểm relative links trong các file đã sửa và `git status` của cả hai repo; xác nhận template không bị đổi.
2. Cập nhật header của log (Task IDs + trạng thái từng task, Evidence Status) và các bảng liên quan.
3. Báo người dùng ngắn gọn: artifacts, validation đã chạy, kết quả chính (Killed và Timeout tách riêng), phần còn `Pending` / blocker, và đề xuất cập nhật pointer trong `CONTEXT.md` mục Workflow nếu task tạo evidence mới.
4. Chỉ commit khi người dùng yêu cầu. Message theo convention repo: `docs(S3-E03): <summary>` cho repo seminar, `test(S3-D03): <summary>` cho SUT.

## Bundled resources

| File | Dùng khi |
|---|---|
| `references/task-playbooks.md` | Bước làm và "done" mặc định cho từng nhóm task C–I |
| `references/claude-assertion-protocol.md` | Task G, hoặc bất kỳ lúc nào cho Claude đề xuất/phân loại mutant |
| `scripts/save_run.sh` | Sau mỗi lần chạy Stryker/Jest cần giữ evidence |
| `scripts/summarize_mutants.js` | Đọc `mutation.json`: tổng theo state, score, assertion-kill, danh sách survivor |
| `scripts/compare_runs.js` | So hai run theo từng mutant (baseline vs manual vs AI) |
