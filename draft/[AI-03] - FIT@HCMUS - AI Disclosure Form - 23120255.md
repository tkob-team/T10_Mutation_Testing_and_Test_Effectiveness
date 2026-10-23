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
| Họ tên sinh viên: | Lê Tấn Hiệp |
| MSSV:             | 23120255 |

## 2. Câu hỏi Khai báo

### 1. Công cụ AI đã dùng:

*Liệt kê mọi công cụ AI dùng cho bài tập này (ví dụ AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

Tôi đã dùng Claude trên claude.ai với Claude Sonnet 4.6 cho các lượt nghiên cứu ban đầu và Claude Opus 5.5 cho các lượt nghiên cứu, phân tích sau đó ở S3. Ở S4, tôi dùng Claude trên claude.ai với Claude Sonnet 5.5 để soạn guide, report và kịch bản demo phần Cart & Orders. Tôi cũng dùng Claude Code với Claude Opus 5.5 cho các tác vụ repository và test bằng script ở S3, và ở S4 để chạy lại guide, ghép User Guide và kiểm chứng. [Phiếu AI cá nhân](../ai-audit/AI_Record_Tan_Hiep.md).

### 2. Giai đoạn nào của bài tập có dùng AI:

*Tick tất cả: [ ] brainstorm [ ] outline [ ] viết nháp [ ] phản hồi [ ] sửa chữa [ ] code [ ] phân tích dữ liệu [ ] thiết kế đồ hoạ [ ] khác (ghi rõ).*

S3: nghiên cứu, lập dàn ý, viết nháp, phản hồi, chỉnh sửa, lập trình và phân tích dữ liệu. Claude hỗ trợ chuẩn bị ghi chú công cụ, assertion cho tutorial, test/harness Cart, hướng dẫn chạy và diễn giải kết quả. Tôi đã tự thực thi các lệnh tutorial C01; các bản ghi lệnh -cc về sau xác định Claude Code là bên thực thi.

S4: viết nháp và dịch (guide, report, kịch bản demo, ghép User Guide), chạy lệnh và kiểm chứng (Claude Code chạy lại guide Cart, Coupons và lệnh demo), phân tích dữ liệu (script đếm `mutation.json`, kiểm số liệu của guide), sửa chữa và phản hồi (hoàn thiện User Guide theo feedback reproduction, Verification Notes).

### 3. Prompt / nhiệm vụ chính cho AI:

*Dán nguyên văn 2–3 prompt quan trọng nhất. Để xem đầy đủ, đính kèm Phụ lục A (prompt_log.md).*

Prompt và output đầy đủ, nguyên văn: [Transcript claude.ai nguyên văn](../ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md); [Transcript Claude Code nguyên văn](../ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md).

Prompt nguyên văn yêu cầu sửa workspace:

~~~text
Có gì đó sai sai ở đây, mình không hề sử dụng ở thư mục ngày. Mình đặt hết vào thư mục cha là: "Repo". Không biết cần thay đổi gì không
~~~

Prompt nguyên văn về tổ chức quy trình AI:

~~~text
hiện tại 2 skill test-design-istqb và qa-evidence-review có vẻ không liên quan nhiều về mutation testing lắm nhỉ, nên mình muốn viết thêm 1 skill để dùng cho cả claude.ai và Claude Code. Còn vì giờ sử dụng thêm Claude Code, nên sẽ viết các skills, CLAUDE.md cần thiết nhé.
---
Đúng là không coi run của Claude Code là mình tự chạy, vì sau cùng mình cũng sẽ chạy lại hết. Để còn hiểu sâu hơn và demo thuyết trình trên lớp nữa
~~~

Prompt về survivor trong tutorial và các assertion được sinh được giữ nguyên văn tại [Prompt/output nguyên văn và audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01).

Prompt nguyên văn S4 ghép User Guide (Claude Code; log đầy đủ: [Transcript Claude Code S4 nguyên văn](../ai-audit/evidence/s4/Tan_Hiep/claude-code_prompt_log.md)):

~~~text
S4-E01: ghép materials/s4/User_Guide.md (thay bản copy hiện có) từ Guide_Contribution_Tan_Hiep.md, Guide_Contribution_Thai_Hoa.md (English) và Guide_Contribution_Phuc_Hoang.md (English). Ngôn ngữ chung: TIẾNG VIỆT, giữ nguyên English technical terms, lệnh, tên file, tiêu đề mục chuẩn (Introduction, Installation, First Test, Advanced Usage, Troubleshooting, Failure Modes, References).
Quy tắc: (a) chỉ dịch phần văn xuôi; KHÔNG đổi lệnh, số liệu, đường dẫn, mã mutant; (b) giữ nguyên trạng thái Observed/Suggested; (c) trước khi ghép, so base repo/commit/Node/npm và cách Install của ba guide, rồi viết 1 phần Install chung + "Setup riêng" cho domain nào khác; nếu ba guide mâu thuẫn mà không tự dung hòa được thì KHÔNG đoán, ghi vào mục "Cần quyết định" ở đầu file; (d) gộp Troubleshooting và Failure Modes, bỏ trùng, giữ mọi lỗi có evidence; (e) đưa các feedback từ Guide_Reproduction_Tan_Hiep.md/Thai_Hoa.md vào danh sách "Việc tác giả cần sửa" trong ghi chú đầu file, không tự sửa nội dung của tác giả khác; (f) ghi chú đầu file nêu: bản ghép bằng Claude Code (Opus 5.5), cần Tấn Hiệp review, và phần nào do ai viết.
Thêm khối AI-S4-E01-01 vào ai-audit/AI_Record_Tan_Hiep.md (verdict "ĐỀ XUẤT: ..." và Student Fix "(điền sau review)"). Báo: số section, các điểm mâu thuẫn, các chỗ dịch thấy mơ hồ.
~~~

### 4. Phần cụ thể AI đóng góp:

*Càng cụ thể càng tốt. Ví dụ: 'AI sinh TC01–TC15 ở Mục 3.2; tôi viết lại TC04 và TC11; AI KHÔNG đóng góp vào Mục 1, 2, 4, hoặc AI Critique.'*

AI đóng góp các bản nháp ghi chú nghiên cứu, các test Jest đề xuất cho tutorial, harness/baseline/test defect của Cart, hướng dẫn báo cáo run, đề xuất Git ignore và công cụ ghi prompt log. AI sinh năm test AI cho Cart. Bộ test manual và bộ năm test AI là hai tập khác nhau; tổng số 44 so với 41 test không phải cùng ngân sách test. Phiếu nguồn liệt kê từng artifact và các thay đổi của nó.

S4: Claude (Sonnet 5.5) soạn bản nháp Guide, Report và Demo contribution phần Cart & Orders. Claude Code (Opus 5.5) chạy lại guide (F01a, F01c, D01-1-cc, C01-rehearsal-cc), soạn khối lệnh để tôi tự chạy D01-1, ghép và hoàn thiện `materials/s4/User_Guide.md` (dịch phần Coupons và Auth), viết Verification Notes và script kiểm số liệu. Danh sách đủ 9 artifact S4 nằm trong phiếu nguồn.

### 5. Cách tôi rà soát / chỉnh sửa / xác minh đầu ra AI:

*Mô tả phương pháp xác minh (chạy test, kiểm tra spec, hỏi TA, tra RFC, đối chiếu ISTQB syllabus, v.v.).*

Tôi kiểm tra các nguồn nghiên cứu, tính giá trị kỳ vọng cho tutorial và chạy các lệnh C01 weak/strong/AI trên máy của mình. Tôi sửa phần diễn giải SRS bị thiếu và các giả định về workspace. Các run Claude Code về sau được kiểm tra qua báo cáo và thông tin quy kết mutant; chúng được ghi nhận là Agent thực thi. Các assertion G01 được giữ lại, còn những chú thích gây hiểu nhầm về review/phiên làm việc sạch được sửa. Phần diễn giải cuối cho sáu target tách oracle suy ra từ implementation khỏi các quy tắc SRS.

S4: tôi tự chạy lại walkthrough Coupons theo guide của Hòa (D01-1) trên máy mình và ghi NOTES; kết quả có 0 mutant khác run D01-1-cc. Tôi đọc REPORT và `console.log` của các run -cc (F01a, F01c, D01-1-cc, C01-rehearsal-cc) và so với guide. Tôi chạy lệnh kiểm SHA-256 của candidate G02, kết quả khớp `executed-sha256.json`. Tôi duyệt verdict và Student Fix của từng artifact S4 trong phiếu nguồn.

### 6. Trích dẫn (nếu môn yêu cầu):

*Môn Kiểm chứng Phần mềm dùng phong cách IEEE. Ví dụ: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https://claude.ai*

[1] Anthropic, "Claude," Claude Sonnet 4.6, Claude Sonnet 5.5 và Claude Opus 5.5, claude.ai, sử dụng từ 2026-10-16 đến 2026-10-23. [Claude](https://claude.ai).

[2] Anthropic, "Claude Code," Claude Opus 5.5, CLI. [Tài liệu](https://code.claude.com/docs/en/overview).

## 3. Cam đoan Trung thực

*Bằng việc ký tên dưới đây, tôi cam đoan thông tin khai báo ở trên là chính xác và đầy đủ. Tôi hiểu rằng việc không khai báo hoặc khai báo sai lệch về việc dùng AI sẽ bị coi là vi phạm liêm chính học thuật và có thể dẫn đến điểm 0 cho bài tập cùng việc bị chuyển lên hội đồng kỷ luật.*

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
