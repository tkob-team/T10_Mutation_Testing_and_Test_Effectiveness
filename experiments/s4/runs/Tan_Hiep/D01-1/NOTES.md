# D01-1 NOTES (Tấn Hiệp tự chạy)

Guide: `materials/s4/Guide_Contribution_Thai_Hoa.md` (SHA-256 `0cd4b2803b6ce7fade4671196ccd30af0fbd92a3d9830c88210a3433bfe79da0`, giống bản D01-1-cc đã thử)
Executor: Lê Tấn Hiệp
Ngày: 23/10/2026
Máy / OS: Window 11
Node / npm (khối 1): v24.15.0/11.12.1
Thư mục chạy: `C:\w\D01-1`
Log: `experiments/s4/runs/Tan_Hiep/D01-1/console.log` (Start-Transcript)

## Khác guide

1. Chạy trong thư mục ngắn `C:\w\D01-1` thay vì "a new parent directory containing the seminar documentation clone" (tránh `Filename too long`, lỗi D01-01 của run D01-1-cc); thư mục này không chứa clone seminar.
2. Bước overlay: dòng `$docsRoot = (Resolve-Path '../../T10_Mutation_Testing_and_Test_Effectiveness').Path` đổi thành clone seminar có sẵn `D:\HK7\Testing\Seminars\Repo\T10_Mutation_Testing_and_Test_Effectiveness` (guide cho phép "reuse its path"). Các dòng khác của khối overlay giữ nguyên.
3. Thêm khối 0 (UTF-8, tạo thư mục, Start-Transcript), hàm `Step` in header trước mỗi lệnh, dòng `XONG KHOI n`, các dòng `BẠN LÀM`, và `Stop-Transcript` ở khối cuối. Lệnh của guide giữ nguyên văn.
4. (Ghi thêm nếu bạn làm khác guide ở chỗ nào khác.)

## Thời gian từng khối

| Khối | Bắt đầu | Kết thúc | Ghi chú |
|---|---|---|---|
| 0 Chuẩn bị | 15:23 | 15:23 | |
| 1 Installation | 15:24 | 15:24 | |
| 2 First Test | 15:26 | 15:27 | |
| 3 Advanced: overlay + tests + Stryker | 15:30 | 15:35 | |
| 4 AI candidate, Compare | không làm | | |

## Kết quả bạn thấy

| Bước | Bạn thấy | Khớp guide? |
|---|---|---|
| `npm.cmd test` | 88 tests passed | khớp |
| `npm.cmd run test:coupons` | 26 tests passed | khớp |
| `mutate:coupons` (HTML) | 39, 21, 30, 25, 5 | |
| Dòng 474, mutant 111 / 113 | true và max_uses_per_user | khớp |
| Jest manual / AI | 35 passed / 40 passed | khớp |
| Stryker manual / AI (HTML) | 41,21,28,25,5 / 41,21,28,25,5  | khớp |
| PROVENANCE đã mở? | không làm | |
| Request AI mới | Not run / đã chạy (tool, model) | không làm |

## Bước mơ hồ

- Pronevance, không hiểu làm gì

## Lỗi gặp (nguyên văn thông báo, khối nào)

- 

## Nhận xét khác cho tác giả (Hòa)

- 
