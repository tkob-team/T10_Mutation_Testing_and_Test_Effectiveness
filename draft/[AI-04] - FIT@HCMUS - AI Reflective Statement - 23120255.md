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

Ở S4, Claude soạn bản nháp guide, report và kịch bản demo phần Cart, còn Claude Code chạy lại guide Cart và Coupons, ghép ba phần thành User Guide và viết script kiểm số liệu.

### 2. Bạn chấp nhận / từ chối / sửa gì từ đầu ra AI?

*Liệt kê đề xuất AI bạn dùng, đề xuất bạn loại bỏ, và cách bạn điều chỉnh cho phù hợp với spec, nguyên tắc ISTQB, hoặc phân tích của bạn.*

Tôi chấp nhận code assertion tutorial và năm assertion AI cho Cart. Tôi từ chối phần giải thích dự đoán một mutant hằng số số học mà Stryker không sinh ra. Tôi sửa phần diễn giải SRS bị thiếu, giả định workspace theo ngày và các claim gây hiểu nhầm trong header G01. Công cụ trích xuất log cũng cần sửa để xử lý lệnh local, phiên trống và prompt lặp.

Ở S4, tôi chấp nhận phần lớn tài liệu AI soạn, nhưng yêu cầu chuyển sang tiếng Việt và đổi nhãn "Quyết định đã chốt" thành "Quyết định của bản ghép" vì Hòa chưa xác nhận từng điểm. Tôi không dùng handoff đầu phiên vì nó sai 4 điểm so với repo, và loại một run bị lỗi do script áp snippet sai.

### 3. Bạn nhận ra lỗi / bias / giới hạn nào trong đầu ra AI?

*Ví dụ cụ thể: AI bịa hàm, sai boundary, miss security case, hiểu sai metric (p95 vs top 5%), bịa trích dẫn, v.v.*

Giới hạn chính là suy luận tự tin khi thiếu context. Việc bỏ sót README.md dẫn đến các câu hỏi scope không đúng. Một số oracle Cart dùng mảng theo cấu trúc implementation hoặc các trường lỗi mà đặc tả không định nghĩa chính xác. Số mutant bị kill cao hơn cũng có thể phản ánh tập kịch bản test rộng hơn, thay vì một phương pháp sinh test tốt hơn.

Ở S4, Claude Code áp snippet sai hai lần vì file dùng CRLF và vì escaping trong PowerShell, và khối lệnh soạn cho tôi không ghi được output của Jest/Stryker vào log. Handoff AI viết cuối S3 cũng đã lỗi thời khi sang S4: hash cũ, số dòng sai và bỏ sót lỗi package.json trên main.

### 4. Bạn xác minh thông tin / nguồn / claim của AI như thế nào?

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, tra RFC, hỏi TA, đối chiếu công cụ khác, thực thi trên SUT thật).*

Tôi tính các giá trị kỳ vọng cho tutorial, chạy Jest và Stryker trên máy cá nhân, rồi đối chiếu thông tin killedBy thực tế. Với các run -cc về sau, tôi dùng báo cáo thực thi và nguồn tham chiếu đã lưu. Bản so sánh tách Killed khỏi Timeout và xác định các defect gốc mà một test đúng không nên che giấu.

Ở S4, tôi tự chạy lại guide Coupons trên máy mình và so với run của Claude Code: 0 mutant khác trạng thái. Tôi kiểm hash của candidate G02 trước khi tin vào provenance, đọc REPORT của từng run -cc, và dùng script so 36 con số trong User Guide với mutation.json trước khi chấp nhận.

### 5. Bạn học được điều gì qua project này mà nếu chỉ chấp nhận đầu ra AI thì sẽ không học được?

*Suy ngẫm về đóng góp trí tuệ của chính bạn. AI đã định hình (hay không) sự hiểu của bạn về testing như thế nào? Một nguyên tắc bạn sẽ giữ cho tương lai?*

[Tấn Hiệp tự dán đoạn Q5]

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

| Họ tên sinh viên (in hoa): | LÊ TẤN HIỆP |
|----------------------------|----------------------------------------|
| MSSV:                      | 23120255 |
| Lớp / Khoá:                | Software Testing - CQ2023/3 |
| Môn học:                   | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên:                | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| Ngày:                      | 23/10/2026 |
| Chữ ký:                    | <img src="signature_Hiep.png" alt="Chữ ký Lê Tấn Hiệp" width="160"> |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
