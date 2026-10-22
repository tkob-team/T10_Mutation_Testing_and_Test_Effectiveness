# Stage 3 — Team Summary

**Cập nhật: 2026-10-23.** Bản đọc nhanh cho cả ba người, dựa trên evidence đã lưu. Kết quả Codex chạy lại được ghi riêng với runs và xác nhận của từng thành viên.

## Shared Baseline

S3 kiểm tra xem **tests có nhận ra code sai hay không**. Stryker sửa một chi tiết nhỏ, tạo ra **mutant**. Test nhận ra sai khác thì mutant bị **Killed**; bỏ sót thì **Survived**. **Assertion** là câu kiểm tra cụ thể như “giỏ hàng phải chứa đủ hai sản phẩm”. Nhóm so ba bộ: baseline (tests ban đầu), manual (thêm assertions từ phân tích) và AI (thêm assertions do agent đề xuất).

- **D04 freeze tại SUT `806ba19`:** 88 tests pass = Cart 36 + Coupons 26 + Auth 26. DB test riêng trong bộ nhớ, dữ liệu được reset; Coupons cố định thời gian. Production code/DB gốc giữ nguyên.
- **54 defect cases chạy riêng:** Cart 9 + Coupons 22 + Auth 23, đều fail tại assertions. Chúng ghi nhận lỗi gốc hoặc expected còn cần xác nhận; không đưa vào baseline đang pass, không đổi expected để coi bug là đúng.
- Các bảng dưới là **runs trên cùng frozen baseline**, có cả phần Codex chạy lại. Runs lịch sử của teammate giữ nguyên, có thể khác Timeout/Errors do điều kiện chạy.

Trong bảng: **K** = Killed; **T** = Timeout (quá thời gian); **S** = Survived; **NC** = NoCoverage (test không đi tới chỗ sửa); **E** = RuntimeError (lỗi thực thi mutant). Timeout không phải assertion kill. Score Stryker tính cả Timeout; không cộng hoặc lấy trung bình score giữa domains.

## Tấn Hiệp — Cart & Orders

**Phần việc:** giỏ hàng, checkout, xem/hủy đơn và quản lý trạng thái đơn. Research, tutorial, baseline, manual và AI đã có evidence; comparison và xác nhận hoàn tất task cần theo log/review của Hiệp.

**Tests và lỗi gốc:** 36 baseline tests chủ yếu kiểm tra status code; 9 defect tests tách riêng. Ví dụ lỗi: thêm trùng sản phẩm không gộp quantity, tin tổng tiền client gửi, checkout không xóa giỏ, thiếu kiểm tra quyền và chuyển trạng thái đơn sai.

**Manual kiểm tra sâu hơn:** giỏ mới phải rỗng; thêm hai sản phẩm phải giữ đủ hai; hủy đơn phải lưu đúng `canceled` trong DB. Đây là ba case nghiệp vụ khác nhau có mapping mutants. Một số tests khác kiểm tra error body theo quy ước/code, nên không gọi mọi kill là một lỗi nghiệp vụ độc lập.

| Bộ tests | Tests pass | K | T | S | NC | E |
|---|---:|---:|---:|---:|---:|---:|
| Baseline | 36 | 82 | 25 | 34 | 2 | 7 |
| Manual của Hiệp, Codex chạy lại | 44 | 105 | 25 | 11 | 2 | 7 |
| AI bàn giao, Codex chạy lại | 41 | 95 | 25 | 21 | 2 | 7 |

**Hiểu nhanh:** cùng 150 mutants, manual bắt thêm **23**, AI bắt thêm **13**. Đây là kết quả của các bộ tests cụ thể; chưa đủ để kết luận chung người tốt hơn AI. AI Cart dùng Claude Code, có giới hạn context ghi trong log gốc.

**Mở để xem:** [manual code đã chạy lại](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-reproduced-manual/cart-orders.manual.js), [AI code đã chạy lại](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/cart-reproduced-ai/cart-orders.ai.js), [log Hiệp](../experiments/s3/Experiment_Log_Tan_Hiep.md). Code SUT tương ứng: `origin/s3/F01-manual @ b77f5d6`, `origin/s3/G01-ai @ f4696c6`.

**Còn lại:** Hiệp chốt review/comparison theo frozen baseline và tự chạy lại Coupons theo vòng **I01**; bổ sung AI audit inputs còn thiếu.

## Thái Hòa — Coupons

**Phần việc:** điều kiện áp mã, hạn sử dụng, kiểu giảm giá, giới hạn lượt dùng; ghép baseline chung D04. Research/tutorial, bộ tests và baseline/manual/AI comparison đã có evidence do Codex thực hiện.

**Tests và lỗi gốc:** 25 tests + 1 API flow pass; 22 defect tests fail riêng. Lỗi nổi bật: tính giảm phần trăm sai, sai tại đúng mức tối thiểu/hạn hết hạn, thiếu kiểm tra token/quyền và dữ liệu tạo coupon.

**Manual ở đâu?** SUT `backend/test/manual/coupons.manual.js`; bản gốc trên `s3/F02-coupons @ a6abc7f`. Hiện file cũng đã có trên `main`. Xem bản gốc không cần đổi nhánh, chạy tại repo SUT:

```powershell
git show a6abc7f:backend/test/manual/coupons.manual.js
```

Ba test ban đầu dùng coupon giới hạn **3 lượt/người**:

- **MF-01:** nhập 3 thì đọc lại phải đúng 3.
- **MF-02:** đã dùng 2 lượt thì vẫn áp được; đơn 100.000 giảm 25.000, còn 75.000.
- **MF-03:** đã dùng 3 lượt thì bị từ chối, không phát sinh usage mới.

Case tạo coupon cũ chỉ nhập `1`, nên không phát hiện hai mutants biến giới hạn lưu thành `1`. Nhập `3` rồi đọc lại bắt được cả hai; mapping ghi **MF-01 kill mutants 111/113 tại dòng 474**. Ba test này vẫn chỉ nhắm một nhóm logic, không phải ba lỗi độc lập. Expected dựa FR-17/FR-09 C5; riêng HTTP `400` là quy ước nhóm.

| Bộ tests | Tests pass | K | T | S | NC | E |
|---|---:|---:|---:|---:|---:|---:|
| Baseline | 26 | 39 | 21 | 30 | 25 | 5 |
| F02 manual draft, trước bổ sung | 29 | 41 | 21 | 28 | 25 | 5 |
| G02 AI candidate, trước bổ sung | 28 | 41 | 21 | 28 | 25 | 5 |

**Hiểu nhanh:** cùng 120 mutants, cả hai bộ bắt thêm **2**. Score 52,17% → 53,91%; chỉ tính assertion kills trên 115 mutants hợp lệ thì 33,91% → 35,65%.

**Bổ sung theo yêu cầu Hòa:** manual có thêm **4 nhóm / 6 cases** (MF-04–07): chọn đúng mã, minimum nhập qua Admin, expiry nhập qua Admin và usage đúng người/đúng coupon. Agent có đủ **8 nhóm / 12 cases** (AG-01–08), gồm bốn nhóm đó và duplicate giữ nguyên dữ liệu, xóa rồi thử áp mã, list nhiều mã, invalid JWT. Giữ các tests cũ; fresh profiles pass **35 manual / 40 Agent** (đã gồm 26 baseline Coupons). [Kết quả mutation và mapping mới](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md).

Mutation mới của cả hai vẫn **41 K / 21 T / 28 S / 25 NC / 5 E**. Các groups mới chưa kill thêm mutant so với variants cũ; không đánh đồng thêm tests với tăng mutation score.

**Nguồn gốc:** Hòa giao Codex soạn manual để review; G02 cũng dùng Codex cùng context sau lỗi đăng nhập Claude. Các phần bổ sung tiếp tục do Codex hỗ trợ theo phân chia người dùng đã chốt. Cả hai có AI hỗ trợ, không phải phép so sánh người/AI độc lập. Nguồn gốc này được lưu tại [AI Record](../ai-audit/AI_Record_Thai_Hoa.md).

**Mở để xem:** [survivor analysis](../experiments/s3/Coupons_Survivor_Analysis_Thai_Hoa.md), [manual mutation HTML](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/f02-mutation/mutation.html), [mapping test → mutant](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/coupons-f02-comparison.md), [log Hòa](../experiments/s3/Experiment_Log_Thai_Hoa.md).

**Còn lại:** Hòa review assertions và ghi phần chấp nhận/cần sửa; tự chạy khi sẵn sàng. **I02** mới reproduce Auth baseline, còn chờ Auth manual/AI để chạy đủ vòng.

## Phúc Hoàng — Authentication & Users

**Phần việc:** login/lock, đăng ký, OTP/reset mật khẩu và profile. Research/tutorial Stryker + Claude đã có evidence. Auth suite bàn giao được import **nguyên bản 5 files** vào SUT, dùng Jest project riêng để tránh xung đột harness.

**Tests và lỗi gốc:** 26 baseline tests pass; 23 defect tests fail riêng. Ví dụ: đếm sai login attempts/thời gian lock, thiếu validation/hash, OTP và đổi role qua profile. **Mốc OTP 24 giờ là giả định của test**, spec chỉ nói phải có hạn, chưa chốt số giờ.

| Bộ tests | Tests pass | K | T | S | NC | E |
|---|---:|---:|---:|---:|---:|---:|
| Baseline, Codex chạy lại | 26 | 60 | 27 | 23 | 7 | 8 |
| Manual / AI | Chưa có bàn giao | — | — | — | — | — |

**Hiểu nhanh:** baseline có 125 mutants; còn 23 Survived và 7 NoCoverage. Run cũ của Hoàng có 23 Timeout/12 Errors; run frozen có 27 Timeout/8 Errors, **không thêm assertion kill nào**. Score tăng 73,45% → 74,36% do phân loại trạng thái/mẫu số đổi, không chứng minh assertions tốt hơn.

**Còn lại:** làm **F03** phân tích survivors và manual; **G03** AI trên cùng mutants/baseline, lưu prompt/raw/review; **H03** comparison. Sau đó bàn giao cho Hòa chạy lại, và Hoàng tự chạy Cart theo vòng **I03**.

**Mở để xem:** [log Hoàng](../experiments/s3/Experiment_Log_Phuc_Hoang.md), [Auth frozen mutation HTML](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/frozen-auth-baseline/mutation.html).

## Team Handoff to S4

- Hoàn tất Auth manual/AI/comparison và vòng chạy chéo: **Hiệp → Coupons; Hòa → Auth; Hoàng → Cart**. Agent rerun không thay xác nhận thành viên tự chạy.
- Chốt review/evidence và AI audit inputs của từng người; cập nhật Sheet khi có quyền ghi (lần ghi trước bị 403). Chưa tuyên bố toàn S3 Done chỉ từ Agent runs.
- Viết guide/report/demo S4 từ kết quả đã có. Bộ so sánh tổng cần ghép manual/AI đủ ba domain, chạy lại chung từ baseline.

Tra chung: [Baseline Manifest — commit/config/commands](../experiments/s3/Baseline_Manifest.md), [Defects & Assumptions](../experiments/s3/Original_Defects_and_Assumptions.md), [Cross Reproduction — cùng nguồn và mutant mapping](../experiments/s3/Cross_Reproduction_Notes_Thai_Hoa.md).

`runs/` là kho bằng chứng: HTML để xem, JSON để đối chiếu, log để tìm lỗi chạy. Nhiều file là dữ liệu của các lần chạy, không phải nhiều bài mới cần làm; chỉ mở phần ứng với câu hỏi đang kiểm tra.
