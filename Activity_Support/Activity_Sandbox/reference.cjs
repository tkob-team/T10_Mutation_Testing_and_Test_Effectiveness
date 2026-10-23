module.exports = {
  K1: ({ empty }) => expect(empty.body).toEqual([]),
  K2: ({ cart, itemA, itemB }) => expect(cart.body).toEqual([itemA, itemB]),
  K3: ({ reread, itemA, itemB }) => expect(reread.body).toEqual([itemA, itemB]),
  K4: ({ history, ownId }) => expect(history.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: ownId })])),
  K5: ({ canceled }) => expect(canceled.status).toBe('canceled'),
};
