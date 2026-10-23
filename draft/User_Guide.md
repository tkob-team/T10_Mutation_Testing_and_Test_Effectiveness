# User Guide: Mutation Testing on EShop with StrykerJS and an AI Agent

**Document language:** Tiếng Việt; headings, identifiers và technical terms giữ bằng English.

**Scope:** EShop Node.js backend — Cart & Orders, Coupons, Authentication & Users.

**Reference baseline:** 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef.

**Document revision:** 2026-10-23.

Chúng tôi xây dựng hướng dẫn này để người đọc tự thiết lập môi trường, chạy mutation testing, phân tích surviving mutants và kiểm chứng assertions do con người hoặc AI Agent đề xuất. Kết quả tham chiếu được dẫn tới reports đã lưu; ô ghi nhận thực hành để trống cho người thực hiện bổ sung.

<!-- Bản draft tiếng Việt theo yêu cầu trực tiếp của Thái Hòa. Master Guide §4 yêu cầu English cho bản nộp; bản này chưa xác nhận đáp ứng điều kiện ngôn ngữ của bản nộp. -->

## Table of Contents

1. [Introduction](#1-introduction)
2. [Install](#2-install)
3. [First Test](#3-first-test)
4. [Advanced Usage](#4-advanced-usage)
5. [Interpreting Results](#5-interpreting-results)
6. [Troubleshooting](#6-troubleshooting)
7. [Failure Modes](#7-failure-modes)
8. [References](#8-references)

## 1. Introduction

### 1.1. Purpose and Learning Outcomes

Mutation testing đánh giá mức nhạy của tests đối với những thay đổi nhỏ trong chương trình. StrykerJS tạo từng phiên bản thay đổi, gọi là mutant, rồi chạy tests để quan sát mutant có bị phát hiện hay không. Kết quả giúp tìm những hành vi đã được thực thi nhưng chưa được assertion kiểm tra đủ rõ.

Sau khi hoàn thành hướng dẫn, người đọc có thể:

- Khôi phục EShop ở một revision xác định và chạy baseline tests.
- Chạy StrykerJS, mở HTML report, nhận diện mutant theo source location, mutator và replacement.
- Giải thích vì sao mutant sống sót; thiết kế dữ liệu và assertion phân biệt hành vi.
- Yêu cầu AI Agent đề xuất assertions, review candidate và thực thi kiểm chứng.
- So sánh baseline, manual và AI test sets với điều kiện đầu vào tương thích.
- Nhận ra kết luận sai khi đọc coverage, mutation score hoặc AI output.

[Seminar Report](Seminar_Report.md) trình bày sâu lý thuyết và nghiên cứu liên quan. Guide này tập trung vào thao tác, checkpoints và khả năng chạy lại.

### 1.2. Target Audience and Prerequisites

Hướng dẫn dành cho sinh viên đã biết JavaScript cơ bản, HTTP/JSON, terminal và cấu trúc một Jest test. Cần Git, Node.js/npm, trình soạn thảo và browser để mở HTML report. Quy trình AI cần quyền truy cập công cụ do người thực hiện chọn.

Commands sử dụng **PowerShell**. Mọi lệnh npm, node và đường dẫn test/config bên dưới chạy trong **backend/**, trừ đoạn có chỉ dẫn đổi thư mục. Shell khác có thể cần đổi cú pháp quản lý files.

### 1.3. Scope and Limitations

EShop có ba domains thực nghiệm: Cart & Orders, Coupons, Authentication & Users. Guide dùng Cart làm bài đầu tiên, sau đó mở rộng sang hai domains còn lại.

Baseline đóng băng tại commit ở đầu tài liệu. Nhánh main có thể đã có tests bổ sung; số tests/files tại main không tự đại diện cho baseline. [Baseline Manifest][P1] xác định source, test selection, versions và reset policy.

Mutation score phản ánh khả năng phát hiện **các mutants đã sinh và được chọn**. Nó không chứng minh toàn bộ phần mềm đúng spec, không thay security/performance testing và không tự chứng minh AI tốt hơn con người.

### 1.4. Essential Terminology

| Term | Meaning in This Guide |
|---|---|
| SUT | EShop backend được kiểm thử |
| Baseline | Production code, config và tests ban đầu làm mốc so sánh |
| Mutant / mutator | Phiên bản code bị đổi / quy tắc tạo thay đổi |
| Assertion | Điều kiện test kiểm tra, chẳng hạn body phải là mảng rỗng |
| Test oracle | Căn cứ xác định expected behavior, thường là spec đã đối chiếu |
| Surviving mutant | Mutant chưa bị phát hiện trong run tương ứng |
| Manual test set | Tests bổ sung từ phân tích của người thực hiện; ghi provenance nếu có AI hỗ trợ |
| AI assertion candidate | Assertion do AI đề xuất, cần review và thực thi |
| Equivalent candidate | Mutant đang được xem xét là có thể tương đương; chưa phải kết luận đã chứng minh |
| Run evidence | Source/config/test identity, commands, logs và reports của một lần chạy |

### 1.5. Tool Roles and Workflow

| Component | Responsibility |
|---|---|
| Jest | Chạy tests và đánh giá assertions |
| Supertest | Gửi HTTP requests tới Express app trong test |
| Test harness | Cô lập app, database và fixtures |
| StrykerJS + Jest runner | Sinh mutants, chọn/chạy tests, ghi trạng thái và reports |
| AI Agent | Đề xuất inputs/assertions và giải thích; đầu ra vẫn là candidate |
| Human reviewer | Đối chiếu oracle, review code/evidence và chịu trách nhiệm kết luận |

~~~text
Specification + frozen SUT
          |
          v
Original tests pass --> Baseline mutation report
                                  |
                       Select surviving mutants
                          /               \
                 Manual analysis      AI candidate
                          \               /
                    Review + original tests
                                  |
                           Mutation rerun
                                  |
                      Per-mutant comparison
~~~

Quy trình kết hợp automation ở việc chạy tests/mutants với human review ở việc chọn oracle, phân tích survivor và chấp nhận candidate. **AI Agent** chỉ vai trò; mỗi run ghi tool/model thực tế.

### 1.6. How to Use This Guide

Lần đầu, thực hiện Section 2 rồi Section 3 theo thứ tự. Section 4 dành cho phân tích nhiều cases và tái lập packages. Dùng Section 5 để đọc kết quả; tra Section 6 khi lệnh chạy lỗi và Section 7 trước khi kết luận.

**Expected Result** mô tả điều cần đạt. **Reference Evidence** chỉ dữ liệu có sẵn từ run được dẫn. Chúng không thay cho kết quả mà người đọc tự chạy.

## 2. Install

### 2.1. System Requirements and Tested Versions

Bảng ghi môi trường của frozen run trong [Baseline Manifest][P1], không tuyên bố đây là phiên bản tối thiểu của mọi tool.

| Component | Reference Environment | Purpose |
|---|---|---|
| OS | Windows x64 | Nền tảng run tham chiếu |
| Node.js / npm | v24.16.0 / 12.0.2 | Runtime và package manager |
| Jest | 30.5.2 | Test runner |
| Stryker core / Jest runner | 10.0.0 / 10.0.0 | Mutation engine và plugin |
| Supertest | 7.3.1 | HTTP testing |
| sqlite3 | 6.0.1 | Database dependency có native binding |
| Git | | Lấy source và xác định revision |
| AI Agent / model | | Điền theo công cụ thực tế |

<!-- Điền Git version và AI Agent/model từ actual environment; không suy ra từ công cụ dùng để soạn guide. -->

Kiểm tra trước khi cài dependencies:

~~~powershell
git --version
node --version
npm --version
~~~

Nếu dùng môi trường khác, lưu khác biệt vào run record và kiểm tra original tests trước khi đối chiếu mutation results.

### 2.2. Obtain the EShop Package

**Objective:** tạo clone thực hành riêng, giữ nguyên development checkout.

**Prerequisites:** terminal ở thư mục cha muốn chứa clone; tên eshop-guide-baseline chưa tồn tại.

~~~powershell
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-guide-baseline
Set-Location eshop-guide-baseline
git switch --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef
git rev-parse --show-toplevel
git rev-parse HEAD
git status --short
Set-Location backend
~~~

**Expected Result:** HEAD khớp đầy đủ commit trên; status chưa có thay đổi tracked files. Nếu Git không tìm thấy commit hoặc không truy cập được repo, nhận đúng package từ nhóm. Không tự thay bằng main rồi dùng số liệu frozen làm expected.

### 2.3. Install Dependencies

Trong backend của clone mới:

~~~powershell
npm ci --no-audit --no-fund
npm ls --depth=0
~~~

**Expected Result:** dependencies được khôi phục theo package-lock.json; Jest và hai Stryker packages khớp versions đã khóa. Giữ lockfile cùng source.

sqlite3 có native binding. Khi install thất bại, giữ nguyên lỗi, kiểm tra Node/platform và xem Section 6. Package tham chiếu có allowScripts cho sqlite3; không áp dụng blanket permission cho mọi dependency script để che lỗi.

**Checkpoint:** npm ci thành công chưa đủ xác nhận harness hoạt động; tiếp tục Section 2.5.

Với **project mới chưa tích hợp Stryker**, official initializer là npm init stryker@latest [R1]. Đây là nhánh setup riêng, có thể thay dependencies/config. Bài EShop đã có pinned configuration nên dùng npm ci ở trên.

### 2.4. Inspect the Configuration

~~~powershell
Get-Content -LiteralPath package.json
Get-Content -LiteralPath stryker.cart-orders.config.json
~~~

| Setting | Frozen Value / Meaning |
|---|---|
| testRunner | jest |
| mutate — Cart | server.js:280-349 và server.js:510-568 |
| mutate — Coupons | server.js:355-492 |
| mutate — Auth | server.js:20-135 |
| coverageAnalysis | perTest |
| concurrency | 2 |
| timeoutMS / timeoutFactor | 5000 / 1.5; không có nghĩa timeout tổng của mọi mutant đúng 5 giây |
| tempDirName | stryker-tmp |
| reporters | clear-text, html, json |

Mutation scope và test selection là hai lựa chọn khác nhau. mutate chọn production code cần đổi; Jest config/testMatch chọn tests quan sát thay đổi. Không đưa test files vào mutation scope [R2–R3].

Cart/Coupons dùng Jest project cart-coupons; Auth dùng project auth với harness riêng. Scripts đã chọn project/config phù hợp. Không gộp mocks hai harness tùy ý.

### 2.5. Verify Fixtures and Original Tests

Harness Cart/Coupons thay SQLite file bằng database trong bộ nhớ và bắt Express app để Supertest gọi trực tiếp. Cart dùng user mới cho mỗi case; Coupons reset dữ liệu và cố định Date; Auth có fixtures/cleanup riêng [P1].

Không cần khởi động server hoặc frontend cho các API tests này. Chạy server trực tiếp là luồng khác, có thể khởi tạo lại database file gốc.

~~~powershell
npm test -- --listTests
npm test
npm run test:cart-orders
npm run test:coupons
npm run test:auth
~~~

**Reference Evidence:** frozen integration có 88 tests pass: Cart 36, Coupons 26, Auth 26 [P2]. Discovery phải chọn đúng bốn baseline test files, không nhận tutorial, defects hoặc manual/AI additions.

Chạy defect suite riêng khi cần kiểm tra lỗi gốc:

~~~powershell
npm run test:defects
~~~

**Expected Result for the Frozen Package:** suite exit 1 với 54 assertion failures đã lưu [P3]. Không đưa cases này vào baseline pass hoặc đổi expected để coi lỗi gốc là đúng. Auth có giả định OTP 24 giờ chưa được spec chốt [P4].

**Installation Verification Record**

| Item | Actual Result | Evidence |
|---|---|---|
| Runtime / dependency installation | | |
| Test discovery | | |
| Original baseline tests | | |
| Fixtures/reset verification | | |
| Environment screenshot | | |

<!-- Bổ sung từ lần người đọc thực hiện; không dùng run trước làm screenshot/self-run của người đọc. -->

### 2.6. Prepare AI Agent Access

Guide minh họa setup bằng **Claude Code**, có usage evidence trong nhóm. Có thể dùng AI Agent khác; ghi đúng tool/version/model và interface thực tế.

Trên Windows có WinGet, tài liệu chính thức hướng dẫn [R7]:

~~~powershell
winget install Anthropic.ClaudeCode
claude --version
claude
~~~

Nếu đã cài, kiểm tra version rồi mở session. Sign-in theo prompts; dùng /login trong session khi cần đăng nhập lại. Không ghi credentials/tokens vào prompt hoặc log chia sẻ.

**Basic Check:** yêu cầu giải thích một test không chứa secrets và quan sát response thành công. Thử trong thư mục riêng, không cho agent thay đổi baseline clone chỉ để kiểm tra access.

| Field | Actual Value |
|---|---|
| Tool / interface / version | |
| Model / configuration visible to the user | |
| Successful access evidence | |

Không gán model của run cũ cho session mới. Nếu đổi công cụ vì authentication failure, lưu lý do và đúng tên công cụ thay thế.

## 3. First Test

### 3.1. Define the Business Scenario

**Objective:** phát hiện endpoint trả success nhưng nội dung giỏ hàng sai.

**Prerequisites:** Section 2.5 thành công; terminal ở backend của clone baseline; đọc FR-07 và API §4.1 [P5].

| Item | Value |
|---|---|
| Scenario | User mới đọc giỏ trước khi thêm sản phẩm |
| Request | GET /api/cart với valid token của user mới |
| Expected response | HTTP 200, body là mảng rỗng |
| Baseline case | CO-02 trong test/cart-orders.test.js |
| Current observation | CO-02 chỉ assert status 200 |
| Additional observation | Body đúng [] |

Expected “giỏ mới rỗng” dựa nghiệp vụ giỏ hàng/API contract. Không lấy giá trị code đang trả làm căn cứ duy nhất để tuyên bố giá trị đó đúng spec.

### 3.2. Run Baseline Mutation Testing

~~~powershell
npm run test:cart-orders
npm run mutate:cart-orders -- --dryRunOnly
npm run mutate:cart-orders
~~~

**Expected Result:** original tests và initial run pass; full mutation command tạo reports/cart-orders/mutation.html và mutation.json. Dry run kiểm setup/tests, không chứng minh mutants đã được thực thi.

Mở HTML bằng browser. Trước khi chạy variant, lưu report riêng:

~~~powershell
Copy-Item -LiteralPath reports/cart-orders -Destination reports/guide-cart-baseline -Recurse
~~~

Tên đích cần chưa tồn tại; lần sau dùng tên mới để bảo toàn evidence. Khi command lỗi, xử lý trước khi dùng reports có sẵn, tránh lấy nhầm file run cũ.

**Reference Evidence:** frozen Cart report có 150 mutants: 82 Killed, 25 Timeout, 34 Survived, 2 NoCoverage, 7 RuntimeError [P6]. Timeout/errors có thể khác theo môi trường; không chỉnh config chỉ để ép counts khớp.

### 3.3. Inspect a Surviving Mutant

Trong HTML report:

1. Mở server.js, lọc Survived.
2. Tìm dòng 286, mutator ArrayDeclaration.
3. Xem replacement của [] thành ["Stryker was here"].
4. Đối chiếu các tests cover vị trí và case CO-02.

Report tham chiếu có mutant ID 6. Khi đổi run, nhận diện lại bằng file/location/mutator/replacement.

Mutant làm giỏ mới chứa sẵn phần tử. Status vẫn 200 nên assertion status không phân biệt được. Cần quan sát **response body**.

### 3.4. Add a Manual Assertion

Trên clone thực hành, tạo nhánh bổ sung:

~~~powershell
git switch -c codex/guide-cart-manual
~~~

Trong test/cart-orders.test.js, sửa **chỉ CO-02**, giữ setup/helpers và các cases khác:

~~~javascript
test('CO-02 [normal] new user gets an empty cart', async () => {
  const { token } = await newUser(app);
  const res = await request(app).get('/api/cart').set(bearer(token));
  expect(res.status).toBe(200);
  expect(res.body).toEqual([]);
});
~~~

Assertion mới quan sát dữ liệu nghiệp vụ. Không sửa server.js/database.js để làm test pass.

**Provenance:** snippet chuyển cùng ý tưởng từ manual suite Hiệp bàn giao [P7] vào CO-02 cho dễ thực hành. Đây là adaptation cho guide; evidence lịch sử sử dụng manual suite riêng, không phải chính snippet adaptation này.

### 3.5. Verify the Manual Variant

~~~powershell
npm run test:cart-orders
npm run mutate:cart-orders
Copy-Item -LiteralPath reports/cart-orders -Destination reports/guide-cart-manual -Recurse
git diff -- test/cart-orders.test.js
~~~

**Expected Result:** original tests vẫn pass; mutant mục tiêu chuyển Survived→Killed do assertion về body. Kiểm failed assertion/test mapping, không suy từ tổng score tăng.

Historical mapping xác nhận mutant 6 bị assertion giỏ rỗng phát hiện trong suite bàn giao [P8]. **Actual result của adaptation CO-02** ghi sau khi người đọc chạy.

| Check | Actual Result | Evidence |
|---|---|---|
| Original tests pass after the edit | | |
| Selected mutant status before / after | | |
| Killing test / failed observation | | |
| Production source unchanged | | |

<!-- Không chép totals của full manual suite làm kết quả một assertion adaptation. -->

### 3.6. Generate an AI Assertion Candidate

**Objective:** yêu cầu AI đề xuất assertion cho cùng gap trên baseline tests.

Dùng clone thứ hai để input không vô tình chứa manual edit. Từ backend clone đầu:

~~~powershell
Set-Location ../..
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-guide-ai
Set-Location eshop-guide-ai
git switch --detach 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef
Set-Location backend
npm ci --no-audit --no-fund
npm run test:cart-orders
~~~

Chuẩn bị FR-07/API §4.1, handler GET /api/cart, baseline CO-02 và mutant diff. Không đưa manual solution vào prompt. Agent có khả năng đọc files nên làm việc trong clone AI; ghi context thực tế, không mặc định session “blind” chỉ vì mở chat mới.

~~~text
Task: propose a minimal assertion change for EShop Cart case CO-02.
Specification: a new user's cart must be an empty array before adding items.
Baseline revision: 806ba19ee4e09eafe9b2696ccf117a2b1ab841ef.
Production code: [paste the GET /api/cart handler].
Baseline test: [paste CO-02 and relevant helper signatures].
Mutant: ArrayDeclaration changes [] to ["Stryker was here"] at server.js L286.
Constraints:
- Change only assertions in the existing CO-02 test.
- Preserve existing tests and status assertions.
- Keep production code, dependencies and mutation configuration unchanged.
- Use only the supplied API/helper names.
Return:
1. Candidate test code.
2. Distinguishing observation and specification rationale.
3. Assumptions and verification checks.
Do not claim that you executed tests.
~~~

Lưu prompt/raw output trước khi chỉnh candidate; ghi actual tool/model/version/context. Đây là template, không phải transcript run đã diễn ra.

### 3.7. Review and Execute the Candidate

Reviewer kiểm tra:

1. Expected behavior khớp spec không?
2. Candidate dùng đúng response shape và helper exports không?
3. Có giữ original tests, cô lập user/data và giữ production không?
4. Assertion quan sát behavior gap hay chỉ kiểm status?
5. Assumptions nào cần xác nhận?

Ghi verdict accepted/edited/rejected và lý do; giữ raw/edited candidate. Áp dụng bản review vào CO-02 của clone AI:

~~~powershell
npm run test:cart-orders
npm run mutate:cart-orders
Copy-Item -LiteralPath reports/cart-orders -Destination reports/guide-cart-ai -Recurse
git diff -- test/cart-orders.test.js
~~~

**Expected Result:** original tests pass; mutant bị phát hiện nếu candidate quan sát đúng gap. Nếu vẫn Survived, giữ kết quả đó và phân tích; không đổi expected theo mutant để ép kill.

### 3.8. Record the Outcome

| Field | Baseline | Manual Adaptation | AI Candidate |
|---|---|---|---|
| Source / config identity | | | |
| Test source / diff | | | |
| Original-test result | | | |
| Mutant signature / state | | | |
| Killing test / observation | | | |
| Report path | | | |
| Reviewer / verdict | | | |

<!-- Điền từ thực hành mới. Không gán provenance human-only cho adaptation lấy từ guide do AI hỗ trợ soạn. -->

Hoàn thành bài khi giải thích được vì sao status 200 chưa đủ, observation nào phân biệt hành vi và evidence nào xác nhận kill. Clone riêng giúp kiểm soát inputs; tự nó không tạo nghiên cứu human-vs-AI độc lập.

## 4. Advanced Usage

### 4.1. Analyze at Least Three Surviving Mutants

T10 yêu cầu giải thích ≥3 survivors và bổ sung ≥3 manual assertions. CO-02 giới thiệu một observation. Dùng ba cases có mapping trong cùng frozen Cart universe để mở rộng [P8–P9].

| Case / Oracle | Frozen Mutant | Why Baseline Misses It | Distinguishing Observation |
|---|---|---|---|
| Giỏ ban đầu rỗng — FR-07/API §4.1 | L286, ArrayDeclaration, [] thành ["Stryker was here"], ID 6 | Status vẫn 200 | Body đúng [] |
| Hai lần thêm giữ đủ hai items — FR-07/API §4.1–4.2 | L293, CallExpression, xóa push(req.body), ID 15 | POST vẫn success | GET trả đủ hai items đúng nội dung |
| Hủy pending order lưu canceled — FR-10/API §4.6 | L335, StringLiteral, "canceled" thành "", ID 68 | Response hủy vẫn success | Đọc DB: status đúng canceled |

Đối chiếu theo chuỗi **Requirement → Preconditions → Mutant Diff → Input → Assertion → Original Pass → Mutation Outcome**. Lưu analysis, test diff và actual reports của ba cases.

Hai observations còn lại có thể bổ sung vào cases hiện có, dùng helpers baseline export:

~~~javascript
// Cart: sau khi tạo user và thêm itemA, itemB qua POST.
const cart = await request(app).get('/api/cart').set(bearer(token));
expect(cart.body).toHaveLength(2);
expect(cart.body[0]).toEqual(itemA);
expect(cart.body[1]).toEqual(itemB);

// Orders: sau khi tạo pending order và gọi cancel thành công.
// Thêm orderStatus vào import từ './helpers/app'.
expect(await orderStatus(db, orderId)).toBe('canceled');
~~~

Đây là fragments đặt vào đúng case có variables/fixtures tương ứng, không phải test file độc lập. Xem full delivered suite [P7] để đọc context. Khi chuyển chúng vào baseline file của bài học, rerun và lưu evidence mới.

Không dùng mutant sửa lỗi gốc thành đúng spec để buộc viết assertion bảo vệ lỗi đó. Nếu expected đúng spec đã fail trên original code, ghi defect riêng.

### 4.2. Compare Baseline, Manual and AI Test Sets

1. Khớp production revision/bytes, spec và mutation ranges.
2. Khớp versions, fixtures, timeout policy và configuration.
3. Giữ baseline tests không chứa additions.
4. Tạo manual/AI variants từ cùng mốc; AI không vô tình thừa hưởng manual additions.
5. Chạy original tests của từng variant trước mutation.
6. Ghép file/location/mutator/replacement, không chỉ numeric ID.

Giữ mutation scope cố định khi phân tích tác động assertions. Cố ý đổi scope/config phải báo thành điều kiện mới và chạy lại mốc so sánh. Không lấy trung bình domain percentages làm common score.

**Reference Example — Full Cart Suites**

| Test Set | Tests Pass | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool Score |
|---|---:|---:|---:|---:|---:|---:|---:|
| Frozen baseline | 36 | 82 | 25 | 34 | 2 | 7 | 74.83% |
| Delivered manual suite, Agent rerun | 44 | 105 | 25 | 11 | 2 | 7 | 90.91% |
| Delivered AI suite, Agent rerun | 41 | 95 | 25 | 21 | 2 | 7 | 83.92% |

Cross Reproduction Notes ghi overlays và 150/150 signatures khớp [P9]. Manual thêm 23 kills; AI thêm 13. Đây là **full suites đã lưu**, không phải adaptation CO-02/session AI mới ở Section 3 và không chứng minh kết luận tổng quát về người/AI.

### 4.3. Apply Data-driven Tests and Checkpoints

Data-driven testing dùng cùng procedure với nhiều input/expected. Với boundaries, chọn dưới/tại/trên mốc khi spec đủ căn cứ; Jest hỗ trợ test.each [R6].

Ví dụ thiết kế coupon minimum:

| Input Amount | Expected Behavior | Oracle Status |
|---|---|---|
| minimum − 1 | Từ chối áp mã | Theo minimum requirement |
| minimum | Cho phép nếu minimum inclusive | Đối chiếu contract; lỗi đúng mốc ghi riêng |
| minimum + 1 | Cho phép nếu điều kiện còn lại hợp lệ | Theo minimum requirement |

Code gốc có defects tại một số boundaries. Không đưa test đúng spec nhưng fail trên code gốc vào baseline pass hoặc bỏ case chỉ để báo boundary coverage đẹp hơn.

Checkpoints gồm status, response fields và persisted state khi cần. Coupons quote/apply, checkout và ghi usage là các API operations riêng; chỉ gọi apply chưa chứng minh usage tăng. Orders success message chưa chứng minh DB đã đổi.

| Capability | Application |
|---|---|
| Data-driven | Boundary/input matrix được thực thi bằng tests |
| Checkpoints | Assertions trên response/state |
| Replay | Chạy lại tests từ fixtures xác định |
| Record & Playback | Bỏ/thay theo quyết định preparation; không gọi Jest là GUI recorder |

### 4.4. Domain Walkthroughs

#### 4.4.1. Cart & Orders

**Inputs:** frozen source, user/order fixtures, FR-07/08/10/11/18, API §4/§6.2.

~~~powershell
npm run test:cart-orders
npm run mutate:cart-orders
~~~

**Checkpoints:** giỏ rỗng, dữ liệu sau thêm items, order status sau cancel; kiểm initial state và transitions spec cho phép. Reports ở reports/cart-orders/. Xem Section 4.1 và Cart evidence [P9].

#### 4.4.2. Coupons

**Inputs:** coupon fixtures, user/admin identities, fixed Date, FR-09/17 và API §5.

~~~powershell
npm run test:coupons
npm run coupons:dry
npm run mutate:coupons
~~~

**Checkpoints:** đúng mã, minimum, expiry, discount/final amount, usage đúng user/coupon. Expected arithmetic phải được đối chiếu; defects percentage/boundary không phải oracle đúng. Reports ở reports/coupons/.

Để tái lập **manual/Agent mở rộng**, dùng extension package [P10]: giải nén frozen-input.zip vào thư mục mới, overlay toàn bộ sources/backend/ vào backend/ đúng vị trí, cài dependencies bằng lockfile. Package có bảy source/config files; không chỉ copy test rồi bỏ quên helper/config.

Từ backend của package đã ghép:

~~~powershell
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
~~~

**Reference Evidence:** bản mở rộng có 35 manual tests và 40 Agent tests pass. Hai variants đều 41 Killed/21 Timeout/28 Survived/25 NoCoverage/5 RuntimeError trên 120 mutants; không thêm kill so với variants trước mở rộng. Cả hai có AI assistance và số scenarios khác nhau theo yêu cầu; không gọi đây là independent human-vs-AI comparison.

Giữ report/version cũ và mới riêng. Không dùng counts 29/28 của variant cũ làm expected cho package 35/40.

#### 4.4.3. Authentication & Users

**Inputs:** Auth harness/fixtures riêng, login/lock, OTP/reset/profile requirements.

~~~powershell
npm run test:auth
npm run mutate:auth
~~~

**Checkpoints:** attempts/lock theo policy, token/access và persisted profile. OTP expiry phải theo requirement đã chốt; mốc 24 giờ trong một defect test là assumption. Reports ở reports/auth/.

Auth baseline reproduction đã có evidence [P9]. Các phần chưa bàn giao để trống:

| Item | Source / Command | Original Result | Mutation Report | Review |
|---|---|---|---|---|
| Auth manual variant | | | | |
| Auth AI variant | | | | |
| Auth three-arm comparison | | | | |

<!-- Bổ sung khi nhận F03/G03/H03 đúng revision; không suy từ baseline chạy được. -->

### 4.5. Investigate Equivalent Candidates

1. Mô tả syntax change và paths chịu ảnh hưởng.
2. Tìm input làm state/control flow khác nhau.
3. Xác định khác biệt có truyền tới observable output/state không.
4. Thử distinguishing input; nếu chưa tìm được, ghi assumptions/phạm vi đã xét.
5. Giữ equivalent candidate đến khi có lập luận đủ căn cứ.

Chưa tìm được test phân biệt không chứng minh equivalence. Ví dụ official docs [R5] giúp hiểu phương pháp, không thay evidence cho EShop mutant. Không ignore chỉ để tăng score.

### 4.6. Reuse Prompts and Preserve Results

Tái sử dụng Section 3.6 bằng cách thay spec, code, baseline tests, mutant và fixtures. Với advanced cases, yêu cầu agent nêu preconditions, observable state, assumptions và lý do từng assertion phát hiện được thay đổi.

| Category | Required Record |
|---|---|
| Inputs | Revision, test/config snapshots hoặc hashes, runtime/tool versions |
| Execution | Working directory, command, exit code, actual console output |
| Results | HTML/JSON, original-test result, mutant mapping |
| AI | Tool/model, prompt, raw output, edited code, review verdict/reason |
| Interpretation | New kills, survivors, errors, assumptions và limits |

Dùng run folder mới hoặc archive evidence trước khi chạy lại. Không đổi executor Agent run thành member self-run. Ghi peer reproduction khi thực sự thực hiện:

| Reviewer | Environment | Procedures Reproduced | Result / Issues | Evidence |
|---|---|---|---|---|
| | | | | |

## 5. Interpreting Results

### 5.1. Read Mutant States

JSON state tokens có thể được UI hiển thị với khoảng trắng. Định nghĩa/công thức Stryker ở [R4].

| State | Reading |
|---|---|
| Killed | Có test fail khi mutant active; kiểm nguyên nhân |
| Survived | Selected tests vẫn pass |
| NoCoverage | Không có test coverage |
| Timeout | Run quá thời gian; tool tính detected |
| RuntimeError | Lỗi runtime khi chạy mutant |
| CompileError | Mutant không compile được |
| Ignored | Bị bỏ qua |
| Pending | Chưa hoàn tất thực thi |

Claim assertion phát hiện lỗi nghiệp vụ cần failed observation/mapping. Nhãn Killed riêng lẻ chưa giải thích fail vì behavior gap hay setup.

### 5.2. Calculate and Report Metrics

K = Killed, T = Timeout, S = Survived, NC = NoCoverage.

~~~text
Detected = K + T
Valid = K + T + S + NC
Mutation score = 100 × (K + T) / Valid
~~~

RuntimeError, CompileError, Ignored, Pending không vào Valid theo định nghĩa này [R4]. Valid = 0 thì ghi không xác định.

Có thể báo thêm **assertion kills / valid = 100 × K / Valid**, ghi rõ chỉ số bổ sung, không gọi nó là score mặc định Stryker.

Ví dụ Coupons baseline: Valid = 39+21+30+25 = 115; tool score = 60/115 = 52.17%; K/Valid = 39/115 = 33.91%. Hai số trả lời hai câu hỏi khác nhau [P1, P10].

### 5.3. Inspect HTML and JSON Reports

1. Chọn đúng report path và run/version.
2. Đọc status, source range, mutator và replacement.
3. Đối chiếu killing tests/failed assertion.
4. Dùng JSON ghép signatures giữa runs.
5. Đọc console khi Timeout/RuntimeError.

Ví dụ liệt kê Cart mutants bằng PowerShell:

~~~powershell
$guideReport = Get-Content -LiteralPath 'reports/cart-orders/mutation.json' -Raw | ConvertFrom-Json
$guideMutants = @($guideReport.files.PSObject.Properties | ForEach-Object { $_.Value.mutants })
$guideMutants | Group-Object status | Select-Object Name, Count
$guideMutants | Where-Object { $_.location.start.line -eq 286 } | Select-Object id, mutatorName, replacement, status, killedBy
~~~

IDs trong killedBy cần tra test records của chính report. Một test có thể kill nhiều mutants; một mutant cũng có thể được nhiều tests phát hiện.

### 5.4. Compare Outcomes Responsibly

Ưu tiên per-mutant transitions: Survived→Killed, Survived→Survived, Error→Timeout, v.v. Báo counts cạnh percentages và điều kiện thay đổi.

Tăng test count không bảo đảm thêm kill: Coupons extension nhiều cases hơn nhưng Killed giữ nguyên [P10]. Một assertion đúng state có thể kill nhiều mutants; không đồng nhất kills với số lỗi nghiệp vụ độc lập.

Không đặt 70–80% hoặc 100% thành pass threshold mọi project. Đánh giá phụ thuộc scope, operators, tests, equivalence và mục tiêu.

## 6. Troubleshooting

### 6.1. Diagnostic Order

Xác định bước lỗi: **installation → test discovery → original tests → Stryker initial run → active mutants → interpretation**. Giữ command, working directory, revision và actual error trước khi sửa.

### 6.2. Common Incidents and Resolutions

| Symptom | Likely Cause / Diagnostic Steps | Resolution and Verification |
|---|---|---|
| npm ci fail hoặc sqlite3 binding error | Đọc install log; so Node/platform/lockfile, native build output | Khôi phục môi trường tương thích; cài trong clone riêng; npm test phải pass |
| No tests found | Kiểm directory, project/config/testMatch; chạy npm test -- --listTests | Dùng đúng scripts, xác nhận baseline files; không che bằng passWithNoTests |
| Original tests fail | Kiểm reset, assertion và code/spec mismatch | Sửa harness nếu setup sai; lỗi gốc tách defect; chưa kết luận mutation score |
| Initial run mất tests | Kiểm sandbox paths/ignores, tempDirName, selected Jest config | Dùng stryker-tmp của package; xác nhận discovery trong initial run |
| Thêm test file nhưng không được chạy | Frozen testMatch liệt kê files cụ thể | Bài đầu sửa CO-02; thêm file phải có variant config/discovery evidence |
| Results phụ thuộc thứ tự test | DB/time/user/shared state chưa reset | Dùng đúng project harness; kiểm fresh-state/test order; rerun comparisons |
| Timeout nhiều | Handler không trả response, chậm hoặc resource contention | Đọc diff/log; giữ T riêng; đổi settings phải công bố và rerun mốc |
| RuntimeError/native crash | Mutant SQL/runtime hoặc dependency error | Giữ log/exit code; không đổi thành assertion kill |
| Claude Not logged in | Kiểm session/auth/flags; từng có khác biệt với --bare | Login chính thức; probe request thành công; ghi fallback nếu có |
| AI dùng field/helper không tồn tại | Đối chiếu API/helpers thật | Edit/reject; giữ raw; chạy original trước mutation |
| Report không khớp expected | Kiểm version/scope/source, test set, environment và output cũ | Ghép signatures; phân biệt historical/current; không ép khớp bằng đổi expected |

Integration Review ghi các vấn đề temp directory/test selection thực tế [P11]. Chỉ gọi một fix là verified khi có run chứng minh.

### 6.3. Incident Record

| Field | Actual Entry |
|---|---|
| Symptom / command / working directory | |
| Revision / versions / configuration | |
| Root cause supported by evidence | |
| Change applied | |
| Original tests / affected mutation rerun | |
| Log / report | |

## 7. Failure Modes

Đây là **cách kết quả hoặc explanation của tool dẫn đến kết luận sai ngay cả khi tool chạy thành công**, khác lỗi vận hành ở Section 6.

### 7.1. High Coverage, Weak Assertions

**Mechanism:** statement được chạy không bảo đảm output/state được kiểm tra; mutant đổi dữ liệu vẫn có thể giữ HTTP success.

**Concrete Example:** Cart CO-02 chỉ assert 200 nên bỏ sót giỏ mới chứa phần tử do ArrayDeclaration mutant thêm. Toy contrast của nhóm có line/statement coverage 100% nhưng weak suite chỉ kill 3/5 mutants [P8, P11].

**Misleading Conclusion:** “Code đã cover nên tests kiểm tra đủ behavior.”

**Detection:** hỏi output nào đổi sẽ làm assertion fail; đọc actual surviving diff.

**Mitigation:** thêm observations nghiệp vụ/state theo spec, xác minh transition. Không xóa assertions có giá trị để tạo weak baseline giả.

### 7.2. Higher Score Without Additional Assertion Kills

**Mechanism:** tool score chịu ảnh hưởng Timeout và số valid mutants. Runtime/platform khác có thể đổi state distribution.

**Concrete Example:** Auth provisional/frozen đều 60 Killed; RuntimeError giảm 12→8, Timeout tăng 23→27. Score tăng khoảng 73.45%→74.36% mà không thêm assertion kill [P9].

**Misleading Conclusion:** “Tests tốt hơn vì score tăng.”

**Detection:** so raw counts/transitions, kiểm nguyên nhân mẫu số thay đổi.

**Mitigation:** báo K/T/errors riêng; nêu điều kiện khác và không quy một nguyên nhân khi chưa xác minh.

### 7.3. Plausible but Incorrect AI Reasoning

**Mechanism:** candidate có thể chạy được nhưng explanation, oracle hoặc giả định mutator sai. Original pass chưa chứng minh claim về mutant.

**Concrete Example:** tutorial C03 Hoàng ghi AI đề xuất input 17 để bắt mutant “đổi 18 thành 17”; mutant đó không có trong report/config đã dùng. Input 18 có actual kill mapping khác, nên từng claim phải được review riêng [P12].

**Misleading Conclusion:** “AI giải thích tự tin hoặc candidate pass thì claim đi kèm đều đúng.”

**Detection:** đối chiếu exact mutant diff/spec và failed observation; kiểm killedBy thay narration.

**Mitigation:** giữ raw, ghi verdict từng phần, sửa/reject assumptions sai và chạy original/mutation. Công bố nếu manual/AI có cùng agent/context hỗ trợ.

### 7.4. Treating Every Survivor as an Equivalent Mutant

**Mechanism:** thiếu distinguishing input/observation có biểu hiện giống mutant tương đương trong các tests hiện có.

**Concrete Example:** mutant khởi tạo Cart thành mảng có phần tử từng Survived, nhưng assertion body phát hiện được [P8]. Gắn equivalent chỉ vì tests pass sẽ bỏ qua gap thật.

**Misleading Conclusion:** “Survivor chắc equivalent nên bỏ.”

**Detection:** xét reachability, state difference, observable result và input phân biệt; xem phương pháp [R5].

**Mitigation:** giữ equivalent candidate khi chưa chứng minh, ghi assumptions/lập luận trước quyết định exclude/ignore.

### 7.5. Comparing Incompatible Reports

**Mechanism:** source/scope/tests/revision khác tạo populations khác; IDs/percentages không tự tương ứng.

**Concrete Example:** Cart có 150 mutants, Coupons 120, Auth 125 [P1, P9, P10]. Trung bình domain scores hoặc ghép ID 6 giữa reports khác domain không thể hiện tác động một assertion.

**Misleading Conclusion:** “Score cao hơn nghĩa variant tốt hơn trên cùng bài toán.”

**Detection:** so manifest/source, ghép location/mutator/replacement và nhận diện variant version.

**Mitigation:** so cùng frozen inputs/signatures; báo scope mới như điều kiện mới, không nối số liệu âm thầm.

## 8. References

### 8.1. Official Documentation

- **[R1]** Stryker Mutator. [Getting Started][R1]. Setup project mới.
- **[R2]** Stryker Mutator. [StrykerJS Configuration][R2]. Ranges/config/timeout.
- **[R3]** Stryker Mutator. [Jest Runner][R3]. Runner integration.
- **[R4]** Stryker Mutator. [Mutant States and Metrics][R4]. Definitions/formulas.
- **[R5]** Stryker Mutator. [Equivalent Mutants][R5]. Equivalence limitations.
- **[R6]** Jest. [API: test.each][R6]. Data-driven cases.
- **[R7]** Anthropic. [Claude Code Quickstart][R7]. Installation/auth/basic session.

Official docs được đối chiếu ngày 2026-10-23. Nếu tài liệu online thay đổi, versions/schema của package đã khóa xác định hành vi run đang phân tích.

### 8.2. Project Specifications and Evidence

- **[P1]** [Baseline Manifest][P1] — source/environment/config/commands.
- **[P2]** [Frozen Original-Test Metadata][P2] — integration 88 pass.
- **[P3]** [Defect-Run Metadata][P3] — separate defect execution.
- **[P4]** [Original Defects and Assumptions][P4] — oracle limitations.
- **[P5]** [EShop README / SRS](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/README.md) và [API Specification][P5] — pinned expectations.
- **[P6]** [Frozen Cart Mutation Report][P6] — baseline diffs/states.
- **[P7]** [Delivered Cart Manual Suite][P7] — test context/assertions.
- **[P8]** [Cart Manual Per-mutant Mapping][P8] — signatures/new kills.
- **[P9]** [Cross Reproduction Notes][P9] — Cart comparison/Auth baseline.
- **[P10]** [Coupons Extension Package][P10] — retained sources/configs/results.
- **[P11]** [D04 Integration Review][P11] — harness/config/toy contrast.
- **[P12]** [Phúc Hoàng Experiment Log][P12] — C03 AI review/Auth inputs.

### 8.3. Requirements and Documentation Method

- FIT@HCMUS. [Seminar Master Guide](../docs/requirements/01_Seminar_Guide.md), §2.1 S4 và §4: six required sections, reproducibility và AI disclosure.
- FIT@HCMUS. [T10 Topic Description](../docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md), §2/§6/§9: three survivors, manual/AI verification và ≥3 real failure modes.
- [Consolidated Requirements](../docs/requirements/Seminar_Requirements_Consolidated.md): REQ-08–18 và REQ-31.
- Daniele Procida. [Diátaxis: Tutorials](https://diataxis.fr/tutorials/). Tham khảo actions/observable results.
- Microsoft. [Writing Step-by-step Instructions](https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions). Tham khảo steps/context.

### 8.4. AI Assistance and Reproduction Status

OpenAI Codex hỗ trợ cấu trúc, diễn giải tiếng Việt, snippets và source/link checks của guide. Exact model revision không được ghi nhận chắc chắn. Nội dung cần thành viên review trước khi nộp; xem [AI Record Thái Hòa](../ai-audit/AI_Record_Thai_Hoa.md).

Numbers trong guide thuộc runs đã lưu và có executor/provenance ở nguồn. Việc biên soạn không tự xác nhận người đọc/thành viên đã cài đặt, chạy adaptation hoặc chấp nhận AI output.

| Final Review Item | Reviewer | Evidence / Result |
|---|---|---|
| Peer reproduces First Test without assistance | | |
| Member confirms commands on their environment | | |
| Human review of AI-assisted guide | | |

<!-- Điền sau khi có thực hành/review thật. Giữ kết quả khác kỳ vọng nếu có, rồi sửa guide bằng evidence. -->

[R1]: https://stryker-mutator.io/docs/stryker-js/getting-started/
[R2]: https://stryker-mutator.io/docs/stryker-js/configuration/
[R3]: https://stryker-mutator.io/docs/stryker-js/jest-runner/
[R4]: https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/
[R5]: https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/
[R6]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[R7]: https://code.claude.com/docs/en/quickstart
[P1]: ../experiments/s3/Baseline_Manifest.md
[P2]: ../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-commit-final-tests.meta.json
[P3]: ../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/d04-defects-final.meta.json
[P4]: ../experiments/s3/Original_Defects_and_Assumptions.md
[P5]: https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/api_specification.md
[P6]: ../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-cart-orders-baseline/mutation.html
[P7]: ../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-reproduced-manual/cart-orders.manual.js
[P8]: ../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-manual-frozen-comparison.json
[P9]: ../experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md
[P10]: ../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md
[P11]: ../experiments/s3/D04_Integration_Review_2026-10-23.md
[P12]: ../experiments/s3/Experiment_Log_Phuc_Hoang.md
