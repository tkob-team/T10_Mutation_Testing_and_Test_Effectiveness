# User Guide: Mutation Testing with StrykerJS and an AI Agent

## 1. Introduction

Hướng dẫn này giúp người mới chạy mutation testing trên EShop, tìm điểm yếu trong tests và bổ sung assertion để phát hiện lỗi. Cần biết JavaScript cơ bản và cách mở terminal.

**Mutation testing** tạo một thay đổi nhỏ trong code, gọi là **mutant**, rồi chạy tests. Nếu tests vẫn pass, mutant có thể chỉ ra hành vi chưa được kiểm tra đủ. **Assertion** là điều kiện xác nhận kết quả mong đợi, ví dụ giỏ hàng mới phải bằng mảng rỗng.

Bài thực hành dùng [eshop-sut-workshop](https://github.com/tkob-team/eshop-sut-workshop), một bản EShop có sẵn 88 tests do nhóm bổ sung, chưa tích hợp Stryker. Backend gốc của giảng viên chưa có bộ Jest/Supertest này. Không cần chạy frontend, khởi động server hoặc tạo database thủ công.

Luồng thực hiện: cài môi trường, chạy tests có sẵn, cài Stryker, xem mutant sống sót, bổ sung assertions, rồi thử đề xuất từ Claude Code hoặc Codex.

**Tested environment:** Windows x64, Node.js 24.16.0, npm 12.0.2, Jest 30.5.2, StrykerJS 10.0.0; workshop starter [6d2e790](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d). Hướng dẫn macOS dựa trên tài liệu chính thức, chưa được chạy kiểm chứng trên máy Mac.

## 2. Install

### 2.1. Git and Node.js

Dùng **PowerShell** trên Windows hoặc **Terminal** trên macOS.

| Component | Windows | macOS |
|---|---|---|
| Git | Cài [Git for Windows](https://git-scm.com/install/windows), giữ các lựa chọn mặc định | Chạy `xcode-select --install`, hoàn tất hộp thoại cài đặt |
| Node.js | Tải installer dòng **24.x** từ [Node.js](https://nodejs.org/en/download), cài kèm npm | Tải installer dòng **24.x** từ cùng trang; chọn đúng hệ máy |
| Editor | VS Code hoặc trình soạn thảo đang dùng | VS Code hoặc trình soạn thảo đang dùng |

Mở lại terminal sau khi cài, rồi kiểm tra:

~~~sh
git --version
node --version
npm --version
~~~

Node phải là 24.x; npm dùng 11.x hoặc 12.x theo yêu cầu của workshop. Nếu `npm.ps1` bị chặn trên Windows, xem Troubleshooting trước khi tiếp tục.

### 2.2. Clone and Run Existing Tests

Mở terminal tại thư mục muốn lưu bài thực hành:

~~~sh
git clone https://github.com/tkob-team/eshop-sut-workshop.git
cd eshop-sut-workshop
cd backend
npm ci
npm test
~~~

**Expected result:** 4 test suites, 88 tests pass. Cart & Orders có 36 tests, Coupons có 26 tests, Authentication có 26 tests. Tests dùng SQLite trong bộ nhớ để cô lập dữ liệu.

Nếu muốn lưu bài lên GitHub cá nhân, bấm **Fork** tại trang workshop trước, rồi dùng URL HTTPS trong nút **Code** của fork thay cho URL ở lệnh clone. Nếu chỉ thực hành trên máy, clone trực tiếp như trên là đủ.

Từ đây, mọi lệnh đều chạy trong **backend**. `npm ci` cài theo lockfile có sẵn; nếu báo lỗi, xử lý theo Troubleshooting rồi chạy lại. Chỉ tiếp tục khi tests gốc pass.

### 2.3. Add StrykerJS

Cài Stryker và plugin chạy Jest trong project:

~~~sh
npm install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/jest-runner@10.0.0
~~~

Tạo file **stryker.config.json** ngay trong backend bằng trình soạn thảo, dán toàn bộ nội dung:

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

Cấu hình chọn ba dòng xử lý giỏ hàng và hủy đơn để bài đầu dễ theo dõi. Stryker chỉ chạy suite Cart & Orders; `projects: []` ghi đè cấu hình nhiều project trong package.json. Thư mục stryker-tmp được dùng để tạo bản code thử nghiệm; không cần tự sửa server.js.

## 3. First Test

### 3.1. Run the Baseline

Chạy tests trước, sau đó chạy mutation testing:

~~~sh
npm run test:cart
npx stryker run
~~~

**Expected result trên starter:** 36 tests pass; Stryker sinh 7 mutants, cả 7 đều **Survived**. Mở file **reports/mutation.html** bằng browser, chọn server.js rồi xem các dòng được tô màu.

Lưu report và bộ tests ban đầu để so sánh sau:

~~~sh
cp reports/mutation.json reports/baseline.json
cp test/cart-orders.test.js reports/cart.baseline.test.js
~~~

Các lệnh `cp` trong guide dùng được ở PowerShell và macOS Terminal.

### 3.2. Read One Surviving Mutant

Tìm mutant **ArrayDeclaration** ở dòng 286. Report hiển thị phép đổi:

~~~js
// Original
if (!userCarts[userId]) userCarts[userId] = [];

// Mutant
if (!userCarts[userId]) userCarts[userId] = ["Stryker was here"];
~~~

Giỏ hàng của người dùng mới phải rỗng. Mutant lại đặt một phần tử vào giỏ, nhưng test CO-02 chỉ kiểm tra HTTP status 200 nên không nhận ra sai khác. Expected behavior được đối chiếu với [EShop SRS, FR-07](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md).

### 3.3. Add an Assertion and Rerun

Mở **test/cart-orders.test.js**, tìm CO-02 và thay test đó bằng:

~~~js
test('CO-02 [normal] new user gets an empty cart', async () => {
  const { token } = await newUser(app);
  const res = await request(app).get('/api/cart').set(bearer(token));
  expect(res.status).toBe(200);
  expect(res.body).toEqual([]);
});
~~~

Assertion mới kiểm tra nội dung response. Không dán đoạn mutant vào server.js.

~~~sh
npm run test:cart
npx stryker run
cp reports/mutation.json reports/first-test.json
~~~

**Expected result:** 36 tests vẫn pass; 3 mutants chuyển sang **Killed**, gồm mutant ArrayDeclaration vừa xem. Còn 4 mutants Survived. Mở lại HTML report để xem assertion nào khiến mutant bị phát hiện.

## 4. Advanced Usage

### 4.1. Strengthen Three Behavior Checks

Tiếp tục trên file tests vừa sửa. Ba tình huống dưới đây có dữ liệu và kết quả quan sát khác nhau:

| Case | Mutant đang kiểm tra | Vì sao test ban đầu bỏ sót | Assertion cần có |
|---|---|---|---|
| Giỏ hàng mới | Dòng 286: `[]` thành `["Stryker was here"]` | Chỉ kiểm tra status 200 | Body bằng `[]`, đã thêm ở CO-02 |
| Thêm hai sản phẩm | Dòng 293: xóa lời gọi `push(req.body)` | Hai POST vẫn trả 200 dù không lưu sản phẩm | GET trả đúng hai sản phẩm |
| Hủy đơn | Dòng 335: `"canceled"` thành `""` | Response 200 chưa chứng minh database đã đổi đúng trạng thái | Trạng thái đã lưu bằng `'canceled'` |

**Case 2:** trong CO-04, thêm hai dòng sau vào sau `expect(b.status).toBe(200);`:

~~~js
const cart = await request(app).get('/api/cart').set(bearer(token));
expect(cart.body).toEqual([itemA, itemB]);
~~~

**Case 3:** thêm `orderStatus` vào dòng import helpers ở đầu file:

~~~js
const { ADMIN, loadApp, login, newUser, bearer, createOrder, orderStatus, request } = require('./helpers/app');
~~~

Trong CO-12, thêm dòng sau vào sau `expect(res.status).toBe(200);`:

~~~js
expect(await orderStatus(db, id)).toBe('canceled');
~~~

CO-12 dùng **data-driven testing** với `test.each(['pending', 'confirmed'])`: cùng một kiểm tra được chạy cho hai trạng thái đầu vào. HTTP status, response body và trạng thái database là các **checkpoints** quan sát hành vi.

Chạy lại và lưu bản manual:

~~~sh
npm test
npx stryker run
cp reports/mutation.json reports/manual.json
cp test/cart-orders.test.js reports/cart.manual.test.js
~~~

**Expected result:** 88 tests pass; 7 Killed, 0 Survived, 0 Timeout trong phạm vi ba dòng đã chọn. Ba assertion mới còn phát hiện được các mutants khác trên cùng những dòng này. Vì snippets được cung cấp trong guide, kết quả làm theo bài không được xem là thực nghiệm tự thiết kế assertions độc lập.

### 4.2. Try an AI Agent

Phần này tùy chọn. Chọn **một** công cụ và đăng nhập bằng tài khoản có quyền sử dụng.

**Codex CLI**, Windows hoặc macOS đã có Node/npm:

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

Mở lại terminal nếu lệnh mới chưa được nhận diện. Hướng dẫn đăng nhập nằm trong [Codex Quickstart](https://github.com/openai/codex#quickstart) và [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart).

Trước khi nhờ AI viết tests, khôi phục bộ tests ban đầu từ bản sao đã lưu. Bản manual vẫn nằm trong reports:

~~~sh
cp reports/cart.baseline.test.js test/cart-orders.test.js
npm run test:cart
~~~

Tại backend, chạy `codex` hoặc `claude`, hoàn tất đăng nhập rồi gửi prompt:

~~~text
Đọc ../api_specification.md, ../docs/EShop_SRS.md, test/cart-orders.test.js,
test/helpers/app.js, stryker.config.json và reports/baseline.json.

Phân tích ba surviving mutants trong server.js:
1. Dòng 286: mảng rỗng bị thay bằng ["Stryker was here"].
2. Dòng 293: lời gọi push(req.body) bị xóa.
3. Dòng 335: chuỗi "canceled" bị thay bằng chuỗi rỗng.

Chỉ sửa test/cart-orders.test.js để bổ sung assertions phát hiện ba lỗi.
Giữ các tests và assertions hiện có. Không sửa production code, helpers,
dependencies hoặc mutation config. Không đọc các bản manual trong reports.
Với mỗi assertion, nêu expected behavior từ spec và lý do mutant sẽ bị phát hiện.
~~~

Đọc diff bằng `git diff -- test/cart-orders.test.js`, đối chiếu expected behavior với spec, rồi kiểm chứng:

~~~sh
npm test
npx stryker run
cp reports/mutation.json reports/ai.json
cp test/cart-orders.test.js reports/cart.ai.test.js
~~~

So sánh baseline.json, manual.json và ai.json theo **source location, mutator, replacement**, vì mutant ID có thể thay đổi khi đổi phiên bản hoặc phạm vi. Chỉ tính mutant đã chuyển từ Survived sang Killed trong cùng cấu hình. Ghi công cụ, model thực tế, prompt, phần đã sửa và kết quả chạy; chưa chạy thì để trống kết quả.

Bài này minh họa cách kiểm chứng AI. Người thực hiện đã nhìn thấy đáp án manual, nên không dùng kết quả để kết luận AI tốt hơn hoặc kém hơn con người trong một so sánh độc lập.

### 4.3. Expand the Scope

Để khảo sát toàn bộ server.js, đổi `mutate` thành `["server.js"]`; để chọn thêm suite, sửa `testMatch` theo tests cần chạy. Có thể chạy riêng tests gốc bằng `npm run test:coupons` hoặc `npm run test:auth`. Mỗi domain có cách setup khác nhau, cần xem cấu hình Jest tương ứng trước khi đưa vào Stryker.

Lưu kết quả bài hiện tại trước khi đổi cấu hình. Khi phạm vi đổi, số mutants và mutation score cũng đổi; các số tham chiếu 7 mutants của bài này không còn áp dụng.

Nếu chưa tìm được test phân biệt một survivor, tiếp tục kiểm tra inputs, oracle và khả năng quan sát. Chỉ gọi là **equivalent mutant** khi có lập luận cho thấy hành vi không đổi trong phạm vi xét; chưa đủ căn cứ thì ghi **equivalent candidate**.

## 5. Interpreting Results

| Status | Cách hiểu và bước tiếp theo |
|---|---|
| Killed | Có test fail khi mutant hoạt động; xem failure để biết assertion hay lỗi nào đã phát hiện nó |
| Survived | Tests liên quan vẫn pass; kiểm tra thiếu assertion, thiếu dữ liệu hoặc khả năng tương đương |
| NoCoverage | Không có test thực thi vị trí mutant; bổ sung đường đi phù hợp |
| Timeout | Chạy vượt giới hạn thời gian; xem nguyên nhân, báo riêng với Killed |
| RuntimeError / CompileError | Lỗi chạy hoặc biên dịch mutant; kiểm tra log trước khi diễn giải chất lượng tests |

Theo [định nghĩa của Stryker](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/):

~~~text
Mutation score = 100 * (Killed + Timeout)
                 / (Killed + Timeout + Survived + NoCoverage)
~~~

RuntimeError và CompileError không nằm trong mẫu số này. Luôn đọc các cột trạng thái cùng score. **100% trong bài chỉ cho biết 7 mutants ở ba dòng được chọn đã bị phát hiện**, chưa đánh giá toàn bộ EShop.

## 6. Troubleshooting

| Symptom | Cách xử lý |
|---|---|
| `git`, `node`, `npm` không được nhận diện | Hoàn tất cài đặt, đóng rồi mở terminal; kiểm tra lại ba lệnh version ở Install |
| PowerShell báo `npm.ps1 cannot be loaded` | Dùng `npm.cmd` thay `npm`, `npx.cmd` thay `npx` trong các lệnh tương ứng |
| `npm ci` báo thiếu package.json hoặc lockfile | Kiểm tra đang ở backend của workshop; clone bằng Git để có đủ files, không chỉ tải server.js |
| `npm ci` báo package.json và lockfile không khớp | Nếu vừa tự sửa dependencies, dùng `npm install` để cập nhật lockfile có chủ đích. Với clone mới chưa sửa, lấy lại starter; không xóa lockfile để bỏ qua lỗi |
| `EBADENGINE` hoặc native module không tương thích | Chuyển sang Node 24.x, npm 11.x hoặc 12.x; chạy lại `npm ci` |
| Không tìm thấy SQLite binding sau khi cài | Chạy `npm ci --ignore-scripts=false`; package.json của starter đã cho phép build sqlite3. Nếu phải build từ source, cài công cụ theo [node-gyp](https://github.com/nodejs/node-gyp#installation): Python và Visual Studio C++ trên Windows, Command Line Tools trên macOS |
| npm 12 báo blocked scripts của @parcel/watcher hoặc unrs-resolver | Đây có thể là cảnh báo của dependencies tùy chọn. Chạy `npm test` để xác định tác động; không bật toàn bộ scripts chỉ để xóa cảnh báo |
| npm in thông báo vulnerabilities | Xem `npm audit` để biết chi tiết; kiểm tra riêng việc cài có thành công hay không. Thay dependencies sẽ đổi môi trường bài, cần chạy lại baseline |
| Stryker initial test run fail | Chạy `npm run test:cart`, sửa lỗi test/config trước; chưa diễn giải mutation score |
| Không thấy 7 mutants hoặc vị trí không khớp | Đối chiếu starter 6d2e790 và ba dòng trong config; kiểm tra server.js có bị sửa hay không |
| Stryker chạy tests trùng hoặc nạp cả Auth | Giữ `projects: []` và `testMatch` đúng như cấu hình ở Install |
| Chạy lâu hoặc nhiều Timeout | Giữ phạm vi ba dòng, thử `concurrency: 1`, đóng tác vụ nặng rồi chạy lại; không tăng timeout chỉ để làm score đẹp hơn |

## 7. Failure Modes

### 7.1. Passing Tests Can Hide Missing Checks

Trong starter, CO-02 pass với status 200 dù mutant trả một giỏ hàng có phần tử sai. Chỉ nhìn dòng xanh của Jest hoặc việc code đã được chạy sẽ tạo cảm giác hành vi đã đúng.

**Cách tránh:** kiểm tra cả dữ liệu đầu ra và tác động được lưu. Dùng assertion trên response body hoặc database theo expected behavior từ spec.

### 7.2. Mutation Score Can Overstate Assertion Effectiveness

Stryker tính Timeout vào nhóm detected. Score cao có thể đến từ mutants làm chương trình treo, chưa chứng minh assertions kiểm tra tốt hơn. Trong bài này, 100% còn chỉ đại diện cho ba dòng đã chọn.

**Cách tránh:** báo Killed và Timeout riêng, nêu phạm vi mutate và số mutants. Khi so sánh hai bộ tests, giữ nguyên source, cấu hình và tập mutants.

### 7.3. AI Can Produce a Passing but Unhelpful Test

AI có thể thêm một kiểm tra status 200 giống test sẵn có, hoặc lấy hành vi sai của code làm expected result. Test vẫn pass trên code gốc và phần giải thích nghe hợp lý, nhưng mutant mục tiêu có thể tiếp tục Survived.

**Cách tránh:** đối chiếu oracle với spec, review diff, chạy tests gốc và mutation testing. Chấp nhận candidate dựa trên assertion thực sự phát hiện mutant và kiểm tra đúng yêu cầu, không dựa vào lời giải thích của AI.

## 8. References

- [Workshop starter and provenance](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d): source, tests, setup và nguồn đóng góp.
- [Original EShop repository](https://github.com/ttbhanh/eshop-sut) và [EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md): căn cứ hành vi của hệ thống.
- [StrykerJS Configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) và [Jest Runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/): phạm vi mutate, plugin và cấu hình Jest.
- [Mutant States and Metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) và [Equivalent Mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/): diễn giải kết quả và giới hạn.
- [Jest API](https://jestjs.io/docs/api#testeachtablename-fn-timeout): data-driven tests.
- [Git Installation](https://git-scm.com/install/), [Node.js Download](https://nodejs.org/en/download), [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci/) và [node-gyp Installation](https://github.com/nodejs/node-gyp#installation): cài đặt và xử lý native dependencies.
- [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart) và [Codex CLI Quickstart](https://github.com/openai/codex#quickstart): cài đặt, khởi động và đăng nhập AI Agent.
