# T10 Seminar Proposal: Mutation Testing & Test Effectiveness

**Team / Class:** Nhóm 12 / Software Testing - CQ2023/3
**Members:**
| MSSV | Thành viên |
|---|---|
| 23120255 | Lê Tấn Hiệp |
| 23120262 | Tống Dương Thái Hòa |
| 23120264 | Nguyễn Phúc Hoàng |

## 1. Executive Summary

Seminar **Mutation Testing & Test Effectiveness** tập trung đánh giá khả năng phát hiện lỗi của bộ kiểm thử trên EShop backend, sử dụng **StrykerJS để thực hiện mutation testing** và **Claude để hỗ trợ đề xuất assertions**. Mục tiêu là so sánh assertions thủ công với assertions do AI đề xuất, phân tích giá trị và giới hạn của từng cách tiếp cận, đồng thời xây dựng quy trình để người học có thể thực hành lại.

Nội dung được tổ chức theo trình tự: cơ sở lý thuyết → chuẩn bị môi trường và bộ test → thiết lập baseline → phân tích mutants → cải thiện assertions → so sánh kết quả → demo và thực hành. Phạm vi nghiên cứu, phương pháp thực nghiệm, kế hoạch seminar và tiêu chí hoàn thành được trình bày trong proposal để giảng viên xem xét trước khi triển khai.

Phạm vi nghiên cứu dự kiến gồm ba nhóm nghiệp vụ: **Cart & Orders, Coupons, Authentication & Users**. Demo chính đi theo luồng người dùng đăng nhập, thao tác giỏ hàng, áp dụng mã giảm giá và đặt hàng, với trọng tâm minh họa ở điều kiện nghiệp vụ và kết quả đầu ra. Bộ bàn giao gồm tài liệu hướng dẫn, báo cáo nghiên cứu và thực nghiệm, demo, slides, activity cùng minh chứng đóng góp và AI disclosure theo yêu cầu môn học.

## 2. Objectives and Study Questions

### 2.1. Learning Objectives

Sau seminar, người học có thể:

- Phân biệt **code coverage** với khả năng test phát hiện hành vi sai; giải thích mutant, mutation operator, assertion và mutation score.
- Thiết lập và chạy mutation testing cơ bản bằng StrykerJS; đọc các kết quả `Killed`, `Survived`, `No coverage` và `Timeout`.
- Phân tích vì sao một mutant chưa bị phát hiện, rồi thiết kế test data và assertion phù hợp yêu cầu nghiệp vụ.
- Sử dụng Claude để đề xuất assertions, review và chạy kiểm chứng trước khi chấp nhận kết quả.
- Nhận biết giới hạn của phương pháp, đặc biệt là equivalent mutants, chi phí chạy và những cách diễn giải số liệu có thể gây hiểu nhầm.

Mỗi thành viên cần tự thực hiện quy trình trên phạm vi phụ trách và giải thích kết quả. Trải nghiệm thực tế là cơ sở xây dựng tài liệu hướng dẫn cho người chưa học chủ đề.

### 2.2. Study Questions

1. Bộ test ban đầu bỏ sót những thay đổi hành vi nào, và mutation testing giúp nhận diện khoảng trống đó ra sao?
2. Assertions thủ công và assertions do Claude đề xuất phát hiện được những mutant nào khi được kiểm chứng trên cùng điều kiện thực nghiệm?
3. Những mutant còn tồn tại xuất phát từ thiếu test data, thiếu assertion, giới hạn môi trường hay khả năng tương đương hành vi?
4. Cần chuẩn bị gì để người khác tái lập quy trình và tránh kết luận sai từ mutation report hoặc AI output?

Các câu hỏi được giải quyết thông qua phân tích từng trường hợp và số liệu thực tế. Hiệu quả của AI và mức mutation score đạt được sẽ được đánh giá sau thực nghiệm.

## 3. Proposed Scope and Tool Roles

### 3.1. EShop Study Scope

SUT là [EShop backend của nhóm](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness). Các cases tiêu biểu được lựa chọn trong ba nhóm nghiệp vụ sau:

| Domain | Proposed Study Focus | Expected Contribution |
|---|---|---|
| **Cart & Orders** | Dữ liệu giỏ hàng, tạo đơn hàng và điều kiện chuyển trạng thái đơn | Minh họa assertions về đầu ra và thay đổi trạng thái dữ liệu |
| **Coupons** | Mã hợp lệ/không hợp lệ, giá trị đơn hàng tại ngưỡng, hạn sử dụng, giới hạn lượt dùng và kết quả giảm giá | Minh họa dữ liệu biên và lỗi trong điều kiện/tính toán |
| **Authentication & Users** | Đăng nhập, token/quyền truy cập và thông tin người dùng trong các cases được chọn | Minh họa assertions cho trường hợp thành công, bị từ chối và quyền truy cập |

Cases cụ thể sẽ được xác định từ đặc tả và code thực tế trước khi thiết lập baseline. Luồng mua hàng được dùng làm mạch demo; mutation analysis tập trung vào các phần nghiệp vụ đã chọn. Frontend phục vụ minh họa hành vi người dùng khi cần. Phạm vi nghiên cứu tập trung vào test effectiveness; đánh giá toàn diện bảo mật và hiệu năng EShop nằm ngoài phạm vi đề xuất.

Đặc tả và implementation sẽ được đối chiếu để xác định expected results và ghi nhận sai khác trước thực nghiệm. Nếu cần sửa lỗi hoặc tách phần code để kiểm thử, thay đổi phải được giải thích và hoàn thành trước khi đóng băng baseline. Các lần so sánh sử dụng cùng phiên bản production code.

### 3.2. Selected Tools

| Tool | Role | Planned Study and Demonstration |
|---|---|---|
| **StrykerJS** | Tạo mutants, chạy tests và xuất mutation reports | Nguyên lý, setup/config, baseline, đọc report, tìm survivors và kiểm chứng bộ test cải thiện |
| **Claude** | Đề xuất và giải thích assertion candidates từ spec, code và mutant | Chuẩn bị input/prompt, sinh candidates, human review, chạy kiểm chứng và phân tích phần cần sửa hoặc loại bỏ |

Bộ công cụ được lựa chọn dựa trên ba lý do: StrykerJS hỗ trợ hệ sinh thái JavaScript/Node.js; vai trò của hai công cụ bổ sung cho nhau trong cùng quy trình; assertions do Claude đề xuất có thể kiểm tra trực tiếp bằng mutation testing [1]. Khả năng tích hợp vào EShop sẽ được xác nhận ở bước chuẩn bị. Các công cụ khác trong khảo sát S1 phục vụ so sánh, không mở rộng scope triển khai/demo của proposal này.

Nội dung nghiên cứu cho mỗi tool gồm mục đích, nguyên lý, thiết lập, sử dụng cơ bản, vận dụng nâng cao và giới hạn. Workflow đề xuất là **semi-automated**: scripts thực hiện các lần chạy và xuất report; thành viên phụ trách xác định expected results, review AI output và giải thích kết quả.

## 4. Study and Experiment Approach

### 4.1. Research Foundation

Cơ sở lý thuyết gồm mutation operators; quan hệ giữa coverage và test effectiveness; vai trò của test data và assertions; mutant states và mutation score; equivalent-mutant problem; AI-assisted assertion generation. Tài liệu môn học, tài liệu chính thức của công cụ và reading list T10 là nguồn tham chiếu chính [1-3].

Các khái niệm được minh họa bằng ví dụ EShop. Chẳng hạn, thay điều kiện `amount >= threshold` thành `amount > threshold` cho thấy vì sao dữ liệu đúng tại ngưỡng có thể phát hiện lỗi mà dữ liệu lớn hơn ngưỡng bỏ sót. Đây là ví dụ phương pháp; expected result của case thực nghiệm phải được xác định từ nghiệp vụ đã thống nhất.

### 4.2. Experiment Workflow

| Step | Main Work | Completion Evidence |
|---|---|---|
| **1. Confirm scope and expected behavior** | Chọn phiên bản SUT, cases, expected results; ghi nhận sai khác code/spec và giới hạn thực nghiệm | Phạm vi và căn cứ cho kết quả mong đợi đã được review |
| **2. Prepare a reproducible test environment** | Làm official tutorial; lựa chọn runner; chuẩn bị fixtures, dữ liệu và reset; thiết lập tests cho các cases đã chọn | Tests chạy trên code gốc; môi trường có thể dựng lại; mỗi thành viên tự chạy được |
| **3. Establish the baseline** | Cố định production code, cấu hình mutation và bộ test ban đầu; chạy StrykerJS trong phạm vi đã chọn | Baseline report, trạng thái mutants và điều kiện chạy được lưu |
| **4. Analyze surviving mutants** | Phân tích ít nhất **3 surviving mutants**: thay đổi nào xảy ra, vì sao test bỏ sót và dữ liệu/assertion nào cần bổ sung | Mỗi mutant có giải thích, expected behavior và hướng kiểm chứng |
| **5. Evaluate manual assertions** | Bổ sung ít nhất **3 assertions thủ công**, kiểm tra trên code gốc rồi chạy mutation testing | Bộ test hợp lệ trên code gốc; mutant nào bị phát hiện có evidence tương ứng |
| **6. Evaluate Claude assertions** | Từ baseline, cho Claude đề xuất trên cùng mutant; review, chạy thử và ghi riêng raw output với bản đã sửa | Candidates được chấp nhận/sửa/loại bỏ có lý do và kết quả kiểm chứng |
| **7. Compare and explain results** | So sánh baseline, manual và Claude; phân tích mutants còn tồn tại, failure modes và giới hạn | Bảng kết quả chung và phân tích từng trường hợp có căn cứ |

Mã nguồn backend hiện tại chưa có test command phục vụ thực nghiệm hoàn chỉnh. Vì vậy, bước chuẩn bị S3 bao gồm xây dựng test harness và dữ liệu tái lập. Baseline chỉ được thiết lập sau khi bộ test chạy ổn định trên code gốc.

### 4.3. Comparison Design and Measurements

Thực nghiệm sử dụng ba bộ test: **Baseline**, **Baseline + Manual Assertions** và **Baseline + Reviewed Claude Assertions**. Hai bộ cải thiện bắt đầu độc lập từ cùng baseline. Input cho Claude gồm yêu cầu nghiệp vụ, đoạn code liên quan, mutant diff và test ban đầu; lời giải thủ công được giữ ngoài prompt so sánh. Các lần chỉnh sửa hoặc thử lại prompt được lưu để giải thích kết quả.

Production code, mutation scope/operators, phiên bản công cụ và điều kiện chạy phải nhất quán giữa các lần so sánh. Nếu điều kiện thay đổi, baseline sẽ được thiết lập lại và thay đổi được ghi nhận. Mỗi run lưu phiên bản SUT, cấu hình, lệnh chạy, bộ tests và report. Khi tổng hợp các domains, phạm vi chồng lặp phải được kiểm tra và kết quả chung được xác minh; không lấy trung bình đơn giản các mutation scores.

Các chỉ số được ghi nhận gồm số mutant theo trạng thái, mutation score, những mutant được từng assertion phát hiện và mức sửa đổi cần thiết đối với Claude output. Thời gian thực hiện/chạy chỉ được báo cáo khi có đo thực tế. Theo Stryker, `Detected = Killed + Timeout` và mutation score tính trên valid mutants; `Killed` và `Timeout` được báo riêng để giải thích hiệu quả assertion [2].

Một assertion được đánh giá là phù hợp khi có căn cứ nghiệp vụ, chạy đúng trên code gốc và phát hiện sai khác cần xét. Với cases trả lỗi, nội dung/trạng thái mong đợi phải được kiểm tra để tránh nhầm lỗi môi trường với lỗi nghiệp vụ. Mutant chưa đủ căn cứ chứng minh tương đương được ghi **equivalent candidate**. Kết luận so sánh chỉ áp dụng trong các cases và mutants đã thực nghiệm.

### 4.4. Failure Modes to Investigate

Guide dự kiến phân tích ít nhất ba trường hợp có thể gây hiểu sai, ưu tiên:

- Test đi qua code nhưng thiếu assertion về kết quả nghiệp vụ, khiến coverage cao vẫn bỏ sót mutant.
- Score tăng do `Timeout` hoặc thay đổi phạm vi/cấu hình, trong khi khả năng phát hiện lỗi bằng assertion chưa được giải thích.
- Claude đưa ra assertion khớp implementation nhưng trái expected behavior, hoặc assertion chỉ phát hiện lỗi setup/data.
- Mutant sống sót do tương đương hành vi hoặc thiếu dữ liệu biên, cần phân tích trước khi kết luận test yếu.

Ví dụ cho tài liệu cuối được lựa chọn dựa trên kết quả kiểm chứng và nguồn tham khảo, kèm giải thích nguyên nhân, ảnh hưởng và cách nhận biết từng failure mode.

## 5. Seminar and Learning Activity Plan

### 5.1. Presentation and Demo

Cấu trúc seminar dự kiến gồm **45 phút** theo Master Guide:

| Segment | Duration | Main Content |
|---|---|---|
| **Topic and concepts** | 10 phút | Vấn đề test effectiveness, khái niệm cốt lõi, scope và cách đọc kết quả |
| **EShop live demo** | 10 phút | Luồng nghiệp vụ thật; Stryker report và survivor; Claude đề xuất; review và chạy kiểm chứng assertion |
| **Kill the Mutant** | 20 phút | Thính giả thiết kế assertions, peer review và quan sát kết quả chạy |
| **Q&A** | 5 phút | Thảo luận lựa chọn assertion, equivalent candidates và giới hạn phương pháp |

Demo bắt đầu từ hành vi mong đợi của người dùng, chỉ ra mutant cụ thể, giải thích điểm bộ test ban đầu bỏ sót và chạy kiểm chứng assertion cải thiện. Phần setup/basic/advanced được trình bày trong guide và screencast; live demo chọn các thao tác tiêu biểu đã rehearsal để phù hợp thời lượng. Các bước chạy test/mutation được chuẩn hóa để tái sử dụng.

Bộ cases ngắn phục vụ chạy trực tiếp; báo cáo đầy đủ của các lần thực nghiệm được lưu để đối chiếu. Screencast và raw reports hỗ trợ khi gặp lỗi kết nối hoặc thời gian chạy bất thường. Nếu dùng kết quả đã lưu, người trình bày sẽ thông báo rõ nguồn và điều kiện chạy.

### 5.2. Kill the Mutant

Activity sử dụng **5 mutant diffs** từ phạm vi EShop đã nghiên cứu, kèm mô tả nghiệp vụ, dữ liệu cần thiết, gợi ý và expected results. Mutants được chọn phải có hành vi phân biệt được, đáp án đã kiểm chứng và độ khó phù hợp với người mới.

Phương án 20 phút: **3 phút giới thiệu → 8 phút viết assertions → 4 phút đổi bài/peer review → 3 phút chạy kiểm chứng và tally kills → 2 phút giải thích**. Người học có thể viết pseudocode theo worksheet; assertions hợp lệ được chuyển vào sandbox để kiểm chứng. Tính khả thi của bước này sẽ được kiểm tra trước seminar.

Bài làm được đánh giá theo tính đúng đắn nghiệp vụ, khả năng phát hiện mutant và cách giải thích thiết kế assertion. Worksheet, answer key, rubric ngắn và hướng dẫn cần đủ để một peer team tái lập trong **≤25 phút**.

### 5.3. General Testing Requirements

**Data-driven Testing** được thể hiện bằng nhiều bộ dữ liệu cho cùng case, đặc biệt các giá trị dưới/tại/trên ngưỡng; **Checkpoints** bằng assertions về response, kết quả tính toán và trạng thái dữ liệu. Với **Record & Playback**, phương án đề xuất là demo ghi/phát lại thao tác người dùng trên luồng EShop hoặc xin phép không thực hiện vì không phù hợp với chủ đề Mutation Testing.

## 6. Execution Roadmap and Review Milestones

| Stage | Main Work | Review Gate |
|---|---|---|
| **S2 - Scope Review** | Hoàn thiện proposal tổng hợp; trình phạm vi, phương pháp và các phương án cần xác nhận | Góp ý/verdict và scope được ghi nhận trước khi triển khai thực nghiệm S3 |
| **S3 - Research & Experiments** | Nghiên cứu, dựng harness; baseline; manual/Claude assertions; tổng hợp evidence | Có kết quả tái lập, ≥3 survivors được phân tích, ≥3 manual assertions và AI comparison được kiểm chứng |
| **S4 - Documentation & Demo** | Viết guide/report từ research và evidence; chuẩn hóa demo; quay screencast | Một thành viên khác chạy lại theo guide; kết luận/report khớp evidence; demo thể hiện cả hai tool |
| **S5 - Readiness** | Hợp nhất slides/activity; pilot; rehearsal nội bộ và với giảng viên; chuẩn bị bộ 90% | Nội dung cốt lõi đã kiểm chứng, activity khả thi, thời lượng phù hợp và vật liệu sẵn sàng chia sẻ |
| **S6 - Live Seminar** | Trình bày, demo, facilitation, activity và Q&A | Có ghi nhận buổi seminar, kết quả activity và câu hỏi thực tế |
| **S7 - Feedback** | Thu minute paper, tổng hợp nội dung đã học/chưa rõ và usefulness 1-5 | Có feedback thật và danh sách cải thiện gắn với vấn đề được ghi nhận |
| **S8 - Finalization** | Hiệu chỉnh; hoàn tất audit/disclosure/reflection, peer review và bộ cuối | Tài liệu thống nhất với kết quả, hoàn tất review và đóng gói theo yêu cầu |

## 7. Team Organization and Quality Control

**Thái Hòa** phụ trách tổng hợp trong Preparation. Từ S3, công việc được chia cho cả ba thành viên theo domain và phần nội dung; mỗi người đều nghiên cứu, viết tests, sử dụng StrykerJS/Claude, phân tích kết quả và viết tài liệu. Phân công chi tiết sẽ được cập nhật trong tracker sau khi scope được review.

Mỗi phần việc có người chịu trách nhiệm chính, đầu ra rõ và người kiểm tra chéo. Các hạng mục chung như môi trường/baseline, bảng so sánh, report, demo và activity có người tổng hợp để bảo đảm nhất quán. Tiến độ được kiểm tra tại các review gate; blockers và đề xuất điều chỉnh phạm vi phải có căn cứ rõ ràng.

Quy trình bàn giao gồm **thực hiện → lưu evidence → review chéo → sửa → hợp nhất**. Tài liệu được quản lý phiên bản cùng nguồn tham khảo; lịch sử code/tests/config được liên kết với từng run. Một hạng mục chỉ được ghi nhận hoàn thành khi đầu ra đạt tiêu chí và có evidence kiểm tra. Mỗi thành viên cần tự chạy tool và giải thích phần phụ trách, kể cả khi đã pair-programming.

AI usage được ghi từ lúc sử dụng, gồm tool/model khi biết, prompt/output, phần sửa và kết quả verification. Nội dung AI hỗ trợ phải được review trước khi đưa vào bài nộp. Mỗi thành viên tự viết reflection và ký disclosure của mình. Dữ liệu nhạy cảm được loại khỏi input AI; feedback, đóng góp và kết quả chạy được ghi nhận từ hoạt động thực tế.

## 8. Expected Deliverables and Acceptance Criteria

| Deliverable | Main Content and Acceptance Criteria |
|---|---|
| **Experiment Package** | Scope và môi trường tái lập; code/tests/config; baseline/manual/Claude reports; phân tích ≥3 survivors, ≥3 manual assertions và AI verification; kết quả gắn với từng run |
| **User Guide** | English; Introduction, Install, First Test, Advanced Usage, Troubleshooting, References; thêm Failure Modes với ≥3 trường hợp có căn cứ; người khác chạy lại được |
| **Seminar Report** | Lý thuyết, vai trò hai tool, phương pháp, số liệu, phân tích từng mutant, equivalent candidates, giới hạn, sources và đóng góp; các kết luận có evidence |
| **Demo and Screencast** | Demo EShop thật với traditional và AI features; quy trình tái sử dụng được; screencast MP4 5-8 phút, ≤100 MB, English narration, không nhạc nền, ưu tiên 1080p |
| **Slides** | ≤15 slides theo template được cung cấp; chữ rõ, nền sáng/chữ đen; nối mục tiêu, phương pháp, kết quả, demo và activity |
| **Activity Materials** | 5 mutants, instructions/hints, answer key và rubric; sandbox đã kiểm tra; pilot chứng minh peer team có thể tái lập ≤25 phút |
| **Feedback and Finalization** | Feedback thực tế, action items, hiệu chỉnh và contribution evidence; review hai partner theo yêu cầu; AI-02/03/04 và Final Reflection theo mẫu/quy định, chữ ký thật |

Các tiêu chí trên được dùng để kiểm tra mức hoàn thành bộ bàn giao, dựa trên yêu cầu môn học. Báo cáo sau thực nghiệm sẽ trình bày kết quả, mức đạt từng tiêu chí và các giới hạn còn tồn tại.

## 9. References

[1] Stryker Mutator. [StrykerJS - Introduction](https://stryker-mutator.io/docs/stryker-js/introduction/) và [Getting Started](https://stryker-mutator.io/docs/stryker-js/getting-started/).

[2] Stryker Mutator. [Mutant States and Metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/).

[3] G. Petrović and M. Ivanković. [State of Mutation Testing at Google](https://research.google/pubs/state-of-mutation-testing-at-google/), ICSE SEIP, 2018. Reading list bổ sung theo brief T10: Y. Jia and M. Harman, [An Analysis and Survey of the Development of Mutation Testing](https://doi.org/10.1109/TSE.2010.62), IEEE Transactions on Software Engineering, 37(5), 649-678, 2011.

[4] Anthropic. [Define Success Criteria and Build Evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests). Assertion candidates được đánh giá theo các tiêu chí cụ thể: phù hợp nghiệp vụ, đúng trên code gốc và phát hiện mutant được xét.
