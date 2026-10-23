# Góp ý hướng dẫn Cart & Orders cho Tấn Hiệp (S3-I03)

**Người chạy:** Nguyễn Phúc Hoàng (lệnh do Claude Code chạy, log gốc trong thư mục này)  
**Nguồn được chạy:** `experiments/s3/Experiment_Log_Tan_Hiep.md` + `Cross_Reproduction_Notes_Thai_Hoa.md`  
**Trạng thái:** Proposed — gửi cho tác giả; chưa có phản hồi của Hiệp.

## Kết luận ngắn
Chạy lại được cả ba run bằng đúng lệnh trong hướng dẫn, 150/150 mutant khớp với `E01-1`/`F01-2`/`G01-2` của Hiệp, 0 khác biệt trạng thái (xem `comparison.md`). Các góp ý dưới đây không làm sai kết quả, chỉ làm người chạy lại mất thời gian hoặc hiểu nhầm.

## Góp ý cụ thể (ưu tiên giảm dần)

| # | Vấn đề | Bằng chứng | Đề xuất sửa |
|---|---|---|---|
| G2 | Số kỳ vọng ở D01-1/2/3 (36 pass / 9 fail / `Ran 36`) là của commit `8d60e9b`, không ghi commit. Trên baseline đóng băng `806ba19` cùng lệnh cho 88 pass / 54 fail / `Ran 72`. Người chạy lại dễ tưởng mình chạy sai. | `baseline/baseline-npm-test.log`, `baseline/baseline-test-defects.log`, `baseline/baseline-dry.log` | Thêm cột Commit vào các dòng D01 hoặc ghi "số liệu cho `8d60e9b`; trên `806ba19` là 88/54/72". |
| G1 | `experiments/s3/runs/Tan_Hiep/D01-tests/` được dẫn làm evidence C01-7 nhưng không có trong repo (1/28 đường dẫn kiểm tra bị thiếu). | `ls` thư mục trên → không tồn tại | Commit thư mục hoặc đổi link sang bản test trong SUT repo. |
| G3 | Không rõ lệnh mutation chuẩn: F01-2 (`npx stryker … --concurrency 2 --timeoutMS 5000 --timeoutFactor 1.5`) hay `npm run mutate:cart-orders:manual`. Kết quả hai cách giống nhau (0/150 khác), nhưng `stryker.cart-orders.manual.config.json` và `…ai.config.json` không có `concurrency`/`timeoutMS`/`timeoutFactor` (chỉ baseline config có); script npm chạy ~23 s, lệnh có cờ ~1 phút 21 giây. Hòa chạy lại thấy 7 mutant Timeout→Killed ở manual/AI, có thể do khác chính sách timeout. | `manual/*-mutate-flags.log` vs `*-mutate-npm.log`; `comparison.md`; ba file config | Đặt một lệnh chuẩn, đưa ba tham số vào cả ba config, ghi rõ nếu Timeout phụ thuộc máy. |
| G5 | Oracle "user mới có giỏ hàng trống" được viết như sự thật nghiệp vụ trong header test AI (`FR-07 / §4.1`) và ghi chú của Hòa; thực tế api_specification §4.1 chỉ nêu endpoint, FR-07 không nói giỏ mới rỗng. Bảng survivor của Hiệp gọi đúng là "suy luận". | `ai/` config + test header; nguồn spec | Trong test AI và notes ghi "inferred from §4.1" thay vì trích dẫn như yêu cầu rõ. |
| G6 | Tên test baseline hứa nhiều hơn assert: CO-02 ("gets an empty cart") và CO-04 chỉ assert status, nên mutant `[]→["Stryker was here"]` (id 6) sống sót. | `comparison.md` (id 6, 15), log baseline | Sửa tên test hoặc thêm assert body; nêu rõ trong giải thích case 1. |
| G7 | Case 3 (id 68, `"canceled"→""`): AI sống sót vì danh sách mục tiêu chỉ có 5 mutant, không có trạng thái DB sau cancel; không phải do Claude không làm được. Notes nên nói rõ để S4-B không kết luận "AI yếu ở DB state". | `comparison.md` id 68; danh sách target trong log G01 của Hiệp | Thêm một câu giới hạn vào phần failure-mode case 3. |
| G4 | Setup dùng `npm install`; `npm ci` chạy được (672 package, 3 worktree) và tái lập tốt hơn theo lockfile. | `*/…-npm-ci.log` | Đổi lệnh setup sang `npm ci`. |

## Ghi chú về nhánh
Nhánh manual/AI (`s3/F01-manual`, `s3/G01-ai`) rẽ từ `8d60e9b`, không phải `806ba19`; file production (`server.js`, `database.js`, `database.sqlite`) giống baseline (hash trong `*/…-sha-before.txt`, không đổi sau khi chạy). Nên nói rõ trong guide để người chạy không nghĩ là sai commit.
