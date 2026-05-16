import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer for gptoapk.com and APK download links.",
  alternates: {
    canonical: "https://gptoapk.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Please read this disclaimer before using app information or APK download links found through gptoapk.com."
      updated="May 16, 2026"
      sections={[
        {
          title: "Informational tool",
          body: (
            <p>
              gptoapk.com is an informational utility that helps users search Android app information and find available third-party APK download sources. We do not claim ownership of third-party apps, app metadata, trademarks, or package files.
            </p>
          ),
        },
        {
          title: "No Google Play affiliation",
          body: (
            <p>
              gptoapk.com is not endorsed by, sponsored by, or affiliated with Google, Google Play, Android, or app developers. Google Play and Android are trademarks of their respective owners.
            </p>
          ),
        },
        {
          title: "APK safety",
          body: (
            <p>
              APK files can affect your device and data. We do not guarantee that every third-party file, version, or source is safe, complete, malware-free, or suitable for your device. You should verify file integrity, review permissions, and install apps only from sources you trust.
            </p>
          ),
        },
        {
          title: "Copyright and removal requests",
          body: (
            <p>
              If you are a rights holder and believe a page or link on gptoapk.com should be removed, email likaiwork12@gmail.com with the URL, your relationship to the rights holder, and enough information for us to review the request.
            </p>
          ),
        },
      ]}
    />
  );
}
