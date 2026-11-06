# Seminar Report Contribution

**Document Role:** Report contribution for integration and human review.  
**Stage:** S4  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S4-B02  
**Domain / Section:** Coverage, Mutation Score & Assertions; Coupons  
**Evidence Status:** Retained S3 datasets checked; new S4 overall results are reported separately.

## Assigned Theory Section

### Coverage and Detection

Chúng tôi phân biệt code coverage với khả năng phát hiện sai khác. Coverage xác định statements, lines, branches hoặc functions đã được thực thi. Assertion đối chiếu một observation với expected result từ test oracle. Test chạy qua logic giảm giá nhưng chỉ kiểm HTTP 200 chưa chứng minh số tiền đúng. Muốn phân biệt một mutant, input cần kích hoạt sai khác, sai khác phải truyền tới observation và assertion phải phát hiện observation đó [1].

Ví dụ Coupons: input `max_uses_per_user = 1` không phân biệt được expression gốc `max_uses_per_user || 1` với các replacements `true` và `max_uses_per_user && 1`, vì giá trị lưu đều là 1. Input hợp lệ 3 cùng assertion đọc lại giá trị 3 phân biệt được chúng. Việc tăng coverage một mình không thay thế lựa chọn dữ liệu này.

### Score and State Definitions

Theo Stryker [2], đặt K, T, S, N lần lượt là Killed, Timeout, Survived, NoCoverage:

```text
V = K + T + S + N
Stryker mutation score = (K + T) / V * 100
Assertion-kill proportion = K / V * 100
```

RuntimeError, CompileError, Ignored và Pending cần được báo riêng. Metric thứ hai là chỉ số giải thích của nghiên cứu, không đổi tên thành score chính thức của Stryker. Khi V bằng 0, ghi n.a. và lý do.

Trong baseline Coupons: V = 115, score = 60/115 = 52.17%, nhưng K/V = 39/115 = 33.91%. Vì 21 Timeout cũng thuộc detected, không được phát biểu 52.17% mutants bị assertion phát hiện. Một report có score tăng do thay đổi phân loại lỗi chưa chứng minh test tốt hơn.

### Oracle and Equivalent Candidates

Chúng tôi dùng SRS FR-09/FR-17 cho expected nghiệp vụ, API specification cho routes/payload và source inspection để nhận diện defect gốc [3]. Mã HTTP cụ thể khi specification chỉ nói từ chối được ghi là convention. Không gán exact error text thành requirement chỉ vì implementation hiện tại dùng chuỗi đó.

Survivor là kết quả thực thi, equivalent candidate là giả thuyết cần miền xét và lập luận. Mutant sửa defect gốc có thể thay đổi hành vi nhưng đúng specification hơn original. Không đổi expected result sang hành vi sai để kill mutant đó. Miền minimum/expiry equality của Coupons minh họa giới hạn này.

## Domain & Experiment Method

### Frozen Inputs and Isolation

Baseline chung là `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Profile Coupons mutate `server.js:355-492`, dùng Jest/Supertest, SQLite memory và clock fixture. Baseline domain có 26 test executions; integration có 88, gồm Cart 36, Coupons 26 và Auth 26. Các defect profiles chạy riêng, không tham gia passing baseline [4].

Source production/database, scope, runner và timeout policy được giữ cố định trong comparisons S3. Shared policy là perTest, concurrency 2, timeoutMS 5000 và timeoutFactor 1.5. Reports được đối chiếu theo source/location/mutator/replacement. Các runs khác runtime hoặc scope không được trộn thành cùng điều kiện.

### Manual-Analysis and Agent Conditions

F02 là bản phân tích và assertions do Codex hỗ trợ theo yêu cầu Hòa. G02 ban đầu thử Claude CLI nhưng thất bại xác thực; người dùng chọn Codex cùng context. Vì vậy, hai collections không phải thử nghiệm độc lập giữa con người và AI. Tool/model được giữ đúng theo provenance, không suy ra revision model phục vụ nếu session không cung cấp.

F02 ban đầu thêm ba scenarios: lưu limit 3, chấp nhận usage 2 và từ chối usage 3. G02 dùng hai parameterized cases với limits 2/4. Cả hai được chạy trên original code trước mutation. Extensions về sau bổ sung bốn nhóm/sáu cases cho manual và tám nhóm/mười hai cases cho Agent, có dùng helper chung [5].

## Results

### Domain Results

| Condition | Original tests pass | Killed | Timeout | Survived | NoCoverage | RuntimeError | V | Score | K/V |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline | 26 | 39 | 21 | 30 | 25 | 5 | 115 | 52.17% | 33.91% |
| Initial manual-analysis | 29 | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |
| Initial Agent | 28 | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |
| Extended manual-analysis | 35 | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |
| Extended Agent | 40 | 41 | 21 | 28 | 25 | 5 | 115 | 53.91% | 35.65% |

Baseline/initial data và mapping ở [4]; extension reports, source snapshots và metadata ở [5]. Các giá trị là counts từ runs đã lưu, không phải dự đoán của tài liệu này. New joint S4 runs có test selection khác, được trình bày tại [6].

### What Caused the Added Kills

Hai mutants 111/113 tại line 474 chuyển Survived sang Killed ở cả hai variants, với đủ 120 signatures khớp baseline. `killedBy` quy về persisted-limit assertion. Đây là hai mutants ở cùng một expression nghiệp vụ, không phải ba business defects độc lập. Các usage-boundary checks pass nhưng không được tự gán thêm kill không có trong mapping.

Score tăng từ 52.17% lên 53.91%, tức khoảng 1.74 percentage points khi dùng số đã làm tròn. Extensions tăng test count nhưng không thay đổi state của mutant nào so với variants ban đầu. Kết quả này không có nghĩa các scenarios mới vô ích; chúng kiểm tra thêm API lifecycle và dữ liệu mà universe built-in mutators hiện tại chưa phân biệt.

### Group Evidence

Chúng tôi có ít nhất ba vị trí phân biệt trong Cart: empty cart, add-read persistence và canceled state. Chúng bổ sung cho Coupons usage-limit case để đáp ứng phân tích survivors ở cấp nhóm, tránh đếm ba scenarios quanh một expression thành ba lỗi độc lập. Auth bổ sung các cases về role persistence, OTP randomness, lock message và các conventions cần công bố [6].

## Discussion & Limits

- Timeout đóng góp score nhưng không phải assertion kill. RuntimeError còn làm thay đổi mẫu số.
- Original minimum/expiry/percentage defects giới hạn passing profiles. Defect tests và correcting mutants được công bố riêng.
- Manual/AI collections khác test budget. Shared context và helper trong Coupons không cho phép suy luận causal effect của người hay model.
- Không đo effort cá nhân, chi phí review, độ biến thiên nhiều lần sinh hoặc statistical significance.
- Counts chỉ áp dụng cho SUT, scope và versions đã nêu. Không gọi score domain là score toàn hệ thống; score chung phải từ execution chung [6].

## References & Contribution

[1] Y. Jia and M. Harman, "An Analysis and Survey of the Development of Mutation Testing," IEEE TSE, 37(5), 2011. [DOI](https://doi.org/10.1109/TSE.2010.62). Phần lý thuyết kế thừa nguồn đã đọc trong [Research Notes](../../research/s3/Research_Notes_Thai_Hoa.md).

[2] Stryker Mutator, [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), kiểm tra ngày 2026-10-23.

[3] EShop, [SRS](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/README.md) và [API specification](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/blob/806ba19ee4e09eafe9b2696ccf117a2b1ab841ef/api_specification.md), frozen baseline.

[4] Nhóm 12, [Experiment Log](../../experiments/s3/Experiment_Log_Thai_Hoa.md), [manifest](../../experiments/s3/Baseline_Manifest.md), [initial comparison dataset](../../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/README.md).

[5] Nhóm 12, [Coupons extensions](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md).

[6] Nhóm 12, [Overall Comparison](../../experiments/s4/Overall_Comparison.md); [Auth comparison](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md); [Cart cross reproduction](../../experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md).

Hòa phụ trách scope, yêu cầu tổ chức và review tài liệu; Codex AI Agent soạn bản contribution này từ nguồn đã lưu. Việc Hòa chấp nhận nội dung và tự chạy vẫn cần xác nhận riêng. AI artifact: `TH-S4-DOCS-20261023` trong [AI Record](../../ai-audit/AI_Record_Thai_Hoa.md). Bản này là đầu vào cho [Seminar Report](Seminar_Report.md).
