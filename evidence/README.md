# Evidence Index

Thư mục này giữ evidence và hồ sơ tham chiếu, không phải các bản tài liệu đang chỉnh hàng ngày. Mở bản nguồn từ [README repo](../README.md).

| Group | Content |
|---|---|
| [Domain runs](experiments/domain-runs/) | Baseline manifest, domain logs, raw reports, source/config snapshots |
| [Integration and reproduction](experiments/integration-and-reproduction/) | Joint comparison và guide reproduction |
| [Contributions](contributions/) | Nội dung từng tác giả đã bàn giao; giữ attribution |
| [Verification](verification/) | Records review và reproduction lịch sử |
| [Source audit 2026-11-06](verification/source-audit-2026-11-06/) | New input snapshots, commands, test matrix, mutation reports và driver probes; trạng thái theo Source Audit |
| [Research](research/) | Notes, tool surveys và generated references chỉ để tham khảo |
| [Document history](document-history/) | Bản ghép hoặc proposal trước khi chọn bản nguồn hiện tại |
| [Previous activity sandbox](activity/previous-sandbox/) | Runner, candidates và verification của thiết kế cũ |
| [T10 Mutation Lab rebuild](activity/rebuild-validation-2026-11-10/README.md) | Reference controls, HTTP/load qualification, crash recovery và backup restore trên Docker |
| [Coordination](coordination/) | Context cũ, task map, Git log snapshot và hồ sơ di dời |
| [Previous workflow templates](previous-workflow/templates/) | Templates lịch sử, không dùng làm workflow hiện hành |

## Paths and Preservation

[Migration manifest](coordination/Repository_Migration_Manifest.json) ghi old path, new path và SHA-256 trước/sau. Raw reports, logs, prompts và source snapshots giữ bytes gốc. Tên run và artifact IDs lịch sử có thể còn nhãn stage; chúng không quy định việc mới.

Relative links trong raw snapshots hoặc commands cũ có thể vẫn dùng paths trước khi chuyển. Tra map khi mở thủ công. Scripts trong evidence là snapshots lịch sử; chưa xác nhận chạy lại từ vị trí mới. Không sửa raw data để làm đẹp cấu trúc hoặc nâng kết quả.

[Validation record](coordination/Repository_Migration_Validation.json) chỉ xác nhận cấu trúc, accounting, hashes và links của tài liệu thao tác. Nó không xác nhận source tests, mutation runs, human review hoặc audience activity.
