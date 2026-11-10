# Final Reflection

**Evidence-based discussion draft.** Team authors need to add or confirm their own reflections and approve the final English version. The discussion below is 300 words.

The EShop case study shows how a test suite can exercise code and still miss a wrong result. The empty cart example makes the distinction concrete. Both versions return a successful response, but one returns an unexpected item. The stronger test checks the response body against the empty cart rule. The coupon example applies the same principle to stored data. A limit of one hides the change, while a limit of three and a subsequent read expose it.

The audit also shows why mutation score needs context. The historical joint baseline scored 67.56 percent, while the audited baseline scored 67.73 percent. Two results changed from runtime errors to timeouts. The definition of the score counts timeouts as detected, so the increase alone cannot establish a stronger assertion. The report keeps both runs and their conditions separate. The controls for Cart, Coupons, and Authentication provide more direct evidence because the tests pass on the original and fail at the intended checks on the target mutants.

AI assistance is best assessed at the level of an individual suggestion. A candidate can provide a useful input or observation, but its expected result still needs a basis in the specification. The two coupon variants used shared AI context, so their outcomes describe the collected tests and cannot isolate the effect of authorship. Saving the original suggestion, the reviewed changes, and the actual run results makes those limits visible.

The activity carries these checks into five cases from the checkout and order flow. Participants choose an input, explain the expected behavior, submit an assertion, and review another test. Technical controls establish that the selected cases can be detected. Participant work and feedback are needed to establish whether the instructions are clear and whether teams can complete the exercise within the scheduled time without facilitator assistance.

## Evidence

- [Seminar Report](Seminar_Report.md), Sections 6.7, 6.8 and Appendix C.
- [Source Audit](../../docs/Source_Audit.md), Joint Comparison and Assertion-Level Controls.
- [Activity Validation](../../evidence/activity/rebuild-validation-2026-11-10/README.md).
