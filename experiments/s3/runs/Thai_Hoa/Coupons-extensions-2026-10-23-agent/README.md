# Coupons Manual and Agent Extensions

**Date:** 2026-10-23 Asia/Saigon. **Tasks:** S3-F02/G02/H02. **Executor:** OpenAI Codex AI Agent.

Theo phân chia người dùng đã chốt: manual thêm **4 nhóm / 6 cases**; Agent thêm **đủ 8 nhóm / 12 cases**, bao gồm cả bốn nhóm manual. Giữ nguyên ba manual cases và hai AI cases trước đó. [Provenance và bảng mapping](PROVENANCE.md) ghi request, spec, cases và giới hạn.

## Source Files

| Collection | Working SUT path | Retained source |
|---|---|---|
| Manual MF-01–07 | `backend/test/manual/coupons.manual.js` | [Snapshot](sources/backend/test/manual/coupons.manual.js) |
| Agent: two existing limit cases + AG-01–08 | `backend/test/ai/coupons.ai.js` | [Snapshot](sources/backend/test/ai/coupons.ai.js) |
| Four shared scenarios | `backend/test/helpers/coupons-scenarios.js` | [Snapshot](sources/backend/test/helpers/coupons-scenarios.js) |

| Shared manual / Agent groups | Cases in each collection |
|---|---:|
| Select the requested code among coupons with different discounts | 1 |
| Admin-created minimum: 399999 refused, 400001 allowed at minimum 400000 | 2 |
| Admin-created expiry: T−1 ms allowed, T+1 ms refused | 2 |
| API-recorded usage affects only its user and coupon | 1 |

| Additional Agent groups | Cases |
|---|---:|
| Duplicate creation preserves original fields and discount | 1 |
| Deletion prevents applying the deleted code and preserves the other code | 1 |
| List returns all three created coupons, without an ordering contract | 1 |
| Invalid JWT rejects list/create/delete and preserves stored data | 3 |

## Fresh Results

All original-code profiles succeed. The integration baseline is **88/88**. The table counts unique Jest cases, not duplicated executions in the existing Stryker dry-run integration.

| Profile | Coupons tests pass | Killed | Timeout | Survived | NoCoverage | RuntimeError | Total | Tool score |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Frozen baseline, historical mutation reference | 26 | 39 | 21 | 30 | 25 | 5 | 120 | 52.17% |
| Extended manual, fresh run | 35 = 26+3+6 | 41 | 21 | 28 | 25 | 5 | 120 | 53.91% |
| Extended Agent, fresh run | 40 = 26+2+12 | 41 | 21 | 28 | 25 | 5 | 120 | 53.91% |

**Không có additional kill so với F02/G02 cũ.** Cả hai report mới khớp source (chuẩn hóa CRLF/LF) và **120/120 mutant signatures** với baseline và variant lịch sử tương ứng. So baseline, chỉ 111/113 tại L474 chuyển Survived→Killed; so variant cũ, **không mutant nào đổi trạng thái**. Report ghi `killedBy` là MF-01 ở manual và existing AI limit-2 case ở Agent. Assertions mới mở rộng kiểm tra hành vi/API lifecycle, không tạo thêm survivor kills trong universe hiện tại.

Tool score tính cả 21 Timeout. Assertion kills / valid = **41/115 = 35.65%**; không gọi Timeout là assertion kills. Năm RuntimeError từ native SQLite và các cảnh báo Jest được giữ trong logs, không bị xóa hoặc đổi nhãn. Hai bộ có số scenarios khác nhau theo yêu cầu, không phải phép so sánh độc lập hay bằng chứng Agent superiority.

## Evidence

- [Comparison, signature transitions and protected hashes](comparison.json).
- [Baseline Jest JSON](baseline-tests.json), [manual Jest JSON](manual-tests.json), [Agent Jest JSON](ai-tests.json).
- Manual: [HTML](manual-mutation.html), [JSON](manual-mutation.json), [console log](manual-mutation.log), [command metadata](manual-mutation.meta.json).
- Agent: [HTML](ai-mutation.html), [JSON](ai-mutation.json), [console log](ai-mutation.log), [command metadata](ai-mutation.meta.json).
- [Frozen inputs and overlay list](inputs.json), [exact archive](frozen-input.zip), [protected file hashes before execution](protected-before.json).

SUT working HEAD at preparation: `4e014b9`; production, package/lock and baseline mutation config match their before-run hashes. Runs use archived frozen `806ba19`, not the current branch as an implicit baseline. Archive text files use CRLF while Git blobs use LF; comparison records that normalization explicitly. The archived SQLite file is byte-identical to the frozen blob. No production code/data or earlier raw reports are edited.

## Reproduction

From the SUT `backend/`, with existing pinned dependencies:

```powershell
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
```

For the exact run input, extract the frozen archive to a new disposable directory and overlay the seven files under `sources/backend/` at their corresponding `backend/` paths. Use the pinned lockfile and an isolated runtime; do not place manual/Agent additions in the baseline test selection. The [runner](verify.mjs) and [summarizer](summarize.mjs) retain how this execution was driven; their local paths come from inputs.json and must be updated if reproducing elsewhere. Preserve previous evidence before generating a new run.

Human review, member self-run and official audit verdict remain separate. Working code changes are not committed or pushed by this run.
