const { cartTotal, canRegister } = require('../src/equiv');

test('cart total is positive', () => {
  expect(cartTotal([{ price: 100, quantity: 2 }])).toBeGreaterThan(0);
});

test('adult can register', () => {
  expect(canRegister(30)).toBe(true);
});
