# Project Context

## Purpose

Nhóm 12, môn Software Testing, FIT@HCMUS chuẩn bị seminar T10: Mutation Testing & Test Effectiveness. Nhóm nghiên cứu trên EShop backend, so sánh assertion thủ công với assertion do Claude đề xuất, rồi xây dựng guide, report, demo và activity để người khác thực hành lại.

Context này là quyết định và quy ước chung của nhóm. Progress, assignee và dependencies đọc trong `../TASKS.md` khi dùng workspace chung; bản này được trích từ workbook, có ghi rõ nguồn và ngày cập nhật. Yêu cầu chi tiết lấy từ [Requirements](docs/requirements/Seminar_Requirements_Consolidated.md).

## Sources & Authority

| Source | Role |
|---|---|
| `docs/requirements/01_Seminar_Guide.md` | Nguồn giảng viên: flow, deliverables, rubric và AI policy |
| `docs/requirements/02_SoftwareTesting-SeminarRequirements.md` | Nguồn giảng viên: nội dung, teamwork và bộ nộp |
| `docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md` | Nguồn giảng viên riêng T10: objectives, experiments và activity |
| `docs/requirements/Seminar_Requirements_Consolidated.md` | Bản gộp có REQ IDs, nguồn đối chiếu và điểm chưa thống nhất |
| `proposal/s1/`, `research/`, templates và flow | Tài liệu hỗ trợ/đề xuất của nhóm; trạng thái approval cần evidence riêng |
| `ai-audit/originals/` | Ba mẫu AI-02/03/04 giảng viên gửi; giữ nguyên, bổ sung nguồn về inputs/verification/signature |

Không mặc định một nguồn giảng viên đã thay thế nguồn khác. Bản Markdown requirements đã được lược bỏ đoạn về mốc hoàn thiện trung gian theo yêu cầu người dùng ngày 2026-10-18; đây là chỉnh sửa bản làm việc, không phải xác nhận GV đổi yêu cầu. Những giới hạn chỉ có trong tài liệu generated là đề xuất, trừ khi có evidence xác nhận.

## Repositories & Artifacts

| Location | Responsibility |
|---|---|
| [Seminar repo](https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness) | Requirements, proposal, tài liệu seminar và evidence |
| [EShop repo](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness) | SUT source, tests, fixtures và mutation config |

Stage destinations và quy ước bàn giao nằm trong [Working Guide](docs/Working_Guide.md); output/template của từng task nằm trong [Task Output Map](docs/Task_Output_Map.md).

Layout local hiện dùng hai repo cạnh nhau; SUT hiện ở `../eshop-sut/`. Kiểm tra tồn tại trước khi đọc hoặc sửa. Teammate chỉ clone seminar repo có thể clone EShop riêng khi task cần code. Nếu thiếu TASKS/workbook hoặc tài liệu private/local, xin nội dung task hoặc quyền truy cập từ người giao việc; không suy đoán assignee/progress.

## Working Files

Các file local dưới đây nằm ngoài repo và chỉ có khi dùng workspace chung. Nếu chỉ clone repo seminar, dùng Sheet hoặc nội dung task người giao việc cung cấp.

| Resource | Location |
|---|---|
| Team Sheet | [Google Sheet](https://docs.google.com/spreadsheets/d/1XgWdi8CYOSqx33VhL9rBHMAC4WfHXjGu9YSiLv0lyPk/edit) |
| Task Overview | `../TASKS.md` từ repo root; status, assignee, outputs và checklists trích từ workbook |
| Local Workbook | `../documents/T10_Seminar_Workspace.xlsx` từ repo root |
| Execution Flow | `../T10_Seminar_Execution_Flow.md` từ repo root |

TASKS là bản đọc tiến độ trong workspace. Khi cập nhật, ghi rõ thay đổi/evidence và nguồn đang dùng; không mặc định TASKS, workbook và Sheet tự đồng bộ. Giữ nguyên task IDs, progress và phân công khi chuyển định dạng.

## Workflow

**Current Stage — 2026-10-18:** S1 và S2 đã hoàn tất, GV đã xác thực theo xác nhận trực tiếp của người dùng. Đã ghi nguồn trong [Scope & Decisions](docs/s2/Scope_and_Decisions.md); bước tiếp theo là S3. TASKS đã cập nhật theo xác nhận này, workbook/Sheet chưa đồng bộ. Không coi S3 đã chạy khi chưa có run evidence.

| Stage | Outcome |
|---|---|
| Preparation | Requirements, workspace và tasks sẵn sàng phân công |
| S1 — Tool Survey | Survey, rationale và proposal |
| S2 — Scope Review | Góp ý GV và scope có evidence xác nhận |
| S3 — Research & Experiments | Research notes, tests/config, baseline/manual/AI results và evidence |
| S4 — Documentation & Demo | Chuyển notes/kết quả S3 thành guide, report và demo |
| S5 — Readiness | Slides, activity, pilot, rehearsal và bộ tài liệu đầy đủ để review/chia sẻ |
| S6 — Live Seminar | Presentation, demo, activity và Q&A |
| S7 — Feedback | Phản hồi thật và action items |
| S8 — Finalization | Hiệu chỉnh, audit/reflection/peer review và bộ cuối |

Mục tiêu là hoàn thành đầy đủ nội dung, thực nghiệm, tài liệu và bộ nộp có evidence kiểm chứng. Feedback/reflection sau seminar chỉ bổ sung khi sự kiện đã diễn ra; phần chưa có đầu vào giữ Pending.

## Team & Task Ownership

Thành viên: Lê Tấn Hiệp, Tống Dương Thái Hòa và Nguyễn Phúc Hoàng.

**Preparation–S2 do Thái Hòa phụ trách; từ S3 mới chia task cho cả ba.** S1 dùng surveys/proposal chung; S2 giữ một scope/decisions record. Từ S3 cả ba đều có phần research, tests, sử dụng Stryker/Claude và viết nội dung. Chia scope theo domain/section; không cần bằng nhau tuyệt đối về độ khó hoặc số task. Tracker phân công Tấn Hiệp — Cart & Orders, Thái Hòa — Coupons, Phúc Hoàng — Authentication & Users; tham chiếu scope S2 đã được xác nhận hoàn tất.

Task ID có dạng Stage–Group–Sequence, ví dụ `S3-D01`. Mỗi task có một assignee, deliverable và evidence riêng; task hợp nhất có người tổng hợp. Leader review chung. Phân công domain/task cụ thể từ S3 và tiến độ đọc từ tracker; ownership Preparation–S2 là quyết định của nhóm nêu trên.

## Confirmed Decisions

- Hai tool triển khai/demo: **StrykerJS + Claude**. Candidate khác phục vụ khảo sát S1; không mở lại số tool.
- Planning nằm ngoài Git repo seminar. Context/quy tắc dùng chung nằm trong repo để teammate đọc được.
- Nhóm làm theo mục tiêu hoàn thành đầy đủ deliverables; readiness kiểm tra khả năng chạy lại, chất lượng nội dung và evidence, không dùng ngưỡng hoàn thiện trung gian.
- Workbook dùng các tab Preparation, S1–S8, Submission và `_Config`; giữ cấu trúc hiện có, không thêm Reviewer, deadline hoặc estimate nếu chưa được yêu cầu.
- S3 giao research notes; S4 dùng notes và evidence để viết tài liệu. Người tổng hợp vẫn cần kiểm tra phần thực nghiệm chung nếu task giao cả nội dung đó.
- Work-in-progress nằm trong thư mục `sN` của stage tương ứng. Sửa sau feedback ở nguồn stage gốc; `final/` chỉ gom bản đã review.

## Experiment Contract

1. Chốt SUT commit, phạm vi và expected results từ spec; ghi sai khác code gốc/spec trước khi đóng băng baseline.
2. Dựng harness và data/reset để tests tái lập. Kiểm tra package scripts và version tại thời điểm làm; không mặc định runner hoặc lệnh đã hoạt động.
3. Chạy baseline mutation; phân tích ít nhất 3 surviving mutants và bổ sung ít nhất 3 manual assertions theo yêu cầu T10.
4. So sánh manual và Claude assertions trên cùng baseline production code/config và các mutant được chọn. Lưu raw AI output, bản đã sửa và kết quả kiểm chứng.
5. Báo `Killed` và `Timeout` riêng. Mutation score theo định nghĩa/version tool; score tăng chưa đủ chứng minh assertion phát hiện lỗi tốt hơn.
6. Equivalent mutant chỉ được kết luận với lập luận/phạm vi rõ; trước khi đủ căn cứ dùng equivalent candidate. Kết quả AI là đầu vào review.
7. Mỗi run ghi SUT commit, versions/config, command, test set, kết quả và đường dẫn report. Record thời gian chỉ khi đo thật.

Templates có sẵn; tạo phiếu cá nhân khi bắt đầu task. Chúng không xác nhận research/run/report hoàn tất. Khi chuẩn bị cấu trúc này, backend `npm test` còn placeholder báo lỗi. Đây là source inspection, không phải kết quả chạy; kiểm tra lại khi nhận task, không suy ra progress trong Sheet.

## Execution Inputs

S2 đã hoàn tất theo xác nhận người dùng. Các mục dưới đây cần tra lại nội dung quyết định khi task sử dụng; việc chưa chép chi tiết vào repo không có nghĩa approval còn chờ. Record hiện có ở [Scope & Decisions](docs/s2/Scope_and_Decisions.md).

- Scope SUT/module và cách xử lý sai khác code gốc/spec.
- Lịch seminar và các hạn nộp áp dụng.
- Cách áp dụng Record & Playback cho T10.
- Activity 20/25 phút; kênh nộp video.
- AI-04/Final Reflection có cần tách file/cách điền group author info; AI category, slides template và peer partners. Ba AI forms đã có trong originals, không còn là đầu vào chưa tải.

Tra nội dung S2 người dùng cung cấp và Requirements cho chi tiết cần dùng. Khi bổ sung quyết định, giữ nguồn và cập nhật pointers liên quan; không tự dựng chi tiết phản hồi của giảng viên.

## Glossary

| Term | Meaning in This Project |
|---|---|
| SUT | EShop backend được chốt commit/phạm vi cho thực nghiệm |
| Baseline | Production code, cấu hình và bộ tests ban đầu dùng chung để so sánh |
| Surviving mutant | Mutant chưa bị test phát hiện trong run được dẫn |
| Killed | Mutant khiến test phát hiện sai khác; dẫn test/report tương ứng |
| Timeout | Run mutant vượt giới hạn thời gian; báo tách khỏi assertion kills |
| Manual assertion | Assertion do thành viên viết từ spec và phân tích mutant |
| AI assertion candidate | Assertion Claude đề xuất; cần review và thực thi kiểm chứng |
| Equivalent candidate | Mutant có khả năng giữ nguyên hành vi trong phạm vi xét, chưa phải kết luận đã chứng minh |
| Research notes | Notes có nguồn, câu hỏi đã trả lời và điểm chưa xác minh; đầu vào S4 |
| Evidence | Artifact hoặc record có thật hỗ trợ đúng claim đang báo cáo |
