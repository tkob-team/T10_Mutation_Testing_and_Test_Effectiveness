const { canRegister } = require('../src/equiv');

test('person aged exactly 18 can register', () => {
  expect(canRegister(18)).toBe(true);
});
