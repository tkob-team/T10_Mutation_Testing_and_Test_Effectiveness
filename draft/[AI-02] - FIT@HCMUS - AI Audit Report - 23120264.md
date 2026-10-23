<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
**Faculty of Information Technology (FIT) – Ho Chi Minh City University of Science (HCMUS)**

**CS423 / CSC13003 – Software Testing (AI-augmented · 2026\)**

**AI POLICY · TEMPLATES — 2026 v1.0**

# **AI Audit Report — 5-section Template per Artifact**

*Mandatory appendix for every AI-assisted homework (HW\#01–HW\#06, and Seminar).*

*Adapted from Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. This adaptation is prepared for FIT@HCMUS – CS423 / CSC15003 Software Testing course.*

## **1\. Student Information**

| Field | Value |
| :---- | :---- |
| **Student name (printed):** | NGUYỄN PHÚC HOÀNG |
| **Student ID:** | 23120264 |
| **Class / Cohort:** |  |
| **Assignment ID (e.g., HW\#00, HW\#02):** | Seminar T10, Group 12 |
| **Assignment date:** | 2026-10-19 to 2026-10-23 (recorded work) |
| **AI tool(s) used:** | Claude Code 2.1.292 with Claude Opus 5.5; Claude CLI with claude-sonnet-5-5; Claude Code with Claude Sonnet 5.5 (S3-E03) |
| **AI tool(s) used:** | \[x\] Yes  \[ \] No |

## **2\. Instructions (read before filling)**

* Add one row per AI-generated artifact (test case, script, checklist, OpenAPI spec, JMeter plan, etc.).  
* Paste the verbatim prompt — DO NOT paraphrase.  
* Paste the verbatim AI output (or include a labelled screenshot in the report).  
* Tag the verdict: VALID / INVALID / INCOMPLETE.  
* Reasoning must cite a course slide, ISTQB section, or technical RFC.  
* Show the corrected artifact with the change highlighted.  
* Sample rows are in italic — replace them before submission.

## **3\. Audit Table — one row per artifact**

| (1) Prompt \+ Tool | (2) AI Output | (3) Verdict | (4) Reasoning (ISTQB) | (5) Student Fix |
| :---- | :---- | :---- | :---- | :---- |
| **PH-S3-A03B03-01**<br>Tool: Claude Code 2.1.292, Claude Opus 5.5<br>Recorded date: 2026-10-19<br>Task: Research equivalent mutants and tool limitations<br>Prompt source: [Verbatim transcript](../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md) | Research Notes, source register, sandbox snippets, tests and Stryker reports. The original notes were subsequently corrected to count three Killed-to-Timeout transitions and to include the login-lock rule already specified by FR-02.<br>Original-output source: [Verbatim transcript](../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md) | INCOMPLETE | The retained draft and corrections identify two substantive issues: incomplete mutant accounting and an omitted SRS rule. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports checking the test basis; [ISTQB CTFL 4.0.1, 4.2.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is relevant to lock-state behavior. | Corrections in the retained notes were produced by the Agent: three state changes are counted, and FR-02 is cited with the +1 increment, three-attempt threshold and 30-second lock. |
| **PH-S3-C03-CLAUDE**<br>Tool: Claude CLI, claude-sonnet-5-5<br>Recorded date: 2026-10-22<br>Task: Generate an age-boundary tutorial assertion<br>Prompt source: [Full verbatim prompt](../experiments/s3/runs/Phuc_Hoang/C03-claude/prompt.txt) | A successful Claude request generated the canRegister(18) assertion. The original test passes, and the selected age > 18 mutant is Killed. The resulting 18-mutant report contains 13 Killed and 5 Survived; the weak report contains 12 Killed and 6 Survived.<br>Original-output source: [Raw Claude response](../experiments/s3/runs/Phuc_Hoang/C03-claude/raw.json) | VALID | The valid boundary is supplied by the demo specification. The explanation about a hypothetical numeric-constant mutation is not used as evidence of an actual Stryker mutant. [ISTQB CTFL 4.0.1, 4.2.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the boundary-design reference. | The retained workflow removes the answer-revealing source comment and distinguishes the failed authentication probe from the successful request. |
| **PH-S3-D03-AUTH**<br>Tool: Claude-assisted Auth test workflow<br>Recorded date: 2026-10-22<br>Task: Prepare Authentication & Users tests<br>Prompt source: [Handoff cases and execution record](../experiments/s3/Experiment_Log_Phuc_Hoang.md#test-cases) | The Auth handoff contains 26 passing original-code tests and 23 separate defect cases. The five original source files were later imported without assertion edits, with hashes checked during common-baseline integration.<br>Original-output source: [Handoff cases and execution record](../experiments/s3/Experiment_Log_Phuc_Hoang.md#test-cases) | VALID | Passing tests and defect tests are selected separately; the 24-hour OTP duration is identified as an assumption rather than a contractual boundary. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports requirement provenance. Later integration reruns have a different executor. |  |
| **PH-S3-E03-PROVISIONAL**<br>Tool: Claude-assisted Stryker execution<br>Recorded date: 2026-10-22<br>Task: Measure the provisional Auth mutation baseline<br>Prompt source: [Provisional baseline and diagnostics](../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline) | The provisional run has 125 mutants: 60 Killed, 23 Timeout, 23 Survived, 7 NoCoverage and 12 RuntimeError. Score is 73.45% with 113 valid mutants. It uses the original Auth source plus the D03 tests in an isolated copy.<br>Original-output source: [Provisional baseline and diagnostics](../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline) | VALID | The record identifies the run as provisional and reports Timeout/errors separately. Native SQLite crashes and callback exceptions are preserved in diagnostics. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports documenting execution conditions instead of relabeling the run as the final common baseline. |  |
| **PH-S3-E03-BASELINE**<br>Tool: Claude Code, Claude Sonnet 5.5 (claude-sonnet-5-5)<br>Recorded date: 2026-10-23<br>Task: Run the Authentication & Users Stryker baseline on the common baseline commit<br>Prompt (verbatim task note): "Làm: Checkout baseline chung, tự chạy Stryker và map mutants thuộc Authentication & Users; lưu reports gốc."<br>Prompt source: [Experiment log, Baseline](../experiments/s3/Experiment_Log_Phuc_Hoang.md#baseline); [verbatim transcript](../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-E03-BASELINE_Transcript.md) | Claude Code installed the frozen SUT commit 806ba19 in a clean clone, ran npm ci, npm test (88 pass) and test:auth (26 pass), then ran stryker.auth.config.json twice. Result: 125 mutants, 60 Killed, 27 Timeout, 23 Survived, 7 NoCoverage and 8 RuntimeError. Score is 74.36% = (60 + 27)/117; assertion kill rate is 60/117 = 51.28%; RuntimeError is excluded from the denominator. All 125 mutants lie in lines 20-135 and are mapped per route.<br>Original-output source: [Console log](../experiments/s3/runs/Phuc_Hoang/E03-baseline/console.log), [by-route mapping](../experiments/s3/runs/Phuc_Hoang/E03-baseline/by_route.md) | VALID | The second run and the common-baseline Windows run reproduce every mutant state (125/125 matched by line, column, mutator and replacement; 0 differences). Production file hashes are unchanged before and after. Timeout and RuntimeError are reported separately. Compared with the provisional run, four if (!user) mutants moved from RuntimeError to Timeout, so 73.45% to 74.36% is a classification change and not a stronger assertion. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports reporting execution conditions with results. | No correction to the measured numbers was needed. The workflow used a clean clone of the common SUT instead of the member's fork, which has uncommitted work, and kept the provisional run as a separate record. |
| **Artifact \#6** |  |  |  |  |
| **Artifact \#7** |  |  |  |  |
| **Artifact \#8** |  |  |  |  |
| **Artifact \#9** |  |  |  |  |
| **Artifact \#10** |  |  |  |  |
| **Artifact \#11** |  |  |  |  |
| **Artifact \#12** |  |  |  |  |

## **4\. Summary of AI Accuracy**

Aggregate the verdicts from Section 3 and complete the table below.

| Metric | Count | Percentage |
| :---- | :---- | :---- |
| **Total AI-generated artifacts audited** | 5 | 100.00% |
| **VALID (correct, accepted as-is)** | 4 | 80.00% |
| **INVALID (wrong; rejected)** | 0 | 0.00% |
| **INCOMPLETE (acceptable after edits)** | 1 | 20.00% |

## **5\. Conclusion — When should AI be used (or not)?**

Write 80–150 words describing patterns you observed. Where did AI shine? Where did AI fail? What is your recommendation for using AI in this kind of work in the future?

AI helped assemble the equivalent-mutant research, sandbox examples, Auth tests and provisional mutation analysis. The boundary tutorial demonstrates a useful proposal when the specification supplies a clear expected result. The research corrections demonstrate the opposite risk: generated explanations can omit a requirement that is already present or miscount status changes. Authentication failures, native SQLite errors and timeouts also show that execution conditions affect what the report means. I would retain original outputs, compare each claim with its source and use matching mutant signatures across runs. Equivalent candidates need an explicit input domain and a reasoned argument. Mutation score alone is not sufficient to identify a correct oracle, prove equivalence or establish that an assertion caused a failure. The provisional Auth dataset must also be interpreted with its original source, selected tests and runtime conditions stated explicitly.


## **6\. Mandatory Disclosure (paste verbatim)**

The AI-assisted artifacts listed in Section 3 was initially generated by Claude Code 2.1.292 with Claude Opus 5.5; Claude CLI with claude-sonnet-5-5; Claude Code with Claude Sonnet 5.5; I reviewed and modified the requested research scope and the combined A03/B03 workflow, added the instructions to keep sandbox and SUT observations distinct; the task requests and the decision to combine A03 with B03 was written entirely by me. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any artifact listed in the prohibited category.

## **Signature**

| Student name (printed): | NGUYỄN PHÚC HOÀNG |
| :---- | :---- |
| **Student ID:** | 23120264 |
| **Class / Cohort:** |  |
| **Course:** | CS423 / CSC13003 – Software Testing |
| **Instructor:** |  |
| **Date:** |  |
| **Signature:** |  |

## **References**

* Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.  
* ISTQB Foundation Level Syllabus (latest version).  
* Hardman, P. (2025). A Post-AI Learning Taxonomy.  
* Fuster Rabella, M. (2025). OECD Education Working Paper No. 338\.  
* Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.  
* Anthropic (2025). Building reliable AI test agents — engineering blog.  
* DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
