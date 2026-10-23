# Demo Script: StrykerJS and an AI Agent

**Distribution:** Not_submit. Kịch bản chuẩn bị quay; file nộp là video/link thật.
**Target:** video 5 đến 8 phút; flow dưới đây khoảng 7 phút 40 giây.
**Language:** lời dẫn tiếng Việt, giữ English technical terms.
**Status:** manual tutorial và activity sandbox đã được Agent kiểm chứng trên Windows; cảnh AI và video phải được người quay thực hiện thật.

## 1. Recording Setup

Dùng cùng workshop starter 6d2e790 như User Guide. Một kịch bản dùng chung, ba người có thể chia các đoạn A, B, C; cách chia này dành cho quay video, không thay phân công nghiên cứu từng domain của nhóm. Mỗi người có thể quay lại toàn bộ flow từ đầu.

| Presenter | Segment | Handoff |
|---|---|---|
| A | Theory, tool roles, installation | B nhận baseline tests/config chưa có assertions mới |
| B | Basic Stryker, ba manual observations | C nhận baseline riêng, không nhận đáp án manual trong prompt |
| C | AI candidate, verification, limits | Chốt bằng kết quả thật và thông điệp áp dụng |

Chuẩn bị hai clone riêng: demo-manual và demo-ai. Cài môi trường trước buổi quay thử, rồi quay cảnh cài đặt thật trên clone dành cho take chính. Tăng cỡ chữ terminal/editor, tắt thông báo, không hiển thị token hoặc màn hình đăng nhập có thông tin riêng.

Mỗi clone dùng Node 24.x. Làm theo Install của User_Guide.md để có Stryker core/Jest runner 10.0.0 và stryker.config.json. Config demo chọn lines 286, 293, 335 và suite Cart & Orders, khác config activity có thêm line 314. Không dùng lẫn reports giữa hai bài.

## 2. Theory and Principles

Lồng lý thuyết vào thao tác, không đọc một bài giảng dài trước demo:

| Term / Tool | Lời giải thích cần truyền đạt |
|---|---|
| Mutation testing | Kiểm tra tests có nhận ra một thay đổi nhỏ trong chương trình không |
| Coverage | Cho biết code đã được chạy; chưa xác nhận assertion quan sát đúng hành vi |
| Mutant / mutator | Bản code có một thay đổi / quy tắc tạo thay đổi |
| Assertion / oracle | Điều kiện kiểm tra / căn cứ xác định expected behavior từ spec |
| Baseline | Source, config và tests ban đầu dùng làm mốc |
| Killed / Survived | Có test fail khi mutant hoạt động / tests vẫn pass |
| Timeout | Chạy vượt thời gian; không đồng nghĩa assertion đã phát hiện lỗi |
| Equivalent candidate | Mutant có thể không đổi hành vi trong phạm vi xét, cần lập luận |
| StrykerJS | Đọc config, sinh mutants, tạo sandbox, chạy original tests, chạy từng mutant và xuất report |
| Jest / Supertest | Đánh giá assertions / gửi request vào Express app trong harness |
| AI Agent | Đọc context, đề xuất tests và có thể chạy lệnh; expected behavior vẫn phải được review với spec |

**Automation level:** semi-automated. Sinh/chạy mutants, chọn tests và tổng hợp reports được tự động hóa; chọn oracle, phân tích survivor, review AI và kết luận vẫn có thao tác của người thực hiện.

## 3. Scene-by-Scene Flow

### Scene 1. Why Test the Tests? (0:00 to 0:40)

**Screen:** CO-02 và business rule giỏ mới phải rỗng.
**Action:** trỏ vào assertion status 200, chưa thêm body assertion.
**Narration:** "Test này pass khi API trả 200. Nhưng nếu giỏ mới có một phần tử sai thì sao? Coverage chỉ cho biết code được chạy. Mutation testing sẽ cố ý đổi code để kiểm tra tests có nhận ra sai khác không."

Giới thiệu mutant, assertion, oracle và hai công cụ StrykerJS + AI Agent bằng ngôn ngữ ở bảng trên.

### Scene 2. Installation Demo (0:40 to 1:35)

**Screen:** terminal tại thư mục cha muốn lưu clone.

~~~sh
git --version
node --version
npm --version
git clone https://github.com/tkob-team/eshop-sut-workshop.git demo-manual
cd demo-manual
cd backend
npm ci
npm test
npm install --save-dev --save-exact @stryker-mutator/core@10.0.0 @stryker-mutator/jest-runner@10.0.0
~~~

Nếu dùng Codex cho cảnh AI, quay thêm lệnh cài CLI và version; nếu dùng Claude Code, lấy đúng lệnh theo hệ điều hành ở Install của User Guide. Đăng nhập trước khi quay nội dung có credentials.

~~~sh
npm install -g @openai/codex
codex --version
~~~

**Action:** tạo stryker.config.json bằng nguyên nội dung Install trong User Guide; chỉ rõ testRunner, mutate, testMatch và projects: [].
**Narration:** "Workshop đã có 88 tests do nhóm bổ sung, chưa cài Stryker. Tests dùng database trong bộ nhớ và không cần mở server riêng. Stryker dùng Jest để chạy tests trên từng phiên bản code bị đổi."

**Checkpoint:** 4 suites/88 tests pass; không đọc thành công nếu output thực tế khác. Có thể tăng tốc hoặc cắt phần tải packages, ghi rõ đoạn được tăng tốc; giữ lệnh và kết quả thật trong video.

### Scene 3. Basic Features Demo (1:35 to 2:35)

~~~sh
npm run test:cart
npx stryker run
cp reports/mutation.json reports/baseline.json
cp test/cart-orders.test.js reports/cart.baseline.test.js
~~~

**Screen:** HTML report ở reports/mutation.html, chọn server.js.
**Action:** chỉ ra 36 tests pass, 7 Survived trong phạm vi đã chọn; mở ArrayDeclaration line 286, so sánh [] với ["Stryker was here"].
**Narration:** "Stryker giữ code gốc trong checkout, chạy bản bị đổi ở sandbox rồi phân loại kết quả. Mutant này sống sót vì CO-02 chỉ nhìn status, chưa nhìn nội dung giỏ."

Giải thích Killed, Survived và vì sao ID không thay cho signature gồm vị trí, mutator, replacement.

### Scene 4. Advanced Manual Workflow (2:35 to 4:10)

**Action:** thêm đúng ba assertions như First Test và Advanced Usage của User Guide:

1. CO-02: expect(res.body).toEqual([]).
2. CO-04: GET sau hai POST và kiểm tra body bằng [itemA, itemB].
3. CO-12: import orderStatus, kiểm tra await orderStatus(db, id) bằng canceled.

**Narration:** "Ba checkpoints quan sát ba phần: giỏ khởi tạo, dữ liệu sau thao tác ghi và trạng thái đơn đã lưu. CO-12 dùng test.each để chạy cùng kiểm tra với pending và confirmed, đây là data-driven testing."

~~~sh
npm test
npx stryker run
cp reports/mutation.json reports/manual.json
~~~

**Checkpoint:** 88 tests pass; 7 Killed, 0 Timeout ở scope demo. Có thể minh họa lần thêm assertion đầu riêng: kết quả tham chiếu là 3 Killed, 4 Survived. Nếu rút gọn video, vẫn giải thích vì sao cả ba assertions cần thiết.

**Narration:** "Những đoạn này là đáp án hướng dẫn có sẵn. Làm lại demo không được xem là một thực nghiệm tự thiết kế manual assertions độc lập."

### Scene 5. Advanced AI Workflow (4:10 to 6:40)

**Screen:** clone demo-ai độc lập, cùng source/config và baseline test ban đầu. Dùng agent mới, không cho đọc report manual hoặc lời giải ở guide. Người quay đã biết đáp án nên chỉ gọi đây là demonstration, không phải blind experiment.

**Action:** khởi động Claude Code hoặc Codex đã đăng nhập; hiện tên công cụ/model thực tế. Prompt dùng chung:

~~~text
Đọc ../api_specification.md, ../docs/EShop_SRS.md, test/cart-orders.test.js,
test/helpers/app.js, stryker.config.json và reports/baseline.json.
Phân tích ba mutants: line 286 [] thành ["Stryker was here"],
line 293 xóa push(req.body), line 335 "canceled" thành "".
Chỉ bổ sung assertions trong test/cart-orders.test.js.
Giữ tests hiện có, không sửa production, helpers, dependencies hoặc config.
Nêu oracle cho từng assertion và giải thích cách phát hiện mutant.
~~~

**Action:** cho xem candidate và một quyết định review cụ thể: đúng spec, thiếu observation, fixture sai hoặc cần chỉnh sửa. Không đọc một nhận xét đã chuẩn bị như thể AI vừa đưa ra nếu output thực tế khác.

~~~sh
git diff -- test/cart-orders.test.js
npm test
npx stryker run
cp reports/mutation.json reports/ai.json
~~~

**Narration:** "AI đề xuất một candidate. Chỉ sau khi review và chạy original tests cùng mutation tests mới biết nó có ích không. Một test pass trên code gốc chưa chứng minh nó kill được mutant."

**Checkpoint:** ghi số Killed/Survived/Timeout thực tế; đối chiếu cùng ba signatures, không chỉ nhìn score. Nếu candidate không kill được mutant, quay luôn kết quả đó và phần sửa lại. Chưa chạy cảnh này thì các ô dưới để trống.

| Tool / Model | Original tests | Target kills | Student edits |
|---|---|---|---|
| | | | |

### Scene 6. Limits and Takeaway (6:40 to 7:40)

**Screen:** manual/AI reports, cột Killed và Timeout, phạm vi mutate.
**Narration:** "100% ở đây chỉ là 7 mutants của ba dòng. Stryker không kiểm tra toàn bộ lỗi thật của EShop. Timeout được tính vào detected nhưng khác assertion kill. Survivor cũng có thể là equivalent candidate, cần tìm input phân biệt hoặc lập luận trong phạm vi rõ ràng. AI có thể viết lại một status check không hữu ích hoặc lấy code sai làm expected result."

Nêu cách xử lý từng điểm yếu: mở rộng scope có kiểm soát; đọc failure/killedBy; giữ Timeout riêng; dùng spec làm oracle; kiểm chứng candidate.

**Closing line:** "Trong case study này, công cụ hỗ trợ đánh giá độ nhạy của tests API, còn việc xác định hành vi đúng và chấp nhận kết quả vẫn cần review. Quy trình có thể lặp lại bằng config, tests, prompt và reports đã lưu."

## 4. Failure and Recovery

| Situation | Thao tác khi quay |
|---|---|
| npm ci lỗi | Kiểm tra backend, Node 24, lockfile và SQLite build scripts theo Troubleshooting của guide; quay lại sau khi cài thành công |
| Original tests fail | Dừng diễn giải mutation score, sửa nguyên nhân hoặc reset clone về starter |
| AI login/network lỗi | Chuyển sang take khác sau khi sửa; nếu dùng saved output thì ghi rõ đó là bản đã lưu và hiện nguồn thật |
| Stryker runtime error | Mở log, báo riêng với Killed; giữ config demo đã kiểm chứng |
| Run quá dài | Cắt/tăng tốc đoạn chờ và giữ kết quả thật; không tạo output giả |
| Khác nhau giữa các take | Ghi source/config/model của từng take, không ghép baseline của take này thành kết quả take khác |

## 5. Capture and Delivery Checklist

- Quay đủ Installation, Basic Features và Advanced Workflow trên EShop thật.
- Có thao tác của StrykerJS và thao tác AI Agent thật, không chỉ slide giới thiệu.
- Giữ cùng baseline giữa hai clone, các reports được đặt tên riêng.
- Hiện rõ data-driven và checkpoints; không gọi chạy lại tests là Record & Playback.
- Tiếng dễ nghe, terminal đọc được, không lộ credentials.
- Kiểm tra runtime video 5 đến 8 phút và đoạn bàn giao của ba người.
- Điền Demo_Video_Link.md bằng link/video/version và kiểm tra access sau khi có media.
- Chưa có video hoặc member rehearsal thật thì giữ trống kết quả tương ứng.

## 6. Requirements Mapping

| Requirement | Scene |
|---|---|
| Theory, terms, features, principles | 1, 2, 3 |
| Installation / basic / advanced scenarios | 2 / 3 / 4 and 5 |
| Traditional tool and AI tool | 3 and 5 |
| At least 3 survivors and assertions | 4 |
| Data-driven and checkpoints | 4 |
| Semi-automated workflow | 2 through 5 |
| Weaknesses and limitations | 5 and 6 |
| Reusable prompt and repeatable case | 5, common workshop starter |

Nguồn: User Guide của bài thực hành; yêu cầu seminar T10 về screencast 5 đến 8 phút và demo StrykerJS + AI Agent. Script là hướng dẫn quay, không xác nhận ba thành viên đã quay hoặc tự chạy.
