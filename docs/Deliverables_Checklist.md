# Deliverables Checklist

**Inventory basis:** Repo được rà tại `f419962`, cộng nguồn activity support từ `f6c69f6`; đối chiếu [Requirements](../requirements/Seminar_Requirements_Consolidated.md) và quyết định người dùng ngày 2026-11-06.

**Role:** Checklist nộp và thuyết trình, đồng thời là bản đồ tài liệu đang làm. Không phải tracker assignee/status. Mỗi tài liệu được sửa trực tiếp tại đường dẫn bên dưới; không tạo bản theo stage.

## Status Rules

- Present: có nguồn, chưa mặc định nội dung đúng hoặc đã được review.
- Recovered: khôi phục được nguồn từ Git; không có execution mới.
- Missing: chưa tìm thấy đầu ra riêng trong cây đã rà.
- Pending: cần input hoặc xác nhận thật; Not run là chưa thực thi trong lượt này.
- Các ô acceptance chỉ được đánh dấu khi có evidence của đúng phiên bản. Snapshot, Agent run và human acceptance là ba thông tin khác nhau.

## Submission Outputs

| ID | Output and acceptance | Working source | Inventory / remaining check | REQ |
|---|---|---|---|---|
| D01 | Proposal ngắn, tối đa 1 trang; 3 candidates, 5 tiêu chí, 3 lý do, AI disclosure | [Tool Proposal](Tool_Survey_Proposal.md) | Present; review nội dung và độ dài khi hoàn thiện | 04-06 |
| D02 | Survey chi tiết và seminar scope/proposal có sources | [Tool Survey](Tool_Survey.md), [Seminar Proposal](Seminar_Proposal.md) | Present; PDF exports cũ chưa đồng bộ sau sửa | 02-06 |
| D03 | User Guide English với ít nhất 6 phần bắt buộc | [User Guide](User_Guide.md) | Present; prose hiện chủ yếu tiếng Việt, reproduction còn cần audit | 08-09, 11, 17 |
| D04 | Guide có ít nhất 3 Failure Modes thật, troubleshooting và references | [User Guide](User_Guide.md) | Present; kiểm chứng nội dung theo source/evidence | 15, 18, 31 |
| D05 | Báo cáo lý thuyết, phương pháp, kết quả manual/AI, equivalent candidates và giới hạn | [Seminar Report](Seminar_Report.md) | Present; audit source trước, rồi review kỹ nội dung | 03, 12-15, 20 |
| D06 | Slides dùng template, đầy đủ nội dung, chữ lớn/nền sáng; không giới hạn count theo người dùng | [Slides workspace](slides/README.md) | Present; chưa dựng lại hoặc kiểm tra native render | 20, 25 |
| D07 | Video 5-8 phút, English narration, không nhạc nền; MP4 tối đa 100 MB hoặc link theo quyết định áp dụng | [Video Link](Demo_Video_Link.md), [Demo Script](Demo_Script.md) | Present link/script; duration, language, media và access Pending | 07-10, 19, 21 |
| D08 | Source/tests/fixtures/scripts/config và commit được xác định, hướng dẫn chạy khớp | [Source repo](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness), [Source Audit](Source_Audit.md) | 12 test/dry/full mutation profiles đã kiểm chứng; native invalid mutants công bố riêng; source checkpoint 1be4637, chưa push | 09, 11-14, 30 |
| D09 | Baseline report, ít nhất 3 survivors và 3 manual assertions; AI raw/reviewed candidate trên cùng input | [New audit evidence](../evidence/verification/source-audit-2026-11-06/), [historical joint comparison](../evidence/experiments/integration-and-reproduction/Overall_Comparison.md) | Historical evidence giữ nguyên; kết quả mới và giới hạn theo Source Audit, không thay human review | 12-16 |
| D10 | Mapping demo setup/basic/advanced, traditional/AI, Data-driven và Checkpoints | Chưa có file hợp nhất `Demo_Coverage_Matrix.md`; xem [Demo Script](Demo_Script.md) | Missing bản hợp nhất; giữ việc bỏ/thay Record and Playback có nguồn | 07-10 |
| D11 | Activity worksheet có rules, input, hints, response sheet và scoring | [Worksheet](../activity/Activity_Worksheet.md) | Present thiết kế cũ; session activity sẽ chốt SUT và cơ chế mới | 22-23 |
| D12 | Answer key/rubric và hướng dẫn facilitator; đáp án không phát trước vòng thi | [Facilitator Guide](../activity/Facilitator_Guide.md) | Recovered; kết quả runner là Agent evidence lịch sử, không là audience pilot | 22-23 |
| D13 | AI-02 theo mẫu, 5 phần và ít nhất 600 từ | [Member forms](../ai-audit/members/), [AI audit index](../ai-audit/README.md) | Present Markdown/PDF; verdict, completeness và review cần đúng người | 27, 31-32 |
| D14 | AI-03 signed PDF cho từng thành viên | [Member forms](../ai-audit/members/) | Present PDFs; chưa kiểm tra chữ ký hoặc xác nhận nộp | 28, 31 |
| D15 | AI-04 300 từ theo mẫu | [Member forms](../ai-audit/members/) | Present; reflection do thành viên xác nhận từ trải nghiệm thật | 29 |
| D16 | Final Reflection 300 từ English | Chưa có file riêng `Final_Reflection.md` | Missing file riêng; cần quyết định tách/gộp với AI-04 | 29 |
| D17 | Phân công và đóng góp có minh chứng | [Contribution workbook](Contribution_Summary.xlsx), [records](../evidence/contributions/), [Git log snapshot](../evidence/coordination/Git_Commit_Log_2026-10-23.md) | Present; workbook giữ nguyên, status/assignee theo tracker, không suy từ Git author | 02, 30-31 |
| D18 | Peer review cho 2 nhóm: mỗi nhóm 3 strengths, 3 suggestions gắn guide section, 1 câu hỏi và cách trả lời | Chưa có bản reviews thật | Missing inputs và reviews, không dùng template thay nội dung đã làm | 34 |
| D19 | Audience feedback thật và action items sau seminar | Chưa có bản tổng hợp thật | Pending sự kiện và dữ liệu người tham gia | 26, 32 |
| D20 | Evidence review scope và trình bày thử với GV | [Context lịch sử](../evidence/coordination/Context_Before_Reorganization.md) | Scope ban đầu đã được người dùng xác nhận; chưa thấy record rehearsal cụ thể | 02, 06, 31 |
| D21 | Chia sẻ guide/video/worksheet qua Moodle ít nhất 3 ngày làm việc trước seminar | Cần link post và version | Pending evidence chia sẻ/access, không suy từ file local | 24 |
| D22 | Bộ nộp đúng kênh, đủ sources, access và receipt | [Snapshots](../submission/) | Có snapshots w3/w6; tình trạng nộp thực tế chưa xác minh | 21, 24, 30 |

## Presentation Readiness

- [ ] Chốt người trình bày, demo và điều phối; mỗi thành viên giải thích được phần mình.
- [ ] Chuẩn bị flow 45 phút: pitch 10, live demo 10, activity 20, Q&A 5.
- [ ] Trình bày thuật ngữ, workflow, mutant states, score denominator và giới hạn.
- [ ] Giải thích survivor bằng business rule, input, observation và assertion cụ thể.
- [ ] Có tính năng traditional và AI trên EShop end-to-end; candidate được review và chạy kiểm chứng.
- [ ] Mỗi thành viên tự chạy tool được; không dùng Agent execution làm member self-run.
- [ ] Kiểm tra đúng revision, môi trường, fixtures/reset, configs và commands trên máy demo.
- [ ] Có report/video dự phòng truy được nguồn; nói rõ khi dùng kết quả đã lưu.
- [ ] Chốt SUT, độ khó và cơ chế hạn chế lợi thế AI cho activity trong session riêng.
- [ ] Chốt submission, execution, scoring và ranking; chưa xem runner cũ là platform đã hoàn tất.
- [ ] Pilot với người học thật và kiểm thời lượng tối đa 20 phút.
- [ ] Chuẩn bị worksheet, facilitator guide/answer key, nhận bài, peer review và tally.
- [ ] Kiểm chứng original pass và target kill đúng case; không tính setup errors, crashes hoặc Timeout thành assertion kills.
- [ ] Chuẩn bị Q&A và người phụ trách trả lời.
- [ ] Chuẩn bị minute paper: learned, unclear, usefulness 1-5.
- [ ] Diễn tập đầy đủ với đúng slides, demo, activity và chuyển lượt.
- [ ] Kiểm tra render, font, máy chiếu, mạng, âm thanh và links trên máy trình bày.
- [ ] Có evidence trình bày thử/review với GV và sửa sau góp ý.
- [ ] Kiểm tra materials đã chia sẻ trước buổi học theo yêu cầu.

## Submission Acceptance

- [ ] Đối chiếu D01-D22 với đúng phiên bản nộp, không chỉ kiểm sự tồn tại của file.
- [ ] Mọi factual claims có nguồn; counts/scores khớp reports, Killed và Timeout tách riêng.
- [ ] Không gộp domain scores thành joint result hoặc nhận AI-assisted assertions là independent manual work.
- [ ] Giữ attribution, đúng tool/model/executor; human review và chữ ký có xác nhận thật.
- [ ] Đồng bộ Markdown, PPTX và exports; giữ receipts/version/link cần thiết.
- [ ] Audience feedback/reflection/peer review bổ sung đúng sự kiện, không điền trước bằng suy đoán.
- [ ] Tuân thủ attendance/minute paper của môn, ít nhất 8/10 seminar theo REQ-33; evidence từ record thực tế.

## Current Session Boundary

Docs reorganization đã hoàn tất theo xác nhận người dùng. Source Audit đã hoàn tất technical verification và sửa tooling, với implementation được gom trước batch checks. Checklist không thay human acceptance hoặc tracker. SUT/activity platform mới, content review, slides và buổi diễn tập tiếp tục theo CONTEXT.
