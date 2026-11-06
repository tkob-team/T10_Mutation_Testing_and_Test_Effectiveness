# Theory & Tool Research Notes

**Bắt đầu:** đọc phần [1](#1--the-five-ideas) và [3](#3--worked-example) trước. Chúng giải thích vì sao test chạy qua code vẫn có thể bỏ sót lỗi.

**Stage:** S3  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S3-A02, S3-B02  
**Domain / Section:** Coupons; Coverage, Mutation Score & Assertions; StrykerJS + Claude Configuration & Reports.  
**Evidence Status:** Research draft ready for member review. Nguồn đã đối chiếu ngày 2026-10-18. Code và số liệu minh họa nằm trong notes; EShop/Stryker/Claude experiment **Not run** trong hai task này.  
**Document Role:** Notes làm đầu vào S4; chưa phải report, user guide hoặc kết quả thực nghiệm của thành viên.

## Reading Route

1. **Hiểu ý chính — khoảng 7 phút:** phần 1–3. Đọc câu chuyện, xem test yếu và test có expected result.
2. **Đọc kết quả — khoảng 8 phút:** phần 4–6. Tập phân biệt trạng thái, tính score và chọn assertions cho Coupons.
3. **Hiểu hai tool — khoảng 12 phút:** phần 7–11. Đọc config, report, Claude prompt và mapping vào EShop.

Đây là thời gian đọc ước lượng; không phải thời gian đã đo khi học hoặc chạy tool. Các phần Sources/Handoff dùng để tra khi viết S4.

## Questions & Inputs

| Question | Task / Requirement | Finding | Verification |
|---|---|---|---|
| Coverage nói được gì và bỏ sót gì? | A02; REQ-03 | Phần 1–3 | Theory + ví dụ tự kiểm tra |
| Assertion có vai trò gì? | A02; REQ-13 | Phần 3, 6 | Node assertion API + ví dụ |
| Mutant states và score được hiểu thế nào? | A02; REQ-12–15 | Phần 4–5 | Stryker metrics docs |
| Cấu hình nào ảnh hưởng phép so sánh? | B02; REQ-08–09 | Phần 7 | Stryker config/plugins/incremental docs |
| Đọc HTML/JSON/log theo thứ tự nào? | B02; REQ-12–16 | Phần 8 | Reporter docs + report schema |
| Claude nhận gì và kiểm chứng thế nào? | B02; REQ-14,31 | Phần 9 | Anthropic docs + experiment contract |
| Data-driven/Checkpoints liên hệ với Coupons ra sao? | B02; REQ-10 | Phần 10–11 | Phân tích áp dụng, chưa chạy EShop |

## Findings & Examples

### 1 — The Five Ideas

Tưởng tượng em làm bài toán **2 + 3**. Cô giáo có thể kiểm tra hai việc:

- Em **đã làm bài** chưa?
- Đáp án em viết có **đúng là 5** không?

Với phần mềm, hai câu hỏi này cũng khác nhau. Code được chạy chưa có nghĩa kết quả đã được kiểm tra đủ kỹ.

| Term | Hiểu đơn giản | Trong bài Coupons |
|---|---|---|
| SUT | Chương trình đang được kiểm tra | EShop backend |
| Test case | Một tình huống và kết quả cần đạt | Đơn đúng mức tối thiểu có dùng mã được không? |
| Assertion | Câu kiểm tra kết quả có đúng điều mong đợi | `assert.equal(actual, expected)` |
| Coverage | Ghi nhận phần code đã được tests chạy qua | Tests có đi đến đoạn xét giá trị đơn không? |
| Mutation testing | Chủ động tạo thay đổi nhỏ rồi xem tests có phát hiện | Đổi `>=` thành `>` và chạy lại tests |

Mutation testing là một cách đánh giá độ nhạy của tests với lỗi được mô phỏng. Nó không chứng minh chương trình hết mọi lỗi. Cơ sở phương pháp: Jia & Harman, §1–2.2 [S01]; định nghĩa kết quả tool: [S02](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/).

### 2 — Coverage Asks Where, Assertions Ask What

#### 2.1 — Coverage Types

| Coverage | Câu hỏi | Điều còn phải kiểm tra |
|---|---|---|
| Statement | Các câu lệnh nào đã chạy? | Có kiểm tra đúng kết quả của chúng không? |
| Line | Các dòng nào đã được thực thi theo cách tool đo? | Một dòng có thể chứa nhiều thao tác |
| Function | Hàm nào đã được gọi? | Gọi một lần chưa thử hết tình huống |
| Branch | Những nhánh nào đã đi qua? | Đi qua cả hai nhánh chưa chắc thử đúng giá trị biên |

Line và statement coverage không luôn bằng nhau; cách đếm phụ thuộc công cụ. Coverage là tỷ lệ trên **phạm vi được đo**, không tự đại diện toàn bộ hệ thống. Node có thể báo coverage theo lines, branches, functions; xem [S03](https://nodejs.org/docs/latest-v24.x/api/test.html#collecting-code-coverage).

#### 2.2 — Why Both Branches Can Still Miss a Boundary

Giả sử luật học tập là: **đơn từ 500.000 đồng trở lên được dùng mã**.

```js
function eligible(total, minimum) {
  return total >= minimum;
}
```

Nếu chỉ thử 400.000 và 600.000, cả điều kiện đúng/sai đã xuất hiện. Nhưng khi đổi `>=` thành `>`, hai dữ liệu ấy vẫn trả cùng kết quả. Cần thử **500.000** mới nhìn thấy khác biệt.

Luật này được đặt ra cho ví dụ; dấu so sánh áp dụng thật cho EShop phải dựa trên spec/expected behavior đã thống nhất.

#### 2.3 — Three Things a Useful Test Must Do

1. **Đi tới chỗ có thay đổi:** gọi đúng code cần kiểm tra.
2. **Làm thay đổi lộ ra:** chọn dữ liệu khiến bản gốc và mutant khác hành vi.
3. **Nhìn vào kết quả đó:** assertion kiểm tra đúng giá trị hoặc tác động bị thay đổi.

Ví dụ ở trên: gọi `eligible` là bước 1; dùng đúng 500.000 là bước 2; đòi kết quả `true` là bước 3. Bỏ một bước thì test có thể chạy mà không phát hiện được thay đổi. Đây là cách giải thích ví dụ của nhóm, dựa trên nguyên lý phân biệt chương trình gốc và mutant trong [S01].

### 3 — Worked Example

#### 3.1 — Start with a Weak Assertion

```js
const assert = require('node:assert/strict');

function eligible(total, minimum) {
  return total >= minimum;
}

assert.notEqual(eligible(500001, 500000), undefined);
```

Assertion này hỏi: **“Có trả ra một thứ gì không?”** Nó không hỏi **“Đơn này có thực sự đủ điều kiện không?”**

Hàm gốc trả `true`; bản lỗi trả `false` cũng không phải `undefined`. Cả hai đều có thể qua test yếu. Câu `return` đã chạy nhưng luật nghiệp vụ chưa được bảo vệ tốt. Đây là phân tích đường chạy của đoạn code nhỏ, không phải một coverage report đã đo trên EShop.

#### 3.2 — State the Expected Results

```js
assert.equal(eligible(499999, 500000), false);
assert.equal(eligible(500000, 500000), true);
assert.equal(eligible(500001, 500000), true);
```

Ba câu hỏi lần lượt là: **thiếu 1 đồng**, **vừa đủ**, **dư 1 đồng**. Mỗi expected result được viết từ luật ví dụ, trước khi xem kết quả chương trình. `node:assert/strict` ném assertion error khi giá trị không khớp; API tham chiếu ở [S04](https://nodejs.org/api/assert.html).

#### 3.3 — Try Three Deliberate Changes

| Teaching mutant | Thay đổi | Test yếu | Bộ assertions ở 3.2 |
|---|---|---|---|
| DEMO-M1 | `total >= minimum` → `total > minimum` | Không phát hiện | Phát hiện ở đúng 500.000 |
| DEMO-M2 | `total >= minimum` → `total < minimum` | Không phát hiện | Phát hiện kết quả đảo ngược |
| DEMO-M3 | Luôn trả `true` | Không phát hiện | Phát hiện ở 499.999 |

Bảng trên được giải thích trực tiếp từ hàm và assertions ở 3.1–3.2: test yếu chỉ hỏi kết quả có khác `undefined`, nên bỏ sót cả ba thay đổi; assertions kiểm tra đúng `true`/`false` sẽ phát hiện sai khác. Cả hai bộ đều thỏa trên hàm gốc.

Đây là ví dụ học tập với ba thay đổi viết tay, chưa phải run evidence cho Stryker hoặc EShop.

### 4 — Read Mutant States

Theo [S02](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), đọc hai nhóm sau.

#### 4.1 — Results That Affect the Main Score

| State | Nghĩa ngắn | Cách đọc trong nhóm |
|---|---|---|
| `Killed` | Có test fail khi mutant hoạt động | Xem test và nguyên nhân fail |
| `Survived` | Các tests đã chạy vẫn pass | Tìm dữ liệu/assertion còn thiếu |
| `NoCoverage` | Tests không bao phủ mutant | Tìm cách chạy tới code đó |
| `Timeout` | Vượt thời hạn chạy | Tách khỏi assertion kills |

Report có thể hiển thị “No coverage”; JSON dùng token `NoCoverage` [S07].

#### 4.2 — Other States

| State | Nghĩa ngắn | Xử lý |
|---|---|---|
| `CompileError` | Mutant gây lỗi compile | Báo riêng |
| `RuntimeError` | Lỗi thực thi/runner, khác test fail | Điều tra log |
| `Ignored` | Được loại khỏi chạy | Giữ lý do loại |
| `Pending` | Chưa chạy xong | Chưa coi run hoàn tất |

**Killed cần giải thích thêm:** tool ghi nhận test fail; nhóm còn phải kiểm tra failure có đúng hành vi cần phát hiện hay chỉ do DB, import, token, timeout hoặc môi trường. Nhãn tool và kết luận “assertion này bắt đúng lỗi nghiệp vụ” là hai mức bằng chứng khác nhau.

Survived cũng chưa tự chứng minh test yếu: mutant có thể giữ nguyên hành vi trong phạm vi xét. Khi chưa đủ lập luận, dùng `equivalent candidate`. Phần nghiên cứu sâu về equivalent mutants thuộc S3-A03 của Hoàng [S01].

### 5 — Calculate Mutation Score Carefully

#### 5.1 — Two Definitions to Keep Separate

Jia & Harman §2.2 mô tả mutation score theo killed mutants và tập non-equivalent mutants [S01]. Khi báo cáo **Stryker**, dùng định nghĩa tool [S02]:

```text
Detected   = Killed + Timeout
Undetected = Survived + NoCoverage
Valid      = Detected + Undetected

Mutation score = Detected / Valid × 100
```

Không tự bỏ equivalent candidates khỏi mẫu số của report. Nếu nhóm làm thêm một phép tính sau khi review equivalents, phải đặt tên riêng, nêu các mutant bị loại và lý do.

#### 5.2 — A Small Report to Calculate by Hand

**Số liệu giả lập cho bài học; không phải run của nhóm:**

| State | Count |
|---|---:|
| Killed | 6 |
| Timeout | 2 |
| Survived | 1 |
| NoCoverage | 1 |

Thêm 1 CompileError, 1 RuntimeError, 1 Ignored, 0 Pending: tổng 13 mutants được liệt kê; valid là 10.

```text
Detected = 6 + 2 = 8
Valid    = 6 + 2 + 1 + 1 = 10
Score    = 8 / 10 × 100 = 80%
```

**Cách nói đúng:** “Tool score là 80%; trong đó 6 Killed và 2 Timeout.”

Không nói “8 assertions bắt được lỗi”: một test có thể kill nhiều mutants, một mutant có thể bị nhiều tests kill, và Timeout không chứng minh một assertion fail.

Nếu chỉ tính trên covered mutants: mẫu số là `Detected + Survived = 9`, nên score theo covered code là `8/9 ≈ 88,89%`. Đây là **metric khác**, không thay cho score chung. Nếu mẫu số bằng 0, ghi `n.a.` và nêu lý do.

#### 5.3 — Compare Changes, Not Only Percentages

Giả sử baseline và bộ cải thiện đều Killed 6 mutants, nhưng Timeout tăng từ 0 lên 2. Score có thể tăng mà chưa có thêm assertion kill nào được chứng minh.

Khi so sánh manual/AI, kiểm tra **cùng mutant cụ thể đã đổi trạng thái ra sao**, cùng production code/config/versions, dữ liệu reset và điều kiện chạy. So sánh ID kèm file/location/mutator/replacement; ID đứng một mình không đủ định danh xuyên mọi cấu hình.

### 6 — Design Assertions for Coupons

#### 6.1 — Write the Expected Result First

Một test hữu ích có ba phần:

1. **Arrange:** chuẩn bị coupon, đơn hàng, người dùng và thời gian.
2. **Act:** gọi hàm hoặc API cần kiểm tra.
3. **Assert:** so kết quả với luật nghiệp vụ đã xác định.

Ví dụ **giả định** mã giảm đúng 15% của đơn 500.000, không có cap và không có quy tắc làm tròn khác: discount là 75.000, final là 425.000. Đây là phép tính minh họa; cần chốt quy ước dữ liệu/rounding của EShop trước khi biến thành test thật.

```js
// Minh họa assertions trên một response đã nhận; không phải test API hoàn chỉnh.
assert.equal(body.discount_amount, 75000);
assert.equal(body.final_amount, 425000);
```

Chỉ kiểm `status === 200` chưa đủ bảo vệ hai giá trị tiền này. Ngược lại, chỉ kiểm tổng hai trường bằng tổng đơn cũng chưa đủ: chương trình có thể chia sai tiền giảm/tiền còn lại mà tổng vẫn khớp.

#### 6.2 — Choose Data That Exposes the Rule

| Rule | Dữ liệu nên phân biệt | Assertion cần nhìn |
|---|---|---|
| Minimum amount | Dưới/tại/trên ngưỡng | Được nhận hay bị từ chối theo luật đã chốt |
| Expiry | Trước/tại/sau hạn | Kết quả theo clock và timezone cố định |
| Discount type | Percent và fixed | `discount_amount`, `final_amount`, rounding |
| Usage limit | Dưới/tại/vượt lượt dùng | Có bị từ chối đúng điều kiện không? |

Đây là thiết kế cases của nhóm từ các trường Coupons thật [L01–L02], chưa phải khẳng định từng case đã được spec mô tả đầy đủ. Thử nhiều số ngẫu nhiên không thay thế việc chọn đúng biên.

#### 6.3 — Avoid Three Traps

1. **Chép bug làm đáp án:** lấy kết quả hiện tại làm expected mà không đối chiếu nghiệp vụ.
2. **Fail nhầm nguyên nhân:** test âm nhận lỗi DB nhưng tưởng đã kiểm tra mã hết hạn; cần assert trạng thái/nội dung đủ phân biệt nguyên nhân.
3. **Gọi xong nhưng không chờ:** quên `await`/callback khiến assertion chạy sai thời điểm hoặc không được thực thi như dự định.

### 7 — Understand Stryker Configuration

Config giống tờ hướng dẫn cho người kiểm bài: kiểm phần nào, dùng cách chạy nào, chờ bao lâu và lưu kết quả ở đâu. Các option dưới đây đối chiếu [S05](https://stryker-mutator.io/docs/stryker-js/configuration/); lựa chọn áp dụng cho EShop vẫn phải kiểm chứng ở C02/D04.

#### 7.1 — Scope, Runner and Coverage

| Option | Công dụng ngắn | Áp dụng cần kiểm tra |
|---|---|---|
| `mutate` | Chọn source để tạo mutants | Scope Coupons trong `server.js`; không mutate tests |
| `testRunner` | Chọn runner tích hợp | Phải khớp harness nhóm thực sự dùng |
| `coverageAnalysis` | Chọn `off`, `all`, `perTest` | Khả năng hỗ trợ tùy runner |
| `reporters` | Chọn đầu ra | Giữ console, HTML và JSON |

Runner là bộ phận chạy tests. Stryker tạo thay đổi và nhờ runner kiểm tra; nó không tự cung cấp expected results cho Coupons. Các runner plugins hỗ trợ tích hợp sâu hơn command runner [S06](https://stryker-mutator.io/docs/stryker-js/plugins/).

`perTest` có thể chọn những tests bao phủ mutant; `all` dùng coverage ở mức suite; `off` chạy không dùng tối ưu coverage. Command runner không cung cấp coverage analysis kiểu tích hợp này: thiếu nhãn NoCoverage khi dùng chế độ không đo được không chứng minh mọi mutant đã được bao phủ [S05].

#### 7.2 — Time, Parallelism and Reuse

| Option | Công dụng ngắn | Áp dụng cần kiểm tra |
|---|---|---|
| `timeoutMS`, `timeoutFactor` | Quy định thời hạn | Log vì sao hết giờ; giữ điều kiện so sánh |
| `concurrency` | Số workers song song | SQLite/fixtures có đụng dữ liệu nhau không? |
| `incremental` | Tái dùng kết quả trước | Khi xác minh comparison, cần biết phần nào đã rerun |
| `thresholds` | Màu báo cáo/ngưỡng fail build | Không coi màu xanh là chứng minh test đúng |

Ví dụ lý luận của nhóm: hai workers cùng xóa/seed một DB có thể làm dữ liệu test thay đổi. Vì vậy, **đề xuất** bắt đầu xác minh với một worker và dữ liệu cô lập, sau đó mới đánh giá chạy song song; chưa có benchmark trên EShop.

Timeout có phần thời gian test gốc, hệ số và overhead; không đơn giản là “mỗi mutant được đúng `timeoutMS`”. Tăng thời hạn chỉ đổi điều kiện chạy, không tự sửa assertion hoặc vòng lặp vô hạn [S05].

Incremental có thể tái dùng kết quả khi code/tests phù hợp. Những thay đổi ở dependencies/environment hoặc files khác có thể không được phát hiện đầy đủ; baseline/manual/AI cần lưu mode và xác minh lại khi đầu vào đổi [S08](https://stryker-mutator.io/docs/stryker-js/incremental/).

#### 7.3 — Read a Configuration Fragment

```json
{
  "mutate": ["server.js"],
  "reporters": ["clear-text", "html", "json"],
  "concurrency": 1,
  "incremental": false
}
```

Đọc lần lượt: **đổi source trong server.js → xuất ba kiểu kết quả → một worker → không tái dùng incremental**.

Đây là **mảnh config để học cú pháp**, chưa phải config chạy được cho EShop: nó chưa chọn runner/harness, fixtures hoặc giới hạn Coupons. `server.js` chứa nhiều domains, nên dùng nguyên file sẽ mở rộng phạm vi. Trước khi dùng, D04 phải chốt phạm vi và plugin phù hợp.

Đặt config JSON/JS theo cơ chế tìm file của Stryker; CommonJS của backend không bắt buộc phải chọn một test runner cụ thể. Xem [S09](https://stryker-mutator.io/docs/stryker-js/config-file/).

### 8 — Read Reports Like Evidence

#### 8.1 — Three Outputs, Three Uses

| Output | Dùng khi nào? | Cần giữ |
|---|---|---|
| Console / clear-text | Xem tiến trình và kết quả nhanh | Command và stdout/stderr |
| HTML | Người đọc xem code/mutants | File báo cáo đầy đủ |
| JSON | Tổng hợp/diff kết quả bằng script | Raw JSON, schema/version |

Đây là các reporter của StrykerJS [S06]. Vị trí lưu theo cấu hình thực tế; ghi đường dẫn trong manifest/log, không đoán chỉ từ tên reporter.

#### 8.2 — A Small JSON Example

```json
{
  "id": "DEMO-M1",
  "mutatorName": "EqualityOperator",
  "location": {
    "start": {"line": 3, "column": 10},
    "end": {"line": 3, "column": 26}
  },
  "replacement": "total > minimum",
  "status": "Killed",
  "killedBy": ["demo-boundary-test"]
}
```

Đây là **trích đoạn giả lập hình dạng một mutant**, không phải full report hay JSON xuất từ EShop. Schema có các trường như id, mutation location, status; `killedBy`/`coveredBy` phụ thuộc khả năng runner, không phải luôn đầy đủ [S07](https://github.com/stryker-mutator/mutation-testing-elements/blob/master/packages/report-schema/src/mutation-testing-report-schema.json).

`killedBy` trỏ đến test IDs, không trỏ thẳng vào “assertion thứ mấy”. Để nói assertion nào giúp phát hiện, cần test source, test diff và run đối chứng phù hợp. Một runner có thể dừng sau test fail đầu tiên, nên danh sách killing tests không nhất thiết là mọi test có khả năng phát hiện mutant.

#### 8.3 — Five Questions for Each Run

1. **Run nào?** SUT commit, test-set commit/diff, config, versions, data reset và command là gì?
2. **Chạy đủ chưa?** Có Pending, lỗi runner, dry-run failure hoặc report cũ không?
3. **Mutant nào?** File, location, operator và replacement có đúng case Coupons đang xét không?
4. **Kết quả gì?** Test nào fail/pass, hoặc vì sao timeout? Cần mở log/test source khi nhãn chưa đủ.
5. **Kết luận đến đâu?** Assertion đúng spec có thực sự phân biệt mutant, hay mới có dấu hiệu cần kiểm chứng?

#### 8.4 — Compare Domains and Runs Fairly

Nếu domain A có 1/1 detected và domain B có 0/9 detected, lấy trung bình hai score được 50%, nhưng gộp các tập **không chồng lặp** là 1/10 = 10%. Do đó không lấy trung bình đơn giản score domains.

Với EShop dùng chung `server.js`, còn phải kiểm tra mutant trùng giữa domains. S4-E02 cần raw counts/mapping và run chung phù hợp, không cộng mù các bảng con. Đây là hệ quả số học và contract của nhóm, không phải kết quả trên SUT.

### 9 — Use Claude as an Assertion Candidate Generator

Claude giống một bạn học đề xuất cách kiểm tra bài. Bạn ấy có thể đưa ra ý tưởng tốt, nhưng người kiểm bài vẫn cần đáp án chuẩn và chạy thử. Model không tự trở thành test runner hay người xác nhận nghiệp vụ.

Anthropic hướng dẫn đặt tiêu chí thành công cụ thể, đo được và đánh giá theo nhiệm vụ [S10](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests). Input/prompt dưới đây là thiết kế của nhóm để áp dụng nguyên tắc đó; **chưa gửi Claude và chưa thu Claude output** ở task nghiên cứu này.

#### 9.1 — Prepare Five Input Groups

1. **Expected behavior:** yêu cầu/case và expected result, ghi điểm chưa rõ.
2. **Sanitized production code:** phần cần hiểu, dependency/API liên quan; bỏ secrets và dữ liệu cá nhân.
3. **Baseline tests:** cách gọi, fixtures và assertion đang có; chưa đưa lời giải manual vào phép so sánh.
4. **Mutant context:** ID, diff, trạng thái baseline và lý do nghi ngờ thiếu test.
5. **Environment & output contract:** runner/version đã chọn; yêu cầu trả candidate test, input, expected result và lý do phân biệt mutant.

Thiếu thông tin thì để Claude nêu chỗ thiếu; không để model tự đặt tên API, tự chọn nghiệp vụ hoặc tự tuyên bố đã chạy.

#### 9.2 — Prompt Template

```text
<task>
Đề xuất assertion candidates để phân biệt mutant bên dưới với code gốc.
Lấy expected result từ spec. Nêu thông tin còn thiếu khi chưa suy ra được.
</task>

<spec>
[Case, luật nghiệp vụ đã chốt và nguồn]
</spec>

<production_code>
[Đoạn code đã bỏ secrets/dữ liệu riêng]
</production_code>

<baseline_tests>
[Baseline tests, fixtures, runner/API sẵn có; không chứa lời giải manual]
</baseline_tests>

<mutant>
[ID + file/location + diff + baseline state]
</mutant>

<required_output>
1. Dữ liệu đầu vào và expected result, kèm căn cứ từ spec.
2. Candidate test/assertions dùng đúng runner/API được cung cấp.
3. Vì sao case này phân biệt được code gốc và mutant.
4. Giả định, thông tin còn thiếu và bước người dùng cần chạy kiểm chứng.
Ghi rõ đây là đề xuất chưa thực thi.
</required_output>
```

Tags giúp tách chỉ dẫn, context và dữ liệu theo [S11](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). Prompt này không đảm bảo model luôn làm đúng; nhóm kiểm tra output theo các gate dưới đây.

#### 9.3 — Review, Then Execute

1. **Spec gate:** expected có đúng nghiệp vụ, thay vì chép implementation không?
2. **Code gate:** API/import/async/fixtures có thật và đúng runner không?
3. **Original-code gate:** test pass trên code gốc đã đóng băng không? Nếu không, phân biệt bug gốc, setup và candidate sai trước.
4. **Mutant gate:** test có fail đúng mutant vì kết quả cần kiểm tra không? Lưu actual result và log.
5. **Comparison gate:** cùng baseline/mutants/conditions; lưu raw output, bản sửa và số lần thử prompt để giải thích kết quả.

**Ba loại xử lý candidate:** `Accepted` nếu đáp ứng sau review/verification; `Edited` nếu cần sửa và kiểm chứng lại; `Rejected` nếu sai/không dùng. Đây là nhãn xử lý thử nghiệm, tách với verdict VALID/INVALID/INCOMPLETE của AI audit chính thức.

Không chỉnh `production_code` chỉ ở nhánh AI để làm test pass. Khi buộc phải đổi baseline, quay lại chốt điều kiện chung và chạy lại các nhánh liên quan.

#### 9.4 — Save the Evidence

Mỗi lần dùng Claude cần lưu prompt nguyên văn, raw output, model/version biết được, tests sau sửa, verdict/lý do, command và reports. Thời gian chỉ ghi khi có record thật; chưa biết thì `unknown`. Model tự nói “đã kill” không thay cho run evidence.

Đầu ra dự kiến ở S3-G02: `ai-audit/AI_Record_Thai_Hoa.md`, experiment log, test diff và report. Prompt ở đây là template nghiên cứu, không phải transcript một lần đã sử dụng Claude.

### 10 — Map Data-driven and Checkpoints

| Concept | Hiểu đơn giản | Ví dụ Coupons |
|---|---|---|
| Data-driven | Một cách kiểm tra, thay nhiều bộ dữ liệu | Dưới/tại/trên minimum; mỗi hàng có expected riêng |
| Checkpoint | Chỗ nhìn kết quả và so với expected | Kiểm `discount_amount`, `final_amount`, hoặc lỗi nghiệp vụ |
| Semi-automated workflow | Máy chạy phần lặp lại, người quyết định phần cần hiểu | Scripts chạy tests/Stryker; người chọn expected, review Claude, đọc evidence |

Một bảng dữ liệu phải đi cùng assertions; chỉ lặp API với nhiều số chưa chứng minh kết quả đúng. Một checkpoint cũng không chỉ là ảnh chụp/log: trong vòng kiểm thử này cần điều kiện pass/fail rõ.

Record & Playback là cơ chế ghi/phát lại thao tác trong bối cảnh phù hợp, không phải tên khác của “lưu report rồi mở lại”. Các tài liệu hiện có chưa ghi chi tiết quyết định áp dụng ở S2; tra nội dung đã chốt khi viết demo S4. Không tự tuyên bố Stryker có UI recorder. Đây là mapping thực hành của nhóm theo REQ-10, không mở lại trạng thái S2 đã hoàn tất.

### 11 — Connect to the Real EShop

**Source inspection ngày 2026-10-18**, SUT HEAD `85af3ba875c88283615e22cb108f13e2fccaf0e9`; không chạy backend, không gọi API, không sửa code. Các file đã đọc nằm trong repo local `eshop-sut/` [L01–L03].

| Observation | Evidence | Ý nghĩa cho task sau |
|---|---|---|
| Tests chưa có command sử dụng được | `backend/package.json`: `scripts.test` là placeholder trả exit 1; chưa khai báo test runner/Stryker | C02/D02 cần harness trước khi làm baseline |
| Coupons nằm trong route chung | `backend/server.js:363–440` | D04 phải chốt phạm vi/seams và side effects khi import |
| Minimum hiện kiểm bằng `>` | `backend/server.js:379` | Chuẩn hoá expected ở đúng ngưỡng; spec §5/§6.4 chưa giải thích rõ phép so sánh |
| Spec percent có ví dụ `discount_value: 15`; code dùng `total_amount * (1 - coupon.discount_value)` | Spec §6.4; `server.js:399–406`, `419–425` | Đối chiếu đơn vị percent và nghĩa discount/final trước freeze |

**Ví dụ suy luận từ source:** nếu truyền giá trị 15 vào biểu thức hiện có cho tổng 500.000, phép tính cho discount −7.000.000 và final 7.500.000. Đây là phép tính từ biểu thức/đầu vào giả định, chưa phải response EShop quan sát được. Cần phân biệt lỗi gốc với lỗi do mutant trước baseline.

Những điểm còn cần cố định khi làm tests: thời gian/timezone, coupon fixtures, user usage/reset và kết nối DB. Ví dụ khi test expiry, nếu clock thật thay đổi qua ngày thì kết quả cũng có thể đổi; mutant không phải nguyên nhân duy nhất.

Google mô tả cách giảm mutants và chọn phần có giá trị để giảm chi phí phân tích [S12](https://research.google/pubs/state-of-mutation-testing-at-google/). Bài học áp dụng ở đây là **chọn phạm vi/cases có căn cứ và ghi rõ phạm vi đó**; nghiên cứu Google không chứng minh cấu hình hiện tại của EShop đã hoạt động.

## Self-check

Tự trả lời bốn câu trước khi đọc đáp án:

1. Gọi đủ hàm và pass tất cả tests có đủ chứng minh assertions mạnh không?
2. Có 6 Killed, 2 Timeout, 1 Survived, 1 NoCoverage: Stryker score là bao nhiêu?
3. Test code gốc cũng fail thì có thể tính đó là kill của candidate không?
4. Claude sinh đoạn test nhìn hợp lý thì còn thiếu bước nào?

<details>
<summary>Answers</summary>

1. Chưa đủ: cần dữ liệu phân biệt và assertions nhìn đúng kết quả; xem ví dụ phần 3.
2. 80%; báo riêng 6 Killed và 2 Timeout, không gọi tất cả 8 là assertion kills.
3. Chưa có cơ sở: phải phân biệt setup, candidate sai và bug gốc trước khi so sánh mutant.
4. Review expected/API, chạy code gốc, chạy mutant và giữ reports/logs.

</details>

## Source Register

Ngày dưới đây là ngày truy cập/đối chiếu thực tế của phiên nghiên cứu, không phải ngày thành viên đã tự đọc hoặc chạy tutorial.

| ID | Primary Source | Claim / Section | Access Date |
|---|---|---|---|
| S01 | Yue Jia & Mark Harman, *An Analysis and Survey of the Development of Mutation Testing*, IEEE TSE 37(5), 649–678, 2011; DOI `10.1109/TSE.2010.62`. [PDF bản sao bài gốc](https://kelloggm.github.io/martinjkellogg.com/teaching/cs684-sp24/assets/mutation-testing.pdf) | Đã tải/đọc nội dung liên quan §1–2.2; mutant, fault-based testing, score và equivalents. Author-hosted link không truy cập được trong phiên này | 2026-10-18 |
| S02 | [Stryker — Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) | Trạng thái và công thức tool | 2026-10-18 |
| S03 | [Node.js v24 — Collecting code coverage](https://nodejs.org/docs/latest-v24.x/api/test.html#collecting-code-coverage) | Lines/branches/functions; tham chiếu khái niệm, không thay coverage report EShop | 2026-10-18 |
| S04 | [Node.js — Assert](https://nodejs.org/api/assert.html) | Strict assertions; API cơ bản dùng trong ví dụ phần 3 | 2026-10-18 |
| S05 | [StrykerJS — Configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) | mutate, runner, coverage, reporters, timeouts, workers, thresholds | 2026-10-18 |
| S06 | [StrykerJS — Plugins](https://stryker-mutator.io/docs/stryker-js/plugins/) | Runner integration và reporter types | 2026-10-18 |
| S07 | [Mutation Testing Elements — Report JSON schema](https://github.com/stryker-mutator/mutation-testing-elements/blob/master/packages/report-schema/src/mutation-testing-report-schema.json) | Mutant fields, states, optional coverage/killing test information | 2026-10-18 |
| S08 | [StrykerJS — Incremental](https://stryker-mutator.io/docs/stryker-js/incremental/) | Tái dùng kết quả và giới hạn theo dõi thay đổi | 2026-10-18 |
| S09 | [StrykerJS — Config file](https://stryker-mutator.io/docs/stryker-js/config-file/) | Cách cung cấp config; snippet chưa phải cấu hình đã chạy | 2026-10-18 |
| S10 | [Anthropic — Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) | Đặt tiêu chí kiểm chứng theo task | 2026-10-18 |
| S11 | [Anthropic — Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags) | Tách instruction/context/input bằng tags | 2026-10-18 |
| S12 | Goran Petrović & Marko Ivanković, [State of Mutation Testing at Google](https://research.google/pubs/state-of-mutation-testing-at-google/), 2018 | Đã đọc abstract trên trang tác giả; chi phí và lựa chọn mutants, không suy ra benchmark EShop | 2026-10-18 |
| L01 | SUT `api_specification.md`, §5 và §6.4, HEAD `85af3ba` | Endpoint/fields Coupons; chưa đủ chi tiết mọi expected result | 2026-10-18 |
| L02 | SUT `backend/server.js:363–440`, HEAD `85af3ba` | Điều kiện minimum, expiry, usage và phép tính giảm giá | 2026-10-18 |
| L03 | SUT `backend/package.json`, HEAD `85af3ba` | Script test và dependencies khai báo; không phải kết quả npm test | 2026-10-18 |

Các docs online có thể mới hơn phiên bản sẽ cài. Khi làm C02/D04, ghi đúng versions thật và đối chiếu lại option/schema của bản dùng trong run.

## Handoff

- **S3-A02:** Có giải thích coverage/assertions, mutant states, score và ví dụ có expected results; chờ member review.
- **S3-B02:** Có config/report notes cho Stryker, Claude input/raw-output/review contract và mapping Data-driven/Checkpoints; chưa cài hoặc chạy hai tool trên EShop.
- **S3-C02/D02/D04:** Nhận observations phần 11; chốt runner, cases, expected behavior, isolation và baseline theo task tương ứng.
- **S4-A02/B02:** Dùng notes cho phần hướng dẫn, metrics, comparison interpretation và report; thay số liệu học tập bằng run evidence thật khi có.
- **AI record:** [AI_Record_Thai_Hoa.md](../../ai-audit/AI_Record_Thai_Hoa.md), artifact `TH-S3-RESEARCH-01`; member confirmation/AI audit verdict còn Pending.

## Report Outline Input

| S4 Section | Material From These Notes |
|---|---|
| Background / Test effectiveness | Phần 1–3; coverage, oracle/assertions, dữ liệu biên |
| Metrics / Method | Phần 4–5; states, denominator, same-baseline comparison |
| Tool configuration / Reproduction | Phần 7–8; option rationale và run metadata |
| AI-assisted assertion workflow | Phần 9; inputs, prompt, review và execution gates |
| Coupons findings / Limits | Phần 6, 10–11; mapping và source observations, chưa coi là experiment results |
