# Demo Script: Coupon Usage Limits with StrykerJS and an AI Agent

## 1. Demo Overview

Video theo một case Coupons từ đầu đến cuối: Admin tạo coupon có `max_uses_per_user = 3`, hệ thống phải lưu đúng 3, cho phép áp dụng sau 2 lần sử dụng và từ chối khi đã sử dụng đủ 3 lần. Loại test là API integration test: Jest chạy tests, Supertest gửi requests qua Express và SQLite lưu dữ liệu trong bộ nhớ.

Hướng dẫn thao tác bằng tiếng Việt. Các đoạn **Read aloud** là lời thoại tiếng Anh để đọc khi quay. Mục tiêu video 5 đến 8 phút; bảng dưới là thời lượng dựng dự kiến, chưa phải thời gian quay thực tế.

| Scene | Video position | Content |
|---|---|---|
| Introduction and first test | 00:00 to 01:40 | Giới thiệu, setup và chạy baseline tests |
| Find the surviving mutant | 01:40 to 03:00 | Chạy Stryker, mở report và giải thích thiếu sót |
| Add and verify assertions | 03:00 to 04:30 | Xem assertions giới hạn 3 và chạy kiểm chứng |
| Review the AI candidate | 04:30 to 06:10 | Prompt, candidate đã lưu, review và chạy lại |
| Compare results and close | 06:10 to 07:10 | Đối chiếu reports và kết luận |

Kịch bản quay chính dùng candidate Codex đã lưu để có thể chuẩn bị và chạy thử trước. Cảnh AI nói rõ đang xem lại candidate này. Section 7.4 có cách quay một request mới nếu cần trình diễn tương tác trực tiếp với AI.

## 2. Setup Before Recording

### 2.1. Prepare the Tools

Chuẩn bị Git, PowerShell, editor đọc được JavaScript, trình duyệt mở HTML report và phần mềm quay màn hình có thu microphone. Máy thực nghiệm đã dùng Node `24.16.0`, npm `12.0.2`; dùng cùng versions để giảm khác biệt môi trường. Jest, Supertest và Stryker đã được khai báo trong project, cài bằng lockfile.

Với cảnh quay AI mới ở Section 7.4, dùng Codex desktop đã đăng nhập. Nếu quay lại candidate đã lưu, chỉ cần mở prompt, code và provenance trong editor.

### 2.2. Create a Separate Demo Checkout

Mở PowerShell. Đoạn sau tạo thư mục `T10-Demo` trong user folder rồi clone vào thư mục mới `eshop-demo`. Chạy một lần; nếu `eshop-demo` đã tồn tại, tiếp tục dùng bản đó hoặc chọn tên thư mục mới.

```powershell
$demoParent = Join-Path $env:USERPROFILE 'T10-Demo'
New-Item -ItemType Directory -Force -Path $demoParent | Out-Null
Set-Location -LiteralPath $demoParent
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-demo
Set-Location -LiteralPath (Join-Path $demoParent 'eshop-demo')
git rev-parse --show-toplevel
git status --short
git switch --detach 52ed6ac7c341b4e907ab341aaff03aeededb2f5d
git rev-parse HEAD
Set-Location backend
node --version
npm --version
npm ci
```

Revision `52ed6ac` chứa baseline và cả hai bộ assertions bổ sung. Production source, database, package/lock và baseline Coupons mutation config khớp frozen baseline `806ba19`; các configs chọn riêng tests cần chạy. Giữ nguyên files giữa các cảnh, chuyển bộ tests bằng lệnh tương ứng.

Từ đây, tất cả lệnh test và mutation chạy trong `eshop-demo/backend`. Terminal prompt phải kết thúc bằng `backend>`.

Tests dùng SQLite trong bộ nhớ, reset fixtures và cố định đồng hồ. Supertest gọi Express app trực tiếp; không cần bật server riêng hoặc mở frontend. Cơ chế này nằm trong `test/helpers/isolate.js` và `test/helpers/coupons.js`.

### 2.3. Rehearse the Commands

Chạy ba lệnh sau trước buổi quay để phát hiện lỗi môi trường:

```powershell
npm run test:coupons
npx jest --config jest.coupons.manual.config.cjs --runInBand
npx jest --config jest.coupons.ai.config.cjs --runInBand
```

Với revision đã chọn, số test cases dự kiến lần lượt là 26, 35 và 40. Hai bộ sau gồm baseline và các cases bổ sung; video tập trung vào nhóm usage-limit. Tests phải pass trên production code gốc trước khi quay phần diễn giải mutants.

Tiếp tục chạy từng mutation profile, chờ lệnh trước kết thúc rồi mới chạy lệnh sau:

```powershell
npm run mutate:coupons
npx stryker run stryker.coupons.manual.config.json
npx stryker run stryker.coupons.ai.config.json
```

Các lệnh này có thể lâu hơn thời lượng video. Khi quay, ghi lại lúc bắt đầu và kết quả, cắt hoặc tăng tốc phần chờ rồi chèn nhãn `Mutation run sped up`. Giữ terminal output và HTML/JSON reports sau mỗi lần chạy. Ba profiles ghi vào ba thư mục riêng.

## 3. Prepare the Recording Screen

### 3.1. Open These Files and Reports

Trong editor, chọn Open Folder và mở `eshop-demo/backend`. Mở sẵn các tabs sau; paths trong bảng tính từ thư mục `backend`:

| Tab | Find this text | Use in the video |
|---|---|---|
| `package.json` | `test:coupons`, `mutate:coupons` | Chỉ lệnh npm thực sự chạy gì |
| `test/coupons.test.js` | `CP-15` | Baseline tạo coupon với giới hạn 1 |
| `test/coupons-flow.test.js` | `CP-FLOW` | Biết file thứ hai được baseline script nạp; không cần trình bày riêng |
| `test/helpers/coupons.js` | `validAdminCoupon` | Giá trị mặc định 1 trong fixture |
| `server.js` | `max_uses_per_user || 1` | Source bị mutate, line 474 tại revision này |
| `stryker.coupons.config.json` | `mutate`, `testMatch` | Phạm vi source và baseline tests |
| `test/manual/coupons.manual.js` | `MF-01`, `MF-02`, `MF-03` | Các assertions giới hạn 3 |
| `test/ai/coupons.ai.js` | `test.each([2,4])` | Candidate dùng hai giá trị giới hạn |
| `stryker.coupons.manual.config.json` | `testMatch` | Baseline cộng file manual |
| `stryker.coupons.ai.config.json` | `testMatch` | Baseline cộng file AI |

Mở ba tabs trình duyệt sau khi rehearsal tạo reports. Có thể dùng các lệnh PowerShell tại `backend` để mở bằng trình duyệt mặc định:

```powershell
Start-Process '.\reports\coupons\mutation.html'
Start-Process '.\reports\coupons-manual\mutation.html'
Start-Process '.\reports\coupons-ai\mutation.html'
```

Mở thêm [candidate Codex ban đầu](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/candidate.raw.js) và [provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md) từ repo seminar. Candidate raw có nhóm limit 2/4; file AI hiện tại còn có các cases mở rộng khác.

### 3.2. Start Recording

1. Đặt màn hình ở 1920 x 1080 nếu thiết bị hỗ trợ. Tăng font editor và terminal đến mức đọc được trong bản preview.
2. Đặt editor bên trái, terminal bên phải. Để trình duyệt ở cửa sổ riêng để chuyển sang report khi cần.
3. Tắt thông báo, đóng tabs không dùng và kiểm tra vùng quay không chứa thông tin riêng.
4. Thu thử một câu, nghe lại và kiểm tra mic không bị rè. Quay màn hình kèm microphone, tắt nhạc nền.
5. Bật ghi hình, chờ khoảng hai giây rồi bắt đầu đọc Scene 1. Dừng ngắn giữa các cảnh để dễ cắt ghép.

Để có đoạn installation trong video, quay riêng clip PowerShell chạy các bước clone, chọn revision và `npm ci` ở Section 2.2 trong lần setup đầu tiên. Khi dựng, chèn clip này vào Scene 1; tăng tốc phần tải packages và ghi `Installation sped up`.

## 4. Scene 1: Introduction and First Test

### 4.1. Introduce the Example

**Screen:** mở `test/manual/coupons.manual.js`, đặt con trỏ tại `max_uses_per_user:3`. Chưa cần giải thích code test.

**Read aloud:**

> Passing tests can still miss a business rule. In this demo, we use mutation testing to find a gap in the EShop coupon tests. An administrator creates a coupon with a per-user limit of three. The application must store that limit, allow another quote after two uses, and refuse a quote after three uses.
>
> We use Jest and Supertest for API integration tests, StrykerJS to generate mutants, and an AI Agent to suggest additional assertions.

### 4.2. Show the Installation

**Screen:** chèn clip setup đã quay ở Section 2.2. Giữ rõ đoạn revision, versions và kết quả `npm ci`. Sau đó mở `package.json`, chỉ vào `test:coupons` và `mutate:coupons`.

**Read aloud:**

> We clone a separate demo checkout, select a fixed revision, and install the project dependencies with npm ci. The package scripts select the coupon tests and the coupon mutation configuration. The test harness uses an in-memory database, so we can repeat the example with fresh data.

### 4.3. Run the Baseline Tests

**Action:** chuyển terminal tại `backend`, chạy:

```powershell
npm run test:coupons
```

**Screen:** chờ summary hiện ra, chỉ vào số tests pass. Mở `test/coupons.test.js`, tìm `CP-15`, chỉ `h.validAdminCoupon()`. Mở `test/helpers/coupons.js`, tìm `validAdminCoupon` để thấy `max_uses_per_user: 1`.

**Read aloud:**

> The baseline coupon tests pass. This creation test uses a coupon limit of one. It checks that the returned coupon matches that input, but this case does not show whether a different limit is preserved. Mutation testing helps us find that missing distinction.

## 5. Scene 2: Find the Surviving Mutant

### 5.1. Run Stryker

**Screen:** mở `stryker.coupons.config.json`. Chỉ `testRunner: jest`, `mutate: server.js:355-492` và hai files trong `testMatch`.

**Read aloud:**

> Stryker changes small parts of the coupon source and runs the selected tests. A mutant is Killed when a test fails because of that change. It Survives when the tests still pass. The production file in our checkout stays unchanged while Stryker runs the mutations in its sandbox.

**Action:** chạy và ghi lại summary:

```powershell
npm run mutate:coupons
```

Mở report vừa sinh bằng `Start-Process '.\reports\coupons\mutation.html'`. Nếu tab cũ đang mở, refresh trước khi đọc kết quả.

### 5.2. Inspect the Missed Behavior

**Action:** trong report, chọn `server.js`, tìm line 474 và survivor có replacement `max_uses_per_user && 1`. Evidence đã lưu gắn nó với ID `113`; dùng location, replacement và status để nhận diện nếu report đổi cách đánh số. Phóng lớn source và trạng thái `Survived`.

**Read aloud:**

> The original expression uses the requested limit, or defaults to one. This mutant changes OR to AND. For a positive limit such as three, the mutated expression produces one. The baseline creation test supplies one, so the original and mutated versions produce the same stored value for that input. The mutant survives.

**Screen:** đối chiếu hai dòng trong editor hoặc vùng source của report:

```javascript
// Original
max_uses_per_user || 1
// Mutant 113
max_uses_per_user && 1
```

Đây là đoạn minh họa để chỉ trên màn hình; giữ `server.js` nguyên bản.

## 6. Scene 3: Add and Verify Assertions

### 6.1. Show the Added Checks

**Action:** mở `test/manual/coupons.manual.js`. Cảnh này trình bày bộ assertions đã chuẩn bị, sau đó bật bộ đó bằng config. Dừng ở `MF-01`, chỉ lần lượt input và assertion:

```javascript
max_uses_per_user: 3
expect(listed.body[0].max_uses_per_user).toBe(3);
```

Chỉ tiếp `MF-02` và `MF-03`.

**Read aloud:**

> Here is the prepared assertion set. Its file is named manual, but Codex helped draft it, so we describe it as AI-assisted spec analysis. The first test creates a limit of three and reads the coupon back through the API. It asserts that the stored limit is exactly three.
>
> The next two tests check the boundary. Two recorded uses must still allow a quote, with a discount of twenty-five thousand and a final amount of seventy-five thousand. Three uses must cause refusal. Applying a coupon is a quote; the separate usage endpoint records a use.

### 6.2. Run the Added Checks

**Action:** chạy Jest trước, rồi chạy Stryker:

```powershell
npx jest --config jest.coupons.manual.config.cjs --runInBand
npx stryker run stryker.coupons.manual.config.json
```

**Screen:** chỉ kết quả Jest, mở `reports/coupons-manual/mutation.html`, chọn cùng location và replacement ở line 474. Chỉ status và test được ghi ở `killedBy` nếu report cung cấp.

**Read aloud, khi report xác nhận:**

> The added tests pass on the original code. In the mutation report, the target mutant is now Killed. The assertion about the stored limit distinguishes three from one. This connects the mutant result to a specific business expectation.

Evidence đã lưu quy kill cho `MF-01`, không quy cho cả ba tests. Nếu lần quay không có transition này, dùng cách xử lý ở Section 9 trước khi đọc kết luận.

## 7. Scene 4: Review the AI Candidate

### 7.1. Show the Request and Its Context

**Screen:** mở prompt ngắn dưới đây trong editor. Đây là prompt tái sử dụng cho demo, không phải transcript của run cũ. Nguồn của candidate và context lịch sử nằm trong [provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md).

```text
Suggest Jest and Supertest API integration tests for the EShop coupon
usage-limit rule. Use backend/test/helpers/coupons.js and the baseline
coupon tests as references.

FR-17: an administrator can create and list coupons. The configured
max_uses_per_user must be preserved.
FR-09 C5: a quote is allowed while uses < max_uses_per_user, and must
be refused when uses reach that limit. Recording usage is a separate API call.

The original server.js line 474 uses max_uses_per_user || 1.
A surviving mutant replaces it with max_uses_per_user && 1.
Another survivor at the same location replaces the expression with true.

Return a complete candidate test file and explain the assertions.
Use the existing fixture helpers, frozen clock and database cleanup.
Only propose tests. Do not edit production code, configs or baseline tests.
Tests must pass on original code. Derive expected values from the rules;
avoid exact error messages or claiming a specific HTTP error is in the SRS.
```

**Read aloud:**

> The AI needs the business rule, baseline tests, fixture helpers, and the surviving mutation. This reusable prompt asks for test candidates without changing production code. For this recording, we replay a saved Codex candidate and verify it again. The original candidate shared the earlier analysis context, so this is not an independent human-versus-AI comparison.

### 7.2. Review the Saved Candidate

**Action:** mở `candidate.raw.js` từ Section 3, rồi mở `test/ai/coupons.ai.js`. Dừng ở nhóm đầu `test.each([2,4])`; không cần đọc các nhóm mở rộng `AG-01` trở đi.

Chỉ lần lượt các checkpoints: giá trị `max_uses_per_user` đọc lại từ API, quote tại `limit - 1`, quote tại `limit`, và số rows usage cuối test.

**Read aloud:**

> The saved candidate uses limits of two and four. This is data-driven testing: the same test runs with two inputs. We review four checkpoints: the configured value is stored, a quote is allowed below the limit, a quote is refused at the limit, and usage records match the calls made by the test.
>
> We also check fixture cleanup and expected amounts before accepting the candidate for execution. The current file contains additional scenarios, but we focus on this usage-limit group.

### 7.3. Verify the Candidate

**Action:** chạy:

```powershell
npx jest --config jest.coupons.ai.config.cjs --runInBand
npx stryker run stryker.coupons.ai.config.json
```

**Screen:** mở `reports/coupons-ai/mutation.html`, refresh, tìm cùng mutant. Chỉ test dùng limit 2 ở thông tin `killedBy` nếu report hiển thị.

**Read aloud, khi report xác nhận:**

> The AI profile passes on the original code, and the target mutant is Killed. The report links this kill to the persisted-limit check. Generating a plausible test is only the first step. Reviewing and executing it establish what the candidate actually detects.

### 7.4. Record a Fresh AI Request if Needed

Nếu cần quay thao tác gửi prompt thật, thay phần replay ở Sections 7.1 và 7.2 bằng các bước sau. Chuẩn bị ngoài giờ ghi hình chính để có thời gian review output.

1. Trong Codex desktop, mở chat mới tại demo checkout. Gửi prompt ở Section 7.1; lưu tên agent/model hiển thị cùng prompt và response thực tế.
2. Giới thiệu rõ chat mới được mở trên checkout đã có các bộ assertions; không mô tả run này là blind hoặc independent. Prompt chỉ yêu cầu đề xuất, chưa yêu cầu sửa files.
3. Review code trả về với các checkpoints ở Section 7.2. Copy `test/ai/coupons.ai.js` thành `test/ai/coupons.ai.saved.txt` trước khi thay candidate; sau đó đặt code đã review vào `test/ai/coupons.ai.js`.
4. Chạy lại đúng hai lệnh ở Section 7.3. Giữ report của lượt mới riêng trước khi chạy tiếp. Số tests và số kills có thể khác candidate đã lưu.
5. Dùng lời dẫn dưới đây và trình bày kết quả thật; bảng lịch sử ở Section 8 chỉ dùng tham chiếu.

**Read aloud for a fresh request:**

> I am sending the rule and mutant details to Codex now. This checkout already contains the prepared assertions. I will review the new response, run the tests on the original code, and check the mutation report before drawing a conclusion.

Nếu AI trả code chưa pass hoặc không kill được target, thể hiện điều đó và sửa sau review. Nếu đăng nhập lỗi, quay cảnh replay đã chuẩn bị và dùng đúng lời dẫn ở Section 7.1.

## 8. Scene 5: Compare Results and Close

### 8.1. Put the Three Reports Side by Side

**Screen:** chuyển lần lượt baseline, manual và AI reports. Chỉ line 474 và cùng replacement, sau đó chỉ summary. Dữ liệu sau là kết quả đã lưu, dùng để rehearsal và đối chiếu; đọc số trên report của lần quay nếu chạy mới.

| Profile | Tests on original code | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score |
|---|---:|---:|---:|---:|---:|---:|---:|
| Frozen baseline | 26 | 39 | 21 | 30 | 25 | 5 | 52.17% |
| Extended manual | 35 | 41 | 21 | 28 | 25 | 5 | 53.91% |
| Extended AI | 40 | 41 | 21 | 28 | 25 | 5 | 53.91% |

Cả ba reports lịch sử có cùng source và 120 mutant signatures. Hai mutants `111/113` chuyển `Survived` sang `Killed`; các nhóm mở rộng khác chưa tạo thêm kills trong universe này. Baseline không nạp file manual/AI dù chúng đã có trong checkout.

**Read aloud, khi kết quả quay khớp:**

> Both prepared profiles detect two additional mutants at the coupon-limit assignment. They reach the same mutation result with different test collections. This shows how checking a configured value can expose a gap left by a default-value example. It does not establish that one author or tool is better.

### 8.2. Close the Video

**Screen:** giữ report có target `Killed`, chuyển về assertion `toBe(3)` để kết thúc.

**Read aloud:**

> Mutation testing gives us concrete feedback about the behavior our tests distinguish. The workflow is semi-automated: Stryker generates mutants and reports results, while people choose the rules, review assertions, and interpret the evidence.
>
> A higher mutation score does not prove the whole application is correct. Stryker's score here includes timeouts, which we report separately from assertion kills. A surviving mutant may need better tests or further analysis. AI suggestions need the same review and execution checks. Thank you for watching.

## 9. Recording Problems and Export

### 9.1. Fix Problems Before Using a Result

| Problem | What to do |
|---|---|
| `package.json` không tìm thấy | Chuyển terminal vào `eshop-demo/backend`, chạy lại lệnh |
| `npm ci` lỗi version hoặc native SQLite | So Node/npm với Section 2.1, giữ lockfile và đọc lỗi cài đặt. Hoàn tất setup rồi chạy lại ba Jest profiles |
| `npx` không gọi được local binary trên Windows | Dùng các lệnh `node` bên dưới; giữ runner đã pin trong lockfile |
| Jest fail trên code gốc | Kiểm tra revision, config và output lỗi; chưa đọc lời thoại khẳng định mutation cải thiện |
| Report chưa có hoặc đang mở bản cũ | Chờ Stryker hoàn tất, mở đúng thư mục profile rồi refresh tab |
| Target chưa `Killed` | Đối chiếu source/replacement, kiểm tra config nạp đúng file bổ sung và tìm assertion thật sự fail trên mutant |
| Summary khác bảng lịch sử | Giữ log/report lượt mới, trình bày số thật và kiểm tra khác biệt môi trường trước khi so sánh |
| AI chưa đăng nhập | Dùng replay candidate đã lưu với lời dẫn công bố rõ nguồn |

Các lệnh thay thế cho `npx`, chạy tại `backend`:

```powershell
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
```

### 9.2. Export and Watch the Finished Video

1. Ghép các cảnh theo thứ tự, giữ đủ installation, basic mutation flow và advanced assertions/AI workflow.
2. Cắt hoặc tăng tốc phần chờ, ghi nhãn rõ. Với report/candidate lấy từ rehearsal, đọc câu `This is the saved result from our rehearsal` trước khi diễn giải.
3. Kiểm tra tổng video từ 5 đến 8 phút, narration tiếng Anh, không nhạc nền và code/report đọc được. Xuất MP4, ưu tiên 1080p, dung lượng tối đa 100 MB theo requirements.
4. Xem lại toàn video để kiểm tra âm thanh, số liệu, source của candidate và labels của đoạn tăng tốc.
5. Upload video, thử mở link ở cửa sổ chưa đăng nhập, rồi điền link/file version thật vào [Demo Video Link](../draft/Demo_Video_Link.md) và slides khi ghép bộ nộp.

## References

- [Seminar Requirements](requirements/Seminar_Requirements_Consolidated.md): REQ-07 to REQ-10, REQ-19 and REQ-21.
- [Baseline Manifest](../experiments/s3/Baseline_Manifest.md): frozen source, runtime và test selection.
- [Coupons Test Contract](../experiments/s3/Coupons_Test_Contract_Thai_Hoa.md): business rules và expected behavior.
- [Coupons Extensions Evidence](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md): số tests, mutant transitions và reports đã lưu.
- [Codex Candidate Provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md): nguồn AI, shared context và giới hạn của comparison.
- [Pinned SUT Revision](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/tree/52ed6ac7c341b4e907ab341aaff03aeededb2f5d/backend): scripts, tests và configs dùng trong kịch bản.
