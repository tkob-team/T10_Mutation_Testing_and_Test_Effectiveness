// Test resources are owned by one Jest environment, including every Stryker run.
// Never import production database.js here: setup may have failed before mocks.
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

afterAll(async () => {
  const db = global.__ESHOP_DB__;
  if (db && db.open) {
    await new Promise((resolve, reject) => db.close(error => error ? reject(error) : resolve()));
  }
  delete global.__ESHOP_DB__;
  delete global.__ESHOP_APP__;
});
