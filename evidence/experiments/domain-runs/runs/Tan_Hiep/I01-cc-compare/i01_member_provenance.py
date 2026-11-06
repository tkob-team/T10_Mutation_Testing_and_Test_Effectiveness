#!/usr/bin/env python3
"""S3-I01: SHA-256 runtime _tmp/I01-coupons/backend so với 806ba19 và sources/backend của Hòa (chuẩn hóa CRLF→LF). In bảng Markdown.

Dùng (từ Repo): python -I <this> _tmp/I01-coupons/backend eshop-sut_T10_Mutation_Testing_and_Test_Effectiveness T10_Mutation_Testing_and_Test_Effectiveness/experiments/s3/runs/Thai_Hoa/Coupons-extensions-2026-10-23-agent/sources/backend
"""
import hashlib, subprocess, sys, os, datetime
rt, eshop, src = sys.argv[1:4]
files = ["server.js", "database.js", "package-lock.json"]
overlay = ["test/manual/coupons.manual.js", "test/ai/coupons.ai.js", "test/helpers/coupons-scenarios.js",
           "jest.coupons.manual.config.cjs", "jest.coupons.ai.config.cjs",
           "stryker.coupons.manual.config.json", "stryker.coupons.ai.config.json"]
h = lambda b: hashlib.sha256(b).hexdigest()
n = lambda b: b.replace(b"\r\n", b"\n")
print("| File | mtime (runtime) | SHA-256 runtime (raw) | SHA-256 runtime (LF) | Reference | SHA-256 reference (LF) | LF match |")
print("|---|---|---|---|---|---|---|")
for f in files + overlay:
    b = open(os.path.join(rt, f), "rb").read()
    mt = datetime.datetime.fromtimestamp(os.path.getmtime(os.path.join(rt, f))).strftime("%Y-%m-%d %H:%M:%S")
    if f in files:
        ref = subprocess.run(["git", "-C", eshop, "show", f"806ba19:backend/{f}"], capture_output=True, check=True).stdout
        rn = f"`git show 806ba19:backend/{f}`"
    else:
        ref = open(os.path.join(src, f), "rb").read()
        rn = f"`sources/backend/{f}`"
    print(f"| `{f}` | {mt} | `{h(b)}` | `{h(n(b))}` | {rn} | `{h(n(ref))}` | {'yes' if n(b) == n(ref) else 'NO'} |")
