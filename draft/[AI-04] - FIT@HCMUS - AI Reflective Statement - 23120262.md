**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC15003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# Bài Suy ngẫm về Sử dụng AI

*Bắt buộc cho Project lớn, Seminar, Đồ án Tốt nghiệp. Áp dụng khi bài nộp ở Cấp độ AI 4 hoặc 5.*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC13003 Kiểm chứng Phần mềm.*

## 1. Thông tin Project & Tác giả

| Mục                            | Giá trị                                |
|--------------------------------|----------------------------------------|
| Môn học:                       | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Tên Project / Đồ án:           | T10: Mutation Testing & Test Effectiveness |
| Thành viên nhóm (nếu là nhóm): | Lê Tấn Hiệp; Tống Dương Thái Hòa; Nguyễn Phúc Hoàng |
| Họ tên sinh viên:              | Tống Dương Thái Hòa |
| MSSV:                          | 23120262 |

## 2. Câu hỏi Suy ngẫm

### 1. AI đã hỗ trợ công việc của bạn như thế nào?

*Mô tả cụ thể AI đóng góp ở đâu trong project: thiết kế test, brainstorm scenario, sinh code, phân tích log, triage defect, viết tài liệu, chuẩn bị slide, v.v.*

Tôi dùng Codex để hỗ trợ nghiên cứu coverage/metric, fixtures và tests Coupons, tích hợp và phân tích mutation. Công cụ cũng soạn phần giải thích Stage 3 chung, Seminar Report và User Guide. Tôi định hướng ưu tiên chất lượng, chọn phương án thay thế bằng Codex dùng cùng context và xác định scope mở rộng gồm bốn nhóm manual, tám nhóm Agent.

### 2. Bạn chấp nhận / từ chối / sửa gì từ đầu ra AI?

*Liệt kê đề xuất AI bạn dùng, đề xuất bạn loại bỏ, và cách bạn điều chỉnh cho phù hợp với spec, nguyên tắc ISTQB, hoặc phân tích của bạn.*

Tôi yêu cầu sửa phần giải thích Stage 3 để bao quát cả ba thành viên, đơn giản hóa bìa báo cáo, giữ thuật ngữ kỹ thuật tiếng Anh và bỏ danh sách đường dẫn trong phụ lục. Tôi cũng yêu cầu User Guide độc lập. Các tập test Coupons ban đầu và mở rộng đã lưu đều có AI hỗ trợ, với context sinh và helpers dùng chung được công bố.

### 3. Bạn nhận ra lỗi / bias / giới hạn nào trong đầu ra AI?

*Ví dụ cụ thể: AI bịa hàm, sai boundary, miss security case, hiểu sai metric (p95 vs top 5%), bịa trích dẫn, v.v.*

Hai biến thể Coupons ban đầu kill cùng hai mutant usage-limit. Tăng các tập lên 35 và 40 test không tạo thêm kill. Các defect gốc về minimum, expiry và percentage giới hạn tập test có thể pass. Context sinh dùng chung cũng khiến không thể diễn giải đây là so sánh độc lập giữa con người và AI. Những quan sát này được giữ lại, không thay bằng claim về model vượt trội.

### 4. Bạn xác minh thông tin / nguồn / claim của AI như thế nào?

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, tra RFC, hỏi TA, đối chiếu công cụ khác, thực thi trên SUT thật).*

Quy trình Agent đã lưu kiểm tra giá trị kỳ vọng theo SRS/API, chạy test gốc và các profile defect riêng, kiểm tra hashes của source được bảo vệ và so sánh mutant signatures. Thống kê báo cáo được tính lại từ JSON. Đây là các bản ghi Agent thực thi; đóng góp đã ghi nhận của tôi gồm lựa chọn scope và các yêu cầu sửa đã mô tả ở trên.

### 5. Bạn học được điều gì qua project này mà nếu chỉ chấp nhận đầu ra AI thì sẽ không học được?

*Suy ngẫm về đóng góp trí tuệ của chính bạn. AI đã định hình (hay không) sự hiểu của bạn về testing như thế nào? Một nguyên tắc bạn sẽ giữ cho tương lai?*

Bản so sánh hỗ trợ một nguyên tắc thực tế: xác định oracle nghiệp vụ được tài liệu nêu rõ và quan sát giúp phân biệt hành vi trước khi diễn giải kết quả mutant. Lưu giới hạn ba vào dữ liệu làm lộ các thay đổi mà input một không phân biệt được. Nhiều kịch bản hơn không nhất thiết tạo thêm kill, và context dùng chung không chứng minh quá trình sinh độc lập. Đóng góp hữu ích vì vậy là mối liên hệ rõ ràng giữa requirement, input, trạng thái được lưu và kết quả đã xác minh. Giữ source gốc cố định cũng giúp diễn giải phép so sánh. Các nguyên tắc này dựa trên những case Coupons đã ghi nhận, thay vì claim rằng một model hoặc tác giả luôn tốt hơn.

## 3. Các Cấp độ AI đã dùng

Đánh dấu mọi cấp độ đã áp dụng ở bất kỳ giai đoạn nào:

- [ ] Cấp 1 – Không AI

- [x] Cấp 2 – AI cho chuẩn bị

- [x] Cấp 3 – AI cho phản hồi / chỉnh sửa

- [x] Cấp 4 – AI hỗ trợ sản xuất

- [x] Cấp 5 – AI là phương pháp cốt lõi

## 4. Chữ ký Tác giả

*Bằng việc ký dưới đây, tôi cam đoan bài suy ngẫm này trung thực và phản ánh chính xác cách AI được dùng trong project. Tôi chịu hoàn toàn trách nhiệm trí tuệ cho sản phẩm cuối.*

## Chữ ký

| Họ tên sinh viên (in hoa): |                                        |
|----------------------------|----------------------------------------|
| MSSV:                      |                                        |
| Lớp / Khoá:                |                                        |
| Môn học:                   | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên:                |                                        |
| Ngày:                      |                                        |
| Chữ ký:                    |                                        |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
