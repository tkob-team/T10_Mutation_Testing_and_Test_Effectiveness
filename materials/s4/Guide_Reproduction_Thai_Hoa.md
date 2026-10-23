# Task Notes

**Document Role:** Auth guide reproduction findings and author feedback handoff.  
**Stage:** S4  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S4-D02  
**Domain / Section:** Authentication & Users walkthrough by Phúc Hoàng  
**Evidence Status:** Agent reproduced baseline steps; Advanced Usage blocked by missing setup instruction. Hòa's personal self-run, author fix and retest Pending.

## Assigned Work & Inputs

Khi bắt đầu chưa có S4-A03 tại nơi bàn giao. Trong phiên, repo nhận merge `4c5db59` có [Auth Guide Contribution](Guide_Contribution_Phuc_Hoang.md) và report contribution. Agent dùng bản guide này làm đầu vào reproduction, thay vì tiếp tục ghi blocker thiếu file.

Guide được chụp nguyên văn cùng SHA-256 tại [tested guide](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/guide-tested.md); [result manifest](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/result.json) ghi version, docs commit, runtime, executor và hashes. Chỉ dùng chỉ dẫn trong guide tới bước bị chặn, không tự overlay manual/AI từ experiment log để làm cho walkthrough chạy qua.

Môi trường thực tế: Windows, Node v24.16.0, npm 12.0.2. Guide ghi môi trường đã thử là macOS Node v26.12.1 và yêu cầu Node >=22. Các adaptations: local shared clone của cùng SUT thay tải lại từ network; npm.cmd/npx.cmd cho Windows. Checkout vẫn đúng `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef` như guide.

## Record

| Item / Action | Observation / Result | Evidence | Issue / Next Action |
|---|---|---|---|
| Clone và detached checkout theo Installation | Đúng frozen SHA; source production không sửa | [Commands](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/commands.json) | Pass kỹ thuật |
| npm ci --no-audit --no-fund | Exit 0 | [Install log](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/install.log) | Giữ warnings trong log |
| npm test | Exit 0, 88 tests pass | [Integration log](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/integration.log) | Khớp guide |
| npm run test:auth | Exit 0, 26 tests pass | [Auth tests](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/auth-tests.log) | Khớp guide |
| npx stryker run stryker.auth.config.json --dryRunOnly | Exit 0, 26 tests tìm được/chạy thành công | [Dry-run log](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/auth-dry.log) | Không thay full mutation |
| npm run mutate:auth | Exit 0; 125 mutants: 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage, 8 RuntimeError; score 74.36% | [HTML](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/auth-mutation.html), [JSON](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/auth-mutation.json), [log](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/auth-mutation.log) | Counts khớp guide; không gọi native crashes là assertion kills |
| Advanced Usage 2: npm run test:auth:manual | Exit 1: Missing script: test:auth:manual | [Actual error](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/manual-command.log) | D02-01: blocker; frozen checkout không có script/file/config manual và guide chưa hướng dẫn nạp |
| Advanced AI section | Not run sau blocker; không gửi fresh Claude request | Guide snapshot và result manifest | Không dùng S3/joint S4 runs làm evidence đã chạy qua guide |
| Hashes sau các bước đã chạy | server.js, database.js, database.sqlite, package/lock không đổi trong runtime | [Before/after hashes](../../experiments/s4/runs/Thai_Hoa/S4-D02-2026-10-23-agent/result.json) | Pass kỹ thuật |

## Handoff & Review

- Deliverable and destination: `materials/s4/Guide_Reproduction_Thai_Hoa.md`.
- Pending / blockers: tác giả bổ sung setup advanced, bàn giao guide version sửa; retest manual/AI từ frozen checkout; Hòa tự chạy và xác nhận trải nghiệm.
- Checks performed: Agent thực thi Installation và First Test, lưu actual command/exit/report, rồi dừng tại lỗi Advanced Usage. Đây không phải member self-run.
- Leader review: Pending. Feedback được ghi sẵn ở đây; chưa có evidence gửi, tác giả nhận/sửa hoặc retest.

## Task-Specific Checklist

### Concrete Feedback for the Author

**D02-01, execution blocker:** Sau checkout frozen baseline, lệnh `npm run test:auth:manual` không tồn tại. Guide nhắc branch `s3/F03-auth` nhưng không có thao tác checkout/overlay; sample AM-01 chưa đủ imports, fixtures, configs và npm scripts để tự chạy. Cần chỉ cách nạp reviewed sources/configs hoặc cung cấp revisions sẵn có, commands và hashes. Không dùng current main chưa pin làm input ngầm.

**D02-02, desk-review finding, not executed:** AI command tạo `ai-run` rồi đổi directory trước `cat prompt.txt`, nhưng chưa có bước đặt prompt.txt vào directory mới. Cần ghi đường dẫn hoặc copy file trước khi gọi CLI.

**D02-03, attribution finding:** Guide nói Windows baseline được một thành viên khác tái lập. Hòa reproduction records phân biệt Codex execution với member self-run. Cần ghi đúng executor, tránh làm người đọc hiểu Agent run là Hòa tự chạy.

### Retest Acceptance

1. Nhận guide version mới và ghi hash; giữ bản đã thử.
2. Dùng clone mới, làm đúng setup advanced từ frozen source; lưu output original-code manual/AI tests.
3. Chạy mutation đúng profile, đối chiếu signatures/states và actual counts; ghi cả khác biệt runtime.
4. Nếu cần fresh AI generation, ghi prompt/tool/model/output và phần review. Không suy fresh invocation từ saved candidate.
5. Chốt issue resolved hoặc ghi blocker còn lại; Hòa thực hiện personal guide reproduction và human acceptance riêng.

AI artifact: `TH-S4-DOCS-20261023` trong [AI Record](../../ai-audit/AI_Record_Thai_Hoa.md).
