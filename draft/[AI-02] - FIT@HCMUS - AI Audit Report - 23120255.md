**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# AI Audit Report — Mẫu 5 mục cho mỗi Artifact

*Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar).*

*Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC13003 Kiểm chứng Phần mềm.*

## 1. Thông tin Sinh viên

| Mục                              | Giá trị              |
|----------------------------------|----------------------|
| Họ tên sinh viên (in hoa):       | LÊ TẤN HIỆP          |
| MSSV:                            | 23120255             |
| Mã bài tập (ví dụ HW#00, HW#02): | Seminar T10, Nhóm 12 |
| Ngày làm bài:                    | 2026-10-16 đến 2026-10-23 (S3–S4) |
| Công cụ AI đã dùng:              | Claude (claude.ai) với Claude Sonnet 4.6, Claude Opus 5.5, Claude Sonnet 5.5; Claude Code với Claude Opus 5.5 |
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
<td><strong>AI-S3-A01-01</strong><br />Công cụ: Claude (claude.ai), Claude Sonnet 4.6 và Claude Opus 5.5<br />Thời gian: 18:57–19:20 16/10/2026<br />Prompt:<br />"Giờ cứ bắt đầu hỗ trợ giúp tôi thực hiện từ S3, theo thứ tự nhé. Nếu kiểu như gặp mắc kẹt (do phải chờ task người khác), cứ nói với tôi nhé. Giờ bắt đầu với S3 nhé. Theo thứ tự để có gì sau tôi còn viết docs để hiểu, rồi còn thuyết trình trên lớp nữa. Có thể dạy tôi thêm kiến thức lý thuyết để hiểu thêm nếu cần"</td>
<td>Research Notes F-A01-01 → F-A01-05 (định nghĩa, mutation operators, quy trình) và Source Register SRC-01…07, SRC-10. Ví dụ sandbox (Node v22.22.0, StrykerJS 10.0.0): bộ test yếu 3/15 Killed = 20.00%, bộ test mạnh 14/15 = 93.33%.</td>
<td>VALID</td>
<td>Mọi claim có nguồn trong Source Register. Em tự chạy lại ví dụ trên Windows 11 (Node v24.15.0, StrykerJS 10.0.0) ở C01-2/C01-4: 20.00% và 93.33%, khớp. Số liệu là metric của tutorial, không đo EShop (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.1</a> metrics dùng trong testing).</td>
<td>Dùng nguyên, không sửa.</td>
</tr>
<tr>
<td><strong>AI-S3-B01-01</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 19:23–19:45 16/10/2026<br />Prompt:<br />"Repo EShop: https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness<br />Repo Seminar: https://github.com/tkob-team/T10_Mutation_Testing_and_Test_Effectiveness<br />---<br />nhân tiện, mình vừa up thêm các docs của nhóm mình vào context của bạn, bạn đã thấy chưa?<br />===<br />Mình đưa thêm các file bạn cần, hoặc các file template, hoặc là các file mà đã được chuyển thành proposal từ Scope_and_Decisions.md nhé<br />Bạn còn cần thêm gì nữa bảo mình nehs"</td>
<td>Research Notes F-B01-01 → F-B01-04: kiến trúc công cụ, prompt skeleton, verification gates, source inspection EShop. F-B01-04 kết luận "<code>POST /api/cart</code> push nguyên body, không validate … spec §4.2 không nêu rule quantity" và đề xuất seam sửa production code (<code>module.exports = app</code>).</td>
<td>INCOMPLETE</td>
<td>AI bỏ sót SRS v2.0 trong <code>README.md</code> nên kết luận sai "cart không có rule"; FR-07 quy định thêm cùng sản phẩm phải tăng số lượng. Test basis phải truy được về requirement (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §1.4.4</a> traceability). Seam sửa production code vi phạm quy tắc nhóm không sửa SUT.</td>
<td>F-B01-04: <mark>FR-07: thêm cùng sản phẩm phải tăng số lượng → lỗi gốc DEF-01</mark>.<br />Seam: <mark>test-only, mock <code>express</code> lấy <code>app</code>, mock <code>sqlite3</code> dùng <code>:memory:</code>, không sửa production code</mark>.<br /><mark>Thêm SRC-14 (README.md, SRS v2.0)</mark>; sửa Q9.</td>
</tr>
<tr>
<td><strong>AI-S3-C01-01</strong><br />Công cụ: Claude (claude.ai, chat mới ngoài Project), Claude Opus 5.5<br />Thời gian: trước 19:56 16/10/2026<br />Prompt (trích nguyên văn phần Task; đầu prompt gồm requirement, code <code>calcCartTotal</code>, test yếu và mutant <code>subtotal &gt; 500000</code>):<br />"Task:<br />1. Explain which input makes the original and the mutant behave differently.<br />2. Propose 1–3 assertions (Jest code) that pass on the original code and fail on this mutant.<br />3. Base expected values on the business requirement, not on the current implementation.<br />If the code contradicts the requirement, say so instead of asserting the code's behaviour.<br />4. Only use APIs that exist in the code above."</td>
<td>Bảng phân biệt 499,999 / 500,000 / 500,001; hai test:<br /><code>expect(calcCartTotal([{ price: 250000, quantity: 2 }], 30000)).toBe(500000);</code><br />test thứ hai lọc item quantity 0 và -1 rồi kỳ vọng 500000; một dòng tùy chọn <code>toBe(529999)</code> với subtotal 499,999, kèm câu giải thích "would catch mutants like <code>&gt;= 499999</code>".</td>
<td>VALID</td>
<td>500,000 là biên của requirement "500,000 or more" (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §4.2.2</a> BVA). Em tính tay expected, chạy Jest 3/3 pass, Stryker: mutant <code>subtotal &gt; 500000</code> Killed, tổng 14 Killed / 1 Survived = 93.33%. Câu giải thích về <code>&gt;= 499999</code> sai: StrykerJS không có mutator đổi hằng số.</td>
<td>Code dùng nguyên văn. Chỉ thêm wrapper cho dòng expect tùy chọn:<br /><mark>test('subtotal 499,999 → shipping added (Claude optional)', () =&gt; {</mark> … <mark>});</mark><br />Loại câu giải thích "would catch mutants like <code>&gt;= 499999</code>".</td>
</tr>
<tr>
<td><strong>AI-S3-C01-02</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 19:33–20:27 16/10/2026 (nhiều lượt)<br />Prompt (một lượt tiêu biểu):<br />"Có cần đưa reports/ai thành C01-ai không?"</td>
<td>Experiment Log C01-1 → C01-6 và mục Limits &amp; Failure Modes; <code>console.log</code>, <code>killedBy.log</code> dựng từ output em dán; script <code>show-mutants.js</code> đọc <code>killedBy</code> từ <code>mutation.json</code>; prompt C01-5. Score ghi nhận: weak 20.00%, strong 93.33%, AI 93.33%.</td>
<td>VALID</td>
<td>Số liệu chép từ console thật; test kill mutant lấy từ <code>killedBy</code> trong <code>mutation.json</code>, không suy từ tên test (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a> nội dung test report).</td>
<td>Em chỉ ra AI chưa nói rõ nơi đặt <code>console.log</code>; <mark>sửa vị trí thư mục report</mark> (copy file bên trong <code>reports/ai</code>, không copy cả thư mục).</td>
</tr>
<tr>
<td><strong>AI-S3-C01-03</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 20:20 16/10/2026<br />Prompt (sau output <code>git log</code>/<code>git status</code> em dán):<br />"Giúp mình viết .gitignore cho repo này nhé"</td>
<td><code>.gitignore</code> gốc repo EShop: bỏ qua <code>node_modules/</code>, report và file sinh ra lúc chạy; giữ <code>backend/package-lock.json</code> được track.</td>
<td>VALID</td>
<td>Đối chiếu với <code>git status</code> thật: chỉ còn <code>.gitignore</code> là file mới, lockfile backend vẫn được track (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.4</a> configuration management).</td>
<td>Dùng nguyên. Em tự restore <code>database.sqlite</code>, xóa lockfile thừa ở gốc và commit.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-04</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 20:28 16/10/2026<br />Prompt:<br />"oke, giúp mình soạn ngắn thôi nhé. Đọc trong khoảng 30s-1 phút"</td>
<td>Tin nhắn gửi Thái Hòa về seams và scope, trích: "Cart/checkout gần như không có logic (total lấy từ client) → mình đề xuất chuyển trọng tâm sang cancel + admin status transition."</td>
<td>INCOMPLETE</td>
<td>Tin nhắn dựa trên F-B01-04 bản thiếu SRS nên một số câu hỏi thừa: SRS đã có FR-07 (cart) và FR-10 (state machine). Câu hỏi scope phải xuất phát từ test basis đã đọc đủ (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §1.4.4</a>).</td>
<td>Gửi nguyên văn; sau phản hồi của Hòa, em <mark>đọc lại SRS và sửa F-B01-04</mark>, <mark>bỏ giả định "Cart không có requirement"</mark>.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-01</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: từ 13:02 18/10/2026<br />Prompt:<br />"Câu trả lời của Hoà đây: "mấy cái test dc giao thì đc quyết rồi viết rõ ra tại nó là z đó"<br />===<br />Câu trả lời của Hoà theo mình hiểu là, được giao thì thực hiện, rồi viết rõ việc mình đã thực hiện ra"<br />Trả lời câu hỏi của AI: "Vòng đời chuẩn (Recommended)"; "File test riêng (Recommended)"; "Test theo spec + ghi spec gap (Recommended)"; "Chỉ assert status (Recommended)"</td>
<td>Harness test-only (<code>isolate.js</code>, <code>app.js</code>), 36 baseline test CO-01…CO-19, 8 defect test DEF-01…DEF-08, scripts trong <code>package.json</code>, <code>stryker.cart-orders.config.json</code>. Sandbox Linux: 36/36 pass, 8/8 defect fail đúng lý do, 150 mutants, 74.83%.</td>
<td>INCOMPLETE</td>
<td>Expected phải lấy từ SRS (FR-07, FR-08, FR-10, FR-11, FR-12, FR-18, FR-20, SEC-03), không lấy code gốc làm oracle. Chuyển trạng thái đơn hàng kiểm theo state machine FR-10 (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §4.2.4</a>). Test đúng spec mà fail trên code gốc là defect, phải tách khỏi baseline (§5.5).</td>
<td>Em chốt: <mark>baseline chỉ assert status</mark>; <mark>test đúng spec mà fail trên code gốc tách sang <code>test/defects/</code></mark>; <mark>user không được hủy đơn <code>shipping</code>; admin hủy <code>shipping</code> chưa rõ, không test</mark>.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-02</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 19:50 22/10/2026<br />Prompt (trích nguyên văn):<br />"Task S3-D01 (Cart &amp; Orders). Dùng skill t10-run-report và t10-mutation-testing. […]<br />3. Trong backend: npm install, rồi chạy 3 run:<br />- D01-1-cc: npm test → kỳ vọng 36 passed<br />- D01-2-cc: npm run test:defects → kỳ vọng 8 failed (DEF-01…08, xem test/defects/)<br />- D01-3-cc: npx stryker run stryker.cart-orders.config.json --dryRunOnly → kỳ vọng "Initial test run succeeded. Ran 36 tests" […]<br />Không commit, không push, không sửa server.js/database.js. Kết quả khác kỳ vọng thì ghi lại nguyên trạng, đừng sửa test cho khớp. Viết REPORT.md và báo cáo ngắn."</td>
<td>"S3-D01: Partial. Hai run đầu đúng kỳ vọng, dry run Stryker thì fail." D01-1-cc 36/36 passed; D01-2-cc 8/8 failed kèm lý do từng DEF; D01-3-cc exit 1, <code>No tests were found</code>. Run chẩn đoán với <code>--tempDirName stryker-tmp</code>: "Initial test run succeeded. Ran 36 tests".</td>
<td>VALID</td>
<td>Kết quả khác kỳ vọng được ghi nguyên trạng, không sửa test/config; run chẩn đoán ghi riêng, không báo như mutation run hoàn tất (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Dùng nguyên. Em quyết định <mark><code>"tempDirName": "stryker-tmp"</code></mark> (22/10/2026).</td>
</tr>
<tr>
<td><strong>AI-S3-WF-01</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 19:34–19:55 22/10/2026<br />Prompt:<br />"Có gì đó sai sai ở đây, mình không hề sử dụng ở thư mục ngày. Mình đặt hết vào thư mục cha là: "Repo". Không biết cần thay đổi gì không"<br />"Lần sau, nhớ rằng cái gì không biết thì hỏi mình, đừng có hallucination, giả định gì cả nhé<br />---<br />thấy báo cáo hơi dài, bạn tham khảo CLAUDE.md mà mình dùng ở dự án khác thấy ổn nhé"</td>
<td><code>CLAUDE.md</code> và hai skill <code>t10-mutation-testing</code>, <code>t10-run-report</code>. Bản 1: "Thư mục này chứa các thư mục làm việc theo ngày (ví dụ 22102026)… repos được clone vào chính thư mục ngày đó."</td>
<td>INCOMPLETE</td>
<td>AI giả định môi trường làm việc không có thật (thư mục theo ngày, clone lặp lại). Môi trường test phải mô tả đúng cấu hình thực tế (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.4</a>).</td>
<td><mark>"Thư mục này (Repo) là workspace cố định… Dùng các clone có sẵn, không clone thêm."</mark><br /><mark>Khối "Báo cáo cho phiên thảo luận" ≤ 15 dòng; quy tắc "không biết thì hỏi, không giả định"</mark>.</td>
</tr>
<tr>
<td><strong>AI-S3-D01-03</strong><br />Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br />Thời gian: 20:04–20:16 22/10/2026<br />Prompt (claude.ai):<br />"1. đổi theo bạn yêu cầu nhé<br />2. Tách để có evidence riêng nhé.<br />Xong nhờ Claude Code commit luôn nhé. Chỉ commit thôi, mình tự push"<br />Prompt (Claude Code, trích): "backend/test/defects/cart-orders.defects.js: tách DEF-08 thành DEF-08a (GET /api/orders/:id không token → 401) và DEF-08b (token user khác → 403 hoặc 404). Không sửa test khác."</td>
<td><code>tempDirName: "stryker-tmp"</code>, thêm <code>stryker-tmp/</code> vào <code>.gitignore</code>, tách DEF-08a/08b. D01-4-cc: 9/9 defect fail đúng lý do (DEF-08a 401 → nhận 200, DEF-08b 403/404 → nhận 200). D01-5-cc: dry run "Ran 36 tests". Commit EShop <code>8d60e9b</code>, seminar <code>5fc08df</code>.</td>
<td>VALID</td>
<td>Hai lỗi bảo mật khác nhau (không token / token user khác) cần evidence riêng để quản lý defect (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.5</a>). Production code giữ nguyên.</td>
<td>Dùng nguyên. Em chọn D01-Q7, D01-Q8 và cho phép commit.</td>
</tr>
<tr>
<td><strong>AI-S3-WF-02</strong><br />Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br />Thời gian: 20:16–20:41 22/10/2026<br />Prompt:<br />"Được commit từ nay về sau nhé.<br />---<br />Mà cả bạn và Claude Code đều tự xuất log để thêm vào AI-log được, nên giúp mình luôn nhé."</td>
<td>Script <code>extract_ai_log.py</code> trích transcript thành prompt log, hook Stop tự ghi log sau mỗi lượt, hai prompt log S3.</td>
<td>INCOMPLETE</td>
<td>Bản đầu có 4 lỗi: tính lệnh local <code>/exit</code> là prompt; transcript rỗng ghi đè file; phiên resume làm lặp prompt; không che tên user Windows. Công cụ tự động cần được kiểm trên dữ liệu thật trước khi tin (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §6.2</a> rủi ro của tự động hóa).</td>
<td><mark>Lọc lệnh local; bỏ qua phiên rỗng; bỏ prompt lặp khi resume; che username (thêm <code>re.I</code>)</mark>. Em báo lỗi và kiểm log sinh ra; grep tên user, MSSV, email = 0.</td>
</tr>
<tr>
<td><strong>AI-S3-G01-01</strong><br />Công cụ: Claude Code, Claude Opus 5.5 (sinh test, chạy); Claude (claude.ai), Claude Opus 5.5 (soạn prompt, spec review)<br />Thời gian: 01:40–02:08 23/10/2026<br />Prompt (trích nguyên văn):<br />"Task S3-G01 — AI assertions, run G01-1-cc (skill t10-run-report). Session mới, blind với nhánh manual. […]<br />Với mỗi mutant: đọc diff và coveredBy trong mutation.json, giải thích vì sao baseline không kill, rồi viết test vào backend/test/ai/cart-orders.ai.js. Expected phải lấy từ SRS/spec; nếu phải lấy từ code thì ghi rõ trong comment. Test phải pass trên code gốc. Nếu không viết được test vừa đúng spec vừa pass trên code gốc thì không viết,"</td>
<td>5 test AI-CO-01…05 cho 5 mutant; không viết test cho 550:11 vì là mutant sửa lỗi (DEF-05). G01-1-cc: 41/41 pass trên code gốc. G01-2-cc: Killed 97, Timeout 23, Survived 21, NoCoverage 2, RuntimeError 7; score 83.92%; 286:7, 292:7, 326:47, 346:45, 532:47 Killed, 550:11 Survived.</td>
<td>VALID</td>
<td>Oracle theo SRS FR-07, FR-10, FR-18 và <code>api_specification.md</code>; hai chỗ oracle một phần lấy từ code (dạng <code>[]</code>, trường <code>error</code>) được AI tự ghi rõ. Không viết test cho 550:11 là đúng: test đúng spec sẽ fail trên code gốc (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §4.2.4</a>). Giới hạn: blind một phần (preflight in 2 subject commit F01).</td>
<td>Assertion giữ nguyên. Chỉ sửa comment header:<br /><mark>bỏ "(đã review)"</mark>; <mark>"Sinh bởi Claude Code (claude-opus-5-5) ở G01-1-cc; session blind một phần (lộ 2 subject commit F01, xem G01-cc-REPORT.md)."</mark></td>
</tr>
<tr>
<td><strong>AI-S3-WF-03</strong><br />Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br />Thời gian: 02:31–02:46 23/10/2026<br />Prompt:<br />"Rồi. Giúp mình cập nhật skill nhé. Và có lẽ là session này khá dài rồi. Giúp mình viết handoff cho project này đọc. Để mình bắt đầu ở session mới và hoàn thành các task còn lại có thể (như là s4, s5, s6, s7, s8). Cũng như giúp mình viết prompt cho Claude Code cũng để nó cập nhật lại CLAUDE.md, cũng như những file khác cần thiết.<br />Sau đó giúp mình viết prompt để sử dụng ở session mới làm việc tiếp"</td>
<td>Handoff S3 → S4, cập nhật hai skill, <code>CLAUDE.md</code>, chuyển hook Stop sang thư mục log S4.</td>
<td>VALID</td>
<td>Khi phiên mới bắt đầu, SHA các nhánh (<code>8d60e9b</code>, <code>b77f5d6</code>, <code>f4696c6</code>, EShop main <code>b271c41</code>) khớp handoff; hook ghi đủ các lượt I01 (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.4</a>).</td>
<td>Dùng nguyên. Hạn chế phát hiện sau: preflight commit AI log rồi <code>pull --ff-only</code> bị từ chối khi remote có commit mới; mục 8 của handoff nói quá về giả thuyết Timeout.</td>
</tr>
<tr>
<td><strong>AI-S3-I01-01</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5<br />Thời gian: 10:18–12:10 23/10/2026<br />Prompt:<br />"Tạm hoãn S4, tôi chưa làm S4 nhé.<br />Đọc mục 8 của claude/Handoff_T10_Tan_Hiep.md. Làm S3-I01 trước (chạy lại case Coupons của Hòa), rồi mới sang S4."<br />Trả lời câu hỏi của AI: "Chỉ bản mở rộng (Recommended)"; "Theo guide: zip + overlay (Recommended)"</td>
<td>Prompt I01 cho Claude Code; lệnh PowerShell cho member run I01-1/2/3; phân tích nguồn <code>frozen-input.zip</code>; nháp ba shared mutant cases; bản sửa README Coupons-extensions (<code>7ab200b</code>); bảng xử lý góp ý G1–G7 (<code>6a82fe7</code>).</td>
<td>INCOMPLETE</td>
<td>Nháp Case 3 sai hai ý: "test baseline chỉ assert status" (thực tế còn <code>not.toHaveProperty('discount_amount')</code>) và "Hòa cố ý không dùng oracle lỗi" (CP-02 assert <code>body.error</code> kiểu String). Prompt v1 thiếu <code>git fetch</code>, expected values và cảnh báo dry run đếm test 2 lần. Review phải đối chiếu với test thật (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §3.2</a>).</td>
<td><mark>Prompt v2 thêm <code>git fetch</code>, expected values, thư mục tạm, cảnh báo dry run</mark>; <mark>provenance member run bổ sung bằng reflog và hash</mark>; <mark>sửa hai ý sai ở Case 3</mark>. Em tự chạy I01-1/2/3 và duyệt G1–G7.</td>
</tr>
<tr>
<td><strong>AI-S3-I01-02</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 10:26–11:52 23/10/2026<br />Prompt (trích nguyên văn):<br />"Task S3-I01: chạy lại case Coupons của Hòa (cross-run). Dùng skill t10-run-report. Run IDs: I01-1-cc, I01-2-cc, I01-3-cc. Không blind. […]<br />1. I01-1-cc baseline: EShop checkout 806ba19 (detached) → backend: npm ci; npm run test:coupons; npm run mutate:coupons. Expected: 26 pass; Stryker 39/21/30/25/5, 120 mutants, 52.17%."</td>
<td>Runs I01-{1,2,3}-cc; script <code>i01_compare.py</code>, <code>i01_member_provenance.py</code>; <code>I01-cc-REPORT.md</code>; mục Cross Reproduction trong Experiment Log. Kết quả: khớp report của Hòa 120/120 mutant, 0 đổi trạng thái; ghi missing step thiếu <code>npm ci</code>.</td>
<td>VALID</td>
<td>So từng mutant theo location + mutator + replacement; run em tự chạy cho cùng kết quả; missing step tái hiện được (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Dùng nguyên. Khi thiếu dữ liệu, agent dừng và hỏi (Q1, Q2), em trả lời.</td>
</tr>
<tr>
<td><strong>AI-S3-E01-01</strong><br />Công cụ: Claude (claude.ai) và Claude Code, Claude Opus 5.5<br />Thời gian: 11:30–12:16 23/10/2026<br />Prompt (claude.ai):<br />"Oke. Đã push rồi, check giúp mình nhé. Xem S03 mình còn việc gì không làm không trước khi qua S04 nhé"<br />Prompt (Claude Code, trích): "1. Kiểm đủ file; số liệu đếm từ mutation.json. […] 3. Experiment Log: điền các dòng member run (D01 Runs; Baseline thay dòng [S3-E01] Pending; Comparison), cập nhật header Task IDs/Evidence Status. Không viết kết luận thay mình."</td>
<td>Lệnh PowerShell có hàm <code>Run</code> ghi giờ, commit, lệnh vào đầu <code>console.log</code>; <code>member_compare.py</code>, <code>member_comparison.md</code>; các mục D01 Runs, Baseline, Comparison. Giả thuyết: Killed↔Timeout do concurrency; Jest testTimeout 5 s chạy đua với timeout của Stryker.</td>
<td>VALID</td>
<td>Member run: D01-1 36 pass, D01-2 9 fail đúng lý do, D01-3 dry run 36 tests; E01-1 82/25/34/2/7, F01-2 112/18/11/2/7, G01-2 102/18/21/2/7; tập Survived trùng ở cả 6 cặp. Hai giả thuyết bị dữ liệu bác bỏ và được ghi rõ là bác bỏ (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Dùng nguyên; bullet "Tổng hợp Killed ↔ Timeout" dùng nguyên văn. Loại hai giả thuyết. Hạn chế: lệnh thiếu UTF-8 nên chữ tiếng Việt trong <code>console.log</code> lỗi mã hóa (số liệu không ảnh hưởng).</td>
</tr>
<tr>
<td><strong>AI-S4-A01-01</strong><br />Công cụ: Claude (claude.ai), Claude Sonnet 5.5<br />Thời gian: 12:38–13:20 23/10/2026<br />Prompt: yêu cầu soạn Guide contribution phần Cart &amp; Orders (S4-A01). Bản nguyên văn chưa trích vì transcript phiên này chưa được xuất vào Phụ lục A.</td>
<td><code>Guide_Contribution_Tan_Hiep.md</code>: walkthrough Cart trên workshop <code>6d2e790</code>, Troubleshooting có nhãn Đã gặp/Đề xuất, 5 Failure Modes.</td>
<td>VALID</td>
<td>Claude Code chạy lại đúng guide trên Windows 11, Node v24.15.0, npm 11.12.1 (F01c-1-cc): khớp 4 mốc (88 tests; 7 Survived; 3 Killed sau CO-02; 7 Killed sau 3 assertion). Guide được kiểm bằng cách thực thi lại (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §1.4.3</a> testware).</td>
<td>Em yêu cầu <mark>chuyển bản English sang tiếng Việt</mark>; không sửa nội dung. AI tự sửa hai lỗi: <mark>FR-07 không còn là căn cứ "giỏ hàng mới rỗng" (đổi thành oracle suy luận)</mark>; bỏ câu nói quá "phiên AI từng thấy bài manual".</td>
</tr>
<tr>
<td><strong>AI-S4-B01-01</strong><br />Công cụ: Claude (claude.ai), Claude Sonnet 5.5<br />Thời gian: 12:38–13:20 23/10/2026<br />Prompt: yêu cầu soạn Report contribution (S4-B01). Bản nguyên văn chưa trích vì transcript phiên này chưa được xuất vào Phụ lục A.</td>
<td><code>Report_Contribution_Tan_Hiep.md</code>; câu caveat Killed/Timeout trong <code>Seminar_Report.md</code>.</td>
<td>VALID</td>
<td>Bảng 6.2/6.5/6.6 khớp Experiment Log S3; mutant 550:11 là mutant sửa lỗi (DEF-05) nên manual và AI đều để Survived (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Em yêu cầu <mark>viết bằng tiếng Việt</mark>; không sửa nội dung.</td>
</tr>
<tr>
<td><strong>AI-S4-C01-01</strong><br />Công cụ: Claude (claude.ai), Claude Sonnet 5.5; chỉnh sửa sau bằng Claude Code, Claude Opus 5.5<br />Thời gian: 12:38–14:40 23/10/2026<br />Prompt (Claude Code, trích nguyên văn): "Trong materials/s4/Demo_Contribution_Tan_Hiep.md: bỏ chỗ ghi blocker package.json trên main (đã sửa); lời dẫn giữ nguyên (chỉ đọc score và Survived);"</td>
<td><code>Demo_Contribution_Tan_Hiep.md</code>: lời dẫn tiếng Việt, lệnh, expected output, evidence, phương án backup cho phần Cart &amp; Orders.</td>
<td>INCOMPLETE</td>
<td>Rehearsal C01-rehearsal-cc trên clone mới: 150 mutants, score 74.83% / 90.91% / 83.92% và Survived khớp, nhưng Killed/Timeout của manual và AI lệch 3 và 2 mutant so với run S3. Expected trong kịch bản phải ghi được dao động này (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>). Kịch bản chưa quay.</td>
<td><mark>Dịch sang tiếng Việt</mark>; <mark>bỏ blocker package.json đã sửa</mark>; <mark>thêm ghi chú Killed/Timeout dao động</mark>. Em quyết định <mark>lời dẫn chỉ đọc score và Survived</mark>.</td>
</tr>
<tr>
<td><strong>AI-S4-WF-01</strong><br />Công cụ: Claude (claude.ai), Claude Opus 5.5 (viết handoff); Claude Sonnet 5.5 (kiểm chứng)<br />Thời gian: cuối phiên S3 và 12:38–12:52 23/10/2026<br />Prompt: lượt viết handoff cuối phiên S3.</td>
<td>Handoff đầu S4 cho phiên thảo luận mới: trạng thái repo, hash nhánh, việc còn lại.</td>
<td>INCOMPLETE</td>
<td>Đối chiếu với 2 repo clone mới thấy sai 4 điểm: hash <code>main</code> của SUT cũ; "User_Guide ~880 dòng" (thực tế 334); <code>main</code> seminar đã tiến lên; bỏ sót lỗi thiếu dấu phẩy <code>backend/package.json</code> dòng 24. Tài liệu bàn giao phải được kiểm với trạng thái thật (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.4</a>).</td>
<td>Em <mark>dùng trạng thái repo thật thay cho handoff</mark>; lỗi package.json do Hòa sửa trên SUT main (<code>4b28756</code>); nhánh đề xuất đã xóa, không dùng.</td>
</tr>
<tr>
<td><strong>AI-S4-F01-01</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 12:49 và 14:08–14:13 23/10/2026<br />Prompt (F01a, nguyên văn):<br />"Task S4-F01a (dùng skill t10-run-report). Không sửa production code, commit không push.<br />1) git fetch cả 2 repo; ghi hash main. Kiểm SUT main: node -e "JSON.parse(require('fs').readFileSync('backend/package.json','utf8'))" và ghi kết quả.<br />2) Trên baseline 806ba19 (worktree riêng): npm ci; npm run test:cart-orders; npx stryker run stryker.cart-orders.config.json --dryRunOnly. Ghi giờ bắt đầu/kết thúc từng lệnh.<br />3) Từ runs S3 của Cart, lấy thời gian chạy full mutate (nếu có log).<br />Run ID F01a-1-cc. Evidence vào thư mục s4. Báo cáo ≤ 15 dòng."</td>
<td>F01a-1-cc: <code>backend/package.json</code> trên SUT main lỗi JSON dòng 24; dry run <code>806ba19</code> 36 tests Jest, 150 mutants. F01c-1-cc: chạy lại guide Cart mục 2.2–4.1, khớp 4 mốc (88 tests; 7 mutants, 7 Survived; 3 Killed sau CO-02; 7 Killed, 0 Survived sau 3 assertion).</td>
<td>VALID</td>
<td>Run 14:11:33–14:11:40 lỗi do script áp snippet sai (CRLF ở CO-02, escaping backtick ở CO-12) bị loại; số liệu lấy từ run chạy lại, đếm từ <code>mutation.json</code> (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Dùng nguyên. Em đọc REPORT và xác nhận run lỗi đã bị loại.</td>
</tr>
<tr>
<td><strong>AI-S4-D01-01</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 14:40–15:50 23/10/2026<br />Prompt (trích nguyên văn):<br />"Chuẩn bị S4-D01 bản Tấn Hiệp tự chạy (Run ID D01-1, không hậu tố -cc). Không tự chạy walkthrough; chỉ chuẩn bị rồi đưa mình các khối lệnh để mình dán."</td>
<td>D01-1-cc: reproduction guide Coupons của Hòa, khớp guide (120 mutants, 39/21/30/25/5, 52.17%; manual và AI 41/21/28/25/5, 53.91%). <code>Guide_Reproduction_Tan_Hiep.md</code>; khối lệnh PowerShell 0–4; mẫu <code>NOTES.md</code>.</td>
<td>INCOMPLETE</td>
<td>D01-1 em tự chạy có 0 mutant khác D01-1-cc. Lỗi AI: khối lệnh chạy qua hàm <code>Step</code> không ghi output native của npm/Jest/Stryker vào transcript; khối overlay lần 1 bị cắt thành <code>-Destination $des</code>. Evidence thực thi phải đầy đủ để tái lập (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.2</a>).</td>
<td>Em <mark>chạy lại khối 0–3 sau khi lệnh bị cắt</mark>; <mark>ghi tay số tests trong NOTES</mark> vì transcript thiếu output; khối 4 (review candidate) chưa làm.</td>
</tr>
<tr>
<td><strong>AI-S4-E01-01</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 15:49 23/10/2026<br />Prompt (trích nguyên văn):<br />"Quy tắc: (a) chỉ dịch phần văn xuôi; KHÔNG đổi lệnh, số liệu, đường dẫn, mã mutant; (b) giữ nguyên trạng thái Observed/Suggested;"</td>
<td><code>User_Guide.md</code> bản ghép từ ba Guide Contribution: Installation chung + Setup riêng, Troubleshooting và Failure Modes gộp (15 mục thành 8), ghi chú đầu file; dịch phần Coupons/Auth sang tiếng Việt.</td>
<td>VALID</td>
<td>Script so khớp: 31/31 code block của ba nguồn còn nguyên văn; số liệu của Hòa và Phúc có mặt đủ; mọi link tương đối phân giải được (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §3.2</a>).</td>
<td>Không sửa nội dung. AI tự phát hiện và <mark>bỏ một câu "Cách tránh" tự thêm ở Failure Mode 6</mark> trước khi commit. Em đọc lại toàn bộ bản ghép.</td>
</tr>
<tr>
<td><strong>AI-S4-E01-02</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 16:04–16:10 23/10/2026<br />Prompt (trích nguyên văn):<br />"- Cart: sửa dòng "Tested environment" thành môi trường F01c (Windows 11, Node v24.15.0, npm 11.12.1), nêu rõ dòng cũ lấy từ bản nháp của Hòa."</td>
<td>Bổ sung vào <code>User_Guide.md</code>: lệnh clone repo seminar, hướng dẫn <code>$docsRoot</code>, ghi chú dry run gấp đôi số tests, đoạn giải thích PROVENANCE, 2 dòng Troubleshooting (<code>Filename too long</code>, <code>ChildProcessCrashedError 3221225477</code>), checkout <code>eea3ed4</code>/<code>b27fce2</code>, Tested environment Cart.</td>
<td>VALID</td>
<td>Mỗi chỗ sửa dẫn evidence trong repo; <code>git diff</code> +57/−25 chỉ ở chỗ có chủ đích. Các bước mới thêm chưa ai chạy lại, đã ghi rõ (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §1.4.4</a>).</td>
<td>Em yêu cầu đổi nhãn: <mark>"Quyết định của bản ghép (Hòa cho phép Claude hoàn thiện User_Guide.md, chưa xác nhận từng điểm)"</mark> thay cho "Quyết định đã chốt (Hòa, leader)" (<code>768701a</code>).</td>
</tr>
<tr>
<td><strong>AI-S4-F01-02</strong><br />Công cụ: Claude Code, Claude Opus 5.5<br />Thời gian: 16:12 23/10/2026<br />Prompt (trích nguyên văn):<br />"3) Kiểm số liệu: viết script trích các số mutants/Killed/Survived/score trong User_Guide.md và so với mutation.json hoặc summary trong experiments/s3 và s4/runs; báo cái lệch hoặc không tìm thấy nguồn.<br />4) Kiểm cơ học: mọi code block của ba Guide_Contribution_* còn nguyên trong User_Guide.md; mọi link tương đối trong User_Guide.md phân giải được; không còn từ "TODO"/placeholder."</td>
<td><code>Verification_Notes_Tan_Hiep.md</code>; script <code>verify_user_guide.js</code> và <code>verify_output.txt</code>: 8 section (đủ 6 của REQ-17); Failure Modes 8 mục, 6 có evidence; Troubleshooting 24 dòng, 11 "Đã gặp"; 36/36 claim số liệu khớp; 31/31 code block nguyên văn; 51 link tương đối không hỏng; 0 placeholder.</td>
<td>VALID</td>
<td>Bản đầu của script trỏ sai nguồn cho 73.45% và toy 60% (báo MISMATCH); AI tìm đúng nguồn (<code>E03-provisional</code>, <code>tutorial-weak</code>) và chạy lại ra khớp. Claim được kiểm bằng dữ liệu gốc, không bằng lời AI (<a href="https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf">ISTQB CTFL 4.0.1, §5.3.1</a>).</td>
<td>Dùng nguyên. Em đọc Verification Notes và <code>verify_output.txt</code>.</td>
</tr>
</tbody>
</table>

## 4. Tổng kết Độ chính xác AI

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số                             | Số lượng | Tỉ lệ |
|------------------------------------|----------|-------|
| Tổng artifact AI sinh đã audit     | 25       | 100.00% |
| VALID (đúng, dùng nguyên)          | 16       | 64.00% |
| INVALID (sai; loại bỏ)             | 0        | 0.00% |
| INCOMPLETE (chấp nhận sau khi sửa) | 9        | 36.00% |

## 5. Kết luận — Khi nào nên / không nên dùng AI?

Viết 80–150 chữ mô tả pattern quan sát được. AI mạnh ở đâu? AI sai ở đâu? Khuyến nghị của bạn cho việc dùng AI trong loại công việc này?

AI mạnh khi nhiệm vụ có oracle rõ và kết quả kiểm được bằng máy: sinh assertion biên từ requirement, viết harness test-only, chạy Jest/StrykerJS, đếm trạng thái từ `mutation.json` và so từng mutant giữa các run. AI sai khi thiếu context hoặc phải suy luận: bỏ sót SRS nên kết luận Cart không có rule, giả định workspace theo ngày, giải thích một mutant mà Stryker không sinh, đưa giả thuyết Timeout chưa kiểm chứng, viết handoff lỗi thời. Khuyến nghị của em: dùng AI để soạn nháp và thực thi, nhưng mọi expected phải truy về SRS, mọi con số phải đọc lại từ dữ liệu gốc, run của AI ghi riêng và em tự chạy lại các run chính thức. Không dùng AI làm oracle.

## 6. Mandatory Disclosure (dán nguyên văn)

> *"Bộ test, script, Experiment Log và tài liệu S3–S4 phần Cart & Orders liệt kê ở Mục 3 này được sinh phiên bản đầu bởi Claude (claude.ai: Claude Sonnet 4.6, Claude Opus 5.5, Claude Sonnet 5.5) và Claude Code (Claude Opus 5.5); em đã rà soát và chỉnh sửa Research Notes F-B01-04 theo SRS, header provenance của test AI G01, quy trình workspace và script trích prompt log, bổ sung việc tách DEF-08 thành DEF-08a/DEF-08b, oracle theo SRS (FR-07, FR-08, FR-10, FR-11, FR-12, FR-18, FR-20, SEC-03) và việc tách test defect khỏi baseline; bộ assertion manual F01 do em tự viết, các member run C01, D01-1/2/3, E01-1, F01-2, G01-2, I01-1/2/3 (S3) và D01-1 (S4) do em tự chạy. AI Audit Report chi tiết đính kèm ở Phụ lục A. Em cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."*

## Chữ ký

| Họ tên sinh viên (in hoa): | LÊ TẤN HIỆP                            |
|----------------------------|----------------------------------------|
| MSSV:                      | 23120255                               |
| Lớp / Khoá:                | Software Testing - CQ2023/3            |
| Môn học:                   | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| Giảng viên:                | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| Ngày:                      | 23/10/2026                             |
| Chữ ký:                    |  ![Chữ ký](signature_Hiep.png)         |

## Tham khảo

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.

- ISTQB Foundation Level Syllabus (latest version).

- Hardman, P. (2025). A Post-AI Learning Taxonomy.

- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.

- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.

- Anthropic (2025). Building reliable AI test agents — engineering blog.

- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
