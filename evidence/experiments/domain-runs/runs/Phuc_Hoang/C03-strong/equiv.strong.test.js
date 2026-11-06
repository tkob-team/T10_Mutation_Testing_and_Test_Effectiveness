const { cartTotal, canRegister } = require('../src/equiv');

test('cart total sums price x quantity exactly', () => {
  expect(cartTotal([{ price: 100, quantity: 2 }, { price: 50, quantity: 1 }])).toBe(250);
});

test('empty cart totals 0', () => {
  expect(cartTotal([])).toBe(0);
});

test('items with non-positive quantity are skipped', () => {
  expect(cartTotal([{ price: 100, quantity: -1 }, { price: 40, quantity: 1 }])).toBe(40);
  expect(cartTotal([{ price: 100, quantity: 0 }])).toBe(0);
});

test('registration age boundary is exactly 18', () => {
  expect(canRegister(17)).toBe(false);
  expect(canRegister(18)).toBe(true);
  expect(canRegister(30)).toBe(true);
});
