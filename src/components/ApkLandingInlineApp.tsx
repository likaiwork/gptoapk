"use client";

import { useEffect, useRef, useState } from "react";
import DownloadButton from "@/components/DownloadButton";
import { getApkLandingCountry } from "@/lib/apk-landing/build-app-href";
import type { ApkLandingConfig, ApkLandingPlayApp } from "@/lib/apk-landing/types";
import { proxyImageUrl } from "@/lib/image-proxy";
import { isApkLandingPaidApp } from "@/lib/apk-landing/is-paid-app";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { getMirrorUnavailableMessage } from "@/lib/download-errors";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";

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

function playAppToResult(playApp: ApkLandingPlayApp): AppResult {
  return {
    appId: playApp.appId,
    title: playApp.title,
    summary: null,
    developer: playApp.developer,
    icon: playApp.icon,
    scoreText: playApp.scoreText,
    version: playApp.version,
    size: playApp.size,
    free: playApp.free,
  };
}

type Props = {
  config: ApkLandingConfig;
  prefetchedApp?: ApkLandingPlayApp | null;
  onIconUrl?: (url: string | null) => void;
  onAppLoaded?: (app: AppResult | null) => void;
  variant?: "default" | "hero";
};

function buildPlayStoreHref(appId: string, locale: string, country: string) {
  const params = new URLSearchParams({ id: appId, hl: locale, gl: country });
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default function ApkLandingInlineApp({
  config,
  prefetchedApp = null,
  onIconUrl,
  onAppLoaded,
  variant = "hero",
}: Props) {
  const isPaidListed = isApkLandingPaidApp(config.packageName);
  const mirrorBlocked = isUnsupportedNoMirrorApp(config.packageName);
  const knownPlayOnly = isPaidListed || mirrorBlocked;
  const initialApp = prefetchedApp ? playAppToResult(prefetchedApp) : null;

  const [app, setApp] = useState<AppResult | null>(initialApp);
  const [loading, setLoading] = useState(!knownPlayOnly && !initialApp);
  const [error, setError] = useState("");
  const country = getApkLandingCountry(config.locale);
  const ui = apkLandingUi(config.locale);
  const onIconUrlRef = useRef(onIconUrl);
  const onAppLoadedRef = useRef(onAppLoaded);
  onIconUrlRef.current = onIconUrl;
  onAppLoadedRef.current = onAppLoaded;

  useEffect(() => {
    if (prefetchedApp) {
      const result = playAppToResult(prefetchedApp);
      setApp(result);
      setLoading(false);
      onIconUrlRef.current?.(proxyImageUrl(result.icon));
      onAppLoadedRef.current?.(result);
      return;
    }

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
              onAppLoadedRef.current?.(match);
            }
            return;
          }
        }
        if (!cancelled) {
          setError("No apps found");
          onAppLoadedRef.current?.(null);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load app info");
          onAppLoadedRef.current?.(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [prefetchedApp, config.packageName, config.searchQuery, config.locale, country]);

  const playHref = buildPlayStoreHref(config.packageName, config.locale, country);
  const showPlayPrimary = knownPlayOnly || (app?.free === false);
  const heroBtnClass =
    "flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-6 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]";

  const playCta = (
    <div className="space-y-2">
      <a
        href={playHref}
        target="_blank"
        rel="noopener noreferrer"
        className={heroBtnClass}
        onClick={() =>
          trackEvent(analyticsEvents.playStoreClick, {
            app_id: config.packageName,
            landing_slug: config.slug,
            locale: config.locale,
          })
        }
      >
        <DownloadIcon className="h-6 w-6" />
        {ui.playStoreInstall}
      </a>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        {isPaidListed
          ? ui.paidAppNoApk
          : getMirrorUnavailableMessage(config.locale)}
      </p>
    </div>
  );

  if (loading && !knownPlayOnly) {
    return (
      <div className="w-full">
        <div className="h-[60px] w-full animate-pulse rounded-xl bg-slate-300 dark:bg-slate-600" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {showPlayPrimary ? (
        playCta
      ) : (
        <DownloadButton
          appId={config.packageName}
          appName={app?.title ?? config.appName}
          variant={variant}
        />
      )}

      {error && !app && (
        <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
