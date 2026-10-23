# Overall Comparison

**Stage / Task:** S4-E02  
**Owner:** Tống Dương Thái Hòa  
**Executor:** OpenAI Codex AI Agent  
**Evidence Status:** Three joint profiles executed; document prepared for human review. No member self-run or independent generation is claimed.

## Research Question and Inputs

Chúng tôi đo hiệu quả của hai tập assertions bổ sung khi chúng cùng chạy với baseline tests của cả ba domain. Đây là comparison giữa các collections đã bàn giao, không phải phép đo tác động nhân quả của AI hay năng lực cá nhân.

Production base là `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`. Các source overlays được chọn trước khi chạy:

| Domain | Manual-analysis input | AI input | Attribution / limits |
|---|---|---|---|
| Cart & Orders | `b77f5d6`, 8 tests bổ sung | `f4696c6`, 5 tests bổ sung | Theo bàn giao của Tấn Hiệp; một số oracles dựa vào implementation/conventions; AI context partial-blind |
| Coupons | Extended source snapshot, 9 tests bổ sung | Extended source snapshot, 14 tests bổ sung | Codex-assisted cả hai phía, cùng context, có shared helper; không phải human-only manual |
| Authentication & Users | F03, 13 tests bổ sung | G03 reviewed, 11 tests bổ sung | Giữ spec/convention labels; lock-expiry là interpretation; raw `test.failing` đã bị loại |

Nguồn: [Coupons extensions](../s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md), [Auth comparison](../s3/runs/Phuc_Hoang/H03-comparison/comparison.md), [Cart reproduction](../s3/Cross_Reproduction_Notes_Thai_Hoa.md). Khi bắt đầu chưa có personal report drafts tại stage destination; trong phiên repo đã nhận S4-B03 của Hoàng qua merge 4c5db59. Report assembly dùng shared draft, source evidence và [Auth contribution](../../materials/s4/Report_Contribution_Phuc_Hoang.md), vẫn cần tác giả review; S4-B01 chưa thấy bàn giao tại destination.

## Controlled Execution

Một local clone riêng được tạo từ baseline chung. Ba nhánh local `codex/s4-overall-baseline`, `codex/s4-overall-manual`, `codex/s4-overall-ai` ghi lại cấu hình và overlays tương ứng. Không checkout, commit hay sửa files trong SUT chính. Branch commits, args, actual UTC timestamps và exit codes có trong [inputs](runs/Thai_Hoa/S4-E02-2026-10-23-agent/inputs.json) và [commands](runs/Thai_Hoa/S4-E02-2026-10-23-agent/commands.json).

Windows Node v24.16.0, npm 12.0.2; Jest 30.5.2 và Stryker core/Jest runner 10.0.0 từ frozen lockfile. `npm ci` được chạy trong clone riêng. Mỗi profile phải pass original-code tests và Stryker dry run trước full mutation.

Joint scope là `server.js:20-135`, `server.js:280-349`, `server.js:355-492`, `server.js:510-568`. Cả ba domains được chạy trong cùng Stryker invocation; Auth giữ Jest project riêng với Cart/Coupons. Policy giữ `perTest`, concurrency 2, timeoutMS 5000 và timeoutFactor 1.5; không filter equivalent candidates hay ignore static mutants. Defect tests không vào passing selections.

SHA-256 của production, tracked SQLite, package/lock và bốn baseline test files trong runtime được kiểm trước/sau mỗi profile và giữ nguyên. [Source postflight](runs/Thai_Hoa/S4-E02-2026-10-23-agent/source-preservation.json) ghi một thay đổi bên ngoài: SUT chính chuyển từ 69b845a sang 4b28756 để sửa dấu phẩy package.json trong lúc chạy; production/lock không đổi. Agent không ghi vào SUT chính. Runner lần đầu dừng ở source-postflight assertion sau khi cả ba mutation commands đã exit 0; [recovery record](runs/Thai_Hoa/S4-E02-2026-10-23-agent/postflight-recovery.json) tách kiểm tra đó khỏi kết quả thực nghiệm và giữ nguyên raw reports.

## Measured Results

| Condition | Tests pass | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | V | Tool score | K/V |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline | 88 | 395 | 191 | 61 | 87 | 34 | 22 | 373 | 67.56% | 51.21% |
| Manual-analysis | 118 | 395 | 238 | 64 | 43 | 30 | 20 | 375 | 80.53% | 63.47% |
| Reviewed AI | 118 | 395 | 211 | 72 | 62 | 30 | 20 | 375 | 75.47% | 56.27% |

Mỗi hàng được tính trực tiếp từ một completed joint report. CompileError, Ignored và Pending được kiểm trong [summary](runs/Thai_Hoa/S4-E02-2026-10-23-agent/summary.json). V = Killed + Timeout + Survived + NoCoverage. Tool score = (Killed + Timeout)/V; K/V là assertion-kill proportion riêng, không đổi định nghĩa score của Stryker.

## Signature and State Mapping

Cả ba reports có cùng 395 signatures và cùng normalized production source. [Mapping đầy đủ](runs/Thai_Hoa/S4-E02-2026-10-23-agent/mutant-mapping.md) giữ domain, location, mutator, replacement, từng state và detecting test được tool ghi. [Machine-readable mapping](runs/Thai_Hoa/S4-E02-2026-10-23-agent/mutant-mapping.json) và [summarizer](runs/Thai_Hoa/S4-E02-2026-10-23-agent/summarize.py) cho phép đối chiếu lại.

### Manual-analysis

Added assertion kills từ baseline Survived/NoCoverage: **48**. Detected-to-undetected transitions: **0**. Mọi transitions dưới đây được giữ nguyên, kể cả thay đổi sang Timeout hoặc RuntimeError.

| Transition | Count |
|---|---:|
| Killed -> Timeout | 1 |
| NoCoverage -> Killed | 4 |
| RuntimeError -> Timeout | 2 |
| Survived -> Killed | 44 |

### Reviewed AI

Added assertion kills từ baseline Survived/NoCoverage: **28**. Detected-to-undetected transitions: **0**. Mọi transitions dưới đây được giữ nguyên, kể cả thay đổi sang Timeout hoặc RuntimeError.

| Transition | Count |
|---|---:|
| Killed -> Timeout | 8 |
| NoCoverage -> Killed | 4 |
| RuntimeError -> Timeout | 2 |
| Survived -> Killed | 24 |
| Survived -> Timeout | 1 |

Intersection của added-kill sets: 27; manual-only: 21; AI-only: 1; union: 49. Union mô tả hai runs riêng, không phải run chứa đồng thời cả hai collections.

## Interpretation and Limits

Joint baseline khác các S3 domain-only runs vì toàn bộ baseline tests cùng tham gia, tạo cross-domain coverage và assertion observations khác. Không thay số đo chung bằng tổng counts hoặc trung bình domain scores. Domain-attributed counts trong summary chỉ phân nhóm mutants theo vị trí trong chính joint run.

Native SQLite worker crashes được giữ trong console logs; RuntimeError không được gọi là Killed. Timeout policy giống nhau nhưng test populations và net runtimes thay đổi, nên classification vẫn cần đọc từng mutant. Đoạn cuối joint AI run có Auth guide reproduction chạy đồng thời ở clone riêng; machine load không được kiểm soát như một biến thực nghiệm. Không quy classification changes cho riêng một nguyên nhân. Net Killed difference không nhất thiết bằng số added assertion kills. Report mapping cho biết các transitions nào thật sự bắt đầu từ Survived/NoCoverage.

Các conditions giữ production source nhưng không cân bằng nội dung scenarios, oracle provenance hoặc generation context. Tổng tests bằng nhau nếu quan sát được không có nghĩa test budget theo domain hoặc quá trình sinh độc lập. Không có fresh AI generation, effort measurement, statistical replication hoặc model-ranking conclusion.

## Reproduction and Handoff

Chạy [run.py](runs/Thai_Hoa/S4-E02-2026-10-23-agent/run.py) bằng Python trên Windows, với docs repo và SUT repo nằm cạnh nhau. Chỉ định output directory mới để không ghi đè evidence cũ:

```powershell
python run.py C:/Temp/t10-s4-overall-repeat
```

Script cần Git, Node/npm, frozen baseline ref và Cart refs đã nêu. Nó tạo local clone riêng, cài dependencies, tạo ba branches và chạy từng profile tuần tự. Input overlays, hai configs theo từng branch và hashes được giữ dưới `inputs/`. Để kiểm lại dataset hiện tại, chạy `python summarize.py` tại run directory; không cần rerun Stryker để tính lại số liệu từ JSON.

Handoff report: [Seminar Report](../../materials/s4/Seminar_Report.md). Review findings và phần Pending: [Verification Notes](../../materials/s4/Verification_Notes_Thai_Hoa.md). Human review, personal guide reproduction và media vẫn là các gates riêng.

## Sources

- [Baseline manifest](../s3/Baseline_Manifest.md), [Hòa experiment log](../s3/Experiment_Log_Thai_Hoa.md).
- [Stryker mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/), [Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/), checked 2026-10-23.
- AI artifact `TH-S4-DOCS-20261023` in [AI Record](../../ai-audit/AI_Record_Thai_Hoa.md).
