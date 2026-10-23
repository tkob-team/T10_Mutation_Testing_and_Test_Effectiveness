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
| **Student name:** | Tống Dương Thái Hòa |
| **Student ID:** | 23120262 |
| **Submission date:** |  |

## **2\. Reflection Questions**

### **1\. How did AI support your work?**

*Describe specifically where and how AI tools contributed to this project: test design, scenario brainstorming, code generation, log analysis, defect triage, documentation, presentation prep, or other tasks.*

I used Codex to support coverage/metric research, Coupons fixtures and tests, integration and mutation analysis. It also drafted the shared Stage 3 explanation, Seminar Report and User Guide. I set the quality-first direction, selected the same-context Codex fallback and defined the four-group manual and eight-group Agent extension scope.

### **2\. What did you accept, reject, or revise from AI outputs?**

*Identify which AI suggestions you incorporated, which you discarded, and how you adapted material to fit the spec, ISTQB principles, or your own analysis.*

I requested revisions that made the Stage 3 explanation cover all three members, simplified the report cover, kept English technical terms and removed appendix path inventories. I also requested a standalone User Guide. The retained initial and extended Coupons collections are both AI-assisted, with their generation context and shared helpers disclosed.

### **3\. What errors, biases, or limitations did you notice in the AI outputs?**

*Concrete examples: hallucinated functions, wrong boundary, missed security case, confused metrics (e.g., p95 vs top 5%), invented citations, etc.*

The two initial Coupons variants killed the same two usage-limit mutants. Increasing the collections to 35 and 40 tests did not add kills. Original minimum, expiry and percentage defects limit the passing test set. Shared generation context also prevents an independent human-versus-AI interpretation. These observations are retained rather than replaced by a claim of model superiority.

### **4\. How did you verify information, sources, or claims provided by AI?**

*Describe the verification method (ran the test, checked the spec, looked up RFC, asked TA, cross-checked another tool, executed on real SUT).*

The retained Agent workflow verifies expected values against the SRS/API, runs original tests and separate defect profiles, checks protected source hashes and compares mutant signatures. Report statistics are recomputed from JSON. These are Agent execution records; my documented contribution includes scope choices and requests for the revisions described above.

### **5\. What did you learn through this project that you could not have learned by simply accepting AI output?**

*Reflect on your own intellectual contribution. How did AI shape (or fail to shape) your understanding of testing? What is one principle you will keep for future work?*

The comparison supports a practical principle: define the explicitly documented business oracle and distinguishing observation before interpreting a mutant result. Persisting a limit of three exposes changes that an input of one cannot distinguish. More scenarios do not necessarily add kills, and shared context does not establish independent generation. The useful contribution is therefore the explicit connection between requirement, input, persisted state and verified outcome. Keeping the original source fixed also makes the comparison interpretable. These principles are grounded in the documented Coupons cases rather than a claim that one model or author is universally better.

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
