import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for gptoapk.com, including analytics, advertising, cookies, and contact information.",
  alternates: {
    canonical: "https://gptoapk.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This Privacy Policy explains how gptoapk.com handles information when you use our Android app search and APK link service."
      updated="May 16, 2026"
      sections={[
        {
          title: "Information we process",
          body: (
            <>
              <p>
                You can use gptoapk.com without creating an account. When you search for an app or request a download link, we process the query you submit, such as an app name, package name, or Google Play URL, so the service can return app information and available third-party download sources.
              </p>
              <p>
                Like most websites, our hosting, security, analytics, and advertising providers may process technical data such as IP address, browser type, device information, referring pages, pages visited, approximate location, and timestamps.
              </p>
            </>
          ),
        },
        {
          title: "Cookies, analytics, and advertising",
          body: (
            <>
              <p>
                We use analytics tools to understand site performance, popular pages, and errors. We may also use advertising services, including Google AdSense, which can use cookies or similar technologies to serve and measure ads.
              </p>
              <p>
                Google and its partners may use cookies to serve ads based on visits to this and other websites. You can learn more about Google ad personalization and manage your choices at Google Ads Settings.
              </p>
            </>
          ),
        },
        {
          title: "How we use information",
          body: (
            <p>
              We use information to operate the website, return search results, prepare download links, protect against abuse, understand traffic, improve page quality, comply with legal obligations, and support advertising or analytics features.
            </p>
          ),
        },
        {
          title: "Third-party links and downloads",
          body: (
            <p>
              gptoapk.com may link to third-party app pages, CDNs, APK sources, and other websites. Those third parties operate independently and have their own privacy practices. We do not control their policies or how they process information after you leave our site.
            </p>
          ),
        },
        {
          title: "Data retention and security",
          body: (
            <p>
              We keep operational data only as long as reasonably needed for service, security, analytics, legal, or business purposes. No online service can guarantee perfect security, but we use reasonable measures and reputable providers to protect the site.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              For privacy questions or requests, contact us at likaiwork12@gmail.com. Please include enough detail for us to understand and respond to your request.
            </p>
          ),
        },
      ]}
    />
  );
}
