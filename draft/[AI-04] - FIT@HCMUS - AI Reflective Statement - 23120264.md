<!-- AI-drafted update 2026-10-23 (Claude Code): E03-BASELINE entries and verdicts are proposals for member review; Date, Class/Cohort, Instructor and Signature are left for the member. -->
**Faculty of Information Technology (FIT) – Ho Chi Minh City University of Science (HCMUS)**

**CS423 / CSC13003 – Software Testing (AI-augmented · 2026\)**

**AI POLICY · TEMPLATES — 2026 v1.0**

# **Reflective AI Use Statement**

*For major Seminars. Required when submitting at AI Category 4 or 5\.*

*Adapted from Med Kharbach, PhD (2026) — AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0. This adaptation is prepared for FIT@HCMUS – CS423 / CSC13003 Software Testing course.*

## **1\. Project & Author Info**

| Field | Value |
| :---- | :---- |
| **Course:** | CS423 / CSC13003 – Software Testing |
| **Project / Capstone title:** | T10: Mutation Testing & Test Effectiveness |
| **Team members (if group):** | Lê Tấn Hiệp; Tống Dương Thái Hòa; Nguyễn Phúc Hoàng |
| **Student name:** | Nguyễn Phúc Hoàng |
| **Student ID:** | 23120264 |
| **Submission date:** |  |

## **2\. Reflection Questions**

### **1\. How did AI support your work?**

*Describe specifically where and how AI tools contributed to this project: test design, scenario brainstorming, code generation, log analysis, defect triage, documentation, presentation prep, or other tasks.*

I asked Claude Code to support research on equivalent mutants, limitations and AI approaches, then combined the related tool-study task with that work. I supplied the SUT location and requested sandbox execution and verbatim audit records. AI produced notes, examples, test/harness code and mutation analysis; a later Claude CLI request produced the age-boundary candidate. After the common baseline was frozen, I asked Claude Code to check out that commit, run the Auth mutation analysis myself and map each mutant to its route.

### **2\. What did you accept, reject, or revise from AI outputs?**

*Identify which AI suggestions you incorporated, which you discarded, and how you adapted material to fit the spec, ISTQB principles, or your own analysis.*

I selected the combined research scope and the sandbox/SUT workflow. The retained notes contain revisions to mutant accounting and the FR-02 lock rule, with Agent edits identified as such. The C03 assertion was executed against original code and the selected mutant. For the baseline run I accepted the mutant counts only after the second run and the Windows run matched them, and I did not accept the rise from 73.45% to 74.36% as evidence of better assertions. Its optional explanation about a numeric-constant mutation was not used as proof of an actual generated mutant.

### **3\. What errors, biases, or limitations did you notice in the AI outputs?**

*Concrete examples: hallucinated functions, wrong boundary, missed security case, confused metrics (e.g., p95 vs top 5%), invented citations, etc.*

The original notes omitted a lock rule already present in the SRS and undercounted a Killed-to-Timeout change. Some papers were consulted through abstracts, which limits the supported claims. An equivalent candidate requires a declared domain and a defensible argument; a survivor by itself does not prove equivalence.

### **4\. How did you verify information, sources, or claims provided by AI?**

*Describe the verification method (ran the test, checked the spec, looked up RFC, asked TA, cross-checked another tool, executed on real SUT).*

The documented verification workflow checks source references, runs Jest/Stryker, compares mutant signatures and retains command outputs. The provisional Auth run reports Killed, Timeout and RuntimeError separately. A later Windows rerun changes some error/timeout classifications without adding assertion kills, so those changes cannot be credited to stronger assertions. When I reran the frozen commit on macOS, twice, it reproduced the same 125 mutant states as that Windows run, which shows the classification change comes from the common baseline setup and not from the machine.

### **5\. What did you learn through this project that you could not have learned by simply accepting AI output?**

*Reflect on your own intellectual contribution. How did AI shape (or fail to shape) your understanding of testing? What is one principle you will keep for future work?*

The retained work supports an important distinction between a surviving mutant, an equivalent candidate and an original implementation defect. Each needs a different argument. A boundary input can refute an equivalence claim, while a corrected requirement can change the interpretation of the entire example. The test oracle, declared input domain and actual execution evidence must therefore come before a numerical score for each specific test condition. This principle connects the equivalent-mutant research with the Auth cases and explains why source reading, traceability and status-by-status comparison remain necessary even when the generated code runs successfully.

## **3\. AI Categories Used**

Mark all that applied at any stage of the project:

* \[ \] Cat. 1 – No AI  
* \[x\] Cat. 2 – AI for preparation only  
* \[x\] Cat. 3 – AI for feedback / revision  
* \[x\] Cat. 4 – AI-assisted production  
* \[x\] Cat. 5 – AI-integrated work

## **4\. Author Signature**

*By signing below, I confirm that this reflective statement is honest and accurately represents how AI was used in this project. I take full intellectual responsibility for the final submission.*

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
