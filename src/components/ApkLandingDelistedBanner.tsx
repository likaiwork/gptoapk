import { getApkLandingDelistedAppNote } from "@/lib/apk-landing/is-delisted-app";
import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

type Props = {
  config: ApkLandingConfig;
};

export default function ApkLandingDelistedBanner({ config }: Props) {
  const ui = apkLandingUi(config.locale);
  const note =
    config.delistedNote ??
    getApkLandingDelistedAppNote(config.packageName) ??
    ui.delistedBannerDefault;

  return (
    <div className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-200">
      <p className="font-semibold text-slate-900 dark:text-white">{ui.delistedBannerTitle}</p>
      <p className="mt-1">{note}</p>
    </div>
  );
}
