# Coupons Test Contract

**Stage / Tasks:** S3-C02/D02. **Owner:** Thái Hòa. **Author/executor:** OpenAI Codex AI Agent.
**Status:** Agent verification complete; member review/run Pending. Prepared for D04, not a frozen common baseline.
**SUT:** production files at base `92bbf22`; tests/tooling on `codex/s3-coupons-hoa`.
**Harness provenance:** `test/helpers/isolate.js` and `app.js` reused byte-for-byte from Hiệp's `8d60e9b`.
No manual F02 assertions or domain G02 comparison are delivered in this task.

## Sources & Oracle

Expected lấy từ SUT `README.md` FR-09 (C1–C5, formulas), FR-12, FR-17, SEC-02/03; endpoints/payload từ `api_specification.md` §5, §6.4. Production observations từ `backend/server.js:355–492`; database schema/seed từ `database.js`.
Rule có thẩm quyền là SRS, không lấy response đang có lỗi làm expected.

- C1: code tồn tại, active=1. C2: now < expiry, nên equality bị từ chối.
- C3: total >= minimum. C4: JWT hợp lệ. C5: usage của chính user/coupon < limit.
- percent: total × value / 100; fixed: value; final: total − discount.
- Admin create/list/delete: đúng role. FR-17 bắt buộc code duy nhất, type percent/fixed, discount > 0, expiry, minimum >= 0, max uses >= 1.
- Status 400/401/403/404 là conventions từ API/harness hiện tại khi SRS chỉ nói từ chối. Defects không khóa một mã lỗi duy nhất: kiểm 4xx và side effects. Duplicate code chỉ kiểm lỗi >=400 và không có dòng thứ hai, không tự áp 409.
- Không assert error messages nguyên văn hoặc IDs auto-increment cụ thể cho coupons.

## Baseline Cases

`backend/test/coupons.test.js`: 18 case groups, 25 executions; assertions đầy đủ ở hành vi pass trên original. Không lược bỏ assertions để tạo survivors.

| ID | Partition / Oracle | Why It Matters |
|---|---|---|
| CP-01 | Fixed: total 500001→450001, 700000→650000, discount 50000 | Normal + minimum+1; kiểm cả discount và final |
| CP-02 | 499999 < minimum 500000 bị từ chối, không usage | Minimum−1; equality nằm CD-01 |
| CP-03 | Missing/empty code bị từ chối | Missing input trước DB lookup |
| CP-04 | Unknown hoặc inactive không có discount | Code tồn tại khác active flag |
| CP-05/06 | Expiry−1 ms hợp lệ, expiry+1 ms bị từ chối | Exact UTC instant; equality nằm CD-03 |
| CP-07/08 | Usage 0/1 của limit 2 hợp lệ; 2/3 bị từ chối | Bao cả limit−1, limit, limit+1 và unused |
| CP-09/10 | Usage của user/coupon khác không chặn coupon hiện tại | Query phải lọc cả hai khóa |
| CP-11 | Quote không tiêu lượt; usage API ghi user từ token; đến limit thì bị chặn | Phân biệt quote với recording; không tuyên bố test E2E checkout |
| CP-12 | Usage API không JWT / invalid JWT không ghi DB | Kiểm side effect, không chỉ status |
| CP-13/14 | Admin list chỉ có fixture hiện tại; thiếu JWT bị từ chối | Chứng minh reset seed gốc và đọc qua API |
| CP-15 | Admin tạo minimum=0, limit=1; list và apply kiểm persisted fields | Cận hợp lệ của create; không dùng default để che input sai |
| CP-16 | Xóa coupon A giữ coupon B | Tránh chỉ kiểm status khi SQL xóa quá rộng |
| CP-17 | Create/delete thiếu JWT không đổi số dòng | Auth + side effects |
| CP-18 | Duplicate code không tạo dòng thứ hai | UNIQUE rule; không coi HTTP 500 là chất lượng API tốt |

## Original Defects

`backend/test/defects/coupons.defects.js`: 7 groups, 16 executions. Tất cả được quan sát fail tại assertions trên original; không có setup/module/SQL error trong run chính thức.

| ID | Expected / Actual on Original | Root Observation |
|---|---|---|
| CD-01 | Total=500000 phải được giảm 50000; actual 400 | C3 dùng > thay vì >= |
| CD-02 | Total=700000, percent=10 → discount 70000, final 630000; actual −6300000 / 7000000 | Formula dùng (1−value) |
| CD-03 | now=expiry phải bị từ chối; actual success | Expiry check dùng < thay vì <= |
| CD-04 ×2 | Missing/invalid JWT phải bị từ chối; actual success | Apply route không có authenticateToken |
| CD-05 ×2 | User đã hết lượt không vượt được bằng omitted/another user_id; actual success | Tin body user_id, không ràng buộc token identity |
| CD-06 ×3 | User thường không list/create/delete coupons; actual 200, create/delete đổi DB | Thiếu role check; list theo API §5.2 dành Admin |
| CD-07 ×6 | Missing code/expiry, unknown type, zero discount, negative minimum, zero limit bị từ chối và không insert; actual insert | Thiếu validation; max=0 bị mặc định thành 1 |

Đây là lỗi gốc, không phải surviving mutants và không tính là kết quả F02/G02.

## Isolation & Integration

- Mỗi Jest file có Express app và SQLite :memory: riêng qua D01 harness; chạy SQL thật.
- loadApp đợi seed gốc đủ trước reset. Trước mỗi case xóa usage trước coupons, reset sequence và lock state; mỗi case tạo fixture riêng.
- Chỉ fake Date; giữ native timers/microtasks/SQLite I/O để không treo HTTP.
- NOW=2026-10-22T12:00:00.000Z; EXPIRY=2026-10-23T12:00:00.000Z. Khi đổi clock phải login lại để auth không trở thành điều kiện gây nhiễu.
- Dùng JWT từ login thật, không forge signing secret. DB assertions chỉ kiểm side effects/fixture, không mock SQL results.
- DB đóng ở afterAll. SHA-256 source/database trước/sau có trong environment.json.
- Default Jest pattern là **/test/*.test.js; defects dùng config riêng và suffix .defects.js; tutorial ở folder riêng.
- D04 phải thống nhất discovery/harness với Auth suite. Không đổi tên Auth defects thành pattern baseline. `test:coupons` chọn đúng file Coupons; `npm test` hiện chỉ có suite đã bàn giao trên nhánh này.
- Stryker mutate `server.js:355-492`: list, apply, record usage, admin create/delete; không mutate auth/cart/order handlers.
- Tooling/package lock từ Hiệp; commit này chỉ đưa Coupons và tutorial vào nhánh, không merge manual/AI assertions của Hiệp.

## Deliberate Limits

- Percentage path đúng spec chưa pass trên original, nên được ghi defect; không giả lập expected sai để có baseline xanh.
- Rounding với tiền lẻ, fixed discount > total, negative final clamping, code case/whitespace normalization, empty/invalid expiry policy, percent upper cap, duplicate HTTP status và atomic usage/checkout chưa có quy định đủ cụ thể. Giữ làm câu hỏi D04, không dựng oracle.
- CP-11 kiểm usage API độc lập; không chứng minh một checkout thật tự động ghi lượt hay chống ghi trùng.
- Invalid/empty expiry có thể khiến Invalid Date bypass expiry check; đây là observation cần policy, chưa gắn nhãn defect từ một expected tự đặt.
- Chưa chạy full mutation EShop Coupons; dry run không có mutation score. Common baseline, F02/G02/H02/I02 và member approval vẫn Pending.

## Evidence & Acceptance

[Experiment Log](Experiment_Log_Thai_Hoa.md) và [Run Summary](runs/Thai_Hoa/C02-D02-2026-10-22-agent/README.md).
D02 đủ agent evidence để review nhận vào D04. C02 có tool tutorial và AI candidate verification do Agent thực hiện; không gán thành tự trải nghiệm của Thái Hòa.

