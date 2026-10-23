**Faculty of Information Technology (FIT) – Ho Chi Minh City University of Science (HCMUS)**

**CS423 / CSC13003 – Software Testing (AI-augmented · 2026\)**

**AI POLICY · TEMPLATES — 2026 v1.0**

# **AI Audit Report — 5-section Template per Artifact**

*Mandatory appendix for every AI-assisted homework (HW\#01–HW\#06, and Seminar).*

*Adapted from Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. This adaptation is prepared for FIT@HCMUS – CS423 / CSC15003 Software Testing course.*

## **1\. Student Information**

| Field | Value |
| :---- | :---- |
| **Student name (printed):** | TỐNG DƯƠNG THÁI HÒA |
| **Student ID:** | 23120262 |
| **Class / Cohort:** |  |
| **Assignment ID (e.g., HW\#00, HW\#02):** | Seminar T10, Group 12 |
| **Assignment date:** | 2026-10-18 to 2026-10-23 (recorded work) |
| **AI tool(s) used:** | OpenAI Codex AI Agent |
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
| **TH-S3-RESEARCH-01**<br>Tool: OpenAI Codex<br>Recorded date: 2026-10-18<br>Task: Research coverage, metrics and assertions<br>Prompt source: [Request and working-artifact provenance](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01) | Working Research Notes for S3-A02/B02 consolidate official tool sources, calculations and examples. The retained document is the revised working artifact; the source record identifies the original research request.<br>Original-output source: [Request and working-artifact provenance](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01) | INCOMPLETE | The audit differentiates working notes from immutable generated output and source inspection from execution. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports traceability. The retained record does not provide an unchanged first-output snapshot for this research artifact. |  |
| **TH-S3-C02D02-01**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-22<br>Task: Prepare Coupons tests and tutorial<br>Prompt source: [Instruction and generation provenance](../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md) | The initial handoff includes 25 passing baseline tests, 16 separate original-defect assertion failures, isolated real-SQLite fixtures and a tutorial candidate that kills the selected boundary mutant. These are the initial handoff counts, not the later frozen integration counts.<br>Original-output source: [Instruction and generation provenance](../experiments/s3/runs/Thai_Hoa/C02-D02-2026-10-22-agent/AI_Provenance.md) | VALID | Execution preserves production source/database, separates baseline from defects and checks the tutorial target by actual mutant mapping. [ISTQB CTFL 4.0.1, 4.2.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) applies to the boundary scenario; the tutorial and EShop test profiles remain distinct. |  |
| **TH-S3-D04H02-01**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-23<br>Task: Integrate baseline and compare Coupons variants<br>Prompt source: [Inputs, outputs and verification](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-d04h02-01) | Frozen baseline 806ba19 has 88 passing tests and 54 separate defect cases. Coupons baseline has 39 Killed, 21 Timeout, 30 Survived, 25 NoCoverage and 5 RuntimeError. Initial manual-analysis and AI variants each add two kills; both use the same production/configuration.<br>Original-output source: [Inputs, outputs and verification](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-d04h02-01) | VALID | JSON mappings match 120 signatures. Only usage-limit mutants 111/113 become Killed in each variant. Timeout is reported separately, and the same-context Codex generation is disclosed. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) provides the traceability reference; the Stryker metric definition governs counts. | The source record explicitly identifies the Codex fallback and same-context comparison instead of claiming an independent human-versus-AI experiment. |
| **TH-S3-SUMMARY-01**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-23<br>Task: Explain Stage 3 for all members<br>Prompt source: [Retained request and revision record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-summary-01) | Stage3-Sumary.md explains baseline, tests, defects, manual/AI outcomes and remaining work by domain. The report uses existing results rather than a new experiment.<br>Original-output source: [Retained request and revision record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-summary-01) | INCOMPLETE | The first explanatory draft centered on Coupons; the requested revision separated the three members' contributions and connected each result to the appropriate source. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports understandable test-result reporting. | Requested a shared summary with a separate section for each member, and clearer explanations of the manual assertions. |
| **TH-S3-COUPONS-EXTENSION-01**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-23<br>Task: Extend manual and Agent Coupons collections<br>Prompt source: [Verbatim request and source snapshots](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md) | Four new manual groups and eight Agent groups were implemented, with the four shared groups reused. Original-code profiles pass 35 manual and 40 Agent tests; integration remains 88 pass. Each mutation profile records 41 Killed, 21 Timeout, 28 Survived, 25 NoCoverage and 5 RuntimeError.<br>Original-output source: [Verbatim request and source snapshots](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md) | VALID | The completed metadata, protected hashes and signature comparisons support the scoped result. Added test cases did not add kills beyond the initial two. [ISTQB CTFL 4.0.1, 1.4.4](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports mapping test scenarios to their basis. The larger Agent collection does not establish model superiority. | Specified four additions for the manual collection and all eight for the Agent collection; preserved the existing cases and shared-helper attribution. |
| **TH-S4-REPORT-REVISION-01**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-23<br>Task: Expand and standardize the Seminar Report<br>Prompt source: [Report revision and verification record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-report-revision-01) | The report revision adds verified baseline and variant counts, concrete survivor cases, interpretation and limitations. It simplifies the cover, retains English technical terms and replaces path inventories with text/URL appendices.<br>Original-output source: [Report revision and verification record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-report-revision-01) | INCOMPLETE | The initial scaffold required actual results and clearer presentation. The revised document recomputes metrics from retained JSON and distinguishes initial comparisons from extensions. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) is the test-report reference. This is document verification, not a new SUT run. | Requested the simpler cover, English terminology, completed factual sections and removal of appendix evidence-path inventories. |
| **TH-S4-USERGUIDE-20261023**<br>Tool: OpenAI Codex AI Agent<br>Recorded date: 2026-10-23<br>Task: Prepare the standalone User Guide<br>Prompt source: [Guide changes and validation record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-userguide-20261023) | The guide contains eight sections, concrete commands and five observed failure modes. A standalone revision embeds essential explanations and removes sibling-document dependencies. Its document checks verify anchors, script names and code-block syntax.<br>Original-output source: [Guide changes and validation record](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s4-userguide-20261023) | INCOMPLETE | The earlier draft required a single-file revision to match the requested delivery. Historical counts were checked against retained inputs; document checks do not substitute for new installation or peer execution. [ISTQB CTFL 4.0.1, 5.3.2](https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf) supports clear reporting of the validation boundary. | Requested a standalone document, embedded project-reference summaries and removal of relative-file dependencies and prohibited punctuation. |
| **Artifact \#8** |  |  |  |  |
| **Artifact \#9** |  |  |  |  |
| **Artifact \#10** |  |  |  |  |
| **Artifact \#11** |  |  |  |  |
| **Artifact \#12** |  |  |  |  |

## **4\. Summary of AI Accuracy**

Aggregate the verdicts from Section 3 and complete the table below.

| Metric | Count | Percentage |
| :---- | :---- | :---- |
| **Total AI-generated artifacts audited** | 7 | 100.00% |
| **VALID (correct, accepted as-is)** | 3 | 42.86% |
| **INVALID (wrong; rejected)** | 0 | 0.00% |
| **INCOMPLETE (acceptable after edits)** | 4 | 57.14% |

## **5\. Conclusion — When should AI be used (or not)?**

Write 80–150 words describing patterns you observed. Where did AI shine? Where did AI fail? What is your recommendation for using AI in this kind of work in the future?

AI supported research, Coupons tests, integration, result analysis and documentation. Its value was clearest when the work was tied to a frozen source revision, explicit business rules and retained execution data. Both initial Coupons variants killed the same two usage-limit mutants, while the larger extensions added tests without additional kills. This makes the actual mutant mapping more informative than test count alone. The important limits were shared generation context, existing production defects and the distinction between edited documents and immutable raw outputs. I would use AI for concrete proposals and reproducible execution, then check oracle provenance, counts and scope. I would not use these results to rank models or claim an independent human-versus-AI experiment.


## **6\. Mandatory Disclosure (paste verbatim)**

The AI-assisted artifacts listed in Section 3 was initially generated by OpenAI Codex AI Agent; I reviewed and modified the requested scope and presentation constraints for the Coupons comparisons and documents, added the requested coupon-selection, persisted-boundary and usage-isolation scenarios; the task requests and the four/eight collection-scope instructions was written entirely by me. The detailed AI Audit Report is attached as Appendix A. I confirm I did not use AI to generate any artifact listed in the prohibited category.

## **Signature**

| Student name (printed): | TỐNG DƯƠNG THÁI HÒA |
| :---- | :---- |
| **Student ID:** | 23120262 |
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
