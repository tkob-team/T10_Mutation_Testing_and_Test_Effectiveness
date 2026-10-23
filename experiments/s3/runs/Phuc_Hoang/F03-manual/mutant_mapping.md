# F03 mutant mapping (30 baseline Survived/NoCoverage mutants)

Matched by line, column, mutator and replacement between `../E03-baseline/mutation.json` and `mutation.json` (this directory). Baseline ids are informational.

| Baseline id | Line:col | Mutator | Mutation | Baseline | After F03 | Killed by |
|---|---|---|---|---|---|---|
| 8 | 26:11 | ConditionalExpression | `err` →`false` | Survived | Killed | AM-10 |
| 9 | 26:44 | ObjectLiteral | `{ error: err.message }` →`{}` | NoCoverage | Killed | AM-10 |
| 21 | 36:9 | ConditionalExpression | `err` →`false` | Survived | Killed | AM-11 |
| 22 | 36:42 | ObjectLiteral | `{ error: err.message }` →`{}` | NoCoverage | Killed | AM-11 |
| 32 | 40:30 | EqualityOperator | `new Date() < new Date(user.locked_until)` →`new Date() <= new Date(user.locked_until)` | Survived | Survived | - |
| 35 | 43:15 | ObjectLiteral | `{ error: "Tài khoản đã bị khóa. Vui lòng thử lại sau." }` →`{}` | Survived | Killed | AM-04 |
| 36 | 43:24 | StringLiteral | `"Tài khoản đã bị khóa. Vui lòng thử lại sau."` →`""` | Survived | Killed | AM-04 |
| 47 | 52:27 | StringLiteral | `"Login successful"` →`""` | Survived | Survived | - |
| 52 | 56:11 | EqualityOperator | `newAttempts >= 3` →`newAttempts > 3` | Survived | Survived | - |
| 72 | 71:44 | ObjectLiteral | `{ error: "User not found" }` →`{}` | Survived | Killed | AM-05 |
| 73 | 71:53 | StringLiteral | `"User not found"` →`""` | Survived | Killed | AM-05 |
| 74 | 72:35 | ArithmeticOperator | `1000 + Math.random() * 9000` →`1000 - Math.random() * 9000` | Survived | Killed | AM-02 |
| 75 | 72:42 | ArithmeticOperator | `Math.random() * 9000` →`Math.random() / 9000` | Survived | Killed | AM-03 |
| 81 | 77:13 | ConditionalExpression | `err` →`false` | Survived | Killed | AM-12 |
| 82 | 77:46 | ObjectLiteral | `{ error: err.message }` →`{}` | NoCoverage | Killed | AM-12 |
| 96 | 94:37 | ObjectLiteral | `{ error: "Invalid token or email" }` →`{}` | Survived | Killed | AM-06 |
| 97 | 94:46 | StringLiteral | `"Invalid token or email"` →`""` | Survived | Killed | AM-06 |
| 99 | 95:16 | ObjectLiteral | `{ message: "Password reset successfully" }` →`{}` | Survived | Killed | AM-07 |
| 100 | 95:27 | StringLiteral | `"Password reset successfully"` →`""` | Survived | Killed | AM-07 |
| 110 | 103:50 | ObjectLiteral | `{ error: "Unauthorized" }` →`{}` | Survived | Killed | AM-08 |
| 111 | 103:59 | StringLiteral | `"Unauthorized"` →`""` | Survived | Killed | AM-08 |
| 116 | 106:42 | ObjectLiteral | `{ error: "Forbidden" }` →`{}` | Survived | Killed | AM-09 |
| 117 | 106:51 | StringLiteral | `"Forbidden"` →`""` | Survived | Killed | AM-09 |
| 133 | 124:7 | ConditionalExpression | `role` →`false` | Survived | Survived | - |
| 132 | 124:7 | ConditionalExpression | `role` →`true` | Survived | Killed | AM-01 |
| 134 | 124:13 | BlockStatement | `{ …` →`{}` | NoCoverage | NoCoverage | - |
| 135 | 125:14 | StringLiteral | `", role = ?"` →`""` | NoCoverage | NoCoverage | - |
| 136 | 126:5 | CallExpression | `params.push(role);` →`;` | NoCoverage | NoCoverage | - |
| 142 | 132:9 | ConditionalExpression | `err` →`false` | Survived | Killed | AM-13 |
| 143 | 132:42 | ObjectLiteral | `{ error: err.message }` →`{}` | NoCoverage | Killed | AM-13 |

## Mutants that remain (7)

- **32**: Spec silent: differs only when the clock equals `locked_until` exactly; FR-02 does not say whether the lock is still active at the expiry instant. Not asserted.
- **47**: Spec silent: API 1.2 lists `token` and `user` as the success body, not a `message`. Not asserted.
- **52**: Masked by the `+2` defect: the counter on original code is always even (0, 2, 4) so `>= 3` and `> 3` behave the same. See probes.md (killed once the counter increments by 1).
- **133**: Equals the spec-correct behaviour (SEC-06, FR-04: role is not updated). A test that tells it apart from the original must assert the role CHANGES, which encodes defect DF-12. DF-12 in the defects suite passes on this mutant. See probes.md.
- **134**: Runs only when `role` is in the body. Only DF-12 sends it, and DF-12 fails on original code (defect suite).
- **135**: same as 134
- **136**: same as 134
