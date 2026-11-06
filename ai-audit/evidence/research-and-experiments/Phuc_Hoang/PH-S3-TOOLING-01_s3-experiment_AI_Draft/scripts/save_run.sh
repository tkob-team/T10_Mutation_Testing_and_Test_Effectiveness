#!/usr/bin/env bash
# Copy one Stryker/Jest run into the seminar evidence folder.
# Usage:
#   save_run.sh --dest experiments/s3/runs/<Member>/<Run_ID> --project <dir where tools ran> \
#     [--html reports/mutation.html] [--json reports/mutation.json] [--log console.log] \
#     [--config stryker.config.json]... [--file extra]... [--sut <SUT repo path>] [--cmd "command used"]
# Paths after --project are relative to it unless absolute. Console logs are stripped of ANSI colors.
set -euo pipefail

dest="" project="" html="" json="" log="" sut="" cmd=""
configs=() extras=()
while [ $# -gt 0 ]; do
  case "$1" in
    --dest) dest="$2"; shift 2 ;;
    --project) project="$2"; shift 2 ;;
    --html) html="$2"; shift 2 ;;
    --json) json="$2"; shift 2 ;;
    --log) log="$2"; shift 2 ;;
    --config) configs+=("$2"); shift 2 ;;
    --file) extras+=("$2"); shift 2 ;;
    --sut) sut="$2"; shift 2 ;;
    --cmd) cmd="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done
[ -n "$dest" ] && [ -n "$project" ] || { echo "--dest and --project are required" >&2; exit 2; }

resolve() { case "$1" in /*) echo "$1" ;; *) echo "$project/$1" ;; esac; }
copy() { local src; src="$(resolve "$1")"; [ -f "$src" ] || { echo "Missing: $src" >&2; exit 1; }; cp "$src" "$dest/${2:-$(basename "$src")}"; }

if [ -e "$dest" ] && [ -n "$(ls -A "$dest" 2>/dev/null)" ]; then
  echo "Refusing to overwrite non-empty $dest; choose a new Run ID" >&2; exit 1
fi
# Validate every input before creating anything, so a typo leaves no half-saved run behind.
for p in "$html" "$json" "$log" ${configs[@]+"${configs[@]}"} ${extras[@]+"${extras[@]}"}; do
  [ -z "$p" ] || [ -f "$(resolve "$p")" ] || { echo "Missing: $(resolve "$p")" >&2; exit 1; }
done
mkdir -p "$dest"

[ -n "$html" ] && copy "$html" mutation.html
[ -n "$json" ] && copy "$json" mutation.json
if [ -n "$log" ]; then
  src="$(resolve "$log")"; [ -f "$src" ] || { echo "Missing: $src" >&2; exit 1; }
  sed -E $'s/\x1b\\[[0-9;]*m//g' "$src" > "$dest/console.log"
fi
for c in ${configs[@]+"${configs[@]}"}; do copy "$c"; done
for f in ${extras[@]+"${extras[@]}"}; do copy "$f"; done

{
  echo "saved_at: $(date '+%Y-%m-%d %H:%M:%S %z')"
  [ -n "$cmd" ] && echo "command: $cmd"
  echo "os: $(uname -srm)"
  echo "node: $(node -v 2>/dev/null || echo n.a.)"
  echo "npm: $(npm -v 2>/dev/null || echo n.a.)"
  (cd "$project" && node -e '
    for (const p of ["jest","@stryker-mutator/core","@stryker-mutator/jest-runner","supertest","express"]) {
      try { console.log(p + ": " + require(require.resolve(p + "/package.json", { paths: [process.cwd()] })).version); } catch (e) {}
    }' 2>/dev/null) || true
  if [ -n "$sut" ]; then
    echo "sut_commit: $(git -C "$sut" rev-parse HEAD)"
    echo "sut_branch: $(git -C "$sut" rev-parse --abbrev-ref HEAD)"
    echo "sut_dirty_files:"; git -C "$sut" status --short | sed 's/^/  /'
  fi
} > "$dest/run_meta.txt"

echo "Saved run to $dest:"; ls -1 "$dest"
