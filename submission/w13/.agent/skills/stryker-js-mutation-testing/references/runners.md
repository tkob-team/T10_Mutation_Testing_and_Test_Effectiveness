# Test runners and checkers

Only the Jest setup was run by the authors. The Vitest, Mocha and TypeScript checker sections follow the official docs and were **not run** by us; verify option names at https://stryker-mutator.io/docs/stryker-js/ for your version.

## Jest (verified)

```json
{ "testRunner": "jest", "coverageAnalysis": "perTest",
  "jest": { "configFile": "jest.stryker.config.cjs" } }
```

- Select tests explicitly (`testMatch` in that config). With Jest `projects` in `package.json`, add `"projects": []` so Stryker does not load every project.
- `perTest` needs the default jest-circus runner.

## Vitest (not run)

`npm i -D @stryker-mutator/vitest-runner`

```json
{ "testRunner": "vitest", "vitest": { "configFile": "vitest.config.ts" } }
```

- The docs describe the Vitest runner as always using per-test coverage; check the current docs for supported options.

## Mocha (not run)

`npm i -D @stryker-mutator/mocha-runner`

```json
{ "testRunner": "mocha", "coverageAnalysis": "perTest",
  "mochaOptions": { "spec": ["test/**/*.spec.js"] } }
```

## TypeScript checker (not run)

`npm i -D @stryker-mutator/typescript-checker`

```json
{ "checkers": ["typescript"], "tsconfigFile": "tsconfig.json" }
```

- Mutants that fail type checking are reported as CompileError and excluded from the score, instead of costing test time.

## Generic command runner

`"testRunner": "command", "commandRunner": { "command": "npm test" }` works with any test command but has no coverage analysis, so every test runs for every mutant (slow).
