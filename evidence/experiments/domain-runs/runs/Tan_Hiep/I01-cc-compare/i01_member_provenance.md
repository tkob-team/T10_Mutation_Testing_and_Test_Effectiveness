# S3-I01 — Provenance for member runs I01-1/2/3

Sinh bởi Claude Code (claude-opus-5-5), 2026-10-23 11:05 (+07:00). **Không chạy lại Jest/Stryker.**

## I01-1 — EShop checkout (git reflog)

Nguồn: `I01-1/git-reflog.txt` (`git reflog --date=iso -20` trên EShop, lấy 2026-10-23 ~11:05).

| Reflog | Sự kiện |
|---|---|
| `HEAD@{2026-10-23 10:26:57 +0700}` checkout s3/G01-ai → 806ba19 | I01-1-cc (Claude Code) |
| `HEAD@{2026-10-23 10:29:21 +0700}` checkout 806ba19 → s3/G01-ai | kết thúc I01-1-cc |
| `HEAD@{2026-10-23 10:42:08 +0700}` checkout s3/G01-ai → 806ba19 | bắt đầu cửa sổ I01-1 |
| `HEAD@{2026-10-23 10:56:05 +0700}` checkout 806ba19 → s3/G01-ai | kết thúc cửa sổ I01-1 |

Timestamp I01-1:

- `I01-1/mutation.json` mtime `2026-10-23 10:56:05.015 +0700`; byte-identical với `eshop-sut_.../backend/reports/coupons/mutation.json` (cùng mtime); `projectRoot` trong JSON: `...\eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness\backend`.
- `I01-1/console.log`: Stryker bắt đầu `10:54:17`, report ghi `10:56:05`, `Done in 1 minute and 47 seconds`.

Kết luận theo sự kiện: lần ghi report I01-1 (10:54:17–10:56:05) nằm trong cửa sổ HEAD = `806ba19` (10:42:08–10:56:05). Reflog có độ phân giải giây; report và checkout ngược cùng giây 10:56:05.

## I01-2 / I01-3 — runtime `Repo/_tmp/I01-coupons/backend`

**Hash lấy sau khi chạy** (2026-10-23 ~11:05, sau I01-2 10:56–10:58 và I01-3 11:00–11:02), không phải snapshot trước run. Overlay do Claude Code chép lúc 10:29:27 (I01-2-cc), mtime không đổi từ đó. Chuẩn hóa: CRLF → LF trước khi so. Script: `I01-cc-compare/i01_member_provenance.py`.

| File | mtime (runtime) | SHA-256 runtime (raw) | SHA-256 runtime (LF) | Reference | SHA-256 reference (LF) | LF match |
|---|---|---|---|---|---|---|
| `server.js` | 2026-10-23 02:45:15 | `e2263811a1690a63a7dbb4446c3fd33fb87f50d073d9f8cdfab7083a52f5e8ed` | `47573ce5a6bf9a894748d2bb56cc8d1659ad7acd033fdd6db6b3e4d9473eb487` | `git show 806ba19:backend/server.js` | `47573ce5a6bf9a894748d2bb56cc8d1659ad7acd033fdd6db6b3e4d9473eb487` | yes |
| `database.js` | 2026-10-23 02:45:15 | `50012f35c2cf0776dd837482d76adf701f0ee40cdcb9d80143278fccde034717` | `3366420632bb9c982905b22e3969f69515e39e7a37a4f84eba56ead7e94afed8` | `git show 806ba19:backend/database.js` | `3366420632bb9c982905b22e3969f69515e39e7a37a4f84eba56ead7e94afed8` | yes |
| `package-lock.json` | 2026-10-23 02:45:15 | `bbe5845d320b318bb2fd9d4f4c2826d6ca5c69fa417766e45886a41dd5f9da09` | `10dc5c6dd2c51e08d8caf7e7425eb0918e97420519e436e5590831640fec3373` | `git show 806ba19:backend/package-lock.json` | `10dc5c6dd2c51e08d8caf7e7425eb0918e97420519e436e5590831640fec3373` | yes |
| `test/manual/coupons.manual.js` | 2026-10-23 10:29:27 | `9a8aa34946ea904e77fbfc72af703757397359e29355fa97369835b2a440f86f` | `4079c78a3217b2a976459959f591b9b731b9183c9302e150502fd3d4178402ce` | `sources/backend/test/manual/coupons.manual.js` | `4079c78a3217b2a976459959f591b9b731b9183c9302e150502fd3d4178402ce` | yes |
| `test/ai/coupons.ai.js` | 2026-10-23 10:29:27 | `7311a1a039f9d65b6cee5b68613b19b098c6ea63c8f449855a872b8cb52dc522` | `d81d009575e58558605c2aefbfc563aae144536753892412aaef1a0cb901629e` | `sources/backend/test/ai/coupons.ai.js` | `d81d009575e58558605c2aefbfc563aae144536753892412aaef1a0cb901629e` | yes |
| `test/helpers/coupons-scenarios.js` | 2026-10-23 10:29:27 | `f89e2d4318b969d72be5902e2c318b08ff85e72aa6068b65f744b92ffb5ddc82` | `31580ac123cb75f12b6d097f0d5d6adeb7cf66ec08142a0698a5b17b5c68bb95` | `sources/backend/test/helpers/coupons-scenarios.js` | `31580ac123cb75f12b6d097f0d5d6adeb7cf66ec08142a0698a5b17b5c68bb95` | yes |
| `jest.coupons.manual.config.cjs` | 2026-10-23 10:29:27 | `155f7a56c2fb6c08af33d7ce5d10be9813709afc1fbbea194f6fd351f9a5a29b` | `4de7dd29e6591e85bcad46ae648ff6fd1983ca6afeeabe092be160d1367bf656` | `sources/backend/jest.coupons.manual.config.cjs` | `4de7dd29e6591e85bcad46ae648ff6fd1983ca6afeeabe092be160d1367bf656` | yes |
| `jest.coupons.ai.config.cjs` | 2026-10-23 10:29:27 | `5f960d3b990e61c89c70c8bb433c8f88af592f32adf977b4a2bdac3d39a28135` | `99ea3371b4e4c99e621c2dec157347fbb1c5758298156beb82c6e32d174bddf0` | `sources/backend/jest.coupons.ai.config.cjs` | `99ea3371b4e4c99e621c2dec157347fbb1c5758298156beb82c6e32d174bddf0` | yes |
| `stryker.coupons.manual.config.json` | 2026-10-23 10:29:27 | `65ef66f70c6e17b6912ada968afd34741da3b23563c3ef3d97909caf1315d6b0` | `becee1c28df587461cc486cecbd27f68e2d85942a502823ed12cdd23d0afd705` | `sources/backend/stryker.coupons.manual.config.json` | `becee1c28df587461cc486cecbd27f68e2d85942a502823ed12cdd23d0afd705` | yes |
| `stryker.coupons.ai.config.json` | 2026-10-23 10:29:27 | `b1e231b2fbf2c96b13cebebcb08c75715a2d20dd6455ef542cc58603f185a809` | `51199878781c2262fd5ffaa9af02ff373eb7e27e0dfdb035c6ce8791d88ba660` | `sources/backend/stryker.coupons.ai.config.json` | `51199878781c2262fd5ffaa9af02ff373eb7e27e0dfdb035c6ce8791d88ba660` | yes |

10/10 file khớp sau chuẩn hóa. Raw hash 7 file overlay trùng hash Claude Code ghi lúc overlay (10:29, xem I01-2-cc). Không kiểm `node_modules`, `database.sqlite` hay file khác trong archive.
