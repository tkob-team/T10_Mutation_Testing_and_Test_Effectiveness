# EShop Coupons — Mutation Candidate Bank (source-grounded)

**Source:** [`tkob-team/eshop-sut`](https://github.com/tkob-team/eshop-sut), `main` commit `de0f48f5b40939692e7029943295d44788f617ea` (2026-10-19).
**Read files:** `backend/server.js`, `backend/database.js`, `backend/package.json`, `README.md` (FR-08/09/12/17), `api_specification.md`, `frontend-web/src/pages/Checkout.jsx`, `frontend-mobile/App.js`, `frontend-admin/src/App.jsx`.

> **Scope warning:** This file enumerates **mutation candidates / test ideas**, NOT actual Stryker mutant IDs or a claim that Stryker generated/killed them. One source expression can yield multiple mutants. Many of these are manual semantic mutants not produced by Stryker's built-in operators (especially SQL strings / stateful endpoint workflows). Mutants that do not change observable behavior under documented inputs may be equivalent or unreachable; evidence is required to classify them.

## Legend
- **B:** A useful test can generally PASS on the *original implementation* and kill an introduced mutation (assuming isolated fixtures); candidate for initial baseline.
- **S:** A test required by the stated README specification would **FAIL on the original source** or expose a known spec mismatch. Fix production behavior / agree a known-defect exclusion *before* freezing a mutation baseline. **Do not change expected results to rationalize a bug.**
- **D:** Decision required: spec is insufficient/ambiguous; do not assert an invented business rule.
- **B\*:** Needs direct DB fixture manipulation because no API sets `is_active=0`.
- **B†/S†/D†:** UI or E2E scenario; requires browser/mobile harness rather than backend unit test.

## Source reference links
- [Coupon API — server.js#L352-L493](https://github.com/tkob-team/eshop-sut/blob/de0f48f5b40939692e7029943295d44788f617ea/backend/server.js#L352-L493)
- [Checkout API — server.js#L308-L324](https://github.com/tkob-team/eshop-sut/blob/de0f48f5b40939692e7029943295d44788f617ea/backend/server.js#L308-L324)
- [Database tables and seeds — database.js](https://github.com/tkob-team/eshop-sut/blob/de0f48f5b40939692e7029943295d44788f617ea/backend/database.js)
- [FR-08/09/12/17 — README.md](https://github.com/tkob-team/eshop-sut/blob/de0f48f5b40939692e7029943295d44788f617ea/README.md)

## Known discrepancies before mutation testing
1. **Threshold:** `total_amount > coupon.min_order_amount` contradicts FR-09 (`>=`).
2. **Percent:** `Math.floor(total_amount * (1 - coupon.discount_value))` contradicts FR-09 (`total * discount_value / 100`); this appears in **two paths**.
3. **Authentication:** `POST /api/apply-coupon` is public, and `user_id` comes from body; FR-09 requires valid JWT and per-authenticated-user counting.
4. **Admin role:** coupon list/create/delete require JWT but do not check `role==='admin'`; FR-12/17 require admin.
5. **Input validation & checkout:** FR-17 requires positive values and required fields; server does not enforce them. FR-08 requires server-derived order total; server accepts client-sent total.

## Candidate bank

Each row is a distinct **hypothesis to test**. For B rows, write or verify a baseline test first. For S rows, record as failing-spec tests and isolate from baseline until requirements and source are reconciled.

### A. Lookup & input (`POST /api/apply-coupon`, server.js:363–376)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| A01 `missing-code` | `if (!code)` removed | omit `code`; require 400 + specific error | **B** |
| A02 `empty-code` | `!code` → `false` | `code:""`; require 400, no success | **B** |
| A03 `null-code` | `!code` → `false` | `code:null`; require 400 | **B** |
| A04 `unknown-code` | `if (!coupon)` → `false` | random nonexistent code; require 404 | **B** |
| A05 `inactive-code` | `is_active = 1` removed from SQL | insert coupon `is_active=0` in isolated DB, require 404 | **B*** |
| A06 `lookup-wrong-code` | SQL parameter `[code]` → unrelated value | create unique active code; require success with matching `coupon_id` | **B** |
| A07 `lookup-all-records` | `SELECT ... WHERE code = ?` → broad query | use two active codes with different discounts, assert chosen ID and amount | **B** |
| A08 `lookup-inactive-leak` | `is_active = 1` → `is_active = 0` | active should apply; inactive must reject | **B*** |
| A09 `lookup-const-active` | `= 1` → `= 0` | active fixture; require 200 | **B** |
| A10 `lookup-empty-result` | `res.status(404)` → 200 | unknown code; assert status 404 + error | **B** |
| A11 `lookup-error-payload` | `error` field deleted | unknown code; assert nonempty `error` | **B** |
| A12 `lookup-early-return` | remove `return` after not found | unknown code; response must be exactly one 404, not crash | **B** |
| A13 `lookup-case-policy` | exact code matching → forced case-insensitive | `save10` vs `SAVE10`; spec must define API normalization | **D** |
| A14 `lookup-whitespace-policy` | trim or not trim code | `" SAVE10 "` vs `SAVE10`; decide whether API normalizes | **D** |

### B. Minimum order (`server.js:379, 437–440`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| B01 `minimum-less` | `total_amount > min` → `<` | min 300000, total 300001 must succeed | **B** |
| B02 `minimum-less-equal` | `>` → `<=` | min 300000, total 300001 must succeed | **B** |
| B03 `minimum-equal` | `>` → `>=` | test at exactly 300000; spec says accept, original rejects | **S** |
| B04 `minimum-constant` | min comparison replaced with `true` | min 300000, total 299999 must fail 400 | **B** |
| B05 `minimum-false` | comparison replaced with `false` | min 300000, total 300001 must succeed | **B** |
| B06 `minimum-offset` | compare total with `min + 1` | 300001 vs threshold 300000; probe 300001 or 300002 | **B** |
| B07 `minimum-zero` | `>` comparison altered to accept zero at min 0 | total 0/min 0 needs valid-order policy; code returns 400 | **D** |
| B08 `minimum-ignore` | remove min check entirely | min 500000, total 499999 must fail | **B** |
| B09 `minimum-error-status` | below-min 400 → 200 | 499999 with BIGBUY; require 400 | **B** |
| B10 `minimum-message` | use wrong min in error text | below-min; assert communicated threshold is fixture value | **B** |
| B11 `minimum-negative-total` | accept negative if coupon min negative | negative amount should be rejected; spec currently lacks explicit validation | **D** |
| B12 `minimum-string-total` | string concatenation/SQL coercion changes threshold | test `total_amount:"600000"`; decide strict numeric policy | **D** |
| B13 `minimum-missing-total` | undefined coerced/treated as above threshold | omit total; expect explicit validation failure | **S** |
| B14 `minimum-nan-total` | `total_amount:"abc"` bypass | expect 4xx validation response, not acceptance | **S** |

### C. Expiry (`server.js:380–384`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| C01 `expiry-condition-false` | `if (expiry < now)` → false | EXPIRED fixture (2020) must return 400 | **B** |
| C02 `expiry-condition-true` | `if (expiry < now)` → true | future coupon must succeed | **B** |
| C03 `expiry-comparison-reverse` | `<` → `>` | EXPIRED reject, future accept | **B** |
| C04 `expiry-comparison-equality` | `<` → `<=` | precisely at expiry boundary needs time-frozen test; spec excludes equality | **D** |
| C05 `expiry-input` | `new Date(coupon.expired_at)` → wrong field | future vs past fixtures; assert opposite outcomes | **B** |
| C06 `expiry-no-return` | remove return on expiry failure | expired coupon must not produce success payload | **B** |
| C07 `expiry-error-status` | expired 400 → 200 | expired coupon must return 400 | **B** |
| C08 `expiry-error-message` | wrong rejection reason | expired above minimum should report expiry rather than minimum | **B** |
| C09 `expiry-invalid-date` | invalid expiry becomes `Invalid Date` and passes check | invalid expired_at must reject at admin-create or apply | **S** |
| C10 `expiry-null-date` | null expiry interpreted as 1970/invalid | define null policy; should not silently count as valid | **D** |
| C11 `expiry-timezone` | date-only midnight treated differently across timezones | freeze time and compare local/UTC policy | **D** |
| C12 `expiry-check-order` | expiry moved after usage logic | expired + exhausted coupon should have a defined priority (currently expiry first) | **D** |

### D. Percentage discount (two duplicated branches, `server.js:398–400, 422–425`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| D01 `percent-formula` | `total * (1 - value)` → `total * value / 100` | SAVE10 500000 should discount 50000, final 450000; original fails | **S** |
| D02 `percent-minus-vs-plus` | `1 - value` → `1 + value` | SAVE10 500000; expected 50000 | **S** |
| D03 `percent-discount-sign` | negate discount_amount | SAVE10 500000; assert positive discount 50000 | **S** |
| D04 `percent-arithmetic-off` | `*` → `/` | SAVE10 500000; require 50000 | **S** |
| D05 `percent-floor` | `Math.floor` removed / replaced with ceil | 10% of 101 is fractional; rounding policy must be decided | **D** |
| D06 `percent-division-100` | `/100` → `/10` after fixing source | 25% of 400000; assert 100000 | **S** |
| D07 `percent-value-zero` | 0% coupon yields 0 discount | fix formula; admin says discount_value must be positive so case should reject | **S** |
| D08 `percent-value-100` | 100% coupon yields final zero | spec allows positive; upper bound <=100 needs sign-off | **D** |
| D09 `percent-over-100` | 110% gives negative total | admin should reject or cap; confirm contract | **D** |
| D10 `percent-negative` | negative percent gives larger final | discount_value must be positive; reject at creation | **S** |
| D11 `percent-branch-swap` | `type === "percent"` → `!==` | SAVE10 + BIGBUY; distinguish both branches | **S** |
| D12 `percent-branch-false` | condition forced false | SAVE10 final must be 450000 | **S** |
| D13 `percent-branch-true` | condition forced true | BIGBUY should discount 50000, not percent | **B** |
| D14 `percent-result-field` | `discount_amount` key removed/renamed | SAVE10 and fixed; assert exact fields and numbers | **B** |
| D15 `percent-message-type` | message formats fixed instead of percent | SAVE10 response should identify percent 10% | **B** |
| D16 `percent-user-branch` | only fix one duplicated percent calculation | test with and without supplied user_id after auth design reviewed | **S** |

### E. Fixed discount & response (`server.js:401–413, 426–438`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| E01 `fixed-zero` | `discount_amount = coupon.discount_value` → 0 | BIGBUY, 600000; discount must be 50000 | **B** |
| E02 `fixed-constant` | discount_value replaced by 1 | BIGBUY, 600000; exact 50000 expected | **B** |
| E03 `fixed-percent-branch` | `else` executes percentage formula | BIGBUY; assert 50000 and 550000 | **B** |
| E04 `final-minus-to-plus` | `total - discount` → `total + discount` | BIGBUY, 600000; final 550000 | **B** |
| E05 `final-minus-to-multiply` | `-` → `*` | BIGBUY; exact final amount | **B** |
| E06 `final-minus-to-divide` | `-` → `/` | BIGBUY; exact final amount | **B** |
| E07 `final-omit-discount` | final set equal total | BIGBUY, 600000; final 550000 | **B** |
| E08 `final-use-wrong-total` | final computed from min rather than total | BIGBUY, 600000; final 550000 | **B** |
| E09 `final-id` | `coupon_id: coupon.id` → 0 or another ID | two coupons, assert response ID matches created fixture | **B** |
| E10 `final-success-boolean` | `success: true` → false | successful fixed case; assert literal true | **B** |
| E11 `final-missing-field` | remove final_amount JSON field | successful case; assert numeric final_amount | **B** |
| E12 `final-message` | message string removed | assert success message nonempty and mentions fixed reduction | **B** |
| E13 `fixed-over-total` | discount larger than total yields negative final | policy clamp to 0 / reject needs stakeholder decision | **D** |
| E14 `fixed-zero-value` | discount_value=0 accepted during create | FR-17 requires positive; expect 4xx create | **S** |
| E15 `fixed-negative-value` | negative fixed discount accepted | FR-17 requires positive; expect 4xx create | **S** |
| E16 `fixed-decimal-value` | fractional currency amount | currency precision/rounding needs decision | **D** |

### F. Usage limit & ownership (`server.js:386–395, 444–454`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| F01 `usage-check-removed` | `usage_count >= max` removed | max 1: insert usage, subsequent apply must reject 400 | **B** |
| F02 `usage-operator` | `>=` → `>` | max 1; after exactly one use, next apply must reject | **B** |
| F03 `usage-operator-reverse` | `>=` → `<` | zero uses must allow; one use must reject | **B** |
| F04 `usage-constant` | `max_uses_per_user` → 0 | new coupon max 1, zero uses must allow | **B** |
| F05 `usage-count-wrong-id` | query binds wrong coupon_id | record usage on coupon A and apply B; B must still succeed | **B** |
| F06 `usage-count-wrong-user` | query binds wrong user_id | same coupon max1, user A exhausted, user B still eligible | **B** |
| F07 `usage-check-forced-true` | force usage limit rejection | fresh user and coupon must succeed | **B** |
| F08 `usage-check-forced-false` | force usage limit acceptance | after one use must reject | **B** |
| F09 `usage-skipped-no-id` | `if (user_id)` lets missing user_id bypass limit | FR-09 requires logged-in identity; omit user_id and token must reject | **S** |
| F10 `usage-forged-user` | `user_id` trusted from JSON | authenticate user A but submit user B ID after A exhausted; must reject | **S** |
| F11 `usage-zero-id` | `if (user_id)` treats 0 as no user | JWT should supply principal; never trust 0 in body | **S** |
| F12 `usage-insert-id` | save usage with wrong coupon_id | record for A; A must be exhausted, B unaffected | **B** |
| F13 `usage-insert-user` | save usage with wrong `req.user.id` | login as A; A usage increments, B unaffected | **B** |
| F14 `usage-record-without-token` | remove authenticateToken on POST usage | request without JWT must reject 401 | **B** |
| F15 `usage-record-invalid-token` | bad token allowed | bad JWT must reject 403 | **B** |
| F16 `usage-record-no-checkout` | allow usage recording with no corresponding order | requires transactional design and rules beyond existing schema | **S** |
| F17 `usage-record-nonexistent` | record arbitrary coupon_id | usage must reference existing coupon; schema has no foreign key | **S** |
| F18 `usage-record-over-limit` | POST /coupon-usage accepted multiple times | should cap/redesign atomic consume; spec per-user limit | **S** |
| F19 `usage-duplicate-request` | double POST usage leads double counting | idempotency/checkout reconciliation requirement unresolved | **D** |
| F20 `usage-race` | two parallel apply/record requests pass simultaneously | atomic limit enforcement needed; concurrency semantics to decide | **D** |

### G. Admin list/create/delete (`server.js:356–361, 457–493`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| G01 `list-token-missing` | remove authenticateToken from GET /api/coupons | no token → 401 | **B** |
| G02 `list-token-invalid` | verification bypassed | bad token → 403 | **B** |
| G03 `list-role` | user JWT can list coupons | FR-12 admin-only; user token must reject 403 | **S** |
| G04 `list-rows` | `SELECT *` narrowed to one coupon | create 2 coupons and require both returned | **B** |
| G05 `list-response` | return `[]` unconditionally | created coupon must appear in list | **B** |
| G06 `create-token-missing` | remove auth on POST /api/admin/coupons | anonymous create must reject 401 | **B** |
| G07 `create-role` | user token creates coupons | FR-12 user must reject 403 | **S** |
| G08 `create-code` | INSERT wrong `code` | create unique code; list must preserve exact code | **B** |
| G09 `create-type` | INSERT wrong `type` | create fixed coupon; list type fixed; apply fixed formula | **B** |
| G10 `create-value` | INSERT wrong discount_value | create 27000 coupon, assert value and apply amount | **B** |
| G11 `create-min` | INSERT wrong min_order_amount | create min 400000; under threshold must reject | **B** |
| G12 `create-expiry` | INSERT wrong expired_at | create expired and future coupons; validate accordingly | **B** |
| G13 `create-max` | `max_uses_per_user || 1` replacement | create max 2; allow twice, reject third | **B** |
| G14 `create-default-max` | omit max; expects default 1 | create with missing max; after one usage reject | **B** |
| G15 `create-duplicate-code` | uniqueness constraint removed | create same code twice; second must not succeed (SQLite UNIQUE) | **B** |
| G16 `create-invalid-type` | type `arbitrary` accepted, treated fixed | FR-17 type enum; reject invalid on creation | **S** |
| G17 `create-bad-min` | negative min accepted | FR-17 min >=0; reject negative | **S** |
| G18 `create-bad-max` | max 0 or -1 accepted | FR-17 max>=1; reject | **S** |
| G19 `create-bad-expiry` | expired_at missing accepted | FR-17 required; reject on create | **S** |
| G20 `create-bad-code` | empty/null code accepted | FR-17 required; reject on create | **S** |
| G21 `create-overpercent` | discount_value >100 accepted | maximum percentage not specified; decide explicit domain policy | **D** |
| G22 `delete-token-missing` | remove auth on DELETE endpoint | anonymous delete must reject 401 | **B** |
| G23 `delete-role` | user JWT can delete coupons | FR-12 must reject 403 | **S** |
| G24 `delete-id` | DELETE binds unrelated id | create one then delete; list must not contain it | **B** |
| G25 `delete-no-op` | DELETE statement removed | delete created coupon; subsequent apply must be 404 | **B** |
| G26 `delete-wrong-target` | DELETE SQL missing WHERE | create A and B; delete A; B must remain | **B** |
| G27 `delete-missing` | delete nonexistent returns success | decide 404 vs idempotent 200; not specified | **D** |

### H. Checkout + UI / integration (`server.js:308–324`, `frontend-web/Checkout.jsx`, `frontend-mobile/App.js`)

| ID | Target behavior / likely mutant | Distinguishing test and assertion | Status |
|---|---|---|---|
| H01 `checkout-client-total` | checkout trusts total_amount from client | FR-08 backend must compute amount from cart; forge 1 VND and verify recalculation | **S** |
| H02 `checkout-coupon-link` | checkout ignores coupon_id from body | verify checkout validates and stores coupon atomically; needs data model update | **S** |
| H03 `checkout-negative` | checkout accepts negative final | create order with negative amount; should reject 4xx | **S** |
| H04 `checkout-usage-order` | separate coupon-usage request can fail after checkout | simulate usage failure; ensure transactional/compensating rule | **D** |
| H05 `checkout-apply-twice` | replay apply/checkout with same code | limit must be enforced atomically at checkout; existing code does not | **S** |
| H06 `web-editable-total` | `editableTotal` user controlled | FR-08 requires cartTotal-derived amount, cannot alter directly | **S** |
| H07 `web-reset-on-code-change` | remove setCouponResult(null) on code change | apply valid coupon A, edit code to B; discounted result must clear | **B†** |
| H08 `web-reset-on-total-change` | remove setCouponResult(null) on total change | apply A, edit total; result must clear (but input itself violates FR-08) | **B†** |
| H09 `web-uppercase` | remove `.trim().toUpperCase()` | enter lower-case code on web and assert normalized request | **B†** |
| H10 `web-checkout-uses-final` | `couponResult.final_amount` → `editableTotal` | apply coupon then checkout; order amount must reflect final | **B†** |
| H11 `mobile-uses-cart-total` | mobile apply `total_amount: cartTotal` vs checkout editableTotal | assert same amount basis and correct final price | **D†** |
| H12 `mobile-missing-token` | mobile checkout fetch omits Authorization header | logged-in mobile checkout should succeed; actual server requires JWT | **S†** |
| H13 `mobile-cart-slice` | mobile sends `cart.slice(0,-1)` if multiple items | checkout should contain all cart items; existing checkout ignores items | **S†** |
| H14 `mobile-success-before-usage` | usage failure could still trigger different UI semantics | decide acceptance/rollback and assert UX | **D†** |

## Priority for T10 S3 experiment

1. **First freeze a clean baseline** after agreeing how to handle the existing FR-09 bugs; pin SUT SHA, DB fixtures, Node/test-runner versions and test command.
2. **For a small demonstration**, use `B10` minimum-below, `C01/C02` expiry, `E01/E04` fixed math, `F01/F02` usage boundary, and `G25/G26` deletion. They provide observable outcomes without depending on the *currently broken percentage* formula.
3. Run Stryker; **collect three actual `Survived` mutants** (real report IDs/locations), not merely three ideas in this catalog.
4. Split `manual` and `Claude` tests from the **same** frozen baseline; compare killed mutant IDs, not score alone. Keep AI-generated expectations under human/spec review.
5. Preserve raw report/commands/screenshots/DB setup and distinguish actual `Killed/Survived/NoCoverage/Timeout/CompileError` from conceptual cases here.

### Harness limitation (important)

The stock `backend/server.js` calls `app.listen(3000)` on import and **does not export the Express app**. `backend/database.js` **drops/recreates all tables on import**. `backend/package.json` has **no configured test runner**. A black-box HTTP suite against a *separately running* server exercises that external process, **not automatically the source instrumented by StrykerJS**. To calculate a meaningful Stryker score, arrange for tests to import/invoke the mutated production modules in the test runner (e.g., approved minimal `app` export + separated startup + disposable DB per worker) or use a verified Stryker-supported integration. Do not report an HTTP smoke-test result as a mutation result.

### Not counted as mutants
- Already-existing bugs are **baseline defects**, not Stryker-generated mutants.
- Equivalent mutants cannot be declared from code appearance alone; prove observational equivalence under the supported domain (or label candidate).
- Numbers in this document count **test design hypotheses**, not generated mutant count or mutation score.
