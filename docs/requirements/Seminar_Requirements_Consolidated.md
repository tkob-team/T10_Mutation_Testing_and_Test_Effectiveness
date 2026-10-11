# T10 Seminar Requirements

**Topic:** Mutation Testing & Test Effectiveness
**Implementation Tools:** StrykerJS + Claude
**Document Role:** Bản gộp để tra cứu và giao việc, giữ nguồn cho từng yêu cầu. Bản gốc vẫn nguyên vẹn. Các quyết định của nhóm được tách khỏi yêu cầu giảng viên.

## Sources

| Code | Official Source | Main Scope |
|---|---|---|
| G | [SoftwareTesting-SeminarRequirements.md](02_SoftwareTesting-SeminarRequirements.md) | Nội dung, trình bày, teamwork, bộ 90% và các đợt nộp |
| M | [Seminar_Guide.md](01_Seminar_Guide.md) | S1–S8, deliverables, rubric, AI policy, attendance, peer review |
| T | [T10 Topic Description](03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md) | Learning objectives, experiment và Kill the Mutant |

## Requirements & Traceability

| ID | Requirement | Source / Section | Stage | Deliverable / Evidence |
|---|---|---|---|---|
| REQ-01 | Giúp người chưa học chủ đề hiểu và áp dụng cơ bản; thể hiện quy trình và công sức của nhóm | G: Yêu cầu chung; M: 1 | All | Guide, demo, activity, contributions |
| REQ-02 | Nhóm 3–4 SV; chủ động trao đổi nội dung với GV và cập nhật kết quả thường xuyên | G: Yêu cầu chung; M: 2,5 | Preparation–S8 | Task workbook, meeting notes |
| REQ-03 | Trình bày theory, thuật ngữ, mục đích và giới hạn mutation testing | G: Nội dung; T: 1–2,5 | S3–S4 | Report, slides, sources |
| REQ-04 | Khảo sát ≥3 candidates: traditional, AI và backup; so sánh cost, learning curve, EShop fit, AI capability, community | M: 2.1 S1; G: Nội dung | S1 | Survey matrix |
| REQ-05 | Proposal ≤1 trang; topic/code, recommended pick, ba lý do chọn và AI Disclosure/cross-check | M: 2.1 S1,4 | S1 | Tool_Survey_Proposal.md |
| REQ-06 | Scope/tool được review tại S2; ghi verdict APPROVED/MINOR-CHANGE/RECLAIM, tối đa hai vòng; lưu scope note/comment | M: 2.1 S2; T: 3–4 | S2 | Review evidence, scope note |
| REQ-07 | Triển khai/demo hai tool StrykerJS + Claude; live demo có tính năng traditional và AI | G: Nội dung; M: 3; T: 9; xác nhận người dùng về số tool | S3–S6 | Demo coverage matrix, video/live demo |
| REQ-08 | Mỗi tool: theory/terms, chức năng, nguyên lý, setup/basic/advanced demos và hạn chế | G: Nội dung | S3–S4 | Guide, report, demo script |
| REQ-09 | Workflow fully/semi-automated; AI demo tổng quát hóa và tái sử dụng được | G: Nội dung | S3–S4 | Scripts/config, prompt template |
| REQ-10 | Demo Record & Playback, Data-driven, Checkpoints; cách áp dụng cho T10 cần GV xác nhận | G: Nội dung | S2–S4 | Scope decision, demo mapping |
| REQ-11 | Cài tool, làm official tutorial, chạy ≥1 end-to-end EShop scenario; mỗi thành viên tự chạy được | M: 2.1 S3; T: 2,6 | S3 | Environment/test evidence, member run log |
| REQ-12 | Cài Stryker trên backend EShop và tạo baseline mutation report | T: 2,6 | S3 | Baseline report/config |
| REQ-13 | Phân tích ≥3 surviving mutants và nguyên nhân; bổ sung ≥3 manual assertions | T: 2,6 | S3 | Mutant analysis, manual tests |
| REQ-14 | AI đề xuất assertions cho cùng mutant; chạy kiểm chứng và báo cáo score cuối | T: 2,6 | S3 | Claude input/output, AI tests, comparison |
| REQ-15 | Thảo luận equivalent mutants và AI approaches; ghi remaining candidates | T: 2,5–6 | S3–S4 | Analysis, report, references |
| REQ-16 | Ghi screenshot, command, errors trong private team log | M: 2.1 S3 | S3–S8 | Experiment/contribution evidence |
| REQ-17 | User Guide English, ≥6 phần: Introduction, Install, First Test, Advanced Usage, Troubleshooting, References | M: 2.1 S4,4; T: 8 | S4 | User_Guide.md |
| REQ-18 | Guide có Failure Modes nêu ≥3 cách thật công cụ có thể khiến người dùng hiểu sai | T: 9 | S3–S4 | Failure Modes section, sources/evidence |
| REQ-19 | Screencast MP4 5–8 phút, ≤100 MB, 1080p preferred; English narration, không nhạc nền; phụ đề tùy chọn | M: 2.1 S4; T: 8 | S4 | Demo_Screencast.mp4 |
| REQ-20 | Có báo cáo chi tiết, slides đầy đủ; chữ to, nền sáng/chữ đen cho lớp; slides ≤15 và dùng template | G: Trình bày; M: 2.1 S6,4 | S4–S5 | Seminar_Report.md/PDF, Seminar_Slides.pptx |
| REQ-21 | Quay demo, đăng YouTube/nộp link và dẫn trong slides; Master Guide yêu cầu MP4/Moodle | G: Trình bày; M: 2.1 S4–S5 | S4–S5 | Video/link, kênh nộp được xác nhận |
| REQ-22 | Bài tập có hướng dẫn/gợi ý; Kill the Mutant dùng 5 mutants, assertions, peer review và tally kills | G: Trình bày; T: 7 | S5–S6 | Activity_Worksheet.md, answer key |
| REQ-23 | Worksheet có answer key; chuẩn bị rubric cho peers; team khác tái lập ≤25 phút không cần trợ giúp | M: 4,6; T: 9 | S5 | Worksheet, rubric, pilot evidence |
| REQ-24 | Chia sẻ guide, screencast, worksheet qua Moodle ≥3 ngày làm việc trước live seminar | M: 2.1 S5 | S5 | Shared materials, Moodle evidence |
| REQ-25 | Live seminar 45 phút: pitch 10, demo 10, activity 20, Q&A 5; demo EShop thật, end-to-end | M: 2.1 S6,6 | S6 | Rehearsal/session evidence |
| REQ-26 | Thu một minute paper/team: learned, unclear, usefulness 1–5; tổng hợp feedback | M: 2.1 S7,4 | S7 | Audience_Feedback_Aggregated.md |
| REQ-27 | AI-02 theo mẫu: năm phần, ≥600 từ; disclose tool, prompt summary, outcome | M: 2.1 S8,7 | All/S8 | AI usage log, AI-02 |
| REQ-28 | AI-03 theo mẫu: signed PDF cho từng thành viên | M: 2.1 S8 | S8 | Member disclosures với chữ ký thật |
| REQ-29 | AI-04 300 từ; Final Reflection 300 từ English; xác nhận có cần hai file riêng | M: 2.1 S8,4 | S8 | AI-04, Final_Reflection.md |
| REQ-30 | Source/tài liệu tham khảo, phân công và minh chứng thành viên có trong bài nộp | G: Chung/Trình bày | All | Code links, tasks, contribution evidence |
| REQ-31 | SV tự trải nghiệm; AI artifacts phải human-review/edit; public claims có nguồn gốc | G: Chính chủ; M: 7 | All | Review records, sources, actual run evidence |
| REQ-32 | Không đưa private keys/student IDs/course secrets vào AI; không dựng audience feedback/attendance | M: 7 | All | AI inputs, evidence nguyên gốc |
| REQ-33 | Tham dự ≥8/10 seminar, nộp minute paper mỗi buổi; vắng >2 bị cap seminar component 70% | M: 6 | All | Attendance/minute-paper records |
| REQ-34 | Review hai partner: ≥3 strengths, ≥3 suggestions gắn guide section, một câu hỏi và cách trả lời | M: 8 | S8 | Peer_Review.md cho hai partner |

## Deliverables & Storage

Quy ước nơi bàn giao và format của nhóm: [Working Guide](../Working_Guide.md). Output/template từng task: [Task Output Map](../Task_Output_Map.md). Preparation–S2 do Thái Hòa thực hiện; từ S3 contributions cá nhân được hợp nhất bởi task assembly.

Các quy ước này không bổ sung yêu cầu giảng viên. Ba requirements và AI forms gốc giữ nguyên; bản cuối chỉ gom artifacts đã review. Reflection/chữ ký do chính thành viên thực hiện.

## Original Milestones

| Source | Original Milestone |
|---|---|
| G | Gặp mặt Tuần 2–3; thiếu người/chuẩn bị sơ sài bị trừ 1/10 |
| G | Nộp Tuần 6 ở mức 90%; không nộp/sơ sài bị trừ 3/10 |
| G | Nộp/trình bày thử trước tuần seminar; bỏ bước này bị trừ 4/10 |
| G | Nộp hiệu chỉnh cuối Tuần 12 |
| M | Topic claim Tuần 5; S1 trong năm ngày làm việc sau claim, due Tuần 6 Sat 23:59 |
| M | S2 phản hồi trong hai ngày làm việc; timeline ghi approval giữa Tuần 6 |
| M | S3–S5 Tuần 6–10; seminar Tuần 7–11 |
| M | Pre-share ≥3 ngày làm việc trước seminar; S8 trong năm ngày làm việc sau seminar |

Nhóm tự kiểm tra lịch cụ thể với GV, bao gồm điểm khác nhau giữa mốc 90% của G và proposal/approval của M. Không chuyển các mốc này thành lịch/estimate tự gán trong workbook.

## Rubric

Seminar chiếm 20% điểm môn học theo M §6. Các trọng số dưới đây nằm trong seminar component.

| Criterion | Weight |
|---|---|
| Tool survey + proposal | 10% |
| Depth of study | 15% |
| User-guide document | 20% |
| Live demo on EShop | 15% |
| In-class hands-on activity | 20% |
| Q&A + facilitation | 10% |
| AI Audit + Disclosure + Reflection | 10% |

## Open Decisions & Interpretation

- Hai tool đã được xác nhận: StrykerJS + Claude. Không mở lại câu hỏi số tool.
- Chốt checkpoint 90%, SUT/module, Record & Playback, activity 20/25 phút, kênh video, AI-04/Final Reflection, AI category, slides template và peer partners. Ba AI forms đã tải, không còn pending về file nguồn.
- Chọn 12–15 slides là đề xuất để đáp ứng cả hai nguồn, chưa phải giới hạn tối thiểu GV ban hành.
- Không bổ sung nghĩa vụ từ briefing generated như 720p minimum, First Test ≤15 steps hay ≥3 troubleshooting errors.
- Lưu ý cách tính mutation score theo tool được dùng; bản gộp không tự sửa nội dung bản gốc. Báo cáo Killed và Timeout riêng để giải thích kết quả.
- Bộ 90% cần kết quả cốt lõi đã kiểm chứng. Feedback/reflection sau seminar chưa diễn ra giữ pending; không dựng bằng chứng để lấp checklist.
