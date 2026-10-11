# Agent Instructions

## Start Here

1. Đọc [CONTEXT.md](CONTEXT.md) để nắm scope, quyết định, ownership theo stage và experiment contract.
2. Đọc [Requirements](docs/requirements/Seminar_Requirements_Consolidated.md) cho REQ liên quan; đối chiếu nguồn giảng viên khi có khác biệt.
3. Nhận Task ID và đầu vào từ tracker/người giao việc. Đọc [Working Guide](docs/Working_Guide.md), tra [Task Output Map](docs/Task_Output_Map.md) để tìm output/template. Thiếu đầu vào cần thiết thì hỏi người giao việc.
4. Kiểm tra Git root/status tại đúng repo trước khi sửa; khi bàn giao báo artifacts, validation và phần Pending.

## Working Rules

- DO NOT SPAWN SUBAGENT WITHOUT ASKING. Chỉ gọi sau khi người dùng trực tiếp cho phép.
- Seminar docs/evidence ở repo này; SUT/tests/config ở repo EShop theo CONTEXT. Giữ thay đổi ngoài scope và progress hiện có; chỉ đổi phân công khi được yêu cầu.
- Giữ nguyên ba requirements và ba AI forms giảng viên. Generated references ở `research/s1/reference/` chỉ dùng tham khảo.
- Scope/quyết định chung cần đề xuất cụ thể để review trước khi thay đổi. Yêu cầu rõ của người dùng là authorization cho scope tương ứng.
- English headings, identifiers, filenames và status codes; prose nội bộ bằng tiếng Việt. Deliverables English theo requirements.
- Claims cần sources; execution, feedback, attendance, đóng góp, reflection và chữ ký phải có evidence thật. Ghi rõ Proposed, Pending hoặc Not run khi chưa xác minh.
- AI code/tests cần người review và chạy kiểm chứng. Ghi AI usage khi làm; giữ student IDs/private keys/course secrets ngoài prompts.
- Validation theo đầu ra: docs kiểm tra links/contract; code dùng scripts hiện tại; experiments giữ run evidence. Repo tài liệu không có test command riêng.

## Context Updates

CONTEXT giữ glossary, quyết định và experiment contract; tracker giữ assignee/status; Working Guide giữ quy ước bàn giao. Cập nhật nguồn có thẩm quyền và pointers liên quan, giữ evidence/source của quyết định; tạo ADR chỉ khi có tradeoff thực sự cần lưu riêng.
