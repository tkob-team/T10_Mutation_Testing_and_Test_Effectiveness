# Task Notes

**Document Role:** Ghi chú tái lập hướng dẫn S4-D03; bản AI-drafted (Claude Code, Sonnet 5.5). Phần chạy lại guide của teammate **chưa thực hiện** vì chưa có đầu vào (xem Pending).  
**Stage:** S4  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S4-D03  
**Domain / Section:** Tái lập guide contribution của teammate (Cart & Orders của Tấn Hiệp, Coupons của Thái Hòa) và chuẩn bị checklist để teammate tái lập guide Auth của mình  
**Evidence Status:** Not run — không có `Guide_Contribution_Tan_Hiep.md` / `Guide_Contribution_Thai_Hoa.md` trong `materials/s4/` (kiểm `origin/main` ngày 2026-10-23). Chỉ ghi lại bằng chứng liên quan đã có ở S3-I03 và checklist chuẩn bị, không tính là kết quả tái lập S4.

Chỉ điền việc đã thực hiện; thiếu đầu vào ghi Pending và blocker. Giữ prompt, số liệu và evidence nguyên gốc. Đọc `docs/Working_Guide.md` để biết nơi bàn giao.

## Assigned Work & Inputs

- **Task:** theo Task Output Map, S4-D03 → `materials/s4/Guide_Reproduction_Phuc_Hoang.md`, mẫu Task Notes. Nội dung task: tự chạy lại guide của người khác từ đầu, ghi lệnh, kết quả, lỗi hướng dẫn và việc tác giả phải sửa. **Giả định của tôi (Proposed):** đối tượng là guide contribution domain của teammate (S4-A01 Cart & Orders, S4-A02 Coupons) vì S3-I03 cũng chạy lại Cart & Orders; mô tả task của Team Sheet không có trong repo, cần người giao việc xác nhận guide nào và vòng nào.
- **Đầu vào cần có:** guide contribution của teammate (Pending); SUT baseline `806ba19` và các nhánh `s3/F01-manual`, `s3/G01-ai` (có); notes S3-I03 của tôi (có).
- **Chưa có (blocker):** file guide của Hiệp và Hòa ở S4. Khi có, chạy lại theo đúng văn bản, không dùng kiến thức của S3-I03 để điền chỗ thiếu.

## Record

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Tái lập `Guide_Contribution_Tan_Hiep.md` (Cart & Orders) | **Not run** — file chưa có trong repo | `git ls-tree origin/main materials/s4`: chỉ có 3 template và các file Phúc Hoàng | Chờ Hiệp bàn giao; chạy trên máy sạch (clone mới, `npm ci`) |
| Tái lập `Guide_Contribution_Thai_Hoa.md` (Coupons) | **Not run** — file chưa có | như trên | Chờ Hòa bàn giao |
| Bằng chứng liên quan, vòng S3 (không phải S4): chạy lại E01-1/F01-2/G01-2 của Hiệp theo `Experiment_Log_Tan_Hiep.md` | Khớp 150/150 mutant; 74,83% / 90,91% / 83,92%. Phát hiện 7 lỗi hướng dẫn G1–G7 (số kỳ vọng D01 không gắn commit, thiếu `D01-tests/`, lệnh mutation chuẩn không rõ, config thiếu timeout/concurrency, `npm install` thay `npm ci`, oracle "giỏ trống" ghi như sự thật, tên test baseline hứa hơn assert) | [`I03-cart-repro/`](../../experiments/s3/runs/Phuc_Hoang/I03-cart-repro/), [`feedback_for_Tan_Hiep.md`](../../experiments/s3/runs/Phuc_Hoang/I03-cart-repro/feedback_for_Tan_Hiep.md) | Khi guide S4 của Hiệp có, kiểm xem G1–G7 đã được sửa chưa (chỉ ghi `Fixed` khi chạy lại và thấy) |
| Cho teammate tái lập guide Auth của tôi (`Guide_Contribution_Phuc_Hoang.md`) | **Chưa ai chạy**; checklist ở mục dưới | — | Gửi cho Hiệp/Hòa và ghi phản hồi thật khi có |

## Handoff & Review

- Deliverable and destination: `materials/s4/Guide_Reproduction_Phuc_Hoang.md`
- Pending / blockers: (1) guide teammate S4-A01/A02 chưa có; (2) xác nhận đối tượng tái lập (giả định ở trên); (3) mọi dòng *Not run* cần chạy thật trước khi đổi trạng thái.
- Checks performed: kiểm `origin/main` không có guide teammate; kiểm các đường dẫn bằng chứng S3-I03 tồn tại. Chưa chạy lệnh nào cho S4-D03.
- Leader review: Pending

## Task-Specific Checklist

**Quy trình khi guide của teammate có (chưa thực hiện):**

1. Máy sạch: thư mục mới, `git clone` SUT, checkout đúng commit guide nêu; ghi OS/Node/npm; không dùng `node_modules` có sẵn.
2. Chạy từng lệnh nguyên văn theo thứ tự các mục Installation → First Test → Advanced Usage; sao chép output vào `experiments/s4/runs/Phuc_Hoang/<Run_ID>/` (log, `mutation.json`/`html`).
3. So số liệu thực tế với số trong guide theo từng mutant (dòng/cột/mutator/replacement), không theo id; ghi mọi chỗ phải đoán hoặc tự sửa.
4. Ghi lỗi hướng dẫn thành từng dòng (vị trí trong guide, triệu chứng, sửa đề xuất), gửi tác giả; trạng thái `Open` cho tới khi tác giả sửa và tôi chạy lại.
5. Không dùng thông tin ngoài guide để vượt lỗi mà không ghi lại.

**Checklist cho người tái lập guide Auth của tôi (dựa trên `Guide_Contribution_Phuc_Hoang.md`, các lệnh đã chạy ở S3):**

| Bước | Lệnh | Kết quả mong đợi (đã thấy ở S3) |
|---|---|---|
| Cài | `git checkout --detach 806ba19…` ; `cd backend` ; `npm ci --no-audit --no-fund` ; `npm test` | 88 test pass |
| Baseline | `npm run test:auth` ; `npm run mutate:auth` | 26 pass ; 125 mutant: K60 T27 S23 NC7 E8, 74,36% |
| Manual (nhánh `s3/F03-auth`) | `npm run test:auth:manual` ; `npm run mutate:auth:manual` | 39 pass ; K83 T27 S4 NC3 E8, 94,02% |
| Claude (nhánh `s3/G03-auth`) | `npm run test:auth:ai` ; `npm run mutate:auth:ai` | 37 pass ; K74 T27 S13 NC3 E8, 86,32% |
| Gọi Claude | lệnh trong `G03-ai/command.txt` (cần đăng nhập Claude Code) | Kết quả Claude có thể khác lần trước; so sánh theo mutant, không theo văn bản |

Điểm tác giả biết là yếu và muốn nhờ người chạy kiểm: Timeout có thể khác giữa máy; `claude -p` cho kết quả khác mỗi lần; hai nhánh chưa nằm trong `main` của SUT.
