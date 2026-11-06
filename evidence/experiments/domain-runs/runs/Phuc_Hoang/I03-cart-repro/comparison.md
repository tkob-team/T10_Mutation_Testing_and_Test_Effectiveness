# S3-I03 comparison of my Cart reruns

| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | Stryker score | vs Hiệp (member run) | vs Hòa (Codex rerun) |
|---|---|---|---|---|---|---|---|---|
| baseline | 82 | 25 | 34 | 2 | 7 | 107/143 = 74.83% | 150/150 matched, source same: True, state differences: 0 | 150/150 matched, source same: True, state differences: 0 |
| manual | 112 | 18 | 11 | 2 | 7 | 130/143 = 90.91% | 150/150 matched, source same: True, state differences: 0 | 150/150 matched, source same: True, state differences: 7 (Timeout→Killed: 7) |
| ai | 102 | 18 | 21 | 2 | 7 | 120/143 = 83.92% | 150/150 matched, source same: True, state differences: 0 | 150/150 matched, source same: True, state differences: 7 (Timeout→Killed: 7) |

manual: flags command vs `npm run mutate:cart-orders:manual` — state differences: 0/150

ai: flags command vs `npm run mutate:cart-orders:ai` — state differences: 0/150

### Three shared Cart mutant cases (ids from Cross_Reproduction_Notes_Thai_Hoa.md)

| id | Location | Mutator → replacement | Baseline | Manual (killedBy) | AI (killedBy) |
|---|---|---|---|---|---|
| 6 | L286:47–286:49 | ArrayDeclaration → `["Stryker was here"]` | Survived | Killed — Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user | Killed — AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty a |
| 15 | L293:3–293:36 | CallExpression → `;` | Survived | Killed — Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions | Killed — AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart r |
| 68 | L335:10–335:20 | StringLiteral → `""` | Survived | Killed — Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to ca | Survived |
