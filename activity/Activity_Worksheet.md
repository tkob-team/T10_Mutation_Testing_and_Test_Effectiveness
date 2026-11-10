# Kill the Mutant Worksheet

## Task

Tạo test để tìm hành vi mà starter tests chưa phát hiện trong EShop. Chọn tính năng để đọc quy tắc. Mọi test đều làm trong cùng một phòng. Khi nộp bài, máy chấm kiểm tra suite trên bản gốc trước khi chạy các biến thể.

## Steps

1. Mở link T10 Mutation Lab do facilitator cung cấp và nhập tên hiển thị.
2. Xem các diff được facilitator trình chiếu. Với mỗi diff, ghi điều kiện kích hoạt và kết quả đúng. Có thể tự tìm thêm ca từ quy tắc, source gốc và starter tests.
3. Mở Dựng test hoặc Viết code. Chọn tình huống dữ liệu, thêm các lời gọi rồi kiểm tra kết quả. Dùng ca chuẩn nếu không cần điều kiện ban đầu khác.
4. Bấm Nộp bài ở tab đang soạn. Nếu có test chưa đạt, xem bước lỗi, đối chiếu giá trị nhận được với quy tắc, sửa rồi nộp lại.
5. Chia sẻ một test với người review. Giải thích test gap, input, kết quả mong đợi và lý do biến thể có thể bị phát hiện.
6. Xem tally. Mỗi mutant được phát hiện bằng assertion hợp lệ cộng 1 điểm lần đầu. Phần đang chấm hoặc lỗi thực thi có trạng thái riêng.

## Response sheet

| Mục | Quy tắc và khoảng trống | Fixture, thao tác và dữ liệu | Assertion mong đợi | Original / kết quả chấm | Ý kiến review |
|---|---|---|---|---|---|
| Diff 1 | | | | | |
| Diff 2 | | | | | |
| Diff 3 | | | | | |
| Diff 4 | | | | | |
| Diff 5 | | | | | |
| Ca tự tìm | | | | | |

## Hints

- Khi kiểm tra trạng thái, hãy đọc lại kết quả sau thao tác thay đổi.
- Với thời gian hết hạn hoặc khóa tài khoản, thử một giá trị tại biên và một giá trị lân cận.
- Dùng kết quả của lời gọi trước nếu lời gọi tiếp theo cần một ID vừa tạo.
- Một assertion nên so với điều quy tắc yêu cầu. Chạy qua một dòng code chỉ cho thấy đường thực thi đã được đi qua.
