**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục                              | Giá trị              |
|----------------------------------|----------------------|
| Họ tên sinh viên (in hoa):       | LÊ TẤN HIỆP |
| MSSV:                            | 23120255 |
| Mã bài tập (ví dụ HW#00, HW#02): | Seminar T10, Nhóm 12 |
| Ngày làm bài:                    | 2026-10-16 đến 2026-10-23 (công việc đã ghi nhận) |
| Công cụ AI đã dùng:              | Claude (claude.ai): Claude Sonnet 4.6 và Claude Opus 5.5; Claude Code: Claude Opus 5.5 |
| Công cụ AI đã dùng:              | [x] Có [ ] Không |

## 2. Hướng dẫn (đọc trước khi điền)

- Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).

- Dán nguyên văn prompt — KHÔNG paraphrase.

- Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo).

- Gắn nhãn: VALID / INVALID / INCOMPLETE.

- Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật.

- Hiển thị bản sửa với phần thay đổi được tô sáng.

- Hàng mẫu in nghiêng — thay trước khi nộp.

## 3. Bảng Audit — 1 hàng / artifact

<table>
<colgroup>
<col style="width: 22%" />
<col style="width: 21%" />
<col style="width: 10%" />
<col style="width: 23%" />
<col style="width: 22%" />
</colgroup>
<thead>
<tr class="header">
<th>(1) Prompt + Công cụ</th>
<th>(2) Output AI</th>
<th>(3) Verdict</th>
<th>(4) Lý do (ISTQB)</th>
<th>(5) Bản SV sửa</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AI-S3-A01-01</strong><br>Công cụ: Claude (claude.ai), Claude Sonnet 4.6 and Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Nghiên cứu định nghĩa, operators và quy trình<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-a01-01">Verbatim prompt/output and audit</a></td>
<td>Research Notes F-A01-01 đến F-A01-05 và danh mục nguồn. Ví dụ sandbox so sánh bộ test yếu với 3 Killed trên 15 mutant và bộ test mạnh hơn với 14 Killed trên 15. Lần tái lập trên Windows của thành viên thu được cùng số đếm.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-a01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Verdict đã ghi nhận của thành viên chấp nhận artifact nghiên cứu. Kết quả tutorial được tái lập trên máy thành viên. Đây là evidence cho ví dụ, không phải baseline EShop đã hoàn tất. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> cung cấp cơ sở truy vết; các nguồn nghiên cứu vẫn được xác định trong danh mục nguồn.</td>
<td>Chấp nhận nguyên trạng đối với artifact được ghi nhận ngày 2026-10-16.</td>
</tr>
<tr>
<td><strong>AI-S3-B01-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Kiến trúc công cụ và kiểm tra source SUT<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-b01-01">Verbatim prompt/output and audit</a></td>
<td>Ghi chú quy trình công cụ và kiểm tra source ban đầu kết luận rằng một số quy tắc cart/checkout chưa được đặc tả. Việc kiểm tra bỏ sót SRS trong README.md. Ghi chú đã lưu thể hiện các tham chiếu nghiệp vụ đã sửa và cách dùng harness chỉ dành cho test.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-b01-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>FR-07 và SRS giải quyết các giả định mà output đầu tiên xem là câu hỏi còn mở. Điều này ảnh hưởng test basis và hành vi kỳ vọng. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ đối chiếu requirements với testware; bản sửa chi tiết được giữ trong phiếu nguồn.</td>
<td>Đổi quy tắc cart sang FR-07, bổ sung nguồn SRS, sửa Q9 và F-B01-04, thay seam cần sửa production bằng Express/SQLite mocks chỉ dùng cho test.</td>
</tr>
<tr>
<td><strong>AI-S3-C01-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Assertion Jest cho một survivor trong tutorial<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01">Verbatim prompt/output and audit</a></td>
<td>Ba test tutorial đã thực thi pass trên implementation gốc. Biên miễn phí vận chuyển chính xác kill mutant subtotal &gt; 500000 được chọn. Kết quả mutation đầy đủ có 14 Killed và 1 Survived. Code và phần giải thích được lưu riêng.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Verdict đã ghi nhận áp dụng cho code test. Giá trị kỳ vọng được tính từ requirement; phần giải thích về mutant giả định &gt;= 499999 bị từ chối vì mutation đó không được sinh. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 4.2.2</a> là tham chiếu thiết kế biên.</td>
<td>Giữ các assertion được sinh. Chỉ bổ sung test wrapper cho câu lệnh expect độc lập tùy chọn và từ chối phần giải thích mutator không có căn cứ.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-18<br>Nhiệm vụ: Baseline Cart và bộ test defect<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-01">Verbatim prompt/output and audit</a></td>
<td>Bộ test Cart &amp; Orders ban đầu, fixtures cô lập và các test defect riêng. Sandbox ban đầu báo 36 baseline test pass và các assertion fail kỳ vọng riêng. Hành vi production được đối chiếu SRS, không mặc nhiên xem là đúng.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Phiếu ghi nhận bộ test ban đầu có thể dùng sau khi sửa. Cần phân biệt requirement nghiệp vụ với defect gốc trước khi freeze baseline. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ truy vết test basis. Việc thực thi và tích hợp về sau là các artifact khác, không được tính là thành viên tự chạy ở đây.</td>
<td></td>
</tr>
<tr>
<td><strong>AI-S3-D01-02</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Thực thi và chẩn đoán bàn giao Cart<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02">Verbatim prompt/output and audit</a></td>
<td>Báo cáo thực thi ghi nhận 36 baseline test pass, 8 test defect fail riêng và Stryker dry run thất bại: No tests were found. Một run chẩn đoán bổ sung dùng tempDirName stryker-tmp tìm được 36 test.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Báo cáo phân biệt chính xác lỗi thực thi với việc phát hiện mutant và giữ kết quả thực tế, thay vì đổi test cho khớp kỳ vọng. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> là tham chiếu báo cáo. Bên thực thi các lệnh này là Claude Code.</td>
<td></td>
</tr>
<tr>
<td><strong>AI-S3-WF-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Chuẩn bị workspace và hướng dẫn báo cáo run<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-01">Verbatim prompt/output and audit</a></td>
<td>CLAUDE.md và các skill mutation/run-report. Phiên bản đầu giả định thư mục làm việc đặt tên theo ngày và clone lặp lại, trong khi quy trình thực tế dùng một thư mục Repo đã có chứa các bản clone.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Output đầu tiên phụ thuộc vào giả định sai về môi trường. Các phiên bản sau dùng workspace đã cung cấp và định dạng báo cáo gọn. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.2</a> là tham chiếu về context; các yêu cầu sửa đã ghi nhận của người dùng xác định thay đổi thực tế.</td>
<td>Thay giả định thư mục theo ngày bằng workspace Repo cố định, tái dùng các bản clone đã có, rút gọn tổng kết và yêu cầu hỏi thay vì tự dựng thông tin môi trường còn thiếu.</td>
</tr>
<tr>
<td><strong>AI-S3-C01-02</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Ghi nhận thực thi tutorial và quy kết mutant<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-02">Verbatim prompt/output and audit</a></td>
<td>Experiment Log C01, diễn giải console và script trích killedBy từ mutation.json. Các run tutorial yếu, mạnh hơn và có AI hỗ trợ lần lượt ghi nhận 20.00%, 93.33% và 93.33%.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Kết quả được chép từ output console thực tế và đối chiếu báo cáo đã sinh. Thành viên cung cấp và commit evidence local. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo kết quả thực thi thực tế cùng context liên quan.</td>
<td>Làm rõ vị trí console.log và sửa vị trí thư mục báo cáo.</td>
</tr>
<tr>
<td><strong>AI-S3-C01-03</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Cấu hình bỏ qua các file được sinh<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-03">Verbatim prompt/output and audit</a></td>
<td>Đề xuất .gitignore được đối chiếu Git status thực tế. Các file được sinh/runtime được tách khỏi package lockfile backend đang được track.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-03">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Kiểm tra đã lưu xác nhận lockfile vẫn được track và các quy tắc ignore khớp trạng thái repository dự kiến. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.4</a> là tham chiếu quản lý cấu hình. Artifact này liên quan việc quản lý repository, không phải một thực nghiệm mutation bổ sung.</td>
<td>Chấp nhận nguyên trạng.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-04</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-16<br>Nhiệm vụ: Soạn câu hỏi scope domain<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-04">Verbatim prompt/output and audit</a></td>
<td>Nội dung trao đổi scope/bàn giao dựa trên lần kiểm tra source thiếu sót trước đó. Một số câu hỏi bị thừa vì SRS đã có các quy tắc liên quan.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-04">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Việc thiếu SRS ảnh hưởng các câu hỏi trước khi bắt đầu test. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ truy vết câu hỏi về nguồn requirement. Artifact này khác với bộ test đã sửa về sau.</td>
<td>Đọc SRS sau phản hồi về scope và sửa các ghi chú F-B01-04 làm cơ sở.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-03</strong><br>Công cụ: Claude and Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Sửa cấu hình dry run và lựa chọn defect<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-03">Verbatim prompt/output and audit</a></td>
<td>Cập nhật cấu hình chỉ dành cho test, tách DEF-08a/08b và lưu bản ghi thực thi. Dry run chẩn đoán cuối tìm được 36 test; profile defect Cart mở rộng có 9 assertion fail kỳ vọng.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-03">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Các thay đổi cấu hình và defect theo quyết định D01 đã ghi nhận. Logic production server và database được giữ nguyên. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.4</a> hỗ trợ quản lý phiên bản cấu hình; các báo cáo thực thi xác định phần lựa chọn đã đổi.</td>
<td>Chấp nhận cấu hình và cách tách defect như đã ghi nhận; giữ hành vi production gốc.</td>
</tr>
<tr>
<td><strong>AI-S3-WF-02</strong><br>Công cụ: Claude and Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Trích xuất và duy trì prompt log<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-02">Verbatim prompt/output and audit</a></td>
<td>Script trích xuất transcript và Stop hook. Các vòng sửa xử lý lệnh local /exit, phiên trống, nội dung trùng khi tiếp tục phiên và đối chiếu username. Các transcript đã lưu là file evidence, không phải hội thoại tái dựng.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-02">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Phiếu mô tả nhiều lần sửa trước khi công cụ trích xuất khớp hành vi transcript thực tế. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.4</a> hỗ trợ giữ phiên bản và khả năng truy vết evidence. Kết quả trích xuất về sau không được dùng thay output đầu tiên.</td>
<td>Sửa lọc lệnh local, ghi đè phiên trống, prompt lặp và che username; sửa đường dẫn input về sau.</td>
</tr>
<tr>
<td><strong>AI-S3-G01-01</strong><br>Công cụ: Claude Code and Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Sinh và xác minh assertion AI cho Cart EShop<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-g01-01">Verbatim prompt/output and audit</a></td>
<td>Năm test AI được giữ lại. Thực thi trên code gốc pass 41 test. Trong run bàn giao của thành viên, 5 mutant được chọn thành Killed và mutant sửa lỗi chuyển trạng thái vẫn Survived. Run chạy lại trên baseline đã freeze về sau được giữ riêng với run đó.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-g01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Verdict đã ghi nhận chấp nhận các assertion và nêu rõ oracle mảng/trường lỗi suy ra từ implementation. Phân tích sáu target tách quan sát nghiệp vụ khỏi chi tiết payload chưa được đặc tả. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> là tham chiếu truy vết.</td>
<td>Giữ nguyên các assertion. Sửa claim trong header về review trước đó và phiên sạch, đồng thời ghi rõ giới hạn partial-blind.</td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     | 12 | 100.00% |
| VALID (đúng, dùng nguyên)          | 7 | 58.33% |
| INVALID (sai; loại bỏ)             | 0 | 0.00% |
| INCOMPLETE (chấp nhận sau khi sửa) | 5 | 41.67% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

AI hữu ích nhất khi chuyển task cụ thể thành ghi chú, test đề xuất, hướng dẫn thực thi và báo cáo gọn. Evidence tutorial cho thấy assertion đúng tại biên cung cấp nhiều thông tin hơn việc chỉ kiểm tra kết quả dương. Điểm yếu chính là đọc thiếu nguồn, giả định sai workspace và dự đoán mutant mà công cụ không sinh. So sánh EShop cho thấy cần tách payload lỗi suy ra từ implementation khỏi requirement nghiệp vụ. Tôi sẽ dùng AI đề xuất, tổ chức công việc, rồi kiểm tra đặc tả, chạy test và xem mutant attribution thực tế. Run Agent thành công và lần tự tái lập là hai evidence khác nhau. Output công cụ nên hỗ trợ quyết định thay vì thay test oracle.

## 6. Mandatory Disclosure (dán nguyên văn)

> *"Bộ artifact có AI hỗ trợ được liệt kê ở Mục 3 này được sinh phiên bản đầu bởi Claude (claude.ai): Claude Sonnet 4.6 và Claude Opus 5.5; Claude Code: Claude Opus 5.5; tôi đã rà soát và chỉnh sửa phần diễn giải SRS, hướng dẫn workspace và chú thích provenance G01, bổ sung các kiểm tra biên miễn phí vận chuyển đã ghi nhận và các quan sát Cart thủ công; các assertion Cart thủ công được xác định trong bản ghi so sánh do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## Chữ ký

| Họ tên sinh viên (in hoa): |                                        |
|----------------------------|----------------------------------------|
| MSSV:                      |                                        |
| Lớp / Khoá:                |                                        |
| Môn học:                   | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên:                |                                        |
| Ngày:                      |                                        |
| Chữ ký:                    |                                        |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
