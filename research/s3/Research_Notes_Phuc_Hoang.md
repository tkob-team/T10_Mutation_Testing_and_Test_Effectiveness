# Theory & Tool Research Notes

**Document Role:** Research notes cá nhân S3; đầu vào cho S4-B03 (report) và S4-A03 (guide: Advanced Usage, Failure Modes). Chưa phải report hoàn chỉnh.  
**Stage:** S3  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S3-A03, S3-B03  
**Domain / Section:** Theory — Equivalent Mutants, Limits & AI Approaches (A03); StrykerJS + Claude — Reusable Scripts/Prompts, Advanced Usage & Failure Modes (B03). Domain SUT: Authentication & Users.  
**Evidence Status:** Draft, **chờ member review**. Literature/docs đối chiếu ngày 2026-10-19. Ví dụ F-A03-05 và F-A03-06 có run thật trong **sandbox do Claude Code chạy trong phiên của Phúc Hoàng** (evidence: `experiments/s3/runs/Phuc_Hoang/A03-*`). Đây không phải baseline EShop chung (S3-D04) và không thay S3-C03/E03. Claude assertion experiment (S3-G03) **Not run**.

Ranh giới với notes teammate: định nghĩa, operators, workflow và Google diff-based nằm ở [Tấn Hiệp](Research_Notes_Tan_Hiep.md) (A01/B01). Coverage, mutant states, score và Claude prompt cho assertions nằm ở [Thái Hòa](Research_Notes_Thai_Hoa.md) (A02/B02). Notes này chỉ dẫn lại phần đó khi cần.

## Reading Route

1. **Hiểu vấn đề, khoảng 8 phút:** F-A03-01 → F-A03-02. Đọc để biết equivalent mutant là gì và vì sao không tự động hóa hoàn toàn được.
2. **Xem ví dụ chạy thật, khoảng 10 phút:** F-A03-05 (sandbox nhỏ) → F-A03-06 (Auth của EShop).
3. **Giới hạn và AI, khoảng 8 phút:** F-A03-03, F-A03-04.
4. **Dùng tool trong S3/S4, khoảng 12 phút:** F-B03-01 → F-B03-04. Nội dung gồm scripts/prompts tái sử dụng, advanced usage và failure modes.

Thời gian đọc ở trên là ước lượng, chưa đo thực tế.

## Questions & Inputs

| Question | Requirement / Source | Answer / Finding | Verification / Pending |
|---|---|---|---|
| Equivalent mutant là gì, khác survivor do test yếu thế nào? | A03; REQ-15; T10 §2, §6.2 | F-A03-01 | Jia & Harman §2.2, §4 [P01]; Stryker docs [P05] |
| Vì sao không tự động phát hiện hết; có kỹ thuật nào? | A03; REQ-15 | F-A03-02 | [P01] §4, TCE [P02] |
| Mutation testing có những giới hạn nào? | A03; REQ-03; T10 §7 takeaways | F-A03-03 | [P01] §2.3, §9.1; Google [P03][P04]; run F-A03-06 |
| AI đang được dùng để phát hiện equivalent/kill survivors ra sao? | A03; REQ-15; T10 §2, §4 | F-A03-04 | [P07][P08][P09]: abstract/trang paper, chưa đọc full text |
| Ví dụ nhỏ có expected result? | A03 Notes "thêm ví dụ nhỏ" | F-A03-05, F-A03-06 | **Run thật trong sandbox**, Stryker 10.0.0 |
| Scripts/prompts nào tái sử dụng được cho cả hai tool? | B03; REQ-09 | F-B03-01, F-B03-02 | StrykerJS config [P10]; Claude Code headless/skills [P13][P14]; chưa chạy `claude -p` |
| Advanced usage nào cần cho EShop? | B03; REQ-08 | F-B03-03 | [P10][P06]; mutate range, disable comments, Timeout đã chạy |
| Failure modes thật của hai tool? | B03; REQ-18 | F-B03-04 | 4 mục Stryker **đã tái hiện bằng run**; mục Claude dựa trên docs/literature, chờ S3-G03 |
| Scope S2 cho Auth | B03 đầu vào; `proposal/s2/T10_Seminar_Proposal.md` §Scope | Auth gồm: đăng nhập, token/quyền truy cập, user info; assertions cho trường hợp thành công / bị từ chối / quyền truy cập | Repo chưa có `docs/s2/Scope_and_Decisions.md`; dùng proposal S2 |

## Findings & Examples

### F-A03-01 — Equivalent Mutants: Definition and Classification

**Định nghĩa.** Một mutant là *equivalent* khi nó khác chương trình gốc về cú pháp nhưng **không có hành vi quan sát được nào khác**. Vì vậy không test nào kill được nó. Jia & Harman: *"syntactically different but functionally equivalent to the original program"* [P01 §2.2].

**Điểm quan trọng cho nhóm:** tính "tương đương" luôn gắn với **phạm vi xét**: tập input hợp lệ, trạng thái hệ thống có thể đạt tới, và cái gì được coi là output (giá trị trả về, DB, thời gian, bộ nhớ). Ellims et al. (dẫn qua [P01 §4]) chỉ ra có mutant cho cùng output nhưng khác thời gian chạy hoặc bộ nhớ. Do đó, khi viết "equivalent", phải ghi rõ phạm vi. Nếu chưa đủ lập luận thì dùng **equivalent candidate** (CONTEXT, Experiment Contract #6).

**Phân loại một survivor.** Một survivor có thể thuộc một trong các loại sau; chỉ loại cuối mới là equivalent thật:

| Loại | Dấu hiệu | Ví dụ trong notes này | Hành động |
|---|---|---|---|
| **Real gap** (test yếu) | Có input/state hợp lệ làm output khác, nhưng test không kiểm | `age > 18` sống với test chỉ dùng 30 (F-A03-05) | Viết assertion tại điểm khác biệt |
| **NoCoverage** | Không test nào chạy qua dòng đó | Route forgot/reset trong run rộng (F-A03-06) | Thêm test chạy tới; chưa bàn chuyện equivalent |
| **Stubborn / hard-to-kill** | Có khác biệt nhưng cần điều khiển khó (đồng hồ, lỗi DB, race) | `now <= locked_until`, `if (err)` (F-A03-06) | Cần harness: fake clock, inject lỗi |
| **Scope-dependent equivalent candidate** | Không kill được với state mà API tạo ra; kill được khi inject state | `newAttempts > 3` (F-A03-06) | Ghi phạm vi; quyết định scope test ở S3-D03 |
| **Equivalent** (trong phạm vi đã nêu) | Lập luận cho thấy mọi input trong phạm vi cho cùng output | `quantity >= 0`, guard `items.length === 0` (F-A03-05) | Ghi lập luận; có thể đánh dấu `Ignored` kèm lý do (xem rủi ro FM-S1) |

Grün et al. (dẫn qua [P01 §4]) gặp 4 tình huống equivalent phổ biến: mutant nằm trong dead code, mutant chỉ làm chạy nhanh hơn, mutant chỉ đổi internal state, và mutant không thể kích hoạt. Ví dụ E2 ở F-A03-05 thuộc nhóm "chỉ là đường tắt" (gần với "improves speed"): bỏ guard thì output không đổi.

**Phân biệt với "redundant/duplicate mutants".** Đây là các mutant tương đương *với nhau*, không phải với chương trình gốc. TCE phát hiện được cả hai loại [P02]. Chúng không làm sai score theo cách của equivalent, nhưng làm phồng tổng số mutant.

### F-A03-02 — Why Detection Is Hard, and Non-AI Techniques

**Undecidable.** Bài toán quyết định một mutant có tương đương với chương trình gốc hay không là undecidable (Budd & Angluin, dẫn qua [P01 §4]). Vì vậy không tool nào phát hiện được *hết*. Stryker nói rõ: *"There is no definitive way for Stryker to find and ignore them"* [P05].

**Quy mô.** Theo các nghiên cứu được tổng hợp trong [P01 §4], khoảng **10–40%** mutant là equivalent; Offutt & Craft ghi nhận khoảng **10%** trên 15 chương trình. Phân tích thủ công tốn thời gian (Stryker gọi là "time consuming" [P05]).

**Ảnh hưởng đến score.** Jia & Harman định nghĩa score trên *non-equivalent mutants* [P01 §2.2]. Stryker không biết mutant nào equivalent nên tính chúng là `Survived`, nằm trong mẫu số `valid` [P06]. Hệ quả: score của Stryker gần như không bao giờ đạt 100% với test tốt, trừ khi có mutant bị `Ignored`. Đây cũng là lý do T10 §7 ghi "100% is usually unrealistic".

**Các kỹ thuật không dùng AI** (theo [P01 §4], [P02]):

| Kỹ thuật | Ý tưởng | Kết quả được báo cáo | Áp dụng cho StrykerJS |
|---|---|---|---|
| Compiler optimization (Baldwin & Sayward; Offutt & Craft) | Tối ưu hai phiên bản; nếu ra cùng mã thì equivalent | ~10% mutants là equivalent trên 15 chương trình | Không có sẵn |
| **TCE** (Papadakis et al., ICSE 2015) | So sánh binary sau khi compile với `-O` | Loại >7% mutants (equivalent) và 21% (duplicate); phát hiện ~30% equivalent đã biết [P02] | Không áp dụng trực tiếp cho JS (không compile thành binary) |
| Constraint solving (Offutt & Pan) | Equivalent ⇔ path condition để kill không thỏa mãn được | 47.63% equivalent trên 11 chương trình | Lập luận tay theo cùng ý; xem F-A03-06 |
| Program slicing / dependence (Voas & McGraw; Hierons; Harman) | Thu gọn chương trình để người review dễ phân tích | Hỗ trợ người, không tự động hoàn toàn | Tư duy "biến này ảnh hưởng output nào" |
| Impact / coverage (Grün et al.) | Mutant thay đổi execution nhiều thì khó equivalent | Tương quan mạnh giữa impact và killability | Gợi ý ưu tiên review |
| Tránh tạo ra (Google: arid nodes, chọn operator theo lịch sử) | Không sinh mutant ít giá trị ngay từ đầu | [P03][P04] | `mutate` range, `excludedMutations`, disable comments |

Jia & Harman nhắc rủi ro của việc lọc mutant: *"retain the highly valuable, so-called stubborn mutants, while filtering out those that are equivalent. However, behaviorally these two classes of mutants are highly similar."* [P01 §9.1]. Ví dụ F-A03-06 (`<=` theo thời gian) minh họa đúng điểm này: một mutant trông như không kill được nhưng thực ra là stubborn.

### F-A03-03 — Limits of Mutation Testing

| # | Giới hạn | Nguồn | Ý nghĩa cho nhóm |
|---|---|---|---|
| L1 | **Chi phí tính toán**: mỗi mutant chạy lại test | [P01 §2.3, §3]; [P04]: Google 2 tỷ dòng, >150 triệu test/ngày | EShop nhỏ nhưng `server.js` gom mọi route: 92 mutants cho 79 dòng auth, chạy 23 s (F-A03-06). Dùng `mutate` range/incremental |
| L2 | **Equivalent mutant problem** | [P01 §4, §9.1]; [P05] | Score không đạt 100% dù test tốt; phải review tay; ghi remaining candidates (T10 §6.5) |
| L3 | **Human oracle problem**: ai quyết định output đúng? | [P01 §2.3] | `api_specification.md` §1–2 chỉ nêu response thành công; rule lock nằm ở `README.md` FR-02 [P16] (mỗi lần sai +1, khóa từ lần sai thứ 3, 30 giây). Test sandbox A3/A4 dùng behavior quan sát được (`+2`), **chưa phải expected từ spec**; phát hiện README sau khi viết sandbox (xem F-A03-06 #1) |
| L4 | **Giả định CPH/Coupling Effect**: mutant đơn giản đại diện cho lỗi thật | [P01 §2.1]; [Tấn Hiệp F-A01-01] | Kill nhiều mutant không chứng minh bắt được mọi lỗi thật |
| L5 | **Score phụ thuộc cấu hình/phạm vi** | [P06][P10]; run F-A03-06 | Cùng code và test: 34.78% (range 32–110) so với 53.33% (range login + middleware). Chỉ so sánh trên cùng baseline/config |
| L6 | **Timeout được tính là detected** | [P06]; run F-A03-06 v3 | Score 100% nhưng 6/60 là Timeout, không phải assertion kill. Báo `Killed`/`Timeout` riêng |
| L7 | **Score tăng ≠ test tốt hơn** | CONTEXT #5; FM-S1 | Đánh dấu `Ignored` làm score tăng từ 88.89% lên 100% mà test không đổi |
| L8 | **Developer attention**: mutant vô ích làm mất niềm tin | [P03][P04] | Google lọc mutants "likely to be irrelevant to developers" [P04]. Activity S5 nên chọn mutant có ý nghĩa nghiệp vụ |

### F-A03-04 — AI Approaches

Có ba hướng chính. Số liệu dưới đây lấy từ abstract/trang paper, chưa đọc full text.

**1. LLM phán đoán equivalent (Equivalent Mutant Detection, EMD).**
- Tian et al., ISSTA 2024 [P07]: đánh giá trên **3,302 cặp mutant Java** ở mức method. Chiến lược tốt nhất là *fine-tuned code embedding*, F1 cao hơn trung bình **35.69%** so với các kỹ thuật EMD trước đó. Chi phí train/inference tương đối thấp.
- Meta ACH, FSE 2025 Industry [P08]: agent LLM xác định equivalent đạt **precision 0.79 / recall 0.47**, tăng lên **0.95 / 0.96** khi có bước pre-processing đơn giản.
- Nhận xét: precision 0.79 nghĩa là khoảng 1/5 mutant bị LLM gọi là "equivalent" thực ra *không* equivalent. Nếu loại chúng khỏi mẫu số, score bị thổi phồng. Vì vậy verdict của AI chỉ là candidate (T10 §7: *"manual review is still required"*).

**2. LLM sinh test nhắm vào survivors.**
- MuTAP [P09]: đưa surviving mutants vào prompt để LLM sinh/sửa test. Kết quả: MS **93.57%** trên synthetic buggy code, phát hiện thêm tới **28%** đoạn code lỗi so với baseline. Tác giả kết luận LLM *"require specific post-processing steps"*.
- ACH [P08]: sinh ít mutant nhưng có mục tiêu (privacy), rồi sinh test kill chúng. 9,095 mutants, 571 test; kỹ sư chấp nhận **73%**.
- Đây là hướng gần nhất với phần việc của nhóm (Claude đề xuất assertions; xem [Thái Hòa §9]).

**3. LLM chọn hoặc sinh mutant có giá trị** (ACH: mutant theo "issue of concern"). Hướng này tương ứng với ý tưởng của Google: tránh tạo mutant vô ích [P04].

**Áp dụng cho nhóm (Proposed, chưa chạy):** dùng Claude theo hai vai, đều qua cổng kiểm chứng:
- (a) đề xuất assertion kill survivor, sau đó chạy lại Stryker để xác nhận `Killed`;
- (b) phân loại survivor theo bảng ở F-A03-01, kèm lập luận. Người review đối chiếu với code/spec. Chỉ khi có lập luận và phạm vi rõ mới ghi "equivalent". Không loại mutant khỏi mẫu số chỉ dựa trên verdict của AI.

Prompt mẫu ở F-B03-02.

### F-A03-05 — Worked Example 1: Sandbox Functions (run evidence)

**Code** (`experiments/s3/runs/Phuc_Hoang/A03-S1-src/equiv.js`):

```js
function cartTotal(items) {
  if (items.length === 0) return 0; // E2: redundant guard
  let total = 0;
  for (const item of items) {
    if (item.quantity > 0) {          // E1
      total += item.price * item.quantity;
    }
  }
  return total;
}
function canRegister(age) { return age >= 18; } // B1
```

**Expected results** (tính tay theo code): `cartTotal([{100,2},{50,1}]) = 250`; `cartTotal([]) = 0`; `cartTotal([{100,-1},{40,1}]) = 40`; `cartTotal([{100,0}]) = 0`; `canRegister(17) = false`, `canRegister(18) = true`.

**Run** (Stryker 10.0.0, jest 30.5.2, `coverageAnalysis: perTest`; lệnh `npx stryker run stryker.<v>.config.json`):

| Run ID | Test set | Mutants | Killed | Timeout | Survived | Ignored | Stryker score |
|---|---|---|---|---|---|---|---|
| A03-S1-weak | 2 test kiểu `> 0`, `age = 30` | 18 | 12 | 0 | 6 | 0 | 66.67% |
| A03-S1-strong | 4 test có expected chính xác + biên 17/18 | 18 | 16 | 0 | 2 | 0 | 88.89% |
| A03-S1-ignored | strong + 2 comment `Stryker disable` | 18 | 14 | 0 | 0 | 4 | 100.00% |

**Survivors của run strong, cả hai đều là equivalent trong phạm vi nêu:**

| Mutant | Lập luận | Phạm vi |
|---|---|---|
| E1 `item.quantity > 0` → `>= 0` | Chỉ khác khi `quantity === 0`; khi đó cộng thêm `price * 0 = 0`, nên total không đổi | `price` là số hữu hạn. Nếu `price = Infinity` thì `Infinity * 0 = NaN`, nên **không** equivalent |
| E2 `items.length === 0` → `false` | Bỏ guard thì vòng lặp trên `[]` không chạy và trả `total = 0`, cùng output | `items` là Array. Mutant chỉ đổi đường đi, không đổi output |

**Survivor của run weak nhưng không equivalent:** `age >= 18` → `age > 18`. Test `canRegister(18) === true` kill được mutant này (run strong cho `Killed`). Ngoài ra, `price / quantity` sống ở run weak vì assertion `> 0` không phân biệt được 50 với 200.

**Bài học:** run strong cho thấy survivor còn lại *có thể* là equivalent. Không thể suy ra điều đó từ run weak, nơi 6 survivors lẫn lộn real gap và equivalent.

### F-A03-06 — Worked Example 2: EShop Authentication (run evidence, sandbox copy)

**Phạm vi.** SUT commit `bd31bbf` (`backend/server.js`, sha1 `f9d3a16e…`), export bằng `git archive` sang scratchpad. **Repo SUT không bị sửa.** Mutate `server.js:32-66` (`POST /api/login`) và `server.js:100-110` (`authenticateToken`). Harness: Jest + supertest. `./database` được thay bằng fake in-memory (`A03-S2-harness/fakeDb.js`); app lấy qua spy `express.application.listen`, không mở port. Đây là harness tạm cho research, **không** phải quyết định seams của S3-D04.

**Code liên quan** (`server.js` @ `bd31bbf`):

```js
// L40
if (user.locked_until && new Date() < new Date(user.locked_until)) { return res.status(403)... }
// L54–57
const newAttempts = user.login_attempts + 2;
let lockedUntil = null;
if (newAttempts >= 3) { lockedUntil = new Date(Date.now() + 180000).toISOString(); }
```

**Ba bộ test:**
- v1: 6 test, chủ yếu kiểm status.
- v2 (*scope A*): 9 test black-box. Fixture chỉ dùng state mà API tạo ra được (`login_attempts` 0/2/4, `locked_until` null hoặc timestamp do login ghi); đồng hồ thật.
- v3: v2 cộng 3 test *scope B*: inject `login_attempts = 1`, fake clock `now == locked_until`, lỗi DB.

| Run ID | Mutate | Tests | Mutants | Killed | Timeout | Survived | NoCov | Score |
|---|---|---|---|---|---|---|---|---|
| A03-S2-auth-v1-wide | `32-110` | v1 | 92 | 29 | 3 | 25 | 35 | 34.78% |
| A03-S2-auth-v1 | `32-66`, `100-110` | v1 | 60 | 29 | 3 | 23 | 5 | 53.33% |
| A03-S2-auth-v2 | như trên | v2 | 60 | 50 | 6 | 3 | 1 | 93.33% |
| A03-S2-auth-v3 | như trên | v3 | 60 | 54 | 6 | 0 | 0 | 100.00% |

**Phân loại 3 survivors + 1 NoCoverage của v2:**

| Mutant | Loại | Lập luận | Kill ở v3 bằng |
|---|---|---|---|
| L56 `newAttempts >= 3` → `> 3` | **Scope-dependent equivalent candidate** | `login_attempts` chỉ được ghi ở L48 (`0`) và L60 (`prev + 2`); default DB là `0` (`database.js:56`). Vì vậy giá trị luôn chẵn, và `newAttempts` ∈ {2, 4, …}. Hai điều kiện chỉ khác khi `newAttempts = 3`, giá trị này không đạt được qua API | B1: `login_attempts = 1` → 3 → locked |
| L40 `now < locked_until` → `<=` | **Stubborn**, không equivalent | Chỉ khác khi `now` trùng `locked_until` đến từng ms. Đạt được về lý thuyết nhưng không test được ổn định với đồng hồ thật | B2: fake clock |
| L36 `if (err)` → `false` (+ L36 ObjectLiteral NoCov) | Stubborn, cần inject lỗi | fake DB không trả lỗi trong scope A | B3: `db.get` trả lỗi → 500 |

**Survivors của v1 bị kill ở v2** đều là real gap: `||` thay `&&` (kill bằng A6, lock đã hết hạn), `login_attempts - 2` (kill bằng kiểm DB state), các string/body mutants (kill bằng `toEqual({ error: ... })`), `if (err)` ở middleware (kill bằng A8, bad token → 403).

**Quan sát cần chuyển cho S3-D03/H03:**
1. Tăng `+2` mỗi lần sai nghĩa là lock sau **2** lần sai, dù code so sánh với ngưỡng 3. `api_specification.md` §1.2 không nêu rule lock, nhưng `README.md` FR-02 [P16] nêu: bộ đếm tăng "đúng 1 đơn vị", sai từ 3 lần liên tiếp thì khóa 30 giây. Code vi phạm cả hai (`+2`, và `180000` ms = 180 giây), nên đây là **lỗi gốc so với spec** (xem S3-D03: `DF-01`…`DF-03`). Bản ghi trước đây "spec không nêu, cần xác nhận" là thiếu sót do chưa đọc README. Test A3/A4 của sandbox vẫn mã hóa behavior của code (L3 oracle problem). Với code đúng spec (`+1`), `login_attempts` nhận mọi giá trị nguyên, nên mutant L56 `> 3` kill được qua API (khi đó có lần sai thứ 3 cho `newAttempts = 3`): phân loại "equivalent candidate" ở bảng trên chỉ đúng cho **code gốc hiện tại** (chưa kiểm bằng run trên bản `+1`)
2. 6 Timeout ở v3 đến từ `BlockStatement {}` của route handler: handler không trả response nên request treo. Chúng được tính vào score nhưng không phải assertion kill. **Tỷ lệ assertion kill v3 = 54/60 = 90%.**

**Remaining equivalent candidates (T10 §6.5), trong phạm vi notes:** chỉ E1, E2 (sandbox) và L56 `> 3` (Auth, scope A). Danh sách cho baseline thật sẽ do S3-H03 lập.

### F-B03-01 — Reusable Stryker Scripts

Dựa trên config đã chạy ở F-A03-05/06 [P10][P11]; chưa đặt vào repo SUT.

```jsonc
// stryker.auth.config.json: một file cho mỗi domain hoặc test set
{
  "testRunner": "jest",
  "coverageAnalysis": "perTest",
  "mutate": ["server.js:32-66", "server.js:100-110"], // line range: backend gom route trong một file
  "reporters": ["clear-text", "html", "json"],
  "htmlReporter": { "fileName": "reports/auth/mutation.html" },
  "jsonReporter": { "fileName": "reports/auth/mutation.json" },
  "jest": { "config": { "testEnvironment": "node", "testMatch": ["**/test/auth*.test.js"] } },
  "tempDirName": "stryker-tmp",   // docs troubleshooting: hidden tempDir có thể khiến Jest không tìm thấy test
  "concurrency": 2
}
```

```jsonc
// package.json scripts (Proposed)
"mutate:auth": "stryker run stryker.auth.config.json",
"mutate:auth:dry": "stryker run stryker.auth.config.json --dryRunOnly",
"mutate:auth:debug": "stryker run stryker.auth.config.json --logLevel trace --cleanTempDir false"
```

Script tóm tắt survivor từ JSON (đã dùng trong phiên này; đầu ra là input cho người review hoặc Claude):

```bash
node -e 'const r=require(process.argv[1]);for(const d of Object.values(r.files))for(const m of d.mutants)
if(m.status!=="Killed")console.log(m.status,"L"+m.location.start.line+":"+m.location.start.column,m.mutatorName,JSON.stringify(m.replacement))' reports/auth/mutation.json
```

### F-B03-02 — Reusable Claude Prompts and Invocation

**Cách gọi tái sử dụng** (Claude Code docs [P13][P14]; **chưa chạy** trong phiên này):
- Headless: `claude -p "<prompt>" --output-format json --json-schema '<schema>'`. Kết quả có cấu trúc nằm ở `structured_output`; dùng `--bare` để chạy giống nhau trên mọi máy (bỏ qua CLAUDE.md, hooks, skills của máy). Lưu ý: `--bare` cần `ANTHROPIC_API_KEY` và không dùng subscription login [P13].
- Skill dự án: `.claude/skills/<name>/SKILL.md` có frontmatter (`description`, `arguments`, `allowed-tools`) và nhận `$ARGUMENTS` hoặc `$0…`. Gọi bằng `/<name> <args>` [P14]. Hợp với prompt cố định mà mỗi thành viên chạy cho domain của mình.

**Prompt template: phân loại survivor** (bổ sung cho prompt sinh assertion ở [Thái Hòa §9.2]; Proposed):

```text
<role>You review surviving mutants from a StrykerJS report. You do not decide final verdicts.</role>
<context>
  <code file="{{FILE}}" lines="{{RANGE}}">{{SOURCE_EXCERPT}}</code>
  <spec>{{SPEC_EXCERPT}}</spec>
  <scope>{{STATE_AND_INPUT_SCOPE}}</scope>   <!-- e.g. "API-reachable states only; real clock" -->
  <tests>{{CURRENT_TESTS}}</tests>
</context>
<mutant id="{{ID}}">{{ORIGINAL}} -> {{REPLACEMENT}} ({{MUTATOR}}, status {{STATUS}})</mutant>
<task>
1. Quote the exact code lines that decide whether this mutant changes behavior.
2. Classify as one of: real-gap | no-coverage | stubborn | equivalent-candidate.
3. If real-gap or stubborn: give the concrete input/state that distinguishes original vs mutant,
   the expected value from the spec (or say "spec silent"), and one Jest assertion.
4. If equivalent-candidate: give the argument and the exact scope it depends on.
If the excerpt is insufficient, answer "insufficient context" instead of guessing.
</task>
```

Thiết kế theo docs Anthropic [P15]: cho phép trả lời "không biết", yêu cầu trích code nguyên văn trước khi lập luận, giới hạn trong tài liệu được cung cấp. Có thể chạy best-of-N rồi so sánh để phát hiện verdict không ổn định.

**Cổng kiểm chứng** (khớp CONTEXT #4, #6): lưu raw output → người review đối chiếu code/spec → với real-gap: thêm assertion và chạy lại Stryker, chỉ tính khi `Killed` (không tính `Timeout`) → với equivalent-candidate: ghi lập luận và phạm vi, không đổi mẫu số.

### F-B03-03 — Advanced Usage Relevant to EShop

| Feature | Cách dùng | Khi nào dùng | Trạng thái |
|---|---|---|---|
| Mutate line range | `"server.js:32-66"` | Tách domain trong `server.js` | **Đã chạy** (F-A03-06) |
| Disable comment có lý do | `// Stryker disable next-line <Mutator>: <reason>` → `Ignored`, không vào score [P12] | Chỉ cho equivalent đã có lập luận; xem FM-S1 | **Đã chạy** (A03-S1-ignored) |
| `mutator.excludedMutations` | Tắt một mutator toàn cục [P12] | Ví dụ bỏ `StringLiteral` của log message; rất thô | Docs |
| `incremental` / `--force` | Tái dùng kết quả cũ, file `reports/stryker-incremental.json` [P10] | Vòng lặp viết assertion; chạy `--force` trước khi báo số cuối | Docs; xem [Thái Hòa §7.2] |
| `thresholds.break` | Exit code 1 khi score thấp [P10] | CI gate. Không nên đặt 100 (L2) | Docs |
| `ignoreStatic` | Bỏ mutant chạy lúc load file; cần `perTest` [P10] | Route registration ở top-level `server.js` | Docs, chưa đo |
| `--dryRunOnly`, `--logLevel trace`, `--cleanTempDir false` | Chẩn đoán initial run và sandbox [P10][P11] | Khi "tests pass locally but fail in Stryker" | Docs |
| `disableBail` | Ghi mọi test kill một mutant [P10] | Muốn biết assertion nào (manual hay AI) kill mutant | Docs |
| Claude `--json-schema` | Output có cấu trúc để so sánh giữa các lần chạy [P13] | So sánh manual và AI trên cùng mutant (S3-G03) | Docs, Not run |

### F-B03-04 — Failure Modes (candidates for Guide REQ-18)

Mỗi mục ghi rõ: đã tái hiện bằng run, hay chỉ dựa trên docs/literature.

| ID | Tool | Failure mode: cách tool khiến người dùng hiểu sai | Evidence | Phòng tránh |
|---|---|---|---|---|
| FM-S1 | Stryker | **Disable comment ẩn luôn mutant kill được.** `disable next-line EqualityOperator` ignore *mọi* EqualityOperator trên dòng, kể cả `<= 0` đã bị kill. Kết quả: 4 Ignored (2 trong đó killable), score từ 88.89% lên 100% | **Run** A03-S1-strong so với A03-S1-ignored | Disable ở mức mutant nhỏ nhất có thể; ghi lý do; báo cả score trước khi ignore |
| FM-S2 | Stryker | **Timeout được tính là detected**: score 100% nhưng 6/60 mutant chỉ làm request treo | **Run** A03-S2-auth-v3; công thức [P06] | Báo `Killed`/`Timeout` riêng; tính tỷ lệ assertion kill (54/60) |
| FM-S3 | Stryker | **Cùng mutant đổi trạng thái giữa các test set**: L46:37, L53:12 và L105:48 là `Killed` ở v1 nhưng `Timeout` ở v2/v3 | **Run** v1 so với v2 (`compare_runs.js`) | So sánh theo từng mutant + trạng thái, không chỉ theo tổng |
| FM-S4 | Stryker | **Score phụ thuộc phạm vi mutate**: cùng code và test cho 34.78% hoặc 53.33% | **Run** A03-S2-auth-v1-wide so với v1 | Chốt `mutate` trong baseline manifest; không so score khác config |
| FM-S5 | Stryker | **Survived ≠ test yếu**: equivalent/scope-dependent vẫn hiện là Survived; tool không phát hiện được [P05] | **Run** F-A03-05/06 | Phân loại theo bảng F-A03-01 |
| FM-S6 | Stryker + Jest | "All mutants survive"/"No tests executed" khi tempDir ẩn hoặc do `findRelatedTests` [P11] | Docs; phiên này đặt `tempDirName: stryker-tmp` nên chưa gặp | Đặt tempDir không ẩn; kiểm dry run |
| FM-C1 | Claude | **Verdict "equivalent" sai**: agent của ACH có precision 0.79 trước pre-processing [P08] | Literature | Không loại khỏi mẫu số theo AI; người review + lập luận phạm vi |
| FM-C2 | Claude | **Assertion mã hóa bug hiện tại**: khi chỉ thấy code, AI (và cả người, như A3/A4) dễ lấy behavior `+2` làm expected | Quan sát trong phiên (F-A03-06 #1); L3 oracle | Đưa spec vào prompt (cả `README.md` FR/SEC, không chỉ API spec); ghi "spec silent" thay vì đoán |
| FM-C3 | Claude | **Hallucination / không ổn định giữa các lần chạy** [P15] | Docs | Bắt trích code; best-of-N; chạy lại Stryker là bằng chứng duy nhất |
| FM-C4 | Claude Code | **Context khác nhau giữa các máy**: `-p` thường load CLAUDE.md/hooks của máy; `--bare` thì không [P13] | Docs | Dùng `--bare` + prompt file trong repo khi cần tái lập |

## Source Register

| ID | Title / Author | URL / File & Section | Claim Supported | Access Date |
|---|---|---|---|---|
| P01 | Y. Jia, M. Harman, "An Analysis and Survey of the Development of Mutation Testing," IEEE TSE 37(5):649–678, 2011, DOI 10.1109/TSE.2010.62 | [PDF bản sao](https://kelloggm.github.io/martinjkellogg.com/teaching/cs684-sp24/assets/mutation-testing.pdf): §2.2, §2.3, §4, §9.1 | Định nghĩa, undecidable, 10–40%, các kỹ thuật EMD, oracle problem, stubborn mutants | 2026-10-19 |
| P02 | M. Papadakis, Y. Jia, M. Harman, Y. Le Traon, "Trivial Compiler Equivalence…," ICSE 2015 | [PDF](https://orbilu.uni.lu/bitstream/10993/20289/1/ICSE15.pdf), Abstract | TCE: >7% equivalent, 21% duplicate, ~30% equivalent đã biết | 2026-10-19 |
| P03 | G. Petrović, M. Ivanković, "State of Mutation Testing at Google," ICSE-SEIP 2018 | https://research.google/pubs/state-of-mutation-testing-at-google/ (abstract) | Diff-based, arid lines, developer attention | 2026-10-19 |
| P04 | G. Petrović, G. Fraser, M. Ivanković, R. Just, "Practical Mutation Testing at Scale: A view from Google," IEEE TSE 2021 | https://research.google/pubs/practical-mutation-testing-at-scale-a-view-from-google/ (abstract) | Chi phí ở quy mô lớn, lọc mutant irrelevant, chọn theo lịch sử operator | 2026-10-19 |
| P05 | Stryker — Equivalent mutants | https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/ | Tool không phát hiện được; cách xử lý | 2026-10-19 |
| P06 | Stryker — Mutant states and metrics | https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/ | Định nghĩa states; `detected = killed + timeout`; score | 2026-10-19 |
| P07 | Z. Tian et al., "Large Language Models for Equivalent Mutant Detection: How Far Are We?," ISSTA 2024 | https://arxiv.org/abs/2408.01760 (abstract) | 3,302 cặp; fine-tuned embedding; +35.69% F1 | 2026-10-19 |
| P08 | C. Foster et al., "Mutation-Guided LLM-based Test Generation at Meta," FSE 2025 Industry | https://arxiv.org/abs/2501.12862 (abstract) | ACH; EMD agent P 0.79 / R 0.47 (0.95 / 0.96); 73% test được chấp nhận | 2026-10-19 |
| P09 | A. M. Dakhel et al., "Effective Test Generation Using Pre-trained LLMs and Mutation Testing" (MuTAP), arXiv 2023 | https://arxiv.org/abs/2308.16557 (abstract) | Đưa survivors vào prompt; MS 93.57%; cần post-processing | 2026-10-19 |
| P10 | StrykerJS — Configuration | https://stryker-mutator.io/docs/stryker-js/configuration/ | mutate range, incremental, thresholds, ignoreStatic, dryRunOnly, disableBail, tempDirName… | 2026-10-19 |
| P11 | StrykerJS — Getting started; Troubleshooting | https://stryker-mutator.io/docs/stryker-js/getting-started/ ; https://stryker-mutator.io/docs/stryker-js/troubleshooting/ | `npm init stryker@latest`, `npx stryker run`, `--logLevel trace`; lỗi Jest tempDir | 2026-10-19 |
| P12 | StrykerJS — Disable mutants | https://stryker-mutator.io/docs/stryker-js/disable-mutants/ | Comment syntax, `Ignored` không vào score | 2026-10-19 |
| P13 | Claude Code — Run Claude Code programmatically | https://code.claude.com/docs/en/headless | `-p`, `--output-format json`, `--json-schema`, `--bare` | 2026-10-19 |
| P14 | Claude Code — Skills | https://code.claude.com/docs/en/skills | `SKILL.md`, frontmatter, `$ARGUMENTS` | 2026-10-19 |
| P15 | Anthropic — Reduce hallucinations | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | Cho phép "không biết", trích dẫn, best-of-N; không loại bỏ hoàn toàn hallucination | 2026-10-19 |
| P16 | EShop SUT — System Requirements (`README.md` FR-01…FR-04, SEC-01…SEC-07) | `eshop-sut-fithcmus/README.md` @ `bd31bbf` | Rule lock FR-02, OTP FR-03/SEC-07, hồ sơ FR-04/SEC-06 | 2026-10-22 |
| L01 | EShop SUT `backend/server.js`, `backend/database.js`, `api_specification.md` §1–2 @ `bd31bbf` | `/Users/nphoang/Developer/hcmus/software-testing/eshop-sut-fithcmus` | Code login/lock/middleware; default `login_attempts`; spec Auth | 2026-10-19 |
| L02 | Run evidence của notes này | `experiments/s3/runs/Phuc_Hoang/A03-*` (HTML/JSON/console/config/tests/versions) | Số liệu F-A03-05/06, FM-S1–S5 | 2026-10-19 |
| L03 | Proposal S2 — Scope | `proposal/s2/T10_Seminar_Proposal.md` (bảng scope domain) | Phạm vi Auth & Users | 2026-10-19 |

## Handoff

- Target stage / task / section:
  - S4-B03 (report): Background (equivalent mutants), Limits / Threats to Validity, Related Work (AI approaches).
  - S4-A03 (guide): Advanced Usage, Failure Modes (REQ-18), Troubleshooting.
  - S3-D03/H03/I03: dùng bảng phân loại, quan sát `+2` (nay là lỗi gốc theo README FR-02) và harness tham khảo.
  - S3-G03: dùng prompt F-B03-02.
  - S5 activity: dùng E1/B1 làm cặp "equivalent vs killable".
- Main conclusions:
  - Equivalent là khái niệm *theo phạm vi*; một mutant có thể là equivalent candidate ở black-box scope và killable khi inject state (L56, đã chạy).
  - Stryker không phát hiện equivalent; `Ignored` và `Timeout` đều có thể đẩy score lên 100% mà không phản ánh chất lượng assertion (đã chạy).
  - AI (LLM-EMD, ACH, MuTAP) hữu ích để lọc và đề xuất, nhưng precision/recall chưa đủ để thay quyết định của người; cổng kiểm chứng là chạy lại Stryker.
- Open questions:
  1. ~~Rule lock tài khoản: `+2` / ngưỡng 3 là intended hay defect?~~ Đã có căn cứ: `README.md` FR-02 [P16] quy định +1 và khóa 30 giây, code lệch → lỗi gốc (S3-D03 `DF-01`…`DF-03`). Còn chờ nhóm xác nhận: baseline giữ code lỗi nguyên trạng (mặc định) hay có sửa.
  2. Harness cho baseline chung (S3-D04) có dùng fake DB/spy `listen` như sandbox này không, hay thêm seam vào production code?
  3. Có cho phép test scope B (inject state/clock) trong baseline? Câu trả lời quyết định L56 là equivalent candidate hay real gap.
  4. Full text P03, P07–P09 chưa đọc; số liệu lấy từ abstract.
  5. `claude -p --json-schema` chưa chạy thử; kiểm ở S3-G03.
- AI record: [AI_Record_Phuc_Hoang.md](../../ai-audit/AI_Record_Phuc_Hoang.md), artifact `PH-S3-A03B03-01`; transcript [ai-audit/evidence/s3/Phuc_Hoang/](../../ai-audit/evidence/s3/Phuc_Hoang/). Member verdict/reflection còn Pending.

## Report Outline Input

| Report section (S4) | Notes dùng | Lưu ý |
|---|---|---|
| Background — Equivalent mutant problem | F-A03-01, F-A03-02 | Dùng thuật ngữ "equivalent candidate" khi chưa chứng minh |
| Worked example / Motivation | F-A03-05 (sandbox), F-A03-06 (Auth) | Ghi rõ sandbox copy `bd31bbf`, không phải baseline chung; thay bằng số baseline khi có |
| Threats to validity / Limits | F-A03-03, FM-S1–S5 | Báo `Killed`/`Timeout`/`Ignored` riêng |
| Related work — AI approaches | F-A03-04 | Số liệu từ abstract; đọc full text nếu đưa vào bảng so sánh |
| Method — AI workflow | F-B03-02 | Kết hợp với [Thái Hòa §9] và [Tấn Hiệp F-B01-02] |
| Guide — Advanced Usage / Failure Modes | F-B03-01, F-B03-03, F-B03-04 | ≥3 failure modes thật: FM-S1, FM-S2, FM-S4 đã có run |
