# **Traditional Mutation Testing Tool**

*Seminar T10 — Mutation Testing & Test Effectiveness · Tài liệu lý thuyết*

# **1\. Định nghĩa**

Công cụ mutation testing truyền thống (Stryker, PIT, mutmut...) tự động **sinh ra các phiên bản lỗi nhỏ của code (mutant)** theo một **tập luật cố định** gọi là mutation operator. Sau đó nó **chạy bộ test với từng mutant** để xem test có phát hiện được lỗi hay không.

Đặc trưng: công cụ hoạt động hoàn toàn theo luật và cho **kết quả tất định**, tức cùng code, cùng test thì chạy lần nào cũng ra một kết quả.

**Quy trình chung:**

1. Phân tích code (AST hoặc bytecode).

2. Áp mutation operator để sinh mutant, ví dụ đổi \> thành \>=, && thành ||, xóa một block.

3. Dry run: chạy test trên code gốc, test phải pass hết.

4. Với mỗi mutant, chạy những test liên quan.

5. Phân loại mutant: **Killed / Survived / Timeout / No coverage / Compile error**.

6. Xuất báo cáo và tính **mutation score \= killed / tổng mutant**.

# **2\. Tại sao cần thiết**

* **Code coverage không đủ.** Coverage chỉ chứng minh code đã được chạy, không chứng minh test có kiểm tra kết quả. Một test không có expect nào vẫn có thể đạt 100% coverage.

* **Cần thước đo khách quan cho chất lượng test.** Mutation score là con số đo được, lặp lại được và so sánh được qua thời gian.

* **Tìm đúng chỗ test yếu.** Mỗi mutant sống sót chỉ ra một dòng code cụ thể và một thay đổi cụ thể mà test chưa bắt được.

* **Làm "trọng tài" cho AI.** Muốn biết assertion do AI sinh ra có kill được mutant không, phải chạy lại công cụ truyền thống.

# **3\. Ý nghĩa**

* Chuyển câu hỏi từ "code có được test chưa?" sang **"test có đủ nhạy để bắt lỗi không?"**

* Mutation score là thước đo **test effectiveness**, sát với khả năng bắt bug thật hơn coverage. Paper Google (2018) có trích nghiên cứu cho thấy khả năng phát hiện mutant tương quan với khả năng phát hiện lỗi thật.

* Mutant sống sót thường nằm ở **giá trị biên**, nên công cụ nhắc lập trình viên áp dụng boundary value analysis.

* Có thể đặt vào CI với ngưỡng thresholds.break, để build tự fail khi chất lượng test giảm.

# **4\. Điều traditional tool làm được mà AI không làm được**

| Traditional tool | AI (LLM) |
| :---- | :---- |
| **Tất định:** chạy lại vẫn ra đúng kết quả cũ | Mỗi lần trả lời có thể khác nhau |
| **Kiểm chứng thật:** chạy test và biết chắc mutant chết hay sống | Chỉ dự đoán, có thể tự tin nhưng sai (hallucination) |
| **Vét cạn có hệ thống:** áp mọi operator lên mọi vị trí trong phạm vi cấu hình | Dễ bỏ sót và không đảm bảo đầy đủ |
| **Số liệu chuẩn:** mutation score so sánh được giữa các lần chạy và giữa các nhóm | Không cho ra metric chuẩn |
| **Chạy offline, miễn phí, không gửi code ra ngoài** | Thường cần gửi code lên dịch vụ bên ngoài, có chi phí và rủi ro lộ mã nguồn |
| **Tích hợp CI ổn định:** dùng làm cổng kiểm tra tự động được | Kết quả không ổn định nên khó làm cổng kiểm tra |

# **5\. Điều traditional tool không làm được mà AI làm được**

| Hạn chế của traditional tool | AI có thể hỗ trợ |
| :---- | :---- |
| **Không hiểu ngữ nghĩa:** không biết mutant nào là equivalent (đổi code nhưng hành vi không đổi) | Đọc code, lập luận và đề xuất đâu là equivalent mutant |
| **Không viết test:** chỉ báo mutant sống, người phải tự viết assertion để kill | Đề xuất assertion hoặc test case để kill mutant |
| **Không biết mutant nào đáng quan tâm:** mutant ở console.log và mutant ở logic tính tiền được đối xử như nhau | Ưu tiên theo mức rủi ro nghiệp vụ, nhận ra code "arid" |
| **Không hiểu yêu cầu (spec):** mặc định coi code gốc là đúng | Đối chiếu với mô tả nghiệp vụ và phát hiện code có thể sai |
| **Không giải thích:** chỉ hiển thị diff của mutant | Giải thích bằng lời vì sao mutant sống và khách hàng nào bị ảnh hưởng |
| **Operator cứng:** chỉ sinh các lỗi cú pháp đơn giản | Sinh mutant "giống bug thật" hơn, sát ngữ cảnh nghiệp vụ |

# **6\. Hạn chế khác cần nêu**

* **Chậm:** số mutant nhân với thời gian chạy test suite. Đây là lý do Google chỉ mutate phần diff.

* **Sinh ra nhiều mutant nhiễu:** mutant ở log, import, timeout... sống sót nhưng không đáng sửa.

* **Gắn với ngôn ngữ:** mỗi hệ sinh thái cần công cụ riêng (Stryker cho JS/TS, PIT cho Java...).

* **Score cao chưa chắc test đúng:** nếu test được viết theo code sai, công cụ vẫn cho điểm cao.

# **7\. Kết luận**

Traditional tool và AI **bổ trợ nhau**, không cái nào thay được cái nào:

* **Traditional tool** trả lời "test có bắt được lỗi này không?", với độ chính xác tuyệt đối.

* **AI** trả lời "nên làm gì với lỗi này?": viết assertion nào, mutant này có đáng kill không. Câu trả lời của AI phải được kiểm chứng lại.

Quy trình gợi ý cho EShop:

Stryker tìm mutant sống → AI phân loại và đề xuất assertion → Stryker chạy lại để xác minh

# **Tài liệu tham khảo**

* Petrović & Ivanković, "State of Mutation Testing at Google", ICSE-SEIP 2018\. https://research.google.com/pubs/archive/46584.pdf

* Jia & Harman, "An Analysis and Survey of the Development of Mutation Testing", IEEE TSE 2011\.

* Stryker Mutator documentation. https://stryker-mutator.io/docs/