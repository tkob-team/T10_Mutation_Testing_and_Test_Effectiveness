# T10 - Đề xuất seminar: Mutation Testing & Test Effectiveness

**Giai đoạn:** Stage 1  
**Trạng thái:** Chờ góp ý  
**Nhóm / lớp:** 12 / Kiểm thử phần mềm - CQ2023/3

| MSSV | Thành viên |
|---|---|
| 23120255 | Lê Tấn Hiệp |
| 23120262 | Tống Dương Thái Hòa |
| 23120264 | Nguyễn Phúc Hoàng |

## Tóm tắt

Nhóm tìm hiểu cách mutation testing đánh giá khả năng phát hiện lỗi của bộ kiểm thử, đồng thời khảo sát vai trò của AI trong việc đề xuất assertion (điều kiện kiểm tra kết quả). Seminar dự kiến kết hợp lý thuyết, giới thiệu công cụ, demo trên EShop và bài tập để người học vận dụng ở mức cơ bản.

## 1. Giới thiệu

Code coverage cho biết phần mã nào đã được chạy qua, nhưng chưa cho biết test có phát hiện được hành vi sai hay không. Mutation testing giúp đánh giá khía cạnh này bằng cách tạo những thay đổi nhỏ trong mã nguồn rồi kiểm tra phản ứng của bộ test.

Mục tiêu của nhóm là giúp người học hiểu phương pháp, đọc được báo cáo mutation, cải thiện test và biết cách kiểm chứng assertion do AI đề xuất [3].

## 2. Cơ sở lý thuyết

Nhóm dự kiến trình bày các nội dung sau:

- **Mutation testing:** mục đích, phạm vi áp dụng; mutant là phiên bản mã đã bị thay đổi, mutation operator là quy tắc tạo thay đổi đó.
- **Kết quả kiểm thử:** mutant bị phát hiện (*killed*), chưa bị phát hiện (*survived*), không được test đi qua và chạy quá thời gian [5].
- **Mutation score và test effectiveness:** cách đo, cách đọc kết quả và mối liên hệ với code coverage.
- **Equivalent mutants:** những thay đổi không làm khác hành vi trong phạm vi xét; vì sao mutant sống sót chưa chắc đồng nghĩa với test yếu.

Ví dụ minh họa: đổi điều kiện `amount >= threshold` thành `amount > threshold`. Test với giá trị lớn hơn ngưỡng có thể không phát hiện thay đổi; test tại đúng ngưỡng sẽ giúp phân biệt hai hành vi.

## 3. Phương pháp

Quy trình được giới thiệu gồm: **chạy bộ test ban đầu → tạo mutant → chạy lại test → phân tích kết quả → bổ sung assertion → đánh giá lại**.

Nhóm sẽ nghiên cứu cách viết assertion thủ công và cách dùng AI hỗ trợ đề xuất trên cùng các mutant. Assertion phải phù hợp yêu cầu nghiệp vụ và được chạy kiểm chứng. Với equivalent mutants, nhận định của AI chỉ là gợi ý để nhóm phân tích thêm.

## 4. Tổng quan công cụ

Nhóm khảo sát hai hướng: công cụ mutation testing truyền thống và công cụ AI hỗ trợ tạo hoặc cải thiện test. Việc so sánh dựa trên chi phí, độ dễ học, mức phù hợp với EShop, khả năng AI và cộng đồng hỗ trợ [1]; kết quả được tổng hợp trong bảng khảo sát của nhóm.

Bộ công cụ triển khai gồm **StrykerJS** để thực hiện mutation testing và **Claude** để đề xuất assertion. Người dùng đã xác nhận giảng viên yêu cầu hai tool; các candidate khác chỉ phục vụ khảo sát. Scope thực nghiệm vẫn được ghi nhận qua S2. Lý do lựa chọn được trình bày trong [Tool Survey Proposal](Tool_Survey_Proposal.md).

## 5. Nội dung tìm hiểu và demo dự kiến

| Công cụ | Nội dung dự kiến trình bày |
|---|---|
| **StrykerJS** | Nguyên lý hoạt động; cài đặt và cấu hình; chạy mutation, đọc báo cáo; bổ sung test và đánh giá lại; ưu điểm, hạn chế và lỗi thường gặp [4]. |
| **Claude** | Chuẩn bị code, yêu cầu nghiệp vụ và thông tin mutant; đề xuất assertion; nhóm review, chạy kiểm chứng, chỉnh sửa và đánh giá kết quả. |

Với mỗi công cụ được chọn để demo, nhóm chuẩn bị ba mức: **thiết lập, sử dụng cơ bản và vận dụng nâng cao**. Hướng dẫn ghi các lỗi thực tế cùng cách xử lý và ít nhất 3 trường hợp công cụ có thể khiến người dùng hiểu sai kết quả.

### 5.1. Vận dụng trên EShop

Nhóm sử dụng [EShop đã fork](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness), dự kiến chọn một luồng liên quan đến giỏ hàng, mã giảm giá hoặc thanh toán để:

1. Chuẩn bị bộ test và tạo báo cáo mutation ban đầu bằng StrykerJS.
2. Phân tích **3 surviving mutants**, giải thích nguyên nhân chưa được phát hiện.
3. Bổ sung **3 assertion thủ công**, sau đó cho AI đề xuất assertion trên cùng các mutant.
4. Chạy kiểm chứng, so sánh khả năng phát hiện mutant và giải thích những trường hợp còn tồn tại.

Kết quả sẽ trình bày cả quá trình thực hiện, số liệu trước/sau và giới hạn của từng cách tiếp cận.

### 5.2. Bài tập áp dụng: Kill the Mutant

Thính giả nhận **5 mutant**, đề xuất assertion, trao đổi với các nhóm khác và kiểm tra khả năng phát hiện lỗi. Nhóm chuẩn bị hướng dẫn, môi trường thực hành và đáp án. Hoạt động dự kiến kéo dài **20–25 phút**.

## 6. Kết quả dự kiến

Seminar dự kiến làm rõ giá trị và giới hạn của mutation testing, cách sử dụng công cụ trên EShop và vai trò của AI trong cải thiện bộ test. Kết luận về hiệu quả của từng công cụ sẽ dựa trên kết quả thực hành của nhóm.

## 7. Tài liệu tham khảo

[1] FIT@HCMUS. [Seminar Track - Master Guide](../../docs/requirements/01_Seminar_Guide.md).

[2] FIT@HCMUS. [Software Testing - Seminar Requirements](../../docs/requirements/02_SoftwareTesting-SeminarRequirements.md).

[3] FIT@HCMUS. [T10 - Mutation Testing & Test Effectiveness](../../docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md).

[4] Stryker Mutator. [StrykerJS - Introduction](https://stryker-mutator.io/docs/stryker-js/introduction/). Truy cập ngày 28/09/2026.

[5] Stryker Mutator. [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/). Truy cập ngày 28/09/2026.

**Tài liệu dự kiến đọc thêm theo đề tài T10:**

[6] Jia và Harman. *An Analysis and Survey of Mutation Testing*. 2011. Theo danh sách đọc của đề tài T10.

[7] *State of Mutation Testing at Google*. 2018. Theo danh sách đọc của đề tài T10.
