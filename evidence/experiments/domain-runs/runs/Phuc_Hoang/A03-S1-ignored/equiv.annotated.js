// A03 sandbox: small functions used to illustrate equivalent vs killable survivors.

// E1: sum of line totals; items with quantity 0 contribute nothing either way.
function cartTotal(items) {
  // Stryker disable next-line ConditionalExpression: E2 equivalent candidate, loop over [] already returns 0
  if (items.length === 0) return 0; // E2: redundant guard (loop already yields 0)
  let total = 0;
  for (const item of items) {
    // Stryker disable next-line EqualityOperator: E1 equivalent candidate, quantity 0 adds price*0 = 0 for finite price
    if (item.quantity > 0) {
      total += item.price * item.quantity;
    }
  }
  return total;
}

// B1: age boundary; looks harmless, but >= vs > differs at exactly 18.
function canRegister(age) {
  return age >= 18;
}

module.exports = { cartTotal, canRegister };
