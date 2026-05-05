"use client";

import { useState } from "react";

type Status = "idle" | "preparing" | "started";

export default function DownloadButton({ appId }: { appId: string, appName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setStatus("preparing");
    setError("");

    try {
      const res = await fetch("/api/download-apk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to prepare download");
      }

      // The source serves the .apk with Content-Type:
      // application/vnd.android.package-archive and CORS *. Triggering an
      // anchor click in the same tab makes the browser start a native
      // download without navigating away from the current page.
      const a = document.createElement("a");
      a.href = data.downloadUrl;
      a.download = data.fileName || `${appId}.apk`;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setStatus("started");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Download failed");
      setStatus("idle");
    }
  };

  const isPreparing = status === "preparing";
  const isStarted = status === "started";

  return (
    <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
      <button
        onClick={handleDownload}
        disabled={isPreparing}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center sm:justify-start gap-3 text-lg w-full sm:w-auto hover:scale-[1.02] active:scale-95 transform"
      >
        {isPreparing ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Preparing...
          </>
        ) : isStarted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Download started
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download APK
          </>
        )}
      </button>

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
        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
          Check your browser&apos;s downloads.
        </p>
      )}
    </div>
  );
}
