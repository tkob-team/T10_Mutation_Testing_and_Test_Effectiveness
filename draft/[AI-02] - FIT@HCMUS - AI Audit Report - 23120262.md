**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục                              | Giá trị              |
|----------------------------------|----------------------|
| Họ tên sinh viên (in hoa):       | TỐNG DƯƠNG THÁI HÒA |
| MSSV:                            | 23120262 |
| Mã bài tập (ví dụ HW#00, HW#02): | Seminar T10, Nhóm 12 |
| Ngày làm bài:                    | 2026-10-18 đến 2026-10-23 (công việc đã ghi nhận) |
| Công cụ AI đã dùng:              | OpenAI Codex AI Agent |
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
<td><strong>TH-S3-RESEARCH-01</strong><br>Công cụ: OpenAI Codex<br>Ngày ghi nhận: 2026-10-18<br>Nhiệm vụ: Nghiên cứu coverage, metrics và assertions<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01">Request and working-artifact provenance</a></td>
<td>Research Notes đang làm việc cho S3-A02/B02 tổng hợp nguồn công cụ chính thức, phép tính và ví dụ. Tài liệu đã lưu là artifact làm việc đã sửa; phiếu nguồn xác định yêu cầu nghiên cứu ban đầu.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01">Request and working-artifact provenance</a></td>
<td>INCOMPLETE</td>
<td>Audit phân biệt ghi chú đang làm việc với output được sinh bất biến, đồng thời phân biệt kiểm tra source với thực thi. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ truy vết. Phiếu đã lưu không cung cấp snapshot output đầu tiên không thay đổi cho artifact nghiên cứu này.</td>
<td></td>
</tr>
<tr>
<td><strong>TH-S3-C02D02-01</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-22<br>Nhiệm vụ: Chuẩn bị tests Coupons và tutorial<br>Nguồn prompt: <a href="../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md">Instruction and generation provenance</a></td>
<td>Bàn giao ban đầu gồm 25 baseline test pass, 16 assertion fail riêng do defect gốc, fixtures dùng SQLite thật được cô lập và bộ test tutorial đề xuất kill mutant biên được chọn. Đây là số đếm bàn giao ban đầu, không phải số đếm tích hợp đã freeze về sau.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md">Instruction and generation provenance</a></td>
<td>VALID</td>
<td>Việc thực thi giữ nguyên source/database production, tách baseline khỏi defect và kiểm tra target tutorial bằng mutant mapping thực tế. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 4.2.2</a> áp dụng cho kịch bản biên; các profile test tutorial và EShop vẫn được tách riêng.</td>
<td></td>
</tr>
<tr>
<td><strong>TH-S3-D04H02-01</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Tích hợp baseline và so sánh các biến thể Coupons<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-d04h02-01">Inputs, outputs and verification</a></td>
<td>Baseline đã freeze 806ba19 có 88 test pass và 54 case defect riêng. Baseline Coupons có 39 Killed, 21 Timeout, 30 Survived, 25 NoCoverage và 5 RuntimeError. Biến thể phân tích manual và biến thể AI ban đầu mỗi bên thêm hai kill; cả hai dùng cùng production/configuration.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-d04h02-01">Inputs, outputs and verification</a></td>
<td>VALID</td>
<td>Các mapping JSON khớp 120 signatures. Chỉ các mutant usage-limit 111/113 chuyển thành Killed ở mỗi biến thể. Timeout được báo riêng, và việc sinh bằng Codex dùng cùng context được công bố. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> cung cấp tham chiếu truy vết; số đếm tuân theo định nghĩa metric của Stryker.</td>
<td>Phiếu nguồn nêu rõ phương án thay thế bằng Codex và phép so sánh dùng cùng context, thay vì claim một thực nghiệm độc lập giữa con người và AI.</td>
</tr>
<tr>
<td><strong>TH-S3-SUMMARY-01</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Giải thích Stage 3 cho mọi thành viên<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-summary-01">Retained request and revision record</a></td>
<td>Stage3-Sumary.md giải thích baseline, tests, defects, kết quả manual/AI và công việc còn lại theo domain. Báo cáo dùng kết quả sẵn có thay vì một thực nghiệm mới.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-summary-01">Retained request and revision record</a></td>
<td>INCOMPLETE</td>
<td>Bản nháp giải thích đầu tiên tập trung vào Coupons; bản sửa được yêu cầu tách đóng góp của ba thành viên và liên kết từng kết quả với nguồn phù hợp. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo kết quả test dễ hiểu.</td>
<td>Yêu cầu bản tổng hợp chung có mục riêng cho từng thành viên và giải thích rõ hơn các assertion manual.</td>
</tr>
<tr>
<td><strong>TH-S3-COUPONS-EXTENSION-01</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Mở rộng các tập test Coupons manual và Agent<br>Nguồn prompt: <a href="../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md">Verbatim request and source snapshots</a></td>
<td>Bốn nhóm manual mới và tám nhóm Agent được triển khai, tái dùng bốn nhóm chung. Các profile trên code gốc pass 35 test manual và 40 test Agent; tích hợp vẫn 88 pass. Mỗi profile mutation ghi nhận 41 Killed, 21 Timeout, 28 Survived, 25 NoCoverage và 5 RuntimeError.<br>Nguồn output gốc: <a href="../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md">Verbatim request and source snapshots</a></td>
<td>VALID</td>
<td>Metadata hoàn chỉnh, hashes được bảo vệ và so sánh signatures hỗ trợ kết quả trong scope. Các test case bổ sung không thêm kill ngoài hai kill ban đầu. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 1.4.4</a> hỗ trợ ánh xạ kịch bản test về cơ sở của chúng. Tập Agent lớn hơn không chứng minh model vượt trội.</td>
<td>Chỉ định bốn phần bổ sung cho tập manual và toàn bộ tám phần cho tập Agent; giữ các case đã có và ghi rõ nguồn đóng góp của helper dùng chung.</td>
</tr>
<tr>
<td><strong>TH-S4-REPORT-REVISION-01</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Mở rộng và chuẩn hóa Seminar Report<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-report-revision-01">Report revision and verification record</a></td>
<td>Bản sửa báo cáo bổ sung số đếm baseline và biến thể đã xác minh, case survivor cụ thể, diễn giải và giới hạn. Bản sửa đơn giản hóa bìa, giữ thuật ngữ kỹ thuật tiếng Anh và thay danh sách đường dẫn bằng phụ lục văn bản/URL.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-report-revision-01">Report revision and verification record</a></td>
<td>INCOMPLETE</td>
<td>Khung ban đầu cần kết quả thực tế và cách trình bày rõ hơn. Tài liệu đã sửa tính lại metrics từ JSON đã lưu, đồng thời phân biệt so sánh ban đầu với các phần mở rộng. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> là tham chiếu báo cáo test. Đây là kiểm tra tài liệu, không phải run SUT mới.</td>
<td>Yêu cầu bìa đơn giản hơn, thuật ngữ tiếng Anh, hoàn thiện các phần có dữ liệu thực tế và bỏ danh sách đường dẫn evidence trong phụ lục.</td>
</tr>
<tr>
<td><strong>TH-S4-USERGUIDE-20261023</strong><br>Công cụ: OpenAI Codex AI Agent<br>Ngày ghi nhận: 2026-10-23<br>Nhiệm vụ: Chuẩn bị User Guide độc lập<br>Nguồn prompt: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-userguide-20261023">Guide changes and validation record</a></td>
<td>Guide có tám mục, lệnh cụ thể và năm dạng lỗi đã quan sát. Bản sửa độc lập đưa các giải thích thiết yếu vào tài liệu và bỏ phụ thuộc vào các tài liệu cùng cấp. Các kiểm tra tài liệu xác minh anchors, tên script và cú pháp code block.<br>Nguồn output gốc: <a href="../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-userguide-20261023">Guide changes and validation record</a></td>
<td>INCOMPLETE</td>
<td>Bản nháp trước cần được sửa thành một file để đáp ứng yêu cầu bàn giao. Số đếm lịch sử được đối chiếu với inputs đã lưu; kiểm tra tài liệu không thay cho cài đặt mới hoặc teammate thực thi. <a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, 5.3.2</a> hỗ trợ báo cáo rõ giới hạn của việc xác minh.</td>
<td>Yêu cầu tài liệu độc lập, đưa tóm tắt tham chiếu project vào nội dung và bỏ phụ thuộc vào file tương đối cùng dấu câu bị cấm.</td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     | 7 | 100.00% |
| VALID (đúng, dùng nguyên)          | 3 | 42.86% |
| INVALID (sai; loại bỏ)             | 0 | 0.00% |
| INCOMPLETE (chấp nhận sau khi sửa) | 4 | 57.14% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

AI hỗ trợ nghiên cứu, test Coupons, tích hợp, phân tích kết quả và tài liệu. Giá trị rõ nhất khi công việc gắn với source revision đã freeze, quy tắc nghiệp vụ rõ ràng và dữ liệu thực thi đã lưu. Hai biến thể Coupons ban đầu kill cùng hai mutant usage-limit; các phần mở rộng lớn hơn thêm test nhưng không thêm kill. Vì vậy, mutant mapping thực tế cung cấp nhiều thông tin hơn số test. Giới hạn chính là context sinh dùng chung, defect production sẵn có và sự khác biệt giữa tài liệu đã sửa với output gốc bất biến. Tôi sẽ dùng AI đề xuất cụ thể và thực thi tái lập, rồi kiểm tra nguồn oracle, số đếm và scope. Tôi không dùng kết quả này để xếp hạng model hoặc claim thực nghiệm độc lập giữa con người và AI.

## 6. Mandatory Disclosure (dán nguyên văn)

> *"Bộ artifact có AI hỗ trợ được liệt kê ở Mục 3 này được sinh phiên bản đầu bởi OpenAI Codex AI Agent; tôi đã rà soát và chỉnh sửa scope và ràng buộc trình bày được yêu cầu cho các bản so sánh Coupons và tài liệu, bổ sung các kịch bản chọn coupon, biên được lưu vào dữ liệu và cô lập usage theo yêu cầu; các yêu cầu task và hướng dẫn scope bốn/tám nhóm cho các tập test do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

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
