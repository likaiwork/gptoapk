import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingLocale } from "@/lib/apk-landing/types";

type Props = {
  locale: ApkLandingLocale;
};

export default function ApkLandingPaidBanner({ locale }: Props) {
  const ui = apkLandingUi(locale);
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-100">
      {ui.paidAppBanner}
    </div>
  );
}
