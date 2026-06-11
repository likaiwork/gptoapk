import Link from "next/link";
import ApkLandingHero from "@/components/ApkLandingHero";
import SearchBox from "@/components/SearchBox";
import { buildApkLandingJsonLd } from "@/lib/apk-landing/build-jsonld";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

export default function ApkLandingPage({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const jsonLd = buildApkLandingJsonLd(config);
  const homeHref = `/${config.locale}`;
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

      <ApkLandingHero config={config} />

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
          <SearchBox initialQuery={config.packageName} autoSearch />
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
