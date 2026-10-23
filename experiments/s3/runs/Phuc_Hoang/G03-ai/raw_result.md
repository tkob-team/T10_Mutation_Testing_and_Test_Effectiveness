Of the 30 mutants, 17 get tests that pass on the original code. 13 get none, because the spec is silent on what they change or because the only passing test would assert a bug. I have not run any of this: the file below is unrun, and you should run it with Stryker before trusting it.

## Per-mutant analysis

**Mutants 8, 9 (register error branch, line 26)**
- Code: `if (err) return res.status(500).json({ error: err.message });`
- Input: make the INSERT fail. A `BEFORE INSERT` trigger with `RAISE(ABORT)` created through `require('./testDb').run` does this.
- Original: 500 with `{error}`.
  - Mutant 8 skips the branch and returns 200 "User registered successfully" for a user that was never stored.
  - Mutant 9 returns `{}`.
- Spec: silent on DB failure. The 500 status is a convention. The assertions are that success is not reported, no row exists, and `error` is a non-empty string. The API's other error responses share that `{error}` shape, which is also convention.

**Mutants 21, 22 (login DB error, line 36)**
- Code: `if (err) return res.status(500).json({ error: err.message });`
- Input: temporarily rename the `users` table, so the SELECT fails with "no such table".
- Original: 500 with `{error}`.
  - Mutant 21 falls through to `!user` and returns 401 "Invalid email or password", which blames the credentials for a server fault.
  - Mutant 22 returns `{}`.
- Spec: silent. The 500 status and the error shape are convention.

**Mutant 32 (line 40, `<` → `<=`)**
- Code: `if (user.locked_until && new Date() < new Date(user.locked_until))`
- Input: freeze the clock, seed `locked_until` directly in the DB, then move the clock to exactly that instant. Seeding avoids depending on the 180000 ms lock length in the code, which already disagrees with the 30 s in FR-02.
- Original at the instant: 200. Mutant: 403.
- Spec: FR-02 says the account is locked for 30 seconds, so at exactly the end of the lock it is no longer locked. This is my reading of the boundary, since the spec does not state it. A control assertion at 1 ms before the end expects 403.

**Mutants 35, 36 (lock response body, line 43)**
- Code: `.json({ error: "Tài khoản đã bị khóa. Vui lòng thử lại sau." })`
- Input: three wrong passwords, then the correct one.
- Spec: FR-02 says the system "trả về thông báo lỗi phù hợp". The test therefore asserts `error` is a non-empty string and does not assert the exact text, since the spec gives none. This kills both mutants.

**Mutant 47 (`"Login successful"`)**
- Spec silent. API 1.2 only promises `token` and `user`. No test.

**Mutant 52 (line 56, `>= 3` → `> 3`)**
- Code: `const newAttempts = user.login_attempts + 2; ... if (newAttempts >= 3)`
- The counter starts at 0 and rises in steps of 2, so `newAttempts` is always even and never exactly 3. The only way to hit 3 is to seed `login_attempts = 1` and assert a lock.
- Under FR-02 ("increment by exactly 1"), a counter of 1 plus a wrong password is 2, which is not a lock. That test would encode the +2 bug. No test.

**Mutants 72, 73, 96, 97, 99, 100, 110, 111, 116, 117 (message and body strings)**
- These cover the unknown-email message, the reset 400 body, the reset success message, and the Unauthorized/Forbidden bodies.
- Spec silent on all of them. Status codes are already covered by existing tests. No tests.

**Mutants 74, 75 (line 72, OTP generation)**
- Code: `Math.floor(1000 + Math.random() * 9000).toString()`
- Input: pin `Math.random` to 0, then to 0.999.
  - Original gives "1000" and "9991".
  - Mutant 74 gives "1000" and "-7991" (negative, not digits).
  - Mutant 75 gives "1000" and "1000" (no dependence on randomness).
- Spec: FR-03 says "6 chữ số ngẫu nhiên", so the code must be all digits and must vary with the random source. I do not assert length 6. The original produces 4 digits, so that spec test would fail on the original and cannot be included.

**Mutants 81, 82 (forgot-password UPDATE error, line 77)**
- Code: `if (err) return res.status(500).json({ error: err.message });`
- Input: a `BEFORE UPDATE` failure trigger.
- Original: 500, no token.
  - Mutant 81 returns 200 plus a token that was never stored.
  - Mutant 82 returns `{}`.
- Spec: silent on DB failure. Same conventions as mutants 8 and 9.

**Mutants 142, 143 (PUT /me error, line 132)**
- Code: `if (err) return res.status(500).json({ error: err.message });`
- Input: log in first, then install the `BEFORE UPDATE` failure trigger, then PUT. The login must happen first because its own UPDATE has no error callback.
- Same expectations and conventions as above.

**Mutant 132 (line 124, `role` → `true`)**
- Code: `if (role) { query += ", role = ?"; params.push(role); }`
- Input: PUT without `role`. The mutant then runs `role = ?` with `undefined`, which I expect node-sqlite3 to bind as NULL, so the user's role is wiped.
- Spec: FR-04 and SEC-06 say the role is not changed by the client. A profile update without `role` must leave the role as `'user'`. This passes on the original.

**Mutants 133, 134, 135, 136 (role branch removed)**
- To kill these with an ordinary test, the test would have to assert that `role: 'admin'` is applied, which contradicts SEC-06.
- The original code has that privilege-escalation bug, so the spec-correct test ("role stays `user`") fails on it.
- My proposal is `test.failing` with the spec-correct assertion.
  - It passes on the original because the inner assertion fails there.
  - It fails on all four mutants, because each makes the role unchanged.
  - Those four would therefore be killed only because the mutants happen to remove the bug.
  - Once `server.js` is fixed, this test flips to failing, which is the cue to turn it into a plain `test`.
- `test.failing` needs Jest 28.1 or later. If you prefer, delete it and fix `server.js` instead; that is outside this scope.

## Test file

```js
// S3-D04 AI-proposed tests aimed at surviving / uncovered mutants of server.js lines 20-135.
// Expected results come from the spec; where only an HTTP convention applies, the test says so.
jest.mock('../database', () => require('./testDb'));
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { testApi } = require('./testDb');
const { loadApp, freezeClock, advanceClock } = require('./harness');
const { ALICE, BOB, NEW_USER, STRONG_PASSWORD, login, loginOk, bearer } = require('./fixtures');

// The mocked ../database module is the in-memory sqlite handle itself.
const db = require('./testDb');
const run = (sql, params = []) =>
  new Promise((resolve, reject) => db.run(sql, params, (err) => (err ? reject(err) : resolve())));

// Force one kind of statement to fail, then always clean up.
async function withFailingTrigger(event, fn) {
  await run(`CREATE TRIGGER force_fail BEFORE ${event} ON users BEGIN SELECT RAISE(ABORT, 'forced failure'); END`);
  try {
    return await fn();
  } finally {
    await run('DROP TRIGGER force_fail');
  }
}

// Make SELECTs on users fail ("no such table"), then always restore.
async function withUsersTableMissing(fn) {
  await run('ALTER TABLE users RENAME TO users_hidden');
  try {
    return await fn();
  } finally {
    await run('ALTER TABLE users_hidden RENAME TO users');
  }
}

const expectErrorMessage = (res) => {
  expect(typeof res.body.error).toBe('string');
  expect(res.body.error.length).toBeGreaterThan(0);
};

let app;
beforeAll(() => { app = loadApp(); });
beforeEach(async () => { await testApi.resetUsers([ALICE, BOB]); });
afterEach(() => { jest.useRealTimers(); });

describe('Registration failure (API 1.1; 500 and error shape are conventions)', () => {
  // kills mutant 8
  test('AI-R01 a failed insert is not reported as a successful registration', async () => {
    const res = await withFailingTrigger('INSERT', () => request(app).post('/api/register').send(NEW_USER));
    expect(res.status).toBe(500);
    expect(res.body.message).toBeUndefined();
    expect(await testApi.countByEmail(NEW_USER.email)).toBe(0);
  });

  // kills mutant 9
  test('AI-R02 a failed insert returns a non-empty error message', async () => {
    const res = await withFailingTrigger('INSERT', () => request(app).post('/api/register').send(NEW_USER));
    expectErrorMessage(res);
  });
});

describe('Login failure and lock (API 1.2, README FR-02)', () => {
  // kills mutant 21
  test('AI-L01 a database failure during login is a 500 (convention), not "invalid credentials"', async () => {
    const res = await withUsersTableMissing(() => login(app, ALICE.email, ALICE.password));
    expect(res.status).toBe(500);
    expect(res.body.token).toBeUndefined();
  });

  // kills mutant 22
  test('AI-L02 a database failure during login returns a non-empty error message', async () => {
    const res = await withUsersTableMissing(() => login(app, ALICE.email, ALICE.password));
    expectErrorMessage(res);
  });

  // kills mutant 32 (interpretation: a 30 s lock is over once its full duration has elapsed)
  test('AI-L03 at the exact instant the lock ends the account can log in; 1 ms earlier it cannot', async () => {
    freezeClock('2026-10-22T08:00:29.999Z');
    await run('UPDATE users SET locked_until = ? WHERE email = ?', ['2026-10-22T08:00:30.000Z', ALICE.email]);
    expect((await login(app, ALICE.email, ALICE.password)).status).toBe(403);
    advanceClock(1);
    expect((await login(app, ALICE.email, ALICE.password)).status).toBe(200);
  });

  // kills mutants 35, 36 (FR-02: "thông báo lỗi phù hợp"; exact text not specified)
  test('AI-L04 a locked account gets a non-empty error message', async () => {
    for (let i = 0; i < 3; i += 1) await login(app, ALICE.email, 'Wrong123!');
    const res = await login(app, ALICE.email, ALICE.password);
    expect(res.status).toBe(403);
    expectErrorMessage(res);
  });
});

describe('Forgot password (API 1.3, README FR-03)', () => {
  const forgot = (email) => request(app).post('/api/forgot-password').send({ email });
  const tokenWithRandom = async (value) => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(value);
    try {
      return (await forgot(ALICE.email)).body.resetToken;
    } finally {
      spy.mockRestore();
    }
  };

  // kills mutants 74, 75 (FR-03: random, all-digit code; length is deliberately not asserted)
  test('AI-P01 the reset code is all digits and depends on the random source', async () => {
    const low = await tokenWithRandom(0);
    const high = await tokenWithRandom(0.999);
    expect(low).toMatch(/^\d+$/);
    expect(high).toMatch(/^\d+$/);
    expect(high).not.toBe(low);
  });

  // kills mutant 81 (500 is a convention)
  test('AI-P02 if the token cannot be stored, no reset token is handed out', async () => {
    const res = await withFailingTrigger('UPDATE', () => forgot(ALICE.email));
    expect(res.status).toBe(500);
    expect(res.body.resetToken).toBeUndefined();
  });

  // kills mutant 82
  test('AI-P03 if the token cannot be stored, a non-empty error message is returned', async () => {
    const res = await withFailingTrigger('UPDATE', () => forgot(ALICE.email));
    expectErrorMessage(res);
  });
});

describe('Profile update (API 2.2, README FR-04, SEC-06)', () => {
  const update = (token, body) => request(app).put('/api/users/me').set(bearer(token)).send(body);
  const PROFILE = { name: 'Alice Nguyen', shipping_address: '123 Le Loi, Q1, TP.HCM', phone: '0912345678' };

  // kills mutant 132
  test('AI-U01 updating the profile without a role leaves the role unchanged', async () => {
    const token = await loginOk(app, ALICE);
    expect((await update(token, PROFILE)).status).toBe(200);
    expect((await testApi.userByEmail(ALICE.email)).role).toBe('user');
  });

  // kills mutants 142, 143 (500 and error shape are conventions); token is obtained before the trigger exists
  test('AI-U02 a failed profile update is a 500 with a non-empty error message', async () => {
    const token = await loginOk(app, ALICE);
    const res = await withFailingTrigger('UPDATE', () => update(token, PROFILE));
    expect(res.status).toBe(500);
    expectErrorMessage(res);
    expect(res.body.message).toBeUndefined();
  });

  // Mutants 133-136 (role branch). Spec (FR-04, SEC-06): role cannot be changed by the client.
  // server.js currently lets it be changed, so this assertion FAILS on the original code; test.failing
  // makes the suite green today and turns red once server.js is fixed (then change it to a plain test).
  // It reports mutants 133-136 as killed only because each of them happens to remove the vulnerability.
  test.failing('AI-U03 KNOWN BUG: PUT /me with role "admin" must not change the role (SEC-06)', async () => {
    const token = await loginOk(app, ALICE);
    await update(token, { ...PROFILE, role: 'admin' });
    expect((await testApi.userByEmail(ALICE.email)).role).toBe('user');
  });
});
```