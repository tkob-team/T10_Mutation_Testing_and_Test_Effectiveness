# EShop Mutation Testing with StrykerJS and an AI Agent

**Stage:** S4. **Submission:** English User Guide. **Requirements:** REQ-08–09,11,17–18,31.  
**Draft status:** Written workflow; installation commands, screenshots and actual outputs await member validation.

## 1. Introduction

This guide helps you examine whether a test observes the business behavior changed by a mutant. You will read a baseline report, identify a missing observation, compare a manual assertion with a reviewed AI Agent candidate, and explain the outcome. Examples concern Cart & Orders, Coupons, and Authentication & Users.

You need the selected SUT revision, its specification, a working test harness and the accepted experiment package. The report supplies theory; this guide turns verified member operations into reproducible steps.

## 2. Installation

### Required Package

| Item | Purpose | Check |
|---|---|---|
| Commit and source patch | Identify tested production code | Match the completed manifest |
| Lockfile and runtime versions | Reproduce environment | Compare package/version records |
| Runner and mutation config | Select tests and production scope | Inspect effective config and initial run |
| Fixtures/reset | Repeat requests with defined state | Original tests pass with fresh data |
| AI Agent/model access | Produce an actual candidate | Record the successful member workflow |

### Read-only Inventory

```powershell
# Run in the component identified in the manifest.
node --version
npm --version
git rev-parse --show-toplevel
git rev-parse HEAD
git status --short
Get-Content -LiteralPath package.json
```

Inspect current scripts before copying a test/mutation command. Exact dependency, test and mutation invocations will be integrated from accepted logs. A placeholder script is not a working test harness.

### Reference Setup Recipe

The following commands are documentation recipes, not operations executed for this draft. Apply them only to a disposable or approved member test workspace. The inspected database module drops/recreates tables when loaded and writes a fixed database file; ordinary server startup is therefore not a harmless reset of a shared working database.

For a received package with an accepted lockfile, restore its dependencies rather than reselecting versions:

```powershell
# In the accepted backend package, after inspecting the lockfile.
npm ci
npm ls --depth=0
```

For a new harness setup, the official initializer is a reference starting point:

```powershell
# New isolated setup only; this changes dependencies/configuration.
npm init stryker@latest
```

Select the runner actually used by the member. A Jest package needs compatible Jest, Stryker core and Jest-runner dependencies. Inspect the resulting lockfile and package peer requirements, then record resolved versions. Do not rerun initialization over a frozen accepted comparison package.

### Reference Configuration

This small configuration shows the integration shape for the inspected monolithic backend. It requires real member tests and an accepted application/data-isolation seam; it is not a claim that those exist in the current checkout. The final manifest selects the accepted files.

```javascript
// stryker.config.mjs — reference configuration, not executed here.
export default {
  mutate: ['server.js'],
  testRunner: 'jest',
  jest: { configFile: 'jest.config.cjs' },
  reporters: ['html', 'json', 'clear-text'],
  inPlace: false,
  incremental: false
};
```

```javascript
// jest.config.cjs — discovery example, not a test suite.
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.stryker-tmp/']
};
```

Keep assertions/test files outside the production mutation scope. A broader or narrower scope changes the compared population and must be agreed before baseline freeze. A different module layout needs a different accepted scope rather than blindly copying this example. The temp-directory ignore is anchored to the active root: a broad absolute-path match for any Stryker temp directory can accidentally exclude the current sandbox's own tests. Verify discovery inside the accepted mutation initial run.

### Command Sequence After Handoff Acceptance

```powershell
# Reference sequence in the accepted Jest-based backend package.
# These commands require the real member suite; they have not been run here.
.\node_modules\.bin\jest.cmd --listTests
.\node_modules\.bin\jest.cmd --runInBand
.\node_modules\.bin\stryker.cmd run --dryRunOnly --concurrency 1
.\node_modules\.bin\stryker.cmd run --concurrency 1
```

The Windows local binaries avoid relying on a global installation. Use the package's accepted invocation on other systems. Test discovery, original execution, initial mutation setup and actual mutant execution are separate checks. Archive the raw output and reports under a unique member/run ID before switching arms; preserve production/configuration and change only the intended test additions.

### Installation Evidence to Add

Supply OS/runtime/tool versions, installation output, test invocation/result/count, config path, reset verification and a real working-environment screenshot. Add the screenshot link only after the evidence file exists.

## 3. First Test

### 3.1. Define the Business Expectation

Choose an accepted case. Read the specification and record input, preconditions, expected response and persisted state. Resolve documented code/spec disagreements before treating the expectation as an oracle.

### 3.2. Run Original Tests

Use the manifest command and reset policy. Confirm discovery and a passing original suite on frozen production code. A server starting successfully does not show that tests were discovered.

### 3.3. Inspect a Baseline Mutant

Locate source file, mutant change, state and associated tests in the report. Explain the business effect before writing an assertion. Retain the report/mutant identifiers.

### 3.4. Write a Distinguishing Observation

Select input that separates original and mutated behavior. A member writes the manual assertion from the reviewed expectation. Agent-generated assertions retain AI provenance.

An illustrative rule `amount >= minimum` differs from `amount > minimum` at equality. This teaches boundary selection; it is not evidence of the actual EShop rule or a successful run.

### 3.5. Request an AI Agent Candidate

Start again from baseline tests. Provide the same oracle, mutant and relevant original code. Keep the manual solution outside the prompt. Ask for the distinguishing input and observation.

### 3.6. Review and Verify

Check API/field/helper names, oracle and fixtures. Preserve raw output; record accepted/edited/rejected with reasons. Run against original code first, then mutation. Inspect the failed assertion to establish that it detects the intended change.

### 3.7. Record Results

| Field | Entry required |
|---|---|
| Case/domain/spec | Accepted case and expectation source |
| Inputs | Production/config/test revision and fixture state |
| Mutant | Report ID, source change |
| Manual | Member assertion, actual outcome/report |
| AI | Actual agent/model, raw candidate, human edits, outcome/report |
| Explanation | Detection mechanism or reason for remaining survivor |

Exact commands, expected terminal output and actual report links await member handoff.

## 4. Advanced Usage

### Independent Comparison

Use the same production/configuration baseline and aligned mutant set. Rerun affected arms if inputs change. The final common score comes from a common run, not averaged domain percentages.

### Reusable Prompt

```text
Task: propose assertions for the selected EShop mutant.
Specification/oracle: <reviewed case and expected behavior>
Production: <commit and relevant baseline code>
Original tests: <baseline tests only>
Mutant: <report ID and exact changed code>
Fixtures/constraints: <helpers, reset and allowed scope>
Return: candidate, distinguishing input, explanation, assumptions,
and verification checks. Keep production code unchanged.
```

This is a prompt template, not a transcript. Record the actual tool/agent/model for each use.

### Data-driven Tests and Checkpoints

Use reviewed inputs below/at/above a meaningful boundary where appropriate. Observe both response and persisted effects. Record & Playback can be omitted/replaced under the current preparation decision; the demo matrix explains the mapping.

## 5. Troubleshooting

| Symptom | Investigation | Evidence required for a verified fix |
|---|---|---|
| Script exits without tests | Scripts, runner and discovery paths | Original-run log/test count |
| Mutation initial run misses suite | Sandbox paths, globs and exclusions | Effective config/passing initial run |
| Test depends on previous case | DB isolation/reset/shared state | Fresh-state reproduction |
| AI invents a helper/field | Actual API and test framework | Raw candidate, edit, passing original test |
| Member reports disagree | Source/config/test inputs | Compatible manifests and rerun |

These are diagnostic procedures. Actual incidents/fixes and outputs will be integrated from member evidence. A historical setup fix does not establish the current checkout's configuration.

## 6. Failure Modes

1. **Execution without an oracle:** trace the expected outcome to an assertion.
2. **Misreading score changes:** compare scope and raw states before attributing improvement.
3. **AI expectations follow implementation:** derive business behavior independently.
4. **Fixture-driven failures:** inspect failure causes and repeat with isolated state.
5. **Unsupported equivalence:** seek distinguishing inputs and retain candidates with stated assumptions.

## 7. Member Walkthroughs

| Domain | Author | Evidence to integrate |
|---|---|---|
| Cart & Orders | Tấn Hiệp | Original/manual/AI commands; cart/order observations |
| Coupons | Thái Hòa | Boundary/discount cases; fixtures; three-arm reports |
| Authentication & Users | Phúc Hoàng | Access/user cases; token/reset; three-arm reports |

Populate these sections after documentation preparation. Each member separately performs their own real terminal/IDE demo.

### Domain Walkthrough Contracts

**Cart & Orders:** obtain a valid test identity; establish an isolated cart/order state; perform the selected cart or order action; observe response and subsequent order/history state. For cancellation, document the initial status and allowed transition. Reset fixtures before replaying the mutant. Do not derive the business transition policy solely from an implementation comment.

**Coupons:** supply a known active coupon and explicit amount/user state; decide minimum-boundary semantics, percent units/rounding and expiry clock; observe both discount and final amount. Use a valid fixed-discount case to separate general arithmetic reasoning from an unresolved percentage defect. Applying a coupon and persisting coupon usage are distinct operations in the inspected source and must be reset/observed accordingly.

**Authentication & Users:** use test accounts/tokens belonging to the accepted fixtures. Separate absent token, invalid token and valid access cases. For profile updates, inspect persisted fields rather than only the success message. Reset attempts/token/role state where selected behavior depends on it. Never include real credentials or signing secrets in the AI prompt.

### Troubleshooting Decision Order

When a command fails, first establish whether it is dependency/discovery, original-test failure, mutation setup, or an actual mutant outcome. A missing test suite is not a survivor; an original failing test invalidates the comparison; an environment error needs a fixture/harness fix. Retain the actual error and changed configuration, then repeat the affected checks. A dry run is useful setup evidence but does not execute active mutants.

## 8. References

- [Official getting started](https://stryker-mutator.io/docs/stryker-js/getting-started/).
- [Jest Runner and peer dependencies](https://stryker-mutator.io/docs/stryker-js/jest-runner/).
- [Jest test-path exclusions](https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring).
- [Supported mutators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/).

- [T10 Brief](../docs/requirements/03_T10_Mutation_Testing_and_Test_Effectiveness_Description.md).
- [Stryker metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/).
- [Stryker configuration](https://stryker-mutator.io/docs/stryker-js/configuration/).
- [EShop specification](../../eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness/api_specification.md).
- [Manifest](Baseline_Manifest.md), [Comparison](Overall_Comparison.md), [Report](Seminar_Report.md).
