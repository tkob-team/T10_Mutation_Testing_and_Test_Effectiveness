# G03 kill mapping (same 30 baseline Survived/NoCoverage mutants as F03)

Matched by line, column, mutator and replacement between `../E03-baseline/mutation.json`, `raw-candidate-run/mutation.json` (unedited Claude file), `mutation.json` (after human edits) and `../F03-manual/mutation.json`. Ids are the baseline ids and informational.

| Baseline id | Line:col | Mutator / change | Baseline | AI raw | AI reviewed | Manual (F03) | Killed by (AI reviewed) | Killed by (manual) |
|---|---|---|---|---|---|---|---|---|
| 8 | 26:11 | ConditionalExpression: `err` → `false` | Survived | Killed | Killed | Killed | AI-R01 | AM-10 |
| 9 | 26:44 | ObjectLiteral: `{ error: err.message }` → `{}` | NoCoverage | Killed | Killed | Killed | AI-R02 | AM-10 |
| 21 | 36:9 | ConditionalExpression: `err` → `false` | Survived | Killed | Killed | Killed | AI-L01 | AM-11 |
| 22 | 36:42 | ObjectLiteral: `{ error: err.message }` → `{}` | NoCoverage | Killed | Killed | Killed | AI-L02 | AM-11 |
| 32 | 40:30 | EqualityOperator: `new Date() < new Date(user.locked_until)` → `new Date() <= new Date(user.locked_until)` | Survived | Killed | Killed | Survived | AI-L03 | - |
| 35 | 43:15 | ObjectLiteral: `{ error: "Tài khoản đã bị khóa. Vui lòng thử lại s` → `{}` | Survived | Killed | Killed | Killed | AI-L04 | AM-04 |
| 36 | 43:24 | StringLiteral: `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` → `""` | Survived | Killed | Killed | Killed | AI-L04 | AM-04 |
| 47 | 52:27 | StringLiteral: `"Login successful"` → `""` | Survived | Survived | Survived | Survived | - | - |
| 52 | 56:11 | EqualityOperator: `newAttempts >= 3` → `newAttempts > 3` | Survived | Survived | Survived | Survived | - | - |
| 72 | 71:44 | ObjectLiteral: `{ error: "User not found" }` → `{}` | Survived | Survived | Survived | Killed | - | AM-05 |
| 73 | 71:53 | StringLiteral: `"User not found"` → `""` | Survived | Survived | Survived | Killed | - | AM-05 |
| 74 | 72:35 | ArithmeticOperator: `1000 + Math.random() * 9000` → `1000 - Math.random() * 9000` | Survived | Killed | Killed | Killed | AI-P01 | AM-02 |
| 75 | 72:42 | ArithmeticOperator: `Math.random() * 9000` → `Math.random() / 9000` | Survived | Killed | Killed | Killed | AI-P01 | AM-03 |
| 81 | 77:13 | ConditionalExpression: `err` → `false` | Survived | Killed | Killed | Killed | AI-P02 | AM-12 |
| 82 | 77:46 | ObjectLiteral: `{ error: err.message }` → `{}` | NoCoverage | Killed | Killed | Killed | AI-P03 | AM-12 |
| 96 | 94:37 | ObjectLiteral: `{ error: "Invalid token or email" }` → `{}` | Survived | Survived | Survived | Killed | - | AM-06 |
| 97 | 94:46 | StringLiteral: `"Invalid token or email"` → `""` | Survived | Survived | Survived | Killed | - | AM-06 |
| 99 | 95:16 | ObjectLiteral: `{ message: "Password reset successfully" }` → `{}` | Survived | Survived | Survived | Killed | - | AM-07 |
| 100 | 95:27 | StringLiteral: `"Password reset successfully"` → `""` | Survived | Survived | Survived | Killed | - | AM-07 |
| 110 | 103:50 | ObjectLiteral: `{ error: "Unauthorized" }` → `{}` | Survived | Survived | Survived | Killed | - | AM-08 |
| 111 | 103:59 | StringLiteral: `"Unauthorized"` → `""` | Survived | Survived | Survived | Killed | - | AM-08 |
| 116 | 106:42 | ObjectLiteral: `{ error: "Forbidden" }` → `{}` | Survived | Survived | Survived | Killed | - | AM-09 |
| 117 | 106:51 | StringLiteral: `"Forbidden"` → `""` | Survived | Survived | Survived | Killed | - | AM-09 |
| 133 | 124:7 | ConditionalExpression: `role` → `false` | Survived | Killed | Survived | Survived | - | - |
| 132 | 124:7 | ConditionalExpression: `role` → `true` | Survived | Killed | Killed | Killed | AI-U01 | AM-01 |
| 134 | 124:13 | BlockStatement: `{ …` → `{}` | NoCoverage | Killed | NoCoverage | NoCoverage | - | - |
| 135 | 125:14 | StringLiteral: `", role = ?"` → `""` | NoCoverage | Killed | NoCoverage | NoCoverage | - | - |
| 136 | 126:5 | CallExpression: `params.push(role);` → `;` | NoCoverage | Killed | NoCoverage | NoCoverage | - | - |
| 142 | 132:9 | ConditionalExpression: `err` → `false` | Survived | Killed | Killed | Killed | AI-U02 | AM-13 |
| 143 | 132:42 | ObjectLiteral: `{ error: err.message }` → `{}` | NoCoverage | Killed | Killed | Killed | AI-U02 | AM-13 |
