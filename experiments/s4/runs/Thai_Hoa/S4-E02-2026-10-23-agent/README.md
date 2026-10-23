# S4 Joint Comparison Evidence

**Task:** S4-E02. **Owner:** Thái Hòa. **Executor:** OpenAI Codex AI Agent.

Ba profiles chạy thật trên disposable clone từ frozen 806ba19. Không có fresh candidate generation, human self-run hoặc video trong run này. Timestamps trong metadata là UTC thực tế; ngày task dùng Asia/Saigon.

## Reports

| Profile | Tests | HTML | JSON | Console |
|---|---|---|---|---|
| Baseline | [Jest](baseline-tests.json) | [HTML](baseline-mutation.html) | [JSON](baseline-mutation.json) | [Log](baseline-mutation.log) |
| Manual-analysis | [Jest](manual-tests.json) | [HTML](manual-mutation.html) | [JSON](manual-mutation.json) | [Log](manual-mutation.log) |
| Reviewed AI | [Jest](ai-tests.json) | [HTML](ai-mutation.html) | [JSON](ai-mutation.json) | [Log](ai-mutation.log) |

## Provenance and Checks

- [Input manifest/runtime](inputs.json), [commands/exit codes](commands.json), [installation log](install.log).
- Branch inputs: [baseline](baseline-inputs.json), [manual](manual-inputs.json), [AI](ai-inputs.json).
- Exact added configs/tests: `inputs/baseline/backend/`, `inputs/manual/backend/`, `inputs/ai/backend/`; initial baseline production/tests come from pinned 806ba19.
- [Runtime hashes before](protected-before.json); after [baseline](baseline-protected-after.json), [manual](manual-protected-after.json), [AI](ai-protected-after.json).
- [Original SUT preservation](source-preservation.json).
- [Derived summary](summary.json), [full mapping](mutant-mapping.md), [mapping JSON](mutant-mapping.json).
- [Runner](run.py), [summarizer](summarize.py), [comparison builder](build_comparison.py), [report assembler](assemble_report.py).

## Reading Order

Read [Overall Comparison](../../../Overall_Comparison.md), inspect raw report states, then inspect the corresponding detecting tests in the mapping and retained source. Crashes/timeouts are part of the evidence and remain distinct from assertion failures.

Reports use joint three-domain tests; their counts must not be substituted for historical S3 domain results. Source hashes and 395 signatures match across the three profiles. Local branch commits are Agent experiment snapshots, not member-authored work or pushed team changes.
