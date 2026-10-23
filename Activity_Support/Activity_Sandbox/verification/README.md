# Verification Notes

Not_submit. Agent verification on Windows, 2026-10-23 (Asia/Saigon).

- baseline.json: 36 original Cart tests, all 8 scoped mutants Survived.
- reference-original.json and reference-mutation.json: reference answers pass original, kill all 5 target signatures with matching test names; reference-tally.json records 5/5.
- weak-original.json and weak-mutation.json: weak observations pass original but target mutants survive; weak-tally.json records 0/5.
- Blank candidate was executed and rejected by expect.hasAssertions before scoring.
- checkout-discovery.json retains an earlier broader exploration: it includes RuntimeError and Timeout; it is not the admitted activity baseline. Selection was narrowed to five reproducible survivors across the Cart/Checkout/Orders workflow.
- activity.stryker.json is the executed config; runner regenerates machine-specific root paths at run time.

No actual audience score, pilot, video, macOS run or member self-execution is inferred. Candidate files are AI-assisted teaching material.
