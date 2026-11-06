# S3-I01 — Mutant comparison (cross-run Coupons)

Sinh bằng `I01-cc-compare/i01_compare.py`. Khóa mutant: vị trí đầu–cuối + mutatorName + replacement. Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage); RuntimeError/CompileError/Ignored ngoài mẫu số.

## Counts

| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Total | Score |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| I01-1-cc | 39 | 21 | 30 | 25 | 5 | 0 | 0 | 120 | 52.17% |
| I01-2-cc | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |
| I01-3-cc | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |
| I01-1 (Tấn Hiệp) | 39 | 21 | 30 | 25 | 5 | 0 | 0 | 120 | 52.17% |
| I01-2 (Tấn Hiệp) | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |
| I01-3 (Tấn Hiệp) | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |
| Hòa frozen baseline | 39 | 21 | 30 | 25 | 5 | 0 | 0 | 120 | 52.17% |
| Hòa manual | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |
| Hòa AI | 41 | 21 | 28 | 25 | 5 | 0 | 0 | 120 | 53.91% |

## Per-mutant transitions (run -cc so với report của Hòa)

### I01-1-cc vs Hòa frozen baseline

- Mutant: 120 vs 120; chung 120; chỉ ở I01-1-cc: 0; chỉ ở Hòa frozen baseline: 0.
- Survived tuyệt đối: I01-1-cc 30, Hòa frozen baseline 30; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-2-cc vs Hòa manual

- Mutant: 120 vs 120; chung 120; chỉ ở I01-2-cc: 0; chỉ ở Hòa manual: 0.
- Survived tuyệt đối: I01-2-cc 28, Hòa manual 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-3-cc vs Hòa AI

- Mutant: 120 vs 120; chung 120; chỉ ở I01-3-cc: 0; chỉ ở Hòa AI: 0.
- Survived tuyệt đối: I01-3-cc 28, Hòa AI 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

## Survived set giữa các run -cc

- I01-1-cc → I01-2-cc: Survived→khác: L474:7–L474:29 ConditionalExpression `true` → Killed, L474:7–L474:29 LogicalOperator `max_uses_per_user && 1` → Killed; mới Survived: 0.
- I01-1-cc → I01-3-cc: Survived→khác: L474:7–L474:29 ConditionalExpression `true` → Killed, L474:7–L474:29 LogicalOperator `max_uses_per_user && 1` → Killed; mới Survived: 0.
- I01-2-cc vs I01-3-cc: tập Survived trùng khớp: có.

## Run của Tấn Hiệp (I01-1/2/3) so với Hòa và với run -cc

### I01-1 vs Hòa frozen baseline

- Mutant: 120 vs 120; chung 120; chỉ ở I01-1: 0; chỉ ở Hòa frozen baseline: 0.
- Survived tuyệt đối: I01-1 30, Hòa frozen baseline 30; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-1 vs I01-1-cc

- Mutant: 120 vs 120; chung 120; chỉ ở I01-1: 0; chỉ ở I01-1-cc: 0.
- Survived tuyệt đối: I01-1 30, I01-1-cc 30; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-2 vs Hòa manual

- Mutant: 120 vs 120; chung 120; chỉ ở I01-2: 0; chỉ ở Hòa manual: 0.
- Survived tuyệt đối: I01-2 28, Hòa manual 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-2 vs I01-2-cc

- Mutant: 120 vs 120; chung 120; chỉ ở I01-2: 0; chỉ ở I01-2-cc: 0.
- Survived tuyệt đối: I01-2 28, I01-2-cc 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-3 vs Hòa AI

- Mutant: 120 vs 120; chung 120; chỉ ở I01-3: 0; chỉ ở Hòa AI: 0.
- Survived tuyệt đối: I01-3 28, Hòa AI 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

### I01-3 vs I01-3-cc

- Mutant: 120 vs 120; chung 120; chỉ ở I01-3: 0; chỉ ở I01-3-cc: 0.
- Survived tuyệt đối: I01-3 28, I01-3-cc 28; tập Survived trùng khớp: có.
- Mutant đổi trạng thái: 0 (Killed↔Timeout: 0; chuyển đổi khác: 0).

