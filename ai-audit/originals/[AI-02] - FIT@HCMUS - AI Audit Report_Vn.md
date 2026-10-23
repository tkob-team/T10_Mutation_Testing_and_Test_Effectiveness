**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC13003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục                              | Giá trị              |
|----------------------------------|----------------------|
| Họ tên sinh viên (in hoa):       |                      |
| MSSV:                            |                      |
| Lớp / Khoá:                      |                      |
| Mã bài tập (ví dụ HW#00, HW#02): |                      |
| Ngày làm bài:                    |                      |
| Công cụ AI đã dùng:              |                      |
| Công cụ AI đã dùng:              | [ ] Có [ ] Không |

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
<tr class="odd">
<td>Mẫu (italic) — thay trước khi nộp:</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Tool: AI Tool (e.g., ChatGPT, Claude, Gemini)<br />
Thời gian: 14:32 25/02/2026<br />
Prompt:<br />
"Sinh test case cho hàm parsePhoneNumberVN…"</td>
<td>TC01: parsePhoneNumberVN("0912345678")<br />
Kỳ vọng: {prefix:84, number:912345678, valid:true}<br />
…</td>
<td>INCOMPLETE</td>
<td>AI bỏ qua định dạng RFC 3966. ISTQB FL §4.3 Boundary Value Analysis yêu cầu test ranh giới định dạng.</td>
<td>Thêm TC: parsePhoneNumberVN("+84-91-234-5678")<br />
Kỳ vọng: {prefix:84, number:912345678, valid:true}</td>
</tr>
<tr class="odd">
<td>Artifact #1</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Artifact #2</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Artifact #3</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Artifact #4</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Artifact #5</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Artifact #6</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Artifact #7</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Artifact #8</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Artifact #9</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Artifact #10</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     |          |       |
| VALID (đúng, dùng nguyên)          |          | %     |
| INVALID (sai; loại bỏ)             |          | %     |
| INCOMPLETE (chấp nhận sau khi sửa) |          | %     |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## 6. Mandatory Disclosure (dán nguyên văn)

> *"\[Test case / script / dataset / báo cáo\] này được sinh phiên bản đầu bởi \[tên công cụ AI\]; tôi đã rà soát và chỉnh sửa \[phần X\], bổ sung \[edge case Y, Z\]; \[phần W\] do tôi tự viết. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

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
