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
| **Student name:** | Lê Tấn Hiệp |
| **Student ID:** | 23120255 |

## **2\. Disclosure Questions**

### **1\. AI tool(s) used:**

*List every AI tool used for this assignment (e.g., AI Tool (e.g., ChatGPT, Claude, Gemini), ChatGPT, GitHub Copilot, Cursor, Gemini).*

I used Claude on claude.ai with Claude Sonnet 4.6 for the early research turns and Claude Opus 5.5 for later research and analysis. I also used Claude Code with Claude Opus 5.5 for scripted repository and test tasks. [Individual AI record](../ai-audit/AI_Record_Tan_Hiep.md).

### **2\. Stage(s) of the assignment where AI was used:**

*Tick all that apply: \[ \] brainstorming  \[ \] outlining  \[ \] drafting  \[ \] feedback  \[ \] revision  \[ \] coding  \[ \] data analysis  \[ \] visual design  \[ \] other (specify).*

S3: research, outlining, drafting, feedback, revision, coding and data analysis. Claude helped prepare tool notes, tutorial assertions, Cart test/harness work, run instructions and result interpretation. The C01 tutorial commands were personally executed; the later -cc command records identify Claude Code as executor.

### **3\. Main prompts or tasks given to the AI:**

*Paste the 2–3 most impactful prompts verbatim. For the full transcript, attach Appendix A (prompt\_log.md).*

Full verbatim prompts and outputs: [Verbatim claude.ai transcript](../ai-audit/evidence/s3/Tan_Hiep/claude-ai_2026-10-16_9ffbcb5b.md); [Verbatim Claude Code transcript](../ai-audit/evidence/s3/Tan_Hiep/claude-code_prompt_log.md).

Verbatim prompt for the workspace correction:

~~~text
Có gì đó sai sai ở đây, mình không hề sử dụng ở thư mục ngày. Mình đặt hết vào thư mục cha là: "Repo". Không biết cần thay đổi gì không
~~~

Verbatim prompt for the AI-workflow arrangement:

~~~text
hiện tại 2 skill test-design-istqb và qa-evidence-review có vẻ không liên quan nhiều về mutation testing lắm nhỉ, nên mình muốn viết thêm 1 skill để dùng cho cả claude.ai và Claude Code. Còn vì giờ sử dụng thêm Claude Code, nên sẽ viết các skills, CLAUDE.md cần thiết nhé.
---
Đúng là không coi run của Claude Code là mình tự chạy, vì sau cùng mình cũng sẽ chạy lại hết. Để còn hiểu sâu hơn và demo thuyết trình trên lớp nữa
~~~

The tutorial survivor prompt and generated assertions are preserved verbatim in [Verbatim prompt/output and audit](../ai-audit/AI_Record_Tan_Hiep.md#artifact-ai-s3-c01-01).

### **4\. Specific parts of the work AI contributed to:**

*Be specific. Example: 'AI generated TC01–TC15 in Section 3.2; I rewrote TC04 and TC11; AI did NOT contribute to Sections 1, 2, 4, or the AI Critique.'*

AI contributed the research-note drafts, tutorial Jest candidates, Cart harness/baseline/defect work, run-report instructions, Git ignore proposal and prompt-log tooling. It generated five Cart AI tests. The manual suite and the five-test AI suite are different collections; 44 versus 41 total tests is not an equal test budget. The source record lists each artifact and its changes.

### **5\. How I reviewed, revised, or verified the AI output:**

*Describe your verification method (ran the test, checked the spec, asked the TA, looked up RFC, cross-checked with the ISTQB syllabus, etc.).*

I checked the research sources, calculated tutorial expected values and ran the C01 weak/strong/AI commands on my machine. I corrected the missing SRS interpretation and workspace assumptions. Later Claude Code runs were checked through their reports and mutant attribution; they are recorded as Agent execution. G01 assertions were retained, while misleading review/clean-session comments were corrected. The final six-target interpretation separates implementation-derived oracles from SRS rules.

### **6\. Citation (if required by course style guide):**

*Software Testing uses the IEEE style. Example: Anthropic. (2026). AI Tool (e.g., ChatGPT, Claude, Gemini) \[Large language model\]. https\://claude.ai*

[1] Anthropic, "Claude," Claude Sonnet 4.6 and Claude Opus 5.5, claude.ai, used 2026-10-16 to 2026-10-23. [Claude](https://claude.ai).

[2] Anthropic, "Claude Code," Claude Opus 5.5, CLI. [Documentation](https://code.claude.com/docs/en/overview).

## **3\. Statement of Honesty**

*By signing below, I confirm that the disclosure above is accurate and complete. I understand that undisclosed or false disclosure of AI use is treated as academic misconduct and may result in a 0 grade for the assignment and disciplinary referral.*

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
