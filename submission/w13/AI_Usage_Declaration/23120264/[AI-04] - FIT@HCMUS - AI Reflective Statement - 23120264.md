<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

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
| Họ tên sinh viên:              | Nguyễn Phúc Hoàng |
| MSSV:                          | 23120264 |

## 2. Câu hỏi Suy ngẫm

### 1. AI đã hỗ trợ công việc của bạn như thế nào?

*Mô tả cụ thể AI đóng góp ở đâu trong project: thiết kế test, brainstorm scenario, sinh code, phân tích log, triage defect, viết tài liệu, chuẩn bị slide, v.v.*

Tôi yêu cầu Claude Code hỗ trợ nghiên cứu equivalent mutants, giới hạn và các cách tiếp cận AI, sau đó gộp task tìm hiểu công cụ liên quan vào công việc này. Tôi cung cấp vị trí SUT, yêu cầu thực thi sandbox và lưu bản ghi audit nguyên văn. AI tạo ghi chú, ví dụ, code test/harness và phân tích mutation; một yêu cầu Claude CLI về sau tạo bộ test đề xuất cho biên tuổi. Sau khi freeze baseline chung, tôi yêu cầu Claude Code checkout commit đó, tự chạy phân tích mutation Auth và ánh xạ từng mutant tới route tương ứng.

### 2. Bạn chấp nhận / từ chối / sửa gì từ đầu ra AI?

*Liệt kê đề xuất AI bạn dùng, đề xuất bạn loại bỏ, và cách bạn điều chỉnh cho phù hợp với spec, nguyên tắc ISTQB, hoặc phân tích của bạn.*

Tôi chọn scope nghiên cứu kết hợp và quy trình sandbox/SUT. Các ghi chú đã lưu có bản sửa thống kê mutant và quy tắc khóa FR-02, trong đó các chỉnh sửa của Agent được xác định rõ. Assertion C03 được thực thi trên code gốc và mutant được chọn. Với run baseline, tôi chỉ chấp nhận số đếm mutant sau khi run thứ hai và run Windows khớp nhau, đồng thời không xem mức tăng từ 73.45% lên 74.36% là evidence cho assertion tốt hơn. Phần giải thích tùy chọn về mutation hằng số số học không được dùng làm bằng chứng cho mutant thực tế đã sinh.

### 3. Bạn nhận ra lỗi / bias / giới hạn nào trong đầu ra AI?

*Ví dụ cụ thể: AI bịa hàm, sai boundary, miss security case, hiểu sai metric (p95 vs top 5%), bịa trích dẫn, v.v.*

Ghi chú ban đầu bỏ sót quy tắc khóa đã có trong SRS và đếm thiếu một lần chuyển Killed-to-Timeout. Một số bài báo được tham khảo qua abstract, nên giới hạn những claim có thể hỗ trợ. Equivalent candidate cần miền đầu vào được công bố và lập luận có thể bảo vệ; chỉ riêng survivor không chứng minh tính tương đương.

### 4. Bạn xác minh thông tin / nguồn / claim của AI như thế nào?

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, tra RFC, hỏi TA, đối chiếu công cụ khác, thực thi trên SUT thật).*

Quy trình xác minh đã ghi nhận kiểm tra nguồn tham chiếu, chạy Jest/Stryker, so sánh mutant signatures và giữ output lệnh. Run Auth tạm thời báo Killed, Timeout và RuntimeError riêng. Một run Windows chạy lại về sau thay đổi một số phân loại lỗi/timeout mà không thêm kill do assertion, nên không thể quy các thay đổi đó cho assertion mạnh hơn. Khi tôi chạy lại commit đã freeze trên macOS hai lần, cả hai đều tái lập cùng 125 trạng thái mutant như run Windows đó, cho thấy thay đổi phân loại đến từ cách thiết lập baseline chung thay vì máy chạy.

### 5. Bạn học được điều gì qua project này mà nếu chỉ chấp nhận đầu ra AI thì sẽ không học được?

*Suy ngẫm về đóng góp trí tuệ của chính bạn. AI đã định hình (hay không) sự hiểu của bạn về testing như thế nào? Một nguyên tắc bạn sẽ giữ cho tương lai?*

Công việc đã lưu hỗ trợ một phân biệt quan trọng giữa surviving mutant, equivalent candidate và defect của implementation gốc. Mỗi loại cần một lập luận khác nhau. Input biên có thể bác bỏ claim về tính tương đương, còn requirement được sửa lại có thể thay đổi cách diễn giải toàn bộ ví dụ. Vì vậy, test oracle, miền đầu vào đã công bố và evidence thực thi thực tế cần được xem xét trước điểm số của từng điều kiện test cụ thể. Nguyên tắc này kết nối nghiên cứu equivalent mutant với các case Auth và giải thích vì sao việc đọc nguồn, truy vết và so sánh từng trạng thái vẫn cần thiết ngay cả khi code được sinh chạy thành công.

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

| Họ tên sinh viên (in hoa): | NGUYỄN PHÚC HOÀNG |
| :---- | :---- |
| **MSSV:** | 23120264 |
| **Lớp / Khoá:** | Software Testing \- CQ2023/3 |
| **Môn học:** | CS423 / CSC13003 - Kiểm chứng Phần mềm |
| **Giảng viên:** | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| **Ngày:** | 23/10/2026 |
| **Chữ ký:** | ![](signature_Hoang.jpg) |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
