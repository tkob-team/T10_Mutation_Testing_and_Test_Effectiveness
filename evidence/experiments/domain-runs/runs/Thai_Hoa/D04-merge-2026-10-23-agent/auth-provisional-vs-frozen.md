# auth-provisional-vs-frozen

Same source: false; same universe: true. Matched 125/125.

| Baseline ID | Location / mutator / replacement | Baseline | Variant | Killed by |
|---|---|---|---|---|
| 9 | 26 / 44 / 26 / 66 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 22 | 36 / 42 / 36 / 64 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 82 | 77 / 46 / 77 / 68 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 134 | 124 / 13 / 127 / 4 / BlockStatement / {} | NoCoverage | NoCoverage |  |
| 135 | 125 / 14 / 125 / 26 / StringLiteral / "" | NoCoverage | NoCoverage |  |
| 136 | 126 / 5 / 126 / 23 / CallExpression / ; | NoCoverage | NoCoverage |  |
| 143 | 132 / 42 / 132 / 64 / ObjectLiteral / {} | NoCoverage | NoCoverage |  |
| 5 | 24 / 5 / 24 / 28 / ArrayDeclaration / [] | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 8 | 26 / 11 / 26 / 14 / ConditionalExpression / false | Survived | Survived |  |
| 11 | 27 / 16 / 27 / 76 / ObjectLiteral / {} | Killed | Killed | Registration (API 1.1) AU-R01 valid registration returns 200, the success message and a numeric id |
| 12 | 27 / 27 / 27 / 57 / StringLiteral / "" | Killed | Killed | Registration (API 1.1) AU-R01 valid registration returns 200, the success message and a numeric id |
| 18 | 35 / 49 / 35 / 56 / ArrayDeclaration / [] | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 21 | 36 / 9 / 36 / 12 / ConditionalExpression / false | Survived | Survived |  |
| 4 | 23 / 5 / 23 / 65 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 24 | 37 / 9 / 37 / 14 / ConditionalExpression / true | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 17 | 35 / 10 / 35 / 47 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 26 | 38 / 35 / 38 / 73 / ObjectLiteral / {} | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L04 unknown email gets the same status and body as a wrong password (FR-02: no cause leaked) |
| 27 | 38 / 44 / 38 / 71 / StringLiteral / "" | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L04 unknown email gets the same status and body as a wrong password (FR-02: no cause leaked) |
| 28 | 40 / 9 / 40 / 70 / ConditionalExpression / true | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 29 | 40 / 9 / 40 / 70 / ConditionalExpression / false | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 30 | 40 / 9 / 40 / 70 / LogicalOperator / user.locked_until  /  /  new Date() < new Date(user.locked_until) | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L07 a lock whose time has passed no longer blocks login |
| 31 | 40 / 30 / 40 / 70 / ConditionalExpression / true | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L07 a lock whose time has passed no longer blocks login |
| 32 | 40 / 30 / 40 / 70 / EqualityOperator / new Date() <= new Date(user.locked_until) | Survived | Survived |  |
| 33 | 40 / 30 / 40 / 70 / EqualityOperator / new Date() >= new Date(user.locked_until) | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 34 | 40 / 72 / 44 / 6 / BlockStatement / {} | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 35 | 43 / 15 / 43 / 71 / ObjectLiteral / {} | Survived | Survived |  |
| 36 | 43 / 24 / 43 / 69 / StringLiteral / "" | Survived | Survived |  |
| 37 | 46 / 9 / 46 / 35 / ConditionalExpression / true | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L03 wrong password is refused with 401 (convention) and no token |
| 38 | 46 / 9 / 46 / 35 / ConditionalExpression / false | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 39 | 46 / 9 / 46 / 35 / EqualityOperator / user.password !== password | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 2 | 20 / 41 / 30 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 6 | 25 / 20 / 28 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 7 | 26 / 11 / 26 / 14 / ConditionalExpression / true | Timeout | Timeout |  |
| 15 | 32 / 38 / 66 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 23 | 37 / 9 / 37 / 14 / BooleanLiteral / user | RuntimeError | Timeout |  |
| 19 | 35 / 73 / 65 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 43 | 49 / 9 / 49 / 18 / ArrayDeclaration / [] | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L08 a successful login resets the failure counter: wrong, ok, wrong, ok never locks (FR-02 "consecutive") |
| 44 | 51 / 30 / 51 / 62 / ObjectLiteral / {} | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L02 the JWT carries the user id and role (FR-02, SEC-03) |
| 20 | 36 / 9 / 36 / 12 / ConditionalExpression / true | Timeout | Timeout |  |
| 47 | 52 / 27 / 52 / 45 / StringLiteral / "" | Survived | Survived |  |
| 49 | 54 / 27 / 54 / 50 / ArithmeticOperator / user.login_attempts - 2 | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 46 | 52 / 16 / 52 / 60 / ObjectLiteral / {} | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 50 | 56 / 11 / 56 / 27 / ConditionalExpression / true | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L08 a successful login resets the failure counter: wrong, ok, wrong, ok never locks (FR-02 "consecutive") |
| 52 | 56 / 11 / 56 / 27 / EqualityOperator / newAttempts > 3 | Survived | Survived |  |
| 54 | 56 / 29 / 58 / 8 / BlockStatement / {} | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 53 | 56 / 11 / 56 / 27 / EqualityOperator / newAttempts < 3 | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L08 a successful login resets the failure counter: wrong, ok, wrong, ok never locks (FR-02 "consecutive") |
| 55 | 57 / 32 / 57 / 51 / ArithmeticOperator / Date.now() - 180000 | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 58 | 61 / 9 / 61 / 44 / ArrayDeclaration / [] | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 51 | 56 / 11 / 56 / 27 / ConditionalExpression / false | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L05 three consecutive wrong passwords lock the account: the correct password is then refused (FR-02) |
| 60 | 63 / 28 / 63 / 66 / ObjectLiteral / {} | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L04 unknown email gets the same status and body as a wrong password (FR-02: no cause leaked) |
| 61 | 63 / 37 / 63 / 64 / StringLiteral / "" | Killed | Killed | Login and lock (API 1.2, README FR-02) AU-L04 unknown email gets the same status and body as a wrong password (FR-02: no cause leaked) |
| 67 | 70 / 49 / 70 / 56 / ArrayDeclaration / [] | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P01 forgot-password for a registered email returns 200, the message and a reset token (API 1.3) |
| 25 | 37 / 9 / 37 / 14 / ConditionalExpression / false | RuntimeError | Timeout |  |
| 70 | 71 / 9 / 71 / 14 / ConditionalExpression / true | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P01 forgot-password for a registered email returns 200, the message and a reset token (API 1.3) |
| 42 | 48 / 9 / 48 / 80 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 72 | 71 / 44 / 71 / 71 / ObjectLiteral / {} | Survived | Survived |  |
| 73 | 71 / 53 / 71 / 69 / StringLiteral / "" | Survived | Survived |  |
| 57 | 60 / 9 / 60 / 77 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 74 | 72 / 35 / 72 / 62 / ArithmeticOperator / 1000 - Math.random() * 9000 | Survived | Survived |  |
| 66 | 70 / 10 / 70 / 47 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 75 | 72 / 42 / 72 / 62 / ArithmeticOperator / Math.random() / 9000 | Survived | Survived |  |
| 78 | 75 / 7 / 75 / 28 / ArrayDeclaration / [] | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P03 reset with the issued token changes the password: new works, old no longer works (API 1.4) |
| 40 | 46 / 37 / 53 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 81 | 77 / 13 / 77 / 16 / ConditionalExpression / false | Survived | Survived |  |
| 84 | 78 / 18 / 81 / 10 / ObjectLiteral / {} | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P01 forgot-password for a registered email returns 200, the message and a reset token (API 1.3) |
| 85 | 79 / 20 / 79 / 53 / StringLiteral / "" | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P01 forgot-password for a registered email returns 200, the message and a reset token (API 1.3) |
| 77 | 74 / 7 / 74 / 54 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 90 | 90 / 5 / 90 / 92 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 91 | 91 / 5 / 91 / 37 / ArrayDeclaration / [] | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P03 reset with the issued token changes the password: new works, old no longer works (API 1.4) |
| 48 | 53 / 12 / 64 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 93 | 93 / 11 / 93 / 29 / ConditionalExpression / true | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P03 reset with the issued token changes the password: new works, old no longer works (API 1.4) |
| 69 | 71 / 9 / 71 / 14 / BooleanLiteral / user | RuntimeError | Timeout |  |
| 94 | 93 / 11 / 93 / 29 / ConditionalExpression / false | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P04 reset with a wrong token is refused with 400 (convention) and the password is unchanged |
| 95 | 93 / 11 / 93 / 29 / EqualityOperator / this.changes !== 0 | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P03 reset with the issued token changes the password: new works, old no longer works (API 1.4) |
| 96 | 94 / 37 / 94 / 72 / ObjectLiteral / {} | Survived | Survived |  |
| 71 | 71 / 9 / 71 / 14 / ConditionalExpression / false | RuntimeError | Timeout |  |
| 97 | 94 / 46 / 94 / 70 / StringLiteral / "" | Survived | Survived |  |
| 99 | 95 / 16 / 95 / 58 / ObjectLiteral / {} | Survived | Survived |  |
| 100 | 95 / 27 / 95 / 56 / StringLiteral / "" | Survived | Survived |  |
| 102 | 101 / 34 / 101 / 49 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U03 GET /me returns the profile of the token owner only (API 2.1) |
| 64 | 68 / 48 / 85 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 103 | 102 / 17 / 102 / 55 / ConditionalExpression / true | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 104 | 102 / 17 / 102 / 55 / ConditionalExpression / false | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 68 | 70 / 73 / 84 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 106 | 102 / 48 / 102 / 51 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U03 GET /me returns the profile of the token owner only (API 2.1) |
| 107 | 103 / 7 / 103 / 20 / ConditionalExpression / true | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U03 GET /me returns the profile of the token owner only (API 2.1) |
| 110 | 103 / 50 / 103 / 75 / ObjectLiteral / {} | Survived | Survived |  |
| 109 | 103 / 7 / 103 / 20 / EqualityOperator / token != null | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 111 | 103 / 59 / 103 / 73 / StringLiteral / "" | Survived | Survived |  |
| 105 | 102 / 17 / 102 / 55 / LogicalOperator / authHeader  /  /  authHeader.split(" ")[1] | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 108 | 103 / 7 / 103 / 20 / ConditionalExpression / false | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 114 | 106 / 9 / 106 / 12 / ConditionalExpression / true | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U03 GET /me returns the profile of the token owner only (API 2.1) |
| 117 | 106 / 51 / 106 / 62 / StringLiteral / "" | Survived | Survived |  |
| 115 | 106 / 9 / 106 / 12 / ConditionalExpression / false | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U02 GET /me with an invalid token is refused (SEC-02) |
| 116 | 106 / 42 / 106 / 64 / ObjectLiteral / {} | Survived | Survived |  |
| 79 | 76 / 16 / 82 / 8 / BlockStatement / {} | Timeout | Timeout |  |
| 123 | 113 / 10 / 113 / 44 / StringLiteral / "" | RuntimeError | RuntimeError |  |
| 80 | 77 / 13 / 77 / 16 / ConditionalExpression / true | Timeout | Timeout |  |
| 124 | 113 / 46 / 113 / 59 / ArrayDeclaration / [] | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U03 GET /me returns the profile of the token owner only (API 2.1) |
| 88 | 87 / 47 / 98 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 130 | 121 / 15 / 121 / 75 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 131 | 122 / 16 / 122 / 47 / ArrayDeclaration / [] | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 132 | 124 / 7 / 124 / 11 / ConditionalExpression / true | Survived | Survived |  |
| 133 | 124 / 7 / 124 / 11 / ConditionalExpression / false | Survived | Survived |  |
| 137 | 128 / 12 / 128 / 27 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 138 | 129 / 3 / 129 / 28 / CallExpression / ; | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 92 | 92 / 20 / 96 / 6 / BlockStatement / {} | Timeout | Timeout |  |
| 101 | 100 / 47 / 110 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 142 | 132 / 9 / 132 / 12 / ConditionalExpression / false | Survived | Survived |  |
| 145 | 133 / 14 / 133 / 44 / ObjectLiteral / {} | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 146 | 133 / 25 / 133 / 42 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 113 | 105 / 48 / 109 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 1 | 20 / 10 / 20 / 25 / StringLiteral / "" | Killed | Killed | Registration (API 1.1) AU-R01 valid registration returns 200, the success message and a numeric id |
| 121 | 112 / 59 / 116 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 118 | 108 / 5 / 108 / 12 / CallExpression / ; | Timeout | Timeout |  |
| 14 | 32 / 10 / 32 / 22 / StringLiteral / "" | Killed | Killed | Registration (API 1.1) AU-R02 a registered user can log in with the same credentials (API 1.2) |
| 63 | 68 / 10 / 68 / 32 / StringLiteral / "" | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P01 forgot-password for a registered email returns 200, the message and a reset token (API 1.3) |
| 128 | 118 / 9 / 118 / 24 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U04 PUT /me updates name, shipping address and phone, and GET /me reflects them (API 2.2) |
| 87 | 87 / 10 / 87 / 31 / StringLiteral / "" | Killed | Killed | Forgot / reset password (API 1.3-1.4, README FR-03, SEC-07) AU-P03 reset with the issued token changes the password: new works, old no longer works (API 1.4) |
| 120 | 112 / 9 / 112 / 24 / StringLiteral / "" | Killed | Killed | Profile (API 2.1-2.2, README FR-04, SEC-02) AU-U01 GET /me without a token is refused with 401 (SEC-02) |
| 125 | 113 / 76 / 115 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 126 | 114 / 5 / 114 / 20 / CallExpression / ; | Timeout | Timeout |  |
| 129 | 118 / 59 / 135 / 2 / BlockStatement / {} | Timeout | Timeout |  |
| 140 | 131 / 40 / 134 / 4 / BlockStatement / {} | Timeout | Timeout |  |
| 141 | 132 / 9 / 132 / 12 / ConditionalExpression / true | Timeout | Timeout |  |
