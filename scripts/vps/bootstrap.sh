#!/usr/bin/env bash
# First-time RackNerd / Ubuntu VPS setup for gptoapk.com
# Run as root: bash bootstrap.sh
set -euo pipefail

APP_DIR="/var/www/gptoapk"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
REPO_URL="${REPO_URL:-https://github.com/likaiwork/gptoapk.git}"
NODE_MAJOR="${NODE_MAJOR:-22}"

echo "[bootstrap] apt update + base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw build-essential

echo "[bootstrap] swap (2G) for npm run build on 2GB RAM"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "[bootstrap] Node.js ${NODE_MAJOR}"
curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
apt-get install -y nodejs
npm install -g pm2

if ! id "$DEPLOY_USER" &>/dev/null; then
  useradd -m -s /bin/bash "$DEPLOY_USER"
fi

mkdir -p "$APP_DIR"
chown -R "$DEPLOY_USER:$DEPLOY_USER" /var/www

echo "[bootstrap] firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "[bootstrap] clone repo (private repo: set GITHUB_TOKEN or clone manually first)"
  sudo -u "$DEPLOY_USER" git clone "$REPO_URL" "$APP_DIR" || {
    echo "Clone failed. If repo is private, run as ${DEPLOY_USER}:"
    echo "  git clone git@github.com:likaiwork/gptoapk.git $APP_DIR"
    exit 1
  }
fi

install -m 644 "$APP_DIR/scripts/vps/nginx-gptoapk.conf" /etc/nginx/sites-available/gptoapk
ln -sf /etc/nginx/sites-available/gptoapk /etc/nginx/sites-enabled/gptoapk
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "[bootstrap] done."
echo "Next steps:"
echo "  1. Create $APP_DIR/.env.production (see .env.production.example)"
echo "  2. bash $APP_DIR/scripts/vps/deploy.sh"
echo "  3. Point Cloudflare A records @ and www to this server IP"
echo "  4. certbot --nginx -d gptoapk.com -d www.gptoapk.com"
