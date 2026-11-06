# S3 member runs — Cart & Orders mutant comparison

Sinh bằng `S3-member-compare/member_compare.py` từ `mutation.json`; không chạy run mới. Khóa mutant: vị trí đầu–cuối + mutatorName + replacement (như H01). Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage).

## Counts

| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Total | Score |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| E01-1 (Tấn Hiệp) | 82 | 25 | 34 | 2 | 7 | 0 | 0 | 150 | 74.83% |
| E01-1-cc | 87 | 19 | 34 | 2 | 8 | 0 | 0 | 150 | 74.65% |
| Hòa frozen-cart-orders-baseline | 82 | 25 | 34 | 2 | 7 | 0 | 0 | 150 | 74.83% |
| F01-2 (Tấn Hiệp) | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 150 | 90.91% |
| F01-2-cc | 112 | 18 | 11 | 2 | 7 | 0 | 0 | 150 | 90.91% |
| Hòa cart-reproduced-manual | 105 | 25 | 11 | 2 | 7 | 0 | 0 | 150 | 90.91% |
| G01-2 (Tấn Hiệp) | 102 | 18 | 21 | 2 | 7 | 0 | 0 | 150 | 83.92% |
| G01-2-cc | 97 | 23 | 21 | 2 | 7 | 0 | 0 | 150 | 83.92% |
| Hòa cart-reproduced-ai | 95 | 25 | 21 | 2 | 7 | 0 | 0 | 150 | 83.92% |

## Per-mutant

### E01-1 vs E01-1-cc

- Mutant: 150 vs 150; chung 150; chỉ ở E01-1: 0; chỉ ở E01-1-cc: 0.
- Survived tuyệt đối: E01-1 34, E01-1-cc 34; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 6 — liên quan Survived: 0; Killed↔Timeout: 5; khác: 1.

Killed↔Timeout:

| Mutant | E01-1-cc | E01-1 |
|---|---|---|
| 316:7–316:24 CallExpression `;` | Killed | Timeout |
| 347:5–347:21 CallExpression `;` | Killed | Timeout |
| 510:63–523:2 BlockStatement `{}` | Killed | Timeout |
| 519:22–521:6 BlockStatement `{}` | Killed | Timeout |
| 520:7–520:24 CallExpression `;` | Killed | Timeout |

Chuyển đổi khác:

| Mutant | E01-1-cc | E01-1 |
|---|---|---|
| 532:11–532:17 BooleanLiteral `order` | RuntimeError | Timeout |

### E01-1 vs Hòa frozen-cart-orders-baseline

- Mutant: 150 vs 150; chung 150; chỉ ở E01-1: 0; chỉ ở Hòa frozen-cart-orders-baseline: 0.
- Survived tuyệt đối: E01-1 34, Hòa frozen-cart-orders-baseline 34; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 — liên quan Survived: 0; Killed↔Timeout: 0; khác: 0.

### F01-2 vs F01-2-cc

- Mutant: 150 vs 150; chung 150; chỉ ở F01-2: 0; chỉ ở F01-2-cc: 0.
- Survived tuyệt đối: F01-2 11, F01-2-cc 11; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 — liên quan Survived: 0; Killed↔Timeout: 0; khác: 0.

### F01-2 vs Hòa cart-reproduced-manual

- Mutant: 150 vs 150; chung 150; chỉ ở F01-2: 0; chỉ ở Hòa cart-reproduced-manual: 0.
- Survived tuyệt đối: F01-2 11, Hòa cart-reproduced-manual 11; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 7 — liên quan Survived: 0; Killed↔Timeout: 7; khác: 0.

Killed↔Timeout:

| Mutant | Hòa cart-reproduced-manual | F01-2 |
|---|---|---|
| 311:67–319:2 BlockStatement `{}` | Timeout | Killed |
| 315:22–317:6 BlockStatement `{}` | Timeout | Killed |
| 316:7–316:24 CallExpression `;` | Timeout | Killed |
| 347:5–347:21 CallExpression `;` | Timeout | Killed |
| 510:63–523:2 BlockStatement `{}` | Timeout | Killed |
| 519:22–521:6 BlockStatement `{}` | Timeout | Killed |
| 520:7–520:24 CallExpression `;` | Timeout | Killed |

### G01-2 vs G01-2-cc

- Mutant: 150 vs 150; chung 150; chỉ ở G01-2: 0; chỉ ở G01-2-cc: 0.
- Survived tuyệt đối: G01-2 21, G01-2-cc 21; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 5 — liên quan Survived: 0; Killed↔Timeout: 5; khác: 0.

Killed↔Timeout:

| Mutant | G01-2-cc | G01-2 |
|---|---|---|
| 315:22–317:6 BlockStatement `{}` | Timeout | Killed |
| 347:5–347:21 CallExpression `;` | Timeout | Killed |
| 510:63–523:2 BlockStatement `{}` | Timeout | Killed |
| 519:22–521:6 BlockStatement `{}` | Timeout | Killed |
| 520:7–520:24 CallExpression `;` | Timeout | Killed |

### G01-2 vs Hòa cart-reproduced-ai

- Mutant: 150 vs 150; chung 150; chỉ ở G01-2: 0; chỉ ở Hòa cart-reproduced-ai: 0.
- Survived tuyệt đối: G01-2 21, Hòa cart-reproduced-ai 21; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 7 — liên quan Survived: 0; Killed↔Timeout: 7; khác: 0.

Killed↔Timeout:

| Mutant | Hòa cart-reproduced-ai | G01-2 |
|---|---|---|
| 311:67–319:2 BlockStatement `{}` | Timeout | Killed |
| 315:22–317:6 BlockStatement `{}` | Timeout | Killed |
| 316:7–316:24 CallExpression `;` | Timeout | Killed |
| 347:5–347:21 CallExpression `;` | Timeout | Killed |
| 510:63–523:2 BlockStatement `{}` | Timeout | Killed |
| 519:22–521:6 BlockStatement `{}` | Timeout | Killed |
| 520:7–520:24 CallExpression `;` | Timeout | Killed |

