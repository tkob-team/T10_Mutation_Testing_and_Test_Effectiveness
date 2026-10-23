**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC15003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# Biểu mẫu Khai báo Sử dụng AI

*Đính kèm cho mọi bài tập có dùng AI ở bất kỳ mức nào.*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm.*

## 1. Thông tin Môn học & Sinh viên

| Mục               | Giá trị                                |
|-------------------|----------------------------------------|
| Môn học:          | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Mã bài tập:       | Seminar T10, Nhóm 12 |
| Tên bài tập:      | T10: Mutation Testing & Test Effectiveness |
| Cấp độ AI (1–5):  | Cấp 5 |
| Họ tên sinh viên: | Tống Dương Thái Hòa |
| MSSV:             | 23120262 |

## 2. Câu hỏi Khai báo

### 1. Công cụ AI đã dùng:

*Liệt kê mọi công cụ AI dùng cho bài tập này (ví dụ AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

Tôi dùng OpenAI Codex AI Agent cho nghiên cứu, test Coupons, tích hợp, chạy mutation, phân tích và soạn tài liệu. Phiếu ghi nhận Codex; phiếu không xác định phiên bản model phục vụ chính xác. Một yêu cầu Claude CLI riêng thất bại ở bước xác thực và không sinh ra bộ test Coupons đã được thực thi. [Phiếu AI cá nhân](../ai-audit/AI_Record_Thai_Hoa.md).

### 2. Giai đoạn nào của bài tập có dùng AI:

*Tick tất cả: [ ] brainstorm [ ] outline [ ] viết nháp [ ] phản hồi [ ] sửa chữa [ ] code [ ] phân tích dữ liệu [ ] thiết kế đồ hoạ [ ] khác (ghi rõ).*

S3 và S4: nghiên cứu, lập dàn ý, viết nháp, phản hồi, chỉnh sửa, lập trình và phân tích dữ liệu. Công việc đã ghi nhận gồm baseline chung, các bản so sánh/mở rộng Coupons, phần giải thích Stage 3 cho ba người, các bản sửa Seminar Report và User Guide. Các bản ghi xác định Agent là bên thực thi những lệnh test/mutation đã lưu.

### 3. Prompt / nhiệm vụ chính cho AI:

*Dán nguyên văn 2–3 prompt quan trọng nhất. Để xem đầy đủ, đính kèm Phụ lục A (prompt_log.md).*

Yêu cầu nghiên cứu nguyên văn:

~~~text
Giờ làm tasks nghiên cứu trước đi, hãy làm thật rõ ràng chi tiết nhưng dễ hiểu, explain like im 10 vậy
~~~

Lựa chọn công cụ sinh nội dung nguyên văn:

~~~text
Dùng Codex và công bố cùng context
~~~

Yêu cầu mở rộng Coupons nguyên văn:

~~~text
chia ra 4 cái trên thì thêm vào phần manual của t, 8 phần dưới là phần agent đề xuất, nhớ agent gom đủ bộ luôn 4 cái trước theo yêu cầu nha.
~~~

Nguồn: [Yêu cầu nghiên cứu](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01); [Nguồn gốc quá trình sinh](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md); [Yêu cầu mở rộng](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md).

### 4. Phần cụ thể AI đóng góp:

*Càng cụ thể càng tốt. Ví dụ: 'AI sinh TC01–TC15 ở Mục 3.2; tôi viết lại TC04 và TC11; AI KHÔNG đóng góp vào Mục 1, 2, 4, hoặc AI Critique.'*

AI đóng góp fixtures/tests Coupons, bản tích hợp đã freeze và báo cáo thực nghiệm, các bộ test đề xuất ban đầu cho phân tích manual và AI, helpers/tập test mở rộng, phân tích survivor và tài liệu. Tôi chỉ định cách chia bốn/tám nhóm mở rộng, lựa chọn Codex dùng cùng context, bố cục báo cáo và yêu cầu guide độc lập. Tập phân tích manual có AI hỗ trợ; tập này không được trình bày là do con người viết độc lập.

### 5. Cách tôi rà soát / chỉnh sửa / xác minh đầu ra AI:

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, hỏi TA, tra RFC, đối chiếu ISTQB syllabus, v.v.).*

Quy trình xác minh đã lưu dùng SRS/API, chạy test trên code gốc, test defect riêng, source hashes, mutant signatures và số đếm từ JSON gốc. Codex thực thi các kiểm tra đó. Tôi yêu cầu sửa scope và cách trình bày, gồm bản tổng hợp ba người, bìa/phụ lục báo cáo và guide độc lập. Evidence giữ lại 88 test tích hợp pass, các test defect fail riêng và sự khác biệt giữa Timeout với kill do assertion.

### 6. Trích dẫn (nếu môn yêu cầu):

*Môn Kiểm chứng Phần mềm dùng phong cách IEEE. Ví dụ: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https://claude.ai*

[1] OpenAI, "Codex," AI coding agent, sử dụng từ 2026-10-18 đến 2026-10-23. [Codex](https://openai.com/codex/). Danh tính công cụ được ghi nhận; không khẳng định phiên bản model phục vụ chính xác.

## 3. Cam đoan Trung thực

*Bằng việc ký tên dưới đây, tôi cam đoan thông tin khai báo ở trên là chính xác và đầy đủ. Tôi hiểu rằng việc không khai báo hoặc khai báo sai lệch về việc dùng AI sẽ bị coi là vi phạm liêm chính học thuật và có thể dẫn đến điểm 0 cho bài tập cùng việc bị chuyển lên hội đồng kỷ luật.*

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
