# Project Context

## Purpose

Nhóm 12, CSC13003 Software Testing, FIT@HCMUS làm seminar T10: Mutation Testing and Test Effectiveness. Nhóm nghiên cứu EShop backend với StrykerJS và AI Agent để phân tích chất lượng assertions, rồi chuyển kết quả thành guide, report, demo và activity.

## Current Workflow

Theo quyết định trực tiếp của người dùng ngày 2026-11-06, docs được tổ chức theo đầu ra và chỉnh trực tiếp một bản nguồn. Stage không còn là workflow lưu trữ hoặc giao việc hiện hành. Nguồn giảng viên và records cũ vẫn giữ ký hiệu lịch sử để truy nguồn.

Thứ tự công việc đã chốt:

1. Chuẩn hóa và di dời docs theo requirements và checklist.
2. Audit kỹ môi trường, tests, baseline và các conditions ở repo source.
3. Dùng EShop `1be4637` để chuẩn bị feature, starter tests và pack activity. Điều chỉnh độ khó theo pilot.
4. Dựng T10 Mutation Lab cho submission, thực thi và ranking. Kiểm chứng kỹ thuật trước khi review cùng người học.
5. Rà và viết kỹ từng tài liệu, dựng lại slides theo hệ thống và kết quả đã chốt.

Mục 1 đã hoàn tất theo xác nhận trực tiếp của người dùng. Mục 2 đã hoàn tất technical audit và batch verification theo yêu cầu người dùng: 12 test/dry/mutation profiles, driver diagnosis, 3 target assertion controls và web/admin builds. Xem [Source Audit](docs/Source_Audit.md) cho trạng thái và evidence mới. Không mặc định workshop cũ là SUT cho activity mới. Audit kỹ thuật không xác nhận video access hoặc human acceptance.

## Sources and Authority

- [Requirements](requirements/Seminar_Requirements_Consolidated.md) giữ REQ IDs, nguồn GV và các quyết định áp dụng.
- Ba nguồn giảng viên trong requirements giữ nguyên bytes. Bản Markdown làm việc từng lược bỏ mốc hoàn thiện trung gian theo yêu cầu người dùng ngày 2026-10-18; không coi đó là thay đổi do GV xác nhận.
- [AI forms originals](ai-audit/originals/) giữ mẫu gốc; forms đã điền có nguồn riêng trong [AI audit workspace](ai-audit/README.md).
- [Team Sheet](https://docs.google.com/spreadsheets/d/1vuIXJeVhuoKQu8Gw4cHN__d09kIcB4K-hccIz27DxKc/edit) là nguồn assignee/status. Session này không đọc hoặc ghi lại tiến độ Sheet.
- [Context trước tái cấu trúc](evidence/coordination/Context_Before_Reorganization.md) giữ chronology, handoffs và trạng thái lịch sử. Không dùng các câu Pending hoặc lỗi trong đó làm kết luận hiện tại nếu chưa kiểm tra lại.

## Team and Ownership

Thành viên: Lê Tấn Hiệp, Tống Dương Thái Hòa, Nguyễn Phúc Hoàng.

Ownership đã có: Tấn Hiệp phụ trách Cart and Orders, Thái Hòa phụ trách Coupons và tổng hợp, Phúc Hoàng phụ trách Authentication and Users. Phần chuẩn bị và khảo sát ban đầu do Thái Hòa phụ trách; phân công và trạng thái chi tiết theo tracker. Di dời tài liệu không thay attribution hoặc ghi nhận việc mới cho thành viên.

Người dùng đã xác nhận phần khảo sát và review scope ban đầu hoàn tất trong context lịch sử. Chưa tìm được file scope verdict riêng không có nghĩa phải xin lại approval đó.

## Repositories and Working Sources

- [Documentation repo](https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness): requirements, docs, activity materials, AI audit và evidence.
- [EShop research repo](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness): source, tests, fixtures và mutation config. Local sibling dùng tên `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness`; xác minh root/HEAD trước khi làm.
- [T10 Mutation Lab](https://github.com/tkob-team/t10-mutation-lab): source platform riêng. [Platform Spec](activity/Activity_Platform_Spec.md) giữ luật activity hiện hành.
- [Previous workshop](https://github.com/tkob-team/eshop-sut-workshop): nguồn của guide và activity cũ.
- Bản nguồn hiện tại được dẫn từ [README](README.md) và [Checklist](docs/Deliverables_Checklist.md). Bản lấy từ w6 là điểm bắt đầu để sửa, không phải xác nhận đã nghiệm thu.

## Confirmed Decisions

- Vai trò triển khai/demo là StrykerJS và AI Agent; ghi tool/model thực tế theo từng run. Giữ đúng tên trong records lịch sử.
- Mỗi deliverable có một bản nguồn đang chỉnh. Source snapshots, raw evidence và các gói đã đóng băng không phải bản làm việc song song.
- Không giới hạn số slides theo quyết định người dùng ngày 2026-11-06; số lượng phục vụ đủ nội dung và thời lượng. Không ghi thành thông báo mới của GV.
- Activity tối đa 20 phút. Theo trao đổi 2026-11-10, dùng một phòng và một tổng điểm. Cart and Orders, Coupons và Auth là nhóm feature. Nộp bài lấy nội dung của tab hiện tại và chạy original trong quy trình chấm. Mất phiên thì nhờ điều phối viên cấp liên kết dùng một lần. Bỏ thiết kế luật AI và quyền captain riêng.
- Pilot kỹ thuật dùng Docker Compose trên Windows/WSL2, EShop `1be4637` và pack đã đối chứng. [Validation](evidence/activity/rebuild-validation-2026-11-10/README.md) giữ kết quả và phần chờ human review.
- Record and Playback có thể bỏ hoặc thay theo người dùng; giữ mapping Data-driven và Checkpoints chính xác. Không mô tả test runner như GUI recorder.
- Video nộp bằng link theo người dùng; nội dung, phiên bản và access cần evidence thật.
- Không tự đặt ngày, lịch hoặc estimate cho roadmap. Deadline của GV vẫn có trong nguồn requirements.
- Lượt triển khai đã dừng trước stage/commit để người dùng review. Sau đó người dùng yêu cầu commit checkpoint tái cấu trúc trong chat. Không tự push.
- Sau khi hoàn tất source audit, người dùng tiếp tục yêu cầu commit phần audit. Source checkpoint là `1be4637`; docs và evidence được commit riêng trong repo tài liệu. Không push; raw run metadata vẫn giữ revision và working tree tại thời điểm execution.

## Experiment Contract

1. Chốt SUT revision, scope, spec và expected results. Ghi sai khác code gốc/spec trước khi freeze.
2. Kiểm tra môi trường, scripts, harness, fixtures và reset dữ liệu tại revision nhận việc. Không dùng trạng thái lịch sử thay kiểm tra hiện tại.
3. Có baseline mutation report, phân tích ít nhất 3 surviving mutants và bổ sung ít nhất 3 manual assertions theo yêu cầu T10.
4. So manual/AI trên cùng production baseline và tập mutants được xác định. Lưu raw AI output, bản sửa, reviewer, tool/model và verification thật. Tests do Agent soạn không tự trở thành independent human work.
5. Báo Killed và Timeout riêng; không gọi Timeout hoặc RuntimeError là assertion kills. Loại run lỗi không hợp lệ khỏi kết luận tương ứng và ghi lý do, không che lỗi.
6. Equivalent candidate cần lập luận theo phạm vi, chưa đủ căn cứ không kết luận equivalent.
7. Mỗi run ghi commit, versions, config, commands, test set, kết quả và report paths. Chỉ báo thời gian nếu đã đo.
8. Joint comparison phải có joint runs; không cộng counts hoặc trung bình scores giữa domains để suy thành kết quả chung.

## Historical Experiment Pointers

- [Baseline manifest](evidence/experiments/domain-runs/Baseline_Manifest.md): frozen SUT `806ba19`; historical baseline 88 tests, defect profiles riêng.
- [Overall comparison](evidence/experiments/integration-and-reproduction/Overall_Comparison.md): joint runs có 395 signatures, test counts 88/118/118 và scores 67.56%/80.53%/75.47%. Đây là số từ evidence lịch sử, chưa được chạy lại trong session này.
- Coupons assertions ở hai conditions cũ có Codex hỗ trợ trong cùng context. Không trình bày như independent human-vs-AI experiment.
- [Previous activity evidence](evidence/activity/previous-sandbox/): runner và verification của thiết kế cũ.
- Các xác nhận tự chạy, human review, chữ ký và nghiệm thu vẫn theo evidence của đúng người và đúng phiên bản.

## Open Inputs

Ngày seminar và các mốc thực tế, human review và pilot activity 20 phút trên mạng lớp, media access, audience feedback, hai peer-review partners và xác nhận của tác giả cho AI-04 và Final Reflection. Guide tiếng Anh dùng archive w13 đã có tại [User Guide](docs/User_Guide.md). Kết quả technical source audit đã có trong Source Audit. Member review và self-runs theo evidence riêng.
