| Route / unit | Lines | Total | Killed | Timeout | Survived | NoCoverage | RuntimeError |
|---|---|---|---|---|---|---|---|
| POST /api/register | 20–31 | 10 | 4 | 3 | 1 | 1 | 1 |
| POST /api/login | 32–67 | 43 | 26 | 7 | 6 | 1 | 3 |
| POST /api/forgot-password | 68–86 | 20 | 6 | 6 | 5 | 1 | 2 |
| POST /api/reset-password | 87–99 | 12 | 5 | 2 | 4 | 0 | 1 |
| authenticateToken (middleware, shared) | 100–111 | 17 | 10 | 3 | 4 | 0 | 0 |
| GET /api/users/me | 112–117 | 6 | 2 | 3 | 0 | 0 | 1 |
| PUT /api/users/me | 118–136 | 17 | 7 | 3 | 3 | 4 | 0 |
| **Total** | 20–135 | 125 | 60 | 27 | 23 | 7 | 8 |

Stryker score = (Killed+Timeout)/(Killed+Timeout+Survived+NoCoverage) = (60+27)/(117) = 74.36%; covered = 79.09%; assertion-kill = 60/117 = 51.28%; RuntimeError 8 excluded from denominator.
