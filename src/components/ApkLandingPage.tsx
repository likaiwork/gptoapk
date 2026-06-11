import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { buildApkLandingH1 } from "@/lib/apk-landing/build-metadata";
import { buildApkLandingJsonLd } from "@/lib/apk-landing/build-jsonld";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

export default function ApkLandingPage({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const h1 = buildApkLandingH1(config);
  const jsonLd = buildApkLandingJsonLd(config);
  const homeHref = `/${config.locale}`;
  const searchHref = `${homeHref}?q=${encodeURIComponent(config.searchQuery)}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
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

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={homeHref} className="hover:text-zinc-800">
          {ui.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">{config.appName} APK</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{h1}</h1>
        <p className="mt-2 text-sm text-zinc-600">
          {config.developer} · {config.category}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            {ui.trustVerified}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
            v{config.version}
          </span>
        </div>
      </header>

      <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900">
          {ui.quickAnswer}
        </h2>
        <p className="mt-2 text-zinc-800">{config.quickAnswer}</p>
      </section>

      <section className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-sm font-semibold text-zinc-700">{ui.aiSummary}</h2>
        <p className="mt-2 text-zinc-800">{config.aiSummary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900">{ui.aboutApp}</h2>
        <p className="mt-3 leading-relaxed text-zinc-700">{config.aboutApp}</p>
        <p className="mt-3 leading-relaxed text-zinc-700">{config.intro}</p>
      </section>

      <section className="mb-8 overflow-hidden rounded-xl border border-zinc-200">
        <h2 className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-lg font-semibold text-zinc-900">
          {ui.versionInfo}
        </h2>
        <dl className="divide-y divide-zinc-100">
          {[
            [ui.version, config.version],
            [ui.size, config.apkSize],
            [ui.android, config.minAndroid],
            [ui.package, config.packageName],
            [ui.developer, config.developer],
            [ui.updated, config.updated],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 gap-2 px-4 py-3 text-sm">
              <dt className="font-medium text-zinc-500">{label}</dt>
              <dd className="break-all text-zinc-900">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-10 rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-blue-900">{ui.searchCta}</h2>
        <p className="mt-2 text-sm text-blue-800">{ui.searchHint(config.appName)}</p>
        <div className="mt-4">
          <SearchBox />
        </div>
        <Link
          href={searchHref}
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {ui.downloadCta}: {config.appName}
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900">{ui.downloadTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-zinc-700">
          {config.downloadSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900">{ui.installTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-zinc-700">
          {config.installSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-lg font-semibold text-zinc-900">{ui.safetyTitle}</h2>
        <p className="mt-2 text-sm text-zinc-600">{ui.trustSources}</p>
        <p className="mt-3 leading-relaxed text-zinc-700">{config.safetyNote}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900">{ui.faqTitle}</h2>
        <div className="mt-4 space-y-4">
          {config.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-zinc-200 bg-white p-4"
            >
              <summary className="cursor-pointer font-medium text-zinc-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-900">{ui.relatedTitle}</h2>
        <ul className="mt-3 space-y-2">
          {config.relatedLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-blue-600 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
