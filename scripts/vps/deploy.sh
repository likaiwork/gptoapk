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
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"

echo "[deploy] git pull"
git fetch origin main
git reset --hard origin/main

echo "[deploy] npm ci"
npm ci

# Free RAM + avoid serving while .next is mid-write (partial builds cause 502).
if pm2 describe gptoapk >/dev/null 2>&1; then
  echo "[deploy] pm2 stop (before build)"
  pm2 stop gptoapk || true
fi

if [[ -d .next && -f .next/BUILD_ID ]]; then
  echo "[deploy] backup .next"
  rm -rf .next.bak
  cp -a .next .next.bak
fi

restore_next() {
  if [[ -d .next.bak && -f .next.bak/BUILD_ID ]]; then
    echo "[deploy] restore .next from backup after build failure"
    rm -rf .next
    mv .next.bak .next
  fi
}

echo "[deploy] build"
if ! npm run build; then
  restore_next
  if pm2 describe gptoapk >/dev/null 2>&1 && [[ -f .next/BUILD_ID ]]; then
    pm2 start gptoapk || true
  fi
  exit 1
fi

if [[ ! -f .next/BUILD_ID ]]; then
  echo "[deploy] ERROR: missing .next/BUILD_ID after build"
  restore_next
  exit 1
fi

rm -rf .next.bak

echo "[deploy] pm2 start/restart"
if pm2 describe gptoapk >/dev/null 2>&1; then
  pm2 restart gptoapk --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save
pm2 startup systemd -u "${SUDO_USER:-root}" --hp "${HOME}" 2>/dev/null || true

sleep 2
code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 10 "http://127.0.0.1:${PORT}/" || echo "000")
echo "[deploy] local HTTP ${code}"
if [[ "$code" != "200" && "$code" != "307" && "$code" != "308" && "$code" != "301" && "$code" != "302" ]]; then
  echo "[deploy] WARNING: unexpected local status ${code}"
  pm2 logs gptoapk --lines 40 --nostream || true
  exit 1
fi

echo "[deploy] done — BUILD_ID=$(cat .next/BUILD_ID)"
