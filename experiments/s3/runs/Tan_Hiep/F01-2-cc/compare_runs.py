#!/usr/bin/env python3
"""So sánh mutation.json của E01-1-cc, F01-1 và F01-2-cc (S3-F01, Cart & Orders).

Dùng: python compare_runs.py <E01 mutation.json> <F01-1 mutation.json> <F01-2 mutation.json> -o compare_runs.md
Mutant được nhận diện bằng vị trí đầu–cuối (line:column) + mutatorName + replacement (id có thể đổi giữa các run).
"""
import argparse
import json
import re

STATUSES = ["Killed", "Timeout", "Survived", "NoCoverage", "RuntimeError", "CompileError", "Ignored"]
# 6 mutant đã chọn ở bảng Survivors (Experiment Log): (line, column, mutator, replacement)
TARGETS = [
    (286, 7, "ConditionalExpression", "false"),
    (292, 7, "ConditionalExpression", "true"),
    (326, 47, "ObjectLiteral", "{}"),
    (346, 45, "ObjectLiteral", "{}"),
    (532, 47, "ObjectLiteral", "{}"),
    (550, 11, "ConditionalExpression", "false"),
]


def load(path):
    with open(path, encoding="utf-8") as fh:
        d = json.load(fh)
    tests = {t["id"]: (name, t["name"]) for name, f in d["testFiles"].items() for t in f["tests"]}
    mutants = {}
    for f in d["files"].values():
        for m in f["mutants"]:
            s, e = m["location"]["start"], m["location"]["end"]
            key = (s["line"], s["column"], m["mutatorName"], m.get("replacement", ""), e["line"], e["column"])
            assert key not in mutants, key
            mutants[key] = m
    return mutants, tests


def counts(mutants):
    c = {s: sum(1 for m in mutants.values() if m["status"] == s) for s in STATUSES}
    det = c["Killed"] + c["Timeout"]
    valid = det + c["Survived"] + c["NoCoverage"]
    c["Total"] = len(mutants)
    c["Score"] = f"{det / valid * 100:.2f}" if valid else "n/a"
    c["Covered"] = f"{det / (det + c['Survived']) * 100:.2f}" if det + c["Survived"] else "n/a"
    return c


def cell(text):
    return re.sub(r"\s+", " ", str(text)).replace("|", "\\|").strip()


def tname(tests, tid):
    f, n = tests.get(tid, ("?", tid))
    return f"{n} (`{f.split('/')[-1]}`)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("e01")
    ap.add_argument("f011")
    ap.add_argument("f012")
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    runs = [("E01-1-cc", *load(a.e01)), ("F01-1", *load(a.f011)), ("F01-2-cc", *load(a.f012))]
    keys = [set(r[1]) for r in runs]

    out = ["# F01-2-cc — Comparison with E01-1-cc and F01-1", "",
           "Sinh tự động bằng `compare_runs.py`; không sửa tay. Mutant nhận diện bằng vị trí đầu–cuối + mutator + replacement; Line:Col trong bảng là vị trí đầu.",
           "Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage) × 100; Covered = (Killed + Timeout) / (Killed + Timeout + Survived) × 100.", "",
           "## Status Counts", "",
           "| Run | Total | " + " | ".join(STATUSES) + " | Score | Covered |",
           "|---|---|" + "---|" * len(STATUSES) + "---|---|"]
    for name, ms, _ in runs:
        c = counts(ms)
        out.append(f"| {name} | {c['Total']} | " + " | ".join(str(c[s]) for s in STATUSES) + f" | {c['Score']} | {c['Covered']} |")
    same = keys[0] == keys[1] == keys[2]
    out += ["", f"Cùng tập mutant ở cả 3 run: {'có' if same else 'KHÔNG'} ({len(keys[0])} / {len(keys[1])} / {len(keys[2])}).", ""]

    e01, f012, tests = runs[0][1], runs[2][1], runs[2][2]
    flipped = sorted(k for k in e01 if e01[k]["status"] in ("Survived", "NoCoverage") and k in f012 and f012[k]["status"] == "Killed")
    out += ["## E01-1-cc Survived/NoCoverage → F01-2-cc Killed", "",
            f"{len(flipped)} mutants. `killedBy` lấy từ `mutation.json` của F01-2-cc.", "",
            "| Line:Col | Mutator | Replacement | E01-1-cc | killedBy (F01-2-cc) |", "|---|---|---|---|---|"]
    for k in flipped:
        kb = "<br>".join(cell(tname(tests, t)) for t in f012[k].get("killedBy") or []) or "—"
        out.append(f"| {k[0]}:{k[1]} | {k[2]} | `{cell(k[3])}` | {e01[k]['status']} | {kb} |")

    other = sorted(k for k in e01 if k in f012 and e01[k]["status"] != f012[k]["status"] and k not in flipped)
    out += ["", "## Other Status Changes (E01-1-cc → F01-2-cc)", "",
            "| Line:Col | Mutator | Replacement | E01-1-cc | F01-2-cc |", "|---|---|---|---|---|"]
    for k in other:
        out.append(f"| {k[0]}:{k[1]} | {k[2]} | `{cell(k[3])}` | {e01[k]['status']} | {f012[k]['status']} |")
    if not other:
        out.append("| — | | | | |")

    out += ["", "## Selected Survivors (Experiment Log)", "",
            "| Line:Col | Mutator | Replacement | E01-1-cc | F01-1 | F01-2-cc | killedBy (F01-2-cc) |", "|---|---|---|---|---|---|---|"]
    for t in TARGETS:
        found = [[k for k in r[1] if k[:4] == t] for r in runs]
        if any(len(f) != 1 for f in found):
            out.append(f"| {t[0]}:{t[1]} | {t[2]} | `{t[3]}` | khớp {[len(f) for f in found]} mutant, cần kiểm tay | | | |")
            continue
        st = [r[1][f[0]]["status"] for r, f in zip(runs, found)]
        kb = "<br>".join(cell(tname(tests, x)) for x in f012[found[2][0]].get("killedBy") or []) or "—"
        out.append(f"| {t[0]}:{t[1]} | {t[2]} | `{t[3]}` | " + " | ".join(st) + f" | {kb} |")

    with open(a.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out) + "\n")
    print("\n".join(out))


if __name__ == "__main__":
    main()
