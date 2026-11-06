// Scope A: black-box API tests. Fixtures only use states the API itself can produce
// (login_attempts 0/even, locked_until null or a timestamp written by /api/login); real clock.
const request = require('supertest');
const jwt = require('jsonwebtoken');
const fakeDb = require('./fakeDb');

const SECRET = 'super_secret_key_that_should_not_be_here';
const EMAIL = 'alice@test.local';
const login = (app, password) => request(app).post('/api/login').send({ email: EMAIL, password });

function scopeA(getApp) {
  test('A1 correct password: 200, token id/role, attempts reset', async () => {
    fakeDb.state.users[0].login_attempts = 2;
    const res = await login(getApp(), 'Password123!');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(jwt.verify(res.body.token, SECRET)).toMatchObject({ id: 1, role: 'user' });
    expect(fakeDb.state.users[0]).toMatchObject({ login_attempts: 0, locked_until: null });
  });

  test('A2 unknown email: 401 with generic message', async () => {
    const res = await request(getApp()).post('/api/login').send({ email: 'nobody@test.local', password: 'x' });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid email or password' });
  });

  test('A3 first wrong password: 401, attempts 0 -> 2, not locked', async () => {
    const res = await login(getApp(), 'wrong');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid email or password' });
    expect(fakeDb.state.users[0]).toMatchObject({ login_attempts: 2, locked_until: null });
  });

  test('A4 second wrong password: attempts 2 -> 4, locked about 180 s', async () => {
    await login(getApp(), 'wrong');
    const before = Date.now();
    await login(getApp(), 'wrong');
    const u = fakeDb.state.users[0];
    expect(u.login_attempts).toBe(4);
    const lockMs = new Date(u.locked_until).getTime() - before;
    expect(lockMs).toBeGreaterThanOrEqual(179000);
    expect(lockMs).toBeLessThanOrEqual(181000);
  });

  test('A5 locked account (state produced by A4) returns 403 even with correct password', async () => {
    await login(getApp(), 'wrong');
    await login(getApp(), 'wrong');
    const res = await login(getApp(), 'Password123!');
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Tài khoản đã bị khóa. Vui lòng thử lại sau.');
  });

  test('A6 expired lock (timestamp in the past) allows login', async () => {
    fakeDb.state.users[0].login_attempts = 4;
    fakeDb.state.users[0].locked_until = new Date(Date.now() - 1000).toISOString();
    const res = await login(getApp(), 'Password123!');
    expect(res.status).toBe(200);
  });

  test('A7 no Authorization header: 401 Unauthorized', async () => {
    const res = await request(getApp()).get('/api/users/me');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized' });
  });

  test('A8 bad token: 403 Forbidden', async () => {
    const res = await request(getApp()).get('/api/users/me').set('Authorization', 'Bearer not-a-jwt');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'Forbidden' });
  });

  test('A9 valid token: 200 with own profile', async () => {
    const token = jwt.sign({ id: 1, role: 'user' }, SECRET);
    const res = await request(getApp()).get('/api/users/me').set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(EMAIL);
  });
}

module.exports = { scopeA, login, EMAIL };
