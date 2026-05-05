"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Generating secure link",
  "Verifying region",
  "Preparing APK package",
];

export default function DownloadButton({ appId, appName }: { appId: string, appName: string }) {
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState("");
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsPreparing(true);
    setError("");

    try {
      const res = await fetch("/api/download-apk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate download link");
      }

      setModalUrl(data.downloadUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <>
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

        {!error && !isPreparing && (
          <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified safe to install
          </p>
        )}
      </div>

      {modalUrl && (
        <DownloadModal
          appName={appName}
          downloadUrl={modalUrl}
          onClose={() => setModalUrl(null)}
        />
      )}
    </>
  );
}

function DownloadModal({ appName, downloadUrl, onClose }: { appName: string, downloadUrl: string, onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const ready = currentStep >= STEPS.length;

  useEffect(() => {
    const durations = [500, 700, 600];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 0;
    durations.forEach((d, idx) => {
      cumulative += d;
      timers.push(setTimeout(() => setCurrentStep(idx + 1), cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {ready ? "Your download is ready" : "Preparing your download"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{appName}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 -mt-1 -mr-1 p-1"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {STEPS.map((label, idx) => (
            <StepRow
              key={idx}
              label={label}
              done={currentStep > idx}
              loading={currentStep === idx}
            />
          ))}
        </div>

        {ready ? (
          <a
            href={downloadUrl}
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Start Download
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 w-full bg-slate-100 dark:bg-slate-700 py-3 px-6 rounded-xl text-slate-500 dark:text-slate-400 font-semibold">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Please wait...
          </div>
        )}

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
          Verified safe • Latest version
        </p>
      </div>
    </div>
  );
}

function StepRow({ label, done, loading }: { label: string, done: boolean, loading: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        {done ? (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : loading ? (
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
        )}
      </div>
      <span className={`text-sm ${done ? "text-slate-900 dark:text-white" : loading ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`}>
        {label}
      </span>
    </div>
  );
}
