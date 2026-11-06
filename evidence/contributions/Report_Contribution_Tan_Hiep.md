# Seminar Report Contribution

**Document Role:** Contribution cá nhân S4 cho leader ghép vào `Seminar_Report.md`. Bản nháp do Claude soạn (AI-S4-B01-01), chờ Tấn Hiệp review từng mục; chưa phải bản đã duyệt.  
**Stage:** S4  
**Member:** Lê Tấn Hiệp  
**Task IDs:** S4-B01  
**Domain / Section:** Theory (Definitions, Operators, Workflow) và Cart & Orders  
**Evidence Status:** Draft — số liệu lấy từ `experiments/s3/Experiment_Log_Tan_Hiep.md` (member runs E01-1, F01-2, G01-2); Tấn Hiệp review: Pending

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Assigned Theory Section

### Definitions

Code coverage cho biết dòng code đã được chạy. Mutation testing hỏi thêm: nếu dòng đó sai, test có phát hiện không. Vì vậy nó đo độ nhạy của test, cụ thể là chất lượng test oracle, tức các `expect` quyết định pass hoặc fail [SRC-01].

| Term | Nghĩa dùng trong báo cáo |
|---|---|
| Mutant | Bản sao chương trình khác bản gốc đúng một thay đổi cú pháp, ví dụ `a > b` thành `a >= b` |
| Mutation operator (mutator) | Quy tắc sinh mutant, ví dụ `EqualityOperator` |
| Killed / Survived | Có test fail khi mutant bật / mọi test vẫn pass [SRC-05] |
| Timeout | Mutant làm chương trình chạy quá thời hạn; Stryker tính là detected, nhưng báo cáo ghi riêng với Killed |
| Test oracle | Căn cứ quyết định kết quả đúng; trong EShop là SRS và `api_specification.md`, không phải code đang test |

Hai giả thuyết nền tảng: Competent Programmer Hypothesis (lỗi thật thường là sai lệch nhỏ) và Coupling Effect (test bắt được lỗi đơn giản thì thường bắt được lỗi phức tạp hơn), nên chỉ cần first-order mutants [SRC-01]. StrykerJS chỉ sinh first-order mutants và dùng strong mutation: mutant bị kill khi có test fail ở kết quả cuối [SRC-01].

### Operators

Mỗi mutator mô phỏng một kiểu lỗi thường gặp: sai điều kiện, sai biên, thiếu code, sai dữ liệu trả về [SRC-06]. Các mutator xuất hiện thật trong vùng mutate của Cart & Orders:

| Mutator | Biến đổi | Test cần có để kill |
|---|---|---|
| ConditionalExpression | Thay điều kiện bằng `true` hoặc `false` | Test cả nhánh bị chặn lẫn nhánh được phép |
| ObjectLiteral | `{...}` thành `{}` | Assert nội dung response body, không chỉ status |
| StringLiteral | `"canceled"` thành `""` | Assert giá trị đã lưu trong DB hoặc response |
| BlockStatement | Xóa thân khối lệnh | Assert side effect thật; với handler thì request không có response nên có thể thành Timeout |
| ArrayDeclaration | Mảng có phần tử thành `[]` | Assert dữ liệu khởi tạo và dữ liệu trả về |

### Workflow

1. Chạy test suite trên chương trình gốc; phải pass trước khi đo. 2. Áp mutators để sinh mutants. 3. Chạy test trên từng mutant. 4. Phân tích survivor: lỗ hổng thật thì thêm assertion và chạy lại; nghi tương đương thì ghi equivalent candidate. 5. Tính score và báo cáo [SRC-01]. StrykerJS khớp quy trình này: dry run là bước 1, mutant runs là bước 3, report là bước 4–5 (Research Notes F-B01-01, cấu hình theo [SRC-07]).

## Domain & Experiment Method

**Scope.** Cart & Orders của EShop backend: `server.js` dòng 280–349 (giỏ hàng, checkout, đơn hàng của user) và 510–568 (đơn hàng phía admin), 150 mutants.

**Oracle.** `README.md` (SRS v2.0) và `api_specification.md`. Code không dùng làm oracle vì chứa lỗi cài sẵn. Khi spec im lặng, oracle ghi là suy luận (inferred); ví dụ "user mới có giỏ rỗng" suy ra từ §4.1, không phải yêu cầu nêu rõ.

**Harness.** Test-only, không sửa production code: `isolate.js` mock `sqlite3` để mỗi test file dùng DB `:memory:`, và mock `express` để lấy `app` mà không mở cổng. Token lấy bằng đăng nhập thật qua `POST /api/login`.

**Baseline.** 36 test trong `test/cart-orders.test.js`, chủ yếu assert HTTP status (quyết định D01-Q5). Chín test đúng spec nhưng fail trên code gốc (DEF-01…07, DEF-08a, DEF-08b) nằm riêng ở `test/defects/`, ngoài baseline. Frozen baseline là commit `806ba19`; policy `concurrency 2`, `timeoutMS 5000`, `timeoutFactor 1.5`.

**Manual và AI.** Manual (`s3/F01-manual` @ `b77f5d6`): thêm 8 test, tổng 44. AI (`s3/G01-ai` @ `f4696c6`): Claude Code (claude-opus-5-5) sinh 5 test nhắm 5/6 mutant mục tiêu, tổng 41; assertion giữ nguyên sau review, chỉ sửa comment header. Việc này chỉ blind một phần vì preflight của session đã in ra subject commit của nhánh manual. Cả hai chạy trên cùng production code, cùng vùng mutate và cùng 150 mutants.

## Results

Member runs (executor Tấn Hiệp), đếm từ `mutation.json`:

| Run | Test set | Tests pass | Killed | Timeout | Survived | NoCoverage | RuntimeError | Score |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| E01-1 | Baseline (`806ba19`) | 36 | 82 | 25 | 34 | 2 | 7 | 74.83% |
| F01-2 | Manual (`b77f5d6`) | 44 | 112 | 18 | 11 | 2 | 7 | 90.91% |
| G01-2 | AI (`f4696c6`) | 41 | 102 | 18 | 21 | 2 | 7 | 83.92% |

Score = (Killed + Timeout) / (tổng − RuntimeError) × 100; mẫu số là 143 cho cả ba run. Số liệu này khớp tập Survived của các run Claude Code và run tái lập của Hòa (34 / 11 / 21).

**Sáu mutant mục tiêu** (286:7, 292:7, 326:47, 346:45, 532:47, 550:11): manual và AI đều kill 5/6; `550:11` Survived ở cả hai. Manual có Survived thấp hơn AI 10 mutant: 8 do ba test manual ngoài mục tiêu (hủy đơn pending, chuyển trạng thái admin, checkout lưu DB), 2 (294:12, 294:23) do manual assert chuỗi `message` của `POST /api/cart`.

## Discussion & Limits

- **Oracle chặt hơn thì kill nhiều hơn, nhưng gắn chặt vào cài đặt.** Manual assert nguyên văn `{ error: "Order not found" }` lấy từ code; AI chỉ assert thông báo lỗi không rỗng. Spec không cố định nội dung thông báo lỗi, nên bổ sung hợp đồng lỗi vào spec là cách đúng hơn việc assert theo code.
- **Survivor không phải lúc nào cũng là test yếu.** Mutant `550:11` loại bỏ điều kiện thiếu trong code gốc (canceled → delivered phải bị từ chối theo FR-10), tức là mutant sửa lỗi. Test đúng spec thì fail trên code gốc (DEF-05); test kill được mutant phải assert theo bug.
- **Killed và Timeout phụ thuộc cách Stryker gọi Jest.** Cùng bộ test, Survived giống hệt ở mọi run trên ba máy và hai hệ điều hành; số Timeout là 25 với config đóng băng (jest config nội tuyến) và 18 với config nhánh (`configFile`). Cơ chế chưa kiểm chứng. Vì Timeout vẫn tính là detected, score gần như không đổi; khi so run phải so Survived tuyệt đối và ghi config.
- **Giới hạn so sánh manual và AI.** AI không kill 335:10 vì danh sách mutant giao cho AI không có trạng thái DB sau khi hủy đơn; manual kill được nhờ test hủy đơn viết ngoài mục tiêu. Hai bộ test có độ rộng khác nhau nên không so thẳng "AI kém hơn".
- **Chỉ một lần chạy mỗi cấu hình**, chưa đo flake rate.
- **RuntimeError (7)** nằm ngoài mẫu số. Quan sát ở sandbox Linux: đổi chuỗi SQL thành `""` làm `sqlite3` 6.0.1 thoát với mã 139; chưa kiểm lại trên máy thật.

## References & Contribution

**Sources:** SRC-01 Jia & Harman, IEEE TSE 2011; SRC-05 Stryker, Mutant states and metrics; SRC-06 Stryker, Supported mutators; SRC-07 StrykerJS Configuration; SRC-14 EShop SRS v2.0. Chi tiết trong `research/s3/Research_Notes_Tan_Hiep.md` (Source Register).

**Evidence:** `experiments/s3/Experiment_Log_Tan_Hiep.md`; `experiments/s3/runs/Tan_Hiep/E01-1/`, `F01-2/`, `G01-2/`, `S3-member-compare/member_comparison.md`.

**AI_Record artifacts:** nguồn của nội dung này là AI-S3-A01-01, AI-S3-B01-01, AI-S3-C01-01, AI-S3-D01-01, AI-S3-G01-01, AI-S3-E01-01. File này được soạn bằng Claude (claude.ai), artifact AI-S4-B01-01, ghi vào AI Record sau khi Tấn Hiệp review.

**Việc của Tấn Hiệp:** Pending — review từng mục, sửa lời theo ý mình, xác nhận số liệu với Experiment Log.

**Bàn giao leader:** bảng Results và các bullet Limits để ghép vào mục 6 của `Seminar_Report.md`; caveat Killed/Timeout bổ sung cho Bảng 6.5 (xem bản Hòa dùng số 105/25 và 95/25 của lần chạy lại dưới config đóng băng, cùng score).
