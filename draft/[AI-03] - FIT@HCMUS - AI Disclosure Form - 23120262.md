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
| **Student name:** | Tống Dương Thái Hòa |
| **Student ID:** | 23120262 |

## **2\. Disclosure Questions**

### **1\. AI tool(s) used:**

*List every AI tool used for this assignment (e.g., AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

I used OpenAI Codex AI Agent for research, Coupons tests, integration, mutation execution, analysis and document drafting. The record identifies Codex; it does not establish an exact serving model revision. A separate Claude CLI request failed authentication and did not generate the executed Coupons candidate. [Individual AI record](../ai-audit/AI_Record_Thai_Hoa.md).

### **2\. Stage(s) of the assignment where AI was used:**

*Tick all that apply: \[ \] brainstorming  \[ \] outlining  \[ \] drafting  \[ \] feedback  \[ \] revision  \[ \] coding  \[ \] data analysis  \[ \] visual design  \[ \] other (specify).*

S3 and S4: research, outlining, drafting, feedback, revision, coding and data analysis. The documented work includes the common baseline, Coupons comparisons/extensions, the three-person Stage 3 explanation, Seminar Report and User Guide revisions. These records identify the Agent as executor of the retained test/mutation commands.

### **3\. Main prompts or tasks given to the AI:**

*Paste the 2–3 most impactful prompts verbatim. For the full transcript, attach Appendix A (prompt\_log.md).*

Verbatim research request:

~~~text
Giờ làm tasks nghiên cứu trước đi, hãy làm thật rõ ràng chi tiết nhưng dễ hiểu, explain like im 10 vậy
~~~

Verbatim generation choice:

~~~text
Dùng Codex và công bố cùng context
~~~

Verbatim Coupons extension request:

~~~text
chia ra 4 cái trên thì thêm vào phần manual của t, 8 phần dưới là phần agent đề xuất, nhớ agent gom đủ bộ luôn 4 cái trước theo yêu cầu nha.
~~~

Sources: [Research request](../ai-audit/AI_Record_Thai_Hoa.md#artifact-th-s3-research-01); [Generation provenance](../experiments/s3/runs/Thai_Hoa/D04-merge-2026-10-23-agent/G02-Codex/PROVENANCE.md); [Extension request](../experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/PROVENANCE.md).

### **4\. Specific parts of the work AI contributed to:**

*Be specific. Example: 'AI generated TC01–TC15 in Section 3.2; I rewrote TC04 and TC11; AI did NOT contribute to Sections 1, 2, 4, or the AI Critique.'*

AI contributed Coupons fixtures/tests, the frozen integration and experiment reports, initial manual-analysis and AI candidates, the extension helpers/collections, survivor analysis and documentation. I specified the four/eight extension split, same-context Codex choice, report organization and standalone-guide requirements. The manual-analysis collection is AI-assisted; it is not presented as independently human-authored.

### **5\. How I reviewed, revised, or verified the AI output:**

*Describe your verification method (ran the test, checked the spec, asked the TA, looked up RFC, cross-checked with the ISTQB syllabus, etc.).*

Verification in the retained workflow uses the SRS/API, original-code test execution, separate defect tests, source hashes, mutant signatures and raw JSON counts. Codex executed those checks. I directed revisions to scope and presentation, including the three-person summary, report cover/appendices and standalone guide. The evidence preserves 88 passing integration tests, separate defect failures and the difference between Timeout and assertion kills.

### **6\. Citation (if required by course style guide):**

*Software Testing uses the IEEE style. Example: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https\://claude.ai*

[1] OpenAI, "Codex," AI coding agent, used 2026-10-18 to 2026-10-23. [Codex](https://openai.com/codex/). Tool identity is recorded; an exact serving model revision is not asserted.

## **3\. Statement of Honesty**

*By signing below, I confirm that the disclosure above is accurate and complete. I understand that undisclosed or false disclosure of AI use is treated as academic misconduct and may result in a 0 grade for the assignment and disciplinary referral.*

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
