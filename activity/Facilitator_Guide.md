# Facilitator Guide

## Preparation

- Dùng Docker Compose trên máy seminar. Chuẩn bị pack từ revision `1be4637`, xác nhận hash và chạy toàn bộ reference controls trước khi mở phòng.
- Mở Participant, Host Console và Projector trên các địa chỉ được ghi trong README của platform. Mở thử URL từ thiết bị học viên dùng cùng mạng.
- Chuẩn bị bản phát tay [Worksheet](Activity_Worksheet.md), bảng tally và các diff đã chọn. Phần đáp án ở dưới dành cho điều phối viên.
- Kiểm tra lần lượt join, nộp, xem lỗi từng test, đổi bài review và chốt bảng điểm với người học thử. Ghi thời gian và người xác nhận.

## Suggested 20-minute flow

| Thời gian | Việc làm |
|---|---|
| 0 đến 2 phút | Mở phòng, nói quy tắc 1 điểm và trình chiếu 5 diff đã chuẩn bị. |
| 2 đến 12 phút | Người chơi soạn và nộp assertions. Có thể tiếp tục thử các ca ngoài ví dụ. |
| 12 đến 16 phút | Đóng nhận bài. Đổi một test để review trong khi queue xử lý các bài đã nhận. |
| 16 đến 20 phút | Kiểm tra các lượt lỗi, tally, giải thích một assertion và thu phản hồi ngắn. Nếu còn lượt ảnh hưởng điểm, giữ bảng tạm tính. |

## Answer key

Bộ đối chứng chạy với fixture chuẩn. Các diff 1 đến 5 là mẫu xuyên feature trong cùng phòng. Nếu cần bám nguyên văn brief chỉ dùng checkout, cần chuẩn bị 5 diff checkout đã qua đối chứng và pilot trước khi đổi worksheet.

| Diff | Mutant | Hành vi đúng và test đối chứng |
|---|---|---|
| 1 | orders-4 | Thêm sản phẩm với quantity 2 cho Alice. Đọc giỏ hai lần vẫn thấy 2. Giỏ Bob rỗng. |
| 2 | orders-68 | Tạo đơn rồi hủy bằng chủ đơn. Lấy ID checkout và đọc lại, trạng thái phải là canceled. |
| 3 | coupons-33 | Mã LABFIXED còn hợp lệ ở phút 6 trên đơn 250.000 và giảm 35.000. Phút 7 phải từ chối. |
| 4 | coupons-113 | Tạo mã có 3 lượt. Sau 2 lần ghi nhận vẫn áp dụng được. Sau lần thứ ba phải từ chối. |
| 5 | auth-32 | Bob bị khóa ở phút 3 và có thể đăng nhập ở phút 4. Alice vẫn đăng nhập được trước đó. |

Hai biến thể mở rộng trong pack thử là orders-32 và coupons-120. Kiểm tra nội dung message thành công trong checkout và tạo coupon. Giữ diff của hai biến thể này cho phần giải thích sau lượt làm bài.

## Review rubric

Một test tốt nêu đúng quy tắc, chọn input phân biệt hai hành vi, dùng expected có căn cứ và pass trên bản gốc. Review ghi lại một điểm tốt và một điểm cần sửa. Điểm ranking lấy từ judge. Lỗi thực thi, timeout và ca chỉ pass trên original cần được giải thích riêng.

## Demo cue

Mở tính năng Giỏ hàng và đơn hàng. Trong Builder, thêm sản phẩm cho Alice với ID 7, số lượng 2 và đơn giá 50000. Gọi cart hai lần cho Alice. Kiểm tra body[0].quantity của lần đọc thứ hai bằng 2. Bấm Nộp bài để thấy một điểm mới trên bảng chiếu. Mở tab Viết code để chỉ vị trí soạn. Quay lại Builder để kiểm tra nháp. Trong Host Console, chọn tên người chơi rồi mở lượt vừa nộp.

## Contingency

Nếu URL gián đoạn, giữ lượt đã nhận và hướng dẫn tải lại. Nếu người chơi mất phiên, chọn tên của họ trong Host Console rồi cấp liên kết vào lại. Gửi riêng, dùng một lần trong 10 phút. Nếu máy chấm không phục hồi trong cửa sổ activity, phát worksheet với cùng quy tắc và diff, đổi bài review, dùng runner đối chứng đã kiểm tra nếu còn truy cập được. Ghi tally đã xác minh và ca đang chờ.

## Evidence

Sau buổi chạy thử, ghi host, mạng, số người hoặc đội, số phút từng phần, lượt chưa xử lý, phản hồi về Builder/Editor và người review. Technical verification nằm trong [Validation](../evidence/activity/rebuild-validation-2026-11-10/README.md).
