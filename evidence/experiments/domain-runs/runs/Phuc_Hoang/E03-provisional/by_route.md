| Route | Lines | Mutants | Killed | Timeout | Survived | NoCoverage | RuntimeError |
|---|---|---|---|---|---|---|---|
| POST /api/register | 20-30 | 10 | 4 | 3 | 1 | 1 | 1 |
| POST /api/login | 32-66 | 43 | 26 | 5 | 6 | 1 | 5 |
| POST /api/forgot-password | 68-85 | 20 | 6 | 4 | 5 | 1 | 4 |
| POST /api/reset-password | 87-98 | 12 | 5 | 2 | 4 | 0 | 1 |
| authenticateToken | 100-110 | 17 | 10 | 3 | 4 | 0 | 0 |
| GET /api/users/me | 112-116 | 6 | 2 | 3 | 0 | 0 | 1 |
| PUT /api/users/me | 118-135 | 17 | 7 | 3 | 3 | 4 | 0 |

Mutants outside the Auth route ranges: 0
