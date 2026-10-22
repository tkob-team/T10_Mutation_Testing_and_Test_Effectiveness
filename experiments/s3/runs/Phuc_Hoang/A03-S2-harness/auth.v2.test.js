jest.mock('../database', () => require('./fakeDb'));
const fakeDb = require('./fakeDb');
const { loadApp } = require('./harness');
const { scopeA } = require('./auth.v2.cases');

let app;
beforeAll(() => { app = loadApp(); });
beforeEach(() => {
  fakeDb.reset([{ id: 1, name: 'Alice', email: 'alice@test.local', password: 'Password123!' }]);
});

describe('scope A (API-reachable states)', () => scopeA(() => app));
