"use client";

import { useEffect, useRef, useState } from "react";
import DownloadButton from "@/components/DownloadButton";
import { getApkLandingCountry } from "@/lib/apk-landing/build-app-href";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";
import { proxyImageUrl } from "@/lib/image-proxy";
import unsupportedPaidApps from "@/lib/unsupported-paid-apps.json";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { getMirrorUnavailableMessage } from "@/lib/download-errors";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";

type AppResult = {
  appId: string;
  title: string;
  summary: string | null;
  developer: string | null;
  icon: string | null;
  scoreText: string | null;
  version: string | null;
  size: string | null;
  free: boolean | null;
};

type Props = {
  config: ApkLandingConfig;
  onIconUrl?: (url: string | null) => void;
};

function buildPlayStoreHref(appId: string, locale: string, country: string) {
  const params = new URLSearchParams({ id: appId, hl: locale, gl: country });
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}

export default function ApkLandingInlineApp({ config, onIconUrl }: Props) {
  const [app, setApp] = useState<AppResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const country = getApkLandingCountry(config.locale);
  const ui = apkLandingUi(config.locale);
  const isPaidListed = config.packageName in unsupportedPaidApps;
  const mirrorBlocked = isUnsupportedNoMirrorApp(config.packageName);
  const onIconUrlRef = useRef(onIconUrl);
  onIconUrlRef.current = onIconUrl;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const queries = [config.packageName, config.searchQuery];
        for (const q of queries) {
          const params = new URLSearchParams({
            q,
            hl: config.locale,
            gl: country,
          });
          const res = await fetch(`/api/search-apps?${params.toString()}`);
          const data = (await res.json()) as { results?: AppResult[]; error?: string };
          const match =
            data.results?.find((r) => r.appId === config.packageName) ?? data.results?.[0];
          if (match) {
            if (!cancelled) {
              setApp(match);
              onIconUrlRef.current?.(proxyImageUrl(match.icon));
            }
            return;
          }
        }
        if (!cancelled) setError("No apps found");
      } catch {
        if (!cancelled) setError("Failed to load app info");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [config.packageName, config.searchQuery, config.locale, country]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-3 lg:w-72">
        <div className="h-14 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  const playHref = buildPlayStoreHref(config.packageName, config.locale, country);
  const showPlayPrimary = isPaidListed || mirrorBlocked || (app?.free === false);

  return (
    <div className="flex w-full flex-col gap-3 lg:w-72">
      {app && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left dark:border-slate-600 dark:bg-slate-900/50">
          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{app.title}</p>
          {app.developer && (
            <p className="truncate text-xs text-blue-600 dark:text-blue-400">{app.developer}</p>
          )}
          <p className="mt-1 break-all text-xs text-slate-500">{app.appId}</p>
        </div>
      )}

      {showPlayPrimary ? (
        <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            {isPaidListed
              ? config.locale === "hi"
                ? "Minecraft एक पेड गेम है — Google Play से खरीदें और इंस्टॉल करें।"
                : "This is a paid app — purchase and install from Google Play."
              : getMirrorUnavailableMessage(config.locale)}
          </p>
          <a
            href={playHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3.5 text-base font-bold text-white shadow-lg hover:bg-green-700"
          >
            {ui.playStoreInstall}
          </a>
        </div>
      ) : (
        <DownloadButton
          appId={config.packageName}
          appName={app?.title ?? config.appName}
        />
      )}

      {!showPlayPrimary && app?.free !== false && (
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
        >
          {ui.playStoreInstall}
        </a>
      )}

      {error && !app && (
        <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
