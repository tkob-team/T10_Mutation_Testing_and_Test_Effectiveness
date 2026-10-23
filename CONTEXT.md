# Project Context

## Purpose

Nhóm 12, môn Software Testing, FIT@HCMUS chuẩn bị seminar T10: Mutation Testing & Test Effectiveness. Nhóm nghiên cứu trên EShop backend, so sánh assertion thủ công với assertion do AI Agent đề xuất, rồi xây dựng guide, report, demo và activity để người khác thực hành lại. Agent/model thực tế được ghi riêng cho từng run.

Context này giữ quyết định và quy ước chung của nhóm. Phân công và tiến độ theo [Team Sheet](https://docs.google.com/spreadsheets/d/1vuIXJeVhuoKQu8Gw4cHN__d09kIcB4K-hccIz27DxKc/edit) do Thái Hòa cung cấp ngày 2026-10-22; yêu cầu chi tiết lấy từ [Requirements](docs/requirements/Seminar_Requirements_Consolidated.md).

## Sources & Authority

| Source | Role |
|---|---|
| `docs/requirements/01_Seminar_Guide.md` | Nguồn giảng viên: flow, deliverables, rubric và AI policy |
| `docs/requirements/02_SoftwareTesting-SeminarRequirements.md` | Nguồn giảng viên: nội dung, teamwork và bộ nộp |
| `docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md` | Nguồn giảng viên riêng T10: objectives, experiments và activity |
| `docs/requirements/Seminar_Requirements_Consolidated.md` | Bản gộp có REQ IDs, nguồn đối chiếu và điểm chưa thống nhất |
| `proposal/`, `research/` và templates | Tài liệu hỗ trợ/đề xuất của nhóm; trạng thái approval cần evidence riêng |
| `ai-audit/originals/` | Ba mẫu AI-02/03/04 giảng viên gửi; giữ nguyên, bổ sung nguồn về inputs/verification/signature |

Không mặc định một nguồn giảng viên đã thay thế nguồn khác. Bản Markdown requirements đã được lược bỏ đoạn về mốc hoàn thiện trung gian theo yêu cầu người dùng ngày 2026-10-18; đây là chỉnh sửa bản làm việc, không phải xác nhận GV đổi yêu cầu. Những giới hạn chỉ có trong tài liệu generated là đề xuất, trừ khi có evidence xác nhận.

## Repositories & Artifacts

| Location | Responsibility |
|---|---|
| [Seminar repo](https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness) | Requirements, proposal, tài liệu seminar và evidence |
| [EShop repo](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness) | SUT source, tests, fixtures và mutation config |

Stage destinations và quy ước bàn giao nằm trong [Working Guide](docs/Working_Guide.md); output/template của từng task nằm trong [Task Output Map](docs/Task_Output_Map.md).

Khi task cần code/tests/config, dùng repo EShop được dẫn ở trên và xác minh Git root/commit trước khi sửa. Nếu thiếu đầu vào hoặc quyền truy cập, hỏi người giao việc.

## Workflow

**Current Stage — 2026-10-23:** S1 và S2 đã hoàn tất theo xác nhận trực tiếp của Thái Hòa. Nhóm đang làm S3; baseline chung đã freeze tại SUT `806ba19` sau khi merge các bàn giao được review vào main. [Manifest](experiments/s3/Baseline_Manifest.md) và [review](experiments/s3/D04_Integration_Review_2026-10-23.md) ghi rõ technical verification và member review/self-run còn riêng biệt.

Evidence S3 hiện có trong repo:

- Thái Hòa: [Research Notes](research/s3/Research_Notes_Thai_Hoa.md) cho A02/B02; [Experiment Log](experiments/s3/Experiment_Log_Thai_Hoa.md) có Agent runs C02/D02/D04/E02, F02 draft, G02 và H02 comparison. Common tests 88 pass; 54 defects tách riêng. Coupons: baseline 39 Killed/21 Timeout/30 Survived/25 NoCoverage/5 RuntimeError; F02 và G02 cùng kill thêm hai mutants usage-limit. F02 được người dùng giao Codex soạn để review; G02 dùng Codex cùng context theo lựa chọn trực tiếp sau lỗi đăng nhập Claude. Không gọi đây là independent human-vs-AI experiment.
- Tấn Hiệp: [Research Notes](research/s3/Research_Notes_Tan_Hiep.md) và [Experiment Log](experiments/s3/Experiment_Log_Tan_Hiep.md) có bàn giao Cart baseline/manual/AI/comparison. Claim Google đã sửa mẫu số. Main đã nhận suite D01 từ `8d60e9b`; các nhánh manual/AI không merge vào baseline. Raw C01/E01/F01/G01 lịch sử giữ nguyên, không gán run Agent mới thành Hiệp tự chạy.
- Phúc Hoàng: [Research Notes](research/s3/Research_Notes_Phuc_Hoang.md), [Experiment Log](experiments/s3/Experiment_Log_Phuc_Hoang.md), Auth tests và E03-provisional đã có. Người dùng cho phép import 5 files Auth nguyên bản từ evidence vì không có SUT commit bàn giao; commit `958fca3`, hashes khớp. Agent đã reproduce baseline Auth; F03/G03/H03 chưa bàn giao nên I02 chỉ Partial.

Review trên xác nhận chất lượng đầu ra task, không thay xác nhận trải nghiệm, verdict AI audit, reflection hoặc chữ ký của thành viên. [AI Record Thái Hòa](ai-audit/AI_Record_Thai_Hoa.md) và [AI Record Tấn Hiệp](ai-audit/AI_Record_Tan_Hiep.md) vẫn còn inputs Pending; phần audit S8 đang được tích lũy, chưa hoàn tất. S1/S2 giữ trạng thái đã được người dùng xác nhận.

| Stage | Outcome |
|---|---|
| Preparation | Requirements, quy ước bàn giao và phân công sẵn sàng |
| S1 — Tool Survey | Survey, rationale và proposal |
| S2 — Scope Review | Góp ý GV và scope có evidence xác nhận |
| S3 — Research & Experiments | Research notes, tests/config, baseline/manual/AI results và evidence |
| S4 — Documentation & Demo | Chuyển notes/kết quả S3 thành guide, report và demo |
| S5 — Readiness | Slides, activity, pilot, rehearsal và bộ tài liệu đầy đủ để review/chia sẻ |
| S6 — Live Seminar | Presentation, demo, activity và Q&A |
| S7 — Feedback | Phản hồi thật và action items |
| S8 — Finalization | Hiệu chỉnh, audit/reflection/peer review và bộ cuối |

Mục tiêu là hoàn thành đầy đủ nội dung, thực nghiệm, tài liệu và bộ nộp có evidence kiểm chứng. Feedback/reflection sau seminar chỉ bổ sung khi sự kiện đã diễn ra; phần chưa có đầu vào giữ Pending.

### Coupons Handoff — 2026-10-22

Trên nhánh `codex/s3-coupons-hoa`, Codex AI Agent đã chuẩn bị S3-C02/D02:
[Contract](experiments/s3/Coupons_Test_Contract_Thai_Hoa.md), [Experiment Log](experiments/s3/Experiment_Log_Thai_Hoa.md), [run evidence](experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/README.md).
25 baseline tests pass, 16 original-defect tests fail tại assertions đúng kỳ vọng; Stryker dry run tìm và chạy đủ 25 tests. Production source/database giữ nguyên.
Tutorial Stryker + AI Agent riêng có target mutant Survived→Killed, không thay E02/G02 hoặc baseline chung.
Member run/review của Thái Hòa, D04 và E02/F02/G02/H02/I02 vẫn Pending. Không suy ra Sheet đã đồng bộ.
Hướng dẫn tự học/cách tự chạy chi tiết nằm ngoài hai repo team theo yêu cầu người dùng; contract/log trong repo vẫn đủ để teammate nhận bàn giao.

## Team & Task Ownership

Thành viên: Lê Tấn Hiệp, Tống Dương Thái Hòa và Nguyễn Phúc Hoàng.

**Preparation–S2 do Thái Hòa phụ trách; từ S3 mới chia task cho cả ba.** S1 dùng surveys/proposal chung; S2 giữ một scope/decisions record. Từ S3 cả ba đều có phần research, tests, sử dụng Stryker/Claude và viết nội dung. Chia scope theo domain/section; không cần bằng nhau tuyệt đối về độ khó hoặc số task. Tracker phân công Tấn Hiệp — Cart & Orders, Thái Hòa — Coupons, Phúc Hoàng — Authentication & Users; tham chiếu scope S2 đã được xác nhận hoàn tất.

Task ID có dạng Stage–Group–Sequence, ví dụ `S3-D01`. Mỗi task có một assignee, deliverable và evidence riêng; task hợp nhất có người tổng hợp. Leader review chung. Phân công domain/task cụ thể từ S3 và tiến độ đọc từ tracker; ownership Preparation–S2 là quyết định của nhóm nêu trên.

## Confirmed Decisions

- Hai vai trò triển khai/demo hiện hành: **StrykerJS + AI Agent**, theo điều chỉnh trực tiếp của người dùng để mỗi thành viên linh hoạt agent/model. Records lịch sử và raw outputs vẫn giữ tên tool thực sự đã dùng; không gán quyết định mới thành approval mới của GV.
- Nhóm làm theo mục tiêu hoàn thành đầy đủ deliverables; readiness kiểm tra khả năng chạy lại, chất lượng nội dung và evidence, không dùng ngưỡng hoàn thiện trung gian.
- S3 giao research notes; S4 dùng notes và evidence để viết tài liệu. Người tổng hợp vẫn cần kiểm tra phần thực nghiệm chung nếu task giao cả nội dung đó.
- Work-in-progress nằm trong thư mục `sN` của stage tương ứng. Sửa sau feedback ở nguồn stage gốc; `final/` chỉ gom bản đã review.

### Draft Preparation Decisions

Người dùng giao Thái Hòa cùng agent chuẩn bị đầy đủ docs trước trong `draft/`; agent/plan/tasks riêng nằm ở workspace `.local/`. Mỗi task map stage và mục bộ nộp. Tests/experiments từng domain và personal live demo nhận sau từ từng người, rồi bổ sung evidence; tracker/phân công và flow team giữ nguyên. Draft không tự xác nhận run hoặc human review đã hoàn tất.

- Record & Playback có thể bỏ hoặc thay theo xác nhận người dùng; giữ data-driven/checkpoints mapping, không tự mô tả một test runner là GUI recorder.
- Activity tối đa 20 phút theo người dùng; đây là giới hạn sản phẩm, không phải lịch/estimate session.
- Demo video nộp bằng link; ghi file/version và kiểm tra access khi có media thật.
- Slides: agent viết `draft/Seminar_Slides_Content.md` chi tiết; người dùng dựng PPTX thủ công.
- Kế hoạch chỉ chia đầu việc, dependencies và acceptance; không đưa ngày, lịch hoặc estimate vào roadmap/session.

Đây là quyết định người dùng cho preparation hiện tại; sources và AI forms originals giữ nguyên. Khi thiếu local planning ở clone teammate, phần này vẫn đủ xác định scope; không cần local files để làm task team.

## Experiment Contract

1. Chốt SUT commit, phạm vi và expected results từ spec; ghi sai khác code gốc/spec trước khi đóng băng baseline.
2. Dựng harness và data/reset để tests tái lập. Kiểm tra package scripts và version tại thời điểm làm; không mặc định runner hoặc lệnh đã hoạt động.
3. Chạy baseline mutation; phân tích ít nhất 3 surviving mutants và bổ sung ít nhất 3 manual assertions theo yêu cầu T10.
4. So sánh manual và AI Agent assertions trên cùng baseline production code/config và các mutant được chọn. Mỗi run ghi agent/tool/model thực tế; lưu raw AI output, bản đã sửa và kết quả kiểm chứng. Khác model giữa thành viên là điều kiện cần công bố, không tự suy model ranking.
5. Báo `Killed` và `Timeout` riêng. Mutation score theo định nghĩa/version tool; score tăng chưa đủ chứng minh assertion phát hiện lỗi tốt hơn.
6. Equivalent mutant chỉ được kết luận với lập luận/phạm vi rõ; trước khi đủ căn cứ dùng equivalent candidate. Kết quả AI là đầu vào review.
7. Mỗi run ghi SUT commit, versions/config, command, test set, kết quả và đường dẫn report. Record thời gian chỉ khi đo thật.

Templates có sẵn; tạo phiếu cá nhân khi bắt đầu task. Chúng không xác nhận research/run/report hoàn tất. Source inspection trước đó ghi backend `npm test` còn placeholder báo lỗi; kiểm tra lại tại commit nhận task. Evidence C01 của Tấn Hiệp được dẫn ở phần Workflow, không chứng minh harness/baseline mutation EShop chung đã hoàn tất; không suy ra progress trong Sheet.

## Execution Inputs

S2 đã hoàn tất theo xác nhận Thái Hòa. Khi task cần các chi tiết dưới đây, đối chiếu proposal/spec và hỏi người phụ trách về phần chưa được ghi lại; việc thiếu record chi tiết không có nghĩa approval còn chờ.

- Scope SUT/module và cách xử lý sai khác code gốc/spec.
- Lịch seminar và các hạn nộp áp dụng.
- Cách bỏ/thay Record & Playback được mô tả chính xác trong demo matrix theo quyết định preparation nêu trên.
- Activity theo giới hạn người dùng đã chốt; actual video link/access evidence bổ sung khi có.
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
| AI assertion candidate | Assertion do AI Agent đề xuất; ghi tool/model thực tế, cần review và thực thi kiểm chứng |
| Equivalent candidate | Mutant có khả năng giữ nguyên hành vi trong phạm vi xét, chưa phải kết luận đã chứng minh |
| Research notes | Notes có nguồn, câu hỏi đã trả lời và điểm chưa xác minh; đầu vào S4 |
| Evidence | Artifact hoặc record có thật hỗ trợ đúng claim đang báo cáo |
