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
| Họ tên sinh viên:              | Lê Tấn Hiệp |
| MSSV:                          | 23120255 |

## 2. Câu hỏi Suy ngẫm

### 1. AI đã hỗ trợ công việc của bạn như thế nào?

*Mô tả cụ thể AI đóng góp ở đâu trong project: thiết kế test, brainstorm scenario, sinh code, phân tích log, triage defect, viết tài liệu, chuẩn bị slide, v.v.*

Tôi dùng Claude cho ghi chú nghiên cứu, assertion tutorial và quy trình test Cart. Claude Code hỗ trợ thực thi trong repository, báo cáo và công cụ ghi prompt log. Các run tutorial C01 của tôi cung cấp output thực tế trên máy cá nhân, còn các run Agent về sau được ghi riêng. Sự hỗ trợ này kết nối câu hỏi về đặc tả với các test cụ thể và báo cáo mutant, thay vì chỉ tạo phần diễn giải.

### 2. Bạn chấp nhận / từ chối / sửa gì từ đầu ra AI?

*Liệt kê đề xuất AI bạn dùng, đề xuất bạn loại bỏ, và cách bạn điều chỉnh cho phù hợp với spec, nguyên tắc ISTQB, hoặc phân tích của bạn.*

Tôi chấp nhận code assertion tutorial và năm assertion AI cho Cart. Tôi từ chối phần giải thích dự đoán một mutant hằng số số học mà Stryker không sinh ra. Tôi sửa phần diễn giải SRS bị thiếu, giả định workspace theo ngày và các claim gây hiểu nhầm trong header G01. Công cụ trích xuất log cũng cần sửa để xử lý lệnh local, phiên trống và prompt lặp.

### 3. Bạn nhận ra lỗi / bias / giới hạn nào trong đầu ra AI?

*Ví dụ cụ thể: AI bịa hàm, sai boundary, miss security case, hiểu sai metric (p95 vs top 5%), bịa trích dẫn, v.v.*

Giới hạn chính là suy luận tự tin khi thiếu context. Việc bỏ sót README.md dẫn đến các câu hỏi scope không đúng. Một số oracle Cart dùng mảng theo cấu trúc implementation hoặc các trường lỗi mà đặc tả không định nghĩa chính xác. Số mutant bị kill cao hơn cũng có thể phản ánh tập kịch bản test rộng hơn, thay vì một phương pháp sinh test tốt hơn.

### 4. Bạn xác minh thông tin / nguồn / claim của AI như thế nào?

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, tra RFC, hỏi TA, đối chiếu công cụ khác, thực thi trên SUT thật).*

Tôi tính các giá trị kỳ vọng cho tutorial, chạy Jest và Stryker trên máy cá nhân, rồi đối chiếu thông tin killedBy thực tế. Với các run -cc về sau, tôi dùng báo cáo thực thi và nguồn tham chiếu đã lưu. Bản so sánh tách Killed khỏi Timeout và xác định các defect gốc mà một test đúng không nên che giấu.

### 5. Bạn học được điều gì qua project này mà nếu chỉ chấp nhận đầu ra AI thì sẽ không học được?

*Suy ngẫm về đóng góp trí tuệ của chính bạn. AI đã định hình (hay không) sự hiểu của bạn về testing như thế nào? Một nguyên tắc bạn sẽ giữ cho tương lai?*

Bản so sánh đã ghi lại của tôi chỉ ra bài học chính: oracle có thể kill nhiều mutant hơn bằng cách phụ thuộc vào chi tiết implementation hiện tại, trong khi kém bám sát đặc tả nghiệp vụ hơn. Các kịch bản manual bổ sung cũng làm thay đổi phạm vi so sánh. Tôi sẽ làm rõ requirement, input giúp phân biệt hành vi và trạng thái quan sát được trước khi xem một kill là bằng chứng về chất lượng test. Một bài học khác đã ghi nhận liên quan đến mutant sửa lỗi: survivor có thể bộc lộ defect gốc thay vì test yếu. Giữ lại defect đó và oracle đúng hữu ích hơn việc đổi expected result chỉ để tăng mutation score chính thức.

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
