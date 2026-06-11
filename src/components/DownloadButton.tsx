"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";
import {
  getMirrorUnavailableMessage,
  getPaidAppUnsupportedMessage,
  MIRROR_UNAVAILABLE_CODE,
  PAID_APP_UNSUPPORTED_CODE,
} from "@/lib/download-errors";
import { downloadUi } from "@/lib/download-ui";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";

type Status = "idle" | "preparing" | "started" | "fallback";

const ESTIMATED_SECONDS = 5;
const STARTED_RESET_MS = 15000;

type DownloadResponse = {
  success?: boolean;
  code?: string;
  error?: string;
  downloadUrl?: string;
  fallbackDownloadUrl?: string;
  fileName?: string;
  source?: string;
  version?: string | null;
  size?: number | null;
  proxy?: string;
  externalPage?: boolean;
};

type DownloadButtonProps = {
  appId: string;
  appName?: string;
  compact?: boolean;
  /** Appteka-style large primary CTA for APK landing heroes */
  variant?: "default" | "hero";
};

export default function DownloadButton({
  appId,
  appName,
  compact = false,
  variant = "default",
}: DownloadButtonProps) {
  const pathname = usePathname();
  const localeMatch = pathname.match(localePathRegex);
  const locale = (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
  const ui = downloadUi[locale] ?? downloadUi.en;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(ESTIMATED_SECONDS);
  const [lastDownloadUrl, setLastDownloadUrl] = useState("");
  const [fallbackDownloadUrl, setFallbackDownloadUrl] = useState("");
  const [lastFileName, setLastFileName] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleDownload = async () => {
    const startedAt = performance.now();

    trackEvent(analyticsEvents.downloadClick, {
      app_id: appId,
    });

    setStatus("preparing");
    setError("");
    setLastDownloadUrl("");
    setFallbackDownloadUrl("");
    setLastFileName("");
    setCountdown(ESTIMATED_SECONDS);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    try {
      const res = await fetch("/api/download-apk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId, locale }),
      });

      const data = (await res.json()) as DownloadResponse;
      if (!res.ok || !data.success || !data.downloadUrl) {
        const message = data.code === PAID_APP_UNSUPPORTED_CODE
          ? getPaidAppUnsupportedMessage(locale)
          : data.code === MIRROR_UNAVAILABLE_CODE
            ? getMirrorUnavailableMessage(locale)
            : data.error || "Failed to prepare download";
        throw new Error(message, { cause: data.code });
      }

      const fileName = data.fileName || `${appId}.apk`;

      trackEvent(analyticsEvents.downloadPrepareSuccess, {
        app_id: appId,
        source: data.source,
        version: data.version,
        size: data.size,
        proxy: data.proxy,
        duration_ms: Math.round(performance.now() - startedAt),
      });

      // 记录下载到数据库
      const trackDownload = (downloadedFileSize?: string, downloadSuccess = true) => {
        fetch('/api/track-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            appId,
            appTitle: appName || (data as { [k: string]: unknown }).fileName || appId,
            source: data.source,
            downloadUrl: data.downloadUrl,
            version: data.version,
            fileSize: downloadedFileSize || String(data.size || ""),
            success: downloadSuccess,
          }),
        }).catch(() => {});
      };

      if (data.externalPage) {
        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = fileName;
        a.rel = "noopener";
        a.target = "gptoapk-direct-download";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      setLastDownloadUrl(data.downloadUrl);
      setFallbackDownloadUrl(data.fallbackDownloadUrl || "");
      setLastFileName(fileName);

      // 记录下载
      trackDownload(String(data.size || ""), true);

      if (intervalRef.current) clearInterval(intervalRef.current);
      setStatus("started");
      resetTimerRef.current = setTimeout(() => {
        setStatus((current) => (current === "started" ? "fallback" : current));
      }, STARTED_RESET_MS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Download failed";
      const skipFailureLog = err instanceof Error
        && (err.cause === PAID_APP_UNSUPPORTED_CODE || err.cause === MIRROR_UNAVAILABLE_CODE);
      trackEvent(analyticsEvents.downloadPrepareFailed, {
        app_id: appId,
        reason: message,
        duration_ms: Math.round(performance.now() - startedAt),
      });
      if (!skipFailureLog) {
        fetch('/api/track-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            appId,
            appTitle: appName || appId,
            source: "",
            downloadUrl: "",
            version: "",
            fileSize: "",
            success: false,
            error: message,
          }),
        }).catch(() => {});
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setError(message);
      setStatus("idle");
    }
  };

  const isPreparing = status === "preparing";
  const isStarted = status === "started";
  const isFallback = status === "fallback";
  const buttonClassName =
    variant === "hero"
      ? "w-full bg-slate-900 hover:bg-black disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2.5 text-lg active:scale-[0.98]"
      : compact
        ? "bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm w-full sm:w-auto active:scale-95 transform"
        : "bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center sm:justify-start gap-3 text-lg w-full sm:w-auto hover:scale-[1.02] active:scale-95 transform";
  const iconClassName = variant === "hero" ? "h-6 w-6" : compact ? "h-5 w-5" : "h-6 w-6";
  const wrapperClassName =
    variant === "hero" ? "flex w-full flex-col gap-2" : "flex flex-col items-start gap-2 w-full sm:w-auto";

  return (
    <div className={wrapperClassName}>
      <iframe name="gptoapk-direct-download" className="hidden" title="APK direct download" />

      <button
        onClick={handleDownload}
        disabled={isPreparing || isStarted}
        className={buttonClassName}
      >
        {isPreparing ? (
          <>
            <svg className={`animate-spin ${iconClassName} text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {countdown > 0 ? ui.startingIn(countdown) : ui.almostReady}
          </>
        ) : isStarted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            {ui.started}
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {ui.button}
          </>
        )}
      </button>

      {isPreparing && (
        <div className="w-full mt-1">
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-[width] duration-1000 ease-linear"
              style={{
                width: `${Math.min(
                  100,
                  ((ESTIMATED_SECONDS - countdown) / ESTIMATED_SECONDS) * 90 + (countdown === 0 ? 5 : 0)
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {countdown > 0
              ? ui.preparing
              : ui.finalizing}
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {!error && status === "idle" && (
        <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {ui.safe}
        </p>
      )}

      {isStarted && (
        <div className="mt-1 space-y-1 text-xs">
          <p className="text-green-600 dark:text-green-400">
            {ui.checkDownloads}
          </p>
          {lastDownloadUrl && (
            <a
              href={lastDownloadUrl}
              download={lastFileName}
              rel="noopener"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {ui.directRetry}
            </a>
          )}
        </div>
      )}

      {isFallback && fallbackDownloadUrl && (
        <div className="mt-2 w-full space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
          <p>
            {ui.fallbackPrompt}
          </p>
          <a
            href={fallbackDownloadUrl}
            download={lastFileName}
            rel="noopener"
            className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 font-bold text-white transition hover:bg-amber-600"
          >
            {ui.fallbackButton}
          </a>
        </div>
      )}
    </div>
  );
}
