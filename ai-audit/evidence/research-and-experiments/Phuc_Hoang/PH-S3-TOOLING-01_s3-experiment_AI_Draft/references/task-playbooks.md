# S3 Task Playbooks

Mapping mặc định giữa nhóm task và section của `experiments/s3/Experiment_Log_TEMPLATE.md`. Định nghĩa có thẩm quyền là task note trên tracker. Nếu tracker khác, làm theo tracker và ghi lại sự khác biệt trong log.

| Group | Log section | Depends on |
|---|---|---|
| C — Setup / local run | Setup | — |
| D — Test cases, harness, fixtures | Test Cases | C; scope S2; D04 (seams) |
| E — Baseline mutation run | Baseline | D, D04 manifest |
| F — Survivors + manual assertions | Survivors & Manual Assertions | E |
| G — Claude assertion candidates | AI Runs | E, F (chọn cùng mutants) |
| H — Comparison, equivalent candidates, limits | Comparison; Limits & Failure Modes | E, F, G |
| I — Cross reproduction | Cross Reproduction | Guide/notes của teammate |

## C — Setup

- Ghi OS, Node, npm, versions của Jest/Stryker (`npx jest --version`, `npx stryker --version`). StrykerJS 10.x cần Node ≥ 22.
- Cài đặt và chạy theo `SUT/setup_guide.md`. Kiểm `backend/package.json` tại commit nhận task; script `test` gốc có thể vẫn là placeholder báo lỗi.
- Có seed/reset cho test thì ghi Reset Method. Nếu chưa có seam (export `app`, DB path cho test), ghi Pending và trỏ tới D04.
- Done khi: lệnh cài/chạy và kết quả thật (kể cả lỗi và cách sửa) đã có trong bảng Setup, kèm evidence (log hoặc screenshot).

## D — Test cases & harness

- Liệt kê cases theo scope S2 của domain (`proposal/s2/T10_Seminar_Proposal.md`, bảng scope): thành công, bị từ chối, quyền truy cập, biên.
- Mỗi case: spec section, fixture, **expected từ spec**. Nếu spec im lặng: ghi `spec silent`, kèm behavior quan sát được và câu hỏi cần chốt.
- Harness: theo quyết định D04. Nếu chưa có, có thể tham khảo `experiments/s3/runs/Phuc_Hoang/A03-S2-harness/` (fake DB + spy `express.application.listen`, không sửa production code). Đây chỉ là tham khảo, không phải quyết định.
- Chạy test trên code gốc phải **pass** trước khi đo mutation. Nếu test fail vì code lệch spec, đó là finding cần ghi, không phải lý do sửa expected.
- Done khi: test file/commit trong SUT, bảng Test Cases có Actual Result thật.

## E — Baseline

- Config đóng băng: `mutate` theo range của domain trong `server.js`, `coverageAnalysis: perTest`, reporters `clear-text`, `html`, `json`, `tempDirName` không ẩn.
- Chạy `--dryRunOnly` trước; sau đó chạy full. Lưu bằng `save_run.sh`.
- Ghi tổng Killed / Timeout / Survived / NoCoverage / Ignored, Stryker score và tỷ lệ assertion kill (`summarize_mutants.js`).
- Done khi: bảng Baseline có Run ID, SUT commit, config, command, đường dẫn report, outcome.

## F — Survivors & manual assertions (≥3, theo T10)

- Chọn ≥3 survivors có ý nghĩa nghiệp vụ. Bỏ qua string mutant của log message, trừ khi response body là hợp đồng của API.
- Với mỗi mutant: vì sao sống, input/state phân biệt được gốc với mutant, assertion viết từ spec.
- Chứng minh: test pass trên code gốc; chạy lại Stryker với cùng config thì mutant đó `Killed`. Ghi cả hai kết quả.
- Phân loại survivor còn lại: real gap / no-coverage / stubborn / equivalent candidate. Dùng bảng phân loại ở `research/s3/Research_Notes_Phuc_Hoang.md` F-A03-01.
- Không thêm test chỉ để tăng coverage mà không có assertion có nghĩa (T10 §2).

## G — Claude assertion candidates

Theo `claude-assertion-protocol.md`. Dùng **cùng mutants** đã chọn ở F, cùng baseline code/config.

## H — Comparison & limits

- Bảng Comparison: Baseline, Manual, AI-assisted (và Manual+AI nếu có). Cùng config, cùng mutants.
- `compare_runs.js baseline.json manual.json` và `... ai.json`: liệt kê mutant nào chuyển sang Killed, mutant nào chuyển sang Timeout.
- Remaining equivalent candidates: mỗi mutant kèm lập luận và phạm vi (T10 §6.5).
- Limits & Failure Modes: failure modes thật gặp trong run (Timeout tính vào score, phạm vi mutate, Ignored…), kèm evidence. Đây là input cho Guide REQ-18.
- Cảnh báo: score tăng chưa chứng minh assertion tốt hơn (CONTEXT #5).

## I — Cross reproduction

- Làm theo guide/notes của teammate trên máy mình, đúng commands của họ.
- Ghi kết quả thật, bước thiếu và chỗ khác biệt về version/OS. Không sửa guide của họ; gửi lại dưới dạng issue.
