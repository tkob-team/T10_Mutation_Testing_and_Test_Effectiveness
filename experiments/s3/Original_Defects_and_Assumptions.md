# Original Defects and Assumptions

**Stage:** S3. **Baseline:** `806ba19`. **Reviewer/executor:** Codex AI Agent. Member review Pending.

## Treatment in the Experiment

Keep original production unchanged. Baseline includes only spec-derived behavior that passes original code. Run known defects separately; they must fail at assertions rather than imports, hooks or SQL setup. Do not silently change expected values to match a bug. A mutant that corrects an original bug is not automatically a test-quality gap or an equivalent mutant.

| Domain / source | Original observations | Evidence / treatment |
|---|---|---|
| Cart & Orders, DEF-01..08b | Duplicate cart lines instead of quantity update; client-trusted checkout total; cart not cleared; invalid cancellation/transition; missing admin role and order detail ownership/auth | Original Hiệp suite: 9 assertion failures, excluded from baseline. Preserve its 36 passing baseline tests and author attribution |
| Coupons, CD-01..07 | Strict minimum; wrong percent formula; accepts exact expiry; apply lacks JWT validation; body user_id bypass; ordinary user admin operations; missing/invalid create fields | Expanded suite: 22 assertion failures, including missing type/discount/minimum/limit and negative discount/limit. Baseline retains 25 tests + one explicit API flow |
| Auth & Users, DF-01..13 (parameterized) | Wrong attempt increment/lock duration; missing registration validation/hash; OTP length/expiry; profile role escalation and phone validation | Original Hoàng suite: 23 failures. Five source files imported byte-for-byte. **DF-10's 24-hour TTL is an assumption**, not a specified numeric boundary |

All 54 selected defect cases fail at assertions on the original baseline; no runtime suite failure. [JSON](runs/Thai_Hoa/D04-merge-2026-10-23-agent/d04-defects-final.json), [log](runs/Thai_Hoa/D04-merge-2026-10-23-agent/d04-defects-final.log). A failing assertion is not sufficient by itself to prove an oracle: spec provenance and assumptions remain part of review.

## Counterfactual Oracle Check

On a separate temporary copy only, correct the minimum comparator, expiry comparator and the two percent formula occurrences. Controls CD-01/02/03 change from 3 failures to 3 passes; the 26 Coupons baseline/flow tests remain passing. [Patch and logs](runs/Thai_Hoa/D04-merge-2026-10-23-agent/oracle-patch-check/metadata.json). Tracked production hash stays unchanged. This validates these three oracle examples, not every defect or a production fix.

## Unresolved / Conventional Expected Values

- Error codes are conventions where SRS omits them. Coupon rejection tests prefer 4xx plus side effects; exact message text is not promoted to a requirement.
- Auth OTP must expire, but no TTL is specified. DF-10 uses 24 hours to expose observed behavior; no claim of a contractual 24-hour expiry.
- Coupon rounding, fixed discount above total/negative-final clamping, normalization, invalid datetime policy, percent cap, duplicate status and atomic checkout/usage behavior need a specification or explicit product decision.
- The API flow calls quote, checkout and usage endpoints separately. It proves that sequence, not automatic/atomic usage recording, cart clearing or safe concurrent limits.
- Admin cancellation from shipping remains ambiguous in the handoff; no new policy is invented.

Raw source decisions and notes remain in [Hiệp log](Experiment_Log_Tan_Hiep.md), [Hoàng log](Experiment_Log_Phuc_Hoang.md), and [Coupons contract](Coupons_Test_Contract_Thai_Hoa.md).
