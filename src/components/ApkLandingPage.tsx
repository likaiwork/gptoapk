import Link from "next/link";
import DownloadButton from "@/components/DownloadButton";
import SearchBox from "@/components/SearchBox";
import { buildApkAppPageHref } from "@/lib/apk-landing/build-app-href";
import { buildApkLandingH1 } from "@/lib/apk-landing/build-metadata";
import { buildApkLandingJsonLd } from "@/lib/apk-landing/build-jsonld";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

function appInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "A";
}

export default function ApkLandingPage({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const h1 = buildApkLandingH1(config);
  const jsonLd = buildApkLandingJsonLd(config);
  const homeHref = `/${config.locale}`;
  const appPageHref = buildApkAppPageHref(config);
  const displayName = config.variantLabel
    ? `${config.appName} (${config.variantLabel})`
    : config.appName;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.techArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.howTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
      />

      <nav className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        <Link href={homeHref} className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">
          {ui.home}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">{displayName} APK</span>
      </nav>

      {/* Appteka-style hero: icon + meta + Download APK CTA */}
      <section className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between lg:p-8">
          <div className="flex flex-1 gap-5">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl font-bold text-white shadow-md sm:h-24 sm:w-24"
              aria-hidden
            >
              {appInitial(config.appName)}
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

          <div className="flex w-full flex-col gap-3 lg:w-72 lg:shrink-0">
            <DownloadButton appId={config.packageName} appName={config.appName} />
            <Link
              href={appPageHref}
              className="block rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700/50"
            >
              {ui.viewAppPage}
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/30">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-200">
          {ui.quickAnswer}
        </h2>
        <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">{config.quickAnswer}</p>
      </section>

      <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/50 dark:bg-blue-950/30">
        <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-200">{ui.aiSummary}</h2>
        <p className="mt-2 text-xs text-blue-700/80 dark:text-blue-300/70">
          Generated summary · May contain inaccuracies
        </p>
        <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">{config.aiSummary}</p>
      </section>

      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{ui.aboutApp}</h2>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{config.aboutApp}</p>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{config.intro}</p>
        </section>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ui.aboutVersion}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              [ui.version, config.version],
              [ui.size, config.apkSize],
              [ui.android, config.minAndroid],
              [ui.package, config.packageName],
              [ui.developer, config.developer],
              [ui.updated, config.updated],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-medium text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="mt-0.5 break-all text-slate-900 dark:text-slate-100">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ui.searchCta}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {ui.searchHint(config.appName)}
        </p>
        <div className="mt-4">
          <SearchBox />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{ui.downloadTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700 dark:text-slate-300">
          {config.downloadSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{ui.installTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700 dark:text-slate-300">
          {config.installSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ui.safetyTitle}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{ui.trustSources}</p>
        <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{config.safetyNote}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{ui.faqTitle}</h2>
        <div className="mt-4 space-y-4">
          {config.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <summary className="cursor-pointer font-medium text-slate-900 dark:text-white">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ui.relatedTitle}</h2>
        <ul className="mt-3 space-y-2">
          {config.relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
