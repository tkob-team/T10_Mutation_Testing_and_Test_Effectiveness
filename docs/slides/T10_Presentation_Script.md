# T10 Presentation Script

Kịch bản tập nói theo [PowerPoint W13](../../submission/w13/T10_Mutation_Testing_Slides.pptx). Phần pitch gồm slide 1 đến 19, khoảng 10 phút. Slide 20 mở demo 10 phút, slide 21 mở activity 20 phút, slide 22 dành cho Q&A 5 phút.

Mốc giờ là mục tiêu khi tập, có tính thời gian chuyển slide và dừng hỏi lớp. Dòng **Cue** là thao tác. Phần trích dẫn bên dưới là lời để nói.

## Slide 01. Cover (0:00-0:22)

**Cue** Nhìn lớp khi đặt câu hỏi mở đầu.

> Em chào thầy cô và các bạn. Nhóm em là nhóm 12. Khi chạy test mà thấy toàn màu xanh, mình thường yên tâm. Nhưng nếu giỏ hàng trả sai mà bộ test vẫn xanh thì sao? Hôm nay nhóm em sẽ cố tình tạo một thay đổi sai trên EShop để xem bộ test có nhận ra không. Đó là ý tưởng của Mutation Testing.

## Slide 02. Opening Example (0:22-0:52)

**Cue** Chỉ ô Bản gốc, rồi chỉ ô Biến thể. Dừng hai giây sau câu hỏi.

> Giả sử các bạn vừa đăng ký tài khoản và mở giỏ lần đầu. Bên trái là giỏ trống như mình mong đợi. Bên phải tự nhiên có sẵn một món. Cả hai lần mở giỏ đều được hệ thống báo thành công. Vậy nếu em viết test chỉ để hỏi "Mở giỏ được chưa?", test sẽ báo sao? Cả hai đều pass. Muốn thấy món hàng dư, test phải nhìn vào bên trong giỏ.

## Slide 03. Coverage and Assertion (0:52-1:20)

**Cue** Chỉ lần lượt hai cột Coverage và Assertion.

> Hai lần chạy vừa rồi đều đi qua đoạn xử lý mở giỏ. Đó là điều coverage cho mình biết. Nhưng em có thể viết hai test khác nhau cho đúng đoạn xử lý đó. Một test kiểm tra mở giỏ thành công. Test kia còn kiểm tra giỏ có trống không. Câu kiểm tra "giỏ có trống không" là một assertion. Nó mới chỉ ra được món hàng dư ở ví dụ này.

## Slide 04. Mutation Testing Workflow (1:20-1:53)

**Cue** Chỉ bốn bước từ trái sang phải.

> Vậy mình thử bộ test bằng cách nào? Trước hết, chạy bộ test trên bản gốc để có mốc đối chiếu. Sau đó, công cụ tạo một bản sao và sửa đúng một chỗ, chẳng hạn bỏ bước lưu dữ liệu. Bản sao có thay đổi đó gọi là mutant. Em đem nguyên bộ test lúc đầu chạy lại trên mutant để xem sự thay đổi có làm test nào báo lỗi không.

## Slide 05. Boundary Input (1:53-2:28)

**Cue** Chỉ hai ô 499 và 501 trước. Dừng lại ở ô 500.

> Thử tưởng tượng cửa hàng cho ưu đãi từ năm trăm nghìn. Nếu ai đó sửa thành "trên năm trăm nghìn", mình mất gì? Đơn dưới ngưỡng vẫn bị từ chối, đơn trên ngưỡng vẫn được nhận. Chỉ đơn đúng năm trăm nghìn mới bị xử lý khác đi. Vì vậy, thay vì thêm nhiều đơn ở hai phía, em sẽ chọn đúng đơn năm trăm nghìn và kiểm tra xem nó có được hưởng ưu đãi không.

## Slide 06. Mutant Statuses (2:28-3:02)

**Cue** Dùng lại cùng mutant giỏ hàng để giải thích ba nhãn bên trái. Sau đó chỉ hai nhãn liên quan đến quá trình chạy.

> Quay lại ví dụ giỏ hàng. Nếu test nhìn thấy món hàng dư và báo lỗi, mutant đó bị đánh dấu Killed. Nếu test mở giỏ nhưng vẫn pass, nó là Survived. Nếu không có test nào đi tới đoạn bị đổi thì là NoCoverage. Hai nhãn còn lại cho biết lần chạy gặp trục trặc ở đâu. Timeout là chạy quá lâu. RuntimeError là gặp lỗi trong lúc thực thi.

## Slide 07. Mutation Score (3:02-3:36)

**Cue** Nhấn vào Timeout. Để công thức trên màn hình cho lớp tự đối chiếu.

> Nhìn công thức này, có một chỗ dễ hiểu nhầm. Stryker xếp cả Killed lẫn Timeout vào nhóm được tính là đã phát hiện. Sau đó, công cụ chia cho tổng số mutant hợp lệ. Những mutant lỗi thực thi được tách riêng. Nên khi thấy điểm tăng, em sẽ hỏi thêm là có test nào thực sự báo sai ở kết quả cần kiểm tra, hay lần chạy chỉ vượt thời gian.

## Slide 08. Tool Selection (3:36-4:02)

**Cue** Chỉ ba công cụ, rồi dừng ở StrykerJS.

> Tụi em đã có bộ test Jest cho backend JavaScript của EShop. Cái cần tìm là một công cụ có thể lấy bộ test đó chạy lại với các biến thể. PIT phù hợp nếu hệ thống viết bằng Java. mutmut là lựa chọn cho Python. Với EShop, StrykerJS hợp với bộ công cụ sẵn có, và báo cáo cho nhóm mở ra xem từng chỗ bị thay đổi.

## Slide 09. StrykerJS and Jest (4:02-4:25)

**Cue** Đi theo mũi tên từ StrykerJS sang Báo cáo.

> Ví dụ em muốn xem lại mutant làm giỏ có thêm một món. Stryker tạo bản thay đổi, rồi giao cho Jest chạy test. Sau đó, em mở báo cáo để tìm đúng thay đổi đó. Nếu nó vẫn sống, em quay lại test và xem mình đã thử tình huống nào, rồi đã kiểm tra kết quả nào.

## Slide 10. AI Suggestions and Review (4:25-5:00)

**Cue** Chỉ ba ô từ Đầu vào tới Rà soát.

> Khi bí ý tưởng viết thêm test, tụi em nhờ AI gợi ý. Để agent hiểu bài toán, nhóm đưa cho nó quy tắc nghiệp vụ, phần bị đổi và test hiện có. Đọc đề xuất xong, tụi em kiểm tra xem kết quả mà AI mong đợi có đúng với quy tắc hay không. Rồi mới chạy thử. Test cần qua trên bản gốc và báo sai đúng ở chỗ mutant làm hỏng.

## Slide 11. EShop Scope (5:00-5:26)

**Cue** Chỉ ba nhóm nghiệp vụ. Nhấn phần đọc dữ liệu sau thao tác.

> Nếu nhìn từ phía khách mua hàng thì EShop có mấy việc rất quen. Mình đăng nhập, thêm đồ vào giỏ, dùng mã giảm giá rồi đặt đơn. Tụi em chọn các nhóm API xử lý tài khoản, giỏ và đơn hàng, và mã giảm giá. Mở giỏ thì xem danh sách API trả về. Sửa hồ sơ thì đọc lại dữ liệu đã lưu.

## Slide 12. Comparison Setup (5:26-5:58)

**Cue** Chỉ ba bộ test từ trái sang phải.

> Nếu em đổi cả bộ test lẫn tập mutant, điểm tăng lên thì khó biết do test tốt hơn hay do biến thể lần sau dễ bắt hơn. Nên nhóm giữ nguyên bản EShop và tập mutant. Tụi em chạy lần lượt bộ ban đầu, bộ có ca do nhóm bổ sung và bộ có đề xuất từ AI đã được rà lại. Ca nào vốn đã fail trên bản gốc thì được đưa sang bộ kiểm tra lỗi riêng.

## Slide 13. Cart Case (5:58-6:27)

**Cue** Chỉ Test cũ trước, rồi chỉ Phép kiểm thêm.

> Ở đầu bài, món hàng dư lọt qua vì test dừng ở chữ "thành công". Tụi em vẫn mở giỏ theo đúng cách cũ, nhưng lần này lấy danh sách trả về và kiểm tra số món phải bằng không. Giỏ ở bản gốc trống nên test qua. Giỏ của mutant có một món nên test báo sai. Phép kiểm này có trong cả hai bộ bổ sung.

## Slide 14. Coupon Case (6:27-7:03)

**Cue** Đọc hàng nhập 1, rồi chỉ ô mutant lưu 1 ở hàng nhập 3.

> Ca coupon hơi khác. Test cũ đã đọc lại giá trị lưu, nhưng nó chỉ thử giới hạn một lượt. Hệ thống lưu đúng hay luôn lưu một thì lần thử đó đều cho ra một. Giờ em nhập ba. Bản gốc phải lưu ba. Nhìn ô bên phải, bản biến thể vẫn lưu một. Nhờ đổi đầu vào, phép kiểm giá trị đã lưu mới có cơ hội bắt lỗi.

## Slide 15. Account Permission Case (7:03-7:34)

**Cue** Kể tình huống sửa hồ sơ. Dừng nhẹ ở chỗ hệ thống báo lưu thành công, rồi chỉ dòng đọc lại quyền.

> Ví dụ em có tài khoản khách hàng. Em vào hồ sơ, sửa tên và địa chỉ rồi bấm lưu. Tài khoản vẫn phải là khách hàng. Ở bản biến thể, hệ thống lại ghi đè luôn quyền, dù em đâu có yêu cầu đổi. API báo đã lưu, nhưng đọc lại thì ô quyền bị trống. Cả hai bộ test mới đều kiểm tra chỗ đó và báo lỗi.

## Slide 16. Surviving and Equivalent Mutants (7:34-8:11)

**Cue** Chỉ ba câu hỏi bên trái, rồi chuyển sang hai trường hợp bên phải.

> Thấy một mutant còn sống, em sẽ lần theo test trước. Nó có chạy qua chỗ bị đổi chưa? Với dữ liệu đang dùng, hai bản có cho kết quả khác nhau không? Nếu có, test đã nhìn vào đúng kết quả đó chưa? Cũng có khi hai bản xử lý giống nhau trên mọi đầu vào hợp lệ. Nếu mới thử vài ca mà kết quả giống nhau, em chỉ có thể gọi nó là ứng viên tương đương. Ngoài ra, có mutant vô tình sửa đúng lỗi của bản gốc, như cho áp mã khi đơn vừa đạt mức tối thiểu theo đặc tả.

## Slide 17. Joint Results (8:11-8:45)

**Cue** Đọc ba cột theo thứ tự và dùng số đã làm tròn trên màn hình.

> Nhìn từ trái sang phải, bộ test ban đầu đạt khoảng sáu mươi tám phần trăm. Khi thêm các ca theo phân tích của nhóm, điểm lên khoảng tám mươi mốt phần trăm. Với các ca AI đề xuất đã được rà lại, điểm là khoảng bảy mươi lăm phần trăm. Đây là cùng một tập mutant hợp lệ trong lần audit. Để hiểu chênh lệch, mình quay lại một tình huống mà hai bộ xử lý khác nhau.

## Slide 18. Why the Suites Differ (8:45-9:21)

**Cue** Kể một lần bấm hủy đơn. Chỉ vào dòng đọc lại trạng thái để giải thích vì sao hai bộ test bắt được khác nhau.

> Giả sử em bấm hủy đơn. Thông báo nói đã hủy, nhưng khi đọc lại, đơn chưa được lưu là đã hủy. Bộ của nhóm có ca kiểm tra trạng thái sau thao tác, nên bắt được lỗi này. Bộ có AI hỗ trợ trong lần chạy đó thiếu tình huống này. Chênh lệch mình thấy gắn với những ca cụ thể. Riêng phần coupon, hai bộ còn dùng chung ngữ cảnh AI, nên chưa thể dùng kết quả này để xếp hạng người viết hay model.

## Slide 19. Takeaways (9:21-9:55)

**Cue** Chỉ ba bước rồi chuyển sang slide Live Demo.

> Lúc xem một mutant còn sống, em sẽ hỏi hai câu. Em nên gửi dữ liệu gì để hai bản xử lý khác nhau? Sau đó em cần đọc lại cái gì để thấy sự khác biệt? Ca coupon trả lời được cả hai. Gửi giới hạn ba lượt, rồi đọc lại đúng giới hạn đã lưu. Bây giờ tụi em sẽ mở báo cáo và kiểm chứng ca đó ngay trên EShop.

## Slide 20. Live Demo (10 minutes)

**Cue** Chiếu lời dẫn rồi chuyển sang màn hình demo. Mở sẵn các báo cáo Coupons và đề xuất Codex đã lưu.

> Lúc nãy các bạn đã thấy bảng nhập ba mà lưu một. Giờ em mở báo cáo thật để chỉ vì sao Stryker vẫn ghi mutant đó là Survived với bộ test cũ. Sau đó, mình xem đề xuất Codex đã lưu và đối chiếu cùng một mutant trong ba báo cáo. Mình sẽ nhìn cả kết quả chạy trên bản gốc.

### Demo Cues

| Việc trên màn hình | Câu nói ngắn |
|---|---|
| Mở báo cáo ban đầu và chỉ mutant đang Survived | "Test cũ gửi một lượt. Cả hai bản lưu một, nên mutant này vẫn sống." |
| Chỉ ca bổ sung của nhóm | "Tụi em gửi ba lượt rồi đọc lại coupon. Giá trị đúng phải là ba." |
| Mở đề xuất Codex đã lưu và chỉ các giá trị 2 và 4 | "Đây là đề xuất Codex đã lưu. Test thử hai giá trị khác nhau và kiểm tra hệ thống lưu đúng từng giá trị." |
| Chỉ kết quả bản gốc và trạng thái của cùng mutant trong báo cáo | "Ở bản gốc, nhập ba thì đọc lại đúng ba. Còn ở mutant này, test đọc lại một và báo sai ngay ở phép kiểm đó." |

Lệnh và thao tác đầy đủ nằm trong [Demo Script](../Demo_Script.md). Nếu chuyển sang báo cáo dự phòng, nói "Đây là kết quả nhóm đã lưu từ lần chạy trước. Em sẽ mở cùng mutant ở từng báo cáo để mình đối chiếu."

## Slide 21. Kill the Mutant (20 minutes)

**Cue** Chiếu link phòng do điều phối viên cung cấp. Sau lời dẫn, chuyển sang màn hình T10 Mutation Lab.

> Bây giờ đến lượt các bạn thử bắt mutant. Mọi người vào cùng một phòng bằng link trên màn hình. Khi tụi em chiếu một thay đổi, hãy tự hỏi mình sẽ gửi dữ liệu gì và đọc kết quả nào để phát hiện lỗi. Các bạn có thể dựng test hoặc viết code. Khi nộp, nhớ đứng ở tab mình đang soạn. Hệ thống thử bài trên bản gốc trước. Mỗi mutant mới bắt được bằng phép kiểm hợp lệ sẽ cộng một điểm. Đến phần góp ý, hãy đổi một test cho nhóm khác và giải thích vì sao các bạn chọn ca đó.

### Facilitation Cues

- **Phút 0-2** Mở phòng, nhắc cách tính điểm và chiếu các thay đổi đã chọn.
- **Phút 2-12** Cho lớp soạn và nộp test. Nếu có bài chưa đạt trên bản gốc, nhắc người chơi đọc giá trị thực tế và kỳ vọng trong kết quả chấm.
- **Phút 12-16** Đổi một test để góp ý trong lúc các bài đã nhận được chấm.
- **Phút 16-20** Mời một nhóm giải thích đầu vào và phép kiểm. Xem bảng điểm và chuyển sang Q&A. Nếu còn bài ảnh hưởng điểm đang được xử lý, gọi kết quả là tạm tính.

Tham chiếu [Facilitator Guide](../../activity/Facilitator_Guide.md) và [Activity Platform Spec](../../activity/Activity_Platform_Spec.md).

## Slide 22. Q&A (5 minutes)

**Cue** Quay lại slide kết thúc và nhìn lớp.

> Trong phần vừa rồi, có nhóm nào đổi dữ liệu đầu vào thì mới làm lỗi lộ ra không? Nếu có, nhóm mình đã thử giá trị nào và kiểm tra kết quả gì? Các bạn có thể chia sẻ ca đó. Nhóm em cũng xin mời thầy cô và các bạn đặt câu hỏi.

**Câu kết sau Q&A**

> Nhóm em cảm ơn thầy cô và các bạn đã theo dõi và tham gia thử thách.

### If Asked

- **Vì sao slide ghi 68%, 81% và 75%?** Đó là các số làm tròn từ 67,73%, 80,53% và 75,47% của lần audit ngày 06/11/2026. Báo cáo W13 ghi lần chạy trước với baseline 67,56%. Trong audit, hai mutant ở baseline chuyển từ RuntimeError sang Timeout, nên điểm baseline thay đổi. Cả ba bộ trong biểu đồ audit có cùng tập 375 mutant hợp lệ.
- **Timeout có được tính là bắt được lỗi không?** Stryker tính Timeout vào mutation score. Khi kết luận một assertion bắt được lỗi nghiệp vụ, nhóm xem test nào thất bại và lý do thất bại.
- **Có thể kết luận nhóm viết test tốt hơn AI không?** Lần chạy này cho thấy hai bộ test bắt được những tình huống khác nhau. Ví dụ bộ của nhóm có ca đọc trạng thái sau khi hủy đơn. Phạm vi ca thử khác nhau và Coupons có chung ngữ cảnh AI, nên kết quả chưa tách được ảnh hưởng của người viết hoặc model.

## Sources

- [PowerPoint W13](../../submission/w13/T10_Mutation_Testing_Slides.pptx) và [bản PDF W13](../../submission/w13/T10_Mutation_Testing_Slides.pdf)
- [Seminar Report W13](../../submission/w13/Seminar_Report.md)
- [Source Audit, Joint Comparison](../Source_Audit.md#joint-comparison)
- [Log đối chứng quyền tài khoản trên mutant](../../evidence/verification/source-audit-2026-11-06/target-verification/auth-mutant-manual.log)
- [Yêu cầu thời lượng seminar](../../requirements/Seminar_Requirements_Consolidated.md)
