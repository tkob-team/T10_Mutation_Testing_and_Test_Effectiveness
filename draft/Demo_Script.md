# Demo Script

**Stage:** S4→S6. **Submission:** Screencast preparation and live EShop demonstration. **Requirements:** REQ-07–10,19,21,25.  
**Status:** Storyline drafted; commands and member operations await evidence.

## Storyline

Begin with a business expectation, show a test that misses a behavioral change, inspect the mutant, and explain a distinguishing assertion. Then show an AI Agent candidate, human review and actual verification. Keep the original/manual/AI conditions visible throughout.

## Recorded Demonstration

| Sequence | Action to show | Narration / Meaning | Evidence to insert |
|---|---|---|---|
| Setup | Open accepted environment/manifest; show installed tools and original tests | “We fix the inputs before comparing assertions.” | Verified versions, invocation and original test log |
| Basic Stryker use | Run accepted mutation command; inspect report/source change | “This mutant changes a selected business condition.” | Actual selected report/mutant |
| Manual observation | Explain oracle/input, show member-written assertion | “This observation distinguishes the changed behavior.” | Passing original test and kill mapping |
| AI Agent | Show actual prompt, candidate and edits | “A candidate becomes evidence after review and execution.” | Raw prompt/output, model identity and student edits |
| Advanced comparison | Open independent-arm results and limitations | “We interpret individual outcomes under common conditions.” | Accepted reports, equivalent candidates and limits |

Use English narration, clear terminal/IDE text and the required media format. Capture actual operations. Report-reading may use retained evidence when explicitly identified.

## Live Demonstration by Member

The live part is performed in a real terminal/IDE on EShop. Slides provide framing outside the live operations.

| Member | Domain / Segment | Terminal/IDE operation | Explanation required | Readiness |
|---|---|---|---|---|
| Tấn Hiệp | Cart & Orders | Accepted original test, selected mutant and assertion verification | Cart/order oracle, initial gap and detection | Awaiting member handoff/rehearsal |
| Thái Hòa | Coupons | Accepted boundary/discount case and independent AI verification | Business boundary, human edit and report evidence | Awaiting verified case/rehearsal |
| Phúc Hoàng | Authentication & Users | Accepted access/user case and assertion verification | Correct success/rejection, fixture validity and mutant effect | Awaiting member handoff/rehearsal |

Commands are added only from each accepted package. Each person must operate and explain their own segment; a common author or prerecorded clip does not establish personal execution.

## Segment Handoff

The departing presenter names the business outcome already established, the next domain and the input state being handed over. The next presenter confirms/reset state before running their case. Keep a reproducible reset path so earlier segments cannot determine later results accidentally.

## Backup

Keep accepted reports, original logs and recorded media accessible. If an operation cannot be performed live, explain the limitation and identify any saved evidence used. Record actual failures and recovery in [Session Notes](Seminar_Session_Notes.md), without converting backup playback into a claim of successful live execution.

## English Narration and Capture Cues

| Scene | Suggested narration | Capture cue / acceptance |
|---|---|---|
| Business expectation | “We start with the behavior specified for this case. The input and initial state determine what the response and stored data should show.” | Display the accepted case statement and fixture, not an invented run result |
| Baseline | “These are the original tests under the recorded production and configuration baseline. We first check that the original behavior passes.” | Use the actual manifest and original-test output |
| Mutant | “This change affects the selected business behavior. The report identifies it as a survivor of the baseline test set.” | Say this only when the accepted report actually shows the survivor |
| Manual | “The member chose data that exposes the change and wrote an observation for the required outcome.” | Show the actual member-authored change and explain the failed assertion |
| AI Agent | “The agent receives the same original context and mutant. We preserve its candidate, then review its assumptions and implementation.” | Show actual agent/model, prompt/output and student review; identify edits or rejection honestly |
| Verification | “We check original behavior first and then inspect the mutation result. The assertion and report explain why this change was detected.” | Match actual logs/test mapping; do not narrate a success absent from evidence |
| Limits | “This conclusion applies to the selected scope and conditions. Remaining candidates and environment differences are recorded.” | Refer to actual comparison/limits, not a model ranking |

These lines are a script to be completed with accepted case identifiers. They are not a transcript of a demonstration already performed.

## Personal Segment Checklist

Each member prepares: business oracle; source/config revision; fixtures/reset; original-test command; selected real mutant; independent manual/AI additions; exact verification command; expected observation; raw report; failure recovery and handoff state. At rehearsal the member operates these directly and explains one actual candidate review decision.

For Cart & Orders emphasize transition and persisted order state. For Coupons distinguish eligibility from calculation and state the accepted clock/units. For Authentication & Users distinguish valid access from blanket rejection and show the fixture identity. The comparison step uses the actual model identity even when the common narration says AI Agent.

## Q&A Bank

| Question | Supported answer / boundary |
|---|---|
| Why not use coverage alone? | Coverage reports exercised elements; the oracle and observation still need to distinguish the changed behavior. |
| Does a high mutation score prove correctness? | It describes detection in a selected mutant population, not all possible real defects. |
| Is every survivor a missing test? | Investigate reachability, input, observation, fixture conditions and equivalent candidates before concluding. |
| Why pass original tests first? | An original failure can invalidate the comparison and does not demonstrate detection of the mutation. |
| Why keep manual and AI independent? | Inheriting the manual solution changes the question from independent candidate generation to assisted copying. |
| Can different members use different models? | Yes under the user decision; record actual identities and conditions, and avoid uncontrolled model rankings. |
| Why separate Timeout from Killed? | Their detection mechanisms differ; retain the tool definition and explain assertion evidence. |
| Can a rejected AI candidate still be useful? | Its failure and human correction can reveal assumptions; retain the raw output and actual outcome. |
| Why not average domain scores? | Different denominators/scopes do not produce a valid common run merely through averaging percentages. |
| How do you establish equivalence? | Provide a bounded argument and seek distinguishing input; keep candidate status when evidence is incomplete. |
| Where is Record & Playback? | The user permits omission/replacement for this preparation; repeatable test execution is not relabelled a GUI recorder. |
| What if the live command fails? | Identify the failure and any saved evidence honestly, use the documented recovery, and record what was actually performed. |

## Coverage and Delivery

[Coverage Matrix](Demo_Coverage_Matrix.md) maps requirements to scenes. [Media Links](Media_Links.md) records the actual deliverable and access checks. Exact scripts/output screenshots await member evidence.
