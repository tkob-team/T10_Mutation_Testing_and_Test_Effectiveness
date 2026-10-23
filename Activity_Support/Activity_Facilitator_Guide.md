# Facilitator Guide and Answer Key

**Distribution:** Not_submit. Không phát đáp án trước vòng thi. Audience nhận Activity_Worksheet.md. Bộ sandbox trong thư mục cùng tên có cờ Not_submit dùng để chuẩn bị và chấm bài.

## 1. Prepare before Class

Dùng một clone thực hành riêng của workshop starter 6d2e790, Node 24.x. Không dùng checkout nghiên cứu hoặc code đã thêm assertions từ User Guide.

~~~sh
git clone https://github.com/tkob-team/eshop-sut-workshop.git activity-lab
cd activity-lab
git switch --detach 6d2e790be54193d44f7e401c59dbdf8283a3f42d
cd backend
npm ci
npm test
npm install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/jest-runner@10.0.0
~~~

Mở terminal thứ hai tại thư mục chứa run-activity.cjs. Truyền đường dẫn backend clone vừa tạo và reference.cjs:

~~~sh
node run-activity.cjs "/absolute/path/activity-lab/backend" reference.cjs
~~~

Thay đường dẫn bằng vị trí thật; Windows chấp nhận dạng C:/... trong dấu ngoặc kép. Runner không clone hay cài packages thay người chuẩn bị. Chỉ chạy trên clone riêng; runner tạo test/activity.test.js, test/activity.candidate.cjs, activity.stryker.json và reports/activity, không sửa server.js.

Runner xác minh commit/source, chạy 5 candidate tests trên original trước, rồi chạy Stryker với disableBail để thu đầy đủ killedBy. Điểm được đối chiếu với tên test K1 đến K5, không dựa riêng vào trạng thái Killed tổng hợp.

## 2. Reference Answers

~~~js
K1: ({ empty }) => expect(empty.body).toEqual([])

K2: ({ cart, itemA, itemB }) =>
  expect(cart.body).toEqual([itemA, itemB])

K3: ({ reread, itemA, itemB }) =>
  expect(reread.body).toEqual([itemA, itemB])

K4: ({ history, ownId }) =>
  expect(history.body).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: ownId })])
  )

K5: ({ canceled }) => expect(canceled.status).toBe('canceled')
~~~

K2 phát hiện thiếu thao tác ghi; K3 phát hiện GET phá dữ liệu. Hai mutants khác nhau dù cùng có thể dẫn đến giỏ rỗng. K4 dùng ID thật của fixture, tránh hard-code ID seed. K5 đọc persisted state, không chỉ thông báo HTTP.

Chấp nhận cách viết khác nếu oracle tương đương. Nếu candidate mở rộng thêm yêu cầu như chỉ có đơn của U, review spec rồi chạy kiểm chứng; không chấm theo mức giống đáp án mẫu.

## 3. Run Audience Candidates

Copy candidate.cjs thành file riêng cho từng đội. Điền đúng 5 functions, giữ nguyên keys K1 đến K5. Không dán pseudocode trực tiếp vào file JavaScript.

~~~sh
node run-activity.cjs "/absolute/path/activity-lab/backend" team-a.cjs
~~~

Đọc reports/activity/tally.json, lưu toàn bộ reports/activity sang thư mục riêng của đội trước lần chạy tiếp theo. Runner ghi đè output hiện tại. Mỗi đội chạy từ fixtures mới vì Jest mở process mới; không trộn assertions của các đội vào một test set.

Xem original.log và mutation.log khi lỗi. Nếu original fail hoặc thiếu assertion, runner dừng và không tạo tally mới. Không dùng tally cũ để chấm lần chạy lỗi. ReferenceError, lỗi setup hoặc test timeout phải được review lại, không quy thành lỗi đã được assertion phát hiện.

Chỉ chạy code đã facilitator review. Race tính số kills hợp lệ, không tính tốc độ chạy máy. Có thể dùng nhiều clone đã cài sẵn để đáp ứng cửa sổ chấm 4 phút; diễn tập theo số đội thật trước giờ học.

## 4. Baseline and Evidence

Phạm vi gồm lines 286, 293, 314, 335 của server.js. Baseline 36 tests Cart & Orders cho 8 Survived, 0 Killed, 0 Timeout; chọn 5 signatures như worksheet. Đây là baseline dạy học riêng, không thay baseline nghiên cứu của nhóm.

Reference run cần đạt 5 original tests pass và 5/5 target kills, mỗi case có đúng test K tương ứng trong killedBy. Ba mutants ngoài bài không được cộng điểm. Báo lỗi thực thi riêng, không gọi là equivalent. Raw JSON và cấu hình được giữ trong sandbox/evidence của lần kiểm chứng.

## 5. Facilitation Checklist

- Chuẩn bị 5 diffs, context và worksheet trước giờ, giấu reference.cjs.
- Kiểm tra reference đạt 5/5; kiểm tra candidate rỗng bị từ chối.
- Cho đội đọc rule, viết, đổi bài, rồi xác nhận bản chuyển pseudocode nếu có.
- Ghi original pass và mutant outcome thật vào bảng.
- Hòa điểm thì đồng hạng; chọn một đội giải thích cách quan sát dữ liệu.
- Chưa có audience run/pilot thật thì để trống các kết quả tương ứng.

## 6. Troubleshooting

Nếu thiếu sqlite binding, kiểm tra Node 24 và chạy npm ci --ignore-scripts=false. Nếu port 3000 bị chiếm, xác minh harness test/helpers/isolate.js được nạp; tests không cần server listen. Nếu runtime lỗi khi mở rộng phạm vi, quay về config activity đã kiểm chứng; không xóa mutant lỗi khỏi thống kê mà không ghi nhận.

Sandbox là semi-automated workflow: viết/review candidate thủ công, chạy original và mutation cùng tally tự động. Killed vẫn cần xem failure khi có nghi ngờ test fail do nguyên nhân ngoài assertion.
