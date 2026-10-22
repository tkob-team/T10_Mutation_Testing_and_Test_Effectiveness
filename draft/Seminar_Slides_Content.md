# Seminar Slides — Detailed Content

**Stage:** S5 preparation → S6 presentation. **Submission:** Content source for manually built Seminar_Slides.pptx. **Requirements:** REQ-03,07,20,22,25.  
**Status:** Detailed first draft; actual results, screenshots, final template and human review remain open.

**Content-review boundary:** conceptual copy/notes, visual instructions and transitions are prepared. Slide 12 remains an empirical-evidence panel; Slide 13 requires each member's actual terminal/IDE operations; Slide 14 requires admitted real cases and a peer pilot. The draft case designs are not displayed as already verified mutants.

The user builds the PPTX manually. Use the supplied template, large readable text and a bright background. The deck contains 15 slides. Speaker notes expand the material; terminal/IDE operations take place outside the slides.

## Manual Assembly

For each slide below copy the On-slide content into the chosen layout, construct the visual, place citations/links, and add the Speaker notes. Replace evidence slots only with accepted reports/screenshots. Confirm the final slide count, readability, access links and speaker transitions. Do not present pending result panels as observations.

## Slide 01 — Why test the tests?

**Objective:** Establish the practical problem.  
**Key message:** A passing test may miss a wrong result.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Mutation Testing & Test Effectiveness  
- Tests execute code; assertions observe behavior.  
- Small code changes reveal missing observations.  
- Case study: EShop backend.

### Visual

Use a simple chain: business rule → test → assertion → observable result. Avoid fabricated screenshots.

### Speaker Notes

We ask which observations make a test sensitive to a particular behavioral change. The aim is to explain evidence, not chase a percentage. Introduce the three business domains and distinguish conceptual examples from member experiments.

### Transition

What does coverage tell us about those observations?

### Sources

T10 Brief §1–2; Report Introduction

### Evidence / Completion Input

No empirical image required; presenter assignment set during rehearsal.

## Slide 02 — Coverage and assertions

**Objective:** Separate execution from the oracle.  
**Key message:** Executed code still needs the right check.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Coverage: which measured elements were exercised?  
- Oracle: what should happen?  
- Assertion: which result is checked?

### Visual

Two columns labelled execution and observation; connect them through one business rule.

### Speaker Notes

Explain that a test can visit a branch without checking the affected business value. Coverage helps locate exercised code. The expected outcome must still be justified by specification. Avoid calling coverage useless or mutation testing a proof of complete correctness.

### Transition

A small conditional change makes the distinction visible.

### Sources

T10 Brief; Report §3.2; Guide First Test

### Evidence / Completion Input

Use the illustrative boundary example on the next slide.

## Slide 03 — One mutant, one missing boundary

**Objective:** Show a concrete detection mechanism.  
**Key message:** Choose data where original and changed behavior differ.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Illustrative rule: amount >= minimum  
Mutant: amount > minimum  
At equality, expected behavior differs.  
Observe eligibility or the resulting discount.

### Visual

Display original/mutant side by side. Highlight equality on a number line without asserting an actual EShop amount.

### Speaker Notes

State that the rule is illustrative. Inputs strictly below/above may not distinguish these variants. The exact boundary can expose the change if the assertion checks eligibility or the computed value. The real EShop oracle is supplied by the reviewed case.

### Transition

We need precise terms for what the report says.

### Sources

Report §3.2; User Guide §3.4

### Evidence / Completion Input

Replace with an accepted EShop diff only after the oracle and report ID are verified.

## Slide 04 — Read outcomes before the score

**Objective:** Provide enough vocabulary for the demo.  
**Key message:** A report state needs a cause.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Killed: inspect the detecting test.  
- Survived / No coverage: inspect the gap.  
- Timeout / errors: explain separately.  
- Retain scope and tool definition.

### Visual

Use a compact outcome legend, not a chart containing invented counts.

### Speaker Notes

Explain that a failed test can reveal the intended behavioral difference, while a setup problem requires investigation. Preserve the tool's categories and metric definition. Ask which observation caused detection before attributing any score change to better assertions.

### Transition

Now locate the study in EShop.

### Sources

Official Stryker metrics; Report §3.3

### Evidence / Completion Input

Actual counts and tool version await accepted reports.

## Slide 05 — EShop business scope

**Objective:** Connect theory to actual domains.  
**Key message:** The oracle comes from the business expectation.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Cart & Orders — Tấn Hiệp  
- Coupons — Thái Hòa  
- Authentication & Users — Phúc Hoàng  
- Compare specification and implementation before freeze.

### Visual

Draw login → cart → coupon → order as the demo storyline. Annotate domain owners without implying execution is complete.

### Speaker Notes

Explain domain ownership and the common purchase story. Each member supplies tests and evidence for their domain, then operates a personal live segment. Code/spec disagreements are resolved before comparison; the implementation alone is not an oracle.

### Transition

Two complementary roles support that workflow.

### Sources

EShop API spec; CONTEXT ownership; Report §5

### Evidence / Completion Input

Actual endpoints/data selected during member intake.

## Slide 06 — StrykerJS + AI Agent

**Objective:** Explain the tool pairing flexibly.  
**Key message:** Generation and verification have different responsibilities.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

StrykerJS: mutate → run tests → report  
AI Agent: propose → human review → verify  
Record the actual tool/model for every AI run.

### Visual

Two parallel lanes meeting at verification; keep model names outside the generic role labels.

### Speaker Notes

StrykerJS executes the mutation workflow. An AI Agent proposes assertions and explanations. Each person may use their own agent/model, so the evidence records identity and conditions. A persuasive explanation cannot replace executing the candidate against original and mutated code.

### Transition

The comparison must preserve the same inputs.

### Sources

StrykerJS introduction; Report §4; current preparation decision

### Evidence / Completion Input

Agent/model labels filled from real member records.

## Slide 07 — Three independent arms

**Objective:** Make fairness visible.  
**Key message:** Compare assertions on a fixed production baseline.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Frozen production/configuration  
- Baseline tests  
- Baseline + manual assertions  
- Baseline + reviewed AI candidates  
Same selected mutants; independent additions.

### Visual

Tree from one baseline to three arms, with production/configuration in a shared box.

### Speaker Notes

Explain that the AI arm does not inherit the manual solution. Original tests must pass before mutation verification. Source/configuration changes require affected reruns. Domain percentages do not become an overall result by averaging; the combined result needs a common run.

### Transition

First examine the manual observation.

### Sources

Report §6; Baseline Manifest; Overall Comparison

### Evidence / Completion Input

Actual baseline commit/config/test sets await evidence.

## Slide 08 — Design a manual assertion

**Objective:** Teach the test reasoning.  
**Key message:** Reach the change, expose it, observe it.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

1. Read the business oracle.  
2. Select distinguishing input/state.  
3. Assert the affected response or persisted value.  
4. Verify original pass and mutant detection.

### Visual

A four-step diagram linked to the boundary example; show pseudocode only as a labelled illustration.

### Speaker Notes

The member designs and writes the manual assertion from the specification. A check of an unrelated field cannot demonstrate detection. Include persisted effects where relevant. Agent-generated candidates retain AI provenance rather than being labelled hand-written.

### Transition

Then ask an AI Agent independently.

### Sources

T10 study milestones; Report §6; Guide §3

### Evidence / Completion Input

Actual manual test ID and report mapping inserted after intake.

## Slide 09 — Review an AI candidate

**Objective:** Show the human verification step.  
**Key message:** Plausible output is a candidate.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Inputs: oracle + baseline + mutant + original tests  
Review: API names, fixtures, expected behavior  
Decision: accept / edit / reject  
Evidence: original pass + mutation result

### Visual

Use a candidate/review/diff panel. Initially label it as an evidence slot.

### Speaker Notes

Show the actual prompt and response when available, then identify the student's changes and reasoning. Explain any invented field, wrong assumption or fixture issue found in that candidate. If it was accepted unchanged, record the real verification rather than inventing an edit.

### Transition

Failures can also arise from how results are interpreted.

### Sources

Guide Advanced Usage; AI audit originals; Report §6.3

### Evidence / Completion Input

Awaiting actual prompt/output, model identity and student diff.

## Slide 10 — Failure modes

**Objective:** Prepare peers to avoid misleading conclusions.  
**Key message:** Inspect the reason, not only the green result.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Execution without the business assertion.  
- Changed scope or timeout-heavy score changes.  
- AI follows implementation instead of specification.  
- Fixture/state failure masquerades as detection.

### Visual

Three or four trigger→check pairs; distinguish risk examples from reproduced incidents.

### Speaker Notes

These are risk analyses in the draft. The completed talk identifies which incidents were actually observed and how they were verified. Tie each mitigation to an actionable check: oracle trace, manifest comparison, candidate review, or isolated original run.

### Transition

Some survivors need a different kind of explanation.

### Sources

Guide Failure Modes; Report §9

### Evidence / Completion Input

Insert real incident IDs only after evidence review.

## Slide 11 — Equivalent candidates and limits

**Objective:** Bound claims about surviving changes.  
**Key message:** A difficult survivor is not automatically equivalent.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Inspect the exact change and reachable values.  
- Seek a distinguishing input.  
- State observable effects and assumptions.  
- Keep candidate status when proof is incomplete.

### Visual

Small decision tree: differing behavior found? → test gap; no difference established? → bounded candidate argument.

### Speaker Notes

Explain why a survivor alone is inconclusive. An AI may suggest equivalence, but a human must review the assumptions. The study reports what is supported within its selected scope and avoids claiming a universal proof.

### Transition

Now examine what the actual experiments support.

### Sources

Official equivalent-mutants guidance; Report §3.4,8

### Evidence / Completion Input

Actual candidate/diff and argument await member evidence.

## Slide 12 — Verified comparison results

**Objective:** Summarize accepted empirical evidence.  
**Key message:** Connect each result to its detecting assertion.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Evidence panel pending accepted common runs:  
- Original/manual/AI outcomes for the same mutants.  
- Raw states and final common report.  
- Actual agents/models and remaining candidates.

### Visual

Prepare a table layout. Populate with accepted counts/links; no synthetic bar chart or example score in the final talk.

### Speaker Notes

This slide is gated on experiment intake and reproduction. Explain individual detections before score changes and show the limits of comparisons involving different models. If common inputs are unavailable, state that domain outcomes cannot support a combined comparison.

### Transition

The terminal demonstration will show the mechanism behind a selected finding.

### Sources

Overall Comparison; Baseline Manifest; accepted raw reports

### Evidence / Completion Input

Awaiting P11/P12 evidence and human review.

## Slide 13 — Switch to the real terminal/IDE

**Objective:** Coordinate personal live segments.  
**Key message:** Each member operates and explains their EShop case.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

Leave slides for live operations.  
Tấn Hiệp — Cart & Orders  
Thái Hòa — Coupons  
Phúc Hoàng — Authentication & Users  
Confirm reset/state at handoff.

### Visual

A handoff card; the operations themselves happen in the real terminal/IDE.

### Speaker Notes

Announce the selected business case and switch applications. Each member runs their accepted operations, explains the oracle and distinguishes the intended assertion from setup failures. If saved reports are used, identify them. A backup recording is supplementary, not personal live evidence.

### Transition

After the operations, invite peers to design their own assertions.

### Sources

Demo Script member table; Master Guide live-demo requirement

### Evidence / Completion Input

Commands and readiness require each member's actual rehearsal.

## Slide 14 — Kill the Mutant

**Objective:** Give audience a clear task.  
**Key message:** Write an observation that exposes the change.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Read one of five verified diffs and its oracle.  
- Choose input and write an assertion.  
- Swap and review the reasoning.  
- Facilitator verifies and tallies actual detections.

### Visual

Show worksheet fields and the delivery location. Keep answer key out of the audience deck.

### Speaker Notes

Explain the rubric: correct oracle, distinguishing input, affected observation and valid setup. The tally reflects actual verification. Ask peers to explain why the original passes and the mutant differs. Use the accepted activity limit without introducing a presentation schedule here.

### Transition

Close with principles peers can reuse.

### Sources

Activity Worksheet/Answer Key; T10 §7,9

### Evidence / Completion Input

Five verified cases, sandbox and independent pilot remain required.

## Slide 15 — Takeaways and questions

**Objective:** Close with reusable principles and references.  
**Key message:** A claim is only as strong as its oracle and evidence.  
**Presenter:** Assign during human rehearsal; personal live ownership remains as specified.

### On-slide Content

- Coverage and sensitivity answer different questions.  
- A useful assertion checks specified behavior.  
- AI candidates require human review and execution.  
- Preserve inputs, outcomes and limitations.  
Guide • Report • Video • Sources

### Visual

Simple takeaway list and final verified links; no dense reference screenshot.

### Speaker Notes

Invite questions about choosing input, interpreting survivors, or verifying AI output. Answer within the supported case scope. Record unclear questions for follow-up rather than inventing an explanation. Remind peers where the guide, worksheet and actual recording can be accessed.

### Transition

Collect actual feedback and record follow-up actions.

### Sources

Report/Guide; Media Links; actual final source links

### Evidence / Completion Input

Final accessible links and actual Q&A notes added after readiness review.

## Linked Sources

- [Report](Seminar_Report.md), [Guide](User_Guide.md), [Demo Script](Demo_Script.md), [Coverage Matrix](Demo_Coverage_Matrix.md).
- [Overall Comparison](Overall_Comparison.md), [Manifest](Baseline_Manifest.md), [Media Links](Media_Links.md).
- [Worksheet](Activity_Worksheet.md), [Answer Key](Activity_Answer_Key.md).
- [T10 Brief](../docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md), [Master Guide](../docs/requirements/01_Seminar_Guide.md).
- [Stryker metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) and [equivalent mutants](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/).
- Report §3.8 distinguishes [mutation-guided test generation](https://arxiv.org/abs/2506.02954) from [equivalent-mutant research](https://arxiv.org/abs/2408.01760); these directions are context, not EShop benchmark claims.
