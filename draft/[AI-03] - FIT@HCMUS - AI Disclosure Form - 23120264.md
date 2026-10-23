<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
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
| Họ tên sinh viên: | Nguyễn Phúc Hoàng |
| MSSV:             | 23120264 |

## 2. Câu hỏi Khai báo

### 1. Công cụ AI đã dùng:

*Liệt kê mọi công cụ AI dùng cho bài tập này (ví dụ AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

Tôi dùng Claude Code 2.1.292 với Claude Opus 5.5 cho nghiên cứu, code sandbox và tài liệu. Yêu cầu assertion C03 thành công dùng model Claude CLI claude-sonnet-5-5. Run baseline S3-E03 trên commit chung dùng Claude Code với Claude Sonnet 5.5. Một bản nháp skill hỗ trợ S3 (`s3-experiment`) cũng được tạo bằng Claude Code và Claude Opus 5.5; bản này được giữ làm evidence và không dùng cho bất kỳ kết quả đã nộp nào. Các lần thử xác thực và yêu cầu model thành công được phân biệt trong experiment log. [Phiếu AI cá nhân](../ai-audit/AI_Record_Phuc_Hoang.md).

### 2. Giai đoạn nào của bài tập có dùng AI:

*Tick tất cả: [ ] brainstorm [ ] outline [ ] viết nháp [ ] phản hồi [ ] sửa chữa [ ] code [ ] phân tích dữ liệu [ ] thiết kế đồ hoạ [ ] khác (ghi rõ).*

S3: nghiên cứu, brainstorm, lập dàn ý, lập trình, viết nháp, chỉnh sửa và phân tích dữ liệu. Công việc gồm equivalent mutants, giới hạn công cụ, ví dụ sandbox, bộ test AI đề xuất cho biên tuổi, tests Auth, một run mutation Auth tạm thời và run mutation Auth trên commit baseline chung. Tôi cung cấp scope task, chọn gộp A03/B03 và yêu cầu giữ nguồn cùng transcript.

### 3. Prompt / nhiệm vụ chính cho AI:

*Dán nguyên văn 2–3 prompt quan trọng nhất. Để xem đầy đủ, đính kèm Phụ lục A (prompt_log.md).*

Prompt nghiên cứu đầy đủ, nguyên văn, gồm nội dung task gốc: [Transcript nguyên văn](../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md).

Yêu cầu cuối nguyên văn từ Turn 1:

~~~text
Hãy đọc repo và lên plan thực hiện những công việc cần làm để hoàn thành được task này
~~~

Prompt thứ hai yêu cầu ghi chú B03 kết hợp, thực thi sandbox, dùng SUT được cung cấp và ghi cả input lẫn output. Toàn bộ câu chữ gốc được giữ trong transcript liên kết. Prompt assertion C03 thực tế được giữ nguyên, không tái dựng, tại [Prompt C03 nguyên văn](../experiments/s3/runs/Phuc_Hoang/C03-claude/prompt.txt).

### 4. Phần cụ thể AI đóng góp:

*Càng cụ thể càng tốt. Ví dụ: 'AI sinh TC01–TC15 ở Mục 3.2; tôi viết lại TC04 và TC11; AI KHÔNG đóng góp vào Mục 1, 2, 4, hoặc AI Critique.'*

AI đóng góp bản nháp ghi chú nghiên cứu, danh mục nguồn, ví dụ/tests/harness sandbox, phân tích mutation và assertion tutorial được sinh. Bàn giao Auth đã lưu gồm 26 baseline test pass và 23 case defect riêng. Baseline tạm thời là tập dữ liệu riêng với run Agent chạy lại trên baseline chung về sau. Phiếu nguồn phân biệt các yêu cầu task và lựa chọn scope của tôi với code do Agent tạo.

### 5. Cách tôi rà soát / chỉnh sửa / xác minh đầu ra AI:

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, hỏi TA, tra RFC, đối chiếu ISTQB syllabus, v.v.).*

Quy trình đã ghi nhận đối chiếu nguồn, thực thi Jest/Stryker, ghép từng mutant và lưu output gốc. Các kiểm tra đó gồm sửa số lần chuyển Killed-to-Timeout từ hai thành ba và quy tắc khóa SRS FR-02. Bộ test đề xuất C03 pass trên code gốc và kill mutant biên tuổi được chọn. Phần giải thích tùy chọn về mutation hằng số số học không phải evidence của mutant Stryker được cấu hình thực tế. Điều kiện test OTP 24 giờ được xem là giả định. Với run baseline chung, tôi đối chiếu từng mutant giữa hai run Stryker và run Windows trên baseline chung, đồng thời kiểm tra các file production không thay đổi.

### 6. Trích dẫn (nếu môn yêu cầu):

*Môn Kiểm chứng Phần mềm dùng phong cách IEEE. Ví dụ: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https://claude.ai*

[1] Anthropic, "Claude Code," v2.1.292, Claude Opus 5.5, sử dụng ngày 2026-10-19. [Tài liệu](https://code.claude.com/docs/en/overview).

[2] Anthropic, "Claude," CLI model claude-sonnet-5-5, sử dụng ngày 2026-10-22. [Claude](https://claude.ai).

[3] Anthropic, "Claude Code," Claude Sonnet 5.5 (claude-sonnet-5-5), sử dụng ngày 2026-10-23. [Tài liệu](https://code.claude.com/docs/en/overview).

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
