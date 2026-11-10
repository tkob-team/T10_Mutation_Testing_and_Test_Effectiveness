# Traps (observed examples)

These were observed in one project (Express + SQLite API, Jest, Windows 11 and macOS, StrykerJS 10). They are examples to check against, not universal rules; verify the cause in your own setup.

- **Shared state** (file-based DB, global in-memory cart): tests interfered until each test used an isolated in-memory DB or reset state. Restore any tracked data file a run changed.
- **Server starts on import** (`app.listen` at module level, no export): isolated in a test setup file (capture `app`, make `listen` a no-op) instead of editing production code.
- **Removed `res.json` or emptied handler**: the request never answered, so the mutant became Timeout, not an assertion kill.
- **`StringLiteral` emptying a SQL string**: crashed native DB bindings, giving RuntimeError; counts varied between runs.
- **Worker crashes** (`ChildProcessCrashedError`, exit code 3221225477 on Windows): 4 to 14 warnings per run in our ranges, and the run still finished. Our hypothesis (unverified): native SQLite crash on some mutants. Read statuses from `mutation.json`; do not count warnings.
- **`No tests were found`** on Windows with the default sandbox `.stryker-tmp`: setting `"tempDirName": "stryker-tmp"` helped; root cause not established.
- **Dry run test count differs from Jest** (e.g. double) with multi-project Jest configs: an inline `"projects": []` in the Jest config used by Stryker fixed it for us.
- **PowerShell blocks `npx.ps1`/`npm.ps1`**: use `npx.cmd`/`npm.cmd`; use `curl.exe` instead of the `curl` alias.
- **`npm run x -- --flag`** lost the flag through the `npm.ps1` shim: call `npx stryker run <config> --flag` directly.
- **`git apply` inside a subfolder** silently skipped a patch whose paths were relative to that subfolder. Apply from the repo root (`git -C <root> apply`) and check `git diff --stat`.
- **HTML opened too early** showed the previous run; `mutation.json` is the source of truth.
- StrykerJS has no mutator that changes numeric constants; check the official mutator list before trusting an explanation that relies on one.
- Do not recursively delete the sandbox folder by hand; it may link to the real `node_modules`.
