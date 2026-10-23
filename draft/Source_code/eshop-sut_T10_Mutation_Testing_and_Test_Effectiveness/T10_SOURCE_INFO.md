# T10 Source Snapshot

This is the complete tracked source tree of eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness. The original repository layout and original README are retained, including backend, frontend-web, frontend-admin and frontend-mobile. Only this information file and T10_changes_from_upstream.patch have been added for submission.

## Source Versions

- Original EShop: https://github.com/ttbhanh/eshop-sut
- Original commit: 85af3ba875c88283615e22cb108f13e2fccaf0e9
- T10 repository: https://github.com/tkob-team/eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness
- Submitted main commit: 4b28756a1d2a59cb4b74300709122180056f9f55
- Source files are exported from that commit using canonical Git line endings.
- Git metadata, installed dependencies and generated output are excluded.

## Patch

T10_changes_from_upstream.patch is the complete binary-capable diff from the original EShop commit above to the submitted main commit. It records the added tests, harness, scripts and mutation configurations, plus dependency changes. The application's production files, database fixture, specifications and frontends are unchanged from the original EShop commit.

This source snapshot already includes the T10 changes. Apply the patch only to a clean original EShop checkout at 85af3ba875c88283615e22cb108f13e2fccaf0e9, from that checkout's root:

```sh
git -c core.autocrlf=false apply --check /path/to/T10_changes_from_upstream.patch
git -c core.autocrlf=false apply /path/to/T10_changes_from_upstream.patch
```

Replace /path/to with the actual path. The patch was applied to a separate original snapshot and its resulting file bytes were compared against every tracked file in the submitted commit.

## Backend Tests

Use Node.js 24.x. Packaging verification used Node.js 24.16.0 and npm 12.0.2 on Windows.

```sh
cd backend
npm ci
npm test
```

Expected default baseline: 88 passing tests. Existing package scripts and Jest/Stryker configs remain at their original repository paths. Refer to the existing setup_guide.md for the original application setup. Separate defect tests intentionally expose original defects and are not part of the passing baseline.

This is the main branch source snapshot. Cart manual/AI changes on separate branches have not been merged into this snapshot. Historical experiment results remain in the seminar documents repository and must be matched to the commit/branch used for each run.

Codex assembled the archive, patch and this information file. No application source, tests, configurations or existing scripts were rewritten for packaging. This packaging check does not replace member review or AI audit acceptance.
