# experiments/s3/runs/Phuc_Hoang/E03-provisional/mutation.json
Total 125 | Killed 60 | Timeout 23 | Survived 23 | NoCoverage 7 | Ignored 0 | Errors 12
Stryker score (killed+timeout)/valid: 73.45% | covered: 78.30% | assertion kill (killed/valid): 53.10%

| Line:Col | State | Mutator | Replacement |
|---|---|---|---|
| 26:11 | Survived | ConditionalExpression | `false` |
| 26:44 | NoCoverage | ObjectLiteral | `{}` |
| 36:9 | Survived | ConditionalExpression | `false` |
| 36:42 | NoCoverage | ObjectLiteral | `{}` |
| 40:30 | Survived | EqualityOperator | `new Date() <= new Date(user.locked_until)` |
| 43:15 | Survived | ObjectLiteral | `{}` |
| 43:24 | Survived | StringLiteral | `""` |
| 52:27 | Survived | StringLiteral | `""` |
| 56:11 | Survived | EqualityOperator | `newAttempts > 3` |
| 71:44 | Survived | ObjectLiteral | `{}` |
| 71:53 | Survived | StringLiteral | `""` |
| 72:35 | Survived | ArithmeticOperator | `1000 - Math.random() * 9000` |
| 72:42 | Survived | ArithmeticOperator | `Math.random() / 9000` |
| 77:13 | Survived | ConditionalExpression | `false` |
| 77:46 | NoCoverage | ObjectLiteral | `{}` |
| 94:37 | Survived | ObjectLiteral | `{}` |
| 94:46 | Survived | StringLiteral | `""` |
| 95:16 | Survived | ObjectLiteral | `{}` |
| 95:27 | Survived | StringLiteral | `""` |
| 103:50 | Survived | ObjectLiteral | `{}` |
| 103:59 | Survived | StringLiteral | `""` |
| 106:42 | Survived | ObjectLiteral | `{}` |
| 106:51 | Survived | StringLiteral | `""` |
| 124:7 | Survived | ConditionalExpression | `true` |
| 124:7 | Survived | ConditionalExpression | `false` |
| 124:13 | NoCoverage | BlockStatement | `{}` |
| 125:14 | NoCoverage | StringLiteral | `""` |
| 126:5 | NoCoverage | CallExpression | `;` |
| 132:9 | Survived | ConditionalExpression | `false` |
| 132:42 | NoCoverage | ObjectLiteral | `{}` |
