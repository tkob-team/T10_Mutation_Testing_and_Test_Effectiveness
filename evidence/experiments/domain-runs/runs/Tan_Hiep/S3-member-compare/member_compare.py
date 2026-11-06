#!/usr/bin/env python3
"""So sánh run S3 Cart & Orders của Tấn Hiệp (E01-1, F01-2, G01-2) với run -cc và với run tái lập của Hòa; không chạy run mới.

Dùng (từ experiments/s3/runs/Tan_Hiep):
  python -I S3-member-compare/member_compare.py -o S3-member-compare/member_comparison.md
Mutant nhận diện như H01: vị trí đầu–cuối + mutatorName + replacement. Chỉ đếm và liệt kê; không nhận định.
"""
import argparse
import json
import re
from collections import Counter

HOA = "../Thai_Hoa/D04-merge-2026-10-23-agent"
GROUPS = [
    ("E01-1", "E01-1-cc", "Hòa frozen-cart-orders-baseline", f"{HOA}/frozen-cart-orders-baseline/mutation.json"),
    ("F01-2", "F01-2-cc", "Hòa cart-reproduced-manual", f"{HOA}/cart-reproduced-manual/mutation.json"),
    ("G01-2", "G01-2-cc", "Hòa cart-reproduced-ai", f"{HOA}/cart-reproduced-ai/mutation.json"),
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
            key = (s["line"], s["column"], m["mutatorName"], m.get("replacement", ""), e["line"], e["column"])
            assert key not in mutants, key
            mutants[key] = m["status"]
    return mutants


def cell(text):
    return re.sub(r"\s+", " ", str(text)).replace("|", "\\|").strip()


def fmt(k):
    return f"{k[0]}:{k[1]}–{k[4]}:{k[5]} {k[2]} `{cell(k[3])}`"


def row(name, ms):
    c = Counter(ms.values())
    valid = sum(c[s] for s in ("Killed", "Timeout", "Survived", "NoCoverage"))
    score = 100 * (c["Killed"] + c["Timeout"]) / valid if valid else 0
    return f"| {name} | " + " | ".join(str(c[s]) for s in STATUSES) + f" | {len(ms)} | {score:.2f}% |"


def compare(a_name, a, b_name, b):
    common = set(a) & set(b)
    changed = sorted(k for k in common if a[k] != b[k])
    kt = [k for k in changed if {a[k], b[k]} <= DETECTED]
    surv = [k for k in changed if "Survived" in (a[k], b[k])]
    other = [k for k in changed if k not in kt and k not in surv]
    sa = {k for k in a if a[k] == "Survived"}
    sb = {k for k in b if b[k] == "Survived"}
    out = [f"### {a_name} vs {b_name}", "",
           f"- Mutant: {len(a)} vs {len(b)}; chung {len(common)}; chỉ ở {a_name}: {len(set(a) - set(b))}; chỉ ở {b_name}: {len(set(b) - set(a))}.",
           f"- Survived tuyệt đối: {a_name} {len(sa)}, {b_name} {len(sb)}; tập Survived trùng khớp: {'có' if sa == sb else 'không'}.",
           f"- Mutant đổi trạng thái: {len(changed)} — liên quan Survived: {len(surv)}; Killed↔Timeout: {len(kt)}; khác: {len(other)}.", ""]
    for title, ks in [("Liên quan Survived", surv), ("Killed↔Timeout", kt), ("Chuyển đổi khác", other)]:
        if ks:
            out += [f"{title}:", "", f"| Mutant | {b_name} | {a_name} |", "|---|---|---|"]
            out += [f"| {fmt(k)} | {b[k]} | {a[k]} |" for k in ks]
            out.append("")
    for title, ks in [(f"Chỉ ở {a_name}", set(a) - set(b)), (f"Chỉ ở {b_name}", set(b) - set(a))]:
        if ks:
            out += [f"{title}: " + "; ".join(fmt(k) for k in sorted(ks)), ""]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    data = [(m, load(f"{m}/mutation.json"), cc, load(f"{cc}/mutation.json"), hn, load(hp)) for m, cc, hn, hp in GROUPS]
    out = ["# S3 member runs — Cart & Orders mutant comparison", "",
           "Sinh bằng `S3-member-compare/member_compare.py` từ `mutation.json`; không chạy run mới. "
           "Khóa mutant: vị trí đầu–cuối + mutatorName + replacement (như H01). "
           "Score = (Killed + Timeout) / (Killed + Timeout + Survived + NoCoverage).", "",
           "## Counts", "",
           "| Run | " + " | ".join(STATUSES) + " | Total | Score |",
           "|---|" + "---:|" * (len(STATUSES) + 2)]
    for m, mm, cc, cm, hn, hm in data:
        out += [row(f"{m} (Tấn Hiệp)", mm), row(cc, cm), row(hn, hm)]
    out += ["", "## Per-mutant", ""]
    for m, mm, cc, cm, hn, hm in data:
        out += compare(m, mm, cc, cm) + compare(m, mm, hn, hm)
    with open(a.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
