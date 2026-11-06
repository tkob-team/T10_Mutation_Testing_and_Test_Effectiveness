# Agent Instructions

## Start Here

1. Đọc [CONTEXT](CONTEXT.md) để nắm scope, quyết định, ownership và experiment contract.
2. Đọc [Checklist](docs/Deliverables_Checklist.md) để chọn đúng đầu ra; khi cần đối chiếu yêu cầu, đọc [Requirements](requirements/Seminar_Requirements_Consolidated.md).
3. Mở bản nguồn từ README hoặc checklist và chỉnh trực tiếp. Khi cần run, provenance hoặc contributions cũ, tra [Evidence index](evidence/README.md) và migration manifest.
4. Trước khi sửa hoặc thao tác Git, xác minh Git root và status tại đúng repo. Bàn giao artifacts, validation và phần chưa xác minh.

## Working Rules

- DO NOT SPAWN SUBAGENT OR USE COMPUTER USE WITHOUT ASKING. Chỉ thực hiện khi người dùng trực tiếp cho phép.
- Repo này tổ chức theo deliverables. Không tạo workflow hoặc bản docs mới theo stage; không duy trì draft/final/contributions song song cho một bản nguồn.
- Giữ thay đổi ngoài scope. Source, tests và mutation config ở repo SUT; chỉ sửa tại đó khi task yêu cầu. Tracker là nguồn assignee/status; không dùng Git author thay xác nhận đóng góp.
- Nguồn giảng viên trong requirements và mẫu AI trong ai-audit/originals giữ nguyên. Requirements consolidated phân biệt nguồn GV với quyết định người dùng. Generated references chỉ dùng tham khảo.
- Snapshots submission và raw reports, logs, source snapshots, prompts giữ nguyên nội dung. Stage labels và artifact IDs lịch sử dùng để truy nguồn, không là hướng dẫn làm việc hiện hành.
- Scope thay đổi cần quyết định có nguồn. Chỉ dẫn rõ trong chat là authorization cho scope tương ứng; không hỏi lại cho thao tác đã được giao.
- English headings, identifiers, filenames và status codes; prose nội bộ bằng tiếng Việt. Ngôn ngữ deliverables theo requirements. Không dùng middle dot, em dash hoặc ký hiệu trang trí khi viết docs.
- Claims, execution, feedback, attendance, review, đóng góp và chữ ký cần evidence thật. Dùng Proposed, Pending, Missing hoặc Not run khi chưa xác minh.
- AI code/tests cần người review và chạy kiểm chứng. Ghi AI usage khi làm; không đưa student IDs, private keys hoặc course secrets vào prompts. Reflection và chữ ký do thành viên thực hiện.
- Validation phù hợp đầu ra: docs kiểm tra links và contract; di dời kiểm tra file accounting và hashes; code/experiments dùng scripts và lưu evidence tại repo phù hợp.
- Chỉ stage, commit hoặc push khi người dùng yêu cầu rõ; authorization cho commit không đồng nghĩa được push. Không chạy restore/clean/reset làm mất working tree của người dùng.

## Context Updates

CONTEXT giữ scope, quyết định và experiment contract. Checklist giữ bản đồ đầu ra và gaps được kiểm kê, không thay tiến độ tracker. README là entrypoint; evidence giữ records lịch sử. Không biến Agent execution thành member self-run, human review hoặc acceptance.
