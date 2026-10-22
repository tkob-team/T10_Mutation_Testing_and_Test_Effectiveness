# Kill the Mutant — Audience Worksheet

**Stage:** S5→S6. **Submission:** Activity Worksheet. **Requirements:** REQ-22–23.  
**Draft status:** Instructions and case structure prepared; actual five mutants await verified EShop evidence.

## Learning Goal

Write an assertion that checks a business expectation and distinguishes original behavior from a changed program. Explain why the data and observation reveal the mutation.

## Materials

The facilitator supplies five mutant diffs, reviewed business expectations, baseline test context and an accepted sandbox. The audience version contains hints, not the answer key. Assertions may be written in the agreed test notation or clear pseudocode and are reviewed before execution.

## Instructions

1. Read each original/mutated snippet and its specification excerpt.
2. Choose data that makes their behavior differ.
3. State the expected observation for original production code.
4. Write an assertion and explain the detection mechanism.
5. Swap with another team. Check whether the proposed test obeys the requirement and avoids fixture-dependent failures.
6. Submit the candidate. The facilitator runs accepted assertions in the prepared sandbox and records actual outcomes.
7. Explain one design choice or remaining uncertainty.

## Five Case Cards

Each accepted card must include a real report/mutant ID, source diff, business context, available fixture/input and the response/state observable. The following allocation follows the team case ownership; concrete mutants may change after evidence review.

| Case | Domain / Contributor | Required Actual Input | Audience Prompt |
|---|---|---|---|
| K1 | Cart & Orders — Tấn Hiệp | Verified survivor, oracle, baseline context | Which cart/order observation exposes this change? |
| K2 | Cart & Orders — Tấn Hiệp | A second distinct verified survivor | Which data avoids duplicating K1's reasoning? |
| K3 | Coupons — Thái Hòa | Verified expiry survivor and controlled fixture clock | How do you isolate expiry from other rejection paths? |
| K4 | Coupons — Thái Hòa | A distinct verified discount/eligibility survivor | Which computed or persisted value must be checked? |
| K5 | Authentication & Users — Phúc Hoàng | Verified survivor with valid fixtures | How do you distinguish intended denial/success from setup failure? |

These are selection slots, not generated mutant diffs or claims that these cases exist.

## Detailed Case Designs

These are AI-assisted teaching designs derived from the inspected source and API. They are not generated mutant records or member-written assertions. For each design, the contributor must supply a real surviving mutant from the accepted baseline. If the baseline already kills it or the generator does not produce it, choose another real survivor rather than labelling the design as experimental evidence.

### K1 — Delivered Order Cancellation

**Business context:** API §4.6 permits cancellation only before delivery. Use an order owned by the authenticated fixture user and already delivered.  
**Observed source candidate:** the cancellation guard rejects delivered OR canceled. A logical-connector change can alter that guard.  
**Audience input:** valid own-order identity, delivered state, cancellation request, and the exact accepted diff.  
**Question:** which response/state observation demonstrates that a delivered order cannot be canceled?  
**Hint:** check the rejection and the order after the request. A success-message presence check says little about the persisted state.  
**Evidence needed:** member-approved oracle, original pass, actual survivor ID/diff and test-to-mutant result.

### K2 — Repeated Cancellation Policy

**Business context:** an already canceled order must follow a defined transition/idempotency policy. The inspected source rejects it, but the API text does not fully define repeated-cancel semantics.  
**Proposed oracle for review:** repeated cancellation is rejected and the order remains canceled. Confirm this policy before using the case; an idempotent-success policy needs a different expected response.  
**Distinct candidate family:** a change to the canceled-status equality check can differ from K1's logical connector change. Confirm that the accepted report supplies a distinct mutant; two inputs for the same mutant do not supply two activity mutants.  
**Audience input:** own canceled order, reviewed policy statement, request, and accepted mutant.  
**Question:** how can you distinguish the policy from an incidental implementation behavior?  
**Hint:** the persisted status and allowed response both matter; do not invent a rule from a success/error code.  
**Evidence needed:** explicit policy decision, distinct real survivor and original/manual/AI verification.

### K3 — Expired Coupon

**Business context:** coupon metadata supplies expiry; an expired active coupon must not yield an accepted discount under the reviewed rule.  
**Observed source candidate:** expiry is compared with the current clock. A condition mutation can bypass or reverse rejection.  
**Audience input:** an active known coupon whose expiry is strictly before the fixed fixture clock, an eligible order amount and valid user state when required.  
**Question:** what proves rejection is caused by expiry rather than an unknown code or insufficient order amount?  
**Hint:** satisfy the other preconditions and inspect the expiry-specific outcome.  
**Evidence needed:** actual clock/fixture policy, accepted oracle and a real surviving mutation.

### K4 — Fixed Discount Final Amount

**Business context:** with a valid fixed coupon, the final amount reflects the agreed fixed reduction.  
**Illustrative fixture proposal:** amount 1000 and fixed discount 100, with all eligibility conditions satisfied; expected final amount 900 under the reviewed rule. These are design values, not measured EShop results.  
**Observed source candidate:** the final-amount subtraction can be affected by an arithmetic mutation.  
**Question:** which observation prevents a test from passing merely because both amount fields exist?  
**Hint:** check both discount and final amount, and explain their relationship.  
**Evidence needed:** approved fixture/units, exact survivor and result mapping.

### K5 — Valid Authenticated Profile

**Business context:** API §2 requires a token to retrieve the caller's personal information.  
**Observed source candidate:** the token-presence guard can be changed by an equality/condition mutation.  
**Audience input:** a valid fixture token for user U, initialized user U, and the exact selected diff.  
**Question:** what observation shows that valid authenticated access returns U rather than merely rejecting every request?  
**Hint:** include identity in the observation; avoid relying only on an error-code difference between two denied requests.  
**Evidence needed:** accepted account/token fixture and a real survivor whose behavior is distinguished.

## Case Admission

A design becomes an audience case only when its oracle is settled, the original test passes, the real baseline report marks the selected mutant survived, the reference answer detects the intended change, and fixtures/reset can be reproduced. Keep five distinct admitted mutants, identifying production revision, location, operator and replacement. Two inputs for one mutant remain one mutation. Replace unavailable designs without fabricating IDs or weakening valid baseline assertions to create survivors.

## Response Sheet

| Case | Input / Preconditions | Expected Result / Source | Candidate Assertion | Why It Distinguishes | Peer Comment |
|---|---|---|---|---|---|
| K1 | | | | | |
| K2 | | | | | |
| K3 | | | | | |
| K4 | | | | | |
| K5 | | | | | |

## Hints

Look for equality boundaries, computed totals, state transitions and authorization outcomes where the actual diff makes them relevant. Checking “a response exists” may not observe the changed value. A test must pass for the expected original behavior before it can demonstrate a useful mutant detection.

## Completion

Submit the response sheet and peer comments. The facilitator records actual verification outcomes separately. Independent pilot and final case selection must confirm the activity fits the agreed product limit.

## Reference

[T10 activity and grading notes](../docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md).
