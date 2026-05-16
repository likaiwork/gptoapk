import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About",
  description: "About gptoapk.com and its Android app search and APK link service.",
  alternates: {
    canonical: "https://gptoapk.com/about",
  },
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About gptoapk.com"
      description="gptoapk.com helps Android users search app information, compare basic app details, and find available APK download sources from the web."
      updated="May 16, 2026"
      sections={[
        {
          title: "What we do",
          body: (
            <p>
              Our goal is to make it easier for users to look up Android apps by app name, package name, or app-store URL, then view useful details such as the app title, developer, icon, rating, version, and available download options.
            </p>
          ),
        },
        {
          title: "Our approach",
          body: (
            <p>
              We focus on simple pages, practical guides, and clear disclaimers. APK files should always be handled carefully, so we encourage users to verify files, review permissions, and respect developer rights and local laws.
            </p>
          ),
        },
        {
          title: "Independence",
          body: (
            <p>
              gptoapk.com is an independent website. We are not affiliated with Google, Google Play, Android, app developers, or third-party APK repositories unless a specific partnership is clearly stated.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              For feedback, corrections, or policy questions, email likaiwork12@gmail.com.
            </p>
          ),
        },
      ]}
    />
  );
}
