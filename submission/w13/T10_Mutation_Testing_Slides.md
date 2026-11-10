<!-- Transcribed and synchronized with T10_Mutation_Testing_Slides(2).pdf; 20 slides. -->
<!-- Slide order, wording, tables, and figures described in text follow the updated PDF. -->

<!-- Page 1/20 - Cover -->

# Mutation Testing and Test Effectiveness

**KHOA CÔNG NGHỆ THÔNG TIN / FIT HCMUS**

**SEMINAR T10 / NHÓM 12**

- 23120255 - Lê Tấn Hiệp
- 23120262 - Tống Dương Thái Hòa
- 23120264 - Nguyễn Phúc Hoàng

*Slide 1/20 - Cover*

---

<!-- Page 2/20 - Opening example; Section 01: Cơ sở -->

## Giỏ hàng sai vẫn báo thành công

Cùng thao tác mở giỏ của một tài khoản mới.

| BẢN GỐC | BIẾN THỂ |
|---|---|
| Giỏ trống | Có sẵn một món |
| Yêu cầu thành công | Yêu cầu thành công |

**Nếu test chỉ kiểm tra thao tác thành công, nó sẽ báo gì?**

*Slide 2/20 - Opening example*

---

<!-- Page 3/20 - Coverage and assertion; Section 01: Cơ sở -->

## Coverage và assertion

| Coverage | Assertion |
|---|---|
| Test đã đi qua phần nào của chương trình? | Test đã kiểm tra kết quả cụ thể nào? |

**Giỏ của tài khoản mới phải trống theo quy tắc đang kiểm tra.**

*Slide 3/20 - Coverage and assertion*

---

<!-- Page 4/20 - How StrykerJS creates mutants; Section 01: Cơ sở -->

## StrykerJS tạo mutant như thế nào?

Nhóm chọn vùng code. StrykerJS áp dụng quy tắc biến đổi.

1. **Chọn phạm vi.** Chọn file và khoảng dòng.
2. **Tìm chỗ khớp.** Tìm biểu thức khớp quy tắc.
3. **Tạo biến thể.** Từ `a >= b`, sinh riêng `a > b` và `a < b`.
4. **Chạy test.** Jest kiểm bản gốc rồi chạy từng mutant.

**Một vị trí có thể sinh nhiều mutant. Mỗi lượt test chỉ bật một thay đổi.**

*Slide 4/20 - How StrykerJS creates mutants*

---

<!-- Page 5/20 - Comparison operator mutation; Section 01: Cơ sở -->

## Vì sao Stryker chọn dấu so sánh?

Trong vùng đã chọn, dấu `>=` khớp quy tắc so sánh.

- **Bản gốc:** `total >= 500000`
- **Mutant:** `total > 500000`

| Đầu vào | Kết quả so sánh |
|---|---|
| 499 nghìn | Hai bản đều từ chối |
| 500 nghìn | Chỉ bản gốc chấp nhận |
| 501 nghìn | Hai bản đều chấp nhận |

**Test chọn đúng 500 nghìn để hai bản cho kết quả khác nhau.**

*Slide 5/20 - Comparison operator mutation*

---

<!-- Page 6/20 - Mutant statuses; Section 01: Cơ sở -->

## Đọc trạng thái mutant

| Nhóm | Trạng thái | Ý nghĩa |
|---|---|---|
| Kết quả của test | Killed | Có test thất bại. |
| Kết quả của test | Survived | Các test được chạy vẫn pass. |
| Kết quả của test | NoCoverage | Test chưa đi tới chỗ bị đổi. |
| Vấn đề khi chạy | Timeout | Quá thời gian chạy. |
| Vấn đề khi chạy | RuntimeError | Có lỗi khi thực thi. |

*Slide 6/20 - Mutant statuses*

---

<!-- Page 7/20 - Mutation score; Section 01: Cơ sở -->

## Mutation score đo gì?

**Mutant được phát hiện:** `Killed + Timeout`

**Mutant hợp lệ:** `Killed + Timeout + Survived + NoCoverage`

\[
\text{Mutation score} = \frac{\text{Killed} + \text{Timeout}}{\text{Killed} + \text{Timeout} + \text{Survived} + \text{NoCoverage}}
\]

**Muốn biết phép kiểm nào bắt được lỗi, đọc test thất bại.**

*Slide 7/20 - Mutation score*

---

<!-- Page 8/20 - Tool comparison; Section 02: Áp dụng vào EShop -->

## Các công cụ chọn chỗ sửa ra sao?

So sánh vị trí được chọn và cách tạo mutant.

| Công cụ | Chọn vị trí | Tạo mutant |
|---|---|---|
| **StrykerJS** | Node JS/TS khớp quy tắc trong file hoặc dòng đã chọn. | Thay node trên cây cú pháp. Ví dụ đổi `>=` thành `>`. |
| **PIT** | Lệnh trong bytecode của các class đã chọn. | Sửa lệnh nhảy JVM tương ứng với việc đổi `>=` thành `>`. |
| **mutmut** | Node trong hàm Python được gọi. Có thể lọc theo coverage. | Dùng LibCST thay node Python. Ví dụ đổi `>=` thành `>`. |

**EShop dùng StrykerJS với Jest. AI Agent đề xuất test.**

*Slide 8/20 - Tool comparison*

---

<!-- Page 9/20 - Tool versus analyst; Section 02: Áp dụng vào EShop -->

## Tool chạy gì, người kiểm gì?

| Bước | Nội dung |
|---|---|
| **StrykerJS và Jest** | Chạy bản gốc. `perTest` chọn test đi qua chỗ bị đổi. |
| **Báo cáo** | Ghi trạng thái và test fail. Chỗ chưa được chạy là NoCoverage. |
| **Người phân tích** | Chọn survivor, đọc phần code bị đổi và tra đặc tả. |

**Cùng test phải pass trên bản gốc và fail tại assertion trên đúng mutant.**

*Slide 9/20 - Tool versus analyst*

---

<!-- Page 10/20 - AI review workflow; Section 02: Áp dụng vào EShop -->

## AI Agent đề xuất, nhóm kiểm chứng

| Bước | Nội dung |
|---|---|
| **Đầu vào** | Đặc tả, mutant và test hiện có. |
| **Đề xuất** | Tình huống và kết quả kỳ vọng. |
| **Rà soát** | Rà lại kỳ vọng, rồi chạy lại. |

**Chấp nhận phép kiểm khi nó pass trên bản gốc và fail trên đúng mutant.**

*Slide 10/20 - AI review workflow*

---

<!-- Page 11/20 - Experiment scope; Section 02: Áp dụng vào EShop -->

## Ba phần nghiệp vụ được kiểm tra

Case study trên API của EShop.

| Nghiệp vụ | Phạm vi |
|---|---|
| **Cart & Orders** | Giỏ hàng, đặt và hủy đơn. |
| **Coupons** | Mức giảm giá, giới hạn lượt dùng. |
| **Authentication & Users** | Đăng nhập, cập nhật tài khoản. |

**Nhóm đọc phản hồi API và kiểm tra dữ liệu sau thao tác.**

*Slide 11/20 - Experiment scope*

---

<!-- Page 12/20 - Test suite comparison; Section 02: Áp dụng vào EShop -->

## Cách so sánh ba bộ test

Giữ cùng bản EShop và cùng tập mutant.

| Bộ test | Thành phần |
|---|---|
| **Bộ ban đầu** | Các test đã có và pass trên bản gốc. |
| **Nhóm bổ sung** | Thêm ca từ phân tích quy tắc nghiệp vụ. |
| **AI đã rà soát** | Thêm ca có AI hỗ trợ sau khi nhóm kiểm tra. |

**Các ca phát hiện lỗi sẵn có trên bản gốc được chạy riêng.**

*Slide 12/20 - Test suite comparison*

---

<!-- Page 13/20 - Cart & Orders results; Section 03: Ca thực tế và kết quả -->

## Giỏ mới phải trống

**Cart & Orders / 150 mutant**

**Mutant 6 ở `server.js` dòng 286 đổi `[]` thành `["Stryker was here"]`.**

### Test cũ

Cả hai trả HTTP 200. Test chỉ kiểm tra status nên vẫn pass.

### Phép kiểm thêm

Đọc phản hồi và kiểm tra giỏ mới phải là mảng rỗng.

| Chỉ số | Ban đầu | Nhóm bổ sung | AI đã rà soát |
|---|---:|---:|---:|
| Tests pass | 36 | 44 | 41 |
| Killed | 89 | 112 | 102 |
| Timeout | 18 | 18 | 18 |
| Survived | 34 | 11 | 21 |
| NoCoverage | 2 | 2 | 2 |
| RuntimeError | 7 | 7 | 7 |

**Mutant này Survived ở bộ ban đầu và Killed ở cả hai bộ bổ sung.**

*Slide 13/20 - Cart & Orders results*

---

<!-- Page 14/20 - Coupons results; Section 03: Ca thực tế và kết quả -->

## Nhập 3 lượt, hệ thống lại lưu 1

**Coupons / 120 mutant**

Mutant 113 ở `server.js` dòng 474 đổi `||` thành `&&` khi lưu giới hạn.

| Giới hạn nhập | Bản gốc lưu | Mutant lưu |
|---:|---:|---:|
| 1 | 1 | 1 |
| 3 | 3 | 1 |

| Chỉ số | Ban đầu | Nhóm bổ sung | AI đã rà soát |
|---|---:|---:|---:|
| Tests pass | 26 | 35 | 40 |
| Killed | 42 | 43 | 41 |
| Timeout | 18 | 19 | 21 |
| Survived | 30 | 28 | 28 |
| NoCoverage | 25 | 25 | 25 |
| RuntimeError | 5 | 5 | 5 |

**Đọc lại giới hạn đã lưu. Mutant từ Survived sang Killed ở cả hai bộ bổ sung.**

*Slide 14/20 - Coupons results*

---

<!-- Page 15/20 - Authentication & Users results; Section 03: Ca thực tế và kết quả -->

## Sửa hồ sơ phải giữ nguyên quyền

**Authentication & Users / 125 mutant**

**Mutant 132 ở `server.js` dòng 124 đổi `if (role)` thành `if (true)`.**

### Test cũ

Chỉ đổi tên. API báo thành công, nhưng mutant lưu quyền `null`.

### Phép kiểm thêm

Đọc lại hồ sơ và kiểm tra quyền vẫn là `user`.

| Chỉ số | Ban đầu | Nhóm bổ sung | AI đã rà soát |
|---|---:|---:|---:|
| Tests pass | 26 | 39 | 37 |
| Killed | 64 | 83 | 74 |
| Timeout | 18 | 27 | 27 |
| Survived | 23 | 4 | 13 |
| NoCoverage | 7 | 3 | 3 |
| RuntimeError | 13 | 8 | 8 |

**Mutant này Survived ở bộ ban đầu và Killed ở cả hai bộ bổ sung.**

*Slide 15/20 - Authentication & Users results*

---

<!-- Page 16/20 - Survived diagnosis; Section 03: Ca thực tế và kết quả -->

## Khi nào một mutant survived?

Survived nghĩa là mutant đã chạy nhưng mọi test vẫn pass.

### Đọc một mutant Survived

- Đầu vào có tạo sai khác?
- Test có đọc được sai khác?
- Assertion có kiểm tra chỗ sai?

### Kiểm tra lại quy tắc

- **Ứng viên tương đương.** Hai bản có thể cho cùng hành vi trên mọi đầu vào hợp lệ.
- **Mutant có thể sửa lỗi gốc.** Chấp nhận đơn vừa chạm mức tối thiểu theo đặc tả coupon.

**NoCoverage nghĩa là chưa có test đi qua vị trí bị đổi.**

*Slide 16/20 - Survived diagnosis*

---

<!-- Page 17/20 - Consolidated results; Section 03: Ca thực tế và kết quả -->

## Kết quả chạy chung ba nghiệp vụ

Cùng **395 mutant**, trong đó **375 hợp lệ** ở cả ba bộ.

### Mutation score (biểu đồ trong slide)

| Bộ test | Mutation score hiển thị |
|---|---:|
| Ban đầu | 68% |
| Nhóm | 81% |
| AI đã rà soát | 75% |

### Bảng kết quả chi tiết

| Chỉ số | Ban đầu | Nhóm | AI | Cả ba |
|---|---:|---:|---:|---:|
| Tests pass | 88 | 118 | 118 | |
| Killed | 191 | 238 | 217 | 188 |
| Timeout | 63 | 64 | 66 | 63 |
| Survived | 87 | 43 | 62 | 42 |
| NoCoverage | 34 | 30 | 30 | 30 |
| RuntimeError | 20 | 20 | 20 | 20 |
| Mutation score | 67,73% | 80,53% | 75,47% | |

**343 mutant giữ cùng trạng thái.**

**Cả hai bắt thêm 28. Chỉ nhóm bắt 20 (10 Cart & Orders, 10 Auth). Chỉ AI bắt 1 ở Auth.**

**Nhóm kiểm trạng thái đơn và thông báo Auth. AI thử đúng lúc hết khóa.**

**Killed tăng ròng 47 và 26 vì 1 và 3 ca cũ chuyển sang Timeout.**

*Slide 17/20 - Consolidated results*

---

<!-- Page 18/20 - Live demo; Section 04: Thực hành và thảo luận -->

## Live Demo

**10 phút / StrykerJS và AI Agent**

1. Mở config cùng các loại Mutant
2. Xem report sinh trước
3. Thử tự kill mutant bằng cách sửa test
4. Kill mutant manual và bằng ứng dụng AI

*Slide 18/20 - Live demo*

---

<!-- Page 19/20 - Class activity; Section 04: Thực hành và thảo luận -->

## Kill the Mutant

Một phòng T10 Mutation Lab cho cả lớp.

**20 phút / T10 Mutation Lab**

1. Vào phòng theo link điều phối viên.
2. Đọc quy tắc và thay đổi được chiếu.
3. Dựng hoặc viết test rồi đổi bài góp ý.
4. Nộp bài ở tab đang soạn.

**Bản gốc phải pass trước khi chấm.**

**Mỗi mutant mới được phát hiện hợp lệ cộng 1 điểm.**

*Slide 19/20 - Class activity*

---

<!-- Page 20/20 - Q&A; Section 04: Thực hành và thảo luận -->

## Q&A

**THE END OF MY PRESENTATION**

**ANY QUESTION BRUH?**

*Slide 20/20 - Q&A*
