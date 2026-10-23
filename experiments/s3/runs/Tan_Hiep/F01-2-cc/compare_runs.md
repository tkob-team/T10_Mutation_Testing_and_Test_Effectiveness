# F01-2-cc — Comparison with E01-1-cc and F01-1

Sinh tự động bằng `compare_runs.py`; không sửa tay. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col trong bảng là vị trí đầu.
Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage) × 100; Covered = (Killed + Timeout) / (Killed + Timeout + Survived) × 100.

## Status Counts

| Run | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Score | Covered |
|---|---|---|---|---|---|---|---|---|---|---|
| E01-1-cc | 150 | 87 | 19 | 34 | 2 | 8 | 0 | 0 | 74.65 | 75.71 |
| F01-1 | 150 | 100 | 19 | 20 | 2 | 9 | 0 | 0 | 84.40 | 85.61 |
| F01-2-cc | 150 | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 90.91 | 92.20 |

Cùng tập mutant ở cả 3 run: có (150 / 150 / 150).

## E01-1-cc Survived/NoCoverage → F01-2-cc Killed

23 mutants. `killedBy` lấy từ `mutation.json` của F01-2-cc.

| Line:Col | Mutator | Replacement | E01-1-cc | killedBy (F01-2-cc) |
|---|---|---|---|---|
| 286:7 | BooleanLiteral | `userCarts[userId]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 286:7 | ConditionalExpression | `false` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 286:7 | ConditionalExpression | `true` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 286:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 292:47 | ArrayDeclaration | `["Stryker was here"]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 293:3 | CallExpression | `;` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 294:12 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 294:23 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 306:27 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp POST /api/checkout - Verify successful order creation and DB pending status (`cart-orders.manual.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 326:56 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 335:9 | ArrayDeclaration | `[]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 335:10 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 337:20 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 337:31 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 346:54 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 532:56 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 561:9 | ArrayDeclaration | `[]` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |
| 563:20 | ObjectLiteral | `{}` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |
| 563:31 | StringLiteral | `""` | Survived | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) |

## Other Status Changes (E01-1-cc → F01-2-cc)

| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc |
|---|---|---|---|---|
| 311:67 | BlockStatement | `{}` | Timeout | Killed |
| 315:22 | BlockStatement | `{}` | Timeout | Killed |
| 532:11 | BooleanLiteral | `order` | RuntimeError | Timeout |

## Selected Survivors (Experiment Log)

| Line:Col | Mutator | Replacement | E01-1-cc | F01-1 | F01-2-cc | killedBy (F01-2-cc) |
|---|---|---|---|---|---|---|
| 286:7 | ConditionalExpression | `false` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`) |
| 292:7 | ConditionalExpression | `true` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) |
| 326:47 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`) |
| 346:45 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`) |
| 532:47 | ObjectLiteral | `{}` | Survived | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`) |
| 550:11 | ConditionalExpression | `false` | Survived | Survived | Survived | — |
