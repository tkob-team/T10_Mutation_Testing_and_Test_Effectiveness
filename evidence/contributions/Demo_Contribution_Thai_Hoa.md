# Demo Script Contribution

**Document Role:** Recording script and backup handoff; no recording is claimed.  
**Stage:** S4  
**Member:** Tống Dương Thái Hòa  
**Task IDs:** S4-C02  
**Domain / Section:** Coupons; StrykerJS and AI Agent  
**Evidence Status:** Script prepared from retained execution. Clip, member rehearsal and human verification Pending.

## Setup, Basic & Advanced Steps

Use the checkout and seven-file overlay from [Guide Contribution](Guide_Contribution_Thai_Hoa.md). All commands below run in its `backend` directory. Keep production files unchanged. Open source line 474, the manual/AI files and three HTML reports before recording. The narration below is a proposed script, not a transcript of a completed recording.

The team can record shared installation once, then assemble the three domain segments. The total assembled screencast, not each member's segment, must be 5-8 minutes and no larger than 100 MB. Use English narration and no background music. Do not label the saved-candidate scene as a fresh AI request.

| Tool / Level | Narration (English) | Action / Command | Expected Screen / Output | Verified Evidence | Backup |
|---|---|---|---|---|---|
| Stryker / Setup | We use the frozen EShop baseline and its pinned dependencies. Our tests call the API directly and reset an in-memory database. The production code stays unchanged. | Show `git rev-parse HEAD`, Node/npm versions and the lockfile. Run `npm.cmd run test:coupons`. | Frozen base 806ba19 with documented test overlays; 26 Coupons cases pass | [Manifest](../../experiments/s3/Baseline_Manifest.md) and guide setup | Retained baseline Jest log |
| Stryker / Basic | The create request succeeds, but that does not prove the requested limit was stored. This surviving mutant replaces the saved limit with one. Our old example also used one, so it missed the difference. | `npm.cmd run mutate:coupons`; open `reports/coupons/mutation.html`, line 474, replacements `true` and `max_uses_per_user && 1` | Historical reference: 39 Killed, 21 Timeout, 30 Survived, 25 NoCoverage, 5 RuntimeError | [Initial dataset](../../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/README.md) | Open saved baseline HTML if execution cannot finish during recording |
| Stryker / Advanced | We supply a limit of three and read the configuration back. Two recorded uses must still allow a quote. At three uses, the quote must be refused. We verify the stored value and the business outcome. | Show MF-01/02/03 in `test/manual/coupons.manual.js`; run the manual Jest and Stryker commands below | 35 original-code tests pass; the two target mutants become Killed in retained results | [Extension dataset](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/README.md) | Saved manual HTML, JSON and source |
| AI Agent / Setup | Our historical Claude request failed authentication. We then used Codex in the same context. This scene reviews that saved candidate, so it is not an independent human-versus-AI experiment. | Open the actual provenance and saved candidate; show the reusable prompt in the guide | Actual tool/failure/context disclosed | [G02 provenance](../../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md) | Saved raw candidate and request |
| AI Agent / Basic | The candidate uses limits of two and four. This is data-driven testing. We check the expected amount, persistence, refusal and fixture cleanup before running it. | Show `test.each([2,4])` in `test/ai/coupons.ai.js`; point to persisted-limit, limit-minus-one and at-limit assertions | Expected fixed discount 25000 and final 75000; no arbitrary exact error message | [Retained candidate snapshot](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend/test/ai/coupons.ai.js) | Editor with retained source |
| AI Agent / Advanced | The reviewed profile passes on the original code and detects the same two additional mutants. Its larger collection does not add further kills here. Timeout contributes to the tool score, so we report it separately from assertion kills. | Run the AI Jest/Stryker commands; compare the same signatures and actual `killedBy` | Historical reference: 41 Killed, 21 Timeout, 28 Survived, 25 NoCoverage, 5 RuntimeError; 53.91% | [Comparison JSON](../../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/comparison.json) | Saved AI HTML and JSON |

### Commands for Recording

Execute one command at a time and wait for completion. Save each report before rerunning the same profile.

```powershell
npm.cmd run test:coupons
npm.cmd run mutate:coupons
node node_modules/jest/bin/jest.js --config jest.coupons.manual.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.manual.config.json
node node_modules/jest/bin/jest.js --config jest.coupons.ai.config.cjs --runInBand
node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.coupons.ai.config.json
```

### Checkpoints and Closing Narration

Show FR-17 and FR-09 C5, the target replacement, the distinguishing input and the assertion that actually fails on the mutant. Compare report signatures rather than assuming numeric IDs are stable. Do not paste a mutant into production code.

> Mutation testing helps us find a specific gap between executing code and observing its result. In this case, checking a configured value detects changes that the default-value example missed. The result describes these test collections. It does not prove the whole application is correct or that one model is better.

If using saved reports, say: "This is the saved result from our verified research run." If recording a fresh authenticated AI request, save the actual prompt/output, state the tool/model and generation context, review it, then show its own test and mutation results. Do not reuse historical counts as if they were the new run's output.

## Recording Handoff

| Item | State / action |
|---|---|
| Intended segment | `materials/s4/Demo_Segment_Thai_Hoa.mp4` or an actual accessible Drive/Moodle link |
| Actual clip/link/version | Pending; no media artifact supplied or recorded in this task |
| Human verification | Hòa reviews source, narrates the real actions and confirms the visible results |
| Backup | Retained S3 HTML/JSON/logs and source snapshots linked above; identify replay explicitly |
| Installation/discovery failure | Preserve the error. Use the guide's verified revision/configuration checks before repeating |
| AI login failure | Disclose saved-candidate replay; do not present a failed request as a successful generation |
| Counts differ during recording | Keep the new report, investigate the state changes and narrate actual values |
| Export acceptance | Watch the assembled video; confirm English audio, readable commands/reports, no music, 5-8 minutes and <=100 MB; verify link access after upload |
| Assembly handoff | Give the clip, version, evidence references and planned insertion point to S4-E03 |

Sources: [requirements](../../docs/requirements/Seminar_Requirements_Consolidated.md), [guide](Guide_Contribution_Thai_Hoa.md), [experiment log](../../experiments/s3/Experiment_Log_Thai_Hoa.md). AI artifact: `TH-S4-DOCS-20261023` in [AI Record](../../ai-audit/AI_Record_Thai_Hoa.md).
