# Source Audit

## Status and Scope

**Date:** 2026-11-06. **Executor:** OpenAI Codex AI Agent. **Status:** Technical audit and verification completed. Member review and self-runs remain separate.

Người dùng yêu cầu hoàn thành audit và sửa tooling theo kế hoạch đã review, gom implementation trước rồi kiểm chứng chung. Phạm vi gồm research repo EShop, môi trường, baseline/manual/AI selections, harness, mutation configs, runner, source preservation và kết luận có evidence. Không chọn SUT hoặc xây activity platform trong lượt này. Không stage, commit hoặc push.

- [Source and commands](../../eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/TESTING.md)
- [Audit evidence](../evidence/verification/source-audit-2026-11-06/)
- [Exact inputs and hashes](../evidence/verification/source-audit-2026-11-06/inputs.json)
- [Standalone test results](../evidence/verification/source-audit-2026-11-06/test-summary.json)
- [Oracle review](../evidence/verification/source-audit-2026-11-06/oracle-review.json)
- [Mutation summary and historical transitions](../evidence/verification/source-audit-2026-11-06/mutation-summary.json)
- [Assertion-level target verification](../evidence/verification/source-audit-2026-11-06/target-verification/summary.json)
- [Completed command matrix](../evidence/verification/source-audit-2026-11-06/completion.json) và [preservation](../evidence/verification/source-audit-2026-11-06/preservation.json)

## Revision and Environment

Source checkout nhận việc là `4b28756a1d2a59cb4b74300709122180056f9f55`. Historical frozen production là `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Git blobs của server.js, database.js và tracked database giống nhau giữa hai revisions và hai nhánh Cart được nhập. Assertions của baseline được giữ; chỉ đổi resource cleanup trong các files Coupons. Hai Cart collections nhập nguyên bytes, hashes nằm trong backend/experiments/inputs.json.

Environment thực thi mới: Windows x64, Node 24.16.0, npm 12.0.2, Jest 30.5.2, Stryker core/Jest runner 10.0.0, sqlite3 6.0.1 và SQLite 3.52.0. Fresh npm ci thành công trong runtime riêng. Dependencies trực tiếp khớp lockfile; dependency graph giữ nguyên, lock chỉ thêm engines metadata. Xem [static preservation](../evidence/verification/source-audit-2026-11-06/static-preservation.json).

Optional install scripts của @parcel/watcher và unrs-resolver bị npm policy chặn; tests thực tế vẫn chạy thành công. Không bật toàn bộ lifecycle scripts hoặc cập nhật dependencies để bỏ qua warnings.

## Findings and Changes

| Finding | Change | Verification |
|---|---|---|
| Environment guide ghi Node từ 18, thiếu version selection | Thêm .nvmrc, backend engines/packageManager và đồng bộ setup guide | Fresh install và versions được ghi trong commands |
| Cart manual/AI và joint configs chưa tập trung trong checkout | Import Cart từ b77f5d6 và f4696c6; tạo đủ 12 profiles với provenance | Import hashes khớp; discovery và unique counts đúng |
| Multi-project inheritance có thể tạo duplicate selections | Single-domain configs dùng file cụ thể và projects rỗng; overall giữ hai projects có isolation riêng | 12 standalone profiles pass, không duplicate test identities |
| Historical Coupons dry run đếm 70 lượt cho 35 cases | Dùng configFile rõ ràng thay inline config kế thừa; factory giữ selection chung | Cả 12 dry runs khớp unique counts của standalone Jest |
| Cart thiếu DB cleanup; clocks/spies có thể rò qua tests | Common cleanup đóng DB đã được harness đăng ký, khôi phục clocks/spies; bỏ duplicate close hooks | All profiles và shuffled baseline pass |
| Joint per-test instrumentation cần đúng environment cho child projects | Mutation-only overall configs dùng Stryker-aware Node environment ở từng project | Ba joint runs hoàn tất, đúng 88/118/118 tests và 395 matched signatures |
| prepare-baseline có thể ghi lại configs/package | Đổi entrypoint compatibility thành hướng dẫn, không ghi tracked inputs | Source inspection; configs có sẵn trong repo |
| Historical runner phụ thuộc paths trước migration | Runner mới copy inputs tới runtime riêng và ghi commands, snapshots, hashes, logs | Batch kiểm chứng được thực thi từ runtime riêng |
| Legacy startup hard-code máy tác giả và killall node | Dùng repo-relative paths và chỉ quản lý child PIDs do script tạo | Source/syntax review; không chạy demo UI trên tracked database |
| Native worker crashes chưa được giải thích | Tái hiện tối giản bên ngoài Jest/Stryker, giữ RuntimeError riêng | Xem Native Driver Diagnosis |

New mutation policy giữ perTest, timeoutMS 5000, timeoutFactor 1.5 và đổi concurrency từ 2 xuống 1. Đây là conditions mới, không sửa retroactive kết quả cũ. Raw history và submission snapshots không thay đổi.

## Standalone Test Results

| Domain | Baseline pass | Manual collection pass | AI collection pass |
|---|---:|---:|---:|
| Cart and Orders | 36/36 | 44/44 | 41/41 |
| Coupons | 26/26 | 35/35 | 40/40 |
| Authentication and Users | 26/26 | 39/39 | 37/37 |
| Overall | 88/88 | 118/118 | 118/118 |

Discovery khớp chính xác file list của mỗi profile. Không có duplicate test identities hoặc runtime suite failures. Shuffled overall baseline với seed 61106 pass 88/88. Tutorial weak, strong và AI đều exit 0.

Separate original-defect profile có 54/54 assertion failures, không có setup/hook failure trong kết quả đã kiểm. Điều này không tự chứng minh 54 oracle đều là yêu cầu rõ: Auth DF-10 dùng assumption 24 giờ và một số HTTP expectations là conventions.

## Native Driver Diagnosis

Mutation tái hiện native exit `3221225477` ở mutants thay SQL thành chuỗi rỗng. Mỗi joint profile có cùng 20 invalid native-error mutants. Common cleanup và concurrency 1 không loại được driver crash pattern này.

Probe độc lập dùng sqlite3 đã cài trong runtime, mỗi case chạy process riêng với database trong bộ nhớ:

| SQL and parameters | run | get | all |
|---|---|---|---|
| SELECT 1 AS value, no bind parameters | Exit 0 | Exit 0 | Exit 0 |
| Empty SQL, no bind parameters | Callback SQLITE_MISUSE, exit 0 | Callback SQLITE_MISUSE, exit 0 | Callback SQLITE_MISUSE, exit 0 |
| SELECT ? AS value, parameter 1 | Exit 0 | Exit 0 | Exit 0 |
| Empty SQL, parameter 1 | Native exit 3221225477 | Native exit 3221225477 | Native exit 3221225477 |

Evidence: [no-bind probe](../evidence/verification/source-audit-2026-11-06/sqlite-empty-statement-probe.json), [bound-statement probe](../evidence/verification/source-audit-2026-11-06/sqlite-empty-bound-statement-probe.json).

Kết luận trong phạm vi Windows/Node/driver đã đo: empty SQL kết hợp bind parameters đủ để tái hiện crash mà không có Jest, Stryker hoặc SUT. Điều này giải thích pattern đã đối chiếu, không khẳng định mọi RuntimeError đều cùng nguyên nhân. Không patch guard để biến lỗi native thành assertion kill; giữ driver và production để so sánh, công bố invalid mutants riêng. Thay driver/phiên bản là thay đổi điều kiện thực nghiệm cần dataset riêng.

## Oracle and Attribution Review

- Cart baseline giữ thiết kế historical status-only. Tên case nhắc giỏ rỗng hoặc persistence không có nghĩa baseline đã assert body/DB.
- Cart manual có exact messages, ordering, product_id inputs và client-total expectations phụ thuộc implementation hoặc convention. AI error-field shape cũng có implementation observations. So sánh là giữa retained collections, không đại diện full SRS compliance.
- Coupons manual/AI có Codex hỗ trợ cùng context và shared scenarios; số cases khác nhau. Không nhận là independent human-versus-AI hoặc equal-budget comparison.
- Auth manual error handling có conventions; AI-L03 exact lock-expiry equality là interpretation. Baseline expired-lock test ở 24 giờ không chứng minh duration 30 giây.
- Quote, checkout và usage recording là API calls riêng. Không nhận sequence này là atomic checkout hoặc tự ghi usage.
- Lượt này không có fresh AI generation, member self-run, chữ ký, human acceptance hoặc thay đổi phân công.

## Mutation Results

Cả 12 full mutation profiles và 12 dry runs đã hoàn tất với exit 0. Mỗi report giữ raw states và invalid mutants; exit 0 không có nghĩa không có mutant execution errors. Các conditions trong từng domain có cùng normalized production source và mutant signatures.

| Profile | Tests | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | Tool score |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| cart-orders-baseline | 36 | 150 | 89 | 18 | 34 | 2 | 7 | 74.83% |
| cart-orders-manual | 44 | 150 | 112 | 18 | 11 | 2 | 7 | 90.91% |
| cart-orders-ai | 41 | 150 | 102 | 18 | 21 | 2 | 7 | 83.92% |
| coupons-baseline | 26 | 120 | 42 | 18 | 30 | 25 | 5 | 52.17% |
| coupons-manual | 35 | 120 | 43 | 19 | 28 | 25 | 5 | 53.91% |
| coupons-ai | 40 | 120 | 41 | 21 | 28 | 25 | 5 | 53.91% |
| auth-baseline | 26 | 125 | 64 | 18 | 23 | 7 | 13 | 73.21% |
| auth-manual | 39 | 125 | 83 | 27 | 4 | 3 | 8 | 94.02% |
| auth-ai | 37 | 125 | 74 | 27 | 13 | 3 | 8 | 86.32% |
| overall-baseline | 88 | 395 | 191 | 63 | 87 | 34 | 20 | 67.73% |
| overall-manual | 118 | 395 | 238 | 64 | 43 | 30 | 20 | 80.53% |
| overall-ai | 118 | 395 | 217 | 66 | 62 | 30 | 20 | 75.47% |

Tool score dùng (Killed + Timeout) / valid. Killed là trạng thái do tool ghi, chưa tự chứng minh fail tại assertion cụ thể. [Invalid-mutant reasons](../evidence/verification/source-audit-2026-11-06/invalid-mutants.json) giữ native crashes và các mutant exceptions riêng. Không filter bỏ chúng khỏi raw reports.

### Joint Comparison

Joint runs thật có cùng 395 signatures; common-valid set là 375, loại 20 native-error signatures xuất hiện trong cả ba conditions. Manual có 44 Survived -> Killed và 4 NoCoverage -> Killed, tổng 48 new tool Killed. AI có 25 và 4, tổng 29. Không có detected -> undetected transitions. Đây là tool-state observations, không nhận tất cả là assertion-verified detections.

### Common Valid Sets

| Scope | Common valid | Excluded if invalid in any condition |
|---|---:|---:|
| cart-orders | 143 | 7 |
| coupons | 115 | 5 |
| auth | 112 | 13 |
| overall | 375 | 20 |

Auth domain baseline có 13 RuntimeError, manual/AI có 8. Ngoài 8 SQL driver crashes, baseline có 5 uncaught TypeError mutants chuyển sang Timeout ở các variants. Comparison phụ trên 112 common-valid signatures loại cả 13 signatures invalid ở ít nhất một condition. Detected proportions trên set chung là 73.21%, 93.75%, 85.71%; không dùng thay official scores trong bảng raw states.

### Historical Reproduction

Đối chiếu trực tiếp với raw joint reports cũ, cùng 395 signatures và normalized source:

- Baseline: 2 RuntimeError -> Timeout; các signatures khác giữ trạng thái.
- Manual: tất cả states giữ nguyên.
- AI: 6 Timeout -> Killed; các signatures khác giữ trạng thái. Tool score AI vẫn 75.47% vì tổng detected không đổi.

Không có assertions mới trong retained collections. Các chuyển trạng thái này không chứng minh code mới làm tests thông minh hơn; conditions và timing khác, đặc biệt initial overhead của Auth baseline domain đo được 18678 ms. Timing và timeout allowance của mỗi run nằm trong mutation-summary.json. Không có statistical replication hoặc model ranking.

### Assertion-Level Controls

Ba actual survivors được ghép theo location/mutator/replacement, kiểm trên bản sao riêng bằng standalone Jest:

| Case | Mutation | Baseline on mutant | Manual candidate | AI candidate |
|---|---|---|---|---|
| Cart, line 286 | Empty cart [] thành một phần tử | Pass | Empty-cart assertion fails | AI-CO-01 assertion fails |
| Coupons, line 474 | max_uses_per_user OR 1 thành AND 1 | Pass | MF-01 persistence assertion fails | Limit-2 persistence assertion fails |
| Auth, line 124 | Điều kiện role thành true | Pass | AM-01 role assertion fails | AI-U01 role assertion fails |

Cả sáu candidate controls pass trên original. Trên từng target mutant, mỗi candidate có đúng một failed test với expect matcher failure, không dùng setup error hoặc native crash làm bằng chứng. Có 18 checks được lưu: original/mutant, baseline/manual/AI cho ba targets. Guard về source coordinates và một Auth line pointer cũ đã chặn hai lần chuẩn bị trước khi target tương ứng chạy; records và continuation được giữ, 12 Cart/Coupons checks hoàn tất được tái sử dụng thay vì chạy lại.

## Build and Preservation

Fresh npm ci và npm run build của frontend-web và frontend-admin đều exit 0. Đây là compile/bundle verification, chưa là browser UAT. Mobile/device execution và live UI rehearsal không được chạy trong lượt backend research audit này. Legacy shell startup được sửa paths/process handling nhưng không được dùng để nạp tracked database.

Core batch có 59 commands được ghi. Ba tutorial mutation profiles cũng hoàn tất: weak 3 Killed/2 Survived, strong 5 Killed, AI 4 Killed/1 Survived. Tutorial AI không đạt toàn bộ mutants, giữ đúng kết quả thay vì suy AI luôn đủ.

[Preservation record](../evidence/verification/source-audit-2026-11-06/preservation.json) xác nhận source production, runtime production và mọi input đã chụp trước batch đều không thay đổi trong execution. [AST assertion preservation](../evidence/verification/source-audit-2026-11-06/assertion-preservation.json) đối chiếu 257 complete matcher expressions trong 19 existing test/helper files. Hai Cart imports được kiểm exact hashes riêng. Dependency graph không đổi.

[Postprocessing tools](../evidence/verification/source-audit-2026-11-06/postprocessing-tools.json) giữ snapshots/hashes của summarizer và target verifier. Summarizer được hoàn thiện sau core batch để chuẩn hóa coordinate keys và tính common-valid sets; không đổi executable experiment inputs. Tại thời điểm execution, source edits còn uncommitted, nên inputs snapshots/hashes nhận dạng đúng code đã chạy. Sau audit, người dùng yêu cầu commit; source checkpoint là `1be4637e20241054e23b99c8e2412fd2e7cbbc68`. Không push. Raw execution metadata giữ nguyên trạng thái tại thời điểm đo.

Evidence directory có .gitattributes với -text để Git giữ nguyên bytes và line endings. Khi commit, đối chiếu staged blob hashes với working files; whitespace formatting checks áp dụng cho tài liệu đang chỉnh, không sửa raw logs hoặc snapshots để làm sạch warnings.

## Handoff

Research tooling và commands đã được kiểm chứng cho scope Auth, Coupons, Cart and Orders. Production bugs chủ đích và driver invalid-mutant limitation được công bố, không nhận SUT là fully correct. Bước tiếp theo trong kế hoạch chung là session chọn SUT và thiết kế activity platform; nội dung guide/report/slides được rà sâu ở bước hoàn thiện tài liệu. Human acceptance, member self-runs, tracker, video access và chữ ký giữ trạng thái theo evidence riêng.

[Final validation](../evidence/verification/source-audit-2026-11-06/final-validation.json) kiểm config factory, 57 backend JS/CJS syntax files, matched comparisons, source preservation, current links và Git index rỗng. Git diff whitespace checks và Bash syntax check của startup script đều pass. Một research-note link cũ trong current AI record đã được cập nhật theo vị trí sau migration; raw history không sửa.

## Sources

- [Source SRS](../../eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/README.md) và [API specification](../../eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/api_specification.md)
- [Historical baseline manifest](../evidence/experiments/domain-runs/Baseline_Manifest.md)
- [Historical joint comparison](../evidence/experiments/integration-and-reproduction/Overall_Comparison.md)
- [Historical duplicate-execution record](../evidence/experiments/domain-runs/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md)
- [Jest configuration](https://jestjs.io/docs/configuration)
- [Stryker Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/)
- [Stryker configuration](https://stryker-mutator.io/docs/stryker-js/configuration/)
- [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)
- [sqlite3 API](https://github.com/TryGhost/node-sqlite3/wiki/API)
- [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci)
