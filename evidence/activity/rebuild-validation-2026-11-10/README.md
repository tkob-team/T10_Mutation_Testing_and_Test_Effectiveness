# T10 Mutation Lab Local Qualification

## Scope

Agent execution trên máy Windows của workspace ngày 2026-11-10 theo giờ Việt Nam. Docker Desktop WSL2 Linux, engine 29.9.2, 4 logical CPUs và khoảng 3,8 GiB RAM, hai judge slots. Node 24.16 chạy trên Debian Trixie, PostgreSQL 17.9, sqlite3 6.0.1. EShop revision `1be4637e20241054e23b99c8e2412fd2e7cbbc68`. Pack SHA-256 `b9cdead5e48eaf6ca028f1be90b998d8a700264c9fdb41ecb742d6cdbe4be8d1`.

## Checks

| Check | Result | Evidence |
|---|---|---|
| Reference controls | 7/7 pass original và bắt đúng mutant bằng assertion. Kiểm tra riêng original fail, survivor, timeout, sai pack hash và parser chặn process.exit. | [Runner log](runner.log) |
| Submission and privacy | Preview Builder có output original và 0 điểm. Original fail dừng trước mutant. Retry cùng key nhận cùng ID, đổi payload trả 409. Session rotate và bài người khác trả 404. | [HTTP log](http.log) |
| Failure injection | Dừng scheduler giữa lease rồi khởi động lại. Cùng submission recover và nhận đủ 7 điểm. Gửi SIGKILL vào một SUT child, evidence ghi signal và retry hoàn tất với 0 điểm mới khi cùng người chơi đã có đủ điểm. | [HTTP log](http.log) |
| Scoring and room | Ranking 1, 1, 3 với điểm bằng nhau. SSE trả snapshot. Đóng nhận bài vẫn drain bài đã nhận. Loại một mutant áp dụng cho cả phòng và chốt được report. | [HTTP log](http.log) |
| Six-entrant batch | Ba batch có 18 mẫu từ nộp đến kết thúc. p50 2,284 giây, p95 và max 4,584 giây. Một số người chơi đã có điểm từ lượt trước nên pack còn việc ít hơn. | [HTTP log](http.log) |
| Full-pool load | Sáu người chơi mới, mỗi suite 12 case và 84 bước, chạy đủ 7 mutants mỗi suite. Max 8,768 giây. 0 inconclusive và 0 điểm sai trong batch này. | [HTTP log](http.log) |
| Backup and restore | Khôi phục DB và dùng pack cùng hash trên project Compose riêng. Báo cáo FINALIZED giống bản nguồn và SHA-256 của canonical JSON khớp. | [Restore log](restore.log) |

## Candidate review

Catalog gồm 81 ứng viên. Pack chấm 7 mutant gồm orders-4, orders-68, orders-32, coupons-33, coupons-113, coupons-120 và auth-32. `coupons-28` giữ ngoài pack vì xung đột ngưỡng đặc tả. `coupons-70` cần đối chứng guest/percent flow. `coupons-117` và `orders-29` sửa JSON của nhánh HTTP 500 trong audit này. Hai control response thành công dùng `coupons-120` và `orders-32`. Danh sách 6 mutant nghi equivalent và nguyên nhân crash Coupons cũ vẫn chưa xác minh.

## Human review pending

Các số trên đến từ loopback và người chơi mô phỏng. Chờ kiểm tra trình duyệt, Builder và Editor với người học, URL trên mạng lớp, chạy đủ 20 phút, review worksheet và xác nhận cách trình bày 5 diff theo brief. Dùng evidence đó để chốt slide, demo và tally chính thức.

## Interface revision

Agent execution bằng Codex ngày 2026-11-10 trên Compose project riêng. Bảy đối chứng vẫn đạt. Kiểm thử HTTP kiểm tra nộp từ một tab, tên test lỗi và actual/expected, bảng người tham gia và chi tiết bài nộp, vé vào lại hết hiệu lực khi thay hoặc dùng, cùng luồng retry và xếp hạng. Batch 6 người mới dùng suite 84 bước kết thúc trong tối đa 10,408 giây.

Kiểm thử DOM giả lập xác nhận preset có mô tả, tự thu gọn tình huống cũ, giới hạn 12 tình huống và 24 bước, trạng thái đang chấm, tên test lỗi và điểm mutant. Copy lint của design-taste-frontend trả 0 FAIL và 0 WARN cho Participant, Host và Ranking.

## Room lifecycle revision

Agent execution trên Compose project riêng. HTTP integration xác nhận vào bằng tên khi phòng mở, lưu báo cáo đã chốt nguyên vẹn, dọn phiên đang chấm, từ chối cookie cũ và yêu cầu dọn lại đã lỗi thời. Người chơi có thể dùng lại tên ở phiên mới, với điểm bắt đầu bằng 0. Kết quả đến muộn của phiên đã lưu không tạo điểm.

## Expanded scoring pool

Agent execution bằng Codex trên Docker Desktop WSL2 với 4 judge slots. Pack SHA-256 `efdd39213e8765ab92ba8a1505900ec1c794d2160e083459eecfefa018e289b5`. Cả 69 mutant có đối chứng pass original và assertion mismatch khi chấm mutant. Ba lượt nộp qua Cloudflare ghi nhận lần lượt 21, 44 và 4 điểm, tổng 69. Luồng local tại 127.0.0.1 và localhost dùng cùng phòng và gửi bài được. UI cập nhật tổng điểm cạnh nút nộp qua kiểm thử DOM giả lập. [Runner](expanded-runner.log), [HTTP and load](expanded-http.log).

Sáu người chơi mới nộp đồng thời, mỗi suite 84 bước và chạy đủ 69 mutant. Lượt chậm nhất mất 60,165 giây, không có inconclusive trong batch này. Đây là một lần đo trên máy hiện tại.

Các ứng viên chưa đưa vào pack gồm coupons-28 do xung đột oracle, coupons-70 và coupons-80 do nhánh không trả phản hồi, bảy mutant chỉ tác động nhánh lỗi máy chủ, coupons-38 chưa có khác biệt quan sát được trong fixture hiện tại và auth-52 chưa kích hoạt được bằng luồng đăng nhập công bố. Các trường hợp chưa có đối chứng giữ ngoài pool.
