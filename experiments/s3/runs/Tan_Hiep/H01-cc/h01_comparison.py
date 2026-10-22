#!/usr/bin/env python3
"""Sinh dữ liệu S3-H01 (so sánh baseline/manual/AI, Cart & Orders) từ evidence có sẵn; không chạy run mới.

Dùng (từ experiments/s3/runs/Tan_Hiep):
  python H01-cc/h01_comparison.py -o H01-cc/h01_comparison.md
Đọc mutation.json và console.log của E01-1-cc, F01-2-cc, G01-2-cc. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement.
Chỉ đếm và liệt kê; không nhận định.
"""
import argparse
import json
import re

RUNS = ["E01-1-cc", "F01-2-cc", "G01-2-cc"]
TARGETS = [
    (286, 7, "ConditionalExpression", "false"),
    (292, 7, "ConditionalExpression", "true"),
    (326, 47, "ObjectLiteral", "{}"),
    (346, 45, "ObjectLiteral", "{}"),
    (532, 47, "ObjectLiteral", "{}"),
    (550, 11, "ConditionalExpression", "false"),
]
# 3 test manual ngoài 6 mutant mục tiêu (tên trong testFiles của F01-2-cc)
NON_TARGET_MANUAL = {
    "checkout DB": "POST /api/checkout - Verify successful order creation and DB pending status",
    "cancel pending": "Survivor 3: PUT /api/orders/:id/cancel - Verify pending order is cancelled and DB updated to canceled",
    "admin transition": "PUT /api/admin/orders/:id/status - Verify state transition rules and status update",
}


def load(run):
    with open(f"{run}/mutation.json", encoding="utf-8") as fh:
        d = json.load(fh)
    tests = {t["id"]: (name, t["name"]) for name, f in d["testFiles"].items() for t in f["tests"]}
    mutants = {}
    for f in d["files"].values():
        for m in f["mutants"]:
            s, e = m["location"]["start"], m["location"]["end"]
            key = (s["line"], s["column"], m["mutatorName"], m.get("replacement", ""), e["line"], e["column"])
            assert key not in mutants, key
            mutants[key] = m
    with open(f"{run}/console.log", encoding="utf-8", errors="replace") as fh:
        done = re.search(r"Done in (\d+) seconds", fh.read())
    per_file = {}
    for name, _ in tests.values():
        per_file[name] = per_file.get(name, 0) + 1
    return {"mutants": mutants, "tests": tests, "done": done.group(1) if done else "unknown", "per_file": per_file}


def cell(text):
    return re.sub(r"\s+", " ", str(text)).replace("|", "\\|").strip()


def short(tests, tid):
    f, n = tests.get(tid, ("?", tid))
    n = re.sub(r"^(Cart & Orders Manual Tests - Tấn Hiệp |AI — [^)]*\) )", "", n)
    return f"{n} (`{f.split('/')[-1]}`)"


def kb(m, tests):
    return "<br>".join(cell(short(tests, t)) for t in m.get("killedBy") or []) or "—"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    r = {run: load(run) for run in RUNS}
    e, f, g = (r[x]["mutants"] for x in RUNS)
    ft, gt = r["F01-2-cc"]["tests"], r["G01-2-cc"]["tests"]
    assert set(e) == set(f) == set(g)

    out = ["### S3-H01 — Comparison analysis", "",
           "Dữ liệu sinh bằng `experiments/s3/runs/Tan_Hiep/H01-cc/h01_comparison.py` từ `mutation.json` và `console.log` của E01-1-cc, F01-2-cc, G01-2-cc; "
           "không chạy run mới. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col là vị trí đầu. "
           "`killedBy` là test Stryker ghi trong `mutation.json`.", "",
           "**a. 6 mutant mục tiêu**", "",
           "| Mutant | E01-1-cc | F01-2-cc (killedBy) | G01-2-cc (killedBy) |", "|---|---|---|---|"]
    for t in TARGETS:
        k = [x for x in e if x[:4] == t]
        assert len(k) == 1, t
        k = k[0]
        out.append(f"| {t[0]}:{t[1]} {t[2]} → `{t[3]}` | {e[k]['status']} | {f[k]['status']} ({kb(f[k], ft)}) | {g[k]['status']} ({kb(g[k], gt)}) |")

    only_f = sorted(k for k in f if f[k]["status"] == "Killed" and g[k]["status"] != "Killed")
    groups = {}
    for k in only_f:
        for tid in f[k].get("killedBy") or ["—"]:
            groups.setdefault(tid, []).append(k)
    non_target_ids = {tid for tid, (_, n) in ft.items() if any(n.endswith(v) for v in NON_TARGET_MANUAL.values())}
    assert len(non_target_ids) == 3, non_target_ids
    exceptions = [k for k in only_f if not set(f[k].get("killedBy") or []) <= non_target_ids]

    out += ["", f"**b. {len(only_f)} mutant chỉ F01-2-cc kill** (Killed ở F01-2-cc, không Killed ở G01-2-cc), nhóm theo `killedBy` của F01-2-cc", "",
            "| Test đã kill (F01-2-cc) | Số mutant | Mutant (Line:Col Mutator → replacement; E01-1-cc / G01-2-cc) |", "|---|---|---|"]
    for tid, ks in sorted(groups.items(), key=lambda x: (-len(x[1]), short(ft, x[0]))):
        lst = "<br>".join(f"{k[0]}:{k[1]} {k[2]} → `{cell(k[3])}` ({e[k]['status']} / {g[k]['status']})" for k in ks)
        out.append(f"| {cell(short(ft, tid))} | {len(ks)} | {lst} |")
    out += ["", f"Kiểm: {len(only_f) - len(exceptions)}/{len(only_f)} mutant được kill bởi 3 test manual ngoài 6 mục tiêu (checkout DB, cancel pending, admin transition). "
            + ("Ngoại lệ:" if exceptions else "Không có ngoại lệ.")]
    if exceptions:
        out += ["", "| Mutant | killedBy (F01-2-cc) | E01-1-cc | G01-2-cc |", "|---|---|---|---|"]
        for k in exceptions:
            out.append(f"| {k[0]}:{k[1]} {k[2]} → `{cell(k[3])}` | {kb(f[k], ft)} | {e[k]['status']} | {g[k]['status']} |")

    out += ["", "**c. Metrics mỗi run**", "",
            "| Run | Tests (baseline + thêm) | Stryker `Done in` | Survived | NoCoverage | Score |", "|---|---|---|---|---|---|"]
    for run in RUNS:
        ms, pf = r[run]["mutants"], r[run]["per_file"]
        base = pf.get("test/cart-orders.test.js", 0)
        extra = sum(v for k2, v in pf.items() if k2 != "test/cart-orders.test.js")
        c = {s: sum(1 for m in ms.values() if m["status"] == s) for s in ("Killed", "Timeout", "Survived", "NoCoverage")}
        det = c["Killed"] + c["Timeout"]
        score = det / (det + c["Survived"] + c["NoCoverage"]) * 100
        out.append(f"| {run} | {base} + {extra} = {base + extra} | {r[run]['done']} s | {c['Survived']} | {c['NoCoverage']} | {score:.2f}% |")
    out += ["", "Mỗi run chạy 1 lần nên chưa đo flake rate. Tín hiệu: 4 mutant Killed ↔ Timeout giữa các run (xem Limits & Failure Modes).", "",
            "**Kết luận (Tấn Hiệp viết):** Pending"]

    with open(a.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out) + "\n")
    print("\n".join(out))


if __name__ == "__main__":
    main()
