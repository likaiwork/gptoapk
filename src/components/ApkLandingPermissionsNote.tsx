import { buildPlayStoreDataSafetyHref } from "@/lib/apk-landing/fetch-play-app";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

export default function ApkLandingPermissionsNote({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const href = buildPlayStoreDataSafetyHref(config.packageName);

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{ui.permissionsTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {ui.permissionsHint}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        {ui.permissionsPlayLink} →
      </a>
    </section>
  );
}
