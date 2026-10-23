# D01-1 REPORT

## Thông tin run

| Mục | Giá trị |
|---|---|
| Task | S4-D01 — Tấn Hiệp tự chạy walkthrough Coupons theo `materials/s4/Guide_Contribution_Thai_Hoa.md` |
| Executor | Lê Tấn Hiệp (khối lệnh do Claude Code, model `claude-opus-5-5`, soạn sẵn; Tấn Hiệp tự dán và chạy) |
| Thời gian | 2026-10-23; lần 1 14:56–15:19, lần 2 15:23–15:35 (+07:00) |
| Môi trường | Windows 11, PowerShell 7, Node v24.15.0, npm 11.12.1; thư mục `C:\w\D01-1` |
| SUT | `eshop-coupons-s4` detached `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` |
| Guide | SHA-256 `0cd4b2803b6ce7fade4671196ccd30af0fbd92a3d9830c88210a3433bfe79da0` (giống bản D01-1-cc) |

## Evidence

- `console.log`: transcript PowerShell (Start-Transcript).
- `NOTES.md`: ghi chép của Tấn Hiệp trong lúc chạy.
- `coupons/`, `coupons-manual/`, `coupons-ai/`: `mutation.json`, `mutation.html` (lần chạy 2).
- `count_d01.md`: đếm trạng thái và so với D01-1-cc (sinh bằng `experiments/s4/runs/D01-1-cc/count_d01.js`).

## Hạn chế của evidence

- `console.log` **không có output native** của npm, Jest và Stryker: các lệnh chạy qua hàm `Step` (do Claude Code soạn), và output của chúng không vào transcript. Log chỉ có header, mô tả, exit code và thời gian của từng lệnh, cùng output của các lệnh PowerShell.
- Vì vậy số tests (88, 26, 35, 40) lấy từ **NOTES** của Tấn Hiệp; số liệu mutation lấy từ **`mutation.json`** (đếm bằng script).
- Tấn Hiệp báo đã chạy `Stop-Transcript`, nhưng `console.log` không đổi sau đó và không có dòng "PowerShell transcript end".
- Ở lần chạy 1, log cho thấy khối overlay bị cắt thành `-Destination $des` và lệnh Stryker manual bị cắt (exit 1); khối Claude Code in ra trong chat là đầy đủ, nguyên nhân bị cắt chưa xác định. Lần chạy 2 chạy lại khối 0–3; report dùng là của lần 2.

## Kết quả

| Bước | Kết quả | Nguồn | So với guide / D01-1-cc |
|---|---|---|---|
| `npm.cmd test` / `test:coupons` | 88 / 26 pass | NOTES | Khớp |
| `mutate:coupons` | 120 mutants: 39 / 21 / 30 / 25 / 5; 52.17% | `coupons/mutation.json` | Khớp |
| Jest manual / AI | 35 / 40 pass | NOTES | Khớp |
| Stryker manual / AI | 41 / 21 / 28 / 25 / 5; 53.91%; chỉ kill thêm 111, 113 | `count_d01.md` | Khớp; 0 mutant khác D01-1-cc |
| Review or Request an AI Candidate | **Pending** | NOTES | — |

Chi tiết và feedback cho tác giả: `materials/s4/Guide_Reproduction_Tan_Hiep.md`, mục "Tấn Hiệp tự chạy (D01-1)".
