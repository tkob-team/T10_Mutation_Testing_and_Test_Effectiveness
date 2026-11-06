# G01-2-cc — Comparison with E01-1-cc and F01-2-cc

Sinh tự động bằng `compare_runs.py`; không sửa tay. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col trong bảng là vị trí đầu.
Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage) × 100; Covered = (Killed + Timeout) / (Killed + Timeout + Survived) × 100.

## Status Counts

| Run | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Score | Covered |
|---|---|---|---|---|---|---|---|---|---|---|
| E01-1-cc | 150 | 87 | 19 | 34 | 2 | 8 | 0 | 0 | 74.65 | 75.71 |
| F01-2-cc | 150 | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 90.91 | 92.20 |
| G01-2-cc | 150 | 97 | 23 | 21 | 2 | 7 | 0 | 0 | 83.92 | 85.11 |

Cùng tập mutant ở cả 3 run: có (150 / 150 / 150).

## E01-1-cc Survived/NoCoverage → G01-2-cc Killed

13 mutants. `killedBy` lấy từ `mutation.json` của G01-2-cc; cột F01-2-cc để đối chiếu.

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc | killedBy (G01-2-cc) |
|---|---|---|---|---|---|
| 286:7 | BooleanLiteral | `userCarts[userId]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 286:7 | ConditionalExpression | `false` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 286:7 | ConditionalExpression | `true` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 286:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 292:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 293:3 | CallExpression | `;` | Survived | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 326:56 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 346:54 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 532:56 | StringLiteral | `""` | Survived | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |

## Other Status Changes (E01-1-cc → G01-2-cc)

| Line:Col | Mutator | Replacement | E01-1-cc | G01-2-cc | F01-2-cc |
|---|---|---|---|---|---|
| 311:67 | BlockStatement | `{}` | Timeout | Killed | Killed |
| 347:5 | CallExpression | `;` | Killed | Timeout | Killed |
| 510:63 | BlockStatement | `{}` | Killed | Timeout | Killed |
| 519:22 | BlockStatement | `{}` | Killed | Timeout | Killed |
| 520:7 | CallExpression | `;` | Killed | Timeout | Killed |
| 532:11 | BooleanLiteral | `order` | RuntimeError | Timeout | Timeout |

## Killed Overlap (F01-2-cc vs G01-2-cc)

- Killed ở cả hai: 97
- Killed ở F01-2-cc nhưng không Killed ở G01-2-cc: 15
- Killed ở G01-2-cc nhưng không Killed ở F01-2-cc: 0

## Target Mutants (6)

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc | killedBy (F01-2-cc) | G01-2-cc | killedBy (G01-2-cc) |
|---|---|---|---|---|---|---|---|
| 286:7 | ConditionalExpression | `false` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Killed | AI — Cart contents (spec §4.1–4.2, FR-07) AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) | Killed | AI — 404 error bodies (spec §4.5, §4.6, §6.2, FR-10, FR-18) AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`) |
| 550:11 | ConditionalExpression | `false` | Survived | Survived | — | Survived | — |
