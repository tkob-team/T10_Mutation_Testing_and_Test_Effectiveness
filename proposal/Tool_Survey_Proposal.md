# T10 - Đề xuất công cụ cho seminar

**Chủ đề:** Mutation Testing & Test Effectiveness  
**Giai đoạn:** Stage 1  
**Nhóm / lớp:** 12 / Kiểm thử phần mềm - CQ2023/3  
**Thành viên:** 
| MSSV | Thành viên |
|---|---|
| 23120255 | Lê Tấn Hiệp |
| 23120262 | Tống Dương Thái Hòa |
| 23120264 | Nguyễn Phúc Hoàng |

**Trạng thái:** Đề xuất, chờ  góp ý.  
**Mục tiêu:** Đánh giá khả năng phát hiện lỗi của bộ test EShop bằng mutation testing; so sánh assertion do người viết và AI đề xuất.

## Ba công cụ đề xuất

| Tiêu chí | **StrykerJS** | **ChatGPT** | **Claude** |
|---|---|---|---|
| Vai trò | Công cụ truyền thống, tạo mutant và đánh giá test | AI hỗ trợ đề xuất assertion | Dự phòng phần AI |
| Chi phí / giấy phép | Miễn phí, Apache-2.0 | Dịch vụ độc quyền; có gói miễn phí giới hạn | Dịch vụ độc quyền; có gói miễn phí giới hạn |
| Độ dễ học¹ | Cần học cấu hình và đọc báo cáo | Dễ bắt đầu; cần biết kiểm tra assertion | Dễ bắt đầu; cần biết kiểm tra assertion |
| Phù hợp EShop | Hỗ trợ JavaScript/Node.js; cần tích hợp bộ test | Đề xuất test từ code và yêu cầu EShop | Thực hiện cùng bài toán với ChatGPT |
| Khả năng AI | Dùng để kiểm chứng assertion trong quy trình kết hợp AI | Sinh và giải thích assertion | Sinh và giải thích assertion |
| Cộng đồng / hỗ trợ | Tài liệu, GitHub và Slack | Trung tâm trợ giúp, tài liệu sản phẩm | Trung tâm trợ giúp, tài liệu sản phẩm |

¹ Nhận định sơ bộ, sẽ đánh giá thêm khi thực hành. ChatGPT và Claude không thay thế công cụ chạy mutation testing.

## Lựa chọn ban đầu và lý do

**StrykerJS + ChatGPT; Claude dự phòng cho phần AI.**

- StrykerJS phù hợp backend Node.js của EShop và nội dung thực hành T10.
- Kết hợp AI đề xuất assertion với StrykerJS chạy kiểm chứng giúp minh họa rõ vai trò của từng công cụ.
- Có thể bắt đầu với lựa chọn miễn phí; Claude cung cấp phương án thay thế cho phần AI khi cần.
