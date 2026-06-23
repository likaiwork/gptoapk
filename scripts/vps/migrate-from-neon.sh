#!/usr/bin/env bash
# Migrate data from Neon into local Postgres on VPS.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/gptoapk}"
cd "$APP_DIR"

if [[ ! -f .env.production ]]; then
  echo "Missing .env.production in $APP_DIR"
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env.production
set +a

if [[ -z "${NEON_SOURCE_URL:-}" ]]; then
  echo "Set NEON_SOURCE_URL to your Neon *direct* connection (host without -pooler)."
  echo "Example:"
  echo "  export NEON_SOURCE_URL='postgresql://USER:PASS@ep-xxx.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'"
  exit 1
fi

echo "[migrate] source -> local Postgres"
node scripts/migrate-neon-to-local.mjs

echo "[migrate] restart app"
pm2 restart gptoapk --update-env

ADMIN_KEY=$(grep '^ADMIN_API_KEY=' .env.production | cut -d= -f2-)
curl -s "http://127.0.0.1:3000/api/admin?key=${ADMIN_KEY}&pageSize=3" | head -c 300
echo ""
