# T10 Seminar Requirements

**Topic:** Mutation Testing and Test Effectiveness.

**Working roles:** StrykerJS và AI Agent; tool/model thực tế ghi theo từng run.

**Role:** Bản gộp để tra REQ IDs, nguồn và đầu ra. Repo hiện tổ chức theo deliverables, không dùng stage để giao việc hoặc tạo bản docs.

## Sources and Interpretation

| Code | Source | Use |
|---|---|---|
| G | [Software Testing Seminar Requirements](02_SoftwareTesting-SeminarRequirements.md) | Nội dung, trình bày, teamwork và bộ nộp |
| M | [Seminar Master Guide](01_Seminar_Guide.md) | Deliverables, rubric, deadlines, AI policy và peer review |
| T | [T10 Topic Description](03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md) | Objectives, thực nghiệm và activity |

Nguồn giảng viên giữ nguyên sau di dời. Stage labels trong cột nguồn bên dưới là địa chỉ section của tài liệu gốc, không phải workflow hiện hành. Các bản Markdown nguồn từng lược bỏ mốc hoàn thiện trung gian theo người dùng ngày 2026-10-18; không coi đó là xác nhận GV đổi yêu cầu.

Quyết định trực tiếp của người dùng đang áp dụng:

- Tổ chức và sửa docs theo đầu ra, một bản nguồn đang làm cho mỗi loại.
- Vai trò demo là StrykerJS và AI Agent, ghi đúng tool/model của từng run.
- Có thể bỏ/thay Record and Playback; giữ Data-driven và Checkpoints mapping đúng bản chất.
- Activity tối đa 20 phút; video nộp bằng link, access và nội dung vẫn cần kiểm tra.
- Không giới hạn số slides theo quyết định ngày 2026-11-06. Master Guide vẫn giữ tip/checklist 15 slides như nguồn gốc; không giả định có thông báo GV mới.
- SUT và platform submission/ranking activity mới bàn ở session riêng. Chưa thay thiết kế cũ bằng kết quả chưa thực hiện.

## Requirements and Traceability

| ID | Requirement | Source / Section | Deliverable / Evidence |
|---|---|---|---|
| REQ-01 | Giúp người chưa học chủ đề hiểu và áp dụng cơ bản; thể hiện quy trình và công sức của nhóm | G: Yêu cầu chung; M: 1 | Guide, demo, activity, contributions |
| REQ-02 | Nhóm 3-4 SV; chủ động trao đổi nội dung với GV và cập nhật kết quả thường xuyên | G: Yêu cầu chung; M: 2,5 | Team Sheet, meeting notes |
| REQ-03 | Trình bày theory, thuật ngữ, mục đích và giới hạn mutation testing | G: Nội dung; T: 1-2,5 | Report, slides, sources |
| REQ-04 | Khảo sát >=3 candidates: traditional, AI và backup; so sánh cost, learning curve, EShop fit, AI capability, community | M: 2.1 S1; G: Nội dung | Survey matrix |
| REQ-05 | Proposal <=1 trang; topic/code, recommended pick, ba lý do chọn và AI Disclosure/cross-check | M: 2.1 S1,4 | Tool_Survey_Proposal.md |
| REQ-06 | Scope/tool được review với GV; ghi verdict APPROVED/MINOR-CHANGE/RECLAIM, tối đa hai vòng; lưu scope note/comment | M: 2.1 S2; T: 3-4 | Review evidence, scope note |
| REQ-07 | Triển khai/demo StrykerJS + AI Agent; live demo có tính năng traditional và AI; agent/model thực tế có provenance | G: Nội dung; M: 3; T: 9; người dùng điều chỉnh tên vai trò AI | Demo coverage matrix, video/live demo |
| REQ-08 | Mỗi tool: theory/terms, chức năng, nguyên lý, setup/basic/advanced demos và hạn chế | G: Nội dung | Guide, report, demo script |
| REQ-09 | Workflow fully/semi-automated; AI demo tổng quát hóa và tái sử dụng được | G: Nội dung | Scripts/config, prompt template |
| REQ-10 | G yêu cầu Record & Playback, Data-driven, Checkpoints; người dùng cho phép bỏ/thay Record & Playback trong preparation này, giữ mapping chính xác | G: Nội dung; quyết định người dùng, không ghi như nguồn GV đã đổi | Scope decision, demo mapping |
| REQ-11 | Cài tool, làm official tutorial, chạy >=1 end-to-end EShop scenario; mỗi thành viên tự chạy được | M: 2.1 S3; T: 2,6 | Environment/test evidence, member run log |
| REQ-12 | Cài Stryker trên backend EShop và tạo baseline mutation report | T: 2,6 | Baseline report/config |
| REQ-13 | Phân tích >=3 surviving mutants và nguyên nhân; bổ sung >=3 manual assertions | T: 2,6 | Mutant analysis, manual tests |
| REQ-14 | AI Agent đề xuất assertions cho cùng mutant; chạy kiểm chứng và báo cáo score cuối; ghi model thực tế từng run | T: 2,6; quyết định vai trò của người dùng | Actual agent/model input/output, AI tests, comparison |
| REQ-15 | Thảo luận equivalent mutants và AI approaches; ghi remaining candidates | T: 2,5-6 | Analysis, report, references |
| REQ-16 | Ghi screenshot, command, errors trong private team log | M: 2.1 S3 | Experiment/contribution evidence |
| REQ-17 | User Guide English, >=6 phần: Introduction, Install, First Test, Advanced Usage, Troubleshooting, References | M: 2.1 S4,4; T: 8 | User_Guide.md |
| REQ-18 | Guide có Failure Modes nêu >=3 cách thật công cụ có thể khiến người dùng hiểu sai | T: 9 | Failure Modes section, sources/evidence |
| REQ-19 | Screencast MP4 5-8 phút, <=100 MB, 1080p preferred; English narration, không nhạc nền; phụ đề tùy chọn | M: 2.1 S4; T: 8 | Demo_Screencast.mp4 |
| REQ-20 | Có báo cáo chi tiết và slides đầy đủ, chữ lớn, nền sáng/chữ đen; dùng template. Bản làm việc mới không giới hạn số slides theo người dùng ngày 2026-11-06. | G: Trình bày; M: 2.1 S6,4; quyết định người dùng ngày 2026-11-06 | Seminar_Report.md/PDF, Seminar_Slides.pptx |
| REQ-21 | Quay demo, đăng YouTube/nộp link và dẫn trong slides; Master Guide yêu cầu MP4/Moodle | G: Trình bày; M: 2.1 S4-S5 | Video/link, kênh nộp được xác nhận |
| REQ-22 | Bài tập có hướng dẫn/gợi ý; Kill the Mutant dùng 5 mutants, assertions, peer review và tally kills | G: Trình bày; T: 7 | Activity_Worksheet.md, answer key |
| REQ-23 | Worksheet có answer key/rubric; peer tái lập không trợ giúp; T đặt <=25 phút, preparation áp dụng giới hạn chặt hơn <=20 phút theo người dùng | M: 4,6; T: 9; giới hạn người dùng | Worksheet, rubric, pilot evidence |
| REQ-24 | Chia sẻ guide, screencast, worksheet qua Moodle >=3 ngày làm việc trước live seminar | M: 2.1 S5 | Shared materials, Moodle evidence |
| REQ-25 | Live seminar 45 phút: pitch 10, demo 10, activity 20, Q&A 5; demo EShop thật, end-to-end | M: 2.1 S6,6 | Rehearsal/session evidence |
| REQ-26 | Thu một minute paper/team: learned, unclear, usefulness 1-5; tổng hợp feedback | M: 2.1 S7,4 | Audience_Feedback_Aggregated.md |
| REQ-27 | AI-02 theo mẫu: năm phần, >=600 từ; disclose tool, prompt summary, outcome | M: 2.1 S8,7 | AI usage log, AI-02 |
| REQ-28 | AI-03 theo mẫu: signed PDF cho từng thành viên | M: 2.1 S8 | Member disclosures với chữ ký thật |
| REQ-29 | AI-04 300 từ; Final Reflection 300 từ English; xác nhận có cần hai file riêng | M: 2.1 S8,4 | AI-04, Final_Reflection.md |
| REQ-30 | Source/tài liệu tham khảo, phân công và minh chứng thành viên có trong bài nộp | G: Chung/Trình bày | Code links, tasks, contribution evidence |
| REQ-31 | SV tự trải nghiệm; AI artifacts phải human-review/edit; public claims có nguồn gốc | G: Chính chủ; M: 7 | Review records, sources, actual run evidence |
| REQ-32 | Không đưa private keys/student IDs/course secrets vào AI; không dựng audience feedback/attendance | M: 7 | AI inputs, evidence nguyên gốc |
| REQ-33 | Tham dự >=8/10 seminar, nộp minute paper mỗi buổi; vắng >2 bị cap seminar component 70% | M: 6 | Attendance/minute-paper records |
| REQ-34 | Review hai partner: >=3 strengths, >=3 suggestions gắn guide section, một câu hỏi và cách trả lời | M: 8 | Peer_Review.md cho hai partner |

## Working Sources

Mở [Deliverables Checklist](../docs/Deliverables_Checklist.md) để tìm bản nguồn và gaps, hoặc [README](../README.md) để vào tài liệu. Checklist kiểm kê output, không thay trạng thái tracker hoặc xác nhận nghiệm thu.

Giữ attribution và evidence riêng. Templates hoặc contribution cũ nằm trong evidence, không yêu cầu tạo lại tài liệu theo stage. Nguồn AI forms trong [originals](../ai-audit/originals/) giữ nguyên; reflection và chữ ký do thành viên thực hiện.

## Instructor Milestones

| Source | Retained milestone |
|---|---|
| G | Gặp mặt Tuần 2-3; thiếu người hoặc chuẩn bị sơ sài bị trừ 1/10 |
| G | Nộp/trình bày thử trước tuần seminar; bỏ bước này bị trừ 4/10 |
| G | Nộp hiệu chỉnh cuối Tuần 12 |
| M | Topic claim Tuần 5; proposal trong 5 ngày làm việc sau claim, due Tuần 6 Sat 23:59 |
| M | Phản hồi scope trong 2 ngày làm việc; timeline ghi approval giữa Tuần 6 |
| M | Study, documenting và pre-share Tuần 6-10; seminar Tuần 7-11 |
| M | Pre-share ít nhất 3 ngày làm việc trước seminar; audit/reflection trong 5 ngày làm việc sau seminar |

Các mốc trên từ nguồn giảng viên, không phải lịch hoặc estimate được tự gán cho roadmap. Ngày thực tế cần input đúng lịch lớp.

## Rubric

Seminar chiếm 20% điểm môn học theo M section 6. Trọng số bên dưới nằm trong seminar component.

| Criterion | Weight |
|---|---|
| Tool survey and proposal | 10% |
| Depth of study | 15% |
| User-guide document | 20% |
| Live demo on EShop | 15% |
| In-class hands-on activity | 20% |
| Q&A and facilitation | 10% |
| AI Audit, Disclosure and Reflection | 10% |

## Open Inputs

Kết quả audit source và reproduction, SUT/platform activity mới, guide English, media access, ngày seminar, instructor rehearsal evidence, audience feedback, hai peer-review partners và cách tách AI-04/Final Reflection. Không dựng evidence hoặc thay Pending bằng Done chỉ vì file đã tồn tại.
