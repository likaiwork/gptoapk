import { apkLandingUi } from "@/lib/apk-landing/ui-strings";
import type { ApkLandingLocale } from "@/lib/apk-landing/types";

type Props = {
  locale: ApkLandingLocale;
  appName: string;
  screenshots: string[];
};

export default function ApkLandingScreenshots({ locale, appName, screenshots }: Props) {
  if (screenshots.length === 0) return null;

  const ui = apkLandingUi(locale);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{ui.screenshotsTitle}</h2>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {screenshots.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${appName} screenshot ${index + 1}`}
            className="h-56 w-auto shrink-0 snap-start rounded-xl border border-slate-200 shadow-sm dark:border-slate-700 sm:h-64"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </section>
  );
}
