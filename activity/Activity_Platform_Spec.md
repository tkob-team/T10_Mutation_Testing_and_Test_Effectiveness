# Activity Platform Spec

## Product

T10 Mutation Lab dùng một phòng cho toàn bộ activity. Cart and Orders, Coupons và Auth là các nhóm tính năng trong cùng giao diện và cùng bộ kiểm thử. Người chơi đọc quy tắc, source gốc và starter tests, rồi tìm một tình huống, input và assertion mới. Một bài có thể dùng thao tác từ nhiều feature và được chấm trên pack của cả phòng.

Activity giữ giới hạn 20 phút. Brief giảng viên mô tả trình chiếu 5 diffs, đổi bài review và tally. Worksheet và Facilitator Guide hướng dẫn lồng phần này vào cùng phòng. Người chơi có thể tìm thêm mutant ngoài ví dụ hướng dẫn trong lượt làm bài. Source mutant, khóa và đáp án do điều phối viên giữ; UI chỉ công bố source gốc, starter tests, quy tắc và metadata.

Khi điều phối viên mở phòng, người có link vào bằng tên hiển thị. Dọn phiên trong Host Console dừng chấm phiên hiện tại, lưu báo cáo riêng và đưa trang người chơi về trạng thái chờ phòng mới.

## Authoring

- Dựng test mở mặc định. Viết code có editor JavaScript tô cú pháp và đánh số dòng. Hai tab lưu nháp độc lập trên thiết bị. Nộp bài lấy nội dung từ tab đang mở.
- Thêm tình huống tạo sẵn lời gọi đầu tiên và thu gọn các tình huống khác. Mỗi bộ dữ liệu hiển thị điều kiện bắt đầu của giỏ hàng, mốc mở khóa Bob, hạn mã và số lượt dùng. Thêm bước kiểm tra sau khi chọn hàm. Giới hạn 12 tình huống, 24 bước mỗi tình huống và 90 bước cho bộ test.
- Editor nhận tập con Jest-like qua parser, gồm test/it, lời gọi sut, const, tham chiếu và expect. Runtime nhận cấu trúc dữ liệu đã validate.
- Nộp bài tạo lượt chấm duy nhất và lưu snapshot bất biến. Khi đang chấm, UI hiển thị Bot đang chấm bài. Khi có lỗi, UI chỉ ra test chưa đạt và giá trị nhận được so với mong đợi. Mutant mới đã xác nhận hiện cùng số điểm được cộng.
- Tải lại trên cùng trình duyệt lấy trạng thái từ cookie. Nếu mất phiên, điều phối viên cấp liên kết vào lại dùng một lần, hết hạn sau 10 phút. Liên kết khôi phục người tham gia và bài đã nộp. Nháp chưa nộp vẫn nằm trên thiết bị soạn.

## Scoring

- Original phải pass toàn suite trước khi enqueue các biến thể đủ điều kiện chấm. Bài chấm có thể phát hiện mutant ngoài nhóm tính năng đang xem.
- Mỗi mutant duy nhất bị phát hiện bằng assertion hợp lệ cộng 1 điểm cho cùng người/đội trong phòng. Điểm cộng qua các lượt hợp lệ. Cùng tổng thì đồng hạng. Tạm tính cho đến khi Host chốt.
- Timeout, crash hoặc lỗi môi trường có evidence riêng. Lỗi hạ tầng tạm thời được retry có giới hạn. Lượt còn chưa kết luận cần xem lại trước khi chốt.
- Pack mở rộng tạo từ EShop tại `1be4637`. Có 81 ứng viên từ audit và 69 mutants có đối chứng trong pack chấm, gồm 21 Cart and Orders, 44 Coupons và 4 Auth. Điểm hiện tại và trần điểm hiện cạnh nút nộp. Phạm vi pack giữ cố định theo hash của phòng.

## Deployment and validation

Docker Compose trên Windows/WSL2 chạy web, PostgreSQL, scheduler và executor. SQLite chỉ dùng bên trong fixture SUT. Executor dùng pack chỉ đọc, không nhận credentials của DB platform. Console dùng cổng loopback riêng và hiện tổng lượt nộp, hàng chờ, danh sách người tham gia, nội dung từng lượt và các lỗi cần xử lý. Hướng dẫn vận hành trong [Facilitator Guide](Facilitator_Guide.md). Xem [Validation](../evidence/activity/rebuild-validation-2026-11-10/README.md) để phân biệt kết quả kỹ thuật và pilot.
