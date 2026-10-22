# cart-manual-frozen-comparison

Same source: true; same universe: true. Matched 150/150.

| Baseline ID | Location / mutator / replacement | Baseline | Variant | Killed by |
|---|---|---|---|---|
| 29 | 305 / 44 / 305 / 66 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 156 | 551 / 29 / 551 / 33 / BooleanLiteral / false | NoCoverage | NoCoverage |  |
| 3 | 286 / 7 / 286 / 25 / BooleanLiteral / userCarts[userId] | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user |
| 4 | 286 / 7 / 286 / 25 / ConditionalExpression / true | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 5 | 286 / 7 / 286 / 25 / ConditionalExpression / false | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user |
| 6 | 286 / 47 / 286 / 49 / ArrayDeclaration / ["Stryker was here"] | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user |
| 2 | 284 / 55 / 288 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 7 | 287 / 3 / 287 / 31 / CallExpression / ; | Timeout | Timeout |  |
| 11 | 292 / 7 / 292 / 25 / BooleanLiteral / userCarts[userId] | Killed | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 12 | 292 / 7 / 292 / 25 / ConditionalExpression / true | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 13 | 292 / 7 / 292 / 25 / ConditionalExpression / false | Killed | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 14 | 292 / 47 / 292 / 49 / ArrayDeclaration / ["Stryker was here"] | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 15 | 293 / 3 / 293 / 36 / CallExpression / ; | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 17 | 294 / 12 / 294 / 40 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 18 | 294 / 23 / 294 / 38 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions |
| 10 | 290 / 56 / 295 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 23 | 302 / 5 / 302 / 95 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 24 | 303 / 5 / 303 / 56 / ArrayDeclaration / [] | Killed | Killed | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled |
| 25 | 303 / 28 / 303 / 37 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 21 | 297 / 60 / 309 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 26 | 304 / 20 / 307 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 27 | 305 / 11 / 305 / 14 / ConditionalExpression / true | Timeout | Timeout |  |
| 28 | 305 / 11 / 305 / 14 / ConditionalExpression / false | Survived | Survived |  |
| 31 | 306 / 16 / 306 / 72 / ObjectLiteral / {} | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id |
| 32 | 306 / 27 / 306 / 48 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp POST /api/checkout - Verify successful order creation and DB pending status |
| 37 | 313 / 5 / 313 / 62 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 38 | 314 / 5 / 314 / 18 / ArrayDeclaration / [] | Survived | Survived |  |
| 35 | 311 / 67 / 319 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 39 | 315 / 22 / 317 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 40 | 316 / 7 / 316 / 24 / CallExpression / ; | Timeout | Timeout |  |
| 45 | 323 / 5 / 323 / 56 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 46 | 324 / 5 / 324 / 33 / ArrayDeclaration / [] | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 43 | 321 / 68 / 342 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 47 | 325 / 21 / 340 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 48 | 326 / 11 / 326 / 17 / BooleanLiteral / order | Timeout | Timeout |  |
| 49 | 326 / 11 / 326 / 17 / ConditionalExpression / true | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 51 | 326 / 47 / 326 / 75 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found |
| 52 | 326 / 56 / 326 / 73 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found |
| 53 | 329 / 11 / 329 / 70 / ConditionalExpression / true | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 54 | 329 / 11 / 329 / 70 / ConditionalExpression / false | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a delivered order (final state) → 400 |
| 55 | 329 / 11 / 329 / 70 / LogicalOperator / order.status === "delivered" && order.status === "canceled" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a delivered order (final state) → 400 |
| 56 | 329 / 11 / 329 / 39 / ConditionalExpression / false | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a delivered order (final state) → 400 |
| 57 | 329 / 11 / 329 / 39 / EqualityOperator / order.status !== "delivered" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 58 | 329 / 28 / 329 / 39 / StringLiteral / "" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a delivered order (final state) → 400 |
| 59 | 329 / 43 / 329 / 70 / ConditionalExpression / false | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a canceled order (final state) → 400 |
| 60 | 329 / 43 / 329 / 70 / EqualityOperator / order.status !== "canceled" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 61 | 329 / 60 / 329 / 70 / StringLiteral / "" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a canceled order (final state) → 400 |
| 50 | 326 / 11 / 326 / 17 / ConditionalExpression / false | Timeout | Timeout |  |
| 62 | 329 / 72 / 331 / 8 / BlockStatement / {} | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-13 [invalid] cancel a delivered order (final state) → 400 |
| 63 | 330 / 37 / 330 / 75 / ObjectLiteral / {} | Survived | Survived |  |
| 64 | 330 / 46 / 330 / 73 / StringLiteral / "" | Survived | Survived |  |
| 67 | 335 / 9 / 335 / 36 / ArrayDeclaration / [] | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled |
| 68 | 335 / 10 / 335 / 20 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled |
| 66 | 334 / 9 / 334 / 52 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 71 | 337 / 20 / 337 / 62 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled |
| 72 | 337 / 31 / 337 / 60 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled |
| 69 | 336 / 24 / 338 / 10 / BlockStatement / {} | Timeout | Timeout |  |
| 75 | 344 / 42 / 349 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 78 | 345 / 47 / 345 / 62 / ArrayDeclaration / [] | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id |
| 77 | 345 / 10 / 345 / 45 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 80 | 346 / 9 / 346 / 15 / BooleanLiteral / order | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id |
| 81 | 346 / 9 / 346 / 15 / ConditionalExpression / true | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id |
| 82 | 346 / 9 / 346 / 15 / ConditionalExpression / false | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-10 [invalid] order detail of non-existent id → 404 |
| 83 | 346 / 45 / 346 / 73 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found |
| 84 | 346 / 54 / 346 / 71 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found |
| 79 | 345 / 80 / 348 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 85 | 347 / 5 / 347 / 21 / CallExpression / ; | Timeout | Timeout |  |
| 90 | 512 / 5 / 517 / 6 / StringLiteral / `` | Survived | Survived |  |
| 91 | 518 / 5 / 518 / 7 / ArrayDeclaration / ["Stryker was here"] | Survived | Survived |  |
| 88 | 510 / 63 / 523 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 92 | 519 / 22 / 521 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 93 | 520 / 7 / 520 / 24 / CallExpression / ; | Timeout | Timeout |  |
| 98 | 529 / 5 / 529 / 45 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 96 | 525 / 74 / 568 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 99 | 530 / 5 / 530 / 20 / ArrayDeclaration / [] | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 100 | 531 / 21 / 566 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 101 | 532 / 11 / 532 / 17 / BooleanLiteral / order | Timeout | Timeout |  |
| 102 | 532 / 11 / 532 / 17 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 104 | 532 / 47 / 532 / 75 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found |
| 105 | 532 / 56 / 532 / 73 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found |
| 106 | 535 / 31 / 535 / 36 / BooleanLiteral / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 107 | 538 / 9 / 539 / 58 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 108 | 538 / 9 / 539 / 58 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 109 | 538 / 9 / 539 / 58 / LogicalOperator / currentStatus === "pending"  /  /  status === "confirmed"  /  /  status === "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 110 | 538 / 9 / 538 / 36 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] shipping → confirmed → 400 |
| 111 | 538 / 9 / 538 / 36 / EqualityOperator / currentStatus !== "pending" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 112 | 538 / 27 / 538 / 36 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 113 | 539 / 10 / 539 / 57 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 103 | 532 / 11 / 532 / 17 / ConditionalExpression / false | Timeout | Timeout |  |
| 114 | 539 / 10 / 539 / 57 / LogicalOperator / status === "confirmed" && status === "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 116 | 539 / 10 / 539 / 32 / EqualityOperator / status !== "confirmed" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 115 | 539 / 10 / 539 / 32 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 117 | 539 / 21 / 539 / 32 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 118 | 539 / 36 / 539 / 57 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → canceled → 200 |
| 119 | 539 / 36 / 539 / 57 / EqualityOperator / status !== "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → canceled → 200 |
| 120 | 539 / 47 / 539 / 57 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → canceled → 200 |
| 121 | 541 / 29 / 541 / 33 / BooleanLiteral / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 122 | 543 / 9 / 544 / 57 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 123 | 543 / 9 / 544 / 57 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 125 | 543 / 9 / 543 / 38 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 124 | 543 / 9 / 544 / 57 / LogicalOperator / currentStatus === "confirmed"  /  /  status === "shipping"  /  /  status === "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 126 | 543 / 9 / 543 / 38 / EqualityOperator / currentStatus !== "confirmed" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 127 | 543 / 27 / 543 / 38 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 128 | 544 / 10 / 544 / 56 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] confirmed → delivered → 400 |
| 129 | 544 / 10 / 544 / 56 / LogicalOperator / status === "shipping" && status === "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 130 | 544 / 10 / 544 / 31 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 131 | 544 / 10 / 544 / 31 / EqualityOperator / status !== "shipping" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 133 | 544 / 35 / 544 / 56 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → canceled → 200 |
| 132 | 544 / 21 / 544 / 31 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 134 | 544 / 35 / 544 / 56 / EqualityOperator / status !== "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → canceled → 200 |
| 135 | 544 / 46 / 544 / 56 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → canceled → 200 |
| 136 | 546 / 29 / 546 / 33 / BooleanLiteral / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] confirmed → shipping → 200 |
| 137 | 547 / 11 / 547 / 65 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 138 | 547 / 11 / 547 / 65 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 139 | 547 / 11 / 547 / 65 / LogicalOperator / currentStatus === "shipping"  /  /  status === "delivered" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → delivered → 400 |
| 140 | 547 / 11 / 547 / 39 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → delivered → 400 |
| 141 | 547 / 11 / 547 / 39 / EqualityOperator / currentStatus !== "shipping" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 142 | 547 / 29 / 547 / 39 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 143 | 547 / 43 / 547 / 65 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] shipping → pending → 400 |
| 144 | 547 / 43 / 547 / 65 / EqualityOperator / status !== "delivered" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 145 | 547 / 54 / 547 / 65 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 146 | 548 / 29 / 548 / 33 / BooleanLiteral / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] shipping → delivered → 200 |
| 147 | 550 / 11 / 550 / 65 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 148 | 550 / 11 / 550 / 65 / ConditionalExpression / false | Survived | Survived |  |
| 149 | 550 / 11 / 550 / 65 / LogicalOperator / currentStatus === "canceled"  /  /  status === "delivered" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → delivered → 400 |
| 150 | 550 / 11 / 550 / 39 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → delivered → 400 |
| 151 | 550 / 11 / 550 / 39 / EqualityOperator / currentStatus !== "canceled" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → delivered → 400 |
| 152 | 550 / 29 / 550 / 39 / StringLiteral / "" | Survived | Survived |  |
| 153 | 550 / 43 / 550 / 65 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] canceled → pending → 400 |
| 154 | 550 / 43 / 550 / 65 / EqualityOperator / status !== "delivered" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] canceled → pending → 400 |
| 155 | 550 / 54 / 550 / 65 / StringLiteral / "" | Survived | Survived |  |
| 157 | 553 / 11 / 553 / 29 / BooleanLiteral / isValidTransition | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 158 | 553 / 11 / 553 / 29 / ConditionalExpression / true | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
| 159 | 553 / 11 / 553 / 29 / ConditionalExpression / false | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 160 | 553 / 31 / 557 / 8 / BlockStatement / {} | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-18 [invalid] pending → shipping → 400 |
| 161 | 554 / 37 / 556 / 10 / ObjectLiteral / {} | Survived | Survived |  |
| 162 | 555 / 18 / 555 / 79 / StringLiteral / `` | Survived | Survived |  |
| 165 | 561 / 9 / 561 / 32 / ArrayDeclaration / [] | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update |
| 164 | 560 / 9 / 560 / 52 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 168 | 563 / 20 / 563 / 55 / ObjectLiteral / {} | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update |
| 169 | 563 / 31 / 563 / 53 / StringLiteral / "" | Survived | Killed | Cart & Orders Manual Tests - Tấn Hiệp PUT /api/admin/orders/:id/status - Verify state transition rules and status update |
| 1 | 284 / 9 / 284 / 20 / StringLiteral / "" | Killed | Killed | Cart — GET/POST /api/cart (spec §4.1–4.2, FR-07) CO-01 [invalid] get cart without token → 401 |
| 9 | 290 / 10 / 290 / 21 / StringLiteral / "" | Killed | Killed | Cart — GET/POST /api/cart (spec §4.1–4.2, FR-07) CO-03 [normal] add one item, then read the cart |
| 20 | 297 / 10 / 297 / 25 / StringLiteral / "" | Killed | Killed | Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-06 [invalid] checkout without token → 401 |
| 166 | 562 / 24 / 564 / 10 / BlockStatement / {} | Timeout | Timeout |  |
| 34 | 311 / 9 / 311 / 32 / StringLiteral / "" | Killed | Killed | Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-08 [normal] user reads own order history (another user also has an order) |
| 42 | 321 / 9 / 321 / 33 / StringLiteral / "" | Killed | Killed | User cancels order — PUT /api/orders/:id/cancel (spec §4.6, FR-10, FR-20) CO-12 [normal] cancel a pending order → 200 |
| 74 | 344 / 9 / 344 / 26 / StringLiteral / "" | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id |
| 87 | 510 / 9 / 510 / 28 / StringLiteral / "" | Killed | Killed | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users |
| 95 | 525 / 9 / 525 / 39 / StringLiteral / "" | Killed | Killed | Admin order status — PUT /api/admin/orders/:id/status (spec §6.2, FR-10, FR-18) CO-17 [normal] pending → confirmed → 200 |
