# Kill the Mutant: Audience Worksheet

## 1. Goal

Viết 5 candidate assertions để phát hiện 5 surviving mutants của EShop, đổi bài review và thi xem đội nào kill được nhiều nhất. Phạm vi là luồng mua hàng trong module Cart & Checkout APIs: giỏ hàng, checkout, lịch sử và hủy đơn.

**Duration:** tối đa 20 phút. Làm theo đội. Có thể dùng Jest hoặc pseudocode đủ rõ để facilitator chuyển thành Jest mà không thay đổi ý nghĩa. Không cần cài phần mềm trong giờ hoạt động; sandbox được chuẩn bị trước.

## 2. Rules and Workflow

| Step | Duration | Việc cần làm |
|---|---|---|
| Show mutant diffs | 2 phút | Đọc 5 diffs, business rules và dữ liệu được cung cấp |
| Write assertions | 8 phút | Mỗi đội viết một candidate cho mỗi K1 đến K5 |
| Swap and review | 4 phút | Đổi bài với đội bên cạnh, ghi nhận xét và trả lại |
| Run and tally | 4 phút | Facilitator chạy candidates đã review, chiếu kết quả và ghi điểm |
| Explain the design | 2 phút | Đội thắng giải thích dữ liệu và assertion của một case |

Mỗi mutant mục tiêu tối đa 1 điểm, tổng 5 điểm. Assertion phải pass trên code gốc và làm test fail khi mutant mục tiêu hoạt động. Lỗi cú pháp, exception do setup hoặc Timeout không được tính điểm kill. Một assertion phát hiện nhiều mutants không tự cộng điểm cho các ô chưa làm. Hòa điểm thì đồng hạng.

Không sửa production code, fixture hoặc bỏ tests để tạo kết quả mong muốn. Trong vòng thi viết assertion, không dùng AI; sau khi chốt điểm có thể thảo luận AI như một cách đề xuất candidate.

## 3. Shared Context

Starter: [eshop-sut-workshop, commit 6d2e790](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d). Các mutants dưới đây đã Survived khi chạy 36 baseline tests Cart & Orders với StrykerJS 10.0.0.

Oracle lấy từ [EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md) và [API Specification, phần 4](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/api_specification.md). Các business rules cần dùng được ghi ngay trong từng case.

Mỗi test có user U mới, token hợp lệ và SQLite riêng theo test file. Các bước fixture đều được await:

1. GET giỏ U chưa thêm hàng, response đặt tên **empty**.
2. POST lần lượt **itemA**, **itemB**, rồi GET giỏ, response đặt tên **cart**.
3. GET lại giỏ không sửa dữ liệu, response đặt tên **reread**.
4. U checkout một đơn, ID đặt tên **ownId**; một user V cũng có đơn riêng.
5. GET lịch sử của U, response đặt tên **history**.
6. U hủy đơn pending của mình; đọc lại row database, đặt tên **canceled**.

Hai sản phẩm có dữ liệu khác nhau:

~~~js
const itemA = { id: 1, name: 'A', price: 100000, quantity: 1 };
const itemB = { id: 2, name: 'B', price: 200000, quantity: 2 };
~~~

Các response có thuộc tính **status** và **body**. Row **canceled** có thuộc tính **status**. Jest cung cấp expect, toEqual, toBe và các matchers thường dùng. Mọi biến trong từng assertion đều phải lấy từ context trên.

## 4. Five Mutant Cards

### K1. Empty Cart

**Rule:** giỏ hàng mới phải rỗng. **Observe:** empty.body.
**Source:** server.js line 286, ArrayDeclaration. Baseline mutant ID 3.

~~~diff
- if (!userCarts[userId]) userCarts[userId] = [];
+ if (!userCarts[userId]) userCarts[userId] = ["Stryker was here"];
~~~

**Question:** status 200 có chứng minh giỏ rỗng không? Viết assertion kiểm tra kết quả của người dùng mới.

### K2. Add Items

**Rule:** hai sản phẩm được thêm thành công phải xuất hiện trong giỏ. **Observe:** cart.body, itemA, itemB.
**Source:** server.js line 293, CallExpression. Baseline mutant ID 4.

~~~diff
- userCarts[userId].push(req.body);
+ ;
~~~

**Question:** POST vẫn trả 200. Cần quan sát gì sau hai lần thêm để phát hiện thao tác lưu bị mất?

### K3. Read without Losing Data

**Rule:** đọc giỏ không được xóa các sản phẩm đã thêm. **Observe:** reread.body, itemA, itemB.
**Source:** server.js line 286, ConditionalExpression. Baseline mutant ID 1.

~~~diff
- if (!userCarts[userId]) userCarts[userId] = [];
+ if (true) userCarts[userId] = [];
~~~

**Question:** nếu chỉ thử một user chưa có hàng, hai chương trình khác nhau không? Dữ liệu nào làm sai khác lộ ra?

### K4. Own Order History

**Rule:** lịch sử của U phải chứa đơn ownId vừa checkout của U. **Observe:** history.body, ownId.
**Source:** server.js line 314, ArrayDeclaration. Baseline mutant ID 5.

~~~diff
  "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
- [req.user.id],
+ [],
~~~

**Question:** request vẫn có thể trả 200 với danh sách thiếu dữ liệu. Viết assertion tìm đúng đơn, không chỉ kiểm tra response là array.

### K5. Persisted Cancellation

**Rule:** hủy một đơn pending hợp lệ phải lưu trạng thái canceled. **Observe:** canceled.status.
**Source:** server.js line 335, StringLiteral. Baseline mutant ID 7.

~~~diff
- ["canceled", req.params.id],
+ ["", req.params.id],
~~~

**Question:** thông báo thành công có đủ để xác nhận cập nhật database đúng không?

## 5. Response Sheet

**Team:**
**Peer team:**

| Case | Candidate assertion hoặc pseudocode | Vì sao pass trên original và fail trên mutant? | Peer comment |
|---|---|---|---|
| K1 | | | |
| K2 | | | |
| K3 | | | |
| K4 | | | |
| K5 | | | |

Peer review kiểm tra: biến có tồn tại không, expected result có đúng rule không, có quan sát phần code bị đổi không và test có thể fail vì setup thay vì mutation không.

## 6. Submission and Results

Nộp 5 candidates cùng peer comments. Nếu dùng pseudocode, facilitator chiếu bản chuyển sang Jest cho đội xác nhận trước khi chạy.

| Case | Original pass? | Target mutant status | Candidate của đúng case phát hiện? | Point |
|---|---|---|---|---|
| K1 | | | | |
| K2 | | | | |
| K3 | | | | |
| K4 | | | | |
| K5 | | | | |

**Total:** /5
**Design to explain:**
**Remaining question:**

Các ô kết quả chỉ điền sau khi chạy. Mutant ID phụ thuộc cấu hình; khi kiểm tra lại phải khớp cả vị trí, mutator và replacement. Killed chỉ chứng minh khả năng phát hiện mutant được chọn, chưa chứng minh EShop đúng toàn bộ requirements.
