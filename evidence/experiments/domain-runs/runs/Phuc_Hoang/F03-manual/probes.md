# F03 probes on the 7 remaining mutants

Copy of the SUT at `806ba19` + branch `s3/F03-auth` (local scratch clone), `server.js` edited by script only in the copy; the production file in the checkout is untouched. Date 2026-10-23, macOS, Node v26.12.1, Jest 30.5.2.

| Probe | Command (in `backend/` of the copy) | Result |
|---|---|---|
| P1 Counter `+2` → `+1` and lock `180000` → `30000` (the two FR-02 values), baseline + manual | `npx jest --config jest.auth.manual.config.cjs --runInBand` | 39 passed, 0 failed. The manual assertions stay valid on a corrected implementation |
| P2 P1 plus mutant 52 (`newAttempts >= 3` → `> 3`) | same | **3 failed, 36 passed**: the existing lock tests detect it once the counter goes up by 1. On the original code the counter is always even (L48 resets to 0, L54 adds 2), so the two comparisons behave the same on every state reachable through the API |
| P3 Original code plus mutant 133 (`if (role)` → `if (false)`), baseline + manual | same | 39 passed (mutant survives) |
| P4 Original code plus mutant 133, defects suite | `npx jest --config jest.auth-defects.config.cjs --runInBand` | 22 failed, 1 passed: DF-12 (role cannot be changed, SEC-06/FR-04) **passes** on the mutant. The mutant is the spec-correct behaviour |
| P5 Original code, defects suite | same | 23 failed, 23 total (DF-12 among them) |
