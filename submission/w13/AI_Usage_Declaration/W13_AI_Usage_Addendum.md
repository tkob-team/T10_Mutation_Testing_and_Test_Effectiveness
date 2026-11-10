# W13 AI Usage Addendum

## Scope

Bổ sung provenance cho tài liệu w13 và các kết quả kỹ thuật được trích trong bản mới. Dùng addendum khi thành viên rà AI-02, AI-03 và AI-04 theo đúng phần mình thực hiện. Mẫu cá nhân cần xác nhận và chữ ký của đúng người theo phiên bản chính thức.

| Artifact | Tool and task | Output and verification |
|---|---|---|
| Source Audit 06/11/2026 | OpenAI Codex hỗ trợ audit test harness và chạy các profile trên cùng production reference. | Có reports, counts, invalid-mutant reasons và đối chứng ở mức assertion. Executor là Agent. [Source Audit](../../../docs/Source_Audit.md) |
| Mutation Lab | OpenAI Codex hỗ trợ triển khai và qualification trên Docker Compose. | Evidence ghi 69 controls pass original và fail tại assertion tương ứng trên mutant. Pilot lớp và human review còn Pending. [Activity Validation](../../../evidence/activity/rebuild-validation-2026-11-10/README.md) |
| Slide Markdown và transcript | OpenAI Codex chuyển nội dung từ deck w13 sang Markdown và đối chiếu speaker notes. | 22 trang và 21 notes theo file nguồn. [Slides](../T10_Mutation_Testing_Slides.md) |
| Report, guide và activity w13 | OpenAI Codex rà provenance, viết guide tiếng Anh, tách hai joint runs, chuẩn bị năm diff checkout và xuất PDF. | Report giữ số lịch sử và audit riêng. Năm diff khớp runner controls đã có. [Report](../Seminar_Report.md), [User Guide](../User_Guide.md), [Facilitator Guide](../Facilitator_Guide.md) |
| Final Reflection | OpenAI Codex tổng hợp các quan sát kỹ thuật thành bản tiếng Anh để nhóm thảo luận. | Bản 300 từ chờ tác giả bổ sung hoặc xác nhận trải nghiệm cá nhân. [Discussion draft](../Final_Reflection.md) |

Model phục vụ Codex trong lượt cập nhật tài liệu chưa được xác nhận. Tool và model của các thí nghiệm trước lấy theo evidence của từng run. Review nội dung, verdict cá nhân và ký theo bản cuối còn Pending.
