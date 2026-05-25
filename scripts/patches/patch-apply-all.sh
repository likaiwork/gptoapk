#!/bin/bash
# Master patch script
# Generated: 2026-05-25T05:44:07.910Z
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "  Applying insert-apk-download-manager-pc.py..." && python3 "$SCRIPT_DIR/insert-apk-download-manager-pc.py"
echo "  Applying insert-apk-file-location-on-android.py..." && python3 "$SCRIPT_DIR/insert-apk-file-location-on-android.py"
echo "  Applying insert-apk-mod-safety-guide.py..." && python3 "$SCRIPT_DIR/insert-apk-mod-safety-guide.py"
echo "  Applying insert-apk-obb-download-guide.py..." && python3 "$SCRIPT_DIR/insert-apk-obb-download-guide.py"
echo "  Applying insert-apk-parse-error-fix.py..." && python3 "$SCRIPT_DIR/insert-apk-parse-error-fix.py"
echo "  Applying insert-apk-sideloading-vs-google-play-store.py..." && python3 "$SCRIPT_DIR/insert-apk-sideloading-vs-google-play-store.py"
echo "  Applying insert-batch-apk-installer.py..." && python3 "$SCRIPT_DIR/insert-batch-apk-installer.py"
echo "  Applying insert-best-apkmirror-alternatives.py..." && python3 "$SCRIPT_DIR/insert-best-apkmirror-alternatives.py"
echo "  Applying insert-best-free-apk-downloader-tools-2026-comparison.py..." && python3 "$SCRIPT_DIR/insert-best-free-apk-downloader-tools-2026-comparison.py"
echo "  Applying insert-download-apk-from-google-play-on-pc-mac.py..." && python3 "$SCRIPT_DIR/insert-download-apk-from-google-play-on-pc-mac.py"
echo "  Applying insert-download-old-apk-versions.py..." && python3 "$SCRIPT_DIR/insert-download-old-apk-versions.py"
echo "  Applying insert-google-play-apk-downloader-not-working-7-fixes.py..." && python3 "$SCRIPT_DIR/insert-google-play-apk-downloader-not-working-7-fixes.py"
echo "  Applying insert-install-apk-files-samsung-google-pixel-xiaomi.py..." && python3 "$SCRIPT_DIR/insert-install-apk-files-samsung-google-pixel-xiaomi.py"
echo "  Applying insert-is-downloading-apk-from-google-play-safe.py..." && python3 "$SCRIPT_DIR/insert-is-downloading-apk-from-google-play-safe.py"
echo "  Applying insert-transfer-apk-phone-to-pc.py..." && python3 "$SCRIPT_DIR/insert-transfer-apk-phone-to-pc.py"
echo ""
echo "✅ All patches applied!"