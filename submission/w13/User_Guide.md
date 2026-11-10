# User Guide for Mutation Testing with StrykerJS and an AI Agent

## 1. Introduction

Run mutation testing on EShop, find a behavior your tests miss, and verify an assertion on both the original program and a specific mutant. You need basic JavaScript and a terminal. Jest runs the tests. StrykerJS changes the selected code and reports how the tests respond.

| Material | Use | Revision |
|---|---|---|
| EShop research archive, source_code.zip | Follow this guide and reproduce the audited research profiles | 1be4637 |
| EShop workshop starter | Follow the separate workshop walkthrough if your instructor provides it | 6d2e790 |
| T10 Mutation Lab | Join the in-class activity through the facilitator's link. The judge runs submissions against its own pinned pack. | Pack built from 1be4637 |

The reference audit used Windows x64, Node.js 24.16.0, npm 12.0.2 and the dependencies pinned by the archive. The API tests run without starting the frontend or a separate backend server.

## 2. Install

1. Install Git and Node.js 24. Use Node.js 24.16.0 to match the reference audit. Open a terminal in the extracted project.
2. Run the following commands. The lockfile installs Jest, StrykerJS and the Jest runner.

~~~sh
cd backend
node --version
npm --version
npm ci
npm test
~~~

The audited baseline passed 88 tests. Fix any setup or baseline failure before running mutation testing. Run the remaining commands from backend.

If you are working from a clone, use the [pinned research commit](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/tree/1be4637e20241054e23b99c8e2412fd2e7cbbc68). The archive already contains that revision.

## 3. First Test

### 3.1. Read a surviving boundary mutant

~~~sh
npm run tutorial:weak
npm run tutorial:mutate:weak
~~~

Open reports/tutorial-weak/mutation.html and select tutorial/eligibility.js. The rule says a total qualifies when it reaches the minimum. A test for 120 with a minimum of 100 passes whether the comparison uses >= or >. Use 100 with a minimum of 100 to separate the two versions. Expect true from the inclusive rule.

The audited weak profile reported 3 Killed and 2 Survived. Open the report to identify which test ran against each mutant.

### 3.2. Verify the stronger oracle

Open tutorial/strong.test.js. Compare the three input and expected-result rows: above the minimum gives true, exactly at the minimum gives true, and below the minimum gives false. Run:

~~~sh
npm run tutorial:strong
npm run tutorial:mutate:strong
~~~

The audited strong profile reported 5 Killed in the same file. Compare reports/tutorial-weak/mutation.json with reports/tutorial-strong/mutation.json by location, mutator and replacement. Check that the original passes and that the intended assertion fails on the boundary mutant.

## 4. Advanced Usage

### 4.1. Check an EShop business rule

~~~sh
npm run test:coupons
npm run mutate:coupons
~~~

Open reports/coupons/mutation.html. Find the usage-limit mutant near server.js line 474 that replaces the fallback expression with && 1. A coupon limit of 1 produces 1 on both versions. Supply 3, create the coupon, read it back, and check that the stored limit is 3. The saved value is the checkpoint. The success status alone can miss the problem.

~~~sh
npm run test:coupons:manual
npm run mutate:coupons:manual
npm run test:coupons:ai
npm run mutate:coupons:ai
~~~

Compare reports/coupons-manual/mutation.html and reports/coupons-ai/mutation.html against the baseline. The retained manual test uses a limit of 3. The AI collection checks limits including 2 and 4. This is a data-driven pattern because the same persistence rule is checked with different input and expected-value pairs. Use the same source and mutant signature throughout.

Two other audit controls check that a new cart is empty and that changing a display name leaves the account role unchanged. The [Source Audit](../../docs/Source_Audit.md#assertion-level-controls) lists the target, original outcome and failure evidence for all three.

### 4.2. Review a fresh AI suggestion

Use an existing authorized Codex or Claude Code session in a disposable copy of the archive. Open api_specification.md, backend/test/coupons.test.js and the exact mutant diff. Give the agent the business rule, the observed test gap and the relevant helper names. Ask it to propose a single test before changing files.

~~~text
Propose one Jest test for this coupon usage-limit mutant. Use the supplied API
contract and existing test helpers. Explain the distinguishing input, the saved
value we should read back, and which assertion should fail on the mutant.
Keep production code, dependencies, fixtures and mutation configuration fixed.
~~~

Review the expected value against the API contract. If you accept the candidate, add it to a disposable copy of the baseline coupon suite. Run the original tests, then rerun Stryker with the same scope and inspect the target's failure. Record the tool, model if known, prompt, raw suggestion, changes and actual outcomes. The shipped AI collection is a recorded condition. A fresh suggestion is a new condition with its own results.

### 4.3. Reproduce the joint research run

~~~sh
npm run mutate:overall
npm run mutate:overall:manual
npm run mutate:overall:ai
~~~

The audited profiles used 88, 118 and 118 tests respectively. Reports are saved under reports/overall, reports/overall-manual and reports/overall-ai. Compare the joint profiles directly. Differences in timeout classification can change scores even when the code and selected signatures match. The historical run and the audit used different conditions and are listed separately in the [Seminar Report](Seminar_Report.md).

## 5. Interpreting Results

| Status | What to inspect |
|---|---|
| Killed | Inspect the failing test and check whether the intended assertion caught the behavior. |
| Survived | Check the input, the expected result and whether the test observes the change. |
| NoCoverage | Find the path or fixture needed to reach the mutation. |
| Timeout | Record separately and inspect the execution log. |
| RuntimeError or CompileError | Diagnose the runtime or compilation problem before interpreting the result. |

~~~text
Tool mutation score = 100 * (Killed + Timeout)
                      / (Killed + Timeout + Survived + NoCoverage)
~~~

Only claim a verified assertion kill when the original passes and the target mutant fails at the intended assertion. If valid inputs appear to give identical observable behavior, document the input domain and the evidence before calling a mutant equivalent.

## 6. Troubleshooting

| Symptom | Action |
|---|---|
| Git, Node.js or npm is missing | Install the required tools, reopen the terminal and check the versions. |
| PowerShell blocks npm.ps1 | Use npm.cmd in the commands above. |
| npm ci cannot find the lockfile | Run the command from backend in the extracted research project. |
| SQLite binding fails to load | Check Node.js and npm versions, then inspect the install log for the native build. Keep the pinned lockfile. |
| Stryker stops during its initial run | Run the corresponding npm run test command and fix the original failure first. |
| Mutation counts differ | Check the revision, profile, lockfile, mutation scope and run conditions. Compare signatures before comparing counts. |
| The lab link or session stops working | Ask the facilitator for help. The lab has a separate join and recovery flow. |

## 7. Failure Modes

### 7.1. Passing tests can miss wrong data

The empty-cart mutant returns a nonempty cart with a successful status. Assert the response body against the empty-cart rule.

### 7.2. Timeouts can inflate the tool score

The tool score includes Timeout. Keep Killed and Timeout separate and read the actual failure before attributing a kill to a test.

### 7.3. An AI suggestion can repeat the existing check

A candidate that asserts success again can pass on both programs. Review its expected result against the specification and demonstrate the failure on the exact mutant.

## 8. References

- [EShop audited research source](https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/tree/1be4637e20241054e23b99c8e2412fd2e7cbbc68)
- [StrykerJS Jest runner](https://stryker-mutator.io/docs/stryker-js/jest-runner/)
- [Stryker mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)
- [Jest test.each](https://jestjs.io/docs/api#testeachtablename-fn-timeout)
- [T10 Mutation Lab](https://github.com/tkob-team/t10-mutation-lab)
