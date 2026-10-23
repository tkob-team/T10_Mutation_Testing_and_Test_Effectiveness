#!/usr/bin/env python3
"""So sánh mutant S3-I01 (cross-run Coupons của Hòa) giữa run -cc và report gốc của Hòa; không chạy run mới.

Dùng (từ experiments/s3/runs/Tan_Hiep):
  python -I I01-cc-compare/i01_compare.py -o I01-cc-compare/i01_comparison.md
Mutant nhận diện bằng vị trí đầu–cuối + mutatorName + replacement. Chỉ đếm và liệt kê; không nhận định.
"""
import argparse
import json
import re
from collections import Counter

HOA = "../Thai_Hoa"
PAIRS = [
    ("I01-1-cc", "I01-1-cc/mutation.json",
     "Hòa frozen baseline", f"{HOA}/D04-merge-2026-10-23-agent/frozen-coupons-baseline/mutation.json"),
    ("I01-2-cc", "I01-2-cc/mutation.json",
     "Hòa manual", f"{HOA}/Coupons-extensions-2026-10-23-agent/manual-mutation.json"),
    ("I01-3-cc", "I01-3-cc/mutation.json",
     "Hòa AI", f"{HOA}/Coupons-extensions-2026-10-23-agent/ai-mutation.json"),
]
STATUSES = ["Killed", "Timeout", "Survived", "NoCoverage", "RuntimeError", "CompileError", "Ignored"]
DETECTED = {"Killed", "Timeout"}


def load(path):
    with open(path, encoding="utf-8") as fh:
        d = json.load(fh)
    mutants = {}
    for f in d["files"].values():
        for m in f["mutants"]:
            s, e = m["location"]["start"], m["location"]["end"]
            key = (s["line"], s["column"], e["line"], e["column"], m["mutatorName"], m.get("replacement", ""))
            assert key not in mutants, key
            mutants[key] = m["status"]
    return mutants


def counts(ms):
    c = Counter(ms.values())
    valid = sum(c[s] for s in ("Killed", "Timeout", "Survived", "NoCoverage"))
    score = 100 * (c["Killed"] + c["Timeout"]) / valid if valid else 0
    return c, valid, score


def cell(text):
    return re.sub(r"\s+", " ", str(text)).replace("|", "\\|").strip()


def fmt(k):
    return f"L{k[0]}:{k[1]}–L{k[2]}:{k[3]} {k[4]} `{cell(k[5])}`"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    out = ["# S3-I01 — Mutant comparison (cross-run Coupons)", "",
           "Sinh bằng `I01-cc-compare/i01_compare.py`. Khóa mutant: vị trí đầu–cuối + mutatorName + replacement. "
           "Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage); RuntimeError/CompileError/Ignored ngoài mẫu số.", "",
           "## Counts", "",
           "| Run | Killed | Timeout | Survived | NoCoverage | RuntimeError | CompileError | Ignored | Total | Score |",
           "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    data = {}
    for mine, mp, ref, rp in PAIRS:
        data[mine] = (load(mp), load(rp), ref)
    for name, ms in [(x, data[x][0]) for x in data] + [(data[x][2], data[x][1]) for x in data]:
        c, valid, score = counts(ms)
        out.append(f"| {name} | " + " | ".join(str(c[s]) for s in STATUSES) + f" | {len(ms)} | {score:.2f}% |")

    out += ["", "## Per-mutant transitions (run -cc so với report của Hòa)", ""]
    for mine, (m, r, ref) in data.items():
        only_m, only_r = set(m) - set(r), set(r) - set(m)
        common = set(m) & set(r)
        changed = sorted(k for k in common if m[k] != r[k])
        kt = [k for k in changed if {m[k], r[k]} <= DETECTED]
        other = [k for k in changed if k not in kt]
        surv_m = sorted(k for k in m if m[k] == "Survived")
        surv_r = sorted(k for k in r if r[k] == "Survived")
        out += [f"### {mine} vs {ref}", "",
                f"- Mutant: {len(m)} vs {len(r)}; chung {len(common)}; chỉ ở {mine}: {len(only_m)}; chỉ ở {ref}: {len(only_r)}.",
                f"- Survived tuyệt đối: {mine} {len(surv_m)}, {ref} {len(surv_r)}; tập Survived trùng khớp: {'có' if surv_m == surv_r else 'không'}.",
                f"- Mutant đổi trạng thái: {len(changed)} (Killed↔Timeout: {len(kt)}; chuyển đổi khác: {len(other)}).", ""]
        for title, ks in [("Killed↔Timeout", kt), ("Chuyển đổi khác", other)]:
            if ks:
                out += [f"{title}:", "", f"| Mutant | {ref} | {mine} |", "|---|---|---|"]
                out += [f"| {fmt(k)} | {r[k]} | {m[k]} |" for k in ks]
                out.append("")
        for title, ks in [(f"Chỉ ở {mine}", only_m), (f"Chỉ ở {ref}", only_r)]:
            if ks:
                out += [f"{title}: " + "; ".join(fmt(k) for k in sorted(ks)), ""]

    out += ["## Survived set giữa các run -cc", ""]
    s = {x: {k for k, v in data[x][0].items() if v == "Survived"} for x in data}
    out.append(f"- I01-1-cc → I01-2-cc: Survived→khác: {', '.join(fmt(k) + ' → ' + data['I01-2-cc'][0][k] for k in sorted(s['I01-1-cc'] - s['I01-2-cc'])) or 'none'}; mới Survived: {len(s['I01-2-cc'] - s['I01-1-cc'])}.")
    out.append(f"- I01-1-cc → I01-3-cc: Survived→khác: {', '.join(fmt(k) + ' → ' + data['I01-3-cc'][0][k] for k in sorted(s['I01-1-cc'] - s['I01-3-cc'])) or 'none'}; mới Survived: {len(s['I01-3-cc'] - s['I01-1-cc'])}.")
    out.append(f"- I01-2-cc vs I01-3-cc: tập Survived trùng khớp: {'có' if s['I01-2-cc'] == s['I01-3-cc'] else 'không'}.")
    with open(a.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
