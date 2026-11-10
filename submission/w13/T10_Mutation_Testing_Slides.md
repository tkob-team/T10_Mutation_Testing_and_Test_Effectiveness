<!-- Transcribed from T10_Mutation_Testing_Slides.pdf; 22 slides. -->
<!-- Text and figures follow the original slide order; formatted as Markdown. -->

<!-- Page 1/22 - Cover -->

# Mutation Testing and Test Effectiveness

**Khoa Công nghệ Thông tin / FIT HCMUS**

**Seminar T10 / Nhóm 12**

- 23120255 - Lê Tấn Hiệp
- 23120262 - Tống Dương Thái Hòa
- 23120264 - Nguyễn Phúc Hoàng

*Slide 1/22 - Cover*

---

<!-- Page 2/22 - Opening example -->

## Giỏ hàng sai vẫn báo thành công

Cùng thao tác mở giỏ của một tài khoản mới.

| Bản gốc | Biến thể |
|---|---|
| Giỏ trống | Có sẵn một món |
| Yêu cầu thành công | Yêu cầu thành công |

**Nếu test chỉ kiểm tra thao tác thành công, nó sẽ báo gì?**

*Slide 2/22 - Opening example*

---

<!-- Page 3/22 - Coverage and assertions -->

## Coverage và assertion

| Coverage | Assertion |
|---|---|
| Test đã đi qua phần nào của chương trình? | Test đã kiểm tra kết quả cụ thể nào? |

**Giỏ của tài khoản mới phải trống theo quy tắc đang kiểm tra.**

*Slide 3/22 - Coverage and assertions*

---

<!-- Page 4/22 - Mutation testing workflow -->

## Mutation Testing hoạt động thế nào?

Dùng các thay đổi nhỏ để thử độ nhạy của bộ test.

1. **Bản gốc.** Xác nhận bộ test chạy đạt.
2. **Tạo biến thể.** Đổi một chi tiết, ví dụ bỏ bước lưu.
3. **Chạy lại.** Dùng lại bộ test với biến thể.
4. **Đọc kết quả.** Xem test nào nhận ra sai khác.

**Mỗi phiên bản có thay đổi được gọi là một mutant.**

*Slide 4/22 - Mutation testing workflow*

---

<!-- Page 5/22 - Boundary inputs -->

## Dữ liệu nào làm lộ sai khác?

Ví dụ minh họa về điều kiện nhận ưu đãi. Bản gốc nhận từ 500 nghìn. Biến thể chỉ nhận trên 500 nghìn.

| Đầu vào | Kết quả |
|---|---|
| 499 nghìn | Hai bản đều từ chối |
| 500 nghìn | Kết quả khác nhau |
| 501 nghìn | Hai bản đều chấp nhận |

**Chọn đúng điểm biên và kiểm tra có được ưu đãi hay không.**

*Slide 5/22 - Boundary inputs*

---

<!-- Page 6/22 - Mutant states -->

## Đọc trạng thái mutant

| Nhóm | Trạng thái | Ý nghĩa |
|---|---|---|
| Kết quả của test | Killed | Có test thất bại. |
| Kết quả của test | Survived | Các test được chạy vẫn pass. |
| Kết quả của test | NoCoverage | Test chưa đi tới chỗ bị đổi. |
| Vấn đề khi chạy | Timeout | Quá thời gian chạy. |
| Vấn đề khi chạy | RuntimeError | Có lỗi khi thực thi. |

*Slide 6/22 - Mutant states*

---

<!-- Page 7/22 - Mutation score -->

## Mutation score đo gì?

| Thành phần | Trạng thái được tính |
|---|---|
| Tử số, mutant được phát hiện | Killed + Timeout |
| Mẫu số, mutant hợp lệ | Killed + Timeout + Survived + NoCoverage |

**Muốn biết phép kiểm nào bắt được lỗi, đọc test thất bại.**

*Slide 7/22 - Mutation score*

---

<!-- Page 8/22 - Tool selection -->

## Vì sao chọn StrykerJS?

EShop backend dùng JavaScript và đã có Jest.

| Công cụ | Hệ sinh thái | Phù hợp |
|---|---|---|
| StrykerJS | JavaScript / TypeScript | Dùng trực tiếp trên EShop |
| PIT | Java / JVM | Phù hợp dự án Java |
| mutmut | Python | Phù hợp dự án Python |

**Tích hợp với bộ test hiện có và truy được từng mutant.**

*Slide 8/22 - Tool selection*

---

<!-- Page 9/22 - StrykerJS and Jest -->

## StrykerJS và Jest phối hợp ra sao?

1. **StrykerJS.** Tạo từng biến thể trong phần đã chọn.
2. **Jest.** Chạy các test với biến thể.
3. **Báo cáo.** Cho biết chỗ bị đổi, trạng thái và test fail.

**Từ báo cáo, chọn một mutant còn sống để tìm test đang thiếu gì.**

*Slide 9/22 - StrykerJS and Jest*

---

<!-- Page 10/22 - AI review workflow -->

## AI Agent đề xuất, nhóm kiểm chứng

| Bước | Nội dung |
|---|---|
| Đầu vào | Đặc tả, mutant và test hiện có. |
| Đề xuất | Tình huống và kết quả kỳ vọng. |
| Rà soát | Rà lại kỳ vọng, rồi chạy lại. |

**Chấp nhận phép kiểm khi nó pass trên bản gốc và fail trên đúng mutant.**

*Slide 10/22 - AI review workflow*

---

<!-- Page 11/22 - Experiment scope -->

## Ba phần nghiệp vụ được kiểm tra

Case study trên API của EShop.

| Nghiệp vụ | Phạm vi |
|---|---|
| Cart & Orders | Giỏ hàng, đặt và hủy đơn. |
| Coupons | Mức giảm giá, giới hạn lượt dùng. |
| Authentication & Users | Đăng nhập, cập nhật tài khoản. |

**Nhóm đọc phản hồi API và kiểm tra dữ liệu sau thao tác.**

*Slide 11/22 - Experiment scope*

---

<!-- Page 12/22 - Comparison design -->

## Cách so sánh ba bộ test

Giữ cùng bản EShop và cùng tập mutant.

| Bộ test | Thành phần |
|---|---|
| Bộ ban đầu | Các test đã có và pass trên bản gốc. |
| Nhóm bổ sung | Thêm ca từ phân tích quy tắc nghiệp vụ. |
| AI đã rà soát | Thêm ca có AI hỗ trợ sau khi nhóm kiểm tra. |

**Các ca phát hiện lỗi sẵn có trên bản gốc được chạy riêng.**

*Slide 12/22 - Comparison design*

---

<!-- Page 13/22 - Cart and Orders -->

## Giỏ mới phải trống

**Cart & Orders**

Mở giỏ bằng tài khoản chưa từng thêm sản phẩm.

| Test cũ | Phép kiểm thêm |
|---|---|
| Thấy yêu cầu thành công thì pass. | Đọc phản hồi và kiểm tra giỏ không có món nào. |

**Cả hai bộ bổ sung đều phát hiện mutant trả giỏ có sẵn một món.**

*Slide 13/22 - Cart and Orders*

---

<!-- Page 14/22 - Coupons -->

## Nhập 3 lượt, hệ thống lại lưu 1

**Coupons**

| Giới hạn nhập | Bản gốc lưu | Mutant lưu |
|---|---|---|
| 1 | 1 | 1 |
| 3 | 3 | 1 |

**Nhập giới hạn khác 1, sau đó đọc lại giá trị coupon đã lưu.**

*Slide 14/22 - Coupons*

---

<!-- Page 15/22 - Authentication and Users -->

## Sửa hồ sơ phải giữ nguyên quyền

**Authentication & Users**

Đổi tên hiển thị mà không yêu cầu đổi quyền.

| Test cũ | Phép kiểm thêm |
|---|---|
| Yêu cầu cập nhật thành công, nhưng có thể bỏ sót thay đổi sai ở quyền. | Đọc lại tài khoản và kiểm tra quyền giữ nguyên. |

**Cả hai bộ bổ sung đều phát hiện mutant xử lý quyền sai.**

*Slide 15/22 - Authentication and Users*

---

<!-- Page 16/22 - Survivor diagnosis -->

## Khi nào một mutant sống sót?

### Kiểm tra lại test

- Test có đi tới chỗ bị đổi?
- Đầu vào có tạo sai khác?
- Phép kiểm có thấy sai khác?

### Kiểm tra lại quy tắc

- **Ứng viên tương đương.** Hai bản có thể cho cùng hành vi trên mọi đầu vào hợp lệ.
- **Mutant có thể sửa lỗi gốc.** Chấp nhận đơn vừa chạm mức tối thiểu theo đặc tả coupon.

*Slide 16/22 - Survivor diagnosis*

---

<!-- Page 17/22 - Joint results -->

## Kết quả chạy chung ba nghiệp vụ

Mutation score trên cùng tập mutant hợp lệ.

| Bộ test | Mutation score hiển thị |
|---|---:|
| Ban đầu | 68% |
| Bổ sung | 81% |
| AI đề xuất | 75% |

*Slide 17/22 - Joint results*

---

<!-- Page 18/22 - Differences between test suites -->

## Vì sao hai bộ bổ sung phát hiện khác nhau?

**Ví dụ hủy đơn.** Hệ thống báo thành công, nhưng trạng thái lưu lại sai.

| Nhóm bổ sung | AI đã rà soát |
|---|---|
| Có ca đọc lại trạng thái đơn sau khi hủy. | Bộ test lần này thiếu ca kiểm tra tương ứng. |

**Hai bộ bao phủ tình huống khác nhau. Hai biến thể Coupons dùng chung ngữ cảnh AI.**

*Slide 18/22 - Differences between test suites*

---

<!-- Page 19/22 - Improving an assertion -->

## Cách cải thiện một test đang bỏ sót lỗi

1. Chọn đầu vào làm lộ khác biệt.
2. Kiểm tra kết quả theo quy tắc nghiệp vụ.
3. Chạy lại trên bản gốc và mutant.

**Ưu tiên kiểm tra số tiền, trạng thái đơn và quyền tài khoản.**

*Slide 19/22 - Improving an assertion*

---

<!-- Page 20/22 - Live demo -->

## Live Demo

Kiểm tra giới hạn dùng coupon.

**10 phút / StrykerJS và AI Agent**

1. Mở báo cáo và xem mutant còn sống.
2. Xem đề xuất từ AI và rà lại kỳ vọng.
3. Kiểm chứng trên bản gốc và mutant.

*Slide 20/22 - Live demo*

---

<!-- Page 21/22 - Audience activity -->

## Kill the Mutant

Một phòng T10 Mutation Lab cho cả lớp.

**20 phút / T10 Mutation Lab**

1. Vào phòng theo link điều phối viên.
2. Đọc quy tắc và thay đổi được chiếu.
3. Dựng hoặc viết test rồi đổi bài góp ý.
4. Nộp bài ở tab đang soạn.

**Bản gốc phải pass trước khi chấm. Mỗi mutant mới được phát hiện hợp lệ cộng 1 điểm.**

*Slide 21/22 - Audience activity*

---

<!-- Page 22/22 - Q&A -->

## Q&A

**THE END OF MY PRESENTATION**

**ANY QUESTION BRUH?**

*Slide 22/22 - Q&A*
