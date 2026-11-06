// v3 = v2 + scope B: white-box control over DB state, DB errors and the clock.
jest.mock('../database', () => require('./fakeDb'));
const request = require('supertest');
const fakeDb = require('./fakeDb');
const { loadApp } = require('./harness');
const { scopeA, login } = require('./auth.v2.cases');

let app;
beforeAll(() => { app = loadApp(); });
beforeEach(() => {
  fakeDb.reset([{ id: 1, name: 'Alice', email: 'alice@test.local', password: 'Password123!' }]);
});
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });

describe('scope A (API-reachable states)', () => scopeA(() => app));

describe('scope B (state/clock/error injection)', () => {
  test('B1 login_attempts = 1 (not producible via API): wrong password -> 3 -> locked', async () => {
    fakeDb.state.users[0].login_attempts = 1;
    await login(app, 'wrong');
    expect(fakeDb.state.users[0].login_attempts).toBe(3);
    expect(fakeDb.state.users[0].locked_until).not.toBeNull();
  });

  test('B2 now == locked_until exactly: lock has expired, login allowed', async () => {
    const t = Date.parse('2026-10-19T00:00:00.000Z');
    jest.useFakeTimers({ now: t, doNotFake: ['nextTick', 'setImmediate', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'queueMicrotask'] });
    fakeDb.state.users[0].locked_until = new Date(t).toISOString();
    const res = await login(app, 'Password123!');
    expect(res.status).toBe(200);
  });

  test('B3 DB error on lookup: 500 with error message', async () => {
    jest.spyOn(fakeDb, 'get').mockImplementation((sql, params, cb) => cb(new Error('disk I/O error')));
    const res = await login(app, 'Password123!');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'disk I/O error' });
  });
});
