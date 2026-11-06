# coupons-f02-comparison

Same source: true; same universe: true. Matched 120/120.

| Baseline ID | Location / mutator / replacement | Baseline | Variant | Killed by |
|---|---|---|---|---|
| 56 | 398 / 46 / 402 / 16 / BlockStatement / {} | NoCoverage | NoCoverage |  |
| 57 | 400 / 19 / 400 / 61 / ArithmeticOperator / total_amount / (1 - coupon.discount_value) | NoCoverage | NoCoverage |  |
| 58 | 400 / 35 / 400 / 60 / ArithmeticOperator / 1 + coupon.discount_value | NoCoverage | NoCoverage |  |
| 68 | 412 / 106 / 412 / 109 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 70 | 416 / 16 / 433 / 10 / BlockStatement / {} | NoCoverage | NoCoverage |  |
| 71 | 418 / 15 / 418 / 40 / ConditionalExpression / true | NoCoverage | NoCoverage |  |
| 72 | 418 / 15 / 418 / 40 / ConditionalExpression / false | NoCoverage | NoCoverage |  |
| 73 | 418 / 15 / 418 / 40 / EqualityOperator / coupon.type !== "percent" | NoCoverage | NoCoverage |  |
| 74 | 418 / 31 / 418 / 40 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 75 | 418 / 42 / 422 / 12 / BlockStatement / {} | NoCoverage | NoCoverage |  |
| 76 | 420 / 15 / 420 / 57 / ArithmeticOperator / total_amount / (1 - coupon.discount_value) | NoCoverage | NoCoverage |  |
| 77 | 420 / 31 / 420 / 56 / ArithmeticOperator / 1 + coupon.discount_value | NoCoverage | NoCoverage |  |
| 78 | 422 / 18 / 424 / 12 / BlockStatement / {} | NoCoverage | NoCoverage |  |
| 79 | 425 / 32 / 425 / 62 / ArithmeticOperator / total_amount + discount_amount | NoCoverage | NoCoverage |  |
| 80 | 426 / 27 / 432 / 12 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 81 | 427 / 22 / 427 / 26 / BooleanLiteral / false | NoCoverage | NoCoverage |  |
| 82 | 431 / 22 / 431 / 155 / StringLiteral / `` | NoCoverage | NoCoverage |  |
| 83 | 431 / 50 / 431 / 75 / ConditionalExpression / true | NoCoverage | NoCoverage |  |
| 84 | 431 / 50 / 431 / 75 / ConditionalExpression / false | NoCoverage | NoCoverage |  |
| 85 | 431 / 50 / 431 / 75 / EqualityOperator / coupon.type !== "percent" | NoCoverage | NoCoverage |  |
| 86 | 431 / 66 / 431 / 75 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 87 | 431 / 102 / 431 / 105 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 88 | 431 / 149 / 431 / 153 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 101 | 450 / 44 / 450 / 66 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 130 | 485 / 42 / 485 / 64 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 4 | 357 / 10 / 357 / 33 / StringLiteral / "" | Killed | Killed | CP-13 admin lists the current fixture; reset removed original coupons |
| 5 | 357 / 35 / 357 / 37 / ArrayDeclaration / ["Stryker was here"] | Killed | Killed | CP-13 admin lists the current fixture; reset removed original coupons |
| 2 | 356 / 58 / 360 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 6 | 357 / 54 / 359 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 7 | 358 / 5 / 358 / 20 / CallExpression / ; | Timeout | Timeout |  |
| 11 | 366 / 7 / 366 / 12 / BooleanLiteral / code | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 10 | 363 / 45 / 441 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 12 | 366 / 7 / 366 / 12 / ConditionalExpression / true | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 14 | 367 / 33 / 367 / 71 / ObjectLiteral / {} | Survived | Survived |  |
| 13 | 366 / 7 / 366 / 12 / ConditionalExpression / false | Killed | Killed | CP-03 missing/empty code is refused: undefined |
| 15 | 367 / 42 / 367 / 69 / StringLiteral / "" | Survived | Survived |  |
| 18 | 371 / 5 / 371 / 11 / ArrayDeclaration / [] | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 17 | 370 / 5 / 370 / 61 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 19 | 372 / 22 / 439 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 20 | 373 / 11 / 373 / 18 / BooleanLiteral / coupon | Timeout | Timeout |  |
| 21 | 373 / 11 / 373 / 18 / ConditionalExpression / true | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 22 | 373 / 11 / 373 / 18 / ConditionalExpression / false | Timeout | Timeout |  |
| 23 | 373 / 20 / 377 / 8 / BlockStatement / {} | Timeout | Timeout |  |
| 24 | 376 / 17 / 376 / 78 / ObjectLiteral / {} | Survived | Survived |  |
| 26 | 379 / 11 / 379 / 49 / ConditionalExpression / true | Killed | Killed | CP-02 one currency unit below minimum is refused (FR-09 C3) |
| 25 | 376 / 26 / 376 / 76 / StringLiteral / "" | Survived | Survived |  |
| 27 | 379 / 11 / 379 / 49 / ConditionalExpression / false | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 28 | 379 / 11 / 379 / 49 / EqualityOperator / total_amount >= coupon.min_order_amount | Survived | Survived |  |
| 29 | 379 / 11 / 379 / 49 / EqualityOperator / total_amount <= coupon.min_order_amount | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 31 | 382 / 13 / 382 / 25 / ConditionalExpression / true | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 32 | 382 / 13 / 382 / 25 / ConditionalExpression / false | Killed | Killed | CP-06 one millisecond after expiry is refused (FR-09 C2) |
| 33 | 382 / 13 / 382 / 25 / EqualityOperator / expiry <= now | Survived | Survived |  |
| 34 | 382 / 13 / 382 / 25 / EqualityOperator / expiry >= now | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 35 | 382 / 27 / 384 / 10 / BlockStatement / {} | Killed | Killed | CP-06 one millisecond after expiry is refused (FR-09 C2) |
| 30 | 379 / 51 / 434 / 8 / BlockStatement / {} | Timeout | Timeout |  |
| 36 | 383 / 39 / 383 / 74 / ObjectLiteral / {} | Survived | Survived |  |
| 37 | 383 / 48 / 383 / 72 / StringLiteral / "" | Survived | Survived |  |
| 38 | 386 / 13 / 386 / 20 / ConditionalExpression / true | Survived | Survived |  |
| 39 | 386 / 13 / 386 / 20 / ConditionalExpression / false | Killed | Killed | CP-08 usage 2 meets/exceeds limit 2 (FR-09 C5) |
| 42 | 388 / 13 / 388 / 99 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 43 | 389 / 13 / 389 / 33 / ArrayDeclaration / [] | Killed | Killed | CP-08 usage 2 meets/exceeds limit 2 (FR-09 C5) |
| 40 | 386 / 22 / 416 / 10 / BlockStatement / {} | Timeout | Timeout |  |
| 45 | 391 / 19 / 391 / 65 / ConditionalExpression / true | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 46 | 391 / 19 / 391 / 65 / ConditionalExpression / false | Killed | Killed | CP-08 usage 2 meets/exceeds limit 2 (FR-09 C5) |
| 47 | 391 / 19 / 391 / 65 / EqualityOperator / result.usage_count > coupon.max_uses_per_user | Killed | Killed | CP-08 usage 2 meets/exceeds limit 2 (FR-09 C5) |
| 48 | 391 / 19 / 391 / 65 / EqualityOperator / result.usage_count < coupon.max_uses_per_user | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 49 | 391 / 67 / 395 / 16 / BlockStatement / {} | Killed | Killed | CP-08 usage 2 meets/exceeds limit 2 (FR-09 C5) |
| 44 | 390 / 30 / 414 / 14 / BlockStatement / {} | Timeout | Timeout |  |
| 50 | 392 / 45 / 394 / 18 / ObjectLiteral / {} | Survived | Survived |  |
| 51 | 393 / 26 / 393 / 99 / StringLiteral / `` | Survived | Survived |  |
| 52 | 398 / 19 / 398 / 44 / ConditionalExpression / true | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 53 | 398 / 19 / 398 / 44 / ConditionalExpression / false | Survived | Survived |  |
| 54 | 398 / 19 / 398 / 44 / EqualityOperator / coupon.type !== "percent" | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 55 | 398 / 35 / 398 / 44 / StringLiteral / "" | Survived | Survived |  |
| 59 | 402 / 22 / 404 / 16 / BlockStatement / {} | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 60 | 406 / 36 / 406 / 66 / ArithmeticOperator / total_amount + discount_amount | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 61 | 407 / 31 / 413 / 16 / ObjectLiteral / {} | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 62 | 408 / 26 / 408 / 30 / BooleanLiteral / false | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 63 | 412 / 26 / 412 / 159 / StringLiteral / `` | Survived | Survived |  |
| 65 | 412 / 54 / 412 / 79 / ConditionalExpression / false | Survived | Survived |  |
| 64 | 412 / 54 / 412 / 79 / ConditionalExpression / true | Survived | Survived |  |
| 66 | 412 / 54 / 412 / 79 / EqualityOperator / coupon.type !== "percent" | Survived | Survived |  |
| 67 | 412 / 70 / 412 / 79 / StringLiteral / "" | Survived | Survived |  |
| 69 | 412 / 153 / 412 / 157 / StringLiteral / "" | Survived | Survived |  |
| 90 | 435 / 37 / 437 / 10 / ObjectLiteral / {} | Killed | Killed | CP-02 one currency unit below minimum is refused (FR-09 C3) |
| 91 | 436 / 18 / 436 / 118 / StringLiteral / `` | Survived | Survived |  |
| 89 | 434 / 14 / 438 / 8 / BlockStatement / {} | Timeout | Timeout |  |
| 94 | 444 / 64 / 454 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 96 | 447 / 5 / 447 / 66 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 97 | 448 / 5 / 448 / 29 / ArrayDeclaration / [] | Killed | Killed | CP-11 quoting repeatedly does not consume allowance; recording usage does |
| 98 | 449 / 20 / 452 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 99 | 450 / 11 / 450 / 14 / ConditionalExpression / true | Timeout | Timeout |  |
| 100 | 450 / 11 / 450 / 14 / ConditionalExpression / false | Survived | Survived |  |
| 104 | 451 / 27 / 451 / 43 / StringLiteral / "" | Survived | Survived |  |
| 103 | 451 / 16 / 451 / 45 / ObjectLiteral / {} | Survived | Survived |  |
| 109 | 467 / 5 / 467 / 130 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 110 | 468 / 5 / 475 / 6 / ArrayDeclaration / [] | Killed | Killed | CP-15 admin creates minimum=0 and max_uses=1; resulting coupon is usable |
| 111 | 474 / 7 / 474 / 29 / ConditionalExpression / true | Survived | Killed | MF-01 Admin input limit 3 is persisted as 3 (FR-17; mutants 111/113) |
| 112 | 474 / 7 / 474 / 29 / ConditionalExpression / false | Killed | Killed | CP-15 admin creates minimum=0 and max_uses=1; resulting coupon is usable |
| 113 | 474 / 7 / 474 / 29 / LogicalOperator / max_uses_per_user && 1 | Survived | Killed | MF-01 Admin input limit 3 is persisted as 3 (FR-17; mutants 111/113) |
| 107 | 457 / 65 / 481 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 114 | 476 / 20 / 479 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 116 | 477 / 11 / 477 / 14 / ConditionalExpression / false | Killed | Killed | CP-18 duplicate code cannot create a second coupon (FR-17) |
| 117 | 477 / 44 / 477 / 66 / ObjectLiteral / {} | Survived | Survived |  |
| 119 | 478 / 16 / 478 / 62 / ObjectLiteral / {} | Killed | Killed | CP-15 admin creates minimum=0 and max_uses=1; resulting coupon is usable |
| 120 | 478 / 27 / 478 / 43 / StringLiteral / "" | Survived | Survived |  |
| 115 | 477 / 11 / 477 / 14 / ConditionalExpression / true | Timeout | Timeout |  |
| 125 | 484 / 10 / 484 / 44 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 126 | 484 / 46 / 484 / 61 / ArrayDeclaration / [] | Killed | Killed | CP-16 admin deletes only the addressed coupon (FR-17) |
| 123 | 483 / 71 / 488 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 127 | 484 / 78 / 487 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 129 | 485 / 9 / 485 / 12 / ConditionalExpression / false | Survived | Survived |  |
| 132 | 486 / 14 / 486 / 43 / ObjectLiteral / {} | Survived | Survived |  |
| 133 | 486 / 25 / 486 / 41 / StringLiteral / "" | Survived | Survived |  |
| 1 | 356 / 9 / 356 / 23 / StringLiteral / "" | Killed | Killed | CP-13 admin lists the current fixture; reset removed original coupons |
| 128 | 485 / 9 / 485 / 12 / ConditionalExpression / true | Timeout | Timeout |  |
| 9 | 363 / 10 / 363 / 29 / StringLiteral / "" | Killed | Killed | CP-01 fixed coupon: total 500001 gives final 450001 (FR-09) |
| 93 | 444 / 10 / 444 / 29 / StringLiteral / "" | Killed | Killed | CP-11 quoting repeatedly does not consume allowance; recording usage does |
| 106 | 457 / 10 / 457 / 30 / StringLiteral / "" | Killed | Killed | CP-15 admin creates minimum=0 and max_uses=1; resulting coupon is usable |
| 122 | 483 / 12 / 483 / 36 / StringLiteral / "" | Killed | Killed | CP-16 admin deletes only the addressed coupon (FR-17) |
