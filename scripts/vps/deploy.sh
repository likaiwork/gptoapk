#!/usr/bin/env bash
# Update and restart gptoapk on VPS
# Run as root or deploy user with sudo
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/gptoapk}"
cd "$APP_DIR"

if [[ -f .env.production ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
fi

export NODE_ENV=production
export PORT="${PORT:-3000}"

echo "[deploy] git pull"
git pull --ff-only origin main

echo "[deploy] npm ci"
npm ci

echo "[deploy] build (uses swap if RAM is tight)"
npm run build

echo "[deploy] pm2"
if pm2 describe gptoapk >/dev/null 2>&1; then
  pm2 restart gptoapk
else
  pm2 start ecosystem.config.cjs
fi
pm2 save
pm2 startup systemd -u "${SUDO_USER:-root}" --hp "${HOME}" 2>/dev/null || true

echo "[deploy] done — check: curl -I http://127.0.0.1:${PORT}/"
