const { calcCartTotal } = require('../src/cart');

describe('calcCartTotal – free-shipping boundary (500,000)', () => {
  test('subtotal exactly 500,000 → free shipping (requirement: "500,000 or more")', () => {
    // 250,000 × 2 = 500,000 → fee must NOT be added
    expect(calcCartTotal([{ price: 250000, quantity: 2 }], 30000)).toBe(500000);
    // mutant returns 530,000
  });

  test('subtotal reaches exactly 500,000 only after ignoring qty ≤ 0 items → free shipping', () => {
    const items = [
      { price: 300000, quantity: 1 },
      { price: 200000, quantity: 1 },
      { price: 999999, quantity: 0 },  // ignored per requirement
      { price: 100000, quantity: -1 }, // ignored per requirement
    ];
    expect(calcCartTotal(items, 30000)).toBe(500000);
    // mutant returns 530,000
  });
});

  test('subtotal 499,999 → shipping added (Claude optional)', () => {
    expect(calcCartTotal([{ price: 499999, quantity: 1 }], 30000)).toBe(529999);
  });