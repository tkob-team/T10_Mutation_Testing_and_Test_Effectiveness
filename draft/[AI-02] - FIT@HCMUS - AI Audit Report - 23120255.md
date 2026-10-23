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
| Công cụ AI đã dùng:              | Claude (claude.ai): Claude Sonnet 4.6, Claude Sonnet 5.5 và Claude Opus 5.5; Claude Code: Claude Opus 5.5 |
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
<td>Tôi chốt expected theo SRS (FR-07, FR-08, FR-10, FR-11, FR-12, FR-18, FR-20, SEC-03); baseline chỉ assert status; test đúng spec mà fail trên code gốc được tách sang backend/test/defects/.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-02</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Thực thi và chẩn đoán bàn giao Cart<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02">Verbatim prompt/output and audit</a></td>
<td>Báo cáo thực thi ghi nhận 36 baseline test pass, 8 test defect fail riêng và Stryker dry run thất bại: No tests were found. Một run chẩn đoán bổ sung dùng tempDirName stryker-tmp tìm được 36 test.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Báo cáo phân biệt chính xác lỗi thực thi với việc phát hiện mutant và giữ kết quả thực tế, thay vì đổi test cho khớp kỳ vọng. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> là tham chiếu báo cáo. Bên thực thi các lệnh này là Claude Code.</td>
<td>Accepted as-is; tôi chốt dùng tempDirName stryker-tmp.</td>
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
<tr>
<td><strong>AI-S3-WF-03</strong><br>Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Chuyển giao S3 sang S4 (handoff, skill, CLAUDE.md, hook log)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-03">Verbatim prompt/output and audit</a></td>
<td>Handoff S3→S4, cập nhật skill t10-mutation-testing và t10-run-report, Repo/CLAUDE.md, hook Stop ghi log vào ai-audit/evidence/s4. Handoff khớp repo khi phiên S3-I01 bắt đầu.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-03">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>SHA nhánh và cấu trúc thư mục trong handoff khớp repo; hook ghi đủ các lượt I01. Tham chiếu quản lý cấu hình: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.4</a>.</td>
<td>Chấp nhận nguyên trạng. Hạn chế phát hiện sau: preflight commit log rồi pull --ff-only bị từ chối khi remote có commit mới; mục 8 của handoff nói quá về giả thuyết Timeout.</td>
</tr>
<tr>
<td><strong>AI-S3-I01-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Prompt và phân tích S3-I01 (ba shared mutant cases)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-i01-01">Verbatim prompt/output and audit</a></td>
<td>Prompt I01 cho Claude Code, lệnh member run I01-1/2/3, nháp ba shared mutant cases, bản sửa README Coupons-extensions (7ab200b), bảng xử lý góp ý của Phúc.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-i01-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Prompt v1 thiếu git fetch, expected values và thư mục tạm; nháp Case 3 sai hai ý so với test thật. Mọi mutant, killedBy đọc từ mutation.json; I01-1/2/3 khớp 120/120 với report của Hòa. Tham chiếu truy vết: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a>.</td>
<td>Tôi hỏi lại để AI bổ sung prompt; bổ sung provenance member run bằng reflog và hash; sửa hai ý sai ở Case 3.</td>
</tr>
<tr>
<td><strong>AI-S3-I01-02</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Chạy I01-cc, so sánh với member run và report của Hòa<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-i01-02">Verbatim prompt/output and audit</a></td>
<td>Runs I01-{1,2,3}-cc, script so sánh i01_compare.py, provenance member run, I01-cc-REPORT.md.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-i01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>I01-cc khớp report của Hòa 120/120 mutant, 0 đổi trạng thái; tôi tự chạy I01-1/2/3 cho cùng kết quả. Tham chiếu báo cáo kết quả: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Chấp nhận. Agent dừng và hỏi khi thiếu dữ liệu (Q1, Q2) thay vì tự quyết.</td>
</tr>
<tr>
<td><strong>AI-S3-E01-01</strong><br>Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Member self-run Cart và so sánh với run -cc<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-e01-01">Verbatim prompt/output and audit</a></td>
<td>Lệnh PowerShell ghi header vào console.log, thư mục S3-member-compare (REPORT, script, bảng so sánh), cập nhật Experiment Log.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-e01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>E01-1 82/25/34/2/7, F01-2 112/18/11/2/7, G01-2 102/18/21/2/7; tập Survived trùng ở cả 6 cặp. Tham chiếu báo cáo kết quả: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Chấp nhận. Giả thuyết Killed↔Timeout do concurrency bị dữ liệu bác bỏ; chữ tiếng Việt trong log lỗi mã hóa do lệnh thiếu UTF-8 (số liệu không ảnh hưởng).</td>
</tr>
<tr>
<td><strong>AI-S4-A01-01</strong><br>Công cụ: Claude (claude.ai), Claude Sonnet 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Guide contribution Cart & Orders (S4-A01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-a01-01">Verbatim prompt/output and audit</a></td>
<td>Guide_Contribution_Tan_Hiep.md: walkthrough Cart trên workshop 6d2e790, Troubleshooting có nhãn Đã gặp/Đề xuất, 5 Failure Modes.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-a01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>F01c-1-cc chạy lại trên Windows 11 khớp 4 mốc: 88 tests; 7 Survived; 3 Killed sau CO-02; 7 Killed sau 3 assertion. Tham chiếu truy vết: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a>.</td>
<td>Tôi yêu cầu chuyển bản English sang tiếng Việt; không tự sửa nội dung. Hai lỗi (dẫn FR-07, câu nói quá) do AI tự phát hiện và sửa.</td>
</tr>
<tr>
<td><strong>AI-S4-B01-01</strong><br>Công cụ: Claude (claude.ai), Claude Sonnet 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Report contribution (S4-B01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-b01-01">Verbatim prompt/output and audit</a></td>
<td>Report_Contribution_Tan_Hiep.md và câu caveat Killed/Timeout trong draft/Seminar_Report.md.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-b01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Bảng 6.2/6.5/6.6 đối chiếu Experiment Log S3; 550:11 là mutant sửa lỗi DEF-05 nên cả manual và AI để Survived. Tham chiếu báo cáo: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Tôi yêu cầu viết bằng tiếng Việt; không sửa nội dung.</td>
</tr>
<tr>
<td><strong>AI-S4-C01-01</strong><br>Công cụ: Claude (claude.ai), Claude Sonnet 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Kịch bản demo Cart (S4-C01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-c01-01">Verbatim prompt/output and audit</a></td>
<td>Demo_Contribution_Tan_Hiep.md: kịch bản Cart (Introduction, Installation, baseline, manual, Claude). Rehearsal C01-rehearsal-cc: 150 mutants, score 74.83% / 90.91% / 83.92% khớp.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-c01-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Killed/Timeout của manual và AI lệch 3 và 2 mutant giữa các lần chạy; video chưa quay. Tham chiếu báo cáo: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Tôi yêu cầu dịch sang tiếng Việt, bỏ blocker package.json đã sửa và thêm ghi chú Killed/Timeout dao động; kịch bản chưa quay.</td>
</tr>
<tr>
<td><strong>AI-S4-WF-01</strong><br>Công cụ: Claude (claude.ai), Claude Opus 5.5 (viết) và Claude Sonnet 5.5 (kiểm chứng)<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Handoff đầu S4<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-wf-01">Verbatim prompt/output and audit</a></td>
<td>Handoff claude/Handoff_T10_Tan_Hiep.md cho S4.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-wf-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>Đối chiếu repo thấy sai 4 điểm: hash main của SUT cũ, độ dài User_Guide, main seminar đã tiến, bỏ sót lỗi package.json. Tham chiếu quản lý cấu hình: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.4</a>.</td>
<td>Tôi dùng trạng thái repo thật thay cho handoff; lỗi package.json do Hòa sửa trên SUT main (4b28756); nhánh đề xuất đã xóa.</td>
</tr>
<tr>
<td><strong>AI-S4-F01-01</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Kiểm môi trường (F01a) và chạy lại guide Cart (F01c)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-f01-01">Verbatim prompt/output and audit</a></td>
<td>F01a: package.json trên SUT main lỗi JSON, dry run 806ba19 (150 mutants). F01c: chạy guide Cart mục 2.2 đến 4.1 trên Windows 11.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-f01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>F01c khớp 4 mốc của guide; run 14:11:33–14:11:40 lỗi do script áp snippet sai đã bị loại và chạy lại. Tham chiếu báo cáo: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Accepted; tôi đọc REPORT và xác nhận run lỗi đã bị loại, số liệu lấy từ run chạy lại.</td>
</tr>
<tr>
<td><strong>AI-S4-D01-01</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Reproduction guide Coupons (D01-1-cc) và khối lệnh cho D01-1<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-d01-01">Verbatim prompt/output and audit</a></td>
<td>D01-1-cc: chạy guide Coupons của Hòa, 120 mutants, 52.17%, hai profile mở rộng 53.91%. Khối lệnh PowerShell cho tôi tự chạy D01-1.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-d01-01">Verbatim prompt/output and audit</a></td>
<td>INCOMPLETE</td>
<td>D01-1 cho 0 mutant khác D01-1-cc, nhưng khối lệnh không ghi output native vào transcript và lần 1 lệnh overlay bị cắt. Tham chiếu báo cáo: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Tôi tự chạy D01-1, phải chạy lại khối 0–3 sau khi lệnh bị cắt; số tests tôi ghi tay trong NOTES; khối review candidate chưa làm.</td>
</tr>
<tr>
<td><strong>AI-S4-E01-01</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Ghép User Guide ba domain (S4-E01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-e01-01">Verbatim prompt/output and audit</a></td>
<td>materials/s4/User_Guide.md ghép Cart, Coupons, Auth; dịch Coupons/Auth sang tiếng Việt; gộp Troubleshooting và Failure Modes.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-e01-01">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>31/31 code block của ba nguồn còn nguyên văn; số liệu và link tương đối khớp. Tham chiếu truy vết: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a>.</td>
<td>Tôi đọc lại bản ghép; không sửa nội dung.</td>
</tr>
<tr>
<td><strong>AI-S4-E01-02</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Hoàn thiện User Guide theo evidence (S4-E01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-e01-02">Verbatim prompt/output and audit</a></td>
<td>Sửa User_Guide.md: lệnh clone seminar, $docsRoot, ghi chú dry run, giải thích PROVENANCE, 2 dòng Troubleshooting, checkout eea3ed4/b27fce2, executor run Windows, Tested environment Cart.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-e01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>Mỗi chỗ sửa dẫn evidence trong repo; bước chưa có người chạy được ghi rõ là chưa kiểm chứng. Tham chiếu truy vết: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a>.</td>
<td>Accepted; tôi đọc lại các chỗ sửa.</td>
</tr>
<tr>
<td><strong>AI-S4-F01-02</strong><br>Công cụ: Claude Code, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Kiểm User Guide bản ghép (S4-F01)<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-f01-02">Verbatim prompt/output and audit</a></td>
<td>Verification_Notes_Tan_Hiep.md mở rộng cho toàn bộ guide; script verify_user_guide.js và verify_output.txt.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s4-f01-02">Verbatim prompt/output and audit</a></td>
<td>VALID</td>
<td>36/36 claim số liệu khớp mutation.json/log; 31/31 code block; 51 link tương đối không hỏng. Tham chiếu báo cáo: <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a>.</td>
<td>Accepted; tôi đọc Verification Notes và verify_output.txt.</td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     | 25 | 100.00% |
| VALID (đúng, dùng nguyên)          | 16 | 64.00% |
| INVALID (sai; loại bỏ)             | 0 | 0.00% |
| INCOMPLETE (chấp nhận sau khi sửa) | 9 | 36.00% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

[Tấn Hiệp tự viết, 80–150 chữ]

## 6. Mandatory Disclosure (dán nguyên văn)

> *"Bộ artifact có AI hỗ trợ được liệt kê ở Mục 3 này được sinh phiên bản đầu bởi Claude (claude.ai): Claude Sonnet 4.6, Claude Sonnet 5.5 và Claude Opus 5.5; Claude Code: Claude Opus 5.5; tôi đã rà soát và chỉnh sửa phần diễn giải SRS, hướng dẫn workspace và chú thích provenance G01, bổ sung các kiểm tra biên miễn phí vận chuyển đã ghi nhận và các quan sát Cart thủ công; các assertion Cart thủ công được xác định trong bản ghi so sánh do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## Chữ ký

| Họ tên sinh viên (in hoa): | LÊ TẤN HIỆP |
|----------------------------|----------------------------------------|
| MSSV:                      | 23120255 |
| Lớp / Khoá:                | Software Testing - CQ2023/3 |
| Môn học:                   | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên:                | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| Ngày:                      | 23/10/2026 |
| Chữ ký:                    | <img src="signature_Hiep.png" alt="Chữ ký Lê Tấn Hiệp" width="160"> |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
