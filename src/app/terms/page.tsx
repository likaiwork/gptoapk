import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using gptoapk.com.",
  alternates: {
    canonical: "https://gptoapk.com/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These Terms govern your use of gptoapk.com. By using the website, you agree to use it responsibly and comply with applicable laws."
      updated="May 21, 2026"
      sections={[
        {
          title: "Use of the service",
          body: (
            <p>
              gptoapk.com provides app search information and download-link preparation for Android users. You agree not to misuse the service, overload the website, bypass security controls, scrape aggressively, or use the service for unlawful activity.
            </p>
          ),
        },
        {
          title: "Free apps only and paid app restrictions",
          body: (
            <p>
              gptoapk.com does not support downloading paid apps, cracked apps, modified apps, or content intended to bypass purchases, subscriptions, licensing, device checks, or developer access controls. If an app is paid on Google Play or another official store, our service may show an unsupported notice instead of preparing a download link. Users must purchase paid apps through the official store or developer channel.
            </p>
          ),
        },
        {
          title: "No hosting or redistribution",
          body: (
            <p>
              We do not host, store, sell, or redistribute APK files as our own content. The website prepares links or routes users to publicly available third-party sources when available. Availability can change at any time, and a listed app does not imply endorsement, ownership, or a right to redistribute the app.
            </p>
          ),
        },
        {
          title: "No affiliation",
          body: (
            <p>
              gptoapk.com is not affiliated with Google, Google Play, Android, Aptoide, APKPure, app developers, or any trademark owner unless explicitly stated. Product names, logos, and trademarks belong to their respective owners.
            </p>
          ),
        },
        {
          title: "Third-party content",
          body: (
            <p>
              App names, descriptions, icons, ratings, package names, and download sources may come from third-party services. We do not own those materials and cannot guarantee that every listing, version, or third-party link is always accurate, available, safe, or appropriate for your device.
            </p>
          ),
        },
        {
          title: "User responsibility",
          body: (
            <p>
              You are responsible for checking whether an app is legal to download and install in your location, whether it is compatible with your device, and whether it comes from a source you trust. Always review permissions and scan files when appropriate before installing APK files.
            </p>
          ),
        },
        {
          title: "Service availability",
          body: (
            <p>
              We may change, limit, suspend, or discontinue any part of the website at any time. We provide the service as-is and do not guarantee uninterrupted access, specific download availability, or error-free operation.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              For legal, policy, or abuse concerns, contact us at likaiwork12@gmail.com.
            </p>
          ),
        },
      ]}
    />
  );
}
