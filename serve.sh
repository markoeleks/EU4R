#!/bin/sh
# EU4Reconstruction — local dev server
#
# Serves from the PARENT directory so the site is available at:
#   http://localhost:8080/EU4R/
#
# This mirrors the GitHub Pages URL structure exactly:
#   https://markoeleks.github.io/EU4R/
#
# Usage: sh serve.sh

PORT=${1:-8080}
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Starting server at http://localhost:$PORT/EU4R/"
echo "Press Ctrl+C to stop."
echo ""

cd "$ROOT" && python3 -m http.server "$PORT"
