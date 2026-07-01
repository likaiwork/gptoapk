#!/usr/bin/env bash
# Run full admin repair on VPS via localhost (avoids Cloudflare timeouts).
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/gptoapk}"
cd "$APP_DIR"

if [[ -f .env.production ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
fi

export REPAIR_SITE_HOST="${REPAIR_SITE_HOST:-http://127.0.0.1:3000}"
export ADMIN_API_KEY="${ADMIN_API_KEY:?Set ADMIN_API_KEY in .env.production}"

echo "[repair-all] host=$REPAIR_SITE_HOST"
echo "[repair-all] git=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

node scripts/run-admin-repair.mjs
node scripts/bulk-resolve-search-failures.mjs
node scripts/repair-download-failures.mjs

ADMIN_KEY="$ADMIN_API_KEY"
curl -s "http://127.0.0.1:3000/api/admin?key=${ADMIN_KEY}&pageSize=1" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print('search unresolved:', d.get('unresolved_search_failures'))
print('feedback pending:', d.get('pending_missing_app_feedback'))
print('download unresolved:', d.get('unresolved_download_failures'))
" 2>/dev/null || true

echo "[repair-all] done"
