# W13 Slide Feedback Research

Trạng thái: Proposed, chờ duyệt nội dung. Số slide theo bản PowerPoint W13 gồm 22 slide. Mỗi mục có phần chữ để chiếu và phần giải thích để nói hoặc ghi trong speaker notes.

Đề xuất dùng cùng bộ số liệu Source Audit ngày 06/11/2026 cho slide 13-17. Slide 13-15 lấy các run riêng theo nghiệp vụ. Slide 17 lấy ba run chạy chung. Cả hai thuộc cùng đợt audit, với bộ production khớp frozen revision `806ba19` và harness lưu tại `1be4637`. Báo cáo W13 giữ đợt chạy lịch sử tại mục 6.7 và đợt audit tại mục 6.8. [PowerPoint W13](../../submission/w13/T10_Mutation_Testing_Slides.pptx), [Seminar Report W13](../../submission/w13/Seminar_Report.md#68-source-audit-joint-run), [Source Audit](../../docs/Source_Audit.md#mutation-results).

## Slide 4. How StrykerJS Creates Mutants

**Tiêu đề chiếu:** StrykerJS tạo mutant như thế nào?

1. **Chọn vùng code.** Nhóm chỉ định file và khoảng dòng trong cấu hình.
2. **Tìm cấu trúc khớp quy tắc.** StrykerJS phân tích code thành cây cú pháp. Quy tắc so sánh tìm biểu thức có các dấu như `>=` và `<`.
3. **Tạo từng biến thể.** Từ `a >= b`, quy tắc tạo một mutant dùng `a > b` và một mutant khác dùng `a < b`.
4. **Chạy test và ghi trạng thái.** Jest kiểm tra bản gốc trước. Sau đó StrykerJS bật một thay đổi mỗi lượt để chạy test.

**Lời nói:** Nhóm chọn vùng muốn khảo sát. Trong vùng đó, Stryker chọn những chỗ khớp với quy tắc đã cài sẵn. Cùng một chỗ có thể sinh nhiều mutant, nhưng mỗi lượt test chỉ bật một thay đổi. Bản gốc được kiểm tra với mọi mutant tắt trong dry run trước khi chấm.

**Khi thầy hỏi sâu:** AST là cây mô tả cấu trúc code. StrykerJS dùng Babel để phân tích source. Trong bản 10.0.0, `EqualityOperator` kiểm tra node có phải biểu thức hai vế với toán tử được hỗ trợ hay không. Với mỗi phép thay, nó sao chép node và đổi toán tử. Bước mutation switching chèn các biến thể vào bản code dùng để test, rồi chọn ID cần bật khi chạy. [Cấu hình StrykerJS](https://stryker-mutator.io/docs/stryker-js/configuration/#mutate-string), [EqualityOperator v10.0.0](https://raw.githubusercontent.com/stryker-mutator/stryker-js/v10.0.0/packages/instrumenter/src/mutators/equality-operator-mutator.ts), [Mutation switching](https://stryker-mutator.io/blog/announcing-stryker-4-beta-mutation-switching/).

## Slide 5. Why This Location

**Tiêu đề chiếu:** Vì sao Stryker chọn dấu so sánh?

Ví dụ minh họa. Quy tắc ưu đãi là đơn từ 500 nghìn được chấp nhận. Giả sử cấu hình chỉ chọn dòng tính điều kiện.

| Vị trí xem xét | Quy tắc xử lý |
| --- | --- |
| `total >= 500000` | Nằm trong phạm vi và khớp `EqualityOperator`. Chọn một mutant minh họa là `total > 500000`. |
| Số `500000` trong cùng biểu thức | Là ngưỡng đầu vào. Quy tắc so sánh chỉ đổi dấu, giữ nguyên hai vế. |
| Dòng ghi log ngoài vùng đã chọn | Nằm ngoài phạm vi cấu hình nên bị bỏ qua. |

| Giá trị đơn hàng | Bản gốc | Mutant dùng dấu lớn hơn |
| --- | --- | --- |
| 499 nghìn | Từ chối | Từ chối |
| 500 nghìn | Chấp nhận | Từ chối |
| 501 nghìn | Chấp nhận | Chấp nhận |

**Lời nói:** Công cụ tìm dấu `>=` vì quy tắc nhận ra kiểu biểu thức đó. Khi phân tích mutant dùng dấu `>`, người viết test chọn đúng 500 nghìn vì đây là chỗ hai bản trả kết quả khác nhau. Assertion kiểm tra có được ưu đãi theo quy tắc. Ví dụ 500 nghìn dùng để giải thích cơ chế. [EqualityOperator v10.0.0](https://raw.githubusercontent.com/stryker-mutator/stryker-js/v10.0.0/packages/instrumenter/src/mutators/equality-operator-mutator.ts), [Cấu hình phạm vi](https://stryker-mutator.io/docs/stryker-js/configuration/#mutate-string).

## Slide 8. Mutation Tools by Mechanism

**Tiêu đề chiếu:** Các công cụ chọn chỗ sửa và tạo mutant ra sao?

| Nhóm và công cụ | Chọn chỗ nào? | Tạo mutant thế nào? |
| --- | --- | --- |
| Quy tắc trên cây cú pháp, StrykerJS | Chọn file hoặc khoảng dòng JS/TS. Tìm node Babel AST khớp mutator. | Thay node theo quy tắc. `EqualityOperator` có thể đổi `>=` thành `>`. |
| Quy tắc trên cây cú pháp, mutmut | Chọn source Python, phân tích bằng LibCST. Mặc định tập trung vào hàm được gọi. Có thể bật lọc dòng có coverage. | Thay node Python theo quy tắc. Ví dụ đổi `>=` thành `>`. |
| Quy tắc trên bytecode, PIT | Chọn class Java/JVM. Tìm lệnh phù hợp trong bytecode đã biên dịch. | Sửa lệnh nhảy có điều kiện. `CONDITIONALS_BOUNDARY` tương ứng với đổi `>=` thành `>` trong source. |
| Sinh thay đổi bằng LLM, LLMorpheus | Bộ sinh prompt tìm các vị trí như điều kiện `if`, phần đầu vòng lặp hoặc đối số hàm. Nó đặt chỗ trống ở một vị trí trong mỗi prompt. | Mô hình đề xuất code thay thế. Tool bỏ đoạn trùng hoặc sai cú pháp rồi chuyển mutant cho bản StrykerJS tùy biến để chạy. |

**Chốt trên slide:** EShop dùng StrykerJS với Jest. AI Agent của nhóm nhận mutant từ báo cáo để đề xuất test hoặc assertion.

**Lời nói:** Hai dòng đầu cùng sửa cấu trúc trong mã nguồn. PIT sửa lệnh của chương trình sau biên dịch. LLMorpheus là ví dụ nghiên cứu có bước sinh đoạn thay thế từ ngữ cảnh. Nhóm khảo sát ba cách này và dùng StrykerJS để sinh mutant trên backend EShop. Nếu bảng chật, đưa hàng LLMorpheus xuống speaker notes. [StrykerJS](https://stryker-mutator.io/docs/stryker-js/configuration/), [mutmut](https://mutmut.readthedocs.io/en/latest/), [LibCST và cách thay node](https://raw.githubusercontent.com/boxed/mutmut/main/src/mutmut/mutation/mutators.py), [PIT](https://pitest.org/quickstart/basic_concepts/), [PIT mutators](https://pitest.org/quickstart/mutators/#conditionals-boundary-mutator-conditionals_boundary), [LLMorpheus](https://arxiv.org/abs/2404.09952).

## Slide 9. Automatic Runs and Human Review

**Tiêu đề chiếu:** Tool chạy gì, người kiểm gì?

| Bước | Ai xử lý? | Cách làm ở EShop |
| --- | --- | --- |
| Chọn phạm vi và bộ test | Nhóm cấu hình | Bốn khoảng dòng trong `server.js` cho ba nghiệp vụ. Mỗi bộ test phải pass khi chạy trên bản gốc. |
| Chọn test cho từng mutant | StrykerJS và Jest | Dry run đo test nào đi qua vị trí mutant. Với `perTest`, Stryker chọn các test đã chạm mutant và ghi `NoCoverage` khi vị trí không được chạm. |
| Chọn mutant để phân tích | Người phân tích | Lọc `Survived`. Mở diff, tìm quy tắc nghiệp vụ và đầu vào làm hai bản cho kết quả khác nhau. |
| Xác nhận phép kiểm mới | Người xác định kỳ vọng, tool chạy đối chứng | Cùng test phải pass trên bản gốc, fail tại assertion dự kiến trên đúng mutant. So file, vị trí, mutator và đoạn thay giữa hai report. |

**Lời nói:** Tool tự chạy và phân loại toàn bộ tập đã cấu hình. Người phân tích đọc kỹ các mutant dùng làm ví dụ hoặc có kết quả khó giải thích. Tool xác nhận test pass hay fail. Người phân tích dùng đặc tả để quyết định kỳ vọng nào đúng và liệu mutant có làm sai hành vi đang xét. Ba ca ở slide 13-15 có log đối chứng đến đúng assertion.

**Khi thầy hỏi sâu:** Với mutant tĩnh được nhận diện khi nạp file, StrykerJS chạy cả bộ test theo cơ chế `perTest`. Checker kỹ thuật có thể phát hiện một số lỗi biên dịch hoặc kiểu nếu được cài. Profile EShop dùng JavaScript và không bật TypeScript checker. Nếu mutant lỗi chạy hoặc timeout, giữ nhãn riêng và xem log. Nếu bản gốc sai đặc tả hoặc chưa đủ căn cứ phân biệt hai bản, tách ca đó để phân tích. [Cấu hình EShop lưu từ run](../verification/source-audit-2026-11-06/inputs/backend/stryker.overall.config.json), [StrykerJS coverage](https://stryker-mutator.io/docs/stryker-js/configuration/#coverageanalysis), [Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/), [Đối chứng assertion](../verification/source-audit-2026-11-06/target-verification/summary.json).

## Slide 13. Cart and Orders

**Tiêu đề chiếu:** Giỏ mới trả về một phần tử lạ

| Bộ test | Tests pass trên bản gốc | Tổng mutant | Killed | Timeout | Survived | NoCoverage | RuntimeError |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Ban đầu | 36 | 150 | 89 | 18 | 34 | 2 | 7 |
| Nhóm bổ sung | 44 | 150 | 112 | 18 | 11 | 2 | 7 |
| AI đã rà soát | 41 | 150 | 102 | 18 | 21 | 2 | 7 |

**Mutant 6 trong run Cart:** `GET /api/cart`, `server.js` dòng 286, quy tắc `ArrayDeclaration`. Thay giỏ mới `[]` bằng `["Stryker was here"]`. API vẫn trả HTTP 200. Test cũ bỏ sót vì chỉ kiểm tra status. Cả hai test bổ sung kiểm tra nội dung trả về là mảng rỗng.

**Trạng thái mutant 6:** Ban đầu `Survived`. Nhóm bổ sung và AI đã rà soát đều `Killed`. Hai test pass trên bản gốc và fail khi nhận mảng có chuỗi lạ.

**Speaker notes:** Dòng 286 có bốn mutant. Các ID 3, 4, 5 sửa điều kiện khởi tạo bằng cách bỏ dấu phủ định, thay điều kiện bằng `true` hoặc thay bằng `false`. Cả bốn là `Survived` ở ban đầu và `Killed` ở cả hai bộ bổ sung theo report. Đối chứng riêng trên slide là ID 6. [Report Cart baseline](../verification/source-audit-2026-11-06/mutation/cart-orders-baseline/mutation.json), [Đối chứng](../verification/source-audit-2026-11-06/target-verification/summary.json).

## Slide 14. Coupons

**Tiêu đề chiếu:** Nhập giới hạn 3 lượt, mutant lưu 1

| Bộ test | Tests pass trên bản gốc | Tổng mutant | Killed | Timeout | Survived | NoCoverage | RuntimeError |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Ban đầu | 26 | 120 | 42 | 18 | 30 | 25 | 5 |
| Nhóm bổ sung | 35 | 120 | 43 | 19 | 28 | 25 | 5 |
| AI đã rà soát | 40 | 120 | 41 | 21 | 28 | 25 | 5 |

**Mutant 113 trong run Coupons:** `POST /api/admin/coupons`, `server.js` dòng 474, quy tắc `LogicalOperator`. Chỗ lưu giới hạn đổi từ `max_uses_per_user || 1` sang `max_uses_per_user && 1`. Với đầu vào 1, hai bản cùng lưu 1. Với đầu vào 3, bản gốc lưu 3 còn mutant lưu 1.

**Trạng thái mutant 113:** Ban đầu `Survived`. Hai bộ bổ sung đều `Killed`. Test nhóm tạo coupon với giới hạn 3 rồi đọc lại. Test AI trong đối chứng dùng 2. Cả hai fail tại phép so giới hạn đã lưu vì đọc được 1.

**Speaker notes:** Dòng 474 có ba mutant. ID 111 thay toàn biểu thức bằng `true`, SQLite lưu 1, cùng mẫu `Survived / Killed / Killed`. ID 112 thay bằng `false`, cho mẫu `Killed / Killed / Killed`. Cả hai bộ bổ sung cùng đưa ID 111 và 113 từ `Survived` sang `Killed` theo report. So với baseline, một mutant khác chuyển từ `Killed` sang `Timeout` ở bộ nhóm và ba mutant chuyển như vậy ở bộ AI. Vì thế chỉ nhìn cột tổng `Killed` sẽ bỏ sót hai mutant mới được bắt. Hai bộ Coupons dùng chung ngữ cảnh Codex. [Report Coupons baseline](../verification/source-audit-2026-11-06/mutation/coupons-baseline/mutation.json), [Đối chứng](../verification/source-audit-2026-11-06/target-verification/summary.json).

## Slide 15. Authentication and Users

**Tiêu đề chiếu:** Đổi tên nhưng quyền bị xóa

| Bộ test | Tests pass trên bản gốc | Tổng mutant | Killed | Timeout | Survived | NoCoverage | RuntimeError |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Ban đầu | 26 | 125 | 64 | 18 | 23 | 7 | 13 |
| Nhóm bổ sung | 39 | 125 | 83 | 27 | 4 | 3 | 8 |
| AI đã rà soát | 37 | 125 | 74 | 27 | 13 | 3 | 8 |

**Mutant 132 trong run Auth:** `PUT /api/users/me`, `server.js` dòng 124, quy tắc `ConditionalExpression`. Đổi `if (role)` thành `if (true)`. Khi chỉ đổi tên và không gửi `role`, bản gốc giữ quyền `user`. Mutant vẫn chạy nhánh ghi quyền và giá trị lưu trở thành `null`.

**Trạng thái mutant 132:** Ban đầu `Survived`. Hai bộ bổ sung đều `Killed`. AM-01 và AI-U01 đọc lại quyền và fail khi nhận `null` thay vì `user`.

**Speaker notes:** ID 133 thay điều kiện bằng `false` và giữ `Survived` cả ba bộ. ID 134 xóa thân nhánh và giữ `NoCoverage` cả ba bộ. Bảng theo nghiệp vụ có năm mutant từ `RuntimeError` sang `Timeout` và bốn từ `Killed` sang `Timeout` ở cả hai bộ bổ sung. Giữ nguyên các trạng thái thô. Phần so trên tập hợp lệ chung 112 mutant có trong audit. [Report Auth baseline](../verification/source-audit-2026-11-06/mutation/auth-baseline/mutation.json), [Đối chứng](../verification/source-audit-2026-11-06/target-verification/summary.json), [Common-valid sets](../../docs/Source_Audit.md#common-valid-sets).

**Quy ước chung cho slide 13-15:** Số ID dùng theo từng run nghiệp vụ. Các report này có 0 `CompileError`, `Ignored` và `Pending`. Chiếu năm trạng thái có số lượng và ghi ba trạng thái 0 trong notes. Mỗi slide chiếu một diff và một kết quả quan sát. Đưa danh sách đầy đủ vào report HTML/JSON. [Raw mutation reports](../verification/source-audit-2026-11-06/mutation/).

## Slide 16. What Survived Means

**Tiêu đề chiếu:** Vì sao mutant vẫn sống sót?

**Định nghĩa chiếu:** `Survived` nghĩa là vị trí thay đổi đã được chạy, nhưng mọi test được chạy với mutant đều pass. Nếu không có test đi qua vị trí đó, StrykerJS ghi `NoCoverage` trong cấu hình của nhóm.

| Câu hỏi khi đọc một survivor | Ví dụ |
| --- | --- |
| Đầu vào có làm hai bản khác nhau? | Coupon nhập 1 thì cả hai bản cùng lưu 1. |
| Sai khác có xuất hiện ở thứ test đọc được? | Xem phản hồi API hoặc dữ liệu sau thao tác. Một sai khác nội bộ có thể bị ghi đè trước khi trả kết quả. |
| Assertion có kiểm tra đúng giá trị đó? | Test giỏ hàng chỉ kiểm tra 200 nên bỏ sót phần tử lạ. |

**Speaker notes:** Một survivor có thể tương đương nếu cả hai bản cho cùng hành vi quan sát được trên toàn bộ đầu vào và trạng thái hợp lệ đang xét. Cần lập luận hoặc bằng chứng trong phạm vi đó. Trường hợp mutant sửa lỗi có sẵn là tình huống khác. Ví dụ EShop gốc dùng `>` ở điều kiện số tiền tối thiểu, trong khi quy tắc yêu cầu chấp nhận đúng ngưỡng. Mutant đổi sang `>=` có thể sửa hành vi. Khi đó dùng đặc tả để đánh giá và giữ ca kiểm tra lỗi bản gốc riêng. [Trạng thái Stryker](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), [Just và cộng sự về sai khác nội bộ và lan truyền](https://homes.cs.washington.edu/~rjust/publ/state_infection_issta_2014.pdf), [Source EShop đã audit](../verification/source-audit-2026-11-06/inputs/backend/server.js#L379), [Báo cáo W13](../../submission/w13/Seminar_Report.md#74-equivalent-candidates-và-correcting-mutants).

## Slide 17. Joint Results by Mutant State

**Tiêu đề chiếu:** Ba bộ test bắt được những mutant nào?

| Chỉ số | Ban đầu | Nhóm bổ sung | AI đã rà soát | Cùng trạng thái cả ba |
| --- | ---: | ---: | ---: | ---: |
| Tests pass trên bản gốc | 88 | 118 | 118 | |
| Tổng mutant | 395 | 395 | 395 | |
| Killed | 191 | 238 | 217 | 188 |
| Timeout | 63 | 64 | 66 | 63 |
| Survived | 87 | 43 | 62 | 42 |
| NoCoverage | 34 | 30 | 30 | 30 |
| RuntimeError | 20 | 20 | 20 | 20 |
| Mutation score | 67,73% | 80,53% | 75,47% | |

**Hai dòng dưới bảng:** 343 trong 395 mutant giữ cùng trạng thái ở cả ba bộ. Hai bộ bổ sung cùng đưa 28 mutant từ `Survived` hoặc `NoCoverage` sang `Killed`.

**Chi tiết để nói hoặc mở khi hỏi đáp:**

| Trạng thái ở bộ ban đầu | Chuyển sang Killed ở cả hai | Chỉ bộ nhóm chuyển sang Killed | Chỉ bộ AI chuyển sang Killed | Giữ nguyên cả ba |
| --- | ---: | ---: | ---: | ---: |
| 87 Survived | 24 | 20 | 1 | 42 |
| 34 NoCoverage | 4 | 0 | 0 | 30 |
| Tổng chuyển sang Killed | 28 | 20 | 1 | |

- Bộ nhóm có 48 mutant mới được Stryker ghi `Killed`, bộ AI có 29. Một `Killed` cũ của bộ nhóm và ba của bộ AI đổi sang `Timeout`. Do đó cột `Killed` tăng ròng 47 và 26.
- 188 mutant `Killed` chung được xác định bằng đối chiếu từng signature. Đây là giao theo danh tính mutant.
- Hai bộ bổ sung cùng còn 30 `NoCoverage` và 20 `RuntimeError`. Trong joint audit, 20 lỗi này là native crash và nằm ngoài 375 mutant hợp lệ. `Timeout` nằm trong tử số mutation score và được báo riêng với `Killed`. Ba trạng thái `CompileError`, `Ignored` và `Pending` bằng 0.
- Ba ca ở slide 13-15 có đối chứng ở mức assertion. Các số trên là trạng thái do Stryker ghi cho từng bộ test. Hai bộ bổ sung có 118 test nhưng khác tình huống và cách xây dựng.

[Source Audit Joint Comparison](../../docs/Source_Audit.md#joint-comparison), [Overall baseline JSON](../verification/source-audit-2026-11-06/mutation/overall-baseline/mutation.json), [Overall manual JSON](../verification/source-audit-2026-11-06/mutation/overall-manual/mutation.json), [Overall AI JSON](../verification/source-audit-2026-11-06/mutation/overall-ai/mutation.json), [Cách tính score](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/#metrics).

## Slide 18. Removal

Xóa slide phân tích ví dụ hủy đơn theo góp ý. Sau khi duyệt, đánh lại số trang và footer thành 21 slide. Slide 19 cũ thành 18, Demo thành 19, Activity thành 20 và Q&A thành 21. Cập nhật thứ tự trong script và notes cùng lượt.

## Slide 19. A Test That Exposes the Coupon Mutation

**Tiêu đề chiếu:** Một test bắt lỗi lưu giới hạn coupon

1. **Tạo coupon giới hạn 3 lượt.** Giá trị 1 làm hai bản cùng lưu 1.
2. **Đọc lại coupon và kiểm tra giới hạn bằng 3.** Đây là giá trị người dùng vừa gửi.
3. **Chạy cùng test trên hai bản.** Bản gốc lưu 3 nên pass. Mutant lưu 1 nên fail tại phép so giới hạn.

**Lời chuyển sang demo:** Trên báo cáo em sẽ mở đúng mutant đã đổi cách lưu giới hạn. Sau đó em chạy lại ca kiểm tra để mọi người thấy vì sao bản gốc pass và mutant fail.

**Căn cứ:** Ca MF-01 đã đối chứng có `Expected: 3` và `Received: 1` trên mutant 113. Slide này dùng lại ca Coupons để nối quy trình đọc mutant, chọn dữ liệu và viết assertion với demo. [Đối chứng Coupons](../verification/source-audit-2026-11-06/target-verification/summary.json).
