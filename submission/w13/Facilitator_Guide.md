# Facilitator Guide

## Preparation

- Dùng Docker Compose trên máy seminar. Chuẩn bị pack 69 mutant từ revision `1be4637`, xác nhận hash và chạy reference controls trước khi mở phòng.
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

Bộ đối chứng dùng fixture chuẩn và năm survivor của luồng checkout và quản lý đơn trong pack 69 mutant. Chuẩn bị các diff từ `backend/server.js` tại revision `1be4637`. Dùng ID và dòng dưới đây để chiếu đúng thay đổi. Giữ phần expected dành cho điều phối viên.

| Diff | Mutant | Thay đổi để chiếu | Test đối chứng |
|---|---|---|---|
| 1 | orders-32, dòng 306 | Message `Checkout successful` thành chuỗi rỗng. | Checkout bằng Alice, tổng 200000. Kiểm tra message có `Checkout successful`. |
| 2 | orders-38, dòng 314 | Tham số truy vấn `[req.user.id]` thành `[]`. | Checkout bằng Alice. Lấy ID trả về rồi đọc danh sách của Alice. Kiểm tra ID và trạng thái `pending`. |
| 3 | orders-51, dòng 326 | Body 404 `{ error: "Order not found" }` thành `{}`. | Checkout bằng Alice, thử hủy bằng Bob. Kiểm tra HTTP 404 và `error` có `Order not found`. |
| 4 | orders-68, dòng 335 | Giá trị lưu `"canceled"` thành chuỗi rỗng. | Checkout rồi hủy bằng Alice. Đọc lại theo ID và kiểm tra trạng thái `canceled`. |
| 5 | orders-63, dòng 330 | Body 400 `{ error: "Cannot cancel this order." }` thành `{}`. | Checkout bằng Alice rồi hủy hai lần. Kiểm tra lần hai trả 400 và `error` có `Cannot cancel`. |

Các assertion về message là phép kiểm hợp đồng phản hồi được runner đối chứng. Với mỗi bài, phân biệt việc xác minh message, mã HTTP và trạng thái lưu. Người chơi có thể phát hiện thêm mutant khác trong pack cùng phòng.

## Review rubric

Một test tốt nêu đúng quy tắc, chọn input phân biệt hai hành vi, dùng expected có căn cứ và pass trên bản gốc. Review ghi lại một điểm tốt và một điểm cần sửa. Điểm ranking lấy từ judge. Lỗi thực thi, timeout và ca chỉ pass trên original cần được giải thích riêng.

## Demo cue

Mở tính năng Giỏ hàng và đơn hàng. Trong Builder, thêm sản phẩm cho Alice với ID 7, số lượng 2 và đơn giá 50000. Gọi cart hai lần cho Alice. Kiểm tra body[0].quantity của lần đọc thứ hai bằng 2. Bấm Nộp bài để thấy một điểm mới trên bảng chiếu. Mở tab Viết code để chỉ vị trí soạn. Quay lại Builder để kiểm tra nháp. Trong Host Console, chọn tên người chơi rồi mở lượt vừa nộp.

## Contingency

Nếu URL gián đoạn, giữ lượt đã nhận và hướng dẫn tải lại. Nếu người chơi mất phiên, chọn tên của họ trong Host Console rồi cấp liên kết vào lại. Gửi riêng, dùng một lần trong 10 phút. Nếu máy chấm không phục hồi trong cửa sổ activity, phát worksheet với cùng quy tắc và diff, đổi bài review, dùng runner đối chứng đã kiểm tra nếu còn truy cập được. Ghi tally đã xác minh và ca đang chờ.

## Evidence

Sau buổi chạy thử, ghi host, mạng, số người hoặc đội, số phút từng phần, lượt chưa xử lý, phản hồi về Builder/Editor và người review. Technical verification nằm trong [Validation](../../evidence/activity/rebuild-validation-2026-11-10/README.md).
