# Demo Script: Coupon Usage Limits

Kịch bản tiếng Việt để đọc và quay demo API integration test cho Coupons bằng Jest, Supertest, StrykerJS và Codex. Chỉ đọc các đoạn **Lời đọc**. Những dòng **Thao tác** và **Mở HTML** là hướng dẫn cho người quay.

Case xuyên suốt: tạo coupon với giới hạn 3 lần, rồi kiểm tra hệ thống có lưu đúng số 3 hay không.

## 1. Preparation

Làm phần này trước khi quay. Chuẩn bị Git, Node/npm, editor, trình duyệt và phần mềm quay màn hình có thu mic. Môi trường thực nghiệm đã dùng Node `24.16.0`, npm `12.0.2`.

**Tạo bản riêng để demo.** Mở PowerShell và chạy lần lượt. Thư mục `eshop-demo` phải là thư mục mới; nếu đã tạo theo bản hướng dẫn trước thì dùng lại bản đó.

```powershell
$demoParent = Join-Path $env:USERPROFILE 'T10-Demo'
New-Item -ItemType Directory -Force -Path $demoParent | Out-Null
Set-Location -LiteralPath $demoParent
git clone https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness.git eshop-demo
Set-Location -LiteralPath (Join-Path $demoParent 'eshop-demo')
git rev-parse --show-toplevel
git status --short
git switch --detach 52ed6ac7c341b4e907ab341aaff03aeededb2f5d
Set-Location backend
node --version
npm --version
npm ci
```

Revision này có sẵn baseline, bộ assertions bổ sung và bộ AI. Các cấu hình chọn riêng bộ tests; khi quay chỉ cần chạy đúng lệnh ở từng cảnh. Production code khớp frozen baseline `806ba19`.

**Chuẩn bị màn hình.** Mở thư mục `eshop-demo/backend` trong editor, đặt terminal bên cạnh. Tests tự dùng database trong bộ nhớ, reset dữ liệu và cố định đồng hồ; không cần bật backend hay frontend riêng.

Mở sẵn bốn file để chuyển qua khi quay:

- `package.json`.
- `test/coupons.test.js`.
- `test/manual/coupons.manual.js`.
- `test/ai/coupons.ai.js`.

**Ba lần mở HTML trong kịch bản:**

| Khi nào mở | File tính từ thư mục `backend` | Cần xem gì |
|---|---|---|
| Cuối Cảnh 3, sau baseline mutation | `reports/coupons/mutation.html` | Mutant tại dòng 474 còn `Survived` |
| Cuối Cảnh 4, sau bộ assertions bổ sung | `reports/coupons-manual/mutation.html` | Cùng mutant chuyển thành `Killed` |
| Cuối Cảnh 5, sau bộ AI | `reports/coupons-ai/mutation.html` | Cùng mutant được bộ AI phát hiện |

Mỗi cảnh bên dưới có lệnh mở đúng HTML. Chờ lệnh mutation hoàn tất rồi mới mở report. Khi report đang mở từ lần trước, refresh tab trước khi đọc kết quả.

**Trước lúc bấm quay:** tăng font để đọc rõ, tắt thông báo, thu thử mic rồi nghe lại. Bật ghi hình, chờ hai giây và bắt đầu Cảnh 1. Có thể ghi lại phần clone và `npm ci` ở trên để chèn vào cảnh giới thiệu cài đặt.

## 2. Scene 1: Introduction

**Thao tác:** mở `package.json`. Chỉ vào hai scripts `test:coupons` và `mutate:coupons`.

**Lời đọc:**

> Chào mọi người. Giả sử Admin tạo coupon cho phép mỗi khách dùng tối đa ba lần. Hệ thống cần lưu đúng số ba đó.
>
> Chúng tôi đã clone bản demo và chạy npm ci để cài dependencies. Bây giờ, chúng tôi chạy tests rồi dùng Stryker để xem tests có phát hiện được code bị sửa sai hay không.

## 3. Scene 2: Run the Baseline Tests

**Thao tác:** tại terminal trong thư mục `backend`, chạy:

```powershell
npm run test:coupons
```

Chờ summary hiện ra, chỉ vào số tests pass. Mở `test/coupons.test.js`, tìm `CP-15`. Để thấy giá trị input, mở `test/helpers/coupons.js`, tìm `validAdminCoupon` và chỉ `max_uses_per_user: 1`.

**Lời đọc:**

> Test tạo coupon ban đầu chỉ thử giới hạn một lần: gửi số một, đọc lại dữ liệu và kiểm tra có đúng bằng một không. Code gốc lưu đúng một nên test pass.
>
> Vậy nếu code bị sửa sai, test này có nhận ra không?

## 4. Scene 3: Find the Surviving Mutant

**Thao tác:** chạy baseline mutation tại terminal:

```powershell
npm run mutate:coupons
```

**Lời đọc trong lúc bắt đầu chạy:**

> Stryker cố tình tạo các phiên bản code bị thay đổi, gọi là mutants, rồi chạy tests để xem chúng có bị phát hiện không. Các thay đổi được chạy trong thư mục tạm.

Có thể cắt hoặc tăng tốc phần chờ và ghi nhãn `Đã tăng tốc đoạn chờ` trên video.

**Mở HTML 1: report baseline.** Sau khi Stryker chạy xong, chạy:

```powershell
Start-Process '.\reports\coupons\mutation.html'
```

Trong trình duyệt, mở `server.js` trong report, tìm dòng 474. Chọn mutant có replacement `max_uses_per_user && 1`, rồi chỉ vào trạng thái `Survived`. Trong evidence đã lưu, đây là mutant `113`.

**Lời đọc khi đã thấy mutant trên HTML:**

> Phiên bản này bị lỗi: Admin nhập giới hạn ba, nhưng nó lại lưu thành một.
>
> Tuy nhiên, test ban đầu chỉ gửi một. Code gốc lưu một, code bị lỗi cũng lưu một. Test đang chờ một và nhận đúng một, nên vẫn pass.
>
> Vì test chưa nhận ra lỗi, mutant được đánh dấu Survived, nghĩa là còn sống.

## 5. Scene 4: Verify the Added Assertions

**Thao tác:** quay về editor, mở `test/manual/coupons.manual.js`. Tìm `MF-01`, chỉ vào input `max_uses_per_user:3` và dòng:

```javascript
expect(listed.body[0].max_uses_per_user).toBe(3);
```

Sau đó cuộn tới `MF-02` và `MF-03`.

**Lời đọc:**

> Chúng tôi thêm test gửi giới hạn ba, rồi yêu cầu giá trị đọc lại phải bằng ba. Với code gốc, nhận ba nên pass. Với mutant, nhận một nên fail. Lỗi đã lộ ra.
>
> Hai tests bên dưới kiểm tra thêm: đã dùng hai lượt thì còn lượt thứ ba, đủ ba lượt thì bị từ chối dùng tiếp. Bộ tests này có Codex hỗ trợ soạn.

**Thao tác:** chạy tests trên code gốc trước, rồi chạy mutation với bộ bổ sung. Chờ từng lệnh kết thúc:

```powershell
npx jest --config jest.coupons.manual.config.cjs --runInBand
npx stryker run stryker.coupons.manual.config.json
```

**Mở HTML 2: report có assertions bổ sung.** Sau khi mutation chạy xong, chạy:

```powershell
Start-Process '.\reports\coupons-manual\mutation.html'
```

Mở `server.js`, tìm lại dòng 474 và replacement `max_uses_per_user && 1`. Chỉ trạng thái `Killed` và test `MF-01` trong thông tin test phát hiện mutant, nếu report hiển thị.

**Lời đọc khi report xác nhận kết quả:**

> Report mới cho thấy mutant đã chuyển sang Killed, nghĩa là test đã phát hiện được thay đổi sai. Test MF-01 bắt được lỗi nhờ kiểm tra số ba được lưu đúng.

## 6. Scene 5: Review and Run the AI Candidate

**Thao tác:** mở prompt dưới đây để giới thiệu thông tin cần đưa cho AI. Đây là prompt mẫu tiếng Việt dùng lại cho demo. Cảnh này xem lại candidate đã lưu và chạy kiểm chứng nó.

```text
Đọc baseline tests và helper backend/test/helpers/coupons.js.
Đề xuất tests kiểm tra API tạo coupon lưu đúng max_uses_per_user.
Code gốc ở server.js dòng 474 dùng max_uses_per_user || 1.
Mutant thay bằng max_uses_per_user && 1 nhưng tests vẫn pass.
Chỉ đề xuất tests, giữ nguyên source và config. Dùng helper có sẵn.
Giải thích vì sao test pass trên code gốc và phát hiện được mutant.
```

**Lời đọc:**

> Với AI, chúng tôi cung cấp quy tắc và thông tin mutant để nhờ đề xuất tests. Ở đây là bộ Codex đã soạn trong cùng context phân tích trước đó; chúng tôi mở lại và chạy kiểm chứng.

**Thao tác:** mở `test/ai/coupons.ai.js`, tìm `test.each([2,4])`. Chỉ vào các assertions đọc lại giới hạn, cho phép tại `limit - 1` và từ chối tại `limit`.

**Lời đọc:**

> Bộ này thử giới hạn hai và bốn, rồi kiểm tra hệ thống lưu đúng từng giá trị. Nếu mutant vẫn lưu thành một, test sẽ nhận ra. Chúng tôi review code rồi chạy tests trước khi chạy mutation.

**Thao tác:** chạy lần lượt:

```powershell
npx jest --config jest.coupons.ai.config.cjs --runInBand
npx stryker run stryker.coupons.ai.config.json
```

**Mở HTML 3: report bộ AI.** Sau khi mutation chạy xong, chạy:

```powershell
Start-Process '.\reports\coupons-ai\mutation.html'
```

Mở `server.js`, tìm cùng dòng 474 và replacement. Chỉ trạng thái `Killed` và test dùng limit 2 được report ghi nhận, nếu có.

**Lời đọc khi report xác nhận kết quả:**

> Bộ AI pass trên code gốc và cũng đánh dấu mutant này là Killed. Kết quả được xác nhận bằng lần chạy và report.

## 7. Scene 6: Compare and Close

**Thao tác:** chuyển lần lượt qua ba tabs HTML đã mở. Giữ cùng dòng 474 và replacement để người xem thấy baseline là `Survived`, hai bộ bổ sung là `Killed`.

**Lời đọc:**

> Test cũ dùng input một nên bỏ sót lỗi. Thử input ba và kiểm tra đúng giá trị được lưu mới làm lỗi lộ ra.
>
> Mutation testing giúp tìm những chỗ test còn bỏ sót. Killed là test phát hiện thay đổi; Timeout là vượt thời gian, cần xem riêng. Tests do AI đề xuất cũng phải được review và chạy lại. Cảm ơn mọi người đã theo dõi.

## 8. Recording Notes

- Chạy thử toàn bộ các cảnh trước buổi quay. Số test cases dự kiến tại revision đã chọn: baseline 26, bộ manual 35, bộ AI 40. Video chỉ phân tích nhóm usage-limit.
- API áp dụng coupon chỉ tính thử giảm giá; lượt sử dụng được ghi qua API riêng. Test MF-01 kiểm tra giá trị được lưu mới là test phát hiện mutant mục tiêu trong evidence đã có.
- Lời đọc kết quả ở trên dùng khi report của lần chạy xác nhận đúng trạng thái. Nếu dùng report đã lưu, nói: "Đây là report đã lưu từ lần chạy chuẩn bị trước buổi quay."
- Với report mới chưa khớp, kiểm tra đúng config và file tests trước khi diễn giải. Các configs ghi vào ba thư mục reports riêng; giữ log và JSON để đối chiếu.
- Nếu `npx` lỗi trên Windows, dùng `node node_modules/jest/bin/jest.js` thay cho `npx jest`, hoặc `node node_modules/@stryker-mutator/core/bin/stryker.js` thay cho `npx stryker`; giữ nguyên các tham số phía sau.
- Khi dựng video, giữ đủ phần cài đặt, chạy tests, phân tích mutant và kiểm chứng assertions/AI. Mục tiêu 5 đến 8 phút, không nhạc nền, ưu tiên 1080p và MP4 tối đa 100 MB.

Nguồn đối chiếu: [Baseline Manifest](../experiments/s3/Baseline_Manifest.md), [Coupons evidence](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md) và [Codex provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md).
