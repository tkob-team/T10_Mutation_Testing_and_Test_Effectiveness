# Pending Team Sheet Update

**Attempt:** 2026-10-23, Google Sheets connector, no computer use. The batch was rejected with **403 PERMISSION_DENIED / The caller does not have permission**. Readback confirms no successful change. Do not claim the live Sheet is synchronized.

[Target Sheet](https://docs.google.com/spreadsheets/d/1vuIXJeVhuoKQu8Gw4cHN__d09kIcB4K-hccIz27DxKc/edit), tab `S3 - Experiments`. Existing validation was read: Backlog, Ready, In Progress, Review, Done, Blocked; checklist Pending/Checked. Requests modify values only, preserving ownership, IDs, formats, formulas, validation and original Notes text.

| Row / ID | Live status at readback | Prepared status / evidence |
|---|---|---|
| 15 C02 | Done | Keep Done; add Agent official-doc-guided adaptation/toy evidence, member verification remains separate |
| 18 D02 | Done | Keep Done; 26 Coupons/flow pass, 22 separate defect assertion failures |
| 20 D04 | Done | Keep Done; frozen `806ba19`, 88 pass / 54 separate failures, hashes/provenance |
| 22 E02 | In Progress | Review; full 120-mutant Coupons baseline, reports/commands |
| 25 F02 | In Progress | Review; AI-assisted spec draft, 29 pass / 2 new assertion kills; human review Pending |
| 28 G02 | In Progress | Review; same-context Codex explicitly authorized, 28 pass / 2 new kills, raw/executed SHA match |
| 31 H02 | In Progress | Review; 120 matching signatures, 52.17%→53.91% for both conditions, limitations and five failure modes |
| 34 I02 | In Progress | Keep In Progress; Auth baseline reproduced, missing F03/G03/H03 inputs |
| 39–43 CHK01–05 | Pending | Technical evidence prepared for Checked; see review and cross-reproduction notes |
| 44 CHK06 | Pending | Keep Pending; Agent evidence does not stand in for all members' self-runs |

[Prepared exact batch payload and changes](Sheet_Update_Pending_2026-10-23.json). It has **not** been applied. Before retrying with an editor account, reread live target cells and named validation values; preserve any newer user changes rather than blindly replaying stale data.
