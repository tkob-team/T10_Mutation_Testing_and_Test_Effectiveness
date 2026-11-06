#!/usr/bin/env python3
"""Nhóm mutant trong mutation.json theo route của server.js (S3-E01, Cart & Orders).

Dùng: python mutants_by_route.py mutation.json -o mutants_by_route.md
Chỉ đếm và liệt kê; không phân tích lý do survive (thuộc S3-F01).
"""
import argparse
import json
import re

# Line ranges theo SUT commit 8d60e9b (nhánh s3/D01-cart-orders), do Tấn Hiệp chốt cho S3-E01.
ROUTES = [
    ("GET /api/cart", 284, 288),
    ("POST /api/cart", 290, 295),
    ("POST /api/checkout", 297, 309),
    ("GET /api/my-orders", 311, 319),
    ("PUT /api/orders/:id/cancel", 321, 342),
    ("GET /api/orders/:id", 344, 349),
    ("GET /api/admin/orders", 510, 523),
    ("PUT /api/admin/orders/:id/status", 525, 568),
]
STATUSES = ["Killed", "Timeout", "Survived", "NoCoverage", "RuntimeError", "CompileError", "Ignored"]
LISTED = ["Survived", "NoCoverage", "Timeout", "RuntimeError"]


def route_of(line):
    for name, lo, hi in ROUTES:
        if lo <= line <= hi:
            return name
    return "Outside listed routes"


def cell(text):
    return re.sub(r"\s+", " ", text).replace("|", "\\|").strip()


def short_test(name):
    m = re.search(r"\bCO-\d+.*", name)
    return m.group(0) if m else name


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("report")
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()

    with open(a.report, encoding="utf-8") as fh:
        d = json.load(fh)
    tests = {t["id"]: t["name"] for f in d["testFiles"].values() for t in f["tests"]}
    mutants = [m for f in d["files"].values() for m in f["mutants"]]
    order = [r[0] for r in ROUTES] + ["Outside listed routes"]
    groups = {name: [] for name in order}
    for m in mutants:
        groups[route_of(m["location"]["start"]["line"])].append(m)

    def counts(ms):
        return {s: sum(1 for m in ms if m["status"] == s) for s in STATUSES}

    def score(c):
        detected = c["Killed"] + c["Timeout"]
        valid = detected + c["Survived"] + c["NoCoverage"]
        return f"{detected / valid * 100:.2f}" if valid else "n/a"

    out = [
        "# E01-1-cc — Mutants by Route",
        "",
        "Baseline domain Cart & Orders, trước D04. Sinh tự động bằng `mutants_by_route.py` từ `mutation.json` của run này; không sửa tay.",
        "Chỉ đếm và liệt kê; lý do survive thuộc S3-F01.",
        "",
        "Score = Detected / Valid × 100, Detected = Killed + Timeout, Valid = Detected + Survived + NoCoverage.",
        "",
        "## Status by Route",
        "",
        "| Route | Lines | Total | " + " | ".join(STATUSES) + " | Score |",
        "|---|---|---|" + "---|" * len(STATUSES) + "---|",
    ]
    spans = {r[0]: f"{r[1]}–{r[2]}" for r in ROUTES}
    for name in order:
        ms = groups[name]
        if name == "Outside listed routes" and not ms:
            continue
        c = counts(ms)
        out.append(f"| {name} | {spans.get(name, '—')} | {len(ms)} | " + " | ".join(str(c[s]) for s in STATUSES) + f" | {score(c)} |")
    c = counts(mutants)
    out.append(f"| **All** | | **{len(mutants)}** | " + " | ".join(f"**{c[s]}**" for s in STATUSES) + f" | **{score(c)}** |")
    out.append("")

    out += ["## Non-killed Mutants", "", "Survived, NoCoverage, Timeout, RuntimeError. `coveredBy` ghi mã test (CO-xx) theo tên trong `testFiles`.", ""]
    for name in order:
        ms = sorted((m for m in groups[name] if m["status"] in LISTED),
                    key=lambda m: (LISTED.index(m["status"]), m["location"]["start"]["line"], m["location"]["start"]["column"]))
        if not ms:
            continue
        out += [f"### {name}", "", "| Status | Line:Col | Mutator | Replacement | coveredBy |", "|---|---|---|---|---|"]
        for m in ms:
            loc = m["location"]["start"]
            cov = "; ".join(short_test(tests.get(t, t)) for t in m.get("coveredBy") or []) or "—"
            out.append(f"| {m['status']} | {loc['line']}:{loc['column']} | {m['mutatorName']} | `{cell(m.get('replacement', ''))}` | {cell(cov)} |")
        out.append("")

    with open(a.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out))
    print(f"Wrote {a.out}: {len(mutants)} mutants; " + ", ".join(f"{s} {c[s]}" for s in STATUSES) + f"; score {score(c)}")


if __name__ == "__main__":
    main()
