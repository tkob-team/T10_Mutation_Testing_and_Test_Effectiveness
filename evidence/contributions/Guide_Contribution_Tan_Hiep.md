# User Guide Contribution

**Document Role:** Contribution cá nhân S4 cho leader ghép `User_Guide.md`. Bản nháp do Claude soạn (AI-S4-A01-01) trên nền `draft/User_Guide.md` của Hòa, chờ Tấn Hiệp review; chưa phải bản đã duyệt.  
**Stage:** S4  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S4-A01  
**Domain / Section:** Guide Cart & Orders trên `eshop-sut-workshop` @ `6d2e790` (Giới thiệu, Cài đặt, Test đầu tiên, Sử dụng nâng cao, Xử lý sự cố, Failure Modes, Tài liệu tham khảo)  
**Evidence Status:** Partial — các bước 2.2 đến 4.1 đã chạy lại trong sandbox Linux của Claude (không phải máy Tấn Hiệp); Windows và macOS: Pending; mục 4.2 (AI Agent) chưa chạy; Tấn Hiệp review: Pending

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

Viết bằng tiếng Việt (Tấn Hiệp quyết định ngôn ngữ cho toàn bộ deliverable của mình, khác với REQ-17 ghi English). File này chứa section domain của bạn; leader ghép User_Guide.md sau khi review.

# Hướng dẫn sử dụng: Mutation Testing với StrykerJS và AI Agent

## 1. Giới thiệu

Hướng dẫn này giúp người mới chạy mutation testing trên EShop, tìm điểm yếu của bộ test hiện có và bổ sung assertion để phát hiện lỗi. Bạn cần biết JavaScript cơ bản và dùng được terminal.

**Mutation testing** thay đổi code một chút, mỗi thay đổi gọi là một **mutant**, rồi chạy lại tests. Nếu tests vẫn pass thì mutant chỉ ra hành vi mà tests chưa kiểm tra đủ. **Assertion** là điều kiện mô tả kết quả mong đợi, ví dụ "giỏ hàng mới phải là một mảng rỗng".

Bài thực hành dùng [eshop-sut-workshop](https://github.com/tkob-team/eshop-sut-workshop), bản sao của EShop đã có sẵn 88 test Jest và Supertest do nhóm viết, chưa cài Stryker. Backend gốc của giảng viên không có bộ test này. Bạn không cần chạy frontend, khởi động server hay tạo database thủ công.

Quy trình: cài công cụ, chạy tests có sẵn, thêm Stryker, đọc một mutant còn sống, thêm assertion, rồi thử gợi ý từ một AI agent (Claude Code hoặc Codex).

**Môi trường đã thử:** Windows x64, Node.js 24.16.0, npm 12.0.2, Jest 30.5.2, StrykerJS 10.0.0; workshop starter [6d2e790](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d). Hướng dẫn cho macOS theo tài liệu chính thức, chưa chạy thử trên máy Mac.

## 2. Cài đặt

### 2.1. Git và Node.js

Dùng **PowerShell** trên Windows hoặc **Terminal** trên macOS.

| Thành phần | Windows | macOS |
|---|---|---|
| Git | Cài [Git for Windows](https://git-scm.com/install/windows), giữ tùy chọn mặc định | Chạy `xcode-select --install` và hoàn tất hộp thoại cài đặt |
| Node.js | Tải bản **24.x** tại [Node.js](https://nodejs.org/en/download); npm đi kèm | Tải bản **24.x** ở cùng trang, chọn đúng loại chip |
| Editor | VS Code hoặc editor bạn đang dùng | VS Code hoặc editor bạn đang dùng |

Mở lại terminal sau khi cài, rồi kiểm tra:

~~~sh
git --version
node --version
npm --version
~~~

Node phải là 24.x và npm 11.x hoặc 12.x theo yêu cầu của workshop. Nếu Windows chặn `npm.ps1`, xem mục Xử lý sự cố trước khi tiếp tục.

### 2.2. Clone và chạy tests có sẵn

Mở terminal trong thư mục bạn muốn đặt bài thực hành:

~~~sh
git clone https://github.com/tkob-team/eshop-sut-workshop.git
cd eshop-sut-workshop
cd backend
npm ci
npm test
~~~

**Kết quả mong đợi:** 4 test suite và 88 tests pass: Cart & Orders 36 tests, Coupons 26, Authentication 26. Tests dùng SQLite trong bộ nhớ nên không làm thay đổi file dữ liệu nào.

Muốn giữ công việc trên tài khoản GitHub của mình, nhấn **Fork** ở trang workshop trước và dùng URL HTTPS của bản fork trong lệnh clone. Nếu chỉ thực hành cục bộ thì clone trực tiếp là đủ.

Từ đây mọi lệnh đều chạy trong thư mục **backend**. `npm ci` cài đúng những gì lockfile liệt kê. Nếu lỗi, xem Xử lý sự cố rồi chạy lại. Chỉ tiếp tục khi tests gốc pass.

### 2.3. Thêm StrykerJS

Cài Stryker và plugin Jest runner vào project:

~~~sh
npm install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/jest-runner@10.0.0
~~~

Tạo file **stryker.config.json** trong backend bằng editor và dán nội dung sau:

~~~json
{
  "testRunner": "jest",
  "coverageAnalysis": "perTest",
  "mutate": [
    "server.js:286-286",
    "server.js:293-293",
    "server.js:335-335"
  ],
  "tempDirName": "stryker-tmp",
  "concurrency": 2,
  "reporters": ["clear-text", "html", "json"],
  "htmlReporter": {
    "fileName": "reports/mutation.html"
  },
  "jsonReporter": {
    "fileName": "reports/mutation.json"
  },
  "jest": {
    "config": {
      "projects": [],
      "testEnvironment": "node",
      "setupFiles": ["<rootDir>/test/helpers/isolate.js"],
      "testMatch": ["<rootDir>/test/cart-orders.test.js"],
      "modulePathIgnorePatterns": ["<rootDir>/stryker-tmp/"]
    }
  }
}
~~~

Cấu hình chọn ba dòng xử lý giỏ hàng và hủy đơn để bài đầu tiên dễ theo dõi. Stryker chỉ chạy suite Cart & Orders; `projects: []` ghi đè cấu hình nhiều project trong package.json. Stryker tạo các bản code thử trong thư mục `stryker-tmp`, nên bạn không bao giờ phải tự sửa server.js.

## 3. Test đầu tiên

### 3.1. Chạy baseline

Chạy tests trước, rồi chạy mutation testing:

~~~sh
npm run test:cart
npx stryker run
~~~

**Kết quả mong đợi trên starter:** 36 tests pass; Stryker sinh 7 mutant và cả 7 đều **Survived**, nên mutation score là 0%. Mở **reports/mutation.html** bằng trình duyệt, chọn server.js và xem các dòng được tô màu.

Lưu report và file test gốc để so sánh sau:

~~~sh
cp reports/mutation.json reports/baseline.json
cp test/cart-orders.test.js reports/cart.baseline.test.js
~~~

Lệnh `cp` chạy được trong PowerShell và Terminal của macOS.

### 3.2. Đọc một mutant còn sống

Tìm mutant **ArrayDeclaration** ở dòng 286. Report cho thấy thay đổi sau:

~~~js
// Gốc
if (!userCarts[userId]) userCarts[userId] = [];

// Mutant
if (!userCarts[userId]) userCarts[userId] = ["Stryker was here"];
~~~

Giỏ hàng của người dùng mới phải rỗng. Mutant nhét một phần tử vào giỏ, nhưng test CO-02 chỉ kiểm tra HTTP status là 200 nên không nhận ra khác biệt.

Đặc tả không nói rõ nội dung chính xác của giỏ hàng mới. [Mục 4.1 của API specification](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/api_specification.md) chỉ nêu endpoint, còn [FR-07 trong EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md) mô tả trạng thái giỏ trống của giao diện. Vì vậy kỳ vọng `[]` là một **oracle suy luận (inferred oracle)**: hợp lý, nhưng suy ra từ việc đọc đặc tả chứ không phải yêu cầu được ghi rõ.

### 3.3. Thêm assertion và chạy lại

Mở **test/cart-orders.test.js**, tìm CO-02 và thay test đó bằng:

~~~js
test('CO-02 [normal] new user gets an empty cart', async () => {
  const { token } = await newUser(app);
  const res = await request(app).get('/api/cart').set(bearer(token));
  expect(res.status).toBe(200);
  expect(res.body).toEqual([]);
});
~~~

Assertion mới kiểm tra nội dung phản hồi. Đừng dán code của mutant vào server.js.

~~~sh
npm run test:cart
npx stryker run
cp reports/mutation.json reports/first-test.json
~~~

**Kết quả mong đợi:** 36 tests vẫn pass; 3 mutant chuyển sang **Killed**, trong đó có mutant ArrayDeclaration bạn vừa đọc, và 4 mutant vẫn Survived. Mở lại báo cáo HTML để xem assertion nào phát hiện từng mutant.

## 4. Sử dụng nâng cao

### 4.1. Củng cố ba kiểm tra hành vi

Tiếp tục với cùng file test. Ba tình huống dưới đây dùng dữ liệu khác nhau và quan sát kết quả khác nhau:

| Tình huống | Mutant được kiểm tra | Vì sao test gốc bỏ sót | Assertion cần có |
|---|---|---|---|
| Giỏ hàng mới | Dòng 286: `[]` thành `["Stryker was here"]` | Chỉ kiểm tra status 200 | Body bằng `[]`, đã thêm ở CO-02 |
| Thêm hai sản phẩm | Dòng 293: lời gọi `push(req.body)` bị xóa | Cả hai POST vẫn trả 200 dù không có gì được lưu | GET trả về đúng hai sản phẩm |
| Hủy đơn hàng | Dòng 335: `"canceled"` thành `""` | Phản hồi 200 không chứng minh database lưu đúng trạng thái | Trạng thái đã lưu bằng `'canceled'` |

**Tình huống 2:** trong CO-04, thêm hai dòng sau ngay sau `expect(b.status).toBe(200);`:

~~~js
const cart = await request(app).get('/api/cart').set(bearer(token));
expect(cart.body).toEqual([itemA, itemB]);
~~~

**Tình huống 3:** thêm `orderStatus` vào dòng import helper ở đầu file:

~~~js
const { ADMIN, loadApp, login, newUser, bearer, createOrder, orderStatus, request } = require('./helpers/app');
~~~

Trong CO-12, thêm dòng này sau `expect(res.status).toBe(200);`:

~~~js
expect(await orderStatus(db, id)).toBe('canceled');
~~~

CO-12 dùng **data-driven testing** với `test.each(['pending', 'confirmed'])`: cùng một kiểm tra chạy cho hai trạng thái đầu vào. HTTP status, response body và database state là các **checkpoint** quan sát hành vi.

Chạy lại và lưu bản manual:

~~~sh
npm test
npx stryker run
cp reports/mutation.json reports/manual.json
cp test/cart-orders.test.js reports/cart.manual.test.js
~~~

**Kết quả mong đợi:** 88 tests pass; 7 Killed, 0 Survived và 0 Timeout trong ba dòng đã chọn. Ba assertion mới cũng phát hiện các mutant còn lại trên cùng các dòng đó. Vì hướng dẫn này cung cấp sẵn đoạn code, việc làm theo không phải là một thí nghiệm trong đó bạn tự thiết kế assertion.

### 4.2. Thử với AI Agent

Phần này là tùy chọn. Chọn **một** công cụ và đăng nhập bằng tài khoản được phép dùng.

**Codex CLI** (Windows hoặc macOS đã có Node và npm):

~~~sh
npm install -g @openai/codex
codex --version
~~~

**Claude Code**, Windows:

~~~powershell
winget install Anthropic.ClaudeCode
~~~

**Claude Code**, macOS:

~~~sh
curl -fsSL https://claude.ai/install.sh | bash
~~~

Mở terminal mới nếu lệnh chưa được nhận diện. Các bước đăng nhập nằm ở [Codex Quickstart](https://github.com/openai/codex#quickstart) và [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart).

Trước khi nhờ AI viết tests, khôi phục file test gốc từ bản đã lưu. Bản manual vẫn nằm trong reports:

~~~sh
cp reports/cart.baseline.test.js test/cart-orders.test.js
npm run test:cart
~~~

AI không nên thấy đáp án manual của bạn. Dặn AI "đừng đọc file này" là biện pháp yếu: trong thí nghiệm của nhóm, lệnh đầu tiên của một phiên AI đã in ra commit message của nhánh manual trước khi chúng tôi kịp nhận ra. Trước khi bắt đầu, hãy di chuyển `reports/manual.json` và `reports/cart.manual.test.js` ra khỏi thư mục project, xong việc thì chuyển lại.

Trong backend, chạy `codex` hoặc `claude`, đăng nhập xong rồi gửi prompt sau:

~~~text
Đọc ../api_specification.md, ../docs/EShop_SRS.md, test/cart-orders.test.js,
test/helpers/app.js, stryker.config.json và reports/baseline.json.

Phân tích ba mutant còn sống trong server.js:
1. Dòng 286: mảng rỗng bị thay bằng ["Stryker was here"].
2. Dòng 293: lời gọi push(req.body) bị xóa.
3. Dòng 335: chuỗi "canceled" bị thay bằng chuỗi rỗng.

Chỉ sửa test/cart-orders.test.js để thêm assertion phát hiện ba lỗi này.
Giữ nguyên các tests và assertion hiện có. Không sửa production code, helpers,
dependencies hay cấu hình mutation. Không đọc bất kỳ bản manual nào của tests.
Với mỗi assertion, nêu hành vi mong đợi theo đặc tả và lý do mutant sẽ bị phát hiện.
~~~

Đọc diff bằng `git diff -- test/cart-orders.test.js`. Kiểm tra mọi giá trị mong đợi đều lấy từ đặc tả chứ không phải từ `server.js`, rồi chạy kiểm chứng:

~~~sh
npm test
npx stryker run
cp reports/mutation.json reports/ai.json
cp test/cart-orders.test.js reports/cart.ai.test.js
~~~

So sánh baseline.json, manual.json và ai.json theo **vị trí source, mutator và replacement**, vì ID mutant có thể đổi giữa các phiên bản hoặc phạm vi. Chỉ đếm những mutant chuyển từ Survived sang Killed trong cùng một cấu hình. Ghi lại công cụ, model thực tế, prompt, những gì bạn đã sửa và kết quả chạy. Để trống kết quả nếu bạn chưa chạy.

Bài tập này minh họa cách kiểm chứng đầu ra của AI. Bạn đã xem đáp án manual, nên đừng dùng kết quả để kết luận AI tốt hay kém hơn con người trong một phép so sánh độc lập.

### 4.3. Mở rộng phạm vi

Để kiểm tra toàn bộ server.js, đổi `mutate` thành `["server.js"]`. Để thêm suite khác, đổi `testMatch` sang các tests muốn dùng. Có thể chạy riêng tests gốc bằng `npm run test:coupons` hoặc `npm run test:auth`. Mỗi domain được cấu hình khác nhau, nên hãy đọc cấu hình Jest của domain đó trước khi đưa vào Stryker.

Hãy lưu kết quả của bài này trước khi đổi cấu hình. Khi phạm vi thay đổi, số mutant và mutation score cũng đổi, và con số tham chiếu 7 mutant không còn đúng.

Nếu không tìm được test phân biệt một survivor với code gốc, hãy tiếp tục kiểm tra đầu vào, oracle và những gì test có thể quan sát. Chỉ gọi mutant là **equivalent mutant** khi bạn lập luận được rằng hành vi không đổi trong phạm vi đã xét; nếu không thì gọi là **equivalent candidate**.

### 4.4. Diễn giải kết quả

| Trạng thái | Cách đọc và việc cần làm tiếp |
|---|---|
| Killed | Có test fail khi mutant hoạt động; đọc lỗi để biết assertion nào bắt được |
| Survived | Các tests liên quan vẫn pass; kiểm tra xem thiếu assertion, thiếu dữ liệu hay mutant tương đương |
| NoCoverage | Không test nào thực thi vị trí của mutant; thêm đường chạy phù hợp |
| Timeout | Lần chạy vượt quá giới hạn thời gian; tìm nguyên nhân và báo cáo riêng với Killed |
| RuntimeError / CompileError | Mutant không chạy hoặc không biên dịch được; đọc log trước khi đánh giá tests |

Theo [định nghĩa của Stryker](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/):

~~~text
Mutation score = 100 * (Killed + Timeout)
                 / (Killed + Timeout + Survived + NoCoverage)
~~~

RuntimeError và CompileError nằm ngoài mẫu số này. Luôn đọc các cột trạng thái cùng với điểm số. **Điểm 100% trong bài này chỉ cho thấy 7 mutant trên ba dòng đã chọn đều bị phát hiện**; nó không nói gì về toàn bộ EShop.

## 5. Xử lý sự cố

"Đã gặp" nghĩa là chúng tôi tự thấy lỗi và đã áp dụng cách sửa; "Đề xuất" nghĩa là cách sửa lấy từ tài liệu hoặc suy luận, chúng tôi chưa tái hiện lỗi.

| Triệu chứng | Cách sửa | Trạng thái |
|---|---|---|
| `npm install` hoặc `node server.js` lỗi `ENOENT ... package.json` hay `MODULE_NOT_FOUND ... server.js` | Bạn đang ở thư mục gốc của repository. Chạy `cd backend` trước | Đã gặp (EShop trên Windows 11, Node v24.15.0) |
| `Cannot find module '...\node_modules\jest\bin\jest.js'` (`MODULE_NOT_FOUND`) | Thiếu `node_modules`. Chạy `npm ci` trong thư mục chứa package.json rồi chạy lại lệnh | Đã gặp (Windows 11, bản nén không có `node_modules`) |
| Lần chạy test ban đầu của Stryker lỗi `No tests were found` dù `npm test` pass | Giữ `"tempDirName": "stryker-tmp"` (không có dấu chấm đầu) trong cấu hình. Với mặc định `.stryker-tmp`, cùng thiết lập này lỗi trên Windows 11 và chạy được sau khi dùng `--tempDirName stryker-tmp`. Nguyên nhân chưa được kiểm chứng | Đã gặp |
| `git`, `node` hoặc `npm` không được nhận diện | Hoàn tất cài đặt, đóng và mở lại terminal, rồi chạy lại ba lệnh kiểm tra phiên bản ở mục Cài đặt | Đề xuất |
| PowerShell báo `npm.ps1 cannot be loaded` | Dùng `npm.cmd` thay `npm` và `npx.cmd` thay `npx` | Đề xuất |
| `npm ci` báo package.json và lockfile không khớp | Nếu bạn tự sửa dependencies, chủ động chạy `npm install` để cập nhật lockfile. Với bản clone mới, tải lại starter; không xóa lockfile để bỏ qua lỗi | Đề xuất |
| `EBADENGINE` hoặc module native không tương thích | Chuyển sang Node 24.x và npm 11.x hoặc 12.x, rồi chạy lại `npm ci` | Đề xuất |
| Không tìm thấy SQLite binding sau khi cài | Chạy `npm ci --ignore-scripts=false`. Nếu cần build từ source, cài các công cụ trong [hướng dẫn cài node-gyp](https://github.com/nodejs/node-gyp#installation) | Đề xuất |
| Lần chạy test ban đầu của Stryker lỗi vì lý do khác | Chạy `npm run test:cart` trước và sửa test hoặc cấu hình; chưa diễn giải mutation score | Đề xuất |
| Số mutant hoặc vị trí khác với hướng dẫn này | So với starter 6d2e790 và ba dòng trong cấu hình; kiểm tra server.js chưa bị sửa | Đề xuất |
| Stryker chạy tests hai lần hoặc nạp cả tests của Auth | Giữ `projects: []` và đúng `testMatch` ở mục Cài đặt | Đề xuất |
| Chạy chậm hoặc nhiều Timeout | Giữ phạm vi ba dòng, thử `concurrency: 1` và đóng các tác vụ nặng; đừng tăng timeout chỉ để cải thiện điểm | Đề xuất |

## 6. Failure Modes

### 6.1. Tests pass vẫn có thể che giấu việc thiếu kiểm tra

Ở starter, CO-02 vẫn pass với status 200 ngay cả khi mutant trả về giỏ hàng có thêm một phần tử. Dòng Jest màu xanh, hay việc code đã được thực thi, tạo cảm giác hành vi đã đúng.

**Cách tránh:** kiểm tra cả dữ liệu trả về lẫn tác động đã lưu. Assert trên response body hoặc database theo hành vi mong đợi trong đặc tả.

### 6.2. Mutation score có thể phóng đại hiệu quả của assertion

Stryker tính Timeout là đã phát hiện. Điểm cao có thể đến từ các mutant làm chương trình treo, điều này không cho thấy assertion tốt hơn. Trong thí nghiệm Cart của nhóm trên repo T10, 25 trong 107 mutant bị phát hiện ở baseline là Timeout. Tỷ lệ Killed và Timeout còn thay đổi theo cách Stryker gọi Jest (25 Timeout với một cấu hình, 18 với cấu hình khác) trong khi Survived không đổi; chúng tôi chưa kiểm chứng được lý do. Trong bài này, 100% chỉ đại diện cho ba dòng đã chọn.

**Cách tránh:** báo cáo Killed và Timeout riêng, nêu phạm vi mutate và số mutant, và khi so sánh hai bộ test thì so số Survived tuyệt đối trong cùng source, cấu hình và tập mutant.

### 6.3. Mutant còn sống không phải lúc nào cũng là test yếu

Trong cùng thí nghiệm, một mutant Cart sống sót ở mọi bộ test vì nó sửa một kiểm tra còn thiếu trong code gốc (đơn đã hủy không được chuyển sang trạng thái đã giao). Test giết được nó sẽ phải kỳ vọng hành vi sai, còn test kỳ vọng hành vi đúng thì fail trên code gốc.

**Cách tránh:** trước khi thêm assertion, so code gốc với đặc tả. Nếu code gốc sai, ghi nhận một defect; đừng khóa lỗi vào test.

### 6.4. AI có thể viết test pass nhưng vô ích hoặc giải thích sai

AI có thể thêm kiểm tra status 200 trùng với test có sẵn, hoặc lấy hành vi sai của code làm kết quả mong đợi. Trong thí nghiệm của nhóm, Claude đưa ra một assertion tốt nhưng lý do sai: nó biện minh cho test bằng một mutant mà StrykerJS không sinh ra. Ở một trường hợp khác, giá trị mong đợi do người viết sao chép từ `server.js` đã pass trên code gốc dù code không theo đặc tả.

**Cách tránh:** đối chiếu oracle với đặc tả, đọc diff, chạy tests gốc và chạy mutation testing. Chỉ chấp nhận candidate vì assertion phát hiện được mutant và kiểm tra một yêu cầu thật, không phải vì lời giải thích nghe hợp lý.

### 6.5. Output trên console có thể ghi nhận kill sai test

Console của Stryker gán kill cho test fail đầu tiên của mỗi mutant. Khi hai bộ test chạy cùng nhau, một test cũng bắt được mutant có thể hiện "covered" với 0 kill.

**Cách tránh:** đừng kết luận một test vô dụng từ console; đọc `killedBy` của từng mutant trong `reports/mutation.json`.

## 7. Tài liệu tham khảo

- [Workshop starter và nguồn gốc](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d): source, tests, thiết lập và nguồn đóng góp.
- [Repository EShop gốc](https://github.com/ttbhanh/eshop-sut) và [EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md): căn cứ hành vi của hệ thống.
- [StrykerJS Configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) và [Jest Runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/): phạm vi mutate, plugin và cấu hình Jest.
- [Mutant States and Metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) và [Equivalent Mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/): diễn giải kết quả và giới hạn.
- [Jest API](https://jestjs.io/docs/api#testeachtablename-fn-timeout): data-driven tests.
- [Git Installation](https://git-scm.com/install/), [Node.js Download](https://nodejs.org/en/download), [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci/) và [node-gyp Installation](https://github.com/nodejs/node-gyp#installation): cài đặt và dependency native.
- [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart) và [Codex CLI Quickstart](https://github.com/openai/codex#quickstart): cài đặt, khởi động và đăng nhập AI agent.
- Evidence thí nghiệm của nhóm cho mục 5 và 6: `experiments/s3/Experiment_Log_Tan_Hiep.md` (Limits & Failure Modes, Cross Reproduction).

## Verification Notes (không đưa vào User_Guide.md)

**Đã chạy lại 2026-10-23 trong sandbox của Claude (Linux, Node v22.22.0, npm 10.9.4; ngoài khoảng `engines` của workshop nhưng `npm ci` vẫn thành công). Đây không phải evidence của Tấn Hiệp:**

| Bước | Kết quả quan sát |
|---|---|
| 2.2 `npm ci`; `npm test` | 4 suites, 88 tests pass |
| 2.3 + 3.1 `npm run test:cart`; `npx stryker run` | 36 tests pass; dry run `Ran 36 tests`; 7 mutants, cả 7 Survived (0%): 286:7 ConditionalExpression `true`/`false`, 286:7 BooleanLiteral, 286:47 ArrayDeclaration, 293:3 CallExpression, 335:9 ArrayDeclaration, 335:10 StringLiteral |
| 3.3 sau khi sửa CO-02 | 36 pass; 3 Killed (286:7 `false`, 286:47, 286:7 BooleanLiteral), 4 Survived |
| 4.1 sau ba assertion | 88 pass; 7 Killed, 0 Survived, 0 Timeout, 100% |

**Nguồn của các lệnh cài AI Agent (đọc từ tài liệu chính thức 2026-10-23, chưa chạy):** Claude Code Quickstart có `winget install Anthropic.ClaudeCode`, `curl -fsSL https://claude.ai/install.sh | bash` và `claude --version`; trang openai/codex có `npm install -g @openai/codex`.

**Khác bản nháp của Hòa:**
- Viết bằng tiếng Việt theo quyết định của Tấn Hiệp (REQ-17 ghi English; xem Ghi chú ngôn ngữ bên dưới); gộp "Interpreting Results" thành 4.4 để đủ cấu trúc Introduction, Install, First Test, Advanced Usage, Troubleshooting, Failure Modes, References.
- 3.2: bỏ cách dẫn FR-07 như căn cứ cho "giỏ mới rỗng". FR-07 chỉ nói về trạng thái giỏ trống trên giao diện, API §4.1 chỉ nêu endpoint; ghi rõ đây là inferred oracle (cùng nhận định G5 của Phúc ở S3-I03).
- 4.2: thêm khuyến nghị chuyển bản manual ra khỏi thư mục project trước phiên AI (rút từ near-miss G01).
- 5: thêm cột Status (Observed/Suggested) và 3 lỗi thật có evidence trong Experiment Log (ENOENT/MODULE_NOT_FOUND ở thư mục gốc, thiếu `node_modules`, `No tests were found` với `.stryker-tmp` trên Windows); các dòng còn lại giữ nguyên từ bản nháp, ghi Suggested vì chưa tái hiện.
- 6: Failure Modes tăng từ 3 lên 5 (thêm mutant sửa lỗi 550:11, Killed/Timeout phụ thuộc config, kill attribution trên console), dẫn số liệu từ thực nghiệm Cart trên SUT T10.

**Pending / chưa kiểm chứng:**
- Dòng "Tested environment" (Windows x64, Node.js 24.16.0, npm 12.0.2) lấy nguyên từ bản nháp của Hòa; Tấn Hiệp chưa chạy lại. Máy Tấn Hiệp ghi ở S3: Windows 11, Node v24.15.0.
- Windows, macOS và mục 4.2 chưa chạy theo từng bước trên máy thật.
- Cơ chế Killed→Timeout theo config (mục 6.2) chưa kiểm chứng; đã nói rõ trong guide.

**AI_Record:** AI-S4-A01-01 (claude.ai, ghi vào AI Record sau khi Tấn Hiệp review).

**Ghi chú ngôn ngữ:** REQ-17 yêu cầu guide bằng English. Tấn Hiệp học chương trình chính quy (100% tiếng Việt) nên chọn tiếng Việt cho mọi deliverable của mình để người dùng và chính mình đọc được. Cần báo Hòa/thầy để mục ghép chung không bị lệch ngôn ngữ.
