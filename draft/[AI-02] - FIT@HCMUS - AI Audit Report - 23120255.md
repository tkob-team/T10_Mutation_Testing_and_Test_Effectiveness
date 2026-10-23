**Faculty of Information Technology (FIT) – Ho Chi Minh City University of Science (HCMUS)**

**CS423 / CSC13003 – Software Testing (AI-augmented · 2026\)**

**AI POLICY · TEMPLATES — 2026 v1.0**

# **AI Audit Report — 5-section Template per Artifact**

*Mandatory appendix for every AI-assisted homework (HW\#01–HW\#06, and Seminar).*

*Adapted from Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. This adaptation is prepared for FIT@HCMUS – CS423 / CSC15003 Software Testing course.*

## **1\. Student Information**

| Field | Value |
| :---- | :---- |
| **Student name (printed):** | LÊ TẤN HIỆP |
| **Student ID:** | 23120255 |
| **Class / Cohort:** |  |
| **Assignment ID (e.g., HW\#00, HW\#02):** | Seminar T10, Group 12 |
| **Assignment date:** | 2026-10-16 to 2026-10-23 (recorded work) |
| **AI tool(s) used:** | Claude (claude.ai): Claude Sonnet 4.6 and Claude Opus 5.5; Claude Code: Claude Opus 5.5 |
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
| **AI-S3-A01-01**<br>Tool: Claude (claude.ai), Claude Sonnet 4.6 and Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Research definitions, operators and workflow<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-a01-01) | Research Notes F-A01-01 through F-A01-05 and the source register. The sandbox example compared a weak suite with 3 Killed out of 15 mutants and a stronger suite with 14 Killed out of 15. The member's Windows reproduction obtained the same counts.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-a01-01) | VALID | The recorded member verdict accepts the research artifact. Tutorial results were reproduced on the member's machine. This is evidence for the example, not a completed EShop baseline. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) provides the traceability basis; the research sources remain identified in the source register. | Accepted as-is for the artifact recorded on 2026-10-16. |
| **AI-S3-B01-01**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Tool architecture and SUT inspection<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-b01-01) | Tool workflow notes and source inspection originally concluded that some cart/checkout rules were unspecified. The inspection omitted the SRS in README.md. The retained notes show the corrected business references and test-only harness approach.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-b01-01) | INCOMPLETE | FR-07 and the SRS resolve assumptions that the first output treated as open questions. This affects the test basis and expected behavior. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports checking requirements against testware; the detailed correction is preserved in the source record. | Changed the cart rule to FR-07, added the SRS source, corrected Q9 and F-B01-04, and replaced a production-edit seam with test-only Express/SQLite mocks. |
| **AI-S3-C01-01**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Jest assertions for a tutorial survivor<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01) | Three executed tutorial tests pass on the original implementation. The exact free-shipping boundary kills the selected subtotal > 500000 mutant. Full mutation results contain 14 Killed and 1 Survived. The code and explanation are retained separately.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01) | VALID | The recorded verdict concerns the test code. Expected values were calculated from the requirement; the explanation about a hypothetical >= 499999 mutant was rejected because that mutation was not generated. [ISTQB CTFL 4.0.1, 4.2.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the boundary-design reference. | Kept the generated assertions. Added only the test wrapper around the optional standalone expect statement and rejected the unsupported mutator explanation. |
| **AI-S3-D01-01**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-18<br>Task: Cart baseline and defect suite<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-01) | An initial Cart & Orders suite, isolated fixtures and separate defect tests. The original sandbox reported 36 passing baseline tests and separate expected assertion failures. Production behavior was checked against the SRS rather than silently treated as correct.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-01) | INCOMPLETE | The record labels the initial suite usable after edits. Business requirements and original defects must be distinguished before freezing the baseline. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports test-basis traceability. Later execution and integration are different artifacts and are not counted as a member self-run here. |  |
| **AI-S3-D01-02**<br>Tool: Claude Code, Claude Opus 5.5<br>Recorded date: 2026-10-22<br>Task: Execute and diagnose Cart handoff<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02) | The execution report records 36 passing baseline tests, 8 separate defect failures and a Stryker dry-run failure: No tests were found. An additional diagnostic run using tempDirName stryker-tmp discovered the 36 tests.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-02) | VALID | The report accurately distinguishes execution failure from mutant detection and preserves the actual outcome instead of changing tests to fit an expectation. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the reporting reference. The actor of these commands is Claude Code. |  |
| **AI-S3-WF-01**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-22<br>Task: Prepare workspace and run-report instructions<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-01) | CLAUDE.md and mutation/run-report skills. The first version assumed date-named working folders and repeated cloning, while the actual workflow used one existing Repo directory containing the clones.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-01) | INCOMPLETE | The first output depended on an incorrect environment assumption. Subsequent versions use the supplied workspace and a concise report format. [ISTQB CTFL 4.0.1, 1.4.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the context reference; the recorded user corrections identify the actual change. | Replaced date-folder assumptions with the fixed Repo workspace, reused existing clones, shortened the summary, and required asking instead of inventing missing environment details. |
| **AI-S3-C01-02**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Record tutorial execution and mutant attribution<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-02) | Experiment Log C01, console interpretation and a script extracting killedBy from mutation.json. The weak, stronger and AI-assisted tutorial runs recorded 20.00%, 93.33% and 93.33%, respectively.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-02) | VALID | The results were transcribed from actual console output and checked against generated reports. The member supplied and committed the local evidence. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports reporting actual execution results, including the relevant context. | Clarified the console.log location and corrected report-directory placement. |
| **AI-S3-C01-03**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Configure ignored generated files<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-03) | A .gitignore proposal checked against actual Git status. Generated/runtime files were separated from the tracked backend package lockfile.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-03) | VALID | The retained verification confirms the lockfile remained tracked and the ignore rules matched the intended repository state. [ISTQB CTFL 4.0.1, 5.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the configuration-management reference. This artifact concerns repository hygiene, not an additional mutation experiment. | Accepted as-is. |
| **AI-S3-D01-04**<br>Tool: Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-16<br>Task: Draft domain-scope questions<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-04) | A scope/handoff message based on the earlier incomplete source inspection. Some questions were redundant because the SRS already contained the relevant rules.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-04) | INCOMPLETE | The missing SRS affected the questions before testing began. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports tracing the questions back to the requirement source. The artifact is distinct from the later corrected suite. | Read the SRS after the scope response and corrected the underlying F-B01-04 notes. |
| **AI-S3-D01-03**<br>Tool: Claude and Claude Code, Claude Opus 5.5<br>Recorded date: 2026-10-22<br>Task: Correct dry-run configuration and defect selection<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-03) | A test-only configuration update, DEF-08a/08b separation and execution records. The final diagnostic dry run discovered 36 tests; the expanded Cart defect profile contained 9 expected assertion failures.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-d01-03) | VALID | Configuration and defect changes follow the recorded D01 decisions. Production server and database logic were preserved. [ISTQB CTFL 4.0.1, 5.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports versioned configurations; the execution reports identify the changed selection. | Accepted the configuration and defect split as recorded; kept the original production behavior. |
| **AI-S3-WF-02**<br>Tool: Claude and Claude Code, Claude Opus 5.5<br>Recorded date: 2026-10-22<br>Task: Extract and maintain prompt logs<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-02) | A transcript extraction script and Stop hook. Iterations addressed local /exit commands, empty sessions, resumed-session duplicates and username matching. The retained transcripts are evidence files rather than reconstructed conversations.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-wf-02) | INCOMPLETE | The record describes several revisions before the extractor matched actual transcript behavior. [ISTQB CTFL 4.0.1, 5.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports preserving versions and traceability of the evidence. Later extraction results are not substituted for the first output. | Corrected local-command filtering, empty-session overwrite, repeated prompts and username redaction; corrected the subsequent input path. |
| **AI-S3-G01-01**<br>Tool: Claude Code and Claude (claude.ai), Claude Opus 5.5<br>Recorded date: 2026-10-23<br>Task: Generate and verify EShop Cart AI assertions<br>Prompt source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-g01-01) | Five AI tests were retained. Original-code execution passed 41 tests. In the member handoff run, 5 selected mutants were Killed and the correcting transition mutant remained Survived. The later frozen rerun is kept distinct from that run.<br>Original-output source: [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-g01-01) | VALID | The recorded verdict accepts the assertions and documents implementation-derived array/error-field oracles. The six-target analysis separates business observations from unspecified payload details. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the traceability reference. | Kept assertions unchanged. Corrected the header claims about prior review and a clean session, documenting the partial-blind limitation. |

## **4\. Summary of AI Accuracy**

Aggregate the verdicts from Section 3 and complete the table below.

| Metric | Count | Percentage |
| :---- | :---- | :---- |
| **Total AI-generated artifacts audited** | 12 | 100.00% |
| **VALID (correct, accepted as-is)** | 7 | 58.33% |
| **INVALID (wrong; rejected)** | 0 | 0.00% |
| **INCOMPLETE (acceptable after edits)** | 5 | 41.67% |

## **5\. Conclusion — When should AI be used (or not)?**

Write 80–150 words describing patterns you observed. Where did AI shine? Where did AI fail? What is your recommendation for using AI in this kind of work in the future?

AI was most useful for turning a concrete task into notes, test candidates, execution instructions and compact reports. The tutorial evidence shows why an exact boundary assertion is more informative than checking only a positive result. The main weaknesses were incomplete source reading, incorrect workspace assumptions and explanations that predicted mutants the configured tool did not generate. The EShop comparison also shows why implementation-derived error payloads need to be distinguished from business requirements. I would use AI to propose and organize work, then check the specification, run the selected tests and inspect actual mutant attribution. A successful Agent run and a personal reproduction are different evidence items. Tool output should support a decision rather than replace the test oracle.


## **6\. Mandatory Disclosure (paste verbatim)**

The AI-assisted artifacts listed in Section 3 was initially generated by Claude (claude.ai): Claude Sonnet 4.6 and Claude Opus 5.5; Claude Code: Claude Opus 5.5; I reviewed and modified the SRS interpretation, workspace instructions and G01 provenance comments, added the documented free-shipping boundary checks and manual Cart observations; the manual Cart assertions identified in the comparison record was written entirely by me. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any artifact listed in the prohibited category.

## **Signature**

| Student name (printed): | LÊ TẤN HIỆP |
| :---- | :---- |
| **Student ID:** | 23120255 |
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
