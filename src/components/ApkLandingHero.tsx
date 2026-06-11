"use client";

import { useState } from "react";
import ApkLandingInlineApp from "@/components/ApkLandingInlineApp";
import { buildApkLandingH1 } from "@/lib/apk-landing/build-metadata";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

function appInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "A";
}

export default function ApkLandingHero({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const h1 = buildApkLandingH1(config);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  return (
    <section className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8">
        <div className="flex flex-1 gap-5">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-md sm:h-24 sm:w-24">
            {iconUrl ? (
              <img
                src={iconUrl}
                alt={`${config.appName} icon`}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl font-bold text-white"
                aria-hidden
              >
                {appInitial(config.appName)}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl">
              {h1}
            </h1>
            <p className="mt-1 text-base font-medium text-blue-600 dark:text-blue-400">
              {config.developer}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{config.category}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                {ui.trustVerified}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                v{config.version}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                {config.apkSize}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                {config.minAndroid}
              </span>
            </div>
          </div>
        </div>

        <ApkLandingInlineApp config={config} onIconUrl={setIconUrl} />
      </div>
    </section>
  );
}
