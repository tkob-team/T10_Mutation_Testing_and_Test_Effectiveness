### S3-H01 — Comparison analysis

Dữ liệu sinh bằng `experiments/s3/runs/Tan_Hiep/H01-cc/h01_comparison.py` từ `mutation.json` và `console.log` của E01-1-cc, F01-2-cc, G01-2-cc; không chạy run mới. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col là vị trí đầu. `killedBy` là test Stryker ghi trong `mutation.json`.

**a. 6 mutant mục tiêu**

| Mutant | E01-1-cc | F01-2-cc (killedBy) | G01-2-cc (killedBy) |
|---|---|---|---|
| 286:7 ConditionalExpression → `false` | Survived | Killed (Kill Mutant 286:7 - GET /api/cart initializes empty cart array for new user (`cart-orders.manual.js`)) | Killed (AI-CO-01 new user GET /api/cart → 200 with an empty array (`cart-orders.ai.js`)) |
| 292:7 ConditionalExpression → `true` | Survived | Killed (Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`)) | Killed (AI-CO-02 add two different products → GET /api/cart returns both (`cart-orders.ai.js`)) |
| 326:47 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 326:47 - PUT /api/orders/:id/cancel returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-03 cancel a non-existent order → 404 with an error message (`cart-orders.ai.js`)) |
| 346:45 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 346:45 - GET /api/orders/:id returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-04 order detail of non-existent id → 404 with an error message (`cart-orders.ai.js`)) |
| 532:47 ObjectLiteral → `{}` | Survived | Killed (Kill Mutant 532:47 - PUT /api/admin/orders/:id/status returns error body when order not found (`cart-orders.manual.js`)) | Killed (AI-CO-05 admin changes status of a non-existent order → 404 with an error message (`cart-orders.ai.js`)) |
| 550:11 ConditionalExpression → `false` | Survived | Survived (—) | Survived (—) |

**b. 15 mutant chỉ F01-2-cc kill** (Killed ở F01-2-cc, không Killed ở G01-2-cc), nhóm theo `killedBy` của F01-2-cc

| Test đã kill (F01-2-cc) | Số mutant | Mutant (Line:Col Mutator → replacement; E01-1-cc / G01-2-cc) |
|---|---|---|
| Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled (`cart-orders.manual.js`) | 4 | 335:9 ArrayDeclaration → `[]` (Survived / Survived)<br>335:10 StringLiteral → `""` (Survived / Survived)<br>337:20 ObjectLiteral → `{}` (Survived / Survived)<br>337:31 StringLiteral → `""` (Survived / Survived) |
| Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | 3 | 510:63 BlockStatement → `{}` (Killed / Timeout)<br>519:22 BlockStatement → `{}` (Killed / Timeout)<br>520:7 CallExpression → `;` (Killed / Timeout) |
| PUT /api/admin/orders/:id/status - Verify state transition rules and status update (`cart-orders.manual.js`) | 3 | 561:9 ArrayDeclaration → `[]` (Survived / Survived)<br>563:20 ObjectLiteral → `{}` (Survived / Survived)<br>563:31 StringLiteral → `""` (Survived / Survived) |
| Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | 2 | 294:12 ObjectLiteral → `{}` (Survived / Survived)<br>294:23 StringLiteral → `""` (Survived / Survived) |
| Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-08 [normal] user reads own order history (another user also has an order) (`cart-orders.test.js`) | 1 | 315:22 BlockStatement → `{}` (Timeout / Timeout) |
| Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id (`cart-orders.test.js`) | 1 | 347:5 CallExpression → `;` (Killed / Timeout) |
| POST /api/checkout - Verify successful order creation and DB pending status (`cart-orders.manual.js`) | 1 | 306:27 StringLiteral → `""` (Survived / Survived) |

Kiểm: 8/15 mutant được kill bởi 3 test manual ngoài 6 mục tiêu (checkout DB, cancel pending, admin transition). Ngoại lệ:

| Mutant | killedBy (F01-2-cc) | E01-1-cc | G01-2-cc |
|---|---|---|---|
| 294:12 ObjectLiteral → `{}` | Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Survived | Survived |
| 294:23 StringLiteral → `""` | Kill Mutant 292:7 - POST /api/cart preserves existing cart items across multiple additions (`cart-orders.manual.js`) | Survived | Survived |
| 315:22 BlockStatement → `{}` | Checkout & order history — POST /api/checkout, GET /api/orders/my-orders (spec §4.3–4.4, FR-08, FR-11) CO-08 [normal] user reads own order history (another user also has an order) (`cart-orders.test.js`) | Timeout | Timeout |
| 347:5 CallExpression → `;` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-09 [normal] owner reads order detail by id (`cart-orders.test.js`) | Killed | Timeout |
| 510:63 BlockStatement → `{}` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |
| 519:22 BlockStatement → `{}` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |
| 520:7 CallExpression → `;` | Order detail & admin list — GET /api/orders/:id, GET /api/admin/orders (spec §4.5, §6.2, FR-18) CO-11 [normal] admin lists orders of all users (`cart-orders.test.js`) | Killed | Timeout |

**c. Metrics mỗi run**

| Run | Tests (baseline + thêm) | Stryker `Done in` | Survived | NoCoverage | Score |
|---|---|---|---|---|---|
| E01-1-cc | 36 + 0 = 36 | 26 s | 34 | 2 | 74.65% |
| F01-2-cc | 36 + 8 = 44 | 27 s | 11 | 2 | 90.91% |
| G01-2-cc | 36 + 5 = 41 | 30 s | 21 | 2 | 83.92% |

Mỗi run chạy 1 lần nên chưa đo flake rate. Tín hiệu: 4 mutant Killed ↔ Timeout giữa các run (xem Limits & Failure Modes).

**Kết luận (Tấn Hiệp viết):** Pending
