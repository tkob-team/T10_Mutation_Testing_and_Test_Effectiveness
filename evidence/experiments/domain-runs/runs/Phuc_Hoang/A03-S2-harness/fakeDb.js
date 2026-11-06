// In-memory stand-in for ./database (sqlite) covering only the SQL used by auth routes.
// Sandbox-only harness: production server.js is not modified.
const state = { users: [] };

function reset(users) {
  state.users = users.map((u) => ({
    role: 'user', login_attempts: 0, locked_until: null, reset_token: null, ...u,
  }));
}

function get(sql, params, cb) {
  let row;
  if (sql === 'SELECT * FROM users WHERE email = ?') row = state.users.find((u) => u.email === params[0]);
  else if (sql === 'SELECT * FROM users WHERE id = ?') row = state.users.find((u) => u.id === params[0]);
  else return cb(new Error('fakeDb: unsupported get ' + sql));
  cb(null, row ? { ...row } : undefined);
}

function run(sql, params, cb) {
  const ctx = { changes: 0, lastID: undefined };
  const byId = (id) => state.users.find((u) => u.id === id);
  if (sql === 'UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = ?') {
    const u = byId(params[0]); if (u) { u.login_attempts = 0; u.locked_until = null; ctx.changes = 1; }
  } else if (sql === 'UPDATE users SET login_attempts = ?, locked_until = ? WHERE id = ?') {
    const u = byId(params[2]); if (u) { u.login_attempts = params[0]; u.locked_until = params[1]; ctx.changes = 1; }
  } else if (sql === 'UPDATE users SET reset_token = ? WHERE id = ?') {
    const u = byId(params[1]); if (u) { u.reset_token = params[0]; ctx.changes = 1; }
  } else if (sql === 'UPDATE users SET password = ?, reset_token = NULL WHERE email = ? AND reset_token = ?') {
    const u = state.users.find((x) => x.email === params[1] && x.reset_token === params[2]);
    if (u) { u.password = params[0]; u.reset_token = null; ctx.changes = 1; }
  } else {
    return cb && cb.call(ctx, new Error('fakeDb: unsupported run ' + sql));
  }
  if (cb) cb.call(ctx, null);
}

module.exports = { get, run, state, reset };
