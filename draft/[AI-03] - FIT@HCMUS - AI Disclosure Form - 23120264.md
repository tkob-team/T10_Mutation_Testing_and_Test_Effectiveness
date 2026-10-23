<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
**Faculty of Information Technology (FIT) – Ho Chi Minh City University of Science (HCMUS)**

**CS423 / CSC13003 – Software Testing (AI-augmented · 2026\)**

**AI POLICY · TEMPLATES — 2026 v1.0**

# **AI Use Disclosure Form**

*Attach to assignments where AI was used in any permitted capacity.*

*Adapted from Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. This adaptation is prepared for FIT@HCMUS – CS423 / CSC15003 Software Testing course.*

## **1\. Course & Student Info**

| Field | Value |
| :---- | :---- |
| **Course:** | CS423 / CSC13003 – Software Testing |
| **Assignment ID:** | Seminar T10, Group 12 |
| **Assignment Title:** | T10: Mutation Testing & Test Effectiveness |
| **AI Use Category (1–5):** | Category 5 |
| **Date:** |  |
| **Student name:** | Nguyễn Phúc Hoàng |
| **Student ID:** | 23120264 |

## **2\. Disclosure Questions**

### **1\. AI tool(s) used:**

*List every AI tool used for this assignment (e.g., AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

I used Claude Code 2.1.292 with Claude Opus 5.5 for research, sandbox code and documentation. The successful C03 assertion request used the Claude CLI model claude-sonnet-5-5. The S3-E03 baseline run on the common commit used Claude Code with Claude Sonnet 5.5. An S3 helper-skill draft (`s3-experiment`) was also produced with Claude Code and Claude Opus 5.5; it is kept as evidence and was not used for any submitted result. Authentication probes and successful model requests are distinguished in the experiment log. [Individual AI record](../ai-audit/AI_Record_Phuc_Hoang.md).

### **2\. Stage(s) of the assignment where AI was used:**

*Tick all that apply: \[ \] brainstorming  \[ \] outlining  \[ \] drafting  \[ \] feedback  \[ \] revision  \[ \] coding  \[ \] data analysis  \[ \] visual design  \[ \] other (specify).*

S3: research, brainstorming, outlining, coding, drafting, revision and data analysis. The work covers equivalent mutants, tool limits, sandbox examples, the age-boundary AI candidate, Auth tests, a provisional Auth mutation run and the Auth mutation run on the common baseline commit. I supplied the task scope, chose to combine A03/B03 and requested source and transcript preservation.

### **3\. Main prompts or tasks given to the AI:**

*Paste the 2–3 most impactful prompts verbatim. For the full transcript, attach Appendix A (prompt\_log.md).*

Full verbatim research prompts, including the original task text: [Verbatim transcript](../ai-audit/evidence/s3/Phuc_Hoang/PH-S3-A03B03-01_Transcript.md).

Verbatim final request from Turn 1:

~~~text
Hãy đọc repo và lên plan thực hiện những công việc cần làm để hoàn thành được task này
~~~

The second prompt requests combined B03 notes, sandbox execution, use of the supplied SUT and recording both input and output. Its full original wording is retained in the linked transcript. The actual C03 assertion prompt is retained without reconstruction in [C03 verbatim prompt](../experiments/s3/runs/Phuc_Hoang/C03-claude/prompt.txt).

### **4\. Specific parts of the work AI contributed to:**

*Be specific. Example: 'AI generated TC01–TC15 in Section 3.2; I rewrote TC04 and TC11; AI did NOT contribute to Sections 1, 2, 4, or the AI Critique.'*

AI contributed the research-note draft, source register, sandbox examples/tests/harness, mutation analysis and generated tutorial assertion. The retained Auth handoff contains 26 passing baseline tests and 23 separate defect cases. Its provisional baseline is a separate dataset from the later common-baseline Agent rerun. The source record identifies my task requests and scope choices separately from Agent-produced code.

### **5\. How I reviewed, revised, or verified the AI output:**

*Describe your verification method (ran the test, checked the spec, asked the TA, looked up RFC, cross-checked with the ISTQB syllabus, etc.).*

The recorded workflow compares sources, executes Jest/Stryker, matches individual mutants and preserves raw outputs. Those checks include the correction from two to three Killed-to-Timeout transitions and the SRS FR-02 lock rule. The C03 candidate passes on original code and kills the selected age boundary mutant. The optional numeric-mutation explanation is not evidence of an actual configured Stryker mutant. The OTP 24-hour test condition is treated as an assumption. For the common-baseline run, I compared the two Stryker runs and the common-baseline Windows run mutant by mutant and checked that the production files were unchanged.

### **6\. Citation (if required by course style guide):**

*Software Testing uses the IEEE style. Example: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https\://claude.ai*

[1] Anthropic, "Claude Code," v2.1.292, Claude Opus 5.5, used 2026-10-19. [Documentation](https://code.claude.com/docs/en/overview).

[2] Anthropic, "Claude," CLI model claude-sonnet-5-5, used 2026-10-22. [Claude](https://claude.ai).

[3] Anthropic, "Claude Code," Claude Sonnet 5.5 (claude-sonnet-5-5), used 2026-10-23. [Documentation](https://code.claude.com/docs/en/overview).

## **3\. Statement of Honesty**

*By signing below, I confirm that the disclosure above is accurate and complete. I understand that undisclosed or false disclosure of AI use is treated as academic misconduct and may result in a 0 grade for the assignment and disciplinary referral.*

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
