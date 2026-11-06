// v1: first-pass auth tests written from api_specification.md §1–2 and observed responses.
jest.mock('../database', () => require('./fakeDb'));
const request = require('supertest');
const jwt = require('jsonwebtoken');
const fakeDb = require('./fakeDb');
const { loadApp } = require('./harness');

const SECRET = 'super_secret_key_that_should_not_be_here';
let app;

beforeAll(() => { app = loadApp(); });
beforeEach(() => {
  fakeDb.reset([{ id: 1, name: 'Alice', email: 'alice@test.local', password: 'Password123!' }]);
});

test('login with correct password returns 200 and a token carrying id/role', async () => {
  const res = await request(app).post('/api/login').send({ email: 'alice@test.local', password: 'Password123!' });
  expect(res.status).toBe(200);
  const payload = jwt.verify(res.body.token, SECRET);
  expect(payload).toMatchObject({ id: 1, role: 'user' });
});

test('login with unknown email returns 401', async () => {
  const res = await request(app).post('/api/login').send({ email: 'nobody@test.local', password: 'x' });
  expect(res.status).toBe(401);
});

test('login with wrong password returns 401', async () => {
  const res = await request(app).post('/api/login').send({ email: 'alice@test.local', password: 'wrong' });
  expect(res.status).toBe(401);
});

test('account locked in the future returns 403', async () => {
  fakeDb.state.users[0].locked_until = new Date(Date.now() + 60000).toISOString();
  const res = await request(app).post('/api/login').send({ email: 'alice@test.local', password: 'Password123!' });
  expect(res.status).toBe(403);
});

test('GET /api/users/me without token returns 401', async () => {
  const res = await request(app).get('/api/users/me');
  expect(res.status).toBe(401);
});

test('GET /api/users/me with valid token returns the user', async () => {
  const token = jwt.sign({ id: 1, role: 'user' }, SECRET);
  const res = await request(app).get('/api/users/me').set('Authorization', 'Bearer ' + token);
  expect(res.status).toBe(200);
  expect(res.body.email).toBe('alice@test.local');
});
