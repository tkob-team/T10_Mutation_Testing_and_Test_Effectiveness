# T10 Mutation Testing and Test Effectiveness

Repo tài liệu seminar Nhóm 12, CSC13003 Software Testing, FIT@HCMUS.

## Start Here

1. Mở [Deliverables Checklist](docs/Deliverables_Checklist.md) để chọn đầu ra cần làm và xem phần còn thiếu.
2. Đọc [Project Context](CONTEXT.md) cho scope, ownership và experiment contract. Khi dùng agent, đọc [Agent Instructions](AGENTS.md).
3. Sửa trực tiếp tài liệu tại đường dẫn trong bảng dưới. Mỗi đầu ra có một bản nguồn đang làm.

**Current work:** Docs reorganization đã hoàn tất theo xác nhận người dùng. [Source Audit](docs/Source_Audit.md) đã hoàn tất kiểm chứng kỹ thuật môi trường và baseline/manual/AI; SUT và platform activity mới bàn ở session riêng.

## Working Documents

| Output | Working source |
|---|---|
| Requirements và checklist | [Requirements](requirements/Seminar_Requirements_Consolidated.md), [Checklist](docs/Deliverables_Checklist.md) |
| Proposal ngắn | [Tool Survey Proposal](docs/Tool_Survey_Proposal.md) |
| Khảo sát chi tiết | [Tool Survey](docs/Tool_Survey.md) |
| Seminar proposal | [Seminar Proposal](docs/Seminar_Proposal.md) |
| User guide | [User Guide](docs/User_Guide.md) |
| Báo cáo | [Seminar Report](docs/Seminar_Report.md) |
| Audit source và thực nghiệm | [Source Audit](docs/Source_Audit.md) |
| Demo | [Demo Script](docs/Demo_Script.md), [Video Link](docs/Demo_Video_Link.md) |
| Slides và transcript | [Slides workspace](docs/slides/README.md) |
| Activity | [Activity workspace](activity/README.md) |
| AI audit và disclosure | [AI audit workspace](ai-audit/README.md) |
| Đóng góp | [Contribution workbook](docs/Contribution_Summary.xlsx) |
| Evidence và lịch sử | [Evidence index](evidence/README.md) |

Có file không đồng nghĩa đã kiểm chứng hoặc được chấp nhận. Guide, report, demo và slides sẽ được rà kỹ sau audit source và quyết định activity. PDF là export theo phiên bản; sau khi sửa nguồn cần export lại, không chỉnh hai nội dung độc lập. Bản PDF hiện có chưa được tái xuất trong lần tổ chức repo này.

## Working Rules

Tổ chức theo deliverables, chỉnh tại chỗ. Không tạo thêm bản theo stage, contribution mới cho cùng tài liệu, draft hoặc final song song. Các contribution cũ được giữ như hồ sơ tham chiếu trong evidence. Tracker giữ assignee và tiến độ; việc di dời không thay phân công hoặc xác nhận cá nhân.

Snapshots trong `submission/` giữ nguyên, không dùng làm nơi sửa hàng ngày. Có snapshot chưa chứng minh đã nộp hoặc đã được review. Raw reports, logs và prompts giữ nội dung lịch sử; tra đường dẫn cũ qua [migration manifest](evidence/coordination/Repository_Migration_Manifest.json).

## Repositories

- [Seminar documentation](https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness): tài liệu và evidence.
- [EShop research SUT](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness): source, tests, fixtures và mutation config.
- [Previous workshop starter](https://github.com/tkob-team/eshop-sut-workshop): thiết kế activity cũ, chưa phải lựa chọn cho activity mới.

## Team

Lê Tấn Hiệp, Tống Dương Thái Hòa, Nguyễn Phúc Hoàng.

## License

Repo chưa công bố giấy phép riêng. Nguồn giảng viên, SUT và tài liệu tham khảo giữ thông tin tác giả và giấy phép gốc.
