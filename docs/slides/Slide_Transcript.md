# Slide Transcript

Mutation Testing and Test Effectiveness. CSC13003, T10, Nhóm 12.

Slide 1-19 thuộc pitch, slide 20 mở demo, slide 21 mở activity và slide 22 dành cho Q&A. Nội dung chiếu theo [PDF](Seminar_Slides.pdf). Speaker notes và nguồn theo [PowerPoint](Seminar_Slides.pptx).

## 01. Mutation Testing and Test Effectiveness

**Khoa Công nghệ Thông tin / FIT HCMUS**

**Seminar T10 / Nhóm 12**

- 23120255 - Lê Tấn Hiệp
- 23120262 - Tống Dương Thái Hòa
- 23120264 - Nguyễn Phúc Hoàng

## 02. Giỏ hàng sai vẫn báo thành công

Cùng thao tác mở giỏ của một tài khoản mới.

| Bản gốc | Biến thể |
|---|---|
| Giỏ trống | Có sẵn một món |
| Yêu cầu thành công | Yêu cầu thành công |

**Nếu test chỉ kiểm tra thao tác thành công, nó sẽ báo gì?**

### Speaker Notes

Cho lớp vài giây đoán. Cả hai đều trả HTTP 200 nên test cũ vẫn pass. Giỏ có sẵn một món là hành vi của một mutant thật, không phải lỗi được quan sát trên bản gốc.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 6.2.1

## 03. Coverage và assertion

| Coverage | Assertion |
|---|---|
| Test đã đi qua phần nào của chương trình? | Test đã kiểm tra kết quả cụ thể nào? |

**Giỏ của tài khoản mới phải trống theo quy tắc đang kiểm tra.**

### Speaker Notes

Cùng gọi một API thì hai test có thể đi qua cùng phần mã. Test có giá trị hơn khi đối chiếu kết quả với một kỳ vọng có căn cứ. Nhóm dùng đặc tả để chọn kỳ vọng, còn chi tiết JSON của giỏ trống là cách diễn giải hợp đồng API.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.1 và 6.2.1

## 04. Mutation Testing hoạt động thế nào?

Dùng các thay đổi nhỏ để thử độ nhạy của bộ test.

1. **Bản gốc.** Xác nhận bộ test chạy đạt.
2. **Tạo biến thể.** Đổi một chi tiết, ví dụ bỏ bước lưu.
3. **Chạy lại.** Dùng lại bộ test với biến thể.
4. **Đọc kết quả.** Xem test nào nhận ra sai khác.

**Mỗi phiên bản có thay đổi được gọi là một mutant.**

### Speaker Notes

Mutator là quy tắc tạo thay đổi, ví dụ đổi ngưỡng so sánh, bỏ lời gọi cập nhật hoặc thay giá trị trả về. Mutant là phiên bản cụ thể tạo ra khi áp dụng quy tắc đó tại một vị trí. Bộ test được kiểm tra trên bản gốc trước.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.2 và 2.3

## 05. Dữ liệu nào làm lộ sai khác?

Ví dụ minh họa về điều kiện nhận ưu đãi. Bản gốc nhận từ 500 nghìn. Biến thể chỉ nhận trên 500 nghìn.

| Đầu vào | Kết quả |
|---|---|
| 499 nghìn | Hai bản đều từ chối |
| 500 nghìn | Kết quả khác nhau |
| 501 nghìn | Hai bản đều chấp nhận |

**Chọn đúng điểm biên và kiểm tra có được ưu đãi hay không.**

### Speaker Notes

Nếu chỉ thử 499 và 501, thay đổi tại biên không tạo kết quả khác nhau. Tại đúng 500, test phải kiểm tra có được ưu đãi, thay vì chỉ kiểm tra hệ thống trả về một giá trị. Đây là ví dụ minh họa, không phải số tiền trong một thí nghiệm EShop.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.4

## 06. Đọc trạng thái mutant

| Nhóm | Trạng thái | Ý nghĩa |
|---|---|---|
| Kết quả của test | Killed | Có test thất bại. |
| Kết quả của test | Survived | Các test được chạy vẫn pass. |
| Kết quả của test | NoCoverage | Test chưa đi tới chỗ bị đổi. |
| Vấn đề khi chạy | Timeout | Quá thời gian chạy. |
| Vấn đề khi chạy | RuntimeError | Có lỗi khi thực thi. |

### Speaker Notes

Survived khác NoCoverage. Với Survived, các test được chạy chưa phản ứng với thay đổi. Với NoCoverage, chỗ bị đổi chưa được test đi qua. Đọc RuntimeError riêng để tránh hiểu lỗi khi thực thi thành lỗi do assertion phát hiện.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.5

## 07. Mutation score đo gì?

| Thành phần | Trạng thái được tính |
|---|---|
| Tử số, mutant được phát hiện | Killed + Timeout |
| Mẫu số, mutant hợp lệ | Killed + Timeout + Survived + NoCoverage |

**Muốn biết phép kiểm nào bắt được lỗi, đọc test thất bại.**

### Speaker Notes

Stryker tính tỷ lệ phần trăm theo công thức trên. Timeout được tính vào nhóm detected, nhưng nhóm tách riêng khi diễn giải. RuntimeError bị loại khỏi mẫu số hợp lệ. Trạng thái Killed cũng cần đọc lý do để xác nhận đó là lỗi do phép kiểm mục tiêu.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.5 và 4.6
- <https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/>

## 08. Vì sao chọn StrykerJS?

EShop backend dùng JavaScript và đã có Jest.

| Công cụ | Hệ sinh thái | Phù hợp |
|---|---|---|
| StrykerJS | JavaScript / TypeScript | Dùng trực tiếp trên EShop |
| PIT | Java / JVM | Phù hợp dự án Java |
| mutmut | Python | Phù hợp dự án Python |

**Tích hợp với bộ test hiện có và truy được từng mutant.**

### Speaker Notes

Nhóm khảo sát theo chi phí, độ dễ tiếp cận, mức phù hợp EShop, vai trò AI và hỗ trợ tài liệu. Lý do chọn StrykerJS là cùng hệ sinh thái với backend, tích hợp runner Jest và có báo cáo HTML/JSON để phân tích từng mutant. PIT và mutmut là lựa chọn trong những hệ sinh thái khác.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 3.1 đến 3.4

## 09. StrykerJS và Jest phối hợp ra sao?

1. **StrykerJS.** Tạo từng biến thể trong phần đã chọn.
2. **Jest.** Chạy các test với biến thể.
3. **Báo cáo.** Cho biết chỗ bị đổi, trạng thái và test fail.

**Từ báo cáo, chọn một mutant còn sống để tìm test đang thiếu gì.**

### Speaker Notes

StrykerJS điều phối việc tạo mutant và gọi Jest runner. Reporter giúp xem vị trí, phép thay đổi và kết quả. Khi giải thích một Killed, chỉ ra phép kiểm nào thất bại và vì sao. Báo cáo theo phạm vi được chọn, không đại diện cho mọi hành vi của toàn hệ thống.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 3.5 và 5.6

## 10. AI Agent đề xuất, nhóm kiểm chứng

| Bước | Nội dung |
|---|---|
| Đầu vào | Đặc tả, mutant và test hiện có. |
| Đề xuất | Tình huống và kết quả kỳ vọng. |
| Rà soát | Rà lại kỳ vọng, rồi chạy lại. |

**Chấp nhận phép kiểm khi nó pass trên bản gốc và fail trên đúng mutant.**

### Speaker Notes

Nhóm giữ vai trò của AI là gợi ý dữ liệu và phép kiểm. Các hướng dùng AI sinh mutant được khảo sát riêng vì sẽ thay đổi tập biến thể. Bản ghi của Cart ghi Claude Code với claude-opus-5-5. Coupons dùng Codex và chưa xác nhận phiên bản model phục vụ. Hồ sơ G03 của Auth ghi Claude CLI với claude-sonnet-5-5. Người rà soát kiểm tra đặc tả, dữ liệu, API và lỗi thực tế khi chạy.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 3.3, 4.4, 5.5 và 6.4

## 11. Ba phần nghiệp vụ được kiểm tra

Case study trên API của EShop.

| Nghiệp vụ | Phạm vi |
|---|---|
| Cart & Orders | Giỏ hàng, đặt và hủy đơn. |
| Coupons | Mức giảm giá, giới hạn lượt dùng. |
| Authentication & Users | Đăng nhập, cập nhật tài khoản. |

**Nhóm đọc phản hồi API và kiểm tra dữ liệu sau thao tác.**

### Speaker Notes

Jest tổ chức bộ test, Supertest gửi yêu cầu vào Express và SQLite test database cho phép đối chiếu dữ liệu đã lưu. Nhóm reset dữ liệu và cố định đồng hồ ở các ca phụ thuộc thời gian. Phạm vi là backend, API và trạng thái liên quan.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 4.1, 4.2 và 5.2

## 12. Cách so sánh ba bộ test

Giữ cùng bản EShop và cùng tập mutant.

| Bộ test | Thành phần |
|---|---|
| Bộ ban đầu | Các test đã có và pass trên bản gốc. |
| Nhóm bổ sung | Thêm ca từ phân tích quy tắc nghiệp vụ. |
| AI đã rà soát | Thêm ca có AI hỗ trợ sau khi nhóm kiểm tra. |

**Các ca phát hiện lỗi sẵn có trên bản gốc được chạy riêng.**

### Speaker Notes

Bộ ban đầu cần pass trên bản gốc để sự thất bại trên biến thể có ý nghĩa. Các test đúng đặc tả nhưng fail trên bản gốc được tách thành bộ defect. Khi so kết quả, nhóm đối chiếu cùng vị trí và nội dung thay đổi, không chỉ dựa vào ID do công cụ hiển thị. Hai bộ bổ sung có thể bao phủ các tình huống khác nhau.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 4.3 đến 4.6
- [docs/Source_Audit.md](../Source_Audit.md) - Joint Comparison

## 13. Giỏ mới phải trống

**Cart & Orders**

Mở giỏ bằng tài khoản chưa từng thêm sản phẩm.

| Test cũ | Phép kiểm thêm |
|---|---|
| Thấy yêu cầu thành công thì pass. | Đọc phản hồi và kiểm tra giỏ không có món nào. |

**Cả hai bộ bổ sung đều phát hiện mutant trả giỏ có sẵn một món.**

### Speaker Notes

Nối lại ví dụ mở đầu. Stryker tạo mutant chèn thêm một phần tử khi khởi tạo giỏ. Audit đối chứng cả hai phép kiểm trên bản gốc và đúng mutant. Test mới pass trên bản gốc và fail vì danh sách của mutant có phần tử.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 6.2.1
- [docs/Source_Audit.md](../Source_Audit.md) - Assertion-Level Controls, Cart

## 14. Nhập 3 lượt, hệ thống lại lưu 1

**Coupons**

| Giới hạn nhập | Bản gốc lưu | Mutant lưu |
|---|---|---|
| 1 | 1 | 1 |
| 3 | 3 | 1 |

**Nhập giới hạn khác 1, sau đó đọc lại giá trị coupon đã lưu.**

### Speaker Notes

Bộ test ban đầu chỉ thử 1 lượt, nên bản gốc và mutant cùng cho kết quả 1. Nhóm dùng giới hạn 3 rồi đọc lại coupon. AI đề xuất các trường hợp dùng giới hạn 2 và 4. Cùng cấu trúc test với nhiều cặp đầu vào và kỳ vọng là data-driven. Điểm kiểm tra ở đây là giới hạn lưu, không chỉ là yêu cầu tạo thành công.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 5.8 và 6.2.4
- [docs/Source_Audit.md](../Source_Audit.md) - Assertion-Level Controls, Coupons

## 15. Sửa hồ sơ phải giữ nguyên quyền

**Authentication & Users**

Đổi tên hiển thị mà không yêu cầu đổi quyền.

| Test cũ | Phép kiểm thêm |
|---|---|
| Yêu cầu cập nhật thành công, nhưng có thể bỏ sót thay đổi sai ở quyền. | Đọc lại tài khoản và kiểm tra quyền giữ nguyên. |

**Cả hai bộ bổ sung đều phát hiện mutant xử lý quyền sai.**

### Speaker Notes

Mutant ép hệ thống chạy nhánh cập nhật quyền dù yêu cầu không truyền quyền. Ca đối chứng đọc lại quyền đã lưu. Cả test nhóm và test AI pass trên bản gốc và fail trên đúng mutant ở phép kiểm quyền.

### Sources

- [docs/Source_Audit.md](../Source_Audit.md) - Assertion-Level Controls, Auth
- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 6.6.1

## 16. Khi nào một mutant sống sót?

### Kiểm tra lại test

- Test có đi tới chỗ bị đổi?
- Đầu vào có tạo sai khác?
- Phép kiểm có thấy sai khác?

### Kiểm tra lại quy tắc

- **Ứng viên tương đương.** Hai bản có thể cho cùng hành vi trên mọi đầu vào hợp lệ.
- **Mutant có thể sửa lỗi gốc.** Chấp nhận đơn vừa chạm mức tối thiểu theo đặc tả coupon.

### Speaker Notes

Equivalent là kết luận về toàn bộ hành vi quan sát được trong miền hợp lệ. Một vài lần thử chưa tìm ra phản ví dụ chỉ đủ để giữ giả thuyết. Correcting mutant có thể khác bản gốc theo hướng phù hợp đặc tả hơn. Khi bản gốc sai ở biên tối thiểu của coupon, giữ ca tái hiện defect riêng và không đổi kỳ vọng để ép kill.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 2.6, 6.2.5 và 7.4

## 17. Kết quả chạy chung ba nghiệp vụ

Mutation score trên cùng tập mutant hợp lệ.

| Bộ test | Mutation score hiển thị |
|---|---:|
| Ban đầu | 68% |
| Bổ sung | 81% |
| AI đề xuất | 75% |

### Speaker Notes

Audit 06/11/2026 đối chiếu 395 signatures và giữ 375 mutants hợp lệ chung. Cả ba bộ có 20 RuntimeError do native crash. Bộ ban đầu có 191 Killed và 63 Timeout. Nhóm bổ sung có 238 Killed và 64 Timeout. AI đã rà soát có 217 Killed và 66 Timeout. So theo signature, lần lượt có thêm 48 và 29 mutant chuyển từ Survived hoặc NoCoverage sang Killed theo công cụ. Không gọi tất cả là assertion kills đã đối chứng. W13 ghi lần lịch sử với baseline 67,56%. Lần audit có hai RuntimeError chuyển thành Timeout ở baseline, nên dùng 67,73% trong biểu đồ này.

### Sources

- [docs/Source_Audit.md](../Source_Audit.md) - Mutation Results, Joint Comparison và Historical Reproduction
- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 6.7 và Bảng 6.8

## 18. Vì sao hai bộ bổ sung phát hiện khác nhau?

**Ví dụ hủy đơn.** Hệ thống báo thành công, nhưng trạng thái lưu lại sai.

| Nhóm bổ sung | AI đã rà soát |
|---|---|
| Có ca đọc lại trạng thái đơn sau khi hủy. | Bộ test lần này thiếu ca kiểm tra tương ứng. |

**Hai bộ bao phủ tình huống khác nhau. Hai biến thể Coupons dùng chung ngữ cảnh AI.**

### Speaker Notes

Ở ca hủy đơn, mutant lưu trạng thái sai nhưng API vẫn báo thành công. Chênh lệch quan sát được liên quan đến phạm vi tình huống của hai bộ test. Hai biến thể Coupons được Codex hỗ trợ trong cùng ngữ cảnh, và các ca mở rộng dùng chung helper. Kết quả mô tả các bộ test cụ thể, chưa cô lập tác động riêng của tác giả hoặc model.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 6.2.3, 7.3 và 7.6
- [docs/Source_Audit.md](../Source_Audit.md) - Scope, Oracles, and Provenance

## 19. Cách cải thiện một test đang bỏ sót lỗi

1. Chọn đầu vào làm lộ khác biệt.
2. Kiểm tra kết quả theo quy tắc nghiệp vụ.
3. Chạy lại trên bản gốc và mutant.

**Ưu tiên kiểm tra số tiền, trạng thái đơn và quyền tài khoản.**

### Speaker Notes

Khi phân tích survivor, lần lượt kiểm tra đường thực thi, dữ liệu phân biệt và phép kiểm. Bắt đầu ở quy tắc nghiệp vụ quan trọng, vì mỗi lần tạo mutant và chạy lại test đều có chi phí. Sang demo, tụi em làm đúng quy trình này với giới hạn dùng coupon.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 7.2 và 7.7

## 20. Live Demo

Kiểm tra giới hạn dùng coupon.

**10 phút / StrykerJS và AI Agent**

1. Mở báo cáo và xem mutant còn sống.
2. Xem đề xuất từ AI và rà lại kỳ vọng.
3. Kiểm chứng trên bản gốc và mutant.

### Speaker Notes

Chuyển sang màn hình demo. Chuẩn bị báo cáo baseline, vị trí mutant giới hạn coupon và đề xuất Codex đã ghi. Cho lớp thấy bản gốc pass và cùng mutant chuyển từ Survived sang Killed. Mở video dự phòng khi cần và nói rõ nếu đang trình chiếu kết quả đã lưu.

### Sources

- [docs/Demo_Script.md](../Demo_Script.md)
- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md) - mục 5.7
- <https://youtu.be/tVNW5gYQSiM>

## 21. Kill the Mutant

Một phòng T10 Mutation Lab cho cả lớp.

**20 phút / T10 Mutation Lab**

1. Vào phòng theo link điều phối viên.
2. Đọc quy tắc và thay đổi được chiếu.
3. Dựng hoặc viết test rồi đổi bài góp ý.
4. Nộp bài ở tab đang soạn.

**Bản gốc phải pass trước khi chấm. Mỗi mutant mới được phát hiện hợp lệ cộng 1 điểm.**

### Speaker Notes

Mở một phòng, chia sẻ link đang dùng và chuyển sang Mutation Lab. Điều phối viên chiếu các diff đã chuẩn bị. Nhắc người chơi dùng Dựng test hoặc Viết code và nộp ở tab đang mở. Tổ chức đổi bài, góp ý một phép kiểm và chốt điểm trên bảng xếp hạng. Timeout, crash và lỗi môi trường được xử lý riêng.

### Sources

- [activity/Activity_Platform_Spec.md](../../activity/Activity_Platform_Spec.md)
- [activity/Activity_Worksheet.md](../../activity/Activity_Worksheet.md)
- [activity/Facilitator_Guide.md](../../activity/Facilitator_Guide.md)

## 22. Q&A

**THE END OF MY PRESENTATION**

**ANY QUESTION BRUH?**

### Speaker Notes

Mời lớp chọn một ca từ demo hoặc activity rồi nêu đầu vào và điều cần quan sát. Khi thảo luận một mutant tương đương, yêu cầu mô tả miền đầu vào, trạng thái đạt được và tác động đã xét. Tài liệu và source có link trên slide.

### Sources

- [W13 Seminar_Report.md](../../submission/w13/Seminar_Report.md)
- <https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness/blob/main/docs/Seminar_Report.md>
- <https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness/blob/main/docs/User_Guide.md>
- <https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness>

Ghi chú phiên bản. Các liên kết tài liệu nằm trong speaker notes của PowerPoint w13. Slide Q&A hiện hiển thị hai dòng chữ ở trên.
