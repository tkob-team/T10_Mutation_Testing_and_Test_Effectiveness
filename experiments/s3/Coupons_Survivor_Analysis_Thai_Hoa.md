# Coupons Survivor Analysis

**Tasks:** S3-E02/F02/G02/H02. **Baseline:** `806ba19`. **Author/executor:** OpenAI Codex AI Agent. Human review Pending.

The full domain baseline has 120 mutants: 39 Killed, 21 Timeout, 30 Survived, 25 NoCoverage, 5 RuntimeError. Stryker score is `(39+21)/(120-5) = 52.17%`; assertion kills are `39/115 = 33.91%`. Timeout is never reported as an assertion kill.

## Business-Derived Targets

| Signature (numeric ID is local to this report) | Why baseline misses it | Valid distinguishing scenario / literal oracle |
|---|---|---|
| L474 ConditionalExpression `max_uses_per_user || 1` → `true` (111) | Admin create case only uses limit 1; SQLite stores the mutant's boolean as 1, leaving that case unchanged | Create a valid fixed coupon via Admin API with limit 3. List it: persisted limit must equal 3 (FR-17). Two uses still allow quote (FR-09 C5); third use blocks it |
| L474 LogicalOperator `max_uses_per_user || 1` → `max_uses_per_user && 1` (113) | For positive input 1 both expressions produce 1; for input 3 mutant still produces 1 | Same spec-derived scenario; stored 3 and allowance boundary distinguish original from mutant |

F02 uses three assertions scenarios: persisted input, limit−1 accepted, limit rejected. Expected values are literals from FR-09/FR-17; no original error message is used as an oracle. This is **two target mutants at one location**, not three independent business bugs. The team's >=3 survivor cases must include the real Cart analysis; do not inflate this count by splitting identical causes.

## Other Survivors / Limits

- L379 `>` → `>=` (28), L382 `<` → `<=` (33): these mutants make the original behavior conform better to the SRS at minimum/expiry equality. Correct defect tests fail on original and pass on a derivative fixing those checks. Do not invent a wrong expected value to kill a correcting mutant.
- L398/L412 percent/message variants: successful percent calculation is already wrong in original; message decoration is not the financial contract. Preserve these as uncovered/gaps or contract-dependent survivors; do not weaken financial assertions or assert incidental text to manufacture kills.
- L367/L376/L383/L392 error object/string variants: the current spec does not fix those exact payloads/messages. A rejected status alone does not distinguish them. Additional API contract or product decision is needed before making exact error body content a required oracle.
- L386 `if(user_id)` → true: behavior depends on whether body identity is supplied. Body/token identity is an original security defect. Do not claim equivalent globally; limit any observational equivalence to the declared valid input subset.
- RuntimeError mutants and Timeout require original logs. NoCoverage in the broken percent/no-body path is a real limitation of the original-code-passing test set, not evidence that those paths are safe.

## Comparison Provenance

The user asked Codex to draft F02's spec-derived/manual-analysis condition for Hòa to review. Claude CLI G02 failed authentication (`Not logged in`), with the failed request retained. The user then explicitly selected Codex in the same conversation for G02. Both conditions are AI-assisted and share context; this is a descriptive comparison of additions, **not an independent human-versus-model experiment**. Human review remains Pending. Hiệp's human-authored manual suite retains its original attribution and is not relabelled as Hòa's work.
