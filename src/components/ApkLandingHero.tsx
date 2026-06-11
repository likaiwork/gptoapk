"use client";

import { useState } from "react";
import ApkLandingDelistedBanner from "@/components/ApkLandingDelistedBanner";
import ApkLandingInlineApp from "@/components/ApkLandingInlineApp";
import ApkLandingPaidBanner from "@/components/ApkLandingPaidBanner";
import { buildApkLandingH1 } from "@/lib/apk-landing/build-metadata";
import { isApkLandingDelistedApp } from "@/lib/apk-landing/is-delisted-app";
import { isApkLandingPaidApp } from "@/lib/apk-landing/is-paid-app";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig, ApkLandingPlayApp } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
  playApp: ApkLandingPlayApp | null;
};

type LoadedApp = {
  scoreText: string | null;
  version: string | null;
  size: string | null;
};

function appInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "A";
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-2 text-center sm:px-6">
      <span className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">{value}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function playAppToLoaded(playApp: ApkLandingPlayApp | null): LoadedApp | null {
  if (!playApp) return null;
  return {
    scoreText: playApp.scoreText,
    version: playApp.version,
    size: playApp.size,
  };
}

export default function ApkLandingHero({ config, playApp }: Props) {
  const ui = apkLandingUi(config.locale);
  const h1 = buildApkLandingH1(config);
  const [iconUrl, setIconUrl] = useState<string | null>(playApp?.icon ?? null);
  const [loadedApp, setLoadedApp] = useState<LoadedApp | null>(playAppToLoaded(playApp));
  const isPaid = isApkLandingPaidApp(config.packageName);
  const isDelisted =
    config.delisted === true ||
    isApkLandingDelistedApp(config.packageName) ||
    (playApp !== null && !playApp.available);

  const displayVersion = loadedApp?.version ?? config.version;
  const displaySize = loadedApp?.size ?? config.apkSize;
  const displayAndroid = config.minAndroid.replace(/^Android\s*/i, "");
  const displayIcon = iconUrl ?? playApp?.icon ?? null;
  const displayScore = loadedApp?.scoreText ?? playApp?.scoreText ?? null;

  return (
    <section className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
            <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl border border-slate-100 shadow-md dark:border-slate-600 sm:h-20 sm:w-20">
              {displayIcon ? (
                <img
                  src={displayIcon}
                  alt={`${config.appName} icon`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-bold text-white sm:text-3xl"
                  aria-hidden
                >
                  {appInitial(config.appName)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <h1 className="text-xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
                {h1}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                <span className="font-medium text-slate-800 dark:text-slate-100">
                  {playApp?.developer ?? config.developer}
                </span>
                <span className="mx-1.5 text-slate-400">·</span>
                <span>{config.category}</span>
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {ui.trustVerified}
                </span>
                {displayScore && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    ★ {displayScore}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 lg:w-64 xl:w-72">
            <ApkLandingInlineApp
              config={config}
              prefetchedApp={playApp}
              variant="hero"
              onIconUrl={setIconUrl}
              onAppLoaded={(app) =>
                setLoadedApp(
                  app
                    ? {
                        scoreText: app.scoreText,
                        version: app.version,
                        size: app.size,
                      }
                    : playAppToLoaded(playApp),
                )
              }
            />
          </div>
        </div>

        {isPaid && (
          <div className="mt-5">
            <ApkLandingPaidBanner locale={config.locale} />
          </div>
        )}

        {isDelisted && !isPaid && (
          <div className="mt-5">
            <ApkLandingDelistedBanner config={config} />
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-5 dark:divide-slate-600 dark:border-slate-600">
          <StatCell label={ui.version} value={displayVersion} />
          <StatCell label={ui.size} value={displaySize} />
          <StatCell label={ui.android} value={displayAndroid} />
        </div>
      </div>
    </section>
  );
}
