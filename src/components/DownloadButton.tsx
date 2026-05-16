"use client";

import { useEffect, useRef, useState } from "react";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";

type Status = "idle" | "preparing" | "started";

const ESTIMATED_SECONDS = 5;
const STARTED_RESET_MS = 15000;

type DownloadResponse = {
  success?: boolean;
  error?: string;
  downloadUrl?: string;
  fileName?: string;
  source?: string;
  version?: string | null;
  size?: number | null;
  proxy?: string;
};

type DownloadButtonProps = {
  appId: string;
  appName?: string;
  compact?: boolean;
};

export default function DownloadButton({ appId, compact = false }: DownloadButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(ESTIMATED_SECONDS);
  const [lastDownloadUrl, setLastDownloadUrl] = useState("");
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
        body: JSON.stringify({ appId }),
      });

      const data = (await res.json()) as DownloadResponse;
      if (!res.ok || !data.success || !data.downloadUrl) {
        throw new Error(data.error || "Failed to prepare download");
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
            appTitle: (data as { [k: string]: unknown }).fileName || appId,
            source: data.source,
            downloadUrl: data.downloadUrl,
            version: data.version,
            fileSize: downloadedFileSize || String(data.size || ""),
            success: downloadSuccess,
          }),
        }).catch(() => {});
      };

      const a = document.createElement("a");
      a.href = data.downloadUrl;
      a.download = fileName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setLastDownloadUrl(data.downloadUrl);
      setLastFileName(fileName);

      // 记录下载
      trackDownload(String(data.size || ""), true);

      if (intervalRef.current) clearInterval(intervalRef.current);
      setStatus("started");
      resetTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, STARTED_RESET_MS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Download failed";
      trackEvent(analyticsEvents.downloadPrepareFailed, {
        app_id: appId,
        reason: message,
        duration_ms: Math.round(performance.now() - startedAt),
      });
      // 记录失败状态
      fetch('/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          appTitle: appId,
          source: "",
          downloadUrl: "",
          version: "",
          fileSize: "",
          success: false,
        }),
      }).catch(() => {});
      if (intervalRef.current) clearInterval(intervalRef.current);
      setError(message);
      setStatus("idle");
    }
  };

  const isPreparing = status === "preparing";
  const isStarted = status === "started";
  const buttonClassName = compact
    ? "bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm w-full sm:w-auto active:scale-95 transform"
    : "bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center sm:justify-start gap-3 text-lg w-full sm:w-auto hover:scale-[1.02] active:scale-95 transform";
  const iconClassName = compact ? "h-5 w-5" : "h-6 w-6";

  return (
    <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
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
            {countdown > 0 ? `Starting in ${countdown}s...` : "Almost ready..."}
          </>
        ) : isStarted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Download started
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download APK
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
              ? "Fetching the latest APK from our verified source..."
              : "Just a moment, finalizing your download..."}
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
          Verified safe to install
        </p>
      )}

      {isStarted && (
        <div className="mt-1 space-y-1 text-xs">
          <p className="text-green-600 dark:text-green-400">
            Check your browser&apos;s downloads.
          </p>
          {lastDownloadUrl && (
            <a
              href={lastDownloadUrl}
              download={lastFileName}
              rel="noopener"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              If nothing starts, tap here to open the direct download link.
            </a>
          )}
        </div>
      )}
    </div>
  );
}
