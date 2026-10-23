<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục                              | Giá trị              |
|----------------------------------|----------------------|
| Họ tên sinh viên (in hoa):       | NGUYỄN PHÚC HOÀNG |
| MSSV:                            | 23120264 |
| Mã bài tập (ví dụ HW#00, HW#02): | Seminar T10, Nhóm 12 |
| Ngày làm bài:                    | 2026-10-19 đến 2026-10-23 (công việc đã ghi nhận) |
| Công cụ AI đã dùng:              | Claude Code 2.1.292 với Claude Opus 5.5; Claude CLI với claude-sonnet-5-5; Claude Code với Claude Sonnet 5.5 (S3-E03) |
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
<td><strong>PH-S3-A03B03-01</strong><br>Công cụ: Claude Code 2.1.292, Claude Opus 5.5<br>Ngày ghi nhận: 2026-10-19<br>Nhiệm vụ: Nghiên cứu equivalent mutants và giới hạn công cụ<br>Nguồn prompt: <a href="../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md">Verbatim transcript</a></td>
<td>Research Notes, danh mục nguồn, code mẫu sandbox, tests và báo cáo Stryker. Ghi chú gốc được sửa về sau để đếm ba lần chuyển Killed-to-Timeout và bổ sung quy tắc khóa đăng nhập đã được FR-02 đặc tả.<br>Nguồn output gốc: <a href="../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md">Verbatim transcript</a></td>
<td>INCOMPLETE</td>
<td>Bản nháp đã lưu và các bản sửa xác định hai vấn đề nội dung: thống kê mutant chưa đầy đủ và bỏ sót quy tắc SRS. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ kiểm tra test basis; <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 4.2.4</a> liên quan hành vi trạng thái khóa.</td>
<td>Các bản sửa trong ghi chú đã lưu do Agent tạo: đếm ba thay đổi trạng thái và dẫn FR-02 với mức tăng +1, ngưỡng ba lần thử và khóa 30 giây.</td>
</tr>
<tr>
<td><strong>PH-S3-C03-CLAUDE</strong><br>Công cụ: Claude CLI, claude-sonnet-5-5<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Sinh assertion tutorial cho biên tuổi<br>Nguồn prompt: <a href="../experiments/s3/runs/Phuc_Hoang/C03-claude/prompt.txt">Full verbatim prompt</a></td>
<td>Một yêu cầu Claude thành công sinh assertion canRegister(18). Test gốc pass và mutant age &gt; 18 được chọn thành Killed. Báo cáo kết quả gồm 18 mutant có 13 Killed và 5 Survived; báo cáo bộ test yếu có 12 Killed và 6 Survived.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Phuc_Hoang/C03-claude/raw.json">Raw Claude response</a></td>
<td>VALID</td>
<td>Biên hợp lệ được đặc tả demo cung cấp. Phần giải thích về mutation hằng số số học giả định không được dùng làm evidence cho mutant Stryker thực tế. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 4.2.2</a> là tham chiếu thiết kế biên.</td>
<td>Quy trình đã lưu loại bỏ chú thích source làm lộ đáp án và phân biệt lần thử xác thực thất bại với yêu cầu thành công.</td>
</tr>
<tr>
<td><strong>PH-S3-D03-AUTH</strong><br>Công cụ: Claude-assisted Auth test workflow<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Chuẩn bị tests Authentication &amp; Users<br>Nguồn prompt: <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#test-cases">Handoff cases and execution record</a></td>
<td>Bàn giao Auth có 26 test pass trên code gốc và 23 case defect riêng. Năm file source gốc được import về sau mà không sửa assertion, với hashes được kiểm tra khi tích hợp baseline chung.<br>Nguồn output gốc: <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#test-cases">Handoff cases and execution record</a></td>
<td>VALID</td>
<td>Các test pass và test defect được chọn riêng; thời lượng OTP 24 giờ được xác định là giả định thay vì biên theo hợp đồng. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ truy vết nguồn requirement. Các run tích hợp chạy lại về sau do bên khác thực thi.</td>
<td></td>
</tr>
<tr>
<td><strong>PH-S3-E03-PROVISIONAL</strong><br>Công cụ: Claude-assisted Stryker execution<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Đo baseline mutation Auth tạm thời<br>Nguồn prompt: <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline">Provisional baseline and diagnostics</a></td>
<td>Run tạm thời có 125 mutant: 60 Killed, 23 Timeout, 23 Survived, 7 NoCoverage và 12 RuntimeError. Score là 73.45% với 113 mutant hợp lệ. Run dùng source Auth gốc cùng tests D03 trong một bản sao cô lập.<br>Nguồn output gốc: <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline">Provisional baseline and diagnostics</a></td>
<td>VALID</td>
<td>Phiếu xác định run là tạm thời và báo Timeout/lỗi riêng. Crash SQLite native và ngoại lệ callback được giữ trong thông tin chẩn đoán. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ ghi điều kiện thực thi thay vì đổi nhãn run thành baseline chung cuối cùng.</td>
<td></td>
</tr>
<tr>
<td><strong>PH-S3-E03-BASELINE</strong><br>Công cụ: Claude Code, Claude Sonnet 5.5 (claude-sonnet-5-5)<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Chạy baseline Stryker Authentication &amp; Users trên commit baseline chung<br>Prompt (nguyên văn ghi chú task): &quot;Làm: Checkout baseline chung, tự chạy Stryker và map mutants thuộc Authentication &amp; Users; lưu reports gốc.&quot;<br>Nguồn prompt: <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline">Experiment log, Baseline</a>; <a href="../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md">verbatim transcript</a></td>
<td>Claude Code cài SUT tại commit đã freeze 806ba19 trong một bản clone sạch, chạy npm ci, npm test (88 pass) và test:auth (26 pass), sau đó chạy stryker.auth.config.json hai lần. Kết quả: 125 mutant, 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage và 8 RuntimeError. Score là 74.36% = (60 + 27)/117; assertion kill rate là 60/117 = 51.28%; RuntimeError được loại khỏi mẫu số. Cả 125 mutant nằm ở các dòng 20-135 và được ánh xạ theo route.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Phuc_Hoang/E03-baseline/console.log">Console log</a>, <a href="../experiments/s3/runs/Phuc_Hoang/E03-baseline/by_route.md">by-route mapping</a></td>
<td>VALID</td>
<td>Run thứ hai và run Windows trên baseline chung tái lập mọi trạng thái mutant (125/125 khớp theo dòng, cột, mutator và replacement; 0 khác biệt). Hashes file production không đổi trước và sau. Timeout và RuntimeError được báo riêng. So với run tạm thời, bốn mutant if (!user) chuyển từ RuntimeError sang Timeout, nên thay đổi từ 73.45% lên 74.36% là thay đổi phân loại, không phải assertion mạnh hơn. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo điều kiện thực thi cùng kết quả.</td>
<td>Không cần sửa số liệu đã đo. Quy trình dùng bản clone sạch của SUT chung thay cho fork của thành viên có thay đổi chưa commit, đồng thời giữ run tạm thời thành bản ghi riêng.</td>
</tr>
<tr>
<td><strong>PH-S3-F03-MANUAL</strong><br>Công cụ: Claude Code, Claude Sonnet 5.5 (claude-sonnet-5-5)<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Phân tích survivor Auth và bổ sung assertion manual<br>Prompt (nguyên văn ghi chú task): &quot;Làm: Đọc mutant diff, giải thích test bỏ sót và viết assertion theo spec; chạy tests/mutation từ baseline.&quot;<br>Nguồn prompt: <a href="../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md">verbatim transcript</a></td>
<td>13 test Jest (AM-01 đến AM-13) pass trên code gốc (39/39 khi kết hợp baseline). So với run baseline 125 mutant, 23 trong 30 mutant Survived/NoCoverage chuyển thành Killed và không mutant nào thoái lui: Killed 83, Timeout 27, Survived 4, NoCoverage 3, RuntimeError 8; score 94.02% = (83 + 27)/117; assertion kill rate 70.94%.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Phuc_Hoang/F03-manual/mutant_mapping.md">mutant mapping</a>, <a href="../experiments/s3/Experiment_Log_Phuc_Hoang.md#survivors--manual-assertions">Experiment log</a></td>
<td>INCOMPLETE</td>
<td>Năm trong 23 kill dựa trực tiếp trên FR-02, FR-03 và FR-04. 18 kill còn lại dựa vào quy ước (error hoặc message không rỗng, HTTP 500 khi database lỗi) vì đặc tả không cho các body đó, nên evidence yếu hơn mức score gợi ý. Bảy mutant còn lại không có case đúng theo spec: hai mutant thuộc phần spec không quy định, một mutant bị che bởi defect bộ đếm +2 (bị test hiện có kill trên bản sao đã vá), và một mutant tương đương hành vi đúng theo spec của SEC-06. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo các giới hạn này cùng kết quả.</td>
<td>Thành viên chưa review. Đề xuất sửa: giữ AM-01 đến AM-04 là dựa trên đặc tả và gắn nhãn AM-05 đến AM-13 là dựa trên quy ước trong bộ test chung.</td>
</tr>
<tr>
<td><strong>PH-S3-G03-AI</strong><br>Công cụ: claude -p (Claude Code CLI 2.1.308), claude-sonnet-5-5<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Yêu cầu Claude sinh assertion cho cùng 30 mutant Auth và xác minh<br>Nguồn prompt: <a href="../experiments/s3/runs/Phuc_Hoang/G03-ai/prompt.txt">prompt.txt</a> (27 KB, verbatim)</td>
<td>Một file đề xuất gồm 12 test cùng phân tích theo từng mutant. Khi chưa sửa, 38/38 test pass trên code gốc; run cho Killed 78, Timeout 27, Survived 12, NoCoverage 0 (score 89.74%), nhưng các mutant 133-136 chỉ bị kill bởi test.failing khẳng định bug role đã biết không tồn tại. Sau review: 37/37 pass, Killed 74, Timeout 27, Survived 13, NoCoverage 3, RuntimeError 8; score 86.32% = 101/117; assertion kill rate 63.25%. Tổng kết của Claude nói 17 mutant có test và 13 không có; phân chia thực tế là 18 và 12.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Phuc_Hoang/G03-ai/raw_result.md">raw result</a>, <a href="../experiments/s3/runs/Phuc_Hoang/G03-ai/kill_mapping.md">kill mapping</a></td>
<td>INCOMPLETE</td>
<td>Trên cùng 30 mutant, file AI đã review kill 14 và file manual kill 23; 13 kill chung, một kill (đúng thời điểm hết khóa) chỉ có ở AI và mười mutant body/message chỉ có ở manual vì Claude từ chối assert nội dung mà đặc tả không cho. Phân tích AI về bộ đếm +2 và nhánh role khớp các lần kiểm tra manual. Test đề xuất dùng test.failing bị loại vì tính mutant sửa bug thành một kill. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo các giới hạn này cùng kết quả.</td>
<td>Đổi nhãn AI-L03 thành một cách diễn giải (đặc tả không quy định thời điểm hết hạn chính xác), loại test.failing và imports không dùng; xem <a href="../experiments/s3/runs/Phuc_Hoang/G03-ai/human-edits.diff">human-edits.diff</a>.</td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     | 7 | 100.00% |
| VALID (đúng, dùng nguyên)          | 4 | 57.14% |
| INVALID (sai; loại bỏ)             | 0 | 0.00% |
| INCOMPLETE (chấp nhận sau khi sửa) | 3 | 42.86% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

AI hỗ trợ tập hợp nghiên cứu equivalent mutant, ví dụ sandbox, tests Auth và phân tích mutation tạm thời. Tutorial biên cho thấy đề xuất hữu ích khi đặc tả nêu kết quả kỳ vọng rõ ràng. Các bản sửa nghiên cứu cho thấy rủi ro ngược lại: giải thích được sinh có thể bỏ sót requirement sẵn có hoặc đếm sai thay đổi trạng thái. Lỗi xác thực, SQLite native và timeout cũng cho thấy điều kiện thực thi ảnh hưởng ý nghĩa báo cáo. Tôi sẽ giữ output gốc, đối chiếu từng claim với nguồn và ghép mutant signatures giữa các run. Equivalent candidate cần miền đầu vào rõ và lập luận hợp lý. Mutation score không đủ để xác định oracle đúng, chứng minh tương đương hay xác nhận assertion gây fail. Cần nêu source gốc, tests được chọn và điều kiện runtime khi diễn giải dữ liệu Auth tạm thời.

## 6. Mandatory Disclosure (dán nguyên văn)

> *"Bộ artifact có AI hỗ trợ được liệt kê ở Mục 3 này được sinh phiên bản đầu bởi Claude Code 2.1.292 với Claude Opus 5.5; Claude CLI với claude-sonnet-5-5; Claude Code với Claude Sonnet 5.5; tôi đã rà soát và chỉnh sửa scope nghiên cứu được yêu cầu và quy trình A03/B03 kết hợp, bổ sung hướng dẫn phân biệt các quan sát sandbox với SUT; các yêu cầu task và quyết định gộp A03 với B03 do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

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
