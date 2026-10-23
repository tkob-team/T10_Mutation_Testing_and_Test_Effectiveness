# User Guide: Mutation Testing with StrykerJS and an AI Agent

## Ghi chú bản ghép (đọc trước)

- **Bản ghép S4-E01**, do Claude Code (model Claude Opus 5.5, `claude-opus-5-5`) ghép và dịch ngày 2026-10-23. **Chưa được duyệt: cần Tấn Hiệp review** trước khi coi là bản chính thức.
- **Nguồn và tác giả:**
  - Introduction chung: ghép từ mục Giới thiệu của Lê Tấn Hiệp và phần Key terms của Nguyễn Phúc Hoàng (dịch).
  - Installation chung: bảng Git/Node.js của Lê Tấn Hiệp; câu về phiên bản Node do bản ghép viết, dựa trên `engines` và môi trường đã chạy của ba domain.
  - Cart & Orders: [`Guide_Contribution_Tan_Hiep.md`](Guide_Contribution_Tan_Hiep.md) (S4-A01, Lê Tấn Hiệp; bản nháp gốc từ `draft/User_Guide.md` của Thái Hòa), giữ nguyên tiếng Việt.
  - Coupons: [`Guide_Contribution_Thai_Hoa.md`](Guide_Contribution_Thai_Hoa.md) (S4-A02, Tống Dương Thái Hòa), dịch từ English.
  - Authentication & Users: [`Guide_Contribution_Phuc_Hoang.md`](Guide_Contribution_Phuc_Hoang.md) (S4-A03, Nguyễn Phúc Hoàng), dịch từ English.
  - Troubleshooting, Failure Modes, References: gộp từ ba tác giả, mỗi dòng/mục ghi nguồn.
- **Quy tắc ghép:** chỉ dịch văn xuôi; lệnh, code, số liệu, đường dẫn, mã mutant, tên test và prompt giữ nguyên văn. Nhãn Đã gặp (Observed) / Đề xuất (Suggested) giữ đúng như tác giả ghi. Ngôn ngữ: tiếng Việt theo quyết định của Tấn Hiệp, khác REQ-17 (English); cần nhóm và giảng viên biết.

### Cần quyết định

1. **Base repo khác nhau giữa các domain.** Cart & Orders dùng `eshop-sut-workshop` @ `6d2e790` (tự cài Stryker, mutate 3 dòng, 7 mutants). Coupons và Authentication dùng `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness` @ `806ba19` (Stryker có sẵn trong lockfile, mutate cả domain). Bản ghép giữ cả hai và tách "Setup riêng", không tự chọn. Giữ hai repo, hay chuyển Cart sang `806ba19` (đã có số liệu E01-1: 150 mutants), hay ngược lại?
2. **Tên của tỷ lệ Killed / valid.** Auth gọi là "Assertion kill", Coupons gọi là "Killed / valid" / "assertion-kill proportion"; công thức giống nhau. Có thống nhất một tên không?

Đã tự dung hòa (không cần quyết định): phiên bản Node. Workshop yêu cầu `node >=24 <25`, `npm >=11 <13`; SUT `806ba19` không khai `engines`. Cả ba domain đã chạy trên Windows với Node 24.x (Cart và Coupons 24.15.0; Coupons và Auth 24.16.0), nên Installation chung ghi Node 24.x. Câu "Node.js 22 or later (tested with v26.12.1)" của phần Auth được giữ nguyên trong Setup riêng của Auth.

### Việc tác giả cần sửa

Lấy từ [`Guide_Reproduction_Tan_Hiep.md`](Guide_Reproduction_Tan_Hiep.md) (Coupons) và [`Guide_Reproduction_Thai_Hoa.md`](Guide_Reproduction_Thai_Hoa.md) (Auth). Bản ghép **không** tự sửa nội dung của tác giả khác.

- **Thái Hòa (Coupons):**
  - D01-01: clone seminar repo vào thư mục sâu trên Windows lỗi `Filename too long`; thêm dòng Troubleshooting.
  - D01-02: thiếu lệnh và URL clone seminar repo trước bước overlay.
  - D01-03: khối overlay hard-code `'../../T10_Mutation_Testing_and_Test_Effectiveness'`; chưa nói rõ cách đổi `$docsRoot` khi dùng lại clone có sẵn, và script không dừng khi `$overlayRoot` sai.
  - D01-04: dry run báo "Ran 52 / 70 / 80 tests", gấp đôi số Jest (26 / 35 / 40), chưa giải thích.
  - D01-05: cảnh báo `ChildProcessCrashedError ... exit code 3221225477` chưa có trong Troubleshooting.
  - Bước Review or Request an AI Candidate: người chạy lại (Tấn Hiệp) ghi "Provenance, không hiểu làm gì"; cần nói rõ người đọc làm gì với PROVENANCE.
  - Các dòng Troubleshooting chưa gắn nhãn Observed/Suggested.
- **Phúc Hoàng (Auth):**
  - D02-01 (chặn): sau checkout `806ba19`, `npm run test:auth:manual` không tồn tại; guide nhắc nhánh `s3/F03-auth` nhưng không có bước checkout/overlay. Cần chỉ cách nạp sources/configs của manual và AI.
  - D02-02: lệnh AI tạo `ai-run` rồi `cd` vào đó trước `cat prompt.txt`, nhưng chưa có bước đặt `prompt.txt` vào thư mục mới.
  - D02-03: câu "reproduced on Windows ... by another team member" cần ghi đúng executor (run của agent Codex, không phải thành viên tự chạy).
- **Tấn Hiệp (Cart):** chưa có reproduction của người khác (S4-D03 của Phúc ghi Not run). Các điểm tự kiểm ở `Verification_Notes_Tan_Hiep.md`: "Tested environment" ghi Node 24.16.0 / npm 12.0.2 nhưng F01c chạy trên 24.15.0 / 11.12.1; mục 4.2 chưa chạy.

---

## Introduction

Hướng dẫn này giúp người mới chạy mutation testing trên EShop, tìm điểm yếu của bộ test hiện có và bổ sung assertion để phát hiện lỗi. Bạn cần biết JavaScript cơ bản và dùng được terminal.

**Mutation testing** thay đổi code một chút, mỗi thay đổi gọi là một **mutant**, rồi chạy lại tests. Nếu tests vẫn pass thì mutant chỉ ra hành vi mà tests chưa kiểm tra đủ. **Assertion** là điều kiện mô tả kết quả mong đợi, ví dụ "giỏ hàng mới phải là một mảng rỗng".

Thuật ngữ chính (dùng trong toàn bộ guide):

- **Mutant**: bản sao của code với một thay đổi nhỏ, ví dụ `>= 3` đổi thành `> 3`.
- **Killed**: ít nhất một test fail trên mutant. **Survived**: mọi test vẫn pass, nghĩa là không assertion nào nhận ra thay đổi. **NoCoverage**: không test nào chạy dòng đó. **Timeout**: mutant làm code bị treo nên lần chạy bị dừng. **RuntimeError**: mutant làm process test bị crash và bị loại khỏi score.
- **Equivalent mutant**: mutant có hành vi không phân biệt được với code gốc. Một survivor chỉ là *equivalent candidate* cho đến khi có người lập luận vì sao không input nào phân biệt được nó.
- **Assertion kill** (thuật ngữ riêng của guide này): Killed / (Killed + Timeout + Survived + NoCoverage). **Stryker score**: (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage). Hai số chênh nhau đúng bằng số Timeout.

Guide có ba walkthrough, mỗi walkthrough một domain:

| Domain | Repo / commit | Tác giả | Môi trường đã ghi |
|---|---|---|---|
| Cart & Orders | [`eshop-sut-workshop`](https://github.com/tkob-team/eshop-sut-workshop) @ `6d2e790` | Lê Tấn Hiệp | Windows x64, Node.js 24.16.0, npm 12.0.2 (theo guide); F01c chạy lại trên Windows 11, Node v24.15.0, npm 11.12.1 |
| Coupons | `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness` @ `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` | Tống Dương Thái Hòa | Windows, Node.js 24.16.0, npm 12.0.2 |
| Authentication & Users | `eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness` @ `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` | Nguyễn Phúc Hoàng | macOS (Darwin arm64), Node v26.12.1, npm 11.20.0 |

## Installation

### Installation chung

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

Dùng Node 24.x và npm 11.x hoặc 12.x. Đây là khoảng `engines` của workshop Cart, và cả ba domain đã chạy được trên Node 24.x ở Windows. Nếu Windows chặn `npm.ps1`, xem Troubleshooting trước khi tiếp tục; walkthrough Coupons dùng sẵn `npm.cmd`.

### Setup riêng: Cart & Orders (tác giả: Lê Tấn Hiệp)

Bài thực hành dùng [eshop-sut-workshop](https://github.com/tkob-team/eshop-sut-workshop), bản sao của EShop đã có sẵn 88 test Jest và Supertest do nhóm viết, chưa cài Stryker. Backend gốc của giảng viên không có bộ test này. Bạn không cần chạy frontend, khởi động server hay tạo database thủ công.

Quy trình: cài công cụ, chạy tests có sẵn, thêm Stryker, đọc một mutant còn sống, thêm assertion, rồi thử gợi ý từ một AI agent (Claude Code hoặc Codex).

**Môi trường đã thử:** Windows x64, Node.js 24.16.0, npm 12.0.2, Jest 30.5.2, StrykerJS 10.0.0; workshop starter [6d2e790](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d). Hướng dẫn cho macOS theo tài liệu chính thức, chưa chạy thử trên máy Mac.

#### Clone và chạy tests có sẵn

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

Từ đây mọi lệnh đều chạy trong thư mục **backend**. `npm ci` cài đúng những gì lockfile liệt kê. Nếu lỗi, xem Troubleshooting rồi chạy lại. Chỉ tiếp tục khi tests gốc pass.

#### Thêm StrykerJS

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

### Setup riêng: Coupons (tác giả: Tống Dương Thái Hòa)

Walkthrough này hướng dẫn chạy API integration tests, tìm một coupon mutant còn sống, review các assertion bổ sung và kiểm chứng tác dụng của chúng. Jest thực thi tests, Supertest gọi Express application và SQLite lưu dữ liệu test cô lập trong bộ nhớ. Bạn không cần frontend hay một backend server chạy riêng.

Ví dụ của chúng tôi liên quan đến `max_uses_per_user`. FR-17 yêu cầu giới hạn hợp lệ do administrator đặt phải được lưu. FR-09 C5 chỉ cho phép một user áp dụng coupon khi số lần dùng đã ghi của user đó còn dưới giới hạn. Chỉ một response tạo thành công thì chưa chứng minh giá trị đúng đã được lưu. Xem [Coupons contract](../../experiments/s3/Coupons_Test_Contract_Thai_Hoa.md) và [SRS](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/README.md) đã đóng băng.

Dùng một checkout dùng một lần (disposable checkout). Research baseline là `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Workshop guide riêng trong `draft/User_Guide.md` (trong bản ghép này là walkthrough Cart & Orders) dùng một starter khác và bài tập Cart. Kết quả bảy mutant của nó không phải Coupons baseline.

#### Prepare the Frozen Checkout

Các run Windows đã lưu dùng Node.js 24.16.0, npm 12.0.2, Jest 30.5.2, Supertest 7.3.1, SQLite 6.0.1 và Stryker core/Jest runner 10.0.0. Đây là các version đã ghi lại, không phải khẳng định về bản mới nhất. Hướng dẫn macOS chưa được tác giả contribution này tái lập.

Trong PowerShell, bắt đầu ở một thư mục cha mới có chứa clone tài liệu seminar. Nếu đã có clone đó, dùng lại đường dẫn của nó ở bước overlay.

```powershell
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-coupons-s4
Set-Location eshop-coupons-s4
git rev-parse --show-toplevel
git status --short
git switch --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef
git rev-parse HEAD
Set-Location backend
node --version
npm.cmd --version
npm.cmd ci --no-audit --no-fund
npm.cmd test
npm.cmd run test:coupons
```

Kết quả mong đợi: 88 tests pass ở integration suite và 26 ở Coupons profile. Profile sau gồm 25 Coupons cases và một API-flow case. Giữ lại output lệnh và version chính xác cho run của bạn. Baseline manifest chứa [evidence chạy gốc](../../experiments/s3/Baseline_Manifest.md).

Không cài lại Stryker trong research checkout này: dependencies đã được ghim trong lockfile. Bài workshop dạy phần cài đặt riêng. Checkout frozen revision trước khi `npm ci`; HEAD phát triển hiện tại có thể chứa thay đổi không liên quan hoặc lỗi manifest.

#### Understand Data Reset

`test/helpers/isolate.js` và `test/helpers/coupons.js` nạp application và SQLite database cô lập. Các dòng coupons/usage được reset giữa các case. Fixture đóng băng Date nhưng giữ native timers mà SQLite và HTTP cần. Tests lấy JWT thật qua login. Khi một kịch bản cho Date tiến lên, nó lấy token mới để việc token hết hạn không thay thế điều kiện coupon cần kiểm.

Đừng import `database.js` vào một production process khác để reset dữ liệu: logic seed của nó có thể tạo lại bảng. Dùng harness có sẵn và giữ nguyên file `database.sqlite` đang được track.

### Setup riêng: Authentication & Users (tác giả: Nguyễn Phúc Hoàng)

Phần này dạy người chưa từng dùng mutation testing cách đo và cải thiện tests của một API domain: **Authentication & Users** của EShop backend (Express + SQLite). Phần này trình bày hai cách cải thiện tests: tự viết assertion và nhờ AI agent (Claude) đề xuất candidate, cùng cách kiểm tra từng cách bằng StrykerJS.

Yêu cầu: Node.js 22 trở lên (đã thử với v26.12.1), npm, Git, và cho bước AI là `claude` CLI (đã dùng Claude Code 2.1.308) với tài khoản đã đăng nhập. Spec dùng làm oracle: `api_specification.md` §1–2 và các functional requirement FR-02, FR-03, FR-04 và SEC-06 trong `README.md` của SUT. Baseline chung được cố định trong [`Baseline_Manifest.md`](../../experiments/s3/Baseline_Manifest.md): SUT commit `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`.

Đã kiểm chứng trên macOS (Darwin arm64), Node v26.12.1, npm 11.20.0, StrykerJS 10.0.0 (`core` và `jest-runner`), Jest 30.5.2. Nguồn: [`run_meta.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/run_meta.txt).

```sh
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-sut
cd eshop-sut
git checkout --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef   # frozen baseline
cd backend
npm ci --no-audit --no-fund       # installs exactly the lockfile versions
npm test                          # expected: 88 tests pass (Cart 36 + Coupons 26 + Auth 26)
```

- `npm ci` chỉ in cảnh báo peer-dependency và deprecation; không có lỗi ([log](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/npm-ci.log)).
- **Reset giữa các lần chạy.** Auth tests bắt đầu mỗi test từ một SQLite database mới trong bộ nhớ (`test/auth-cleanup.cjs`, `testDb.js`), nên không cần reset thủ công. Xóa `stryker-tmp/` và `reports/` nếu một lần chạy bị ngắt. Các file production `server.js`, `database.js` và `database.sqlite` không bao giờ bị sửa; run ghi SHA-256 của chúng trước và sau ([`sha-before.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/sha-before.txt), [`sha-after.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/sha-after.txt)).
- Để thử công cụ trên một hàm 20 dòng trước khi đụng tới EShop, sandbox nhỏ trong [`C03-weak/`](../../experiments/s3/runs/Phuc_Hoang/C03-weak/) và [`C03-strong/`](../../experiments/s3/runs/Phuc_Hoang/C03-strong/) được cài từ thư mục rỗng (`npm i -D jest @stryker-mutator/core @stryker-mutator/jest-runner`, 544 packages; weak tests 66.67%, strong tests 88.89%).

## First Test

### Cart & Orders (tác giả: Lê Tấn Hiệp)

#### Chạy baseline

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

#### Đọc một mutant còn sống

Tìm mutant **ArrayDeclaration** ở dòng 286. Report cho thấy thay đổi sau:

~~~js
// Gốc
if (!userCarts[userId]) userCarts[userId] = [];

// Mutant
if (!userCarts[userId]) userCarts[userId] = ["Stryker was here"];
~~~

Giỏ hàng của người dùng mới phải rỗng. Mutant nhét một phần tử vào giỏ, nhưng test CO-02 chỉ kiểm tra HTTP status là 200 nên không nhận ra khác biệt.

Đặc tả không nói rõ nội dung chính xác của giỏ hàng mới. [Mục 4.1 của API specification](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/api_specification.md) chỉ nêu endpoint, còn [FR-07 trong EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md) mô tả trạng thái giỏ trống của giao diện. Vì vậy kỳ vọng `[]` là một **oracle suy luận (inferred oracle)**: hợp lý, nhưng suy ra từ việc đọc đặc tả chứ không phải yêu cầu được ghi rõ.

#### Thêm assertion và chạy lại

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

### Coupons (tác giả: Tống Dương Thái Hòa)

#### Run the Domain Baseline

Từ thư mục `backend` của research checkout:

```powershell
npm.cmd run test:coupons
npm.cmd run coupons:dry
npm.cmd run mutate:coupons
```

Dry run kiểm tra instrumentation và việc tìm tests. Nó không chạy từng mutant và không cho mutation score cuối. Sau full run, mở `reports/coupons/mutation.html`; giữ lại file JSON bên cạnh và console output trước khi chạy lại.

Tham chiếu lịch sử trên source đã đóng băng:

| Tests | Total mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 26 | 120 | 39 | 21 | 30 | 25 | 5 | 52.17% |

Report bạn quan sát được là căn cứ cho run của bạn. Nếu phân bố trạng thái khác, phải điều tra và ghi lại. Tham chiếu lấy từ [S3 experiment log](../../experiments/s3/Experiment_Log_Thai_Hoa.md#h02--comparison--limits).

#### Inspect the Persisted-Limit Gap

Tại `server.js` dòng 474, xem biểu thức dưới đây và hai biến thể còn sống đã lưu:

```javascript
// Original
max_uses_per_user || 1
// Retained mutant 111
true
// Retained mutant 113
max_uses_per_user && 1
```

Case tạo coupon có sẵn dùng giới hạn 1. Với input đó SQLite cũng lưu hai replacement thành 1, nên ví dụ này không phân biệt được chúng. Hãy dùng một giới hạn hợp lệ khác mặc định, rồi đọc lại giá trị đã cấu hình qua API.

Manual-analysis profile dùng giá trị 3. Kiểm tra then chốt của nó là:

```javascript
expect(listed.body[0].max_uses_per_user).toBe(3);
```

Hai kịch bản khác ghi lần lượt hai lần dùng và ba lần dùng. Với fixed discount 25000 và total 100000, quote dưới giới hạn phải có discount 25000 và final amount 75000. Khi chạm giới hạn, quote phải bị từ chối. Các tests đã lưu dùng HTTP 400 như convention chung của implementation; quy tắc cốt lõi của SRS là từ chối mà không giảm giá.

### Authentication & Users (tác giả: Nguyễn Phúc Hoàng)

**Mục tiêu:** chạy Auth tests có sẵn, rồi chạy mutation baseline và mở report.

```sh
npm run test:auth                                   # 26 tests pass on the original code
npx stryker run stryker.auth.config.json --dryRunOnly   # checks that Stryker can run the tests
npm run mutate:auth                                 # about 1 min 25 s on the tested machine
```

Report được ghi vào `reports/auth/mutation.html` và `reports/auth/mutation.json`. Kết quả mong đợi trên `806ba19` (chạy hai lần, giống nhau từng mutant):

| Mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError | Stryker score | Assertion kill |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 125 | 60 | 27 | 23 | 7 | 8 | 74.36% (= 87/117) | 51.28% (= 60/117) |

Evidence: [`E03-baseline/`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/) (`console.log`, `mutation.html`, `mutation.json`, `run_meta.txt`, `repeat/`). Cùng 125 mutant và trạng thái cũng đã được một thành viên khác tái lập trên Windows (Node v24.16.0), 0 khác biệt, xem [`compare_vs_thai_hoa_frozen.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/compare_vs_thai_hoa_frozen.txt).

**Cách đọc HTML report.** Mở `mutation.html`, lọc theo trạng thái *Survived*. Mỗi dòng hiển thị dòng code bị đổi. Bắt đầu với mutant làm thay đổi hành vi mà user nhìn thấy. Ví dụ từ baseline này:

```js
// server.js line 124 (PUT /api/users/me)
if (role) { ... }            // mutant: if (true)  -> Survived
```

Cách đọc: các test cập nhật profile (AU-U04…U06) không bao giờ đọc lại `role` của user. Khi mutant khiến mọi lần cập nhật đều ghi `role`, giá trị `NULL` được lưu cho user không gửi `role`, và không có gì fail. Test kiểm tra status 200 và tên mới, không kiểm các cột khác của dòng dữ liệu.

## Advanced Usage

### Cart & Orders (tác giả: Lê Tấn Hiệp)

#### Củng cố ba kiểm tra hành vi

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

#### Thử với AI Agent

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

#### Mở rộng phạm vi

Để kiểm tra toàn bộ server.js, đổi `mutate` thành `["server.js"]`. Để thêm suite khác, đổi `testMatch` sang các tests muốn dùng. Có thể chạy riêng tests gốc bằng `npm run test:coupons` hoặc `npm run test:auth`. Mỗi domain được cấu hình khác nhau, nên hãy đọc cấu hình Jest của domain đó trước khi đưa vào Stryker.

Hãy lưu kết quả của bài này trước khi đổi cấu hình. Khi phạm vi thay đổi, số mutant và mutation score cũng đổi, và con số tham chiếu 7 mutant không còn đúng.

Nếu không tìm được test phân biệt một survivor với code gốc, hãy tiếp tục kiểm tra đầu vào, oracle và những gì test có thể quan sát. Chỉ gọi mutant là **equivalent mutant** khi bạn lập luận được rằng hành vi không đổi trong phạm vi đã xét; nếu không thì gọi là **equivalent candidate**.

### Coupons (tác giả: Tống Dương Thái Hòa)

#### Load the Retained Additional Tests

Frozen checkout không có file extended manual/AI. Copy đúng overlay bảy file từ [source snapshot](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend) của seminar repo. Ví dụ này giả định clone seminar nằm cạnh `eshop-coupons-s4`:

```powershell
$docsRoot = (Resolve-Path '../../T10_Mutation_Testing_and_Test_Effectiveness').Path
$overlayRoot = Join-Path $docsRoot 'experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend'
$backendRoot = (Get-Location).Path
Get-ChildItem -LiteralPath $overlayRoot -Recurse -File | ForEach-Object {
  $relative = $_.FullName.Substring($overlayRoot.Length + 1)
  $destination = Join-Path $backendRoot $relative
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destination) | Out-Null
  Copy-Item -LiteralPath $_.FullName -Destination $destination
}
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
```

Mong đợi 35 tests trên code gốc ở extended manual-analysis profile và 40 ở extended Agent profile. Lưu HTML/JSON report tương ứng từ `reports/coupons-manual` và `reports/coupons-ai`.

| Profile | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score | Killed / valid |
|---|---:|---:|---:|---:|---:|---:|---:|
| Extended manual-analysis | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |
| Extended Agent | 41 | 21 | 28 | 25 | 5 | 53.91% | 35.65% |

Đây là kết quả domain đã lưu. Cả hai profile phát hiện cùng hai limit mutant bổ sung. Các kịch bản thêm cải thiện độ phủ hành vi quan sát được nhưng không thêm mutant kill nào trong tập mutant này. Xem [extension evidence](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md).

#### Review or Request an AI Candidate

Để quay video với evidence đã lưu, mở [request gốc, lỗi và Codex provenance](../../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md). Nói rõ bạn đang review một candidate đã lưu. Request Claude CLI trước đây lỗi xác thực; user đã chọn Codex trong cùng context. Đừng gọi output này là một lần sinh thành công của Claude hay một thử nghiệm người-với-AI độc lập.

Với request mới, dùng một AI Agent đã xác thực và ghi lại tool/model thực tế. Cung cấp specification, test harness, baseline report và mutant diff. Prompt sau là prompt mới dùng lại được, không phải transcript lịch sử:

```text
Use README.md FR-09 C5 and FR-17, api_specification.md sections 5 and 6.4,
the existing Coupons harness, and the baseline mutation report.
Analyze the surviving replacements of max_uses_per_user || 1 at line 474.
Propose tests using a valid non-default limit and the existing helper APIs.
Check persistence and usage below/at the configured limit.
Preserve the original tests, production source, dependencies and mutation scope.
For each proposed assertion, identify its specification basis and target mutant.
Label any HTTP/payload convention not specified by the SRS.
Return candidate code and reasoning for review; do not claim execution results.
```

Review imports, reset logic, số tiền mong đợi, danh tính token và nguồn gốc oracle. Loại assertion chỉ mã hóa một defect đã biết của code gốc. Chạy candidate trên code gốc trước, rồi chạy mutation testing. Giữ raw output, bản đã review, các chỉnh sửa và cả hai report. Output mới có thể cho số khác; báo cáo đúng số quan sát được.

#### Compare and Explain

Ghép mutant theo source, location, mutator và replacement. Đọc `killedBy` và test fail tương ứng. Numeric ID chỉ có nghĩa trong một report cụ thể. Không bao giờ suy ra assertion mới kill thêm chỉ từ phần trăm cao hơn.

Với Coupons, valid mutants là `39 + 21 + 30 + 25 = 115`. Stryker baseline score là `(39 + 21) / 115 * 100 = 52.17%`. Tỷ lệ assertion-kill tách riêng là `39 / 115 * 100 = 33.91%`. Runtime errors nằm ngoài mẫu số của score. Dùng [định nghĩa chính thức](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/).

`test.each([2, 4])` là data-driven testing. Giá trị đã lưu, số tiền trong response, việc từ chối và số dòng usage là các checkpoint. Đây là quy trình semi-automated testing; không khẳng định có khả năng GUI Record & Playback.

### Authentication & Users (tác giả: Nguyễn Phúc Hoàng)

#### 1. Phân tích survivor trước khi viết test

Với mỗi mutant Survived/NoCoverage, ghi lại: dòng nó thay đổi, input hoặc trạng thái làm code gốc và mutant cư xử khác nhau, giá trị mong đợi **lấy từ spec**, và một trong các loại ở [Failure Modes](#failure-modes). Trong domain này đã phân tích 30 baseline mutant ([`F03-manual/mutant_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/mutant_mapping.md)). Chỉ viết assertion khi spec (hoặc một convention được ghi nhãn rõ) cho giá trị mong đợi; nếu không thì ghi "spec silent".

#### 2. Manual assertions

Thêm một file test mới, không bao giờ sửa baseline tests. Ví dụ kill mutant `if (true)` ở trên ([`auth.manual.test.js`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/auth.manual.test.js), AM-01):

```js
test('AM-01 a profile update without `role` leaves the stored role unchanged', async () => {
  const token = await loginOk(app, ALICE);
  expect((await update(token, PROFILE)).status).toBe(200);
  expect((await testApi.userByEmail(ALICE.email)).role).toBe('user');   // persisted state
  expect((await me(token)).body.role).toBe('user');
});
```

Chạy test mới trên code **gốc** trước (phải pass), rồi chạy mutation trên bộ test mở rộng:

```sh
npm run test:auth:manual       # 39 tests pass = 26 baseline + 13 new (branch s3/F03-auth)
npm run mutate:auth:manual
```

Kết quả: Killed 83, Timeout 27, Survived 4, NoCoverage 3, RuntimeError 8; Stryker score 94.02%, assertion kill 70.94%. 23 trong 30 mutant đã phân tích chuyển sang Killed và không mutant nào chuyển theo chiều ngược lại. Khoảng 5 trong 23 mutant đó dựa trực tiếp trên một câu của spec (FR-02/03/04); 18 mutant còn lại dựa trên convention (HTTP 500 khi database lỗi; có error body), và tên test có ghi rõ điều này. Evidence: [`F03-manual/`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/).

Để xem assertion nào kill một mutant, đọc trường `killedBy` trong `mutation.json` hoặc danh sách test trong HTML report. Mutant được ghép giữa các run theo line, column, mutator và replacement, **không** theo numeric id.

#### 3. Quy trình với Claude (semi-automated)

1. **Chuẩn bị prompt** (lưu thành `prompt.txt`): các dòng source cần test, nội dung spec, các file harness/fixture, **chỉ baseline tests**, và danh sách survivor chính xác từ baseline report. Đừng đưa manual tests vào nếu muốn có candidate độc lập. Xem [`G03-ai/prompt.txt`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/prompt.txt).
2. **Gọi Claude không dùng tools và không dùng local settings của bạn**, để máy khác có thể tái lập ([`command.txt`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/command.txt)):

   ```sh
   mkdir ai-run && cd ai-run        # an empty directory
   claude -p "$(cat prompt.txt)" --output-format json --tools "" \
     --disable-slash-commands --strict-mcp-config --no-session-persistence --setting-sources local
   ```

   Lưu raw JSON và text không chỉnh sửa (`raw.json`, `raw_result.md`).
3. **Review từng candidate theo spec** và gắn nhãn Accepted, Edited hoặc Rejected kèm lý do. Trong domain này Claude đề xuất 9 nhóm test: 7 accepted, 1 edited (đổi tên để ghi "interpretation, spec silent"), 1 rejected (xem Failure Modes). Claude cũng từ chối viết test cho 12 mutant vì spec không nói gì, và việc từ chối đó được chấp nhận.
4. **Commit file raw trước, rồi file đã sửa** trên một nhánh tách từ baseline (`s3/G03-auth`: raw `0c57bf2`, edited `b27fce2`) để phần người sửa hiện thành diff ([`human-edits.diff`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/human-edits.diff)).
5. **Kiểm chứng bằng cách chạy**, không tin vào tóm tắt của Claude:

   ```sh
   npm run test:auth:ai       # 37 tests pass on the original code
   npm run mutate:auth:ai
   ```

Kết quả sau review (hai run giống nhau): Killed 74, Timeout 27, Survived 13, NoCoverage 3, RuntimeError 8; Stryker score 86.32%, assertion kill 63.25%. Claude kill 14 trong 30 mutant đã phân tích; manual tests kill 23. 13 mutant bị cả hai kill, một mutant chỉ Claude kill, 10 chỉ manual kill, 6 không bên nào kill ([`kill_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/kill_mapping.md)). Đừng đọc điều này là "manual tốt hơn AI": đây là một prompt, một domain, và cùng một agent vừa viết prompt vừa review output (đã nêu trong experiment log).

#### 4. Các Stryker option hữu ích (ghi trạng thái trung thực)

| Feature | Công dụng | Trạng thái |
|---|---|---|
| `mutate: ["server.js:20-135"]` | Chỉ mutate các dòng của một domain, vì mọi route nằm trong một file | **Run** (mọi Auth run) |
| `coverageAnalysis: "perTest"`, `concurrency`, `timeoutMS`, `timeoutFactor` | Cùng một policy cho baseline, manual và AI để score so sánh được | **Run** (2, 5000, 1.5) |
| `// Stryker disable next-line <Mutator>: <reason>` | Đánh dấu equivalent mutant là Ignored | **Run** trong sandbox, xem Failure Modes mục 4 |
| `--dryRunOnly`, `--logLevel trace`, `--cleanTempDir false` | Chẩn đoán trường hợp "tests pass ở máy nhưng fail trong Stryker" | dry run **run**; hai option còn lại lấy từ docs, *untested here* |
| `incremental`, `--force`, `thresholds.break`, `ignoreStatic`, `disableBail` | Vòng lặp nhanh hơn, CI gate, danh sách kill theo từng assertion | lấy từ Stryker docs, *untested here* |

### Diễn giải kết quả (tác giả: Lê Tấn Hiệp)

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

RuntimeError và CompileError nằm ngoài mẫu số này. Luôn đọc các cột trạng thái cùng với điểm số. **Điểm 100% trong bài Cart chỉ cho thấy 7 mutant trên ba dòng đã chọn đều bị phát hiện**; nó không nói gì về toàn bộ EShop.

## Troubleshooting

"Đã gặp" (Observed) nghĩa là tác giả tự thấy lỗi và đã áp dụng cách sửa; "Đề xuất" (Suggested) nghĩa là cách sửa lấy từ tài liệu hoặc suy luận, chưa tái hiện lỗi. Nhãn giữ đúng như tác giả ghi. Phần Coupons chưa gắn nhãn; cột Trạng thái ghi lại phạm vi evidence mà tác giả Coupons nêu.

| Triệu chứng | Cách xử lý | Trạng thái (theo tác giả) | Domain / nguồn |
|---|---|---|---|
| `npm install` hoặc `node server.js` lỗi `ENOENT ... package.json` hay `MODULE_NOT_FOUND ... server.js` | Bạn đang ở thư mục gốc của repository. Chạy `cd backend` trước | Đã gặp (EShop trên Windows 11, Node v24.15.0) | Cart (Tấn Hiệp) |
| `Cannot find module '...\node_modules\jest\bin\jest.js'` (`MODULE_NOT_FOUND`) | Thiếu `node_modules`. Chạy `npm ci` trong thư mục chứa package.json rồi chạy lại lệnh | Đã gặp (Windows 11, bản nén không có `node_modules`) | Cart (Tấn Hiệp) |
| Stryker báo `No tests were found` dù `npm test` pass | **Cart:** giữ `"tempDirName": "stryker-tmp"` (không có dấu chấm đầu) trong cấu hình. Với mặc định `.stryker-tmp`, cùng thiết lập này lỗi trên Windows 11 và chạy được sau khi dùng `--tempDirName stryker-tmp`. Nguyên nhân chưa được kiểm chứng. **Coupons:** xác nhận đang ở thư mục backend, đúng Jest config, đúng đường dẫn file và có loại trừ `stryker-tmp`. **Auth:** trang troubleshooting của Stryker chỉ tới các thư mục tạm ẩn; config Auth đã đặt `tempDirName: "stryker-tmp"` nên lỗi không xảy ra | Cart: Đã gặp. Coupons: chưa gắn nhãn; evidence: lần bàn giao Cart trước đã gặp lỗi tìm tests; dry run fail không phải là kết quả mutation. Auth: Đề xuất (untested) | Cart, Coupons, Auth |
| `git`, `node` hoặc `npm` không được nhận diện | Hoàn tất cài đặt, đóng và mở lại terminal, rồi chạy lại ba lệnh kiểm tra phiên bản ở Installation chung | Đề xuất | Cart (Tấn Hiệp) |
| PowerShell báo `npm.ps1 cannot be loaded` / chặn `npm.ps1` | Dùng `npm.cmd` thay `npm` và `npx.cmd` thay `npx` | Cart: Đề xuất. Coupons: chưa gắn nhãn; cách xử lý ở mức shell, không cần đổi execution policy toàn máy | Cart, Coupons |
| `npm ci` báo package.json và lockfile không khớp | Nếu bạn tự sửa dependencies, chủ động chạy `npm install` để cập nhật lockfile. Với bản clone mới, tải lại starter; không xóa lockfile để bỏ qua lỗi | Đề xuất | Cart (Tấn Hiệp) |
| `package.json` không hợp lệ / `EJSONPARSE` | Xác nhận đúng frozen SHA trước khi cài. Giữ nguyên các thay đổi phát triển không liên quan; dùng disposable checkout | Chưa gắn nhãn; evidence: HEAD `69b845a` thiếu một dấu phẩy lúc kiểm ban đầu; commit `4b28756` từ bên ngoài đã sửa trong phiên đó. Các run đã ghi vẫn dùng `806ba19` đóng băng | Coupons (Thái Hòa) |
| `EBADENGINE` hoặc module native không tương thích | Chuyển sang Node 24.x và npm 11.x hoặc 12.x, rồi chạy lại `npm ci` | Đề xuất | Cart (Tấn Hiệp) |
| Không tìm thấy SQLite binding sau khi cài | **Cart:** chạy `npm ci --ignore-scripts=false`. Nếu cần build từ source, cài các công cụ trong [hướng dẫn cài node-gyp](https://github.com/nodejs/node-gyp#installation). **Coupons:** kiểm Node/npm và policy allowScripts đang track; cài lại với frozen lockfile và đọc install log | Cart: Đề xuất. Coupons: chưa gắn nhãn; evidence: lần cài ở S3 đã gặp native scripts bị chặn; không bật mọi install script toàn cục | Cart, Coupons |
| `npx` không tìm đúng binary mong muốn | Dùng các lệnh `node node_modules/...` tường minh như trong walkthrough Coupons | Chưa gắn nhãn; giữ đúng phiên bản package đã ghim | Coupons (Thái Hòa) |
| Lần chạy test ban đầu của Stryker lỗi vì lý do khác | Chạy `npm run test:cart` trước và sửa test hoặc cấu hình; chưa diễn giải mutation score | Đề xuất | Cart (Tấn Hiệp) |
| Tests fail trên code gốc | Xem assertion thực tế và kiểm có phải đã chọn defect profile không | Chưa gắn nhãn; các defect test riêng được thiết kế để fail; không nới lỏng expectation hợp lệ | Coupons (Thái Hòa) |
| Số mutant hoặc vị trí khác với hướng dẫn | So với starter 6d2e790 và ba dòng trong cấu hình; kiểm tra server.js chưa bị sửa | Đề xuất | Cart (Tấn Hiệp) |
| Stryker chạy tests hai lần hoặc nạp cả tests của Auth | Giữ `projects: []` và đúng `testMatch` ở Setup riêng của Cart | Đề xuất | Cart (Tấn Hiệp) |
| Chạy chậm, nhiều Timeout, hoặc số Timeout khác giữa các máy | **Cart:** giữ phạm vi ba dòng, thử `concurrency: 1` và đóng các tác vụ nặng; đừng tăng timeout chỉ để cải thiện điểm. **Auth:** Timeout phụ thuộc tốc độ máy và `timeoutMS`/`concurrency`; giữ cùng Stryker policy, báo `Killed` và `Timeout` riêng và nói rõ máy nào chạy. Với Auth, baseline cho cùng 27 Timeout trên macOS và trên một run Windows (0 khác biệt trạng thái trong 125 mutant) | Cart: Đề xuất. Auth: Đã gặp | Cart, Auth |
| 8 mutant kết thúc là **RuntimeError**; log có `exited unexpectedly with exit code null (SIGSEGV)` | Nguyên nhân: một mutant `StringLiteral ""` thay một câu SQL có bind parameters; `sqlite3` 6.0.1 bị crash. Đã tái lập ngoài Stryker với `db.run("", [..], cb)`. Không cần sửa: Stryker loại chúng khỏi score. Báo riêng; không tính là Killed. Kiểm *số lượng* ổn định (8 ở mọi run) | Đã gặp | Auth (Phúc Hoàng) |
| 4 mutant `if (!user)` → `false` là RuntimeError ở harness này và Timeout ở harness khác | Nguyên nhân: lỗi throw trong callback ngoài `try/catch` làm chết process; trạng thái thấy được phụ thuộc test harness. Chỉ so score giữa các run cùng harness và commit (provisional 73.45% với baseline 74.36% khác nhau chỉ vì điểm này; [`compare_vs_provisional.txt`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/compare_vs_provisional.txt)) | Đã gặp | Auth (Phúc Hoàng) |
| HTML hiển thị giá trị cũ | Chờ lần chạy hoàn tất rồi mở lại đúng HTML/JSON của profile | Chưa gắn nhãn; giữ lại report trước lần chạy kế tiếp | Coupons (Thái Hòa) |
| Xác thực AI thất bại | Ghi lại lỗi; dùng bản replay candidate đã lưu (có công bố) hoặc xác thực trước khi gửi request mới | Chưa gắn nhãn; không suy ra có lần sinh thành công từ một request đã thử | Coupons (Thái Hòa) |
| `claude --bare` lỗi "Not logged in" | Nguyên nhân: `--bare` cần API key và bỏ qua subscription login. Dùng `claude -p` với `--setting-sources local` như bước 3 của Auth | Đã gặp | Auth (Phúc Hoàng) |
| `npm ci` hiện `ERESOLVE overriding peer dependency`, `deprecated glob`, "21 moderate severity vulnerabilities" | Cảnh báo dependency của toolchain. Bỏ qua; run vẫn chạy được. Không sửa: không chạy `npm audit fix` | Đã gặp | Auth (Phúc Hoàng) |
| Node được Homebrew nâng cấp giữa hai phiên (v26.12.0 → v26.12.1) | Do máy tự cập nhật. Không thấy kết quả thay đổi, nhưng ghi `node -v` ở mọi run | Đã gặp | Auth (Phúc Hoàng) |

## Failure Modes

Các cách công cụ có thể khiến người dùng rút ra kết luận sai. Mỗi mục ghi tác giả và evidence.

### 1. Tests pass hoặc coverage cao vẫn có thể che giấu việc thiếu kiểm tra

**Cart (Tấn Hiệp):** ở starter, CO-02 vẫn pass với status 200 ngay cả khi mutant trả về giỏ hàng có thêm một phần tử. Dòng Jest màu xanh, hay việc code đã được thực thi, tạo cảm giác hành vi đã đúng.

**Coupons (Thái Hòa):** line coverage cao có thể đi cùng assertion yếu. Ví dụ toy đã lưu có full line/statement coverage nhưng mutation score chỉ 60%; việc nó không có branch site nào không chứng minh decision coverage.

**Cách tránh:** kiểm tra cả dữ liệu trả về lẫn tác động đã lưu. Assert trên response body hoặc database theo hành vi mong đợi trong đặc tả.

### 2. Mutation score có thể phóng đại hiệu quả của assertion (Timeout được tính là detected)

**Cart (Tấn Hiệp):** Stryker tính Timeout là đã phát hiện. Điểm cao có thể đến từ các mutant làm chương trình treo, điều này không cho thấy assertion tốt hơn. Trong thí nghiệm Cart của nhóm trên repo T10, 25 trong 107 mutant bị phát hiện ở baseline là Timeout. Tỷ lệ Killed và Timeout còn thay đổi theo cách Stryker gọi Jest (25 Timeout với một cấu hình, 18 với cấu hình khác) trong khi Survived không đổi; chúng tôi chưa kiểm chứng được lý do. Trong bài Cart, 100% chỉ đại diện cho ba dòng đã chọn.

**Coupons (Thái Hòa):** Timeout góp vào score của Stryker mà không có assertion nào quyết định kết quả.

**Auth (Phúc Hoàng):** ở baseline, 27 trong 87 mutant "detected" (31%) là Timeout do các handler không bao giờ trả response (`BlockStatement {}`, `if (true)`); không assertion nào quyết định chúng. Stryker score (74.36%) cao hơn tỷ lệ assertion-kill (51.28%) 23.1 điểm. Cùng 27 mutant đó là Timeout ở các run baseline, manual và AI, nên thêm assertion không thể đổi phần score này. Evidence: [`E03-baseline/`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/), [`H03-comparison/comparison.md`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md).

**Cách tránh:** báo cáo Killed và Timeout riêng, nêu cả hai công thức, phạm vi mutate và số mutant; khi so sánh hai bộ test thì so số Survived tuyệt đối trong cùng source, cấu hình và tập mutant.

### 3. Mutant còn sống không phải lúc nào cũng là test yếu

**Cart (Tấn Hiệp):** trong thí nghiệm Cart, một mutant sống sót ở mọi bộ test vì nó sửa một kiểm tra còn thiếu trong code gốc (đơn đã hủy không được chuyển sang trạng thái đã giao). Test giết được nó sẽ phải kỳ vọng hành vi sai, còn test kỳ vọng hành vi đúng thì fail trên code gốc.

**Coupons (Thái Hòa):** các defect về minimum/expiry của code gốc giới hạn những test đúng spec có thể pass trên code gốc. Không được kill các correcting mutant (mutant sửa lỗi) bằng expected value cố tình sai.

**Auth (Phúc Hoàng):** survivor `newAttempts >= 3` → `> 3` không thể kill qua API trên code gốc vì bộ đếm lỗi chỉ nhận giá trị chẵn (code cộng 2 mỗi lần login sai, requirement nói 1). Nó là *equivalent candidate within that scope*, và trở thành kill được khi code theo đúng spec. Stryker không phân biệt được điều này. Evidence: [`F03-manual/probes.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/probes.md).

**Cách tránh:** trước khi thêm assertion, so code gốc với đặc tả. Nếu code gốc sai, ghi nhận một defect; đừng khóa lỗi vào test. Gắn nhãn survivor là real gap, stubborn, spec silent, masked by a defect hoặc equivalent candidate, và nêu phạm vi.

### 4. Disable comment có thể che các mutant kill được (Auth, Phúc Hoàng)

Trong sandbox, `// Stryker disable next-line EqualityOperator` đã ignore mọi equality mutant trên dòng, kể cả hai mutant mà tests đã kill. Score tăng từ 88.89% lên 100% mà không có assertion mới nào. Evidence: [`A03-S1-strong/`](../../experiments/s3/runs/Phuc_Hoang/A03-S1-strong/) so với [`A03-S1-ignored/`](../../experiments/s3/runs/Phuc_Hoang/A03-S1-ignored/).

**Cách tránh:** disable ở mutator hẹp nhất, ghi lý do bằng văn bản, và báo score trước khi ignore.

### 5. AI có thể viết test pass nhưng vô ích, mã hóa lỗi, hoặc giải thích/tóm tắt sai

**Cart (Tấn Hiệp):** AI có thể thêm kiểm tra status 200 trùng với test có sẵn, hoặc lấy hành vi sai của code làm kết quả mong đợi. Trong thí nghiệm của nhóm, Claude đưa ra một assertion tốt nhưng lý do sai: nó biện minh cho test bằng một mutant mà StrykerJS không sinh ra. Ở một trường hợp khác, giá trị mong đợi do người viết sao chép từ `server.js` đã pass trên code gốc dù code không theo đặc tả.

**Auth (Phúc Hoàng), AI candidate nâng score bằng cách mã hóa một bug đã biết:** file raw của Claude có một test `test.failing` assert hành vi đúng (`PUT /me` không được đổi `role`). Test này fail trên code gốc, nên `test.failing` làm nó "pass", và bốn mutant xóa nhánh `role` được tính là Killed chỉ vì chúng xóa lỗ hổng. Raw score là 89.74%; sau khi thành viên bỏ test đó, score là 86.32%. Evidence: [`G03-ai/raw-candidate-run/`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/raw-candidate-run/), [`human-edits.diff`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/human-edits.diff).

**Auth (Phúc Hoàng), tóm tắt của AI có thể sai:** Claude báo "17 mutants have a test, 13 do not"; thực tế file phủ 18 và để lại 12. Nó còn để import không dùng và ghi sai tên task trong header. Evidence: [`G03-ai/raw_result.md`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/raw_result.md), experiment log §AI Runs.

**Cách tránh:** đối chiếu oracle với đặc tả, đọc diff, chạy mọi test AI trên code gốc và đọc lý do nó pass, rồi chạy mutation testing. Giữ test cho defect đã biết trong suite riêng. Đếm từ report, không đếm từ tin nhắn của AI. Chỉ chấp nhận candidate vì assertion phát hiện được mutant và kiểm tra một yêu cầu thật, không phải vì lời giải thích nghe hợp lý.

### 6. Thêm case không đảm bảo thêm kill (Coupons, Thái Hòa)

Thêm case không đảm bảo thêm kill: các bản mở rộng Coupons 35/40 tests giữ nguyên trạng thái mutation của các biến thể ban đầu.

### 7. Output trên console có thể ghi nhận kill sai test (Cart, Tấn Hiệp)

Console của Stryker gán kill cho test fail đầu tiên của mỗi mutant. Khi hai bộ test chạy cùng nhau, một test cũng bắt được mutant có thể hiện "covered" với 0 kill.

**Cách tránh:** đừng kết luận một test vô dụng từ console; đọc `killedBy` của từng mutant trong `reports/mutation.json`.

### 8. Context và helper dùng chung ngăn diễn giải người-với-AI độc lập (Coupons, Thái Hòa)

Context dùng chung và helper code ngăn việc diễn giải kết quả như một so sánh người-với-AI độc lập.

**Cách tránh:** báo cáo các bộ test đã chạy và nguồn gốc của chúng.

## References

**Chung**

- [StrykerJS Configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) và [Jest Runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/): phạm vi mutate, plugin và cấu hình Jest.
- [Mutant States and Metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) và [Equivalent Mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/): diễn giải kết quả và giới hạn.
- StrykerJS [Disable mutants](https://stryker-mutator.io/docs/stryker-js/disable-mutants/) và [Troubleshooting](https://stryker-mutator.io/docs/stryker-js/troubleshooting/).
- [Jest API](https://jestjs.io/docs/api#testeachtablename-fn-timeout): data-driven tests.
- [Git Installation](https://git-scm.com/install/), [Node.js Download](https://nodejs.org/en/download), [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci/) và [node-gyp Installation](https://github.com/nodejs/node-gyp#installation): cài đặt và dependency native.
- [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart), [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) và [Codex CLI Quickstart](https://github.com/openai/codex#quickstart): cài đặt, khởi động và đăng nhập AI agent.
- [Repository EShop gốc](https://github.com/ttbhanh/eshop-sut).
- Frozen setup: [`Baseline_Manifest.md`](../../experiments/s3/Baseline_Manifest.md).

**Cart & Orders (Tấn Hiệp)**

- [Workshop starter và nguồn gốc](https://github.com/tkob-team/eshop-sut-workshop/tree/6d2e790be54193d44f7e401c59dbdf8283a3f42d): source, tests, thiết lập và nguồn đóng góp.
- [EShop SRS](https://github.com/tkob-team/eshop-sut-workshop/blob/6d2e790be54193d44f7e401c59dbdf8283a3f42d/docs/EShop_SRS.md): căn cứ hành vi của hệ thống.
- Evidence thí nghiệm của nhóm cho Troubleshooting và Failure Modes phần Cart: `experiments/s3/Experiment_Log_Tan_Hiep.md` (Limits & Failure Modes, Cross Reproduction).

**Coupons (Thái Hòa)**

- [S3 research notes](../../research/s3/Research_Notes_Thai_Hoa.md): coverage, assertions, cấu hình và danh sách nguồn.
- [Coupons experiment log](../../experiments/s3/Experiment_Log_Thai_Hoa.md): lịch sử chạy và giới hạn.
- Trang Stryker configuration và Jest runner ở mục Chung: tác giả đã kiểm khi chuẩn bị S4 ngày 2026-10-23.
- [Joint S4 comparison](../../experiments/s4/Overall_Comparison.md): các profile gộp chạy riêng; không dùng số gộp thay cho số của từng domain.
- AI assistance: `TH-S4-DOCS-20261023` trong [AI record cá nhân](../../ai-audit/AI_Record_Thai_Hoa.md).

**Authentication & Users (Phúc Hoàng)**

- API spec: `api_specification.md` §1–2; SUT `README.md` FR-02, FR-03, FR-04, SEC-06 (SUT commit `806ba19`).
- Experiment log: [`Experiment_Log_Phuc_Hoang.md`](../../experiments/s3/Experiment_Log_Phuc_Hoang.md).
- Reports và runs: [`E03-baseline`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/), [`F03-manual`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/), [`G03-ai`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/), [`H03-comparison`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/).
- Research notes với nguồn [P01]–[P16]: [`Research_Notes_Phuc_Hoang.md`](../../research/s3/Research_Notes_Phuc_Hoang.md).
- AI use cho phần này: [`AI_Record_Phuc_Hoang.md`](../../ai-audit/AI_Record_Phuc_Hoang.md) (artifact `PH-S4-GUIDE-A03`).
