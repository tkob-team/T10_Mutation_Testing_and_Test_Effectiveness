# Demo Script: StrykerJS and an AI Agent

Kịch bản quay video 5 đến 8 phút. Lời dẫn tiếng Việt, giữ English technical terms. Thứ tự: Tấn Hiệp mở đầu và demo Cart & Orders, Thái Hòa demo Coupons, Phúc Hoàng demo Authentication & Users rồi kết thúc. Mỗi người tự thao tác trên tests của mình.

## 1. Introduction and Installation

**Presenter:** Tấn Hiệp. Phần giới thiệu và cài đặt chung chỉ quay một lần.

**Screen:** một test đang pass và business rule tương ứng.

**Narration:** "Tests pass chưa chắc đã kiểm tra đủ hành vi. Mutation testing tạo những thay đổi nhỏ trong code, gọi là mutants, rồi chạy tests để xem thay đổi có bị phát hiện không. Coverage cho biết code đã được thực thi; assertion kiểm tra kết quả, còn oracle là căn cứ xác định kết quả đúng từ spec."

"StrykerJS tự sinh mutants, chạy tests trong sandbox và xuất report. Jest chạy assertions, Supertest gửi requests đến backend. Mutant làm test fail được gọi là Killed; tests vẫn pass thì là Survived. AI Agent hỗ trợ đề xuất assertions, sau đó cần review và chạy kiểm chứng."

**Action:** mở terminal, clone repo SUT nghiên cứu dùng cho ba phần demo:

~~~sh
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-demo
cd eshop-demo
cd backend
node --version
npm --version
npm ci
npm test
~~~

**Screen:** package.json và cấu hình Stryker của từng domain. Chỉ rõ Stryker/Jest đã được khai báo trong dependencies; npm ci cài theo lockfile. Giải thích ngắn testRunner chọn Jest, mutate chọn source và testMatch/configFile chọn tests.

Nếu dùng Codex, quay lệnh cài/kiểm tra sau; nếu dùng Claude Code thì dùng setup tương ứng đã chuẩn bị. Hoàn tất đăng nhập trước cảnh demo AI.

~~~sh
npm install -g @openai/codex
codex --version
~~~

Trước khi quay từng domain, chọn đúng revision/test set baseline của thực nghiệm đã chuẩn bị. Clone main hiện tại chưa tự đại diện cho baseline cũ. Manual và AI dùng cùng production code, scope và baseline tests, lưu riêng các bản bổ sung.

## 2. Common Demonstration Flow

Mỗi người thực hiện đủ flow sau trên domain của mình; chọn một case tiêu biểu để trình bày rõ. Toàn video có ít nhất ba survivor cases, mỗi người một case.

| Step | Screen / Action | Lời dẫn cần thể hiện |
|---|---|---|
| Business rule | Mở spec và test case đã chọn | "Trường hợp này yêu cầu... Test hiện tại mới kiểm tra..." |
| Basic Features | Chạy tests domain, chạy baseline mutation, mở HTML report | "Mutant đổi... nhưng tests vẫn pass vì chưa quan sát..." |
| Advanced Manual | Hiện diff assertion của mình, chạy tests trên code gốc rồi mutation | "Assertion này kiểm tra... nên phân biệt được hành vi gốc và mutant." |
| Advanced AI | Hiện prompt, tool/model, candidate và quyết định review; chạy kiểm chứng từ baseline riêng | "AI đề xuất... Phần được giữ/sửa là... Kết quả thực tế cho mutant mục tiêu là..." |
| Limitation and Handoff | Chỉ một giới hạn trong case, rồi chuyển người | "Kết quả này chỉ áp dụng cho... Tiếp theo là domain..." |

Khi dùng data-driven tests, chỉ vào các dòng dữ liệu hoặc test.each và giải thích vì sao cần nhiều inputs. Gọi tên checkpoints đang quan sát: HTTP status, response body hoặc persisted database state.

Prompt dùng chung, thay các chỗ trong ngoặc bằng dữ liệu của domain:

~~~text
Đọc spec, baseline tests và mutation report của [domain].
Với mutant [source location, mutator, replacement], đề xuất assertion
kiểm tra expected behavior từ spec. Chỉ bổ sung tests, không sửa source
hoặc config. Giải thích vì sao assertion phát hiện mutant.
~~~

AI nhận baseline chưa có đáp án manual. Hiện candidate và review thật, kể cả khi candidate không kill được mutant. Với tests đã có AI hỗ trợ, nói rõ nguồn hỗ trợ thay vì gọi là hoàn toàn tự viết.

## 3. Individual Demonstrations

Mọi lệnh chạy tại backend. Chạy lại lệnh domain tương ứng sau khi chọn đúng manual hoặc AI test set; kiểm tra config thực sự nạp file bổ sung. Lưu report mỗi lần trước khi output bị ghi đè.

### 3.1. Cart & Orders: Tấn Hiệp

~~~sh
npm run test:cart-orders
npm run mutate:cart-orders
~~~

**Report:** reports/cart-orders/mutation.html.

**Action:** làm theo flow ở Section 2 với case Cart hoặc Orders đã kiểm chứng trong phần thực nghiệm của Hiệp. Hiện input, assertion cũ, mutant và assertion bổ sung; với case hủy đơn, giải thích trạng thái trước/sau nếu case được chọn dùng persisted state.

**Handoff:** "Phần Cart & Orders cho thấy assertion cần quan sát đúng dữ liệu và trạng thái nghiệp vụ. Tiếp theo, Thái Hòa trình bày Coupons."

### 3.2. Coupons: Thái Hòa

~~~sh
npm run test:coupons
npm run mutate:coupons
~~~

**Report:** reports/coupons/mutation.html.

**Action:** làm theo flow ở Section 2 với case coupon đã kiểm chứng của Hòa, chẳng hạn giới hạn sử dụng nếu chọn case đó. Nêu rõ điều kiện hợp lệ, dữ liệu biên và expected result; cho xem assertion kiểm tra điều kiện hoặc kết quả được lưu.

Hai cấu hình bổ sung hiện có:

~~~sh
npx stryker run stryker.coupons.manual.config.json
npx stryker run stryker.coupons.ai.config.json
~~~

Các config này nạp riêng file manual/AI và xuất reports/coupons-manual hoặc reports/coupons-ai. Original tests của mỗi bản bổ sung phải pass trước khi so sánh mutation results; npm run test:coupons chỉ chạy suite baseline.

**Handoff:** "Coupons cho thấy dữ liệu đầu vào và giới hạn nghiệp vụ ảnh hưởng trực tiếp đến khả năng phát hiện lỗi. Tiếp theo, Phúc Hoàng trình bày Authentication & Users."

### 3.3. Authentication & Users: Phúc Hoàng

~~~sh
npm run test:auth
npm run mutate:auth
~~~

**Report:** reports/auth/mutation.html.

**Action:** làm theo flow ở Section 2 với case Auth đã kiểm chứng của Hoàng. Hiện user/token fixture, expected access hoặc rejection, mutant và assertion phân biệt hành vi. Giải thích vì sao test kiểm tra đúng danh tính/quyền truy cập thay vì chỉ quan sát một lỗi đăng nhập.

## 4. Conclusion and Recording Notes

**Presenter:** Phúc Hoàng.

**Narration:** "Ba phần demo dùng StrykerJS và AI Agent để cải thiện độ nhạy của tests API trên EShop. Đây là quy trình semi-automated: chạy mutants và tổng hợp reports được tự động hóa; xác định oracle, review assertions và diễn giải kết quả vẫn cần người thực hiện."

"Mutation score cao chưa chứng minh toàn bộ phần mềm đúng. Timeout là vượt thời gian, cần báo riêng với Killed. Một survivor có thể là equivalent candidate nếu chưa tìm thấy hành vi phân biệt; cần lập luận thêm. AI cũng có thể viết assertion pass trên code gốc nhưng không phát hiện mutant."

**Recording notes:** quay thao tác thật, giữ lời dẫn theo kết quả thực tế; có thể tăng tốc đoạn chờ và ghi rõ trên video. Nếu dùng report/AI output đã lưu thì giới thiệu đó là evidence đã lưu. Original tests fail thì xử lý trước khi diễn giải mutation score. Chưa có case ID, AI result hoặc số kills thật thì để trống, không điền theo kỳ vọng.

Ba kịch bản bắt buộc được thể hiện qua Installation ở Section 1, Basic Features và Advanced Workflow trong từng phần ở Sections 2 và 3. Khi ghép video, giữ đủ thao tác của cả ba người và phần hạn chế, kiểm tra tổng độ dài 5 đến 8 phút.
