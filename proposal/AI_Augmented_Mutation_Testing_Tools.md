# T10 — AI-Augmented Mutation Testing Tools

Khảo sát & Xếp hạng công cụ — chủ đề T10: Mutation Testing & Test Effectiveness

*Cập nhật: 28/09/2026 · Dữ liệu tra cứu qua web search, đối chiếu với trang/tài liệu chính thức của từng tool*

## 1. Giới thiệu

Tài liệu tổng hợp các công cụ và hướng tiếp cận AI-augmented cho mutation testing, phục vụ seminar T10 (Mutation Testing & Test Effectiveness). Nội dung gồm: bảng xếp hạng theo 5 tiêu chí của proposal S1 (licence cost, learning curve, EShop fit, AI capability, community), chi tiết từng tool, các nghiên cứu liên quan tới equivalent mutant detection, và danh sách nguồn tham khảo đầy đủ.

Lưu ý: điểm số 1–5 (5 = tốt nhất) trong bảng xếp hạng là đánh giá chủ quan dựa trên dữ liệu đã tra cứu ngày 28/09/2026, trọng số các tiêu chí bằng nhau. Một số chi tiết (license của vài công cụ bên thứ ba, số liệu MutGen) chưa được xác minh đầy đủ và đã ghi chú rõ trong phần tương ứng.

## 2. Bảng xếp hạng tổng quan

| Hạng | Tool / hướng | Loại | Tổng /25 |
| :---: | --- | --- | :---: |
| 1 | **Chat LLM (Claude/ChatGPT/Gemini) + báo cáo Stryker** | AI hội thoại + tool truyền thống | **23** |
| 2 | **AI coding agent (Claude Code, Cursor…) chạy Stryker** | AI agent + tool truyền thống | **20** |
| 3 | **stryker-mcp-reporter** | Plugin MCP bên thứ ba | **17** |
| 4 | **stryker-llm-mutator** | Plugin Stryker bên thứ ba | **16** |
| 5 | **Mutahunter** | Tool mã nguồn mở LLM | **16** |
| 6 | **LLMorpheus** | Nghiên cứu / prototype | **15** |
| 7 | **Pynguin (+ LLM)** | Sinh test tự động Python | **15** |
| 8 | **Diffblue Cover** | AI sinh test thương mại | **14** |
| 9 | **Meta ACH** | Hệ thống nội bộ Meta | **9** |

## 3. Điểm chi tiết theo 5 tiêu chí

| Tool / hướng | Licence cost | Learning curve | EShop fit | AI capability | Community | Tổng /25 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Chat LLM + báo cáo Stryker** | 5 | 5 | 5 | 3 | 5 | **23** |
| **AI coding agent chạy Stryker** | 3 | 4 | 5 | 4 | 4 | **20** |
| **stryker-mcp-reporter** | 4 | 3 | 5 | 4 | 1 | **17** |
| **stryker-llm-mutator** | 4 | 3 | 5 | 3 | 1 | **16** |
| **Mutahunter** | 3 | 3 | 3 | 4 | 3 | **16** |
| **LLMorpheus** | 3 | 2 | 4 | 4 | 2 | **15** |
| **Pynguin (+ LLM)** | 5 | 3 | 1 | 3 | 3 | **15** |
| **Diffblue Cover** | 3 | 3 | 1 | 4 | 3 | **14** |
| **Meta ACH** | 1 | 1 | 1 | 5 | 1 | **9** |

Khuyến nghị cho proposal S1: bộ ba đề xuất là Stryker (công cụ truyền thống) + Chat LLM/coding agent (hướng AI) + Mutahunter hoặc stryker-llm-mutator (phương án dự phòng). Syllabus liệt kê Diffblue cho T10 nhưng công cụ này chỉ hỗ trợ Java, trong khi backend EShop dùng Node.js + Express + SQLite — đây là lý do hợp lệ để đề xuất đổi tool (cần justify ở S1, được duyệt ở S2). Live demo nên có 1 tính năng Stryker (báo cáo HTML) và 1 tính năng AI (xin assertion cho mutant survived, chạy lại Stryker để kiểm chứng).

## 4. Chi tiết từng tool

### 1. Chat LLM (Claude / ChatGPT / Gemini) + báo cáo Stryker

- **Ngôn ngữ / phạm vi:** Bất kỳ ngôn ngữ nào mà Stryker hỗ trợ (JS/TS/Node…)
- **License & chi phí:** Free tier của các chatbot (được phép dùng trong môn học); Stryker mã nguồn mở
- **Trạng thái / cộng đồng:** Rất phổ biến; là hướng brief T10 gợi ý trực tiếp
- **AI làm gì:** Nhận hàm cần test cùng danh sách mutant survived, đề xuất assertion; người dùng tự chạy lại Stryker để kiểm chứng. Đúng mô hình MuTAP: nhắc lại LLM kèm test hiện có và mutant còn sống sót cho tới khi hết mutant hoặc hết ngân sách.
- **Rủi ro / failure mode:** Assertion yếu (chỉ kiểm khác null thay vì giá trị cụ thể); assertion chốt theo hành vi code hiện tại thay vì đúng spec (over-fitting).

**Nguồn:** [https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739](https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739)

### 2. AI coding agent (Claude Code, Cursor…) chạy Stryker

- **Ngôn ngữ / phạm vi:** Bất kỳ stack nào đã cấu hình được Stryker
- **License & chi phí:** Tùy gói của từng công cụ agent (chưa xác minh giá cụ thể)
- **Trạng thái / cộng đồng:** Nhiều bài thực hành công khai (Test Double, alexop.dev)
- **AI làm gì:** Agent tự chạy lệnh (`npx stryker run`), đọc report HTML/JSON, viết test bổ sung, rồi chạy lại để xác nhận điểm.
- **Rủi ro / failure mode:** Điểm agent tự báo cáo có thể sai lệch với thực tế: một thử nghiệm ghi nhận agent báo 96,30% nhưng khi chạy lại độc lập chỉ ra 94,44%. Phù hợp làm công cụ hỗ trợ lúc phát triển hơn là cổng chặn CI.

**Nguồn:** [https://testdouble.com/insights/keep-your-coding-agent-on-task-with-mutation-testing](https://testdouble.com/insights/keep-your-coding-agent-on-task-with-mutation-testing)

### 3. stryker-mcp-reporter

- **Ngôn ngữ / phạm vi:** Dự án dùng Stryker cho JavaScript/TypeScript
- **License & chi phí:** Bên thứ ba, chưa xác minh license
- **Trạng thái / cộng đồng:** Cộng đồng nhỏ; chỉ có listing trên Glama, chưa có số liệu sao/fork độc lập
- **AI làm gì:** Plugin Stryker kết hợp server MCP: phân tích mutant survived theo ngữ cảnh code, sinh assertion TypeScript và test giá trị biên, theo dõi lịch sử mutation score theo thời gian cho AI agent (Claude Desktop, Cursor, Cline…) sử dụng trực tiếp.
- **Rủi ro / failure mode:** Tài liệu chủ yếu là mô tả của chính tác giả; chưa có đánh giá độc lập về độ ổn định hay độ chính xác của assertion sinh ra.

**Nguồn:** [https://glama.ai/mcp/servers/kluth/stryker-mcp-reporter](https://glama.ai/mcp/servers/kluth/stryker-mcp-reporter)

### 4. stryker-llm-mutator

- **Ngôn ngữ / phạm vi:** Dự án dùng Stryker cho JavaScript/TypeScript
- **License & chi phí:** Bên thứ ba, chưa xác minh license; chế độ heuristic mặc định không tốn chi phí LLM
- **Trạng thái / cộng đồng:** Tác giả tự ghi rõ đây là bản "monkeypatch" không chính thức, Stryker không hậu thuẫn
- **AI làm gì:** Sinh thêm mutant bằng LLM bên cạnh 14 operator tất định có sẵn. Provider LLM hiện triển khai: Anthropic Agent SDK (subscription); API key riêng và OpenAI-compatible mới ở mức dự kiến (throw NotImplementedError).
- **Rủi ro / failure mode:** Không chính thức nên có thể hỏng khi Stryker nâng cấp phiên bản; kết quả mutant sinh thêm không so sánh trực tiếp với điểm Stryker chuẩn được.

**Nguồn:** [https://github.com/hughescr/stryker-llm-mutator](https://github.com/hughescr/stryker-llm-mutator)

### 5. Mutahunter

- **Ngôn ngữ / phạm vi:** Đa ngôn ngữ, miễn có báo cáo coverage dạng Cobertura XML, JaCoCo XML hoặc lcov; cần Python 3.11+
- **License & chi phí:** AGPL-3.0 + chi phí gọi API LLM (OpenAI, Anthropic hoặc tự host qua LiteLLM)
- **Trạng thái / cộng đồng:** 298 sao, 26 fork, 126 commit trên GitHub; chưa có bản release chính thức (tại 28/09/2026)
- **AI làm gì:** LLM sinh mutant theo ngữ cảnh (dùng repomap của aider để hiểu toàn bộ repo), tự động phân tích mutant survived để chỉ ra điểm yếu test, hỗ trợ chạy diff-based theo commit/PR. Bộ tự sinh unit test vẫn đang ở giai đoạn phát triển (WIP).
- **Rủi ro / failure mode:** Ví dụ chính thức trong repo hiện chỉ có Java/Maven; một bài đăng cũ của nhóm phát triển nói có ví dụ JS/Python/Go nhưng chưa thấy lại trong repo hiện tại, cần tự thử với Jest/lcov của EShop. Giấy phép AGPL-3.0 cần lưu ý nếu tích hợp vào sản phẩm.

**Nguồn:** [https://github.com/codeintegrity-ai/mutahunter](https://github.com/codeintegrity-ai/mutahunter)

### 6. LLMorpheus

- **Ngôn ngữ / phạm vi:** Gói npm JavaScript/TypeScript — khớp trực tiếp stack EShop
- **License & chi phí:** MIT + chi phí gọi API LLM kiểu OpenAI (cần tự cấu hình endpoint và auth header)
- **Trạng thái / cộng đồng:** 17 sao; repo gốc đã archived ngày 03/02/2025, bản kế thừa tại neu-se/llmorpheus; tự nhận là "research prototype", không hỗ trợ chính thức
- **AI làm gì:** LLM được prompt để đề xuất đoạn code thay cho một PLACEHOLDER trong source, từ đó tạo mutant theo ngữ nghĩa thay vì theo operator cố định. Mutant sinh ra được chạy qua một bản fork riêng của StrykerJS.
- **Rủi ro / failure mode:** Kết quả không tất định giữa các lần chạy (có tùy chọn --replay để tái lập); cài đặt phức tạp hơn Stryker chuẩn vì cần build thêm bản fork StrykerJS.

**Nguồn:** [https://github.com/githubnext/llmorpheus](https://github.com/githubnext/llmorpheus)

### 7. Pynguin (+ LLM)

- **Ngôn ngữ / phạm vi:** Chỉ Python — không chạy trực tiếp trên backend Node.js của EShop
- **License & chi phí:** Dự án học thuật, chưa xác minh license thương mại
- **Trạng thái / cộng đồng:** Dự án học thuật của Đại học Passau (se2p), tài liệu đầy đủ trên ReadTheDocs, có nhiều khóa luận mở rộng
- **AI làm gì:** Hỗ trợ sinh assertion theo hai hướng: dùng LLM trực tiếp, hoặc dùng phân tích mutation (dựa trên bản fork MutPy) để so sánh giá trị trả về giữa mutant và code gốc rồi sinh assertion coi code gốc là ground truth.
- **Rủi ro / failure mode:** Không áp dụng được cho backend Node.js/Express/SQLite của EShop; chỉ hữu ích làm ví dụ khái niệm. Một nghiên cứu so sánh (PolyTest) ghi nhận mutation score của Pynguin thấp hơn đáng kể so với cách tiếp cận LLM khác trên cùng benchmark.

**Nguồn:** [https://pynguin.readthedocs.io/stable/api.html](https://pynguin.readthedocs.io/stable/api.html)

### 8. Diffblue Cover

- **Ngôn ngữ / phạm vi:** Chỉ Java/JVM (plugin IntelliJ, CLI) — không khớp backend Node.js của EShop
- **License & chi phí:** Community Edition miễn phí (tối đa 25 method/tháng); Developer Edition tối đa 100 method/tháng; Testing Agent trả phí từ 1.500 USD cho 5.000 dòng coverage mới
- **Trạng thái / cộng đồng:** Sản phẩm thương mại lâu năm (gốc từ nghiên cứu Đại học Oxford), có forum cộng đồng riêng
- **AI làm gì:** Dùng reinforcement learning (không phải LLM) để sinh test JUnit đảm bảo biên dịch và chạy được, mô tả đúng hành vi hiện có của code.
- **Rủi ro / failure mode:** Test phản ánh hành vi hiện tại của code chứ không phải ý định của lập trình viên, nên có nguy cơ khóa chặt cả bug đang tồn tại. Community Edition cần kết nối internet liên tục để kiểm tra license.

**Nguồn:** [https://cover-docs.diffblue.com/updates-and-upgrades/cover-editions](https://cover-docs.diffblue.com/updates-and-upgrades/cover-editions)

### 9. Meta ACH (Automated Compliance Hardening)

- **Ngôn ngữ / phạm vi:** Triển khai nội bộ Meta trên các lớp Kotlin (Android) — không có bản công khai để dùng cho EShop
- **License & chi phí:** Không có bản phát hành công khai
- **Trạng thái / cộng đồng:** Công bố tại FSE 2025 (industry paper); đã triển khai thử nghiệm trên Facebook, Instagram, WhatsApp và nền tảng wearable của Meta từ 10/2024–12/2024
- **AI làm gì:** LLM sinh mutant theo mô tả bằng văn bản tự nhiên của kỹ sư (ví dụ rủi ro privacy), rồi sinh test đảm bảo kill được đúng mutant đó; có thêm agent LLM chuyên phát hiện equivalent mutant.
- **Rủi ro / failure mode:** Không thể áp dụng trực tiếp cho EShop; chỉ dùng làm tài liệu tham khảo, đặc biệt cho phần equivalent mutant detection trong seminar.

**Nguồn:** [https://arxiv.org/pdf/2501.12862](https://arxiv.org/pdf/2501.12862)

## 5. Nghiên cứu liên quan (equivalent mutant detection)

### Meta ACH (FSE 2025)

- **Nội dung:** Sinh mutant và test bằng LLM; agent riêng phát hiện equivalent mutant.
- **Số liệu chính:** 10.795 class Kotlin, 9.095 mutant, 571 test được sinh; 73% test được kỹ sư chấp nhận, 36% được đánh giá liên quan privacy; equivalent-mutant detector đạt precision 0,79 / recall 0,47 (tăng lên 0,95 / 0,96 khi có bước tiền xử lý).
- **Mức xác minh:** Paper gốc (arXiv/ACM)

**Nguồn:** [https://arxiv.org/pdf/2501.12862](https://arxiv.org/pdf/2501.12862)

### Large Language Models for Equivalent Mutant Detection (ISSTA 2024)

- **Nội dung:** So sánh hiệu năng LLM với các kỹ thuật equivalent-mutant-detection (EMD) hiện có trên 3.302 cặp mutant Java.
- **Số liệu chính:** LLM vượt trung bình 35,69% F1-score so với baseline; chiến lược fine-tune code embedding hiệu quả nhất; chỉ dùng prompt engineering thì chưa đạt hiệu năng tương đương.
- **Mức xác minh:** Paper gốc (arXiv)

**Nguồn:** [https://arxiv.org/abs/2408.01760](https://arxiv.org/abs/2408.01760)

### Large Language Models for Multi-Lingual Equivalent Mutant Detection (bản mở rộng, 2026)

- **Nội dung:** Mở rộng nghiên cứu trên sang cả Java và C, đánh giá 13 LLM khác nhau.
- **Số liệu chính:** 3.302 cặp mutant Java + 1.088 cặp mutant C; LLM tiếp tục đạt F1-score cao hơn các phương pháp truyền thống được so sánh.
- **Mức xác minh:** Paper gốc (arXiv)

**Nguồn:** [https://arxiv.org/abs/2607.00511](https://arxiv.org/abs/2607.00511)

### MutGen

- **Nội dung:** Phương pháp sinh test bằng LLM dẫn hướng theo mutation, nhắm mục tiêu tối đa hóa mutation score thay vì chỉ tăng coverage.
- **Số liệu chính:** Theo một bài viết thứ cấp (Augment Code), mutation score trên benchmark HumanEval-Java tăng từ 53% (prompt thường) lên 89,5% khi có phản hồi từ mutation testing.
- **Mức xác minh:** Số liệu lấy từ nguồn thứ cấp, CHƯA đối chiếu trực tiếp với paper gốc — cần kiểm tra lại trước khi trích dẫn chính thức.

**Nguồn:** [https://arxiv.org/pdf/2506.02954v4](https://arxiv.org/pdf/2506.02954v4)

### MuTAP — Effective Test Generation Using Pre-trained LLMs and Mutation Testing

- **Nội dung:** Đề xuất vòng lặp: nhắc lại LLM kèm test hiện có và các mutant còn sống sót để sinh test mới, lặp lại tới khi hết mutant hoặc hết ngân sách; có thêm bước tối giản assertion dư thừa.
- **Số liệu chính:** —
- **Mức xác minh:** Bài báo (ScienceDirect)

**Nguồn:** [https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739](https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739)

### Test vs Mutant: Adversarial LLM Agents (2026)

- **Nội dung:** Hai agent LLM đối kháng: một sinh mutant, một sinh test để kill; lặp lại có phản hồi.
- **Số liệu chính:** Bỏ thông tin mutant khỏi prompt hoặc bỏ vòng lặp cải thiện làm giảm coverage 12,08–30,75% và fault-detection rate 25,93–50,00% — củng cố việc đưa mutant survived vào prompt.
- **Mức xác minh:** Paper gốc (arXiv)

**Nguồn:** [https://arxiv.org/html/2602.08146v1](https://arxiv.org/html/2602.08146v1)

## Tài liệu tham khảo

[1] Stryker mutator — Introduction *[Tài liệu chính thức] —* [https://stryker-mutator.io/docs/stryker-js/introduction/](https://stryker-mutator.io/docs/stryker-js/introduction/)

[2] Meta — Mutation-Guided LLM-based Test Generation at Meta (arXiv) *[Paper] —* [https://arxiv.org/pdf/2501.12862](https://arxiv.org/pdf/2501.12862)

[3] Meta — Mutation-Guided LLM-based Test Generation at Meta (ACM DL) *[Paper] —* [https://dl.acm.org/doi/10.1145/3696630.3728544](https://dl.acm.org/doi/10.1145/3696630.3728544)

[4] Engineering at Meta — LLMs Are the Key to Mutation Testing *[Blog chính thức] —* [https://engineering.fb.com/2025/09/30/security/llms-are-the-key-to-mutation-testing-and-better-compliance/](https://engineering.fb.com/2025/09/30/security/llms-are-the-key-to-mutation-testing-and-better-compliance/)

[5] LLMorpheus — GitHub (archived) *[Repo chính thức] —* [https://github.com/githubnext/llmorpheus](https://github.com/githubnext/llmorpheus)

[6] Mutahunter — GitHub *[Repo chính thức] —* [https://github.com/codeintegrity-ai/mutahunter](https://github.com/codeintegrity-ai/mutahunter)

[7] Mutahunter — PyPI *[Trang gói] —* [https://pypi.org/project/mutahunter/1.3.1/](https://pypi.org/project/mutahunter/1.3.1/)

[8] stryker-llm-mutator — GitHub *[Repo bên thứ ba] —* [https://github.com/hughescr/stryker-llm-mutator](https://github.com/hughescr/stryker-llm-mutator)

[9] stryker-mcp-reporter — Glama *[Listing bên thứ ba] —* [https://glama.ai/mcp/servers/kluth/stryker-mcp-reporter](https://glama.ai/mcp/servers/kluth/stryker-mcp-reporter)

[10] Test Double — Keep your coding agent on task with mutation testing *[Blog] —* [https://testdouble.com/insights/keep-your-coding-agent-on-task-with-mutation-testing](https://testdouble.com/insights/keep-your-coding-agent-on-task-with-mutation-testing)

[11] alexop.dev — Mutation Testing with AI Agents *[Blog] —* [https://alexop.dev/posts/mutation-testing-ai-agents-vitest-browser-mode/](https://alexop.dev/posts/mutation-testing-ai-agents-vitest-browser-mode/)

[12] Pynguin — API reference *[Tài liệu chính thức] —* [https://pynguin.readthedocs.io/stable/api.html](https://pynguin.readthedocs.io/stable/api.html)

[13] Pynguin — Test Generation Overview *[Tài liệu chính thức] —* [https://pynguin.readthedocs.io/latest/dev/overview.html](https://pynguin.readthedocs.io/latest/dev/overview.html)

[14] Pynguin — CHANGELOG *[Repo chính thức] —* [https://github.com/se2p/pynguin/blob/main/CHANGELOG.md](https://github.com/se2p/pynguin/blob/main/CHANGELOG.md)

[15] Diffblue — Pricing *[Trang chính thức] —* [https://www.diffblue.com/pricing/](https://www.diffblue.com/pricing/)

[16] Diffblue — Cover Editions *[Tài liệu chính thức] —* [https://cover-docs.diffblue.com/updates-and-upgrades/cover-editions](https://cover-docs.diffblue.com/updates-and-upgrades/cover-editions)

[17] MuTAP — ScienceDirect *[Paper] —* [https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739](https://www.sciencedirect.com/science/article/abs/pii/S0950584924000739)

[18] MutGen — arXiv 2506.02954 *[Paper] —* [https://arxiv.org/pdf/2506.02954v4](https://arxiv.org/pdf/2506.02954v4)

[19] Test vs Mutant — arXiv 2602.08146 *[Paper] —* [https://arxiv.org/html/2602.08146v1](https://arxiv.org/html/2602.08146v1)

[20] LLMs for Equivalent Mutant Detection — arXiv 2408.01760 *[Paper] —* [https://arxiv.org/abs/2408.01760](https://arxiv.org/abs/2408.01760)

[21] LLMs for Multi-Lingual Equivalent Mutant Detection — arXiv 2607.00511 *[Paper] —* [https://arxiv.org/abs/2607.00511](https://arxiv.org/abs/2607.00511)

[22] Augment Code — Mutation Testing for AI-Generated Code *[Blog thứ cấp] —* [https://www.augmentcode.com/guides/mutation-testing-ai-generated-code](https://www.augmentcode.com/guides/mutation-testing-ai-generated-code)

[23] EShop SUT — GitHub *[Repo môn học] —* [https://github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut)
