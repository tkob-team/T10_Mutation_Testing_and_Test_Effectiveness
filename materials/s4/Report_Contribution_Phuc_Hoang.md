# Seminar Report Contribution

**Document Role:** Contribution cho Seminar_Report.md; leader hợp nhất sau review. Bản AI-drafted (Claude Code, Sonnet 5.5) từ Research Notes S3 và log đã chạy, chờ member review.  
**Stage:** S4  
**Member:** Nguyễn Phúc Hoàng  
**Task IDs:** S4-B03  
**Domain / Section:** Theory — Equivalent Mutants, Limits and AI Approaches (từ S3-A03/B03); case study Authentication & Users  
**Evidence Status:** Partial — số liệu domain lấy từ run S3 đã lưu (một máy, một lần chạy cho bản raw, hai lần cho các run còn lại). Số liệu AI approaches lấy từ abstract/trang paper, chưa đọc full text. Nhãn "spec / convention / equivalent candidate" là phán đoán của reviewer, chờ member xác nhận.

Write the deliverable in English. Cite sources and keep claims tied to run evidence.

## Assigned Theory Section

### Equivalent mutants

A mutant is *equivalent* when it differs from the original program in syntax but not in observable behaviour, so no test can kill it (Jia and Harman, 2011, §2.2 [P01]). "Observable" depends on scope: the valid inputs, the reachable system states and what counts as output (return value, database, time, memory). For this reason this report writes **equivalent candidate** until an argument and its scope are given.

A survivor can belong to five different kinds, and only the last is equivalent:

| Kind | Sign | Example in this study | Action |
|---|---|---|---|
| Real gap | An input exists that separates the mutant, tests do not check it | `if (role)` → `if (true)` in `PUT /api/users/me`: tests never read `role` back | Write an assertion at that point |
| NoCoverage | No test reaches the line | `role` branch of `PUT /me` | Add a test that reaches it first |
| Stubborn | Different behaviour but hard to control (clock, DB error) | `new Date() < locked_until` → `<=` | Needs a fake clock or injected failure |
| Scope-dependent candidate | Cannot be killed with states the API can create, killable if state is injected or code is fixed | `newAttempts >= 3` → `> 3` | State the scope |
| Equivalent in a stated scope | Argument shows all inputs in scope give the same output | `quantity > 0` → `>= 0` when `price` is finite (sandbox) | Record the argument |

Deciding equivalence is undecidable in general (Budd and Angluin, cited in [P01] §4), so no tool finds all of them. Studies summarised in [P01] put the share between about 10% and 40%; Offutt and Craft report about 10% on 15 programs. Stryker states that it cannot find them and counts them as Survived inside the score denominator [P05][P06], so a good test suite rarely reaches 100% unless mutants are ignored. Non-AI techniques include compiler optimisation and Trivial Compiler Equivalence (TCE, more than 7% of mutants removed as equivalent and 21% as duplicates on the studied programs [P02]), constraint solving, program slicing and impact analysis [P01]. TCE compares compiled binaries and does not apply directly to JavaScript. Jia and Harman also warn that filtering equivalents risks removing "stubborn" mutants, which behave alike [P01 §9.1]; the `<=` clock mutant above is one.

### Limits of mutation testing

| Limit | Source | What it means here |
|---|---|---|
| Cost: each mutant re-runs tests | [P01] §2.3; Google at 2 billion lines [P04] | 125 mutants for 116 lines of Auth took about 85 s with 2 workers |
| Equivalent mutant problem | [P01] §4, [P05] | Score does not reach 100% with a good suite |
| Oracle problem: who knows the right output | [P01] §2.3 | Many expected values here come from conventions, not the spec |
| Coupling-effect assumption | [P01] §2.1 | Killing simple mutants does not prove real faults are found |
| Score depends on configuration | [P06][P10] | Same code and tests gave 34.78% or 53.33% depending on the `mutate` range in a sandbox run |
| Timeout counted as detected | [P06] | 27 of 87 detected mutants in the baseline |
| Higher score is not better tests | Ignored mutants | Sandbox: 88.89% → 100% with no new assertion |
| Developer attention | [P03][P04] | Irrelevant mutants cost trust |

### AI approaches

Numbers below come from abstracts or paper pages; full texts were not read.

1. **LLMs judging equivalence.** Tian et al. (ISSTA 2024) evaluated 3,302 Java method pairs; the best approach, a fine-tuned code embedding, raised F1 by 35.69% on average over earlier techniques [P07]. Meta's ACH reports an agent with precision 0.79 and recall 0.47 for equivalence detection, rising to 0.95 and 0.96 with simple pre-processing [P08]. With precision 0.79, about one in five mutants the model calls equivalent is not, and removing them from the denominator would inflate the score. An AI verdict is therefore a candidate for a human to check.
2. **LLMs writing tests aimed at survivors.** MuTAP puts surviving mutants into the prompt and reports a mutation score of 93.57% on synthetic buggy code, but the authors say post-processing is needed [P09]. ACH generated tests for targeted mutants (9,095 mutants, 571 tests, 73% accepted by engineers) [P08]. This is the approach used in our experiment.
3. **LLMs choosing which mutants to create.** ACH uses an "issue of concern" to generate fewer, relevant mutants, in line with Google's effort to avoid low-value mutants [P04][P08].

Our use is the second approach with a verification gate: save the raw output, review each test against the spec, run it on the original code, and count a kill only when Stryker reports `Killed`.

## Domain & Experiment Method

- **Domain.** Authentication & Users: `POST /api/register`, `POST /api/login` (failed-attempt counter and lock), `POST /api/forgot-password`, `POST /api/reset-password`, `GET` and `PUT /api/users/me`, and the shared `authenticateToken` middleware. Oracle: `api_specification.md` §1–2 and README FR-02, FR-03, FR-04, SEC-06.
- **Frozen baseline.** SUT commit `806ba19ee4e09eafe9b2696ccf117a2b1ab841ef`, 26 Auth tests pass (88 in the whole backend); defect tests that fail on the original code are kept in a separate suite and are not in the baseline (see [`Baseline_Manifest.md`](../../experiments/s3/Baseline_Manifest.md)). Production files are unchanged and their SHA-256 are recorded before and after each run.
- **Stryker configuration (identical for all three runs).** StrykerJS 10.0.0, Jest 30.5.2, `mutate: ["server.js:20-135"]`, `coverageAnalysis: perTest`, `concurrency: 2`, `timeoutMS: 5000`, `timeoutFactor: 1.5`. Machine: macOS arm64, Node v26.12.1.
- **Manual process (S3-F03).** Read each Survived/NoCoverage mutant, explain why the baseline tests missed it, write an assertion whose expected value comes from the spec (or is labelled as a convention), check it passes on the original code, then run Stryker. 13 tests (AM-01…AM-13) on branch `s3/F03-auth` (`eea3ed4`).
- **AI process (S3-G03).** One `claude -p` request (Claude Code 2.1.308, model `claude-sonnet-5-5`) in an empty directory with no tools. The prompt had the source lines, spec, harness, baseline tests and the 30 mutants; it did not contain the manual tests. Raw output was stored, reviewed (accepted / edited / rejected) and run on branch `s3/G03-auth` (raw `0c57bf2`, edited `b27fce2`).
- **Comparison (S3-H03).** The three runs are compared on the same `server.js` hash and the same 125 mutants, matched by line, column, mutator and replacement ([`compare_three.py`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/compare_three.py)). Scores are never added or averaged across domains.

## Results

Raw counts per run (125 mutants each; Stryker score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage); RuntimeError excluded from the denominator):

| Run | Tests | Killed | Timeout | Survived | NoCoverage | RuntimeError | Stryker score | Assertion kill (Killed / valid) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline | 26 | 60 | 27 | 23 | 7 | 8 | 74.36% (87/117) | 51.28% |
| Manual | 39 | 83 | 27 | 4 | 3 | 8 | 94.02% (110/117) | 70.94% |
| Claude, reviewed | 37 | 74 | 27 | 13 | 3 | 8 | 86.32% (101/117) | 63.25% |
| Claude, raw (not used in comparison) | 38 | 78 | 27 | 12 | 0 | 8 | 89.74% (105/117) | 66.67% |

Evidence: [`E03-baseline`](../../experiments/s3/runs/Phuc_Hoang/E03-baseline/), [`F03-manual`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/), [`G03-ai`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/), [`comparison.md`](../../experiments/s3/runs/Phuc_Hoang/H03-comparison/comparison.md). If RuntimeError is kept in the denominator (Killed / 125) the values are 48.00%, 66.40% and 59.20%; the order does not change. Each run was repeated and gave the same state for all 125 mutants, except the raw Claude run (one run). The baseline also matched a Windows run (Node v24.16.0) with 0 differences.

**Kill mapping on the 30 baseline survivors and uncovered mutants.** Manual killed 23, Claude 14. Both killed 13; only Claude killed 1 (`<` → `<=` on the lock expiry); only manual killed 10 (the error and success body strings of five routes); neither killed 6 (`"Login successful"` → `""`, `>= 3` → `> 3`, and four mutants of the `role` branch). No mutant changed from Killed to a worse state in any run. Full list: [`kill_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/G03-ai/kill_mapping.md) and [`mutant_mapping.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/mutant_mapping.md).

**Basis of the kills (reviewer labels, pending member confirmation).** Of the 23 manual kills, 5 rest on a direct spec sentence (FR-02, FR-03, FR-04); 18 rest on conventions (an error body is a non-empty string; HTTP 500 when the database fails) because the spec does not define them. Claude's 14 kills include the same 5 spec-based kills, 8 convention kills (HTTP 500 when the database fails), and 1 interpretation (the lock ends at the exact instant), which the member relabelled as "spec silent".

## Discussion & Limits

**Killed, Timeout and errors are different things.** All 27 Timeouts are the same mutants in every run (handlers that never respond), so assertions cannot change them. They account for 23.1 percentage points of every Stryker score, and for 31.0% / 24.5% / 26.7% of the detected mutants in baseline / manual / Claude. The 8 RuntimeErrors are `StringLiteral ""` mutants in SQL strings that crash `sqlite3` 6.0.1 with SIGSEGV (reproduced outside Stryker). A reader who sees only 94.02% would miss both facts, so every table in this report gives all five states.

**Why the manual set kills more.** The 10-mutant difference is almost all convention tests: the manual author accepted "an error response has a non-empty message" as a testable convention, while Claude declined because the spec is silent. On the 5 mutants with a direct spec basis the two sets are equal. We therefore do not claim that manual testing beats the AI. We claim that, on this domain and with this prompt, the AI produced fewer but similarly spec-grounded tests, and that most of the score difference comes from how readily convention is accepted.

**Equivalent candidates (remaining survivors).** None is proven equivalent.
- `newAttempts >= 3` → `> 3`: an *equivalent candidate within the states reachable from a fresh account*, because the original code adds 2 per failed login, so the counter is always even. A probe that patched the code to follow the spec (+1, 30 s) showed that three baseline tests then kill it ([`probes.md`](../../experiments/s3/runs/Phuc_Hoang/F03-manual/probes.md)), so it is masked by a defect rather than truly equivalent.
- `"Login successful"` → `""`: observable but the spec does not mention the field (spec silent).
- `role` branch (4 mutants): the correct behaviour (never change `role`) is exactly what one mutant produces; only the defect suite touches this code.
- Lock expiry `<` → `<=`: killable if the exact-instant reading is accepted; a decision for the team, not equivalence.

**Failure modes seen.** (1) Timeout counted as detected. (2) `test.failing` in the raw Claude file inflated the score from 86.32% to 89.74%. (3) Claude's self-reported count was wrong (17 vs 18 tests with targets). (4) Two harnesses gave 73.45% and 74.36% for the same assertions because four mutants moved from RuntimeError to Timeout, so scores from different conditions must not be compared. (5) Ignore comments raised a sandbox score from 88.89% to 100% with no new test.

**Limits of this case study.** One domain, one machine for the reported runs plus one Windows baseline reproduction, one prompt and one Claude request. The person who wrote the manual tests also prompted and reviewed Claude in the same session, so the AI result is not a blind control. The 54 defect tests (23 in Auth) are outside the baseline, so the baseline does not show how many seeded defects it catches. The DF-10 test (OTP lifetime of 24 h) rests on an assumption, because the spec only says the reset code has a time limit. Mutation score measures how well tests react to small code changes; it does not prove the software is correct.

## References & Contribution

**Sources (full register with access dates in the [research notes](../../research/s3/Research_Notes_Phuc_Hoang.md)):** [P01] Jia and Harman, IEEE TSE 37(5), 2011, DOI 10.1109/TSE.2010.62. [P02] Papadakis et al., "Trivial Compiler Equivalence", ICSE 2015. [P03] Petrović and Ivanković, "State of Mutation Testing at Google", ICSE-SEIP 2018. [P04] Petrović et al., "Practical Mutation Testing at Scale", IEEE TSE 2021. [P05] Stryker, Equivalent mutants. [P06] Stryker, Mutant states and metrics. [P07] Tian et al., ISSTA 2024, arXiv 2408.01760. [P08] Foster et al., "Mutation-Guided LLM-based Test Generation at Meta", FSE 2025 Industry, arXiv 2501.12862. [P09] Dakhel et al., MuTAP, arXiv 2308.16557. [P10] StrykerJS Configuration.

**What I did (S3 inputs used here):** Theory/tool research (A03/B03), Auth tests (D03), baseline (E03), survivor analysis and manual assertions (F03), Claude run and review (G03), three-way comparison (H03), reproduction of the Cart & Orders case (I03). Experiment log: [`Experiment_Log_Phuc_Hoang.md`](../../experiments/s3/Experiment_Log_Phuc_Hoang.md).

**AI use:** Claude Code (Sonnet 5.5) drafted this contribution from the notes and logs; see `PH-S4-REPORT-B03` in [`AI_Record_Phuc_Hoang.md`](../../ai-audit/AI_Record_Phuc_Hoang.md). Member review of every number and label: Pending.

**Inputs for the leader:** the tables above are ready to paste; the Worked Example for the theory section can use the sandbox runs `A03-S1-*` (equivalent `quantity >= 0` and `items.length === 0`) and the Auth runs. Do not add or average scores across domains.
